import { useEffect, useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";
import Loading from "../components/Loading";
import NoData from "../components/NoData";
import EditCategory from "../components/EditCategory";
import ConfirmBox from "../components/ConfirmBox";
import Axios from "../utils/Axios";
import SummaryApi from "../commom/SummaryApi";
import AxiosToastError from "../utils/AxiosToastError";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";

const CategoryPage = () => {
    const [openUploadCategory, setOpenUploadCategory] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);
    const [openEdit, setOpenEdit] = useState(false);
    const [editData, setEditData] = useState({
        name: "",
        image: "",
    });
    const [openConfirmBox, setOpenConfirmBox] = useState(false);
    const [deleteCategory, setDeleteCategory] = useState({
        _id: "",
    });
    const allCategory = useSelector((state) => state.product.allCategory);

    useEffect(() => {
        setCategoryData(allCategory);
    }, [allCategory]);
    // const fetchCategory = async () => {
    //     try {
    //         setLoading(true);
    //         const response = await Axios({
    //             ...SummaryApi.getCategory,
    //         });
    //         const { data: responseData } = response;
    //         console.log(responseData);
    //         if (responseData.success) {
    //             setCategoryData(responseData.data);
    //         }
    //     } catch (error) {
    //         AxiosToastError(error);
    //     } finally {
    //         setLoading(false);
    //     }
    // };

    const handleDeleteCategory = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.deleteCategory,
                data: deleteCategory,
            });

            const { data: responseData } = response;
            if (responseData.success) {
                toast.success(responseData.message);
                fetchCategory();
                setOpenConfirmBox(false);
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };
    return (
        <section className="">
            <div className="flex items-center justify-between p-2 bg-white shadow-md ">
                <h2 className="font-semibold">Category</h2>
                <button
                    onClick={() => setOpenUploadCategory(true)}
                    className="px-3 py-1 text-sm border rounded border-primary-200 hover:bg-primary-200"
                >
                    Add Category
                </button>
            </div>
            {!categoryData[0] && !loading && <NoData />}

            <div className="grid grid-cols-2 gap-2 p-4 md:grid-cols-4 lg:grid-cols-5">
                {categoryData.map((category, index) => (
                    <div
                        className="w-32 h-56 rounded shadow-md"
                        key={category._id}
                    >
                        <img
                            alt={category.name}
                            src={category.image}
                            className="object-scale-down w-full"
                        />
                        <div className="flex items-center gap-2 h-9 ">
                            <button
                                onClick={() => {
                                    setOpenEdit(true);
                                    setEditData(category);
                                }}
                                className="flex-1 py-1 font-medium text-green-600 bg-green-100 rounded hover:bg-green-200"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => {
                                    setOpenConfirmBox(true);
                                    setDeleteCategory(category);
                                }}
                                className="flex-1 py-1 font-medium text-red-600 bg-red-100 rounded hover:bg-red-200"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>

            {loading && <Loading />}

            {openUploadCategory && (
                <UploadCategoryModel
                    fetchData={fetchCategory}
                    close={() => setOpenUploadCategory(false)}
                />
            )}

            {openEdit && (
                <EditCategory
                    data={editData}
                    close={() => setOpenEdit(false)}
                    fetchData={fetchCategory}
                />
            )}

            {openConfirmBox && (
                <ConfirmBox
                    cancel={() => setOpenConfirmBox(false)}
                    close={() => setOpenConfirmBox(false)}
                    confirm={handleDeleteCategory}
                />
            )}
        </section>
    );
};
export default CategoryPage;
