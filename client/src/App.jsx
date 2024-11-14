import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import toast, { Toaster } from "react-hot-toast";
import fetchUserDetails from "./utils/FetchUserDetail";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";

function App() {
    const dispatch = useDispatch();

    const fetchUser = async () => {
        const userData = await fetchUserDetails();
        dispatch(setUserDetails(userData.data));
        console.log("user data", userData);
    };

    useEffect(() => {
        fetchUser();
    }, []);

    return (
        <>
            <Header />
            <main className="min-h-[82vh]">
                <Outlet />
            </main>
            <Footer />
            <Toaster />
        </>
    );
}

export default App;
