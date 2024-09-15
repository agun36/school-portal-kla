"use client";
import { Authenticated, Unauthenticated } from "convex/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
            <body>
                {/* <Unauthenticated> */}
                {
                    children
                }
                {/* </Unauthenticated> */}
            </body>
        </html>
    );
}