import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteBooking as deleteTheBooking } from "../../services/apiBookings";
import { toast } from "react-hot-toast";

export function useBookingdelete(){
    const queryClient=useQueryClient()
    const {isLoading:isDeleting,mutate:deleteBooking}=useMutation({
        mutationFn:(bookingId)=>deleteTheBooking(bookingId),
        onSuccess:()=>{
            toast.success(`Booking deletd successfully`)
            queryClient.invalidateQueries({
                active:true
            })
        },
        onError:(err)=>toast.error(`There is an error ${err.message}`)
    })
    return {isDeleting,deleteBooking}
}