import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../commom/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError.js";

const ForgotPassword = () => {
    const [data, setData] = useState({
        email: "",
    });
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
                ...SummaryApi.forgot_password,
                data: data,
            });

            if (res.data.error) {
                toast.error(res.data.message);
            }

            if (res.data.success) {
                toast.success(res.data.message);

                navigate("/verification-otp", {
                    state: data,
                });
                setData({
                    email: "",
                });
            }

            console.log("res", res);
        } catch (error) {
            AxiosToastError(error);
        }
    };
    return (
        <section className="container w-full px-2 mx-auto ">
            <div className="w-full max-w-lg p-5 mx-auto my-2 bg-white rounded">
                <p className="text-lg font-semibold">Forgot Password</p>
                <form
                    action=""
                    onSubmit={handleSubmit}
                    className="grid gap-4 py-4 "
                >
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
                    <button
                        disabled={!valideValue}
                        className={`${
                            valideValue
                                ? "bg-green-800 hover:bg-green-700"
                                : "bg-gray-500"
                        }  py-2 my-3 font-semibold tracking-wide text-white rounded`}
                    >
                        Send Otp
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
export default ForgotPassword;
