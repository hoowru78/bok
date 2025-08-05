import React, { createContext, useContext, useState, useEffect } from 'react';

const AccessibilityContext = createContext();

export function AccessibilityProvider({ children }) {
  const [fontSize, setFontSize] = useState('default');
  const [highContrast, setHighContrast] = useState(false);
  const [voiceGuide, setVoiceGuide] = useState(false);

  // 로컬 스토리지에서 설정 불러오기
  useEffect(() => {
    const savedFontSize = localStorage.getItem('accessibility-font-size');
    const savedHighContrast = localStorage.getItem('accessibility-high-contrast');
    const savedVoiceGuide = localStorage.getItem('accessibility-voice-guide');

    if (savedFontSize) setFontSize(savedFontSize);
    if (savedHighContrast) setHighContrast(savedHighContrast === 'true');
    if (savedVoiceGuide) setVoiceGuide(savedVoiceGuide === 'true');
  }, []);

  // 글자 크기 변경
  useEffect(() => {
    document.documentElement.className = `font-size-${fontSize}`;
    localStorage.setItem('accessibility-font-size', fontSize);
  }, [fontSize]);

  // 고대비 모드 변경
  useEffect(() => {
    if (highContrast) {
      document.body.classList.add('high-contrast');
    } else {
      document.body.classList.remove('high-contrast');
    }
    localStorage.setItem('accessibility-high-contrast', highContrast.toString());
  }, [highContrast]);

  // 음성 안내 설정 저장
  useEffect(() => {
    localStorage.setItem('accessibility-voice-guide', voiceGuide.toString());
  }, [voiceGuide]);

  // 음성 읽기 함수
  const speak = (text) => {
    if (!voiceGuide || !('speechSynthesis' in window)) return;
    
    // 기존 음성 중지
    speechSynthesis.cancel();
    
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'ko-KR';
    utterance.rate = 0.8;
    utterance.pitch = 1;
    utterance.volume = 1;
    
    speechSynthesis.speak(utterance);
  };

  // 음성 중지 함수
  const stopSpeaking = () => {
    speechSynthesis.cancel();
  };

  const value = {
    fontSize,
    setFontSize,
    highContrast,
    setHighContrast,
    voiceGuide,
    setVoiceGuide,
    speak,
    stopSpeaking
  };

  return (
    <AccessibilityContext.Provider value={value}>
      {children}
    </AccessibilityContext.Provider>
  );
}

export function useAccessibility() {
  const context = useContext(AccessibilityContext);
  if (!context) {
    throw new Error('useAccessibility must be used within an AccessibilityProvider');
  }
  return context;
}

// 음성 안내 컴포넌트
export function VoiceGuide({ text, autoPlay = false, className = "" }) {
  const { speak, voiceGuide } = useAccessibility();

  useEffect(() => {
    if (autoPlay && voiceGuide) {
      const timer = setTimeout(() => speak(text), 100);
      return () => clearTimeout(timer);
    }
  }, [text, autoPlay, voiceGuide, speak]);

  if (!voiceGuide) return null;

  return (
    <button
      onClick={() => speak(text)}
      className={`p-2 text-primary-600 hover:text-primary-700 focus:outline-none focus:ring-2 focus:ring-primary-300 rounded ${className}`}
      aria-label="음성으로 듣기"
      title="음성으로 듣기"
    >
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
        <path fillRule="evenodd" d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.617.797l-4.383-3.5H2a1 1 0 01-1-1V7a1 1 0 011-1h2l4.383-3.5a1 1 0 011.617.797zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.984 5.984 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.984 3.984 0 0013 10a3.983 3.983 0 00-1.172-2.828 1 1 0 010-1.415z" clipRule="evenodd" />
      </svg>
    </button>
  );
}