import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  Brain,
  Cpu,
  Database,
  Code,
  Cloud,
  Lightning,
  GitBranch,
  Gear,
  Cube,
  Robot,
  ChartLine,
} from "phosphor-react";
import { Camera, Network } from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const skillsRef = useRef<HTMLDivElement>(null);

  // 🧠 Your AI/ML Skill Stack
  const skills = [
    { icon: Code, name: "Python / FastAPI / Flask", level: 83, width: "w-[83%]" },
    { icon: Brain, name: "Machine Learning", level: 90, width: "w-[90%]" },
    { icon: Network, name: "Deep Learning (Keras/TensorFlow)", level: 88, width: "w-[88%]" },
    { icon: Camera, name: "Computer Vision", level: 86, width: "w-[86%]" },
    { icon: Lightning, name: "NLP / Transformers", level: 84, width: "w-[84%]" },
    { icon: Cube, name: "LangChain / RAG / VectorDB", level: 72, width: "w-[72%]" },
    { icon: Robot, name: "AI Agents", level: 60, width: "w-[60%]" },
    { icon: Database, name: "SQL / MongoDB", level: 75, width: "w-[75%]" },
    { icon: ChartLine, name: "Data Analysis / EDA", level: 80, width: "w-[80%]" },
    { icon: Cloud, name: "Model Deployment / Streamlit", level: 78, width: "w-[78%]" },
    { icon: Gear, name: "Model Optimization / AutoML", level: 76, width: "w-[76%]" },
    { icon: GitBranch, name: "Git / GitHub", level: 91, width: "w-[91%]" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Profile image animation
      gsap.from(imageRef.current, {
        x: -100,
        opacity: 0,
        filter: "blur(10px)",
        duration: 1,
        ease: "power3.out",
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 80%",
          end: "bottom 20%",
        },
      });

      // Content fade-in
      gsap.from(contentRef.current?.children || [], {
        y: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: contentRef.current,
          start: "top 80%",
        },
      });

      // Skill cards animation
      gsap.from(skillsRef.current?.children || [], {
        y: 30,
        opacity: 0,
        scale: 0.9,
        duration: 0.6,
        stagger: 0.1,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: skillsRef.current,
          start: "top 85%",
        },
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section id="about" ref={sectionRef} className="py-20 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        {/* --- About Section --- */}
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Profile Image */}
          <div ref={imageRef} className="relative">
            <div className="relative w-80 h-80 mx-auto lg:mx-0">
              <div className="absolute inset-0 bg-gradient-primary rounded-full blur-xl opacity-30 animate-pulse" />

              <div className="relative w-full h-full glass rounded-full p-2 hover:shadow-glow-primary transition-all duration-500 group">
                <div className="w-full h-full cursor-pointer rounded-full overflow-hidden bg-gradient-secondary">
                  <img
                    src="/Images/siva-515.jpeg"
                    alt="AI & ML Engineer - Portfolio"
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                </div>
              </div>

              <div className="absolute -top-4 -right-4 w-8 h-8 bg-primary/30 rounded-full animate-float" />
              <div
                className="absolute -bottom-6 -left-6 w-12 h-12 bg-accent/20 rounded-full animate-float delay-[1s]"
              />
            </div>
          </div>

          {/* About Content */}
          <div ref={contentRef} className="space-y-6">
            <div>
              <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
                About <span className="text-primary-glow">Me</span>
              </h2>
              <div className="w-20 h-1 bg-gradient-primary rounded-full mb-6" />
            </div>

            <p className="text-lg text-muted-foreground leading-relaxed">
              I’m an AI & Machine Learning Engineer passionate about building intelligent, data-driven applications that bridge research and real-world impact.
              I specialize in Machine Learning, NLP, and LLM-based systems using TensorFlow, Keras, and Hugging Face.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              My work focuses on clean architecture, efficient model deployment, and seamless user interfaces powered by Flask, FastAPI, and Streamlit. I love experimenting with Generative AI, RAG, and Agentic AI frameworks to push the limits of modern intelligence systems.
            </p>

            <p className="text-lg text-muted-foreground leading-relaxed">
              When I’m not coding, I’m exploring new research in transformer models, mentoring peers, and contributing to hackathons and open-source AI communities.
            </p>

            <div className="flex flex-wrap gap-4 pt-4">
              <div className="glass px-4 py-2 rounded-lg">
                <span className="text-primary-glow font-medium">1</span>
                <span className="text-muted-foreground ml-1">Year Experience</span>
              </div>
              <div className="glass px-4 py-2 rounded-lg">
                <span className="text-secondary-glow font-medium">3+</span>
                <span className="text-muted-foreground ml-1">Projects Completed</span>
              </div>
              <div className="glass px-4 py-2 rounded-lg">
                <span className="text-accent-glow font-medium">100%</span>
                <span className="text-muted-foreground ml-1">Client Satisfaction</span>
              </div>
            </div>
          </div>
        </div>

        {/* --- Skills Section --- */}
        <div className="mt-20" ref={skillsRef}>
          <h3 className="text-3xl font-light text-center text-foreground mb-12">
            My <span className="text-primary-glow">Skills</span>
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {skills.map((skill) => (
              <div
                key={skill.name}
                className="glass p-6 rounded-xl cursor-pointer hover:shadow-glow-primary transition-all duration-300 hover:scale-105 group"
              >
                <div className="flex flex-col items-center text-center space-y-3">
                  <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center group-hover:animate-bounce shadow-inner">
                    <skill.icon size={24} className="text-primary-foreground" />
                  </div>

                  <h4 className="text-lg font-medium text-foreground">{skill.name}</h4>

                  {/* Progress Bar */}
                  <div className="w-full bg-muted rounded-full h-2">
                    <div
                      className={`bg-gradient-primary h-2 rounded-full transition-all duration-1000 ease-out ${skill.width}`}
                    />
                  </div>

                  <span className="text-primary-glow font-medium">{skill.level}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* --- Background Glows --- */}
      <div className="absolute top-0 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl translate-x-1/2 translate-y-1/2" />
    </section>
  );
};

export default About;
