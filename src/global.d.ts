type FocusMode = 'single-shot' | 'manual' | 'continuous';

interface FocusDistance {
  max: number;
  min: number;
  step: number;
}

interface MediaTrackCapabilitiesExtended extends MediaTrackCapabilities {
  torch?: boolean;
  focusDistance ?: FocusDistance
  focusMode ?: FocusMode[];
}
