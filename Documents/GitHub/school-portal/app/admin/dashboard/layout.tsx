"use client";
import { Authenticated } from "convex/react";

export default function DashboardRootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (


        <html lang="en">
            <body>
                {/* <Authenticated> */}
                {children}
                {/* </Authenticated> */}
            </body>
        </html>
    );
}