"use client"
import Link from "next/link"
import { useEffect, useState } from "react"
import {
    Bell,
    CircleUser,
    Home,
    LineChart,
    Menu,
    Package,
    Package2,
    Search,
    ShoppingCart,
    Users,
    PiggyBank,
} from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import DataTableDemo from "../teacher/page"
import { api } from "@/convex/_generated/api"
import { Authenticated, useQuery } from "convex/react"
// import AdminSignUpTeacher from "../teacher/auth/signUpTeacher"
import DashboardRootLayout from "./layout"
import StudentTable from "@/app/student/page"
import AdminCreateStudent from "../students/auth/signUpStudent"
import AddStudent from "../_components/addStudent"
import { User } from "@/convex/auth"

export const description =
    "A products dashboard with a sidebar navigation and a main content area. The dashboard has a header with a search input and a user menu. The sidebar has a logo, navigation links, and a card with a call to action. The main content area shows an empty state with a call to action."

export default function AdminDashboard() {
    const [selectedTab, setSelectedTab] = useState("dashboard");
    // Fetch the current user's role
    const user: User | null = useQuery(api.auth.getUser, {});

    useEffect(() => {
        console.log("User object", user);
        console.log("User role", user?.role);
    }, [user]);

    if (user === undefined) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold">Loading...</h1>
            </div>
        );
    }

    const isAdmin = user?.role === "admin";

    if (!isAdmin) {
        return (
            <div className="flex items-center justify-center min-h-screen">
                <h1 className="text-2xl font-bold">Unauthorized Access</h1>
                <p className="text-muted-foreground">You do not have permission to access this page.</p>
            </div>
        );
    }
    return (

        // <DashboardRootLayout>
        <div className="grid min-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
            <div className="hidden border-r bg-muted/40 md:block">
                <div className="flex h-full max-h-screen flex-col gap-2">
                    <div className="flex h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
                        <Link href="/" className="flex items-center gap-2 font-semibold">
                            <Package2 className="h-6 w-6" />
                            <span className="">Acme Inc</span>
                        </Link>
                        <Button variant="outline" size="icon" className="ml-auto h-8 w-8">
                            <Bell className="h-4 w-4" />
                            <span className="sr-only">Toggle notifications</span>
                        </Button>
                    </div>

                    <div className="flex-1">
                        {/* desktop sidebar */}
                        <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
                            <a
                                href="#"
                                onClick={() => setSelectedTab("dashboard")}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${selectedTab === "dashboard" ? "text-primary" : ""}`}
                            >
                                <Home className="h-4 w-4" />
                                Dashboard
                            </a>
                            <a
                                href="#"
                                onClick={() => setSelectedTab("orders")}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${selectedTab === "orders" ? "text-primary" : ""}`}
                            >
                                <ShoppingCart className="h-4 w-4" />
                                Orders
                                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                    6
                                </Badge>
                            </a>
                            <a
                                href="#"
                                onClick={() => setSelectedTab("teacher")}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${selectedTab === "teacher" ? "text-primary" : ""}`}
                            >
                                <Users className="h-4 w-4" />
                                Teacher
                            </a>
                            <a
                                href="#"
                                onClick={() => setSelectedTab("students")}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${selectedTab === "students" ? "text-primary" : ""}`}
                            >
                                <Users className="h-4 w-4" />
                                Students
                            </a>
                            <a
                                href="#"
                                onClick={() => setSelectedTab("payments")}
                                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${selectedTab === "payments" ? "text-primary" : ""}`}
                            >
                                <PiggyBank className="h-4 w-4" />
                                Payments
                            </a>
                        </nav>
                    </div>
                    <div className="mt-auto p-4">
                        <Card x-chunk="dashboard-02-chunk-0">
                            <CardHeader className="p-2 pt-0 md:p-4">
                                <CardTitle>Upgrade to Pro</CardTitle>
                                <CardDescription>
                                    Unlock all features and get unlimited access to our support
                                    team.
                                </CardDescription>
                            </CardHeader>
                            <CardContent className="p-2 pt-0 md:p-4 md:pt-0">
                                <Button size="sm" className="w-full">
                                    Upgrade
                                </Button>
                            </CardContent>
                        </Card>
                    </div>
                </div>
            </div>
            <div className="flex flex-col">
                <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button
                                variant="outline"
                                size="icon"
                                className="shrink-0 md:hidden"
                            >
                                <Menu className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="flex flex-col">
                            {/* mobile header */}
                            <nav className="grid gap-2 text-lg font-medium">
                                <Link
                                    href="#"
                                    className="flex items-center gap-2 text-lg font-semibold"
                                >
                                    <Package2 className="h-6 w-6" />
                                    <span className="sr-only">Acme Inc</span>
                                </Link>
                                <Link
                                    href="#"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                >
                                    <Home className="h-5 w-5" />
                                    Dashboard
                                </Link>
                                <Link
                                    href="#"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                                >
                                    <ShoppingCart className="h-5 w-5" />
                                    Orders
                                    <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                                        6
                                    </Badge>
                                </Link>
                                <Link
                                    href="#"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                >
                                    <Package className="h-5 w-5" />
                                    Products
                                </Link>
                                <Link
                                    href="#"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                >
                                    <Users className="h-5 w-5" />
                                    Customers
                                </Link>
                                <Link
                                    href="#"
                                    className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                                >
                                    <LineChart className="h-5 w-5" />
                                    Analytics
                                </Link>
                            </nav>
                            <div className="mt-auto">
                                <Card>
                                    <CardHeader>
                                        <CardTitle>Upgrade to Pro</CardTitle>
                                        <CardDescription>
                                            Unlock all features and get unlimited access to our
                                            support team.
                                        </CardDescription>
                                    </CardHeader>
                                    <CardContent>
                                        <Button size="sm" className="w-full">
                                            Upgrade
                                        </Button>
                                    </CardContent>
                                </Card>
                            </div>
                        </SheetContent>
                    </Sheet>
                    <div className="w-full flex-1">
                        <form>
                            <div className="relative">
                                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                                <Input
                                    type="search"
                                    placeholder="Search products..."
                                    className="w-full appearance-none bg-background pl-8 shadow-none md:w-2/3 lg:w-1/3"
                                />
                            </div>
                        </form>
                    </div>
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="secondary" size="icon" className="rounded-full">
                                <CircleUser className="h-5 w-5" />
                                <span className="sr-only">Toggle user menu</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                {/* <AdminSignUpTeacher /> */}
                            </DropdownMenuItem>

                            <DropdownMenuItem>Settings</DropdownMenuItem>
                            <DropdownMenuItem>Support</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>Logout</DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </header>
                <main className="flex flex-1 flex-col gap-4 p-4 lg:gap-6 lg:p-6">
                    <Tabs value={selectedTab}>
                        <TabsContent value="dashboard">
                            <div className="flex items-center">
                                <h1 className="text-lg font-semibold md:text-2xl">Dashboard</h1>
                            </div>
                            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
                                <div className="flex flex-col items-center gap-1 text-center">
                                    <h3 className="text-2xl font-bold tracking-tight">
                                        Manage Dashboard
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Here you can manage your store information.
                                    </p>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="orders">
                            <div className="flex items-center">
                                <h1 className="text-lg font-semibold md:text-2xl">Orders</h1>
                            </div>
                            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
                                <div className="flex flex-col items-center gap-1 text-center">
                                    <h3 className="text-2xl font-bold tracking-tight">
                                        You have no orders
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        You can start selling as soon as you add a product.
                                    </p>
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="teacher">
                            <div className="flex items-center">
                                <div>
                                    <h1 className="text-lg font-semibold md:text-2xl">Teacher</h1>
                                </div>
                                <div className="ml-auto">
                                    {/* <AdminSignUpTeacher /> */}
                                </div>
                            </div>
                            <div className="flex flex-1  shadow-sm">
                                <div className="w-full flex flex-col items-center gap-1 text-center">
                                    <DataTableDemo />
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="students">
                            <div className="flex items-center">
                                <h1 className="text-lg font-semibold md:text-2xl">Students</h1>
                            </div>
                            <div className="ml-auto">
                                {/* <AdminCreateStudent /> */}
                                <AddStudent />
                            </div>
                            <div className="flex flex-1 items-center justify-center  shadow-sm">
                                <div className="w-full flex-col items-center gap-1 text-center">
                                    <StudentTable />
                                </div>
                            </div>
                        </TabsContent>
                        <TabsContent value="payments">
                            <div className="flex items-center">
                                <h1 className="text-lg font-semibold md:text-2xl">Payments</h1>
                            </div>
                            <div className="flex flex-1 items-center justify-center rounded-lg border border-dashed shadow-sm">
                                <div className="flex flex-col items-center gap-1 text-center">
                                    <h3 className="text-2xl font-bold tracking-tight">
                                        Manage Payments
                                    </h3>
                                    <p className="text-sm text-muted-foreground">
                                        Here you can manage payment information.
                                    </p>
                                </div>
                            </div>
                        </TabsContent>
                    </Tabs>
                </main>
            </div>
        </div>
        // </DashboardRootLayout>
    )
}