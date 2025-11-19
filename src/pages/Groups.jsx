import React, { useState } from 'react';
import { Users, Plus, Search, MoreVertical, UserPlus, Settings, LogOut, Crown, Shield } from 'lucide-react';

const Groups = () => {
    const [activeTab, setActiveTab] = useState('my-groups');
    const [searchQuery, setSearchQuery] = useState('');
    const [showCreateModal, setShowCreateModal] = useState(false);
    const [selectedGroup, setSelectedGroup] = useState(null);
    const [newGroupName, setNewGroupName] = useState('');
    const [newGroupDescription, setNewGroupDescription] = useState('');

    // Sample data
    const myGroups = [
        {
            id: 1,
            name: 'Design Team',
            description: 'UI/UX designers collaboration',
            members: 12,
            unread: 5,
            lastMessage: 'Sarah: Check out the new mockups',
            lastMessageTime: '2m ago',
            avatar: 'DT',
            color: 'bg-primary',
            role: 'admin'
        },
        {
            id: 2,
            name: 'React Developers',
            description: 'React best practices and discussions',
            members: 45,
            unread: 0,
            lastMessage: 'Mike: Anyone tried React 19?',
            lastMessageTime: '1h ago',
            avatar: 'RD',
            color: 'bg-blue-500',
            role: 'member'
        },
        {
            id: 3,
            name: 'Family Group',
            description: 'Stay connected with family',
            members: 8,
            unread: 12,
            lastMessage: 'Mom: Dinner at 7 PM today',
            lastMessageTime: '3h ago',
            avatar: 'FG',
            color: 'bg-green-500',
            role: 'admin'
        },
        {
            id: 4,
            name: 'Weekend Warriors',
            description: 'Weekend hiking and activities',
            members: 23,
            unread: 0,
            lastMessage: 'Alex: Next hike location?',
            lastMessageTime: '1d ago',
            avatar: 'WW',
            color: 'bg-purple-500',
            role: 'moderator'
        }
    ];

    const discoverGroups = [
        {
            id: 5,
            name: 'JavaScript Mastery',
            description: 'Advanced JS concepts and tutorials',
            members: 234,
            avatar: 'JM',
            color: 'bg-yellow-500',
            isPublic: true
        },
        {
            id: 6,
            name: 'Photography Enthusiasts',
            description: 'Share your best shots',
            members: 156,
            avatar: 'PE',
            color: 'bg-pink-500',
            isPublic: true
        },
        {
            id: 7,
            name: 'Startup Founders',
            description: 'Building the next big thing',
            members: 89,
            avatar: 'SF',
            color: 'bg-indigo-500',
            isPublic: false
        }
    ];

    const filteredGroups = (activeTab === 'my-groups' ? myGroups : discoverGroups).filter(group =>
        group.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        group.description.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleCreateGroup = () => {
        if (newGroupName.trim()) {
            // Handle group creation
            console.log('Creating group:', { name: newGroupName, description: newGroupDescription });
            setShowCreateModal(false);
            setNewGroupName('');
            setNewGroupDescription('');
        }
    };

    const getRoleBadge = (role) => {
        if (role === 'admin') {
            return <Crown className="w-3 h-3 text-yellow-500" />;
        }
        if (role === 'moderator') {
            return <Shield className="w-3 h-3 text-blue-500" />;
        }
        return null;
    };

    return (
        <div className="min-h-screen bg-gradient-zinc text-zinc-100">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-zinc-900/80 backdrop-blur-lg border-b border-zinc-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <div className="p-2 bg-primary/10 rounded-xl">
                                <Users className="w-6 h-6 text-primary" />
                            </div>
                            <div>
                                <h1 className="text-2xl font-heading font-bold text-zinc-100">Groups</h1>
                                <p className="text-sm text-zinc-400">Connect and collaborate</p>
                            </div>
                        </div>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="flex items-center gap-2 px-4 py-2 bg-gradient-primary text-white rounded-xl font-medium hover:shadow-glow transition-all duration-300"
                        >
                            <Plus className="w-4 h-4" />
                            Create Group
                        </button>
                    </div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Tabs */}
                <div className="flex gap-4 mb-6 border-b border-zinc-800">
                    <button
                        onClick={() => setActiveTab('my-groups')}
                        className={`pb-3 px-1 font-medium transition-colors relative ${activeTab === 'my-groups'
                                ? 'text-primary'
                                : 'text-zinc-400 hover:text-zinc-300'
                            }`}
                    >
                        My Groups
                        {activeTab === 'my-groups' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                        )}
                    </button>
                    <button
                        onClick={() => setActiveTab('discover')}
                        className={`pb-3 px-1 font-medium transition-colors relative ${activeTab === 'discover'
                                ? 'text-primary'
                                : 'text-zinc-400 hover:text-zinc-300'
                            }`}
                    >
                        Discover
                        {activeTab === 'discover' && (
                            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary rounded-full" />
                        )}
                    </button>
                </div>

                {/* Search Bar */}
                <div className="mb-6">
                    <div className="relative">
                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                        <input
                            type="text"
                            placeholder="Search groups..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-12 pr-4 py-3 bg-zinc-800/50 border border-zinc-700 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                        />
                    </div>
                </div>

                {/* Groups Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredGroups.map((group) => (
                        <div
                            key={group.id}
                            className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-5 hover:border-primary/50 transition-all duration-300 cursor-pointer group"
                            onClick={() => setSelectedGroup(group)}
                        >
                            {/* Group Header */}
                            <div className="flex items-start justify-between mb-4">
                                <div className="flex items-center gap-3">
                                    <div className={`w-12 h-12 ${group.color} rounded-xl flex items-center justify-center text-white font-bold text-lg`}>
                                        {group.avatar}
                                    </div>
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <h3 className="font-heading font-semibold text-zinc-100 group-hover:text-primary transition-colors">
                                                {group.name}
                                            </h3>
                                            {group.role && getRoleBadge(group.role)}
                                        </div>
                                        <p className="text-sm text-zinc-400 truncate">{group.description}</p>
                                    </div>
                                </div>
                                <button className="p-1 hover:bg-zinc-700 rounded-lg transition-colors">
                                    <MoreVertical className="w-4 h-4 text-zinc-400" />
                                </button>
                            </div>

                            {/* Group Stats */}
                            <div className="flex items-center justify-between mb-4">
                                <div className="flex items-center gap-2 text-sm text-zinc-400">
                                    <Users className="w-4 h-4" />
                                    <span>{group.members} members</span>
                                </div>
                                {group.unread > 0 && (
                                    <div className="px-2 py-1 bg-primary rounded-full text-xs font-semibold text-white">
                                        {group.unread}
                                    </div>
                                )}
                            </div>

                            {/* Last Message (for my groups) */}
                            {activeTab === 'my-groups' && (
                                <div className="pt-3 border-t border-zinc-700">
                                    <p className="text-sm text-zinc-300 truncate mb-1">{group.lastMessage}</p>
                                    <p className="text-xs text-zinc-500">{group.lastMessageTime}</p>
                                </div>
                            )}

                            {/* Join Button (for discover) */}
                            {activeTab === 'discover' && (
                                <button className="w-full mt-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 text-primary rounded-lg font-medium transition-colors flex items-center justify-center gap-2">
                                    <UserPlus className="w-4 h-4" />
                                    {group.isPublic ? 'Join Group' : 'Request to Join'}
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {/* Empty State */}
                {filteredGroups.length === 0 && (
                    <div className="text-center py-16">
                        <div className="w-16 h-16 bg-zinc-800 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Users className="w-8 h-8 text-zinc-600" />
                        </div>
                        <h3 className="text-lg font-heading font-semibold text-zinc-300 mb-2">No groups found</h3>
                        <p className="text-zinc-500 mb-6">Try adjusting your search or create a new group</p>
                        <button
                            onClick={() => setShowCreateModal(true)}
                            className="px-6 py-2 bg-gradient-primary text-white rounded-xl font-medium hover:shadow-glow transition-all duration-300 inline-flex items-center gap-2"
                        >
                            <Plus className="w-4 h-4" />
                            Create Your First Group
                        </button>
                    </div>
                )}
            </div>

            {/* Create Group Modal */}
            {showCreateModal && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
                    <div className="bg-zinc-900 border border-zinc-700 rounded-2xl p-6 max-w-md w-full animate-slide-up">
                        <h2 className="text-xl font-heading font-bold text-zinc-100 mb-4">Create New Group</h2>

                        <div className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Group Name</label>
                                <input
                                    type="text"
                                    value={newGroupName}
                                    onChange={(e) => setNewGroupName(e.target.value)}
                                    placeholder="Enter group name"
                                    className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-zinc-300 mb-2">Description (Optional)</label>
                                <textarea
                                    value={newGroupDescription}
                                    onChange={(e) => setNewGroupDescription(e.target.value)}
                                    placeholder="What's this group about?"
                                    rows="3"
                                    className="w-full px-4 py-2 bg-zinc-800 border border-zinc-700 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                                />
                            </div>
                        </div>

                        <div className="flex gap-3 mt-6">
                            <button
                                onClick={() => {
                                    setShowCreateModal(false);
                                    setNewGroupName('');
                                    setNewGroupDescription('');
                                }}
                                className="flex-1 px-4 py-2 bg-zinc-800 text-zinc-300 rounded-xl font-medium hover:bg-zinc-700 transition-colors"
                            >
                                Cancel
                            </button>
                            <button
                                onClick={handleCreateGroup}
                                disabled={!newGroupName.trim()}
                                className="flex-1 px-4 py-2 bg-gradient-primary text-white rounded-xl font-medium hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Groups;