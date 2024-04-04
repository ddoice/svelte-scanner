import { BrowserCompatibility } from "./browserCompatibility";

export namespace BrowserHelper {
  /**
   * @hidden
   */
  interface Browser {
    name?: string;
    version?: string;
  }

  /**
   * @hidden
   */
  interface CPU {
    architecture?: string;
  }

  /**
   * @hidden
   */
  interface Device {
    model?: string;
    vendor?: string;
    // tslint:disable-next-line:no-reserved-keywords
    type?: string;
  }

  /**
   * @hidden
   */
  interface Engine {
    name?: string;
    version?: string;
  }

  /**
   * @hidden
   */
  interface OS {
    name?: string;
    version?: string;
  }

  /**
   * @hidden
   */
  export const userAgentInfo: {
    getBrowser(): Browser;
    getOS(): OS;
    getEngine(): Engine;
    getDevice(): Device;
    getCPU(): CPU;
    getUA(): string;
    setUA(uastring: string): void;
  } = new UAParser(navigator.userAgent);

  /**
   * @hidden
   */
  export const canvas: HTMLCanvasElement = document.createElement("canvas");

  /**
   * @returns The built [[BrowserCompatibility]] object representing the current OS/Browser's support for features.
   */
  export function checkBrowserCompatibility(): BrowserCompatibility {
    function objectHasPropertyWithType(object: object, propertyNames: string[], propertyType: string): boolean {
      // tslint:disable-next-line:no-any
      const objectProperty: any = (<any>object)[propertyNames[0]];
      if (objectProperty == null) {
        return false;
      }
      if (propertyNames.length === 1) {
        return typeof objectProperty === propertyType;
      } else {
        return (
          (typeof objectProperty === "function" || typeof objectProperty === "object") &&
          objectHasPropertyWithType(objectProperty, propertyNames.slice(1), propertyType)
        );
      }
    }

    function isBrokenWebAssemblyOS(os: OS): boolean {
      return false;
    }

    let fullSupport: boolean = true;
    let scannerSupport: boolean = true;
    const missingFeatures: BrowserCompatibility.Feature[] = [];

    if (
      !objectHasPropertyWithType(navigator, ["mediaDevices", "getUserMedia"], "function") &&
      !objectHasPropertyWithType(navigator, ["enumerateDevices"], "function") &&
      !objectHasPropertyWithType(window, ["MediaStreamTrack", "getSources"], "function")
    ) {
      missingFeatures.push(BrowserCompatibility.Feature.MEDIA_DEVICES);
      fullSupport = false;
    }

    if (!objectHasPropertyWithType(window, ["Worker"], "function")) {
      missingFeatures.push(BrowserCompatibility.Feature.WEB_WORKERS);
      fullSupport = scannerSupport = false;
    }

    if (!objectHasPropertyWithType(window, ["WebAssembly"], "object")) {
      missingFeatures.push(BrowserCompatibility.Feature.WEB_ASSEMBLY);
      fullSupport = scannerSupport = false;
    }

    if (!objectHasPropertyWithType(window, ["Blob"], "function")) {
      missingFeatures.push(BrowserCompatibility.Feature.BLOB);
      fullSupport = scannerSupport = false;
    }

    if (!objectHasPropertyWithType(window, ["URL", "createObjectURL"], "function")) {
      missingFeatures.push(BrowserCompatibility.Feature.URL_OBJECT);
      fullSupport = scannerSupport = false;
    }

    if (!objectHasPropertyWithType(window, ["OffscreenCanvas"], "function")) {
      missingFeatures.push(BrowserCompatibility.Feature.OFFSCREEN_CANVAS);
    }

    try {
      if (
        !objectHasPropertyWithType(window, ["WebGLRenderingContext"], "function") ||
        (canvas.getContext("webgl") == null && canvas.getContext("experimental-webgl") == null)
      ) {
        throw new Error();
      }
    } catch {
      missingFeatures.push(BrowserCompatibility.Feature.WEBGL);
    }

    const userAgentOS: OS = { name: 'Android', version: '12' };

    return {
      fullSupport,
      scannerSupport,
      missingFeatures
    };
  }

  /**
   * @hidden
   *
   * Get a device id for the current browser, when available it's retrieved from a cookie,
   * when not it's randomly generated and stored in a cookie to be retrieved by later calls.
   *
   * @returns The device id for the current browser.
   */
  export function getDeviceId(): string {
    return 'asdsadsadasd';
  }

  /**
   * @hidden
   *
   * Check if a given object is a valid HTMLElement
   *
   * @param object The object to check.
   * @returns Whether the given object is a valid HTMLElement.
   */
  // tslint:disable-next-line:no-any
  export function isValidHTMLElement(object: any): boolean {
    return (
      object instanceof HTMLElement ||
      (object != null && typeof object === "object" && typeof object.tagName === "string")
    );
  }
}