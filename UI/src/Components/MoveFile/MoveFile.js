import React,{useState,useEffect} from 'react'
import Axios from 'axios'
import { Urls } from '../../Urls'
import Document from '../Shared/DocumentViewer'

const MoveFile = ({doc_id='',restricted_parent='',onsuccess=()=>{}}) => {
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
  const onClick=(type, parent, id)=>{
      if(type=='folder'){
          getDataFromDB(parent)
      }

  }
  const printPath=()=>{
      Axios.put(`${Urls.file}`,{
          '_id':doc_id,
          'path':path,
          'parent':parent
      })
      .then(()=>{
          onsuccess(parent)
      })
      .catch(()=>{

      })
  }
  const showMoveButton=documents.filter((doc)=>doc['parent']==restricted_parent).length==0?true:false
    return (
        <div class="section no-pad-bot" id="index-banner">
      <div class="container">
      <div className="row">
         {
           path.map((p)=><span className="pointer-cursor underline" onClick={e=>onClick('folder',p.path,'')}>{p.name}/</span>)
         }
        </div>
        <div className="row center">
            {
                showMoveButton?<button className="btn" onClick={printPath}>
                    Move 
                    <i class="material-icons right">
                    content_paste
                        </i></button>:null
            }
            
        </div>
        <div class="row center">
          {
            documents.map((document) =>
              <div className="col s12 m6 l4 xl4">
                <Document document={document} onClick={document['_id']!=doc_id?onClick:()=>{}} >
                </Document>
              </div>)
          }
        </div>
      </div>
    </div>
    )
}


export default MoveFile
