import "./App.css";
import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Toaster } from "react-hot-toast";
import fetchUserDetails from "./utils/FetchUserDetail";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserDetails } from "./store/userSlice";
import { setAllCategory, setAllSubCategory } from "./store/productSlice";
import Axios from "./utils/Axios";
import SummaryApi from "./commom/SummaryApi";

function App() {
    const dispatch = useDispatch();

    const fetchUser = async () => {
        const userData = await fetchUserDetails();
        dispatch(setUserDetails(userData.data));
        console.log("user data", userData);
    };
    const fetchCategory = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.getCategory,
            });
            const { data: responseData } = response;
            console.log(responseData);
            if (responseData.success) {
                dispatch(setAllCategory(responseData.data));
            }
        } catch (error) {
        } finally {
        }
    };
    const fetchSubCategory = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.getSubCategory,
            });
            const { data: responseData } = response;
            console.log(responseData);
            if (responseData.success) {
                dispatch(setAllSubCategory(responseData.data));
            }
        } catch (error) {
        } finally {
        }
    };

    useEffect(() => {
        fetchUser();
        fetchCategory();
        fetchSubCategory();
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
