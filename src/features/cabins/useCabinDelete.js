import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteCabin } from "../../services/apicabins";
import { toast } from "react-hot-toast";

export function useCabinDelete(){
    const queryClient = useQueryClient();
    const { isLoading:isDeleting, mutate } = useMutation({
        mutationFn: deleteCabin,
        onSuccess: () => {
          toast.success("cabin removed successfully");
          queryClient.invalidateQueries({
            queryKey: ["cabins"],
          });
        },
        onError: (err) => toast.error(err.message),
      });
    return {isDeleting,mutate}  
}