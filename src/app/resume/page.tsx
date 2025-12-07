'use client'

import { Download, ArrowLeft, Printer, Mail, Linkedin, Github } from 'lucide-react';
import Link from 'next/link';

export default function ResumePreviewPage() {
  const RESUME_PATH = '/Vikram_Kumar_Resume.pdf';
  
  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    const link = document.createElement('a');
    link.href = RESUME_PATH;
    link.download = 'Vikram_Kumar_Resume.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="relative min-h-screen bg-gray-50 print:bg-white">
      {/* Back Button */}
      <Link 
        href="/" 
        className="fixed top-6 left-6 z-50 group flex items-center gap-2 print:hidden"
      >
        <div className="bg-white/90 backdrop-blur-md p-3 rounded-full shadow-lg border border-gray-200 text-gray-700 group-hover:text-black group-hover:scale-110 transition-all duration-300">
          <ArrowLeft className="w-6 h-6" />
        </div>
        <span className="opacity-0 group-hover:opacity-100 bg-black/80 text-white text-xs px-3 py-1.5 rounded-md backdrop-blur-sm transition-opacity duration-300 pointer-events-none">
          Back to Home
        </span>
      </Link>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="fixed bottom-8 right-8 z-50 group print:hidden"
      >
        <div className="flex items-center justify-center w-14 h-14 bg-blue-600 text-white rounded-full shadow-2xl hover:bg-blue-700 hover:scale-110 hover:shadow-blue-600/40 transition-all duration-300">
          <Download className="w-6 h-6" />
        </div>
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-black/80 text-white text-xs px-3 py-1.5 rounded-md backdrop-blur-sm transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          Download PDF
        </span>
      </button>

      {/* Print Button */}
      <button
        onClick={handlePrint}
        className="fixed bottom-8 right-24 z-50 group print:hidden"
      >
        <div className="flex items-center justify-center w-14 h-14 bg-gray-600 text-white rounded-full shadow-2xl hover:bg-gray-700 hover:scale-110 hover:shadow-gray-600/40 transition-all duration-300">
          <Printer className="w-6 h-6" />
        </div>
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-black/80 text-white text-xs px-3 py-1.5 rounded-md backdrop-blur-sm transition-opacity duration-300 pointer-events-none whitespace-nowrap">
          Print Resume
        </span>
      </button>

      {/* Resume Content */}
      <div className="container mx-auto px-4 py-8 print:py-0">
        <div className="max-w-4xl mx-auto">
          {/* Resume Container */}
          <div className="bg-white shadow-2xl rounded-lg overflow-hidden border border-gray-200 print:shadow-none print:border-0">
            
            {/* Header */}
            <div className="bg-gradient-to-r from-blue-900 to-indigo-900 text-white p-8 print:p-6">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between">
                <div>
                  <h1 className="text-3xl md:text-4xl font-bold mb-2">Vikram Kumar</h1>
                  <div className="text-blue-200 mb-4">
                    <p className="text-lg">Senior Data Analyst | Business Intelligence</p>
                  </div>
                </div>
                <div className="mt-4 md:mt-0 md:text-right">
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <span>📱</span>
                      <span>+357-96346120</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📧</span>
                      <a href="mailto:vikram1840@gmail.com" className="hover:text-blue-300">
                        vikram1840@gmail.com
                      </a>
                    </div>
                    <div className="flex items-center gap-2">
                      <span>📍</span>
                      <span>Limassol, Cyprus</span>
                    </div>
                  </div>
                  <div className="flex gap-3 mt-4">
                    <a 
                      href="https://www.linkedin.com/in/vikram1840/" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-200 hover:text-white"
                    >
                      <Linkedin className="w-4 h-4" />
                      <span className="text-xs">LinkedIn</span>
                    </a>
                    <a 
                      href="https://github.com/vikram1840" 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-blue-200 hover:text-white"
                    >
                      <Github className="w-4 h-4" />
                      <span className="text-xs">GitHub</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Main Content */}
            <div className="p-8 print:p-6">
              {/* Professional Summary */}
              <section className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
                  Professional Summary
                </h2>
                <p className="text-gray-700 leading-relaxed">
                  <strong className="text-gray-900">Business-driven Senior Data Analyst with 15 years of experience</strong> and expertise in influencing C-level strategy through data. Skilled in defining key metrics, performing deep-dive analysis, and providing recommendation to enhance customer experience and drive business growth. Expert in <strong>SQL, Python (Pandas, NumPy)</strong> and statistical methods to solve complex business problems.
                </p>
              </section>

              {/* Key Achievements */}
              <section className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
                  Key Achievements
                </h2>
                <ul className="space-y-3">
                  {[
                    "Increased daily order volume by 10-12% through high demand zone optimization",
                    "Reduced order cancellation by 8-10% with root-cause dataset design",
                    "Improved CSAT by 6% and reduced Ops cost by 10% through call center performance optimization",
                    "Accelerated ad-hoc analysis by 40-50% through LLM-assisted analytics and insight generation",
                    "Cut report generation time by 30% using SQL query optimization and job scheduling improvements"
                  ].map((achievement, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-blue-600 mr-2">✓</span>
                      <span className="text-gray-700">{achievement}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Core Strengths */}
              <section className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
                  Core Strengths
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {[
                    {
                      category: "Leadership",
                      items: ["Collaboration with Operation, Finance, Marketing & Sales", "C-level Presentations", "Team Mentoring"]
                    },
                    {
                      category: "Analytics & Statistical Insights",
                      items: ["KPI Design", "A/B Testing", "Hypothesis Testing", "Regression Analysis"]
                    },
                    {
                      category: "Domain Ownership & Strategy",
                      items: ["Subscription & Loyalty", "Orders, Merchant, Call Centre", "Operational Optimization"]
                    },
                    {
                      category: "Data Quality",
                      items: ["Source Reconciliations", "dbt tests (not-null, unique, recency, accepted values)", "Daily anomaly checks"]
                    },
                    {
                      category: "Data Capabilities",
                      items: ["Daily & Real-time Dashboards", "Data Mart & Transformation (DBT)"]
                    },
                    {
                      category: "BI Tools",
                      items: ["SQL (Redshift, PostgreSQL, Clickhouse)", "Python (Pandas, NumPy)", "Tableau, Superset", "Excel (Advanced)"]
                    },
                    {
                      category: "AI & Automation",
                      items: ["Reporting Automation", "LLM-based Insight Generation", "Ad-hoc Query Intelligence"]
                    }
                  ].map((strength, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">{strength.category}</h3>
                      <ul className="space-y-1">
                        {strength.items.map((item, idx) => (
                          <li key={idx} className="text-sm text-gray-700 flex items-start">
                            <span className="text-gray-400 mr-2">•</span>
                            {item}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </section>

              {/* Professional Experience */}
              <section className="mb-8">
                <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
                  Professional Experience
                </h2>
                
                {/* Current Role */}
                <div className="mb-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">ARAM MEEM Ltd (ToYou Delivery Platform) – Senior Data Analyst</h3>
                      <p className="text-blue-600 font-medium">Limassol, Cyprus | Sept 2021 – Present</p>
                    </div>
                  </div>
                  <ul className="space-y-2 ml-4">
                    {[
                      "Designed and analyzed A/B tests on subscription and promo strategies, using RFM-based segmentation to tailor offers and measure impact on contribution margin and order volume in the tested groups.",
                      "Defined and executed BI Strategy converting ad-hoc asks into portfolio of self-service dashboards and data charts used daily by finance, operation and management team.",
                      "Introduced Clickhouse and Superset in BI for real-time monitoring backbone and delivered 10+ interactive real-time dashboards (SQL, Tableau, Superset) - used daily by 100+ operations and CX users for 24/7 KPI monitoring and performance optimization, reducing issue resolution time by 40%.",
                      "Mentored junior analysts on SQL, dashboards and metric definitions, reviewing their queries and helping standardized logic across reports. Helping to foster a data driven culture and improving team performance.",
                      "Uncovered Call Center inefficiencies (SQL, Python, Tableau) – agent performance gaps, load issues, lower shift utilization led to staffing optimization and 6% CSAT improvement.",
                      "Conducted churn and retention analysis identifying high-impact segments – prioritizing fixes that reduced churn and improved customer retention by 10-12%.",
                      "Designed a complex cancellation reason dataset (SQL) with ownership mapping, reduced cancellation by 10%, improved customer experience and streamlined merchant compensation flows.",
                      "Identified and resolved configuration barriers that boosted daily order volume by 10–12% without additional marketing spend.",
                      "Integrated LLMs (ChatGPT, Gemini) into analytics workflow to insight generation, debug SQL/Python logic, generate hypotheses and reduced ad-hoc turnaround time by 30–40%."
                    ].map((item, index) => (
                      <li key={index} className="text-gray-700 flex">
                        <span className="text-blue-600 mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Previous Role */}
                <div className="mb-6">
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between mb-3">
                    <div>
                      <h3 className="text-lg font-bold text-gray-900">Amdocs Ltd – Senior BI Developer</h3>
                      <p className="text-blue-600 font-medium">
                        Limassol, Cyprus | Dec 2017 – Aug 2021<br />
                        Gurgaon, India | Jan 2015 – Dec 2017
                      </p>
                    </div>
                  </div>
                  <ul className="space-y-2 ml-4">
                    {[
                      "Led a team of 10 BI analysts and migrated 250+ enterprise reports to cloud infrastructure improved speed, scalability and governance.",
                      "Educated business users through Power BI training on self-service reporting, DAX usage, filters and effective visualization to maximize reporting value.",
                      "Developed in-house automation tools, saved man hours and enabled additional projects without extra headcounts.",
                      "Applied exploratory data analysis (EDA) on telecom network KPIs, doubling user throughput and reducing drop rate from 1% to 0.6%."
                    ].map((item, index) => (
                      <li key={index} className="text-gray-700 flex">
                        <span className="text-blue-600 mr-2">•</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Earlier Experience */}
                <div className="mb-6">
                  <h3 className="text-lg font-bold text-gray-900">Earlier Experience – Telecom | Network Analytics</h3>
                  <p className="text-blue-600 font-medium">Bangalore, India | Sept 2010 – Jan 2015</p>
                </div>
              </section>

              {/* Two Column Layout for Bottom Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Certification & Award */}
                <section>
                  <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
                    Certification & Award
                  </h2>
                  <ul className="space-y-3">
                    {[
                      "Microsoft Certified Power BI Analyst | DBT Certified",
                      "Awarded by Amdocs and Nokia for innovation in delivery and automation",
                      "Workshop leader to promote rapid prototyping and enhance work culture across Amdocs Cyprus"
                    ].map((cert, index) => (
                      <li key={index} className="text-gray-700 flex items-start">
                        <span className="text-blue-600 mr-2">🏆</span>
                        <span>{cert}</span>
                      </li>
                    ))}
                  </ul>
                </section>

                {/* Education */}
                <section>
                  <h2 className="text-xl font-bold text-gray-800 mb-4 border-b-2 border-blue-600 pb-2">
                    Education
                  </h2>
                  <div className="space-y-4">
                    <div>
                      <h3 className="font-semibold text-gray-900">Master's degree (EPGDBM) - Business Statistics</h3>
                      <p className="text-gray-600">Symbiosis International University, Pune (India)</p>
                      <p className="text-sm text-gray-500">2016-2018</p>
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-900">Bachelor's degree (B-Tech): Electronics & Telecom</h3>
                      <p className="text-gray-600">Kalinga Institute of Industrial Technology, Bhubaneswar (India)</p>
                      <p className="text-sm text-gray-500">2006-2010</p>
                    </div>
                  </div>
                </section>
              </div>

              {/* Footer Note */}
              <div className="mt-12 pt-6 border-t border-gray-200 text-center text-gray-500 text-sm">
                <p>References available upon request • Updated: {new Date().toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Print Styles */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
          }
          .print\\:hidden {
            display: none !important;
          }
          .shadow-2xl {
            box-shadow: none !important;
          }
          .border {
            border-color: #e5e7eb !important;
          }
          .bg-gradient-to-r {
            background: #1e3a8a !important;
          }
          .text-white {
            color: white !important;
          }
          .text-blue-200 {
            color: white !important;
          }
          a {
            color: inherit !important;
            text-decoration: none !important;
          }
          .rounded-lg {
            border-radius: 0 !important;
          }
          .shadow-lg {
            box-shadow: none !important;
          }
        }
      `}</style>
    </div>
  );
}