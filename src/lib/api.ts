import { notificationStore } from '../stores/notifications';

const baseApiUrl = import.meta.env.VITE_REPORT_API;

export const sendTrackCapabilities = async (capabilities: MediaTrackCapabilitiesExtended) => {
  const response = await fetch(`${baseApiUrl}/log`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      device: localStorage.getItem("deviceAlias"),
    } as any,
    body: JSON.stringify(capabilities),
  }).catch((error) => {
    console.error(error);
    notificationStore.addNotification({
      text: `sendTrackCapabilities failed, ` + error.message,
      type: 'error',
    });
  });
  return response;
}

export const sendTrackSettings = async (trackSettings: MediaTrackSettings) => {
  const response = await fetch(`${baseApiUrl}/log`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      device: localStorage.getItem("deviceAlias"),
    } as any,
    body: JSON.stringify(trackSettings),
  }).catch((error) => {
    console.error(error);
    notificationStore.addNotification({
      text: 'sendTrackSettings failed, ' + error.message,
      type: 'error',
    });
  });
  return response;
}