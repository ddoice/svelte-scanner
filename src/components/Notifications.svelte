<script lang="ts">
  import { notificationStore } from '../stores/notifications';
</script>

<div id="notifications-container">
  {#each $notificationStore as notification}
    <div class={`notification ${notification.type}`}>
      <div>{notification.text}</div>
      <button on:click={() => notificationStore.closeNotification(notification.id)}>X</button>
    </div>
  {/each}
</div>

<style>
  #notifications-container {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 1000;
    display: flex;
    flex-direction: column;
    align-items: flex-end;
    padding: 1rem;
    gap: 8px;
  }

  .notification {
    min-width: 300px;
    padding: 1rem;
    border-radius: 4px;
    color: white;
    font-weight: bold;
    display: flex;
    justify-content: space-between;
    gap: 1rem;
    align-items: center;
    background-color: #292d3e;
  }

  .notification.error {
    background-color: #ffeaea;
    color: red;
  }

  .notification.success {
    background-color: #eaffea;
    color: green;
  }

  button {
    background: transparent;
    padding: 0;
    margin: 0;
    font-family: monospace;
  }
</style>
