import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import Header from "../components/Header";

const AppLayout = (WrappedComponent) => {
    return function LayoutWrapper(props) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-zinc-800 via-zinc-900 to-zinc-950">
                {/* Header Component Placeholder */}
                <header className="bg-zinc-900/95 border-b border-zinc-800 backdrop-blur-sm sticky top-0 z-50">
                    <div className="px-6 py-4">
                        <Header />
                    </div>
                </header>

                {/* Main layout */}
                <div className="grid grid-cols-3 gap-6 px-6 py-6 min-h-[calc(100vh-140px)]">

                    {/* Left Sidebar */}
                    <Card className="bg-zinc-900/95 border-zinc-800 rounded-2xl shadow-lg backdrop-blur-sm hover:shadow-xl transition-shadow">
                        <CardHeader className="border-b border-zinc-800/50">
                            <CardTitle className="text-zinc-100 text-lg font-semibold">
                                Conversations
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="text-zinc-400">
                                Sidebar content
                            </div>
                        </CardContent>
                    </Card>

                    {/* Center Content */}
                    <Card className="bg-zinc-900/95 border-zinc-800 rounded-2xl shadow-lg backdrop-blur-sm hover:shadow-xl transition-shadow">
                        <CardContent className="p-6">
                            <WrappedComponent {...props} />
                        </CardContent>
                    </Card>

                    {/* Right Sidebar */}
                    <Card className="bg-zinc-900/95 border-zinc-800 rounded-2xl shadow-lg backdrop-blur-sm hover:shadow-xl transition-shadow">
                        <CardHeader className="border-b border-zinc-800/50">
                            <CardTitle className="text-zinc-100 text-lg font-semibold">
                                Profile / Info
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="pt-6">
                            <div className="text-zinc-400">
                                User panel
                            </div>
                        </CardContent>
                    </Card>

                </div>

                {/* Footer */}
                <footer className="text-center py-6 text-sm text-zinc-500 bg-zinc-950 border-t border-zinc-800">
                    <p>
                        © 2025 — <span className="font-medium" style={{ color: "rgb(217, 119, 87)" }}>Your App Name</span>
                    </p>
                </footer>
            </div>
        );
    };
};

export default AppLayout;