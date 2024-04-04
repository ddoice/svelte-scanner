<script lang="ts">  
  import Notifications from './components/Notifications.svelte'
  import Scanner from './components/Scanner.svelte'
  import { deviceStore } from './stores/device';
  // @ts-ignore
  const supported = typeof BarcodeDetector !== 'undefined';
  deviceStore.ask();
</script>

<svelte:head>
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0" />
</svelte:head>

<Notifications></Notifications>

<main>
  {#if !supported}
    <h1>BarcodeDetector not supported.</h1>
  {/if}
</main>

{#if $deviceStore}
  <Scanner></Scanner>
{:else}
  <h1>Waiting for device alias...</h1>
{/if}

<style>

</style>
