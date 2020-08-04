import React, { useEffect, useState } from 'react'
import M from 'materialize-css'
import Modal from '../Modal';
import FileUploader from '../FileUploader';
import Axios from 'axios';
import { Urls } from '../../../Urls';
import Loader from '../Loader';
const CreateFolder = ({ parent = "", path = [], fetchLatest = () => { } }) => {
    const [foldername, setFoldername] = useState('')
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        var elems = document.querySelectorAll('.modal');

        var instances = M.Modal.init(elems, {});

    }, [])
    const createNewFolder = () => {
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
                onCancel()
                setIsLoading(false)

            })
            .catch((res) => {
                alert("Failed to Upload")
                setIsLoading(false)

            })

    }
    const onCancel = () => {
        var singleModalElem = document.querySelector('#modal1');
        var instance = M.Modal.getInstance(singleModalElem);
        instance.close()


    }

    return (
        <div className="container">
            <Loader show={isLoading}/>
            <h4>New Folder</h4>
            <div className="row">
                <input type="text" value={foldername} onChange={e => setFoldername(e.target.value)} placeholder="Folder Name" />
            </div>
            <div className="row">
                <div className="col  s12 m6 l6 xl6 offset-2 ">
                    <button class="btn  waves-light" name="action" onClick={createNewFolder}>Create Folder
    <i class="material-icons right">add</i>
                    </button>
                </div>

                <div className="col  s12 m6 l6 xl6 offset-2">
                    <button class="btn waves-effect" name="action" onClick={onCancel}>Cancel
    <i class="material-icons right">clear</i>
                    </button>
                </div>
            </div>
        </div>
    )
}
const CreateDocument = ({ parent = '', path = [], fetchLatest = () => { },parent_name='/',setisLoading }) => {
    useEffect(() => {
        var elems = document.querySelectorAll('.fixed-action-btn');
        var instances = M.FloatingActionButton.init(elems, {
            direction: 'top'
        });
    }, [])

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
        <div className="row">
            <div className="col offset-2">
                <button data-target={"modal1"} class="btn modal-trigger"><i class="material-icons left">add</i>
                Folder
                </button>
                <Modal>
                    <CreateFolder
                        parent={parent}
                        path={path}
                        fetchLatest={fetchLatest}
                    />
                </Modal>
            </div>
            <div className="col offset-2">
                <FileUploader
                    onChange={onChange}
                    setisLoading={setisLoading} 
                />
            </div>


        </div>
    )
}



export default CreateDocument
