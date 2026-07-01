import { useState } from 'react';
import { Bot, Send, Mic, Paperclip, Plus, Clock, FileText, ChevronRight } from 'lucide-react';
import { Badge } from '../ui/Badge';

const sessions = [
  { id: 1, title: 'Acetone MSDS Query', time: 'Today, 09:14' },
  { id: 2, title: 'PPE Requirements for Lab B', time: 'Today, 08:32' },
  { id: 3, title: 'SOP for Sample Disposal', time: 'Yesterday' },
  { id: 4, title: 'Chemical Compatibility Check', time: 'Yesterday' },
  { id: 5, title: 'Fire Safety Procedures', time: '2 days ago' },
];

const quickActions = ['Find SOP', 'Get MSDS', 'Summarize Report', 'Chemical Guidance', 'PPE Requirements'];

const initialMessages = [
  {
    id: 1,
    role: 'user',
    content: 'What are the storage requirements for Acetone in Lab Section C?'
  },
  {
    id: 2,
    role: 'ai',
    content: 'Acetone (CAS 67-64-1) must be stored in a flammable materials cabinet away from oxidisers and heat sources. Key requirements for Lab Section C:\n\n• Temperature: Below 25°C in a ventilated, cool area\n• Segregation: Keep away from acids, oxidisers, and ignition sources\n• Container: Approved flammable storage containers only\n• Quantity limit: Maximum 10L per storage unit',
    source: 'SDS — Acetone Rev 3',
    sourceType: 'MSDS'
  },
  {
    id: 3,
    role: 'user',
    content: 'What PPE is required when handling Acetone?'
  },
  {
    id: 4,
    role: 'ai',
    content: 'When handling Acetone, the following PPE is mandatory according to SOP-LAB-PPE-007:\n\n• **Eye Protection:** Chemical splash goggles\n• **Hand Protection:** Nitrile gloves (min. 0.1mm thickness)\n• **Respiratory:** Ensure adequate ventilation; organic vapour respirator if ventilation is insufficient\n• **Clothing:** Lab coat and closed-toe shoes',
    source: 'SOP-LAB-PPE-007 Rev 2',
    sourceType: 'SOP'
  }
];

export function AIAssistant() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);

  const sendMessage = () => {
    if (!input.trim()) return;
    const newMsg = { id: messages.length + 1, role: 'user', content: input };
    setMessages(prev => [...prev, newMsg]);
    setInput('');
    setIsTyping(true);
    setTimeout(() => {
      setIsTyping(false);
      setMessages(prev => [...prev, {
        id: prev.length + 1,
        role: 'ai',
        content: 'I\'m processing your query against the laboratory documentation library. Please allow me a moment to retrieve the most accurate information.',
        source: 'Lab Document Library',
        sourceType: 'SOP'
      }]);
    }, 1500);
  };

  return (
    <div className="flex h-full">
      {/* Sidebar */}
      <div className="w-56 border-r border-slate-200/40 flex flex-col">
        <div className="p-3">
          <button className="w-full flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg text-xs font-medium shadow-sm">
            <Plus className="w-3.5 h-3.5" />
            New Chat
          </button>
        </div>
        <div className="px-3 pb-2">
          <p className="text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-2">Recent Sessions</p>
          <div className="space-y-0.5">
            {sessions.map((s) => (
              <button key={s.id} className={`w-full text-left px-2 py-2 rounded-lg hover:bg-slate-100/60 transition-colors ${s.id === 1 ? 'bg-slate-100/80' : ''}`}>
                <p className="text-xs font-medium text-slate-700 truncate">{s.title}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Clock className="w-2.5 h-2.5 text-slate-400" />
                  <p className="text-[10px] text-slate-400">{s.time}</p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Chat */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="px-5 py-3 border-b border-slate-200/40 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-800">Lab AI Copilot</p>
              <p className="text-[10px] text-green-600 font-medium">● Online</p>
            </div>
          </div>
          <div className="flex gap-1.5">
            {['SOP', 'MSDS', 'Report'].map(t => (
              <span key={t} className="px-2 py-0.5 text-[10px] bg-slate-100 text-slate-600 rounded-full font-medium">{t}</span>
            ))}
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto px-5 py-4 space-y-4">
          {messages.map((msg) => (
            <div key={msg.id} className={`flex gap-3 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}>
              {msg.role === 'ai' && (
                <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot className="w-3.5 h-3.5 text-white" />
                </div>
              )}
              <div className={`max-w-lg ${msg.role === 'user' ? 'items-end' : 'items-start'} flex flex-col gap-1.5`}>
                <div className={`px-4 py-3 rounded-2xl text-xs leading-relaxed whitespace-pre-line ${
                  msg.role === 'user'
                    ? 'bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-tr-sm'
                    : 'bg-white border border-slate-200/60 text-slate-700 rounded-tl-sm shadow-sm'
                }`}>
                  {msg.content}
                </div>
                {msg.role === 'ai' && (msg as any).source && (
                  <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 border border-slate-200/60 rounded-lg">
                    <FileText className="w-3 h-3 text-cyan-500" />
                    <span className="text-[10px] text-slate-600 font-medium">{(msg as any).source}</span>
                    <Badge variant="info" size="sm">{(msg as any).sourceType}</Badge>
                    <button className="text-[10px] text-cyan-600 flex items-center gap-0.5 hover:underline">
                      View <ChevronRight className="w-2.5 h-2.5" />
                    </button>
                  </div>
                )}
              </div>
            </div>
          ))}

          {isTyping && (
            <div className="flex gap-3 items-center">
              <div className="w-6 h-6 rounded-full bg-gradient-to-br from-cyan-400 to-cyan-600 flex items-center justify-center flex-shrink-0">
                <Bot className="w-3.5 h-3.5 text-white" />
              </div>
              <div className="px-4 py-3 bg-white border border-slate-200/60 rounded-2xl rounded-tl-sm shadow-sm flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></span>
                <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></span>
              </div>
            </div>
          )}
        </div>

        {/* Quick Actions */}
        <div className="px-5 pb-2 flex gap-2 flex-wrap">
          {quickActions.map((a) => (
            <button key={a} onClick={() => setInput(a)} className="px-3 py-1 bg-slate-100/80 hover:bg-cyan-50 hover:border-cyan-200 border border-slate-200/60 rounded-full text-xs text-slate-600 hover:text-cyan-700 transition-colors">
              {a}
            </button>
          ))}
        </div>

        {/* Input */}
        <div className="px-5 pb-4">
          <div className="flex items-center gap-2 bg-white border border-slate-200/60 rounded-xl px-3 py-2 shadow-sm">
            <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
              <Paperclip className="w-4 h-4" />
            </button>
            <input
              type="text"
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && sendMessage()}
              placeholder="Ask about SOPs, MSDS, chemicals, safety procedures..."
              className="flex-1 text-xs text-slate-700 outline-none placeholder:text-slate-400 bg-transparent"
            />
            <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
              <Mic className="w-4 h-4" />
            </button>
            <button
              onClick={sendMessage}
              className="p-1.5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg hover:shadow-md transition-all"
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
