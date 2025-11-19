"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail, Lock, LogIn } from "lucide-react";

export default function LoginPage() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!email || !password) {
            alert("Please fill all fields");
            return;
        }
        setIsLoading(true);
        console.log("Login data:", { email, password });
        setTimeout(() => setIsLoading(false), 1500);
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-950 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-zinc-400 rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
                <div className="absolute top-1/3 right-1/4 w-96 h-96 rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ animationDelay: "1s", backgroundColor: "rgb(217, 119, 87)" }}></div>
                <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-zinc-600 rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
            </div>

            {/* Login Card with entrance animation */}
            <Card className="w-full max-w-md relative z-10 shadow-2xl animate-[slideUp_0.5s_ease-out] backdrop-blur-sm bg-zinc-900/95 border-zinc-800">
                <CardHeader className="space-y-1 text-center">
                    <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 animate-[bounce_1s_ease-in-out_3]" style={{ background: "linear-gradient(to right, rgb(217, 119, 87), rgb(180, 90, 65))" }}>
                        <LogIn className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-zinc-100">
                        Welcome Back
                    </CardTitle>
                    <p className="text-sm text-zinc-400">Enter your credentials to continue</p>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-2 group">
                            <Label className="text-sm font-medium text-zinc-300">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" />
                                <Input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="pl-10 transition-all focus:ring-2 border-zinc-700 bg-zinc-800/50 text-zinc-100 placeholder:text-zinc-500 hover:border-zinc-600 focus:border-zinc-500"
                                    style={{ "--tw-ring-color": "rgb(217, 119, 87)" }}
                                />
                            </div>
                        </div>
                        <div className="space-y-2 group">
                            <Label className="text-sm font-medium text-zinc-300">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" />
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="pl-10 transition-all focus:ring-2 border-zinc-700 bg-zinc-800/50 text-zinc-100 placeholder:text-zinc-500 hover:border-zinc-600 focus:border-zinc-500"
                                    style={{ "--tw-ring-color": "rgb(217, 119, 87)" }}
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input type="checkbox" className="rounded border-zinc-600 bg-zinc-800 focus:ring-offset-zinc-900" style={{ accentColor: "rgb(217, 119, 87)" }} />
                                <span className="text-zinc-400">Remember me</span>
                            </label>
                            <a href="#" className="font-medium transition-colors hover:underline" style={{ color: "rgb(217, 119, 87)" }}>
                                Forgot password?
                            </a>
                        </div>
                        <Button
                            onClick={handleSubmit}
                            className="w-full text-white font-semibold py-6 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl border-0"
                            style={{
                                background: "linear-gradient(to right, rgb(217, 119, 87), rgb(180, 90, 65))",
                                "--tw-shadow-color": "rgb(217, 119, 87)"
                            }}
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Logging in...</span>
                                </div>
                            ) : (
                                "Login"
                            )}
                        </Button>
                    </div>
                </CardContent>
                <CardFooter className="text-center text-sm border-t border-zinc-800 pt-6">
                    <p className="text-zinc-400 w-full">
                        Don't have an account?{" "}
                        <a href="/signup" className="font-semibold transition-colors hover:underline" style={{ color: "rgb(217, 119, 87)" }}>
                            Sign Up
                        </a>
                    </p>
                </CardFooter>
            </Card>

            <style jsx>{`
                @keyframes slideUp {
                    from {
                        opacity: 0;
                        transform: translateY(30px);
                    }
                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }
            `}</style>
        </div>
    );
}