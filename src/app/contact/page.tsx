"use client";

import React, { useState, useEffect, useRef, FormEvent, ReactNode } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Clock, // ← THIS WAS MISSING IN YOUR IMPORT!
  Instagram,
  Linkedin,
  Newspaper,
  Handshake,
  Loader2,
  Check,
  TrendingUp,
  Users,
  Award,
  Building2
} from "lucide-react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// YOUR WORKING URL (Keep this!)
const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbwCn43oFSYIBdiE2G1le-lHplEF8QEu4fSNR4Aphrq0c4_OHUodD6xNkrq4P-4iakSQKA/exec";

const FacebookIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
  </svg>
);

const ThreadsIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor">
    <path d="M12.186 24h-.007c-3.581-.024-6.334-1.205-8.184-3.509C2.35 18.44 1.5 15.586 1.5 12.01c0-3.576.85-6.43 2.495-8.481C5.845 1.225 8.598.044 12.179.02h.014c3.581.024 6.334 1.205 8.184 3.509C21.65 5.58 22.5 8.434 22.5 12.01c0 3.576-.85 6.43-2.495 8.481C18.155 22.775 15.402 23.956 11.821 23.98h-.007l.372-.004zM12.186 2.174c-2.922.02-5.049.725-6.312 2.096C4.52 5.608 3.75 7.768 3.75 12.01s.77 6.402 2.124 7.74c1.263 1.371 3.39 2.076 6.312 2.096 2.922-.02 5.049-.725 6.312-2.096 1.354-1.338 2.124-3.498 2.124-7.74s-.77-6.402-2.124-7.74c-1.263-1.371-3.39-2.076-6.312-2.096z" />
    <path d="M16.538 7.578c-.184-.247-.42-.46-.693-.625-.546-.33-1.246-.497-2.085-.497-1.56 0-2.65.678-3.238 2.015-.294.669-.442 1.445-.442 2.309 0 .1.003.199.008.297.05 1.25.34 2.26.863 3.007.523.747 1.264 1.125 2.204 1.125.94 0 1.681-.378 2.204-1.125.523-.747.813-1.757.863-3.007.005-.098.008-.197.008-.297 0-.864-.148-1.64-.442-2.309-.588-1.337-1.678-2.015-3.238-2.015-.839 0-1.539.167-2.085.497-.273.165-.509.378-.693.625z" />
  </svg>
);

const styles = `
@keyframes shake { 10%,90%{transform:translate3d(-1px,0,0)} 20%,80%{transform:translate3d(2px,0,0)} 30%,50%,70%{transform:translate3d(-4px,0,0)} 40%,60%{transform:translate3d(4px,0,0)} }
.animate-shake { animation: shake 0.5s ease-in-out; }
@keyframes animatedBackground { 0%{background-position:0% 50%} 50%{background-position:100% 50%} 100%{background-position:0% 50%} }
@keyframes pulse-glow { 0%,100%{box-shadow:0 0 20px rgba(252,209,41,0.3)} 50%{box-shadow:0 0 30px rgba(252,209,41,0.5)} }
.pulse-glow { animation: pulse-glow 2s ease-in-out infinite; }
.send-button { color:#000 !important; }
.dark-theme { background:linear-gradient(-45deg,#000,#020202,#000,#040404); background-size:400% 400%; animation:animatedBackground 25s ease infinite; color:#f9fafb; }
.dark-theme .map-iframe { filter:invert(90%) hue-rotate(180deg); }
.glass-card { background:rgba(255,255,255,0.05); backdrop-filter:blur(16px); border:1px solid rgba(255,255,255,0.15); box-shadow:0 4px 30px rgba(0,0,0,0.1); }
.glass-card input,.glass-card textarea,.glass-card select { background:rgba(255,255,255,0.1)!important; color:#f9fafb!important; border:1px solid rgba(255,255,255,0.2)!important; }
.glass-card option { background:#1f2937; color:#f9fafb; }
.metric-highlight { color:#fcd129; font-weight:700; }
`;

const FadeInOnScroll = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setIsVisible(true); observer.unobserve(entry.target); }
    }, { threshold: 0.1 });
    if (ref.current) observer.observe(ref.current);
    return () => { if (ref.current) observer.unobserve(ref.current); };
  }, []);
  return (
    <div ref={ref} className="transition-all duration-700 ease-out"
      style={{ opacity: isVisible ? 1 : 0, transform: isVisible ? "translateY(0)" : "translateY(20px)", transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
};

const HeroTypewriter = () => {
  const words = ["opportunities.", "partnerships.", "investments."];
  const [index, setIndex] = useState(0);
  const [text, setText] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const current = words[index];
      setText(deleting ? current.substring(0, text.length - 1) : current.substring(0, text.length + 1));
      if (!deleting && text === current) setTimeout(() => setDeleting(true), 1500);
      if (deleting && text === "") { setDeleting(false); setIndex((i) => (i + 1) % words.length); }
    }, deleting ? 75 : 100);
    return () => clearTimeout(timer);
  }, [text, deleting, index]);

  return (
    <p className="mt-5 text-lg sm:text-xl h-8">
      Connect with us to explore <span className="metric-highlight">{text}</span>
      <span className="animate-pulse">|</span>
    </p>
  );
};

