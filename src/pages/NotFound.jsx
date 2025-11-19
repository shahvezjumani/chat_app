import React from 'react';
import { Home, ArrowLeft, Search } from 'lucide-react';

const NotFound = () => {
    return (
        <div className="relative min-h-screen bg-gradient-to-br from-purple-500 via-pink-500 to-red-500 overflow-hidden flex items-center justify-center">
            {/* Animated background elements */}
            <div className="absolute inset-0 opacity-20">
                <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-white rounded-full mix-blend-overlay filter blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-yellow-200 rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ animationDelay: "1s" }}></div>
                <div className="absolute top-1/2 right-1/3 w-72 h-72 bg-pink-200 rounded-full mix-blend-overlay filter blur-3xl animate-pulse" style={{ animationDelay: "2s" }}></div>
            </div>

            {/* Content */}
            <div className="relative z-10 text-center px-4 animate-[fadeIn_0.6s_ease-out]">
                {/* 404 Text */}
                <div className="relative mb-8">
                    <h1 className="text-[180px] md:text-[250px] font-bold text-white opacity-20 select-none leading-none animate-[bounce_2s_ease-in-out_infinite]">
                        404
                    </h1>
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="bg-white/90 backdrop-blur-sm rounded-3xl px-8 py-6 shadow-2xl transform hover:scale-105 transition-transform">
                            <h2 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                                Oops!
                            </h2>
                            <p className="text-xl md:text-2xl text-gray-700 font-medium">
                                Page Not Found
                            </p>
                        </div>
                    </div>
                </div>

                {/* Description */}
                <p className="text-white text-lg md:text-xl mb-8 max-w-md mx-auto font-medium shadow-lg">
                    The page you're looking for seems to have wandered off into the digital void.
                </p>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <a
                        href="/"
                        className="group inline-flex items-center gap-2 bg-white text-purple-600 px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:shadow-2xl transition-all transform hover:scale-105 active:scale-95"
                    >
                        <Home className="w-5 h-5 group-hover:animate-pulse" />
                        Go Home
                    </a>

                    <button
                        onClick={() => window.history.back()}
                        className="group inline-flex items-center gap-2 bg-purple-600 bg-opacity-30 backdrop-blur-sm text-white border-2 border-white px-8 py-4 rounded-full font-semibold text-lg shadow-xl hover:bg-opacity-50 transition-all transform hover:scale-105 active:scale-95"
                    >
                        <ArrowLeft className="w-5 h-5 group-hover:animate-pulse" />
                        Go Back
                    </button>
                </div>

                {/* Search Suggestion */}
                <div className="mt-12 bg-white/20 backdrop-blur-sm rounded-2xl px-6 py-4 inline-block">
                    <div className="flex items-center gap-3 text-white">
                        <Search className="w-5 h-5 animate-pulse" />
                        <span className="font-medium">Try searching for what you need</span>
                    </div>
                </div>

                {/* Animated floating elements */}
                <div className="absolute top-20 left-10 w-20 h-20 bg-white/20 rounded-full animate-[float_3s_ease-in-out_infinite]"></div>
                <div className="absolute bottom-20 right-10 w-16 h-16 bg-white/20 rounded-full animate-[float_4s_ease-in-out_infinite]" style={{ animationDelay: "1s" }}></div>
                <div className="absolute top-40 right-20 w-12 h-12 bg-white/20 rounded-full animate-[float_5s_ease-in-out_infinite]" style={{ animationDelay: "2s" }}></div>
            </div>

            <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes float {
          0%, 100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-20px);
          }
        }
      `}</style>
        </div>
    );
};

export default NotFound;