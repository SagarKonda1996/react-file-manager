import React,{useEffect,useState} from 'react'
import Axios from 'axios'
import { Urls } from '../../Urls'
import Document from '../Shared/DocumentViewer'
import SearchBar from '../Shared/SearchBar'
import classes from './style.module.css'
import { Container, Row, Dropdown, Col, Table } from 'react-bootstrap'
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
  const [filterType, setFilterType] = useState('')
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
    if (type == 'folder' || type=='file') {
        if(parent!='')
      props.history.push({ pathname: `/folder/${parent}` })
      else{
        props.history.push({ pathname: `/` })

      }
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
       <Container className="mt-2">
       <Row>
           <Col sm={12} md={10} lg={10} xl={10}>
           <SearchBar defaultValue={searchValue}/>
            </Col>
            <Col sm={12} md={2} lg={2} xl={2}>
                <Dropdown className="mt-3 mt-md-0">
                    <Dropdown.Toggle variant="success" id="dropdown-basic" className="w-100">
                       {
                          filterType?filterType:'Match Results by' 
                       } 
                    </Dropdown.Toggle>
                    <Dropdown.Menu>
                    <Dropdown.Item  onClick={e=>setFilterType('contains')}>Contains</Dropdown.Item>
                    <Dropdown.Item onClick={e=>setFilterType('exact')}>Exact Match</Dropdown.Item>
                    </Dropdown.Menu>
                </Dropdown>
            </Col>
       </Row>
       <Table responsive borderless hover className="mt-3">
                <thead class="thead-dark ">
                    <tr>
                        <th>Name</th>
                        <th>Type</th>
                        <th className="d-none d-md-block">Date Modified</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        documents.map((document) => <Document document={document} onClick={()=>{}}>
                          <td onClick={e=>onClick(document['type'],document['parent'],document['file_id'])}> <i class="far fa-folder-open mr-3" aria-hidden="true"></i>
                            Show File Location
                            </td>
                        </Document>
                        )
                    }
                </tbody>
            </Table>

       
</Container> 
            
    )
}



export default Search
