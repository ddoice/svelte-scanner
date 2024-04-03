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
  }
}

