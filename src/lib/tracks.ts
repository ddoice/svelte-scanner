import { sendTrackCapabilities, sendTrackSettings } from "./api";

export interface InitTrack {
  capabilities: MediaTrackCapabilitiesExtended;
  canAutoFocus: () => boolean;
  getFocusDistance: () => FocusDistance | undefined;
  setFocusMode: (focusMode: FocusMode) => Promise<void>;
  setFocusDistance: (newFocusDistance: number) => Promise<void>;
  setTorch: (torch: boolean) => void;
  settings: MediaTrackSettings;
  getSettings: () => MediaTrackSettings;
  setZoom: (zoom: number) => Promise<void>;
  setFocusDistancePct: (focus : number) => Promise<number|undefined>;
}

export const initTrack = (track: MediaStreamTrack): InitTrack => {

  const capabilities = track.getCapabilities() as MediaTrackCapabilitiesExtended;
  const settings = track.getSettings();

  sendTrackCapabilities(capabilities);
  sendTrackSettings(settings);

  const canAutoFocus = () => {
    const canSetFocus = capabilities.focusDistance && capabilities.focusMode && capabilities?.focusMode.includes('manual');
    return (canSetFocus || false);
  };
  
  const getFocusDistance = () => {
    const { focusDistance } = capabilities;
    if (focusDistance) {
      const totalSteps = (focusDistance.max - focusDistance.min) / focusDistance.step;
    }
    return focusDistance;
  };
  
  const setFocusMode = (
    focusMode: FocusMode
  ) => (track as any).applyConstraints({
    advanced: [{ focusMode }],
  });

  const setZoom = (
    zoom: number
  ) => (track as any).applyConstraints({
    advanced: [{ zoom }],
  });
  
  const setFocusDistance = (
    newFocusDistance : number,
  ) => (track as any).applyConstraints({
    advanced: [
      {
        focusMode: 'manual',
        focusDistance: newFocusDistance,
      },
    ],
  });

  const setFocusDistancePct = async (
    focus : number,
  ) => {
    const { focusDistance } = capabilities;
    if(!focusDistance) {
      alert('Focus distance not supported');
      return;
    }
    const range = (focusDistance.max - focusDistance.min) / 100
    const newFocusDistance = focusDistance.min + (range * focus);
    try {
      await (track as any).applyConstraints({
      advanced: [
        {
          focusMode: 'manual',
          focusDistance: newFocusDistance,
        },
      ],
    });
    } catch (error:any) {
      alert(error.message);
      console.error(error);
    }
  return newFocusDistance;
}

  const setTorch = (torch: boolean) => {
    if(!capabilities.torch) return;
    (track as any).applyConstraints({ advanced: [{ torch }] });
  }

  const getSettings = () => track.getSettings();

  return {
    capabilities,
    canAutoFocus,
    getFocusDistance,
    getSettings,
    setFocusMode,
    setFocusDistance,
    setTorch,
    settings,
    setFocusDistancePct,
    setZoom,
  }
}

