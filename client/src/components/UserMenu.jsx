import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Devider from "./Divider";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryApi from "../commom/SummaryApi";
import toast from "react-hot-toast";
import { logout } from "../store/userSlice";

const UserMenu = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const handleLogout = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.logout,
            });

            if (response.data.success) {
                dispatch(logout);
                localStorage.clear();
                toast.success(response.data.message);
            }
        } catch (error) {
            console.log(error);
            AxiosToastError(error);
        }
    };
    return (
        <>
            <div className="font-sem">My account</div>
            <div className="text-sm">{user.name || user.mobile}</div>

            <Devider />

            <div className="grid gap-3 text-sm">
                <Link to={""} className="px-2 py-1 hover:bg-orange-200">
                    My orders
                </Link>
                <Link to={""} className="px-2 py-1 hover:bg-orange-200">
                    Save Address
                </Link>
                <button
                    onClick={handleLogout}
                    className="px-2 py-1 text-left hover:bg-orange-200 "
                >
                    Log out
                </button>
            </div>
        </>
    );
};
export default UserMenu;
