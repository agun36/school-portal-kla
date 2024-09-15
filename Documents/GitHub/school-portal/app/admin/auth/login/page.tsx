"use client";
import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/convex/_generated/api";
import { useMutation, useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import { getUser, User } from "@/convex/auth";

export default function CreateAdminAndSignIn() {
    const { signIn } = useAuthActions();
    const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
    const { toast } = useToast();
    const [submitting, setSubmitting] = useState(false);
    // const user: User | null = useQuery(api.auth.getUser, {});
    const storeAdmin = useMutation(api.admin.store);
    const router = useRouter();
    const renderForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitting(true);
        const formData = new FormData(event.currentTarget);
        const email = formData.get("email") as string;
        const password = formData.get("password") as string;

        console.log("Form Data:", { email, password });

        try {
            if (flow === "signUp") {
                // Sign in the user first to ensure authentication
                await signIn("password", formData);
                // Now call the storeAdmin mutation
                await storeAdmin({ email, password });
            } else {
                await signIn("password", formData);
            }

            // Fetch the user object to check if the user is correctly authenticated
            // console.log("User object:", user);
            // console.log("User role:", user?.role);

            router.push('/admin/dashboard');
        } catch (error) {
            console.error(error);
            const title =
                flow === "signIn"
                    ? "Could not sign in, did you mean to sign up?"
                    : "Could not sign up, did you mean to sign in?";
            toast({ title, variant: "destructive" });
            setSubmitting(false);
        }
    };

    return (
        <form className="flex flex-col" onSubmit={renderForm}>
            <label htmlFor="email">Email</label>
            <Input name="email" id="email" className="mb-4" autoComplete="email" />
            <Input
                type="password"
                name="password"
                id="password"
                className="mb-4"
                autoComplete={flow === "signIn" ? "current-password" : "new-password"}
            />
            <input name="flow" value={flow} type="hidden" />
            <Button type="submit" disabled={submitting}>
                {flow === "signIn" ? "Sign in" : "Sign up"}
            </Button>
            <Button
                variant="link"
                type="button"
                onClick={() => {
                    setFlow(flow === "signIn" ? "signUp" : "signIn");
                }}
            >
                {flow === "signIn"
                    ? "Don't have an account? Sign up"
                    : "Already have an account? Sign in"}
            </Button>
        </form>
    );
}