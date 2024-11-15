import { Link, useLocation, useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import useMobile from "../hooks/useMobile";
import Search from "../components/Search";
import { FaRegCircleUser } from "react-icons/fa6";
import { BsCart4 } from "react-icons/bs";
import { useSelector } from "react-redux";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { useState } from "react";
import UserMenu from "./UserMenu";
const Header = () => {
    const [isMobile] = useMobile();
    const location = useLocation();
    const isSearchPage = location.pathname === "/search";
    const navigate = useNavigate();
    const user = useSelector((state) => state?.user);
    const [openUserMenu, setOpenUserMenu] = useState(false);

    const redirectToLoginPage = () => {
        navigate("/login");
    };

    return (
        <header className="sticky top-0 flex flex-col justify-center h-24 gap-1 bg-white lg:h-20 lg:shadow-md">
            {!(isSearchPage && isMobile) && (
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
                        {/* user icons display in only mobile version */}
                        <button className="text-neutral-600 lg:hidden">
                            <FaRegCircleUser />
                        </button>
                        <div className="items-center hidden gap-10 lg:flex">
                            {user?._id ? (
                                <div className="relative">
                                    <div
                                        onClick={() =>
                                            setOpenUserMenu((preve) => !preve)
                                        }
                                        className="flex items-center gap-1 cursor-pointer select-none"
                                    >
                                        <p>Account</p>
                                        {openUserMenu ? (
                                            <FaCaretUp size={25} />
                                        ) : (
                                            <FaCaretDown size={25} />
                                        )}
                                    </div>
                                    {openUserMenu && (
                                        <div className="absolute right-0 top-12">
                                            <div className="p-4 bg-white rounded lg:shadow-lg min-w-52">
                                                <UserMenu
                                                    close={() =>
                                                        setOpenUserMenu(false)
                                                    }
                                                />
                                            </div>
                                        </div>
                                    )}
                                    {/* <-- Added closing div here */}
                                </div>
                            ) : (
                                <button
                                    onClick={redirectToLoginPage}
                                    className="px-2 text-lg"
                                >
                                    Login
                                </button>
                            )}
                            <button className="flex items-center gap-2 px-3 py-3 text-white bg-green-800 rounded hover:bg-green-700">
                                {/* add cart icons */}
                                <div className="animate-bounce">
                                    <BsCart4 size={26} />
                                </div>
                                <div className="font-semibold">
                                    <p>My Cart</p>
                                </div>
                            </button>
                        </div>
                    </div>
                </div>
            )}

            <div className="container px-4 mx-auto lg:hidden">
                <Search />
            </div>
        </header>
    );
};
export default Header;
