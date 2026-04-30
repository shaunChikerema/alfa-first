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

const PROVIDERS = [
  {
    name: 'Botswana Life',
    tag: 'Est. 1975 · Market Leader',
    desc: "Botswana's oldest and largest life insurer with 80% market share. Specialises in life cover, funeral cover, retirement annuities, investment & savings, hospital cash plans and group solutions.",
    strengths: ['Life & funeral cover', 'Retirement annuities', 'Investment & savings', 'Group solutions'],
    type: 'Long Term',
    color: '#1a1f5e',
  },
  {
    name: 'Metropolitan',
    tag: '2nd Largest Life Insurer',
    desc: "Part of Momentum Metropolitan. Offers affordable, innovative life, health and funeral products including Mothusi Life Cover, MultiCash Plan and Re-Eme-Nao Funeral Plan.",
    strengths: ['Life & health cover', 'Funeral plans', 'Savings & retirement', 'Pension plans'],
    type: 'Long Term',
    color: '#006cb7',
  },
  {
    name: 'Hollard',
    tag: 'General & Life Insurance',
    desc: "South African-backed insurer offering both general and life products. Known for motor, home, all-risks, commercial and funeral cover — plus Lerako Life Cover up to P15 million.",
    strengths: ['Motor & home cover', 'Life & disability', 'Business insurance', 'Funeral cover'],
    type: 'Short & Long Term',
    color: '#e8202a',
  },
  {
    name: 'Bona Life',
    tag: '1st Citizen-Owned Insurer · Est. 2013',
    desc: "Botswana's first indigenous, citizen-owned life insurer backed by BPOPF. Products include Group Life Assurance, Pula Cashback Plan, Thebe Funeral Cover, Lefa Life Cover and pension solutions.",
    strengths: ['Group life assurance', 'Funeral cover', 'Pension & annuity', 'Savings plans'],
    type: 'Long Term',
    color: '#2e7d32',
  },
];

