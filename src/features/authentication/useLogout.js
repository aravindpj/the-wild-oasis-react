import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Logout as LogoutApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";

export function useLogout(){
    const navigate=useNavigate()
    const queryClient=useQueryClient()
    const {isLoading,mutate:login}=useMutation({
        mutationFn:LogoutApi,
        onSuccess:()=>{
            queryClient.removeQueries()
            navigate('/login')
            toast.success("user logout successfully")
        }
    })
    return {isLoading,login}
}