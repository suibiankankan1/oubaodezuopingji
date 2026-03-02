import React, { useState, useEffect, useRef } from 'react';
import { Heart, Star, X, Minimize, Maximize, Play, Battery, Zap, Sparkles, Gamepad2, Cloud, Music, Coffee, Clock, ChevronRight, ChevronLeft, Download, Mail, Twitter, Instagram, Camera, Car, Globe, ArrowUpRight, Crosshair, Disc, Film, Image as ImageIcon, Palette, Calculator, MonitorPlay, FileText } from 'lucide-react';

// --- Types ---

interface Project {
  id: number;
  title: string;
  modalTitle?: string; // Title to display in the modal, overrides title if present
  category: string;
  company?: string; // Added to distinguish between Role (category) and Company (modal tag)
  image?: string;
  description: string;
  details?: string;
  year: string;
  type: 'work' | 'timeline';
  link?: string;
}

// --- Constants ---

const PROJECTS: Project[] = [
  {
    id: 1,
    title: "项目参与内容",
    modalTitle: "《声生不息》&《歌手2025》",
    category: "Variety",
    image: "https://raw.githubusercontent.com/suibiankankan1/oubaodezuopingji/c1e5bbbadf2c271294762f9081bfff9484a05a79/IMG_7159.JPG",
    description: "先导片/宣传片/人物小片",
    details: "点击下方即可跳转观看",
    year: "2025",
    type: 'work',
    link: "https://my.feishu.cn/wiki/ZIVGwiB53iQuK2kLkvccbaDNnNh?from=from_copylink"
  },
  {
    id: 2,
    title: "新媒体账号运营",
    category: "",
    image: "https://raw.githubusercontent.com/suibiankankan1/oubaodezuopingji/54295d00ff1c300b8f52d5c63e365fc401414ec1/ScreenShot_2026-03-02_230601_489.png",
    description: "有着多种账号的运营经验",
    details: "点进查看视频作品",
    year: "",
    type: 'work',
    link: "https://my.feishu.cn/wiki/ZIVGwiB53iQuK2kLkvccbaDNnNh?from=from_copylink"
  },
  {
    id: 3,
    title: "摄影作品集",
    category: "",
    image: "https://raw.githubusercontent.com/suibiankankan1/oubaodezuopingji/df39ff2d2dd65ffd68f37fa97c56e4d7db740d3a/ScreenShot_2026-03-02_230054_604.png",
    description: "擅长摄影及视频拍摄",
    details: "点进查看作品",
    year: "",
    type: 'work',
    link: "https://my.feishu.cn/wiki/W5Ssw8O6yiwbDBkI7yscOMbmnKb?from=from_copylink"
  },

  {
    id: 5,
    title: "个人作品",
    category: "",
    image: "https://raw.githubusercontent.com/suibiankankan1/oubaodezuopingji/8e3fd6149726c9776da17d48981ebc985ea45749/ScreenShot_2026-03-02_231614_776.png",
    description: "在校期间自己创作作品等",
    details: "点击查看具体作品",
    year: "",
    type: 'work',
    link: "https://my.feishu.cn/wiki/ZIVGwiB53iQuK2kLkvccbaDNnNh?from=from_copylink"
  },
  {
    id: 6,
    title: "Pixel Love",
    category: "Commercial",
    image: "https://picsum.photos/seed/pixel/400/400",
    description: "A cute 8-bit style commercial for a new bubble tea brand.",
    year: "2023",
    type: 'work'
  },
];

