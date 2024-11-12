import { FaFacebook, FaLinkedin, FaInstagram } from "react-icons/fa";
const Footer = () => {
    return (
        <footer className="border-t">
            <div className="container flex flex-col gap-4 p-4 mx-auto text-2xl text-center lg:flex-row lg:justify-between">
                <p className="">© All Rights Reserved 2024.</p>
                <div className="flex items-center justify-center gap-4">
                    <a href="" className="hover:text-primary-100">
                        <FaFacebook />
                    </a>
                    <a href="" className="hover:text-primary-100">
                        <FaInstagram />
                    </a>
                    <a href="" className="hover:text-primary-100">
                        <FaLinkedin />
                    </a>
                </div>
            </div>
        </footer>
    );
};
export default Footer;
