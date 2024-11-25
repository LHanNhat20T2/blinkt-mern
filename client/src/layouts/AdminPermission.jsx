import { useSelector } from "react-redux";
import isAdmin from "../utils/isAdmin";

const AdminPermission = ({ children }) => {
    const user = useSelector((state) => state.user);
    return (
        <>
            {isAdmin(user.role) ? (
                children
            ) : (
                <p className="p-4 text-red-600 bg-red-100">
                    Do not have permission
                </p>
            )}
        </>
    );
};
export default AdminPermission;
