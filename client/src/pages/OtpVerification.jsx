import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Axios from "../utils/Axios";
import SummaryApi from "../commom/SummaryApi";
import AxiosToastError from "../utils/AxiostToastError.js";

const OtpVerification = () => {
    const [data, setData] = useState(["", "", "", "", "", ""]);
    const inputRef = useRef([]);
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!location?.state?.email) {
            navigate("/forgot-password");
        }
    }, []);

    const valideValue = Object.values(data).every((el) => el);

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await Axios({
                ...SummaryApi.forgot_password_otp_verification,
                data: {
                    otp: data.join(""),
                    email: location?.state?.email,
                },
            });

            if (res.data.error) {
                toast.error(res.data.message);
            }

            if (res.data.success) {
                toast.success(res.data.message);
                setData(["", "", "", "", "", ""]);
                navigate("/reset-password", {
                    state: {
                        data: res.data,
                        email: location?.state?.email,
                    },
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
                <p className="text-lg font-semibold">Enter OTP</p>
                <form
                    action=""
                    onSubmit={handleSubmit}
                    className="grid gap-4 py-4 "
                >
                    <div className="grid gap-2">
                        <label htmlFor="otp">Enter Your OTP : </label>
                        <div className="flex items-center justify-between gap-2 mt-3">
                            {data.map((el, index) => (
                                <input
                                    ref={(ref) => {
                                        inputRef.current[index] = ref;
                                        return ref;
                                    }}
                                    key={index}
                                    type="text"
                                    value={data[index]}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        const newData = [...data];
                                        newData[index] = value;
                                        setData(newData);
                                        if (value && index < 5) {
                                            inputRef.current[index + 1].focus();
                                        }
                                    }}
                                    className="w-full p-2 font-semibold text-center border rounded outline-none max-w-16 bg-blue-50 focus:border-primary-200"
                                />
                            ))}
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
                        Verify OTP
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
export default OtpVerification;
