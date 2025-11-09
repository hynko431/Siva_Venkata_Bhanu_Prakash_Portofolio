import { useState, useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { List, X } from 'phosphor-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navRef = useRef<HTMLElement>(null);
  const logoRef = useRef<HTMLDivElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const mobileMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    gsap.from(navRef.current, {
      y: -100,
      opacity: 0,
      duration: 1,
      ease: "power3.out",
      delay: 3.5 
    });

    gsap.from(logoRef.current, {
      x: -50,
      opacity: 0,
      duration: 0.8,
      ease: "power3.out",
      delay: 3.7
    });

    gsap.from(menuRef.current?.children || [], {
      y: -20,
      opacity: 0,
      duration: 0.6,
      stagger: 0.1,
      ease: "power3.out",
      delay: 3.8
    });
  }, []);

  useEffect(() => {
    if (isOpen) {
      gsap.to(mobileMenuRef.current, {
        x: 0,
        duration: 0.5,
        ease: "power3.out"
      });
      
      gsap.from(mobileMenuRef.current?.querySelectorAll('.menu-item') || [], {
        x: 50,
        opacity: 0,
        duration: 0.4,
        stagger: 0.1,
        ease: "power3.out",
        delay: 0.2
      });
    } else {
      gsap.to(mobileMenuRef.current, {
        x: '100%',
        duration: 0.5,
        ease: "power3.out"
      });
    }
  }, [isOpen]);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsOpen(false);
    }
  };

  const navItems = [
    { name: 'Home', id: 'hero' },
    { name: 'About', id: 'about' },
    { name: 'Projects', id: 'projects' },
    { name: 'Contact', id: 'contact' }
  ];

  return (
    <>
      <nav ref={navRef}className="fixed top-0 left-0 right-0 z-40 glass border-b border-white/10">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div ref={logoRef}>
              <h2 className="text-2xl font-bold text-primary-glow cursor-pointer">
                Portfolio
              </h2>
            </div>

            <div ref={menuRef} className="hidden md:flex items-center space-x-8">
              {navItems.map((item) => (
                <button key={item.id} onClick={() => scrollToSection(item.id)} className="text-foreground/80 hover:text-primary-glow transition-colors duration-300 font-light">
                  {item.name}
                </button>
              ))}
              
              <button onClick={() => scrollToSection('contact')}className="px-6 py-2 bg-gradient-primary text-primary-foreground rounded-lg hover:shadow-glow-primary transition-all duration-300 hover:scale-105">
                Hire Me
              </button>
            </div>

            <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-foreground p-2">
              <List size={24} />
            </button>
          </div>
        </div>
      </nav>

      <div ref={mobileMenuRef}className="fixed top-0 right-0 w-full h-full bg-background/95 backdrop-blur-lg z-50 transform translate-x-full md:hidden">
        <div className="flex items-center justify-between p-6 border-b border-white/10">
          <h2 className="text-2xl font-light text-primary-glow">Portfolio</h2>
          <button onClick={() => setIsOpen(false)} className="text-foreground p-2">
            <X size={24} />
          </button>
        </div>
        
        <div className="flex flex-col space-y-6 p-6 mt-8">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => scrollToSection(item.id)} className="menu-item text-left text-xl text-foreground/80 hover:text-primary-glow transition-colors duration-300">
              {item.name}
            </button>
          ))}
          
          <button onClick={() => scrollToSection('contact')}className="menu-item px-6 py-3 bg-gradient-primary text-primary-foreground rounded-lg hover:shadow-glow-primary transition-all duration-300 text-center mt-8">
            Hire Me
          </button>
        </div>
      </div>
    </>
  );
};

export default Navigation;