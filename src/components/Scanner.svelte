<script lang="ts">
  import { onMount } from 'svelte';
  import { initTrack } from '../lib/tracks';

  import type { InitTrack } from '../lib/tracks';
  const getStream = () => 
    navigator.mediaDevices.getUserMedia({
			video: {
				facingMode: 'environment',
        width: { ideal: 960 },
        //height: { ideal: 1280 }
			},
      audio: false,
		})

  let debugVisible = false;
  let video: HTMLVideoElement;
  let stream;
  let track;  
  let tracks: InitTrack;
  onMount(async () => {
    try {
      stream = await getStream();
      video.srcObject = stream;
      track = stream.getVideoTracks()[0];
      tracks = initTrack(track);
    } catch (error) {
      console.log('error', error);
      alert('Could not access the camera');
    }
  });
</script>

<video autoPlay id="stream" bind:this={video} >
</video>
{#if debugVisible}
  <pre>
    {JSON.stringify(tracks.capabilities, null, 2)}
    {JSON.stringify(tracks.settings, null, 2)}
  </pre>
{/if}

<button on:click={() => (debugVisible = !debugVisible)}>Toggle</button>
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
</style>
