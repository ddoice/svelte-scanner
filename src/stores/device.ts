import { writable } from 'svelte/store';

const storageKey = 'deviceAlias';

export const createDeviceStore = () => {
  const { subscribe, set } = writable(localStorage.getItem(storageKey));

  return {
    subscribe,
    ask: () => {
      if (localStorage.getItem(storageKey)) return;
      let alias = prompt("Please input your device alias", "device");
      if(alias) {
        localStorage.setItem(storageKey, alias)
        set(alias);
      } else {
        alert('You must provide a device alias');
      }
    },
  };
};

export const deviceStore = createDeviceStore();