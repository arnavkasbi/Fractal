import React from "react";
import Modal from "react-modal";

const ConfirmBox = (props) => {
    <Modal
        isOpen = {!!props.isOpen}
        onRequestClose = {props.onCloseBox}
        contentLabel = "message"
    >
        {props.message}
        <button onClick = {props.handleClick}>Close</button>
    </Modal>
}

export default ConfirmBox;