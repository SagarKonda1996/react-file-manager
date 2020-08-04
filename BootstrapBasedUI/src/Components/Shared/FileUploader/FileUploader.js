import React from 'react'
import Axios from 'axios'
import { Urls } from '../../../Urls'
import Loader from '../Loader'
import { getValidFileName } from '../../UtilFunctions'
import { Button } from 'react-bootstrap'

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
        <Button className="waves_button ml-2 mt-2 mr-2 mb-2"onClick={e => document.getElementById("file_uploader_id").click()}><i class="fa fa-upload mr-2" ></i>
        Upload File 
        </Button>
            <input type="file" style={{display:'none'}} onChange={onFileChange} id="file_uploader_id" />
        </>
    )
}



export default FileUploader
