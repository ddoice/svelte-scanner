// https://stackoverflow.com/questions/59636464/how-to-select-proper-backfacing-camera-in-javascript
// https://unpkg.com/browse/scandit-sdk@4.6.1/src/lib/cameraAccess.ts
// @ts-nocheck
import { BrowserCompatibility } from "./browserCompatibility";
import { BrowserHelper } from "./browserHelper";
import { Camera } from "./camera";

/**
 * A helper object to interact with cameras.
 */
export namespace CameraAccess {
  /**
   * @hidden
   *
   * Handle localized camera labels. Supported languages:
   * English, German, French, Spanish (spain), Portuguese (brasil), Portuguese (portugal), Italian,
   * Chinese (simplified), Chinese (traditional), Japanese, Russian, Turkish, Dutch, Arabic, Thai, Swedish,
   * Danish, Vietnamese, Norwegian, Polish, Finnish, Indonesian, Hebrew, Greek, Romanian, Hungarian, Czech,
   * Catalan, Slovak, Ukraininan, Croatian, Malay, Hindi.
   */
  const backCameraKeywords: string[] = [
    "rear",
    "back",
    "rück",
    "arrière",
    "trasera",
    "trás",
    "traseira",
    "posteriore",
    "后面",
    "後面",
    "背面",
    "后置", // alternative
    "後置", // alternative
    "背置", // alternative
    "задней",
    "الخلفية",
    "후",
    "arka",
    "achterzijde",
    "หลัง",
    "baksidan",
    "bagside",
    "sau",
    "bak",
    "tylny",
    "takakamera",
    "belakang",
    "אחורית",
    "πίσω",
    "spate",
    "hátsó",
    "zadní",
    "darrere",
    "zadná",
    "задня",
    "stražnja",
    "belakang",
    "बैक"
  ];

  /**
   * @hidden
   */
  const cameraObjects: Map<string, Camera> = new Map<string, Camera>();

  /**
   * @hidden
   */
  let getCamerasPromise: Promise<Camera[]> | undefined;

  /**
   * @hidden
   *
   * @param label The camera label.
   * @returns Whether the label mentions the camera being a back-facing one.
   */
  function isBackCameraLabel(label: string): boolean {
    const lowercaseLabel: string = label.toLowerCase();

    return backCameraKeywords.some(keyword => {
      return lowercaseLabel.includes(keyword);
    });
  }

  /**
   * @hidden
   *
   * Adjusts the cameras' type classification based on the given currently active video stream:
   * If the stream comes from an environment-facing camera, the camera is marked to be a back-facing camera
   * and the other cameras to be of other types accordingly (if they are not correctly set already).
   *
   * The method returns the currently active camera if it's actually the main (back or only) camera in use.
   *
   * @param mediaStreamTrack The currently active `MediaStreamTrack`.
   * @param cameras The array of available [[Camera]] objects.
   * @returns Whether the stream was actually from the main camera.
   */
  export function adjustCamerasFromMainCameraStream(
    mediaStreamTrack: MediaStreamTrack,
    cameras: Camera[]
  ): Camera | undefined {
    let mediaTrackSettings: MediaTrackSettings | undefined;
    if (typeof mediaStreamTrack.getSettings === "function") {
      mediaTrackSettings = mediaStreamTrack.getSettings();
    }
    const activeCamera: Camera | undefined = cameras.find(camera => {
      return (
        (mediaTrackSettings != null && camera.deviceId === mediaTrackSettings.deviceId) ||
        camera.label === mediaStreamTrack.label
      );
    });
    if (activeCamera !== undefined) {
      const activeCameraIsBackFacing: boolean =
        (mediaTrackSettings != null && mediaTrackSettings.facingMode === "environment") ||
        isBackCameraLabel(mediaStreamTrack.label);
      let activeCameraIsMainBackCamera: boolean = activeCameraIsBackFacing;
      // TODO: also correct camera types when active camera is not back-facing
      if (activeCameraIsBackFacing && cameras.length > 1) {
        // Correct camera types if needed
        cameras.forEach(camera => {
          if (camera.deviceId === activeCamera.deviceId) {
            // tslint:disable-next-line:no-any
            (<any>camera).cameraType = Camera.Type.BACK;
          } else if (!isBackCameraLabel(camera.label)) {
            // tslint:disable-next-line:no-any
            (<any>camera).cameraType = Camera.Type.FRONT;
          }
        });

        const mainBackCamera: Camera = cameras
          .filter(camera => {
            return camera.cameraType === Camera.Type.BACK;
          })
          .sort((camera1, camera2) => {
            return camera1.label.localeCompare(camera2.label);
          })[0];
        activeCameraIsMainBackCamera = activeCamera.deviceId === mainBackCamera.deviceId;
      }

      if (cameras.length === 1 || activeCameraIsMainBackCamera) {
        return activeCamera;
      }
    }

    return undefined;
  }

