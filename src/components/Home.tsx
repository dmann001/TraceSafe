import React from 'react';
import { Camera } from 'lucide-react';

interface HomeProps {
  onScanClick: () => void;
}

const Home: React.FC<HomeProps> = ({ onScanClick }) => {
  return (
    <div className="text-center max-w-3xl mx-auto">
      <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
        Trace Your Food with Confidence
      </h2>
      <p className="text-xl text-black mb-12">
        Scan a QR code to see your food's journey from farm to table
      </p>
      <button
        onClick={onScanClick}
        className="bg-black text-white px-8 py-4 rounded-lg flex items-center justify-center mx-auto space-x-2 hover:bg-gray-900 transition-colors"
      >
        <Camera className="h-5 w-5" />
        <span>Scan QR Code</span>
      </button>
    </div>
  );
};

export default Home; 