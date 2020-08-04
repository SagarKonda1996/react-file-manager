import React from 'react'
import PropTypes from 'prop-types'

const DocumentIcon = ({type='folder'}) => {
    return (
            <i class="material-icons">{ 
                type=='folder'?'folder':
                'insert_drive_file'
            }</i>
    )
}



export default DocumentIcon
