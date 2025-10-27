import React, { useState } from 'react';
import { motion } from 'framer-motion';

const InteractiveCards = ({ darkMode }) => {
  const [expandedCard, setExpandedCard] = useState(null);
  
  const cards = [
    {
      id: 'creation',
      title: 'Deepfake Creation',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
        </svg>
      ),
      content: 'Deepfakes are created using AI algorithms called Generative Adversarial Networks (GANs). One network generates fake images while another tries to detect them. Through this process, the system learns to create increasingly realistic fakes.',
      steps: [
        'Collection of source images/videos',
        'Face extraction and alignment',
        'Training the AI model',
        'Generating synthetic media',
        'Post-processing for realism'
      ]
    },
    {
      id: 'detection',
      title: 'Detection Methods',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
        </svg>
      ),
      content: 'Detection systems analyze visual artifacts, inconsistencies in facial features, unnatural blinking patterns, and digital fingerprints left by AI generation. Advanced systems use neural networks trained on thousands of real and fake examples.',
      methods: [
        { name: 'Visual Analysis', accuracy: 75 },
        { name: 'Metadata Examination', accuracy: 60 },
        { name: 'Neural Network Detection', accuracy: 85 },
        { name: 'Biological Signals', accuracy: 70 }
      ]
    },
    {
      id: 'safety',
      title: 'Online Safety',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      content: 'Protecting yourself from deepfakes requires digital literacy and critical thinking. Always verify information from multiple sources, be skeptical of sensational content, and use detection tools when in doubt.',
      tips: [
        'Verify sources before sharing content',
        'Look for visual inconsistencies',
        'Check if other reliable sources report the same information',
        'Use deepfake detection tools',
        'Be extra cautious with sensational or divisive content'
      ]
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const expandedVariants = {
    collapsed: { 
      height: 0,
      opacity: 0,
      transition: { duration: 0.3 }
    },
    expanded: { 
      height: 'auto',
      opacity: 1,
      transition: { duration: 0.4, delay: 0.1 }
    }
  };

  const toggleCard = (id) => {
    if (expandedCard === id) {
      setExpandedCard(null);
    } else {
      setExpandedCard(id);
    }
  };

  return (
    <motion.div
      className="w-full"
      variants={containerVariants}
      initial="hidden"
      animate="visible"
    >
      <h2 className={`text-2xl font-bold mb-6 ${darkMode ? 'text-white' : 'text-gray-800'}`}>
        Interactive Guide
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            className={`rounded-xl ${darkMode ? 'bg-gray-800/60' : 'bg-white/90'} backdrop-blur-md border ${darkMode ? 'border-indigo-500/30' : 'border-gray-200'} shadow-lg overflow-hidden`}
            variants={cardVariants}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
          >
            <div 
              className={`p-6 cursor-pointer ${expandedCard === card.id ? (darkMode ? 'bg-indigo-900/30' : 'bg-indigo-50') : ''}`}
              onClick={() => toggleCard(card.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                  <div className={`${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`}>
                    {card.icon}
                  </div>
                  <h3 className={`text-xl font-semibold ${darkMode ? 'text-white' : 'text-gray-800'}`}>
                    {card.title}
                  </h3>
                </div>
                <div className={`transform transition-transform duration-300 ${expandedCard === card.id ? 'rotate-180' : ''}`}>
                  <svg xmlns="http://www.w3.org/2000/svg" className={`h-5 w-5 ${darkMode ? 'text-indigo-400' : 'text-indigo-600'}`} viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            <motion.div
              variants={expandedVariants}
              initial="collapsed"
              animate={expandedCard === card.id ? "expanded" : "collapsed"}
              className="overflow-hidden"
            >
              <div className={`p-6 pt-0 ${darkMode ? 'text-gray-300' : 'text-gray-700'}`}>
                <p className="mb-4">{card.content}</p>
                
                {card.steps && (
                  <div className="mt-4">
                    <h4 className={`font-medium mb-2 ${darkMode ? 'text-indigo-300' : 'text-indigo-700'}`}>Process:</h4>
                    <ol className="list-decimal list-inside space-y-1">
                      {card.steps.map((step, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + (index * 0.1) }}
                          className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}
                        >
                          {step}
                        </motion.li>
                      ))}
                    </ol>
                  </div>
                )}
                
                {card.methods && (
                  <div className="mt-4">
                    <h4 className={`font-medium mb-3 ${darkMode ? 'text-indigo-300' : 'text-indigo-700'}`}>Detection Methods:</h4>
                    <div className="space-y-3">
                      {card.methods.map((method, index) => (
                        <motion.div 
                          key={index}
                          initial={{ opacity: 0, width: 0 }}
                          animate={{ opacity: 1, width: '100%' }}
                          transition={{ delay: 0.2 + (index * 0.1), duration: 0.5 }}
                        >
                          <div className="flex justify-between mb-1">
                            <span className={`text-sm ${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{method.name}</span>
                            <span className={`text-sm font-medium ${darkMode ? 'text-indigo-300' : 'text-indigo-700'}`}>{method.accuracy}%</span>
                          </div>
                          <div className={`w-full h-2 rounded-full ${darkMode ? 'bg-gray-700' : 'bg-gray-200'}`}>
                            <motion.div 
                              className={`h-2 rounded-full ${darkMode ? 'bg-indigo-500' : 'bg-indigo-600'}`}
                              initial={{ width: 0 }}
                              animate={{ width: `${method.accuracy}%` }}
                              transition={{ delay: 0.3 + (index * 0.1), duration: 0.8, ease: "easeOut" }}
                            />
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
                
                {card.tips && (
                  <div className="mt-4">
                    <h4 className={`font-medium mb-2 ${darkMode ? 'text-indigo-300' : 'text-indigo-700'}`}>Safety Tips:</h4>
                    <ul className="space-y-2">
                      {card.tips.map((tip, index) => (
                        <motion.li 
                          key={index}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: 0.2 + (index * 0.1) }}
                          className="flex items-start"
                        >
                          <div className={`mt-1 mr-2 ${darkMode ? 'text-green-400' : 'text-green-500'}`}>
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                            </svg>
                          </div>
                          <span className={`${darkMode ? 'text-gray-400' : 'text-gray-600'}`}>{tip}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

export default InteractiveCards;