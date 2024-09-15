// "use client"
// import {
//     AlertDialog,
//     AlertDialogAction,
//     AlertDialogCancel,
//     AlertDialogContent,
//     AlertDialogDescription,
//     AlertDialogFooter,
//     AlertDialogHeader,
//     AlertDialogTitle,
//     AlertDialogTrigger,
// } from "@/components/ui/alert-dialog"
// import Link from "next/link";
// import { useState } from "react"

// import { zodResolver } from "@hookform/resolvers/zod"
// import { useForm } from "react-hook-form"
// import { z } from "zod"

// import { Button } from "@/components/ui/button"
// import {
//     Form,
//     FormControl,
//     FormDescription,
//     FormField,
//     FormItem,
//     FormLabel,
//     FormMessage,
// } from "@/components/ui/form"
// import { Input } from "@/components/ui/input"
// import { useRouter } from "next/navigation";
// import { useMutation } from "convex/react";
// import { api } from "@/convex/_generated/api";

// const formSchema = z.object({
//     first_name: z.string().min(2, {
//         message: "First name must be at least 2 characters.",
//     }),
//     last_name: z.string().min(2, {
//         message: "Last name must be at least 2 characters.",
//     }),
//     email: z.string().email({
//         message: "Please enter a valid email.",
//     }),
//     password: z.string().min(6, {
//         message: "Password must be at least 6 characters.",
//     }),
// })

// export default function AdminSignUpTeacher() {
//     const [isOpen, setIsOpen] = useState(false);
//     const [errorDialogOpen, setErrorDialogOpen] = useState(false);
//     const [errorMessage, setErrorMessage] = useState("");
//     const router = useRouter();
//     const signUpTeacher = useMutation(api.admin.signUpTeacher);
//     const form = useForm<z.infer<typeof formSchema>>({
//         resolver: zodResolver(formSchema),
//         defaultValues: {
//             first_name: "",
//             last_name: "",
//             email: "",
//             password: "",
//         },
//     })

//     async function onSubmit(values: z.infer<typeof formSchema>) {
//         try {
//             const response = await signUpTeacher({
//                 first_name: values.first_name,
//                 last_name: values.last_name,
//                 email: values.email,
//                 password: values.password,
//             });

//             console.log('Teacher signed up with ID:', response);

//             // Close the dialog
//             setIsOpen(false);

//             // Navigate to the dashboard after successful submission
//             router.push("/admin/dashboard");
//         } catch (error: any) {
//             console.error('Error:', error);
//             // Show the error dialog if the email already exists
//             if (error.message.includes("email already exists")) {
//                 setErrorMessage("The email address already exists. Please use a different email.");
//             } else {
//                 setErrorMessage("An unexpected error occurred. Please try again.");
//             }
//             setErrorDialogOpen(true);
//         }
//     }

//     const handleOpenChange = (open: boolean) => {
//         // Prevent closing when clicking outside
//         if (!open && isOpen) {
//             return;
//         }
//         setIsOpen(open);
//     };

//     return (
//         <>
//             <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
//                 <AlertDialogTrigger asChild>
//                     <Button variant="outline" onClick={() => setIsOpen(true)}>
//                         Add Teacher
//                     </Button>
//                 </AlertDialogTrigger>
//                 <AlertDialogContent>
//                     <AlertDialogHeader>
//                         <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
//                         <AlertDialogDescription>
//                             This action cannot be undone. This will permanently delete your
//                             account and remove your data from our servers.
//                         </AlertDialogDescription>
//                     </AlertDialogHeader>
//                     <AlertDialogContent>
//                         <Form {...form}>
//                             <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
//                                 <FormField
//                                     control={form.control}
//                                     name="first_name"
//                                     render={({ field, fieldState }) => (
//                                         <FormItem>
//                                             <FormLabel>First name</FormLabel>
//                                             <FormControl>
//                                                 <Input placeholder="John" {...field} />
//                                             </FormControl>
//                                             <FormMessage>{fieldState.error?.message}</FormMessage>
//                                         </FormItem>
//                                     )}
//                                 />
//                                 <FormField
//                                     control={form.control}
//                                     name="last_name"
//                                     render={({ field, fieldState }) => (
//                                         <FormItem>
//                                             <FormLabel>Last name</FormLabel>
//                                             <FormControl>
//                                                 <Input placeholder="Doe" {...field} />
//                                             </FormControl>
//                                             <FormMessage>{fieldState.error?.message}</FormMessage>
//                                         </FormItem>
//                                     )}
//                                 />
//                                 <FormField
//                                     control={form.control}
//                                     name="email"
//                                     render={({ field, fieldState }) => (
//                                         <FormItem>
//                                             <FormLabel>Email</FormLabel>
//                                             <FormControl>
//                                                 <Input placeholder="qNk5C@example.com" {...field} />
//                                             </FormControl>
//                                             <FormMessage>{fieldState.error?.message}</FormMessage>
//                                         </FormItem>
//                                     )}
//                                 />
//                                 <FormField
//                                     control={form.control}
//                                     name="password"
//                                     render={({ field, fieldState }) => (
//                                         <FormItem>
//                                             <FormLabel>Password</FormLabel>
//                                             <FormControl>
//                                                 <Input placeholder="******" {...field} />
//                                             </FormControl>
//                                             <FormMessage>{fieldState.error?.message}</FormMessage>
//                                         </FormItem>
//                                     )}
//                                 />
//                                 <Button type="submit">Submit</Button>
//                             </form>
//                         </Form>
//                     </AlertDialogContent>
//                     <AlertDialogFooter>
//                         <AlertDialogCancel onClick={() => setIsOpen(false)}>Cancel</AlertDialogCancel>
//                         <AlertDialogAction>Continue</AlertDialogAction>
//                     </AlertDialogFooter>
//                 </AlertDialogContent>
//             </AlertDialog>

//             {/* Error Dialog */}
//             <AlertDialog open={errorDialogOpen} onOpenChange={setErrorDialogOpen}>
//                 <AlertDialogContent>
//                     <AlertDialogHeader>
//                         <AlertDialogTitle>Error</AlertDialogTitle>
//                         <AlertDialogDescription>
//                             {errorMessage}
//                         </AlertDialogDescription>
//                     </AlertDialogHeader>
//                     <AlertDialogFooter>
//                         <AlertDialogAction onClick={() => setErrorDialogOpen(false)}>OK</AlertDialogAction>
//                     </AlertDialogFooter>
//                 </AlertDialogContent>
//             </AlertDialog>
//         </>
//     )
// }