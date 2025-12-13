import { useState,useEffect } from "react"

interface BookFormModalProps{
    isOpen : boolean,
    onClose : ()=> void,
    onSave : (data : any)=>void ,
    initialData ?: any;
}

export default function BookFormModal({isOpen, onClose, onSave, initialData}:BookFormModalProps){
    const [formData,setformData] = useState({
        title : "" ,
        author : "",
        genre :"",
        description : ""
    })

    useEffect(()=>{
        if(initialData){
            setformData({
                title : initialData.title || "" ,
                author : initialData.author.name || "" ,
                genre : initialData.genre || "",
                description : initialData.description || ""
            })
        }
    },[initialData])

    if(!isOpen)return null

    const handleSubmit =()=>{
        onSave(formData)
        onClose()
    }

    const handleChange =(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
        setformData({...formData ,[e.target.name] : e.target.value})
    }

    return(
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-xl border border-gray-200">
                <h2 className="text-xl font-semibold mb-4 text-[#0E1B2B]">{initialData ? "Edit Book" :"Add New Book"}</h2>

                <div className="space-y-4">
                    <input type="text" placeholder="Book Title" name="title" value={formData.title} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300" />
                    <input type="text" placeholder="Author" name="author" value={formData.author} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300" />
                    <input type="text" placeholder="Genre" name="genre" value={formData.genre} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300" />
                    <textarea placeholder="Description" name="description" value={formData.description} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300" />
                </div>

                <div className="flex justify-end gap-3 mt-6">
                    <button onClick={onClose} className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition">Cancel</button>
                    <button onClick={handleSubmit} className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"> {initialData ? "Save changes" : "Add Book"}</button>
                </div>
            </div>
        </div>
    )
} 