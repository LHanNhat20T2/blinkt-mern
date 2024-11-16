import UserMenu from "../components/UserMenu";

const Dashboard = () => {
    return (
        <section className="bg-white">
            <div className="container grid grid-cols-[250px,1fr] p-3 mx-auto">
                <div>
                    {/* left for menu */}

                    <div>
                        <UserMenu />
                    </div>

                    {/* right for content */}
                    <div className="bg-red-500">content display</div>
                </div>
            </div>
        </section>
    );
};
export default Dashboard;
