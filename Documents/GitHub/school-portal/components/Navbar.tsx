"use client";

import { useState } from "react";
import Link from "next/link";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { MenubarSeparator } from "./ui/menubar";
import { useRouter } from "next/navigation";

export const Navbar = () => {
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const router = useRouter();

    const handleStudentClick = () => {
        // Check if the user is authenticated
        const isAuthenticated = false; // Replace with your authentication logic

        if (isAuthenticated) {
            router.push('/student/dashboard');
        } else {
            router.push('/student/auth/login');
        }
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };


    return (
        <nav className="flex items-center p-4 max-w-7xl mx-auto container  text-white">
            <div className="flex-1">
                <Link href="/" className="no-underline text-white hover:text-gray-300">Home</Link>
            </div>
            <div className="hidden md:flex items-center gap-3">
                <Link href="/about" className="no-underline text-white hover:text-gray-300">About</Link>
                <Link href="/contact" className="no-underline text-white hover:text-gray-300">Contact</Link>
                <Link href="/blog" className="no-underline text-white hover:text-gray-300">Blog</Link>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <span className="relative text-white hover:text-gray-300">Students</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mt-2 z-10 bg-white text-black">
                        <DropdownMenuLabel>Student Login</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={handleStudentClick}>login</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <span className="relative text-white hover:text-gray-300">Teacher</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mt-2 z-10 bg-white text-black">
                        <DropdownMenuLabel>Teacher Login</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>login</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <DropdownMenu>
                    <DropdownMenuTrigger>
                        <span className="relative text-white hover:text-gray-300">Admin</span>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mt-2 z-10 bg-white text-black">
                        <DropdownMenuLabel>Admin Login</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem >
                            <Link href="/admin/auth/login" className="no-underline text-black hover:text-gray-300">admin login</Link>
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
                <Link href="/admission" className="no-underline text-white hover:text-gray-300">Admission</Link>
            </div>
            <button
                className="md:hidden ml-auto text-white hover:text-gray-300"
                onClick={toggleMobileMenu}
            >
                {isMobileMenuOpen ? "Close" : "Menu"}
            </button>
            <div className={`fixed inset-y-0 left-0 transform ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out bg-teal-600 text-white z-50 md:hidden`} style={{ width: '40%', height: '100vh' }}>
                <div className="flex items-center justify-between p-4 border-b border-gray-500">
                    <Link href="/" className="no-underline text-white hover:text-gray-300">home</Link>
                </div>
                <div className="flex flex-col items-start gap-3 mt-4">
                    <Link href="/about" className="no-underline text-white hover:text-gray-300 pl-4">about</Link>
                    <div className="w-full border-b border-gray-500"></div>
                    <Link href="/contact" className="no-underline text-white hover:text-gray-300 pl-4">contact</Link>
                    <div className="w-full border-b border-gray-500"></div>
                    <Link href="/blog" className="no-underline text-white hover:text-gray-300 pl-4">blog</Link>
                    <div className="w-full border-b border-gray-500"></div>
                    <Accordion type="single" collapsible className="w-full pl-4">
                        <AccordionItem value="item-1" className="border-0">
                            <AccordionTrigger className="hover:no-underline text-white hover:text-gray-300">student</AccordionTrigger>
                            <AccordionContent>
                                <Link href="/login" className="no-underline text-white hover:text-gray-300">student login</Link>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <div className="w-full border-b border-gray-500"></div>

                    <Accordion type="single" collapsible className="w-full pl-4">
                        <AccordionItem value="item-1" className="border-0">
                            <AccordionTrigger className="hover:no-underline text-white hover:text-gray-300">teacher</AccordionTrigger>
                            <AccordionContent>
                                <Link href="/login" className="no-underline text-white hover:text-gray-300">teacher login</Link>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <div className="w-full border-b border-gray-500"></div>
                    <Accordion type="single" collapsible className="w-full pl-4">
                        <AccordionItem value="item-1" className="border-0">
                            <AccordionTrigger className="hover:no-underline text-white hover:text-gray-300">admin</AccordionTrigger>
                            <AccordionContent>
                                <Link href="/admin/welcome" className="no-underline text-white hover:text-gray-300">admin login</Link>
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                    <div className="w-full border-b border-gray-500"></div>
                    <Link href="/admission" className="no-underline text-white hover:text-gray-300 pl-4">admission</Link>
                    <div className="w-full border-b border-gray-500"></div>
                </div>
            </div>
        </nav>
    );
};