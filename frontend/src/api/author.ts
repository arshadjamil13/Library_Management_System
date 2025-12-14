
// const token = localStorage.getItem("token")

export async function fetchBooks(token:string | null){
    try{
         const res = await fetch(`${import.meta.env.VITE_API_URL}/authors`,{
                headers:{
                    Authorization :`Bearer ${token}`
                }
            })
            const result = await res.json()
            return result
    }catch(error){
        console.error("Author Fetching Failed",error)
    }
}

export async function editAuthors(data:any,id:number,token:string | null){
    try{

         const response = await fetch(`${import.meta.env.VITE_API_URL}/authors/${id}`,{
                method: "PATCH",
                headers :{
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                },
                body:JSON.stringify({
                    name: data.name,
                    bio: data.bio,
                    
                })
            })

            if (!response.ok) {
            throw new Error("Failed to update book")
            }

            const updatedauthors = await response.json()
            return updatedauthors
    }catch(error){
        console.error("Author Edit Failed",error)
    }
}

export async function createAuthor(data:any,token:string | null){
    try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/authors`,{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                },
                body: JSON.stringify({
                    name : data.name,
                    bio : data.bio,
                
                })
            })
            if (!response.ok) {
              throw new Error("Failed to create book");
            }
            const result = await response.json()

            return result
    }catch(error){
        console.error("Author Edit Failed",error)
    }
}

export async function deleteAuthor(id:number,token:string | null){
    try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/authors/${id}`,{
                method : "DELETE",
                headers:{
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                }
            })
             if (!response.ok) {
               throw new Error("Failed to delete book");
             }
             return true
    }catch(error){
        console.error("Author Edit Failed",error)
    }
}