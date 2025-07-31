import React, { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";

const Home = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [isDragOver, setIsDragOver] = useState(false);
  const [uploadResult, setUploadResult] = useState(null);
  const [error, setError] = useState(null);
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
      
      // Create FormData for upload
      const formData = new FormData();
      formData.append('image', file);

      // Upload to server
      const response = await fetch('http://localhost:5000/upload', {
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

  // Draw bounding boxes when results are available
  useEffect(() => {
    if (uploadResult && uploadResult.boundingBoxes && uploadedImageUrl) {
      drawBoundingBoxes(uploadedImageUrl, uploadResult.boundingBoxes);
    }
  }, [uploadResult, uploadedImageUrl]);

  return (
    <motion.div 
      className="min-h-screen w-full bg-gradient-to-br from-black via-purple-900/10 to-blue-900/10 flex flex-col items-center justify-start relative overflow-hidden starry-bg"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
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
        className={`w-full max-w-[700px] mx-4 sm:mx-8 bg-[#111827] border-2 border-dashed rounded-xl flex flex-col items-center py-6 sm:py-8 px-4 sm:px-8 mb-8 sm:mb-16 shadow-lg relative z-10 transition-all duration-300 ${
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
    </motion.div>
  );
};

export default Home; 