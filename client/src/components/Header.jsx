import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
import Search from "../components/Search";
import { FaRegCircleUser } from "react-icons/fa6";
const Header = () => {
    return (
        <header className="sticky top-0 flex flex-col justify-center h-24 gap-1 lg:h-20 lg:shadow-md">
            <div className="container flex items-center justify-between px-4 mx-auto">
                {/* logo */}
                <div className="h-full">
                    <Link
                        to={"/"}
                        className="flex items-center justify-center h-full"
                    >
                        <img
                            src={logo}
                            width={170}
                            height={60}
                            alt="logo"
                            className="hidden lg:block"
                        />
                        <img
                            src={logo}
                            width={120}
                            height={60}
                            alt="logo"
                            className="lg:hidden"
                        />
                    </Link>
                </div>
                {/* Search */}
                <div className="hidden lg:block">
                    <Search />
                </div>

                {/* Login and my cart */}
                <div className="">
                    <button className="text-neutral-600">
                        <FaRegCircleUser />
                    </button>
                    <div className="hidden lg:block">Logon and my cart</div>
                </div>
            </div>
            <div className="container px-4 mx-auto lg:hidden">
                <Search />
            </div>
        </header>
    );
};
export default Header;
