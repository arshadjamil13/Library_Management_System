import { useState ,useEffect} from "react";
import { useAuth } from "../../context/AuthContext";
import { getBorrowedBooks, returnBook } from "../../api/dashboard";


export default function DashboardPage(){
    const {user} = useAuth()
    const [borrowedBooks,setBorrowedBooks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    const fetchBorrowedBooks = async () => {
        try {
            setLoading(true);
            const data = await getBorrowedBooks(user.id)
            if(!data){
                setBorrowedBooks([]);
                throw new Error("Failed to load borrowed books");
            }
            setBorrowedBooks(data);
        } catch (err: any) {
            console.error(err)
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (user?.id) fetchBorrowedBooks();
    }, [user]);


    async function handleReturn(bookId: number){
        try{

            const Bookreturned = await returnBook(bookId)
            if(Bookreturned){
                
                fetchBorrowedBooks();
            }
        }catch(error){
            console.error(error);
        }
    }
    return(
        <div className="p-6">
            <div className="flex items-center justify-between mb-6">
                <div>
                    <h1 className="text-2xl font-bold text-[#0E1B2B]">My Borrowed Books</h1>
                    <p className="text-sm text-gray-500">All books currently borrowed by you</p>
                </div>
            </div>

            <div className="bg-white rounded-2xl shadow-sm border">
                <div className="px-6 py-4 border-b flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-2 h-8 rounded bg-[#1A3A5F]" />
                        <h2 className="text-lg font-semibold text-[#0E1B2B]">Borrowed Books</h2>

                        {loading && <p className="text-gray-600">Loading...</p>}
                        

                    </div>
                    <div className="text-sm text-gray-500">{borrowedBooks.length} book(s)</div>
                </div>

                <div className="p-6 overflow-x-auto">
                   
                    {borrowedBooks.length?(<table className="min-w-full table-auto">
                                    <thead>
                                        <tr className="text-left text-sm text-gray-500 border-b">
                                            <th className="py-3 px-4">Book Title</th>
                                            <th className="py-3 px-4">Author</th>
                                            <th className="py-3 px-4">Borrow Date</th>
                                            <th className="py-3 px-4">Action</th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {borrowedBooks.map((item)=>(
                                            <tr key={item.id} className="border-b last:border-b-0 hover:bg-gray-50">
                                                <td className="py-4 px-4 font-medium text-gray-800">{item.book.title}</td>
                                                <td className="py-4 px-4 text-gray-600">{item.book.author.name}</td>
                                                <td className="py-4 px-4 text-gray-600">
                                                    {new Date(item.borrowedAt).toLocaleDateString("en-IN",{
                                                        day : "numeric",
                                                        month : "short",
                                                        year : "numeric",
                                                    })}
                                                </td>
                                                <td className="py-4 px-4">
                                                    <button
                                                    onClick={()=> handleReturn(item.bookId)}
                                                   
                                                    className="px-4 py-2 rounded-lg bg-[#1A3A5F] text-white hover:bg-[#163254]">
                                                        Return
                                                    </button>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                    </table>):(
                                        <div className="py-12 text-center text-gray-500">
                                            You have not borrowed any books yet.
                                        </div>
                                    )}
                </div>
            </div>
        </div>
    )
}