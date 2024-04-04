import { notificationStore } from '../stores/notifications';

const baseApiUrl = import.meta.env.VITE_REPORT_API;

const fetcher: typeof fetch = async (path, init) => {
  const response = await fetch(`${baseApiUrl}${path}`, init);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response;
};

export const sendTrackCapabilities = async (capabilities: MediaTrackCapabilitiesExtended) => {
  try {
    const response = await fetcher(`/log`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        device: localStorage.getItem('deviceAlias'),
        event: 'trackCapabilities',
      } as any,
      body: JSON.stringify(capabilities),
    });
    return response;
  } catch (error: any) {
    console.error(error);
    notificationStore.addNotification({
      text: `sendTrackCapabilities failed, ` + error.message,
      type: 'error',
    });
  }
};

export const sendTrackSettings = async (trackSettings: MediaTrackSettings) => {
  try {
    const response = await fetcher(`/log`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        device: localStorage.getItem('deviceAlias'),
        event: 'trackSettings',
      } as any,
      body: JSON.stringify(trackSettings),
    });
    return response;
  } catch (error: any) {
    console.error(error);
    notificationStore.addNotification({
      text: `sendTrackSettings failed, ` + error.message,
      type: 'error',
    });
  }
};

export const sendGenericEvent = async (event: string, data: any) => {
  try {
    const response = await fetcher(`/log`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        device: localStorage.getItem('deviceAlias'),
        event,
      } as any,
      body: JSON.stringify(data),
    });
    return response;
  } catch (error: any) {
    console.error(error);
    notificationStore.addNotification({
      text: `Send ${event} event failed, ` + error.message,
      type: 'error',
    });
  }
}

export const sendPhoto = async (photoFile: Blob) => {
  const formData = new FormData();
  formData.append('photo', photoFile);
  try {
    const response = await fetcher(`/upload`, {
      method: 'POST',
      body: formData,
      headers: {
        device: localStorage.getItem('deviceAlias'),
        event: 'trackSettings',
      } as any,
    });
  } catch (error: any) {
    console.error(error);
    notificationStore.addNotification({
      text: `sendPhoto failed, ` + error.message,
      type: 'error',
    });
  }
};
