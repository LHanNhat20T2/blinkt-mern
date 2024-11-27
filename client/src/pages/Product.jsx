import { useEffect, useState } from "react";
import AxiosToastError from "../utils/AxiosToastError";
import Axios from "../utils/Axios";
import SummaryApi from "../commom/SummaryApi";

const Product = () => {
    const [productData, setProductData] = useState([]);
    const [page, setpage] = useState(1);

    const fetchProductData = async () => {
        try {
            const response = await Axios({
                ...SummaryApi.getProduct,
                data: {
                    page: page,
                },
            });
            const { data: responseData } = response;

            if (responseData.success) {
                setProductData(responseData.data);
            }
        } catch (error) {
            AxiosToastError(error);
        }
    };

    useEffect(() => {
        fetchProductData();
    }, []);
    return <div>Product</div>;
};
export default Product;
