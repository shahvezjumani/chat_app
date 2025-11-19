import React, { lazy, Suspense, useState } from "react";
import { MessageSquare, Search, UserCircle, Plus, Bell, Users, LogOut, BellRing } from "lucide-react";
import { useNavigate } from 'react-router-dom'
import {
    Tooltip,
    TooltipContent,
    TooltipProvider,
    TooltipTrigger,
} from "@/components/ui/tooltip";
const SearchDialog = lazy(() => import("./specific/SearchDialog"))
const NotificationsDialog = lazy(() => import("./specific/Notifications"))
const NewGroupDialog = lazy(() => import("./specific/NewGroup"))

const Header = () => {

    const [lineStatus, setLineStatus] = useState("offline")
    const [isNotification, setIsNotification] = useState(false)
    const [isSearch, setIsSearch] = useState(false)
    const [isNewGroup, setIsNewGroup] = useState(false)
    const navigate = useNavigate()


    const openSearchBar = () => {
        console.log('open search bar');
        setIsSearch(prev => !prev)
    }
    const openCreateGroupBox = () => {
        console.log('openCreateGroupBox');
        setIsNewGroup(prev => !prev)
    }
    const openNotificationBox = () => {
        console.log('openNotificationBox');
        setIsNotification(prev => !prev)
    }
    const openGroupsList = () => navigate("/groups")
    return (
        <>
            <header className="w-full bg-zinc-900 px-6 flex items-center justify-between shadow-sm">

                {/* Logo / App Name */}
                <div className="flex items-center gap-1">
                    <MessageSquare className="w-10 h-10 text-primary" />
                    <h1 className="text-2xl font-bold text-zinc-200 tracking-wide">
                        CircuitChat
                    </h1>
                </div>

                {/* Right Section */}
                <div className="flex items-center gap-9">
                    <div className="flex gap-5">
                        <TooltipProvider>
                            <div>
                                <IconBtn onClick={openSearchBar} icon={Search} title={"Search"} />
                            </div>

                            <div>
                                <IconBtn onClick={openCreateGroupBox} icon={Plus} title={"Create Group"} />
                            </div>

                            <div>
                                {
                                    isNotification
                                        ? <IconBtn title="Notifications (Active)" onClick={openNotificationBox} icon={BellRing} />
                                        : <IconBtn title="Notifications" onClick={openNotificationBox} icon={Bell} />
                                }

                            </div>
                            <div>
                                <IconBtn title={"Groups"} onClick={openGroupsList} icon={Users} />
                            </div>
                        </TooltipProvider>
                    </div>

                    <div>
                        <LogOut className="w-8 h-8 text-primary text-primart-dark cursor-pointer hover:text-zinc-100 transition" />
                    </div>


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
            {
                isSearch && (<Suspense fallback={<h1 className="text-white">loading...</h1>
                }><SearchDialog /></Suspense>)

            }
            {
                isNotification && (<Suspense fallback={<h1 className="text-white">loading...</h1>
                }><NotificationsDialog /></Suspense>)

            }
            {
                isNewGroup && (<Suspense fallback={<h1 className="text-white">loading...</h1>
                }><NewGroupDialog /></Suspense>)

            }
        </>

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
