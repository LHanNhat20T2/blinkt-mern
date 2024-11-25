import { IoClose } from "react-icons/io5";
const ViewImage = ({ url, close }) => {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-neutral-900 bg-opacity-70">
            <div className="w-full max-w-md p-4 max-h-[80vh] bg-white">
                <button onClick={close} className="block ml-auto w-fit">
                    <IoClose size={25} />
                </button>
                <img
                    src={url}
                    alt="full screen"
                    className="object-scale-down w-full h-full"
                />
            </div>
        </div>
    );
};
export default ViewImage;
