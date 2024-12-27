const Notification = ({ isSuccess, message }) => {
  if (!message) return null;
  return <div className={isSuccess ? "success" : "error"}>{message}</div>;
};

export default Notification;
