import React from 'react';

const HowItWorks: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold text-black mb-6">How It Works</h2>
      <p className="text-lg text-gray-700 mb-8">
        TraceSafe makes food traceability simple and trustworthy. Here's how it works:
      </p>
      
      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-black mb-3">Farm to Table on Blockchain</h3>
          <p className="text-gray-600">Every step of your food's journey—from the farm where it's grown to the store where you buy it—is recorded on the blockchain. This keeps the data secure, tamper-proof, and transparent.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-black mb-3">Scan the QR Code</h3>
          <p className="text-gray-600">Each product comes with a unique QR code. Just scan it with your phone to see the full supply chain history instantly.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-black mb-3">See the Journey</h3>
          <p className="text-gray-600">Our app shows you a clear, visual breakdown of every stage:</p>
          <ul className="list-disc list-inside mt-2 text-gray-600">
            <li>Farm: Where and when it was planted</li>
            <li>Processing: How it was handled</li>
            <li>Quality: Certifications and inspections</li>
            <li>Packaging: Eco-friendly materials used</li>
            <li>Retail: When it hit the shelves</li>
          </ul>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-black mb-3">Trust the Data</h3>
          <p className="text-gray-600">Blockchain ensures every entry is verified and unchangeable. No fakes, no alterations—just the truth.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-black mb-3">Stay Informed</h3>
          <p className="text-gray-600">Get real-time updates—like recalls or new certifications—so you're always in the loop.</p>
        </div>

        <p className="text-lg font-semibold text-black mt-8">
          With TraceSafe, you're not just buying food—you're buying peace of mind.
        </p>
      </div>
    </div>
  );
};

export default HowItWorks; 