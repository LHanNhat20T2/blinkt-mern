import { useEffect, useState } from "react";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../commom/SummaryApi";
import Loading from "../components/Loading";
import ProductCardAdmin from "../components/ProductCardAdmin";
import { IoSearchSharp } from "react-icons/io5";
const ProductAdmin = () => {
    const [productData, setProductData] = useState([]);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);
    const [totalPageCount, setTotalPageCount] = useState(1);
    const [search, setSearch] = useState("");

    const fetchProductData = async () => {
        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.getProduct,
                data: {
                    page: page,
                    limit: 12,
                    search: search,
                },
            });
            const { data: responseData } = response;
            console.log("product", responseData);
            if (responseData.success) {
                setProductData(responseData.data);
            }
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }
    };
    console.log("product page");
    useEffect(() => {
        fetchProductData();
    }, [page]);

    const handleNext = () => {
        if (page !== totalPageCount) {
            setPage((preve) => preve + 1);
        }
    };

    const handlePrevious = () => {
        if (page > 1) {
            setPage((preve) => preve - 1);
        }
    };

    const handleOnChange = (e) => {
        const { value } = e.target;
        setSearch(value);
        setPage(1);
    };
    useEffect(() => {
        let flag = true;
        const interval = setTimeout(() => {
            if (flag) {
                fetchProductData();
                flag = false;
            }
        }, 300);
        return () => {
            clearTimeout(interval);
        };
    }, [search]);
    return (
        <section className="">
            <div className="flex items-center justify-between p-2 bg-white shadow-md ">
                <h2 className="font-semibold">Product</h2>
                <div className="flex items-center w-full h-full gap-3 px-4 py-2 ml-auto border rounded max-w-56 min-w-24 bg-blue-50 focus-within:border-primary-200">
                    <IoSearchSharp size={25} />
                    <input
                        type="text"
                        placeholder="Search product here..."
                        className="w-full h-full bg-transparent outline-none"
                        value={search}
                        onChange={handleOnChange}
                    />
                </div>
            </div>
            {loading && <Loading />}
            <div className="p-4 bg-blue-50">
                <div className="min-h-[55vh]">
                    <div className="grid grid-cols-2 gap-3 md:grid-cols-4 lg:grid-cols-5">
                        {productData.map((p, index) => (
                            <ProductCardAdmin key={index} data={p} />
                        ))}
                    </div>
                </div>

                <div className="flex items-center justify-between gap-3">
                    <button
                        onClick={handlePrevious}
                        className="px-4 py-1 border border-primary-200 hover:bg-primary-200"
                    >
                        Previous
                    </button>
                    <button className="w-full bg-white">
                        {page}/{totalPageCount}
                    </button>
                    <button
                        onClick={handleNext}
                        className="px-4 py-1 border border-primary-200 hover:bg-primary-200"
                    >
                        Next
                    </button>
                </div>
            </div>
        </section>
    );
};
export default ProductAdmin;
