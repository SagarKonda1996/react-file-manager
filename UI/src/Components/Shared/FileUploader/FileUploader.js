import React from 'react'
import Axios from 'axios'
import { Urls } from '../../../Urls'
import Loader from '../Loader'
import { getValidFileName } from '../../UtilFunctions'

const FileUploader = ({ onChange,setisLoading }) => {
    const onFileChange = (e) => {
        const file=e.target.files[0]
        if(file)
        {
            
            const filename=file.name
            const valid_file_name=getValidFileName(filename)
            const req_timestamp=new Date().toISOString()
            setisLoading(true)
            Axios.put(`${Urls.blob}?request_time=${req_timestamp}&file_name=${valid_file_name}`)
            .then((response)=>{
                const url=response.data.url
                const file_id=response.data.file_id
                Axios.put(url,file)
                .then((res)=>{
                    onChange(file_id,filename)
                }).catch(err=>{console.log(err)
                    setisLoading(false)
                })
            })
            .catch((err)=>{
                console.log(err)
                setisLoading(false)
            })
        }
    }
    return (
        <>
            <button class="btn" onClick={e => document.getElementById("file_uploader_id").click()}>Upload File <i class="material-icons left" >file_upload</i></button>
            <input type="file" style={{display:'none'}} onChange={onFileChange} id="file_uploader_id" />
        </>
    )
}



export default FileUploader
