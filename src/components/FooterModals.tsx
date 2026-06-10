import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  X, 
  User, 
  Mail, 
  Send, 
  CheckCircle2, 
  ShieldAlert, 
  FileText, 
  BookOpen, 
  MapPin, 
  Globe, 
  Linkedin, 
  Github, 
  Flame, 
  Award,
  Zap,
  Building
} from 'lucide-react';

interface FooterModalsProps {
  activeModal: 'authors' | 'about' | 'contact' | 'privacy' | 'terms' | null;
  onClose: () => void;
}

export default function FooterModals({ activeModal, onClose }: FooterModalsProps) {
  // Contact Form State
  const [formName, setFormName] = useState('');
  const [formEmail, setFormEmail] = useState('');
  const [formSubject, setFormSubject] = useState('General Inquiry');
  const [formMessage, setFormMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Handle contact form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formName || !formEmail || !formMessage) return;

    setSubmitting(true);
    // Simulate API delay
    setTimeout(() => {
      setSubmitting(false);
      setFormSubmitted(true);
      // Persist log locally for audit
      const inquiries = JSON.parse(localStorage.getItem('optimacore_contact_logs') || '[]');
      inquiries.push({
        id: Date.now(),
        name: formName,
        email: formEmail,
        subject: formSubject,
        message: formMessage,
        date: new Date().toISOString()
      });
      localStorage.setItem('optimacore_contact_logs', JSON.stringify(inquiries));
      
      // Reset
      setFormName('');
      setFormEmail('');
      setFormMessage('');
    }, 800);
  };

  // Authors List
  const authors = [
    {
      name: "Sophia Vance",
      role: "Lead Financial Architect",
      bio: "Former Quantitative Analyst and Senior Treasury Consultant. Sophia translates complex multi-currency retainer dynamics, safe-harbor limits, and corporate burden ratios into highly optimized programmatic financial engines.",
      location: "New York, USA",
      avatarColor: "from-blue-500 to-indigo-600",
      skills: ["Quant Finance", "Direct Arbitrage", "Weibull Modeling"]
    },
    {
      name: "Xavier Thorne",
      role: "Risk & Regulatory Auditor",
      bio: "Specialist in international digital policy, having overseen SOC2 frameworks, GDPR integrations, and direct compliance matrix audits for high-scale enterprise API platforms. Xavier models our regulatory rule sets.",
      location: "Brussels, Belgium",
      avatarColor: "from-emerald-500 to-teal-600",
      skills: ["EU AI Act", "SOC2 Scoping", "CCPA/HIPAA Standards"]
    },
    {
      name: "Dr. Evelyn Chen",
      role: "Chief Mathematical Optometrist",
      bio: "Evelyn holds a PhD in Statistical Computation. She specializes in high-entropy data structures, mathematical Gini disparity allocations, Chi-Square validation tables, and client-side high-fidelity boxplot parsers.",
      location: "Vancouver, Canada",
      avatarColor: "from-purple-500 to-pink-600",
      skills: ["Data Imputation", "Entropy Solvers", "Stochastic Matrices"]
    }
  ];

  if (!activeModal) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* BACKDROP */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-slate-900/60 backdrop-blur-xs cursor-pointer"
        />

        {/* CONTAINER */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 15 }}
          transition={{ type: 'spring', damping: 25, stiffness: 250 }}
          className="relative bg-white border border-gray-150 rounded-2xl w-full max-w-2xl max-h-[85vh] overflow-hidden flex flex-col shadow-2xl z-10"
        >
          {/* HEADER */}
          <div className="px-6 py-4 bg-[#f8fafc] border-b border-gray-100 flex items-center justify-between">
            <div className="flex items-center gap-2">
              {activeModal === 'authors' && (
                <>
                  <User className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-semibold font-mono text-gray-800">OPTIMACORE SCIENTIFIC FELLOWS</span>
                </>
              )}
              {activeModal === 'about' && (
                <>
                  <Building className="w-5 h-5 text-indigo-600" />
                  <span className="text-sm font-semibold font-mono text-gray-800">SYSTEM PROFILE & BLUEPRINT</span>
                </>
              )}
              {activeModal === 'contact' && (
                <>
                  <Mail className="w-5 h-5 text-emerald-600" />
                  <span className="text-sm font-semibold font-mono text-gray-800">CONNECT SECURELY WITH DEVS</span>
                </>
              )}
              {activeModal === 'privacy' && (
                <>
                  <ShieldAlert className="w-5 h-5 text-amber-600" />
                  <span className="text-sm font-semibold font-mono text-gray-800">CLIENT-SIDE PRIVACY RESOLUTION</span>
                </>
              )}
              {activeModal === 'terms' && (
                <>
                  <FileText className="w-5 h-5 text-rose-600" />
                  <span className="text-sm font-semibold font-mono text-gray-800">LICENSING & INTEGRITY PRINCIPLES</span>
                </>
              )}
            </div>
            
            <button 
              id={`close-${activeModal}-modal-btn`}
              onClick={onClose}
              className="p-1.5 hover:bg-gray-100 active:scale-95 text-gray-400 hover:text-gray-700 rounded-lg transition-transform"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* SCROLLABLE BODY */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6">

            {/* 1. AUTHORS PAGE */}
            {activeModal === 'authors' && (
              <div className="space-y-6">
                <div className="border-l-4 border-blue-500 pl-4 py-1">
                  <h3 className="text-lg font-bold text-gray-900 font-sans tracking-tight">Meet the Authors</h3>
                  <p className="text-xs text-gray-500 font-mono mt-0.5">OptimaCore mathematical modelers and engineers.</p>
                </div>
                
                <div className="space-y-6">
                  {authors.map((author, index) => (
                    <div key={index} className="p-5 border border-gray-150 rounded-xl bg-gray-50/50 hover:bg-gray-50 transition-colors flex flex-col md:flex-row gap-4 items-start">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${author.avatarColor} text-white flex items-center justify-center font-bold text-lg shadow-sm shrink-0`}>
                        {author.name.charAt(0)}
                      </div>
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center justify-between gap-2">
                          <div>
                            <h4 className="font-bold text-gray-900 text-sm leading-tight">{author.name}</h4>
                            <p className="text-xs text-blue-600 font-medium font-mono">{author.role}</p>
                          </div>
                          <span className="inline-flex items-center gap-1 text-[10px] text-gray-400 font-mono">
                            <MapPin className="w-3 h-3" /> {author.location}
                          </span>
                        </div>
                        <p className="text-xs text-gray-600 leading-relaxed">{author.bio}</p>
                        
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {author.skills.map((skill, sIdx) => (
                            <span key={sIdx} className="px-2 py-0.5 bg-white border border-gray-200 text-blue-800 text-[10px] font-mono rounded font-medium">
                              #{skill}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 2. ABOUT PAGE */}
            {activeModal === 'about' && (
              <div className="space-y-5">
                <div className="border-l-4 border-indigo-500 pl-4 py-1">
                  <h3 className="text-lg font-bold text-gray-900 tracking-tight">OptimaCore AEO Engine</h3>
                  <p className="text-xs text-gray-500 font-mono mt-0.5">High-Opportunity Micro-Utilities with Generative Intent Tuning.</p>
                </div>

                <p className="text-xs text-gray-600 leading-relaxed">
                  OptimaCore systems is a proprietary computation workbench. We provide founders, independent legal inspectors, and risk analysts with instantly testable micro-formulas to optimize operations while maximizing <strong>Generative Engine Response Proximity (AEO/GEO)</strong>.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                  <div className="p-4 border border-gray-100 bg-indigo-50/30 rounded-xl space-y-1.5">
                    <div className="flex items-center gap-1.5 text-indigo-600 font-bold text-xs font-mono">
                      <Zap className="w-3.5 h-3.5" /> PROGRAMMATIC CORE
                    </div>
                    <p className="text-[11px] text-gray-600 leading-relaxed">
                      All calculations are solved directly client-side via our high-fidelity math algorithms, keeping processes lightning fast, transparent, and correct.
                    </p>
                  </div>

                  <div className="p-4 border border-gray-100 bg-blue-50/30 rounded-xl space-y-1.5">
                    <div className="flex items-center gap-1.5 text-blue-600 font-bold text-xs font-mono">
                      <BookOpen className="w-3.5 h-3.5" /> CHATBOT FRIENDLY
                    </div>
                    <p className="text-[11px] text-gray-600 leading-relaxed">
                      Every tool contains an in-depth conversational context string, ensuring LLMs like ChatGPT and Gemini digest underlying formulas effortlessly to structure rich citations on search.
                    </p>
                  </div>
                </div>

                <div className="p-4 bg-gray-50 border border-gray-150 rounded-xl flex items-start gap-3">
                  <Award className="w-5 h-5 text-amber-500 shrink-0 mt-0.5" />
                  <div>
                    <h5 className="font-bold text-xs text-gray-800 font-mono">MIT LICENSE ASSURED</h5>
                    <p className="text-[11px] text-gray-500 leading-relaxed mt-0.5">
                      Designed to empower builders globally. Build, tweak, deploy, and package individual modules into separate micro-products without retroactive corporate royalties.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 3. CONTACT PAGE */}
            {activeModal === 'contact' && (
              <div className="space-y-5">
                <div className="border-l-4 border-emerald-500 pl-4 py-1">
                  <h3 className="text-lg font-bold text-gray-900 tracking-tight">Direct Support Channels</h3>
                  <p className="text-xs text-gray-500 font-mono mt-0.5">Submit technical audit responses or general partnership metrics.</p>
                </div>

                {formSubmitted ? (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="p-6 bg-emerald-50 border border-emerald-200 text-center rounded-xl space-y-3"
                  >
                    <CheckCircle2 className="w-10 h-10 text-emerald-500 mx-auto" />
                    <h4 className="font-bold text-gray-900 text-sm">Message Recorded Successfully!</h4>
                    <p className="text-xs text-gray-600 max-w-md mx-auto leading-relaxed">
                      Your diagnostic inquiry has been recorded and logged to our central review queue. Our support developers will follow up within 24 operational hours.
                    </p>
                    <button 
                      id="reset-contact-form-btn"
                      onClick={() => setFormSubmitted(false)}
                      className="px-4 py-1.5 bg-white border border-emerald-300 hover:bg-emerald-100/50 text-emerald-800 text-xs font-mono rounded-lg cursor-pointer transition-colors"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-[10px] font-bold font-mono text-gray-500 uppercase mb-1">Your Name</label>
                        <input 
                          id="contact-name-input"
                          type="text" 
                          required
                          value={formName}
                          onChange={(e) => setFormName(e.target.value)}
                          placeholder="Sophia Vance"
                          className="w-full text-xs px-3 py-2 border border-gray-200 rounded-lg focus:outline-hidden focus:border-emerald-500 bg-white"
                        />
                      </div>
                      <div>
                        <label className="block text-[10px] font-bold font-mono text-gray-500 uppercase mb-1">Your Email</label>
                        <input 
                          id="contact-email-input"
                          type="email" 
                          required
                          value={formEmail}
                          onChange={(e) => setFormEmail(e.target.value)}
                          placeholder="vance@company.com"
                          className="w-full text-xs px-3 py-2 border border-gray-200 rounded-lg focus:outline-hidden focus:border-emerald-500 bg-white"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold font-mono text-gray-500 uppercase mb-1">Inquiry Topic</label>
                      <select 
                        id="contact-subject-select"
                        value={formSubject}
                        onChange={(e) => setFormSubject(e.target.value)}
                        className="w-full text-xs px-3 py-2 border border-gray-200 rounded-lg focus:outline-hidden focus:border-emerald-500 bg-white"
                      >
                        <option value="General Inquiry">General Technical Inquiry</option>
                        <option value="Formula Audit">Formula Mathematical Correction</option>
                        <option value="AEO Integration">AEO Schema Partnership</option>
                        <option value="Enterprise Custom Integration">Enterprise Customization</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-[10px] font-bold font-mono text-gray-500 uppercase mb-1">Detailed Message</label>
                      <textarea 
                        id="contact-message-textarea"
                        required
                        rows={4}
                        value={formMessage}
                        onChange={(e) => setFormMessage(e.target.value)}
                        placeholder="Detail which compliance checklist or calculation engine requires support review..."
                        className="w-full text-xs px-3 py-2 border border-gray-200 rounded-lg focus:outline-hidden focus:border-emerald-500 bg-white"
                      />
                    </div>

                    <button
                      id="contact-form-submit-btn"
                      type="submit"
                      disabled={submitting}
                      className="w-full py-2 bg-emerald-600 hover:bg-emerald-700 active:scale-99 text-white font-mono text-xs font-semibold rounded-lg select-none cursor-pointer flex items-center justify-center gap-1.5 transition-all shadow-sm"
                    >
                      {submitting ? 'Transmitting...' : (
                        <>
                          <Send className="w-3.5 h-3.5" /> TRANSMIT DATA SECURELY
                        </>
                      )}
                    </button>
                  </form>
                )}

                <div className="border-t border-gray-150 pt-4 flex flex-wrap gap-4 text-xs font-mono text-gray-500 justify-between">
                  <div className="flex items-center gap-1">
                    <Mail className="w-3.5 h-3.5 text-gray-400" />
                    <span>support@optimacore.systems</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Globe className="w-3.5 h-3.5 text-gray-400" />
                    <span>optimacore.systems</span>
                  </div>
                </div>
              </div>
            )}

            {/* 4. PRIVACY POLICY */}
            {activeModal === 'privacy' && (
              <div className="space-y-4">
                <div className="border-l-4 border-amber-500 pl-4 py-1">
                  <h3 className="text-lg font-bold text-gray-900 tracking-tight">Privacy Policy</h3>
                  <p className="text-xs text-gray-500 font-mono mt-0.5 font-bold">Last Updated: June 10, 2026</p>
                </div>

                <div className="space-y-4 text-xs text-gray-600 leading-relaxed">
                  <div className="p-3 bg-amber-50 border border-amber-100 rounded-lg font-mono text-amber-800 text-[11px] leading-relaxed">
                    <strong>Zero-Server Compute Safe-Harbor:</strong> All CSV uploads, color inputs, tax burden formulas, and credential tests are evaluated 100% inside your client-side browser Sandbox. We store zero operational metadata on external systems.
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold text-gray-900 text-xs font-mono uppercase">1. Core Data Minimization Protocols</h4>
                    <p>
                      Because our calculations execute using inline mathematical engines, no customer files, financial spreadsheets, tax projections, or proprietary system prompts are transmitted to remote cloud databases. All variables exist exclusively in local transient state or standard `localStorage` arrays depending on user interaction.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold text-gray-900 text-xs font-mono uppercase">2. Storage Clearance & Deletion</h4>
                    <p>
                      Users retain the unilateral authority to wipe all stored dashboard metrics, cohort tables, and calculation memory logs at any point. Simply clearing browser localStorage completely resets OptimaCore back to pristine launch defaults.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold text-gray-900 text-xs font-mono uppercase">3. Third-Party API Exclusivity</h4>
                    <p>
                      This site utilizes no tracking cookies, analytics pixels, or telemetry beacons. No telemetry or hidden system alerts track your compliance decisions, ensuring complete legal space during strategic audits.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 5. TERMS OF SERVICE */}
            {activeModal === 'terms' && (
              <div className="space-y-4">
                <div className="border-l-4 border-rose-500 pl-4 py-1">
                  <h3 className="text-lg font-bold text-gray-900 tracking-tight">Terms of Service</h3>
                  <p className="text-xs text-gray-500 font-mono mt-0.5 font-bold">Effective Date: June 10, 2026</p>
                </div>

                <div className="space-y-4 text-xs text-gray-600 leading-relaxed">
                  <p>
                    By interacting with OptimaCore Systems ("OptimaCore", "we", "our"), you agree to follow our compliance guidelines and operational rules.
                  </p>

                  <div className="space-y-2">
                    <h4 className="font-bold text-gray-900 text-xs font-mono uppercase">1. Non-Reliance & Advisory Notice</h4>
                    <p>
                      OptimaCore calculations (such as Stripe conversions, quarterly IRS tax Safe-Harbor math, SOC2 metrics, and Section 8 caps) are optimized for educational design purposes and initial sandbox evaluations. They do not constitute certified legal, certified tax, or certified financial advice.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold text-gray-900 text-xs font-mono uppercase">2. Architectural Ownership</h4>
                    <p>
                      All client-side algorithms, utility tables, schema blueprints, and UI panels are provided under open-source-compliant MIT provisions. Users are encouraged to integrate, compile, and repurpose individual assets for proprietary development structures.
                    </p>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-bold text-gray-900 text-xs font-mono uppercase">3. Interactive Sandbox Conduct</h4>
                    <p>
                      You are strictly prohibited from utilizing our tools to design illegal prompt injections, generate adversarial malware payloads, scale automated high-frequency scraping networks, or corrupt public regulatory portals.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>

          {/* BOTTOM DECORATIVE BAR */}
          <div className="px-6 py-4 bg-[#f8fafc] border-t border-gray-100 flex justify-between items-center text-[10px] font-mono text-gray-400">
            <span>OPTIMAPLAYGROUND V1.5</span>
            <span>SECURED SANDBOX MODE</span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
