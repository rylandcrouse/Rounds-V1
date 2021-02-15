import React from 'react'
import {Modal} from 'react-bootstrap';
import {Formy, Groupet, Bod} from './styled';
import("./styles.css");


const JoinModal = ({show, setShow}) => {
    return (
        <Modal
        centered
        dialogClassName="modal"
        size="sm"
        show={show}
        onHide={() => setShow(false)}
        aria-labelledby="example-modal-sizes-title-sm"
      >
        {/* <Modal.Header >
          <Modal.Title id="example-modal-sizes-title-sm">
            Small Modal
          </Modal.Title>
        </Modal.Header> */}
        <Bod dialogClassName="modal">
            {/* <Formy> */}
                <Groupet>

                </Groupet>
            {/* </Formy> */}
        </Bod>
      </Modal>
    )
}

export default JoinModal
