import { useState } from "react";
import { FiEyeOff } from "react-icons/fi";
import { LuEye } from "react-icons/lu";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../commom/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError.js";

const Register = () => {
    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
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
        if (data.password !== data.confirmPassword) {
            toast.error(
                "password and confirm password must be a  zzzz samessss"
            );
            return;
        }

        try {
            const res = await Axios({
                ...SummaryApi.register,
                data: data,
            });

            if (res.data.error) {
                toast.error(res.data.message);
            }

            if (res.data.success) {
                toast.success(res.data.message);
                setData({
                    name: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
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
                <p>Welcome to Binkeyit</p>

                <form
                    action=""
                    onSubmit={handleSubmit}
                    className="grid gap-4 mt-4"
                >
                    <div className="grid gap-2">
                        <label htmlFor="name">Name : </label>
                        <input
                            type="text"
                            id="name"
                            autoFocus
                            name="name"
                            className="p-2 border rounded outline-none bg-blue-50 focus:border-primary-200"
                            value={data.name}
                            onChange={handleChange}
                            placeholder="Enter your name"
                        />
                    </div>
                    <div className="grid gap-2">
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
                    <div className="grid gap-2">
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
                    </div>
                    <div className="grid gap-2">
                        <label htmlFor="password">Confirm Password : </label>
                        <div className="flex items-center p-2 border rounded bg-blue-50 focus-within:border-primary-200">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                id="confirmPassword"
                                autoFocus
                                name="confirmPassword"
                                className="w-full mr-1 outline-none"
                                value={data.confirmPassword}
                                onChange={handleChange}
                                placeholder="Enter your confirm confirmPassword"
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
                        Register
                    </button>
                </form>

                <p className="text-right">
                    ALready have account ?
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
export default Register;
