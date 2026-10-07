import React, { useState, useRef, useEffect } from 'react';
import { Sparkles, X, Send, Trash2, User, ArrowRight, Zap, Bot } from 'lucide-react';
import { api } from '../services/api';

export function AIAssistantChatbot({ onNavigate, onApplyFilter, onOpenCreateAccount, currentRole = 'brand' }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    {
      id: 'welcome',
      sender: 'assistant',
      text: "Hello! I am your **Creovate AI Assistant**. I can help you understand how to create accounts, set up creator or brand profiles, upload profile photos, build creative briefs, and discover verified creators. How can I help you today?",
      timestamp: 'Just now',
      actions: []
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  const suggestedPrompts = [
    { label: "How to create an account", prompt: "How do I create an account on Creovate AI?" },
    { label: "How to upload profile photo", prompt: "How do I upload or take a profile photo?" },
    { label: "How to use AI Brief Builder", prompt: "How do I use the AI Brief Builder?" },
    { label: "How does verification work?", prompt: "How does creator verification and Proof Passport work?" }
  ];

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
      inputRef.current?.focus();
    }
  }, [messages, isOpen]);

  const handleSendMessage = async (textToSend) => {
    const text = textToSend || inputValue;
    if (!text.trim() || isLoading) return;

    const userMsg = {
      id: `user-${Date.now()}`,
      sender: 'user',
      text: text.trim(),
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsLoading(true);

    try {
      // Build conversation history for multi-turn context
      const historyContext = messages.map(m => ({
        role: m.sender === 'user' ? 'user' : 'assistant',
        content: m.text
      }));

      const res = await api.chatWithAssistant(userMsg.text, historyContext, currentRole);

      const assistantMsg = {
        id: `ai-${Date.now()}`,
        sender: 'assistant',
        text: res?.reply || "I'm here to help you connect with verified AI creators and build structured creative briefs.",
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        actions: res?.actions || []
      };

      setMessages(prev => [...prev, assistantMsg]);
    } catch (err) {
      setMessages(prev => [
        ...prev,
        {
          id: `ai-err-${Date.now()}`,
          sender: 'assistant',
          text: "I experienced a minor delay connecting to the AI cluster. You can browse our Creator Directory or launch the AI Brief Builder from the top navigation.",
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          actions: []
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearChat = () => {
    setMessages([
      {
        id: 'welcome-reset',
        sender: 'assistant',
        text: "Conversation reset. What would you like to explore across the Creovate AI marketplace?",
        timestamp: 'Just now',
        actions: []
      }
    ]);
  };

  const handleExecuteAction = (action) => {
    if (action.type === 'FILTER_CREATORS') {
      if (onApplyFilter) {
        onApplyFilter(action);
      } else if (onNavigate) {
        onNavigate(action.page || 'explore', { search: action.tool || action.contentType || action.spec || '' });
      }
      setIsOpen(false);
    } else if (action.type === 'NAVIGATE') {
      if (onNavigate) {
        onNavigate(action.page, action.search ? { search: action.search } : {});
      }
      setIsOpen(false);
    } else if (action.type === 'OPEN_CREATE_ACCOUNT') {
      if (onOpenCreateAccount) {
        onOpenCreateAccount();
      }
      setIsOpen(false);
    }
  };

  return (
    <>
      {/* Floating Trigger Button */}
      <div className="fixed bottom-6 right-6 z-40">
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="group relative flex items-center gap-2.5 px-4 py-3 rounded-2xl bg-gradient-to-r from-purple-600 via-indigo-600 to-purple-700 hover:from-purple-500 hover:to-indigo-500 text-white shadow-2xl shadow-purple-900/60 transition-all duration-300 hover:scale-105 border border-purple-400/30"
          title="Creovate AI Assistant"
        >
          <div className="relative">
            <Sparkles className="w-5 h-5 text-amber-300 animate-pulse" />
            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-[#0c1222]" />
          </div>
          <span className="text-xs font-bold font-heading tracking-wide">
            Creovate AI Assistant
          </span>
        </button>
      </div>

      {/* Modern Chat Window */}
      {isOpen && (
        <div className="fixed bottom-22 right-4 sm:right-6 z-50 w-[calc(100vw-2rem)] sm:w-[420px] max-h-[82vh] h-[580px] bg-[#0b101e] border border-purple-500/40 rounded-3xl shadow-2xl flex flex-col overflow-hidden backdrop-blur-2xl animate-fade-in text-slate-100">
          {/* Header */}
          <div className="p-4 px-5 border-b border-white/10 bg-gradient-to-r from-purple-950/60 via-[#10172e] to-cyan-950/40 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-600/30 border border-purple-500/40 flex items-center justify-center text-purple-300 shadow-glow">
                <Sparkles className="w-4 h-4 text-purple-300" />
              </div>
              <div>
                <h3 className="font-bold text-sm text-white font-heading flex items-center gap-2">
                  <span>Creovate AI Assistant</span>
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                </h3>
                <p className="text-[11px] text-purple-300/80">Your AI marketplace assistant</p>
              </div>
            </div>

            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                title="Clear Chat"
                className="p-1.5 rounded-lg text-slate-400 hover:text-rose-400 hover:bg-rose-500/10 transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close Assistant"
                className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-white/10 transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages Area */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3.5 text-xs">
            {messages.map((msg) => {
              const isUser = msg.sender === 'user';
              return (
                <div
                  key={msg.id}
                  className={`flex items-start gap-2.5 ${isUser ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`w-7 h-7 rounded-xl flex items-center justify-center shrink-0 text-[11px] font-bold ${
                      isUser
                        ? 'bg-purple-600 text-white'
                        : 'bg-slate-800 text-purple-400 border border-purple-500/30'
                    }`}
                  >
                    {isUser ? <User className="w-3.5 h-3.5" /> : <Bot className="w-3.5 h-3.5" />}
                  </div>

                  <div className={`max-w-[82%] space-y-1.5 ${isUser ? 'items-end' : ''}`}>
                    <div
                      className={`p-3 rounded-2xl leading-relaxed whitespace-pre-wrap ${
                        isUser
                          ? 'bg-gradient-to-r from-purple-600 to-indigo-600 text-white rounded-tr-sm'
                          : 'bg-[#12192c] border border-white/5 text-slate-200 rounded-tl-sm shadow-md'
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* Action buttons if available */}
                    {msg.actions && msg.actions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 pt-1">
                        {msg.actions.map((act, i) => (
                          <button
                            key={i}
                            onClick={() => handleExecuteAction(act)}
                            className="px-2.5 py-1 rounded-lg text-[10px] font-semibold bg-purple-950/60 hover:bg-purple-900 text-purple-200 border border-purple-500/30 flex items-center gap-1 transition-all hover:scale-102"
                          >
                            <span>{act.label}</span>
                            <ArrowRight className="w-2.5 h-2.5" />
                          </button>
                        ))}
                      </div>
                    )}

                    <div className={`text-[9px] text-slate-500 ${isUser ? 'text-right' : 'text-left'}`}>
                      {msg.timestamp}
                    </div>
                  </div>
                </div>
              );
            })}

            {isLoading && (
              <div className="flex items-center gap-2 text-slate-400 text-xs py-2 px-1">
                <Bot className="w-4 h-4 text-purple-400 animate-spin" />
                <span>Creovate AI is reasoning...</span>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Suggested prompts (when <= 2 messages) */}
          {messages.length <= 2 && (
            <div className="p-3 border-t border-white/5 bg-[#090e1b] space-y-1.5">
              <span className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider block">
                Suggested Prompts
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                {suggestedPrompts.map((sp, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSendMessage(sp.prompt)}
                    className="p-1.5 px-2.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 border border-white/5 text-[11px] text-slate-300 hover:text-white text-left truncate transition-colors flex items-center gap-1"
                  >
                    <Zap className="w-2.5 h-2.5 text-purple-400 shrink-0" />
                    <span className="truncate">{sp.label}</span>
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input Form */}
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSendMessage();
            }}
            className="p-3 bg-[#080d19] border-t border-white/10 flex items-center gap-2"
          >
            <input
              ref={inputRef}
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              placeholder="Ask Creovate AI..."
              className="flex-1 px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/10 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-purple-500"
            />
            <button
              type="submit"
              disabled={!inputValue.trim() || isLoading}
              className="p-2.5 rounded-xl bg-purple-600 hover:bg-purple-500 text-white disabled:opacity-40 transition-all shadow-md shadow-purple-600/30 flex items-center justify-center shrink-0"
              title="Send Message"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </form>
        </div>
      )}
    </>
  );
}
