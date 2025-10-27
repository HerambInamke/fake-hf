import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import EducationalContent from "./components/EducationalContent";
import InteractiveCards from "./components/InteractiveCards";

const Home = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [error, setError] = useState(null);
  const [isContactOpen, setIsContactOpen] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const fileInputRef = useRef(null);
  const canvasRef = useRef(null);

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 1,
        ease: "easeOut"
      }
    }
  };

  const uploadBoxVariants = {
    hidden: { opacity: 0, scale: 0.9 },
    visible: {
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut"
      }
    }
  };

  const starVariants = {
    animate: {
      opacity: [0.2, 1, 0.2],
      scale: [0.6, 2.0, 0.6],
      transition: {
        duration: 6,
        repeat: Infinity,
        ease: "easeInOut"
      }
    }
  };

  // File validation
  const validateFile = (file) => {
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    const maxSize = 10 * 1024 * 1024; // 10MB

    if (!allowedTypes.includes(file.type)) {
      throw new Error('Please upload a valid image file (JPG, PNG, WEBP)');
    }

    if (file.size > maxSize) {
      throw new Error('File size must be less than 10MB');
    }

    return true;
  };

  // Create image URL for preview
  const createImagePreview = (file) => {
    const url = URL.createObjectURL(file);
    setUploadedImageUrl(url);
  };

  // Draw bounding boxes on canvas
  const drawBoundingBoxes = (imageUrl, boundingBoxes) => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Set canvas size to match image
      canvas.width = img.width;
      canvas.height = img.height;
      
      // Draw the image
      ctx.drawImage(img, 0, 0);
      
      // Draw bounding boxes
      boundingBoxes.forEach((box, index) => {
        const color = box.isFake ? '#ef4444' : '#22c55e'; // Red for fake, green for authentic
        const lineWidth = 3;
        
        // Draw rectangle
        ctx.strokeStyle = color;
        ctx.lineWidth = lineWidth;
        ctx.strokeRect(box.x, box.y, box.width, box.height);
        

      });
    };
    
    img.src = imageUrl;
  };

  // Handle file selection
  const handleFileSelect = async (file) => {
    try {
      setError(null);
      validateFile(file);
      
      setUploadedFile(file);
      createImagePreview(file);
      setIsUploading(true);
      setIsAnalyzing(true);
      
      // Create FormData for upload
      const formData = new FormData();
      formData.append('image', file);

      // Upload to server
      const response = await fetch('https://pixeltruth-ai-deepfake-image-detector.onrender.com/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Upload failed. Please try again.');
      }

      const result = await response.json();
      setUploadResult(result);
      
    } catch (err) {
      setError(err.message);
      setUploadedFile(null);
      setUploadedImageUrl(null);
    } finally {
      setIsUploading(false);
      setIsAnalyzing(false);
    }
  };

  // Handle file input change
  const handleFileInputChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Handle drag and drop
  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const file = e.dataTransfer.files[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  // Reset upload
  const handleReset = () => {
    setUploadedFile(null);
    setUploadedImageUrl(null);
    setUploadResult(null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  // Contact form handlers
  const handleContactInputChange = (e) => {
    const { name, value } = e.target;
    setContactForm(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleContactSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Here you would typically send the form data to your email service
      // For now, we'll simulate a successful submission
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Reset form
      setContactForm({
        name: '',
        email: '',
        subject: '',
        message: ''
      });
      
      // Close modal
      setIsContactOpen(false);
      
      // You could show a success message here
      alert('Thank you for your message! We\'ll get back to you soon.');
    } catch (error) {
      alert('Failed to send message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // Draw bounding boxes when results are available
  useEffect(() => {
    if (uploadResult && uploadResult.boundingBoxes && uploadedImageUrl) {
      drawBoundingBoxes(uploadedImageUrl, uploadResult.boundingBoxes);
    }
  }, [uploadResult, uploadedImageUrl]);

  return (
    <motion.div 
      className={`min-h-screen w-full bg-gradient-to-br ${darkMode ? 'from-black via-purple-900/10 to-blue-900/10' : 'from-blue-50 via-indigo-100/50 to-purple-100/30'} flex flex-col items-center justify-start relative overflow-hidden starry-bg transition-colors duration-300`}
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Glassy Navbar */}
      <motion.nav 
        className={`fixed top-0 left-0 right-0 z-50 ${darkMode ? 'bg-gray-900/70' : 'bg-white/70'} backdrop-blur-lg border-b ${darkMode ? 'border-indigo-500/20' : 'border-white/20'} shadow-lg transition-all duration-300`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center">
              <motion.div 
                className={`text-2xl font-bold ${darkMode ? 'text-indigo-300' : 'text-indigo-700'} transition-colors duration-300`}
                whileHover={{ scale: 1.05 }}
              >
                PixelTruth
              </motion.div>
            </div>
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-full ${darkMode ? 'bg-indigo-700 text-yellow-300' : 'bg-indigo-200 text-indigo-800'} transition-colors duration-300`}
                aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
              >
                {darkMode ? (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707zm1.414 8.486l-.707.707a1 1 0 01-1.414-1.414l.707-.707a1 1 0 011.414 1.414zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z" clipRule="evenodd" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
              <button 
                onClick={() => setIsContactOpen(true)}
                className={`px-4 py-2 ${darkMode ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-indigo-600 hover:bg-indigo-700'} text-white rounded-lg transition-colors`}
              >
                Contact Us
              </button>
            </div>
          </div>
        </div>
      </motion.nav>
      {/* Main Dashboard Content */}
      <div className="pt-20 pb-12 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Left column - Upload and Info */}
          <div className="lg:col-span-7 space-y-6">
            {/* Upload Area - Clean Dashboard Style */}
            <motion.div 
              className="w-full relative z-10"
              variants={uploadBoxVariants}
            >
              <div 
                className={`p-8 rounded-2xl ${darkMode ? 'bg-gray-800/40' : 'bg-white/80'} backdrop-blur-md border ${darkMode ? 'border-indigo-500/30' : 'border-white/20'} shadow-xl transition-all duration-300 ${isDragOver ? 'border-purple-500 shadow-purple-500/30' : ''}`}
                onDragOver={(e) => {
                  e.preventDefault();
                  setIsDragOver(true);
                }}
                onDragLeave={() => setIsDragOver(false)}
                onDrop={(e) => {
                  e.preventDefault();
                  setIsDragOver(false);
                  const file = e.dataTransfer.files[0];
                  if (file) handleFileUpload(file);
                }}
              >
                <h2 className={`text-2xl font-semibold mb-4 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Image Analysis Dashboard</h2>
                <p className={`mb-6 ${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                  Upload an image to analyze its authenticity and detect potential deepfakes.
                </p>
              </div>
            </motion.div>
          </div>
          
          {/* Right column - Results and Stats */}
          <div className="lg:col-span-5 space-y-6">
            <motion.div 
              className={`p-6 rounded-2xl ${darkMode ? 'bg-gray-800/40' : 'bg-white/80'} backdrop-blur-md border ${darkMode ? 'border-indigo-500/30' : 'border-white/20'} shadow-xl transition-all duration-300`}
              variants={cardVariants}
            >
              <h3 className={`text-xl font-semibold mb-3 ${darkMode ? 'text-white' : 'text-gray-800'}`}>Analysis Results</h3>
              <div className={`${darkMode ? 'text-gray-300' : 'text-gray-600'}`}>
                {uploadResult ? (
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span>Authenticity Score:</span>
                      <span className="font-bold text-indigo-600">{uploadResult.score}%</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2.5">
                      <div 
                        className="bg-indigo-600 h-2.5 rounded-full" 
                        style={{ width: `${uploadResult.score}%` }}
                      ></div>
                    </div>
                  </div>
                ) : (
                  <p>Upload an image to see analysis results here.</p>
                )}
              </div>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Educational Content Section */}
      <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <motion.h2 
          className={`text-3xl font-bold mb-8 text-center ${darkMode ? 'text-white' : 'text-gray-800'}`}
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
        >
          Learn About Deepfakes
        </motion.h2>
        
        <div className="mb-12">
          <EducationalContent darkMode={darkMode} />
        </div>
        
        <div className="mb-12">
          <InteractiveCards darkMode={darkMode} />
        </div>
      </div>
      
      {/* Animated Starry background effect - focused around upload area */}
      <div className="absolute inset-0">
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(168,139,250,0.5)_0%,transparent_15%)]"
          variants={starVariants}
          animate="animate"
        />
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(34,211,238,0.4)_0%,transparent_12%)]"
          variants={starVariants}
          animate="animate"
          style={{ animationDelay: "1.5s" }}
        />
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(168,139,250,0.3)_0%,transparent_10%)]"
          variants={starVariants}
          animate="animate"
          style={{ animationDelay: "3s" }}
        />
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.3)_0%,transparent_8%)]"
          variants={starVariants}
          animate="animate"
          style={{ animationDelay: "2.5s" }}
        />
        <motion.div 
          className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(255,255,255,0.25)_0%,transparent_6%)]"
          variants={starVariants}
          animate="animate"
          style={{ animationDelay: "4s" }}
        />
      </div>
      
      {/* Header */}
      <motion.header 
        className="w-full flex flex-col items-center mt-12 relative z-10"
        variants={itemVariants}
      >
        <motion.h1 
          className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-[80px] font-extrabold text-[#a78bfa] leading-none tracking-tight drop-shadow-lg relative px-4 text-center"
          variants={titleVariants}
          style={{ fontFamily: 'inherit' }}
        >
          PixelTruth
          {/* Animated starry effect around title */}
          <motion.div 
            className="absolute -inset-8 bg-[radial-gradient(circle,rgba(168,139,250,0.15)_0%,transparent_80%)] rounded-full"
            animate={{
              opacity: [0.3, 0.9, 0.3],
              scale: [0.8, 1.3, 0.8],
            }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: "easeInOut"
            }}
          />
        </motion.h1>
        <motion.p 
          className="text-base sm:text-lg md:text-xl text-gray-300 mt-2 mb-2 text-center px-4"
          variants={itemVariants}
        >
          Uncover AI-generated manipulations. Powered by Hive AI.
        </motion.p>
        <motion.div 
          className="w-16 h-1 bg-[#a78bfa] rounded-full mb-8 sm:mb-12 mt-2"
          variants={itemVariants}
        />
      </motion.header>

      {/* Upload Box */}
      <motion.div 
        className={`w-full max-w-[700px] mx-4 sm:mx-8 ${darkMode ? 'bg-[#0f172a]' : 'bg-[#111827]'} border-2 border-dashed rounded-xl flex flex-col items-center py-6 sm:py-8 px-4 sm:px-8 mb-8 sm:mb-16 shadow-lg relative z-10 transition-all duration-300 ${
          isDragOver 
            ? 'border-[#a78bfa] bg-[#1a1a2e] scale-105' 
            : 'border-[#a78bfa]'
        }`}
        variants={uploadBoxVariants}
        style={{ boxShadow: '0 0 60px 0 #a78bfa40' }}
        whileHover={{ 
          scale: 1.02,
          boxShadow: '0 0 80px 0 #a78bfa50'
        }}
        transition={{ duration: 0.3 }}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center w-full">
          <motion.div 
            className="flex items-center justify-center w-full mb-4"
            whileHover={{ scale: 1.1 }}
            transition={{ duration: 0.1 }}
          >
            <div className="w-16 h-16 bg-gradient-to-br from-[#a78bfa] to-[#8b5cf6] rounded-lg flex items-center justify-center shadow-lg" style={{ boxShadow: '0 0 30px 0 #a78bfa, 0 0 60px 0 #a78bfa40' }}>
              {isUploading ? (
                <motion.div
                  className="w-8 h-8 relative"
                  animate={{ rotate: 360 }}
                  transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
                >
                  {/* Multiple bright dots around the circle */}
                  <div className="absolute inset-0">
                    <div className="absolute top-0 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2" style={{ boxShadow: '0 0 20px rgba(255, 255, 255, 1), 0 0 40px rgba(255, 255, 255, 0.8)' }}></div>
                    <div className="absolute top-1/4 right-0 w-2 h-2 bg-white rounded-full transform translate-x-1/2" style={{ boxShadow: '0 0 20px rgba(255, 255, 255, 1), 0 0 40px rgba(255, 255, 255, 0.8)' }}></div>
                    <div className="absolute bottom-1/4 right-0 w-2 h-2 bg-white rounded-full transform translate-x-1/2" style={{ boxShadow: '0 0 20px rgba(255, 255, 255, 1), 0 0 40px rgba(255, 255, 255, 0.8)' }}></div>
                    <div className="absolute bottom-0 left-1/2 w-2 h-2 bg-white rounded-full transform -translate-x-1/2" style={{ boxShadow: '0 0 20px rgba(255, 255, 255, 1), 0 0 40px rgba(255, 255, 255, 0.8)' }}></div>
                    <div className="absolute bottom-1/4 left-0 w-2 h-2 bg-white rounded-full transform -translate-x-1/2" style={{ boxShadow: '0 0 20px rgba(255, 255, 255, 1), 0 0 40px rgba(255, 255, 255, 0.8)' }}></div>
                    <div className="absolute top-1/4 left-0 w-2 h-2 bg-white rounded-full transform -translate-x-1/2" style={{ boxShadow: '0 0 20px rgba(255, 255, 255, 1), 0 0 40px rgba(255, 255, 255, 0.8)' }}></div>
                    <div className="absolute top-1/2 right-1/4 w-2 h-2 bg-white rounded-full transform translate-y-1/2" style={{ boxShadow: '0 0 20px rgba(255, 255, 255, 1), 0 0 40px rgba(255, 255, 255, 0.8)' }}></div>
                    <div className="absolute top-1/2 left-1/4 w-2 h-2 bg-white rounded-full transform translate-y-1/2" style={{ boxShadow: '0 0 20px rgba(255, 255, 255, 1), 0 0 40px rgba(255, 255, 255, 0.8)' }}></div>
                  </div>
                  {/* Center glow */}
                  <div className="absolute inset-0 bg-white rounded-full opacity-20" style={{ boxShadow: '0 0 30px rgba(255, 255, 255, 0.5), 0 0 60px rgba(255, 255, 255, 0.3)' }}></div>
                </motion.div>
              ) : (
                <svg width="32" height="32" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                </svg>
              )}
            </div>
          </motion.div>
          
          {uploadedFile && !isUploading && (
            <motion.div 
              className="text-green-400 text-sm mb-2 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              ✓ {uploadedFile.name} uploaded successfully
            </motion.div>
          )}

          {error && (
            <motion.div 
              className="text-red-400 text-sm mb-2 text-center"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
            >
              ✗ {error}
            </motion.div>
          )}

          <motion.div 
            className="text-white text-lg sm:text-xl font-semibold mb-1 text-center px-2"
            variants={itemVariants}
          >
            {isUploading ? 'Analyzing Image...' : 'Upload Image to Analyze'}
          </motion.div>
          <motion.div 
            className="text-gray-400 text-sm sm:text-base mb-2 text-center px-2"
            variants={itemVariants}
          >
            Drag and drop your image here, or click to browse
          </motion.div>
          <motion.div 
            className="text-gray-400 text-xs sm:text-sm mb-4 text-center px-2"
            variants={itemVariants}
          >
            Supported formats: JPG, PNG, WEBP (Max 10MB)
          </motion.div>
          
          <div className="flex flex-col sm:flex-row gap-3 w-full sm:w-auto">
            <motion.label 
              className="inline-block cursor-pointer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }}
            >
              <input 
                ref={fileInputRef}
                type="file" 
                className="hidden" 
                accept="image/jpeg,image/png,image/webp"
                onChange={handleFileInputChange}
                disabled={isUploading}
              />
              <span className="px-4 py-2 bg-[#374151] border border-gray-500 rounded-md text-white font-medium hover:bg-[#4b5563] transition-colors duration-200 flex items-center justify-center gap-2 w-full sm:w-auto">
                <svg width="18" height="18" fill="none" viewBox="0 0 24 24" stroke="#fff" strokeWidth="2">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14,2 14,8 20,8" />
                  <line x1="16" y1="13" x2="8" y2="13" />
                  <line x1="16" y1="17" x2="8" y2="17" />
                  <polyline points="10,9 9,9 8,9" />
                </svg>
                {isUploading ? 'Processing...' : 'Choose File'}
              </span>
            </motion.label>

            {uploadedFile && !isUploading && (
              <motion.button
                onClick={handleReset}
                className="px-4 py-2 bg-[#dc2626] border border-red-500 rounded-md text-white font-medium hover:bg-[#b91c1c] transition-colors duration-200 w-full sm:w-auto"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ duration: 0.1 }}
              >
                Reset
              </motion.button>
            )}
          </div>
        </div>
      </motion.div>

      {/* Uploaded Image Display - Show immediately when uploaded */}
      {uploadedImageUrl && (
        <motion.div 
          className="w-full max-w-[700px] mx-4 sm:mx-8 bg-[#111827] border border-gray-600 rounded-xl p-4 sm:p-6 mb-8 shadow-lg relative z-10"
          style={{ 
            boxShadow: '0 0 25px rgba(34, 211, 238, 0.2), 0 0 50px rgba(34, 211, 238, 0.1), inset 0 0 15px rgba(34, 211, 238, 0.03)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-white text-lg sm:text-xl font-semibold mb-4 text-center px-2">
            {isUploading ? 'Uploaded Image (Analyzing...)' : 'Uploaded Image'}
          </h3>
          <div className="flex justify-center">
            <img 
              src={uploadedImageUrl} 
              alt="Uploaded" 
              className="max-w-full max-h-64 sm:max-h-96 rounded-lg shadow-lg"
            />
          </div>
        </motion.div>
      )}

      {/* Results Section */}
      {uploadResult && (
        <motion.div 
          className="w-full max-w-[700px] mx-4 sm:mx-8 bg-[#111827] border border-gray-600 rounded-xl p-4 sm:p-6 mb-8 shadow-lg relative z-10"
          style={{ 
            boxShadow: '0 0 30px rgba(168, 139, 250, 0.3), 0 0 60px rgba(168, 139, 250, 0.1), inset 0 0 20px rgba(168, 139, 250, 0.05)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-white text-lg sm:text-xl font-semibold mb-4 text-center px-2">Analysis Results</h3>
          <div className="space-y-3 mb-6">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Fake Percentage:</span>
              <span className={`font-semibold text-lg ${
                uploadResult.fakePercentage > 80 ? 'text-red-400' : 
                uploadResult.fakePercentage > 60 ? 'text-orange-400' : 
                uploadResult.fakePercentage > 30 ? 'text-yellow-400' : 'text-green-400'
              }`}>
                {uploadResult.fakePercentage}%
              </span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Analysis Time:</span>
              <span className="text-gray-400">{uploadResult.processingTime}ms</span>
            </div>
          </div>
          
          {/* Loading Indicator */}
          {isAnalyzing && (
            <motion.div 
              className="absolute inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm rounded-xl z-20"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 border-4 border-t-indigo-500 border-r-indigo-500 border-b-transparent border-l-transparent rounded-full animate-spin"></div>
                <p className="mt-4 text-white font-medium">Analyzing image...</p>
              </div>
            </motion.div>
          )}
        </motion.div>
      )}

      {/* Image with Bounding Boxes - Canvas Version */}
      {uploadResult && uploadResult.boundingBoxes && uploadedImageUrl && (
        <motion.div 
          className="w-full max-w-[700px] mx-4 sm:mx-8 bg-[#111827] border border-gray-600 rounded-xl p-4 sm:p-6 mb-8 shadow-lg relative z-10"
          style={{ 
            boxShadow: '0 0 25px rgba(255, 255, 255, 0.15), 0 0 50px rgba(255, 255, 255, 0.08), inset 0 0 15px rgba(255, 255, 255, 0.02)'
          }}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h3 className="text-white text-lg sm:text-xl font-semibold mb-4 text-center px-2">Image with Detection Squares</h3>
          <div className="flex justify-center">
            <canvas 
              ref={canvasRef}
              className="max-w-full max-h-64 sm:max-h-96 rounded-lg shadow-lg"
              style={{ maxWidth: '100%', maxHeight: '384px' }}
            />
          </div>
          <div className="mt-4 text-center text-xs sm:text-sm text-gray-400 px-2">
            <div className="flex flex-col sm:flex-row justify-center gap-2 sm:gap-4">
              <span className="inline-block">🟢 Green: Authentic areas</span>
              <span className="inline-block">🔴 Red: Fake/Manipulated areas</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* Info Cards */}
      <motion.div 
        className="w-full max-w-6xl flex flex-col lg:flex-row justify-center gap-4 sm:gap-6 mb-10 px-4 sm:px-6 relative z-10"
        variants={containerVariants}
      >
        {/* Card 1 - What are Deepfakes? */}
        <motion.div 
          className="flex-1 bg-[#111827] rounded-xl p-4 sm:p-6 shadow-lg border border-gray-600 min-w-[280px]"
          variants={cardVariants}
          whileHover={{ 
            scale: 1.02,
            y: -5,
            boxShadow: '0 10px 25px rgba(168, 139, 250, 0.2)'
          }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center mb-3">
            <motion.div 
              className="w-8 h-8 bg-[#a78bfa] bg-opacity-20 rounded-lg flex items-center justify-center mr-3"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#a78bfa" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </motion.div>
            <span className="text-white font-semibold text-base sm:text-lg">What are Deepfakes?</span>
          </div>
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
            Deepfakes are AI-generated media where a person appears to say or do things they never actually did. They use sophisticated machine learning to manipulate facial expressions, voice, and movements.<br/><br/>
            While they have legitimate uses in entertainment and education, deepfakes pose risks for misinformation and identity theft.
          </p>
        </motion.div>
        
        {/* Card 2 - How Detection Works */}
        <motion.div 
          className="flex-1 bg-[#111827] rounded-xl p-4 sm:p-6 shadow-lg border border-gray-600 min-w-[280px]"
          variants={cardVariants}
          whileHover={{ 
            scale: 1.02,
            y: -5,
            boxShadow: '0 10px 25px rgba(168, 139, 250, 0.2)'
          }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center mb-3">
            <motion.div 
              className="w-8 h-8 bg-[#a78bfa] bg-opacity-20 rounded-lg flex items-center justify-center mr-3"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.4 }}
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#a78bfa" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </motion.div>
            <span className="text-white font-semibold text-base sm:text-lg">How Detection Works</span>
          </div>
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
            Our AI analyzes subtle inconsistencies in lighting, shadows, facial geometry, and pixel-level artifacts that are often imperceptible to the human eye.<br/><br/>
            The system uses advanced neural networks trained on millions of real and synthetic images to identify manipulation patterns.
          </p>
        </motion.div>
        
        {/* Card 3 - Powered by Hive AI */}
        <motion.div 
          className="flex-1 bg-[#111827] rounded-xl p-4 sm:p-6 shadow-lg border border-gray-600 min-w-[280px]"
          variants={cardVariants}
          whileHover={{ 
            scale: 1.02,
            y: -5,
            boxShadow: '0 10px 25px rgba(168, 139, 250, 0.2)'
          }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center mb-3">
            <motion.div 
              className="w-8 h-8 bg-[#22d3ee] bg-opacity-20 rounded-lg flex items-center justify-center mr-3"
              whileHover={{ scale: 1.1, rotate: 5 }}
              transition={{ duration: 0.4 }}
            >
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="#22d3ee" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </motion.div>
            <span className="text-white font-semibold text-base sm:text-lg">Powered by Hive AI</span>
          </div>
          <p className="text-gray-300 text-xs sm:text-sm leading-relaxed">
            Analysis is powered by Hive AI, a cutting-edge media authentication platform trusted by leading organizations worldwide for content moderation and verification.
          </p>
          <motion.button 
            className="inline-flex items-center mt-4 text-[#a78bfa] hover:underline text-xs sm:text-sm font-medium"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.4 }}
            onClick={() => window.open('https://thehive.ai/', '_blank')}
          >
            Learn More
            <svg className="ml-1" width="16" height="16" fill="none" viewBox="0 0 24 24" stroke="#a78bfa" strokeWidth="2">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Footer */}
      <motion.footer 
        className="w-full py-6 sm:py-8 mt-8 sm:mt-16 relative z-10 px-4"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="flex flex-col items-center space-y-4">
          {/* Logo */}
          <motion.div 
            className="flex items-center space-x-2 mb-4"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.1 }}
          >
            <div className="w-8 h-8 bg-gradient-to-br from-[#a78bfa] to-[#8b5cf6] rounded-lg flex items-center justify-center shadow-lg" style={{ boxShadow: '0 0 25px 0 #a78bfa, 0 0 50px 0 #a78bfa30' }}>
              <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <span className="text-[#a78bfa] font-bold text-lg">PixelTruth</span>
          </motion.div>

          {/* Author */}
          <p className="text-gray-400 text-xs sm:text-sm">by Aayush Raut</p>

          {/* Social Links */}
          <div className="flex space-x-4 sm:space-x-6">
            {/* Instagram */}
            <motion.a
              href="https://www.instagram.com/aayush_raut_207/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#a78bfa] transition-colors duration-200"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }}
            >
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </motion.a>

            {/* GitHub */}
            <motion.a
              href="https://github.com/Aayush-207"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-[#a78bfa] transition-colors duration-200"
              whileHover={{ scale: 1.1, y: -2 }}
              whileTap={{ scale: 0.95 }}
              transition={{ duration: 0.1 }}
            >
              <svg width="24" height="24" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
              </svg>
            </motion.a>


          </div>
        </div>
      </motion.footer>

      {/* Contact Modal */}
      <AnimatePresence>
        {isContactOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              className="fixed inset-0 bg-black bg-opacity-50 z-40"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsContactOpen(false)}
            />
            
            {/* Modal */}
            <motion.div
              className="fixed top-0 right-0 h-full w-full max-w-md bg-[#111827] border-l border-[#a78bfa] shadow-2xl z-50 overflow-y-auto"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            >
              <div className="p-6">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl font-bold text-white">Report a Bug</h2>
                  <motion.button
                    onClick={() => setIsContactOpen(false)}
                    className="w-8 h-8 bg-[#374151] rounded-full flex items-center justify-center hover:bg-[#4b5563] transition-colors duration-200"
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <svg width="20" height="20" fill="none" viewBox="0 0 24 24" stroke="white" strokeWidth="2">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </motion.button>
                </div>

                {/* Form */}
                <form onSubmit={handleContactSubmit} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Name *
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={contactForm.name}
                      onChange={handleContactInputChange}
                      required
                      className="w-full px-3 py-2 bg-[#1f2937] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a78bfa] focus:border-transparent transition-all duration-200"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Email *
                    </label>
                    <input
                      type="email"
                      name="email"
                      value={contactForm.email}
                      onChange={handleContactInputChange}
                      required
                      className="w-full px-3 py-2 bg-[#1f2937] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a78bfa] focus:border-transparent transition-all duration-200"
                      placeholder="your.email@example.com"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Subject *
                    </label>
                    <input
                      type="text"
                      name="subject"
                      value={contactForm.subject}
                      onChange={handleContactInputChange}
                      required
                      className="w-full px-3 py-2 bg-[#1f2937] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a78bfa] focus:border-transparent transition-all duration-200"
                      placeholder="Brief description of the issue"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={contactForm.message}
                      onChange={handleContactInputChange}
                      required
                      rows={6}
                      className="w-full px-3 py-2 bg-[#1f2937] border border-gray-600 rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#a78bfa] focus:border-transparent transition-all duration-200 resize-none"
                      placeholder="Please describe the bug in detail..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-3 bg-gradient-to-r from-[#a78bfa] to-[#8b5cf6] text-white font-semibold rounded-md hover:from-[#8b5cf6] hover:to-[#7c3aed] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    style={{ boxShadow: '0 0 20px 0 #a78bfa30' }}
                  >
                    {isSubmitting ? (
                      <div className="flex items-center justify-center">
                        <motion.div
                          className="w-5 h-5 border-2 border-white border-t-transparent rounded-full"
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                        />
                        <span className="ml-2">Sending...</span>
                      </div>
                    ) : (
                      'Send Message'
                    )}
                  </motion.button>
                </form>

                {/* Additional Info */}
                <div className="mt-6 p-4 bg-[#1f2937] rounded-md border border-gray-600">
                  <h3 className="text-sm font-semibold text-white mb-2">What to include:</h3>
                  <ul className="text-xs text-gray-300 space-y-1">
                    <li>• Steps to reproduce the issue</li>
                    <li>• Expected vs actual behavior</li>
                    <li>• Browser/device information</li>
                    <li>• Screenshots if applicable</li>
                  </ul>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default Home;