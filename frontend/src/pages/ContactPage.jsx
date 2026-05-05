import { useState } from 'react';
import { MapPin, Mail, Facebook, Twitter, Linkedin, Send, CheckCircle2 } from 'lucide-react';
import { api } from '../lib/supabase';
import toast from 'react-hot-toast';
import { useScrollReveal } from '../hooks/useScrollReveal';

function RevealSection({ children, className = '', delay = '' }) {
  const ref = useScrollReveal();
  return <div ref={ref} className={`reveal ${delay} ${className}`}>{children}</div>;
}

export default function ContactPage() {
  const [form, setForm] = useState({
    first_name: '', last_name: '', email: '', subject: '', message: ''
  });
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm(p => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await api.sendMessage(form);
      toast.success(res.message);
      setSent(true);
      setForm({ first_name: '', last_name: '', email: '', subject: '', message: '' });
    } catch (err) {
      toast.error(err.message || 'Failed to send message');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main>
      {/* ── Hero ─────────────────────── */}
      <section className="page-hero gradient-animated noise-overlay">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-6">
            <div className="h-px w-8 bg-brand-cyan" />
            <span className="section-label text-brand-cyan/80">Reach Out</span>
          </div>
          <h1 className="font-display text-5xl md:text-7xl font-bold text-white max-w-2xl leading-tight">
            Get In <span className="text-brand-cyan">Touch</span>
          </h1>
          <p className="font-body text-white/60 mt-4 max-w-md text-lg">
            Have a project in mind? Let's talk about what we can build together.
          </p>
        </div>
      </section>

      {/* ── Contact section ──────────── */}
      <section className="bg-brand-sand py-28 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16">
          {/* Left: Info */}
          <RevealSection>
            <h2 className="font-display text-3xl font-bold text-brand-dark mb-8">
              We are here to help!
            </h2>

            <div className="space-y-8">
              <div>
                <h4 className="font-display font-bold text-brand-dark mb-3 flex items-center gap-2">
                  <MapPin size={16} className="text-brand-cyan" /> Address
                </h4>
                <p className="font-body text-sm text-brand-muted leading-relaxed pl-6">
                  1st Floor, Friends Complex, New Colony,<br />
                  Sopore, Jammu and Kashmir 193201
                </p>
              </div>

              <div>
                <h4 className="font-display font-bold text-brand-dark mb-3 flex items-center gap-2">
                  <Mail size={16} className="text-brand-cyan" /> Email
                </h4>
                <a
                  href="mailto:info@volcanixinfotech.org"
                  className="font-body text-sm text-brand-cyan hover:underline pl-6"
                >
                  info@volcanixinfotech.org
                </a>
              </div>

              <div>
                <h4 className="font-display font-bold text-brand-dark mb-3">Follow us</h4>
                <div className="flex gap-3 pl-0">
                  {[
                    { Icon: Facebook, href: '#', label: 'Facebook' },
                    { Icon: Twitter, href: '#', label: 'Twitter' },
                    { Icon: Linkedin, href: '#', label: 'LinkedIn' },
                  ].map(({ Icon, href, label }) => (
                    <a
                      key={label}
                      href={href}
                      aria-label={label}
                      className="w-10 h-10 border-2 border-brand-dark flex items-center justify-center text-brand-dark hover:bg-brand-dark hover:text-white transition-all duration-200"
                    >
                      <Icon size={16} />
                    </a>
                  ))}
                </div>
              </div>
            </div>

            {/* Decorative */}
            <div className="mt-12 p-6 bg-brand-dark text-white">
              <p className="font-mono text-xs text-brand-cyan uppercase tracking-widest mb-3">Response Time</p>
              <p className="font-display text-2xl font-bold">Within 24 hours</p>
              <p className="font-body text-sm text-white/50 mt-1">We take every enquiry seriously</p>
            </div>
          </RevealSection>

          {/* Right: Form */}
          <RevealSection delay="reveal-delay-1">
            <div className="bg-white p-10 shadow-sm border border-gray-100">
              <h3 className="font-display text-xl font-bold text-brand-dark mb-8">
                Send us a message
              </h3>

              {sent ? (
                <div className="text-center py-12">
                  <CheckCircle2 size={52} className="text-brand-cyan mx-auto mb-4" />
                  <h4 className="font-display text-xl font-bold text-brand-dark mb-2">Message Sent!</h4>
                  <p className="font-body text-brand-muted text-sm">We'll get back to you within 24 hours.</p>
                  <button
                    onClick={() => setSent(false)}
                    className="mt-6 font-body text-sm text-brand-cyan hover:underline"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="font-mono text-xs text-brand-muted uppercase tracking-widest block mb-1.5">First Name *</label>
                      <input
                        type="text"
                        name="first_name"
                        value={form.first_name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 bg-brand-sand font-body text-sm text-brand-dark outline-none focus:border-brand-cyan transition-colors"
                        placeholder="John"
                      />
                    </div>
                    <div>
                      <label className="font-mono text-xs text-brand-muted uppercase tracking-widest block mb-1.5">Last Name *</label>
                      <input
                        type="text"
                        name="last_name"
                        value={form.last_name}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-3 border border-gray-200 bg-brand-sand font-body text-sm text-brand-dark outline-none focus:border-brand-cyan transition-colors"
                        placeholder="Doe"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="font-mono text-xs text-brand-muted uppercase tracking-widest block mb-1.5">Email Address *</label>
                    <input
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 bg-brand-sand font-body text-sm text-brand-dark outline-none focus:border-brand-cyan transition-colors"
                      placeholder="john@example.com"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-xs text-brand-muted uppercase tracking-widest block mb-1.5">Subject *</label>
                    <input
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 border border-gray-200 bg-brand-sand font-body text-sm text-brand-dark outline-none focus:border-brand-cyan transition-colors"
                      placeholder="Project inquiry"
                    />
                  </div>

                  <div>
                    <label className="font-mono text-xs text-brand-muted uppercase tracking-widest block mb-1.5">Your Message *</label>
                    <textarea
                      name="message"
                      value={form.message}
                      onChange={handleChange}
                      required
                      rows={5}
                      className="w-full px-4 py-3 border border-gray-200 bg-brand-sand font-body text-sm text-brand-dark outline-none focus:border-brand-cyan transition-colors resize-none"
                      placeholder="Tell us about your project..."
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-brand-dark text-white font-display font-semibold text-sm tracking-wide flex items-center justify-center gap-2 hover:bg-brand-cyan hover:text-brand-dark transition-all duration-200 disabled:opacity-60"
                  >
                    {loading ? 'Sending...' : (
                      <>Send Message <Send size={15} /></>
                    )}
                  </button>
                </form>
              )}
            </div>
          </RevealSection>
        </div>
      </section>
    </main>
  );
}
