import { createContext,useState ,useContext,useEffect} from "react";

interface AuthContextType{
    user: any;
    token: string | null;
    Loading : boolean
    login: (token: string, user: any) => void;
    logout: () => void;
}

const AuthContext= createContext<AuthContextType>({
    user:null,
    token: null,
    Loading :true ,
    login: () => {},
    logout: () => {},
})

export const AuthProvider =({children} : any)=>{
    const[token,setToken] = useState<string | null>(localStorage.getItem("token"));
    const[user,setUser] = useState<any >(JSON.parse(localStorage.getItem("user") || "null"));
    const [Loading,setLoading] = useState(true)

    useEffect(() => {
    const storedToken = localStorage.getItem("token")
    const storedUser = localStorage.getItem("user")

    if (storedToken && storedUser) {
      setToken(storedToken)
      setUser(JSON.parse(storedUser))
    }

    setLoading(false) // ✅ auth initialization complete
  }, [])

    const login = (token: string, user: any) => {
    setToken(token);
    setUser(user);
    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));
    };

    const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  };
  return(
    <AuthContext.Provider value={{user,token,Loading,login,logout}}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);