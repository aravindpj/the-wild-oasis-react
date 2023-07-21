import styled from "styled-components";
import Input from "../../ui/Input";
import Form from "../../ui/Form";
import Button from "../../ui/Button";
import FileInput from "../../ui/FileInput";
import Textarea from "../../ui/Textarea";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNewCabin } from "../../services/apicabins";
import { toast } from "react-hot-toast";
import FormRow from "../../ui/FormRow";

function CreateCabinForm({cabinToEdit={}}) {
  const {id:editId,...editValue}=cabinToEdit
  const isEditForm=Boolean(editId)
  const { register, handleSubmit, reset, getValues , formState} = useForm({defaultValues:isEditForm ? editValue : {}});
  
  const queryClient = useQueryClient();
  const {errors} = formState
  const { isLoading: isCreating, mutate:createCabin } = useMutation({
    mutationFn: createNewCabin,
    onSuccess: () => {
      toast.success("New cabin created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });


  const { isLoading: isEditing, mutate:editCabin } = useMutation({
    mutationFn:({editCabinData,id})=> createNewCabin(editCabinData,id),
    onSuccess: () => {
      toast.success("New cabin created");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
      reset();
    },
    onError: (err) => toast.error(err.message),
  });

  function onSubmit(data) {
    const image=typeof data.image === "string" ? data.image : data.image[0]
    if(isEditForm) editCabin({editCabinData:{...data,image},id:editId})
    else createCabin({...data,image})
  }
  function onError(err) {
    console.log(err);
  }

  const isWorking=isCreating || isEditing
  return (
    <Form onSubmit={handleSubmit(onSubmit, onError)}>
      <FormRow label="Cabin name" error={errors?.name?.message}>
      <Input
          type="text"
          id="name"
          disabled={isWorking}
          {...register("name", { required: "This field is required" })}
        />
      </FormRow>
      <FormRow  label="Maximum capacity" error={errors?.maxCapacity?.message}>
      <Input
          type="number"
          id="maxCapacity"
          disabled={isWorking}
          {...register("maxCapacity", 
          { required: "This field is required" ,
           min:{
            value:1,
            message:"Capacity should be atleast one"
           }
        },
          )}/>
      </FormRow>

      <FormRow label="Regular price" error={errors?.regularPrice?.message}>
        <Input
          type="number"
          id="regularPrice"
          disabled={isWorking}
          {...register("regularPrice", { required: "This field is required",min:{
            value:1,
            message:"Capacity should be atleast one"
           }})}
        />
      </FormRow>

      <FormRow  label="Discount" error={errors?.discount?.message}>
        <Input
          type="number"
          id="discount"
          disabled={isWorking}
          defaultValue={0}
          {...register("discount", {
            required: "This field is required",
            validate: (value) =>
              +value <= +getValues().regularPrice ||
              "Discount should be less than regular price",
          })}
        />
      </FormRow>

      <FormRow
        label="Description for website"
        error={errors?.description?.message}
      >
        <Textarea
          type="number"
          id="description"
          defaultValue=""
          disabled={isWorking}
          {...register("description", {
            required: "This field is required",
          })}
        />
      </FormRow>

      <FormRow label="Cabin photo">
        <FileInput
          disabled={isWorking}
          id="image"
          accept="image/*"
          {...register("image", {
            required: isEditForm ? false : "This field is required",
          })}
        />
      </FormRow>
      <FormRow>
        {/* type is an HTML attribute! */}
        <Button variation="secondary" type="reset">
          Cancel
        </Button>
        <Button disabled={isCreating}>{isEditForm ? "Edit cabin" : "Create new cabin"}</Button>
      </FormRow>
    </Form>
  );
}

export default CreateCabinForm;
