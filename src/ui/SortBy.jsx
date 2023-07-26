import { useSearchParams } from "react-router-dom"
import Select from "./Select"

function SortBy({options}) {
    const [searchParam,setSearchParam]=useSearchParams()
    const currentValue=searchParam.get('sortBy') || ""
    function handleClick(e){
       searchParam.set("sortBy",e.target.value)
       setSearchParam(searchParam)
    }

    return <Select options={options} value={currentValue} onClick={handleClick}/>
}

export default SortBy
