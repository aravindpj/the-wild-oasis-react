import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Login as LoginApi} from "../../services/apiAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useLogin(){
    const navigate=useNavigate()
    const queryClient=useQueryClient()
    const {isLoading,mutate:login}=useMutation({
        mutationFn:({email,password})=>LoginApi(email,password),
        onSuccess:(user)=>{
           queryClient.setQueriesData(["user"],user)
           navigate('/dashboard')
        },
        onError:(err)=>toast.error(`There is an error ${err.message}`)
    })
    return {isLoading,login}
}