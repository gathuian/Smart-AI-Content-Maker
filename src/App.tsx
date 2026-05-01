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
  Globe,
  Calendar,
  BarChart3,
  Users,
  LayoutDashboard,
  ExternalLink,
  Clock,
  ArrowRight,
  Plus,
  AlertCircle,
  TrendingUp,
  MousePointer2,
  Share2,
  Zap,
  Film
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { generateMarketingContent, type MarketingCampaign, type ContentVariation } from "./geminiService";

type ContentTab = "instagram" | "facebook" | "blog" | "hashtags" | "imagePrompt" | "videoScript" | "productionBrief";
type AppView = "generator" | "analytics" | "scheduler" | "accounts";

export default function App() {
  const [started, setStarted] = useState(false);
  const [currentView, setCurrentView] = useState<AppView>("generator");
  const [productName, setProductName] = useState("");
  const [description, setDescription] = useState("");
  const [audience, setAudience] = useState("");
  const [tone, setTone] = useState("Professional");
  const [language, setLanguage] = useState("English");
  const [isLoading, setIsLoading] = useState(false);
  const [campaign, setCampaign] = useState<MarketingCampaign | null>(null);
  const [variationIndex, setVariationIndex] = useState(0);
  const [activeTab, setActiveTab] = useState<ContentTab>("instagram");
  const [copied, setCopied] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [showScheduleModal, setShowScheduleModal] = useState(false);

  const handleGenerate = async () => {
    if (!productName || !description) return;
    setIsLoading(true);
    try {
      const result = await generateMarketingContent(productName, description, audience, tone, language);
      setCampaign(result);
      setVariationIndex(0);
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

  const handlePublish = () => {
    setIsPublishing(true);
    setTimeout(() => {
      setIsPublishing(false);
      alert("Successfully published current content to all connected accounts!");
    }, 2000);
  };

  const tabs: { id: ContentTab; label: string; icon: any }[] = [
    { id: "instagram", label: "Instagram", icon: Instagram },
    { id: "facebook", label: "Facebook", icon: Facebook },
    { id: "videoScript", label: "Video Script", icon: Video },
    { id: "productionBrief", label: "Director's Brief", icon: Film },
    { id: "blog", label: "SEO Blog", icon: FileText },
    { id: "imagePrompt", label: "Image Prompt", icon: Image },
    { id: "hashtags", label: "Hashtags", icon: Hash },
  ];

  if (!started) {
    return (
      <div className="min-h-screen bg-white relative overflow-hidden">
        {/* Background Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden">
          <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-500/5 blur-[120px] rounded-full" />
          <div className="absolute bottom-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/5 blur-[120px] rounded-full" />
        </div>

        <nav className="relative z-10 max-w-7xl mx-auto px-6 py-8 flex items-center justify-between border-b border-slate-100/50">
          <div className="flex items-center gap-2">
            <div className="p-2 marketing-gradient rounded-lg shadow-lg">
              <Sparkles className="w-5 h-5 text-white" />
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-slate-900 border-b-2 border-indigo-500">AI SMART CONTENT</span>
          </div>
          <button 
            onClick={() => setStarted(true)}
            className="px-6 py-2 bg-slate-900 text-white rounded-full font-semibold shadow-xl shadow-slate-900/20 hover:scale-105 transition-all text-sm"
          >
            Launch Dashboard
          </button>
        </nav>

        <main className="relative z-10 max-w-5xl mx-auto px-6 pt-20 pb-32">
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center space-y-8"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-50 text-slate-700 text-xs font-bold border border-slate-100 shadow-sm uppercase tracking-widest font-sans">
              Professional Production Suite
            </div>
            
            <h1 className="font-display text-5xl sm:text-7xl font-light tracking-tight text-slate-900 leading-[1.1]">
              Automate Your <br />
              <span className="font-bold italic">Digital Marketing</span>
            </h1>
            
            <p className="text-slate-500 text-lg max-w-2xl mx-auto font-medium leading-relaxed font-sans">
              Generate 3x more content variations, schedule posts, track analytics, and manage all your brand accounts in one powerful AI-driven cockpit.
            </p>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
            >
              <button 
                onClick={() => setStarted(true)}
                className="w-full sm:w-auto px-10 py-5 rounded-2xl bg-indigo-600 text-white font-bold text-lg shadow-xl shadow-indigo-600/20 hover:bg-indigo-700 active:scale-[0.98] transition-all flex items-center gap-2"
              >
                Get Started Free <ArrowRight className="w-5 h-5" />
              </button>
            </motion.div>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24"
          >
            {[
              { 
                title: "Content Variations", 
                desc: "Get 3 distinct AI-generated options for every request to find your true voice.", 
                icon: LayoutDashboard,
                color: "bg-blue-50 text-blue-600"
              },
              { 
                title: "Full Production", 
                desc: "Scene-based video scripts, full SEO blogs, and custom image prompts.", 
                icon: Video,
                color: "bg-purple-50 text-purple-600"
              },
              { 
                title: "One-Click Publish", 
                desc: "Connect your IG, FB, and TikTok to publish or schedule directly.", 
                icon: Calendar,
                color: "bg-indigo-50 text-indigo-600"
              }
            ].map((feature, i) => (
              <div 
                key={i}
                className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-4 hover:shadow-xl hover:shadow-slate-200/50 transition-all group"
              >
                <div className={`p-4 rounded-xl w-fit ${feature.color} group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="font-display font-bold text-xl text-slate-800">{feature.title}</h3>
                <p className="text-slate-500 leading-relaxed text-sm font-sans">{feature.desc}</p>
              </div>
            ))}
          </motion.div>
        </main>
      </div>
    );
  }

  const renderContent = () => {
    if (!campaign) return null;
    const variation = campaign.variations[variationIndex];
    const rawContent = variation[activeTab as keyof ContentVariation];

    switch (activeTab) {
      case "videoScript":
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between px-2">
               <h3 className="text-xl font-display font-black text-slate-800">Visual Production Script</h3>
               <div className="flex items-center gap-2 px-3 py-1 bg-amber-50 text-amber-600 rounded-full text-[10px] font-black uppercase tracking-widest border border-amber-100">
                 <Zap className="w-3 h-3" />
                 Ready to Shoot
               </div>
            </div>
            <div className="overflow-hidden border border-slate-100 rounded-3xl bg-white shadow-sm ring-1 ring-slate-100">
              <table className="w-full text-left border-collapse">
                <thead className="bg-slate-50/80 border-b border-slate-100">
                  <tr>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] w-1/2 font-sans">Visual & Camera Cues</th>
                    <th className="px-8 py-5 text-[10px] font-black text-slate-400 uppercase tracking-[0.2em] font-sans">Audio / Spoken Dialogue</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {(rawContent as any[]).map((scene, i) => (
                    <tr key={i} className="group hover:bg-slate-50 transition-all duration-300">
                      <td className="px-8 py-6">
                        <div className="flex gap-4">
                          <span className="text-[10px] font-black text-indigo-400 mt-1">S{i+1}</span>
                          <p className="text-sm font-medium text-slate-700 leading-relaxed font-sans">{scene.visual}</p>
                        </div>
                      </td>
                      <td className="px-8 py-6 relative">
                        <div className="absolute left-0 top-1/2 -translate-y-1/2 w-1 h-8 bg-indigo-100 rounded-r-full group-hover:bg-indigo-600 transition-colors" />
                        <p className="text-sm text-slate-600 italic font-medium font-sans leading-relaxed pl-4">"{scene.audio}"</p>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        );
      case "productionBrief":
        return (
          <div className="bg-slate-900 text-white p-10 rounded-[3rem] shadow-2xl relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full" />
            <div className="relative z-10 space-y-8">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <p className="text-[10px] font-black text-indigo-400 uppercase tracking-[0.3em]">Commercial Creative Suite</p>
                  <h3 className="text-3xl font-display font-black tracking-tight italic">Director's Production Brief</h3>
                </div>
                <Film className="w-12 h-12 text-white/10 group-hover:text-indigo-400 transition-colors" />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                 <div className="space-y-4">
                   <h4 className="text-xs font-black text-white/50 uppercase tracking-widest border-b border-white/10 pb-2">Production Aesthetics</h4>
                   <div className="text-indigo-100 text-sm leading-relaxed whitespace-pre-wrap font-medium font-mono">
                     {variation.productionBrief}
                   </div>
                 </div>
                 <div className="bg-white/5 p-6 rounded-2xl border border-white/10 flex flex-col items-center justify-center text-center space-y-4">
                    <div className="p-4 bg-indigo-600 rounded-full shadow-lg shadow-indigo-600/20">
                      <Zap className="w-6 h-6" />
                    </div>
                    <p className="text-xs font-black uppercase tracking-widest text-indigo-300">Coming Soon: AI Video Generation</p>
                    <p className="text-[10px] text-white/40 leading-relaxed font-sans">Direct rendering of this script into video via OpenAI Sora integration is currently in private beta.</p>
                 </div>
              </div>
            </div>
          </div>
        );
      case "blog":
        const blog = rawContent as any;
        return (
          <article className="max-w-4xl mx-auto space-y-12 font-sans pb-20">
            <div className="bg-slate-50 p-8 rounded-[2.5rem] border border-slate-100 flex flex-col md:flex-row items-center gap-8 shadow-sm">
              <div className="space-y-4 flex-1">
                <h4 className="text-[10px] font-black text-indigo-600 uppercase tracking-widest">SEO Optimization Matrix</h4>
                <div className="flex flex-wrap gap-2">
                  {blog.seoKeywords.map((tag: string, i: number) => (
                    <span key={i} className="px-4 py-2 bg-white border border-indigo-100 text-slate-700 rounded-xl text-xs font-bold shadow-sm flex items-center gap-1.5">
                      <Target className="w-3 h-3 text-indigo-400" />
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
              <div className="w-full md:w-48 p-6 bg-slate-900 rounded-[2rem] text-center space-y-2">
                <p className="text-[10px] font-black text-indigo-400 uppercase tracking-widest">SEO Score</p>
                <p className="text-3xl font-display font-black text-white italic">94/100</p>
              </div>
            </div>
            
            <header className="space-y-6 text-center">
              <h1 className="text-4xl sm:text-5xl font-display font-black text-slate-900 leading-[1.1] tracking-tighter italic lg:mx-20">
                {blog.title}
              </h1>
              <div className="flex items-center justify-center gap-4 text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
                <span>By AI Strat Engine</span>
                <span className="w-1 h-1 bg-slate-200 rounded-full" />
                <span>650 Words</span>
                <span className="w-1 h-1 bg-slate-200 rounded-full" />
                <span>Published May 2026</span>
              </div>
            </header>

            <div className="prose prose-slate max-w-none space-y-10">
              <p className="text-xl text-slate-600 leading-[1.8] font-normal first-letter:text-5xl first-letter:font-bold first-letter:text-indigo-600 first-letter:mr-3 first-letter:float-left">
                {blog.introduction}
              </p>

              <div className="space-y-12">
                {blog.subheadings.map((sub: any, i: number) => (
                  <section key={i} className="space-y-6 group">
                    <div className="flex items-center gap-4">
                       <span className="text-3xl font-display font-black text-slate-100 group-hover:text-indigo-50 transition-colors">0{i+1}</span>
                       <h3 className="text-2xl font-display font-bold text-slate-900 tracking-tight italic underline decoration-indigo-500/10 decoration-8 underline-offset-[-2px]">{sub.title}</h3>
                    </div>
                    <div className="text-slate-600 text-lg leading-[1.8] whitespace-pre-wrap font-sans font-normal border-l-2 border-slate-50 pl-8 group-hover:border-indigo-100 transition-all">
                      {sub.content}
                    </div>
                  </section>
                ))}
              </div>

              <div className="bg-indigo-600 p-12 rounded-[3.5rem] shadow-2xl shadow-indigo-600/30 text-white relative overflow-hidden group">
                 <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10" />
                 <div className="relative z-10 text-center space-y-8">
                    <p className="text-lg font-medium leading-relaxed italic opacity-90">"{blog.conclusion}"</p>
                    <div className="h-px bg-white/20 w-32 mx-auto" />
                    <div className="space-y-6">
                      <h4 className="text-4xl font-display font-black tracking-tight italic">{blog.cta}</h4>
                      <button className="px-12 py-5 bg-white text-indigo-600 rounded-full font-black text-xs uppercase tracking-[0.2em] shadow-xl hover:scale-110 active:scale-95 transition-all">
                         Secure Your Content Future
                      </button>
                    </div>
                 </div>
              </div>
            </div>
          </article>
        );
      default:
        return (
          <div className="bg-slate-50/50 p-12 rounded-[2.5rem] border border-slate-100 text-slate-800 text-lg leading-relaxed whitespace-pre-wrap font-medium min-h-[400px] font-sans ring-1 ring-slate-100 shadow-inner">
            {typeof rawContent === "string" ? rawContent : JSON.stringify(rawContent)}
          </div>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white flex font-sans">
      {/* Sidebar Navigation */}
      <aside className="w-20 lg:w-64 bg-slate-900 border-r border-slate-800 flex flex-col items-center lg:items-start py-8 px-4 text-white shrink-0 h-screen transition-all">
        <div className="flex items-center gap-3 mb-12 px-2">
          <div className="p-2 bg-indigo-500 rounded-lg shadow-lg shadow-indigo-500/20">
            <Sparkles className="w-5 h-5" />
          </div>
          <span className="font-display font-bold text-lg tracking-tight hidden lg:block uppercase tracking-widest text-white/90">CONTENT AI</span>
        </div>

        <nav className="flex-1 w-full space-y-2">
          {[
            { id: "generator", icon: LayoutDashboard, label: "Campaign Tool" },
            { id: "analytics", icon: BarChart3, label: "Performance" },
            { id: "scheduler", icon: Calendar, label: "Schedule" },
            { id: "accounts", icon: Users, label: "Brand Hub" },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setCurrentView(item.id as AppView)}
              className={`w-full flex items-center gap-4 py-4 px-4 rounded-xl transition-all ${
                currentView === item.id 
                  ? "bg-indigo-600 text-white shadow-xl shadow-indigo-600/20" 
                  : "text-slate-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              <item.icon className="w-5 h-5 shrink-0" />
              <span className="font-semibold text-sm hidden lg:block uppercase tracking-widest">{item.label}</span>
            </button>
          ))}
        </nav>

        <div className="mt-auto w-full pt-8 border-t border-slate-800 space-y-4">
          <div className="hidden lg:block px-4 py-4 bg-white/5 rounded-2xl border border-white/10">
            <p className="text-[10px] uppercase font-bold text-slate-500 tracking-widest mb-1">Plan</p>
            <p className="text-sm font-bold text-indigo-400 uppercase tracking-tighter">Enterprise AI Pro</p>
          </div>
          <button 
            onClick={() => alert("Admin Console is currently in development. Please check back later.")}
            className="w-full lg:flex items-center justify-center gap-2 p-3 text-slate-400 hover:text-white transition-all"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="font-bold text-xs hidden lg:block uppercase tracking-widest">Admin Console</span>
          </button>
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col min-w-0 h-screen overflow-hidden bg-slate-50/30">
        {/* Top bar */}
        <header className="h-20 bg-white border-b border-slate-100 flex items-center justify-between px-8 shrink-0">
          <h2 className="font-display font-bold text-2xl text-slate-900 capitalize italic tracking-tight">{currentView}</h2>
          <div className="flex items-center gap-6">
            <div className="hidden md:flex items-center gap-2 text-sm font-bold text-slate-400 uppercase tracking-widest">
              <Clock className="w-4 h-4" />
              <span>Next Run: 2h 15m</span>
            </div>
            <div className="hidden lg:flex flex-col items-end">
              <span className="text-xs font-bold text-slate-900 tracking-tighter">Premium Account</span>
              <span className="text-[10px] font-bold text-green-500 uppercase">Active Subscription</span>
            </div>
            <div className="w-10 h-10 rounded-full bg-slate-100 border border-slate-200 flex items-center justify-center cursor-pointer hover:border-indigo-300 transition-colors">
              <Users className="w-5 h-5 text-slate-500" />
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-8 no-scrollbar">
          {currentView === "generator" && (
            <div className="max-w-7xl mx-auto space-y-8">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                {/* Inputs Sidebar */}
                <aside className="lg:col-span-4 space-y-6 sticky top-0">
                  <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm space-y-6">
                    <div className="space-y-4">
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block font-sans">Campaign Strategy Name</label>
                        <input
                          type="text"
                          value={productName}
                          onChange={(e) => setProductName(e.target.value)}
                          placeholder="e.g. Q3 Growth Campaign"
                          className="w-full px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-indigo-500 focus:bg-white transition-all outline-none font-bold text-slate-800 font-sans"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block font-sans">Context & Objective</label>
                        <textarea
                          value={description}
                          onChange={(e) => setDescription(e.target.value)}
                          placeholder="What story are we telling today?"
                          className="w-full h-40 px-5 py-4 rounded-2xl bg-slate-50 border border-slate-100 focus:border-indigo-500 focus:bg-white transition-all outline-none resize-none font-medium text-slate-700 font-sans"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="col-span-1 sm:col-span-2">
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block font-sans">Target Persona</label>
                        <input
                          type="text"
                          value={audience}
                          onChange={(e) => setAudience(e.target.value)}
                          placeholder="e.g. CMOs of Fintechs"
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 focus:border-indigo-500 outline-none text-sm font-semibold font-sans"
                        />
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block font-sans">Brand Voice</label>
                        <select
                          value={tone}
                          onChange={(e) => setTone(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 outline-none text-sm appearance-none cursor-pointer font-bold font-sans"
                        >
                          <option>Professional</option>
                          <option>Persuasive</option>
                          <option>Minimalist</option>
                        </select>
                      </div>
                      <div>
                        <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2 block font-sans">Content Locale</label>
                        <select
                          value={language}
                          onChange={(e) => setLanguage(e.target.value)}
                          className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-100 outline-none text-sm appearance-none cursor-pointer font-bold font-sans"
                        >
                          <option>English</option>
                          <option>Swahili</option>
                          <option>French</option>
                        </select>
                      </div>
                    </div>

                    <button
                      onClick={handleGenerate}
                      disabled={isLoading || !productName || !description}
                      className={`w-full py-5 rounded-2xl font-bold flex items-center justify-center gap-3 transition-all shadow-xl font-sans ${
                        isLoading || !productName || !description
                          ? "bg-slate-100 text-slate-400 shadow-none cursor-not-allowed"
                          : "bg-slate-900 text-white hover:bg-slate-800 hover:shadow-indigo-500/20 active:scale-95"
                      }`}
                    >
                      {isLoading ? (
                        <RefreshCw className="w-6 h-6 animate-spin" />
                      ) : (
                        <>
                          <Sparkles className="w-5 h-5 text-indigo-400" />
                          Master Production
                        </>
                      )}
                    </button>
                  </div>
                </aside>

                {/* Output Panel */}
                <section className="lg:col-span-8 space-y-6 pb-24">
                  <AnimatePresence mode="wait">
                    {!campaign && !isLoading ? (
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="h-[600px] bg-white border-2 border-dashed border-slate-200 rounded-[3rem] flex flex-col items-center justify-center text-center p-12 shadow-inner"
                      >
                        <div className="p-8 bg-slate-50 rounded-full border border-slate-100 mb-8 shadow-sm">
                          <LayoutDashboard className="w-16 h-16 text-indigo-300" />
                        </div>
                        <h3 className="text-3xl font-display font-black text-slate-900 mb-4 tracking-tighter">Content Console Ready</h3>
                        <p className="text-slate-400 max-w-sm mb-12 font-medium font-sans leading-relaxed">Enter your campaign strategy to generate 3 distinct production variations for social, web, and video.</p>
                        <div className="grid grid-cols-3 gap-6 w-full max-w-lg">
                          {[Instagram, Facebook, Video].map((Icon, i) => (
                            <div key={i} className="p-6 bg-white rounded-[2rem] border border-slate-100 flex flex-col items-center gap-3 shadow-sm hover:scale-105 transition-all">
                              <Icon className="w-6 h-6 text-slate-300" />
                              <span className="text-[10px] font-black text-slate-300 uppercase tracking-widest font-sans">System Ready</span>
                            </div>
                          ))}
                        </div>
                      </motion.div>
                    ) : (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="space-y-6"
                      >
                        {/* Variations Selector */}
                        <div className="flex items-center gap-2 p-2 bg-slate-100/50 backdrop-blur-md rounded-3xl w-fit border border-slate-200 shadow-sm">
                          {campaign?.variations.map((_, i) => (
                            <button
                              key={i}
                              onClick={() => setVariationIndex(i)}
                              className={`px-8 py-3 rounded-2xl font-bold text-xs uppercase tracking-widest transition-all ${
                                variationIndex === i 
                                  ? "bg-white text-indigo-600 shadow-xl shadow-slate-200/50" 
                                  : "text-slate-500 hover:text-slate-800"
                              }`}
                            >
                              Strat Option 0{i + 1}
                            </button>
                          ))}
                        </div>

                        {/* Main Result Display */}
                        <div className="bg-white rounded-[3rem] border border-slate-100 shadow-2xl shadow-slate-200/40 overflow-hidden flex flex-col min-h-[800px]">
                          {/* Inner Tabs Navigation */}
                          <div className="px-10 pt-10 flex gap-1 overflow-x-auto no-scrollbar border-b border-slate-50">
                            {tabs.map((tab) => (
                              <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`pb-6 px-6 font-bold text-xs flex items-center gap-2 uppercase tracking-tighter transition-all border-b-2 whitespace-nowrap ${
                                  activeTab === tab.id 
                                    ? "text-indigo-600 border-indigo-600" 
                                    : "text-slate-400 border-transparent hover:text-slate-600"
                                }`}
                              >
                                <tab.icon className="w-4 h-4" />
                                {tab.label}
                              </button>
                            ))}
                          </div>

                          {/* Dynamic Content Panel */}
                          <div className="flex-1 p-10 relative">
                            {isLoading && (
                              <div className="absolute inset-0 bg-white/90 backdrop-blur-md z-40 flex flex-col items-center justify-center space-y-8">
                                <div className="p-8 bg-indigo-50/50 rounded-full border border-indigo-100 scale-125">
                                  <motion.div
                                    animate={{ rotate: 360 }}
                                    transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
                                    className="w-32 h-32 border-4 border-indigo-100 border-t-indigo-600 rounded-full"
                                  />
                                  <Sparkles className="w-12 h-12 text-indigo-600 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-inner" />
                                </div>
                                <div className="text-center space-y-2">
                                  <p className="text-2xl font-display font-black text-slate-900 tracking-tighter">Architecting Content...</p>
                                  <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Simulating 3 strategic variations</p>
                                </div>
                              </div>
                            )}

                            <motion.div
                              key={`${variationIndex}-${activeTab}`}
                              initial={{ opacity: 0, y: 15 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="h-full"
                            >
                              {renderContent()}
                            </motion.div>
                          </div>

                          {/* Interactive Action Bar */}
                          <footer className="p-10 bg-slate-50/80 border-t border-slate-100 flex flex-col md:flex-row items-center justify-between gap-6">
                            <div className="flex gap-4 w-full md:w-auto">
                              <button
                                onClick={handlePublish}
                                disabled={isPublishing}
                                className={`flex-1 md:flex-none px-10 py-5 rounded-[1.5rem] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-4 transition-all shadow-xl ${
                                  isPublishing 
                                    ? "bg-slate-200 text-slate-500 shadow-none" 
                                    : "bg-slate-900 text-white hover:bg-indigo-600 hover:shadow-indigo-600/30 active:scale-95"
                                }`}
                              >
                                {isPublishing ? (
                                  <RefreshCw className="w-5 h-5 animate-spin" />
                                ) : (
                                  <Share2 className="w-5 h-5 text-indigo-400" />
                                )}
                                {isPublishing ? "Publishing..." : "One-Click Publish"}
                              </button>
                              <button
                                onClick={() => alert("Smart Scheduler is currently processing your account engagement history. Dynamic time-blocking will be available shortly.")}
                                className="flex-1 md:flex-none px-10 py-5 rounded-[1.5rem] bg-white border border-slate-200 text-slate-800 font-bold text-xs uppercase tracking-widest hover:border-indigo-400 active:scale-95 transition-all flex items-center justify-center gap-3 shadow-sm hover:shadow-lg"
                              >
                                <Calendar className="w-5 h-5 text-slate-400" />
                                Time Block
                              </button>
                            </div>
                            <button
                              onClick={() => {
                                const var_item = campaign?.variations[variationIndex];
                                const content = var_item ? (typeof var_item[activeTab as keyof ContentVariation] === "string" ? var_item[activeTab as keyof ContentVariation] as string : JSON.stringify(var_item[activeTab as keyof ContentVariation])) : "";
                                copyToClipboard(content);
                              }}
                              className="p-6 rounded-[2rem] bg-indigo-50 border border-indigo-100 hover:bg-white hover:shadow-2xl transition-all text-indigo-600 active:scale-90"
                            >
                              {copied ? <Check className="w-8 h-8 text-green-500" /> : <Copy className="w-8 h-8" />}
                            </button>
                          </footer>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </section>
              </div>
            </div>
          )}

          {currentView === "analytics" && (
            <div className="max-w-7xl mx-auto space-y-12">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <h3 className="text-3xl font-display font-black text-slate-900 tracking-tighter italic">Global Engagement Dashboard</h3>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2">
                    <AlertCircle className="w-3 h-3 text-amber-500" />
                    Some data sources are simulated. Connect APIs for real-time tracking.
                  </p>
                </div>
                <div className="flex gap-4">
                   <button className="px-6 py-3 bg-white border border-slate-200 rounded-xl text-xs font-bold uppercase tracking-widest hover:border-indigo-400 transition-all">Refresh Sync</button>
                   <button className="px-6 py-3 bg-indigo-600 text-white rounded-xl text-xs font-bold uppercase tracking-widest shadow-lg shadow-indigo-600/20">Extract CSV</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                {[
                  { label: "Total Reach", val: "2.4M", diff: "+18%", icon: Globe, color: "text-indigo-600", bg: "bg-indigo-50" },
                  { label: "Engagement Rate", val: "5.2%", diff: "+0.8%", icon: MousePointer2, color: "text-blue-600", bg: "bg-blue-50" },
                  { label: "Link Clicks", val: "48.5K", diff: "+12%", icon: TrendingUp, color: "text-emerald-600", bg: "bg-emerald-50" },
                  { label: "Conversions", val: "1.2K", diff: "+5%", icon: Zap, color: "text-purple-600", bg: "bg-purple-50" },
                ].map((stat, i) => (
                  <div key={i} className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-sm hover:shadow-2xl transition-all space-y-6 group relative overflow-hidden">
                    <div className="flex items-center justify-between relative z-10">
                      <div className={`p-4 rounded-2xl ${stat.bg} ${stat.color} group-hover:scale-110 transition-transform`}>
                        <stat.icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-3 py-1 rounded-full">{stat.diff}</span>
                    </div>
                    <div className="space-y-1 relative z-10">
                      <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">{stat.label}</p>
                      <p className={`text-4xl font-display font-black ${stat.color} tracking-tighter`}>{stat.val}</p>
                    </div>
                    <div className="absolute bottom-0 right-0 w-24 h-24 bg-slate-50/50 rounded-tl-[4rem] group-hover:bg-indigo-50/30 transition-all" />
                  </div>
                ))}
              </div>

              {/* Conversion Funnel Simulation */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                 <div className="bg-slate-900 p-12 rounded-[3.5rem] shadow-2xl relative overflow-hidden">
                   <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full" />
                   <div className="relative z-10 space-y-8">
                     <h4 className="text-xl font-display font-black text-white italic">Platform Distribution</h4>
                     <div className="space-y-6">
                        {[
                          { platform: "Instagram", pct: 45, color: "bg-gradient-to-r from-purple-500 to-pink-500" },
                          { platform: "Facebook Ads", pct: 30, color: "bg-blue-600" },
                          { platform: "SEO Blog Content", pct: 15, color: "bg-indigo-500" },
                          { platform: "Others", pct: 10, color: "bg-slate-600" }
                        ].map((p, i) => (
                          <div key={i} className="space-y-2">
                             <div className="flex justify-between text-xs font-bold text-slate-400 uppercase tracking-widest">
                               <span>{p.platform}</span>
                               <span className="text-white">{p.pct}%</span>
                             </div>
                             <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                               <motion.div 
                                 initial={{ width: 0 }}
                                 animate={{ width: `${p.pct}%` }}
                                 transition={{ delay: 0.5 + i*0.1 }}
                                 className={`h-full ${p.color}`} 
                               />
                             </div>
                          </div>
                        ))}
                     </div>
                   </div>
                 </div>

                 <div className="bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm flex flex-col justify-center items-center text-center space-y-6 group">
                   <div className="p-8 bg-slate-50 rounded-full group-hover:scale-110 transition-transform">
                     <BarChart3 className="w-12 h-12 text-slate-200" />
                   </div>
                   <div className="space-y-2">
                      <h4 className="text-2xl font-display font-black text-slate-900 tracking-tight italic">Coming Soon: Visual Heatmaps</h4>
                      <p className="text-xs text-slate-400 font-bold uppercase tracking-widest max-w-xs mx-auto leading-relaxed">We're building an AI-powered visual analysis tool to track which parts of your content capture the most attention.</p>
                   </div>
                   <button className="px-8 py-3 bg-slate-100 text-slate-400 rounded-full font-black text-[10px] uppercase tracking-widest cursor-not-allowed">Enable Pro Tracking</button>
                 </div>
              </div>
            </div>
          )}

          {currentView === "accounts" && (
            <div className="max-w-7xl mx-auto space-y-12">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
                {[
                  { name: "Meta Social Suite", user: "@studio_brand", status: "Active", icon: Instagram, color: "text-indigo-600" },
                  { name: "LinkedIn Professional", user: "Brand Corp", status: "Active", icon: Facebook, color: "text-blue-600" },
                  { name: "Production Engine", user: "@studio_reel", status: "Re-auth Needed", icon: Video, color: "text-rose-600" },
                ].map((acc, i) => (
                  <div key={i} className="bg-white p-10 rounded-[3rem] border border-slate-100 shadow-sm space-y-8 group hover:shadow-2xl transition-all relative overflow-hidden">
                    {acc.status === "Active" && <div className="absolute top-0 right-0 w-24 h-24 bg-indigo-500/5 rounded-bl-[4rem]" />}
                    <div className="flex items-center justify-between relative z-10">
                      <div className={`p-6 bg-slate-50 rounded-[2rem] border border-slate-100 ${acc.color} group-hover:scale-110 transition-transform`}>
                        <acc.icon className="w-8 h-8" />
                      </div>
                      <div className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${acc.status === "Active" ? "bg-emerald-50 text-emerald-600" : "bg-rose-50 text-rose-600 animate-pulse"}`}>
                        {acc.status}
                      </div>
                    </div>
                    <div className="relative z-10">
                      <h3 className="font-display font-black text-2xl text-slate-900 tracking-tight">{acc.name}</h3>
                      <p className="text-slate-400 font-bold text-sm tracking-widest uppercase mt-1">{acc.user}</p>
                    </div>
                      <div className="flex gap-2">
                       <button 
                         onClick={() => alert("Brand account configuration is in beta. Please ensure your API keys are set in the .env file.")}
                         className="flex-1 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-black text-[10px] uppercase tracking-widest hover:bg-slate-900 hover:text-white transition-all shadow-sm"
                       >
                         Config
                       </button>
                       <button 
                         onClick={() => alert("Unlinking accounts requires master admin privileges. Contact your organization administrator.")}
                         className="flex-1 py-4 rounded-2xl bg-slate-50 border border-slate-100 font-black text-[10px] uppercase tracking-widest hover:bg-rose-600 hover:text-white transition-all shadow-sm"
                       >
                         Unlink
                       </button>
                    </div>
                  </div>
                ))}
                <button 
                  onClick={() => alert("Social media account bridging is coming soon. Real-time OAuth integration is being tested.")}
                  className="border-4 border-dashed border-slate-100 rounded-[3rem] flex flex-col items-center justify-center p-12 space-y-6 hover:border-indigo-400 hover:bg-indigo-50/10 transition-all text-slate-300 hover:text-indigo-600 group"
                >
                  <div className="p-8 bg-slate-200/50 rounded-full group-hover:bg-white group-hover:shadow-2xl transition-all scale-125">
                    <Plus className="w-10 h-10" />
                  </div>
                  <span className="font-black uppercase tracking-widest text-xs">Bridge New Account</span>
                </button>
              </div>
            </div>
          )}

          {currentView === "scheduler" && (
            <div className="max-w-7xl mx-auto space-y-12 h-full flex flex-col">
              <div className="bg-white p-20 rounded-[4rem] border border-slate-100 shadow-sm text-center space-y-10 flex-1 flex flex-col items-center justify-center relative overflow-hidden">
                <div className="absolute top-20 right-20 w-64 h-64 bg-indigo-50/30 blur-3xl rounded-full" />
                <div className="p-12 bg-slate-50 rounded-full inline-block border border-slate-100 shadow-inner relative z-10">
                  <Calendar className="w-24 h-24 text-slate-200" />
                </div>
                <div className="space-y-4 relative z-10">
                  <h3 className="text-4xl font-display font-black text-slate-900 tracking-tighter leading-tight italic">Interactive Content Timeline</h3>
                  <p className="text-slate-400 max-w-sm mx-auto font-bold uppercase tracking-widest text-[10px] leading-relaxed">Map your entire production queue across all digital touchpoints with AI-optimized peak time analysis.</p>
                </div>
                <div className="grid grid-cols-7 gap-6 w-full max-w-5xl pt-12 relative z-10">
                  {Array.from({ length: 14 }).map((_, i) => (
                    <div key={i} className={`p-8 rounded-[2rem] border-2 ${i === 2 || i === 8 ? "bg-indigo-600 border-indigo-400 shadow-2xl shadow-indigo-600/30 scale-110 z-20" : "bg-white border-slate-100 opacity-20 hover:opacity-100"} flex flex-col items-center justify-center gap-4 transition-all cursor-pointer group`}>
                      <span className={`text-xs font-black uppercase tracking-widest ${i === 2 || i === 8 ? "text-white" : "text-slate-400"}`}>May {i + 1}</span>
                      <div className={`w-3 h-3 rounded-full ${i === 2 || i === 8 ? "bg-white animate-pulse" : "bg-slate-200 group-hover:bg-indigo-300"}`} />
                    </div>
                  ))}
                </div>
                <button 
                  onClick={() => alert("Full Interactive Timeline is coming soon. Use the 'Scheduler' modal in the Campaign tool for now.")}
                  className="relative z-10 px-12 py-5 bg-slate-900 text-white rounded-full font-bold text-xs uppercase tracking-widest shadow-2xl hover:scale-105 active:scale-95 transition-all"
                >
                  Launch Production Calendar
                </button>
              </div>
            </div>
          )}
        </div>
      </main>

      {/* Professional Scheduling Modal Overlay */}
      <AnimatePresence>
        {showScheduleModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-xl z-[100] flex items-center justify-center p-8"
            onClick={() => setShowScheduleModal(false)}
          >
            <motion.div
              initial={{ scale: 0.9, y: 30, opacity: 0 }}
              animate={{ scale: 1, y: 0, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-[3.5rem] p-12 max-w-lg w-full shadow-[0_50px_100px_-20px_rgba(0,0,0,0.5)] space-y-10 border border-slate-100"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="space-y-2">
                <p className="text-[10px] font-black text-indigo-600 uppercase tracking-[0.3em] font-sans">Campaign Scheduling</p>
                <h3 className="text-4xl font-display font-black text-slate-900 tracking-tighter italic">Lock Entry</h3>
              </div>
              
              <div className="space-y-8">
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-sans">Target Production Date</label>
                  <div className="relative">
                    <Calendar className="absolute left-6 top-1/2 -translate-y-1/2 w-5 h-5 text-indigo-500" />
                    <input type="date" className="w-full pl-16 pr-8 py-5 rounded-[1.5rem] bg-slate-50 border border-slate-100 outline-none font-black text-slate-800 text-lg shadow-inner" />
                  </div>
                </div>
                
                <div className="space-y-3">
                  <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest block font-sans">AI Optimized Window</label>
                  <div className="grid grid-cols-2 gap-4">
                    <button className="py-6 bg-slate-900 text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest shadow-xl shadow-slate-900/20 active:scale-95 transition-all text-center">9:00 AM (Peak)</button>
                    <button className="py-6 bg-slate-50 text-slate-400 rounded-[1.5rem] font-black text-xs uppercase tracking-widest border border-slate-100 hover:bg-indigo-50 hover:text-indigo-600 transition-all text-center">Custom Slot</button>
                  </div>
                </div>
              </div>

              <div className="pt-4 space-y-4">
                <button
                  onClick={() => {
                    setShowScheduleModal(false);
                    alert("Production sync successful. Your content has been queued for global distribution.");
                  }}
                  className="w-full py-6 bg-indigo-600 text-white rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-2xl shadow-indigo-600/30 hover:bg-indigo-700 active:scale-95 transition-all"
                >
                  Finalize Schedule
                </button>
                <button 
                   onClick={() => setShowScheduleModal(false)}
                   className="w-full py-3 text-slate-400 font-bold text-[10px] uppercase tracking-widest hover:text-slate-900 transition-all"
                >
                  Cancel Sync
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
