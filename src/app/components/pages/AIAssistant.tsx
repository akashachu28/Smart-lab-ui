import { useState } from 'react';
import { Bot, Send, Mic, Paperclip, Plus, Clock, FileText, ChevronRight, Settings, Beaker, ClipboardList, Package, BookOpen, FlaskConical, AlertTriangle, Languages, BarChart3 } from 'lucide-react';
import { Badge } from '../ui/badge';

const sessions = [
  { id: 1, title: 'Acetone MSDS Query', time: 'Today, 09:14' },
  { id: 2, title: 'PPE Requirements for Lab B', time: 'Today, 08:32' },
  { id: 3, title: 'SOP for Sample Disposal', time: 'Yesterday' },
  { id: 4, title: 'Chemical Compatibility Check', time: 'Yesterday' },
  { id: 5, title: 'Fire Safety Procedures', time: '2 days ago' },
];

const aiModels = [
  {
    id: 'copilot',
    name: 'Laboratory AI Copilot',
    description: 'A conversational AI assistant that helps laboratory personnel access information, perform routine tasks, and make informed decisions.',
    icon: Bot,
    color: 'from-cyan-500 to-cyan-600'
  },
  {
    id: 'sop',
    name: 'SOP Search',
    description: 'Quickly retrieve Standard Operating Procedures (SOPs) using natural language queries.',
    icon: FileText,
    color: 'from-blue-500 to-blue-600'
  },
  {
    id: 'manual',
    name: 'Laboratory Manual Search',
    description: 'Search equipment manuals, technical documents, and operational guidelines with AI-powered semantic search.',
    icon: BookOpen,
    color: 'from-purple-500 to-purple-600'
  },
  {
    id: 'chemical',
    name: 'Chemical Handling Guidance',
    description: 'Provides instant guidance on chemical handling, storage, safety precautions, and regulatory practices.',
    icon: FlaskConical,
    color: 'from-orange-500 to-orange-600'
  },
  {
    id: 'msds',
    name: 'MSDS Search',
    description: 'Instantly access Material Safety Data Sheets (MSDS/SDS) for hazard, handling, PPE, and emergency information.',
    icon: AlertTriangle,
    color: 'from-red-500 to-red-600'
  },
  {
    id: 'report',
    name: 'Report Summarization',
    description: 'Automatically summarizes laboratory reports, audits, and inspection findings into concise insights.',
    icon: BarChart3,
    color: 'from-green-500 to-green-600'
  },
  {
    id: 'multilingual',
    name: 'Arabic & English Support',
    description: 'Communicate in both Arabic and English with full language support for all queries.',
    icon: Languages,
    color: 'from-indigo-500 to-indigo-600'
  }
];

const suggestionCards = [
  {
    icon: FileText,
    title: 'Find SOP',
    description: 'Retrieve protocol for Centrifuge C-4',
    color: 'from-cyan-400 to-cyan-600'
  },
  {
    icon: Beaker,
    title: 'Chemical Guidance',
    description: 'Compatibility check for Acetone and Nitric Acid',
    color: 'from-cyan-400 to-cyan-600'
  },
  {
    icon: ClipboardList,
    title: 'Summarize Report',
    description: 'Key findings from yesterday\'s batch run',
    color: 'from-cyan-400 to-cyan-600'
  },
  {
    icon: Package,
    title: 'Inventory Check',
    description: 'Current stock of Class 3 Flammables',
    color: 'from-cyan-400 to-cyan-600'
  }
];

const initialMessages: any[] = [];

