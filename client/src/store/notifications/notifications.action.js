import { NOTIFICATIONS_ACTION_TYPES } from './notifications.types';
import { createAction } from '../../ustils/reducer/reducer.utils';

export const setNotifications = (notification) => {
    return createAction(NOTIFICATIONS_ACTION_TYPES.SET_NOTIFICATIONS, notification)
}