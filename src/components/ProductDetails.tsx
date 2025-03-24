import React from 'react';

interface Stage {
  title: string;
  details: string;
}

interface ProductDetailsProps {
  productName: string;
  stages: Stage[];
  error?: string;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ productName, stages, error }) => {
  if (error) {
    return (
      <div className="text-red-600 text-center">
        {error}
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto mt-12 p-8 border border-black rounded-lg bg-white shadow-lg">
      <h3 className="text-3xl font-bold text-black mb-12 text-center border-b pb-4">
        {productName}
      </h3>
      <div className="relative">
        <div className="space-y-12">
          {stages.map((item, index) => (
            <div key={index} className="relative flex items-start">
              <div className="flex-shrink-0 w-14 h-14 rounded-full bg-black flex items-center justify-center text-white font-bold text-lg z-10 shadow-md">
                {index + 1}
              </div>
              {index < stages.length - 1 && (
                <div className="absolute left-7 top-14 w-0.5 h-[calc(100%+1rem)] bg-gradient-to-b from-black to-gray-300"></div>
              )}
              <div className="ml-8 bg-gray-50 p-6 rounded-xl w-full border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                <div className="font-bold text-black text-xl mb-2">{item.title}</div>
                <div className="text-gray-600 text-lg">{item.details}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ProductDetails; 