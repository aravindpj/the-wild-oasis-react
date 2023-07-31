import supabase from "./supabase";

export async function Signup({fullName,email,password}){
   const {error,data}=await supabase.auth.signUp({
     email,
     password,
     options:{
      data:{
        fullName,
        avatar:""
      }
     }
   })

   if (error) {
    throw new Error(error.message);
  }
  
  return data;
}

export async function Login(email, password) {
  let { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  if (error) {
    throw new Error(error.message);
  }
  return data;
}

export async function getCurrentUser() {
  const { data: session } = await supabase.auth.getSession();
  if (!session.session) return null;
  // if user is there
  const { data, error } = await supabase.auth.getUser();
  if (error) {
    throw new Error(error.message);
  }
  return data?.user;
}

export async function Logout(){
  const {error}=await supabase.auth.signOut()
  if (error) {
    throw new Error(error.message);
  }
}