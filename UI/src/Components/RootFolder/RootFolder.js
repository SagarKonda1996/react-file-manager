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
        var k = document.querySelectorAll('.modal');
        var instances = M.Modal.init(k, {});
        var elems = document.querySelectorAll('.dropdown-trigger');
        var instances = M.Dropdown.init(elems, {});
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
  const onClick = (type, parent, id) => {
    if (type == 'folder') {
      props.history.push({ pathname: `/${parent}`, state: path })
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
        getDataFromDB(parent)
      })
      .catch(() => {

      })
  }
  const onsuccess = (parent) => {
    getDataFromDB(parent)
  }

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
        <div class="row center">
          {
            documents.map((document) =>
              <div className="col s12 m6 l4 xl4">
                <Document document={document} onClick={onClick} >
                  <i class='material-icons dropdown-trigger' data-target={`${document['_id']}_dropdown`}>more_vert</i>

                  <div id={`${document['_id']}_dropdown`} class='dropdown-content col s12 m12 l12 xl12'>

                    <div data-target={`${document['_id']}`} class="modal-trigger valign-wrapper pointer-cursor"><i class="material-icons">content_cut</i>
                    <span>
                    Move
                    </span></div>
                    <div onClick={e => onDelete(document._id)} className="valign-wrapper pointer-cursor"><i className="material-icons">delete
                    </i>
                    <span>
                      Delete
                    </span>
                    </div>

                  </div>
                  <Modal modalid={document['_id']}>
                        <MoveFile
                          doc_id={document['_id']}
                          restricted_parent={parent}
                          onsuccess={onsuccess}
                        />
                      </Modal>


                </Document>
              </div>)
          }
        </div>
      </div>
    </div>
  )
}


export default ViewFolder
