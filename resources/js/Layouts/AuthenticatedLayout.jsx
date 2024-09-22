import { useState } from "react";
import ApplicationLogo from "@/Components/ApplicationLogo";
import Dropdown from "@/Components/Dropdown";
import NavLink from "@/Components/NavLink";
import ResponsiveNavLink from "@/Components/ResponsiveNavLink";
import { Link, usePage } from "@inertiajs/react";

export default function Authenticated({ header, children }) {
    const user = usePage().props.auth.user;

    const [showingNavigationDropdown, setShowingNavigationDropdown] =
        useState(false);

    return (
        <div className="min-h-screen bg-gray-100">
            <nav className="py-3 backdrop-blur-sm  fixed  top-0 w-full left-0  z-10 border-b-2 border-white bg-[#10181E] text-white ">
                <div className="  mx-auto   flex justify-evenly align-middle ">
                    <div className="logo text-3xl font-extrabold">
                        <a href="#">SIR14</a>
                    </div>

                    <div className="nav-link text-lg">
                        <ul className="flex  gap-5">
                            <li className="nav-link">
                                <a href="/#home">Home</a>
                            </li>
                            <li className="nav-link">
                                <a href="#layanan">Layanan</a>
                            </li>
                            <li className="nav-link">
                                <a href="#saran-kritik">Saran & Kritik</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            {/* {header && (
                <header className="bg-white shadow">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                </header>
            )} */}

            <main>{children}</main>
            <footer className=" mt-16 fixed w-full bottom-0 bg-[#10181E] flex justify-center">
                <div className="container py-5 px-7  flex justify-between border-2 border-red-500  items-center text-white">
                    <div className="logo">
                        <img src="/img/logo.png" alt="" />
                    </div>
                    <div className="nav-link text-lg ">
                        <ul className="flex flex-col gap-5">
                            <li className="nav-link">
                                <a href="#home">Home</a>
                            </li>
                            <li className="nav-link">
                                <a href="#layanan">Layanan</a>
                            </li>
                            <li className="nav-link">
                                <a href="#saran-kritik">Saran & Kritik</a>
                            </li>
                        </ul>
                    </div>
                    <div className="alamat flex flex-col gap-5 text-wrap  items-end">
                        <p className=" text-pretty w-1/2 text-right">
                            RT 14,Kel.Rawasari,Kec.Alam Barajo, Rw. Sari, Kec.
                            Kota Baru, Kota Jambi, Jambi 36361
                        </p>
                        <p>081234455678</p>

                        <p>rt14rawasari@gmail.com</p>
                    </div>
                </div>
            </footer>
        </div>
    );
}
