import { useSelector } from "react-redux";
import { FaRegUserCircle } from "react-icons/fa";
import UserProfileAvatarEdit from "../components/UserProfileAvatarEdit";
import { useState } from "react";

const Profile = () => {
    const user = useSelector((state) => state.user);
    const [openProfileAvatarEdit, setProfileAvatarEdit] = useState(false);
    return (
        <div>
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
            <button
                onClick={() => setProfileAvatarEdit(true)}
                className="px-3 py-1 mt-3 text-sm border rounded-full hover:bg-primary-200 border-primary-100 hover:border-primary-200 min-w-20"
            >
                Edit
            </button>

            {openProfileAvatarEdit && (
                <UserProfileAvatarEdit
                    close={() => setProfileAvatarEdit(false)}
                />
            )}
        </div>
    );
};
export default Profile;
