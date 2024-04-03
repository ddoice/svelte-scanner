<script lang="ts">
  import { onMount } from 'svelte';
  import { initTrack } from '../lib/tracks';

  import type { InitTrack } from '../lib/tracks';
  import { createDetectorStore } from '../stores/detector';

  type FacingMode = 'environment' | 'user';

  let value = 0;
  let newZoom: number | undefined;
  let facingMode: FacingMode = 'environment';

  async function handleOnChange(event: any) {
    console.log(event.target.value);
    value = event.target.value;
    const zoom = await tracks?.setFocusDistancePct(value);
    newZoom = zoom || undefined;
  }

  const getStream = () =>
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode,
        //width: { ideal: 960 },
        width: { ideal: 960 },
        height: { ideal: 1280 },
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
      video.srcObject = stream;
      track = stream.getVideoTracks()[0];
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
</script>

<div class="stats">
  <div>Scan count: {$detectorStore.scanCount}</div>
  <div>Average: {$detectorStore.average.toFixed(2)}</div>
  <div>Fail: {$detectorStore.fail}</div>
  <div>Success: {$detectorStore.success}</div>
</div>

<video autoPlay id="stream" bind:this={video}> </video>

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
  pre {
    text-align: left;
    font-family: monospace;
  }

  .stats {
    font-size: 13px;
    position: absolute;
    bottom: 0;
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
