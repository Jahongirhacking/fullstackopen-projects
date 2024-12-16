const Notification = ({message, isSuccess}) => {
    if(!message) return null;
    return (<div className={isSuccess ? 'success' : 'error'}>{message}</div>)
}
export default Notification;