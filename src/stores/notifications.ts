import { writable } from 'svelte/store';
import type { Writable, Subscriber, Unsubscriber } from 'svelte/store';

type Notification = {
  id: number;
  text: string;
  type: 'error' | 'success';
};

type NewNotification = Pick<Notification, 'text'|'type'>

let notificationId = 0;
const notificationsTimeout = 5000000000;

interface NotificationStore {
  subscribe: (this: void, run: Subscriber<Notification[]>) => Unsubscriber;
  addNotification: (notification: NewNotification) => void;
  closeNotification: (id: number) => void;
}

export function createNotificationStore(): NotificationStore {
  const { subscribe, update }: Writable<Notification[]> = writable([]);

  function addNotification(notification: NewNotification): void {
    notificationId +=1 ;
    const id = notificationId;
    const newNotification = {
      ...notification,
      id,
    }
    update((notifications: Notification[]) => [...notifications, newNotification]);

    setTimeout(() => {
      closeNotification(id);
    }, notificationsTimeout);
  }

  function closeNotification(id: number): void {
    update((notifications: Notification[]) => notifications.filter(n => n.id !== id));
  }

  return {
    subscribe,
    addNotification,
    closeNotification,
  };
}

export const notificationStore: NotificationStore = createNotificationStore();
