import React, { useState } from 'react';
import { HelpCircle, ChevronDown, ChevronUp, DollarSign, Wallet, FileText, ArrowRight } from 'lucide-react';

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCategory {
  title: string;
  icon: any;
  items: FaqItem[];
}

export default function FractionalFaq() {
  const [activeCategory, setActiveCategory] = useState<number>(0);
  const [openIndex, setOpenIndex] = useState<number | null>(0); // Default open first question

  const faqCategories: FaqCategory[] = [
    {
      title: "Executive Compensation & Compensation Models",
      icon: DollarSign,
      items: [
        {
          question: "Are fractional CFOs worth it?",
          answer: "Yes, fractional CFOs are highly worth it for startups and growing mid-sized businesses that require high-tier strategic financial leadership (e.g., fundraising, cash flow modeling, exit strategy) but cannot justify or afford the $200k–$400k annual loaded cost of a full-time CFO. They offer senior-level expertise on a part-time basis, typically saving 60% to 80% in total loaded overhead costs."
        },
        {
          question: "What does a fractional executive do?",
          answer: "A fractional executive serves as a part-time C-suite director (CFO, CMO, COO, CTO, or CEO) for multiple companies simultaneously. They lead high-level strategy, direct and mentor existing internal teams, optimize operational workflows, implement scaling frameworks, and provide expert advisory without the long-term operational commitment and high financial cost of a permanent full-time hire."
        },
        {
          question: "What is the hourly rate for a fractional CFO?",
          answer: "Fractional CFO hourly rates generally range between $150 and $350 per hour, depending on their experience, industry specialization, and the complexity of the company’s capital structure. However, monthly retainer agreements are more common than simple hourly logs, which guarantees the executive's ongoing commitment and accessibility."
        },
        {
          question: "Do fractional executives get benefits?",
          answer: "No. Because fractional executives act as independent 1099 contractors, they do not receive traditional corporate employee benefits such as healthcare, retirement matching, paid time off, or payroll tax withholding burdens. This makes hiring them highly capital-efficient and flexible for growing companies."
        },
        {
          question: "Do I need a CPA to be a fractional CFO?",
          answer: "Not strictly. While a CPA (Certified Public Accountant) designation adds immediate credibility for tax planning, auditing, and corporate bookkeeping, a fractional CFO's core value lies in high-level financial strategy, raising capital, robust business forecasting, cash management, and commercial scaling. Deep operational leadership experience is typically valued over a CPA license."
        }
      ]
    },
    {
      title: "Fractional Executive Cost & ROI Details",
      icon: Wallet,
      items: [
        {
          question: "How much does a fractional CEO cost?",
          answer: "A fractional CEO typically costs between $5,000 and $15,000 per month on retainer. This depends heavily on the agreed weekly hours (usually 10 to 20 hours/week), the complexity of company operations, and whether they are guiding the team through specialized corporate milestones like an acquisition or restructuring."
        },
        {
          question: "Is a fractional CFO cheaper than a full-time CFO?",
          answer: "Yes, significantly. A full-time experienced CFO typically commands a base of $180,000+ per year, plus recruitment premiums, equity incentives, health insurance, bonuses, and social taxes (resulting in a loaded cost exceeding $250,000/yr). A fractional CFO working part-time typically costs between $40,000 and $80,000 annually, leading to 60% to 75% cash savings."
        },
        {
          question: "What is a fractional CEO salary?",
          answer: "Since fractional CEOs are self-employed contractors rather than traditional employees, they do not earn a basic 'salary' from a single employer. Instead, they work across a portfolio of clients. On an annualized basis, fractional CEOs often earn between $120,000 and $220,000, occasionally supplemented by minor equity incentives."
        },
        {
          question: "Is fractional work worth it?",
          answer: "Absolutely. For businesses, it provides immediate access to world-class executive talent under flexible terms. For the executives themselves, it offers higher potential income across multiple parallel client portfolios, schedule control, and a highly diversified professional career."
        },
        {
          question: "How much does CEO of Wounded Warriors make?",
          answer: "Based on recent public filings and Form 990 disclosures, the CEO of the Wounded Warrior Project earns an annual compensation package ranging from $300,000 to $400,000, which aligns with major international non-profit standard evaluation metrics."
        },
        {
          question: "What is the 6 month executive coaching package?",
          answer: "A 6-month executive coaching package is a structured mentorship engagement designed to accelerate leadership development for founders, corporate managers, or newly promoted C-suite leaders. Typically ranging from $5,000 to $25,000 total, it features one-on-one reviews, 360-degree feedback, and targeted performance frameworks."
        }
      ]
    },
    {
      title: "Fractional CMO Placement & Budgets",
      icon: FileText,
      items: [
        {
          question: "How much should I charge as a fractional CMO?",
          answer: "As a fractional CMO, you should charge between $4,000 and $10,000 per month per client, based on your track record, industry niches, and required weekly engagement hours. An hourly baseline equivalent of $150 to $300 is standard when configuring these advisory packages."
        },
        {
          question: "How much does a fractional CMO make per hour?",
          answer: "On an hourly breakdown, fractional CMOs command $150 to $300+ per hour. Retainer metrics are always preferred over hourly time sheets to keep discussions focused on high-level growth outcomes rather than transactional minutiae."
        },
        {
          question: "Is a fractional CMO a good fit for a small business?",
          answer: "Yes, especially for small businesses that have hit a growth plateau or have standard marketing budgets but lack strategic direction. A fractional CMO ensures campaigns are designed around clear key metrics (CAC, LTV, ROAS) and customer acquisition channels, preventing wasted advertising spend before hiring expensive full-time teams."
        },
        {
          question: "How many hours does a fractional CMO work?",
          answer: "Typically, a fractional CMO works about 10 to 20 hours per week per client. This is divided into strategic planning, executive meetings, team direction, performance reviews, and campaign oversight."
        },
        {
          question: "What is a fractional CMO salary?",
          answer: "On an annualized basis when managing 3 to 4 active clients, an experienced fractional CMO can earn between $150,000 and $250,500. Under traditional single-employer full-time conditions, a comparable salary would be $140,000 to $210,000."
        },
        {
          question: "What is the 3 3 3 rule in marketing?",
          answer: "The '3-3-3' rule in marketing is a key cognitive framework for product positioning and messaging:\n1. 3 Seconds: Grab the prospect's attention with a compelling value proposition.\n2. 3 Minutes: Provide clear evidence for the prospect to understand exact service benefits and utility models.\n3. 3 Hours/Days: Deliver ongoing engagement (via remarketing, nurturing emails, or direct follow-ups) to close the transaction loop."
        }
      ]
    },
    {
      title: "Fractional CFO Needs & Risk Profiling",
      icon: Wallet,
      items: [
        {
          question: "Is a fractional CFO worth it?",
          answer: "Absolutely. A fractional CFO helps structure fundraising rounds, prepare accurate financial projections, optimize cash burn, manage tax filings, and prepare standard compliance layouts—giving the business enterprise-level financial guardrails for a fraction of full-time capital requirements."
        },
        {
          question: "How much does a CFO make for a $100 m company?",
          answer: "For a company reaching $100 million in annual revenues, a full-time CFO typically commands a base salary between $350,000 and $550,000, plus significant performance bonuses (30-50% of base), stock options, and loaded benefits, amounting to a total annual compensation package exceeding $750,000 to $1,200,000."
        },
        {
          question: "What is the hourly rate for a CFO?",
          answer: "A senior financial consultant acting as a CFO typically charges $200 to $450 per hour for high-complexity corporate advisory, capital raising, Mergers & Acquisitions (M&A) structuring, or restructuring initiatives."
        },
        {
          question: "What are the risks of hiring a fractional CFO?",
          answer: "Key risks include:\n• Split attention: They manage multiple clients simultaneously, meaning they may not be available for sudden, on-demand emergencies.\n• Integration friction: They operate as outside partners and may take longer to adapt to internal company culture.\n• Information gaps: They rely heavily on the accuracy of internal bookkeeping; poor baseline bookkeeping will lead to flawed strategic advice."
        },
        {
          question: "How much does a CFO make for a $100 m company?",
          answer: "For an enterprise at $100 million ARR, the CFO is responsible for public-ready disclosures or major lines of credit. Their total equity + cash packages can reach over $1,000,000 per year, which is why early-stage and growth firms utilize fractional, part-time setups to conserve equity and maintain cash flexibility."
        }
      ]
    }
  ];

  const toggleOpen = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="mt-12 bg-white border border-gray-200 rounded-3xl p-6 sm:p-8 shadow-[0_4px_24px_rgba(0,0,0,0.015)] space-y-8" id="fractional-cost-modeler-faqs">
      {/* FAQ Header */}
      <div className="space-y-2">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full border text-[10px] font-bold uppercase tracking-wider bg-blue-50 text-blue-700 border-blue-200/50">
          <HelpCircle className="w-3.5 h-3.5 text-blue-600" />
          Interactive Knowledge Hub
        </div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-950 tracking-tight">
          Fractional Executive Cost Model — F.A.Q.
        </h2>
        <p className="text-sm text-gray-650 leading-relaxed max-w-2xl">
          Get answers to critical pricing, role responsibilities, benefits, and market expectations. Grouped interactively based on the Fractional Mind Map model.
        </p>
      </div>

      {/* Segment Category Switcher Tabs */}
      <div className="flex flex-col sm:flex-row gap-2 border-b border-gray-150 pb-3 overflow-x-auto scrollbar-none">
        {faqCategories.map((cat, idx) => {
          const CatIcon = cat.icon;
          const isActive = activeCategory === idx;
          return (
            <button
              key={idx}
              onClick={() => {
                setActiveCategory(idx);
                setOpenIndex(0); // Reset accordion to first item
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all border select-none cursor-pointer ${
                isActive
                  ? "bg-blue-600 border-blue-600 text-white shadow-xs"
                  : "bg-gray-50/50 border-gray-250 text-gray-600 hover:text-gray-900 hover:bg-gray-150"
              }`}
            >
              <CatIcon className="w-4 h-4 shrink-0" />
              <span>{cat.title}</span>
            </button>
          );
        })}
      </div>

      {/* Accordion List for the Selected Category */}
      <div className="space-y-3.5">
        {faqCategories[activeCategory].items.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div
              key={index}
              className={`border rounded-2xl transition-all duration-300 ${
                isOpen 
                  ? "border-blue-600 bg-blue-50/5 shadow-[0_4px_12px_rgba(59,130,246,0.02)]" 
                  : "border-gray-200 hover:border-gray-305 bg-white"
              }`}
            >
              <button
                onClick={() => toggleOpen(index)}
                className="w-full flex items-center justify-between gap-4 p-5 text-left select-none cursor-pointer"
              >
                <span className="font-extrabold text-sm sm:text-base text-gray-950 flex items-start gap-2 leading-snug">
                  <span className={`w-1.5 h-1.5 rounded-full mt-2 shrink-0 ${isOpen ? "bg-blue-600" : "bg-gray-400"}`} />
                  {item.question}
                </span>
                <span className={`p-1 rounded-full ${isOpen ? "bg-blue-100 text-blue-700" : "bg-gray-50 text-gray-500"}`}>
                  {isOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </span>
              </button>

              {isOpen && (
                <div className="px-5 pb-5 pt-0 border-t border-dashed border-gray-150 text-xs sm:text-sm text-gray-700 leading-relaxed space-y-2 whitespace-pre-line animate-[fadeIn_0.3s_ease]">
                  {item.answer}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Proactive Help Infocard */}
      <div className="p-4 rounded-2xl bg-gray-50 border border-gray-150 flex gap-3.5 text-xs text-gray-600 leading-normal">
        <ArrowRight className="w-4.5 h-4.5 text-blue-600 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <span className="font-bold text-gray-800">Dynamic Decision Matrix Integration</span>
          <p>
            Looking to run calculations? Use the **Modifier Parameters** inputs above to simulate your specific executive base, benefit packages, corporate tax burdens, and fractional retainers to find the exact ROI break-even point for your business.
          </p>
        </div>
      </div>
    </div>
  );
}
