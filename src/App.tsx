/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo } from 'react';
import { 
  Sparkles, 
  Search, 
  Copy, 
  Check, 
  ChevronRight, 
  Languages, 
  BookOpen, 
  Wand2,
  Github,
  Moon,
  Info
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { GoogleGenAI } from '@google/genai';
import { PROMPT_DATA, PromptItem, Category } from './prompts';

// Initialize Gemini AI
const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

type Language = 'ko' | 'en';

export default function App() {
  const [lang, setLang] = useState<Language>('ko');
  const [activeTab, setActiveTab] = useState<'enhancer' | 'library'>('enhancer');
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [userInput, setUserInput] = useState('');
  const [enhancedResult, setEnhancedResult] = useState('');
  const [isEnhancing, setIsEnhancing] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);

  // Internationalization Helper
  const t = (ko: string, en: string) => (lang === 'ko' ? ko : en);

  // Handle Copy to Clipboard
  const handleCopy = (text: string, id: string) => {
    navigator.clipboard.writeText(text);
    setCopiedId(id);
    setTimeout(() => setCopiedId(null), 2000);
  };

  // Enhance Prompt with Gemini
  const enhancePrompt = async () => {
    if (!userInput.trim()) return;
    setIsEnhancing(true);
    setEnhancedResult('');
    
    try {
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `당신은 전문 프롬프트 엔지니어입니다. 다음의 단순한 요청을 구체적이고 구조적이며 전문적인 프롬프트로 변환해주세요. 
결과물은 반드시 ${lang === 'ko' ? '한국어' : '영어'}로 작성해주세요.
구조: [목표], [맥락], [페르소나], [제약조건], [출력형식]을 포함하는 구체적인 프롬프트여야 합니다.

입력된 단순 요청: "${userInput}"`,
      });

      setEnhancedResult(response.text || '');
    } catch (error) {
      console.error('Enhancement failed:', error);
      setEnhancedResult(t('프롬프트 개선 중 오류가 발생했습니다. 다시 시도해주세요.', 'An error occurred while enhancing the prompt. Please try again.'));
    } finally {
      setIsEnhancing(false);
    }
  };

  // Filter Library Data
  const filteredData = useMemo(() => {
    let data = PROMPT_DATA;
    if (activeCategory) {
      data = data.filter(cat => cat.id === activeCategory);
    }
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      data = data.map(cat => ({
        ...cat,
        prompts: cat.prompts.filter(p => 
          p.content_ko.toLowerCase().includes(lowerSearch) || 
          p.content_en.toLowerCase().includes(lowerSearch) ||
          p.role.toLowerCase().includes(lowerSearch) ||
          p.type.toLowerCase().includes(lowerSearch)
        )
      })).filter(cat => cat.prompts.length > 0);
    }
    return data;
  }, [searchTerm, activeCategory]);

  return (
    <div className="min-h-screen bg-[#050505] text-[#F5F5F0] font-sans selection:bg-[#F27D26] selection:text-white">
      {/* Navigation Rail / Header */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#050505]/80 backdrop-blur-xl border-bottom border-white/10 px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-[#F27D26] rounded-full flex items-center justify-center">
            <Sparkles className="text-white w-6 h-6" />
          </div>
          <h1 className="text-xl font-bold tracking-tight uppercase">Prompt Master <span className="text-[#F27D26]">Pro</span></h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="flex bg-white/5 rounded-full p-1 border border-white/10">
            <button 
              onClick={() => setActiveTab('enhancer')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === 'enhancer' ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}
            >
              {t('AI 인핸서', 'AI Enhancer')}
            </button>
            <button 
              onClick={() => setActiveTab('library')}
              className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${activeTab === 'library' ? 'bg-white text-black' : 'text-white/60 hover:text-white'}`}
            >
              {t('라이브러리', 'Library')}
            </button>
          </div>

          <button 
            onClick={() => setLang(lang === 'ko' ? 'en' : 'ko')}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border border-white/10 hover:bg-white/5 transition-colors text-sm font-medium"
          >
            <Languages className="w-4 h-4 text-[#F27D26]" />
            <span className="uppercase">{lang}</span>
          </button>
        </div>
      </nav>

      {/* Main Content */}
      <main className="pt-24 pb-20 px-6 max-w-5xl mx-auto">
        
        <AnimatePresence mode="wait">
          {activeTab === 'enhancer' ? (
            <motion.section 
              key="enhancer"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12 py-10"
            >
              <div className="space-y-4 text-center">
                <h2 className="text-5xl md:text-7xl font-light tracking-tight leading-tight">
                  {t('단순한 아이디어를', 'Craft Ideas into')} <br />
                  <span className="font-bold underline decoration-[#F27D26] underline-offset-8">
                    {t('전문적인 결과로', 'Professional Prompts')}
                  </span>
                </h2>
                <p className="text-white/40 text-lg max-w-2xl mx-auto">
                  {t('모호한 요청을 AI가 이해하기 쉬운 구조적이고 구체적인 전문 프롬프트로 즉시 변환합니다.', 'Instantly transform vague requests into structured, detailed professional prompts that AI can understand.')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Input Area */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-[#F27D26] flex items-center gap-2">
                      <Wand2 className="w-3 h-3" /> {t('단순 아이디어 입력', 'Simple Idea Input')}
                    </span>
                  </div>
                  <div className="relative group">
                    <textarea 
                      value={userInput}
                      onChange={(e) => setUserInput(e.target.value)}
                      placeholder={t('예: 보고서 요약해줘, 신제품 기획서 써줘', 'e.g. Summarize a report, Write a new product plan')}
                      className="w-full h-64 bg-white/5 border border-white/10 rounded-2xl p-6 text-xl focus:outline-none focus:border-[#F27D26] transition-all resize-none font-light placeholder:text-white/20"
                    />
                    <button 
                      onClick={enhancePrompt}
                      disabled={isEnhancing || !userInput.trim()}
                      className="absolute bottom-4 right-4 bg-[#F27D26] hover:bg-[#ff8e42] disabled:opacity-50 disabled:cursor-not-allowed text-white px-6 py-3 rounded-xl font-bold flex items-center gap-2 transition-all shadow-xl shadow-[#F27D26]/20"
                    >
                      {isEnhancing ? (
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white/30 border-t-white" />
                      ) : (
                        <Sparkles className="w-5 h-5" />
                      )}
                      {t('프롬프트 개선하기', 'Enhance Prompt')}
                    </button>
                  </div>
                </div>

                {/* Output Area */}
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-widest text-white/40 flex items-center gap-2">
                      <Sparkles className="w-3 h-3" /> {t('AI 개선 결과', 'AI Enhanced Result')}
                    </span>
                    {enhancedResult && (
                      <button 
                        onClick={() => handleCopy(enhancedResult, 'enhanced')}
                        className="text-xs font-bold uppercase text-[#F27D26] hover:text-[#ff8e42] transition-colors flex items-center gap-1"
                      >
                        {copiedId === 'enhanced' ? <Check className="w-3 h-3" /> : <Copy className="w-3 h-3" />}
                        {copiedId === 'enhanced' ? t('복사됨', 'Copied') : t('전체 복사', 'Copy All')}
                      </button>
                    )}
                  </div>
                  <div className="w-full h-64 bg-white/[0.02] border border-white/10 rounded-2xl p-6 relative overflow-y-auto overflow-x-hidden custom-scrollbar">
                    {isEnhancing ? (
                      <div className="flex flex-col items-center justify-center h-full gap-4 text-white/20">
                        <div className="animate-pulse w-full h-4 bg-white/5 rounded" />
                        <div className="animate-pulse w-3/4 h-4 bg-white/5 rounded" />
                        <div className="animate-pulse w-full h-4 bg-white/5 rounded" />
                        <div className="animate-pulse w-1/2 h-4 bg-white/5 rounded" />
                      </div>
                    ) : enhancedResult ? (
                      <div className="prose prose-invert max-w-none">
                        <p className="whitespace-pre-wrap leading-relaxed text-white/80">{enhancedResult}</p>
                      </div>
                    ) : (
                      <div className="flex flex-col items-center justify-center h-full text-white/10 italic text-center text-sm px-10">
                        {t('입력된 아이디어를 바탕으로 고도화된 프롬프트가 여기에 생성됩니다.', 'Your enhanced prompt will be generated here based on your input.')}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </motion.section>
          ) : (
            <motion.section 
              key="library"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-8 py-10"
            >
              {/* Search & Categories */}
              <div className="sticky top-20 z-40 bg-[#050505] py-4 space-y-6">
                <div className="relative group">
                  <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-[#F27D26] transition-colors" />
                  <input 
                    type="text" 
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder={t('원하는 프롬프트나 직무를 검색하세요 (예: 보고서, 마케터)', 'Search prompts or roles (e.g. Report, Marketer)')}
                    className="w-full bg-white/5 border border-white/10 rounded-2xl py-5 pl-16 pr-6 text-lg focus:outline-none focus:border-[#F27D26] transition-all placeholder:text-white/20"
                  />
                </div>

                <div className="flex gap-2 overflow-x-auto pb-4 no-scrollbar">
                  <button 
                    onClick={() => setActiveCategory(null)}
                    className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${!activeCategory ? 'bg-white text-black border-white' : 'bg-white/5 text-white/40 border-white/10 hover:border-white/20'}`}
                  >
                    {t('전체', 'All')}
                  </button>
                  {PROMPT_DATA.map(cat => (
                    <button 
                      key={cat.id}
                      onClick={() => setActiveCategory(cat.id)}
                      className={`px-5 py-2.5 rounded-full text-sm font-bold whitespace-nowrap transition-all border ${activeCategory === cat.id ? 'bg-[#F27D26] text-white border-[#F27D26]' : 'bg-white/5 text-white/40 border-white/10 hover:border-white/20'}`}
                    >
                      {t(cat.name_ko, cat.name_en)}
                    </button>
                  ))}
                </div>
              </div>

              {/* Prompt Grid */}
              <div className="space-y-16">
                {filteredData.map(cat => (
                  <div key={cat.id} className="space-y-6">
                    <div className="flex items-center gap-4">
                      <h3 className="text-2xl font-bold tracking-tight">{t(cat.name_ko, cat.name_en)}</h3>
                      <div className="h-px flex-1 bg-white/10" />
                      <span className="text-xs font-mono text-white/20">{cat.prompts.length} PROMPTS</span>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      {cat.prompts.map(prompt => (
                        <motion.div 
                          layout
                          key={prompt.id}
                          className="group bg-white/5 border border-white/10 rounded-2xl p-6 hover:border-[#F27D26]/50 transition-all flex flex-col justify-between"
                        >
                          <div className="space-y-4">
                            <div className="flex items-center justify-between">
                              <span className="text-[10px] font-bold uppercase tracking-widest text-white/20 bg-white/5 px-2 py-1 rounded">#{prompt.id}</span>
                              <div className="flex gap-2">
                                <span className="text-[10px] bg-[#F27D26]/10 text-[#F27D26] font-bold px-2 py-0.5 rounded uppercase tracking-wider">{prompt.role}</span>
                                <span className="text-[10px] bg-white/5 text-white/40 font-bold px-2 py-0.5 rounded uppercase tracking-wider">{prompt.type}</span>
                              </div>
                            </div>
                            <p className="text-lg leading-relaxed text-white/80 font-light line-clamp-4 group-hover:line-clamp-none transition-all">
                              {t(prompt.content_ko, prompt.content_en)}
                            </p>
                          </div>
                          
                          <button 
                            onClick={() => handleCopy(t(prompt.content_ko, prompt.content_en), prompt.id)}
                            className="mt-6 w-full py-3 bg-white/5 hover:bg-white/10 text-white rounded-xl text-sm font-bold flex items-center justify-center gap-2 transition-all border border-white/5"
                          >
                            {copiedId === prompt.id ? (
                              <AnimatePresence mode="wait">
                                <motion.div initial={{ scale: 0.8 }} animate={{ scale: 1 }} className="flex items-center gap-2 text-[#4caf50]">
                                  <Check className="w-4 h-4" /> {t('복사됨!', 'Copied!')}
                                </motion.div>
                              </AnimatePresence>
                            ) : (
                              <>
                                <Copy className="w-4 h-4 text-white/40" /> {t('프롬프트 복사', 'Copy Prompt')}
                              </>
                            )}
                          </button>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                ))}
                {filteredData.length === 0 && (
                  <div className="py-20 text-center space-y-4">
                    <Info className="w-12 h-12 text-white/10 mx-auto" />
                    <p className="text-white/20 italic">{t('검색 결과가 없습니다.', 'No results found.')}</p>
                  </div>
                )}
              </div>
            </motion.section>
          )}
        </AnimatePresence>
      </main>

      {/* Footer */}
      <footer className="border-t border-white/5 py-20 px-6 mt-20">
        <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <Sparkles className="text-[#F27D26] w-6 h-6" />
              <h2 className="text-2xl font-bold uppercase tracking-tight">Prompt Master Pro</h2>
            </div>
            <p className="text-white/40 text-sm max-w-sm">
              {t('비즈니스 생산성 극대화를 위한 전문 프롬프트 큐레이션 및 AI 고도화 플랫폼입니다.', 'A professional prompt curation and AI enhancement platform dedicated to maximizing business productivity.')}
            </p>
          </div>
          <div className="flex flex-col items-start md:items-end gap-2 text-xs font-mono text-white/20 uppercase tracking-widest">
            <span>© 2026 PROMPT MASTER PRO</span>
            <span>POWERED BY GEMINI 3 FLASH</span>
            <div className="flex gap-4 mt-2">
              <a href="#" className="hover:text-white transition-colors">{t('약관', 'Terms')}</a>
              <a href="#" className="hover:text-white transition-colors">{t('개인정보처리방침', 'Privacy')}</a>
            </div>
          </div>
        </div>
      </footer>

      {/* Style Overrides for Scrollbar */}
      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: rgba(255, 255, 255, 0.1);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: rgba(242, 125, 38, 0.5);
        }
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}</style>
    </div>
  );
}
