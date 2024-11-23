import noDataImage from "../assets/NoData.png";

const NoData = () => {
    return (
        <div className="flex flex-col items-center justify-center gap-2 p-4">
            <img src={noDataImage} alt="No data" className="w-36" />
            <p className="text-neutral-500">No Data</p>
        </div>
    );
};
export default NoData;
