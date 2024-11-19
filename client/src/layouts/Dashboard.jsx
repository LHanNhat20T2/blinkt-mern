import { Outlet } from "react-router-dom";
import UserMenu from "../components/UserMenu";

const Dashboard = () => {
    return (
        <section className="bg-white">
            <div className="container grid grid-cols-[250px,1fr] p-3 mx-auto">
                {/* left for menu */}

                <div className="sticky hidden py-4 overflow-y-hidden border-r top-24 lg:block">
                    <UserMenu />
                </div>

                {/* right for content */}
                <div className="p-4 bg-white min-h-[80vh] ">
                    <Outlet />
                </div>
            </div>
        </section>
    );
};
export default Dashboard;
