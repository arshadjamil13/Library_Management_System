const token = localStorage.getItem("token")

export async function getAllBooks(){
    try{
        const res = await fetch(`${import.meta.env.VITE_API_URL}/books`,{
                headers:{
                    Authorization :`Bearer ${token}`
                }
            })
        const result = await res.json()
        return result
    }catch(error){
        console.error("Getting all books failed",error)
    }
}

export async function AddBooks(data:any){
    try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/books`,{
                method : "POST",
                headers : {
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                },
                body: JSON.stringify({
                    title : data.title,
                    description : data.description,
                    genre : data.genre,
                    authorName : data.author
                })
            })
            if (!response.ok) {
                const errorText = await response.text()
              throw new Error(errorText);
            }

            const result = await response.json()
            console.log(result)
            return result
    }catch(error){
        console.error("Adding Book failed",error)
    }
}

export async function EditBooks(data:any,id:number){
    try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/books/${id}`,{
                method: "PATCH",
                headers :{
                    "Content-Type" : "application/json",
                    Authorization : `Bearer ${token}`
                },
                body:JSON.stringify({
                    title: data.title,
                    description: data.description,
                    genre: data.genre,
                    authorName: data.author,
                })
            })

            if (!response.ok) {
            throw new Error("Failed to update book")
            }

            const result = await response.json()
            return result
    }catch(error){
        console.error("Edit of Books Failed",error)
    }
}

export async function DeleteBook(BookId:number){
    try{
        const response = await fetch(`${import.meta.env.VITE_API_URL}/books/${BookId}`,{
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
        console.error("Book Deletion failed",error)
    }
}

export async function BorrowBook(userId:number,BookId:number){
    try{
        const response = await fetch(
              `${import.meta.env.VITE_API_URL}/borrowing/borrow`,
              {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                  Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ 
                    userId : userId,
                    bookId : BookId
                 }),
              }
            );

            if (!response.ok) {
              throw new Error("Failed to borrow book");
            }
            return true
    }catch(error){
        console.error("Book Borrowing Failed",error)
    }
}