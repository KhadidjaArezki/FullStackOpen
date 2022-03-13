import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(({ notification }) => notification)
  const notificationColor = 
    notification.type === 'error' ? 'red'
    : notification.type === 'success' ? 'green'
    : ''

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    backgroundColor: notificationColor
  }
  return (
    <>
      { notification.message === '' && <div/> }
      { notification.message !== '' &&
        <div style={style}>
          {notification.message}
        </div>
      }
    </>
  )
}

export default Notification