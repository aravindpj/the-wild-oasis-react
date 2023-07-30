import  styled  from "styled-components"
import { useUser } from "../features/authentication/useUser"
import Spinner from "./Spinner"
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"

const Fillcontainer=styled.div`
    height: 100vh;
    background-color: var(--color-grey-50);
    display: flex;
    justify-content: center;
    align-items: center;
`

function ProtectedRoute({children}) {
    const navigate=useNavigate()
    const {isLoading,isAuthenticated}=useUser()

    useEffect(()=>{
        if(!isAuthenticated && !isLoading) return navigate('/login')
    },[isAuthenticated,navigate,isLoading])

    if(isLoading) return <Fillcontainer>
        <Spinner/>
    </Fillcontainer>

    return children
}

export default ProtectedRoute
