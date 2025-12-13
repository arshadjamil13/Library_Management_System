import { useState } from "react"
interface Props{
    initialData ?: { name: string; bio: string } | null;
    onClose: () => void;
    onSave: (data: { name: string; bio: string }) => void;
}

export default function AuthorFormModal({ initialData, onClose, onSave }: Props) {
     const [formData,setformData] =useState({
            name : initialData ? initialData.name : "" ,
            bio : initialData ? initialData.bio : ""
        })

        const handleChange =(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>)=>{
            setformData({...formData ,[e.target.name] : e.target.value})
        }

        const handleSubmit = ()=>{
            onSave(formData)
        }
    return (
        <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white w-full max-w-lg p-6 rounded-xl shadow-xl border border-gray-200">
                <h2 className="text-xl font-semibold mb-4 text-[#0E1B2B]">
                    {initialData ? "Edit Author" : "Add New Author"}
                </h2>

                <input type="text" placeholder="Author Name" name="name" value={formData.name} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 mb-4" />
                <textarea placeholder="Bio" name="bio" value={formData.bio} onChange={handleChange} className="w-full p-3 border rounded-lg focus:ring-2 focus:ring-blue-300 mb-4" />

                <div className="flex justify-end mt-6 gap-3">
                    <button className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300" onClick={onClose}>
                        Cancel
                    </button>

                    <button className="px-5 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700" onClick={handleSubmit}>
                        {initialData ? "Save Changes" : "Add Author"}
                    </button>
                </div>
            </div>

        </div>
    )
}