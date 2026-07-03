import { useState } from 'react';
import { Bot, Send, Sparkles, TrendingDown, Shield, FileWarning } from 'lucide-react';
import { Card } from '../ui/card';
import { Badge } from '../ui/badge';

export function SecurityCopilot() {
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: 'Hello! I\'m your AI Security Copilot. I can help you with:\n\n• Analyzing vulnerable models\n• Explaining failed security checks\n• Generating compliance reports\n• Recommending remediation actions\n• Investigating runtime incidents\n\nWhat would you like to know?',
      timestamp: new Date()
    }
  ]);

  const suggestions = [
    { icon: TrendingDown, text: 'Show me all vulnerable models', color: 'text-red-600' },
    { icon: Shield, text: 'Explain the latest failed security check', color: 'text-amber-600' },
    { icon: FileWarning, text: 'Generate compliance report for ISO 42001', color: 'text-cyan-600' },
    { icon: Sparkles, text: 'Recommend actions for high-risk incidents', color: 'text-purple-600' }
  ];

  const handleSend = () => {
    if (!input.trim()) return;

    setMessages([
      ...messages,
      {
        role: 'user',
        content: input,
        timestamp: new Date()
      },
      {
        role: 'assistant',
        content: 'I\'ve analyzed your request. Here are the findings:\n\n**Vulnerable Models Found: 8**\n\n1. `customer-sentiment-llm` - Jailbreak vulnerability (Risk: High)\n2. `fraud-detection-v2` - Model extraction risk (Risk: Medium)\n3. `image-classifier-prod` - Adversarial robustness below threshold (Risk: High)\n\nWould you like me to provide detailed remediation steps for any of these?',
        timestamp: new Date()
      }
    ]);
    setInput('');
  };

  const handleSuggestion = (text: string) => {
    setInput(text);
  };

  return (
    <div className="p-6 h-full flex flex-col min-h-full">
      <div className="mb-6">
        <h2 className="text-lg font-bold text-slate-800 mb-1">Security Copilot</h2>
        <p className="text-xs text-slate-600">AI-powered security assistance and guidance</p>
      </div>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 gap-4 min-h-0">
        {/* Chat Interface */}
        <div className="lg:col-span-2 flex flex-col min-h-0">
          <Card title="" className="flex-1 flex flex-col min-h-0">
            {/* Messages */}
            <div className="flex-1 overflow-y-auto mb-4 space-y-4 min-h-0">
              {messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] rounded-lg p-3 ${
                      message.role === 'user'
                        ? 'bg-cyan-600 text-white'
                        : 'bg-slate-100 text-slate-900'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="flex items-center gap-2 mb-1.5">
                        <Bot className="w-3.5 h-3.5 text-cyan-600" />
                        <span className="font-medium text-xs text-cyan-600">Security Copilot</span>
                      </div>
                    )}
                    <div className="whitespace-pre-wrap text-xs">{message.content}</div>
                    <div className={`text-[10px] mt-1.5 ${
                      message.role === 'user' ? 'text-cyan-100' : 'text-slate-500'
                    }`}>
                      {message.timestamp.toLocaleTimeString()}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="border-t border-slate-200 pt-4">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about security issues, compliance, or incidents..."
                  className="flex-1 px-4 py-2 text-sm border border-slate-300/60 rounded-lg focus:outline-none focus:ring-2 focus:ring-cyan-500 focus:border-transparent bg-white/70 backdrop-blur-sm"
                />
                <button
                  onClick={handleSend}
                  className="px-4 py-2 bg-gradient-to-r from-cyan-500 to-cyan-600 text-white rounded-lg hover:shadow-md transition-all duration-200 font-medium flex items-center gap-2 text-xs"
                >
                  <Send className="w-3.5 h-3.5" />
                  Send
                </button>
              </div>
            </div>
          </Card>
        </div>

        {/* Suggestions & Quick Actions */}
        <div className="flex flex-col gap-4">
          <Card title="Quick Suggestions">
            <div className="space-y-2.5">
              {suggestions.map((suggestion, index) => (
                <button
                  key={index}
                  onClick={() => handleSuggestion(suggestion.text)}
                  className="w-full p-2.5 text-left bg-slate-50/60 hover:bg-slate-100 rounded-lg border border-slate-200/60 hover:border-cyan-300 transition-all"
                >
                  <div className="flex items-start gap-2.5">
                    <suggestion.icon className={`w-4 h-4 mt-0.5 ${suggestion.color}`} />
                    <span className="text-xs text-slate-700">{suggestion.text}</span>
                  </div>
                </button>
              ))}
            </div>
          </Card>

          <Card title="Recent Activity">
            <div className="space-y-2.5">
              <div className="p-2.5 bg-red-50/60 rounded-lg border border-red-200/60">
                <div className="flex items-center gap-2 mb-0.5">
                  <div className="w-1.5 h-1.5 bg-red-500 rounded-full"></div>
                  <span className="text-xs font-medium text-red-900">Critical Alert</span>
                </div>
                <p className="text-[10px] text-red-700">8 models with high vulnerabilities</p>
              </div>

              <div className="p-2.5 bg-amber-50/60 rounded-lg border border-amber-200/60">
                <div className="flex items-center gap-2 mb-0.5">
                  <div className="w-1.5 h-1.5 bg-amber-500 rounded-full"></div>
                  <span className="text-xs font-medium text-amber-900">Warning</span>
                </div>
                <p className="text-[10px] text-amber-700">12 assets pending compliance review</p>
              </div>

              <div className="p-2.5 bg-cyan-50/60 rounded-lg border border-cyan-200/60">
                <div className="flex items-center gap-2 mb-0.5">
                  <div className="w-1.5 h-1.5 bg-cyan-500 rounded-full"></div>
                  <span className="text-xs font-medium text-cyan-900">Info</span>
                </div>
                <p className="text-[10px] text-cyan-700">546 threats blocked in last 24h</p>
              </div>
            </div>
          </Card>

          <Card title="Copilot Status">
            <div className="space-y-2.5">
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-700">AI Model</span>
                <Badge variant="success" size="sm">Active</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-700">Knowledge Base</span>
                <Badge variant="success" size="sm">Updated</Badge>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-700">Response Time</span>
                <span className="text-xs font-medium text-slate-900">~2.3s</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-xs text-slate-700">Queries Today</span>
                <span className="text-xs font-medium text-slate-900">127</span>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
