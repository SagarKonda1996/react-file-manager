import React, { useEffect, useState } from 'react'
import M from 'materialize-css'
import { withRouter } from 'react-router-dom'

const SearchBar = ({history,defaultValue=''}) => {
    const [searchField, setSearchField] = useState('')
    useEffect(() => {
        setSearchField(defaultValue)
    }, [defaultValue])
    const searchDocument=()=>{
        if(searchField){
        history.push(`/search/${searchField}`)
      }
      else{
        M.toast({html: 'Enter File or Folder Name'})
      
      }
      }
    return (
        <div class="input-field col margin-0">
        <input id="icon_prefix" type="text" class="validate" placeholder="Search File/Folder" defaultValue={searchField} onChange={e=>setSearchField(e.target.value)}/>
        <i class="material-icons prefix pointer-cursor" onClick={searchDocument}>search</i>

      </div> )
}


export default withRouter( SearchBar)