const TIMELINE_DATA: Project[] = [
  {
    id: 101,
    year: "2025.10-2026.02",
    title: "《声生不息·华流季》",
    category: "编剧组实习",
    company: "芒果TV",
    description: "参与先导片、台本、小片制作等工作",
    details: "·先导片撰稿：全程参与先导片创作从选题构思到最终成稿，根据需求进行采访人物的邀约以及先导片旁白的文案的写作，还有成片的勘误；\n\n·台本创作：负责主持人的全流程台本撰写，包括开场致辞串场词及互动环节在内的所有内容稿，精准把控语言风格与节目氛围与广告植入；\n\n·前期策划：参与公演主题策划，根据主题寻找契合的海外拍摄对象进行联络沟通并梳理人物故事线，为外拍团队提供清晰的拍摄方向；\n\n·后期协助：协助后期制作，通过梳理海量拍摄素材构建清晰逻辑整理出详细的剪辑本，提供相关资料辅助剪辑师完成剪辑；",
    type: 'timeline'
  },
  {
    id: 102,
    year: "2025.04-2025.08",
    title: "《歌手2025》",
    category: "编剧组实习",
    company: "芒果TV",
    description: "参与歌手小片、小屏台本策划执行、总决赛宣传片文案",
    details: "·台本创作：独立负责小屏直播台本的撰写，结合网络实时热点策划互动话题，不仅保证了直播流程顺畅还制造了多个高热度讨论点；\n\n·小片撰写：辅助创作歌手人物小片，根据歌手的选曲意图和个人表达梳理故事线，撰写情感扎实的人物小片脚本；撰写总决赛宣传片文案并负责相关核心素材的整理与提炼；\n\n·策划与执行：参与全季13期的小屏直播策划，重点负责游戏环节的规则设计内部测试及物料制作，确保环节可执行性跟进全季；现场录制担任现场场记负责具体环节的现场调度与流程把控确保录制按台本推进；\n\n·后期辅助：撰写后期剪辑本正片内容加更会员专享，整理录制素材为后期剪辑提供清晰的故事逻辑和素材索引；",
    type: 'timeline'
  },
   {
    id: 103,
    year: "2025.01-2025.03",
    title: "哇唧唧哇",
    category: "节目很2工作室-策划方向实习",
    description: "策划向实习",
    details: "·前期策划与撰稿：撰写旅综真人秀的踩点调研方案与内容框架制定详细的踩点计划为拍摄选址提供依据和素材；参与搭建B站《毕业歌会》的晚会主题框架和撰稿；\n\n·选角导演：针对参与旅综素人嘉宾的全网海搜，根据节目调性精准筛选目标人物通过深入采访撰写人物小传，挖掘素人身上的故事亮点与综艺潜质。参与《毕业歌会》中大学生合作节目的人物的筛选；",
    type: 'timeline'
  },
  {
    id: 104,
    year: "2024.07-2024.09",
    title: "《花儿绽放·乡村季》",
    category: "编剧组实习",
    company: "湖南卫视",
    description: "参与素人选手人物线设计、艺人人物线设计等",
    details: "·人物故事策划：参与选手和艺人的长线故事设计，通过深入沟通挖掘她们身上的性格闪光点，规划她们在整季节目中的成长路径和人设定位；\n\n·后期叙事：落地负责后期阶段的故事线梳理，通过整理场记和筛选素材撰写后期剪辑台本，确保前期设计的人物形象在成片中准确呈现；\n\n·环节创意：参与节目具体环节的策划搜集并整理国内外优秀的创意案例，为导演组提供灵感参考；",
    type: 'timeline'
  }
];

const OTHER_EXPERIENCE_DATA: Project[] = [
  {
    id: 201,
    year: "", // Removed year
    title: "个人账号",
    category: "", // Removed category
    image: "https://raw.githubusercontent.com/suibiankankan1/oubaodezuopingji/3b950f474ede507f29f87e2b8e098cf033625cec/f5c648be6b1d361a6b271477416948d0.jpg", 
    description: "抖音娱乐向账号「随便看看」\n从0-1起号相比同类账号数据领先",
    details: "· 账号类型：抖音娱乐向\n· 账号名称：「随便看看」\n· 核心成果：从0-1起号，相比同类账号数据领先，成功构建私域流量池。",
    type: 'timeline'
  },
  {
    id: 202,
    year: "", // Removed year
    title: "两米兔工作室",
    category: "", // Removed category
    image: "https://raw.githubusercontent.com/suibiankankan1/oubaodezuopingji/b251936ab826eb828849c1d12c033b488c6e50a8/ScreenShot_2026-03-02_224044_386.png",
    description: "负责IP账号运营和选题策划、社群运营",
    details: "· 核心职责：负责IP账号的整体运营策略与选题策划。\n· 社群运营：建立并维护核心用户群，制定社群互动机制，有效提升粉丝粘性与活跃度。",
    type: 'timeline'
  }
];

// --- Helper Components ---

// 1. Moving Aurora Background
const AuroraBackground = () => {
  return (
    <div className="fixed inset-0 w-full h-full -z-20 overflow-hidden bg-holo-white">
      {/* Soft Moving Orbs */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-holo-pink/30 rounded-full blur-[100px] animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-[400px] h-[400px] bg-holo-blue/30 rounded-full blur-[100px] animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-holo-purple/30 rounded-full blur-[100px] animate-blob animation-delay-4000"></div>
      
      {/* Subtle Grid - White/Glass style */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]"></div>
    </div>
  );
};

// 2. Custom Cursor
const CustomCursor = () => {
  const cursorRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };
    window.addEventListener('mousemove', moveCursor);
    return () => window.removeEventListener('mousemove', moveCursor);
  }, []);

  return (
    <div 
      ref={cursorRef} 
      className="fixed top-0 left-0 pointer-events-none z-[100] mix-blend-difference"
      style={{ marginLeft: '-8px', marginTop: '-8px' }}
    >
      <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_10px_#fff]"></div>
    </div>
  );
};

