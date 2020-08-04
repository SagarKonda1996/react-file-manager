import React,{useEffect,useState} from 'react'
import Axios from 'axios'
import { Urls } from '../../Urls'
import Document from '../Shared/DocumentViewer'
import SearchBar from '../Shared/SearchBar'

const Search = props => {
  const [documents, setDocuments] = useState([])
  const [searchValue, setSearchValue] = useState('')
  const getMatchingDocuments=(searchstring)=>{
    Axios.get(`${Urls.search}?document_name=${searchstring}`)
    .then((res)=>{
      setDocuments(res.data.doc_data)
    })
    .catch((err)=>{
      console.log(err)
    })
  }
  useEffect(() => {
    let searchvalue=props.match.params.name
    searchvalue=searchvalue.replace("%20"," ")
    console.log(searchvalue)
    if(searchvalue){
      setSearchValue(searchvalue)
      getMatchingDocuments(searchvalue)
    }
  }, [props.match.params.name])
 
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
        <SearchBar defaultValue={searchValue}/>
        <div class="row center">
          {
            documents.map((document) =>
              <div className="col s12 m6 l4 xl4">
                <Document document={document} onClick={onClick}>

                </Document>
              </div>)

          }

        </div>
      </div>
    </div>
    )
}



export default Search
