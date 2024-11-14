import { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import Axios from "../utils/Axios";
import SummaryApi from "../commom/SummaryApi";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError";
import { FiEyeOff } from "react-icons/fi";
import { LuEye } from "react-icons/lu";
const ResetPassword = () => {
    const location = useLocation();
    console.log("resetpassword", location);
    const navigate = useNavigate();
    const [data, setData] = useState({
        email: "",
        newPassword: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const valideValue = Object.values(data).every((el) => el);

    useEffect(() => {
        if (!location?.state?.data?.success) {
            navigate("/");
        }

        if (location?.state?.email) {
            setData((preve) => {
                return {
                    ...preve,
                    email: location?.state?.email,
                };
            });
        }
    }, [location?.state?.email]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((pre) => {
            return {
                ...pre,
                [name]: value,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (data.newPassword !== data.confirmPassword) {
            toast.error("New password and confirm password must be same");
            return;
        }

        try {
            const response = await Axios({
                ...SummaryApi.resetPassword,
                data: data,
            });

            if (response.data.error) {
                toast.error(response.data.message);
            }

            if (response.data.success) {
                toast.success(response.data.message);

                navigate("/login");
                setData({
                    email: "",
                    newPassword: "",
                    confirmPassword: "",
                });
            }

            console.log("res", response);
        } catch (error) {
            AxiosToastError(error);
        }
    };
    return (
        <section className="container w-full px-2 mx-auto ">
            <div className="w-full max-w-lg p-5 mx-auto my-2 bg-white rounded">
                <p className="text-lg font-semibold">Enter Your Password</p>
                <form
                    action=""
                    onSubmit={handleSubmit}
                    className="grid gap-4 py-4 "
                >
                    <div className="grid gap-2 ">
                        <label htmlFor="newPassword">New Password : </label>
                        <div className="flex items-center p-2 border rounded bg-blue-50 focus-within:border-primary-200">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="newPassword"
                                autoFocus
                                name="newPassword"
                                className="w-full mr-1 outline-none"
                                value={data.newPassword}
                                onChange={handleChange}
                                placeholder="Enter your new password"
                            />
                            <div
                                onClick={() => setShowPassword((pre) => !pre)}
                                className="cursor-pointer"
                            >
                                {showPassword ? (
                                    <LuEye size={22} />
                                ) : (
                                    <FiEyeOff size={22} />
                                )}
                            </div>
                        </div>
                    </div>

                    <div className="grid gap-2 ">
                        <label htmlFor="confirmPassword">
                            Confirm Password :{" "}
                        </label>
                        <div className="flex items-center p-2 border rounded bg-blue-50 focus-within:border-primary-200">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                autoFocus
                                name="confirmPassword"
                                className="w-full mr-1 outline-none"
                                value={data.confirmPassword}
                                onChange={handleChange}
                                placeholder="Enter your confirm password"
                            />
                            <div
                                onClick={() =>
                                    setShowConfirmPassword((pre) => !pre)
                                }
                                className="cursor-pointer"
                            >
                                {showConfirmPassword ? (
                                    <LuEye size={22} />
                                ) : (
                                    <FiEyeOff size={22} />
                                )}
                            </div>
                        </div>
                    </div>
                    <button
                        disabled={!valideValue}
                        className={`${
                            valideValue
                                ? "bg-green-800 hover:bg-green-700"
                                : "bg-gray-500"
                        }  py-2 my-3 font-semibold tracking-wide text-white rounded`}
                    >
                        Change Password
                    </button>
                </form>

                <p className="text-right">
                    Already have account ?
                    <Link
                        to={"/login"}
                        className="font-semibold text-green-700 hover:text-green-800"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </section>
    );
};
export default ResetPassword;
