import React, { useState, useEffect, useRef } from 'react';
import { FaInfoCircle, FaShieldAlt, FaChevronDown, FaSeedling, FaIndustry, FaTruck, FaStore, FaUserCheck } from 'react-icons/fa';
import BlockchainModal from './BlockchainModal';

interface BlockData {
  icon: React.ReactNode;
  title: string;
  description: string;
  data: {
    [key: string]: string;
  };
  hash: string;
}

const HowItWorks: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeBlock, setActiveBlock] = useState<number>(0);
  const blocksRef = useRef<HTMLDivElement>(null);

  const blocks: BlockData[] = [
    {
      icon: <FaSeedling className="text-3xl text-green-600" />,
      title: "Farm Origin",
      description: "The journey begins at the farm, where agricultural products are harvested and initial data is recorded.",
      data: {
        "Farm Location": "Meadow Valley Farm, California",
        "Harvest Date": "March 15, 2024",
        "Certifications": "Organic, Fair Trade",
        "Soil Quality": "Grade A - Optimal"
      },
      hash: "0x1234..."
    },
    {
      icon: <FaIndustry className="text-3xl text-blue-600" />,
      title: "Processing",
      description: "Products are processed in certified facilities with strict quality controls.",
      data: {
        "Facility ID": "PROC-2024-001",
        "Processing Date": "March 16, 2024",
        "Quality Score": "98/100",
        "Batch Number": "BATCH-2024-001"
      },
      hash: "0x5678..."
    },
    {
      icon: <FaTruck className="text-3xl text-orange-600" />,
      title: "Distribution",
      description: "Products are transported with continuous monitoring of conditions.",
      data: {
        "Transport ID": "TRANS-2024-001",
        "Temperature": "4°C (Maintained)",
        "Checkpoints": "3/3 Completed",
        "Delivery Date": "March 18, 2024"
      },
      hash: "0x9012..."
    },
    {
      icon: <FaStore className="text-3xl text-purple-600" />,
      title: "Retail",
      description: "Products reach retail locations with verified storage conditions.",
      data: {
        "Store ID": "STORE-2024-001",
        "Receipt ID": "RCPT-2024-001",
        "Storage Temp": "4°C",
        "Shelf Date": "March 19, 2024"
      },
      hash: "0x3456..."
    },
    {
      icon: <FaUserCheck className="text-3xl text-red-600" />,
      title: "Consumer",
      description: "Final verification and consumer access to product information.",
      data: {
        "Verification": "Authentic",
        "Food Miles": "150 miles",
        "Carbon Footprint": "0.5 kg CO2",
        "Journey Time": "5 days"
      },
      hash: "0x7890..."
    }
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (blocksRef.current) {
        const blocks = blocksRef.current.children;
        for (let i = 0; i < blocks.length; i++) {
          const block = blocks[i];
          const rect = block.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveBlock(i);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToJourney = () => {
    blocksRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-gray-50 -mt-20">
      {/* Hero Section */}
      <div className="relative min-h-[calc(100vh-4rem)] flex flex-col items-center justify-center bg-gradient-to-b from-white to-gray-100">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 text-center">
            How TraceSafe Works
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-12 text-center max-w-3xl px-4">
            Blockchain-powered food traceability from farm to table
          </p>
          
          <div className="flex flex-col md:flex-row gap-4">
            <button
              onClick={() => setIsModalOpen(true)}
              className="flex items-center gap-2 bg-indigo-600 text-white px-6 py-3 rounded-lg hover:bg-indigo-700 transition-colors"
            >
              <FaInfoCircle />
              How Blockchain Works
            </button>
            <button
              onClick={scrollToJourney}
              className="flex items-center gap-2 bg-green-600 text-white px-6 py-3 rounded-lg hover:bg-green-700 transition-colors"
            >
              <FaShieldAlt />
              Explore the Blockchain
            </button>
          </div>
        </div>

        <div className="absolute bottom-8 animate-bounce z-10">
          <FaChevronDown className="text-2xl text-gray-400" />
        </div>
      </div>

      {/* Blockchain Journey Section */}
      <div ref={blocksRef} className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">
            Blockchain-Secured Food Journey
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Follow the complete journey of your food from farm to table, secured by blockchain technology
          </p>

          <div className="relative">
            {/* Vertical Line */}
            <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-300"></div>

            {/* Blocks */}
            <div className="space-y-16">
              {blocks.map((block, index) => (
                <div
                  key={index}
                  className={`relative flex items-center ${
                    index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'
                  }`}
                >
                  {/* Block Content */}
                  <div className={`w-1/2 ${index % 2 === 0 ? 'pr-8' : 'pl-8'}`}>
                    <div
                      className={`p-6 rounded-lg shadow-lg transition-all duration-300 cursor-pointer transform hover:scale-105 hover:shadow-xl ${
                        activeBlock === index
                          ? 'bg-white border-2 border-indigo-500'
                          : 'bg-gray-50 hover:bg-white'
                      }`}
                    >
                      <div className="flex items-center gap-4 mb-4">
                        <div className="transform transition-transform duration-300 group-hover:scale-110">
                          {block.icon}
                        </div>
                        <h3 className="text-xl font-semibold transition-colors duration-300 hover:text-indigo-600">{block.title}</h3>
                      </div>
                      <p className="text-gray-600 mb-4 transition-colors duration-300 hover:text-gray-800">{block.description}</p>
                      
                      {/* Blockchain Data Card */}
                      <div className="bg-gray-50 p-4 rounded-lg transition-all duration-300 hover:bg-white hover:shadow-md">
                        <div className="grid grid-cols-2 gap-3">
                          {Object.entries(block.data).map(([key, value]) => (
                            <div key={key} className="flex flex-col group">
                              <span className="text-sm font-semibold text-gray-600 transition-colors duration-300 group-hover:text-indigo-600">{key}</span>
                              <span className="text-sm text-gray-800 transition-colors duration-300 group-hover:text-gray-900">{value}</span>
                            </div>
                          ))}
                        </div>
                        <div className="mt-4 pt-2 border-t border-gray-200">
                          <span className="text-xs text-gray-500">Block Hash: </span>
                          <span className="text-xs font-mono text-gray-700 transition-colors duration-300 hover:text-indigo-600">{block.hash}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Block Number Badge */}
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-8 h-8 bg-indigo-600 text-white rounded-full flex items-center justify-center font-bold transition-all duration-300 hover:scale-110 hover:bg-indigo-700">
                    {index + 1}
                  </div>

                  {/* Empty Space */}
                  <div className="w-1/2"></div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Benefits Section */}
      <div className="bg-white py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Key Benefits</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Consumer Confidence</h3>
              <p className="text-gray-600">
                Verify the authenticity and journey of your food products with blockchain technology.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Rapid Response</h3>
              <p className="text-gray-600">
                Quickly identify and respond to any contamination or quality issues in the supply chain.
              </p>
            </div>
            <div className="p-6 bg-gray-50 rounded-lg">
              <h3 className="text-xl font-semibold mb-4">Fair Trade</h3>
              <p className="text-gray-600">
                Ensure equitable compensation for farmers through transparent blockchain transactions.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Blockchain Modal */}
      <BlockchainModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default HowItWorks; 