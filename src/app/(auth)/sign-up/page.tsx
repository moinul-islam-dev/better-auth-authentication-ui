"use client";

import { useState } from "react";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

const SignUpPage = () => {
    const [loading, setLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const [password, setPassword] = useState("");

    const handleSocialAuth = async (provider: "google" | "github") => {
        setLoading(true);
        setErrorMessage("");

        // try {
        // TODO: Better Auth social sign-in logic
        // console.log(`handleSocial: ${provider}`);

        // } catch (err) {

        // }
    };

    // Handle Email/Password Form Submission
    const handleEmailAuth = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        setErrorMessage(null);
        setLoading(true);

        // try {
        // TODO: Better Auth sign-in logic
        // console.log("sign-up", { email, password });
        // }

        // catch(err) {

        // }
    };

    // Handle Social Logins (Google & GitHub)
    const handleSocialSignIn = async (provider: "google" | "github") => {
        setSocialLoading(provider);

        console.log(provider)
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-background px-4">


            <Form className="flex w-full max-w-md flex-col gap-4 rounded-2xl border border-default-200 bg-content1 p-6 shadow-xl" onSubmit={handleEmailAuth}>


                <div className="flex flex-col items-center pb-2 text-center">
                    <h1 className="text-2xl font-bold tracking-tight">Create an Account</h1>
                    <p className="text-sm text-default-500">Sign up to get started with your account</p>
                </div>

                {errorMessage && (
                    <div className="rounded-lg bg-danger-50 p-3 text-sm text-danger-500 border border-danger-200">
                        {errorMessage}
                    </div>
                )}

                <TextField
                    isRequired
                    name="name"
                    validate={(value) => {
                        if (value.length < 3) {
                            return "Name must be at least 3 characters";
                        }
                        return null;
                    }}
                >
                    <Label>Name</Label>
                    <Input placeholder="John Doe" />
                    <FieldError />
                </TextField>

                <TextField
                    isRequired
                    name="email"
                    type="email"
                    validate={(value) => {
                        if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(value)) {
                            return "Please enter a valid email address";
                        }
                        return null;
                    }}
                >
                    <Label>Email</Label>
                    <Input placeholder="john@example.com" />
                    <FieldError />
                </TextField>

                <TextField
                    isRequired
                    minLength={8}
                    name="password"
                    type="password"
                    value={password}
                    onChange={setPassword}
                    validate={(value) => {
                        if (value.length < 8) {
                            return "Password must be at least 8 characters";
                        }
                        if (!/[A-Z]/.test(value)) {
                            return "Password must contain at least one uppercase letter";
                        }
                        if (!/[a-z]/.test(value)) {
                            return "Password must contain at least one lowercase letter";
                        }
                        if (!/[0-9]/.test(value)) {
                            return "Password must contain at least one number";
                        }
                        if (!/[^\w\s]/.test(value)) {
                            return "Password must contain at least one special character";
                        }
                        return null;
                    }}
                >
                    <Label>Password</Label>
                    <Input placeholder="Enter your password" />
                    <Description>Must be at least 8 characters with 1 uppercase, 1 lowercase, 1 special character and 1 number</Description>
                    <FieldError />
                </TextField>

                {/* Confirm Password Field */}
                <TextField
                    isRequired
                    name="confirmPassword"
                    type="password"
                    validate={(value) => {
                        if (!value) return "Please confirm your password";
                        if (value !== password) {
                            return "Passwords do not match";
                        }
                        return null;
                    }}
                >
                    <Label>Confirm your Password</Label>
                    <Input placeholder="Re-enter your password" />
                    <FieldError />
                </TextField>

                <div className="flex flex-col gap-3 pt-2">
                    <Button type="submit" className="w-full font-medium" isDisabled={loading}>
                        {loading ? "Signing in..." : "Sign In"}
                    </Button>

                    <div className="flex items-center my-2">
                        <div className="grow border-t border-default-200"></div>
                        <span className="px-3 text-xs uppercase text-default-400">or</span>
                        <div className="grow border-t border-default-200"></div>
                    </div>

                    <Button
                        className="w-full font-medium"
                        variant="tertiary"
                        onPress={() => handleSocialAuth("google")}
                        isDisabled={socialLoading !== null}
                    >
                        <FcGoogle className="text-lg" />
                        {socialLoading === "google" ? "Connecting..." : "Sign in with Google"}
                    </Button>

                    <Button
                        className="w-full font-medium"
                        variant="tertiary"
                        onPress={() => handleSocialAuth("github")}
                        isDisabled={socialLoading !== null}
                    >
                        <FaGithub className="text-lg" />
                        {socialLoading === "github" ? "Connecting..." : "Sign in with GitHub"}
                    </Button>
                </div>


                {/* Already have an account link */}
                <p className="mt-2 text-center text-sm text-default-500">
                    Already have an account?{" "}
                    <Link href="/sign-in" className="font-semibold text-blue-500 hover:text-blue-700 underline-offset-4 hover:underline">
                        Sign In
                    </Link>
                </p>

            </Form>


        </div>
    );
};

export default SignUpPage;