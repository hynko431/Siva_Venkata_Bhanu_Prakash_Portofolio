import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { PaperPlaneTilt, GithubLogo, LinkedinLogo, Envelope, Phone, MapPin, TwitterLogo } from 'phosphor-react';
import { useToast } from '../hooks/use-toast';

gsap.registerPlugin(ScrollTrigger);

const Contact = () => {
  const { toast } = useToast();
  const sectionRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);
  const infoRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

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

      gsap.from(formRef.current?.children || [], {
        x: -50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: formRef.current,
          start: "top 80%"
        }
      });

      gsap.from(infoRef.current?.children || [], {
        x: 50,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: infoRef.current,
          start: "top 80%"
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const button = e.currentTarget.querySelector('button[type="submit"]');
    if (button) {
      gsap.to(button, {
        scale: 0.95,
        duration: 0.1,
        yoyo: true,
        repeat: 1,
        ease: "power2.out"
      });
    }

    try {
      const response = await fetch('http://localhost:8083/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        toast({
          title: "Success!",
          description: "Message sent successfully!",
        });
        setFormData({ name: '', email: '', message: '' });
      } else {
        throw new Error('Failed to send message');
      }
    } catch (error) {
      toast({
        title: "Error!",
        description: "Failed to send message. Please try again later.",
        variant: "destructive",
      });
    }
  };


  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <section id="contact" ref={sectionRef} className="py-20 px-6 relative overflow-hidden">
      <div className="container mx-auto max-w-6xl">
        <div ref={titleRef} className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-foreground mb-4">
            Get In <span className="text-primary-glow">Touch</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-primary rounded-full mx-auto mb-6" />
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Have a project in mind or just want to say hello? Drop me a message and let's create something amazing together.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          <div ref={formRef} className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-foreground mb-2 font-medium">
                  Name
                </label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleInputChange} required className="w-full px-4 py-3 bg-input glass border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300" placeholder="Your name" />
              </div>

              <div>
                <label htmlFor="email" className="block text-foreground mb-2 font-medium">
                  Email
                </label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} required className="w-full px-4 py-3 bg-input glass border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300" placeholder="your.email@example.com" />
              </div>

              <div>
                <label htmlFor="message" className="block text-foreground mb-2 font-medium">
                  Message
                </label>
                <textarea id="message" name="message" value={formData.message} onChange={handleInputChange} required rows={6} className="w-full px-4 py-3 bg-input glass border border-border rounded-lg text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent transition-all duration-300 resize-none" placeholder="Tell me about your project..." />
              </div>

              <button type="submit" className="group w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-gradient-primary text-primary-foreground rounded-lg font-medium hover:shadow-glow-primary transition-all duration-300 hover:scale-105">
                Send Message
                <PaperPlaneTilt size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
              </button>
            </form>
          </div>

          <div ref={infoRef} className="space-y-8">
            <div>
              <h3 className="text-2xl font-light text-foreground mb-6">
                Let's Connect
              </h3>
              <p className="text-muted-foreground leading-relaxed mb-8">
                I'm always excited to work on new projects and collaborate with amazing people.
                Whether you have a specific project in mind or just want to explore possibilities,
                I'd love to hear from you.
              </p>
            </div>

            <div className="space-y-4">
              <div className="flex items-center gap-4 p-4 glass rounded-lg hover:shadow-glow-primary transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <Envelope size={20} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="text-foreground font-medium">Email</p>
                  <p className="text-muted-foreground">irakamsivabhanuprakash@gmail.com</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 glass rounded-lg hover:shadow-glow-secondary transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center">
                  <Phone size={20} className="text-secondary-foreground" />
                </div>
                <div>
                  <p className="text-foreground font-medium">Phone</p>
                  <p className="text-muted-foreground">+91 8977899897</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 glass rounded-lg hover:shadow-glow-primary transition-all duration-300">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <MapPin size={20} className="text-primary-foreground" />
                </div>
                <div>
                  <p className="text-foreground font-medium">Location</p>
                  <p className="text-muted-foreground">Gudur, Tirupathi, A.P., India - 524101</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-lg font-medium text-foreground mb-4">Follow Me</h4>
              <div className="flex gap-4">
                <a href="https://github.com/hynko431" className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center hover:shadow-glow-primary transition-all duration-300 hover:scale-110" aria-label="GitHub Profile">
                  <GithubLogo size={20} className="text-primary-foreground" />
                </a>
                <a href="https://www.linkedin.com/in/siva-venkata-bhanu-prakash/" className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center hover:shadow-glow-secondary transition-all duration-300 hover:scale-110" aria-label="LinkedIn Profile">
                  <LinkedinLogo size={20} className="text-secondary-foreground" />
                </a>
                <a href="https://x.com/Sivabhanu7198" className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center hover:shadow-glow-secondary transition-all duration-300 hover:scale-110" aria-label="Twitter Profile">
                  <TwitterLogo size={20} className="text-secondary-foreground" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2" />
    </section>
  );
};

export default Contact;