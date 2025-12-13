import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function AppLayout(){
    return(
        <div className="flex h-screen bg-gray-100">
            <Sidebar />

            <div className="flex flex-col flex-1">
                <Header />
                <main className="flex-1 p-6 overflow-y-auto">
                    <Outlet />
                </main>
            </div>
        </div>
    )
}