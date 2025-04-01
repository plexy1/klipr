'use client';

import { Suspense, useState, MouseEvent } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";

export default function Home() {
  const router = useRouter();
  const [showTransition, setShowTransition] = useState(false);
  
  const handleBoostClick = (e: MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    setShowTransition(true);
    
    // Navigate after animation plays
    setTimeout(() => {
      router.push('/boost');
    }, 1700); // Slightly longer than the animation duration
  };
  
  const terminalLines = [
    "Transform your brand's reach with data-driven creativity.",
    "Where innovation meets impact.",
    "Your vision, amplified by our algorithm's precision.",
    "Your Brand, Our Algorithm."
  ];
  
  const delayAfterLogo = 0.8; // seconds of delay after logo animation completes (reduced from 1.5)
  const typingDurationFast = 0.8; // faster typing for first three lines (reduced from 1.2)
  const typingDurationNormal = 1.2; // normal typing for last line (reduced from 2)
  const lineGap = 0.2; // consistent delay between lines (reduced from 0.3)
  
  // Calculate delays for each line with equal spacing but faster typing for first three lines
  const getLineDelay = (index: number) => {
    // Calculate total time for each previous line (typing + gap)
    let totalDelay = delayAfterLogo;
    
    for (let i = 0; i < index; i++) {
      // Last line uses normal typing duration, others use fast
      const duration = i === 3 ? typingDurationNormal : typingDurationFast;
      totalDelay += duration + lineGap;
    }
    
    return totalDelay;
  };
  
  // Get typing duration based on line index
  const getTypingDuration = (index: number) => {
    return index === terminalLines.length - 1 ? typingDurationNormal : typingDurationFast;
  };
  
  // Calculate when the last line finishes
  const lastLineCompletionTime = getLineDelay(terminalLines.length - 1) + typingDurationNormal;
  // Loading animation starts right after the last line
  const loadingAnimationDelay = lastLineCompletionTime + 0.2;
  // Button appears after loading completes
  const buttonDelay = loadingAnimationDelay + 2;
  
  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--background)] text-[var(--foreground)] overflow-hidden">
      <Suspense fallback={<div>Loading...</div>}>
        <KliprLoadingAnimation 
          terminalLines={terminalLines}
          getLineDelay={getLineDelay}
          getTypingDuration={getTypingDuration}
          delayAfterLogo={delayAfterLogo}
          loadingAnimationDelay={loadingAnimationDelay}
          buttonDelay={buttonDelay}
          handleBoostClick={handleBoostClick}
        />
        
        {/* Page Transition Animation */}
        {showTransition && (
          <div className="fixed inset-0 z-50 bg-[var(--background)] flex items-center justify-center overflow-hidden">
            <div className="w-full max-w-[1000px] px-4">
              <div className="mac-terminal">
                <div className="terminal-header">
                  <div className="terminal-buttons">
                    <span className="terminal-button close"></span>
                    <span className="terminal-button minimize"></span>
                    <span className="terminal-button maximize"></span>
                  </div>
                  <div className="terminal-title">klipr@terminal ~ %</div>
                </div>
                <div className="terminal-body py-6 sm:py-8 mobile-terminal-body">
                  <div className="terminal-line">
                    <div className="terminal-text-container">
                      <span className="text-[var(--terminal-text)]">% Loading boost page...</span>
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="progress-bar">
                      <div className="progress-fill fast-fill"></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </Suspense>
    </div>
  );
}

interface KliprLoadingAnimationProps {
  terminalLines: string[];
  getLineDelay: (index: number) => number;
  getTypingDuration: (index: number) => number;
  delayAfterLogo: number;
  loadingAnimationDelay: number;
  buttonDelay: number;
  handleBoostClick: (e: MouseEvent<HTMLAnchorElement>) => void;
}

function KliprLoadingAnimation({ 
  terminalLines, 
  getLineDelay, 
  getTypingDuration, 
  delayAfterLogo, 
  loadingAnimationDelay, 
  buttonDelay,
  handleBoostClick
}: KliprLoadingAnimationProps) {
  return (
    <div className="flex flex-col items-center mt-[-5vh] sm:mt-[-10vh] px-4 sm:px-0 w-full mobile-container">
      {/* KLIPR Logo */}
      <div className="flex flex-col items-center">
        <div 
          className="animation-container flex flex-col items-center"
          style={{
            animation: `fadeIn 0.8s ease-out forwards`,
            opacity: 0,
            transform: "translateY(20px)",
          }}
        >
          <Image 
            src="/klipr-logo.png" 
            alt="KLIPR Media Logo" 
            width={256}
            height={256}
            className="w-48 md:w-64 mt-12"
          />
        </div>
      </div>
      
      {/* Terminal Window */}
      <div 
        className="mt-12 w-full sm:max-w-[1000px] mac-terminal"
        style={{
          animation: `fadeIn 0.8s ease-out forwards`,
          animationDelay: `${delayAfterLogo - 0.3}s`,
          opacity: 0
        }}
      >
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="terminal-button close"></span>
            <span className="terminal-button minimize"></span>
            <span className="terminal-button maximize"></span>
          </div>
          <div className="terminal-title">klipr@terminal ~ %</div>
        </div>
        <div className="terminal-body mobile-terminal-body">
          {terminalLines.map((line, index) => (
            <div 
              key={index}
              className={`
                terminal-line
                ${index === terminalLines.length - 1 ? 'text-lg sm:text-xl md:text-2xl font-bold glow-text' : 'text-sm sm:text-md md:text-lg'}
              `}
            >
              <div
                className="terminal-text-container"
                style={{
                  animation: `typeWriter ${getTypingDuration(index)}s ease-out forwards`,
                  animationDelay: `${getLineDelay(index)}s`,
                  opacity: 0,
                  width: "0%",
                  overflow: "hidden"
                }}
              >
                {line}
              </div>
            </div>
          ))}
          
          {/* Terminal loading animation */}
          <div 
            className="terminal-line mt-4"
            style={{
              animation: `fadeIn 0.3s ease-out forwards`,
              animationDelay: `${loadingAnimationDelay}s`,
              opacity: 0
            }}
          >
            <div className="terminal-loader">
              <span className="loader-text">Analyzing brand potential</span>
              <div className="progress-bar">
                <div 
                  className="progress-fill"
                  style={{
                    animation: `progressFill 1.5s ease-in-out forwards`,
                    animationDelay: `${loadingAnimationDelay + 0.3}s`
                  }}
                ></div>
              </div>
              <div 
                className="success-message"
                style={{
                  animation: `fadeIn 0.5s ease-out forwards`,
                  animationDelay: `${loadingAnimationDelay + 1.8}s`,
                  opacity: 0
                }}
              >
                Success! Brand boost ready.
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* CTA Button */}
      <a
        href="/boost"
        className="btn-primary mt-8 sm:mt-12"
        style={{
          animation: `fadeIn 0.5s ease-out forwards`,
          animationDelay: `${buttonDelay}s`,
          opacity: 0
        }}
        onClick={handleBoostClick}
      >
        BOOST YOUR BRAND
      </a>
      
      {/* Copyright */}
      <div 
        className="copyright-text"
        style={{
          animation: `fadeIn 0.5s ease-out forwards`,
          animationDelay: `${buttonDelay + 0.2}s`,
          opacity: 0
        }}
      >
        © KLIPR media
      </div>
    </div>
  );
}
