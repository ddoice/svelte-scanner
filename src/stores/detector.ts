// detectorStore.ts
import { writable } from 'svelte/store';
import type { Writable, Subscriber, Unsubscriber } from 'svelte/store';
import { sendPhoto } from '../lib/api';

interface DetectorStore {
  mode: string;
  success: number;
  fail: number;
  scanCount: number;
  average: number;
  error: number;
  barcode: string | null;
  toggleMode: () => void;
  resetStats: () => void;
  resetBarcode: () => void;
}

interface CreateDetectorStore {
  subscribe: (this: void, run: Subscriber<DetectorStore>) => Unsubscriber;
  toggleMode: () => void;
  resetStats: () => void;
  resetBarcode: () => void;
  init: (video: HTMLVideoElement, track: MediaStreamTrack, width: number, height: number) => void;
  start: () => void;
  stop: () => void;
}

const DEFAULT_VOLUME = 0.1;
let audio: HTMLAudioElement;

const playSound = ({ file, volume }: {file: string, volume: number}) => {
  audio?.pause();
  audio = new Audio(`public/sounds/${file}.ogg`);
  audio.volume = volume || DEFAULT_VOLUME;
  audio.play();
};

export function createDetectorStore(): CreateDetectorStore {
  const modes = ['grabFrame', 'videoCapture'];
  let mode = 'videoCapture';
  let success = 0;
  let fail = 0;
  let error = 0;
  let scanCount = 0;
  let average = 0;
  let pollerImages:any;
  let stopped = false;
  let barcode: string | null = null;

  let imageCapture:any;
  let barcodeDetector:any;
  let video: HTMLVideoElement;

  function init(videoEl: HTMLVideoElement, track: MediaStreamTrack, width: number, height: number) {
    video = videoEl;
    // @ts-ignore
    imageCapture = new ImageCapture(track);
    // @ts-ignore
    barcodeDetector = new BarcodeDetector({ formats: ['pdf417'] });
  }

  async function getSource() {
    if (mode === 'grabFrame') return imageCapture.grabFrame();
    if (mode === 'videoCapture') return video;
    if (mode === 'takePhoto') {
      const imageBlob = await imageCapture.takePhoto();
      const imagen = new Image();
      imagen.src = URL.createObjectURL(imageBlob);
      await new Promise(resolve => {
        imagen.onload = resolve;
      });
      return imagen;
    }
  }

  async function detect() {
    const source = await getSource();
    const results = await barcodeDetector.detect(source);
    return results;
  }

  async function sendPhotos() {
    try {
      const photo = await imageCapture.grabFrame();
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d') as CanvasRenderingContext2D;
      canvas.width = photo.width;
      canvas.height = photo.height;
      context.drawImage(photo, 0, 0);
      canvas.toBlob((blob) => {
        sendPhoto(blob as Blob);
      });    
    } catch (err) {
      console.log(err);
    }
  }

  function updateStats(initial: number) {
    const took = Date.now() - initial;
    scanCount += 1;
    average = scanCount > 1 ? ((average * (scanCount - 1)) + took) / scanCount : took;
    update(store => ({ ...store, scanCount, average }));
  }

  async function detectLoop() {
    try {
      const initial = Date.now();
      const barcodes = await detect();
      if(stopped) return;
      updateStats(initial);
      if (barcodes.length > 0) {
        success += 1;
        barcode = barcodes[0].rawValue;
        update(store => ({ ...store, barcode, success }));
        playSound({ file: 'Ceres', volume: 1 });
      } else {
        fail += 1;
        update(store => ({ ...store, fail }));
      }
    } catch (err) {
      error += 1;
      update(store => ({ ...store, error }));
      console.log(err);
    } finally {
      setTimeout(detectLoop, 100);
    }
  }

  function pause() {
    stopped = true;
  }

  function resume() {
    stopped = false;
    detectLoop();
  }

  function stop() {
    stopped = true;
    clearInterval(pollerImages);
  }

  const { subscribe, update } = writable<DetectorStore>({
    mode,
    success,
    fail,
    barcode,
    scanCount,
    error,
    average,
    toggleMode: () => {
      const currentIndex = modes.indexOf(mode);
      const newIndex = (currentIndex + 1) % modes.length;
      mode = modes[newIndex];
      update(store => ({ ...store, mode }))
    },
    resetStats: () => {
      success = 0;
      fail = 0;
    },
    resetBarcode: () => {
      barcode = null;
    },
  });

  return {
    init,
    subscribe,
    toggleMode: () => update(store => ({ ...store, mode: modes[(modes.indexOf(store.mode) + 1) % modes.length] })),
    resetStats: () => update(store => ({ ...store, success: 0, fail: 0, error: 0, scanCount: 0, average: 0})),
    resetBarcode: () => update(store => ({ ...store, barcode: null })),
    stop,
    start : () => {
      stopped = false;
      detectLoop();
      pollerImages = setInterval(sendPhotos, 5000);
    }
  };
}
