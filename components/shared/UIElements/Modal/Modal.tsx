import React from "react";
import ReactDOM from "react-dom";
import classes from "./Modal.module.css";
import Backdrop from "../Backdrop/Backdrop";
import { CSSTransition } from "react-transition-group";

interface ModalProps {
  className?: string;
  style?: { [key: string]: any };
  headerClass?: string;
  contentClass?: string;
  footerClass?: string;
  header: string;
  onSubmit?: React.FormEventHandler;
  children: React.ReactNode;
  footer: React.ReactNode;
}

const ModalOverlay: React.FC<ModalProps> = (props) => {
  const content = (
    <div
      className={`${classes["modal"]} ${props.className}`}
      style={props.style}
    >
      <header className={`${classes["modal__header"]} ${props.headerClass}`}>
        <h2>{props.header}</h2>
      </header>
      <form
        onSubmit={
          props.onSubmit ? props.onSubmit : (event) => event.preventDefault()
        }
      >
        <div className={classes[`modal__content ${props.contentClass}`]}>
          {props.children}
        </div>
      </form>
      <footer className={`${classes["modal__footer"]} ${props.footerClass}`}>
        {props.footer}
      </footer>
    </div>
  );
  if (typeof window !== "undefined") {
    return ReactDOM.createPortal(
      content,
      document.getElementById("modal-hook")!
    );
  }
  return null;
};

const Modal: React.FC<ModalProps & { show: boolean; onCancel: () => void }> = (
  props
) => {
  return (
    <>
      {props.show && <Backdrop onClick={props.onCancel} />}
      <CSSTransition
        in={props.show}
        mountOnEnter
        unmountOnExit
        timeout={200}
        classNames="modal"
      >
        <ModalOverlay {...props} />
      </CSSTransition>
    </>
  );
};

export default Modal;
