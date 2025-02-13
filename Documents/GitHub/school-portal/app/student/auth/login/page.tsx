"use client"
import { useAuthActions } from "@convex-dev/auth/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
// import { useToast } from "@/components/ui/use-toast";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import {
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@/components/ui/tabs"

export default function SignInWithPassword({
    provider,
    handleSent,
    handlePasswordReset,
}: {
    provider?: string;
    handleSent?: (email: string) => void;
    handlePasswordReset?: () => void;
}) {
    const { signIn } = useAuthActions();
    const [flow, setFlow] = useState<"signIn" | "signUp">("signIn");
    const { toast } = useToast();
    const [submitting, setSubmitting] = useState(false);

    const handleClickForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setSubmitting(true);
        const formData = new FormData(event.currentTarget);
        signIn(provider ?? "password", formData)
            .then(() => {
                handleSent?.(formData.get("email") as string);
            })
            .catch((error) => {
                console.error(error);
                const title =
                    flow === "signIn"
                        ? "Could not sign in, did you mean to sign up?"
                        : "Could not sign up, did you mean to sign in?";
                toast({ title, variant: "destructive" });
                setSubmitting(false);
            });
    }

    return (
        <Tabs defaultValue="signin" className="w-[400px]">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="signin" onClick={() => setFlow("signIn")}>Sign in</TabsTrigger>
                <TabsTrigger value="signup" onClick={() => setFlow("signUp")}>Sign up</TabsTrigger>
            </TabsList>
            <TabsContent value="signin">
                <Card>
                    <CardHeader>
                        <CardTitle>Sign in</CardTitle>
                        <CardDescription>
                            Use your email and password to sign in.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <form onSubmit={handleClickForm} className="flex flex-col">
                            <div className="space-y-1">
                                <label htmlFor="email">Email</label>
                                <Input name="email" id="email" className="mb-4" autoComplete="email" />
                            </div>
                            <div className="flex items-center justify-between">
                                <label htmlFor="password">Password</label>
                                {handlePasswordReset && flow === "signIn" ? (
                                    <Button
                                        className="p-0 h-auto"
                                        type="button"
                                        variant="link"
                                        onClick={handlePasswordReset}
                                    >
                                        Forgot your password?
                                    </Button>
                                ) : null}
                            </div>
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
                                onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
                            >
                                {flow === "signIn"
                                    ? "Don't have an account? Sign up"
                                    : "Already have an account? Sign in"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </TabsContent>
            <TabsContent value="signup">
                <Card>
                    <CardHeader>
                        <CardTitle>Sign up</CardTitle>
                        <CardDescription>
                            Use your email and password to sign up.
                        </CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                        <form onSubmit={handleClickForm} className="flex flex-col">
                            <div className="space-y-1">
                                <label htmlFor="email">Email</label>
                                <Input name="email" id="email" className="mb-4" autoComplete="email" />
                            </div>
                            <div className="space-y-1">
                                <label htmlFor="password">Password</label>
                                <Input
                                    type="password"
                                    name="password"
                                    id="password"
                                    className="mb-4"
                                    autoComplete="new-password"
                                />
                                <input name="flow" value={flow} type="hidden" />
                            </div>
                            <Button type="submit" disabled={submitting}>
                                {flow === "signIn" ? "Sign in" : "Sign up"}
                            </Button>
                            <Button
                                variant="link"
                                type="button"
                                onClick={() => setFlow(flow === "signIn" ? "signUp" : "signIn")}
                            >
                                {flow === "signIn"
                                    ? "Don't have an account? Sign up"
                                    : "Already have an account? Sign in"}
                            </Button>
                        </form>
                    </CardContent>
                </Card>
            </TabsContent>
        </Tabs>
    )
}