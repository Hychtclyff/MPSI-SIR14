import defaultTheme from "tailwindcss/defaultTheme";
import forms from "@tailwindcss/forms";

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php",
        "./storage/framework/views/*.php",
        "./resources/views/**/*.blade.php",
        "./resources/js/**/*.jsx",
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ["Plus Jakarta Sans", ...defaultTheme.fontFamily.sans],
                },
            backgroundImage: {
                "hero-pattern": "url('/img/hero.jpeg')",
            },
        },
    },

    plugins: [forms],
};
