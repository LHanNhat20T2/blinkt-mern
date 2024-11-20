import { useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";

const CategoryPage = () => {
    const [openUploadCategory, setOpenUploadCategory] = useState(false);
    return (
        <section>
            <div className="flex items-center justify-between p-2 bg-white shadow-md ">
                <h2 className="font-semibold">Category</h2>
                <button
                    onClick={() => setOpenUploadCategory(true)}
                    className="px-3 py-1 text-sm border rounded border-primary-200 hover:bg-primary-200"
                >
                    Add Category
                </button>
            </div>
            {openUploadCategory && (
                <UploadCategoryModel
                    close={() => setOpenUploadCategory(false)}
                />
            )}
        </section>
    );
};
export default CategoryPage;
