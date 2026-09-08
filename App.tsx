import { useEffect, useMemo, useState, type FormEvent, type ReactNode } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import {
  ArrowDownRight,
  ArrowUpRight,
  CalendarDays,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock3,
  Heart,
  Instagram,
  MapPin,
  Menu,
  MessageCircle,
  Navigation,
  Phone,
  Quote,
  Scissors,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  X,
} from 'lucide-react';
import { ErrorBoundary } from '@/components/error-boundary';
import { Toaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import NotFound from '@/pages/not-found';
import { Route, Switch, useLocation, Router as WouterRouter } from 'wouter';
import nidhiLogo from '@assets/nidhi-logo-premium.png';

const queryClient = new QueryClient();

const phone = '9887181819';
const address = '34-A, Raghu Vihar Vistar, Near VT Road Chauraha, Patrkar Road, Jaipur, Rajasthan 302020';
const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;
const whatsappUrl = `https://wa.me/91${phone}?text=${encodeURIComponent('Hello Unisex Salon By Nidhi, I would like to book an appointment.')}`;

const services = [
  { name: 'Hair', detail: 'Haircut & Styling · Hair Spa · Hair Coloring · Hair Treatment · Hair Smoothening', icon: Scissors, tone: 'terracotta', price: 'Contact for Price' },
  { name: 'Skin & Facial', detail: 'Facial · Cleanup · Skin Care · Glow Treatments', icon: Sparkles, tone: 'sage', price: 'Contact for Price' },
  { name: 'Grooming', detail: 'Beard Styling · Beard Grooming · Shaving · Men’s Grooming', icon: ShieldCheck, tone: 'sand', price: 'Contact for Price' },
  { name: 'Beauty', detail: 'Makeup · Bridal/Party Makeup · Eyebrow & Threading · Waxing', icon: Heart, tone: 'ink', price: 'Contact for Price' },
];

const gallery = [
  { title: 'The soft copper', category: 'Hair', image: 'https://images.pexels.com/photos/3992870/pexels-photo-3992870.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Stylist working through a copper hair colour' },
  { title: 'A quiet glow', category: 'Salon', image: 'https://images.pexels.com/photos/3985330/pexels-photo-3985330.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Skincare treatment in a calm salon' },
  { title: 'The finishing touch', category: 'Makeup', image: 'https://images.pexels.com/photos/3997383/pexels-photo-3997383.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Makeup artist applying finishing touches' },
  { title: 'Clean lines', category: 'Grooming', image: 'https://images.pexels.com/photos/1813272/pexels-photo-1813272.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Barber creating a clean haircut' },
  { title: 'A little ceremony', category: 'Beauty', image: 'https://images.pexels.com/photos/3764014/pexels-photo-3764014.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Woman with beautifully styled hair in a salon' },
  { title: 'Texture, considered', category: 'Hair', image: 'https://images.pexels.com/photos/3065171/pexels-photo-3065171.jpeg?auto=compress&cs=tinysrgb&w=1200', alt: 'Hair styling tools and textured hairstyle' },
];

const reasons = [
  { title: '4.8/5 customer rating', detail: 'A salon experience guests return to and recommend.', icon: Star },
  { title: 'Premium salon experience', detail: 'Thoughtful details, considered products and room to slow down.', icon: Sparkles },
  { title: 'Professional services', detail: 'Experienced hands and honest guidance for every look.', icon: Scissors },
  { title: 'Customer satisfaction', detail: 'We listen first, then tailor the experience around you.', icon: Heart },
  { title: 'Unisex beauty & grooming', detail: 'A welcoming chair for every kind of beauty and grooming.', icon: ShieldCheck },
  { title: 'Convenient Jaipur location', detail: 'Easy to find near VT Road Chauraha in Raghu Vihar Vistar.', icon: MapPin },
];

const serviceCatalog = [
  { name: 'Hair', items: ['Hair Wash Men', 'Head Massage', 'Baby Hair Cut', 'Hair Styling', 'Hair Coloring', 'Hair Treatment', 'Hair Smoothening'] },
  { name: 'Skin & Facial', items: ['Facial', 'Cleanup', 'Skin Care', 'Glow Treatments', 'Skin Glow', 'Vitamin C', 'Anti-Tan Care'] },
  { name: 'Grooming', items: ['Beard Styling', 'Beard Grooming', 'Shaving', 'Men’s Grooming', 'Face Wax', 'Full Face', 'Upper Lips'] },
  { name: 'Beauty', items: ['Makeup', 'Bridal/Party Makeup', 'Eyebrow & Threading', 'Waxing', 'D-Tan', 'Blossom Kochhar', 'Nailcut & File'] },
];

const openingHours = [
  { day: 'Monday', time: '10:00 AM — 9:30 PM' },
  { day: 'Tuesday', time: '9:00 AM — 10:00 PM' },
  { day: 'Wednesday', time: '10:00 AM — 10:00 PM' },
  { day: 'Thursday', time: '10:00 AM — 10:00 PM' },
  { day: 'Friday', time: '10:00 AM — 10:00 PM' },
  { day: 'Saturday', time: '9:00 AM — 10:00 PM' },
  { day: 'Sunday', time: '9:00 AM — 10:00 PM' },
];

const reviews = [
  { name: 'Aarushi Mehta', city: 'Jaipur', text: 'The kind of place where you can exhale. My haircut was thoughtful, unhurried and exactly what I had in mind.', service: 'Hair cut & finish' },
  { name: 'Rohan Sharma', city: 'Vaishali Nagar', text: 'The team understands grooming without making it feel fussy. Clean work, kind people, and a very easy booking experience.', service: 'Men’s grooming' },
  { name: 'Kavya S.', city: 'Jaipur', text: 'I came in for a pre-wedding facial and left feeling looked after. Every small detail felt personal.', service: 'Skin ritual' },
];

type Booking = { name: string; service: string; date: string; time: string; whatsappUrl: string };

function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [galleryFilter, setGalleryFilter] = useState('All');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [booking, setBooking] = useState<Booking | null>(null);
  const [formError, setFormError] = useState('');
  const [formData, setFormData] = useState({ name: '', phone: '', service: '', date: '', time: '', message: '' });

  useEffect(() => {
    document.title = 'Unisex Salon By Nidhi | Premium Unisex Salon in Jaipur';
    document.documentElement.lang = 'en';
    const metadata = [
      ['name', 'description', 'Unisex Salon By Nidhi in Jaipur offers professional hair, beauty, skin and grooming services with a premium salon experience. Book your appointment today.'],
      ['name', 'keywords', 'Unisex Salon in Jaipur, Salon in Jaipur, Beauty Salon Jaipur, Hair Salon Jaipur, Unisex Beauty Salon, Salon near VT Road Jaipur, Unisex Salon By Nidhi'],
      ['property', 'og:title', 'Unisex Salon By Nidhi | Premium Unisex Salon in Jaipur'],
      ['property', 'og:description', 'Professional hair, beauty, skin and grooming services with a premium salon experience in Jaipur.'],
      ['property', 'og:type', 'website'],
      ['property', 'og:locale', 'en_IN'],
    ] as const;
    metadata.forEach(([attribute, key, content]) => {
      let tag = document.head.querySelector(`meta[${attribute}="${key}"]`);
      if (!tag) {
        tag = document.createElement('meta');
        tag.setAttribute(attribute, key);
        document.head.appendChild(tag);
      }
      tag.setAttribute('content', content);
    });
    const schemaId = 'salon-local-business-schema';
    if (!document.getElementById(schemaId)) {
      const schema = document.createElement('script');
      schema.id = schemaId;
      schema.type = 'application/ld+json';
      schema.textContent = JSON.stringify({
        '@context': 'https://schema.org',
        '@type': 'BeautySalon',
        name: 'Unisex Salon By Nidhi',
        telephone: '+919887181819',
        address: {
          '@type': 'PostalAddress',
          streetAddress: '34-A, Raghu Vihar Vistar, Near VT Road Chauraha, Patrkar Road',
          addressLocality: 'Jaipur',
          addressRegion: 'Rajasthan',
          postalCode: '302020',
          addressCountry: 'IN',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: '4.8',
          reviewCount: '1404',
        },
      });
      document.head.appendChild(schema);
    }
  }, []);

  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : '';
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setLightboxIndex(null);
      if (event.key === 'ArrowRight' && lightboxIndex !== null) setLightboxIndex((lightboxIndex + 1) % gallery.length);
      if (event.key === 'ArrowLeft' && lightboxIndex !== null) setLightboxIndex((lightboxIndex - 1 + gallery.length) % gallery.length);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [lightboxIndex]);

  const filteredGallery = useMemo(
    () => galleryFilter === 'All' ? gallery : gallery.filter((item) => item.category === galleryFilter),
    [galleryFilter],
  );
  const today = new Date().toISOString().split('T')[0];
  const currentDay = new Intl.DateTimeFormat('en-US', { weekday: 'long' }).format(new Date());

  const updateField = (field: keyof typeof formData, value: string) => {
    setFormData((current) => ({ ...current, [field]: value }));
    setFormError('');
  };

  const submitBooking = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.service || !formData.date || !formData.time) {
      setFormError('Please fill in your name, phone number, service, date and preferred time.');
      return;
    }
    if (!/^[0-9+\s-]{10,}$/.test(formData.phone.trim())) {
      setFormError('Please enter a valid phone number so we can confirm your visit.');
      return;
    }
    const message = [
      '📋 New Appointment Request',
      '',
      `Customer Name: ${formData.name.trim()}`,
      `Phone: ${formData.phone.trim()}`,
      `Service: ${formData.service}`,
      `Preferred Date: ${formData.date}`,
      `Preferred Time: ${formData.time}`,
      `Message: ${formData.message.trim() || '—'}`,
      '',
      'Salon:',
      'Unisex Salon By Nidhi',
    ].join('\n');
    const encodedMessage = encodeURIComponent(message);
    const isMobile = /Android|iPhone|iPad|iPod|IEMobile|Opera Mini/i.test(navigator.userAgent);
    const bookingWhatsappUrl = isMobile
      ? `https://wa.me/91${phone}?text=${encodedMessage}`
      : `https://web.whatsapp.com/send?phone=91${phone}&text=${encodedMessage}`;
    const whatsappWindow = window.open(bookingWhatsappUrl, '_blank', 'noopener,noreferrer');
    if (!whatsappWindow) {
      window.location.assign(bookingWhatsappUrl);
    }
    setBooking({ name: formData.name.trim(), service: formData.service, date: formData.date, time: formData.time, whatsappUrl: bookingWhatsappUrl });
    setFormData({ name: '', phone: '', service: '', date: '', time: '', message: '' });
    setFormError('');
  };

  const scrollToBooking = () => {
    document.getElementById('book')?.scrollIntoView({ behavior: 'smooth' });
    setMenuOpen(false);
  };

  return (
    <main className="min-h-[100dvh] bg-background">
      <div className="bg-primary px-4 py-2.5 text-center text-[11px] font-medium tracking-[0.16em] text-primary-foreground sm:text-xs">
        <span>JAIPUR’S CONSIDERED SALON FOR EVERY KIND OF BEAUTY</span>
        <span className="mx-2 text-accent">/</span>
        <a className="underline decoration-primary-foreground/40 underline-offset-4 transition-colors hover:text-accent" href={`tel:${phone}`} data-testid="link-top-phone">9887181819</a>
      </div>

      <header className="absolute inset-x-0 top-10 z-30">
        <div className="section-shell flex items-center justify-between py-5">
           <a href="#top" className="focus-ring flex items-center gap-3" data-testid="link-brand">
             <span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/35 bg-primary-foreground/90 p-1">
               <img src={nidhiLogo} alt="Nidhi monogram" className="h-full w-full object-contain" data-testid="img-brand-logo" />
             </span>
            <span className="leading-none text-primary-foreground">
              <span className="block text-[15px] font-semibold tracking-[-0.02em]">Unisex Salon</span>
              <span className="mt-1 block text-[10px] uppercase tracking-[0.25em] text-primary-foreground/65">By Nidhi</span>
            </span>
          </a>

           <nav className="hidden items-center gap-7 text-sm text-primary-foreground/80 md:flex" aria-label="Primary navigation">
            <a href="#top" className="transition-colors hover:text-accent" data-testid="link-nav-home">Home</a>
            <a href="#services" className="transition-colors hover:text-accent" data-testid="link-nav-services">Services</a>
            <a href="#story" className="transition-colors hover:text-accent" data-testid="link-nav-story">About</a>
            <a href="#gallery" className="transition-colors hover:text-accent" data-testid="link-nav-gallery">Gallery</a>
            <a href="#reviews" className="transition-colors hover:text-accent" data-testid="link-nav-reviews">Reviews</a>
            <a href="#visit" className="transition-colors hover:text-accent" data-testid="link-nav-contact">Contact</a>
          </nav>

          <button type="button" onClick={scrollToBooking} className="hidden items-center gap-2 border border-accent bg-accent px-4 py-2.5 text-xs font-semibold uppercase tracking-[0.13em] text-accent-foreground transition-transform hover:-translate-y-0.5 md:flex" data-testid="button-nav-book">
            Book a visit <ArrowUpRight size={15} />
          </button>
          <button type="button" aria-label={menuOpen ? 'Close menu' : 'Open menu'} onClick={() => setMenuOpen((open) => !open)} className="focus-ring flex h-11 w-11 items-center justify-center border border-primary-foreground/30 text-primary-foreground md:hidden" data-testid="button-mobile-menu">
            {menuOpen ? <X size={21} /> : <Menu size={21} />}
          </button>
        </div>
        {menuOpen && (
          <div className="mx-4 border border-primary-foreground/15 bg-primary p-5 shadow-2xl md:hidden" data-testid="mobile-menu">
            <nav className="grid gap-1" aria-label="Mobile navigation">
              {['services', 'story', 'gallery', 'reviews'].map((section) => (
                <a key={section} href={`#${section}`} onClick={() => setMenuOpen(false)} className="border-b border-primary-foreground/10 py-3 text-sm capitalize text-primary-foreground/80 last:border-0 hover:text-accent" data-testid={`link-mobile-${section}`}>{section === 'story' ? 'Our approach' : section}</a>
              ))}
              <button type="button" onClick={scrollToBooking} className="mt-4 flex items-center justify-center gap-2 bg-accent px-4 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-accent-foreground" data-testid="button-mobile-book">Book a visit <ArrowUpRight size={15} /></button>
            </nav>
          </div>
        )}
      </header>

      <section id="top" className="relative isolate overflow-hidden bg-primary text-primary-foreground">
        <div className="absolute inset-0 opacity-25" style={{ background: 'radial-gradient(circle at 80% 20%, hsl(18 60% 46% / .55), transparent 33%), radial-gradient(circle at 20% 90%, hsl(35 42% 97% / .10), transparent 28%)' }} />
        <div className="section-shell relative grid min-h-[690px] items-end gap-12 pb-16 pt-40 md:grid-cols-[.95fr_1.05fr] md:pb-24 md:pt-44">
          <div className="relative z-10 max-w-xl animate-rise-in">
            <div className="mono-label mb-7 flex items-center gap-3 text-accent"><span className="h-px w-8 bg-accent" /> Beauty, on your terms</div>
            <h1 className="display-font text-[4.1rem] leading-[.92] tracking-[-0.055em] sm:text-[5.8rem] md:text-[6.6rem]">
              Come as<br /><em className="font-normal text-accent">you are.</em>
            </h1>
            <p className="mt-8 max-w-sm text-base leading-7 text-primary-foreground/68 sm:text-lg">
              A warm Jaipur salon for good hair days, quiet skin rituals and the small confidence that follows.
            </p>
            <div className="mt-9 flex flex-wrap items-center gap-3">
              <button type="button" onClick={scrollToBooking} className="group flex items-center gap-3 bg-accent px-5 py-3.5 text-sm font-semibold text-accent-foreground transition-transform hover:-translate-y-1" data-testid="button-hero-book">
                Find your time <ArrowUpRight size={17} className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </button>
              <a href="#services" className="flex items-center gap-2 px-3 py-3.5 text-sm text-primary-foreground/75 transition-colors hover:text-accent" data-testid="link-hero-services">Explore services <ArrowDownRight size={16} /></a>
            </div>
          </div>
          <div className="relative h-[390px] animate-drift-in md:h-[520px]">
            <div className="absolute right-0 top-0 h-[87%] w-[79%] overflow-hidden border border-primary-foreground/20 bg-secondary">
              <img src="https://images.pexels.com/photos/3993449/pexels-photo-3993449.jpeg?auto=compress&cs=tinysrgb&w=1400" alt="Woman with polished, softly styled hair" className="h-full w-full object-cover object-center grayscale-[15%] transition-transform duration-700 hover:scale-105" />
            </div>
            <div className="absolute bottom-0 left-0 z-10 w-[56%] border border-primary-foreground/20 bg-primary p-4 sm:p-5">
              <div className="relative h-32 overflow-hidden sm:h-40">
                <img src="https://images.pexels.com/photos/3997982/pexels-photo-3997982.jpeg?auto=compress&cs=tinysrgb&w=800" alt="Salon detail with a relaxed beauty ritual" className="h-full w-full object-cover" />
                <div className="absolute inset-0 bg-primary/10" />
              </div>
              <div className="mt-3 flex items-end justify-between">
                <span className="text-xs text-primary-foreground/55">Raghu Vihar, Jaipur</span>
                <span className="display-font text-2xl italic text-accent">01</span>
              </div>
            </div>
            <div className="absolute -right-3 bottom-10 flex h-20 w-20 animate-float-soft items-center justify-center rounded-full border border-accent/60 bg-accent text-center text-[10px] font-semibold uppercase leading-4 tracking-[.12em] text-accent-foreground sm:-right-7" aria-hidden="true">Feel<br />beautiful</div>
          </div>
        </div>
        <div className="section-shell relative flex items-center justify-between border-t border-primary-foreground/15 py-4 text-[10px] uppercase tracking-[.16em] text-primary-foreground/45">
           <span>Open daily · see today’s hours below</span>
          <span className="hidden sm:block">Scroll to settle in <ArrowDownRight className="ml-2 inline" size={13} /></span>
        </div>
      </section>

      <section className="overflow-hidden border-b border-border bg-secondary py-4">
        <div className="flex w-max animate-marquee gap-8 whitespace-nowrap text-xs font-medium uppercase tracking-[.18em] text-foreground/60">
          {Array.from({ length: 2 }).flatMap((_, groupIndex) => ['Hair that moves', 'Skin that rests', 'Beauty that feels like you', 'Grooming, with ease'].map((item, index) => (
            <span key={`${groupIndex}-${index}`} className="flex items-center gap-8"><span>{item}</span><span className="text-accent">•</span></span>
          )))}
        </div>
      </section>

      <section id="services" className="section-shell py-24 md:py-32">
        <div className="grid gap-10 md:grid-cols-[.7fr_1.3fr] md:gap-20">
          <div>
            <div className="mono-label mb-6 flex items-center gap-3 text-accent"><span className="h-px w-7 bg-accent" /> The menu</div>
            <h2 className="display-font max-w-xs text-5xl leading-[.98] tracking-[-.045em] text-primary md:text-6xl">A little more than a service.</h2>
            <p className="mt-7 max-w-xs text-sm leading-6 text-muted-foreground">We take the time to understand your routine, your texture and the version of yourself you want to meet in the mirror.</p>
            <a href="#book" className="mt-8 inline-flex items-center gap-2 border-b border-accent pb-2 text-sm font-semibold text-primary transition-colors hover:text-accent" data-testid="link-services-book">See availability <ArrowUpRight size={15} /></a>
          </div>
          <div className="grid gap-3 sm:grid-cols-2">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <article key={service.name} className={`group relative min-h-[220px] overflow-hidden border border-border p-6 transition-all duration-300 hover:-translate-y-1 hover:border-accent ${index === 0 ? 'bg-primary text-primary-foreground' : 'bg-card'}`} data-testid={`card-service-${index}`}>
                  <div className={`mb-8 flex h-10 w-10 items-center justify-center border ${index === 0 ? 'border-primary-foreground/25 text-accent' : 'border-accent/40 text-accent'}`}><Icon size={19} strokeWidth={1.5} /></div>
                  <div className="flex items-end justify-between">
                    <div><h3 className="display-font text-2xl leading-tight">{service.name}</h3><p className={`mt-2 max-w-[170px] text-xs leading-5 ${index === 0 ? 'text-primary-foreground/60' : 'text-muted-foreground'}`}>{service.detail}</p></div>
                    <span className={`mono-label text-[9px] ${index === 0 ? 'text-primary-foreground/50' : 'text-muted-foreground'}`}>{service.price}</span>
                  </div>
                  <span className={`absolute right-5 top-5 text-xs ${index === 0 ? 'text-primary-foreground/40' : 'text-muted-foreground'}`}>0{index + 1}</span>
                  <ArrowUpRight size={18} className="absolute bottom-6 right-6 text-accent opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:opacity-100" />
                </article>
              );
            })}
          </div>
        </div>
      </section>

       <section id="why-us" className="border-y border-border bg-secondary py-20 md:py-24">
         <div className="section-shell">
           <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">
             <div><div className="mono-label mb-6 flex items-center gap-3 text-accent"><span className="h-px w-7 bg-accent" /> Why choose us</div><h2 className="display-font max-w-xl text-5xl leading-[.96] tracking-[-.05em] text-primary md:text-6xl">Good care is in the details.</h2></div>
             <p className="max-w-xs text-sm leading-6 text-muted-foreground">A professional, welcoming space where the result feels like you — only more confident.</p>
           </div>
           <div className="mt-12 grid border-t border-border sm:grid-cols-2 lg:grid-cols-3">
             {reasons.map((reason, index) => {
               const Icon = reason.icon;
               return <article key={reason.title} className="border-b border-border py-7 sm:px-6 lg:px-7" data-testid={`card-reason-${index}`}>
                 <Icon size={19} className="mb-5 text-accent" strokeWidth={1.5} />
                 <h3 className="display-font text-2xl leading-tight text-primary">{reason.title}</h3>
                 <p className="mt-3 max-w-xs text-sm leading-6 text-muted-foreground">{reason.detail}</p>
               </article>;
             })}
           </div>
         </div>
         <div className="mt-16 border-t border-border pt-8">
           <div className="flex items-center justify-between gap-4">
             <span className="mono-label text-accent">Service catalogue</span>
             <span className="text-xs text-muted-foreground">Contact for Price · Book an appointment to enquire</span>
           </div>
           <div className="mt-7 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
             {serviceCatalog.map((group) => <div key={group.name} data-testid={`list-services-${group.name.toLowerCase().replaceAll(' ', '-')}`}>
               <h3 className="display-font text-2xl text-primary">{group.name}</h3>
               <ul className="mt-4 space-y-2 text-sm text-muted-foreground">
                 {group.items.map((item) => <li key={item} className="flex items-start gap-2"><span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-accent" />{item}</li>)}
               </ul>
             </div>)}
           </div>
         </div>
       </section>

      <section id="story" className="bg-[#dfe5d8] py-24 text-primary md:py-32">
        <div className="section-shell grid items-center gap-14 md:grid-cols-[1.05fr_.95fr] md:gap-24">
          <div className="relative order-2 h-[440px] md:order-1 md:h-[570px]">
            <div className="absolute left-0 top-0 h-[82%] w-[82%] overflow-hidden">
              <img src="https://images.pexels.com/photos/3993324/pexels-photo-3993324.jpeg?auto=compress&cs=tinysrgb&w=1200" alt="Stylist carefully shaping a client's hair" className="h-full w-full object-cover grayscale-[12%]" />
            </div>
            <div className="absolute bottom-0 right-0 h-[43%] w-[54%] overflow-hidden border-8 border-[#dfe5d8]">
              <img src="https://images.pexels.com/photos/3993309/pexels-photo-3993309.jpeg?auto=compress&cs=tinysrgb&w=800" alt="A detail of a calm salon styling session" className="h-full w-full object-cover" />
            </div>
            <div className="absolute bottom-7 left-4 flex h-24 w-24 rotate-[-8deg] items-center justify-center bg-accent text-center text-[10px] font-semibold uppercase leading-4 tracking-[.13em] text-accent-foreground shadow-lg">Since<br />Nidhi</div>
          </div>
          <div className="order-1 md:order-2">
            <div className="mono-label mb-6 flex items-center gap-3 text-accent"><span className="h-px w-7 bg-accent" /> Our approach</div>
            <h2 className="display-font max-w-md text-5xl leading-[.96] tracking-[-.05em] md:text-6xl">The luxury of being looked after.</h2>
            <div className="mt-8 max-w-md space-y-5 text-sm leading-7 text-primary/70">
              <p>Unisex Salon By Nidhi began with a simple belief: beauty should give something back. A little time, a little quiet, an expert eye — and you leave feeling more like yourself, not less.</p>
              <p>Our work is personal. We listen before we pick up the scissors, choose products with care and make space for every texture, tone and style.</p>
            </div>
            <div className="mt-10 grid max-w-md grid-cols-3 border-y border-primary/15 py-5">
              <div><span className="display-font block text-3xl">4.8</span><span className="mono-label text-[9px] text-primary/55">Guest rating</span></div>
              <div className="border-l border-primary/15 pl-4"><span className="display-font block text-3xl">1.4k</span><span className="mono-label text-[9px] text-primary/55">Reviews</span></div>
              <div className="border-l border-primary/15 pl-4"><span className="display-font block text-3xl">01</span><span className="mono-label text-[9px] text-primary/55">Good address</span></div>
            </div>
          </div>
        </div>
      </section>

      <section id="gallery" className="section-shell py-24 md:py-32">
        <div className="flex flex-col justify-between gap-8 md:flex-row md:items-end">
          <div><div className="mono-label mb-6 flex items-center gap-3 text-accent"><span className="h-px w-7 bg-accent" /> From the studio</div><h2 className="display-font text-5xl leading-none tracking-[-.05em] text-primary md:text-6xl">Proof, in pictures.</h2></div>
          <div className="flex flex-wrap gap-2" role="tablist" aria-label="Filter gallery">
             {['All', 'Salon', 'Hair', 'Makeup', 'Beauty', 'Grooming'].map((filter) => <button type="button" role="tab" aria-selected={galleryFilter === filter} key={filter} onClick={() => setGalleryFilter(filter)} className={`border px-3.5 py-2 text-xs font-medium transition-colors ${galleryFilter === filter ? 'border-primary bg-primary text-primary-foreground' : 'border-border bg-transparent text-muted-foreground hover:border-primary hover:text-primary'}`} data-testid={`button-filter-${filter.toLowerCase()}`}>{filter}</button>)}
          </div>
        </div>
        <div className="mt-10 grid auto-rows-[170px] grid-cols-2 gap-3 sm:auto-rows-[230px] sm:grid-cols-4 md:mt-14 md:auto-rows-[270px]">
          {filteredGallery.map((item, index) => {
            const originalIndex = gallery.findIndex((galleryItem) => galleryItem.title === item.title);
            return <button type="button" key={item.title} onClick={() => setLightboxIndex(originalIndex)} className={`image-sheen focus-ring group relative overflow-hidden text-left ${index === 0 ? 'col-span-2 row-span-2' : index === 3 ? 'col-span-2' : ''}`} data-testid={`button-gallery-${item.category.toLowerCase()}-${index}`}>
              <img src={item.image} alt={item.alt} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/75 via-primary/0 to-transparent opacity-70 transition-opacity group-hover:opacity-100" />
              <span className="absolute bottom-4 left-4 text-xs font-medium text-primary-foreground">{item.title}</span>
              <span className="absolute right-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-background/90 text-primary opacity-0 transition-all group-hover:opacity-100"><Search size={14} /></span>
            </button>;
          })}
        </div>
      </section>

      <section id="reviews" className="bg-primary py-24 text-primary-foreground md:py-32">
        <div className="section-shell">
          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
            <div><div className="mono-label mb-6 flex items-center gap-3 text-accent"><span className="h-px w-7 bg-accent" /> Kind words</div><h2 className="display-font max-w-lg text-5xl leading-[.96] tracking-[-.05em] md:text-6xl">The feeling, after.</h2></div>
             <div className="flex flex-wrap items-center gap-3"><div className="flex items-center gap-3 border border-primary-foreground/15 px-4 py-3"><div className="flex gap-0.5" aria-label="Rated 4.8 out of 5"><Star size={13} className="fill-accent text-accent" /><Star size={13} className="fill-accent text-accent" /><Star size={13} className="fill-accent text-accent" /><Star size={13} className="fill-accent text-accent" /><Star size={13} className="fill-accent/60 text-accent" /></div><span className="text-xs text-primary-foreground/65">4.8 / 5 from 1,404 reviews</span></div><a href="https://www.google.com/search?q=Unisex+Salon+By+Nidhi+Jaipur" target="_blank" rel="noreferrer" className="border-b border-accent pb-1 text-xs font-semibold uppercase tracking-[.12em] text-accent hover:text-primary-foreground" data-testid="link-view-all-reviews">View all reviews</a></div>
          </div>
          <div className="mt-14 grid border-y border-primary-foreground/15 md:grid-cols-3">
            {reviews.map((review, index) => <article key={review.name} className={`relative py-8 md:px-8 ${index > 0 ? 'border-t border-primary-foreground/15 md:border-l md:border-t-0' : ''}`} data-testid={`card-review-${index}`}>
              <Quote size={20} className="mb-7 text-accent" />
              <p className="max-w-xs text-[15px] leading-7 text-primary-foreground/78">“{review.text}”</p>
              <div className="mt-8 flex items-end justify-between">
                <div><p className="text-sm font-semibold">{review.name}</p><p className="mt-1 text-xs text-primary-foreground/45">{review.city} · {review.service}</p></div>
                <span className="display-font text-3xl italic text-primary-foreground/20">0{index + 1}</span>
              </div>
            </article>)}
          </div>
        </div>
      </section>

      <section id="book" className="bg-[#e8dfd1] py-24 text-primary md:py-32">
        <div className="section-shell grid gap-14 md:grid-cols-[.78fr_1.22fr] md:gap-24">
          <div>
            <div className="mono-label mb-6 flex items-center gap-3 text-accent"><span className="h-px w-7 bg-accent" /> Your chair is waiting</div>
            <h2 className="display-font text-5xl leading-[.94] tracking-[-.05em] md:text-6xl">Make a little room for yourself.</h2>
            <p className="mt-7 max-w-sm text-sm leading-6 text-primary/65">Tell us what you have in mind. We’ll confirm your appointment over a quick call.</p>
            <div className="mt-10 space-y-4 text-sm">
              <a href={`tel:${phone}`} className="flex items-center gap-3 transition-colors hover:text-accent" data-testid="link-book-phone"><span className="flex h-9 w-9 items-center justify-center border border-primary/20"><Phone size={15} /></span> 9887181819</a>
              <a href={whatsappUrl} target="_blank" rel="noreferrer" className="flex items-center gap-3 transition-colors hover:text-accent" data-testid="link-book-whatsapp"><span className="flex h-9 w-9 items-center justify-center border border-primary/20"><MessageCircle size={15} /></span> Message us on WhatsApp</a>
            </div>
          </div>
          <div className="border border-primary/15 bg-background/60 p-6 sm:p-9">
             {booking ? <div className="flex min-h-[350px] flex-col items-center justify-center text-center" data-testid="status-booking-confirmed">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-full bg-accent text-accent-foreground"><Check size={25} /></div>
               <div className="mono-label mb-4 text-accent">WhatsApp ready</div>
               <h3 className="display-font text-4xl tracking-[-.03em]">Your request is ready.</h3>
               <p className="mt-4 max-w-sm text-sm leading-6 text-muted-foreground">Please send the WhatsApp message to confirm your booking for {booking.service.toLowerCase()} on {new Date(`${booking.date}T12:00:00`).toLocaleDateString('en-IN', { day: 'numeric', month: 'long' })} around {booking.time}.</p>
               <a href={booking.whatsappUrl} target="_blank" rel="noreferrer" className="mt-8 inline-flex items-center gap-2 border-b border-primary pb-1 text-xs font-semibold uppercase tracking-[.15em]" data-testid="link-send-whatsapp">Open WhatsApp again <MessageCircle size={14} /></a>
              <button type="button" onClick={() => setBooking(null)} className="mt-8 border-b border-primary pb-1 text-xs font-semibold uppercase tracking-[.15em]" data-testid="button-book-another">Make another request</button>
            </div> : <form onSubmit={submitBooking} noValidate data-testid="form-booking">
              <div className="mb-8 flex items-center justify-between border-b border-primary/15 pb-5"><h3 className="display-font text-3xl tracking-[-.04em]">Request a visit</h3><CalendarDays size={19} className="text-accent" /></div>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className="sm:col-span-2"><span className="mono-label mb-2 block text-primary/55">Your name</span><input required value={formData.name} onChange={(event) => updateField('name', event.target.value)} className="w-full border-0 border-b border-primary/20 bg-transparent px-0 py-2 text-sm outline-none placeholder:text-primary/30 focus:border-accent focus:ring-0" placeholder="What should we call you?" data-testid="input-booking-name" /></label>
                <label><span className="mono-label mb-2 block text-primary/55">Phone</span><input required type="tel" value={formData.phone} onChange={(event) => updateField('phone', event.target.value)} className="w-full border-0 border-b border-primary/20 bg-transparent px-0 py-2 text-sm outline-none placeholder:text-primary/30 focus:border-accent focus:ring-0" placeholder="98871..." data-testid="input-booking-phone" /></label>
                <label><span className="mono-label mb-2 block text-primary/55">Service</span><select required value={formData.service} onChange={(event) => updateField('service', event.target.value)} className="w-full border-0 border-b border-primary/20 bg-transparent px-0 py-2 text-sm outline-none focus:border-accent focus:ring-0" data-testid="select-booking-service"><option value="">Choose one</option>{services.map((service) => <option value={service.name} key={service.name}>{service.name}</option>)}</select></label>
                <label><span className="mono-label mb-2 block text-primary/55">Preferred date</span><input required type="date" min={today} value={formData.date} onChange={(event) => updateField('date', event.target.value)} className="w-full border-0 border-b border-primary/20 bg-transparent px-0 py-2 text-sm outline-none focus:border-accent focus:ring-0" data-testid="input-booking-date" /></label>
                 <label><span className="mono-label mb-2 block text-primary/55">Preferred time</span><select required value={formData.time} onChange={(event) => updateField('time', event.target.value)} className="w-full border-0 border-b border-primary/20 bg-transparent px-0 py-2 text-sm outline-none focus:border-accent focus:ring-0" data-testid="select-booking-time"><option value="">Select a time</option>{['9:00 AM', '10:00 AM', '11:30 AM', '1:00 PM', '3:30 PM', '5:00 PM', '6:30 PM', '8:00 PM'].map((time) => <option value={time} key={time}>{time}</option>)}</select></label>
                <label className="sm:col-span-2"><span className="mono-label mb-2 block text-primary/55">Message <span className="normal-case tracking-normal">(optional)</span></span><textarea value={formData.message} onChange={(event) => updateField('message', event.target.value)} rows={2} className="w-full resize-none border-0 border-b border-primary/20 bg-transparent px-0 py-2 text-sm outline-none placeholder:text-primary/30 focus:border-accent focus:ring-0" placeholder="A colour idea, an occasion, a little context..." data-testid="textarea-booking-message" /></label>
              </div>
              {formError && <p role="alert" className="mt-5 text-xs font-medium text-destructive" data-testid="status-booking-error">{formError}</p>}
              <button type="submit" className="mt-8 flex w-full items-center justify-center gap-2 bg-primary px-5 py-3.5 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5" data-testid="button-submit-booking">Confirm Booking <MessageCircle size={16} /></button>
              <p className="mt-4 text-center text-[11px] text-muted-foreground">WhatsApp will open with your booking details ready to send.</p>
            </form>}
          </div>
        </div>
      </section>

      <section id="visit" className="section-shell py-20 md:py-28">
           <div className="grid gap-10 md:grid-cols-[.7fr_1.3fr] md:items-end">
          <div><div className="mono-label mb-6 flex items-center gap-3 text-accent"><span className="h-px w-7 bg-accent" /> Come by</div><h2 className="display-font text-5xl leading-none tracking-[-.05em] text-primary">Find us in Jaipur.</h2></div>
           <div className="grid gap-5 border-t border-border pt-6 sm:grid-cols-2">
             <div><MapPin size={18} className="mb-4 text-accent" /><p className="max-w-[220px] text-sm leading-6 text-muted-foreground">{address}</p><a href={mapsUrl} target="_blank" rel="noreferrer" className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-primary hover:text-accent" data-testid="link-directions">Get directions <Navigation size={14} /></a></div>
             <div><Phone size={18} className="mb-4 text-accent" /><p className="text-sm leading-6 text-muted-foreground">Have a question?<br />We’re happy to help.</p><a href={`tel:${phone}`} className="mt-4 inline-flex items-center gap-2 text-xs font-semibold text-primary hover:text-accent" data-testid="link-call-us">Call the studio <Phone size={14} /></a></div>
             <div className="border border-border bg-secondary/55 p-5 sm:col-span-2 sm:p-6" data-testid="card-opening-hours">
               <div className="flex flex-wrap items-center justify-between gap-3 border-b border-border pb-4">
                 <div className="flex items-center gap-3"><Clock3 size={18} className="text-accent" /><span className="mono-label text-primary">Opening hours</span></div>
                 <span className="inline-flex items-center gap-2 text-[10px] font-semibold uppercase tracking-[.14em] text-accent"><span className="h-1.5 w-1.5 rounded-full bg-accent" /> Open daily</span>
               </div>
               <div className="mt-2 divide-y divide-border">
                 {openingHours.map(({ day, time }) => <div key={day} className={`flex items-center justify-between gap-4 py-3 text-sm ${currentDay === day ? 'font-semibold text-primary' : 'text-muted-foreground'}`} data-testid={`hours-${day.toLowerCase()}`}>
                   <span className="flex items-center gap-2">{day}{currentDay === day && <span className="text-[9px] font-semibold uppercase tracking-[.12em] text-accent">Today</span>}</span>
                   <span className="whitespace-nowrap text-right">{time}</span>
                 </div>)}
               </div>
             </div>
          </div>
        </div>
      </section>

      <footer className="bg-primary text-primary-foreground">
        <div className="section-shell grid gap-12 py-14 md:grid-cols-[1.2fr_.8fr_.8fr] md:py-20">
           <div><a href="#top" className="inline-flex items-center gap-3" data-testid="link-footer-brand"><span className="flex h-10 w-10 items-center justify-center rounded-full border border-primary-foreground/30 bg-primary-foreground/90 p-1"><img src={nidhiLogo} alt="Nidhi monogram" className="h-full w-full object-contain" data-testid="img-footer-logo" /></span><span><span className="block text-[15px] font-semibold">Unisex Salon</span><span className="mt-1 block text-[10px] uppercase tracking-[.25em] text-primary-foreground/45">By Nidhi</span></span></a><p className="mt-7 max-w-xs text-sm leading-6 text-primary-foreground/55">A salon for your everyday, your someday and all the little moments in between.</p></div>
          <div><span className="mono-label text-accent">Explore</span><div className="mt-5 grid gap-3 text-sm text-primary-foreground/60"><a href="#services" className="hover:text-accent" data-testid="link-footer-services">Services</a><a href="#gallery" className="hover:text-accent" data-testid="link-footer-gallery">Gallery</a><a href="#book" className="hover:text-accent" data-testid="link-footer-book">Book a visit</a></div></div>
           <div><span className="mono-label text-accent">Stay close</span><div className="mt-5 grid gap-3 text-sm text-primary-foreground/60"><a href={`tel:${phone}`} className="hover:text-accent" data-testid="link-footer-phone">9887181819</a><a href={whatsappUrl} target="_blank" rel="noreferrer" className="hover:text-accent" data-testid="link-footer-whatsapp">WhatsApp the studio</a><a href="https://www.instagram.com/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 hover:text-accent" data-testid="link-footer-instagram"><Instagram size={14} /> Instagram</a><a href="https://www.facebook.com/" target="_blank" rel="noreferrer" className="hover:text-accent" data-testid="link-footer-facebook">Facebook</a></div></div>
        </div>
        <div className="section-shell flex flex-col justify-between gap-3 border-t border-primary-foreground/15 py-5 text-[10px] uppercase tracking-[.15em] text-primary-foreground/35 sm:flex-row"><span>© 2026 Unisex Salon By Nidhi</span><span>Made for feeling good</span></div>
      </footer>

      <div className="fixed bottom-0 left-0 right-0 z-20 grid grid-cols-3 border-t border-border bg-background/95 backdrop-blur md:hidden">
        <a href={`tel:${phone}`} className="flex items-center justify-center gap-2 border-r border-border py-3 text-[10px] font-semibold uppercase tracking-[.1em] text-primary" data-testid="link-mobile-call"><Phone size={14} /> Call</a>
        <a href={whatsappUrl} target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 border-r border-border py-3 text-[10px] font-semibold uppercase tracking-[.1em] text-primary" data-testid="link-mobile-whatsapp"><MessageCircle size={14} /> WhatsApp</a>
        <button type="button" onClick={scrollToBooking} className="flex items-center justify-center gap-2 bg-accent py-3 text-[10px] font-semibold uppercase tracking-[.1em] text-accent-foreground" data-testid="button-mobile-sticky-book"><CalendarDays size={14} /> Book</button>
      </div>

      {lightboxIndex !== null && <div className="fixed inset-0 z-50 flex items-center justify-center bg-primary/95 p-4 sm:p-10" role="dialog" aria-modal="true" aria-label="Gallery image viewer" data-testid="dialog-gallery-lightbox">
        <button type="button" aria-label="Close gallery" onClick={() => setLightboxIndex(null)} className="focus-ring absolute right-5 top-5 flex h-11 w-11 items-center justify-center border border-primary-foreground/25 text-primary-foreground hover:border-accent hover:text-accent" data-testid="button-close-lightbox"><X size={20} /></button>
        <button type="button" aria-label="Previous image" onClick={() => setLightboxIndex((lightboxIndex - 1 + gallery.length) % gallery.length)} className="focus-ring absolute left-3 flex h-11 w-11 items-center justify-center border border-primary-foreground/25 text-primary-foreground hover:border-accent hover:text-accent sm:left-8" data-testid="button-lightbox-previous"><ChevronLeft size={22} /></button>
        <figure className="flex max-h-full max-w-5xl flex-col items-center">
          <img src={gallery[lightboxIndex].image} alt={gallery[lightboxIndex].alt} className="max-h-[76vh] w-auto max-w-full object-contain" data-testid="img-lightbox-active" />
          <figcaption className="mt-5 flex w-full items-center justify-between gap-8 text-primary-foreground"><span><span className="display-font text-2xl">{gallery[lightboxIndex].title}</span><span className="ml-3 text-xs text-primary-foreground/50">{gallery[lightboxIndex].category}</span></span><span className="mono-label text-accent">{String(lightboxIndex + 1).padStart(2, '0')} / {String(gallery.length).padStart(2, '0')}</span></figcaption>
        </figure>
        <button type="button" aria-label="Next image" onClick={() => setLightboxIndex((lightboxIndex + 1) % gallery.length)} className="focus-ring absolute right-3 flex h-11 w-11 items-center justify-center border border-primary-foreground/25 text-primary-foreground hover:border-accent hover:text-accent sm:right-8" data-testid="button-lightbox-next"><ChevronRight size={22} /></button>
      </div>}
    </main>
  );
}

function Router() {
  return (
    <RoutedErrorBoundary>
      <Switch>
        <Route path="/" component={Home} />
        <Route component={NotFound} />
      </Switch>
    </RoutedErrorBoundary>
  );
}

function RoutedErrorBoundary({ children }: { children: ReactNode }) {
  const [location] = useLocation();
  return <ErrorBoundary resetKey={location}>{children}</ErrorBoundary>;
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <WouterRouter base={import.meta.env.BASE_URL.replace(/\/$/, '')}>
          <Router />
        </WouterRouter>
        <Toaster />
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;