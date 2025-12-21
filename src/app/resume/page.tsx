'use client'

import { Download, ArrowLeft, Printer } from 'lucide-react';

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
    <div className="relative min-h-screen bg-gray-100 print:bg-white">
      
      {/* --- Floating Actions (Hidden in Print) --- */}
      
      {/* Back Button */}
      <a 
        href="/" 
        className="fixed top-6 left-6 z-50 group flex items-center gap-2 print:hidden"
      >
        <div className="bg-white p-3 rounded-full shadow-md border border-gray-300 text-gray-700 hover:bg-gray-50 transition-all">
          <ArrowLeft className="w-5 h-5" />
        </div>
      </a>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        className="fixed bottom-8 right-8 z-50 group print:hidden"
      >
        <div className="flex items-center justify-center w-14 h-14 bg-black text-white rounded-full shadow-lg hover:bg-gray-800 hover:scale-105 transition-all">
          <Download className="w-6 h-6" />
        </div>
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-black text-white text-xs px-2 py-1 rounded transition-opacity whitespace-nowrap">
          Download PDF
        </span>
      </button>

      {/* Print Button */}
      <button
        onClick={handlePrint}
        className="fixed bottom-8 right-24 z-50 group print:hidden"
      >
        <div className="flex items-center justify-center w-14 h-14 bg-white text-black border border-gray-300 rounded-full shadow-lg hover:bg-gray-50 hover:scale-105 transition-all">
          <Printer className="w-6 h-6" />
        </div>
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 bg-black text-white text-xs px-2 py-1 rounded transition-opacity whitespace-nowrap">
          Print
        </span>
      </button>

      {/* --- Resume Document Content --- */}
      <div className="py-10 px-4 print:p-0">
        <div className="max-w-[210mm] mx-auto bg-white shadow-xl print:shadow-none p-10 md:p-12 text-black leading-normal font-sans">
          
          {/* Header */}
          <header className="text-center mb-8">
            <h1 className="text-3xl font-bold uppercase tracking-wide mb-2">Vikram Kumar</h1>
            <div className="text-sm space-y-1">
              <p>Mob.: +357-96346120 | E-Mail: vikram1840@gmail.com</p>
              <p>
                <a href="https://linkedin.com/in/vikram1840" className="underline hover:no-underline">LinkedIn</a> | 
                <a href="https://github.com/vikram1840" className="underline hover:no-underline ml-1">GitHub</a> | 
                Limassol, Cyprus
              </p>
            </div>
          </header>

          {/* Professional Summary */}
          <section className="mb-6">
            <h2 className="font-bold uppercase text-sm pb-2">Professional Summary</h2>
            
            <p className="text-sm text-justify">
              Business-driven Senior Data Analyst with 15 years of experience and expertise in influencing C-level strategy through data. Skilled in defining key metrics, performing deep-dive analysis, and providing recommendations to enhance customer experience and drive business growth. Expert in SQL, Python (Pandas, NumPy) and statistical methods to solve complex business problems.
            </p>
          </section>

          {/* Key Achievements */}
          <section className="mb-6">
            <h2 className="font-bold uppercase text-sm pb-2">Key Achievements</h2>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>Increased daily order volume by 10-12% through high demand zone optimization.</li>
              <li>Reduced order cancellation by 8-10% with root-cause dataset design.</li>
              <li>Improved CSAT by 6% and reduced Ops cost by 10% through call center performance optimization.</li>
              <li>Accelerated ad-hoc analysis by 40-50% through LLM-assisted analytics and insight generation.</li>
              <li>Cut report generation time by 30% using SQL query optimization and job scheduling improvements.</li>
            </ul>
          </section>

          {/* Core Strengths */}
          <section className="mb-6">
            <h2 className="font-bold uppercase text-sm pb-2">Core Strengths</h2>
            <div className="text-sm space-y-2">
              <div className="grid grid-cols-[160px_1fr] gap-2">
                <span className="font-bold">Leadership:</span>
                <span>Collaboration with Operation, Finance, Marketing & Sales, C-level Presentations, Team Mentoring</span>
              </div>
              <div className="grid grid-cols-[160px_1fr] gap-2">
                <span className="font-bold">Analytics:</span>
                <span>KPI Design, A/B Testing, Hypothesis Testing, Regression Analysis</span>
              </div>
              <div className="grid grid-cols-[160px_1fr] gap-2">
                <span className="font-bold">Domain Strategy:</span>
                <span>Subscription & Loyalty, Orders, Merchant, Call Centre, Operational Optimization</span>
              </div>
              <div className="grid grid-cols-[160px_1fr] gap-2">
                <span className="font-bold">Data Quality:</span>
                <span>Source Reconciliations, dbt tests (not-null, unique, recency), daily anomaly checks</span>
              </div>
              <div className="grid grid-cols-[160px_1fr] gap-2">
                <span className="font-bold">Data Capabilities:</span>
                <span>Daily & Real-time Dashboards, Data Mart & Transformation (DBT)</span>
              </div>
              <div className="grid grid-cols-[160px_1fr] gap-2">
                <span className="font-bold">BI Tools:</span>
                <span>SQL (Redshift, PostgreSQL, Clickhouse), Python (Pandas, NumPy), Tableau, Superset, Excel</span>
              </div>
              <div className="grid grid-cols-[160px_1fr] gap-2">
                <span className="font-bold">AI & Automation:</span>
                <span>Reporting Automation, LLM-based Insight Generation, Ad-hoc Query Intelligence</span>
              </div>
            </div>
          </section>

          {/* Professional Experience */}
          <section className="mb-6">
            <h2 className="font-bold uppercase text-sm pb-2">Professional Experience</h2>

            {/* Role 1 */}
            <div className="mb-5">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-sm">ARAM MEEM Ltd (ToYou Delivery Platform) – Senior Data Analyst</h3>
                <span className="text-sm italic">Sept 2021 – Present</span>
              </div>
              <p className="text-xs mb-2 italic">Limassol, Cyprus</p>
              <ul className="list-disc pl-5 text-sm space-y-1 text-justify">
                <li>Designed and analyzed A/B tests on subscription and promo strategies, using RFM-based segmentation to tailor offers and measure impact on contribution margin and order volume.</li>
                <li>Defined and executed BI Strategy converting ad-hoc asks into portfolio of self-service dashboards and data marts used daily by finance, operation and management team.</li>
                <li>Introduced Clickhouse and Superset in BI for real-time monitoring backbone and delivered 10+ interactive real-time dashboards used daily by 100+ operations and CX user.</li>
                <li>Mentored junior analysts on SQL, dashboards and metric definitions, reviewing their queries and helping standardized logic across reports.</li>
                <li>Uncovered Call Center inefficiencies (SQL, Python, Tableau) - agent performance gaps, load issues, lower shift utilization led to staffing optimization and 6% CSAT improvement.</li>
                <li>Conducted churn and retention analysis identifying high-impact segments - prioritizing fixes that reduced churn and improved customer retention by 10-12%.</li>
                <li>Designed a complex cancellation reason dataset (SQL) with ownership mapping, reduced cancellation by 10%, improved customer experience and streamlined merchant compensation flows.</li>
                <li>Identified and resolved configuration barriers that boosted daily order volume by 10-12% without additional marketing spend.</li>
                <li>Integrated LLMs (ChatGPT, Gemini) into analytics workflow for insight generation, debugging SQL/Python logic, and reduced ad-hoc turnaround time by 30-40%.</li>
              </ul>
            </div>

            {/* Role 2 */}
            <div className="mb-5">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className="font-bold text-sm">Amdocs Ltd – Senior BI Developer</h3>
                <span className="text-sm italic">Jan 2015 – Aug 2021</span>
              </div>
              <p className="text-xs mb-2 italic">Limassol, Cyprus (2017-2021) | Gurgaon, India (2015-2017)</p>
              <ul className="list-disc pl-5 text-sm space-y-1 text-justify">
                <li>Led a team of 10 BI analysts and migrated 250+ enterprise reports to cloud infrastructure, improved speed, scalability and governance.</li>
                <li>Educated business users through Power BI training on self-service reporting, DAX usage, filters and effective visualization to maximize reporting value.</li>
                <li>Developed in-house automation tools, saved man hours and enabled additional projects without extra headcounts.</li>
                <li>Applied exploratory data analysis (EDA) on telecom network KPIs, doubling user throughput and reducing drop rate from 1% to 0.6%.</li>
              </ul>
            </div>

            {/* Role 3 */}
            <div className="mb-2">
              <div className="flex justify-between items-baseline">
                <h3 className="font-bold text-sm">Earlier Experience – Telecom | Network Analytics</h3>
                <span className="text-sm italic">Sept 2010 – Jan 2015</span>
              </div>
              <p className="text-xs italic">Bangalore, India</p>
            </div>
          </section>

          {/* Certification & Awards */}
          <section className="mb-6">
            <h2 className="font-bold uppercase text-sm pb-2">Certification & Award</h2>
            <ul className="list-disc pl-5 text-sm space-y-1">
              <li>Microsoft Certified Power BI Analyst | DBT Certified</li>
              <li>Awarded by Amdocs and Nokia for innovation in delivery and automation</li>
              <li>Workshop leader to promote rapid prototyping and enhance work culture across Amdocs Cyprus</li>
            </ul>
          </section>

          {/* Education */}
          <section>
            <h2 className="font-bold uppercase text-sm pb-2">Education</h2>
            <div className="mb-2">
              <div className="flex justify-between text-sm">
                <span className="font-bold">Master's degree (EPGDBM) - Business Statistics</span>
                <span>2016-2018</span>
              </div>
              <div className="text-sm">Symbiosis International University, Pune (India)</div>
            </div>
            <div>
              <div className="flex justify-between text-sm">
                <span className="font-bold">Bachelor's degree (B-Tech): Electronics & Telecom</span>
                <span>2006-2010</span>
              </div>
              <div className="text-sm">Kalinga Institute of Industrial Technology, Bhubaneswar (India)</div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}