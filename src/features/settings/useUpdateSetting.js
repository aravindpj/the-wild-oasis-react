import { useMutation, useQueryClient } from "@tanstack/react-query";
import {updateSetting} from '../../services/apiSettings'
import { toast } from "react-hot-toast";
export function useUpdateSetting(){
    const queryClient=useQueryClient()
    const {isLoading:isUpdating,mutate:updateTheSetting}=useMutation({
        mutationFn:updateSetting,
        onSuccess:()=>{
           toast.success("New setting updated")
           queryClient.invalidateQueries({
             queryKey:['settings']
           })
        },
        onError:(err)=>toast.error(err.message)
    })
    return {isUpdating,updateTheSetting}
}