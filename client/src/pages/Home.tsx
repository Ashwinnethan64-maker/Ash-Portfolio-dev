import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link as ScrollLink } from "react-scroll";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertMessageSchema } from "@shared/schema";
import emailjs from "@emailjs/browser";
import { useToast } from "@/hooks/use-toast";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Terminal } from "@/components/Terminal";
import { CyberButton } from "@/components/CyberButton";
import { SectionHeading } from "@/components/SectionHeading";
import LabelBadge from "@/components/ui/label-badges";
import { Shield, Cpu, Terminal as TerminalIcon, Award, GraduationCap, Briefcase, Mail, MapPin, Linkedin, Github, Globe, Search, BarChart, Download } from "lucide-react";

import { ImageAutoSlider } from "@/components/ui/image-auto-slider";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { Dialog, DialogContent, DialogTitle, DialogDescription } from "@/components/ui/dialog";


export default function Home() {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const statusLabels = [
    { id: 'status', name: 'System Status: ONLINE', color: '#22c55e', animate: true },
    { id: 'internship', name: 'Available for Internship', color: '#00f3ff' }
  ];

  const form = useForm({
    resolver: zodResolver(insertMessageSchema),
    defaultValues: {
      name: "",
      email: "",
      message: "",
    },
  });

  const onSubmit = (data: any) => {
    setIsSubmitting(true);

    emailjs.send(
      'service_x08b4vh',
      'template_gr3m1qe',
      {
        from_name: data.name,
        from_email: data.email,
        message: data.message,
        to_name: "Ashwin",
      },
      'dhbIsX5kyNPUd1xWb'
    )
      .then(() => {
        setIsSuccess(true);
        form.reset();
      })
      .catch((error) => {
        console.error('EmailJS Error:', error);
        toast({
          title: "Transmission Failed",
          description: "There was an error sending your message. Please try again later.",
          variant: "destructive",
        });
      })
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  const education = [
    {
      period: "2025 - 2029",
      degree: "B.Tech in Computer Science & Cybersecurity",
      institution: "Kalvium & Yenepoya University",
      desc: "Specializing in advanced network defense, cryptography, and secure software development."
    },
    {
      period: "2023 - 2025",
      degree: "Higher Secondary Education",
      institution: "Sri Chaitanya PU College",
      desc: "Built a strong foundation in mathematics, physics, and computer science principles."
    }
  ];

  const skillCategories = [
    {
      title: "Programming",
      skills: [
        { name: "Python", level: 85 },
        { name: "JavaScript", level: 80 },
        { name: "HTML5", level: 90 },
        { name: "CSS3", level: 88 }
      ]
    },
    {
      title: "Cybersecurity",
      skills: [
        { name: "Network Security", level: 75 },
        { name: "Ethical Hacking (Basics)", level: 70 },
        { name: "Web Application Security", level: 65 },
        { name: "Vulnerability Scanning", level: 80 }
      ]
    },
    {
      title: "Tools & Platforms",
      skills: [
        { name: "Linux", level: 85 },
        { name: "Git / GitHub", level: 90 },
        { name: "TryHackMe", level: 75 },
        { name: "Hack The Box", level: 60 }
      ]
    },
    {
      title: "Dev & Deployment",
      skills: [
        { name: "Vercel", level: 80 },
        { name: "GitHub Pages", level: 85 },
        { name: "Basic CI/CD concepts", level: 65 }
      ]
    }
  ];

  const projects = [
    {
      id: "agronova",
      title: "AgroNova",
      subtitle: "Sustainable Agriculture & Supply Chain Security",
      desc: "An innovative platform focused on securing agricultural supply chains using blockchain and AI for threat detection.",
      image: "https://images.unsplash.com/photo-1523348837708-15d4a09cfac2?w=800&q=80",
      url: "https://agronova-app.vercel.app/",
      proof: [
        "Implemented end-to-end encryption for farmer-to-consumer communication.",
        "Integrated AI models to detect anomalies in supply chain logistics.",
        "Developed a secure dashboard for real-time monitoring of agricultural assets."
      ],
      tag: "Offensive",
      tagColor: "bg-red-500/20 text-red-400 border-red-500/30"
    }
  ];

  const [selectedProject, setSelectedProject] = useState<any>(null);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">


      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-[100] bg-background/80 backdrop-blur-md border-b border-white/5">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <div className="font-display font-bold text-2xl text-primary tracking-[0.2em] uppercase">
            Ash
          </div>
          <div className="hidden md:flex gap-8">
            {[
              { name: "About", to: "about" },
              { name: "Education", to: "education" },
              { name: "Experience", to: "experience" },
              { name: "Skills", to: "skills" },
              { name: "Projects", to: "projects" },
              { name: "Contact", to: "contact" }
            ].map((item) => (
              <ScrollLink
                key={item.name}
                to={item.to}
                smooth={true}
                spy={true}
                activeClass="text-primary font-bold drop-shadow-[0_0_8px_rgba(0,243,255,0.6)]"
                className="font-mono text-sm text-muted-foreground hover:text-primary cursor-pointer transition-colors uppercase tracking-wider"
              >
                {item.name}
              </ScrollLink>
            ))}
          </div>
          <CyberButton size="sm" variant="outline" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
            Hire Me
          </CyberButton>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="absolute inset-0 cyber-grid opacity-20" />
        <div className="container mx-auto px-6 grid md:grid-cols-2 gap-12 items-center relative z-10">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
          >
            <LabelBadge labels={statusLabels} className="mb-6" />
            <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
              Ashwin <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-600">Nethan</span>
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mb-8 font-light">
              Cybersecurity Student | Aspiring Analyst | Ethical Hacker
            </p>
            <p className="mb-8 text-muted-foreground max-w-lg">
              Passionate about securing digital frontiers, ethical hacking, and network defense.
              Based in Mangaluru, India.
            </p>
            <div className="flex flex-wrap gap-4">
              <CyberButton onClick={() => document.getElementById('skills')?.scrollIntoView({ behavior: 'smooth' })}>
                View Skills
              </CyberButton>
              <CyberButton variant="outline" onClick={() => document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' })}>
                Experience
              </CyberButton>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex justify-center"
          >
            <Terminal />
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-primary"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <div className="w-6 h-10 border-2 border-primary/30 rounded-full flex justify-center p-1">
            <div className="w-1 h-2 bg-primary rounded-full" />
          </div>
        </motion.div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-muted/30 border-y border-white/5 relative">
        <div className="container mx-auto px-6">
          <SectionHeading title="About Me" subtitle="Initializing user profile..." align="center" />

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1 relative group">
              {/* Profile Image */}
              <div className="aspect-square rounded-2xl bg-secondary relative overflow-hidden border border-white/10 group-hover:border-primary/50 transition-colors duration-500">
                <img
                  src="https://i.postimg.cc/cJTSQJ2B/Whats-App-Image-2025-11-23-at-17-49-21-647fa574.jpg"
                  alt="Ashwin Nethan"
                  className="object-cover w-full h-full opacity-80 grayscale group-hover:grayscale-0 transition-all duration-500"
                />
                <div className="absolute inset-0 bg-background/40 group-hover:bg-background/20 transition-colors duration-500" />

                {/* Cyber overlay elements */}
                <div className="absolute top-4 right-4 w-16 h-16 border-t-2 border-r-2 border-primary/50 rounded-tr-xl group-hover:border-primary transition-colors duration-500" />
                <div className="absolute bottom-4 left-4 w-16 h-16 border-b-2 border-l-2 border-primary/50 rounded-bl-xl group-hover:border-primary transition-colors duration-500" />
              </div>
            </div>

            <div className="order-1 md:order-2">
              <h3 className="text-2xl font-bold mb-6 text-white">Exploring the Digital Frontier</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                I am a dedicated cybersecurity student with a deep passion for understanding how systems work—and how to secure them. My journey involves rigorous self-study, active participation in CTFs, and hands-on practice in virtual labs.
              </p>
              <p className="text-muted-foreground mb-8 leading-relaxed">
                Currently pursuing my B.Tech, I am actively seeking internships and opportunities to apply my knowledge in real-world scenarios. My focus spans from network defense to offensive security strategies, always adhering to ethical standards.
              </p>

              <div className="grid grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-secondary/40 p-4 rounded border border-white/5 hover:border-primary/50 hover:bg-secondary/60 transition-all duration-300 group cursor-default"
                >
                  <h4 className="text-primary font-mono text-xl mb-1 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(0,243,255,0.8)] transition-all">Active</h4>
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">Learner Status</span>
                </motion.div>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  className="bg-secondary/40 p-4 rounded border border-white/5 hover:border-primary/50 hover:bg-secondary/60 transition-all duration-300 group cursor-default"
                >
                  <h4 className="text-primary font-mono text-xl mb-1 group-hover:text-cyan-400 group-hover:drop-shadow-[0_0_8px_rgba(0,243,255,0.8)] transition-all">Open</h4>
                  <span className="text-xs text-muted-foreground uppercase tracking-widest">To Work</span>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="py-24 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 blur-3xl rounded-full translate-x-1/2" />
        <div className="container mx-auto px-6 relative z-10">
          <SectionHeading title="Education" subtitle="Academic credentials loaded" />

          <div className="space-y-8 max-w-4xl mx-auto">
            {education.map((edu, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="cyber-card p-8 rounded-xl relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10">
                  <GraduationCap size={100} />
                </div>
                <div className="flex flex-col md:flex-row md:items-center gap-4 mb-4">
                  <span className="px-3 py-1 bg-primary/10 text-primary rounded text-sm font-mono border border-primary/20">
                    {edu.period}
                  </span>
                  <h3 className="text-xl font-bold text-white">{edu.institution}</h3>
                </div>
                <h4 className="text-lg text-primary/80 mb-2 font-display">{edu.degree}</h4>
                <p className="text-muted-foreground">{edu.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="py-24 bg-muted/30 border-y border-white/5">
        <div className="container mx-auto px-6">
          <SectionHeading title="Experience" subtitle="Practical application logs" align="right" />

          <div className="grid md:grid-cols-3 gap-8">
            <div className="md:col-span-1">
              <div className="sticky top-24">
                <div className="cyber-card p-6 rounded-xl border-l-4 border-l-primary">
                  <h3 className="text-xl font-bold mb-2">Self-Directed Learning</h3>
                  <p className="text-primary font-mono text-sm mb-4">Aug 2025 - Present</p>
                  <p className="text-sm text-muted-foreground">
                    Independent researcher and practitioner focused on offensive and defensive security methodologies.
                  </p>
                </div>
              </div>
            </div>

            <div className="md:col-span-2 space-y-6">
              {[
                "Conducted network security assessments using industry-standard tools.",
                "Practiced ethical hacking scenarios on TryHackMe and Hack The Box platforms.",
                "Administered Linux systems, focusing on hardening and security configurations.",
                "Explored SIEM tools for log analysis and incident detection.",
                "Developed scripts for automating basic security tasks."
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4 p-4 rounded bg-background/50 border border-white/5 hover:border-primary/30 transition-colors"
                >
                  <div className="mt-1 min-w-[24px]">
                    <div className="w-2 h-2 rounded-full bg-primary shadow-[0_0_8px_rgba(0,255,255,0.8)]" />
                  </div>
                  <p className="text-muted-foreground">{item}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-24 relative">
        <div className="container mx-auto px-6">
          <SectionHeading title="Skills & Arsenal" subtitle="Capabilities matrix" align="center" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, idx) => (
              <motion.div
                key={idx}
                whileHover={{ scale: 1.03 }}
                className="cyber-card p-6 rounded-xl border border-white/5 hover:border-primary/50 hover:shadow-[0_0_20px_rgba(0,243,255,0.2)] transition-all duration-300 cursor-pointer flex flex-col"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                    <Shield className="w-5 h-5 text-primary" />
                  </div>
                  <h3 className="text-xl font-bold text-white font-display">
                    {category.title}
                  </h3>
                </div>

                <div className="space-y-6">
                  {category.skills.map((skill, sIdx) => (
                    <div key={sIdx} className="space-y-2">
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-mono text-muted-foreground">{skill.name}</span>
                      </div>
                      <div className="h-1.5 w-full bg-secondary/30 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, ease: "easeOut" }}
                          className="h-full bg-primary shadow-[0_0_10px_rgba(0,243,255,0.5)]"
                        />
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-24 bg-muted/30 border-y border-white/5">
        <div className="container mx-auto px-6">
          <SectionHeading title="Featured Projects" subtitle="Operational deployments" />

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => (
              <motion.div
                key={project.id}
                whileHover={{ scale: 1.03 }}
                className="cyber-card group p-0 rounded-xl overflow-hidden h-full flex flex-col cursor-pointer hover:border-primary/50 hover:shadow-[0_0_20px_rgba(0,243,255,0.2)] transition-all duration-300"
                onClick={() => {
                  if (project.url) {
                    window.open(project.url, "_blank", "noopener,noreferrer");
                  } else {
                    setSelectedProject(project);
                  }
                }}
              >
                <div className="h-48 bg-black relative overflow-hidden">
                  <div
                    className="absolute inset-0 bg-cover bg-center opacity-50 group-hover:scale-110 group-hover:brightness-110 group-hover:contrast-110 transition-transform duration-700"
                    style={{ backgroundImage: `url(${project.image})` }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <span className={`px-2 py-1 text-xs font-bold rounded border uppercase ${project.tagColor}`}>
                      {project.tag}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex-1 flex flex-col">
                  <h3 className="text-xl font-bold mb-1">{project.title}</h3>
                  <p className="text-primary/70 text-xs font-mono mb-3 uppercase tracking-wider">{project.subtitle}</p>
                  <p className="text-muted-foreground text-sm mb-4 flex-1">
                    {project.desc}
                  </p>
                  <div className="flex gap-2">
                    <CyberButton
                      size="sm"
                      variant="outline"
                      className="w-full group/btn"
                      onClick={(e) => {
                        e.stopPropagation();
                        if (project.url) {
                          window.open(project.url, "_blank", "noopener,noreferrer");
                        } else {
                          setSelectedProject(project);
                        }
                      }}
                    >
                      View Link <span className="ml-2 transition-transform duration-300 group-hover/btn:translate-x-1">→</span>
                    </CyberButton>
                    <CyberButton
                      size="sm"
                      variant="ghost"
                      className="w-auto px-3"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedProject(project);
                      }}
                    >
                      <Shield className="w-4 h-4" />
                    </CyberButton>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Details Modal */}
      <Dialog open={!!selectedProject} onOpenChange={() => setSelectedProject(null)}>
        <DialogContent className="max-w-2xl bg-background border-primary/30 p-0 overflow-hidden">
          {selectedProject && (
            <div className="relative">
              <DialogTitle className="sr-only">{selectedProject.title}</DialogTitle>
              <DialogDescription className="sr-only">{selectedProject.subtitle}</DialogDescription>
              <div className="h-64 bg-black relative">
                <img
                  src={selectedProject.image}
                  alt={selectedProject.title}
                  className="w-full h-full object-cover opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
                <div className="absolute bottom-6 left-6">
                  <span className={`px-2 py-1 text-xs font-bold rounded border uppercase mb-2 inline-block ${selectedProject.tagColor}`}>
                    {selectedProject.tag}
                  </span>
                  <h2 className="text-3xl font-bold text-white">{selectedProject.title}</h2>
                  <p className="text-primary font-mono text-sm mt-1">{selectedProject.subtitle}</p>
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-lg font-bold mb-4 flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  Mission Proof
                </h3>
                <div className="space-y-4">
                  {selectedProject.proof.map((item: string, i: number) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-secondary/30 rounded border border-white/5 hover:border-primary/20 transition-all">
                      <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary shadow-[0_0_8px_rgba(0,243,255,0.8)] shrink-0" />
                      <p className="text-muted-foreground text-sm leading-relaxed">{item}</p>
                    </div>
                  ))}
                </div>
                <div className="mt-8 flex justify-end">
                  <CyberButton variant="outline" onClick={() => setSelectedProject(null)}>
                    Close Terminal
                  </CyberButton>
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Certifications Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="container mx-auto px-6">
          <SectionHeading title="Certifications" subtitle="Validated credentials" align="center" />
        </div>

        <div className="mt-12">
          <ImageAutoSlider
            images={[
              {
                title: "Google AI for K12 Educators",
                issuer: "Google for Education",
                year: "2025",
                image: "https://i.postimg.cc/6ptR3jX5/Screenshot-2026-01-15-122227.png"
              },
              {
                title: "IBM Enterprise Design Thinking Practitioner",
                issuer: "IBM",
                year: "2025",
                image: "https://i.postimg.cc/VLc0GG5W/Screenshot-2025-08-06-193320.png"
              },
              {
                title: "Gemini Certified Student",
                issuer: "Google",
                year: "2025",
                image: "https://i.postimg.cc/65954D89/Screenshot-2025-11-25-134905.png"
              },
              {
                title: "Glowlogics Campus Ambassador",
                issuer: "Glowlogics",
                year: "2025",
                image: "https://i.postimg.cc/sDDsg7Nk/Screenshot-2026-01-09-130845.png"
              },
              {
                title: "Vibeathon Participation",
                issuer: "Vibethon / Polaris School of Technology",
                year: "2025",
                image: "https://i.postimg.cc/KYR6Tghr/Screenshot-2025-11-26-184410.png"
              },
              {
                title: "CodeSprint Hackathon Participation",
                issuer: "Code Sprint / St. Aloysius Deemed to be University",
                year: "2026",
                image: "https://i.postimg.cc/SsLtZhbc/Code-Sprint.png"
              },
              {
                title: "RIFT '26 Hackathon – Participant",
                issuer: "Physics Wallah Institute of Innovation",
                year: "2026",
                image: "https://i.postimg.cc/tCjsLq49/RIFT26-Certificate-Ashwin-Nethan.jpg"
              },
              {
                title: "Hackwise 2.0 Selection Round",
                issuer: "Sphere Hive – KVG College of Engineering",
                year: "2026",
                image: "https://i.postimg.cc/TPpSfX3r/Screenshot-2026-02-28-205052.png"
              },
              {
                title: "RIFT '26 Hackathon – Unstop Freedom Festival",
                issuer: "Physics Wallah Institute of Innovation",
                year: "2026",
                image: "https://i.postimg.cc/bYQ5zgpn/Screenshot-2026-02-28-205735.png"
              }
            ]}
          />
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-24 bg-gradient-to-b from-muted/20 to-background border-t border-white/5">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-16">
            <div>
              <SectionHeading title="Contact Me" subtitle="Establish secure connection" />
              <p className="text-muted-foreground mb-8">
                Ready to collaborate on security projects or discuss potential opportunities?
                Send a secure transmission below.
              </p>

              <div className="space-y-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30">
                    <Mail className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm text-muted-foreground font-mono">Email</h4>
                    <p className="text-white">ashwinnethan07@gmail.com</p>
                  </div>
                </div>

                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30">
                    <MapPin className="text-primary" />
                  </div>
                  <div>
                    <h4 className="text-sm text-muted-foreground font-mono">Location</h4>
                    <p className="text-white">Mangaluru, Karnataka, India</p>
                  </div>
                </div>

                <div className="flex gap-4 mt-8">
                  <motion.a
                    href="https://github.com/Ashwinnethan64-maker"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    aria-label="GitHub Profile"
                    className="w-12 h-12 rounded-lg bg-secondary/40 flex items-center justify-center text-primary border border-primary/30 hover:border-primary hover:shadow-[0_0_15px_rgba(0,243,255,0.4)] transition-all duration-300"
                  >
                    <Github size={24} />
                  </motion.a>
                  <motion.a
                    href="https://www.linkedin.com/in/ashwin-nethan-a59259366/"
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.1 }}
                    aria-label="LinkedIn Profile"
                    className="w-12 h-12 rounded-lg bg-secondary/40 flex items-center justify-center text-primary border border-primary/30 hover:border-primary hover:shadow-[0_0_15px_rgba(0,243,255,0.4)] transition-all duration-300"
                  >
                    <Linkedin size={24} />
                  </motion.a>
                </div>
              </div>
            </div>

            <div className="bg-secondary/20 p-8 rounded-2xl border border-white/5 backdrop-blur-sm">
              {isSuccess ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5 }}
                  className="flex flex-col items-center justify-center text-center py-12 space-y-6"
                >
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center border border-primary/30 shadow-[0_0_15px_rgba(0,243,255,0.2)]">
                    <Shield className="w-8 h-8 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white font-display mb-2">Message Sent!</h3>
                    <p className="text-muted-foreground font-mono">
                      I'll get back to you within 24 hours.
                    </p>
                  </div>
                  <CyberButton variant="outline" size="sm" onClick={() => setIsSuccess(false)} className="mt-8">
                    Back
                  </CyberButton>
                </motion.div>
              ) : (
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-primary/80 font-mono text-xs uppercase">Identity</FormLabel>
                          <FormControl>
                            <Input placeholder="ENTER NAME" {...field} className="bg-background/50 border-white/10 focus:border-primary font-mono" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-primary/80 font-mono text-xs uppercase">Return Address</FormLabel>
                          <FormControl>
                            <Input placeholder="ENTER EMAIL" {...field} className="bg-background/50 border-white/10 focus:border-primary font-mono" />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="message"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-primary/80 font-mono text-xs uppercase">Transmission</FormLabel>
                          <FormControl>
                            <Textarea
                              placeholder="TYPE MESSAGE..."
                              {...field}
                              className="bg-background/50 border-white/10 focus:border-primary font-mono min-h-[120px]"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <CyberButton
                      type="submit"
                      className="w-full"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? "Transmitting..." : "Send Transmission"}
                    </CyberButton>
                  </form>
                </Form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-background border-t border-white/5 text-center">
        <div className="container mx-auto px-6">
          <div className="font-display font-bold text-xl text-primary tracking-[0.2em] uppercase mb-4">
            Ash
          </div>
          <p className="text-muted-foreground text-sm font-mono">
            © {new Date().getFullYear()} Ashwin Nethan. Secure System. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
}
