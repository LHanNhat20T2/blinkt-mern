import { useDispatch, useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit";
import { useEffect, useState } from "react";
import Axios from "../utils/Axios";
import SummaryApi from "../commom/SummaryApi.js";
import toast from "react-hot-toast";
import fetchUserDetails from "../utils/FetchUserDetail";
import { setUserDetails } from "../store/userSlice";
const Profile = () => {
    const user = useSelector((state) => state.user);
    const [openProfileAvatarEdit, setProfileAvatarEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const dispatch = useDispatch();
    const [userData, setUserData] = useState({
        name: user.name || "",
        email: user.email || "",
        mobile: user.mobile || "",
    });

    const handleOnchange = (e) => {
        const { name, value } = e.target;
        setUserData((preve) => {
            return {
                ...preve,
                [name]: value,
            };
        });
    };

    useEffect(() => {
        setUserData({
            name: user.name || "",
            email: user.email || "",
            mobile: user.mobile || "",
        });
    }, [user]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.updateUserDetails,
                data: userData,
            });
            const { data: responseData } = response;
            if (responseData.success) {
                const userData = await fetchUserDetails();
                dispatch(setUserDetails(userData.data));
                toast.success(responseData.message);
            }
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    };
    return (
        <div>
            <div className="flex items-center justify-center w-16 h-16 overflow-hidden bg-red-500 rounded-full drop-shadow-sm ">
                {user.avatar ? (
                    <img
                        src={user.avatar}
                        alt={user.name}
                        className="w-full h-full rounded-full"
                    />
                ) : (
                    <FaRegUserCircle size={60} />
                )}
            </div>
            <button
                onClick={() => setProfileAvatarEdit(true)}
                className="px-3 py-1 mt-3 text-sm border rounded-full hover:bg-primary-200 border-primary-100 hover:border-primary-200 min-w-20"
            >
                Edit
            </button>

            {openProfileAvatarEdit && (
                <UserProfileAvatarEdit
                    close={() => setProfileAvatarEdit(false)}
                />
            )}

            {/* name, email, mobile */}
            <form
                action=""
                className="grid gap-4 my-4 "
                onSubmit={handleSubmit}
            >
                <div className="grid ">
                    <label htmlFor="">Name</label>
                    <input
                        type="text"
                        placeholder="Enter your name"
                        className="p-2 border rounded outline-none bg-blue-50 focus-within:border-primary-200"
                        value={userData.name}
                        name="name"
                        onChange={handleOnchange}
                        required
                    />
                </div>
                <div className="grid">
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        placeholder="Enter your email"
                        className="p-2 border rounded outline-none bg-blue-50 focus-within:border-primary-200"
                        value={userData.email}
                        name="email"
                        onChange={handleOnchange}
                        required
                    />
                </div>
                <div className="grid">
                    <label htmlFor="mobile">Mobile</label>
                    <input
                        type="text"
                        id="mobile"
                        placeholder="Enter your mobile"
                        className="p-2 border rounded outline-none bg-blue-50 focus-within:border-primary-200"
                        value={userData.mobile}
                        name="mobile"
                        onChange={handleOnchange}
                        required
                    />
                </div>
                <button className="px-4 py-2 font-semibold border rounded hover:bg-primary-100 border-primary-100 text-primary-200 hover:text-neutral-800">
                    {loading ? "Loading..." : "Submit"}
                </button>
            </form>
        </div>
    );
};
export default Profile;
