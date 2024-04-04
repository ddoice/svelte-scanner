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
  const modes = ['grabFrame', 'videoCapture', 'processor'];
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

    if(mode === 'processor') {
      // // @ts-ignore
      // const trackProcessor = new MediaStreamTrackProcessor({ track });
      // // @ts-ignore
      // const trackGenerator = new MediaStreamTrackGenerator({ kind: "video" });

    //   const transformer = new TransformStream({
    //     async transform(videoFrame, controller) {
    //       if (videoFrame.format === "I420") {
    //   // Calculate the total size required for the frame
    //   let totalSize = videoFrame.codedWidth * videoFrame.codedHeight * 3 / 2; // YUV420 format (1.5 bytes per pixel)

    //   // Check if the buffer size matches the required size
    //   if (videoFrame.buffer.byteLength < totalSize) {
    //     console.error("Buffer size is not large enough for the I420 format.");
    //     return;
    //   }

    //   // create a buffer to store the frame data
    //   let buffer = new Uint8Array(totalSize);

    //   // copy the frame to the buffer
    //   let layout = await videoFrame.copyTo(buffer);

    //   // Convert I420 to grayscale by only keeping the Y component and zeroing out U and V components
    //   for (let i = videoFrame.codedWidth * videoFrame.codedHeight, l = buffer.length; i < l; i++ ) {
    //     buffer[i] = 0; // Set U and V components to 0
    //   }

    //   // generate a new frame using the contents of the buffer and the settings from the original frame
    //   let greyFrame = new VideoFrame(buffer, {
    //     format: videoFrame.format,
    //     codedWidth: videoFrame.codedWidth,
    //     codedHeight: videoFrame.codedHeight,
    //     timestamp: videoFrame.timestamp,
    //     colorSpace: videoFrame.colorSpace
    //   });

    //   // close the original frame since it is no longer needed
    //   videoFrame.close();

    //   // add the newly transformed frame to the queue for the stream
    //   controller.enqueue(greyFrame);
    //       } else if (videoFrame.format === "NV12") {
    //         // create a buffer to store the frame data
    //         let buffer = new Uint8Array(videoFrame.allocationSize());
    //         // copy the frame to the buffer
    //         let layout = await videoFrame.copyTo(buffer);
    //         // Remove the UV data (makes it green.);
    //         for (var i = videoFrame.codedWidth * videoFrame.codedHeight, l = buffer.length; i < l; i++ ) {
    //           buffer[i] = 0;
    //         }
    //         // generate a new frame using the contents of the buffer and the settings from the original frame
    //         let greyFrame = new VideoFrame(buffer, {
    //           format: videoFrame.format,
    //           codedWidth: videoFrame.codedWidth,
    //           codedHeight: videoFrame.codedHeight,
    //           timestamp: videoFrame.timestamp,
    //           colorSpace: videoFrame.colorSpace
    //         });
    //         // close the original frame since it is no longer needed
    //         videoFrame.close();
    //         //add the newly transformed frame to the queue for the stream
    //         controller.enqueue(videoFrame);
    //       } else {
    //         console.error("I didn't handle this color format.");
    //         controller.enqueue(videoFrame);
    //       }
    //     }
    //   });

    //   // const transformer = new TransformStream({
    //   //   async transform(videoFrame, controller) {
    //   //     console.log('videoFrame', videoFrame);
    //   //     controller.enqueue(videoFrame);
    //   //   },
    //   // });      
      
    //   trackProcessor.readable
    //     .pipeThrough(transformer)
    //     .pipeTo(trackGenerator.writable);

    //   const streamAfter = new MediaStream([trackGenerator]);
    //   video.srcObject = streamAfter;
      
     }
  }

  async function getSource() {
    if (mode === 'grabFrame') return imageCapture.grabFrame();
    if (mode === 'videoCapture') return video;
    if (mode === 'processor') return video;
    //if(mode === 'processor') return await processFrame();
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
    return barcodeDetector.detect(source);
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
    // if(mode === 'processor') {
    //   return;
    // }
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
