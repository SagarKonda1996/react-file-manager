import React, { useEffect } from 'react'
const Modal = ({
    children = null, 
    modalid = 'modal1',
}) => {
    
    return (

            <div id={modalid} class="modal">
                <div class="modal-content">
                    {
                        children
                    }
                </div>
            </div>
    )
}



export default Modal
