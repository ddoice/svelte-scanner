<script lang="ts">
  import { onMount } from 'svelte';
  import { initTrack } from '../lib/tracks';

  import type { InitTrack } from '../lib/tracks';
  import { createDetectorStore } from '../stores/detector';

  type FacingMode = 'environment' | 'user';

  let value = 0;
  let newZoom: number | undefined;
  let facingMode: FacingMode = 'environment';
  let torch = false;

  async function handleOnChange(event: any) {
    console.log(event.target.value);
    value = event.target.value;
    const zoom = await tracks?.setFocusDistancePct(value);
    newZoom = zoom || undefined;
  }

  async function handleToggleTorch() {
    torch = !torch;
    await tracks?.setTorch(torch);
  }

  const getStream = () =>
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode,
        aspectRatio: { exact: 1.7777777778 },
        //width: { ideal: 1080 },
        //width: { ideal: 960 },
        //width: { ideal: 960 },
        //height: { ideal: 1280 },
      },
      audio: false,
    });

  let debugVisible = false;
  let video: HTMLVideoElement;
  let stream;
  let track:any;
  let tracks: InitTrack;
  let detectorStore = createDetectorStore();

  const focusModes = ['continuous', 'manual'] as FocusMode[];
  let focusMode = 'continuous' as FocusMode;

  const initDetection = async () => {
    try {
      track?.stop();
      detectorStore?.stop();
      stream = await getStream();
      track = stream.getVideoTracks()[0];
      video.srcObject = stream;
      tracks = initTrack(track);
      detectorStore.init(video, track, video.width, video.height);
      detectorStore.start();
    } catch (error) {
      console.log('error', error);
      alert('Could not access the camera');
    }
  };

  const toggleFocusMode = async () => {
    const nextMode = focusModes[focusModes.indexOf(focusMode) + 1] || focusModes[0];
    try {
      await tracks.setFocusMode(focusMode);
      focusMode = nextMode;
    } catch (error) {
      alert('Could not set focus mode');
    }
  };

  const toggleFacingMode = async () => {
    facingMode = facingMode === 'environment' ? 'user' : 'environment';
    await initDetection();
  };

  onMount(() => {
    (async ()=>{
      await initDetection();
    })();    
    return () => detectorStore?.stop();
  });

  let settings: any;
  let nada;
  $: {
    nada = $detectorStore?.scanCount;
    settings = tracks?.getSettings();
  }
</script>

<div class="stats">
  <div>Scan count: {$detectorStore.scanCount}</div>
  <div>Average: {$detectorStore.average.toFixed(2)}</div>
  <div>Fail: {$detectorStore.fail}</div>
  <div>Success: {$detectorStore.success}</div>
  <div>exposureTime: {settings?.exposureTime}</div>
  <div>Contrast {settings?.contrast}</div>
  <div>exposureMode: {settings?.exposureMode}</div>
  <div>height: {settings?.height}</div>
  <div>width: {settings?.width}</div>
  <div>resizeMode: {settings?.resizeMode}</div>
  <div>saturation: {settings?.saturation}</div>
  <div>sharpness: {settings?.sharpness}</div>
</div>

<video autoPlay id="stream" bind:this={video}> </video>
<div class="overlay"></div>

<div id="focus">
  <div class="focus__group">
    <button on:click={toggleFocusMode}><img src={`public/${focusMode}-focus.svg`} /></button>
    {focusMode}
  </div>

  <div class="focus__group grow">
    <input
      disabled={focusMode === 'continuous'}
      id="zoom__range"
      type="range"
      min="0"
      max="100"
      bind:value
      on:change={handleOnChange}
    />
    <div class="focus__range">
      <span>{tracks?.capabilities?.focusDistance?.min.toFixed(2)}</span>
      <span>{newZoom ? newZoom.toFixed(2) : '-'}</span>
      <span>{tracks?.capabilities?.focusDistance?.max.toFixed(2)}</span>
    </div>
  </div>

  <div class="focus__group">
    <button on:click={toggleFacingMode}><img src={`public/${facingMode}-facingMode.svg`} /></button>
    {facingMode}
  </div>
</div>

<div id="toggles">
  <div class="focus__group">
    <button 
    disabled={!tracks || !tracks.capabilities.torch}
    on:click={handleToggleTorch}><img src={`public/torch-${torch ? 'on' : 'off'}.svg`} /></button>
  </div>
  <div class="build">build {import.meta.env.VITE_BUILD_DATE}</div>
  <div class="focus__group">
    {$detectorStore?.mode}
    <button 
    on:click={detectorStore?.toggleMode}><img src={`public/mode-${$detectorStore?.mode}.svg`} /></button>
  </div>
</div>

<!-- {#if debugVisible}
  <pre>
    {JSON.stringify(tracks.capabilities, null, 2)}
    {JSON.stringify(tracks.settings, null, 2)}
  </pre>
{/if}

<button on:click={() => (debugVisible = !debugVisible)}>Toggle</button> -->

<style>
  video {
    width: 100vw;
    height: 100%;
    background: black;    
  }

  .overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1;
    /*clip-path: polygon(0% 0%, 0% 100%, 25% 100%, 25% 25%, 75% 25%, 75% 75%, 25% 75%, 25% 100%, 100% 100%, 100% 0%);*/
    clip-path: polygon(
      0 0, /* top left corner */
    0 100%, /* bottom left corner */
    calc(50% - 100px) 100%, /* bottom left edge of the hole */
    calc(50% - 100px) calc(50% - 300px), /* top left edge of the hole */
    calc(50% + 100px) calc(50% - 300px), /* top right edge of the hole */
    calc(50% + 100px) calc(50% + 300px), /* bottom right edge of the hole */
    calc(50% - 100px) calc(50% + 300px), /* bottom left edge of the hole */
    calc(50% - 100px) 100%, /* bottom left corner */
    100% 100%, /* bottom right corner */
    100% 0 /* top right corner */
    );
  }  
  pre {
    text-align: left;
    font-family: monospace;
  }

  .stats {
    opacity: 0.5;
    font-size: 12px;
    position: absolute;
    bottom: 80px;
    right: 0;
    background: rgba(0, 0, 0, 0.2);
    color: white;
    padding: 0.5rem;
    display: flex;
    justify-content: center;
    text-align: right;
    flex-direction: column;
  }
  

  #focus {
    z-index: 2;
    font-size: 12px;
    position: absolute;
    top: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.2);
    color: white;
    padding: 8px;

    display: flex;
    flex-direction: row;
    width: calc(100% - 16px);
  }

  #toggles {
    z-index: 2;
    font-size: 12px;
    position: absolute;
    bottom: 0;
    left: 0;
    background: rgba(0, 0, 0, 0.2);
    color: white;
    padding: 8px;
    display: flex;
    flex-direction: row;
    width: calc(100% - 16px);
    justify-content: space-between;
    align-items: flex-end;
  }

  .build {
    opacity: 0.5;
  }

  .focus__group {
    display: flex;
    justify-content: center;
    text-align: center;
    flex-direction: column;
  }

  .focus__group img {
    width: 32px;
  }

  .focus__group.grow {
    flex-grow: 1;
  }

  .focus__group button {
    background: white;
    height: 50px;
  }

  #zoom__range {
    flex-grow: 1;
    margin: 0 16px;
    height: 50px;
  }

  .focus__range {
    flex-grow: 1;
    display: flex;
    justify-content: space-between;
    padding: 0 16px;
  }
</style>
