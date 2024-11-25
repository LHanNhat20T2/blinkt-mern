import { useEffect, useState } from "react";
import UploadSubCategoryModel from "../components/UploadSubCategoryModel";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../commom/SummaryApi";
import DisplayTable from "../components/DisplayTable";
import ViewImage from "../components/ViewImage";
import { createColumnHelper } from "@tanstack/react-table";
import { BiSolidPencil } from "react-icons/bi";
import { MdDelete } from "react-icons/md";

const SubCategoryPage = () => {
    const [openAddSubCategory, setOpenAddSubCategory] = useState(false);
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);
    const columnHelper = createColumnHelper();
    const [ImageURL, setImageURL] = useState("");

    const fetchSubCategory = async () => {
        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.getSubCategory,
            });
            const { data: responseData } = response;

            if (responseData.success) {
                setData(responseData.data);
            }
        } catch (error) {
            AxiosToastError;
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchSubCategory();
    }, []);

    const column = [
        columnHelper.accessor("name", {
            header: "Name",
        }),
        columnHelper.accessor("image", {
            header: "Image",
            cell: ({ row }) => {
                console.log(row.original.image);
                return (
                    <div className="flex items-center justify-center">
                        <img
                            src={row.original.image}
                            alt={row.original.name}
                            className="w-20 h-20 cursor-pointer"
                            onClick={() => {
                                setImageURL(row.original.image);
                            }}
                        />
                    </div>
                );
            },
        }),
        columnHelper.accessor("category", {
            header: "Category",
            cell: ({ row }) => {
                return (
                    <>
                        {row.original.category.map((c, index) => (
                            <p
                                key={c.id + "table"}
                                className="inline-block px-1 shadow-md"
                            >
                                {c.name}
                            </p>
                        ))}
                    </>
                );
            },
        }),
        columnHelper.accessor("_id", {
            header: "Action",
            cell: ({ row }) => {
                return (
                    <div className="flex items-center justify-center gap-3">
                        <button className="p-2 bg-green-100 rounded hover:text-green-600">
                            <BiSolidPencil size={20} />
                        </button>
                        <button className="p-2 text-red-500 bg-red-100 rounded hover:text-red-600 ">
                            <MdDelete size={20} />
                        </button>
                    </div>
                );
            },
        }),
    ];
    return (
        <section className="">
            <div className="flex items-center justify-between p-2 bg-white shadow-md ">
                <h2 className="font-semibold">Sub Category</h2>
                <button
                    onClick={() => setOpenAddSubCategory(true)}
                    className="px-3 py-1 text-sm border rounded border-primary-200 hover:bg-primary-200"
                >
                    Add Category
                </button>
            </div>
            DisplayTable
            <div>
                <DisplayTable data={data} column={column} />
            </div>
            {openAddSubCategory && (
                <UploadSubCategoryModel
                    close={() => setOpenAddSubCategory(false)}
                />
            )}
            {ImageURL && (
                <ViewImage url={ImageURL} close={() => setImageURL("")} />
            )}
        </section>
    );
};
export default SubCategoryPage;
