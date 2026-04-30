"use client";

import React, { useState, useEffect, useRef } from 'react';
import { Phone, Mail, MapPin, Shield, Clock, Users, ChevronDown, ArrowRight, Menu, X, CheckCircle, Star, FileText, Car, Home, Heart, Briefcase, Activity } from 'lucide-react';

const NAVY = '#1a1f5e';
const RED = '#cc1f1f';
const RED_DARK = '#a01818';
const CREAM = '#faf8f5';
const GOLD = '#c9a227';

const WA_NUMBER = '26774448102';
const WA_MESSAGE = encodeURIComponent("Hi, I'd like to get an insurance quote from Alfa First Projects.");
const WA_HREF = `https://wa.me/${WA_NUMBER}?text=${WA_MESSAGE}`;

const WhatsAppIcon = ({ size = 20, className = "" }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor" className={className}>
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/>
  </svg>
);

const SERVICES = [
  { icon: Heart, title: 'Life Insurance', short: 'Long Term', desc: 'Protect your family\'s financial future with comprehensive life cover tailored to your needs and budget.', features: ['Term life cover', 'Whole life policies', 'Family income benefit', 'Critical illness rider'], color: RED },
  { icon: FileText, title: 'Funeral Cover', short: 'Long Term', desc: 'Dignified farewell cover ensuring your loved ones are not burdened with funeral costs during a difficult time.', features: ['Immediate payout', 'Family group cover', 'Repatriation benefit', 'Affordable premiums'], color: NAVY },
  { icon: Car, title: 'Motor Insurance', short: 'Short Term', desc: 'Drive with confidence knowing your vehicle is fully protected against accidents, theft, and third-party claims.', features: ['Comprehensive cover', 'Third party liability', 'Windscreen cover', 'Roadside assistance'], color: RED },
  { icon: Home, title: 'Home & Property', short: 'Short Term', desc: 'Safeguard your most valuable asset — your home and its contents — against the unexpected.', features: ['Building cover', 'Contents insurance', 'All risks cover', 'Liability protection'], color: NAVY },
  { icon: Briefcase, title: 'Business Insurance', short: 'Short Term', desc: 'Comprehensive business solutions to keep your enterprise protected and operational no matter what.', features: ['Commercial property', 'Public liability', 'Business interruption', 'Employee cover'], color: RED },
  { icon: Activity, title: 'Medical Aid', short: 'Short Term', desc: 'Access quality healthcare without worry. We find you the right medical cover at the right price.', features: ['Hospital plans', 'Day-to-day benefits', 'Chronic medication', 'Dental & optical'], color: NAVY },
];

const WHY = [
  { icon: Shield, title: 'Independent Agency', desc: 'We work for YOU — not the insurers. Our advice is always in your best interest.' },
  { icon: Users, title: 'Personal Service', desc: 'A dedicated agent who knows your name, your family, and your coverage needs.' },
  { icon: Clock, title: 'Fast Quotes', desc: 'Get competitive quotes from multiple providers within 24 hours — hassle free.' },
  { icon: Star, title: 'Best Market Rates', desc: 'As an independent agency we access the full market to find you the best deal.' },
];

