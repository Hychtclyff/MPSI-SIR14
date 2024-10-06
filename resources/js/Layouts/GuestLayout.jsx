import ApplicationLogo from "@/Components/ApplicationLogo";
import { Link } from "@inertiajs/react";

export default function Guest({ children, className = "", classContent }) {
    return (
        <div
            className={
                `min-h-screen flex flex-col sm:justify-center items-center pt-6 sm:pt-0 bg-gray-100 ${classContent}` 
                
            }
        >
            <div
                className={
                    `sm:max-w-md mt-6 px-6 py-4 bg-white shadow-lg overflow-hidden sm:rounded-lg shadow-[#9AD7F5] ` +
                    className
                }
            >
                {children}
            </div>
        </div>
    );
}
