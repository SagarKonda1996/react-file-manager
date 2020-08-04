import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Urls } from '../../Urls'
import Document from '../Shared/DocumentViewer'
import classes from './style.module.css'
import DocumentIcon from '../Shared/DocumentIcon'
import { Container, Row, Button, Table, Breadcrumb } from 'react-bootstrap'
const MoveFile = ({ doc_id = '', restricted_parent = '', onsuccess = () => { }, source_path }) => {
    const [documents, setDocuments] = useState([])
    const [parent, setParent] = useState("")
    const [path, setPath] = useState([])
    const getDataFromDB = (p) => {
        Axios.get(`${Urls.file}?folder=${p}`)
            .then((res) => {
                setDocuments(res.data.doc_data)
                setPath(res.data.metadata)
                setParent(p)
            })
            .catch((err) => {
                console.log(err)
            })
    }
    useEffect(() => {

        getDataFromDB(parent)
    }, [doc_id])
    const onClick = (type, parent, currentdoc) => {
        if (currentdoc != parent) {
            if (type == 'folder') {
                getDataFromDB(parent)
            }
        }

    }
    const printPath = () => {
        Axios.put(`${Urls.file}`, {
            '_id': doc_id,
            'path': path,
            'parent': parent,
            'source_path': source_path
        })
            .then(() => {
                onsuccess(parent)
            })
            .catch(() => {

            })
    }
    const isDisabeled = (type, parent, currentdoc) => {
        if (type == 'file' || parent == currentdoc) {
            return false
        }
        return true

    }
    const showMoveButton = documents.filter((doc) => doc['parent'] == restricted_parent).length == 0 ? true : false
    return (
        <Container>
            <Breadcrumb>
            {
                    path.map((p) => <Breadcrumb.Item onClick={e => onClick('folder', p.path, 'dummy')}>{p.name}</Breadcrumb.Item>)
            }
            </Breadcrumb>
            <Row className="justify-content-center">
                <Button className="waves_button mb-3" onClick={printPath} disabled={!showMoveButton}>
                    <i class="fa fa-scissors mr-2" aria-hidden="true"></i>
Move
</Button>
            </Row>
            <Row>
                <Table responsive borderless hover >
                    <thead class="thead-dark">
                        <tr>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Date Modified</th>
                        </tr>
                    </thead>
                    <tbody>

                        {
                            documents.map((document) => <Document document={document} onClick={e => onClick(document['type'], document['_id'], doc_id)}
                                className={`${!isDisabeled(document['type'], document['_id'], doc_id) ? classes['listitem_disabled'] : classes['listitem']}`}
                            >
                            </Document>
                            )
                        }
                    </tbody>
                </Table>
            </Row>
        </Container>
    )
}


export default MoveFile
