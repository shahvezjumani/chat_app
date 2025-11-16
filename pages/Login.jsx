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
        // Simulate API call
        setTimeout(() => setIsLoading(false), 1500);
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
                <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-yellow-200 rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
                <div className="absolute bottom-1/4 left-1/3 w-80 h-80 bg-pink-200 rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
            </div>

            {/* Login Card with entrance animation */}
            <Card className="w-full max-w-md relative z-10 shadow-2xl animate-[slideUp_0.5s_ease-out] backdrop-blur-sm bg-white/95">
                <CardHeader className="space-y-1 text-center">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-r from-cyan-600 to-blue-600 rounded-full flex items-center justify-center mb-4 animate-[bounce_1s_ease-in-out_3]">
                        <LogIn className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                        Welcome Back
                    </CardTitle>
                    <p className="text-sm text-gray-500">Enter your credentials to continue</p>
                </CardHeader>
                <CardContent>
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="space-y-2 group">
                            <Label className="text-sm font-medium text-gray-700">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyan-500 transition-colors" />
                                <Input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    placeholder="Enter your email"
                                    className="pl-10 transition-all focus:ring-2 focus:ring-indigo-500 border-gray-300 hover:border-indigo-300"
                                />
                            </div>
                        </div>
                        <div className="space-y-2 group">
                            <Label className="text-sm font-medium text-gray-700">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyan-500 transition-colors" />
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    placeholder="Enter your password"
                                    className="pl-10 transition-all focus:ring-2 focus:ring-indigo-500 border-gray-300 hover:border-indigo-300"
                                />
                            </div>
                        </div>
                        <div className="flex items-center justify-between text-sm">
                            <label className="flex items-center space-x-2 cursor-pointer">
                                <input type="checkbox" className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500" />
                                <span className="text-gray-600">Remember me</span>
                            </label>
                            <a href="#" className="text-cyan-600 hover:text-cyan-700 font-medium transition-colors">
                                Forgot password?
                            </a>
                        </div>
                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-6 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
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
                    </form>
                </CardContent>
                <CardFooter className="text-center text-sm border-t pt-6">
                    <p className="text-gray-600 w-full">
                        Don't have an account?{" "}
                        <a href="/signup" className="text-cyan-600 hover:text-cyan-700 font-semibold transition-colors hover:underline">
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