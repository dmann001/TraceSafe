import React from 'react';

const AboutUs: React.FC = () => {
  return (
    <div className="max-w-3xl mx-auto space-y-8">
      <h2 className="text-3xl font-bold text-black mb-6">About Us</h2>
      <p className="text-lg text-gray-700 mb-8">
        At TraceSafe, we're here to rebuild trust in the food supply chain. Food fraud and safety risks cost billions and threaten lives. We think you deserve to know where your food comes from—and businesses deserve a way to prove they're legit.
      </p>

      <div className="space-y-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-black mb-3">Our Vision</h3>
          <p className="text-gray-600">We're creating a world where every bite is traceable, transparent, and trustworthy. Using blockchain, we build an unbreakable link from farm to fork.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-black mb-3">Our Team</h3>
          <p className="text-gray-600">We're a crew of innovators, engineers, and food safety champions tackling one of the industry's biggest challenges. With know-how in blockchain, supply chains, and consumer tech, we're making food transparency easy for all.</p>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-xl font-bold text-black mb-3">Why We Do It</h3>
          <p className="text-gray-600">Trust shouldn't be a luxury. Whether you're feeding your family or protecting your brand, TraceSafe gives you the facts.</p>
        </div>

        <p className="text-lg font-semibold text-black mt-8">
          Join us in making food safer, one scan at a time.
        </p>
      </div>
    </div>
  );
};

export default AboutUs; 