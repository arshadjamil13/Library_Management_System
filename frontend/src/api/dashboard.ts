// const token = localStorage.getItem("token")

export async function returnBook(id:number,token:string | null){
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/borrowing/return`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${token}`
                },
                body:JSON.stringify({
                    "bookId" : id
                })
            });
            if (!res.ok) throw new Error("Failed to return book");
            return true
    } catch (error) {
        console.error("Book Returning Failed",error)
    }
}

export async function getBorrowedBooks(id:number,token:string | null){
    try {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/borrowing/user/${id}`, {
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });

            if (!res.ok) {
                throw new Error("Failed to load borrowed books");
            }

            const result = await res.json()
            return result
    } catch (error) {
        console.error("Getting all Borrowed Books Failed",error)
    }
} 