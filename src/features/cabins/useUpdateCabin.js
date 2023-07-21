import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewCabin } from "../../services/apicabins";
import { toast } from "react-hot-toast";

export function useUpdateCabin(){
    const queryClient = useQueryClient();

    const { isLoading: isEditing, mutate:editCabin } = useMutation({
      mutationFn:({editCabinData,id})=> createNewCabin(editCabinData,id),
      onSuccess: () => {
        toast.success("New cabin created");
        queryClient.invalidateQueries({
          queryKey: ["cabins"],
        });
      },
      onError: (err) => toast.error(err.message),
    });
    return {isEditing,editCabin}
}