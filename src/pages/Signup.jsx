"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Lock, UserPlus, Check, Upload, X, Camera, RotateCw } from "lucide-react";

export default function SignupPage() {
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState(0);
    const [profileImage, setProfileImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [imageRotation, setImageRotation] = useState(0);
    const [imagePosition, setImagePosition] = useState({ x: 0, y: 0 });
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
    const [imageScale, setImageScale] = useState(1);

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

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            setProfileImage(file);
            setImageRotation(0);
            setImagePosition({ x: 0, y: 0 });
            setImageScale(1);
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setProfileImage(null);
        setImagePreview(null);
        setImageRotation(0);
        setImagePosition({ x: 0, y: 0 });
        setImageScale(1);
    };

    const rotateImage = () => {
        setImageRotation((prev) => (prev + 90) % 360);
    };

    const handleMouseDown = (e) => {
        e.preventDefault();
        setIsDragging(true);
        setDragStart({
            x: e.clientX - imagePosition.x,
            y: e.clientY - imagePosition.y
        });
    };

    const handleMouseMove = (e) => {
        if (isDragging) {
            setImagePosition({
                x: e.clientX - dragStart.x,
                y: e.clientY - dragStart.y
            });
        }
    };

    const handleMouseUp = () => {
        setIsDragging(false);
    };

    const handleWheel = (e) => {
        e.preventDefault();
        const delta = e.deltaY > 0 ? -0.1 : 0.1;
        setImageScale((prev) => Math.min(Math.max(0.5, prev + delta), 3));
    };

    const handleSubmit = () => {
        if (!username || !email || !password) {
            alert("Please fill all fields");
            return;
        }
        setIsLoading(true);
        console.log("Signup data:", { username, email, password, profileImage, imageRotation });
        setTimeout(() => setIsLoading(false), 1500);
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            handleSubmit();
        }
    };

    const getStrengthColor = () => {
        if (passwordStrength === 0) return "bg-zinc-700";
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
        <div className="relative flex items-center justify-center min-h-screen bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-950 overflow-hidden py-8">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-10">
                <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-zinc-400 rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/3 left-1/4 w-80 h-80 rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ animationDelay: "1s", backgroundColor: "rgb(217, 119, 87)" }}></div>
                <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-zinc-600 rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
            </div>

            {/* Signup Card with entrance animation */}
            <Card className="w-full max-w-md relative z-10 shadow-2xl animate-[slideUp_0.5s_ease-out] backdrop-blur-sm bg-zinc-900/95 border-zinc-800">
                <CardHeader className="space-y-1 text-center">
                    <div className="mx-auto w-16 h-16 rounded-full flex items-center justify-center mb-4 animate-[bounce_1s_ease-in-out_3]" style={{ background: "linear-gradient(to bottom right, rgb(217, 119, 87), rgb(180, 90, 65))" }}>
                        <UserPlus className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-3xl font-bold text-zinc-100">
                        Create Account
                    </CardTitle>
                    <p className="text-sm text-zinc-400">Join us today and get started</p>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {/* Profile Image Upload */}
                        <div className="space-y-2">
                            <Label className="text-sm font-medium text-zinc-300 text-center block">Profile Picture (Optional)</Label>
                            <div className="flex items-center justify-center">
                                {imagePreview ? (
                                    <div
                                        className="relative w-32 h-32 rounded-full overflow-hidden shadow-lg bg-zinc-800"
                                        style={{ borderWidth: "4px", borderColor: "rgb(217, 119, 87)" }}
                                        onMouseMove={handleMouseMove}
                                        onMouseUp={handleMouseUp}
                                        onMouseLeave={handleMouseUp}
                                    >
                                        <img
                                            src={imagePreview}
                                            alt="Profile preview"
                                            className="absolute w-full h-full object-cover transition-transform duration-100 select-none"
                                            style={{
                                                transform: `translate(${imagePosition.x}px, ${imagePosition.y}px) rotate(${imageRotation}deg) scale(${imageScale})`,
                                                cursor: isDragging ? 'grabbing' : 'grab'
                                            }}
                                            onMouseDown={handleMouseDown}
                                            onWheel={handleWheel}
                                            draggable="false"
                                        />
                                        {/* Hover overlay with action buttons */}
                                        <div className="absolute inset-0 bg-black bg-opacity-60 rounded-full opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-1 pointer-events-none">
                                            <div className="flex gap-1 pointer-events-auto">
                                                {/* Rotate button */}
                                                <button
                                                    onClick={rotateImage}
                                                    className="rounded-full p-2 transition-all transform hover:scale-110"
                                                    style={{ backgroundColor: "rgb(217, 119, 87)" }}
                                                    title="Rotate image"
                                                >
                                                    <RotateCw className="w-4 h-4 text-white" />
                                                </button>

                                                {/* Change photo button */}
                                                <input
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="hidden"
                                                    id="profile-upload-change"
                                                />
                                                <label
                                                    htmlFor="profile-upload-change"
                                                    className="cursor-pointer rounded-full p-2 transition-all transform hover:scale-110"
                                                    style={{ backgroundColor: "rgb(180, 90, 65)" }}
                                                    title="Change photo"
                                                >
                                                    <Camera className="w-4 h-4 text-white" />
                                                </label>

                                                {/* Remove button */}
                                                <button
                                                    onClick={removeImage}
                                                    className="bg-red-500 hover:bg-red-600 rounded-full p-2 transition-all transform hover:scale-110"
                                                    title="Remove photo"
                                                >
                                                    <X className="w-4 h-4 text-white" />
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ) : (
                                    <div className="relative w-32 h-32 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900 border-2 border-dashed border-zinc-600 flex items-center justify-center group hover:border-zinc-500 transition-all">
                                        <User className="w-16 h-16 text-zinc-600 group-hover:text-zinc-500 transition-colors" />
                                        <div className="absolute bottom-2 right-2">
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={handleImageChange}
                                                className="hidden"
                                                id="profile-upload"
                                            />
                                            <label
                                                htmlFor="profile-upload"
                                                className="cursor-pointer rounded-full p-2 inline-flex items-center justify-center transition-all transform hover:scale-110 active:scale-95 shadow-lg"
                                                style={{ backgroundColor: "rgb(217, 119, 87)" }}
                                                title="Upload photo"
                                            >
                                                <Camera className="w-5 h-5 text-white" />
                                            </label>
                                        </div>
                                    </div>
                                )}
                            </div>
                            <p className="text-xs text-zinc-500 text-center">
                                JPG, PNG or GIF (max 5MB)<br />
                                <span className="font-medium" style={{ color: "rgb(217, 119, 87)" }}>Drag to reposition • Scroll to zoom</span>
                            </p>
                        </div>

                        <div className="space-y-2 group">
                            <Label className="text-sm font-medium text-zinc-300">Username</Label>
                            <div className="relative">
                                <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" />
                                <Input
                                    value={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Choose a username"
                                    className="pl-10 transition-all focus:ring-2 border-zinc-700 bg-zinc-800/50 text-zinc-100 placeholder:text-zinc-500 hover:border-zinc-600 focus:border-zinc-500"
                                    style={{ "--tw-ring-color": "rgb(217, 119, 87)" }}
                                />
                                {username && (
                                    <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500 animate-[fadeIn_0.3s_ease-in]" />
                                )}
                            </div>
                        </div>

                        <div className="space-y-2 group">
                            <Label className="text-sm font-medium text-zinc-300">Email</Label>
                            <div className="relative">
                                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" />
                                <Input
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Enter your email"
                                    className="pl-10 transition-all focus:ring-2 border-zinc-700 bg-zinc-800/50 text-zinc-100 placeholder:text-zinc-500 hover:border-zinc-600 focus:border-zinc-500"
                                    style={{ "--tw-ring-color": "rgb(217, 119, 87)" }}
                                />
                                {email.includes('@') && (
                                    <Check className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500 animate-[fadeIn_0.3s_ease-in]" />
                                )}
                            </div>
                        </div>

                        <div className="space-y-2 group">
                            <Label className="text-sm font-medium text-zinc-300">Password</Label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-zinc-300 transition-colors" />
                                <Input
                                    type="password"
                                    value={password}
                                    onChange={handlePasswordChange}
                                    onKeyPress={handleKeyPress}
                                    placeholder="Create a password"
                                    className="pl-10 transition-all focus:ring-2 border-zinc-700 bg-zinc-800/50 text-zinc-100 placeholder:text-zinc-500 hover:border-zinc-600 focus:border-zinc-500"
                                    style={{ "--tw-ring-color": "rgb(217, 119, 87)" }}
                                />
                            </div>
                            {password && (
                                <div className="space-y-1 animate-[fadeIn_0.3s_ease-in]">
                                    <div className="flex gap-1">
                                        {[...Array(4)].map((_, i) => (
                                            <div
                                                key={i}
                                                className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${i < passwordStrength ? getStrengthColor() : 'bg-zinc-700'
                                                    }`}
                                            />
                                        ))}
                                    </div>
                                    <p className="text-xs text-zinc-500">
                                        Password strength: <span className="font-medium text-zinc-300">{getStrengthText()}</span>
                                    </p>
                                </div>
                            )}
                        </div>

                        <div className="flex items-start space-x-2 text-sm">
                            <input type="checkbox" className="mt-0.5 rounded border-zinc-600 bg-zinc-800 focus:ring-offset-zinc-900" style={{ accentColor: "rgb(217, 119, 87)" }} />
                            <span className="text-zinc-400">
                                I agree to the{" "}
                                <a href="#" className="font-medium transition-colors hover:underline" style={{ color: "rgb(217, 119, 87)" }}>
                                    Terms of Service
                                </a>{" "}
                                and{" "}
                                <a href="#" className="font-medium transition-colors hover:underline" style={{ color: "rgb(217, 119, 87)" }}>
                                    Privacy Policy
                                </a>
                            </span>
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
                                    <span>Creating account...</span>
                                </div>
                            ) : (
                                "Sign Up"
                            )}
                        </Button>
                    </div>
                </CardContent>
                <CardFooter className="text-center text-sm border-t border-zinc-800 pt-6">
                    <p className="text-zinc-400 w-full">
                        Already have an account?{" "}
                        <a href="/login" className="font-semibold transition-colors hover:underline" style={{ color: "rgb(217, 119, 87)" }}>
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