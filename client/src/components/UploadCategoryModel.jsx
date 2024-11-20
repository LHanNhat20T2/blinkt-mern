/* eslint-disable react/prop-types */
import { useState } from "react";
import { IoClose } from "react-icons/io5";
import uploadImage from "../utils/UploadImage";
import SummaryApi from "../commom/SummaryApi.js";
import toast from "react-hot-toast";
import AxiosToastError from "../utils/AxiosToastError.js";
import Axios from "../utils/Axios.js";
const UploadCategoryModel = ({ close }) => {
    const [data, setData] = useState({
        name: "",
        image: "",
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((preve) => {
            return {
                ...preve,
                [name]: value,
            };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.addCategory,
                data: data,
            });

            const { data: responseData } = response;
            if (responseData.success) {
                toast.success(responseData.message);
                close();
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };

    const handleUploadCategoryImage = async (e) => {
        const file = e.target.files[0];
        console.log(file);
        if (!file) {
            return;
        }

        const response = await uploadImage(file);
        console.log(response);
        const { data: ImageResponse } = response;
        setData((preve) => {
            return {
                ...preve,
                image: ImageResponse.data.url,
            };
        });
    };
    return (
        <section className="fixed inset-0 flex items-center justify-center p-4 bg-neutral-800 bg-opacity-60">
            <div className="w-full max-w-4xl p-4 bg-white rounded">
                <div className="flex items-center justify-center">
                    <h1 className="font-semibold">Category</h1>
                    <button onClick={close} className="block ml-auto w-fit">
                        <IoClose size={25} />
                    </button>
                </div>
                <form className="grid gap-2 my-3" onSubmit={handleSubmit}>
                    <div className="grid gap-1">
                        <label id="categoryName" htmlFor="">
                            Name
                        </label>
                        <input
                            type="text"
                            id="categoryName"
                            placeholder="Enter category name"
                            value={data.name}
                            name="name"
                            onChange={handleChange}
                            className="p-2 border border-blue-100 rounded outline-none bg-blue-50 focus-within:border-primary-200 "
                        />
                    </div>
                    <div className="grid gap-1">
                        <label>
                            <p>Image</p>
                            <div className="flex flex-col items-center gap-4 lg:flex-row">
                                <div className="flex items-center justify-center border rounded bg-blue-50 h-36 lg:w-36">
                                    {data.image ? (
                                        <img
                                            src={data.image}
                                            alt="category"
                                            className="object-scale-down w-full h-full"
                                        />
                                    ) : (
                                        <p className="text-sm text-neutral-500">
                                            No image
                                        </p>
                                    )}
                                </div>
                                <label htmlFor="uploadCategoryImage">
                                    <div
                                        className={`${
                                            !data.name
                                                ? "bg-gray-400"
                                                : "border-primary-200 hover:bg-primary-100"
                                        } px-4 py-2 rounded border cursor-pointer font-medium`}
                                    >
                                        Upload Image
                                    </div>
                                    <input
                                        disabled={!data.name}
                                        type="file"
                                        onChange={handleUploadCategoryImage}
                                        id="uploadCategoryImage"
                                        className="hidden"
                                    />
                                </label>
                            </div>
                        </label>
                    </div>
                    <button
                        className={`${
                            data.name && data.image
                                ? "bg-primary-200 hover:bg-primary-100"
                                : "bg-gray-300 "
                        }
                    py-2    
                    font-semibold 
                    `}
                    >
                        Add Category
                    </button>
                </form>
            </div>
        </section>
    );
};
export default UploadCategoryModel;
