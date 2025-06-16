import React from 'react'

import './modal.css'

import { IoClose } from "react-icons/io5";

function Modal({ setShowModal, children }) {
  return (
    <div className="modal">
        <div className="modal__layer" onClick={() => setShowModal(false)}></div>
        <div className='modal__content'>
            <div id="close__modal">
                <IoClose onClick={() =>setShowModal(false)}/>
            </div>
            {children}
        </div>
    </div>
  )
}

export default Modal