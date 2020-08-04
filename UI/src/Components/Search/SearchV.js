import React,{useEffect,useState} from 'react'
import Axios from 'axios'
import { Urls } from '../../Urls'
import Document from '../Shared/DocumentViewer'
import SearchBar from '../Shared/SearchBar'
import classes from './style.module.css'
import M from 'materialize-css'
const Sections = ({
    documents,
    onClick=()=>{}}) => {
    return <div className="section">
        <ul className={classes['custom_collection']}>
            {
                documents.map((document) =>
                    <Document document={document} onClick={onClick} >
                    </Document>
                )
            }
        </ul>

    </div>
}
const Search = props => {
  const [documents, setDocuments] = useState([])
  const [queryResults, setQueryResults] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const [filterType, setFilterType] = useState('contains')
  const getMatchingDocuments=(searchstring)=>{
    Axios.get(`${Urls.search}?document_name=${searchstring}`)
    .then((res)=>{
      setDocuments(res.data.doc_data)
      setQueryResults(res.data.doc_data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  useEffect(() => {
    let searchvalue=props.match.params.name
    searchvalue=searchvalue.replace("%20"," ")
    if(searchvalue){
      setSearchValue(searchvalue)
      getMatchingDocuments(searchvalue)
    }
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, {});
  }, [props.match.params.name])

  useEffect(() => {
   if(filterType=='contains')
   {
    setDocuments(queryResults)
   }
   else
   {
    setDocuments(documents.filter(({name})=>name.toLowerCase()==searchValue.toLowerCase()))
   }
  }, [filterType])
 
  const onClick = (type, parent, id) => {
    if (type == 'folder') {
      props.history.push({ pathname: `/${parent}` })
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
    return (
      <div class="section no-pad-bot" id="index-banner">
      <div class="container">
        <div className="row">
          <div className="col s12 m6 l6 xl6">
          <SearchBar defaultValue={searchValue}/>
          </div>
          <div className="col s12 m6 l6 xl6">
          <select value={filterType} onChange={e=>setFilterType(e.target.value)}>
          <option value="contains">Contains</option>
          <option value="exact">Exact Match</option>
        </select>
          </div>

        </div>
        

        {
            documents.length==0?<h5>No Results</h5>:null
        }
        {
                    documents.filter((doc) => doc.type == 'folder').length > 0 ?
                        <>
                            <h5 >Folders</h5>
                            <Sections documents={documents.filter((doc) => doc.type == 'folder')} onClick={onClick} />
                        </>

                        : null

                }
                {
                    documents.filter((doc) => doc.type == 'file').length > 0 ?
                        <>
                            <h5 >Files</h5>
                            <Sections documents={documents.filter((doc) => doc.type == 'file')} onClick={onClick} />
                        </>

                        : null

                }

      </div>
    </div>
    )
}



export default Search
