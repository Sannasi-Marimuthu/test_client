import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

const ToastNotification = ({ text, show, isError, setShow }) => {
  return (
    <ToastContainer
      position="top-end"
      className="p-3 text-center w-auto"
      style={{ zIndex: 1 }}
    >
      <Toast
        animation={true}
        bg={isError ? "danger" : "success"}
        onClose={() => setShow(false)}
        show={show}
        delay={4000}
        autohide={true}
      >
        <Toast.Body as='div' className="text-light mr-auto">{text}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
};

export default ToastNotification;
