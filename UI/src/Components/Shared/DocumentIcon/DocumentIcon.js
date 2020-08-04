import React from 'react'
import PropTypes from 'prop-types'

const DocumentIcon = ({type='folder'}) => {
    return (
        <div > 
            <i class="material-icons">{ 
                type=='folder'?'folder':
                'insert_drive_file'
            }</i>
        </div>
    )
}



export default DocumentIcon
