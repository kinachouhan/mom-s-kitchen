import { FaLinkedin } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaFacebook } from "react-icons/fa";
import { FaTwitter } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";
import { BsCloud } from "react-icons/bs";



export const Footer = () => {
    return (
        <footer className="bg-gray-100 pt-14">
            <div className="max-w-6xl mx-auto px-6">

                {/* TOP CONTENT */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 pb-12 border-b border-gray-300">

                    {/* LOGO + ABOUT */}
                    <div className="space-y-4">
                        <div className="flex items-center gap-2">
                            <div className="relative">
                                <BsCloud className="text-orange-400 text-6xl" />
                                <span className="absolute inset-0 flex items-center justify-center text-xs font-semibold">
                                    Mom’s
                                </span>
                            </div>
                            <h2 className="text-2xl font-bold">Kitchen</h2>
                        </div>

                        <p className="text-sm text-gray-500 leading-relaxed max-w-sm">
                            Fresh homemade food delivered with love. Experience comfort meals
                            just like home.
                        </p>
                    </div>

                    {/* COMPANY */}
                    <div>
                        <h3 className="font-semibold mb-5">Company</h3>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li>About Us</li>
                            <li>Careers</li>
                            <li>Team</li>
                            <li>Mom’s One</li>
                            <li>Instamart</li>
                            <li>Dineout</li>
                            <li>Minis</li>
                            <li>Pyng</li>
                        </ul>
                    </div>

                    {/* CONTACT */}
                    <div>
                        <h3 className="font-semibold mb-5">Contact Us</h3>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li>Help & Support</li>
                            <li>Partner with us</li>
                            <li>Ride with us</li>
                        </ul>
                    </div>

                    {/* LEGAL */}
                    <div>
                        <h3 className="font-semibold mb-5">Legal</h3>
                        <ul className="space-y-3 text-sm text-gray-600">
                            <li>Terms & Conditions</li>
                            <li>Cookie Policy</li>
                            <li>Privacy Policy</li>
                        </ul>
                    </div>
                </div>

                {/* SOCIAL */}
                <div className="py-8 flex justify-center">
                    <div className="flex gap-8 text-xl text-gray-700">
                        <FaLinkedin className="hover:text-orange-500 cursor-pointer transition" />
                        <FaInstagram className="hover:text-orange-500 cursor-pointer transition" />
                        <FaFacebook className="hover:text-orange-500 cursor-pointer transition" />
                        <FaPinterest className="hover:text-orange-500 cursor-pointer transition" />
                        <FaTwitter className="hover:text-orange-500 cursor-pointer transition" />
                    </div>
                </div>
            </div>

            {/* COPYRIGHT */}
            <div className="bg-gray-950 text-center py-5 text-xs text-gray-400">
                © {new Date().getFullYear()} Mom’s Kitchen. All rights reserved.
            </div>
        </footer>



    );
};












