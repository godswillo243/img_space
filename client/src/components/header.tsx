import { useState } from "react";
import { Link } from "react-router-dom";
import { LucideMenu, LucideUpload,  } from "lucide-react";

const Header = () => {
    const [open, setOpen] = useState(false);

    const toogleClose = () => {
        setOpen(state => !state);
    };

    return (
        <div className="p-4 flex items-center justify-between relative">
            <Link to="/">
                <h3 className="h3-bold montserrat-700">IMG_SPACE</h3>
            </Link>
            <div className="flex items-center gap-2">
                <Link to="/upload">
                    <LucideUpload className="size-8" />
                </Link>
                <button className=" p-0!" onClick={toogleClose}>
                    <LucideMenu className="size-8" />
                </button>
            </div>
            <div
                hidden={!open}
                onClick={toogleClose}
                className="fixed top-0 left-0 w-screen h-dvh bg-neutral-900/70"
            />
            <div
                hidden={!open}
                className="absolute top-full right-0 w-10/12 bg-[#2e2e2e] p-6 flex flex-col gap-4"
            >
                {[
                    { label: "Profile", href: "/profile" },
                    { label: "Saved Images", href: "/saved" }
                ].map(({ label, href }) => (
                    <Link
                        key={label}
                        to={href}
                        className="w-full font-semibold tracking-wider"
                        onClick={toogleClose}
                    >
                        {label}
                    </Link>
                ))}
                <button>
                    
                    Logout
                </button>
            </div>
        </div>
    );
};

export default Header;
