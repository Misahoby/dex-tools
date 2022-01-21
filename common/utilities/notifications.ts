import { notification } from 'antd'

type NotificationTypes = 'success' | 'info' | 'warning' | 'error'

export const openNotificationWithIcon = (type: NotificationTypes, title: string, description: string): void => {
  notification[type]({ message: title, description })
}
