"use client";

import { useState } from "react";
import { Button, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { FaUser, FaEdit, FaArrowLeft, FaSave, FaGithub, FaGoogle } from "react-icons/fa";
import Image from "next/image";

export default function ProfilePage() {
    // Mock user state (provider can be 'google', 'github', or 'email')
    const [user, setUser] = useState({
        name: "S M Moinul Islam",
        email: "moinul@example.com", // Can be null/empty if provider doesn't give one
        image: null,
        provider: "github", 
    });

    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // Handle profile update form submission (Only updating Name now)
    const handleUpdateProfile = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSuccessMessage(null);
        setLoading(true);

        const formData = new FormData(e.currentTarget);
        const name = formData.get("name") as string;

        // Simulate API call to update profile name
        setTimeout(() => {
            setUser((prev) => ({ ...prev, name }));
            setLoading(false);
            setSuccessMessage("Profile updated successfully!");
            setIsEditing(false);
        }, 1000);
    };

    // Helper to get the first letter for avatar fallback
    const firstLetter = user.name ? user.name.charAt(0).toUpperCase() : "U";

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4 py-12">
            <div className="relative flex w-full max-w-xl flex-col gap-6 rounded-2xl border border-default-200 bg-content1 p-8 shadow-xl">
                
                {/* VIEW MODE */}
                {!isEditing ? (
                    <>
                        {/* Update Profile Button in top-right corner */}
                        <div className="absolute right-6 top-6">
                            <Button 
                                size="sm"  
                                variant="tertiary"
                                onPress={() => {
                                    setIsEditing(true);
                                    setSuccessMessage(null);
                                }}
                            >
                                <FaEdit className="mr-1" /> Update Profile
                            </Button>
                        </div>

                        {successMessage && (
                            <div className="rounded-lg bg-success-50 p-3 text-sm text-success-600 border border-success-200 text-center">
                                {successMessage}
                            </div>
                        )}

                        {/* Header Section with Conditional Avatar / First Letter Fallback */}
                        <div className="flex flex-col items-center pb-2 text-center pt-4">
                            <div className="relative mb-4">
                                {user.image ? (
                                    <Image
                                        src={user.image}
                                        alt={user.name}
                                        className="h-24 w-24 rounded-full border-2 border-primary object-cover shadow-md"
                                    />
                                ) : (
                                    <div className="flex h-24 w-24 items-center justify-center rounded-full border-2 border-primary bg-primary-100 text-3xl font-bold text-primary shadow-md">
                                        {firstLetter}
                                    </div>
                                )}
                                <span className="absolute bottom-0 right-0 rounded-full bg-default-100 p-2 text-default-700 shadow border border-default-200">
                                    {user.provider === "google" ? <FaGoogle className="text-danger" /> : 
                                     user.provider === "github" ? <FaGithub className="text-foreground" /> : 
                                     <FaUser className="text-primary" />}
                                </span>
                            </div>
                            <h1 className="text-2xl font-bold tracking-tight">{user.name}</h1>
                            <p className="text-sm text-default-500">{user.email}</p>
                        </div>

                        {/* Additional Info / View Details Card */}
                        <div className="flex flex-col gap-3 rounded-xl border border-default-100 bg-default-50 p-4 mt-2">
                            <div className="flex justify-between text-sm">
                                <span className="text-default-500">Account Provider:</span>
                                <span className="font-semibold capitalize">{user.provider}</span>
                            </div>
                            <div className="flex justify-between text-sm">
                                <span className="text-default-500">Email Status:</span>
                                <span className="font-semibold text-success">Verified</span>
                            </div>
                        </div>
                    </>
                ) : (
                    /* EDIT MODE */
                    <>
                        {/* Cancel Button in top-right corner */}
                        <div className="absolute right-6 top-6">
                            <Button 
                                size="sm" 
                                variant="tertiary" 
                                onPress={() => setIsEditing(false)}
                            >
                                <FaArrowLeft className="mr-1" /> Cancel
                            </Button>
                        </div>

                        <div className="flex flex-col items-center pb-2 text-center pt-4">
                            <h1 className="text-2xl font-bold tracking-tight">Edit Profile</h1>
                            <p className="text-sm text-default-500">Update your account name</p>
                        </div>

                        {/* Profile Update Form (Name & Read-only Email) */}
                        <Form className="flex flex-col gap-4 mt-2" onSubmit={handleUpdateProfile}>
                            <TextField
                                isRequired
                                name="name"
                                defaultValue={user.name}
                                validate={(value) => {
                                    if (value.length < 3) {
                                        return "Name must be at least 3 characters";
                                    }
                                    return null;
                                }}
                            >
                                <Label>Display Name</Label>
                                <Input placeholder="Enter your full name" />
                                <FieldError />
                            </TextField>

                            <Button 
                                type="submit" 
                                className="w-full font-medium mt-2" 
                                isDisabled={loading}
                            >
                                <FaSave className="mr-1" />
                                {loading ? "Saving Changes..." : "Save Changes"}
                            </Button>
                        </Form>
                    </>
                )}

            </div>
        </div>
    );
}