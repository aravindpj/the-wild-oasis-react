import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export function useCheckout(){
    const queryClient=useQueryClient()
    const{isLoading:isCheckout,mutate:Checkout}=useMutation({
        mutationFn:(bookingId)=>updateBooking(bookingId,{
            status:"checked-out"
        }),
        onSuccess:(data)=>{
            toast.success(`Booking #${data.id} check out successfully`)
            queryClient.invalidateQueries({active:true})
        },
        onError:(err)=>toast.error(`There is an error ${err.message}`)
    })
    return {isCheckout,Checkout}
}