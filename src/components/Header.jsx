import React, { useState } from "react";
import { MessageSquare, Search, UserCircle, Plus, Bell, Users } from "lucide-react";
import { useNavigate } from 'react-router-dom'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const Header = () => {

    const [lineStatus, setLineStatus] = useState("offline")
    const navigate = useNavigate()


    const openSearchBar = () => {
        console.log('open search bar');
    }
    const openCreateGroupBox = () => {
        console.log('openCreateGroupBox');
    }
    const openNotificationBox = () => {
        console.log('openNotificationBox');
    }
    const openGroupsList = () => navigate("/groups")
    return (
        <header className="w-full bg-zinc-900 px-6 flex items-center justify-between shadow-sm">

            {/* Logo / App Name */}
            <div className="flex items-center gap-1">
                <MessageSquare className="w-10 h-10 text-primary" />
                <h1 className="text-2xl font-bold text-zinc-200 tracking-wide">
                    CircuitChat
                </h1>
            </div>

            {/* Right Section */}
            <div className="flex items-center gap-6">

                <TooltipProvider>
                    <div>
                        <IconBtn onClick={openSearchBar} icon={Search} title={"Search"} />
                    </div>

                    <div>
                        <IconBtn onClick={openCreateGroupBox} icon={Plus} title={"Create Group"} />
                    </div>

                    <div>
                        <IconBtn title={"Notifications"} onClick={openNotificationBox} icon={Bell} />
                    </div>
                    <div>
                        <IconBtn title={"Groups"} onClick={openGroupsList} icon={Users} />
                    </div>
                </TooltipProvider>


                <div className="flex flex-col justify-center items-center gap-2">
                    {/* Status or Actions (example placeholder) */}
                    {/* User Icon */}
                    <UserCircle className="w-8 h-8 text-zinc-300 cursor-pointer hover:text-zinc-100 transition" />
                    <span className="text-sm text-primary font-semibold hidden md:block">
                        {lineStatus}
                    </span>

                </div>

            </div>

        </header>
    );
};



const IconBtn = ({ icon: Icon, title, onClick }) => {
    return (
        <Tooltip>
            <TooltipTrigger asChild>
                <Icon
                    className="w-8 h-8 text-zinc-300 cursor-pointer hover:text-zinc-100 transition"
                    onClick={onClick}
                />
            </TooltipTrigger>
            <TooltipContent>
                <p >{title}</p>
            </TooltipContent>
        </Tooltip>)
}
export default Header;
