import { useState } from "react";
import { FiEyeOff } from "react-icons/fi";
import { LuEye } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../commom/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError.js";

const Login = () => {
    const [data, setData] = useState({
        email: "",
        password: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((pre) => {
            return {
                ...pre,
                [name]: value,
            };
        });
    };

    const valideValue = Object.values(data).every((el) => el);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await Axios({
                ...SummaryApi.login,
                data: data,
            });

            if (res.data.error) {
                toast.error(res.data.message);
            }

            if (res.data.success) {
                toast.success(res.data.message);
                localStorage.setItem("accessToken", res.data.data.accessToken);
                localStorage.setItem(
                    "refreshToken",
                    res.data.data.refreshToken
                );
                setData({
                    email: "",
                    password: "",
                });
                navigate("/");
            }

            console.log("res", res);
        } catch (error) {
            AxiosToastError(error);
        }
    };
    return (
        <section className="container w-full px-2 mx-auto ">
            <div className="w-full max-w-lg p-5 mx-auto my-2 bg-white rounded">
                <form
                    action=""
                    onSubmit={handleSubmit}
                    className="grid gap-4 py-4 "
                >
                    <div className="grid gap-2 mt-6">
                        <label htmlFor="email">Email : </label>
                        <input
                            type="text"
                            id="email"
                            autoFocus
                            name="email"
                            className="p-2 border rounded outline-none bg-blue-50 focus:border-primary-200"
                            value={data.email}
                            onChange={handleChange}
                            placeholder="Enter your email"
                        />
                    </div>
                    <div className="grid gap-2 mt-6">
                        <label htmlFor="password">Password : </label>
                        <div className="flex items-center p-2 border rounded bg-blue-50 focus-within:border-primary-200">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                autoFocus
                                name="password"
                                className="w-full mr-1 outline-none"
                                value={data.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
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
                        <Link
                            to={"/forgot-password"}
                            className="block ml-auto hover:text-primary-200"
                        >
                            Forgot Password
                        </Link>
                    </div>
                    <button
                        disabled={!valideValue}
                        className={`${
                            valideValue
                                ? "bg-green-800 hover:bg-green-700"
                                : "bg-gray-500"
                        }  py-2 my-3 font-semibold tracking-wide text-white rounded`}
                    >
                        Login
                    </button>
                </form>

                <p className="text-right">
                    Don&apos;t have account ?
                    <Link
                        to={"/register"}
                        className="font-semibold text-green-700 hover:text-green-800"
                    >
                        Register
                    </Link>
                </p>
            </div>
        </section>
    );
};
export default Login;
