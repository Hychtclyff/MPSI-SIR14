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
            <nav className="py-3 backdrop-blur-sm  fixed  top-0 w-full left-0  z-10  bg-[#10181E] text-white ">
                <div className="  mx-auto   flex justify-evenly align-middle ">
                    <div className="logo text-3xl font-extrabold">
                        <a href="/">SIR14</a>
                    </div>

                    <div className="nav-link text-lg">
                        <ul className="flex  gap-5">
                            <li className="nav-link">
                                <a href="/#home">Home</a>
                            </li>
                            <li className="nav-link">
                                <a href="/#layanan">Layanan</a>
                            </li>
                            <li className="nav-link">
                                <a href="/#saran-kritik">Saran & Kritik</a>
                            </li>
                        </ul>
                    </div>
                    <div className="hidden sm:flex sm:items-center sm:ms-6">
                        <div className="ms-3 relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                        >
                                            {user.name}

                                            <svg
                                                className="ms-2 -me-0.5 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route("dashboard")}>
                                        Dasboard
                                    </Dropdown.Link>
                                    <Dropdown.Link href={route("profile.edit")}>
                                        Profile
                                    </Dropdown.Link>
                                    {user.role == "rt" && (
                                        <>
                                            {" "}
                                            <Dropdown.Link
                                                href={route("workshop")}
                                            >
                                                Ruang Kerja
                                            </Dropdown.Link>
                                        </>
                                    )}

                                    {user.role == "admin" && (
                                        <>
                                            {" "}
                                            <Dropdown.Link
                                                href={route("workshop-admin")}
                                            >
                                                Ruang Kerja Admin
                                            </Dropdown.Link>
                                        </>
                                    )}

                                    <Dropdown.Link
                                        href={route("logout")}
                                        method="post"
                                        as="button"
                                    >
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </nav>
            {header && (
                <header className="bg-[#9AD7F5] shadow mt-14">
                    <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8 ">
                        {header}
                    </div>
                </header>
            )}

            <main>{children}</main>
            <footer className=" mt-16  w-full  bg-[#10181E] flex justify-center">
                <div className="container py-5 px-7  flex justify-between   items-center text-white">
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
