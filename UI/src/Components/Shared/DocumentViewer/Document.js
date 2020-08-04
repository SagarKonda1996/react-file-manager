import React from 'react'
import PropTypes from 'prop-types'
import DocumentIcon from '../DocumentIcon'

const Document = ({
    document,
    onClick=()=>{},
    onDelete=()=>{},
    children
}) => {
    return (
        <div class="row" >
    <div class="col s10 m10 l10 xl10">
      <div class="card blue-grey darken-1">
        <div class="card-content white-text" onClick={e=>onClick(document.type,document._id,document.file_id)}>
          <DocumentIcon type={document.type}/>
          <span class="card-title" style={{wordBreak:'break-all'}}>{document.name}</span>

        </div>
        <div class="card-action">
        {children}
        </div>
      </div>
    </div>
  </div>
    )
}



export default Document
