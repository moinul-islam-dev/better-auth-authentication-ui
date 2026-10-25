"use client";

import { useState } from "react";
import { Button, Description, FieldError, Form, Input, Label, TextField } from "@heroui/react";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import Link from "next/link";

const SignInPage = () => {
    const [loading, setLoading] = useState(false);
    const [socialLoading, setSocialLoading] = useState<string | null>(null);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

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
        // console.log("sign-in", { email, password });
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
                    <h1 className="text-2xl font-bold tracking-tight">Welcome Back</h1>
                    <p className="text-sm text-default-500">Sign in to your account to continue</p>
                </div>

                {errorMessage && (
                    <div className="rounded-lg bg-danger-50 p-3 text-sm text-danger-500 border border-danger-200">
                        {errorMessage}
                    </div>
                )}

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
                    name="password"
                    type="password"
                >
                    <Label>Password</Label>
                    <Input placeholder="Enter your password" />
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


                {/* Don't have an account link */}
                <p className="mt-2 text-center text-sm text-default-500">
                    Don't have an account?{" "}
                    <Link href="/sign-up" className="font-semibold text-blue-500 hover:text-blue-700 underline-offset-4 hover:underline">
                        Sign Up
                    </Link>
                </p>

            </Form>


        </div>

    );
};

export default SignInPage;