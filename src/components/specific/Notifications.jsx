import React, { useState } from 'react';
import { Bell, MessageSquare, Users, UserPlus, Heart, Reply, Check, CheckCheck, Trash2, Settings, Filter } from 'lucide-react';

const Notifications = () => {
    const [activeTab, setActiveTab] = useState('all');
    const [notifications, setNotifications] = useState([
        {
            id: 1,
            type: 'message',
            sender: 'Sarah Anderson',
            avatar: 'SA',
            color: 'bg-pink-500',
            content: 'sent you a message',
            preview: 'Hey! Did you see the latest design updates?',
            timestamp: '2m ago',
            read: false,
            group: null
        },
        {
            id: 2,
            type: 'group',
            sender: 'Mike Chen',
            avatar: 'MC',
            color: 'bg-blue-500',
            content: 'added you to',
            group: 'React Developers',
            timestamp: '15m ago',
            read: false
        },
        {
            id: 3,
            type: 'mention',
            sender: 'Emma Wilson',
            avatar: 'EW',
            color: 'bg-purple-500',
            content: 'mentioned you in',
            group: 'Design Team',
            preview: '@you Great work on the new component!',
            timestamp: '1h ago',
            read: true
        },
        {
            id: 4,
            type: 'friend_request',
            sender: 'Alex Turner',
            avatar: 'AT',
            color: 'bg-green-500',
            content: 'sent you a friend request',
            timestamp: '2h ago',
            read: true,
            pending: true
        },
        {
            id: 5,
            type: 'reaction',
            sender: 'David Kim',
            avatar: 'DK',
            color: 'bg-orange-500',
            content: 'reacted ❤️ to your message',
            preview: 'The new feature is amazing!',
            timestamp: '3h ago',
            read: true,
            group: 'Product Updates'
        },
        {
            id: 6,
            type: 'reply',
            sender: 'Lisa Chen',
            avatar: 'LC',
            color: 'bg-cyan-500',
            content: 'replied to your message',
            preview: 'I agree, we should implement this ASAP',
            timestamp: '5h ago',
            read: true,
            group: 'Development'
        },
        {
            id: 7,
            type: 'message',
            sender: 'John Smith',
            avatar: 'JS',
            color: 'bg-indigo-500',
            content: 'sent you a message',
            preview: 'Can we schedule a meeting for tomorrow?',
            timestamp: '1d ago',
            read: true
        },
        {
            id: 8,
            type: 'group',
            sender: 'Team Admin',
            avatar: 'TA',
            color: 'bg-primary',
            content: 'created a new group',
            group: 'Q4 Planning',
            timestamp: '2d ago',
            read: true
        }
    ]);

    const tabs = [
        { id: 'all', label: 'All', icon: Bell },
        { id: 'messages', label: 'Messages', icon: MessageSquare },
        { id: 'mentions', label: 'Mentions', icon: Reply },
        { id: 'groups', label: 'Groups', icon: Users }
    ];

    const getNotificationIcon = (type) => {
        switch (type) {
            case 'message':
                return <MessageSquare className="w-4 h-4" />;
            case 'group':
                return <Users className="w-4 h-4" />;
            case 'mention':
                return <Reply className="w-4 h-4" />;
            case 'friend_request':
                return <UserPlus className="w-4 h-4" />;
            case 'reaction':
                return <Heart className="w-4 h-4" />;
            case 'reply':
                return <Reply className="w-4 h-4" />;
            default:
                return <Bell className="w-4 h-4" />;
        }
    };

    const getFilteredNotifications = () => {
        if (activeTab === 'all') return notifications;
        if (activeTab === 'messages') return notifications.filter(n => n.type === 'message');
        if (activeTab === 'mentions') return notifications.filter(n => n.type === 'mention' || n.type === 'reply');
        if (activeTab === 'groups') return notifications.filter(n => n.type === 'group');
        return notifications;
    };

    const markAsRead = (id) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, read: true } : n
        ));
    };

    const markAllAsRead = () => {
        setNotifications(notifications.map(n => ({ ...n, read: true })));
    };

    const deleteNotification = (id) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const acceptFriendRequest = (id) => {
        setNotifications(notifications.map(n =>
            n.id === id ? { ...n, pending: false, accepted: true } : n
        ));
    };

    const filteredNotifications = getFilteredNotifications();
    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="min-h-screen bg-gradient-zinc text-zinc-100">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-zinc-900/80 backdrop-blur-lg border-b border-zinc-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-xl relative">
                                <Bell className="w-6 h-6 text-primary" />
                                {unreadCount > 0 && (
                                    <div className="absolute -top-1 -right-1 w-5 h-5 bg-primary rounded-full flex items-center justify-center text-xs font-bold text-white">
                                        {unreadCount}
                                    </div>
                                )}
                            </div>
                            <div>
                                <h1 className="text-2xl font-heading font-bold text-zinc-100">Notifications</h1>
                                <p className="text-sm text-zinc-400">
                                    {unreadCount > 0 ? `${unreadCount} unread notification${unreadCount > 1 ? 's' : ''}` : 'All caught up!'}
                                </p>
                            </div>
                        </div>
                        <div className="flex items-center gap-2">
                            {unreadCount > 0 && (
                                <button
                                    onClick={markAllAsRead}
                                    className="flex items-center gap-2 px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl font-medium transition-colors"
                                >
                                    <CheckCheck className="w-4 h-4" />
                                    Mark all read
                                </button>
                            )}
                            <button className="p-2 hover:bg-zinc-800 rounded-xl transition-colors">
                                <Settings className="w-5 h-5 text-zinc-400" />
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Tabs */}
                <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const tabCount = tab.id === 'all'
                            ? notifications.length
                            : getFilteredNotifications().length;

                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${activeTab === tab.id
                                        ? 'bg-primary text-white shadow-glow'
                                        : 'bg-zinc-800/50 text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {tab.label}
                            </button>
                        );
                    })}
                </div>

                {/* Notifications List */}
                {filteredNotifications.length > 0 ? (
                    <div className="space-y-2">
                        {filteredNotifications.map((notification) => (
                            <div
                                key={notification.id}
                                className={`bg-zinc-800/50 border rounded-xl p-4 transition-all group hover:border-primary/50 ${notification.read ? 'border-zinc-700' : 'border-primary/30 bg-zinc-800/70'
                                    }`}
                            >
                                <div className="flex items-start gap-4">
                                    {/* Avatar */}
                                    <div className={`w-12 h-12 ${notification.color} rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0 relative`}>
                                        {notification.avatar}
                                        <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-zinc-800 rounded-full flex items-center justify-center">
                                            <div className="w-5 h-5 bg-zinc-700 rounded-full flex items-center justify-center text-primary">
                                                {getNotificationIcon(notification.type)}
                                            </div>
                                        </div>
                                    </div>

                                    {/* Content */}
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-start justify-between gap-2 mb-1">
                                            <div>
                                                <p className="text-zinc-100">
                                                    <span className="font-semibold">{notification.sender}</span>{' '}
                                                    <span className="text-zinc-400">{notification.content}</span>
                                                    {notification.group && (
                                                        <span className="text-primary font-medium"> {notification.group}</span>
                                                    )}
                                                </p>
                                                {notification.preview && (
                                                    <p className="text-sm text-zinc-400 mt-1 line-clamp-2">
                                                        {notification.preview}
                                                    </p>
                                                )}
                                                <p className="text-xs text-zinc-500 mt-2">{notification.timestamp}</p>
                                            </div>
                                            <div className="flex items-center gap-1">
                                                {!notification.read && (
                                                    <button
                                                        onClick={() => markAsRead(notification.id)}
                                                        className="p-1.5 hover:bg-zinc-700 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                                        title="Mark as read"
                                                    >
                                                        <Check className="w-4 h-4 text-zinc-400" />
                                                    </button>
                                                )}
                                                <button
                                                    onClick={() => deleteNotification(notification.id)}
                                                    className="p-1.5 hover:bg-zinc-700 rounded-lg transition-colors opacity-0 group-hover:opacity-100"
                                                    title="Delete"
                                                >
                                                    <Trash2 className="w-4 h-4 text-zinc-400" />
                                                </button>
                                            </div>
                                        </div>

                                        {/* Friend Request Actions */}
                                        {notification.type === 'friend_request' && notification.pending && (
                                            <div className="flex gap-2 mt-3">
                                                <button
                                                    onClick={() => acceptFriendRequest(notification.id)}
                                                    className="px-4 py-1.5 bg-primary hover:bg-primary-dark text-white rounded-lg font-medium transition-colors text-sm"
                                                >
                                                    Accept
                                                </button>
                                                <button
                                                    onClick={() => deleteNotification(notification.id)}
                                                    className="px-4 py-1.5 bg-zinc-700 hover:bg-zinc-600 text-zinc-300 rounded-lg font-medium transition-colors text-sm"
                                                >
                                                    Decline
                                                </button>
                                            </div>
                                        )}

                                        {notification.accepted && (
                                            <div className="flex items-center gap-2 mt-3 text-sm text-green-500">
                                                <Check className="w-4 h-4" />
                                                <span>Friend request accepted</span>
                                            </div>
                                        )}
                                    </div>

                                    {/* Unread Indicator */}
                                    {!notification.read && (
                                        <div className="w-2 h-2 bg-primary rounded-full flex-shrink-0 mt-2" />
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    // Empty State
                    <div className="text-center py-16">
                        <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Bell className="w-8 h-8 text-zinc-600" />
                        </div>
                        <h3 className="text-lg font-heading font-semibold text-zinc-300 mb-2">
                            No notifications
                        </h3>
                        <p className="text-zinc-500">
                            {activeTab === 'all'
                                ? "You're all caught up! Check back later for updates."
                                : `No ${activeTab} notifications at the moment.`}
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Notifications;