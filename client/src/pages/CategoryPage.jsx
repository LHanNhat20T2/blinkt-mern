import { useEffect, useState } from "react";
import UploadCategoryModel from "../components/UploadCategoryModel";
import Loading from "../components/Loading";

const CategoryPage = () => {
    const [openUploadCategory, setOpenUploadCategory] = useState(false);
    const [loading, setLoading] = useState(false);
    const [categoryData, setCategoryData] = useState([]);

    const fetchCategory = async () => {
        try {
            setLoading(true);
        } catch (error) {
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategory();
    }, []);
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
            {categoryData[0] && !loading}
            {loading && <Loading />}

            {openUploadCategory && (
                <UploadCategoryModel
                    close={() => setOpenUploadCategory(false)}
                />
            )}
        </section>
    );
};
export default CategoryPage;
