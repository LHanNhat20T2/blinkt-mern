import { useState } from "react";
import { IoClose } from "react-icons/io5";
import uploadImage from "../utils/UploadImage";
import { useSelector } from "react-redux";

const UploadSubCategoryModel = ({ close }) => {
    const [subCategoryData, setSubCategoryData] = useState({
        name: "",
        image: "",
        category: [],
    });
    const allCategory = useSelector((state) => state.product.allCategory);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setSubCategoryData((preve) => {
            return {
                ...preve,
                [name]: value,
            };
        });
    };

    const handleUploadSubCategoryImage = async (e) => {
        const file = e.target.files[0];
        if (!file) {
            return;
        }

        const response = await uploadImage(file);
        const { data: ImageResponse } = response;

        setSubCategoryData((preve) => {
            return {
                ...preve,
                image: ImageResponse.data.url,
            };
        });
    };

    const handleRemoveCategorySelected = (categoryId) => {
        const index = subCategoryData.category.findIndex(
            (el) => el._id === categoryId
        );
        subCategoryData.category.splice(index, 1);
        setSubCategoryData((preve) => {
            return {
                ...preve,
            };
        });
    };

    const handleSubmitSubCategory = async (e) => {
        e.preventDefault();
    };
    return (
        <section className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-neutral-800 opacity-70">
            <div className="w-full max-w-5xl p-4 bg-white rounded">
                <div className="flex items-center justify-between gap-3">
                    <h1 className="font-semibold">Add sub Category</h1>
                    <button onClick={close}>
                        <IoClose size={25} />
                    </button>
                </div>
                <form
                    className="grid gap-3 my-3"
                    onSubmit={handleSubmitSubCategory}
                >
                    <div className="grid gap-1">
                        <label htmlFor="name">Name</label>
                        <input
                            id="name"
                            name="name"
                            value={subCategoryData.name}
                            onChange={handleChange}
                            type="text"
                            className="p-3 border rounded outline-none bg-blue-50 focus-within:border-primary-200 "
                        />
                    </div>
                    <div className="gap-1 gird">
                        <label htmlFor="">Image</label>
                        <div className="flex flex-col items-center gap-3 lg:flex-row">
                            <div className="flex items-center justify-center w-full border h-36 lg:w-36 bg-blue-50">
                                {!subCategoryData.image ? (
                                    <p className="text-sm text-neutral-400">
                                        No Image
                                    </p>
                                ) : (
                                    <img
                                        src={subCategoryData.image}
                                        alt="subCategory"
                                        className="object-scale-down w-full h-full"
                                    />
                                )}
                            </div>
                            <label htmlFor="uploadSubCategoryImage">
                                <div className="px-4 py-1 border rounded cursor-pointer border-primary-100 text-primary-200 hover:bg-primary-200 hover:text-neutral-900">
                                    Upload Image
                                </div>
                                <input
                                    type="file"
                                    id="uploadSubCategoryImage"
                                    className="hidden"
                                    onChange={handleUploadSubCategoryImage}
                                />
                            </label>
                        </div>
                    </div>
                    <div className="grid gap-x-1">
                        <label htmlFor="">Select Category</label>
                        <div className="border rounded focus-within:border-primary-200">
                            {/* display value */}
                            <div className="flex gap-2 flex-wap">
                                {subCategoryData.category.map((cat, index) => {
                                    return (
                                        <p
                                            key={cat._id + "selectedValue"}
                                            className="flex items-center gap-2 px-1 m-1 bg-white shadow-md"
                                        >
                                            {cat.name}
                                            <div
                                                className="cursor-pointer hover:text-red-600"
                                                onClick={() =>
                                                    handleRemoveCategorySelected(
                                                        cat._id
                                                    )
                                                }
                                            >
                                                <IoClose size={20} />
                                            </div>
                                        </p>
                                    );
                                })}
                            </div>
                            {/* select category */}
                            <select
                                className="w-full p-2 bg-transparent border outline-none"
                                onChange={(e) => {
                                    const value = e.target.value;
                                    const categoryDetails = allCategory.find(
                                        (el) => el._id === value
                                    );
                                    setSubCategoryData((preve) => {
                                        return {
                                            ...preve,
                                            category: [
                                                ...preve.category,
                                                categoryDetails,
                                            ],
                                        };
                                    });
                                }}
                            >
                                {allCategory.map((category) => (
                                    <option
                                        value={category?._id}
                                        key={category._id + "subcategory"}
                                    >
                                        {category?.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    <button
                        className={`px-4 py-1 border
                    ${
                        subCategoryData?.name &&
                        subCategoryData?.image &&
                        subCategoryData?.category[0]
                            ? "bg-primary-200 hover:bg-primary-100 "
                            : "bg-gray-200"
                    }
                    font-semibold
                     
                    `}
                    >
                        Submit
                    </button>
                </form>
            </div>
        </section>
    );
};
export default UploadSubCategoryModel;
