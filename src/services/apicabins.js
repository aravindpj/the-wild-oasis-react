import supabase, { supabaseUrl } from "./supabase";

export async function getCabins() {
  const { data, error } = await supabase.from("cabins").select("*");

  if (error) {
    console.error(error.message);
    throw new Error("Cabin could not be loaded");
  }
  return data;
}

export async function createNewCabin(newCabin,id) {

  const hasImagePath=newCabin.image?.startsWith?.(supabaseUrl)
  //1) create cabin
  const imageName=`${Math.random()}-${newCabin.image.name}`.replaceAll("/","")
  const imagePath=hasImagePath ? newCabin.image : `${supabaseUrl}/storage/v1/object/public/cabin-images/${imageName}`

  let query=supabase.from('cabins')

  //CREATE
  if(!id) query=query.insert([{...newCabin,image:imagePath}])
  //UPDATE
  if(id) query=query.update({...newCabin,image:imagePath}).eq("id",id)

  const {data,error}=await query.select().single()

  if (error) {
    console.error(error.message);
    throw new Error("New cabin could not be created");
  }
  
  if(hasImagePath) return data

  //if it is file is there only need to execute
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
