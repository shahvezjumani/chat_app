import { useMemo, useState } from "react";
import {
  Search,
  Filter,
  Plus,
  MoreHorizontal,
  Phone,
  Video,
  Star,
  Info,
  Paperclip,
  Mic,
  Send,
  Smile,
  Check,
  CheckCheck,
  Pin,
  Circle,
  Loader2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const initialChats = [
  {
    id: "product-team",
    name: "Product Team",
    lastMessage: "Wireframes look great — pushing to dev!",
    unread: 3,
    pinned: true,
    status: "In Review • Sprint 12",
    members: 12,
    online: 5,
    tags: ["Sprint", "UI", "Priority"],
  },
  {
    id: "marketing",
    name: "Marketing Crew",
    lastMessage: "Campaign ready for tomorrow.",
    unread: 0,
    pinned: false,
    status: "Scheduled • 09:00",
    members: 8,
    online: 3,
    tags: ["Launch"],
  },
  {
    id: "support",
    name: "Customer Support",
    lastMessage: "Escalated ticket #9213",
    unread: 5,
    pinned: false,
    status: "Critical",
    members: 16,
    online: 6,
    tags: ["Urgent", "Helpdesk"],
  },
  {
    id: "founders",
    name: "Founders",
    lastMessage: "Let’s sync before EOD?",
    unread: 1,
    pinned: true,
    status: "Focus",
    members: 4,
    online: 2,
    tags: ["Strategy"],
  },
];

const initialMessages = {
  "product-team": [
    {
      id: 1,
      sender: "Hannah Reyes",
      avatar: "HR",
      content:
        "Morning team! I pushed the updated component map — take a look when you can.",
      timestamp: "09:17",
      status: "read",
      attachments: [],
      reactions: ["👍", "🔥"],
    },
    {
      id: 2,
      sender: "You",
      avatar: "YK",
      isSelf: true,
      content:
        "Got it! Mocked a quick interaction flow — thoughts? Also tagging @dev for the API contract.",
      timestamp: "09:24",
      status: "delivered",
      attachments: [
        {
          id: "att-1",
          name: "interaction-flow.png",
          type: "image",
          size: "1.4 MB",
        },
      ],
      reactions: [],
    },
    {
      id: 3,
      sender: "Dev Runtime",
      avatar: "DR",
      content: "Looks solid. I’ll update the endpoint shortly ✅",
      timestamp: "09:26",
      status: "read",
      attachments: [],
      reactions: ["✅"],
    },
  ],
  marketing: [
    {
      id: 1,
      sender: "Lena Ortiz",
      avatar: "LO",
      content: "Reminder: creative assets freeze at 6pm.",
      timestamp: "08:51",
      status: "read",
      attachments: [],
      reactions: [],
    },
  ],
  support: [
    {
      id: 1,
      sender: "Support Bot",
      avatar: "SB",
      content: "Ticket #9213 escalated to tier 2.",
      timestamp: "09:05",
      status: "read",
      attachments: [],
      reactions: [],
    },
  ],
  founders: [
    {
      id: 1,
      sender: "Ava Stone",
      avatar: "AS",
      content: "Need a quick numbers checkpoint later today.",
      timestamp: "08:40",
      status: "read",
      attachments: [],
      reactions: [],
    },
  ],
};

const quickReplies = [
  "On it — give me 5 mins!",
  "Pushing to staging now.",
  "Need clarification on the acceptance criteria.",
];

const presencePalette = ["#f97316", "#22c55e", "#a855f7", "#0ea5e9"];

const ChatPage = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [activeChatId, setActiveChatId] = useState(initialChats[0].id);
  const [composerValue, setComposerValue] = useState("");
  const [messagesByChat, setMessagesByChat] = useState(initialMessages);
  const [isSending, setIsSending] = useState(false);

  const filteredChats = useMemo(() => {
    if (!searchTerm.trim()) return initialChats;
    return initialChats.filter(
      (chat) =>
        chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        chat.tags.some((tag) =>
          tag.toLowerCase().includes(searchTerm.toLowerCase())
        )
    );
  }, [searchTerm]);

  const activeMessages = messagesByChat[activeChatId] ?? [];
  const activeChatMeta =
    initialChats.find((chat) => chat.id === activeChatId) ?? initialChats[0];

  const handleSendMessage = (evt) => {
    evt.preventDefault();
    const trimmed = composerValue.trim();

    if (!trimmed) return;
    setIsSending(true);

    setTimeout(() => {
      setMessagesByChat((prev) => ({
        ...prev,
        [activeChatId]: [
          ...(prev[activeChatId] ?? []),
          {
            id: crypto.randomUUID(),
            sender: "You",
            avatar: "YK",
            isSelf: true,
            content: trimmed,
            timestamp: new Date().toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            }),
            status: "sent",
            attachments: [],
            reactions: [],
          },
        ],
      }));
      setComposerValue("");
      setIsSending(false);
    }, 450);
  };

  const renderStatusIcon = (status) => {
    if (status === "read") {
      return <CheckCheck className="h-4 w-4 text-primary" />;
    }

    if (status === "delivered") {
      return <CheckCheck className="h-4 w-4 text-zinc-500" />;
    }

    return <Check className="h-4 w-4 text-zinc-600" />;
  };

  return (
    <TooltipProvider>
      <div className="flex h-full w-full gap-6 text-zinc-100">
        {/* Conversations rail */}
        <Card className="flex w-80 flex-shrink-0 flex-col border-zinc-800 bg-zinc-900/80">
          <CardHeader className="gap-4 border-b border-zinc-800 pb-4">
            <div className="flex items-center justify-between">
              <CardTitle className="text-base font-semibold text-zinc-100">
                Chats
              </CardTitle>
              <div className="flex items-center gap-1">
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="text-zinc-400 hover:text-zinc-100"
                    >
                      <Filter className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Filter conversations</TooltipContent>
                </Tooltip>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Button
                      variant="default"
                      size="icon"
                      className="bg-primary/90 text-white hover:bg-primary"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </TooltipTrigger>
                  <TooltipContent>Start new chat</TooltipContent>
                </Tooltip>
              </div>
            </div>

            <div className="relative">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-zinc-500" />
              <Input
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search people, teams, tags…"
                className="border-zinc-800 bg-zinc-950/40 pl-10 text-sm text-zinc-200 placeholder:text-zinc-500"
              />
            </div>
          </CardHeader>

          <CardContent className="flex-1 overflow-y-auto px-4 py-4">
            <div className="space-y-3">
              {filteredChats.map((chat) => {
                const isActive = chat.id === activeChatId;
                return (
                  <button
                    key={chat.id}
                    onClick={() => setActiveChatId(chat.id)}
                    className={`w-full rounded-2xl border p-3 text-left transition-all ${
                      isActive
                        ? "border-primary/70 bg-zinc-800/70 ring-2 ring-primary/30"
                        : "border-zinc-800 bg-zinc-900/40 hover:border-zinc-700 hover:bg-zinc-900/70"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold text-sm">{chat.name}</p>
                          {chat.pinned && (
                            <Pin className="h-3.5 w-3.5 text-primary" />
                          )}
                        </div>
                        <p className="line-clamp-1 text-xs text-zinc-400">
                          {chat.lastMessage}
                        </p>
                      </div>
                      <div className="text-right">
                        {chat.unread > 0 && (
                          <span className="inline-flex min-h-5 min-w-5 items-center justify-center rounded-full bg-primary/20 px-2 text-[11px] font-semibold text-primary">
                            {chat.unread}
                          </span>
                        )}
                        <p className="text-[11px] text-zinc-500">
                          {chat.online} online
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {chat.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full bg-zinc-800 px-2 py-0.5 text-[11px] text-zinc-400"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <p className="mt-2 text-xs text-zinc-500">{chat.status}</p>
                  </button>
                );
              })}
            </div>
          </CardContent>
        </Card>

        {/* Active chat */}
        <div className="flex flex-1 flex-col rounded-3xl border border-zinc-800 bg-zinc-900/90">
          <div className="flex items-center justify-between border-b border-zinc-800 px-6 py-4">
            <div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-zinc-800 bg-zinc-800/60 text-sm font-semibold">
                  {activeChatMeta.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")
                    .slice(0, 2)
                    .toUpperCase()}
                </div>
                <div>
                  <p className="text-base font-semibold">
                    {activeChatMeta.name}
                  </p>
                  <p className="text-xs text-zinc-400">
                    {activeChatMeta.status} • {activeChatMeta.members} members
                  </p>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {[Phone, Video, Star, Info].map((Icon, index) => (
                <Button
                  key={Icon.displayName ?? index}
                  variant="ghost"
                  size="icon"
                  className="border border-transparent text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-100"
                >
                  <Icon className="h-4 w-4" />
                </Button>
              ))}
              <Button
                variant="secondary"
                className="border border-primary/50 bg-primary/20 text-primary hover:bg-primary/30"
              >
                Meeting hub
              </Button>
            </div>
          </div>

          <div className="flex flex-1 flex-col gap-6 overflow-hidden p-6 md:flex-row">
            <div className="flex flex-1 flex-col rounded-2xl border border-zinc-800 bg-gradient-to-b from-zinc-900/80 to-zinc-950/60">
              <div className="flex flex-1 flex-col gap-4 overflow-y-auto px-6 py-6">
                {activeMessages.map((message, index) => {
                  const isSelf = message.isSelf;
                  const bubbleAlignment = isSelf
                    ? "items-end text-right"
                    : "items-start text-left";
                  const bubbleStyles = isSelf
                    ? "bg-primary/15 border border-primary/30 text-zinc-100"
                    : "bg-zinc-900/60 border border-zinc-800 text-zinc-100";

                  const avatarColor =
                    presencePalette[index % presencePalette.length];

                  return (
                    <div
                      key={message.id}
                      className={`flex flex-col gap-2 ${bubbleAlignment}`}
                    >
                      <div className="flex items-center gap-2 text-xs text-zinc-500">
                        {!isSelf && (
                          <div
                            className="flex h-7 w-7 items-center justify-center rounded-xl text-[11px] font-semibold text-white"
                            style={{ backgroundColor: avatarColor }}
                          >
                            {message.avatar}
                          </div>
                        )}
                        <span className="font-medium text-zinc-300">
                          {isSelf ? "You" : message.sender}
                        </span>
                        <span>{message.timestamp}</span>
                      </div>

                      <div
                        className={`max-w-xl rounded-2xl px-4 py-3 shadow-lg ${bubbleStyles}`}
                      >
                        <p className="text-sm leading-relaxed">
                          {message.content}
                        </p>

                        {message.attachments?.length > 0 && (
                          <div className="mt-3 grid gap-3 sm:grid-cols-2">
                            {message.attachments.map((attachment) => (
                              <div
                                key={attachment.id}
                                className="rounded-xl border border-zinc-800/80 bg-zinc-950/40 p-3 text-left text-xs text-zinc-400"
                              >
                                <p className="text-sm text-zinc-100">
                                  {attachment.name}
                                </p>
                                <p>{attachment.size}</p>
                              </div>
                            ))}
                          </div>
                        )}
                      </div>

                      <div className="flex items-center gap-2 text-[11px] text-zinc-500">
                        {isSelf && renderStatusIcon(message.status)}
                        {message.reactions?.length > 0 && (
                          <div className="flex gap-1">
                            {message.reactions.map((reaction) => (
                              <span
                                key={`${message.id}-${reaction}`}
                                className="rounded-full bg-zinc-800 px-2 py-0.5"
                              >
                                {reaction}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <div className="border-t border-zinc-800/80 p-4">
                <form onSubmit={handleSendMessage} className="space-y-4">
                  <div className="flex flex-wrap items-center gap-3">
                    {[Paperclip, Smile, Mic].map((Icon, index) => (
                      <Button
                        key={Icon.displayName ?? index}
                        type="button"
                        variant="ghost"
                        size="icon"
                        className="border border-zinc-800 text-zinc-400 hover:border-zinc-700 hover:bg-zinc-800 hover:text-zinc-50"
                      >
                        <Icon className="h-4 w-4" />
                      </Button>
                    ))}

                    <Input
                      value={composerValue}
                      onChange={(event) => setComposerValue(event.target.value)}
                      placeholder="Write a message, drop files or tag @people"
                      className="flex-1 border-zinc-800 bg-zinc-950/40 text-sm text-zinc-100 placeholder:text-zinc-500"
                    />

                    <Button
                      type="submit"
                      disabled={isSending}
                      className="gap-2 bg-primary/90 text-white hover:bg-primary"
                    >
                      {isSending ? (
                        <>
                          <Loader2 className="h-4 w-4 animate-spin" />
                          Sending
                        </>
                      ) : (
                        <>
                          Send
                          <Send className="h-4 w-4" />
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {quickReplies.map((reply) => (
                      <button
                        key={reply}
                        type="button"
                        onClick={() => setComposerValue(reply)}
                        className="rounded-full border border-zinc-800 px-3 py-1 text-xs text-zinc-400 transition hover:border-primary/40 hover:text-primary"
                      >
                        {reply}
                      </button>
                    ))}
                  </div>
                </form>
              </div>
            </div>

            <div className="flex w-full flex-col gap-4 md:w-72">
              <Card className="border-zinc-800 bg-zinc-900/70">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-zinc-100">
                    Team Signals
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400">Response SLA</span>
                    <span className="text-sm font-semibold text-green-400">
                      4m
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-zinc-400">Focus mode</span>
                    <span className="text-xs text-zinc-300">
                      2 people presenting
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {presencePalette.map((color, index) => (
                      <div
                        key={color}
                        className="-ml-1 flex h-8 w-8 items-center justify-center rounded-full border border-zinc-900 text-[11px] font-semibold text-white"
                        style={{
                          backgroundColor: color,
                          zIndex: presencePalette.length - index,
                        }}
                      >
                        <Circle className="h-2 w-2" />
                      </div>
                    ))}
                    <span className="text-xs text-zinc-400">
                      +6 more collaborators
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-zinc-800 bg-zinc-900/70">
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm font-semibold text-zinc-100">
                    Shared Files
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3 text-sm">
                  {[
                    { name: "handoff-spec.pdf", size: "2.1 MB" },
                    { name: "qa-scenarios.csv", size: "340 KB" },
                    { name: "retro-notes.md", size: "5 KB" },
                  ].map((file) => (
                    <div
                      key={file.name}
                      className="flex items-center justify-between rounded-xl border border-zinc-800 px-3 py-2 text-zinc-300"
                    >
                      <div>
                        <p>{file.name}</p>
                        <p className="text-xs text-zinc-500">{file.size}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-zinc-400 hover:text-zinc-50"
                      >
                        <MoreHorizontal className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
};

export default ChatPage;

