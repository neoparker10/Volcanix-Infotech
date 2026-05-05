import { Link } from 'react-router-dom';
import { ArrowDown, ArrowRight, Code2, Palette, TrendingUp, CheckCircle2, Users, Clock, Globe } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

function RevealSection({ children, className = '', delay = '' }) {
  const ref = useScrollReveal();
  return (
    <div ref={ref} className={`reveal ${delay} ${className}`}>
      {children}
    </div>
  );
}

const services = [
  {
    icon: Palette,
    title: 'Design',
    desc: 'Our web design team combines over 12 years of experience with innovative solutions, ensuring that the websites we create are visually appealing and strategically crafted to meet your business goals and elevate your digital presence.',
  },
  {
    icon: Code2,
    title: 'Development',
    desc: 'Looking for customized, cutting-edge software solutions? Our development team specializes in building high-performance applications tailored to your unique needs, empowering your business with robust and scalable technology.',
  },
  {
    icon: TrendingUp,
    title: 'Marketing',
    desc: 'With data-driven digital marketing strategies, we help you reach new heights by attracting and engaging the right customers. Our marketing team ensures that your business gets noticed and stays competitive in today\'s fast-paced digital landscape.',
  },
];

const stats = [
  { value: '40+', label: 'Web Experts', icon: Users },
  { value: '12+', label: 'Years Experience', icon: Clock },
  { value: '100+', label: 'Projects Delivered', icon: CheckCircle2 },
  { value: '3', label: 'Core Services', icon: Globe },
];

