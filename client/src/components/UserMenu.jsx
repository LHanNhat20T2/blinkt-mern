import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Devider from "./Divider";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryApi from "../commom/SummaryApi";
import toast from "react-hot-toast";
import { logout } from "../store/userSlice";
import { FaExternalLinkAlt } from "react-icons/fa";
import isAdmin from "../utils/isAdmin";

const UserMenu = () => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.logout,
            });

            if (response.data.success) {
                if (close) {
                    close();
                }
                dispatch(logout());
                localStorage.clear();
                toast.success(response.data.message);
                navigate("/");
                window.history.back();
            }
        } catch (error) {
            console.log(error);
            AxiosToastError(error);
        }
    };

    const handleClose = () => {
        if (close) {
            close();
        }
    };
    return (
        <>
            <div className="font-sem">My account</div>
            <div className="flex items-center gap-2 text-sm">
                <span className="m-w-52 text-ellipsis line-clamp-1 ">
                    {user.name || user.mobile}{" "}
                    <span className="text-medium">
                        {user.role === "ADMIN" ? "(Admin)" : ""}
                    </span>
                </span>
                <Link
                    onClick={handleClose}
                    to={"/dashboard/profile"}
                    className="hover:text-primary-200"
                >
                    <FaExternalLinkAlt size={15} />
                </Link>
            </div>

            <Devider />

            <div className="grid gap-3 text-sm">
                {isAdmin(user.role) && (
                    <Link
                        onClick={handleClose}
                        to={"/dashboard/category"}
                        className="px-2 py-1 hover:bg-orange-200"
                    >
                        Category
                    </Link>
                )}
                {isAdmin(user.role) && (
                    <Link
                        onClick={handleClose}
                        to={"/dashboard/subcategory"}
                        className="px-2 py-1 hover:bg-orange-200"
                    >
                        Sub category
                    </Link>
                )}
                {isAdmin(user.role) && (
                    <Link
                        onClick={handleClose}
                        to={"/dashboard/upload-product"}
                        className="px-2 py-1 hover:bg-orange-200"
                    >
                        Upload Product
                    </Link>
                )}
                {isAdmin(user.role) && (
                    <Link
                        onClick={handleClose}
                        to={"/dashboard/product"}
                        className="px-2 py-1 hover:bg-orange-200"
                    >
                        Product
                    </Link>
                )}
                <Link
                    onClick={handleClose}
                    to={"/dashboard/myorders"}
                    className="px-2 py-1 hover:bg-orange-200"
                >
                    My orders
                </Link>
                <Link
                    onClick={handleClose}
                    to={"/dashboard/address"}
                    className="px-2 py-1 hover:bg-orange-200"
                >
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