// 3. Floating Decorations (New Component)
const FloatingDecor = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        {/* HUD Elements - Crosshairs */}
        <div className="absolute top-24 left-8 text-gray-300 opacity-50">+</div>
        <div className="absolute top-24 right-8 text-gray-300 opacity-50">+</div>
        <div className="absolute bottom-12 left-8 text-gray-300 opacity-50">+</div>
        <div className="absolute bottom-12 right-8 text-gray-300 opacity-50">+</div>
        
        {/* Vertical Lines */}
        <div className="absolute top-0 bottom-0 left-12 w-px bg-gray-200/50 hidden md:block"></div>
        <div className="absolute top-0 bottom-0 right-12 w-px bg-gray-200/50 hidden md:block"></div>

        {/* Floating Icons (Glossy Stickers) */}
        <div className="absolute top-[15%] left-[5%] animate-float">
            <Heart size={32} className="text-holo-pink drop-shadow-[0_4px_4px_rgba(255,157,226,0.3)] rotate-[-15deg] fill-holo-pink/20" />
        </div>
        
        <div className="absolute top-[40%] right-[3%] animate-float-delayed">
            <Sparkles size={40} className="text-holo-blue drop-shadow-[0_4px_8px_rgba(139,233,253,0.3)] rotate-[10deg] fill-white/40" />
        </div>

        <div className="absolute bottom-[20%] left-[8%] animate-float">
            <Music size={28} className="text-holo-purple drop-shadow-[0_4px_4px_rgba(189,147,249,0.3)] rotate-[-10deg]" />
        </div>

        <div className="absolute bottom-[30%] right-[10%] animate-spin-slow opacity-60">
             <Disc size={64} className="text-gray-300/50" />
        </div>
        
        {/* Big Background Typography */}
        <div className="absolute top-[30%] left-[-2%] font-serif italic text-[10rem] text-gray-100 -rotate-90 pointer-events-none opacity-50 hidden md:block select-none">
            Dream
        </div>
    </div>
  )
}


