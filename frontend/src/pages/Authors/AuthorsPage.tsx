import { useState ,useEffect} from "react"
import { FiEdit2,FiTrash2 } from "react-icons/fi"
import { HiUserCircle } from "react-icons/hi"
import AuthorFormModal from "./AuthorFormModal"
import { useAuth } from "../../context/AuthContext"
import { fetchBooks,editAuthors, createAuthor, deleteAuthor } from "../../api/author"
import type { Author } from "../../models/Authors"


export default function AuthorsPage(){
    const {token} =useAuth()
    const[search,setSearch] = useState("")
    const [authors,setauthors] = useState<Author[]>([])

const [showModal,setShowModal]= useState(false)
const [editAuthor,setEditAuthor] = useState<Author | null>(null)

const filteredAuthors = authors.filter((a)=>{
    return a.name.toLowerCase().includes(search.toLowerCase())
})

const handleDelete =async (id:number)=>{
    const confirmDelete = window.confirm("Are You Sure you want to delete the book")
    if (!confirmDelete) return
    try{
        const deleted = await deleteAuthor(id,token)
        if(deleted){
            setauthors((prev)=>prev.filter((author)=> author.id !== id))
        }
        
    }catch(error){
        console.error("Delete failed:", error)
    }
}

useEffect(()=>{
        const fetchedBooks = async ()=>{
            const result = await fetchBooks(token)
            setauthors(result)
        } 
        fetchedBooks()
    },[token])


const handleformSubmit=async (data:any)=>{
    if(editAuthor){

            const updatedauthors = await editAuthors(data,editAuthor.id,token)
            setEditAuthor(null)
            setShowModal(false)
            setauthors((prev)=>
                 prev.map((b)=> (b.id === updatedauthors.id ? updatedauthors : b))
            )

    }else{
        
            const createdAuthor = await createAuthor(data,token)
            setShowModal(false)
            setauthors((prev) => [...prev, createdAuthor])
        
    }
    
}



    return (
        <div className="p-6">
            <div className="flex justify-between mb-6">
                <button className="px-4 py-2 bg-green-600 text-white rounded-lg shadow hover:bg-green-700" onClick={()=>{
                    setEditAuthor(null)
                    setShowModal(true)
                }} > + Add New Author</button>

                <input type="text" placeholder="Search Authors..." value={search} onChange={(e)=> setSearch(e.target.value)} className="py-2 px-4 border rounded-lg shadow w-64 focus:ring-2 focus:ring-blue-300" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredAuthors.map((author) => (
                    <div  className="p-5 bg-white shadow-md rounded-xl border border-gray-200" key={author.id}>
                        <div className="flex flex-col items-center">
                            <HiUserCircle size={50} className="text-[#0E1B2B] mb-2" />
                            <h3 className="text-lg font-semibold text-[#0E1B2B]">
                                {author.name}
                            </h3>
                            <p className="text-gray-600 text-sm mt-1 text-center">{author.bio}</p>
                            <div className="flex gap-4 mt-4">
                                <button className="text-blue-600 hover:text-blue-800" onClick={()=>{
                                    setEditAuthor(author)
                                    setShowModal(true)
                                }}>
                                    <FiEdit2 size={18} />
                                </button>

                                <button className="text-red-600 hover:text-red-800" onClick={()=>handleDelete(author.id)}>
                                    <FiTrash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {showModal && (
                <AuthorFormModal initialData={editAuthor} 
                    onClose ={()=> setShowModal(false)}
                    onSave = {handleformSubmit} />
            )}
        </div>
    )
}