export default function AlfaFirstPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [expandedService, setExpandedService] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', message: '' });
  const [activeTab, setActiveTab] = useState('all');
  const [topBarHeight, setTopBarHeight] = useState(37);
  const topBarRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);

    const updateTopBarHeight = () => {
      if (topBarRef.current) setTopBarHeight(topBarRef.current.offsetHeight);
    };
    updateTopBarHeight();
    window.addEventListener('resize', updateTopBarHeight);

    const style = document.createElement('style');
    style.textContent = `
      html, body { overflow-x: hidden; max-width: 100vw; }

      @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,400;0,600;0,700;1,400;1,600&family=DM+Sans:wght@300;400;500;600;700&display=swap');

      @keyframes fadeUp   { from { opacity:0; transform:translateY(24px); } to { opacity:1; transform:translateY(0); } }
      @keyframes fadeIn   { from { opacity:0; } to { opacity:1; } }
      @keyframes slideRight { from { opacity:0; transform:translateX(-20px); } to { opacity:1; transform:translateX(0); } }
      @keyframes pulse-ring { 0% { transform:scale(1); opacity:0.6; } 100% { transform:scale(1.6); opacity:0; } }
      @keyframes heroLine { from { width:0; } to { width:48px; } }

      .hero-badge    { animation: fadeIn 0.5s ease 0s both; }
      .hero-eyebrow  { animation: slideRight 0.6s cubic-bezier(0.16,1,0.3,1) 0.1s both; }
      .hero-headline { animation: fadeUp 0.8s cubic-bezier(0.16,1,0.3,1) 0.2s both; }
      .hero-rule     { animation: heroLine 0.6s cubic-bezier(0.16,1,0.3,1) 0.45s both; }
      .hero-copy     { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.4s both; }
      .hero-ctas     { animation: fadeUp 0.7s cubic-bezier(0.16,1,0.3,1) 0.55s both; }
      .hero-trust    { animation: fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) 0.7s both; }

      .service-card:hover { transform: translateY(-4px); box-shadow: 0 20px 48px rgba(26,31,94,0.14); }
      .service-card { transition: transform 0.3s ease, box-shadow 0.3s ease; }

      .nav-link::after { content:''; display:block; width:0; height:2px; background:${RED}; transition: width 0.25s ease; margin-top:2px; }
      .nav-link:hover::after { width:100%; }

      .scroll-reveal { opacity:0; transform:translateY(20px); transition: opacity 0.6s ease, transform 0.6s ease; }
      .scroll-reveal.visible { opacity:1; transform:translateY(0); }

      .tab-btn.active { background: ${NAVY}; color: white; border-color: ${NAVY}; }
      .tab-btn { transition: all 0.2s; }

      body { font-family: 'DM Sans', sans-serif; }
      h1,h2,h3,.display { font-family: 'Cormorant Garamond', Georgia, serif; }

      ::-webkit-scrollbar { width: 5px; }
      ::-webkit-scrollbar-track { background: #f1f1f1; }
      ::-webkit-scrollbar-thumb { background: ${NAVY}; border-radius: 2px; }
    `;
    document.head.appendChild(style);

    const observer = new IntersectionObserver(
      (entries) => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    );
    setTimeout(() => {
      document.querySelectorAll('.scroll-reveal').forEach(el => observer.observe(el));
    }, 100);

    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', updateTopBarHeight);
      document.head.removeChild(style);
      observer.disconnect();
    };
  }, []);

  const smoothScroll = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setMobileMenuOpen(false);
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    const msg = encodeURIComponent(
      `Hi, I'd like an insurance quote!\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nService: ${form.service || 'General enquiry'}\nMessage: ${form.message}`
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
    setQuoteOpen(false);
    setForm({ name: '', phone: '', email: '', service: '', message: '' });
  };

  const filteredServices = activeTab === 'all'
    ? SERVICES
    : SERVICES.filter(s => s.short.toLowerCase().includes(activeTab));

  return (
    <div style={{ background: '#ffffff', fontFamily: "'DM Sans', sans-serif" }}>

      {/* ── Quote Modal ── */}
      {quoteOpen && (
        <div style={{ position:'fixed', inset:0, background:'rgba(0,0,0,0.6)', backdropFilter:'blur(4px)', zIndex:200, display:'flex', alignItems:'center', justifyContent:'center', padding:'16px' }}>
          <div style={{ background:'#fff', borderRadius:16, width:'100%', maxWidth:480, maxHeight:'90vh', overflowY:'auto', boxShadow:'0 32px 80px rgba(0,0,0,0.25)' }}>
            <div style={{ background:`linear-gradient(135deg, ${NAVY}, #2a3080)`, padding:'24px 28px', display:'flex', justifyContent:'space-between', alignItems:'center', borderRadius:'16px 16px 0 0' }}>
              <div>
                <div style={{ color:RED, fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', marginBottom:4 }}>Free Consultation</div>
                <h3 style={{ color:'white', fontSize:'1.5rem', fontFamily:'Cormorant Garamond, serif', fontWeight:700, margin:0 }}>Request a Quote</h3>
              </div>
              <button onClick={() => setQuoteOpen(false)} style={{ background:'rgba(255,255,255,0.1)', border:'none', borderRadius:8, width:36, height:36, display:'flex', alignItems:'center', justifyContent:'center', cursor:'pointer', color:'white' }}>
                <X size={18} />
              </button>
            </div>
            <form onSubmit={handleQuoteSubmit} style={{ padding:'28px', display:'flex', flexDirection:'column', gap:16 }}>
              {[
                { label:'Full Name *', id:'name', type:'text', placeholder:'John Doe', required:true },
                { label:'Phone Number *', id:'phone', type:'tel', placeholder:'+267 744 48102', required:true },
                { label:'Email Address', id:'email', type:'email', placeholder:'john@example.com' },
              ].map(f => (
                <div key={f.id}>
                  <label style={{ display:'block', fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:NAVY, marginBottom:6 }}>{f.label}</label>
                  <input type={f.type} required={f.required} placeholder={f.placeholder} value={form[f.id]}
                    onChange={e => setForm(p => ({...p, [f.id]: e.target.value}))}
                    style={{ width:'100%', padding:'11px 14px', borderRadius:8, border:`2px solid #e2e8f0`, fontSize:'0.9rem', outline:'none', boxSizing:'border-box', fontFamily:'DM Sans, sans-serif', transition:'border 0.2s' }}
                    onFocus={e => e.target.style.borderColor = NAVY}
                    onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                  />
                </div>
              ))}
              <div>
                <label style={{ display:'block', fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:NAVY, marginBottom:6 }}>Type of Cover</label>
                <select value={form.service} onChange={e => setForm(p => ({...p, service: e.target.value}))}
                  style={{ width:'100%', padding:'11px 14px', borderRadius:8, border:'2px solid #e2e8f0', fontSize:'0.9rem', outline:'none', fontFamily:'DM Sans, sans-serif', background:'white', boxSizing:'border-box' }}>
                  <option value="">Select a service</option>
                  {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                  <option value="General">General Enquiry</option>
                </select>
              </div>
              <div>
                <label style={{ display:'block', fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:NAVY, marginBottom:6 }}>Additional Details</label>
                <textarea rows={3} placeholder="Tell us about your needs..." value={form.message}
                  onChange={e => setForm(p => ({...p, message: e.target.value}))}
                  style={{ width:'100%', padding:'11px 14px', borderRadius:8, border:'2px solid #e2e8f0', fontSize:'0.9rem', outline:'none', resize:'none', fontFamily:'DM Sans, sans-serif', boxSizing:'border-box' }}
                />
              </div>
              <button type="submit" style={{ background:`linear-gradient(135deg, ${RED}, ${RED_DARK})`, color:'white', border:'none', padding:'14px 24px', borderRadius:10, fontSize:'0.95rem', fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, boxShadow:`0 8px 24px ${RED}40` }}>
                <WhatsAppIcon size={18} /> Send via WhatsApp
              </button>
              <p style={{ textAlign:'center', fontSize:'0.78rem', color:'#94a3b8', margin:0 }}>We'll respond within 24 hours during business hours</p>
            </form>
          </div>
        </div>
      )}

      {/* ── Floating WhatsApp ── */}
      <div style={{ position:'fixed', bottom:28, right:28, zIndex:100 }}>
        <div style={{ position:'relative' }}>
          <div style={{ position:'absolute', inset:0, borderRadius:'50%', background:'#25D366', animation:'pulse-ring 2s ease-out infinite' }} />
          <a href={WA_HREF} target="_blank" rel="noopener noreferrer"
            aria-label="Chat on WhatsApp"
            style={{ width:56, height:56, borderRadius:'50%', background:'#25D366', display:'flex', alignItems:'center', justifyContent:'center', boxShadow:'0 6px 24px rgba(37,211,102,0.5)', position:'relative', textDecoration:'none', transition:'transform 0.2s' }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.1)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            <WhatsAppIcon size={28} />
          </a>
        </div>
      </div>

      {/* ── Top Bar ── */}
      <div ref={topBarRef} style={{ background:NAVY, color:'white', padding:'7px 24px', fontSize:'0.8rem', position:'fixed', top:0, left:0, right:0, zIndex:51 }}>
        <div style={{ maxWidth:1200, margin:'0 auto', display:'flex', justifyContent:'space-between', alignItems:'center' }}>
          <div style={{ display:'flex', alignItems:'center', gap:20 }}>
            <a href="tel:+26774448102" style={{ color:'rgba(255,255,255,0.85)', textDecoration:'none', display:'flex', alignItems:'center', gap:6 }}>
              <Phone size={13} /> <span style={{ fontWeight:600 }}>+267 744 48102</span>
            </a>
            <a href="mailto:alfafirstprojects@gmail.com" className="topbar-email" style={{ color:'rgba(255,255,255,0.7)', textDecoration:'none', display:'flex', alignItems:'center', gap:6, fontSize:'0.78rem' }}>
              <Mail size={13} /> <span>alfafirstprojects@gmail.com</span>
            </a>
          </div>
          <button onClick={() => setQuoteOpen(true)}
            style={{ background:RED, color:'white', border:'none', padding:'4px 14px', borderRadius:5, fontWeight:700, fontSize:'0.75rem', cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>
            Get Quote
          </button>
        </div>
      </div>

      {/* ── Navigation ── */}
      <header style={{ background:'white', borderBottom:'1px solid rgba(26,31,94,0.08)', position:'fixed', top:topBarHeight, left:0, right:0, zIndex:50, boxShadow:scrolled ? '0 4px 24px rgba(26,31,94,0.1)' : 'none', transition:'box-shadow 0.3s' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 24px', display:'flex', justifyContent:'space-between', alignItems:'center', height:72 }}>
          <div style={{ display:'flex', flexDirection:'column', lineHeight:1 }}>
            <span style={{ fontFamily:'Cormorant Garamond, serif', fontWeight:700, fontSize:'1.35rem', color:NAVY, letterSpacing:'0.04em', textTransform:'uppercase' }}>
              ALFA F<span style={{ color:RED }}>I</span>RST PROJECTS
            </span>
            <span style={{ fontSize:'0.58rem', color:RED, fontWeight:700, letterSpacing:'0.22em', textTransform:'uppercase' }}>
              "The Ultimate Choice"
            </span>
          </div>

          <nav style={{ display:'flex', gap:28, alignItems:'center' }} className="hidden-mobile">
            {[['home','Home'],['services','Services'],['about','About Us'],['contact','Contact']].map(([id, label]) => (
              <button key={id} onClick={() => smoothScroll(id)}
                className="nav-link"
                style={{ background:'none', border:'none', fontSize:'0.88rem', fontWeight:600, color:NAVY, cursor:'pointer', fontFamily:'DM Sans, sans-serif', padding:0 }}>
                {label}
              </button>
            ))}
            <button onClick={() => setQuoteOpen(true)}
              style={{ background:`linear-gradient(135deg, ${RED}, ${RED_DARK})`, color:'white', border:'none', padding:'10px 22px', borderRadius:8, fontWeight:700, fontSize:'0.88rem', cursor:'pointer', fontFamily:'DM Sans, sans-serif', boxShadow:`0 4px 16px ${RED}35` }}>
              Get Quote
            </button>
          </nav>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            style={{ display:'none', background:'none', border:'none', cursor:'pointer', color:NAVY }}
            className="mobile-menu-btn">
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div style={{ background:'white', borderTop:'1px solid rgba(26,31,94,0.08)', padding:'16px 24px', display:'flex', flexDirection:'column', gap:4 }}>
            {[['home','Home'],['services','Services'],['about','About Us'],['contact','Contact']].map(([id, label]) => (
              <button key={id} onClick={() => smoothScroll(id)}
                style={{ background:'none', border:'none', textAlign:'left', padding:'10px 12px', fontSize:'1rem', fontWeight:600, color:NAVY, cursor:'pointer', borderRadius:8, fontFamily:'DM Sans, sans-serif' }}>
                {label}
              </button>
            ))}
            <button onClick={() => { setQuoteOpen(true); setMobileMenuOpen(false); }}
              style={{ background:`linear-gradient(135deg, ${RED}, ${RED_DARK})`, color:'white', border:'none', padding:'12px 22px', borderRadius:8, fontWeight:700, marginTop:8, cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>
              Get Free Quote
            </button>
          </div>
        )}
      </header>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .topbar-email { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .why-grid { grid-template-columns: 1fr 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .about-grid { grid-template-columns: 1fr !important; }
        }
        @media (max-width: 480px) {
          .why-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>

      {/* ══════════════════ HERO — full-width, lightened overlay, no right panel ══════════════════ */}
      <section id="home" style={{
        background: `linear-gradient(150deg, ${NAVY}66 0%, #14185044 45%, #1c226822 75%, #1c226811 100%), url('/shutterstock_Multi-Generational-Family.jpg') center 20%/cover no-repeat`,
        minHeight: '82vh',
        paddingTop: topBarHeight + 72,
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>

        {/* Subtle grid texture */}
        <div style={{ position:'absolute', inset:0, opacity:0.03, backgroundImage:`repeating-linear-gradient(0deg, white 0, white 1px, transparent 0, transparent 60px), repeating-linear-gradient(90deg, white 0, white 1px, transparent 0, transparent 60px)`, backgroundSize:'60px 60px' }} />

        {/* Red glow top-right */}
        <div style={{ position:'absolute', top:-120, right:-80, width:480, height:480, borderRadius:'50%', background:`radial-gradient(circle, ${RED}22 0%, transparent 65%)`, pointerEvents:'none' }} />
        {/* Subtle bottom accent */}
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:1, background:`linear-gradient(90deg, transparent, ${RED}50, transparent)` }} />

        <div style={{ maxWidth:1200, margin:'0 auto', padding:'120px 24px 80px', width:'100%', position:'relative', zIndex:1 }}>

          {/* ── Text content — full width ── */}
          <div style={{ maxWidth: 700 }}>
            {/* Headline */}
            <h1 className="hero-headline" style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(2.8rem, 6vw, 5.4rem)', fontWeight:700, color:'white', lineHeight:1.0, letterSpacing:'-0.01em', margin:'0 0 20px', textShadow:'0 2px 16px rgba(0,0,0,0.5)' }}>
              Your Insurance.{' '}
              <br />
              <em style={{ color:'#ff3333', fontStyle:'italic', textShadow:'0 1px 12px rgba(0,0,0,0.8), 0 0 30px rgba(0,0,0,0.6)' }}>
                Our Priority.
              </em>
            </h1>

            {/* Copy — short & punchy */}
            <p className="hero-copy" style={{ color:'rgba(255,255,255,0.95)', fontSize:'1rem', lineHeight:1.7, margin:'0 0 32px', maxWidth:'38ch', textShadow:'0 1px 8px rgba(0,0,0,0.6)' }}>
              Gaborone's independent insurance agency — long term &amp; short term cover at the best price.
            </p>

            {/* CTAs */}
            <div className="hero-ctas" style={{ display:'flex', gap:12, flexWrap:'wrap', marginBottom:40 }}>
              <button onClick={() => setQuoteOpen(true)}
                style={{ background:`linear-gradient(135deg, ${RED}, ${RED_DARK})`, color:'white', border:'none', padding:'13px 28px', borderRadius:9, fontWeight:700, fontSize:'0.92rem', cursor:'pointer', fontFamily:'DM Sans, sans-serif', boxShadow:`0 8px 28px ${RED}50`, display:'flex', alignItems:'center', gap:8, transition:'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform='translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform='translateY(0)'}>
                Get Free Quote <ArrowRight size={16} />
              </button>
              <button onClick={() => smoothScroll('services')}
                style={{ background:'rgba(0,0,0,0.45)', color:'white', border:'1px solid rgba(255,255,255,0.4)', padding:'13px 24px', borderRadius:9, fontWeight:600, fontSize:'0.92rem', cursor:'pointer', fontFamily:'DM Sans, sans-serif', transition:'all 0.2s', backdropFilter:'blur(4px)' }}
                onMouseEnter={e => { e.currentTarget.style.background='rgba(0,0,0,0.65)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.6)'; }}
                onMouseLeave={e => { e.currentTarget.style.background='rgba(0,0,0,0.45)'; e.currentTarget.style.borderColor='rgba(255,255,255,0.4)'; }}>
                Our Services
              </button>
            </div>


          </div>
        </div>

        {/* Wave bottom */}
        <div style={{ position:'absolute', bottom:-1, left:0, right:0 }}>
          <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', display:'block' }} preserveAspectRatio="none">
            <path d="M0 64L1440 64L1440 16C1200 48 960 64 720 56C480 48 240 16 0 32L0 64Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ══════════════════ SERVICES ══════════════════ */}
      <section id="services" style={{ background:CREAM, padding:'80px 0 96px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 24px' }}>
          <div className="scroll-reveal" style={{ marginBottom:48 }}>
            <div style={{ display:'inline-block', background:`${RED}12`, border:`1px solid ${RED}30`, borderRadius:40, padding:'5px 16px', marginBottom:16 }}>
              <span style={{ color:RED, fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase' }}>What We Offer</span>
            </div>
            <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-end', flexWrap:'wrap', gap:16 }}>
              <h2 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(2rem, 4vw, 3rem)', fontWeight:700, color:NAVY, margin:0, lineHeight:1.1 }}>
                Complete Insurance<br /><em style={{ color:RED }}>Solutions</em>
              </h2>
              <div style={{ display:'flex', gap:8 }}>
                {[['all','All Services'],['long','Long Term'],['short','Short Term']].map(([val, label]) => (
                  <button key={val} onClick={() => setActiveTab(val)}
                    className={`tab-btn${activeTab === val ? ' active' : ''}`}
                    style={{ padding:'7px 16px', borderRadius:40, fontSize:'0.78rem', fontWeight:600, border:`1px solid ${activeTab === val ? NAVY : 'rgba(26,31,94,0.2)'}`, background:activeTab === val ? NAVY : 'white', color:activeTab === val ? 'white' : NAVY, cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>
                    {label}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="services-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:20 }}>
            {filteredServices.map((s, i) => {
              const Icon = s.icon;
              const isExpanded = expandedService === s.title;
              return (
                <div key={s.title} className="service-card scroll-reveal" style={{ background:'white', borderRadius:14, overflow:'hidden', border:'1px solid rgba(26,31,94,0.07)', transitionDelay:`${i * 0.05}s` }}>
                  <div style={{ height:4, background:`linear-gradient(90deg, ${s.color}, ${s.color}70)` }} />
                  <div style={{ padding:'28px 24px 20px' }}>
                    <div style={{ display:'flex', justifyContent:'space-between', alignItems:'flex-start', marginBottom:16 }}>
                      <div style={{ width:44, height:44, borderRadius:10, background:`${s.color}12`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                        <Icon size={20} style={{ color:s.color }} />
                      </div>
                      <span style={{ background:s.color === RED ? `${RED}12` : `${NAVY}10`, color:s.color, fontSize:'0.62rem', fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', padding:'3px 10px', borderRadius:40, border:`1px solid ${s.color}30` }}>
                        {s.short}
                      </span>
                    </div>
                    <h3 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'1.3rem', fontWeight:700, color:NAVY, marginBottom:10 }}>{s.title}</h3>
                    <p style={{ fontSize:'0.88rem', color:'#64748b', lineHeight:1.7, marginBottom:16 }}>{s.desc}</p>
                    <div style={{ maxHeight:isExpanded ? 200 : 0, overflow:'hidden', transition:'max-height 0.4s ease', marginBottom:isExpanded ? 16 : 0 }}>
                      <ul style={{ margin:0, padding:0, listStyle:'none', display:'flex', flexDirection:'column', gap:8 }}>
                        {s.features.map(f => (
                          <li key={f} style={{ display:'flex', alignItems:'center', gap:8, fontSize:'0.84rem', color:'#475569' }}>
                            <div style={{ width:5, height:5, borderRadius:'50%', background:s.color, flexShrink:0 }} />
                            {f}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div style={{ display:'flex', gap:8 }}>
                      <button onClick={() => setExpandedService(isExpanded ? null : s.title)}
                        style={{ flex:1, background:'none', border:`1px solid rgba(26,31,94,0.15)`, borderRadius:8, padding:'9px 14px', fontSize:'0.8rem', fontWeight:600, color:NAVY, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:6, fontFamily:'DM Sans, sans-serif' }}>
                        {isExpanded ? 'Less' : 'Details'} <ChevronDown size={14} style={{ transform:isExpanded ? 'rotate(180deg)' : 'none', transition:'transform 0.3s' }} />
                      </button>
                      <button onClick={() => { setForm(p => ({...p, service: s.title})); setQuoteOpen(true); }}
                        style={{ flex:1, background:`linear-gradient(135deg, ${s.color}, ${s.color === RED ? RED_DARK : '#141850'})`, border:'none', borderRadius:8, padding:'9px 14px', fontSize:'0.8rem', fontWeight:700, color:'white', cursor:'pointer', fontFamily:'DM Sans, sans-serif' }}>
                        Get Quote
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ══════════════════ WHY ALFA FIRST ══════════════════ */}
      <section id="about" style={{ background:'white', padding:'88px 0' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 24px' }}>
          <div className="about-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:72, alignItems:'center' }}>
            <div className="scroll-reveal">
              <div style={{ display:'inline-block', background:`${NAVY}0d`, border:`1px solid ${NAVY}25`, borderRadius:40, padding:'5px 16px', marginBottom:20 }}>
                <span style={{ color:NAVY, fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase' }}>About Alfa First</span>
              </div>
              <h2 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(2rem, 4vw, 3rem)', fontWeight:700, color:NAVY, lineHeight:1.1, marginBottom:20 }}>
                Independent Agency<br /><em style={{ color:RED }}>Working for You</em>
              </h2>
              <div style={{ width:48, height:3, background:`linear-gradient(90deg, ${RED}, ${GOLD})`, marginBottom:24, borderRadius:2 }} />
              <p style={{ color:'#475569', lineHeight:1.85, marginBottom:16, fontSize:'0.95rem' }}>
                Alfa First Projects is a NBFIRA-licensed insurance agency based in Gaborone, Botswana. We specialise in both long term and short term insurance solutions for individuals, families, and businesses across Botswana.
              </p>
              <p style={{ color:'#475569', lineHeight:1.85, marginBottom:32, fontSize:'0.95rem' }}>
                As an independent agency, our loyalty is always to our clients — never to the insurers. We access the full Botswana insurance market to find you the right cover at the best possible price.
              </p>
              <div style={{ display:'flex', gap:16, alignItems:'center' }}>
                <button onClick={() => setQuoteOpen(true)}
                  style={{ background:`linear-gradient(135deg, ${RED}, ${RED_DARK})`, color:'white', border:'none', padding:'12px 24px', borderRadius:9, fontWeight:700, fontSize:'0.9rem', cursor:'pointer', fontFamily:'DM Sans, sans-serif', display:'flex', alignItems:'center', gap:8 }}>
                  Start Today <ArrowRight size={15} />
                </button>
                <a href={WA_HREF} target="_blank" rel="noopener noreferrer"
                  style={{ color:'#25D366', fontWeight:700, fontSize:'0.9rem', textDecoration:'none', display:'flex', alignItems:'center', gap:6 }}>
                  <WhatsAppIcon size={18} /> Chat with us
                </a>
              </div>
            </div>

            <div className="why-grid scroll-reveal" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:16 }}>
              {WHY.map((w, i) => {
                const Icon = w.icon;
                return (
                  <div key={i} style={{ background:CREAM, borderRadius:12, padding:'24px 20px', border:'1px solid rgba(26,31,94,0.07)' }}>
                    <div style={{ width:40, height:40, borderRadius:10, background:i % 2 === 0 ? `${RED}15` : `${NAVY}10`, display:'flex', alignItems:'center', justifyContent:'center', marginBottom:14 }}>
                      <Icon size={18} style={{ color:i % 2 === 0 ? RED : NAVY }} />
                    </div>
                    <h4 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'1.05rem', fontWeight:700, color:NAVY, marginBottom:8 }}>{w.title}</h4>
                    <p style={{ fontSize:'0.82rem', color:'#64748b', lineHeight:1.65 }}>{w.desc}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ CTA BAND ══════════════════ */}
      <section style={{ background:`linear-gradient(135deg, ${NAVY} 0%, #141850 50%, ${NAVY} 100%)`, padding:'72px 24px', position:'relative', overflow:'hidden' }}>
        <div style={{ position:'absolute', top:-80, right:-80, width:320, height:320, borderRadius:'50%', background:`${RED}20` }} />
        <div style={{ position:'absolute', bottom:-60, left:-60, width:240, height:240, borderRadius:'50%', background:`${RED}15` }} />
        <div style={{ maxWidth:800, margin:'0 auto', textAlign:'center', position:'relative', zIndex:1 }}>
          <h2 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(2rem, 5vw, 3.5rem)', fontWeight:700, color:'white', marginBottom:16 }}>
            Ready to Get Protected?
          </h2>
          <p style={{ color:'rgba(255,255,255,0.72)', fontSize:'1rem', lineHeight:1.8, marginBottom:8, fontStyle:'italic' }}>
            "The Ultimate Choice" — Alfa First Projects
          </p>
          <p style={{ color:'rgba(255,255,255,0.6)', fontSize:'0.95rem', marginBottom:36 }}>
            Get a free, no-obligation insurance quote today. We'll respond within 24 hours.
          </p>
          <div style={{ display:'flex', gap:12, justifyContent:'center', flexWrap:'wrap' }}>
            <button onClick={() => setQuoteOpen(true)}
              style={{ background:`linear-gradient(135deg, ${RED}, ${RED_DARK})`, color:'white', border:'none', padding:'14px 32px', borderRadius:10, fontWeight:700, fontSize:'1rem', cursor:'pointer', fontFamily:'DM Sans, sans-serif', boxShadow:`0 8px 28px ${RED}50`, display:'flex', alignItems:'center', gap:8 }}>
              Request Free Quote <ArrowRight size={17} />
            </button>
            <a href={WA_HREF} target="_blank" rel="noopener noreferrer"
              style={{ background:'#25D366', color:'white', border:'none', padding:'14px 28px', borderRadius:10, fontWeight:700, fontSize:'1rem', textDecoration:'none', display:'flex', alignItems:'center', gap:8, boxShadow:'0 8px 28px rgba(37,211,102,0.4)' }}>
              <WhatsAppIcon size={18} /> WhatsApp Us
            </a>
          </div>
        </div>
      </section>

      {/* ══════════════════ CONTACT ══════════════════ */}
      <section id="contact" style={{ background:CREAM, padding:'88px 0' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 24px' }}>
          <div className="scroll-reveal" style={{ marginBottom:48, textAlign:'center' }}>
            <div style={{ display:'inline-block', background:`${RED}12`, border:`1px solid ${RED}30`, borderRadius:40, padding:'5px 16px', marginBottom:16 }}>
              <span style={{ color:RED, fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase' }}>Get in Touch</span>
            </div>
            <h2 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(2rem, 4vw, 3rem)', fontWeight:700, color:NAVY }}>
              We're Here to Help
            </h2>
          </div>

          <div className="contact-grid scroll-reveal" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:24 }}>
            <div style={{ display:'flex', flexDirection:'column', gap:16 }}>
              {[
                { icon:Phone, label:'Phone / WhatsApp', value:'+267 744 48102', href:'tel:+26774448102', note:'Mon–Fri, 8am–5pm' },
                { icon:Mail, label:'Email', value:'info@alfafirstprojects.co.bw', href:'mailto:info@alfafirstprojects.co.bw', note:'We reply within 24 hours' },
                { icon:MapPin, label:'Location', value:'Gaborone, Botswana', href:'#', note:'Serving clients nationwide' },
              ].map(c => {
                const Icon = c.icon;
                return (
                  <a key={c.label} href={c.href}
                    style={{ background:'white', borderRadius:12, padding:'22px 24px', display:'flex', alignItems:'flex-start', gap:16, textDecoration:'none', border:'1px solid rgba(26,31,94,0.08)', transition:'transform 0.2s, box-shadow 0.2s' }}
                    onMouseEnter={e => { e.currentTarget.style.transform='translateX(4px)'; e.currentTarget.style.boxShadow='0 8px 24px rgba(26,31,94,0.1)'; }}
                    onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}>
                    <div style={{ width:44, height:44, borderRadius:10, background:`${NAVY}0d`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <Icon size={18} style={{ color:NAVY }} />
                    </div>
                    <div>
                      <div style={{ fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:RED, marginBottom:3 }}>{c.label}</div>
                      <div style={{ fontWeight:600, color:NAVY, fontSize:'0.95rem', marginBottom:2 }}>{c.value}</div>
                      <div style={{ fontSize:'0.8rem', color:'#94a3b8' }}>{c.note}</div>
                    </div>
                  </a>
                );
              })}
              <div style={{ background:NAVY, borderRadius:12, padding:'22px 24px', border:`1px solid ${NAVY}` }}>
                <div style={{ color:RED, fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', marginBottom:8 }}>Business Hours</div>
                <div style={{ color:'white', fontWeight:600, marginBottom:4 }}>Monday – Friday</div>
                <div style={{ color:'rgba(255,255,255,0.7)', fontSize:'0.9rem', marginBottom:12 }}>8:00 AM – 5:00 PM</div>
                <div style={{ color:'rgba(255,255,255,0.45)', fontSize:'0.8rem' }}>Saturdays by appointment</div>
              </div>
            </div>

            <div style={{ background:'white', borderRadius:16, padding:'32px 28px', border:'1px solid rgba(26,31,94,0.08)', boxShadow:'0 8px 32px rgba(26,31,94,0.06)' }}>
              <h3 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'1.5rem', fontWeight:700, color:NAVY, marginBottom:6 }}>Request a Quote</h3>
              <p style={{ color:'#94a3b8', fontSize:'0.85rem', marginBottom:24 }}>Fill in your details and we'll get back to you promptly.</p>
              <form onSubmit={handleQuoteSubmit} style={{ display:'flex', flexDirection:'column', gap:14 }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:12 }}>
                  {[{id:'name',label:'Name *',type:'text',placeholder:'John Doe',required:true},{id:'phone',label:'Phone *',type:'tel',placeholder:'+267 744 48102',required:true}].map(f => (
                    <div key={f.id}>
                      <label style={{ display:'block', fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:NAVY, marginBottom:5 }}>{f.label}</label>
                      <input type={f.type} required={f.required} placeholder={f.placeholder} value={form[f.id]}
                        onChange={e => setForm(p => ({...p, [f.id]: e.target.value}))}
                        style={{ width:'100%', padding:'10px 12px', borderRadius:7, border:'1.5px solid #e2e8f0', fontSize:'0.88rem', fontFamily:'DM Sans, sans-serif', outline:'none', boxSizing:'border-box' }}
                        onFocus={e => e.target.style.borderColor = NAVY}
                        onBlur={e => e.target.style.borderColor = '#e2e8f0'}
                      />
                    </div>
                  ))}
                </div>
                <div>
                  <label style={{ display:'block', fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:NAVY, marginBottom:5 }}>Email</label>
                  <input type="email" placeholder="john@example.com" value={form.email}
                    onChange={e => setForm(p => ({...p, email: e.target.value}))}
                    style={{ width:'100%', padding:'10px 12px', borderRadius:7, border:'1.5px solid #e2e8f0', fontSize:'0.88rem', fontFamily:'DM Sans, sans-serif', outline:'none', boxSizing:'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display:'block', fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:NAVY, marginBottom:5 }}>Type of Cover</label>
                  <select value={form.service} onChange={e => setForm(p => ({...p, service: e.target.value}))}
                    style={{ width:'100%', padding:'10px 12px', borderRadius:7, border:'1.5px solid #e2e8f0', fontSize:'0.88rem', fontFamily:'DM Sans, sans-serif', outline:'none', background:'white', boxSizing:'border-box' }}>
                    <option value="">Select service</option>
                    {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display:'block', fontSize:'0.7rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:NAVY, marginBottom:5 }}>Message</label>
                  <textarea rows={3} placeholder="Any additional details..." value={form.message}
                    onChange={e => setForm(p => ({...p, message: e.target.value}))}
                    style={{ width:'100%', padding:'10px 12px', borderRadius:7, border:'1.5px solid #e2e8f0', fontSize:'0.88rem', fontFamily:'DM Sans, sans-serif', outline:'none', resize:'none', boxSizing:'border-box' }}
                  />
                </div>
                <button type="submit"
                  style={{ background:`linear-gradient(135deg, ${RED}, ${RED_DARK})`, color:'white', border:'none', padding:13, borderRadius:9, fontWeight:700, fontSize:'0.92rem', cursor:'pointer', fontFamily:'DM Sans, sans-serif', display:'flex', alignItems:'center', justifyContent:'center', gap:8, boxShadow:`0 6px 20px ${RED}35` }}>
                  <WhatsAppIcon size={17} /> Send via WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ FOOTER ══════════════════ */}
      <footer style={{ background:NAVY, color:'white', padding:'56px 24px 32px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto' }}>
          <div className="footer-grid" style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1fr', gap:40, marginBottom:48 }}>
            <div>
              <div style={{ marginBottom:8 }}>
                <div style={{ fontFamily:'Cormorant Garamond, serif', fontWeight:700, fontSize:'1.4rem', color:'white', letterSpacing:'0.04em', textTransform:'uppercase' }}>
                  ALFA F<span style={{ color:RED }}>I</span>RST PROJECTS
                </div>
                <div style={{ fontSize:'0.6rem', color:RED, fontWeight:700, letterSpacing:'0.22em', textTransform:'uppercase' }}>"The Ultimate Choice"</div>
              </div>
              <p style={{ color:'rgba(255,255,255,0.5)', fontSize:'0.88rem', lineHeight:1.7, marginBottom:20, maxWidth:'30ch' }}>
                Long term & short term insurance solutions. Licensed by NBFIRA.
              </p>
              <a href={WA_HREF} target="_blank" rel="noopener noreferrer"
                style={{ display:'inline-flex', alignItems:'center', gap:8, background:'#25D366', color:'white', padding:'9px 18px', borderRadius:8, fontSize:'0.85rem', fontWeight:700, textDecoration:'none' }}>
                <WhatsAppIcon size={16} /> WhatsApp Us
              </a>
            </div>

            <div>
              <h4 style={{ fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:RED, marginBottom:20 }}>Services</h4>
              {SERVICES.map(s => (
                <div key={s.title} style={{ color:'rgba(255,255,255,0.55)', fontSize:'0.88rem', marginBottom:10, cursor:'pointer' }}
                  onClick={() => smoothScroll('services')}>
                  {s.title}
                </div>
              ))}
            </div>

            <div>
              <h4 style={{ fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:RED, marginBottom:20 }}>Quick Links</h4>
              {[['home','Home'],['services','Services'],['about','About Us'],['contact','Contact']].map(([id, label]) => (
                <div key={id} style={{ color:'rgba(255,255,255,0.55)', fontSize:'0.88rem', marginBottom:10, cursor:'pointer' }}
                  onClick={() => smoothScroll(id)}>
                  {label}
                </div>
              ))}
            </div>

            <div>
              <h4 style={{ fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:RED, marginBottom:20 }}>Contact</h4>
              <div style={{ display:'flex', flexDirection:'column', gap:12 }}>
                <a href="tel:+26774448102" style={{ color:'rgba(255,255,255,0.6)', fontSize:'0.88rem', textDecoration:'none', display:'flex', alignItems:'center', gap:8 }}>
                  <Phone size={13} style={{ color:RED }} /> +267 744 48102
                </a>
                <a href="mailto:info@alfafirstprojects.co.bw" style={{ color:'rgba(255,255,255,0.6)', fontSize:'0.88rem', textDecoration:'none', display:'flex', alignItems:'center', gap:8 }}>
                  <Mail size={13} style={{ color:RED }} /> info@alfafirstprojects.co.bw
                </a>
                <div style={{ color:'rgba(255,255,255,0.6)', fontSize:'0.88rem', display:'flex', alignItems:'flex-start', gap:8 }}>
                  <MapPin size={13} style={{ color:RED, flexShrink:0, marginTop:2 }} /> Gaborone, Botswana
                </div>
              </div>
            </div>
          </div>

          <div style={{ borderTop:'1px solid rgba(255,255,255,0.1)', paddingTop:24, display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
            <p style={{ color:'rgba(255,255,255,0.35)', fontSize:'0.8rem', margin:0 }}>
              © 2026 Alfa First Projects. Licensed by NBFIRA. All rights reserved.
            </p>
            <p style={{ color:'rgba(255,255,255,0.35)', fontSize:'0.8rem', margin:0 }}>
              Made with ❤️ by{' '}
              <a href="https://bitroot-dev.vercel.app" target="_blank" rel="noopener noreferrer"
                style={{ color:RED, textDecoration:'none', fontWeight:700 }}>
                BITROOT
              </a>
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}