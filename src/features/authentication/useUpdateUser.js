import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";
import { updateCurrentUser } from "../../services/apiAuth";

export function useUpdateUser(){
    const queryClient = useQueryClient();

    const { isLoading: isUpdating, mutate:updateUser } = useMutation({
      mutationFn:updateCurrentUser,
      onSuccess: ({user}) => {
        console.log(user)
        toast.success("User account successfully updated");
        queryClient.setQueriesData(["user"],user)
      },
      onError: (err) => toast.error(err.message),
    });
    return {isUpdating,updateUser}
}