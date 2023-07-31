import { useMutation} from "@tanstack/react-query";
import { Signup as SignupApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";

export function useSignup(){
    const {mutate:Signup,isLoading}=useMutation({
        mutationFn:SignupApi,
        onSuccess:(user)=>{
            console.log(user)
            toast.success("User account successfully created , verify the account")
        },
        onError:(err)=>toast.error("There is an error"+err.message)
    })
    
    return {isLoading,Signup}
}