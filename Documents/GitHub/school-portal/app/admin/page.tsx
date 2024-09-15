// /admin/page.tsx
"use client";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Unauthenticated } from "convex/react";

const AdminWelcomePage: React.FC = () => {
    const router = useRouter();

    return (
        // <Unauthenticated>
        <div className="mt-8 text-center">
            <h1>Welcome to the Admin Portal</h1>
            <p>This is the admin welcome page. From here, you can navigate to various sections of the admin portal.</p>
            <div className="mt-8">
                <Button onClick={() => router.push('/admin/dashboard')}>Go to Dashboard</Button>
                <Button onClick={() => router.push('/admin/auth/login')} style={{ marginLeft: "10px" }}>Log In</Button>
            </div>
        </div>
        // </Unauthenticated>
    );
};

export default AdminWelcomePage;