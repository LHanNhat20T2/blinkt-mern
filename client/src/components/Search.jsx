import { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { TypeAnimation } from "react-type-animation";
import { FaArrowLeft } from "react-icons/fa";
import useMobile from "../hooks/useMobile";
const Search = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [isSearchPage, setIsSearchPage] = useState(false);
    const [isMobile] = useMobile();

    useEffect(() => {
        const isSearch = location.pathname === "/search";
        setIsSearchPage(isSearch);
    }, [location]);

    const redirectToSearch = () => {
        navigate("/search");
    };

    console.log("search", isSearchPage);

    return (
        <div className="w-full group focus-within:border-primary-200 bg-slate-50 min-w-[300px] lg:min-w-[420px] h-11 lg:h-12 rounded-lg border overflow-hidden flex items-center text-neutral-500">
            <div>
                {isMobile && isSearchPage ? (
                    <Link
                        to={"/"}
                        className="flex items-center justify-center h-full p-2 m-1 bg-white rounded-full shadow-md group-focus-within:text-primary-200"
                    >
                        <FaArrowLeft size={22} />
                    </Link>
                ) : (
                    <button className="flex items-center justify-center h-full p-3 group-focus-within:text-primary-200">
                        <IoSearch size={22} />
                    </button>
                )}
            </div>
            <div className="w-full h-full">
                {!isSearchPage ? (
                    // not in search page
                    <div
                        onClick={redirectToSearch}
                        className="flex items-center w-full h-full"
                    >
                        <TypeAnimation
                            sequence={[
                                'Search "milk"',
                                1000,
                                'Search "bread"',
                                1000,
                                'Search "sugar"',
                                1000,
                                'Search "panner"',
                                1000,
                                'Search "chocolate"',
                                1000,
                                'Search "curd"',
                                1000,
                                'Search "rice"',
                                1000,
                                'Search "chips"',
                                1000,
                            ]}
                            wrapper="span"
                            speed={50}
                            repeat={Infinity}
                        />
                    </div>
                ) : (
                    // when is was search page
                    <div className="w-full h-full">
                        <input
                            className="w-full h-full bg-transparent outline-none"
                            type="text"
                            placeholder="Search for atta dal and more."
                        />
                    </div>
                )}
            </div>
        </div>
    );
};
export default Search;
