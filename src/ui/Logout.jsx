import { useLogout } from "../features/authentication/useLogout"
import ButtonIcon from "./ButtonIcon"
import {HiArrowRightOnRectangle} from 'react-icons/hi2'
import SpinnerMini from "./SpinnerMini"
function Logout() {
    const {isLoading,login}=useLogout()
    return (
        <ButtonIcon disabled={isLoading} onClick={()=>login()}>
            {isLoading ? <SpinnerMini/> :<HiArrowRightOnRectangle/>}
        </ButtonIcon>
    )
}

export default Logout
