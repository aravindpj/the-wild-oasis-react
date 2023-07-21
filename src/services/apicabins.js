import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error.message);
    throw new Error("Cabin could not be loaded");
  }
  return data;
}

export async function createNewCabin(newCabin) {
  //1) create cabin
  const imageName=`${Math.random()}-${newCabin.image.name}`.replaceAll("/","")
  const imagePath=`${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  const { data, error } = await supabase.from("cabins").insert([{...newCabin,image:imagePath}]);
  if (error) {
    console.error(error.message);
    throw new Error("New cabin could not be created");
  }
  const {data:uploadData,error:storageError} = await supabase
  .storage
  .from('cabin-images')
  .upload(imageName,newCabin.image)

   if(storageError){
    await supabase.from("cabins").delete().eq("id", data.id);
    console.error(error.message);
    throw new Error("Could not upload file");
   }

  return data;
}

export async function deleteCabin(id) {
  console.log(id);
  const { data, error } = await supabase.from("cabins").delete().eq("id", id);
  if (error) {
    console.error(error.message);
    throw new Error("Cabin could not be deleted");
  }
  return data;
}
