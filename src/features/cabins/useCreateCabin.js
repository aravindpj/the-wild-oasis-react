import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { createNewCabin } from "../../services/apicabins";

export function useCreateCabin(){
    const queryClient = useQueryClient();
    const { isLoading: isCreating, mutate:createCabin } = useMutation({
      mutationFn: createNewCabin,
      onSuccess: () => {
        toast.success("New cabin created");
        queryClient.invalidateQueries({
          queryKey: ["cabins"],
        });
      },
      onError: (err) => toast.error(err.message),
    });
    return {isCreating,createCabin}
}