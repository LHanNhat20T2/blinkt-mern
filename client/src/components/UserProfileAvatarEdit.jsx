import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import Axios from "../utils/Axios";
import AxiosToastError from "../utils/AxiosToastError";
import { updateAvatar } from "../store/userSlice";
import { IoClose } from "react-icons/io5";
import SummaryApi from "../commom/SummaryApi";

const UserProfileAvatarEdit = ({ close }) => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleUploadAvatarImage = async (e) => {
        const file = e.target.files[0];
        // console.log("file", file);

        const formData = new FormData();
        formData.append("avatar", file);
        if (!file) {
            return;
        }
        try {
            setLoading(true);
            const response = await Axios({
                ...SummaryApi.uploadAvatar,
                data: formData,
            });
            const { data: responseData } = response;
            dispatch(updateAvatar(responseData.data.avatar));
        } catch (error) {
            AxiosToastError(error);
        } finally {
            setLoading(false);
        }

        // console.log("data avatar", response);
    };
    return (
        <section className="fixed inset-0 flex items-center justify-center p-4 border-t-stone-50 bg-neutral-900 bg-opacity-60">
            <div className="flex flex-col items-center justify-center w-full max-w-sm p-4 bg-white rounded">
                <button
                    onClick={close}
                    className="block ml-auto text-neutral-800 w-fit"
                >
                    <IoClose size={20} />
                </button>
                <div className="flex items-center justify-center w-16 h-16 overflow-hidden bg-red-500 rounded-full drop-shadow-sm ">
                    {user.avatar ? (
                        <img
                            src={user.avatar}
                            alt={user.name}
                            className="w-full h-full"
                        />
                    ) : (
                        <FaRegUserCircle size={60} />
                    )}
                </div>
                <form action="" onSubmit={handleSubmit}>
                    <label htmlFor="uploadProfile">
                        <div className="p-4 py-1 my-3 text-sm border rounded cursor-pointer border-primary-200 hover:bg-primary-200 ">
                            {loading ? "Loading... " : "Upload"}
                        </div>
                        <input
                            onChange={handleUploadAvatarImage}
                            type="file"
                            id="uploadProfile"
                            className="hidden"
                        />
                    </label>
                </form>
            </div>
        </section>
    );
};
export default UserProfileAvatarEdit;
