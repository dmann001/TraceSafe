import React, { useState } from 'react';
import { FaTimes, FaChevronLeft, FaChevronRight } from 'react-icons/fa';

interface BlockchainModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const steps = [
  {
    title: "What is Blockchain?",
    content: "Blockchain is a digital ledger that records transactions in a secure, transparent, and immutable way. Each block contains transaction data and is linked to previous blocks, creating a chain of information that cannot be altered."
  },
  {
    title: "Why Blockchain for Food?",
    content: "Blockchain technology provides an ideal solution for food traceability by ensuring data integrity, transparency, and real-time tracking. It helps prevent food fraud, improves safety, and builds consumer trust."
  },
  {
    title: "How TraceSafe Works",
    content: "TraceSafe creates a digital passport for each food product, recording every step of its journey on the blockchain. From farm to table, each transaction is verified and stored, creating an unbreakable chain of custody."
  },
  {
    title: "Benefits & Impact",
    content: "Our blockchain solution provides enhanced food safety, improved supply chain efficiency, reduced waste, and increased transparency. It empowers consumers to make informed choices and helps prevent foodborne illnesses."
  }
];

const BlockchainModal: React.FC<BlockchainModalProps> = ({ isOpen, onClose }) => {
  const [currentStep, setCurrentStep] = useState(0);

  if (!isOpen) return null;

  const nextStep = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg max-w-2xl w-full mx-4 p-6 relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          <FaTimes size={24} />
        </button>

        {/* Progress Indicators */}
        <div className="flex justify-between mb-8">
          {steps.map((_, index) => (
            <div
              key={index}
              className={`flex-1 h-1 mx-1 rounded-full ${
                index <= currentStep ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
            />
          ))}
        </div>

        {/* Content */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold mb-4">{steps[currentStep].title}</h2>
          <p className="text-gray-600">{steps[currentStep].content}</p>
        </div>

        {/* Navigation */}
        <div className="flex justify-between items-center">
          <button
            onClick={prevStep}
            disabled={currentStep === 0}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              currentStep === 0
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            <FaChevronLeft />
            Previous
          </button>

          <span className="text-gray-500">
            Step {currentStep + 1} of {steps.length}
          </span>

          <button
            onClick={nextStep}
            disabled={currentStep === steps.length - 1}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg ${
              currentStep === steps.length - 1
                ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                : 'bg-indigo-600 text-white hover:bg-indigo-700'
            }`}
          >
            Next
            <FaChevronRight />
          </button>
        </div>
      </div>
    </div>
  );
};

export default BlockchainModal; 