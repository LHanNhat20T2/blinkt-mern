import { useState } from "react";
import { FaRegUserCircle } from "react-icons/fa";
import { useSelector } from "react-redux";

const UserProfileAvatarEdit = () => {
    const user = useSelector((state) => state.user);
    const [loading, setLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const handleUploadAvatarImage = (e) => {
        const file = e.targe.files[0];
        console.log("file", file);
    };
    return (
        <section className="fixed inset-0 flex items-center justify-center p-4 border-t-stone-50 bg-neutral-900 bg-opacity-60">
            <div className="flex flex-col items-center justify-center w-full max-w-sm p-4 bg-white rounded">
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
                        <div className="p-4 py-1 my-3 text-sm border rounded border-primary-200 hover:bg-primary-200 ">
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
