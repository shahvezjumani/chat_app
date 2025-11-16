"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Lock, UserPlus, Check } from "lucide-react";

export default function SignupPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);

    const calculatePasswordStrength = (pwd) => {
        let strength = 0;
        if (pwd.length >= 8) strength++;
        if (/[a-z]/.test(pwd) && /[A-Z]/.test(pwd)) strength++;
        if (/\d/.test(pwd)) strength++;
        if (/[^a-zA-Z\d]/.test(pwd)) strength++;
        return strength;
    };

    const handlePasswordChange = (e) => {
        const pwd = e.target.value;
        setPassword(pwd);
        setPasswordStrength(calculatePasswordStrength(pwd));
    };

    const handleSubmit = () => {
        if (!username || !email || !password) {
            alert("Please fill all fields");
            return;
        }
        setIsLoading(true);
        console.log("Signup data:", { username, email, password });
        setTimeout(() => setIsLoading(false), 1500);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    const getStrengthColor = () => {
        if (passwordStrength === 0) return "bg-gray-200";
        if (passwordStrength === 1) return "bg-red-500";
        if (passwordStrength === 2) return "bg-orange-500";
        if (passwordStrength === 3) return "bg-yellow-500";
        return "bg-green-500";
    };

    const getStrengthText = () => {
        if (passwordStrength === 0) return "";
        if (passwordStrength === 1) return "Weak";
        if (passwordStrength === 2) return "Fair";
        if (passwordStrength === 3) return "Good";
        return "Strong";
    };

    return (
        <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-cyan-400 via-blue-500 to-purple-600 overflow-hidden">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/3 left-1/4 w-80 h-80 bg-blue-200 rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
                <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-purple-200 rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
            </div>

            {/* Signup Card with entrance animation */}
            <Card className="w-full max-w-md relative z-10 shadow-2xl animate-[slideUp_0.5s_ease-out] backdrop-blur-sm bg-white/95">
                <CardHeader className="space-y-1 text-center">
                    <div className="mx-auto w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center mb-4 animate-[bounce_1s_ease-in-out_3]">
                        <UserPlus className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-3xl font-bold bg-gradient-to-r from-cyan-600 to-blue-600 bg-clip-text text-transparent">
                        Create Account
                    </CardTitle>
                    <p className="text-sm text-gray-500">Join us today and get started</p>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        <div className="space-y-2 group">
                            <Label className="text-sm font-medium text-gray-700">Username</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyan-500 transition-colors" />
                                <Input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Choose a username"
                                    className="pl-10 transition-all focus:ring-2 focus:ring-cyan-500 border-gray-300 hover:border-cyan-300"
                                />
                                {username && (
                                    <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500 animate-[fadeIn_0.3s_ease-in]" />
                                )}
                            </div>
                        </div>

                        <div className="space-y-2 group">
                            <Label className="text-sm font-medium text-gray-700">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyan-500 transition-colors" />
                                <Input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Enter your email"
                                    className="pl-10 transition-all focus:ring-2 focus:ring-cyan-500 border-gray-300 hover:border-cyan-300"
                                />
                                {email.includes('@') && (
                                    <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500 animate-[fadeIn_0.3s_ease-in]" />
                                )}
                            </div>
                        </div>

                        <div className="space-y-2 group">
                            <Label className="text-sm font-medium text-gray-700">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400 group-focus-within:text-cyan-500 transition-colors" />
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Create a password"
                                    className="pl-10 transition-all focus:ring-2 focus:ring-cyan-500 border-gray-300 hover:border-cyan-300"
                                />
                            </div>
                            {password && (
                                <div className="space-y-1 animate-[fadeIn_0.3s_ease-in]">
                                    <div className="flex gap-1">
                                        {[...Array(4)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i < passwordStrength ? getStrengthColor() : 'bg-gray-200'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-xs text-gray-500">
                                        Password strength: <span className="font-medium">{getStrengthText()}</span>
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="flex items-start space-x-2 text-sm">
                            <input type="checkbox" className="mt-0.5 rounded border-gray-300 text-cyan-600 focus:ring-cyan-500" />
                            <span className="text-gray-600">
                                I agree to the{" "}
                                <a href="#" className="text-cyan-600 hover:text-cyan-700 font-medium transition-colors">
                                    Terms of Service
                                </a>{" "}
                                and{" "}
                                <a href="#" className="text-cyan-600 hover:text-cyan-700 font-medium transition-colors">
                                    Privacy Policy
                                </a>
                            </span>
                        </div>

                        <Button
                            onClick={handleSubmit}
                            className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-700 hover:to-blue-700 text-white font-semibold py-6 rounded-lg transition-all transform hover:scale-[1.02] active:scale-[0.98] shadow-lg hover:shadow-xl"
                            disabled={isLoading}
                        >
                            {isLoading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                    <span>Creating account...</span>
                                </div>
                            ) : (
                                "Sign Up"
                            )}
                        </Button>
                    </div>
                </CardContent>
                <CardFooter className="text-center text-sm border-t pt-6">
                    <p className="text-gray-600 w-full">
                        Already have an account?{" "}
                        <a href="/login" className="text-cyan-600 hover:text-cyan-700 font-semibold transition-colors hover:underline">
                            Login
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
                
                @keyframes fadeIn {
                    from {
                        opacity: 0;
                    }
                    to {
                        opacity: 1;
                    }
                }
            `}</style>
        </div>
    );
}