// 4. Glass Modal
const GlassModal: React.FC<{ isOpen: boolean; onClose: () => void; item: Project | null }> = ({ isOpen, onClose, item }) => {
    if (!isOpen || !item) return null;
    const isTimeline = item.type === 'timeline';

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/20 backdrop-blur-md p-4 animate-in fade-in duration-200">
            <div className="bg-white/70 backdrop-blur-xl border border-white/60 rounded-3xl shadow-glass w-full max-w-2xl overflow-hidden relative">
                {/* Close Button */}
                <button onClick={onClose} className="absolute top-4 right-4 p-2 rounded-full hover:bg-black/5 transition-colors z-10">
                    <X size={20} className="text-gray-500" />
                </button>

                <div className="p-8 md:p-10 flex flex-col md:flex-row gap-8">
                    {/* Image Side */}
                    {item.image && (
                        <div className="w-full md:w-5/12 shrink-0">
                            <div className="aspect-[3/4] rounded-2xl overflow-hidden shadow-lg border border-white">
                                <img src={item.image} alt={item.title} className="w-full h-full object-cover hover:scale-105 transition-transform duration-700" />
                            </div>
                        </div>
                    )}

                    {/* Content Side */}
                    <div className="flex-1 max-h-[70vh] overflow-y-auto custom-scrollbar">
                        <div className="flex items-center gap-3 mb-4">
                            {item.year && (
                                <span className="px-3 py-1 rounded-full border border-black/10 bg-white/50 text-xs font-sans tracking-widest uppercase">{item.year}</span>
                            )}
                            {(item.company || item.category) && (
                                <span className="px-3 py-1 rounded-full border border-holo-blue/30 bg-holo-blue/10 text-holo-blue text-xs font-sans tracking-widest uppercase">
                                    {item.company || item.category}
                                </span>
                            )}
                        </div>
                        
                        <h2 className="text-3xl md:text-4xl font-serif font-medium text-gray-900 mb-4 italic">
                            {item.modalTitle || item.title}
                        </h2>

                        <div className="prose prose-sm text-gray-600 font-sans leading-relaxed">
                            <p className="font-medium text-gray-800 mb-4 whitespace-pre-line">{item.description}</p>
                            <div className="space-y-4">
                                {item.details ? item.details.split('\n\n').map((paragraph, idx) => {
                                    // Basic parser: if line has '：', bold the part before it.
                                    const colonIndex = paragraph.indexOf('：');
                                    if (colonIndex !== -1) {
                                        const title = paragraph.substring(0, colonIndex + 1);
                                        const content = paragraph.substring(colonIndex + 1);
                                        return (
                                            <div key={idx}>
                                                <span className="font-bold text-gray-900">{title}</span>
                                                <span className="whitespace-pre-line">{content}</span>
                                            </div>
                                        );
                                    }
                                    return <div key={idx} className="whitespace-pre-line">{paragraph}</div>;
                                }) : "More details coming soon..."}
                            </div>
                        </div>
                        
                        {!isTimeline && (
                            <div className="mt-8 flex gap-4">
                                <a 
                                    href={item.link || "#"} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="px-6 py-2 bg-black text-white rounded-full font-sans text-sm hover:bg-gray-800 transition-colors flex items-center gap-2"
                                >
                                    View Project <ArrowUpRight size={14} />
                                </a>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

// 5. Hero Section (High-End Editorial Style)
const HeroSection = () => {
    return (
        <div className="relative w-full max-w-7xl mx-auto h-[500px] md:h-[650px] flex flex-col items-center justify-center select-none z-10">
             
             {/* Floating Abstract Elements */}
             <div className="absolute top-1/4 left-10 md:left-32 animate-float">
                 <div className="w-16 h-16 rounded-full border border-holo-pink/50 backdrop-blur-sm bg-white/10 flex items-center justify-center shadow-glow">
                    <Star className="text-holo-pink w-6 h-6 fill-holo-pink/20" />
                 </div>
             </div>
             <div className="absolute bottom-1/4 right-10 md:right-32 animate-float-delayed">
                <div className="w-24 h-24 rounded-full border border-holo-blue/50 backdrop-blur-sm bg-white/10 flex items-center justify-center shadow-glass">
                    <Globe className="text-holo-blue w-8 h-8 opacity-60" />
                </div>
             </div>
             
             {/* REC indicator */}
             <div className="absolute top-4 right-8 md:right-24 flex items-center gap-2 animate-pulse-slow">
                <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                <span className="font-mono text-xs text-red-500 tracking-widest">REC</span>
             </div>

             {/* Main Typography Group */}
             <div className="relative z-20 flex flex-col items-center justify-center text-center mix-blend-darken">
                 
                 {/* Top Label - Handwritten Accent */}
                 <div className="absolute -top-12 md:-top-16 left-1/2 -translate-x-1/2 transform -rotate-6">
                     <span className="font-hand text-3xl md:text-5xl text-gray-800 tracking-wide text-glow">Hi, I'm</span>
                     <Sparkles className="inline-block ml-2 w-6 h-6 text-holo-pink animate-pulse" />
                 </div>

                 {/* Name - Metallic Gradient Look */}
                 <div className="flex flex-col items-center leading-[0.85] tracking-tighter">
                     <h1 className="font-serif italic font-black text-[15vw] md:text-[160px] text-transparent bg-clip-text bg-gradient-to-b from-gray-400 via-gray-600 to-gray-800 drop-shadow-xl z-20">
                        OUYANG
                     </h1>
                     <h1 className="font-serif italic font-black text-[15vw] md:text-[160px] text-transparent bg-clip-text bg-gradient-to-b from-gray-300 via-gray-500 to-gray-700 drop-shadow-xl z-20 ml-0 md:ml-[200px]">
                        HUILING
                     </h1>
                 </div>
                 
                 {/* Integrated Portfolio Pill */}
                 <div className="mt-8 md:mt-12 backdrop-blur-md bg-white/30 border border-white/60 px-8 py-3 rounded-full shadow-glass hover:scale-105 transition-transform cursor-default">
                     <span className="font-pixel text-base md:text-lg text-gray-800 flex items-center gap-4 tracking-widest">
                         <Star size={14} className="text-holo-pink fill-holo-pink" />
                         个人作品集
                         <Star size={14} className="text-holo-blue fill-holo-blue" />
                     </span>
                 </div>
             </div>
        </div>
    );
}

// 6. Ticker (Clean Glass Style)
const GlassTicker = () => {
    return (
        <div className="w-full bg-white/30 backdrop-blur-md border-y border-white/40 overflow-hidden py-3 mb-10 relative">
             <div className="animate-marquee whitespace-nowrap flex gap-16 items-center">
                 {[...Array(6)].map((_, i) => (
                     <React.Fragment key={i}>
                         <span className="text-gray-500 font-sans text-xs tracking-[0.2em] uppercase">Visual Design</span>
                         <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                         <span className="text-gray-800 font-serif italic text-lg">Creative Direction</span>
                         <span className="w-1 h-1 bg-gray-400 rounded-full"></span>
                         <span className="text-holo-pink font-sans text-xs tracking-[0.2em] uppercase">Storytelling</span>
                         <Star size={12} className="text-holo-blue" fill="currentColor" />
                     </React.Fragment>
                 ))}
             </div>
        </div>
    )
}

// 7. WeChat Icon Component
const WeChatIcon = ({ size = 18, className = "" }: { size?: number, className?: string }) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className} xmlns="http://www.w3.org/2000/svg">
        <path d="M17.5,10c-3.03,0-5.5,2.01-5.5,4.5c0,1.4,0.81,2.64,2.06,3.43l-0.56,1.68l1.93-0.96c0.66,0.22,1.37,0.35,2.1,0.35c3.03,0,5.5-2.01,5.5-4.5S20.53,10,17.5,10z M6.5,4C2.91,4,0,6.69,0,10c0,2.09,1.17,3.93,2.97,5.06L2.2,18l2.76-1.38C5.46,16.88,6,17,6.5,17c0.17,0,0.33-0.01,0.5-0.02c-0.09-0.49-0.15-0.99-0.15-1.5c0-3.59,3.13-6.5,7-6.5c0.6,0,1.18,0.07,1.74,0.2C15.16,6.06,11.23,4,6.5,4z"/>
    </svg>
);

// --- Main App Component ---

const App: React.FC = () => {
    const [selectedProject, setSelectedProject] = useState<Project | null>(null);
    const [workPage, setWorkPage] = useState(0);
    const [showEmail, setShowEmail] = useState(false);
    const [showWeChat, setShowWeChat] = useState(false);

    const scrollToSection = (id: string) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    // Work Page Logic
    const ITEMS_PER_PAGE = 4; // Increased for smaller cards
    const totalWorkPages = Math.ceil(PROJECTS.length / ITEMS_PER_PAGE);

    const nextWorkPage = () => {
        setWorkPage((prev) => (prev + 1) % totalWorkPages);
    };

    const prevWorkPage = () => {
        setWorkPage((prev) => (prev - 1 + totalWorkPages) % totalWorkPages);
    };

    const visibleProjects = PROJECTS.slice(workPage * ITEMS_PER_PAGE, (workPage + 1) * ITEMS_PER_PAGE);

    // Skill Badges Data
    const skills = [
        { icon: Camera, label: '摄影' },
        { icon: Car, label: '驾照' },
        { icon: Film, label: '剪辑' },
        { icon: Palette, label: '海报' },
        { icon: MonitorPlay, label: 'PPT' },
        { icon: FileText, label: '办公软件' },
        { icon: Sparkles, label: 'And more' },
    ];

    return (
        <div className="relative min-h-screen text-gray-800 font-sans selection:bg-holo-pink selection:text-white">
            <div className="noise-overlay"></div>
            <CustomCursor />
            <AuroraBackground />
            <FloatingDecor />
            
            {/* Navbar (Floating Glass Pill) */}
            <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-sm md:max-w-md px-4">
                <nav className="bg-white/60 backdrop-blur-xl border border-white/50 rounded-full px-6 py-3 shadow-glass flex justify-between items-center">
                    <span className="font-serif font-bold italic text-gray-800 text-lg">H.O.</span>
                    <ul className="flex gap-6">
                        {['Home', 'Profile', 'Works'].map((item) => (
                            <li 
                                key={item} 
                                onClick={() => scrollToSection(item.toLowerCase())}
                                className="cursor-pointer text-xs uppercase tracking-widest text-gray-500 hover:text-black transition-colors font-medium"
                            >
                                {item}
                            </li>
                        ))}
                    </ul>
                </nav>
            </div>

            <div className="relative z-10 pt-24 pb-20">
                
                {/* Hero */}
                <div id="home">
                    <HeroSection />
                </div>

                <GlassTicker />

                {/* Profile Section (Frosted Glass Cards) */}
                <section id="profile" className="mb-32 max-w-6xl mx-auto px-6 scroll-mt-32 relative">
                    {/* Decor for Section */}
                    <div className="absolute -top-10 right-10 opacity-30 pointer-events-none hidden md:block">
                        <img src="https://api.dicebear.com/7.x/shapes/svg?seed=Felix" className="w-24 h-24 opacity-20" alt="" />
                    </div>

                    <div className="flex flex-col md:flex-row gap-12 items-stretch justify-center">
                        
                        {/* Left: Holographic ID Pass */}
                        <div className="w-full md:w-5/12 perspective-1000 group">
                            <div className="relative bg-white/70 backdrop-blur-2xl border-2 border-white ring-1 ring-black/5 rounded-[32px] p-8 shadow-2xl transition-transform duration-500 group-hover:rotate-y-12 group-hover:rotate-x-6 preserve-3d">
                                
                                {/* Holo Shine Overlay */}
                                <div className="absolute inset-0 rounded-[32px] bg-gradient-to-tr from-transparent via-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none z-20"></div>

                                {/* Sticker on Card */}
                                <div className="absolute -top-4 -right-4 bg-yellow-300 text-black font-bold font-hand px-3 py-1 rounded-sm rotate-12 shadow-md z-30 border border-black/10">
                                    HELLO!
                                </div>

                                <div className="flex justify-between items-start mb-8 border-b border-gray-200 pb-4">
                                    <div>
                                        <h3 className="font-sans text-xs tracking-[0.2em] text-gray-500 uppercase mb-1">Identity Pass</h3>
                                        <div className="font-serif italic text-2xl text-gray-900">No. 2004-06-26</div>
                                    </div>
                                    <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-holo-pink to-holo-blue opacity-80 blur-sm animate-pulse"></div>
                                </div>

                                <div className="flex gap-6 items-center">
                                    <div className="w-28 h-36 bg-gray-100 rounded-xl overflow-hidden shadow-inner border-2 border-white">
                                        <img 
                                            src="https://raw.githubusercontent.com/suibiankankan1/oubaodezuopingji/67ad612e9fd7cff81dad093c73a070be76f11aaa/IMG_7154.JPG" 
                                            className="w-full h-full object-cover filter contrast-100 transition-all duration-500" 
                                            alt="profile"
                                            onError={(e) => {
                                                e.currentTarget.src = "https://picsum.photos/seed/profile/400/500";
                                                e.currentTarget.onerror = null;
                                            }}
                                        />
                                    </div>
                                    <div className="space-y-3 font-sans text-sm">
                                        <div>
                                            <span className="block text-[10px] uppercase text-gray-400 tracking-wider">Name</span>
                                            <span className="font-medium text-gray-800 text-xl">欧阳慧龄</span>
                                        </div>
                                        <div>
                                            <span className="block text-[10px] uppercase text-gray-400 tracking-wider">Age</span>
                                            <span className="font-medium text-gray-800">22</span>
                                        </div>
                                        <div>
                                            <span className="block text-[10px] uppercase text-gray-400 tracking-wider">School</span>
                                            <span className="font-medium text-gray-800 text-base">重庆邮电大学</span>
                                        </div>
                                    </div>
                                </div>

                                <div className="mt-8 flex justify-between items-end relative z-10">
                                    {/* Barcode Visual */}
                                    <div className="flex flex-col gap-1">
                                        <div className="flex items-end gap-[2px] opacity-30 h-6">
                                            {[1, 0, 1, 1, 0, 1, 1, 0, 1, 1, 1, 0, 1].map((h, i) => (
                                                <div key={i} className={`w-[2px] bg-black ${h ? 'h-full' : 'h-1/2'}`}></div>
                                            ))}
                                        </div>
                                        <span className="text-[9px] font-mono text-gray-300 tracking-[0.2em]">SCAN_ME</span>
                                    </div>

                                    {/* Styled Nickname Badge */}
                                    <div className="relative group/tag">
                                        <div className="absolute inset-0 bg-gradient-to-r from-holo-pink via-white to-holo-blue opacity-0 group-hover/tag:opacity-30 blur-md rounded-full transition-opacity"></div>
                                        <div className="relative bg-white/40 backdrop-blur-md border border-white/60 px-4 py-1.5 rounded-full flex items-center gap-2 shadow-sm">
                                            <span className="text-[9px] font-bold text-gray-400 tracking-widest uppercase">Alias</span>
                                            <span className="w-px h-3 bg-gray-300"></span>
                                            <span className="font-hand text-lg font-bold text-gray-800">欧包</span>
                                            <Sparkles size={12} className="text-holo-pink" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Right: Intro Text */}
                        <div className="w-full md:w-1/2 flex flex-col justify-center">
                            <div className="relative mb-8">
                                <h2 className="font-serif text-3xl md:text-4xl text-gray-900 leading-snug">
                                    “我写作，<br />是因为我相信<br />
                                    <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-holo-pink to-holo-purple">
                                        故事能够改变世界。
                                    </span>”
                                </h2>
                                <p className="text-right font-sans text-xs text-gray-400 mt-2 tracking-wider">
                                    — / 罗尔德·达尔（Roald Dahl）
                                </p>
                            </div>

                            <div className="font-sans text-gray-600 leading-relaxed text-sm md:text-base space-y-4 font-light">
                                <p>我不太信赖“按部就班”，更偏爱<span className="font-medium text-gray-800">“灵光乍现”</span>。</p>
                                <p>
                                    创作于我，是捕捉那些稍纵即逝的闪光，<br/>
                                    <span className="md:whitespace-nowrap">用笔、用镜头、用一切可能的方式，将它成为能感染他人的故事。</span>
                                </p>
                                <p>世界是一块巨大的素材库，而我想做记录者和创作者。</p>
                                <p className="font-medium text-gray-800">我相信好的内容，自己会呼吸。</p>
                            </div>

                            <div className="mt-8 flex flex-wrap gap-3">
                                {skills.map((skill, index) => (
                                    <div key={index} className="px-3 py-1.5 bg-white/50 border border-white rounded-md text-xs font-medium text-gray-600 flex items-center gap-2 hover:bg-white/80 hover:shadow-sm transition-all cursor-default">
                                        <skill.icon size={12} className="text-holo-purple" />
                                        {skill.label}
                                    </div>
                                ))}
                            </div>
                        </div>

                    </div>
                </section>

                {/* Timeline Section with Merged Other Experience */}
                <section className="mb-32 max-w-7xl mx-auto px-6 relative">
                    <div className="flex items-center justify-between mb-16 border-b border-gray-200 pb-4 max-w-5xl mx-auto">
                        <h2 className="font-serif text-4xl italic text-gray-800">项目经历</h2>
                        <span className="font-sans text-xs uppercase tracking-widest text-gray-400 hidden md:block">Experience & Milestones</span>
                    </div>

                    {/* Desktop Horizontal Timeline */}
                    <div className="hidden md:block relative h-64 my-12">
                        {/* Line */}
                        <div className="absolute top-1/2 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-400 to-transparent"></div>
                        
                        <div className="flex justify-between h-full w-full px-12">
                            {TIMELINE_DATA.map((item, index) => (
                                <div key={item.id} className="relative flex-1 flex justify-center group">
                                    {/* Dot */}
                                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-gray-800 rounded-full border-2 border-white z-10 group-hover:scale-150 group-hover:bg-holo-pink transition-all duration-300 shadow-[0_0_10px_rgba(0,0,0,0.1)]"></div>

                                    {/* Card */}
                                    <div className={`absolute w-64 transition-all duration-500 hover:-translate-y-2 cursor-pointer z-20
                                        ${index % 2 === 0 ? 'bottom-1/2 mb-8' : 'top-1/2 mt-8'}`}
                                        onClick={() => setSelectedProject(item)}
                                    >
                                        {/* Connector Line */}
                                        <div className={`absolute left-1/2 -translate-x-1/2 w-px bg-gray-300 h-8 -z-10 ${index % 2 === 0 ? '-bottom-8' : '-top-8'}`}></div>

                                        <div className="bg-white/60 backdrop-blur-md border border-white/80 p-5 rounded-2xl shadow-glass hover:shadow-glow transition-all text-center">
                                             <span className="font-sans text-xs font-bold text-holo-blue uppercase tracking-widest mb-2 block">{item.year}</span>
                                             <h3 className="font-serif italic text-lg text-gray-800 leading-tight mb-1">{item.title}</h3>
                                             <div className="font-sans text-[10px] text-gray-500 uppercase tracking-wider">{item.category}</div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Mobile Vertical Timeline Fallback */}
                    <div className="md:hidden space-y-8 pl-4 border-l border-gray-200 ml-4">
                        {TIMELINE_DATA.map((item) => (
                            <div key={item.id} className="relative pl-6" onClick={() => setSelectedProject(item)}>
                                <div className="absolute -left-[5px] top-6 w-2.5 h-2.5 bg-gray-800 rounded-full border-2 border-white"></div>
                                <div className="bg-white/60 backdrop-blur-sm border border-white p-4 rounded-xl shadow-sm">
                                    <span className="text-xs font-bold text-holo-blue uppercase tracking-wider block mb-1">{item.year}</span>
                                    <h3 className="font-serif italic text-lg text-gray-800">{item.title}</h3>
                                    <p className="text-xs text-gray-500 uppercase mt-1">{item.category}</p>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Merged Other Experience Data - Compact Cards */}
                    <div className="mt-20 max-w-5xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            {OTHER_EXPERIENCE_DATA.map((item) => (
                                <div 
                                    key={item.id}
                                    onClick={() => setSelectedProject(item)}
                                    className="group relative bg-white/60 backdrop-blur-md border border-white/80 p-8 rounded-2xl shadow-glass hover:shadow-glow hover:-translate-y-1 transition-all duration-300 cursor-pointer overflow-hidden"
                                >
                                    {/* Hover Gradient Effect */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-holo-pink/5 to-holo-blue/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                                    {/* Content */}
                                    <div className="relative z-10 flex flex-col h-full">
                                        <div className="flex justify-between items-start mb-4 h-6">
                                            {item.year ? (
                                                <span className="font-sans text-xs font-bold text-holo-blue uppercase tracking-widest border border-holo-blue/20 px-2 py-1 rounded-full bg-white/50">{item.year}</span>
                                            ) : <div></div>}
                                            <ArrowUpRight className="text-gray-400 group-hover:text-gray-800 transition-colors" size={18} />
                                        </div>

                                        <h3 className="font-serif italic text-2xl text-gray-800 mb-2 group-hover:text-holo-purple transition-colors">{item.title}</h3>
                                        
                                        {item.category && (
                                            <div className="font-sans text-xs text-gray-500 uppercase tracking-wider mb-4">{item.category}</div>
                                        )}
                                        
                                        <p className="font-sans text-sm text-gray-600 leading-relaxed whitespace-pre-line">
                                            {item.description}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Works Section (Glass 3D Grid) */}
                <section id="works" className="mb-32 max-w-7xl mx-auto px-6 scroll-mt-32">
                    <div className="text-center mb-16 relative">
                        {/* Decorative Sparkles near header */}
                        <Sparkles className="absolute top-0 left-1/2 -translate-x-24 -translate-y-2 text-holo-pink opacity-50 animate-pulse" />
                        
                        <span className="block font-sans text-xs uppercase tracking-[0.3em] text-gray-400 mb-4">Selected Works</span>
                        <h2 className="font-serif text-5xl md:text-6xl text-gray-900 italic">Portfolio</h2>
                    </div>

                    <div className="relative">
                        {/* Nav */}
                        <div className="absolute top-1/2 -left-8 -translate-y-1/2 z-10 hidden md:block">
                            <button onClick={prevWorkPage} className="p-3 bg-white/80 backdrop-blur border border-white rounded-full shadow-lg hover:scale-110 transition-transform"><ChevronLeft size={20} /></button>
                        </div>
                        <div className="absolute top-1/2 -right-8 -translate-y-1/2 z-10 hidden md:block">
                            <button onClick={nextWorkPage} className="p-3 bg-white/80 backdrop-blur border border-white rounded-full shadow-lg hover:scale-110 transition-transform"><ChevronRight size={20} /></button>
                        </div>

                        {/* 3D Card Grid */}
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 px-4 py-8 perspective-[1000px]">
                            {visibleProjects.map((project, index) => (
                                <div 
                                    key={project.id}
                                    onClick={() => setSelectedProject(project)}
                                    className="group relative cursor-pointer"
                                >
                                    {/* The Card Itself - Floating Container */}
                                    <div className="relative aspect-[3/4] rounded-xl bg-white/40 backdrop-blur-xl border border-white/60 shadow-glass transition-all duration-500 ease-out transform group-hover:-translate-y-6 group-hover:rotate-x-6 group-hover:rotate-y-3 group-hover:shadow-[0_20px_40px_-10px_rgba(255,157,226,0.3)] overflow-hidden">
                                        
                                        {/* Image */}
                                        <div className="absolute top-2 left-2 right-2 bottom-12 rounded-lg overflow-hidden bg-gray-100">
                                            <img 
                                                src={project.image} 
                                                alt={project.title} 
                                                className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-110" 
                                            />
                                        </div>

                                        {/* Glossy Reflection Animation */}
                                        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/30 to-transparent -translate-x-full group-hover:animate-[shine_1s_ease-in-out]"></div>

                                        {/* Minimal Info at Bottom */}
                                        <div className="absolute bottom-0 left-0 right-0 h-12 flex items-center justify-between px-3">
                                            <span className="font-serif italic text-sm text-gray-800 truncate">{project.title}</span>
                                            <span className="w-1.5 h-1.5 rounded-full bg-holo-pink animate-pulse"></span>
                                        </div>
                                    </div>

                                    {/* Decoration below card (shadow/reflection) */}
                                    <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-2 bg-black/10 blur-md rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Footer (Clean & Magazine-like) */}
                <footer className="border-t border-gray-200 pt-16 pb-12 max-w-7xl mx-auto px-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-8">
                        
                        <div className="text-center md:text-left">
                            <div className="font-serif italic text-2xl text-gray-900 mb-2">期待与您合作</div>
                            <div className="font-sans text-gray-500 text-sm">点击与我取得联系</div>
                        </div>

                        <div className="flex gap-4 relative">
                            {/* Email Button with Tooltip */}
                            <div className="relative group">
                                <button 
                                    onClick={() => setShowEmail(!showEmail)}
                                    className={`w-12 h-12 flex items-center justify-center rounded-full border transition-all ${showEmail ? 'bg-black text-white border-black' : 'bg-white border-gray-200 text-gray-600 hover:bg-black hover:text-white hover:border-black'}`}
                                >
                                    <Mail size={18} />
                                </button>
                                
                                {showEmail && (
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 px-3 py-1.5 bg-black text-white text-xs rounded-md whitespace-nowrap shadow-lg animate-in fade-in slide-in-from-bottom-2 z-50">
                                        3275313611@qq.com
                                        {/* Triangle pointer */}
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-black"></div>
                                    </div>
                                )}
                            </div>

                            {/* WeChat Button with QR Code Tooltip */}
                            <div className="relative group">
                                <button 
                                    onClick={() => setShowWeChat(!showWeChat)}
                                    className={`w-12 h-12 flex items-center justify-center rounded-full border transition-all ${showWeChat ? 'bg-black text-white border-black' : 'bg-white border-gray-200 text-gray-600 hover:bg-black hover:text-white hover:border-black'}`}
                                >
                                    <WeChatIcon size={20} />
                                </button>
                                
                                {showWeChat && (
                                    <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 p-2 bg-white rounded-lg shadow-xl border border-gray-100 animate-in fade-in slide-in-from-bottom-2 z-50">
                                        <div className="w-32 h-32 bg-gray-100 rounded-md overflow-hidden">
                                            <img 
                                                src="https://raw.githubusercontent.com/suibiankankan1/oubaodezuopingji/7b6266cc2afccdfcd18d33e13f2219406afc9c1c/6ae31f3975c8a44658804a4036738c04.jpg" 
                                                alt="WeChat QR" 
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        {/* Triangle pointer */}
                                        <div className="absolute top-full left-1/2 -translate-x-1/2 -mt-[1px] border-4 border-transparent border-t-white"></div>
                                    </div>
                                )}
                            </div>

                            {/* Resume Download */}
                            <div className="relative flex flex-col items-center">
                                <a 
                                    href="https://raw.githubusercontent.com/suibiankankan1/oubaodezuopingji/959a5edfd88f4a5e8e69d47ccd5b4f2d4df3f6cc/%E6%AC%A7%E9%98%B3%E6%85%A7%E9%BE%842026.pdf" 
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-12 h-12 flex items-center justify-center rounded-full bg-white border border-gray-200 text-gray-600 hover:bg-black hover:text-white hover:border-black transition-all"
                                    title="Download Resume"
                                >
                                    <FileText size={18} />
                                </a>
                                <span className="absolute top-full mt-2 text-[10px] text-gray-400 whitespace-nowrap font-sans">点击下载简历</span>
                            </div>
                        </div>

                        <div className="text-center md:text-right">
                            <div className="font-sans text-xs uppercase tracking-widest text-gray-400 mb-1">
                                © 2026 Huiling.sys
                            </div>
                            <div className="font-sans text-[10px] text-gray-300">
                                Designed in the future.
                            </div>
                        </div>
                    </div>
                </footer>
            </div>
            
            <GlassModal 
                isOpen={!!selectedProject} 
                onClose={() => setSelectedProject(null)} 
                item={selectedProject} 
            />
        </div>
    );
};

export default App;