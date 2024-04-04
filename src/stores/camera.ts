import type { Subscriber, Unsubscriber } from 'svelte/store';
import { writable } from 'svelte/store';
import { sendGenericEvent } from '../lib/api';

async function hashCapabilities(capabilities: MediaTrackCapabilities) {
  const { _deviceId, groupId, ...rest } = capabilities as any;
  const msgBuffer = new TextEncoder().encode(JSON.stringify(rest));
  const hashBuffer = await crypto.subtle.digest('SHA-256', msgBuffer);
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((b) => b.toString(16).padStart(2, '0')).join('');
  return hashHex;
}

function getCameraMpix (capabilities: MediaTrackCapabilities) {
  const resolution = (capabilities?.width?.max || 0) * (capabilities?.height?.max || 0);
  return `${(resolution / 1000000).toFixed(2)} Mpix`;
}

interface ValidCamera {
    camera: MediaDeviceInfo;
    constraints: MediaTrackConstraints;
    capabilities: MediaTrackCapabilities;
    hash: string;
};

const getAvailableCameras = async (): Promise<ValidCamera[]> => {
  const devices = await navigator.mediaDevices.enumerateDevices();
  const cameras = devices.filter(({ kind }) => kind === 'videoinput');
  sendGenericEvent('cameras', cameras);
  let validCameras = [];
  for await (const camera of cameras) {
    const deviceId = camera.deviceId;
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          deviceId: { exact: deviceId },
          facingMode: { exact: 'environment' },
        },
        audio: false,
      });
      const track = stream.getTracks()[0];
      const constraints = track.getConstraints();
      const capabilities = track.getCapabilities();
      stream.getTracks().forEach((track) => track.stop());
      if (deviceId === capabilities.deviceId) {
        validCameras.push({
          camera,
          constraints,
          capabilities,
          hash: await hashCapabilities(capabilities) 
        });
      }
    } catch (error) {
      console.log(error);
    }
  }
  sendGenericEvent('validCameras', validCameras);
  //return validCameras.length === 1 ? [validCameras[0], validCameras[0]]: validCameras
  return validCameras;
};

interface CameraSelect {
  value: string;
  label: string;
}

interface CameraStore {
  cameras: CameraSelect[];
  selected: string | undefined;
}

interface CreateCameraStore {
  subscribe: (this: void, run: Subscriber<CameraStore>) => Unsubscriber;
  updateCameras: () => void;
  setActiveCamera: (hash: string) => void;
  getAvailableCameras: () => Promise<ValidCamera[]>;
}

export const createCameraStore = (): CreateCameraStore => {
  const { subscribe, update } = writable<CameraStore>({
    cameras: [],
    selected: undefined,
  });

  return {
    subscribe,
    getAvailableCameras,
    updateCameras: async () => {
      const availableCameras = await getAvailableCameras();
      const cameras = availableCameras.map(({ capabilities, hash }) => ({
        value: hash,
        label: getCameraMpix(capabilities),
      }));
      console.log('cameras', cameras);
      update((store) => ({ ...store, cameras }));
    },
    setActiveCamera: (hash: string) => {
      update((store) => ({ ...store, selected: hash }));
    },
  };
};