  /**
   * @hidden
   *
   * @param devices The list of available devices.
   * @returns The extracted list of camera objects initialized from the given devices.
   */
  function extractCamerasFromDevices(devices: MediaDeviceInfo[]): Camera[] {
    const cameras: Camera[] = devices
      .filter(device => {
        return device.kind === "videoinput";
      })
      .map(videoDevice => {
        if (cameraObjects.has(videoDevice.deviceId)) {
          return <Camera>cameraObjects.get(videoDevice.deviceId);
        }

        const label: string = videoDevice.label != null ? videoDevice.label : "";
        const camera: Camera = {
          deviceId: videoDevice.deviceId,
          label,
          cameraType: isBackCameraLabel(label) ? Camera.Type.BACK : Camera.Type.FRONT
        };

        if (label !== "") {
          cameraObjects.set(videoDevice.deviceId, camera);
        }

        return camera;
      });
    if (
      cameras.length > 1 &&
      !cameras.some(camera => {
        return camera.cameraType === Camera.Type.BACK;
      })
    ) {
      // Check if cameras are labeled with resolution information, take the higher-resolution one in that case
      // Otherwise pick the last camera
      let backCameraIndex: number = cameras.length - 1;

      const cameraResolutions: number[] = cameras.map(camera => {
        const match: RegExpMatchArray | null = camera.label.match(/\b([0-9]+)MP?\b/i);
        if (match != null) {
          return parseInt(match[1], 10);
        }

        return NaN;
      });
      if (
        !cameraResolutions.some(cameraResolution => {
          return isNaN(cameraResolution);
        })
      ) {
        backCameraIndex = cameraResolutions.lastIndexOf(Math.max(...cameraResolutions));
      }

      // tslint:disable-next-line:no-any
      (<any>cameras[backCameraIndex]).cameraType = Camera.Type.BACK;
    }

    return cameras;
  }

  /**
   * Get a list of cameras (if any) available on the device, a camera access permission is requested to the user
   * the first time this method is called if needed.
   *
   * Depending on device features and user permissions for camera access, any of the following errors
   * could be the rejected result of the returned promise:
   * - `UnsupportedBrowserError`
   * - `PermissionDeniedError`
   * - `NotAllowedError`
   * - `NotFoundError`
   * - `AbortError`
   * - `NotReadableError`
   * - `InternalError`
   *
   * @returns A promise resolving to the array of available [[Camera]] objects (could be empty).
   */
  export function getCameras(): Promise<Camera[]> {
    if (getCamerasPromise != null) {
      return getCamerasPromise;
    }

    const browserCompatibility: BrowserCompatibility = BrowserHelper.checkBrowserCompatibility();
    if (!browserCompatibility.fullSupport) {
      return Promise.reject('yup');
    }

    const accessPermissionPromise: Promise<void | MediaStream> = new Promise((resolve, reject) => {
      return enumerateDevices()
        .then(devices => {
          if (
            devices
              .filter(device => {
                return device.kind === "videoinput";
              })
              .every(device => {
                return device.label === "";
              })
          ) {
            resolve(
              navigator.mediaDevices.getUserMedia({
                video: true,
                audio: false
              })
            );
          } else {
            resolve();
          }
        })
        .catch(reject);
    });

    getCamerasPromise = new Promise(async (resolve, reject) => {
      let stream!: void | MediaStream;
      try {
        stream = await accessPermissionPromise;
        const devices: MediaDeviceInfo[] = await enumerateDevices();
        const cameras: Camera[] = extractCamerasFromDevices(devices);

        console.debug("Camera list: ", ...cameras);

        return resolve(cameras);
      } catch (error) {
        // istanbul ignore if
        if (error.name === "SourceUnavailableError") {
          error.name = "NotReadableError";
        }

        return reject(error);
      } finally {
        // istanbul ignore else
        if (stream != null) {
          stream.getVideoTracks().forEach(track => {
            track.stop();
          });
        }
        getCamerasPromise = undefined;
      }
    });

    return getCamerasPromise;
  }

