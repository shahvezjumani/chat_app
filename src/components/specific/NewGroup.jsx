import React, { useState } from 'react';
import { Users, Camera, Search, X, Plus, Check, ArrowLeft, ArrowRight, Globe, Lock, ChevronRight } from 'lucide-react';

const NewGroup = () => {
    const [step, setStep] = useState(1);
    const [groupName, setGroupName] = useState('');
    const [groupDescription, setGroupDescription] = useState('');
    const [groupType, setGroupType] = useState('private');
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedMembers, setSelectedMembers] = useState([]);
    const [groupImage, setGroupImage] = useState(null);

    // Sample contacts data
    const contacts = [
        { id: 1, name: 'Sarah Anderson', username: '@sarah.design', avatar: 'SA', status: 'online', color: 'bg-pink-500' },
        { id: 2, name: 'Mike Chen', username: '@mikechen', avatar: 'MC', status: 'online', color: 'bg-blue-500' },
        { id: 3, name: 'Emma Wilson', username: '@emmaw', avatar: 'EW', status: 'offline', color: 'bg-purple-500' },
        { id: 4, name: 'Alex Turner', username: '@alexturner', avatar: 'AT', status: 'online', color: 'bg-green-500' },
        { id: 5, name: 'David Kim', username: '@davidk', avatar: 'DK', status: 'offline', color: 'bg-orange-500' },
        { id: 6, name: 'Lisa Chen', username: '@lisachen', avatar: 'LC', status: 'online', color: 'bg-cyan-500' },
        { id: 7, name: 'John Smith', username: '@johnsmith', avatar: 'JS', status: 'offline', color: 'bg-indigo-500' },
        { id: 8, name: 'Maria Garcia', username: '@mariag', avatar: 'MG', status: 'online', color: 'bg-rose-500' }
    ];

    const filteredContacts = contacts.filter(contact =>
        contact.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        contact.username.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleMember = (contactId) => {
        if (selectedMembers.includes(contactId)) {
            setSelectedMembers(selectedMembers.filter(id => id !== contactId));
        } else {
            setSelectedMembers([...selectedMembers, contactId]);
        }
    };

    const handleCreateGroup = () => {
        // Handle group creation logic
        console.log('Creating group:', {
            name: groupName,
            description: groupDescription,
            type: groupType,
            members: selectedMembers,
            image: groupImage
        });
        // Navigate to group or show success message
    };

    const canProceedStep1 = groupName.trim().length > 0;
    const canProceedStep2 = selectedMembers.length > 0;

    return (
        <div className="min-h-screen bg-gradient-zinc text-zinc-100">
            {/* Header */}
            <div className="sticky top-0 z-10 bg-zinc-900/80 backdrop-blur-lg border-b border-zinc-800">
                <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                    <div className="flex items-center justify-between">
                        <div className="flex items-center gap-3">
                            <button className="p-2 hover:bg-zinc-800 rounded-xl transition-colors">
                                <ArrowLeft className="w-5 h-5 text-zinc-400" />
                            </button>
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-primary/10 rounded-xl">
                                    <Users className="w-6 h-6 text-primary" />
                                </div>
                                <div>
                                    <h1 className="text-2xl font-heading font-bold text-zinc-100">Create New Group</h1>
                                    <p className="text-sm text-zinc-400">
                                        Step {step} of 3 - {step === 1 ? 'Group Details' : step === 2 ? 'Add Members' : 'Review & Create'}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
                {/* Progress Steps */}
                <div className="mb-8">
                    <div className="flex items-center justify-between">
                        {[1, 2, 3].map((stepNum) => (
                            <React.Fragment key={stepNum}>
                                <div className="flex items-center gap-3">
                                    <div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition-all ${step > stepNum
                                                ? 'bg-primary text-white'
                                                : step === stepNum
                                                    ? 'bg-primary text-white shadow-glow'
                                                    : 'bg-zinc-800 text-zinc-500'
                                            }`}
                                    >
                                        {step > stepNum ? <Check className="w-5 h-5" /> : stepNum}
                                    </div>
                                    <span
                                        className={`text-sm font-medium hidden sm:block ${step >= stepNum ? 'text-zinc-300' : 'text-zinc-500'
                                            }`}
                                    >
                                        {stepNum === 1 ? 'Details' : stepNum === 2 ? 'Members' : 'Review'}
                                    </span>
                                </div>
                                {stepNum < 3 && (
                                    <div
                                        className={`flex-1 h-1 mx-4 rounded-full transition-all ${step > stepNum ? 'bg-primary' : 'bg-zinc-800'
                                            }`}
                                    />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>

                {/* Step 1: Group Details */}
                {step === 1 && (
                    <div className="space-y-6 animate-fade-in">
                        {/* Group Image */}
                        <div className="flex justify-center">
                            <div className="relative">
                                <div className="w-32 h-32 bg-zinc-800 border-2 border-zinc-700 rounded-3xl flex items-center justify-center overflow-hidden">
                                    {groupImage ? (
                                        <img src={groupImage} alt="Group" className="w-full h-full object-cover" />
                                    ) : (
                                        <Users className="w-16 h-16 text-zinc-600" />
                                    )}
                                </div>
                                <button className="absolute bottom-0 right-0 p-3 bg-primary hover:bg-primary-dark text-white rounded-xl shadow-lg transition-all hover:scale-105">
                                    <Camera className="w-5 h-5" />
                                </button>
                            </div>
                        </div>

                        {/* Group Name */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">
                                Group Name <span className="text-primary">*</span>
                            </label>
                            <input
                                type="text"
                                value={groupName}
                                onChange={(e) => setGroupName(e.target.value)}
                                placeholder="Enter group name"
                                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                                maxLength={50}
                            />
                            <p className="text-xs text-zinc-500 mt-1">{groupName.length}/50 characters</p>
                        </div>

                        {/* Group Description */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-2">
                                Description (Optional)
                            </label>
                            <textarea
                                value={groupDescription}
                                onChange={(e) => setGroupDescription(e.target.value)}
                                placeholder="What's this group about?"
                                rows="4"
                                className="w-full px-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all resize-none"
                                maxLength={200}
                            />
                            <p className="text-xs text-zinc-500 mt-1">{groupDescription.length}/200 characters</p>
                        </div>

                        {/* Group Type */}
                        <div>
                            <label className="block text-sm font-medium text-zinc-300 mb-3">
                                Group Type
                            </label>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                                <button
                                    onClick={() => setGroupType('private')}
                                    className={`p-4 border-2 rounded-xl transition-all ${groupType === 'private'
                                            ? 'border-primary bg-primary/10'
                                            : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-600'
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`p-2 rounded-lg ${groupType === 'private' ? 'bg-primary/20' : 'bg-zinc-700'}`}>
                                            <Lock className="w-5 h-5 text-primary" />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-semibold text-zinc-100 mb-1">Private</h3>
                                            <p className="text-sm text-zinc-400">Only invited members can join</p>
                                        </div>
                                    </div>
                                </button>

                                <button
                                    onClick={() => setGroupType('public')}
                                    className={`p-4 border-2 rounded-xl transition-all ${groupType === 'public'
                                            ? 'border-primary bg-primary/10'
                                            : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-600'
                                        }`}
                                >
                                    <div className="flex items-start gap-3">
                                        <div className={`p-2 rounded-lg ${groupType === 'public' ? 'bg-primary/20' : 'bg-zinc-700'}`}>
                                            <Globe className="w-5 h-5 text-primary" />
                                        </div>
                                        <div className="text-left">
                                            <h3 className="font-semibold text-zinc-100 mb-1">Public</h3>
                                            <p className="text-sm text-zinc-400">Anyone can discover and join</p>
                                        </div>
                                    </div>
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Step 2: Add Members */}
                {step === 2 && (
                    <div className="space-y-6 animate-fade-in">
                        {/* Selected Members */}
                        {selectedMembers.length > 0 && (
                            <div className="bg-zinc-800/50 border border-zinc-700 rounded-xl p-4">
                                <h3 className="text-sm font-medium text-zinc-300 mb-3">
                                    Selected Members ({selectedMembers.length})
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {selectedMembers.map((memberId) => {
                                        const member = contacts.find(c => c.id === memberId);
                                        return (
                                            <div
                                                key={memberId}
                                                className="flex items-center gap-2 px-3 py-1.5 bg-zinc-700 rounded-lg group"
                                            >
                                                <div className={`w-6 h-6 ${member.color} rounded-lg flex items-center justify-center text-white text-xs font-bold`}>
                                                    {member.avatar}
                                                </div>
                                                <span className="text-sm text-zinc-100">{member.name}</span>
                                                <button
                                                    onClick={() => toggleMember(memberId)}
                                                    className="ml-1 p-0.5 hover:bg-zinc-600 rounded transition-colors"
                                                >
                                                    <X className="w-3.5 h-3.5 text-zinc-400" />
                                                </button>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        )}

                        {/* Search */}
                        <div className="relative">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search contacts..."
                                className="w-full pl-12 pr-4 py-3 bg-zinc-800 border border-zinc-700 rounded-xl text-zinc-100 placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-primary/50 focus:border-primary transition-all"
                            />
                        </div>

                        {/* Contacts List */}
                        <div className="space-y-2 max-h-96 overflow-y-auto">
                            {filteredContacts.map((contact) => {
                                const isSelected = selectedMembers.includes(contact.id);
                                return (
                                    <button
                                        key={contact.id}
                                        onClick={() => toggleMember(contact.id)}
                                        className={`w-full p-4 border rounded-xl transition-all ${isSelected
                                                ? 'border-primary bg-primary/10'
                                                : 'border-zinc-700 bg-zinc-800/50 hover:border-zinc-600'
                                            }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className={`w-12 h-12 ${contact.color} rounded-xl flex items-center justify-center text-white font-bold relative`}>
                                                    {contact.avatar}
                                                    {contact.status === 'online' && (
                                                        <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-zinc-800 rounded-full" />
                                                    )}
                                                </div>
                                                <div className="text-left">
                                                    <h3 className="font-semibold text-zinc-100">{contact.name}</h3>
                                                    <p className="text-sm text-zinc-400">{contact.username}</p>
                                                </div>
                                            </div>
                                            <div
                                                className={`w-6 h-6 rounded-lg border-2 flex items-center justify-center transition-all ${isSelected
                                                        ? 'border-primary bg-primary'
                                                        : 'border-zinc-600 bg-transparent'
                                                    }`}
                                            >
                                                {isSelected && <Check className="w-4 h-4 text-white" />}
                                            </div>
                                        </div>
                                    </button>
                                );
                            })}
                        </div>
                    </div>
                )}

                {/* Step 3: Review & Create */}
                {step === 3 && (
                    <div className="space-y-6 animate-fade-in">
                        {/* Group Preview */}
                        <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-6">
                            <div className="flex items-start gap-4 mb-6">
                                <div className="w-20 h-20 bg-zinc-700 rounded-2xl flex items-center justify-center overflow-hidden">
                                    {groupImage ? (
                                        <img src={groupImage} alt="Group" className="w-full h-full object-cover" />
                                    ) : (
                                        <Users className="w-10 h-10 text-zinc-500" />
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h2 className="text-xl font-heading font-bold text-zinc-100 mb-2">{groupName}</h2>
                                    {groupDescription && (
                                        <p className="text-sm text-zinc-400">{groupDescription}</p>
                                    )}
                                    <div className="flex items-center gap-4 mt-3">
                                        <div className="flex items-center gap-1.5 text-sm text-zinc-400">
                                            {groupType === 'private' ? (
                                                <Lock className="w-4 h-4" />
                                            ) : (
                                                <Globe className="w-4 h-4" />
                                            )}
                                            <span className="capitalize">{groupType}</span>
                                        </div>
                                        <div className="flex items-center gap-1.5 text-sm text-zinc-400">
                                            <Users className="w-4 h-4" />
                                            <span>{selectedMembers.length} members</span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Member List */}
                            <div>
                                <h3 className="text-sm font-medium text-zinc-300 mb-3">Members</h3>
                                <div className="space-y-2">
                                    {selectedMembers.map((memberId) => {
                                        const member = contacts.find(c => c.id === memberId);
                                        return (
                                            <div
                                                key={memberId}
                                                className="flex items-center gap-3 p-3 bg-zinc-800 rounded-lg"
                                            >
                                                <div className={`w-10 h-10 ${member.color} rounded-lg flex items-center justify-center text-white font-bold`}>
                                                    {member.avatar}
                                                </div>
                                                <div className="flex-1">
                                                    <h4 className="font-medium text-zinc-100">{member.name}</h4>
                                                    <p className="text-sm text-zinc-400">{member.username}</p>
                                                </div>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>

                        {/* Warning */}
                        <div className="bg-primary/10 border border-primary/30 rounded-xl p-4">
                            <p className="text-sm text-zinc-300">
                                <span className="font-semibold">Note:</span> You will be the admin of this group. You can manage members, settings, and permissions after creation.
                            </p>
                        </div>
                    </div>
                )}

                {/* Action Buttons */}
                <div className="flex gap-3 mt-8 pt-6 border-t border-zinc-800">
                    {step > 1 && (
                        <button
                            onClick={() => setStep(step - 1)}
                            className="flex items-center gap-2 px-6 py-3 bg-zinc-800 hover:bg-zinc-700 text-zinc-300 rounded-xl font-medium transition-colors"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            Back
                        </button>
                    )}

                    {step < 3 ? (
                        <button
                            onClick={() => setStep(step + 1)}
                            disabled={step === 1 ? !canProceedStep1 : !canProceedStep2}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-primary text-white rounded-xl font-medium hover:shadow-glow transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-none"
                        >
                            Next
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    ) : (
                        <button
                            onClick={handleCreateGroup}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-primary text-white rounded-xl font-medium hover:shadow-glow transition-all duration-300"
                        >
                            <Plus className="w-4 h-4" />
                            Create Group
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default NewGroup;