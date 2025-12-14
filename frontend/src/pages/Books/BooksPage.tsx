import { useEffect, useMemo, useState } from "react"
import { FiBook, FiEdit2, FiTrash2 } from "react-icons/fi"
import BookFormModal from "./BookFormModal" 
import { useAuth } from "../../context/AuthContext";
import type { Book } from "../../models/Books";
import { AddBooks, BorrowBook, DeleteBook, EditBooks, getAllBooks } from "../../api/books";
import { returnBook } from "../../api/dashboard";



export default function BooksPage(){
    const {token,user} = useAuth()
    const[isModalOpen ,setIsModalOpen] = useState(false)
    const [editBook,seteditBook] = useState<any>(null)
    const [books,setBooks] = useState<Book[]>([])
    const [searchTitle,setSearchTitle] = useState("")
    const [filterAuthor,setFilterAuthor] = useState("")
    const [filterGenre,setFilterGenre] = useState("")

    useEffect(()=>{
        const fetchBooks = async ()=>{
            const result = await getAllBooks(token)
            setBooks(result.data)
        } 
        fetchBooks()
    },[token])

    const authors = useMemo(()=>{
        return Array.from(new Set(books.map((b)=> b.author.name)))
    },[books])

    const genres = useMemo(()=>{
        return Array.from(new Set(books.map((b)=>b.genre)))
    },[books])

    const filteredBooks = books.filter((book)=>{
        return(
            book.title.toLowerCase().includes(searchTitle.toLowerCase()) && 
            (filterAuthor ? book.author.name === filterAuthor : true)&&
            (filterGenre ? book.genre === filterGenre : true)
        )
    })

    const handleAddBook = ()=>{
        seteditBook(null)
        setIsModalOpen(true)
    }
    const handleEditBook = (book : any)=>{
        seteditBook(book)
        setIsModalOpen(true)
    }

    const handleFormSubmit = async (data :any)=>{
        try{
        if(!editBook){
            const createdBook = await AddBooks(data,token)
            console.log(createdBook)
            if(!createdBook) return 
            setBooks((prev) => [...prev, createdBook])

        }else{

            const updatedBook = await EditBooks(data,editBook.id,token)
            setBooks((prev)=>
                 prev.map((b)=> (b.id === updatedBook.id ? updatedBook : b))
            )
            setIsModalOpen(false)
            seteditBook(null)
        }
    }catch(error){
        console.error("Book save failed:", error)
    }
    }

    const handleDeleteBook = async (BookId:number)=>{
        const confirmDelete = window.confirm("Are You Sure you want to delete the book")
        if (!confirmDelete) return
        try{
            
            const deletedBook = await DeleteBook(BookId,token)
            if(deletedBook){
                setBooks((prev)=>prev.filter((book)=> book.id !== BookId))
            }
             
        }catch(error){
            console.error("Delete failed:", error)
        }
    }

    const handleBorrowBook=async(books:any)=>{
        if(!books.isBorrowed){
            try{
                const BookBorrowed = await BorrowBook(user.id,books.id,token)
                if(BookBorrowed){
                    setBooks((prev)=> prev.map((book)=>book.id === books.id ? {...book,isBorrowed: true }:book))
                }
                
            }catch(error){
                console.error("Borrow Failed : ",error)
            }
        }else{
            try{
            
                const Bookreturned = await returnBook(books.id,token)
                if(Bookreturned){
                     setBooks((prev)=> prev.map((book)=>book.id === books.id ? {...book,isBorrowed: false }:book))
                }
           
            }catch(error){
                console.error(error);
            }
        }
    }


    return(
        <div className="p-6">
            <div  className="flex flex-wrap gap-4 items-center justify-between mb-6">
                <button className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition" onClick={handleAddBook}>
                    + Add New Book
                </button>

                <input
                  type="text"
                  placeholder="Search by Title..."
                  value={searchTitle}
                  onChange={(e) => setSearchTitle(e.target.value)}
                  className="px-4 py-2 w-60 border rounded-lg shadow-sm focus:ring focus:ring-blue-200"
                />

                <select value={filterAuthor} onChange={(e) => setFilterAuthor(e.target.value)} className="px-4 py-2 border rounded-lg shadow-sm">
                <option value="">Filter by Author</option>
                {authors.map((author ) => (
                    <option key={author} value={author}>{author}</option>
                ))}
                </select>


                <select value={filterGenre} onChange={(e) => setFilterGenre(e.target.value)} className="px-4 py-2 border rounded-lg shadow-sm">
                <option value="">Filter by Genre</option>
                {genres.map((genre)=>(
                    <option value={genre} key={genre}>{genre}</option>
                ))}
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {filteredBooks.map((book)=>(
                    <div key={book.id} className="bg-white p-5 rounded-2xl shadow-sm border hover:shadow-md transition">
                         <div className="bg-[#0E1B2B] text-white w-12 h-12 flex items-center justify-center rounded-xl mb-4">
                            <FiBook size={22} />
                        </div>

                        <h2 className="text-lg font-semibold text-[#0E1B2B]">{book.title}</h2>
                        <p className="text-sm text-gray-600">{book.author.name}</p>

                        <span className="text-xs inline-block mt-2 px-3 py-1 bg-blue-100 text-blue-700 rounded-full">
                            {book.genre}
                        </span>

                        <div className="flex items-center justify-between mt-4">
                            <button className="bg-green-600 text-white px-4 py-2 rounded-md text-sm hover:bg-green-700" onClick={()=> handleBorrowBook(book)}>
                                {book.isBorrowed?"Return" : "Borrow"}
                            </button>

                            <div className="flex items-center gap-3">
                                <button className="text-blue-600 hover:text-blue-800" onClick={()=>handleEditBook(book)}>
                                    <FiEdit2 size={18} />
                                </button>

                                <button className="text-red-600 hover:text-red-800" onClick={()=>handleDeleteBook(book.id)}>
                                    <FiTrash2 size={18} />
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>

            {!filteredBooks.length && (
                <p className="text-center text-gray-500 mt-10">
                    No books found for selected filters.
                </p>
            )}
            <BookFormModal
                isOpen={isModalOpen}
                onClose ={()=> setIsModalOpen(false)}
                onSave ={handleFormSubmit}
                initialData={editBook}
            />
        </div>
    )
}