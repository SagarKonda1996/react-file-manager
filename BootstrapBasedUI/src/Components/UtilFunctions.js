export const getValidFileName=(filename='')=>{
   return filename.replace(/[^A-Za-z_.]/g, "_")
}

export const AppendZeros=(s)=>{
if(s<10)
return `0${s}`
return s
}
export const NormalTimeString=(dateString)=>{
   let date=new Date(dateString)
   var day = date.getDate();
   var month = date.getMonth() + 1;
   var year = date.getFullYear();
   var hour=date.getHours()
   var minute=date.getMinutes()

   return `${AppendZeros(day)}-${AppendZeros(month)}-${year} ${AppendZeros(hour)}:${AppendZeros(minute)}`
}