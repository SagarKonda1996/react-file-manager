import React, { useEffect, useState } from 'react'
import Axios from 'axios'
import { Urls } from '../../Urls'
import Document from '../Shared/DocumentViewer'
import CreateDocument from '../Shared/CreateDocument'
import { NavLink } from 'react-router-dom'
import SearchBar from '../Shared/SearchBar'
import ModalDialog from '../Modal'
import MoveFile from '../MoveFile'
import Loading from '../Shared/Loader'
import classes from './style.module.css'
import { Container, Row, Col, Table, Dropdown, Breadcrumb } from 'react-bootstrap'
const onClick = (type, parent, id, history) => {
    if (type == 'folder') {
        history.push({ pathname: `/folder/${parent}` })
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

const Actions = ({ document }) => {
    const [show, setShow] = useState(false)
    const styleClass = {
        'dialog-width': {
          width: '60%'
        }
      }
    return (
        <>
            <Dropdown >
                <Dropdown.Toggle variant="success" id="dropdown-basic">
                    Select
                </Dropdown.Toggle>
                <Dropdown.Menu>
                    <Dropdown.Item onClick={e => setShow(true)}>Move</Dropdown.Item>
                    <Dropdown.Item onClick={e => onDelete(document['_id'])}>Delete</Dropdown.Item>
                </Dropdown.Menu>
            </Dropdown>
            <ModalDialog
                show={show}
                closeDialogue={() => setShow(false)}
                title={'Move Folder'}
                showCancelButton={true}
                showSuccessButton={false}
                size={"lg"}
            >
                <MoveFile
                    doc_id={document['_id']}
                    restricted_parent={document['parent']}
                    source_path={document['path']}
                    onsuccess={onsuccess}
                />
            </ModalDialog>
        </>
    )
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
    const navigateTo=(path)=>{
        if(path!='')
        props.history.push(`/folder/${path}`)
        else
        props.history.push('/')
    }
    return (
        <>
                    <Loading show={isLoading} />

        <Container className="mt-3">
            <Row>
                <Col sm={12} md={8} lg={8} xl={8} >
                    
                    <Breadcrumb listProps={{className:"mb-0"}}>
            {
                    path.map((p) => <Breadcrumb.Item onClick={e => navigateTo(p.path)} active={p.path==props.match.params.id}>{p.name}</Breadcrumb.Item>)
            }
            </Breadcrumb>
                </Col>
                <Col sm={12} md={4} lg={4} xl={4} className="align-self-center mt-2 mt-md-0">
                    <SearchBar />
                </Col>
            </Row>
            <CreateDocument
                parent={parent}
                path={path}
                fetchLatest={getDataFromDB}
                setisLoading={setisLoading}
            />
            <Table responsive borderless hover >
                <thead class="thead-dark">
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th className="d-none d-md-block">Date Modified</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        documents.map((document) => <Document document={document} onClick={onClick}>
                           <td ><Actions document={document} /></td> 
                        </Document>
                        )
                    }
                </tbody>
            </Table>
        </Container>
        </>)
}
export default ViewFolder
