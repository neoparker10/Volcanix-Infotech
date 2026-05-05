import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle2 } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

function RevealSection({ children, className = '', delay = '' }) {
  const ref = useScrollReveal();
  return <div ref={ref} className={`reveal ${delay} ${className}`}>{children}</div>;
}

const coreValues = [
  'Committed to delivering the best',
  'Honest and transparent services',
  'We care for your business just like ours',
  'Keep learning and adapting to new technologies',
];

export default function AboutPage() {
  return (
    <main>
      {/* ── Hero ─────────────────────── */}
      <section className="page-hero gradient-animated noise-overlay">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-brand-cyan" />
            <span className="section-label text-brand-cyan/80">Our Story</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white max-w-2xl leading-tight">
            About <span className="text-brand-cyan">Us</span>
          </h1>
        </div>
      </section>

      {/* ── Intro block ──────────────── */}
      <section className="bg-brand-sand py-28 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <RevealSection>
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src="https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&q=80"
                  alt="Volcanix office space"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-6 -right-6 bg-brand-dark text-white p-6">
                <div className="font-display text-3xl font-bold text-brand-cyan">40+</div>
                <div className="font-body text-xs text-white/60 uppercase tracking-widest mt-1">Web Experts</div>
              </div>
            </div>
          </RevealSection>

          <RevealSection delay="reveal-delay-1">
            <p className="section-label mb-4">Who We Are</p>
            <p className="font-display text-lg font-bold text-brand-dark mb-6 leading-relaxed">
              We are a team of 40 web experts with over 12 years of experience in software application building and digital marketing to help businesses grow online.
            </p>
            <p className="font-body text-brand-muted leading-relaxed mb-8">
              Driving business transformation, digitally — Applying disruptive technologies for business transformations. Volcanix brings great advantages to the business space by bridging gaps, simplifying businesses, and elevating competitive benefits by providing technology-based business solutions.
            </p>

            <h3 className="font-display text-xl font-bold text-brand-dark mb-5">Our Core Values</h3>
            <ul className="space-y-3">
              {coreValues.map((v, i) => (
                <li key={i} className="flex items-center gap-3 font-body text-sm text-brand-dark">
                  <CheckCircle2 size={16} className="text-brand-cyan flex-shrink-0" />
                  {v}
                </li>
              ))}
            </ul>
          </RevealSection>
        </div>
      </section>

      {/* ── Tagline strip ────────────── */}
      <section className="bg-white py-10 px-6 border-y border-gray-100 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center">
          <p className="font-display text-base font-semibold text-brand-dark tracking-wide">
            Leveraging businesses by simplifying tech-driven digital solutions re-defining the future.
          </p>
        </div>
      </section>

      {/* ── Mission & Vision ─────────── */}
      <section className="bg-brand-dark py-28 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12">
          <RevealSection>
            <div className="border border-white/10 p-10 h-full">
              <div className="w-1 h-10 bg-brand-cyan mb-8" />
              <h3 className="font-display text-2xl font-bold text-white mb-5">Our Mission</h3>
              <p className="font-body text-white/60 leading-relaxed">
                Our mission is to drive business transformation through disruptive technologies, empowering businesses to bridge gaps and elevate their competitive edge. With over 12 years of expertise, we provide affordable, effective, custom software development and digital marketing solutions that simplify business processes and help clients grow online.
              </p>
            </div>
          </RevealSection>
          <RevealSection delay="reveal-delay-1">
            <div className="border border-white/10 p-10 h-full bg-white/5">
              <div className="w-1 h-10 bg-brand-gold mb-8" />
              <h3 className="font-display text-2xl font-bold text-white mb-5">Our Vision</h3>
              <p className="font-body text-white/60 leading-relaxed">
                We aim to become a global leader in delivering innovative software applications and digital marketing services, driving business success by transforming industries and enhancing productivity. Through our 40 web experts, we aim to help businesses achieve lasting growth and build stronger, more competitive futures.
              </p>
            </div>
          </RevealSection>
        </div>
      </section>

      {/* ── CTA ──────────────────────── */}
      <section className="bg-brand-sand py-0 overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 min-h-[400px]">
          <div className="px-10 py-16 flex flex-col justify-center">
            <RevealSection>
              <h2 className="font-display text-4xl font-bold text-brand-dark mb-4 leading-tight">
                Have a Project<br />
                <span className="text-brand-cyan">in mind?</span>
              </h2>
              <p className="font-body text-brand-muted mb-8">
                We can help you bring your ideas to life. Let's talk about what we can build and raise together.
              </p>
              <Link to="/contact" className="btn-primary inline-flex">
                Connect with us! <ArrowRight size={16} />
              </Link>
            </RevealSection>
          </div>
          <div className="relative overflow-hidden min-h-[280px]">
            <img
              src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&q=80"
              alt="Team at work"
              className="absolute inset-0 w-full h-full object-cover"
            />
          </div>
        </div>
      </section>

      {/* ── Let us build ─────────────── */}
      <section className="bg-brand-charcoal py-24 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          <RevealSection>
            <h2 className="font-display text-4xl font-bold text-white leading-tight">
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
