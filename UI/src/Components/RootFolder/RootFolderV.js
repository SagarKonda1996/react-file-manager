import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Urls } from '../../Urls'
import Document from '../Shared/DocumentViewer'
import CreateDocument from '../Shared/CreateDocument'
import { NavLink } from 'react-router-dom'
import SearchBar from '../Shared/SearchBar'
import Modal from '../Shared/Modal'
import MoveFile from '../MoveFile'
import M from 'materialize-css'
import Loading from '../Shared/Loader'
import classes from './style.module.css'

const onClick = (type, parent, id, history) => {
    if (type == 'folder') {
        history.push({ pathname: `/${parent}` })
    }
    else {
        const filename = id
        const req_timestamp = new Date().toISOString()
        Axios.get(`${Urls.blob}?request_time=${req_timestamp}&file_name=${filename}`)
            .then((res) => {
                if (res.data.url) {
                    window.open(res.data.url, "_blank")
                }
                else {
                    alert("Error")
                }
            })
            .catch((err) => {
                alert("Error")
            })
    }
}
const onDelete = (id) => {
    Axios.delete(`${Urls.file}?docid=${id}`)
        .then(() => {
            window.location.reload(true)
        })
        .catch(() => {

        })
}
const onsuccess = () => {
    window.location.reload(true)
}
const Sections = ({
    documents
}) => {
    return <div className="section">
        <ul className={classes['custom_collection']}>
            {
                documents.map((document) =>
                    <Document document={document} onClick={onClick} >
                        <i data-target={`${document['_id']}`} class="material-icons left modal-trigger pointer-cursor">content_cut</i>
                        <Modal modalid={document['_id']}>
                            <h5>Move File</h5>
                            <MoveFile
                                doc_id={document['_id']}
                                restricted_parent={document['parent']}
                                source_path={document['path']}
                                onsuccess={onsuccess}
                            />
                        </Modal>
                        <i className="material-icons right pointer-cursor" onClick={e => onDelete(document._id)}>delete</i>
                    </Document>
                )
            }
        </ul>

    </div>
}

const ViewFolder = props => {
    const [documents, setDocuments] = useState([])
    const [parent, setParent] = useState("")
    const [path, setPath] = useState([])
    const [isLoading, setisLoading] = useState(false)
    const getDataFromDB = (p) => {

        setisLoading(true)
        Axios.get(`${Urls.file}?folder=${p}`)
            .then((res) => {
                setDocuments(res.data.doc_data)
                setPath(res.data.metadata)
                var elems = document.querySelectorAll('.modal');
                var instances = M.Modal.init(elems, {});
                setisLoading(false)
            })
            .catch((err) => {
                console.log(err)
                setisLoading(false)

            })
    }
    useEffect(() => {
        let p = props.match.params.id
        getDataFromDB(p ? p : '')
        setParent(p ? p : '')

    }, [props.match.params.id])


    return (
        <div class="section no-pad-bot" id="index-banner">
            <Loading show={isLoading} />

            <div class="container">
                <div className="row">
                    <div className="col s12 m8 l8 xl8">
                        {
                            path.map((path) => {
                                return <><NavLink to={`/${path.path}`}>{path.name}</NavLink>/</>
                            })
                        }
                    </div>
                    <div className="col s12 m4 l4 xl4">
                        <SearchBar />
                    </div>

                </div>
                <CreateDocument
                    parent={parent}
                    path={path}
                    fetchLatest={getDataFromDB}
                    setisLoading={setisLoading}
                />
                {
                    documents.filter((doc) => doc.type == 'folder').length > 0 ?
                        <>
                            <h5 >Folders</h5>
                            <Sections documents={documents.filter((doc) => doc.type == 'folder')} />
                        </>

                        : null

                }
                {
                    documents.filter((doc) => doc.type == 'file').length > 0 ?
                        <>
                            <h5 >Files</h5>
                            <Sections documents={documents.filter((doc) => doc.type == 'file')} />
                        </>

                        : null

                }


            </div>
        </div>
    )
}


export default ViewFolder