export default function HomePage() {
  return (
    <main>
      {/* ── Hero ─────────────────────────────── */}
      <section className="gradient-animated min-h-screen flex flex-col justify-center relative overflow-hidden noise-overlay">
        {/* Geometric accent */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] opacity-5">
          <svg viewBox="0 0 600 600" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="300" cy="300" r="280" stroke="#00C9C8" strokeWidth="1"/>
            <circle cx="300" cy="300" r="200" stroke="#00C9C8" strokeWidth="1"/>
            <circle cx="300" cy="300" r="120" stroke="#00C9C8" strokeWidth="1"/>
            <line x1="20" y1="300" x2="580" y2="300" stroke="#00C9C8" strokeWidth="0.5"/>
            <line x1="300" y1="20" x2="300" y2="580" stroke="#00C9C8" strokeWidth="0.5"/>
          </svg>
        </div>

        {/* Cyan dot top-left */}
        <div className="absolute top-32 left-10 w-2 h-2 rounded-full bg-brand-cyan animate-float" />
        <div className="absolute bottom-40 right-20 w-1.5 h-1.5 rounded-full bg-brand-gold animate-float" style={{animationDelay: '2s'}} />

        <div className="max-w-7xl mx-auto px-6 pt-28 pb-24 grid md:grid-cols-2 gap-16 items-center">
          <div className="animate-fade-up">
            <div className="flex items-center gap-3 mb-8">
              <div className="h-px w-8 bg-brand-cyan" />
              <span className="section-label">Software Agency · Kashmir</span>
            </div>
            <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.05] tracking-tight mb-8">
              Software Agency{' '}
              <span className="text-brand-cyan">That Thrives</span>
              {' '}on Your Success
            </h1>
            <div className="flex gap-4 flex-wrap">
              <Link to="/contact" className="btn-cyan text-base px-8 py-4">
                Get a Quote <ArrowRight size={16} />
              </Link>
              <Link to="/services" className="inline-flex items-center gap-2 px-8 py-4 border-2 border-white/30 text-white font-display font-semibold text-base tracking-wide hover:border-brand-cyan hover:text-brand-cyan transition-all duration-200">
                Our Services
              </Link>
            </div>
          </div>

          <div className="animate-fade-up" style={{animationDelay: '0.2s'}}>
            <div className="bg-white/5 backdrop-blur-sm border border-white/10 p-8 relative">
              <div className="absolute -top-3 -left-3 w-6 h-6 border-t-2 border-l-2 border-brand-cyan" />
              <div className="absolute -bottom-3 -right-3 w-6 h-6 border-b-2 border-r-2 border-brand-cyan" />
              <p className="font-body text-white/80 text-lg leading-relaxed">
                If you're looking for a partner to build custom software applications that elevate your business, you've come to the right place. We specialize in creating innovative solutions that help you scale and succeed in today's competitive landscape.
              </p>
              <a href="#about" className="inline-flex items-center gap-2 mt-6 font-mono text-xs text-brand-cyan uppercase tracking-widest hover:gap-3 transition-all">
                <ArrowDown size={14} className="animate-bounce" /> Find out how
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ────────────────────────── */}
      <section className="bg-brand-sand border-y border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-10 grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map(({ value, label, icon: Icon }) => (
            <div key={label} className="text-center">
              <Icon className="mx-auto mb-2 text-brand-cyan" size={20} />
              <div className="font-display text-3xl font-bold text-brand-dark">{value}</div>
              <div className="font-body text-xs text-brand-muted uppercase tracking-widest mt-1">{label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* ── Hire Us For ──────────────────────── */}
      <section className="bg-white py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <RevealSection>
            <p className="section-label mb-4">What We Do</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-dark mb-16">
              Hire Us For
            </h2>
          </RevealSection>

          <div className="grid md:grid-cols-3 gap-0">
            {services.map(({ icon: Icon, title, desc }, i) => (
              <RevealSection key={title} delay={`reveal-delay-${i + 1}`}>
                <div className={`p-10 h-full border-b md:border-b-0 ${i < 2 ? 'md:border-r' : ''} border-gray-100 group hover:bg-brand-dark transition-all duration-300`}>
                  <div className="w-12 h-12 bg-brand-sand flex items-center justify-center mb-6 group-hover:bg-brand-cyan transition-colors duration-300">
                    <Icon size={22} className="text-brand-dark group-hover:text-brand-dark transition-colors" />
                  </div>
                  <h3 className="font-display text-xl font-bold text-brand-dark group-hover:text-white mb-4 transition-colors duration-300">
                    {title}
                  </h3>
                  <p className="font-body text-sm text-brand-muted group-hover:text-white/70 leading-relaxed transition-colors duration-300">
                    {desc}
                  </p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── About snippet ────────────────────── */}
      <section id="about" className="bg-brand-sand py-28 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <RevealSection>
            <p className="section-label mb-4">Who We Are</p>
            <h2 className="font-display text-4xl font-bold text-brand-dark mb-6">About Us</h2>
            <p className="font-display text-lg font-semibold text-brand-dark mb-4 leading-relaxed">
              We are a team of 40 web experts with over 12 years of experience in software application building and digital marketing to help businesses grow online.
            </p>

            <div className="space-y-6 mt-8">
              <div>
                <h4 className="font-display font-bold text-brand-dark mb-2 flex items-center gap-2">
                  <span className="w-1 h-4 bg-brand-cyan inline-block" /> Mission
                </h4>
                <p className="font-body text-sm text-brand-muted leading-relaxed pl-3">
                  Our mission is to drive business transformation through disruptive technologies, empowering businesses to bridge gaps and elevate their competitive edge. With over 12 years of expertise, we provide affordable, effective, custom software development and digital marketing solutions that simplify business processes and help clients grow online.
                </p>
              </div>
              <div>
                <h4 className="font-display font-bold text-brand-dark mb-2 flex items-center gap-2">
                  <span className="w-1 h-4 bg-brand-gold inline-block" /> Vision
                </h4>
                <p className="font-body text-sm text-brand-muted leading-relaxed pl-3">
                  We aim to become a global leader in delivering innovative software applications and digital marketing services, driving business success by transforming industries and enhancing productivity. Through our 40 web experts, we aim to help businesses achieve lasting growth and build stronger, more competitive futures.
                </p>
              </div>
            </div>
            <Link to="/about" className="btn-primary mt-8 inline-flex">
              Read More <ArrowRight size={16} />
            </Link>
          </RevealSection>

          <RevealSection delay="reveal-delay-1">
            <div className="relative">
              <div className="aspect-[4/3] bg-brand-charcoal overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                  alt="Volcanix office"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
              <div className="absolute -bottom-6 -left-6 bg-brand-cyan p-6 text-brand-dark">
                <div className="font-display text-3xl font-bold">12+</div>
                <div className="font-body text-xs font-medium tracking-widest uppercase mt-1">Years of Excellence</div>
              </div>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── Why Choose Us ────────────────────── */}
      <section className="bg-white py-28 px-6">
        <div className="max-w-7xl mx-auto">
          <RevealSection className="max-w-3xl mx-auto text-center mb-16">
            <p className="section-label mb-4">Our Difference</p>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-brand-dark mb-6">
              Why Choose Us?
            </h2>
            <p className="font-display text-lg font-semibold text-brand-dark mb-4">
              We are the right term for your business. We have the expertise and knowledge to offer impartial advice and services at an honest price.
            </p>
            <p className="font-body text-brand-muted leading-relaxed">
              With us you'll feel heard. We listen to our client requirements and then select the right solution that fits. We care for your business as our own. We take a sincere interest in it and genuinely want to help your company reach its potential.
            </p>
          </RevealSection>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              'Committed to delivering the best',
              'Honest and transparent services',
              'We care for your business just like ours',
              'Keep learning and adapting to new technologies',
            ].map((item, i) => (
              <RevealSection key={i} delay={`reveal-delay-${(i % 3) + 1}`}>
                <div className="p-6 bg-brand-sand border-l-4 border-brand-cyan">
                  <CheckCircle2 size={20} className="text-brand-cyan mb-3" />
                  <p className="font-body text-sm font-medium text-brand-dark">{item}</p>
                </div>
              </RevealSection>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ───────────────────────── */}
      <section className="bg-brand-dark py-0 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 min-h-[420px]">
          <div className="px-10 py-16 flex flex-col justify-center">
            <RevealSection>
              <p className="section-label mb-4">Start Today</p>
              <h2 className="font-display text-4xl md:text-5xl font-bold text-white mb-6 leading-tight">
                Have a Project<br />
                <span className="text-brand-cyan">in mind?</span>
              </h2>
              <p className="font-body text-white/60 mb-8">
                We can help you bring your ideas to life. Let's talk about what we can build and raise together.
              </p>
              <Link to="/contact" className="btn-cyan">
                Connect with us! <ArrowRight size={16} />
              </Link>
            </RevealSection>
          </div>
          <div className="relative overflow-hidden min-h-[280px]">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
              alt="Team collaboration"
              className="absolute inset-0 w-full h-full object-cover opacity-60"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent to-brand-dark/50" />
          </div>
        </div>
      </section>

      {/* ── Let Us Build ─────────────────────── */}
      <section className="bg-brand-charcoal py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <RevealSection>
            <h2 className="font-display text-4xl md:text-5xl font-bold text-white leading-tight">
              Let us together build<br />
              <span className="text-brand-cyan">your business</span>
            </h2>
          </RevealSection>
          <RevealSection delay="reveal-delay-1">
            <p className="font-body text-white/70 leading-relaxed text-lg">
              When connected with us, you aren't developing software applications for your clients alone. We have your back and put in our best to contribute to the success of your entire team and organization. So, if you are looking for the right agency to help you build top-notch software apps and enhance your online presence with SEO, while driving more conversions and revenue, we are right here!
            </p>
          </RevealSection>
        </div>
      </section>
    </main>
  );
}