const StarRating = ({ rating }: { rating: number }) => (
  <div className="flex gap-1">
    {[...Array(5)].map((_, i) => (
      <svg key={i} className="w-5 h-5" fill={i < rating ? "#fcd129" : "#e5e7eb"} viewBox="0 0 24 24">
        <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
      </svg>
    ))}
  </div>
);

const BusinessMetricsCard = () => (
  <div className="glass-card rounded-2xl p-8 shadow-lg">
    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
      <TrendingUp className="h-7 w-7" style={{ color: "#fcd129" }} />
      Business Overview
    </h3>
    <div className="grid grid-cols-3 gap-6 text-center">
      <div><div className="metric-highlight text-3xl font-bold">4.9</div><StarRating rating={4.9} /><p className="text-sm opacity-80 mt-2">Customer Rating</p></div>
      <div><div className="metric-highlight text-3xl font-bold">100+</div><p className="text-sm opacity-80 mt-1">Drivers</p></div>
      <div><div className="metric-highlight text-3xl font-bold">101%</div><p className="text-sm opacity-80 mt-1">YoY Growth</p></div>
    </div>
  </div>
);

const OfficeCardContent = () => (
  <>
    <h3 className="text-2xl font-bold mb-6 flex items-center gap-3">
      <Building2 className="h-7 w-7" style={{ color: "#fcd129" }} />
      Corporate Headquarters
    </h3>
    <div className="space-y-5">
      <div className="flex items-center gap-4"><MapPin className="h-6 w-6" style={{ color: "#fcd129" }} /><p>Oneplace 8th floor 807, Salunke Vihar, Pune- 411048, Maharashtra</p></div>
      <div className="flex items-center gap-4"><Phone className="h-6 w-6" style={{ color: "#fcd129" }} /><p>+91 8669888996</p></div>
      <div className="flex items-center gap-4"><Mail className="h-6 w-6" style={{ color: "#fcd129" }} /><p>hello@driwe.in</p></div>
      <div className="flex items-center gap-4"><Clock className="h-6 w-6" style={{ color: "#fcd129" }} /><div><p>Mon–Fri 10AM–7PM IST</p><p className="text-sm opacity-80">Executive meetings by appointment</p></div></div>
    </div>
  </>
);

