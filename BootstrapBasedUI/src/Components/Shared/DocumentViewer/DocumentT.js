import React from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { NormalTimeString } from '../../UtilFunctions'

const DocumentT = ({document,onClick,history,children=null,className=''}) => {
    return (
        <tr role="button" className={className}>
        <td onClick={e=>onClick(document.type,document._id,document.file_id,history)}>{document['name']}</td>
        <td onClick={e=>onClick(document.type,document._id,document.file_id,history)}>{document['type']}</td>
    <td className="d-none d-md-block" onClick={e=>onClick(document.type,document._id,document.file_id,history)}>{document['last_modified']?NormalTimeString(document['last_modified']):'NA'}</td>
    {children}

    </tr>
    )
}



export default withRouter(DocumentT)
