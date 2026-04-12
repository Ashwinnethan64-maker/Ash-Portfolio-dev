import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExpandableTabs } from "./ui/expandable-tabs";
import { Terminal as TerminalIcon, Shield, Code, Mail } from "lucide-react";

export function Terminal() {
  const [activeTab, setActiveTab] = useState<number | null>(0);
  const [lines, setLines] = useState<string[]>([]);
  
  const statusLines = [
    { text: "sys.init()", delay: 200 },
    { text: "status: ONLINE", delay: 400 },
    { text: "role: Cybersecurity Student", delay: 600 },
    { text: "location: Mangaluru, India", delay: 800 },
  ];

  const skillsLines = [
    { text: "listing skills...", delay: 200 },
    { text: "network_security: [ADVANCED]", delay: 400 },
    { text: "ethical_hacking: [INTERMEDIATE]", delay: 600 },
    { text: "linux_kernel: [PROFICIENT]", delay: 800 },
    { text: "siem_basics: [LEARNING]", delay: 1000 },
  ];

  const contactLines = [
    { text: "fetching contact info...", delay: 200 },
    { text: "email: ashwinnethan07@gmail.com", delay: 400 },
    { text: "linkedin: linkedin.com/in/ashwin-nethan", delay: 600 },
    { text: "status: Open to Internships", delay: 800 },
  ];

  const tabs = [
    { title: "Status", icon: Shield },
    { title: "Skills", icon: Code },
    { title: "Contact", icon: Mail },
  ];

  useEffect(() => {
    setLines([]);
    let timeoutIds: NodeJS.Timeout[] = [];
    
    const currentLines = activeTab === 0 ? statusLines : activeTab === 1 ? skillsLines : contactLines;

    currentLines.forEach((cmd, index) => {
      const id = setTimeout(() => {
        setLines(prev => [...prev, cmd.text]);
      }, cmd.delay);
      timeoutIds.push(id);
    });

    return () => timeoutIds.forEach(clearTimeout);
  }, [activeTab]);

  return (
    <div className="w-full max-w-lg bg-black/80 border border-primary/30 rounded-lg overflow-hidden shadow-lg backdrop-blur-md">
      <div className="bg-primary/10 px-4 py-2 border-b border-primary/30 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-red-500/80" />
          <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <div className="w-3 h-3 rounded-full bg-green-500/80" />
          <span className="ml-2 text-[clamp(0.65rem,2vw,0.75rem)] font-mono text-primary/70">ashwin@terminal</span>
        </div>
        <div className="flex-shrink-0">
          <ExpandableTabs 
            tabs={tabs} 
            activeColor="text-primary" 
            className="bg-transparent border-none p-0 h-8"
            onChange={setActiveTab}
          />
        </div>

      </div>
      <div className="p-4 font-mono text-[clamp(0.75rem,2.5vw,0.875rem)] leading-relaxed h-[200px] overflow-y-auto">
        <AnimatePresence mode="popLayout">
          {lines.map((line, i) => (
            <motion.div 
              key={`${activeTab}-${i}`}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              className="mb-2 text-primary flex items-start gap-2 break-words"
            >
              <span className="text-primary flex-shrink-0 mt-0.5">➜</span>
              <span className="flex-1 min-w-0">{line}</span>
            </motion.div>
          ))}
        </AnimatePresence>
        <motion.div 
          animate={{ opacity: [0, 1, 0] }} 
          transition={{ repeat: Infinity, duration: 0.8 }}
          className="w-2 h-4 bg-primary inline-block align-middle ml-1"
        />
      </div>
    </div>

  );
}