  /**
   * @hidden
   *
   * Call `navigator.mediaDevices.getUserMedia` asynchronously in a `setTimeout` call.
   *
   * @param getUserMediaParams The parameters for the `navigator.mediaDevices.getUserMedia` call.
   * @returns A promise resolving when the camera is accessed.
   */
  function getUserMediaDelayed(getUserMediaParams: MediaStreamConstraints): Promise<MediaStream> {
    console.debug("Camera access:", getUserMediaParams.video);

    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        navigator.mediaDevices
          .getUserMedia(getUserMediaParams)
          .then(resolve)
          .catch(reject);
      }, 0);
    });
  }

  /**
   * @hidden
   *
   * Get the *getUserMedia* *video* parameters to be used given a resolution fallback level and the browser used.
   *
   * @param resolutionFallbackLevel The number representing the wanted resolution, from 0 to 6,
   * resulting in higher to lower video resolutions.
   * @param isSafariBrowser Whether the browser is *Safari*.
   * @returns The resulting *getUserMedia* *video* parameters.
   */
  function getUserMediaVideoParams(resolutionFallbackLevel: number, isSafariBrowser: boolean): MediaTrackConstraints {
    switch (resolutionFallbackLevel) {
      case 0:
        if (isSafariBrowser) {
          return {
            width: { min: 1400, ideal: 1920, max: 1920 },
            height: { min: 900, ideal: 1080, max: 1440 }
          };
        } else {
          return {
            width: { min: 1400, ideal: 1920, max: 1920 },
            height: { min: 900, ideal: 1440, max: 1440 }
          };
        }
      case 1:
        if (isSafariBrowser) {
          return {
            width: { min: 1200, ideal: 1600, max: 1920 },
            height: { min: 900, ideal: 1080, max: 1200 }
          };
        } else {
          return {
            width: { min: 1200, ideal: 1920, max: 1920 },
            height: { min: 900, ideal: 1200, max: 1200 }
          };
        }
      case 2:
        if (isSafariBrowser) {
          return {
            width: { min: 1080, ideal: 1600, max: 1920 },
            height: { min: 900, ideal: 900, max: 1080 }
          };
        } else {
          return {
            width: { min: 1080, ideal: 1920, max: 1920 },
            height: { min: 900, ideal: 1080, max: 1080 }
          };
        }
      case 3:
        if (isSafariBrowser) {
          return {
            width: { min: 960, ideal: 1280, max: 1440 },
            height: { min: 480, ideal: 720, max: 960 }
          };
        } else {
          return {
            width: { min: 960, ideal: 1280, max: 1440 },
            height: { min: 480, ideal: 960, max: 960 }
          };
        }
      case 4:
        if (isSafariBrowser) {
          return {
            width: { min: 720, ideal: 1024, max: 1440 },
            height: { min: 480, ideal: 768, max: 768 }
          };
        } else {
          return {
            width: { min: 720, ideal: 1280, max: 1440 },
            height: { min: 480, ideal: 720, max: 768 }
          };
        }
      case 5:
        if (isSafariBrowser) {
          return {
            width: { min: 640, ideal: 800, max: 1440 },
            height: { min: 480, ideal: 600, max: 720 }
          };
        } else {
          return {
            width: { min: 640, ideal: 960, max: 1440 },
            height: { min: 480, ideal: 720, max: 720 }
          };
        }
      default:
        return {};
    }
  }

  /**
   * @hidden
   *
   * Try to access a given camera for video input at the given resolution level.
   *
   * @param resolutionFallbackLevel The number representing the wanted resolution, from 0 to 6,
   * resulting in higher to lower video resolutions.
   * @param camera The camera to try to access for video input.
   * @returns A promise resolving to the `MediaStream` object coming from the accessed camera.
   */
  export function accessCameraStream(resolutionFallbackLevel: number, camera: Camera): Promise<MediaStream> {
    const browserName: string | undefined = BrowserHelper.userAgentInfo.getBrowser().name;
    const getUserMediaParams: MediaStreamConstraints = {
      audio: false,
      video: getUserMediaVideoParams(resolutionFallbackLevel, browserName != null && browserName.includes("Safari"))
    };

    if (camera.deviceId === "") {
      (<MediaTrackConstraints>getUserMediaParams.video).facingMode = {
        ideal: camera.cameraType === Camera.Type.BACK ? "environment" : "user"
      };
    } else {
      (<MediaTrackConstraints>getUserMediaParams.video).deviceId = {
        exact: camera.deviceId
      };
    }

    return getUserMediaDelayed(getUserMediaParams);
  }

  /**
   * @hidden
   *
   * Get a list of available devices in a cross-browser compatible way.
   *
   * @returns A promise resolving to the `MediaDeviceInfo` array of all available devices.
   */
  function enumerateDevices(): Promise<MediaDeviceInfo[]> {
    if (typeof navigator.enumerateDevices === "function") {
      return navigator.enumerateDevices();
    } else if (
      typeof navigator.mediaDevices === "object" &&
      typeof navigator.mediaDevices.enumerateDevices === "function"
    ) {
      return navigator.mediaDevices.enumerateDevices();
    } else {
      return new Promise((resolve, reject) => {
        try {
          if (window.MediaStreamTrack == null || window.MediaStreamTrack.getSources == null) {
            throw new Error();
          }
          window.MediaStreamTrack.getSources((devices: MediaDeviceInfo[]) => {
            resolve(
              devices
                .filter(device => {
                  return device.kind.toLowerCase() === "video" || device.kind.toLowerCase() === "videoinput";
                })
                .map(device => {
                  return {
                    deviceId: device.deviceId != null ? device.deviceId : "",
                    groupId: device.groupId,
                    kind: <MediaDeviceKind>"videoinput",
                    label: device.label,
                    toJSON: /* istanbul ignore next */ function(): MediaDeviceInfo {
                      return this;
                    }
                  };
                })
            );
          });
        } catch {
          const browserCompatibility: BrowserCompatibility = {
            fullSupport: false,
            scannerSupport: true,
            missingFeatures: [BrowserCompatibility.Feature.MEDIA_DEVICES]
          };

          return reject(new Error("enumerateDevices() not supported"));
        }
      });
    }
  }
}