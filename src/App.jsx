import React, { useState, useEffect } from 'react';
import { ShoppingCart, Menu, X, Upload, Image as ImageIcon } from 'lucide-react';

export default function App() {
  const [currentView, setCurrentView] = useState("Home");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // --- DJANGO BACKEND STATE ---
  const [products, setProducts] = useState([]);
  const [isUploading, setIsUploading] = useState(false);

  // 1. FETCH FROM DJANGO (Ready for Phase 5)
  useEffect(() => {
    /* 
      When your Django backend is running, uncomment this code:
      fetch('http://localhost:8000/api/products/')
        .then(res => res.json())
        .then(data => setProducts(data))
        .catch(err => console.error("Django connection error:", err));
    */
  }, []);

  // 2. UPLOAD TO DJANGO (Handles Image Files)
  const handleDjangoUpload = (e) => {
    e.preventDefault();
    setIsUploading(true);
    
    // FormData is required to send physical image files to Django
    const formData = new FormData(e.target);
    
    /*
      When your Django backend is running, uncomment this:
      fetch('http://localhost:8000/api/products/upload/', {
        method: 'POST',
        body: formData,
      })
      .then(res => res.json())
      .then(data => {
         alert("Successfully uploaded to Django!");
         setCurrentView("Collections");
      });
    */
    
    setTimeout(() => {
      alert("Backend not connected yet. Image ready for Django!");
      setIsUploading(false);
    }, 1000);
  };

  return (
    <div className="h-screen w-full font-sans flex flex-col overflow-x-hidden">
      
      {/* --- CANVA STYLE NAVIGATION BAR --- */}
      <header className="h-[80px] bg-white px-6 md:px-12 flex items-center justify-between border-b border-gray-100 shrink-0">
        
        {/* Brand & Logo */}
        <div onClick={() => setCurrentView("Home")} className="flex items-center gap-3 cursor-pointer">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-pink-500 via-rose-500 to-purple-700 flex items-center justify-center text-white font-bold text-xl shadow-sm">
            AK
          </div>
          <span className="text-xl font-bold text-gray-900 tracking-tight">KnotsByAarushi</span>
        </div>

        {/* Desktop Links */}
        <nav className="hidden md:flex items-center gap-8">
          <button onClick={() => setCurrentView("Home")} className="text-sm font-medium text-gray-600 hover:text-pink-600">Home</button>
          <button onClick={() => setCurrentView("Collections")} className="text-sm font-medium text-gray-600 hover:text-pink-600">Collections</button>
          <button onClick={() => setCurrentView("Upload")} className="text-sm font-medium text-pink-600 flex items-center gap-1"><Upload className="w-4 h-4"/> Admin Upload</button>
          <button className="text-gray-600 hover:text-pink-600 ml-4"><ShoppingCart className="w-5 h-5" /></button>
        </nav>

        {/* Mobile Toggle */}
        <button className="md:hidden text-gray-600" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
          {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </header>

      {/* --- ROUTER --- */}
      <main className="flex-1 flex flex-col overflow-y-auto bg-gray-50">
        
        {/* VIEW 1: CANVA SPLIT SCREEN HERO */}
        {currentView === "Home" && (
          <div className="flex-1 flex flex-col md:flex-row min-h-[calc(100vh-80px)]">
            {/* Left Side: Grey Background */}
            <div className="w-full md:w-1/2 bg-[#8a8a8a] flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 h-full">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-6">
                KnotsByAarushi & Brands
              </h1>
              <p className="text-white/90 text-base md:text-lg max-w-md leading-relaxed mb-10">
                Discover your brand designed when they intend your knotsby and created immediately.
              </p>
              <button 
                onClick={() => setCurrentView("Collections")}
                className="bg-gradient-to-r from-pink-500 to-purple-600 text-white px-8 py-3.5 rounded-md font-semibold text-sm w-fit shadow-lg hover:opacity-90 transition-all"
              >
                Get Started now
              </button>
            </div>

            {/* Right Side: Image */}
            <div className="w-full md:w-1/2 h-[50vh] md:h-auto bg-gray-200">
              <img 
                src="https://images.unsplash.com/photo-1583391733958-d25e07fac0ce?q=80&w=1000&auto=format&fit=crop" 
                alt="Fashion Model" 
                className="w-full h-full object-cover object-center"
              />
            </div>
          </div>
        )}

        {/* VIEW 2: DJANGO DATA COLLECTIONS */}
        {currentView === "Collections" && (
          <div className="max-w-7xl mx-auto px-4 py-16 w-full">
            <h2 className="text-3xl font-bold text-gray-900 mb-8">Latest Collections</h2>
            {products.length === 0 ? (
              <div className="text-center py-20 bg-white rounded-xl border border-gray-200">
                <p className="text-gray-500 mb-4">Awaiting Django Backend Connection...</p>
                <button onClick={() => setCurrentView("Upload")} className="text-pink-600 font-bold hover:underline">
                  Upload your first product
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
                {/* Products will map here once Django is connected */}
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: DJANGO IMAGE UPLOAD FORM */}
        {currentView === "Upload" && (
          <div className="max-w-2xl mx-auto px-4 py-16 w-full">
            <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-200">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Upload className="w-6 h-6 text-pink-600" /> Upload Product to Database
              </h2>
              
              {/* Form equipped with encType for physical image uploads to Django */}
              <form onSubmit={handleDjangoUpload} encType="multipart/form-data" className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Title</label>
                  <input type="text" name="title" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500" />
                </div>
                
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Price ($)</label>
                  <input type="number" step="0.01" name="price" required className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-pink-500" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:bg-gray-50 transition-colors">
                    <div className="space-y-1 text-center">
                      <ImageIcon className="mx-auto h-12 w-12 text-gray-400" />
                      <div className="flex text-sm text-gray-600">
                        <label className="relative cursor-pointer bg-white rounded-md font-medium text-pink-600 hover:text-pink-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-pink-500">
                          <span>Upload a file</span>
                          <input id="file-upload" name="image" type="file" accept="image/*" className="sr-only" required />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={isUploading}
                  className="w-full py-3 mt-6 bg-gray-900 text-white font-bold rounded-lg shadow-md hover:bg-black disabled:opacity-50"
                >
                  {isUploading ? "Uploading to Django..." : "Save Product"}
                </button>
              </form>
            </div>
          </div>
        )}

      </main>
    </div>
  );
}