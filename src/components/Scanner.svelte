<script lang="ts">
  import { onMount } from 'svelte';
  import { initTrack } from '../lib/tracks';

  import type { InitTrack } from '../lib/tracks';
  import { createDetectorStore } from '../stores/detector';
  const getStream = () =>
    navigator.mediaDevices.getUserMedia({
      video: {
        facingMode: 'environment',
        //width: { ideal: 960 },
        width: { ideal: 960 },
        height: { ideal: 1280 }
      },
      audio: false,
    });

  let debugVisible = false;
  let video: HTMLVideoElement;
  let stream;
  let track;
  let tracks: InitTrack;
  let detectorStore = createDetectorStore();
  onMount(() => {
    (async () => {
      try {
        stream = await getStream();
        video.srcObject = stream;
        track = stream.getVideoTracks()[0];
        tracks = initTrack(track);
        //tracks.setZoom(2);
        detectorStore.init(video, track, video.width, video.height);
        detectorStore.start();
      } catch (error) {
        console.log('error', error);
        alert('Could not access the camera');
      }
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
</style>
