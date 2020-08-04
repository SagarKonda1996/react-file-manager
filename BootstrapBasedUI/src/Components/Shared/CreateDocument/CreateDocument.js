import React, { useEffect, useState } from 'react'
import Modal from '../../Modal';
import FileUploader from '../FileUploader';
import Axios from 'axios';
import { Urls } from '../../../Urls';
import Loader from '../Loader';
import { Button, Row, FormControl } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const createNewFolder = (path, foldername, parent, setIsLoading) => {
    let payload = {
        "type": "folder",
        "path": path,
        "name": foldername,
        "file_id": "",
        "parent": parent

    }
    let url = Urls.file
    setIsLoading(true)
    Axios.post(`${Urls.file}?folder=${parent}`, payload)
        .then((res) => {
            window.location.reload(true)
            setIsLoading(false)

        })
        .catch((res) => {
            alert("Failed to Upload")
            setIsLoading(false)

        })

}

// const CreateFolder = ({ parent = "", path = [], fetchLatest = () => { } }) => {
//     const [foldername, setFoldername] = useState('')
//     const [isLoading, setIsLoading] = useState(false)
//     useEffect(() => {

//     }, [])

//     const onCancel = () => {
//         var singleModalElem = document.querySelector('#modal1');


//     }

//     return (
//         <div className="container">
//             <Loader show={isLoading}/>
//             <h4>New Folder</h4>
//             <div className="row">
//             </div>
//             <div className="row">
//                 <div className="col  s12 m6 l6 xl6 offset-2 ">
//                     <button class="btn  waves-light" name="action" onClick={createNewFolder}>Create Folder
//     <i class="material-icons right">add</i>
//                     </button>
//                 </div>

//                 <div className="col  s12 m6 l6 xl6 offset-2">
//                     <button class="btn waves-effect" name="action" onClick={onCancel}>Cancel
//     <i class="material-icons right">clear</i>
//                     </button>
//                 </div>
//             </div>
//         </div>
//     )
// }
const CreateDocument = ({ parent = '', path = [], fetchLatest = () => { }, parent_name = '/', setisLoading }) => {
    useEffect(() => {
    }, [])
    const [showModal, setShowModal] = useState(false)
    const [foldername, setFoldername] = useState('')
    const [isLoading, setIsLoading] = useState(false)

    const onChange = (file_id, filename) => {

        let payload = {
            "type": "file",
            "path": path,
            "name": filename,
            "file_id": file_id,
            "parent": parent

        }
        Axios.post(Urls.file, payload)
            .then((res) => {
                window.location.reload(true)
            })
            .catch((res) => {
                alert("Failed to Upload")
            })
    }
    return (
        <Row className="d-flex justify-content-center justify-content-md-start">

            <Button
                onClick={e => setShowModal(true)}
                className="waves_button ml-2 mt-2 mr-2 mb-2"
            >
                <i className="fa fa-plus mr-2" />
                Folder
            </Button>
            <Modal
                show={showModal}
                closeDialogue={() => setShowModal(false)}
                showCancelButton={true}
                showSuccessButton={true}
                successButtonText="Create Folder"
                successCallback={() => createNewFolder(path, foldername, parent, setIsLoading)}
                title="Create New Folder"
            >
                <Row className="mx-auto">
                    <FormControl
                        type="text"
                        value={foldername} onChange={e => setFoldername(e.target.value)} placeholder="Folder Name"
                    />
                </Row>
            </Modal>
            <FileUploader
                onChange={onChange}
                setisLoading={setisLoading}
            />

        </Row>
    )
}



export default CreateDocument
