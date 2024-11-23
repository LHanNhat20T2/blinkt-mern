import { Outlet } from "react-router-dom";
import UserMenu from "../components/UserMenu";

const Dashboard = () => {
    return (
        <section className="bg-white">
            <div className="container mx-auto p-3 grid lg:grid-cols-[250px,1fr]">
                {/* left for menu */}

                <div className="sticky max-h-[calc(100vh-96x)] hidden py-4 overflow-y-hidden border-r top-24 lg:block">
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
