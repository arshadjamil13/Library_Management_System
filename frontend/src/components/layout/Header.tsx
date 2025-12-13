import { useAuth } from "../../context/AuthContext"
export default function Header(){
  const {user} = useAuth();
  const name = user ? user.name.split(" ").map((word :string) => word[0].toUpperCase()).join("") : "U";
    return(
        <header className="h-16 px-6 bg-white border-b flex items-center justify-between shadow-sm">
          

            <div className="flex-1 flex justify-center">
            <div className="w-full max-w-xl relative">
          <input
            type="text"
            placeholder="Search for books, authors..."
            className="w-full py-2 pl-10 pr-4 border rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          
          
          <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
            🔍
          </span>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Circle Avatar */}
        <div className="h-10 w-10 rounded-full bg-gray-200 flex items-center justify-center font-semibold">
          {name}
        </div>

        {/* Name */}
        <span className="font-medium text-gray-700">{user.name}</span>

       
      </div>

    </header>
    )
}