export default function AlfaFirstPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [expandedService, setExpandedService] = useState(null);
  const [scrolled, setScrolled] = useState(false);
  const [form, setForm] = useState({ name: '', phone: '', email: '', service: '', provider: '', message: '' });
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

      body { font-family: 'DM Sans', sans-serif; }
      h1,h2,h3,.display { font-family: 'Cormorant Garamond', Georgia, serif; }

      ::-webkit-scrollbar { width: 5px; }
      ::-webkit-scrollbar-track { background: #f1f1f1; }
      ::-webkit-scrollbar-thumb { background: ${NAVY}; border-radius: 2px; }

      /* Logo — clean PNG with transparency, no background needed */
      .alfa-logo-img {
        display: block;
        width: 100%;
        max-width: 400px;
        height: auto;
        object-fit: contain;
      }

      .alfa-logo-wrap {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        padding: 8px 0 0;
      }
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
      `Hi, I'd like an insurance quote!\n\nName: ${form.name}\nPhone: ${form.phone}\nEmail: ${form.email}\nService: ${form.service || 'General enquiry'}\nPreferred Provider: ${form.provider || 'No preference'}\nMessage: ${form.message}`
    );
    window.open(`https://wa.me/${WA_NUMBER}?text=${msg}`, '_blank');
    setQuoteOpen(false);
    setForm({ name: '', phone: '', email: '', service: '', provider: '', message: '' });
  };

  return (
    <div style={{ background: '#ffffff', fontFamily: "'DM Sans', sans-serif" }}>

      <style>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .topbar-email { display: none !important; }
          .mobile-menu-btn { display: flex !important; }
          .services-grid { grid-template-columns: 1fr !important; }
          .footer-grid { grid-template-columns: 1fr !important; }
          .contact-grid { grid-template-columns: 1fr !important; }
          .about-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>

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
                <label style={{ display:'block', fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:NAVY, marginBottom:6 }}>Preferred Provider <span style={{fontWeight:400,color:'#94a3b8'}}>(optional)</span></label>
                <select value={form.provider} onChange={e => setForm(p => ({...p, provider: e.target.value}))}
                  style={{ width:'100%', padding:'11px 14px', borderRadius:8, border:'2px solid #e2e8f0', fontSize:'0.9rem', outline:'none', fontFamily:'DM Sans, sans-serif', background:'white', boxSizing:'border-box' }}>
                  <option value="">No preference — best deal</option>
                  {PROVIDERS.map(p => <option key={p.name} value={p.name}>{p.name} · {p.type}</option>)}
                </select>
              </div>
              <div>
                <label style={{ display:'block', fontSize:'0.72rem', fontWeight:700, letterSpacing:'0.1em', textTransform:'uppercase', color:NAVY, marginBottom:6 }}>Additional Details</label>
                <textarea rows={3} placeholder="Tell us about your needs..." value={form.message}
                  onChange={e => setForm(p => ({...p, message: e.target.value}))}
                  style={{ width:'100%', padding:'11px 14px', borderRadius:8, border:'2px solid #e2e8f0', fontSize:'0.9rem', outline:'none', resize:'none', fontFamily:'DM Sans, sans-serif', boxSizing:'border-box' }}
                />
              </div>
              <button type="submit" style={{ background:`linear-gradient(135deg, ${RED}, ${RED_DARK})`, color:'white', border:'none', padding:'14px 24px', borderRadius:10, fontSize:'0.95rem', fontWeight:700, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:8, boxShadow:`0 8px 24px ${RED}40`, fontFamily:'DM Sans, sans-serif' }}>
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

      {/* ══════════════════ HERO ══════════════════ */}
      <section id="home" style={{
        background: `linear-gradient(150deg, ${NAVY}66 0%, #14185044 45%, #1c226822 75%, #1c226811 100%), url('/shutterstock_Multi-Generational-Family.jpg') center 20%/cover no-repeat`,
        minHeight: '82vh',
        paddingTop: topBarHeight + 72,
        display: 'flex',
        alignItems: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div style={{ position:'absolute', inset:0, opacity:0.03, backgroundImage:`repeating-linear-gradient(0deg, white 0, white 1px, transparent 0, transparent 60px), repeating-linear-gradient(90deg, white 0, white 1px, transparent 0, transparent 60px)`, backgroundSize:'60px 60px' }} />
        <div style={{ position:'absolute', top:-120, right:-80, width:480, height:480, borderRadius:'50%', background:`radial-gradient(circle, ${RED}22 0%, transparent 65%)`, pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:0, left:0, right:0, height:1, background:`linear-gradient(90deg, transparent, ${RED}50, transparent)` }} />

        <div style={{ maxWidth:1200, margin:'0 auto', padding:'120px 24px 80px', width:'100%', position:'relative', zIndex:1 }}>
          <div style={{ maxWidth: 700 }}>
            <h1 className="hero-headline" style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(2.8rem, 6vw, 5.4rem)', fontWeight:700, color:'white', lineHeight:1.0, letterSpacing:'-0.01em', margin:'0 0 20px', textShadow:'0 2px 16px rgba(0,0,0,0.5)' }}>
              Your Insurance.{' '}
              <br />
              <em style={{ color:'#ff3333', fontStyle:'italic', textShadow:'0 1px 12px rgba(0,0,0,0.8), 0 0 30px rgba(0,0,0,0.6)' }}>
                Our Priority.
              </em>
            </h1>
            <p className="hero-copy" style={{ color:'rgba(255,255,255,0.95)', fontSize:'1rem', lineHeight:1.7, margin:'0 0 32px', maxWidth:'38ch', textShadow:'0 1px 8px rgba(0,0,0,0.6)' }}>
              Gaborone's independent insurance agency — long term &amp; short term cover at the best price.
            </p>
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

        <div style={{ position:'absolute', bottom:-1, left:0, right:0 }}>
          <svg viewBox="0 0 1440 64" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ width:'100%', display:'block' }} preserveAspectRatio="none">
            <path d="M0 64L1440 64L1440 16C1200 48 960 64 720 56C480 48 240 16 0 32L0 64Z" fill="white"/>
          </svg>
        </div>
      </section>

      {/* ══════════════════ SERVICES ══════════════════ */}
      <section id="services" style={{ background:CREAM, padding:'88px 0 100px' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 24px' }}>
          <div className="scroll-reveal" style={{ marginBottom:56, textAlign:'center' }}>
            <div style={{ display:'inline-block', background:`${RED}12`, border:`1px solid ${RED}30`, borderRadius:40, padding:'5px 16px', marginBottom:16 }}>
              <span style={{ color:RED, fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase' }}>What We Offer</span>
            </div>
            <h2 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(2rem, 4vw, 3rem)', fontWeight:700, color:NAVY, margin:'0 0 12px', lineHeight:1.1 }}>
              Complete Insurance <em style={{ color:RED }}>Solutions</em>
            </h2>
            <p style={{ color:'#64748b', fontSize:'0.95rem', maxWidth:'44ch', margin:'0 auto' }}>
              Long term and short term cover for individuals, families and businesses across Botswana.
            </p>
          </div>

          <div className="services-grid" style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:24 }}>
            {SERVICES.map((s, i) => {
              const Icon = s.icon;
              const isExpanded = expandedService === s.title;
              const isRed = s.color === RED;
              return (
                <div key={s.title} className="service-card scroll-reveal" style={{ background:'white', borderRadius:16, overflow:'hidden', border:'1px solid rgba(26,31,94,0.07)', transitionDelay:`${i * 0.06}s`, display:'flex', flexDirection:'column' }}>
                  <div style={{ background: isRed ? `linear-gradient(135deg, ${RED}18, ${RED}08)` : `linear-gradient(135deg, ${NAVY}12, ${NAVY}05)`, padding:'28px 24px 20px', display:'flex', alignItems:'center', gap:16, borderBottom:`1px solid ${isRed ? RED : NAVY}10` }}>
                    <div style={{ width:52, height:52, borderRadius:14, background: isRed ? `${RED}18` : `${NAVY}14`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                      <Icon size={24} style={{ color: isRed ? RED : NAVY }} />
                    </div>
                    <div>
                      <h3 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'1.25rem', fontWeight:700, color:NAVY, margin:'0 0 2px' }}>{s.title}</h3>
                      <span style={{ fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color: isRed ? RED : NAVY, opacity:0.7 }}>{s.short}</span>
                    </div>
                  </div>
                  <div style={{ padding:'20px 24px 24px', display:'flex', flexDirection:'column', flex:1 }}>
                    <p style={{ fontSize:'0.88rem', color:'#64748b', lineHeight:1.72, marginBottom:16, flex:1 }}>{s.desc}</p>
                    <div style={{ maxHeight:isExpanded ? 200 : 0, overflow:'hidden', transition:'max-height 0.4s ease', marginBottom:isExpanded ? 16 : 0 }}>
                      <div style={{ borderTop:`1px solid rgba(26,31,94,0.07)`, paddingTop:14, display:'flex', flexDirection:'column', gap:8 }}>
                        {s.features.map(f => (
                          <div key={f} style={{ display:'flex', alignItems:'center', gap:9, fontSize:'0.83rem', color:'#475569' }}>
                            <div style={{ width:18, height:18, borderRadius:'50%', background: isRed ? `${RED}15` : `${NAVY}10`, display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                              <CheckCircle size={11} style={{ color: isRed ? RED : NAVY }} />
                            </div>
                            {f}
                          </div>
                        ))}
                      </div>
                    </div>
                    <div style={{ display:'flex', gap:8 }}>
                      <button onClick={() => setExpandedService(isExpanded ? null : s.title)}
                        style={{ flex:1, background:'none', border:`1px solid rgba(26,31,94,0.13)`, borderRadius:9, padding:'9px 14px', fontSize:'0.8rem', fontWeight:600, color:NAVY, cursor:'pointer', display:'flex', alignItems:'center', justifyContent:'center', gap:5, fontFamily:'DM Sans, sans-serif', transition:'background 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.background='rgba(26,31,94,0.04)'}
                        onMouseLeave={e => e.currentTarget.style.background='none'}>
                        {isExpanded ? 'Less' : 'Details'} <ChevronDown size={13} style={{ transform:isExpanded ? 'rotate(180deg)' : 'none', transition:'transform 0.3s' }} />
                      </button>
                      <button onClick={() => { setForm(p => ({...p, service: s.title})); setQuoteOpen(true); }}
                        style={{ flex:1, background:`linear-gradient(135deg, ${s.color}, ${isRed ? RED_DARK : '#141850'})`, border:'none', borderRadius:9, padding:'9px 14px', fontSize:'0.8rem', fontWeight:700, color:'white', cursor:'pointer', fontFamily:'DM Sans, sans-serif', boxShadow:`0 4px 14px ${s.color}30`, transition:'transform 0.2s' }}
                        onMouseEnter={e => e.currentTarget.style.transform='translateY(-1px)'}
                        onMouseLeave={e => e.currentTarget.style.transform='none'}>
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

      {/* ══════════════════ ABOUT ══════════════════ */}
      <section id="about" style={{ background:'white', padding:'88px 0' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 24px' }}>
          <div className="about-grid" style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:72, alignItems:'center' }}>

            {/* LEFT — copy */}
            <div className="scroll-reveal">
              <div style={{ display:'inline-block', background:`${NAVY}0d`, border:`1px solid ${NAVY}25`, borderRadius:40, padding:'5px 16px', marginBottom:20 }}>
                <span style={{ color:NAVY, fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase' }}>About Alfa First</span>
              </div>
              <h2 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(2rem, 4vw, 3rem)', fontWeight:700, color:NAVY, lineHeight:1.1, marginBottom:16 }}>
                Independent Agency<br /><em style={{ color:RED }}>Working for You</em>
              </h2>
              <div style={{ width:48, height:3, background:`linear-gradient(90deg, ${RED}, ${GOLD})`, marginBottom:20, borderRadius:2 }} />
              <p style={{ color:'#475569', lineHeight:1.85, marginBottom:14, fontSize:'0.95rem' }}>
                Alfa First Projects is a NBFIRA-licensed insurance agency based in Gaborone, Botswana. We specialise in both long term and short term insurance solutions for individuals, families, and businesses across Botswana.
              </p>
              <p style={{ color:'#475569', lineHeight:1.85, marginBottom:24, fontSize:'0.95rem' }}>
                As an independent agency, our loyalty is always to our clients — never to the insurers. We access the full Botswana insurance market to find you the right cover at the best possible price.
              </p>

              {/* Promise ribbon */}
              <div style={{ borderLeft:`3px solid ${RED}`, background:`${RED}06`, padding:'12px 16px', borderRadius:'0 8px 8px 0', marginBottom:24 }}>
                <p style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'1.05rem', fontStyle:'italic', color:NAVY, margin:0, lineHeight:1.65 }}>
                  "We don't just sell policies — we build lasting protection for the people who matter most to you."
                </p>
              </div>

              <div style={{ display:'flex', gap:16, alignItems:'center', flexWrap:'wrap', marginTop:4 }}>
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

            {/* RIGHT — Logo clean, no box */}
            <div className="scroll-reveal" style={{ display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center', gap:24 }}>

              {/* Logo — no card box, clean blend */}
              <div className="alfa-logo-wrap">
                <img
                  src="/alfa-logo-clean.png"
                  alt="Alfa First Projects — The Ultimate Choice"
                  className="alfa-logo-img"
                />
              </div>



            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════ CTA BAND ══════════════════ */}
      <section style={{ position:'relative', overflow:'hidden', padding:'0' }}>
        {/* Split: left red, right navy */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', minHeight:280 }} className="cta-split">
          <div style={{ background:`linear-gradient(135deg, ${RED_DARK}, ${RED})`, padding:'64px 48px 64px 48px', display:'flex', flexDirection:'column', justifyContent:'center', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:-40, left:-40, width:200, height:200, borderRadius:'50%', background:'rgba(255,255,255,0.06)' }} />
            <div style={{ position:'absolute', bottom:-20, right:20, width:120, height:120, borderRadius:'50%', background:'rgba(255,255,255,0.04)' }} />
            <div style={{ position:'relative', zIndex:1 }}>
              <div style={{ fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(255,255,255,0.7)', marginBottom:12 }}>Free Consultation</div>
              <h2 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight:700, color:'white', lineHeight:1.1, margin:'0 0 16px' }}>
                Ready to Get<br />Protected?
              </h2>
              <p style={{ color:'rgba(255,255,255,0.8)', fontSize:'0.95rem', lineHeight:1.7, margin:'0 0 28px', maxWidth:'32ch' }}>
                Get a free, no-obligation quote today. We respond within 24 hours.
              </p>
              <button onClick={() => setQuoteOpen(true)}
                style={{ display:'inline-flex', alignItems:'center', gap:8, background:'white', color:RED, border:'none', padding:'13px 26px', borderRadius:9, fontWeight:700, fontSize:'0.92rem', cursor:'pointer', fontFamily:'DM Sans, sans-serif', boxShadow:'0 8px 24px rgba(0,0,0,0.2)', transition:'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform='translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform='none'}>
                Request Free Quote <ArrowRight size={16} />
              </button>
            </div>
          </div>
          <div style={{ background:`linear-gradient(135deg, ${NAVY}, #0f1340)`, padding:'64px 48px', display:'flex', flexDirection:'column', justifyContent:'center', position:'relative', overflow:'hidden' }}>
            <div style={{ position:'absolute', top:-60, right:-60, width:220, height:220, borderRadius:'50%', background:'rgba(204,31,31,0.12)' }} />
            <div style={{ position:'relative', zIndex:1 }}>
              <div style={{ fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.22em', textTransform:'uppercase', color:'rgba(255,255,255,0.5)', marginBottom:12 }}>Instant Response</div>
              <h2 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(1.8rem, 3.5vw, 2.8rem)', fontWeight:700, color:'white', lineHeight:1.1, margin:'0 0 16px' }}>
                Chat With Us<br /><em style={{ color:RED }}>Right Now</em>
              </h2>
              <p style={{ color:'rgba(255,255,255,0.6)', fontSize:'0.95rem', lineHeight:1.7, margin:'0 0 28px', maxWidth:'32ch' }}>
                Prefer to talk? Reach us directly on WhatsApp — fast, easy, no waiting.
              </p>
              <a href={WA_HREF} target="_blank" rel="noopener noreferrer"
                style={{ display:'inline-flex', alignItems:'center', gap:10, background:'#25D366', color:'white', padding:'13px 26px', borderRadius:9, fontWeight:700, fontSize:'0.92rem', textDecoration:'none', boxShadow:'0 8px 24px rgba(37,211,102,0.35)', transition:'transform 0.2s' }}
                onMouseEnter={e => e.currentTarget.style.transform='translateY(-2px)'}
                onMouseLeave={e => e.currentTarget.style.transform='none'}>
                <WhatsAppIcon size={20} /> WhatsApp Us
              </a>
            </div>
          </div>
        </div>
        <style>{`.cta-split { } @media (max-width: 768px) { .cta-split { grid-template-columns: 1fr !important; } }`}</style>
      </section>

      {/* ══════════════════ CONTACT ══════════════════ */}
      <section id="contact" style={{ background:'white', padding:'88px 0 0' }}>
        <div style={{ maxWidth:1200, margin:'0 auto', padding:'0 24px' }}>

          {/* Header */}
          <div className="scroll-reveal" style={{ marginBottom:56, textAlign:'center' }}>
            <div style={{ display:'inline-block', background:`${RED}12`, border:`1px solid ${RED}30`, borderRadius:40, padding:'5px 16px', marginBottom:16 }}>
              <span style={{ color:RED, fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase' }}>Get in Touch</span>
            </div>
            <h2 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'clamp(2rem, 4vw, 3rem)', fontWeight:700, color:NAVY, margin:'0 0 10px' }}>
              We're Here to <em style={{ color:RED }}>Help</em>
            </h2>
            <p style={{ color:'#64748b', fontSize:'0.95rem', maxWidth:'42ch', margin:'0 auto' }}>
              Reach out any way you prefer — we make it easy to get covered.
            </p>
          </div>

          {/* 3 contact cards top */}
          <div className="scroll-reveal" style={{ display:'grid', gridTemplateColumns:'repeat(3, 1fr)', gap:20, marginBottom:40 }} id="contact-cards">
            {[
              { icon:Phone, label:'Call or WhatsApp', value:'+267 744 48102', note:'Mon – Fri, 8am – 5pm', href:'tel:+26774448102', accent:RED },
              { icon:Mail, label:'Email Us', value:'info@alfafirstprojects.co.bw', note:'Reply within 24 hours', href:'mailto:info@alfafirstprojects.co.bw', accent:NAVY },
              { icon:MapPin, label:'Our Location', value:'Gaborone, Botswana', note:'Serving clients nationwide', href:'#', accent:RED },
            ].map(c => {
              const Icon = c.icon;
              return (
                <a key={c.label} href={c.href}
                  style={{ background:CREAM, borderRadius:16, padding:'28px 24px', display:'flex', flexDirection:'column', gap:12, textDecoration:'none', border:`1px solid rgba(26,31,94,0.07)`, transition:'transform 0.25s, box-shadow 0.25s', position:'relative', overflow:'hidden' }}
                  onMouseEnter={e => { e.currentTarget.style.transform='translateY(-4px)'; e.currentTarget.style.boxShadow='0 16px 40px rgba(26,31,94,0.12)'; }}
                  onMouseLeave={e => { e.currentTarget.style.transform='none'; e.currentTarget.style.boxShadow='none'; }}>
                  <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg, ${c.accent}, ${c.accent}88)`, borderRadius:'16px 16px 0 0' }} />
                  <div style={{ width:46, height:46, borderRadius:12, background:c.accent === RED ? `${RED}15` : `${NAVY}12`, display:'flex', alignItems:'center', justifyContent:'center' }}>
                    <Icon size={20} style={{ color:c.accent }} />
                  </div>
                  <div>
                    <div style={{ fontSize:'0.65rem', fontWeight:700, letterSpacing:'0.15em', textTransform:'uppercase', color:c.accent, marginBottom:4 }}>{c.label}</div>
                    <div style={{ fontWeight:700, color:NAVY, fontSize:'0.92rem', marginBottom:3, wordBreak:'break-word' }}>{c.value}</div>
                    <div style={{ fontSize:'0.78rem', color:'#94a3b8' }}>{c.note}</div>
                  </div>
                </a>
              );
            })}
          </div>
          <style>{`@media (max-width: 768px) { #contact-cards { grid-template-columns: 1fr !important; } }`}</style>

          {/* Bottom: hours + form */}
          <div className="contact-grid scroll-reveal" style={{ display:'grid', gridTemplateColumns:'1fr 2fr', gap:24, alignItems:'start' }}>

            {/* Hours card */}
            <div style={{ background:`linear-gradient(160deg, ${NAVY} 0%, #0f1340 100%)`, borderRadius:16, padding:'32px 28px', position:'relative', overflow:'hidden' }}>
              <div style={{ position:'absolute', bottom:-40, right:-40, width:160, height:160, borderRadius:'50%', background:`${RED}18` }} />
              <div style={{ position:'relative', zIndex:1 }}>
                <Clock size={22} style={{ color:RED, marginBottom:16 }} />
                <h3 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'1.4rem', fontWeight:700, color:'white', marginBottom:20 }}>Business Hours</h3>
                <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingBottom:14, borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
                    <span style={{ color:'rgba(255,255,255,0.7)', fontSize:'0.88rem' }}>Monday – Friday</span>
                    <span style={{ color:'white', fontWeight:700, fontSize:'0.88rem' }}>8am – 5pm</span>
                  </div>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center', paddingBottom:14, borderBottom:'1px solid rgba(255,255,255,0.08)' }}>
                    <span style={{ color:'rgba(255,255,255,0.7)', fontSize:'0.88rem' }}>Saturday</span>
                    <span style={{ color:GOLD, fontWeight:700, fontSize:'0.88rem' }}>By appt.</span>
                  </div>
                  <div style={{ display:'flex', justifyContent:'space-between', alignItems:'center' }}>
                    <span style={{ color:'rgba(255,255,255,0.7)', fontSize:'0.88rem' }}>Sunday</span>
                    <span style={{ color:'rgba(255,255,255,0.35)', fontWeight:600, fontSize:'0.88rem' }}>Closed</span>
                  </div>
                </div>
                <div style={{ marginTop:28, paddingTop:20, borderTop:'1px solid rgba(255,255,255,0.08)' }}>
                  <a href={WA_HREF} target="_blank" rel="noopener noreferrer"
                    style={{ display:'flex', alignItems:'center', gap:8, background:'#25D366', color:'white', padding:'11px 18px', borderRadius:8, fontSize:'0.85rem', fontWeight:700, textDecoration:'none', justifyContent:'center' }}>
                    <WhatsAppIcon size={16} /> Chat on WhatsApp
                  </a>
                </div>
              </div>
            </div>

            {/* Quote form */}
            <div style={{ background:CREAM, borderRadius:16, padding:'36px 32px', border:'1px solid rgba(26,31,94,0.07)' }}>
              <h3 style={{ fontFamily:'Cormorant Garamond, serif', fontSize:'1.6rem', fontWeight:700, color:NAVY, marginBottom:4 }}>Request a Quote</h3>
              <p style={{ color:'#94a3b8', fontSize:'0.85rem', marginBottom:28 }}>Fill in your details and we'll get back to you promptly.</p>
              <form onSubmit={handleQuoteSubmit} style={{ display:'flex', flexDirection:'column', gap:16 }}>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                  {[{id:'name',label:'Full Name *',type:'text',placeholder:'John Doe',required:true},{id:'phone',label:'Phone *',type:'tel',placeholder:'+267 744 48102',required:true}].map(f => (
                    <div key={f.id}>
                      <label style={{ display:'block', fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:NAVY, marginBottom:6 }}>{f.label}</label>
                      <input type={f.type} required={f.required} placeholder={f.placeholder} value={form[f.id]}
                        onChange={e => setForm(p => ({...p, [f.id]: e.target.value}))}
                        style={{ width:'100%', padding:'11px 14px', borderRadius:8, border:'2px solid #e8edf5', fontSize:'0.88rem', fontFamily:'DM Sans, sans-serif', outline:'none', boxSizing:'border-box', background:'white', transition:'border 0.2s' }}
                        onFocus={e => e.target.style.borderColor = NAVY}
                        onBlur={e => e.target.style.borderColor = '#e8edf5'}
                      />
                    </div>
                  ))}
                </div>
                <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:14 }}>
                  <div>
                    <label style={{ display:'block', fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:NAVY, marginBottom:6 }}>Email</label>
                    <input type="email" placeholder="john@example.com" value={form.email}
                      onChange={e => setForm(p => ({...p, email: e.target.value}))}
                      style={{ width:'100%', padding:'11px 14px', borderRadius:8, border:'2px solid #e8edf5', fontSize:'0.88rem', fontFamily:'DM Sans, sans-serif', outline:'none', boxSizing:'border-box', background:'white', transition:'border 0.2s' }}
                      onFocus={e => e.target.style.borderColor = NAVY}
                      onBlur={e => e.target.style.borderColor = '#e8edf5'}
                    />
                  </div>
                  <div>
                    <label style={{ display:'block', fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:NAVY, marginBottom:6 }}>Type of Cover</label>
                    <select value={form.service} onChange={e => setForm(p => ({...p, service: e.target.value}))}
                      style={{ width:'100%', padding:'11px 14px', borderRadius:8, border:'2px solid #e8edf5', fontSize:'0.88rem', fontFamily:'DM Sans, sans-serif', outline:'none', background:'white', boxSizing:'border-box' }}>
                      <option value="">Select service</option>
                      {SERVICES.map(s => <option key={s.title} value={s.title}>{s.title}</option>)}
                    </select>
                  </div>
                </div>
                <div>
                  <label style={{ display:'block', fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:NAVY, marginBottom:6 }}>Preferred Provider <span style={{fontWeight:400,color:'#94a3b8'}}>(optional)</span></label>
                  <select value={form.provider} onChange={e => setForm(p => ({...p, provider: e.target.value}))}
                    style={{ width:'100%', padding:'11px 14px', borderRadius:8, border:'2px solid #e8edf5', fontSize:'0.88rem', fontFamily:'DM Sans, sans-serif', outline:'none', background:'white', boxSizing:'border-box' }}>
                    <option value="">No preference — best deal</option>
                    {PROVIDERS.map(p => <option key={p.name} value={p.name}>{p.name} · {p.type}</option>)}
                  </select>
                </div>
                <div>
                  <label style={{ display:'block', fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:NAVY, marginBottom:6 }}>Message</label>
                  <textarea rows={3} placeholder="Tell us what you need..." value={form.message}
                    onChange={e => setForm(p => ({...p, message: e.target.value}))}
                    style={{ width:'100%', padding:'11px 14px', borderRadius:8, border:'2px solid #e8edf5', fontSize:'0.88rem', fontFamily:'DM Sans, sans-serif', outline:'none', resize:'none', boxSizing:'border-box', background:'white' }}
                  />
                </div>
                <button type="submit"
                  style={{ background:`linear-gradient(135deg, ${RED}, ${RED_DARK})`, color:'white', border:'none', padding:'14px', borderRadius:10, fontWeight:700, fontSize:'0.95rem', cursor:'pointer', fontFamily:'DM Sans, sans-serif', display:'flex', alignItems:'center', justifyContent:'center', gap:9, boxShadow:`0 8px 24px ${RED}35`, transition:'transform 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform='translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform='none'}>
                  <WhatsAppIcon size={18} /> Send via WhatsApp
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ FOOTER ══════════════════ */}
      <footer style={{ background:`linear-gradient(170deg, #0d1140 0%, ${NAVY} 60%, #111640 100%)`, color:'white', padding:'64px 24px 0', position:'relative', overflow:'hidden' }}>

        {/* Decorative top accent line */}
        <div style={{ position:'absolute', top:0, left:0, right:0, height:3, background:`linear-gradient(90deg, transparent, ${RED}, ${GOLD}, ${RED}, transparent)` }} />
        <div style={{ position:'absolute', top:-100, right:-100, width:400, height:400, borderRadius:'50%', background:`${RED}08`, pointerEvents:'none' }} />
        <div style={{ position:'absolute', bottom:60, left:-80, width:300, height:300, borderRadius:'50%', background:`${NAVY}40`, pointerEvents:'none' }} />

        <div style={{ maxWidth:1200, margin:'0 auto', position:'relative', zIndex:1 }}>

          {/* Top: brand + 3 cols */}
          <div className="footer-grid" style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr 1.2fr', gap:48, paddingBottom:48, borderBottom:'1px solid rgba(255,255,255,0.07)' }}>

            {/* Brand */}
            <div>
              <div style={{ marginBottom:16 }}>
                <div style={{ fontFamily:'Cormorant Garamond, serif', fontWeight:700, fontSize:'1.5rem', color:'white', letterSpacing:'0.05em', textTransform:'uppercase', lineHeight:1.1 }}>
                  ALFA F<span style={{ color:RED }}>I</span>RST<br/>PROJECTS
                </div>
                <div style={{ fontSize:'0.6rem', color:GOLD, fontWeight:700, letterSpacing:'0.24em', textTransform:'uppercase', marginTop:4 }}>"The Ultimate Choice"</div>
              </div>
              <p style={{ color:'rgba(255,255,255,0.45)', fontSize:'0.86rem', lineHeight:1.8, marginBottom:24, maxWidth:'28ch' }}>
                Independent insurance brokerage. Long term &amp; short term solutions. Licensed by NBFIRA.
              </p>
              <div style={{ display:'flex', gap:10 }}>
                <a href={WA_HREF} target="_blank" rel="noopener noreferrer"
                  style={{ display:'inline-flex', alignItems:'center', gap:7, background:'#25D366', color:'white', padding:'9px 16px', borderRadius:8, fontSize:'0.82rem', fontWeight:700, textDecoration:'none', transition:'transform 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.transform='translateY(-2px)'}
                  onMouseLeave={e => e.currentTarget.style.transform='none'}>
                  <WhatsAppIcon size={15} /> WhatsApp
                </a>
                <a href="tel:+26774448102"
                  style={{ display:'inline-flex', alignItems:'center', gap:7, background:'rgba(255,255,255,0.08)', color:'white', padding:'9px 16px', borderRadius:8, fontSize:'0.82rem', fontWeight:600, textDecoration:'none', border:'1px solid rgba(255,255,255,0.12)', transition:'background 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.background='rgba(255,255,255,0.14)'}
                  onMouseLeave={e => e.currentTarget.style.background='rgba(255,255,255,0.08)'}>
                  <Phone size={13} /> Call Us
                </a>
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 style={{ fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', color:RED, marginBottom:20, paddingBottom:10, borderBottom:'1px solid rgba(255,255,255,0.06)' }}>Services</h4>
              <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
                {SERVICES.map(s => (
                  <button key={s.title}
                    onClick={() => smoothScroll('services')}
                    style={{ background:'none', border:'none', textAlign:'left', color:'rgba(255,255,255,0.5)', fontSize:'0.86rem', cursor:'pointer', padding:0, fontFamily:'DM Sans, sans-serif', transition:'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color='white'}
                    onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.5)'}>
                    {s.title}
                  </button>
                ))}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 style={{ fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', color:RED, marginBottom:20, paddingBottom:10, borderBottom:'1px solid rgba(255,255,255,0.06)' }}>Navigate</h4>
              <div style={{ display:'flex', flexDirection:'column', gap:9 }}>
                {[['home','Home'],['services','Services'],['about','About Us'],['contact','Contact']].map(([id, label]) => (
                  <button key={id}
                    onClick={() => smoothScroll(id)}
                    style={{ background:'none', border:'none', textAlign:'left', color:'rgba(255,255,255,0.5)', fontSize:'0.86rem', cursor:'pointer', padding:0, fontFamily:'DM Sans, sans-serif', transition:'color 0.2s' }}
                    onMouseEnter={e => e.currentTarget.style.color='white'}
                    onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.5)'}>
                    {label}
                  </button>
                ))}
              </div>
            </div>

            {/* Contact */}
            <div>
              <h4 style={{ fontSize:'0.68rem', fontWeight:700, letterSpacing:'0.2em', textTransform:'uppercase', color:RED, marginBottom:20, paddingBottom:10, borderBottom:'1px solid rgba(255,255,255,0.06)' }}>Contact</h4>
              <div style={{ display:'flex', flexDirection:'column', gap:14 }}>
                <a href="tel:+26774448102" style={{ color:'rgba(255,255,255,0.55)', fontSize:'0.86rem', textDecoration:'none', display:'flex', alignItems:'flex-start', gap:9, transition:'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color='white'}
                  onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.55)'}>
                  <Phone size={13} style={{ color:RED, flexShrink:0, marginTop:2 }} /> +267 744 48102
                </a>
                <a href="mailto:info@alfafirstprojects.co.bw" style={{ color:'rgba(255,255,255,0.55)', fontSize:'0.86rem', textDecoration:'none', display:'flex', alignItems:'flex-start', gap:9, transition:'color 0.2s' }}
                  onMouseEnter={e => e.currentTarget.style.color='white'}
                  onMouseLeave={e => e.currentTarget.style.color='rgba(255,255,255,0.55)'}>
                  <Mail size={13} style={{ color:RED, flexShrink:0, marginTop:2 }} /> info@alfafirstprojects.co.bw
                </a>
                <div style={{ color:'rgba(255,255,255,0.55)', fontSize:'0.86rem', display:'flex', alignItems:'flex-start', gap:9 }}>
                  <MapPin size={13} style={{ color:RED, flexShrink:0, marginTop:2 }} /> Gaborone, Botswana
                </div>
              </div>
            </div>
          </div>

          {/* Bottom bar */}
          <div style={{ padding:'20px 0 24px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:12 }}>
            <p style={{ color:'rgba(255,255,255,0.25)', fontSize:'0.78rem', margin:0 }}>
              © 2026 Alfa First Projects (Pty) Ltd. Licensed by NBFIRA. All rights reserved.
            </p>
            <p style={{ color:'rgba(255,255,255,0.25)', fontSize:'0.78rem', margin:0 }}>
              Built by{' '}
              <a href="https://bitroot-dev.vercel.app" target="_blank" rel="noopener noreferrer"
                style={{ color:GOLD, textDecoration:'none', fontWeight:700 }}>
                BITROOT
              </a>
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}