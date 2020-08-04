import React from 'react'
import DocumentIcon from '../DocumentIcon'
import classes from './style.module.css'
import { withRouter } from 'react-router-dom'
const Document = ({
    document,
    onClick=()=>{},
    children,
    history
}) => {
    return (
 <div  class={`${classes['custom_collection_item']} pointer-cursor hoverable col s12 m3 l3 xl3`} >
 <div className={`row ${classes['margin_auto']}`}>
   <div className="col s12 m2 l2 xl2" onClick={e=>onClick(document.type,document._id,document.file_id,history)}>
     <DocumentIcon type={document.type}/>
   </div>
   <div className="col s12 m8 l8 xl8 left-align" onClick={e=>onClick(document.type,document._id,document.file_id,history)}>
    <span>{document.name}</span>
   </div>
   <div className="col s12 m2 l2 xl2">
    {children}
   </div>
 </div>
</div>

    )
}



export default withRouter(Document)
