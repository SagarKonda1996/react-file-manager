import React, { useEffect, useState } from 'react'
import { withRouter } from 'react-router-dom'
import { Row, Col, FormControl, InputGroup } from 'react-bootstrap'

const SearchBar = ({ history, defaultValue = '' }) => {
  const [searchField, setSearchField] = useState('')
  useEffect(() => {
    setSearchField(defaultValue)
  }, [defaultValue])
  const searchDocument = () => {
    if (searchField) {
      history.push(`/search/${searchField}`)
    }
    else {

    }
  }
  return (
    // <Row>
    //   <Col sm={10} md={10} lg={10} xl={10} >
    //     <FormControl >

    //     </FormControl>
    //     <input id="icon_prefix" type="text" class="validate" placeholder="Search File/Folder" defaultValue={searchField} onChange={e => setSearchField(e.target.value)} />
    //   </Col>
    //   <Col sm={2} md={2} lg={2} xl={2}  className="align-self-center">
    //     <i class="material-icons prefix pointer-cursor" onClick={searchDocument}>search</i>
    //   </Col>

    // </Row>

    <InputGroup >
    
    <FormControl
      placeholder="Search File/Folder" defaultValue={searchField} onChange={e => setSearchField(e.target.value)} 
      aria-label="Search File/Folder"
      aria-describedby="Search File/Folder"
    />
    <InputGroup.Append className="align-self-center">
      <InputGroup.Text>
      <i class="material-icons prefix pointer-cursor" onClick={searchDocument}>search</i>
      </InputGroup.Text>
    </InputGroup.Append>
  </InputGroup>
    
    
    )
}


export default withRouter(SearchBar)
