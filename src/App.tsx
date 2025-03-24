import React, { useState, useEffect, useRef } from 'react';
import { Html5QrcodeScanner, Html5QrcodeSupportedFormats } from 'html5-qrcode';
import Header from './components/Header';
import QRScanner from './components/QRScanner';
import ProductDetails from './components/ProductDetails';
import Home from './components/Home';
import HowItWorks from './components/HowItWorks';
import AboutUs from './components/AboutUs';

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
  const [activeSection, setActiveSection] = useState('home');
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

  const menuItems = [
    { id: 'home', label: 'Home' },
    { id: 'how-it-works', label: 'How It Works' },
    { id: 'about', label: 'About Us' }
  ];

  const renderContent = () => {
    switch (activeSection) {
      case 'how-it-works':
        return <HowItWorks />;
      case 'about':
        return <AboutUs />;
      default:
        return <Home onScanClick={() => setIsScannerOpen(true)} />;
    }
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Header
        menuItems={menuItems}
        activeSection={activeSection}
        setActiveSection={setActiveSection}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      <main className="flex-grow pt-20">
        <div className="container mx-auto px-4 py-16">
          {renderContent()}

          <QRScanner
            isOpen={isScannerOpen}
            onClose={() => setIsScannerOpen(false)}
          />

          {isProductVisible && scannedData && (
            <ProductDetails
              productName={scannedData.productName}
              stages={scannedData.stages}
              error={scannedData.error}
            />
          )}
        </div>
      </main>

      <footer className="bg-black text-white py-6">
        <div className="container mx-auto px-4 text-center">
          © 2025 TraceSafe. Built with Blockchain.
        </div>
      </footer>
    </div>
  );
}

export default App;