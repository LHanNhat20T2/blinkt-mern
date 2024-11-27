import { useState } from "react";
import { FaCloudUploadAlt } from "react-icons/fa";
import uploadImage from "../utils/UploadImage";
import Loading from "../components/Loading";
import ViewImage from "../components/ViewImage";
import AddFieldComponent from "../components/AddFieldComponent";
import { MdDelete } from "react-icons/md";
import { useSelector } from "react-redux";
import { IoClose } from "react-icons/io5";
import AxiosToastError from "../utils/AxiosToastError";
import SummaryApi from "../commom/SummaryApi";
import Axios from "../utils/Axios";
import toast from "react-hot-toast";
import successAlert from "../utils/SuccessAlert";

const UploadProduct = () => {
    const [data, setData] = useState({
        name: "",
        image: [],
        category: [],
        subCategory: [],
        unit: "",
        stock: "",
        price: "",
        discount: "",
        description: "",
        more_details: {},
    });
    const [imageLoading, setImageLoading] = useState(false);
    const [viewImageURL, setViewImageURL] = useState("");
    const allCategory = useSelector((state) => state.product.allCategory);
    const [selectCategory, setSelectCategory] = useState("");
    const [selectSubCategory, setSelectSubCategory] = useState("");
    const allSubcategory = useSelector((state) => state.product.allSubCategory);
    console.log("Sub category", allSubcategory);
    const [openAddField, setOpenAddField] = useState(false);
    const [fieldName, setFieldName] = useState("");

    const handleChange = (e) => {
        const { name, value } = e.target;
        setData((preve) => {
            return { ...preve, [name]: value };
        });
    };

    const handleUploadImage = async (e) => {
        const file = e.target.files[0];

        if (!file) return;

        setImageLoading(true);
        const response = await uploadImage(file);
        const { data: ImageResponse } = response;

        const imageUrl = ImageResponse.data.url;

        setData((preve) => {
            return {
                ...preve,
                image: [...preve.image, imageUrl],
            };
        });
        setImageLoading(false);
    };

    const handleDeleteImage = async (index) => {
        data.image.splice(index, 1);
        setData((preve) => {
            return {
                ...preve,
            };
        });
    };

    const handleRemoveCategory = async (index) => {
        data.category.splice(index, 1);
        setData((preve) => {
            return {
                ...preve,
            };
        });
    };

    const handleRemoveSubCategory = async (index) => {
        data.subCategory.splice(index, 1);
        setData((preve) => {
            return {
                ...preve,
            };
        });
    };

    const handleAddField = () => {
        setData((preve) => {
            return {
                ...preve,
                more_details: {
                    ...preve.more_details,
                    [fieldName]: "",
                },
            };
        });
        setFieldName("");
        setOpenAddField(false);
    };
    const handleSubmit = async (e) => {
        e.preventDefault();
        // console.log("data", data)
        try {
            const response = await Axios({
                ...SummaryApi.createProduct,
                data: data,
            });

            const { data: responseData } = response;
            if (responseData.success) {
                successAlert(responseData.message);
                setData({
                    name: "",
                    image: [],
                    category: [],
                    subCategory: [],
                    unit: "",
                    stock: "",
                    price: "",
                    discount: "",
                    description: "",
                    more_details: {},
                });
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };
    return (
        <section className="">
            <div className="flex items-center justify-between p-2 bg-white shadow-md ">
                <h2 className="font-semibold">Upload Product</h2>
            </div>
            <div className="grid p-3">
                <form action="" className="grid gap-4" onSubmit={handleSubmit}>
                    <div className="grid gap-1">
                        <label className="font-medium" htmlFor="name">
                            Name
                        </label>
                        <input
                            id="name"
                            type="text"
                            placeholder="Enter your name"
                            name="name"
                            value={data.name}
                            onChange={handleChange}
                            required
                            className="p-2 border rounded outline-none bg-blue-50 focus-within:border-primary-200"
                        />
                    </div>
                    <div className="grid gap-1">
                        <label className="font-medium" htmlFor="description">
                            Description
                        </label>
                        <textarea
                            id="description"
                            type="text"
                            placeholder="Enter your description"
                            name="description"
                            value={data.description}
                            onChange={handleChange}
                            required
                            rows={2}
                            className="p-2 border rounded outline-none bg-blue-50 focus-within:border-primary-200"
                        />
                    </div>
                    <div className="grid gap-1">
                        <p>Image</p>
                        <div className="">
                            <label
                                htmlFor="productImage"
                                className="flex items-center justify-center h-24 border rounded bg-blue-50"
                            >
                                <div className="flex flex-col items-center justify-center text-center">
                                    {imageLoading ? (
                                        <Loading />
                                    ) : (
                                        <>
                                            <FaCloudUploadAlt size={35} />
                                            <p>Upload Image</p>
                                        </>
                                    )}
                                </div>
                                <input
                                    id="productImage"
                                    type="file"
                                    className="hidden"
                                    accept="image/*"
                                    onChange={handleUploadImage}
                                />
                            </label>
                            {/* dispaly uploaded image */}
                            <div className="flex flex-wrap gap-4 my-2">
                                {data.image.map((img, index) => (
                                    <div
                                        key={img + index}
                                        className="relative w-20 h-20 mt-1 border min-w-20 bg-blue-50 group"
                                    >
                                        <img
                                            src={img}
                                            alt={img}
                                            className="object-scale-down w-full h-full cursor-pointer"
                                            onClick={() => setViewImageURL(img)}
                                        />
                                        <div
                                            onClick={() =>
                                                handleDeleteImage(index)
                                            }
                                            className="absolute bottom-0 right-0 hidden p-1 text-white bg-red-600 rounded hover:bg-red-600 group-hover:block"
                                        >
                                            <MdDelete />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="grid-gap-1">
                        <label className="font-medium" htmlFor="">
                            Category
                        </label>
                        <div>
                            <select
                                className="w-full p-2 border rounded bg-blue-50"
                                value={selectCategory}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const category = allCategory.find(
                                        (el) => el._id === value
                                    );
                                    setData((preve) => {
                                        return {
                                            ...preve,
                                            category: [
                                                ...preve.category,
                                                category,
                                            ],
                                        };
                                    });
                                    setSelectCategory("");
                                }}
                            >
                                <option value="" className="text-neutral-600">
                                    Select Category
                                </option>
                                {allCategory?.map((c, index) => (
                                    <option value={c._id} key={index}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                            <div className="flex flex-wrap gap-3">
                                {data.category.map((c, index) => (
                                    <div
                                        key={c._id + index + "productsection"}
                                        className="flex items-center gap-1 text-sm bg-blue-50"
                                    >
                                        <p>{c.name}</p>
                                        <div
                                            className="cursor-pointer hover:text-red-500"
                                            onClick={() =>
                                                handleRemoveCategory(index)
                                            }
                                        >
                                            <IoClose size={20} />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="grid-gap-1">
                        <label className="font-medium" htmlFor="">
                            Sub Category
                        </label>
                        <div>
                            <select
                                className="w-full p-2 border rounded bg-blue-50"
                                value={selectSubCategory}
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const subCategory = allSubcategory.find(
                                        (el) => el._id === value
                                    );
                                    setData((preve) => {
                                        return {
                                            ...preve,
                                            subCategory: [
                                                ...preve.subCategory,
                                                subCategory,
                                            ],
                                        };
                                    });
                                    setSelectSubCategory("");
                                }}
                            >
                                <option value="" className="text-neutral-600">
                                    Select Sub Category
                                </option>
                                {allSubcategory?.map((c, index) => (
                                    <option value={c._id} key={index}>
                                        {c.name}
                                    </option>
                                ))}
                            </select>
                            <div className="flex flex-wrap gap-3">
                                {data.subCategory.map((c, index) => (
                                    <div
                                        key={c._id + index + "productsection"}
                                        className="flex items-center gap-1 text-sm bg-blue-50"
                                    >
                                        <p>{c.name}</p>
                                        <div
                                            className="cursor-pointer hover:text-red-500"
                                            onClick={() =>
                                                handleRemoveCategory(index)
                                            }
                                        >
                                            <IoClose
                                                size={20}
                                                onClick={() =>
                                                    handleRemoveSubCategory(
                                                        index
                                                    )
                                                }
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="grid gap-1">
                        <label className="font-medium" htmlFor="unit">
                            Unit
                        </label>
                        <input
                            id="unit"
                            type="text"
                            placeholder="Enter your unit"
                            name="unit"
                            value={data.unit}
                            onChange={handleChange}
                            required
                            className="p-2 border rounded outline-none bg-blue-50 focus-within:border-primary-200"
                        />
                    </div>{" "}
                    <div className="grid gap-1">
                        <label className="font-medium" htmlFor="stock">
                            Number of Stock
                        </label>
                        <input
                            id="stock"
                            type="number"
                            placeholder="Enter your stock"
                            name="stock"
                            value={data.stock}
                            onChange={handleChange}
                            required
                            className="p-2 border rounded outline-none bg-blue-50 focus-within:border-primary-200"
                        />
                    </div>
                    <div className="grid gap-1">
                        <label className="font-medium" htmlFor="price">
                            Price
                        </label>
                        <input
                            id="price"
                            type="number"
                            placeholder="Enter your price"
                            name="price"
                            value={data.price}
                            onChange={handleChange}
                            required
                            className="p-2 border rounded outline-none bg-blue-50 focus-within:border-primary-200"
                        />
                    </div>
                    <div className="grid gap-1">
                        <label className="font-medium" htmlFor="discount">
                            Discount
                        </label>
                        <input
                            id="discount"
                            type="number"
                            placeholder="Enter your discount"
                            name="discount"
                            value={data.discount}
                            onChange={handleChange}
                            required
                            className="p-2 border rounded outline-none bg-blue-50 focus-within:border-primary-200"
                        />
                    </div>
                    {/* add more field */}
                    <div>
                        {Object.keys(data.more_details)?.map((k, index) => (
                            <div className="grid gap-1" key={index}>
                                <label className="font-medium" htmlFor={k}>
                                    {k}
                                </label>
                                <input
                                    id={k}
                                    type="text"
                                    value={data?.more_details[k]}
                                    onChange={(e) => {
                                        const value = e.target.value;
                                        setData((preve) => {
                                            return {
                                                ...preve,
                                                more_details: {
                                                    ...preve.more_details,
                                                    [k]: value,
                                                },
                                            };
                                        });
                                    }}
                                    required
                                    className="p-2 border rounded outline-none bg-blue-50 focus-within:border-primary-200"
                                />
                            </div>
                        ))}
                    </div>
                    <div
                        onClick={() => setOpenAddField(true)}
                        className="w-32 px-3 py-1 font-semibold text-center bg-white border rounded cursor-pointer hover:bg-primary-200 border-primary-200 hover:text-neutral-900"
                    >
                        Add Fields
                    </div>
                    <button className="py-2 font-semibold rounded bg-primary-100 hover:bg-primary-200">
                        Submit
                    </button>
                </form>
            </div>

            {viewImageURL && (
                <ViewImage
                    url={viewImageURL}
                    close={() => setViewImageURL("")}
                />
            )}

            {openAddField && (
                <AddFieldComponent
                    value={fieldName}
                    onChange={(e) => setFieldName(e.target.value)}
                    submit={handleAddField}
                    close={() => setOpenAddField(false)}
                />
            )}
        </section>
    );
};
export default UploadProduct;
