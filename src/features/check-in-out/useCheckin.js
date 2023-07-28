import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useCheckin(){
    const queryCleint=useQueryClient()
    const navigate=useNavigate()
    const{isLoading:isCheckedin,mutate:Checkedin}=useMutation({
        mutationFn:({bookingId,breakfast})=>updateBooking(bookingId,{
            status:"checked-in",
            isPaid:true,
            ...breakfast
        }),
        onSuccess:(data)=>{
            toast.success(`booking #${data.id} successfully checked in`)
            queryCleint.invalidateQueries({active:true})
            navigate("/")
        },
        onError:(err)=>toast.error(`There is an error ${err.message}`)
    })
    return {isCheckedin,Checkedin}
}