import UploadCategoryModel from "../components/UploadCategoryModel";

const CategoryPage = () => {
    return (
        <section>
            <div className="flex items-center justify-between p-2 bg-white shadow-md ">
                <h2 className="font-semibold">Category</h2>
                <button className="px-3 py-1 text-sm border rounded border-primary-200 hover:bg-primary-200"></button>
            </div>

            <UploadCategoryModel />
        </section>
    );
};
export default CategoryPage;