export default function ContactPage() {
  const [formStatus, setFormStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isShaking, setIsShaking] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const formRef = useRef<HTMLFormElement>(null);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    const formData = new FormData(e.currentTarget);
    const name = (formData.get("name") as string)?.trim();
    const email = (formData.get("email") as string)?.trim();
    const phone = (formData.get("phone") as string)?.trim();
    const subject = formData.get("subject") as string;
    const message = (formData.get("message") as string)?.trim();

    if (!name) newErrors.name = "Name is required";
    if (!email) newErrors.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) newErrors.email = "Invalid email";
    if (phone && !/^\d{10}$/.test(phone.replace(/\D/g, ""))) newErrors.phone = "10 digits only";
    if (!subject) newErrors.subject = "Select inquiry type";
    if (!message) newErrors.message = "Message is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) {
      toast.error(Object.values(newErrors)[0]);
      setIsShaking(true);
      setTimeout(() => setIsShaking(false), 500);
      return;
    }

    setFormStatus("sending");

    try {
      await fetch(SCRIPT_URL, {
        method: "POST",
        body: formData,
        mode: "no-cors",
      });

      setFormStatus("sent");
      toast.success("Message saved to sheet! We'll reply soon.");
      formRef.current?.reset();
      setTimeout(() => setFormStatus("idle"), 3000);
    } catch (err) {
      console.error(err);
      setFormStatus("error");
      toast.error("Network error. Please try again.");
      setTimeout(() => setFormStatus("idle"), 4000);
    }
  };

  return (
    <div className="dark-theme font-sans min-h-screen">
      <ToastContainer position="top-right" autoClose={3000} theme="dark" />
      <style jsx>{styles}</style>

      <section className="min-h-screen flex items-center justify-center relative">
        <div className="text-center px-6 z-10" style={{ transform: `translateY(${scrollY * 0.4}px)` }}>
          <h1 className="text-5xl md:text-7xl font-bold">
            Connect with <span className="text-yellow-400">Innovation</span>
          </h1>
          <HeroTypewriter />
          <p className="mt-4 text-lg opacity-80 max-w-2xl mx-auto">
            Join industry leaders who trust Driwe to transform transportation.<br />
            Let&apos;s drive the future together.
          </p>
        </div>
      </section>

      <section className="px-6 lg:px-8 py-20 flex flex-col lg:flex-row gap-12">
        <div className="lg:w-1/2 lg:sticky lg:top-24 self-start">
          <FadeInOnScroll>
            <div className={`glass-card rounded-2xl p-8 shadow-2xl pulse-glow ${isShaking ? "animate-shake" : ""}`}>
              <h3 className="text-2xl font-bold mb-6">Let&apos;s Start a Conversation</h3>
              <form ref={formRef} onSubmit={handleFormSubmit} className="space-y-6" noValidate>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  <div><label className="block text-sm font-medium mb-2">Full Name *</label><input name="name" type="text" required className={`w-full rounded-lg px-4 py-3 ${errors.name ? "border-red-500" : ""}`} /></div>
                  <div><label className="block text-sm font-medium mb-2">Business Email *</label><input name="email" type="email" required className={`w-full rounded-lg px-4 py-3 ${errors.email ? "border-red-500" : ""}`} /></div>
                  <div><label className="block text-sm font-medium mb-2">Phone Number</label><input name="phone" type="tel" className={`w-full rounded-lg px-4 py-3 ${errors.phone ? "border-red-500" : ""}`} /></div>
                  <div><label className="block text-sm font-medium mb-2">Inquiry Type *</label>
                    <select name="subject" required className="w-full rounded-lg px-4 py-3">
                      <option value="">Select inquiry type</option>
                      <option>Investment Opportunities</option>
                      <option>Strategic Partnerships</option>
                      <option>Business Development</option>
                      <option>Media & Press</option>
                      <option>General Inquiry</option>
                    </select>
                  </div>
                </div>
                <div><label className="block text-sm font-medium mb-2">Message *</label>
                  <textarea name="message" rows={5} required placeholder="Tell us about your interest..." className={`w-full rounded-lg px-4 py-3 ${errors.message ? "border-red-500" : ""}`} />
                </div>
                <button type="submit" disabled={formStatus === "sending"} className="send-button bg-[#fcd129] font-bold px-8 py-3 rounded-lg flex items-center gap-2 min-w-[180px] justify-center hover:bg-[#eab308]">
                  {formStatus === "sending" ? <><Loader2 className="animate-spin h-5 w-5" /> Sending...</> :
                   formStatus === "sent" ? <><Check className="h-5 w-5" /> Sent!</> : "Send Message"}
                </button>
              </form>
            </div>
          </FadeInOnScroll>
        </div>

        <div className="lg:w-1/2 space-y-10">
          <FadeInOnScroll delay={100}><BusinessMetricsCard /></FadeInOnScroll>
          <FadeInOnScroll delay={200}><div className="glass-card rounded-2xl p-8 shadow-lg"><OfficeCardContent /></div></FadeInOnScroll>
          <FadeInOnScroll delay={300}><div className="glass-card rounded-2xl shadow-lg overflow-hidden"><iframe className="w-full h-96 map-iframe" src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3784.032612347271!2d73.90401807521406!3d18.482092182596486!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bc2ea427f62082f%3A0x1d5272a805a5a14!2sOne%20Place!5e0!3m2!1sen!2sin!4v1694514867495" allowFullScreen loading="lazy"></iframe></div></FadeInOnScroll>
          <FadeInOnScroll delay={400}><div className="glass-card rounded-2xl p-8 shadow-lg"><h3 className="text-xl font-bold mb-5 flex items-center gap-3"><Users className="h-6 w-6" style={{ color: "#fcd129" }} />Connect with Leadership</h3><div className="flex flex-wrap gap-4">
            <a href="https://www.facebook.com/profile.php?id=61575003763571" target="_blank" rel="noopener noreferrer" className="bg-[#1877F2] p-3 rounded-full"><FacebookIcon className="h-6 w-6" /></a>
            <a href="https://www.instagram.com/driwe.in" target="_blank" rel="noopener noreferrer" className="bg-[#E1306C] p-3 rounded-full"><Instagram className="h-6 w-6" /></a>
            <a href="https://www.linkedin.com/company/driwe-app" target="_blank" rel="noopener noreferrer" className="bg-[#0A66C2] p-3 rounded-full"><Linkedin className="h-6 w-6" /></a>
            <a href="https://www.threads.com/@driwe.in" target="_blank" rel="noopener noreferrer" className="bg-black p-3 rounded-full"><ThreadsIcon className="h-6 w-6" /></a>
          </div></div></FadeInOnScroll>
          <FadeInOnScroll delay={500}><div className="glass-card rounded-2xl p-8 shadow-lg"><h3 className="text-xl font-bold mb-6 flex items-center gap-3"><Award className="h-6 w-6" style={{ color: "#fcd129" }} />Professional Contacts</h3><div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="text-center"><TrendingUp className="h-10 w-10 mx-auto" style={{ color: "#fcd129" }} /><p className="font-bold mt-2">Investor Relations</p><p>hello@driwe.in</p></div>
            <div className="text-center"><Handshake className="h-10 w-10 mx-auto" style={{ color: "#fcd129" }} /><p className="font-bold mt-2">Partnerships</p><p>hello@driwe.in</p></div>
            <div className="text-center"><Newspaper className="h-10 w-10 mx-auto" style={{ color: "#fcd129" }} /><p className="font-bold mt-2">Media & Press</p><p>hello@driwe.in</p></div>
          </div></div></FadeInOnScroll>
        </div>
      </section>
    </div>
  );
}