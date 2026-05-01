/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { 
  Sparkles, 
  Instagram, 
  Facebook, 
  FileText, 
  Hash, 
  Copy, 
  RefreshCw, 
  Check,
  Send,
  Target,
  MessageSquare,
  Video,
  Image,
  Globe
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { generateMarketingContent, type MarketingContent } from "./geminiService";

type ContentTab = "instagram" | "facebook" | "blog" | "hashtags" | "imagePrompt" | "videoScript";

export default function App() {
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("Professional");
  const [language, setLanguage] = useState("English");
  const [isLoading, setIsLoading] = useState(false);
  const [content, setContent] = useState<MarketingContent | null>(null);
  const [activeTab, setActiveTab] = useState<ContentTab>("instagram");
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    if (!productName || !description) return;
    setIsLoading(true);
    try {
      const result = await generateMarketingContent(productName, description, audience, tone, language);
      setContent(result);
    } catch (error) {
      console.error("Generation failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const tabs: { id: ContentTab; label: string; icon: any }[] = [
    { id: "instagram", label: "Instagram", icon: Instagram },
    { id: "facebook", label: "Facebook", icon: Facebook },
    { id: "videoScript", label: "Video Script", icon: Video },
    { id: "imagePrompt", label: "Image Prompt", icon: Image },
    { id: "blog", label: "Blog Post", icon: FileText },
    { id: "hashtags", label: "Hashtags", icon: Hash },
  ];

  return (
    <div className="min-h-screen pb-12">
      {/* Header */}
      <header className="glass-panel sticky top-0 z-10 px-6 py-4 mb-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="p-2 marketing-gradient rounded-lg shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-display font-bold text-xl tracking-tight">AI Smart Content</h1>
          </div>
          <div className="hidden sm:flex items-center gap-4 text-sm text-slate-500 font-medium">
            <span>v1.0 Powered by Gemini</span>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Input Section */}
        <div className="lg:col-span-5 space-y-6">
          <section className="glass-panel p-6 rounded-2xl space-y-6">
            <div>
              <h2 className="font-display font-semibold text-lg flex items-center gap-2 mb-4">
                <Send className="w-4 h-4 text-indigo-600" />
                Product Details
              </h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                    Product Name
                  </label>
                  <input
                    type="text"
                    value={productName}
                    onChange={(e) => setProductName(e.target.value)}
                    placeholder="e.g. Eco-Friendly Water Bottle"
                    className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1">
                    Product Description
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Briefly describe the key features and benefits..."
                    className="w-full h-32 px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none resize-none"
                  />
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1 flex items-center gap-2">
                  <Target className="w-3 h-3" /> Target Audience
                </label>
                <input
                  type="text"
                  value={audience}
                  onChange={(e) => setAudience(e.target.value)}
                  placeholder="e.g. Gen Z"
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-sm"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1 flex items-center gap-2">
                  <MessageSquare className="w-3 h-3" /> Tone
                </label>
                <select
                  value={tone}
                  onChange={(e) => setTone(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-sm appearance-none cursor-pointer"
                >
                  <option>Professional</option>
                  <option>Casual</option>
                  <option>Persuasive</option>
                  <option>Playful</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold text-slate-500 uppercase tracking-wider mb-1.5 ml-1 flex items-center gap-2">
                  <Globe className="w-3 h-3" /> Language
                </label>
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-500/10 transition-all outline-none text-sm appearance-none cursor-pointer"
                >
                  <option>English</option>
                  <option>Swahili</option>
                  <option>French</option>
                  <option>Spanish</option>
                </select>
              </div>
            </div>

            <button
              onClick={handleGenerate}
              disabled={isLoading || !productName || !description}
              className={`w-full py-4 rounded-xl font-bold flex items-center justify-center gap-2 transition-all shadow-lg ${
                isLoading || !productName || !description
                  ? "bg-slate-100 text-slate-400 cursor-not-allowed shadow-none"
                  : "marketing-gradient text-white hover:scale-[1.02] active:scale-[0.98] hover:shadow-indigo-500/25"
              }`}
            >
              {isLoading ? (
                <RefreshCw className="w-5 h-5 animate-spin" />
              ) : (
                <>
                  <Sparkles className="w-5 h-5" />
                  Generate Content
                </>
              )}
            </button>
          </section>
        </div>

        {/* Output Section */}
        <div className="lg:col-span-7">
          <AnimatePresence mode="wait">
            {!content && !isLoading ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="h-full flex flex-col items-center justify-center p-12 text-center space-y-4 rounded-3xl border-2 border-dashed border-slate-200"
              >
                <div className="p-4 bg-slate-100 rounded-full">
                  <FileText className="w-8 h-8 text-slate-400" />
                </div>
                <div>
                  <h3 className="font-display font-semibold text-lg text-slate-900">Your content will appear here</h3>
                  <p className="text-slate-500 max-w-xs mx-auto">Fill in your product details and click generate to see the magic happen.</p>
                </div>
              </motion.div>
            ) : (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                className="glass-panel p-2 rounded-[2rem] overflow-hidden flex flex-col h-full min-h-[500px]"
              >
                {/* Tabs */}
                <div className="flex p-2 gap-1 bg-slate-50/50 rounded-t-[2rem] border-b border-slate-100 mb-4 overflow-x-auto no-scrollbar">
                  {tabs.map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setActiveTab(tab.id)}
                      className={`flex-1 min-w-[120px] flex items-center justify-center gap-2 py-3 px-4 rounded-2xl font-semibold text-sm transition-all ${
                        activeTab === tab.id
                          ? "bg-white text-indigo-600 shadow-sm ring-1 ring-slate-200"
                          : "text-slate-500 hover:bg-white/50 hover:text-slate-800"
                      }`}
                    >
                      <tab.icon className="w-4 h-4" />
                      {tab.label}
                    </button>
                  ))}
                </div>

                {/* Tab Content */}
                <div className="flex-1 p-6 relative">
                  {isLoading ? (
                    <div className="absolute inset-0 flex flex-col items-center justify-center p-12 space-y-6 bg-white/50 backdrop-blur-[2px] z-20">
                      <div className="relative">
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                          className="w-20 h-20 border-4 border-slate-100 border-t-indigo-600 rounded-full"
                        />
                        <Sparkles className="w-8 h-8 text-indigo-500 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
                      </div>
                      <div className="text-center space-y-2">
                        <p className="font-display font-semibold text-xl text-slate-900">Generating Masterpiece...</p>
                        <p className="text-slate-500 text-sm italic">"Good content is not storytelling. It's telling your story well."</p>
                      </div>
                    </div>
                  ) : content && (
                    <motion.div
                      key={activeTab}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="h-full flex flex-col"
                    >
                      <div className="flex-1 bg-slate-50/50 p-8 rounded-2xl border border-slate-100 text-slate-800 text-lg leading-relaxed whitespace-pre-wrap font-medium">
                        {content[activeTab]}
                      </div>
                      
                      <div className="mt-8 flex items-center justify-between">
                        <div className="flex gap-4">
                          <button
                            onClick={() => copyToClipboard(content[activeTab])}
                            className="flex items-center gap-2 px-6 py-3 rounded-xl bg-slate-900 text-white font-semibold hover:bg-slate-800 transition-all active:scale-95 group shadow-lg shadow-slate-900/10"
                          >
                            {copied ? (
                              <>
                                <Check className="w-4 h-4 text-green-400" />
                                Copied!
                              </>
                            ) : (
                              <>
                                <Copy className="w-4 h-4" />
                                Copy to Clipboard
                              </>
                            )}
                          </button>
                        </div>
                        <button
                          onClick={handleGenerate}
                          className="p-3 text-slate-400 hover:text-indigo-600 hover:bg-indigo-50 rounded-xl transition-all"
                          title="Regenerate"
                        >
                          <RefreshCw className="w-6 h-6" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}
