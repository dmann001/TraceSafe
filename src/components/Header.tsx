import React from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  menuItems: Array<{ id: string; label: string }>;
  activeSection: string;
  setActiveSection: (section: string) => void;
  isMobileMenuOpen: boolean;
  setIsMobileMenuOpen: (isOpen: boolean) => void;
}

const Header: React.FC<HeaderProps> = ({
  menuItems,
  activeSection,
  setActiveSection,
  isMobileMenuOpen,
  setIsMobileMenuOpen,
}) => {
  return (
    <header className="fixed w-full bg-white border-b border-black z-50">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-black">TraceSafe</h1>
        <div className="hidden md:flex space-x-8">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveSection(item.id)}
              className={`text-black hover:bg-black hover:text-white px-3 py-2 rounded-md transition-colors ${
                activeSection === item.id ? 'bg-black text-white' : ''
              }`}
            >
              {item.label}
            </button>
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
              <button
                key={item.id}
                onClick={() => {
                  setActiveSection(item.id);
                  setIsMobileMenuOpen(false);
                }}
                className={`block w-full text-left py-3 text-black hover:bg-black hover:text-white px-3 rounded-md transition-colors ${
                  activeSection === item.id ? 'bg-black text-white' : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header; 