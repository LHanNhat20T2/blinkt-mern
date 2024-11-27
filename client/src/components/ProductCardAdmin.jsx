const ProductCardAdmin = ({ data }) => {
    return (
        <div className="p-4 bg-white rounded w-36">
            <div className="">
                <img
                    src={data?.image[0]}
                    alt={data.name}
                    className="object-scale-down w-full h-full"
                />
            </div>
            <p className="font-medium text-ellipsis line-clamp-2">
                {data?.name}
            </p>
            <p className="text-slate-400">{data?.unit}</p>
        </div>
    );
};
export default ProductCardAdmin;
