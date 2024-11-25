import { useState } from "react";
import UploadSubCategoryModel from "../components/UploadSubCategoryModel";

const SubCategoryPage = () => {
    const [openAddSubCategory, setOpenAddSubCategory] = useState(false);
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

            {openAddSubCategory && (
                <UploadSubCategoryModel
                    close={() => setOpenAddSubCategory(false)}
                />
            )}
        </section>
    );
};
export default SubCategoryPage;
