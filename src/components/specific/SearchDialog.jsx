import React, { useState } from 'react';
import { Search, Users, Hash, MessageSquare, Filter, Clock, TrendingUp, X } from 'lucide-react';

const SearchDialog = () => {
    const [text, setText] = useState('');
    const [activeFilter, setActiveFilter] = useState('all');
    const [showFilters, setShowFilters] = useState(false);

    // Sample search results
    const searchResults = {
        users: [
            {
                id: 1,
                name: 'Sarah Anderson',
                username: '@sarah.design',
                avatar: 'SA',
                status: 'online',
                bio: 'UI/UX Designer | Coffee enthusiast',
                color: 'bg-pink-500'
            },
            {
                id: 2,
                name: 'Mike Chen',
                username: '@mikechen',
                avatar: 'MC',
                status: 'offline',
                bio: 'Full-stack developer',
                color: 'bg-blue-500'
            },
            {
                id: 3,
                name: 'Emma Wilson',
                username: '@emmaw',
                avatar: 'EW',
                status: 'online',
                bio: 'Product Manager at TechCorp',
                color: 'bg-purple-500'
            }
        ],
        groups: [
            {
                id: 1,
                name: 'React Developers',
                members: 234,
                avatar: 'RD',
                description: 'All things React and frontend',
                color: 'bg-cyan-500'
            },
            {
                id: 2,
                name: 'Design Systems',
                members: 156,
                avatar: 'DS',
                description: 'Building scalable design systems',
                color: 'bg-primary'
            }
        ],
        messages: [
            {
                id: 1,
                sender: 'Sarah Anderson',
                content: 'Hey, did you check out the new React 19 features?',
                timestamp: '2 hours ago',
                group: 'React Developers',
                avatar: 'SA',
                color: 'bg-pink-500'
            },
            {
                id: 2,
                sender: 'Mike Chen',
                content: 'The project deadline is next Friday, let\'s sync up',
                timestamp: '1 day ago',
                group: null,
                avatar: 'MC',
                color: 'bg-blue-500'
            }
        ]
    };

    const recentSearches = [
        'React hooks tutorial',
        'Sarah Anderson',
        'Design Systems group',
        'Project updates'
    ];

    const trendingTopics = [
        { tag: 'webdev', count: '2.3k' },
        { tag: 'react19', count: '1.8k' },
        { tag: 'design', count: '1.5k' },
        { tag: 'javascript', count: '1.2k' }
    ];

    const filters = [
        { id: 'all', label: 'All', icon: Search },
        { id: 'users', label: 'Users', icon: Users },
        { id: 'groups', label: 'Groups', icon: Hash },
        { id: 'messages', label: 'Messages', icon: MessageSquare }
    ];

    const getFilteredResults = () => {
        if (!text.trim()) return null;

        if (activeFilter === 'all') {
            return {
                users: searchResults.users,
                groups: searchResults.groups,
                messages: searchResults.messages
            };
        }

        return {
            [activeFilter]: searchResults[activeFilter]
        };
    };

    const filteredResults = getFilteredResults();
    const hasResults = text.trim() && filteredResults;

    return (
        <div className="min-h-screen bg-gradient-zinc text-zinc-100">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-zinc-900/80 backdrop-blur-lg border-b border-zinc-800">
                <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center gap-3">
                        <div className="p-2 bg-primary/10 rounded-xl">
                            <Search className="w-6 h-6 text-primary" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-heading font-bold text-zinc-100">Search</h1>
                            <p className="text-sm text-zinc-400">Find users, groups, and messages</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Search Input */}
                <div className="mb-6">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                        <input
                            type="text"
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            placeholder="Search for users, groups, or messages..."
                            className="w-full pl-12 pr-12 py-4 bg-zinc-800/50 border border-zinc-700 rounded-2xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all text-lg"
                            autoFocus
                        />
                        {text && (
                            <button
                                onClick={() => setText('')}
                                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 hover:bg-zinc-700 rounded-lg transition-colors"
                            >
                                <X className="w-5 h-5 text-zinc-400" />
                            </button>
                        )}
                    </div>
                </div>

                {/* Filter Tabs */}
                <div className="flex items-center gap-3 mb-6 overflow-x-auto pb-2">
                    {filters.map((filter) => {
                        const Icon = filter.icon;
                        return (
                            <button
                                key={filter.id}
                                onClick={() => setActiveFilter(filter.id)}
                                className={`flex items-center gap-2 px-4 py-2 rounded-xl font-medium whitespace-nowrap transition-all ${activeFilter === filter.id
                                    ? 'bg-primary text-white shadow-glow'
                                    : 'bg-zinc-800/50 text-zinc-400 hover:text-zinc-300 hover:bg-zinc-800'
                                    }`}
                            >
                                <Icon className="w-4 h-4" />
                                {filter.label}
                            </button>
                        );
                    })}
                </div>

                {/* Search Results */}
                {hasResults ? (
                    <div className="space-y-6">
                        {/* Users Results */}
                        {filteredResults.users && filteredResults.users.length > 0 && (
                            <div>
                                <h2 className="text-lg font-heading font-semibold text-zinc-300 mb-3 flex items-center gap-2">
                                    <Users className="w-5 h-5 text-primary" />
                                    Users
                                </h2>
                                <div className="space-y-2">
                                    {filteredResults.users.map((user) => (
                                        <div
                                            key={user.id}
                                            className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4 hover:border-primary/50 transition-all cursor-pointer group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 ${user.color} rounded-xl flex items-center justify-center text-white font-bold relative`}>
                                                    {user.avatar}
                                                    {user.status === 'online' && (
                                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-zinc-800 rounded-full" />
                                                    )}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-heading font-semibold text-zinc-100 group-hover:text-primary transition-colors">
                                                        {user.name}
                                                    </h3>
                                                    <p className="text-sm text-zinc-400">{user.username}</p>
                                                    <p className="text-sm text-zinc-500 mt-1">{user.bio}</p>
                                                </div>
                                                <button className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg font-medium transition-colors">
                                                    Message
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Groups Results */}
                        {filteredResults.groups && filteredResults.groups.length > 0 && (
                            <div>
                                <h2 className="text-lg font-heading font-semibold text-zinc-300 mb-3 flex items-center gap-2">
                                    <Hash className="w-5 h-5 text-primary" />
                                    Groups
                                </h2>
                                <div className="space-y-2">
                                    {filteredResults.groups.map((group) => (
                                        <div
                                            key={group.id}
                                            className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4 hover:border-primary/50 transition-all cursor-pointer group"
                                        >
                                            <div className="flex items-center gap-4">
                                                <div className={`w-12 h-12 ${group.color} rounded-xl flex items-center justify-center text-white font-bold`}>
                                                    {group.avatar}
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="font-heading font-semibold text-zinc-100 group-hover:text-primary transition-colors">
                                                        {group.name}
                                                    </h3>
                                                    <p className="text-sm text-zinc-400">{group.members} members</p>
                                                    <p className="text-sm text-zinc-500 mt-1">{group.description}</p>
                                                </div>
                                                <button className="px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg font-medium transition-colors">
                                                    View
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Messages Results */}
                        {filteredResults.messages && filteredResults.messages.length > 0 && (
                            <div>
                                <h2 className="text-lg font-heading font-semibold text-zinc-300 mb-3 flex items-center gap-2">
                                    <MessageSquare className="w-5 h-5 text-primary" />
                                    Messages
                                </h2>
                                <div className="space-y-2">
                                    {filteredResults.messages.map((message) => (
                                        <div
                                            key={message.id}
                                            className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4 hover:border-primary/50 transition-all cursor-pointer group"
                                        >
                                            <div className="flex items-start gap-4">
                                                <div className={`w-10 h-10 ${message.color} rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0`}>
                                                    {message.avatar}
                                                </div>
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        <h3 className="font-medium text-zinc-100">{message.sender}</h3>
                                                        {message.group && (
                                                            <span className="text-xs text-zinc-500">in {message.group}</span>
                                                        )}
                                                    </div>
                                                    <p className="text-sm text-zinc-300 group-hover:text-zinc-200 transition-colors">
                                                        {message.content}
                                                    </p>
                                                    <p className="text-xs text-zinc-500 mt-2">{message.timestamp}</p>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                ) : text.trim() ? (
                    // No Results Found
                    <div className="text-center py-16">
                        <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Search className="w-8 h-8 text-zinc-600" />
                        </div>
                        <h3 className="text-lg font-heading font-semibold text-zinc-300 mb-2">No results found</h3>
                        <p className="text-zinc-500">Try searching for something else</p>
                    </div>
                ) : (
                    // Default View (No Search Query)
                    <div className="space-y-8">
                        {/* Recent Searches */}
                        <div>
                            <h2 className="text-lg font-heading font-semibold text-zinc-300 mb-4 flex items-center gap-2">
                                <Clock className="w-5 h-5 text-primary" />
                                Recent Searches
                            </h2>
                            <div className="space-y-2">
                                {recentSearches.map((search, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setText(search)}
                                        className="w-full text-left px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl hover:border-primary/50 transition-all group"
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="text-zinc-300 group-hover:text-primary transition-colors">{search}</span>
                                            <Search className="w-4 h-4 text-zinc-500 group-hover:text-primary transition-colors" />
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Trending Topics */}
                        <div>
                            <h2 className="text-lg font-heading font-semibold text-zinc-300 mb-4 flex items-center gap-2">
                                <TrendingUp className="w-5 h-5 text-primary" />
                                Trending Topics
                            </h2>
                            <div className="grid grid-cols-2 gap-3">
                                {trendingTopics.map((topic, index) => (
                                    <button
                                        key={index}
                                        onClick={() => setText(`#${topic.tag}`)}
                                        className="px-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl hover:border-primary/50 transition-all group text-left"
                                    >
                                        <div className="flex items-center gap-2 mb-1">
                                            <Hash className="w-4 h-4 text-primary" />
                                            <span className="font-medium text-zinc-100 group-hover:text-primary transition-colors">
                                                {topic.tag}
                                            </span>
                                        </div>
                                        <p className="text-sm text-zinc-500">{topic.count} messages</p>
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SearchDialog;