import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowUpRight, GithubLogo, Globe } from 'phosphor-react';

gsap.registerPlugin(ScrollTrigger);

const Projects = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);
  //const [gsapLoaded, setGsapLoaded] = useState(false);

  const projects = [
    {
      id: 1,
      title: "Agentic MedicalReport Analysis",
      description: "AI-powered system that uses multi-agent LLMs and RAG to analyze medical reports, generate diagnostic insights, and support context-aware Q&A through a streamlined Streamlit interface.",
      image: "/Images/Agentic-MedicalReport-Analysis.png",
      tech: ["Python", "RAG", "Streamlit", "LangChain", "LangGraph", "FAISS", "Pydantic", "Pathlib & Dotenv", "HuggingFace Embeddings"],
      liveUrl: "https://ai-agentic-medicalreport-analysis.streamlit.app/",
      githubUrl: "https://github.com/hynko431/Agentic-MedicalReport-Analysis"
    },

    {
      id: 2,
      title: "MSME Agent-A-Thon",
      description: "An agentic “Pocket CEO” platform for MSMEs that delivers financial insights and recommendations using multi-agent AI workflows, API integrations, and automated decision support.",
      image: "/Images/MSME Agent-A-Thon.png",
      tech: ["Python", "LangChain", "LLMs", "FastAPI", "Flask", "A2A Protocol", "React", "HTML", "CSS", "JavaScript", "Tailwind CSS"],
      liveUrl: "https://agent-a-thon.vercel.app/",
      githubUrl: "https://github.com/hynko431/Agent-A-Thon/"
    },

    {
      id: 3,
      title: "Conversational AI Avatar",
      description: "Built a Conversational AI avatar that enables human-like interactions, showcasing intelligent digital interfaces for virtual assistants, education, and immersive AI platforms.",
      image: "/Images/Conversational AI Avatar.png",
      tech: ["Python", "Speech-to-Text (ASR)", "Text-to-Speech (TTS)", "ZEP - Brain", "Anam AI-3D avatar", "React", "HTML", "CSS", "JavaScript", "FastAPI", "Flask"],
      liveUrl: "https://conversational-ai-avatar-demo.streamlit.app/",
      githubUrl: "https://github.com/hynko431/Conversational-AI-Avatar"
    },

    {
      id: 4,
      title: "Tele Medicine Pro",
      description: "End-to-end Tele-Medicine platform supporting video/phone consults, secure messaging, triage & scheduling, and remote vitals. Implemented RBAC, encryption, and audit logging to protect patient data.",
      image: "/Images/Tele-Medicine-Pro.png",
      tech: ["React", "Flask / FastAPI", "WebRTC", "JWT / RBAC", "MongoDB", "PostgreSQL"],
      liveUrl: "",
      githubUrl: "https://github.com/hynko431/TeleMedicine-Pro"
    },

    {
      id: 5,
      title: "HematoVision — Blood Cell Classification",
      description: "Transfer-learning pipeline (MobileNetV2) for blood-cell classification on ~12.5k augmented images. Packaged model and served via a Flask inference API.",
      image: "/Images/HeatmatoVision.jpg",
      tech: ["TensorFlow", "Keras", "Flask API", "Data Augmentation"],
      liveUrl: "",
      githubUrl: "https://github.com/hynko431/HematoVision-Advanced-Blood-Cell-Classification-Using-Transfer-Learning"
    },


  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(titleRef.current?.children || [], {
        y: 50,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: titleRef.current,
          start: "top 80%"
        }
      });

      gsap.from(containerRef.current?.children || [], {
        y: 100,
        opacity: 0,
        scale: 0.9,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%"
        }
      });

      const cards = containerRef.current?.children;
      if (cards) {
        Array.from(cards).forEach((card) => {
          const element = card as HTMLElement;

          element.addEventListener('mouseenter', () => {
            gsap.to(element, {
              y: -10,
              scale: 1.02,
              duration: 0.3,
              ease: "power2.out"
            });
          });

          element.addEventListener('mouseleave', () => {
            gsap.to(element, {
              y: 0,
              scale: 1,
              duration: 0.3,
              ease: "power2.out"
            });
          });
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-20 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-7xl">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            Featured <span className="text-primary-glow">Projects</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            A curated collection of AI & ML projects demonstrating my expertise in building modern, scalable web applications — from intuitive frontends to robust backend systems.          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project) => (
            <div key={project.id} className="glass cursor-pointer rounded-xl overflow-hidden hover:shadow-glow-primary transition-all duration-500 group">
              <div className="relative overflow-hidden h-48">
                <img src={project.image} alt={project.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="absolute top-4 right-4 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <a href={project.liveUrl} className="w-10 h-10 bg-primary/90 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-primary transition-colors duration-200" aria-label={`View Live Demo for ${project.title}`}>
                    <Globe size={18} className="text-primary-foreground" />
                  </a>
                  <a href={project.githubUrl} className="w-10 h-10 bg-secondary/90 backdrop-blur-sm rounded-lg flex items-center justify-center hover:bg-secondary transition-colors duration-200" aria-label={`View GitHub Repository for ${project.title}`}>
                    <GithubLogo size={18} className="text-secondary-foreground" />
                  </a>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-foreground mb-2 group-hover:text-primary-glow transition-colors duration-300">
                  {project.title}
                </h3>

                <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                  {project.description}
                </p>

                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech) => (
                    <span key={tech} className="px-3 py-1 bg-primary/10 text-primary-glow text-xs rounded-full border border-primary/20">
                      {tech}
                    </span>
                  ))}
                </div>

                <a href={project.githubUrl} className="inline-flex items-center gap-2 text-primary-glow hover:text-primary transition-colors duration-300 group/link">
                  View Project
                  <ArrowUpRight size={16} className="group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform duration-300" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {<div className="text-center mt-12">
          <button
            type="button"
            onClick={() => window.open("https://github.com/hynko431?tab=repositories", "_blank", "noopener,noreferrer")}
            className="px-8 py-3 bg-gradient-secondary text-secondary-foreground rounded-lg hover:shadow-glow-secondary transition-all duration-300 hover:scale-105">
            View All Projects
          </button>
        </div>}
      </div>

      <div className="absolute top-1/4 left-0 w-96 h-96 bg-secondary/5 rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2" />
    </section>
  );
};

export default Projects;