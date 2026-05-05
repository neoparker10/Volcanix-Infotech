import { Link } from 'react-router-dom';
import { ArrowRight, GraduationCap, FlaskConical, Megaphone } from 'lucide-react';
import { useScrollReveal } from '../hooks/useScrollReveal';

function RevealSection({ children, className = '', delay = '' }) {
  const ref = useScrollReveal();
  return <div ref={ref} className={`reveal ${delay} ${className}`}>{children}</div>;
}

const services = [
  {
    icon: GraduationCap,
    number: '01',
    title: 'School Management Software',
    desc: 'Our robust school management software helps educational institutions streamline administrative tasks, manage student data, and optimize communication between teachers, students, and parents. With an intuitive interface and customizable features, we offer a complete solution tailored to meet your institution\'s needs—helping you focus on what truly matters: education.',
    color: 'bg-brand-cyan',
  },
  {
    icon: FlaskConical,
    number: '02',
    title: 'Research & Development',
    desc: 'We assist in the research and development of custom software solutions tailored to your industry. Whether you need a new web or mobile application, or updates to existing software, our team will ensure your project is built on a solid foundation of research and best practices to deliver exceptional results.',
    color: 'bg-brand-gold',
  },
  {
    icon: Megaphone,
    number: '03',
    title: 'Digital Marketing',
    desc: 'Our team can help you build a strong brand presence through effective marketing strategies. We specialize in digital branding, social media marketing, and crafting campaigns that increase visibility, engage your target audience, and drive growth for your business.',
    color: 'bg-white',
  },
];

export default function ServicesPage() {
  return (
    <main>
      {/* ── Hero ─────────────────────── */}
      <section className="page-hero gradient-animated noise-overlay">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-brand-cyan" />
            <span className="section-label text-brand-cyan/80">What We Offer</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white max-w-2xl leading-tight">
            Our <span className="text-brand-cyan">Services</span>
          </h1>
          <p className="font-body text-white/60 mt-6 max-w-lg text-lg">
            Tailored solutions designed to drive real business outcomes.
          </p>
        </div>
      </section>

      {/* ── Section intro ────────────── */}
      <section className="bg-white py-20 px-6">
        <div className="max-w-7xl mx-auto text-center max-w-2xl mx-auto">
          <RevealSection>
            <p className="section-label mb-4">How We Help</p>
            <h2 className="font-display text-4xl font-bold text-brand-dark">
              How can we help you?
            </h2>
          </RevealSection>
        </div>
      </section>

      {/* ── Services list ────────────── */}
      <section className="bg-brand-sand pb-16 md:pb-28 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto space-y-0">
          {services.map(({ icon: Icon, number, title, desc, color }, i) => (
            <RevealSection key={title} delay={`reveal-delay-${(i % 3) + 1}`}>
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Number block */}
                <div className={`${color} p-14 flex flex-col justify-between min-h-[320px] ${i % 2 === 1 ? 'md:order-last' : ''}`}>
                  <div>
                    <span className="font-mono text-xs tracking-widest uppercase opacity-50">{number}</span>
                    <div className="mt-4 w-14 h-14 bg-black/10 flex items-center justify-center">
                      <Icon size={26} className="text-inherit" />
                    </div>
                  </div>
                  <h3 className="font-display text-3xl font-bold leading-tight mt-8">{title}</h3>
                </div>

                {/* Text block */}
                <div className="bg-white p-14 flex flex-col justify-between min-h-[320px]">
                  <p className="font-body text-brand-muted leading-relaxed text-[15px]">{desc}</p>
                  <Link
                    to="/contact"
                    className="inline-flex items-center gap-2 font-display text-sm font-semibold text-brand-dark hover:text-brand-cyan transition-colors mt-8 group"
                  >
                    Get In Touch
                    <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            </RevealSection>
          ))}
        </div>
      </section>

      {/* ── CTA ──────────────────────── */}
      <section className="bg-brand-dark py-16 md:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <RevealSection>
            <h2 className="font-display text-4xl font-bold text-white leading-tight">
              Have a Project<br /><span className="text-brand-cyan">in mind?</span>
            </h2>
            <p className="font-body text-white/60 mt-4 mb-8">
              We can help you bring your ideas to life. Let's talk about what we can build and raise together.
            </p>
            <Link to="/contact" className="btn-cyan">
              Connect with us! <ArrowRight size={16} />
            </Link>
          </RevealSection>
          <RevealSection delay="reveal-delay-1">
            <p className="font-body text-white/70 leading-relaxed text-lg border-l-2 border-brand-cyan pl-6">
              When connected with us, you aren't developing software applications for your clients alone. We have your back and put in our best to contribute to the success of your entire team and organization. So, if you are looking for the right agency to help you build top-notch software apps and enhance your online presence with SEO, while driving more conversions and revenue, we are right here!
            </p>
          </RevealSection>
        </div>
      </section>
    </main>
  );
}
