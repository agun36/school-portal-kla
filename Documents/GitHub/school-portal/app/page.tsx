"use client";
import { AboutSection } from "@/components/AboutSection";
import { Navbar } from "../components/Navbar";
import BlogPosts from "@/components/BlogPost";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";
import { Authenticated, Unauthenticated } from "convex/react";

export default function Home() {
  return (
    <main className="">

      {/* <Unauthenticated> */}
      <header className=" border-slate-200 bg-teal-600 ">
        <Navbar />
      </header>

      <AboutSection />
      <Blog />
      <Footer />
      {/* </Unauthenticated> */}
    </main>
  );
}
