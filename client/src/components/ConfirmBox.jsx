import { IoClose } from "react-icons/io5";

const ConfirmBox = ({ cancel, confirm, close }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center p-4 bg-neutral-800 bg-opacity-70">
            <div className="w-full max-w-md p-4 bg-white rounded">
                <div className="flex items-center justify-between gap-3">
                    <h1 className="font-semibold">Permanent Delete</h1>
                    <button className="">
                        <IoClose size={25} />
                    </button>
                </div>
                <p className="my-4">Are you sure permanent delete ?</p>
                <div className="flex items-center gap-3 ml-auto w-fit">
                    <button
                        onClick={cancel}
                        className="px-4 py-1 text-red-500 border border-red-500 rounded hover:text-white hover:bg-red-500 "
                    >
                        Cancel
                    </button>
                    <button
                        onClick={confirm}
                        className="px-4 py-1 text-green-600 border border-green-600 rounded hover:bg-green-600 hover:text-white"
                    >
                        Confirm
                    </button>
                </div>
            </div>
        </div>
    );
};
export default ConfirmBox;
