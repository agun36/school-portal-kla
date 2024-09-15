"use client";
import { useState } from "react";
import { useToast } from "@/hooks/use-toast";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function AdminCreateStudent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [role, setRole] = useState("student");
    const { toast } = useToast();
    const createStudent = useMutation(api.admin.createStudent);

    const handleCreateStudent = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        try {
            await createStudent({ email, password, role });
            toast({ title: "Student created successfully", variant: "default" });
        } catch (error) {
            console.error(error);
            toast({ title: "Failed to create student", variant: "destructive" });
        }
    };

    return (
        <form onSubmit={handleCreateStudent} className="flex flex-col">
            <label htmlFor="email">Email</label>
            <Input
                name="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mb-4"
                autoComplete="email"
            />
            <label htmlFor="password">Password</label>
            <Input
                type="password"
                name="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="mb-4"
                autoComplete="new-password"
            />
            <label>Role</label>
            <div className="mb-4">
                <label>
                    <input
                        type="radio"
                        name="role"
                        value="student"
                        checked={role === "student"}
                        onChange={(e) => setRole(e.target.value)}
                    />
                    Student
                </label>
                <label>
                    <input
                        type="radio"
                        name="role"
                        value="admin"
                        checked={role === "admin"}
                        onChange={(e) => setRole(e.target.value)}
                    />
                    Admin
                </label>
                <label>
                    <input
                        type="radio"
                        name="role"
                        value="teacher"
                        checked={role === "teacher"}
                        onChange={(e) => setRole(e.target.value)}
                    />
                    Teacher
                </label>
            </div>
            <Button type="submit">Create Student</Button>
        </form>
    );
}