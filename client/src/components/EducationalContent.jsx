import React, { useState } from 'react';
import { motion } from 'framer-motion';

const EducationalContent = ({ darkMode }) => {
  const [activeTab, setActiveTab] = useState('what');
  
  const tabs = [
    { id: 'what', label: 'What are Deepfakes?' },
    { id: 'how', label: 'How They Work' },
    { id: 'detect', label: 'Detection Process' },
    { id: 'safety', label: 'Stay Safe Online' }
  ];

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    },
    hover: {
      scale: 1.02,
      boxShadow: darkMode ? "0px 10px 20px rgba(79, 70, 229, 0.2)" : "0px 10px 20px rgba(79, 70, 229, 0.1)",
      transition: { duration: 0.3 }
    }
  };

  const tabContentVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.5 }
    }
  };

  const renderTabContent = () => {
    switch(activeTab) {
      case 'what':
        return (
          <motion.div 
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <h3 className={`text-xl font-semibold ${darkMode ? 'text-indigo-300' : 'text-indigo-700'}`}>
              What are Deepfakes?
            </h3>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Deepfakes are synthetic media where a person's likeness is replaced with someone else's using artificial intelligence.
            </p>
            <div className="flex items-center space-x-4 mt-4">
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-indigo-50'} flex-1`}>
                <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Created Using</h4>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Deep learning AI models called Generative Adversarial Networks (GANs)</p>
              </div>
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800' : 'bg-indigo-50'} flex-1`}>
                <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Common Types</h4>
                <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Face swaps, voice cloning, full body manipulation</p>
              </div>
            </div>
            <div className="mt-4 relative">
              <div className={`p-3 rounded-lg ${darkMode ? 'bg-purple-900/30' : 'bg-purple-100'} border-l-4 border-purple-500`}>
                <p className={`text-sm ${darkMode ? 'text-purple-200' : 'text-purple-800'}`}>
                  <strong>Did you know?</strong> The term "deepfake" combines "deep learning" and "fake" and first appeared in 2017.
                </p>
              </div>
            </div>
          </motion.div>
        );
      
      case 'how':
        return (
          <motion.div 
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <h3 className={`text-xl font-semibold ${darkMode ? 'text-indigo-300' : 'text-indigo-700'}`}>
              How Deepfakes Work
            </h3>
            <div className="space-y-6">
              <div className={`flex items-center space-x-3 p-3 rounded-lg ${darkMode ? 'bg-gray-800/70' : 'bg-white'} shadow-sm`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-blue-900' : 'bg-blue-100'}`}>
                  <span className={`font-bold ${darkMode ? 'text-blue-300' : 'text-blue-600'}`}>1</span>
                </div>
                <div>
                  <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Data Collection</h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>AI collects thousands of images/videos of target person</p>
                </div>
              </div>
              
              <div className={`flex items-center space-x-3 p-3 rounded-lg ${darkMode ? 'bg-gray-800/70' : 'bg-white'} shadow-sm`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-green-900' : 'bg-green-100'}`}>
                  <span className={`font-bold ${darkMode ? 'text-green-300' : 'text-green-600'}`}>2</span>
                </div>
                <div>
                  <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Training</h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Neural networks learn facial features and expressions</p>
                </div>
              </div>
              
              <div className={`flex items-center space-x-3 p-3 rounded-lg ${darkMode ? 'bg-gray-800/70' : 'bg-white'} shadow-sm`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-yellow-900' : 'bg-yellow-100'}`}>
                  <span className={`font-bold ${darkMode ? 'text-yellow-300' : 'text-yellow-600'}`}>3</span>
                </div>
                <div>
                  <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Generation</h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>AI generates new synthetic media by mapping learned features</p>
                </div>
              </div>
              
              <div className={`flex items-center space-x-3 p-3 rounded-lg ${darkMode ? 'bg-gray-800/70' : 'bg-white'} shadow-sm`}>
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${darkMode ? 'bg-red-900' : 'bg-red-100'}`}>
                  <span className={`font-bold ${darkMode ? 'text-red-300' : 'text-red-600'}`}>4</span>
                </div>
                <div>
                  <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Refinement</h4>
                  <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>Post-processing to improve realism and hide artifacts</p>
                </div>
              </div>
            </div>
          </motion.div>
        );
      
      case 'detect':
        return (
          <motion.div 
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <h3 className={`text-xl font-semibold ${darkMode ? 'text-indigo-300' : 'text-indigo-700'}`}>
              Detection Process
            </h3>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Our system uses multiple techniques to identify manipulated media:
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800/70' : 'bg-white'} shadow-sm`}>
                <div className={`w-12 h-12 mb-3 rounded-full flex items-center justify-center ${darkMode ? 'bg-indigo-900/50' : 'bg-indigo-100'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                  </svg>
                </div>
                <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Visual Inconsistencies</h4>
                <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Analyzing facial features, lighting, shadows, and reflections for anomalies
                </p>
              </div>
              
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800/70' : 'bg-white'} shadow-sm`}>
                <div className={`w-12 h-12 mb-3 rounded-full flex items-center justify-center ${darkMode ? 'bg-indigo-900/50' : 'bg-indigo-100'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
                  </svg>
                </div>
                <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Digital Fingerprints</h4>
                <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Examining metadata and compression artifacts unique to AI-generated content
                </p>
              </div>
              
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800/70' : 'bg-white'} shadow-sm`}>
                <div className={`w-12 h-12 mb-3 rounded-full flex items-center justify-center ${darkMode ? 'bg-indigo-900/50' : 'bg-indigo-100'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
                  </svg>
                </div>
                <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Neural Analysis</h4>
                <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Deep learning models trained to recognize patterns common in synthetic media
                </p>
              </div>
              
              <div className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800/70' : 'bg-white'} shadow-sm`}>
                <div className={`w-12 h-12 mb-3 rounded-full flex items-center justify-center ${darkMode ? 'bg-indigo-900/50' : 'bg-indigo-100'}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-6 w-6 ${darkMode ? 'text-indigo-300' : 'text-indigo-600'}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
                <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Temporal Analysis</h4>
                <p className={`text-sm mt-1 ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                  Tracking inconsistencies in movement, blinking patterns, and other temporal features
                </p>
              </div>
            </div>
            
            <div className={`mt-4 p-3 rounded-lg ${darkMode ? 'bg-blue-900/30' : 'bg-blue-50'} border-l-4 border-blue-500`}>
              <p className={`text-sm ${darkMode ? 'text-blue-200' : 'text-blue-800'}`}>
                <strong>Note:</strong> No detection system is 100% accurate. Our tool provides a confidence score based on multiple detection methods.
              </p>
            </div>
          </motion.div>
        );
      
      case 'safety':
        return (
          <motion.div 
            variants={tabContentVariants}
            initial="hidden"
            animate="visible"
            className="space-y-4"
          >
            <h3 className={`text-xl font-semibold ${darkMode ? 'text-indigo-300' : 'text-indigo-700'}`}>
              Stay Safe Online
            </h3>
            <p className={`${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
              Protect yourself from deepfakes and misinformation with these tips:
            </p>
            
            <div className="space-y-3 mt-4">
              <motion.div 
                className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800/70' : 'bg-white'} shadow-sm`}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-start">
                  <div className={`mt-1 mr-3 ${darkMode ? 'text-green-400' : 'text-green-500'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Verify Sources</h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Check if content comes from reputable sources before believing or sharing it
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800/70' : 'bg-white'} shadow-sm`}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-start">
                  <div className={`mt-1 mr-3 ${darkMode ? 'text-green-400' : 'text-green-500'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Look for Visual Clues</h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Check for unnatural blinking, facial distortions, or inconsistent lighting
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800/70' : 'bg-white'} shadow-sm`}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-start">
                  <div className={`mt-1 mr-3 ${darkMode ? 'text-green-400' : 'text-green-500'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Use Verification Tools</h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Utilize tools like PixelTruth to analyze suspicious media
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800/70' : 'bg-white'} shadow-sm`}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-start">
                  <div className={`mt-1 mr-3 ${darkMode ? 'text-green-400' : 'text-green-500'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Be Skeptical</h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      If content seems too shocking or unusual, approach it with healthy skepticism
                    </p>
                  </div>
                </div>
              </motion.div>
              
              <motion.div 
                className={`p-4 rounded-lg ${darkMode ? 'bg-gray-800/70' : 'bg-white'} shadow-sm`}
                whileHover={{ scale: 1.01 }}
              >
                <div className="flex items-start">
                  <div className={`mt-1 mr-3 ${darkMode ? 'text-green-400' : 'text-green-500'}`}>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className={`font-medium ${darkMode ? 'text-white' : 'text-gray-900'}`}>Report Suspicious Content</h4>
                    <p className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                      Report potential deepfakes to the platform where you found them
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        );
      
      default:
        return null;
    }
  };

  return (
    <motion.div 
      className={`w-full rounded-2xl ${darkMode ? 'bg-gray-800/40' : 'bg-white/80'} backdrop-blur-md border ${darkMode ? 'border-indigo-500/30' : 'border-white/20'} shadow-xl p-6`}
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      whileHover="hover"
    >
      <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        Understanding Deepfakes
      </h2>
      
      <div className="flex flex-wrap gap-2 mb-6">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
              activeTab === tab.id
                ? darkMode 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-indigo-600 text-white'
                : darkMode
                  ? 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
      
      <div className="mt-6">
        {renderTabContent()}
      </div>
    </motion.div>
  );
};

export default EducationalContent;