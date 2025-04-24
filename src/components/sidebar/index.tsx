'use client';
import { useState } from "react";
import { motion } from "framer-motion";
import { Menu, ChevronDown, ChevronRight, Home } from "lucide-react";
import Link from "next/link";

const Sidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [openSubmenu, setOpenSubmenu] = useState<number | null>(null);

    const toggleSidebar = () => setIsOpen(!isOpen);
    const toggleSubmenu = (index: number) =>
        setOpenSubmenu(openSubmenu === index ? null : index);

    const menuItems = [
        {
            title: "Dashboard", submenus: [
                {
                    title: "OFX-CREDITO",
                    link: "/page/cadastro"
                }]
        },
        { title: "Settings", submenus: [{ title: "Profile", link: "/" }, { title: "Security", link: "/" }] },
    ];

    return (
        <div className="flex h-full fixed">
            <motion.div
                animate={{ width: isOpen ? 250 : 60 }}
                className="flex flex-col flex-1 min-h-screen bg-gray-900 text-white overflow-hidden p-4"
            >
                <button onClick={toggleSidebar} className="mb-4 text-white">
                    <Menu size={24} />
                </button>

                <Link href="/" className={`flex items-center hover:bg-gray-800 text-lg rounded-sm ${isOpen && "justify-center p-3 m-4"}`}>
                    {isOpen ? "Home" : <Home />}
                </Link>

                {isOpen && (
                    <ul>
                        {menuItems.map((menu, index) => (
                            <li key={index}>
                                <button
                                    className="flex items-center justify-between w-full py-2 px-3 hover:bg-gray-800"
                                    onClick={() => toggleSubmenu(index)}
                                >
                                    {menu.title}
                                    {openSubmenu === index ? <ChevronDown /> : <ChevronRight />}
                                </button>
                                <motion.ul
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: openSubmenu === index ? "auto" : 0, opacity: openSubmenu === index ? 1 : 0 }}
                                    className="overflow-hidden"
                                >
                                    {menu.submenus.map((submenu, subIndex) => (
                                        <li key={subIndex} className="pl-6 py-1 text-gray-300 hover:text-white">
                                            <Link href={submenu.link}>{submenu.title}</Link>

                                        </li>
                                    ))}
                                </motion.ul>
                            </li>
                        ))}
                    </ul>
                )}

            </motion.div>
        </div>
    );
};

export default Sidebar;
