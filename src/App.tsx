import React, { useState, useEffect, useRef } from 'react';
import { Scan, Menu, X, Camera } from 'lucide-react';
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from 'html5-qrcode';

interface Stage {
  title: string;
  details: string;
}

interface ScannedData {
  productName: string;
  stages: Stage[];
  error?: string;
}

function App() {
  const [isProductVisible, setIsProductVisible] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScannerOpen, setIsScannerOpen] = useState(false);
  const scannerRef = useRef<Html5QrcodeScanner | null>(null);
  const [scannedData, setScannedData] = useState<ScannedData | null>(null);

  useEffect(() => {
    if (isScannerOpen) {
      scannerRef.current = new Html5QrcodeScanner(
        "reader",
        { 
          fps: 10,
          qrbox: {width: 300, height: 300},
          aspectRatio: 1.0,
          formatsToSupport: [ Html5QrcodeSupportedFormats.QR_CODE ],
          showTorchButtonIfSupported: true,
          showZoomSliderIfSupported: true,
          defaultZoomValueIfSupported: 2
        },
        false
      );
      
      scannerRef.current.render((decodedText) => {
        try {
          const data = JSON.parse(decodedText);
          setScannedData(data);
          setIsProductVisible(true);
          setIsScannerOpen(false);
        } catch (error) {
          setScannedData({
            productName: '',
            stages: [],
            error: error instanceof Error ? error.message : 'Invalid QR code format'
          });
          setIsProductVisible(true);
          setIsScannerOpen(false);
        }
      }, (error) => {
        console.warn('Scan error:', error);
      });
    } else {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(err => console.warn('Cleanup error:', err));
      }
    }

    return () => {
      if (scannerRef.current) {
        scannerRef.current.clear().catch(err => console.warn('Cleanup error:', err));
      }
    };
  }, [isScannerOpen]);

  const menuItems = ['Home', 'How It Works', 'Contact'];

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Header - unchanged */}
      <header className="fixed w-full bg-white border-b border-black z-50">
        <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
          <h1 className="text-2xl font-bold text-black">TraceSafe</h1>
          <div className="hidden md:flex space-x-8">
            {menuItems.map((item) => (
              <a key={item} href="#" className="text-black hover:bg-black hover:text-white px-3 py-2 rounded-md transition-colors">
                {item}
              </a>
            ))}
          </div>
          <button className="md:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-6 w-6 text-black" /> : <Menu className="h-6 w-6 text-black" />}
          </button>
        </nav>
        {isMobileMenuOpen && (
          <div className="md:hidden bg-white border-b border-black">
            <div className="px-4 py-2">
              {menuItems.map((item) => (
                <a key={item} href="#" className="block py-3 text-black hover:bg-black hover:text-white px-3 rounded-md transition-colors">
                  {item}
                </a>
              ))}
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-3xl mx-auto">
            <h2 className="text-4xl md:text-5xl font-bold text-black mb-6">
              Trace Your Food with Confidence
            </h2>
            <p className="text-xl text-black mb-12">
              Scan a QR code to see your food's journey from farm to table
            </p>
            <button
              onClick={() => setIsScannerOpen(true)}
              className="bg-black text-white px-8 py-4 rounded-lg flex items-center justify-center mx-auto space-x-2 hover:bg-gray-900 transition-colors"
            >
              <Camera className="h-5 w-5" />
              <span>Scan QR Code</span>
            </button>
          </div>

          {/* QR Scanner - unchanged */}
          {isScannerOpen && (
            <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50">
              <div className="bg-white p-6 rounded-lg max-w-lg w-full mx-4">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-xl font-bold">Scan QR Code</h3>
                  <button onClick={() => setIsScannerOpen(false)} className="text-black hover:text-gray-700">
                    <X className="h-6 w-6" />
                  </button>
                </div>
                <div id="reader" className="w-full"></div>
              </div>
            </div>
          )}

          {/* Product Details Section - Enhanced with Chain Visualization */}
          {isProductVisible && scannedData && (
            <div className="max-w-3xl mx-auto mt-12 p-8 border border-black rounded-lg bg-white shadow-lg">
              {scannedData.error ? (
                <div className="text-red-600 text-center">
                  {scannedData.error}
                </div>
              ) : (
                <>
                  <h3 className="text-3xl font-bold text-black mb-12 text-center border-b pb-4">
                    {scannedData.productName}
                  </h3>
                  <div className="relative">
                    {/* Chain Timeline */}
                    <div className="space-y-12">
                      {scannedData.stages.map((item, index) => (
                        <div key={index} className="relative flex items-start">
                          {/* Chain Circle */}
                          <div className="flex-shrink-0 w-14 h-14 rounded-full bg-black flex items-center justify-center text-white font-bold text-lg z-10 shadow-md">
                            {index + 1}
                          </div>
                          {/* Chain Link */}
                          {index < scannedData.stages.length - 1 && (
                            <div className="absolute left-7 top-14 w-0.5 h-[calc(100%+1rem)] bg-gradient-to-b from-black to-gray-300"></div>
                          )}
                          {/* Content */}
                          <div className="ml-8 bg-gray-50 p-6 rounded-xl w-full border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                            <div className="font-bold text-black text-xl mb-2">{item.title}</div>
                            <div className="text-gray-600 text-lg">{item.details}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </div>
          )}
        </div>
      </main>

      {/* Footer - unchanged */}
      <footer className="bg-black text-white py-6">
        <div className="container mx-auto px-4 text-center">
          © 2025 TraceSafe. Built with Blockchain.
        </div>
      </footer>
    </div>
  );
}

export default App;