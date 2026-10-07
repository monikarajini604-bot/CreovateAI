import React, { useState, useEffect, useRef } from 'react';
import {
  MessageSquare,
  Send,
  ShieldCheck,
  ShieldAlert,
  Lock,
  ArrowLeft,
  Check,
  CheckCheck,
  Sparkles,
  Search,
  User,
  Building2,
  Clock,
  Info,
  LogIn,
  AlertCircle,
  CheckCircle2,
  Plus,
  Trash2,
  X,
  MessageCircle
} from 'lucide-react';

export function PrivateChatPage({
  conversations = [],
  selectedConversationId = null,
  currentRole = 'brand', // 'brand' | 'creator'
  creators = [],
  brands = [],
  onSendMessage,
  onOpenChat,
  onDeleteConversation,
  onMarkRead,
  onSelectConversation,
  onViewProfile,
  currentUser = null,
  onOpenLogin,
  onOpenCreateAccount,
  onClearMessages
}) {
  const [activeConvId, setActiveConvId] = useState(
    selectedConversationId || (conversations.length > 0 ? conversations[0].id : null)
  );
  const [inputText, setInputText] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [showMobileList, setShowMobileList] = useState(!selectedConversationId);
  const messagesEndRef = useRef(null);

  // New Direct Message Modal State
  const [isNewChatModalOpen, setIsNewChatModalOpen] = useState(false);
  const [recipientType, setRecipientType] = useState('creator'); // 'creator' | 'brand'
  const [selectedRecipient, setSelectedRecipient] = useState(null);
  const [newChatSubject, setNewChatSubject] = useState('');
  const [newChatMessage, setNewChatMessage] = useState('');
  const [contactSearchQuery, setContactSearchQuery] = useState('');

  // Keep active conversation aligned with props
  useEffect(() => {
    if (selectedConversationId) {
      setActiveConvId(selectedConversationId);
      setShowMobileList(false);
    } else if (conversations.length > 0 && !conversations.some(c => c.id === activeConvId)) {
      setActiveConvId(conversations[0].id);
    }
  }, [selectedConversationId, conversations]);

  const activeConversation = conversations.find(c => c.id === activeConvId) || (conversations.length > 0 ? conversations[0] : null);

  // Mark as read when active conversation changes
  useEffect(() => {
    if (activeConversation && onMarkRead) {
      onMarkRead(activeConversation.id, currentRole);
    }
  }, [activeConvId, currentRole]);

  // Scroll to bottom when messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [activeConversation?.messages]);

  const handleSend = (e) => {
    e?.preventDefault();
    if (!inputText.trim() || !activeConversation) return;

    const senderName = currentRole === 'brand' 
      ? activeConversation.brand_name 
      : activeConversation.creator_name;
    const senderId = currentRole === 'brand' 
      ? activeConversation.brand_id 
      : activeConversation.creator_id;

    if (onSendMessage) {
      onSendMessage({
        conversation_id: activeConversation.id,
        sender_id: senderId,
        sender_role: currentRole,
        sender_name: senderName,
        text: inputText.trim()
      });
    }

    setInputText('');
  };

  const handleStartRealDirectChat = async (e) => {
    e?.preventDefault();
    if (!selectedRecipient || !newChatMessage.trim()) return;

    const subject = newChatSubject.trim() || `${selectedRecipient.name} Direct Project Chat`;

    if (onOpenChat) {
      const targetPayload = recipientType === 'creator'
        ? {
            creator_id: selectedRecipient.id,
            creator_name: selectedRecipient.name,
            creator_avatar: selectedRecipient.avatar_url,
            campaign_name: subject,
            initial_message: newChatMessage.trim()
          }
        : {
            brand_id: selectedRecipient.id,
            brand_name: selectedRecipient.name,
            brand_logo: selectedRecipient.logo_url,
            campaign_name: subject,
            initial_message: newChatMessage.trim()
          };

      const conv = await onOpenChat(targetPayload);
      if (conv?.id) {
        setActiveConvId(conv.id);
      }
    }

    // Reset modal state
    setIsNewChatModalOpen(false);
    setSelectedRecipient(null);
    setNewChatSubject('');
    setNewChatMessage('');
    setShowMobileList(false);
  };

  const handleQuickContactCreator = async (creator) => {
    setSelectedRecipient(creator);
    setRecipientType('creator');
    setNewChatSubject(`${creator.name} — Collaboration`);
    setIsNewChatModalOpen(true);
  };

  const filteredConversations = conversations.filter(c => {
    const query = searchQuery.toLowerCase();
    const otherPartyName = currentRole === 'brand' ? c.creator_name : c.brand_name;
    const lastMsg = c.last_message || '';
    return otherPartyName.toLowerCase().includes(query) || lastMsg.toLowerCase().includes(query);
  });

  // Filter contacts for New Direct Message modal
  const availableCreators = creators.filter(c => 
    !contactSearchQuery || 
    c.name.toLowerCase().includes(contactSearchQuery.toLowerCase()) ||
    (c.specialization && c.specialization.toLowerCase().includes(contactSearchQuery.toLowerCase())) ||
    (c.tools && c.tools.some(t => t.toLowerCase().includes(contactSearchQuery.toLowerCase())))
  );

  const availableBrands = brands.filter(b =>
    !contactSearchQuery ||
    b.name.toLowerCase().includes(contactSearchQuery.toLowerCase()) ||
    (b.industry && b.industry.toLowerCase().includes(contactSearchQuery.toLowerCase()))
  );

  if (!currentUser) {
    return (
      <div className="h-[calc(100vh-120px)] min-h-[580px] bg-[#0c1222] border border-white/10 rounded-3xl p-8 flex flex-col items-center justify-center text-center shadow-2xl relative overflow-hidden animate-fade-in">
        <div className="w-16 h-16 rounded-3xl bg-purple-600/10 border border-purple-500/30 flex items-center justify-center text-purple-400 mb-4 shadow-lg shadow-purple-600/20">
          <Lock className="w-8 h-8" />
        </div>
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-xs font-semibold uppercase tracking-wider mb-3">
          <ShieldCheck className="w-3.5 h-3.5" />
          <span>Private Chat Security</span>
        </div>
        <h3 className="text-2xl font-bold font-heading text-white mb-2">
          Please Sign In / Log In to send a message.
        </h3>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md leading-relaxed mb-6">
          Only logged-in members can send messages, read private conversations, open private chat, and access chat history.
        </p>
        <div className="flex flex-col sm:flex-row gap-3">
          <button
            onClick={onOpenLogin}
            className="px-6 py-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-semibold text-xs transition-all shadow-lg shadow-purple-600/30 flex items-center justify-center gap-2"
          >
            <LogIn className="w-4 h-4" />
            <span>Sign In / Log In</span>
          </button>
          <button
            onClick={onOpenCreateAccount}
            className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-white/10 font-semibold text-xs transition-colors flex items-center justify-center gap-2"
          >
            <User className="w-4 h-4" />
            <span>Create Account</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="h-[calc(100vh-120px)] min-h-[580px] bg-[#0c1222] border border-white/10 rounded-3xl overflow-hidden flex flex-col shadow-2xl animate-fade-in relative">
      {/* Top Banner / Privacy Guarantee */}
      <div className="bg-[#090e1c] px-4 py-2 border-b border-white/10 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-2">
          <Lock className="w-3.5 h-3.5 text-cyan-400" />
          <span className="font-semibold text-slate-300">End-to-End Platform Protected</span>
          <span className="hidden sm:inline text-slate-500">•</span>
          <span className="hidden sm:inline">Personal mobile numbers and private emails are shielded</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 text-emerald-400 font-bold bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>✓ Verified Messages</span>
          </div>
          <div className="hidden sm:flex items-center gap-1 text-purple-400 font-medium">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>CREOVATE Escrow-Protected Chat</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex overflow-hidden">
        {/* Left Pane: Conversations List */}
        <div
          className={`w-full md:w-80 lg:w-96 border-r border-white/10 flex flex-col bg-[#0a0f1d] shrink-0 ${
            !showMobileList && activeConversation ? 'hidden md:flex' : 'flex'
          }`}
        >
          {/* List Header */}
          <div className="p-4 border-b border-white/10 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <h2 className="text-base font-bold font-heading text-white flex items-center gap-2">
                  <MessageSquare className="w-4 h-4 text-purple-400" />
                  <span>Direct Messages</span>
                </h2>
                <span className="text-xs px-2.5 py-0.5 rounded-full bg-purple-500/20 text-purple-300 font-mono font-bold">
                  {conversations.length}
                </span>
              </div>

              {/* Start Real Direct Message Button */}
              <button
                id="new-direct-message-btn"
                type="button"
                onClick={() => {
                  setSelectedRecipient(null);
                  setNewChatMessage('');
                  setNewChatSubject('');
                  setIsNewChatModalOpen(true);
                }}
                className="px-2.5 py-1.5 rounded-xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-semibold text-xs transition-all shadow-md shadow-purple-600/30 flex items-center gap-1.5"
                title="Start a real direct message"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>New Chat</span>
              </button>
            </div>

            {/* Conversation Search */}
            <div className="relative">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search conversations..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
              />
            </div>
          </div>

          {/* Conversation Items */}
          <div className="flex-1 overflow-y-auto divide-y divide-white/5">
            {filteredConversations.length === 0 ? (
              <div className="p-8 text-center space-y-3">
                <div className="w-12 h-12 rounded-2xl bg-purple-600/10 text-purple-400 flex items-center justify-center mx-auto">
                  <MessageSquare className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-white mb-1">No Active Conversations</h4>
                  <p className="text-[11px] text-slate-400 leading-relaxed">
                    Demo conversations removed. Start a real direct conversation with any creator or brand partner.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedRecipient(null);
                    setIsNewChatModalOpen(true);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-300 border border-purple-500/30 text-xs font-semibold inline-flex items-center gap-1.5 transition-colors"
                >
                  <Plus className="w-3.5 h-3.5" />
                  <span>Start Real Direct Message</span>
                </button>
              </div>
            ) : (
              filteredConversations.map((conv) => {
                const isActive = conv.id === activeConvId;
                const isBrand = currentRole === 'brand';
                const otherName = isBrand ? conv.creator_name : conv.brand_name;
                const otherAvatar = isBrand ? conv.creator_avatar : conv.brand_logo;
                const isVerified = isBrand ? conv.creator_verified : conv.brand_verified;
                const unreadCount = isBrand ? (conv.unread_count_brand || 0) : (conv.unread_count_creator || 0);

                return (
                  <button
                    key={conv.id}
                    onClick={() => {
                      setActiveConvId(conv.id);
                      setShowMobileList(false);
                      if (onSelectConversation) onSelectConversation(conv.id);
                    }}
                    className={`w-full p-4 text-left flex items-start gap-3.5 transition-colors relative ${
                      isActive
                        ? 'bg-purple-950/30 border-l-4 border-l-purple-500'
                        : 'hover:bg-white/5'
                    }`}
                  >
                    {/* Avatar */}
                    <div className="relative shrink-0">
                      <img
                        src={otherAvatar || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                        alt={otherName}
                        className="w-11 h-11 rounded-2xl object-cover bg-slate-900 border border-white/10"
                      />
                      <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-[#0a0f1d]" title="Online" />
                    </div>

                    {/* Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-1 mb-0.5">
                        <div className="flex items-center gap-1.5 truncate">
                          <span className={`text-xs font-bold truncate ${isActive ? 'text-white' : 'text-slate-200'}`}>
                            {otherName}
                          </span>
                          {isVerified && (
                            <span title="Verified" className="shrink-0 text-emerald-400 text-[10px] font-bold">✓</span>
                          )}
                        </div>
                        <span className="text-[10px] text-slate-500 shrink-0 font-medium">
                          {conv.last_message_time || 'Recent'}
                        </span>
                      </div>

                      {conv.campaign_name && (
                        <div className="text-[10px] text-purple-300/80 font-medium truncate mb-1">
                          {conv.campaign_name}
                        </div>
                      )}

                      <p className={`text-[11px] truncate ${unreadCount > 0 ? 'text-white font-semibold' : 'text-slate-400'}`}>
                        {conv.last_message || 'Start chatting...'}
                      </p>
                    </div>

                    {/* Unread Counter Badge */}
                    {unreadCount > 0 && (
                      <span className="shrink-0 w-5 h-5 rounded-full bg-purple-600 text-white font-mono font-bold text-[10px] flex items-center justify-center shadow-md shadow-purple-600/40">
                        {unreadCount}
                      </span>
                    )}
                  </button>
                );
              })
            )}
          </div>
        </div>

        {/* Right Pane: Active Chat Conversation or Direct Messaging Hub */}
        {activeConversation ? (
          <div
            className={`flex-1 flex flex-col bg-[#0c1222] overflow-hidden ${
              showMobileList ? 'hidden md:flex' : 'flex'
            }`}
          >
            {/* Chat Header */}
            <div className="p-3.5 sm:p-4 bg-[#0a0f1d] border-b border-white/10 flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                {/* Mobile Back Button */}
                <button
                  onClick={() => setShowMobileList(true)}
                  className="md:hidden p-1.5 rounded-lg bg-slate-800 text-slate-300 hover:text-white"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>

                {/* Avatar & Name */}
                <div className="relative">
                  <img
                    src={(currentRole === 'brand' ? activeConversation.creator_avatar : activeConversation.brand_logo) || 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=400&q=80'}
                    alt={currentRole === 'brand' ? activeConversation.creator_name : activeConversation.brand_name}
                    className="w-10 h-10 rounded-xl object-cover bg-slate-900 border border-white/10"
                  />
                  <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-[#0a0f1d]" />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                      <span>{currentRole === 'brand' ? activeConversation.creator_name : activeConversation.brand_name}</span>
                      <span className="text-emerald-400 text-xs font-bold" title="Identity Verified">✓</span>
                    </h3>
                  </div>

                  <div className="flex items-center gap-2 text-[10px] text-slate-400">
                    <span className="text-emerald-400 font-medium">Online</span>
                    <span>•</span>
                    <span className="text-purple-300 font-medium truncate max-w-[200px] sm:max-w-xs">
                      {activeConversation.campaign_name || 'Direct Project Chat'}
                    </span>
                  </div>
                </div>
              </div>

              {/* Action buttons */}
              <div className="flex items-center gap-2">
                {activeConversation.messages && activeConversation.messages.length > 0 && (
                  <button
                    type="button"
                    onClick={() => {
                      if (onClearMessages) onClearMessages(activeConversation.id);
                    }}
                    className="px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-400 hover:text-slate-200 border border-white/10 transition-colors hidden sm:flex items-center gap-1"
                    title="Clear messages in this conversation"
                  >
                    <span>Clear Messages</span>
                  </button>
                )}

                {/* Delete Chat Button */}
                {onDeleteConversation && (
                  <button
                    id="delete-chat-btn"
                    type="button"
                    onClick={() => {
                      const otherName = currentRole === 'brand' ? activeConversation.creator_name : activeConversation.brand_name;
                      if (window.confirm(`Delete conversation with "${otherName}" permanently?`)) {
                        onDeleteConversation(activeConversation.id);
                      }
                    }}
                    className="px-2.5 py-1.5 rounded-xl text-xs font-semibold bg-rose-500/10 hover:bg-rose-500/20 text-rose-300 border border-rose-500/30 transition-colors flex items-center gap-1.5"
                    title="Delete conversation permanently"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Delete Chat</span>
                  </button>
                )}

                {onViewProfile && (
                  <button
                    type="button"
                    onClick={() => {
                      if (currentRole === 'brand') {
                        onViewProfile('creator-profile', { creatorId: activeConversation.creator_id });
                      } else {
                        onViewProfile('brand-profile', { brandId: activeConversation.brand_id });
                      }
                    }}
                    className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-white/5 hover:bg-white/10 text-slate-300 border border-white/10 transition-colors hidden sm:flex items-center gap-1.5"
                  >
                    <span>View Profile</span>
                  </button>
                )}
              </div>
            </div>

            {/* Conversation Privacy Notice Banner */}
            <div className="py-2 px-4 bg-purple-950/20 border-b border-purple-500/10 flex items-center justify-center gap-2 text-[11px] text-purple-300 text-center">
              <Lock className="w-3 h-3 text-cyan-400" />
              <span><strong>🔒 Private Conversation:</strong> Only you and this user can see these messages.</span>
            </div>

            {/* Message Thread (WhatsApp Style) */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-4 bg-[#090d19]/40">
              {activeConversation.messages && activeConversation.messages.length > 0 ? (
                activeConversation.messages.map((msg) => {
                  const isMe = msg.sender_role === currentRole;

                  return (
                    <div
                      key={msg.id}
                      className={`flex flex-col ${isMe ? 'items-end' : 'items-start'}`}
                    >
                      <div className="text-[10px] text-slate-400 mb-1 px-1">
                        {isMe ? 'You' : msg.sender_name}
                      </div>

                      <div
                        className={`max-w-[85%] sm:max-w-md px-4 py-2.5 rounded-2xl text-xs sm:text-[13px] leading-relaxed shadow-md relative ${
                          isMe
                            ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-br-xs'
                            : 'bg-slate-800/90 text-slate-100 border border-white/10 rounded-bl-xs'
                        }`}
                      >
                        <p className="whitespace-pre-wrap">{msg.text}</p>

                        <div className={`flex items-center justify-end gap-1 mt-1 text-[10px] ${isMe ? 'text-purple-200' : 'text-slate-400'}`}>
                          <span>{msg.timestamp}</span>
                          {isMe && (
                            msg.status === 'read' ? (
                              <CheckCheck className="w-3.5 h-3.5 text-cyan-300" title="Read" />
                            ) : msg.status === 'delivered' ? (
                              <CheckCheck className="w-3.5 h-3.5 text-purple-200" title="Delivered" />
                            ) : (
                              <Check className="w-3.5 h-3.5 text-purple-200" title="Sent" />
                            )
                          )}
                        </div>
                      </div>
                    </div>
                  );
                })
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-center p-8 space-y-3">
                  <div className="w-12 h-12 rounded-2xl bg-purple-600/10 text-purple-400 flex items-center justify-center">
                    <MessageSquare className="w-6 h-6" />
                  </div>
                  <h4 className="text-sm font-bold text-white">Direct Real-Time Workspace</h4>
                  <p className="text-xs text-slate-400 max-w-sm">
                    You are connected in real-time. Type your message below to send an immediate direct message.
                  </p>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Message Input Box */}
            <form onSubmit={handleSend} className="p-3 sm:p-4 bg-[#0a0f1d] border-t border-white/10 flex items-center gap-2">
              <input
                type="text"
                placeholder="Type a message..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-4 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs sm:text-sm text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 transition-colors"
              />
              <button
                type="submit"
                disabled={!inputText.trim()}
                className={`p-2.5 sm:px-5 sm:py-2.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                  inputText.trim()
                    ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30'
                    : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                }`}
              >
                <Send className="w-4 h-4" />
                <span className="hidden sm:inline">Send</span>
              </button>
            </form>
          </div>
        ) : (
          /* Direct Messaging Hub when no conversation selected / empty inbox */
          <div className="flex-1 flex flex-col items-center justify-center p-6 sm:p-10 text-center overflow-y-auto">
            <div className="max-w-xl mx-auto space-y-6">
              <div className="w-16 h-16 rounded-3xl bg-gradient-to-br from-purple-600/20 to-indigo-600/20 border border-purple-500/30 flex items-center justify-center text-purple-400 mx-auto shadow-xl shadow-purple-600/20">
                <MessageSquare className="w-8 h-8" />
              </div>

              <div className="space-y-2">
                <h3 className="text-xl sm:text-2xl font-bold font-heading text-white">
                  Real Direct Messages
                </h3>
                <p className="text-xs sm:text-sm text-slate-400 leading-relaxed">
                  Connect and communicate with verified AI creators and enterprise brands. Personal phone numbers and email addresses are securely shielded by CREOVATE Privacy Engine.
                </p>
              </div>

              <div className="flex items-center justify-center gap-3">
                <button
                  id="start-real-chat-hub-btn"
                  type="button"
                  onClick={() => {
                    setSelectedRecipient(null);
                    setNewChatMessage('');
                    setNewChatSubject('');
                    setIsNewChatModalOpen(true);
                  }}
                  className="px-6 py-3 rounded-2xl bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs sm:text-sm transition-all shadow-xl shadow-purple-600/30 flex items-center gap-2 hover:scale-102"
                >
                  <Plus className="w-4 h-4" />
                  <span>Start a Real Direct Message</span>
                </button>
              </div>

              {/* Recommended Real Contacts Directory */}
              {creators.length > 0 && (
                <div className="pt-6 border-t border-white/10 text-left space-y-3">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                      Verified Creators Available Now
                    </span>
                    <span className="text-[11px] text-emerald-400 font-medium flex items-center gap-1">
                      <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                      Live Network
                    </span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {creators.slice(0, 4).map((creator) => (
                      <div
                        key={creator.id}
                        className="p-3 rounded-2xl bg-slate-900/80 border border-white/10 hover:border-purple-500/30 transition-all flex items-center justify-between gap-3 group"
                      >
                        <div className="flex items-center gap-2.5 min-w-0">
                          <img
                            src={creator.avatar_url}
                            alt={creator.name}
                            className="w-10 h-10 rounded-xl object-cover bg-slate-800 shrink-0"
                          />
                          <div className="min-w-0">
                            <div className="flex items-center gap-1">
                              <span className="text-xs font-bold text-white truncate group-hover:text-purple-300 transition-colors">
                                {creator.name}
                              </span>
                              <span className="text-emerald-400 text-[10px] font-bold">✓</span>
                            </div>
                            <span className="text-[10px] text-slate-400 truncate block">
                              {creator.specialization || creator.tools?.[0] || 'AI Creator'}
                            </span>
                          </div>
                        </div>

                        <button
                          type="button"
                          onClick={() => handleQuickContactCreator(creator)}
                          className="px-2.5 py-1.5 rounded-xl bg-purple-600/20 hover:bg-purple-600 text-purple-300 hover:text-white border border-purple-500/30 text-[11px] font-semibold transition-all shrink-0 flex items-center gap-1"
                        >
                          <Send className="w-3 h-3" />
                          <span>Message</span>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Start Real Direct Message Modal */}
      {isNewChatModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-fade-in">
          <div className="bg-[#0c1222] border border-white/15 rounded-3xl w-full max-w-xl max-h-[90vh] overflow-hidden flex flex-col shadow-2xl relative">
            {/* Modal Header */}
            <div className="p-4 sm:p-5 border-b border-white/10 flex items-center justify-between bg-[#0a0f1d]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-600/20 text-purple-400 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div>
                  <h3 className="text-sm sm:text-base font-bold text-white">
                    Start Real Direct Message
                  </h3>
                  <p className="text-[11px] text-slate-400">
                    Contact real verified creators and brands directly
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsNewChatModalOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Modal Body */}
            <form onSubmit={handleStartRealDirectChat} className="p-4 sm:p-6 overflow-y-auto space-y-4 flex-1">
              {/* Type Switcher */}
              <div className="flex gap-2 p-1 bg-slate-900 rounded-xl border border-white/10">
                <button
                  type="button"
                  onClick={() => {
                    setRecipientType('creator');
                    setSelectedRecipient(null);
                  }}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    recipientType === 'creator'
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Verified AI Creators ({availableCreators.length})
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setRecipientType('brand');
                    setSelectedRecipient(null);
                  }}
                  className={`flex-1 py-1.5 text-xs font-semibold rounded-lg transition-all ${
                    recipientType === 'brand'
                      ? 'bg-purple-600 text-white shadow-md shadow-purple-600/30'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  Brand Partners ({availableBrands.length})
                </button>
              </div>

              {/* Recipient Selection */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1.5">
                  Select Recipient
                </label>

                {/* Search input */}
                <div className="relative mb-2">
                  <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
                  <input
                    type="text"
                    placeholder={`Search ${recipientType === 'creator' ? 'creators by name or tool...' : 'brands...'}`}
                    value={contactSearchQuery}
                    onChange={(e) => setContactSearchQuery(e.target.value)}
                    className="w-full pl-8 pr-3 py-1.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                  />
                </div>

                {/* List of contacts */}
                <div className="max-h-40 overflow-y-auto border border-white/10 rounded-xl bg-slate-900/60 divide-y divide-white/5">
                  {recipientType === 'creator' ? (
                    availableCreators.length > 0 ? (
                      availableCreators.map((c) => {
                        const isSelected = selectedRecipient?.id === c.id;
                        return (
                          <div
                            key={c.id}
                            onClick={() => setSelectedRecipient(c)}
                            className={`p-2.5 flex items-center justify-between cursor-pointer transition-colors ${
                              isSelected
                                ? 'bg-purple-600/20 border-l-2 border-l-purple-500'
                                : 'hover:bg-white/5'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <img
                                src={c.avatar_url}
                                alt={c.name}
                                className="w-8 h-8 rounded-lg object-cover bg-slate-800"
                              />
                              <div className="min-w-0">
                                <div className="flex items-center gap-1">
                                  <span className="text-xs font-bold text-white truncate">{c.name}</span>
                                  <span className="text-emerald-400 text-[10px]">✓</span>
                                </div>
                                <span className="text-[10px] text-slate-400 truncate block">
                                  {c.specialization || (c.tools && c.tools.join(', '))}
                                </span>
                              </div>
                            </div>
                            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-lg ${
                              isSelected
                                ? 'bg-purple-600 text-white'
                                : 'text-slate-400'
                            }`}>
                              {isSelected ? 'Selected' : 'Choose'}
                            </span>
                          </div>
                        );
                      })
                    ) : (
                      <div className="p-4 text-center text-xs text-slate-500">
                        No creators found matching search.
                      </div>
                    )
                  ) : (
                    availableBrands.length > 0 ? (
                      availableBrands.map((b) => {
                        const isSelected = selectedRecipient?.id === b.id;
                        return (
                          <div
                            key={b.id}
                            onClick={() => setSelectedRecipient(b)}
                            className={`p-2.5 flex items-center justify-between cursor-pointer transition-colors ${
                              isSelected
                                ? 'bg-purple-600/20 border-l-2 border-l-purple-500'
                                : 'hover:bg-white/5'
                            }`}
                          >
                            <div className="flex items-center gap-2.5 min-w-0">
                              <img
                                src={b.logo_url}
                                alt={b.name}
                                className="w-8 h-8 rounded-lg object-cover bg-slate-800"
                              />
                              <div className="min-w-0">
                                <span className="text-xs font-bold text-white truncate block">{b.name}</span>
                                <span className="text-[10px] text-slate-400 truncate block">{b.industry || 'Brand'}</span>
                              </div>
                            </div>
                            <span className={`text-[11px] font-semibold px-2 py-0.5 rounded-lg ${
                              isSelected
                                ? 'bg-purple-600 text-white'
                                : 'text-slate-400'
                            }`}>
                              {isSelected ? 'Selected' : 'Choose'}
                            </span>
                          </div>
                        );
                      })
                    ) : (
                      <div className="p-4 text-center text-xs text-slate-500">
                        No brands found matching search.
                      </div>
                    )
                  )}
                </div>
              </div>

              {/* Selected badge */}
              {selectedRecipient && (
                <div className="p-2.5 rounded-xl bg-purple-950/40 border border-purple-500/30 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <img
                      src={selectedRecipient.avatar_url || selectedRecipient.logo_url}
                      alt={selectedRecipient.name}
                      className="w-7 h-7 rounded-lg object-cover"
                    />
                    <div>
                      <span className="text-xs font-bold text-purple-200 block">
                        To: {selectedRecipient.name}
                      </span>
                      <span className="text-[10px] text-slate-400">
                        Escrow-Protected Direct Messaging Channel
                      </span>
                    </div>
                  </div>
                  <span className="text-emerald-400 text-xs font-semibold flex items-center gap-1">
                    <Check className="w-3.5 h-3.5" />
                    Verified
                  </span>
                </div>
              )}

              {/* Subject / Campaign */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Topic / Project Subject (Optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g. 4K Commercial Video Production, AI Brief Collaboration"
                  value={newChatSubject}
                  onChange={(e) => setNewChatSubject(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Message Content */}
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Message <span className="text-purple-400">*</span>
                </label>
                <textarea
                  rows={3}
                  required
                  placeholder="Hi, I'd like to collaborate on an upcoming project..."
                  value={newChatMessage}
                  onChange={(e) => setNewChatMessage(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500 resize-none"
                />
              </div>

              {/* Modal Actions */}
              <div className="pt-2 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsNewChatModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-xs font-semibold bg-slate-800 text-slate-300 hover:text-white hover:bg-slate-700 transition-colors"
                >
                  Cancel
                </button>
                <button
                  id="confirm-send-real-chat-btn"
                  type="submit"
                  disabled={!selectedRecipient || !newChatMessage.trim()}
                  className={`px-5 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
                    selectedRecipient && newChatMessage.trim()
                      ? 'bg-purple-600 hover:bg-purple-500 text-white shadow-lg shadow-purple-600/30'
                      : 'bg-slate-800 text-slate-500 cursor-not-allowed'
                  }`}
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Send & Open Direct Chat</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