export function AIAssistant() {
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [selectedModel, setSelectedModel] = useState('copilot');
  const [showModelSelector, setShowModelSelector] = useState(false);

  const handleSuggestionClick = (suggestion: string) => {
    setInput(suggestion);
    sendMessage();
  };

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
            {(() => {
              const currentModel = aiModels.find(m => m.id === selectedModel) || aiModels[0];
              const IconComponent = currentModel.icon;
              return (
                <>
                  <div className={`w-7 h-7 rounded-lg bg-gradient-to-r ${currentModel.color} flex items-center justify-center`}>
                    <IconComponent className="w-4 h-4 text-white" />
                  </div>
                  <div>
                    <p className="text-xs font-semibold text-slate-800">{currentModel.name}</p>
                    <p className="text-[10px] text-green-600 font-medium">● Online</p>
                  </div>
                </>
              );
            })()}
          </div>
          <div className="flex items-center gap-2">
            <div className="relative">
              <button
                onClick={() => setShowModelSelector(!showModelSelector)}
                className="flex items-center gap-2 px-3 py-1.5 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors"
              >
                <Settings className="w-3.5 h-3.5 text-slate-600" />
                <span className="text-xs text-slate-700 font-medium">Change Model</span>
              </button>
              
              {showModelSelector && (
                <div className="absolute right-0 top-full mt-2 w-80 bg-white border border-slate-200 rounded-xl shadow-xl z-50 max-h-96 overflow-y-auto">
                  <div className="p-3 border-b border-slate-100">
                    <p className="text-xs font-semibold text-slate-800">Select AI Model</p>
                    <p className="text-[10px] text-slate-500 mt-0.5">Choose the specialized assistant for your task</p>
                  </div>
                  <div className="p-2">
                    {aiModels.map((model) => {
                      const IconComponent = model.icon;
                      return (
                        <button
                          key={model.id}
                          onClick={() => {
                            setSelectedModel(model.id);
                            setShowModelSelector(false);
                          }}
                          className={`w-full text-left p-3 rounded-lg hover:bg-slate-50 transition-colors mb-1 ${
                            selectedModel === model.id ? 'bg-cyan-50 border border-cyan-200' : ''
                          }`}
                        >
                          <div className="flex items-start gap-3">
                            <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${model.color} flex items-center justify-center flex-shrink-0`}>
                              <IconComponent className="w-4 h-4 text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <p className="text-xs font-semibold text-slate-800">{model.name}</p>
                                {selectedModel === model.id && (
                                  <Badge variant="success" size="sm">Active</Badge>
                                )}
                              </div>
                              <p className="text-[10px] text-slate-500 leading-relaxed">
                                {model.description}
                              </p>
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Messages or Empty State */}
        <div className="flex-1 overflow-y-auto px-5 py-4">
          {messages.length === 0 ? (
            // Empty State
            <div className="flex flex-col items-center justify-center h-full max-w-4xl mx-auto">
              
              {/* Central Icon and Heading */}
              <div className="flex flex-col items-center mb-10">
                <div className="w-24 h-24 rounded-2xl bg-cyan-50/80 flex items-center justify-center mb-6">
                  <div className="relative">
                    <Bot className="w-12 h-12 text-cyan-600" />
                    <Settings className="w-5 h-5 text-cyan-600 absolute -bottom-1 -right-1" />
                  </div>
                </div>
                <h2 className="text-2xl font-bold text-slate-800 mb-3">
                  How can I assist your research today?
                </h2>
                <p className="text-sm text-slate-500 text-center max-w-xl">
                  Access standard operating procedures, analyze material safety data sheets, or query the lab's sensor array data.
                </p>
              </div>

              {/* Suggestion Cards */}
              <div className="grid grid-cols-2 gap-4 w-full max-w-3xl">
                {suggestionCards.map((card, index) => {
                  const IconComponent = card.icon;
                  return (
                    <button
                      key={index}
                      onClick={() => setInput(card.description)}
                      className="group p-5 bg-white border border-slate-200/60 rounded-xl hover:border-cyan-300 hover:shadow-md transition-all text-left"
                    >
                      <div className="flex items-start gap-3">
                        <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${card.color} flex items-center justify-center flex-shrink-0`}>
                          <IconComponent className="w-5 h-5 text-white" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h3 className="text-sm font-semibold text-slate-800 mb-1">
                            {card.title}
                          </h3>
                          <p className="text-xs text-slate-500 leading-relaxed">
                            {card.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          ) : (
            // Messages
            <div className="space-y-4">
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
                    {msg.role === 'ai' && msg.source && (
                      <div className="flex items-center gap-1.5 px-2 py-1 bg-slate-50 border border-slate-200/60 rounded-lg">
                        <FileText className="w-3 h-3 text-cyan-500" />
                        <span className="text-[10px] text-slate-600 font-medium">{msg.source}</span>
                        <Badge variant="info" size="sm">{msg.sourceType}</Badge>
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
          )}
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
              placeholder="Message Lab AI Assistant..."
              className="flex-1 text-xs text-slate-700 outline-none placeholder:text-slate-400 bg-transparent"
            />
            <button className="p-1 text-slate-400 hover:text-slate-600 transition-colors">
              <Mic className="w-4 h-4" />
            </button>
            <button
              onClick={sendMessage}
              className="p-1.5 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg hover:shadow-md transition-all disabled:opacity-50"
              disabled={!input.trim()}
            >
              <Send className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
