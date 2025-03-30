import { Suspense } from "react";

export default function Home() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[var(--background)] text-[var(--foreground)]">
      <Suspense fallback={<div>Loading...</div>}>
        <KliprLoadingAnimation />
      </Suspense>
    </div>
  );
}

function KliprLoadingAnimation() {
  const text = "KLIPR";
  const terminalLines = [
    "Transform your brand's reach with data-driven creativity.",
    "Where innovation meets impact.",
    "Your vision, amplified by our algorithm's precision.",
    "Your Brand, Our Algorithm."
  ];
  
  const delayAfterLogo = 1.5; // seconds of delay after logo animation completes
  const typingDuration = 2; // seconds for each line to type out
  const lineGap = 0.3; // consistent delay between lines
  
  // Calculate delays for each line with equal spacing
  const getLineDelay = (index: number) => {
    return delayAfterLogo + index * (typingDuration + lineGap);
  };
  
  // Calculate when the last line finishes
  const lastLineCompletionTime = getLineDelay(terminalLines.length - 1) + typingDuration;
  // Loading animation starts right after the last line
  const loadingAnimationDelay = lastLineCompletionTime + 0.2;
  // Button appears after loading completes
  const buttonDelay = loadingAnimationDelay + 2;
  
  return (
    <div className="flex flex-col items-center mt-[-10vh]">
      <div className="flex overflow-hidden">
        {Array.from(text).map((letter, index) => (
          <div
            key={index}
            className="text-6xl md:text-8xl font-bold relative custom-font"
            style={{
              animation: `fadeIn 0.8s ease-in-out ${index * 0.05}s forwards`,
              opacity: 0,
              transform: "translateY(20px)",
            }}
          >
            {letter}
          </div>
        ))}
        <div
          className="text-6xl md:text-8xl font-bold relative custom-font"
          style={{
            animation: `fadeIn 0.8s ease-in-out ${text.length * 0.05}s forwards, blink 1s infinite ${text.length * 0.05 + 0.8}s`,
            opacity: 0,
            transform: "translateY(20px)",
          }}
        >
          .
        </div>
      </div>
      
      <div 
        className="mt-24 w-full max-w-[800px] mac-terminal"
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
        <div className="terminal-body">
          {terminalLines.map((line, index) => (
            <div 
              key={index}
              className={`
                terminal-line
                ${index === terminalLines.length - 1 ? 'text-xl md:text-2xl font-bold glow-text' : 'text-md md:text-lg'}
              `}
            >
              <div
                className="flex nowrap overflow-hidden"
                style={{
                  animation: `typeWriter ${typingDuration}s ease-out forwards`,
                  animationDelay: `${getLineDelay(index)}s`,
                  opacity: 0,
                  width: "0%",
                  whiteSpace: "nowrap"
                }}
              >
                <span className="flex-shrink-0">{line}</span>
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
        href="#"
        className="cta-button"
        style={{
          animation: `fadeIn 0.5s ease-out forwards`,
          animationDelay: `${buttonDelay}s`,
          opacity: 0
        }}
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

export function generateMetadata() {
  return {
    title: "KLIPR",
    description: "A modern minimal platform",
  };
}
