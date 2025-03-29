import React, { useState, useEffect, useRef } from 'react';
import { FaSeedling, FaIndustry, FaTruck, FaStore, FaUserCheck } from 'react-icons/fa';

interface Stage {
  title: string;
  details: string;
  data?: {
    [key: string]: string;
  };
  hash?: string;
}

interface ProductDetailsProps {
  productName: string;
  stages: Stage[];
  error?: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ productName, stages, error }) => {
  const [activeBlock, setActiveBlock] = useState<number>(0);
  const blocksRef = useRef<HTMLDivElement>(null);

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

  if (error) {
    return (
      <div className="text-red-600 text-center">
        {error}
      </div>
    );
  }

  const getIcon = (index: number) => {
    const icons = [FaSeedling, FaIndustry, FaTruck, FaStore, FaUserCheck];
    const colors = ['text-green-600', 'text-blue-600', 'text-orange-600', 'text-purple-600', 'text-red-600'];
    const Icon = icons[index % icons.length];
    return <Icon className={`text-3xl ${colors[index % colors.length]}`} />;
  };

  return (
    <div className="max-w-4xl mx-auto mt-12">
      <h3 className="text-4xl font-bold text-gray-900 mb-6 text-center">
        {productName}
      </h3>
      <p className="text-xl text-gray-600 text-center mb-12">
        Product Journey Details
      </p>

      <div ref={blocksRef} className="relative">
        {/* Vertical Line */}
        <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gray-300"></div>

        {/* Blocks */}
        <div className="space-y-16">
          {stages.map((stage, index) => (
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
                      {getIcon(index)}
                    </div>
                    <h3 className="text-xl font-semibold transition-colors duration-300 hover:text-indigo-600">
                      {stage.title}
                    </h3>
                  </div>
                  <p className="text-gray-600 mb-4 transition-colors duration-300 hover:text-gray-800">
                    {stage.details}
                  </p>
                  
                  {stage.data && (
                    <div className="bg-gray-50 p-4 rounded-lg transition-all duration-300 hover:bg-white hover:shadow-md">
                      <div className="grid grid-cols-2 gap-3">
                        {Object.entries(stage.data).map(([key, value]) => (
                          <div key={key} className="flex flex-col group">
                            <span className="text-sm font-semibold text-gray-600 transition-colors duration-300 group-hover:text-indigo-600">
                              {key}
                            </span>
                            <span className="text-sm text-gray-800 transition-colors duration-300 group-hover:text-gray-900">
                              {value}
                            </span>
                          </div>
                        ))}
                      </div>
                      {stage.hash && (
                        <div className="mt-4 pt-2 border-t border-gray-200">
                          <span className="text-xs text-gray-500">Block Hash: </span>
                          <span className="text-xs font-mono text-gray-700 transition-colors duration-300 hover:text-indigo-600">
                            {stage.hash}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
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
  );
};

export default ProductDetails; 