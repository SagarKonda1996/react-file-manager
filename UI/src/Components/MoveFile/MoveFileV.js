import React, { useState, useEffect } from 'react'
import Axios from 'axios'
import { Urls } from '../../Urls'
import Document from '../Shared/DocumentViewer'
import classes from './style.module.css'
import DocumentIcon from '../Shared/DocumentIcon'
const MoveFile = ({ doc_id = '', restricted_parent = '', onsuccess = () => { } ,source_path}) => {
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
      'source_path':source_path
    })
      .then(() => {
        onsuccess(parent)
      })
      .catch(() => {

      })
  }
  const isDisabeled=(type,parent,currentdoc)=>{
    if(type=='file' || parent==currentdoc)
    {
      return false
    }
    return true

  }
  const showMoveButton = documents.filter((doc) => doc['parent'] == restricted_parent).length == 0 ? true : false
  return (
    <div class="section no-pad-bot" id="index-banner">
      <div class="container">
        <div className="row">
          {
            path.map((p) => <span className="pointer-cursor underline" onClick={e => onClick('folder', p.path,'dummy')}>{p.name}/</span>)
          }
        </div>
        {/* <div class="row">
          restricted_parent={restricted_parent}
          doc_id={doc_id}
        </div> */}
        <div className="row center">
          <button className="btn" onClick={printPath} disabled={!showMoveButton}>
            Move
<i class="material-icons right">
              content_paste
</i></button>

        </div>
        <div class="row center">
        <ul className={classes['list']}>

          {
            documents.map(({type,_id,name}) =>
                <li className={`${!isDisabeled(type,_id,doc_id)?classes['listitem_disabled']:classes['listitem']}`} onClick={e => onClick(type, _id, doc_id)}>
                 <DocumentIcon type={type}/> {name}
                </li>

              )
          }
          </ul>
        </div>
      </div>
    </div>
  )
}


export default MoveFile
