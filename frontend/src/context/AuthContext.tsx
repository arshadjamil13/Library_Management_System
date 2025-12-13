import { createContext,useState ,useContext} from "react";

interface AuthContextType{
    user: any;
    token: string | null;
    login: (token: string, user: any) => void;
    logout: () => void;
}

const AuthContext= createContext<AuthContextType>({
    user:null,
    token: null,
    login: () => {},
    logout: () => {},
})

export const AuthProvider =({children} : any)=>{
    const[token,setToken] = useState<string | null>(localStorage.getItem("token"));
    const[user,setUser] = useState<any >(JSON.parse(localStorage.getItem("user") || "null"));

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
    <AuthContext.Provider value={{user,token,login,logout}}>
        {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext);