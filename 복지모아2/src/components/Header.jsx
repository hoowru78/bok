import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAccessibility } from '../hooks/useAccessibility';
import { Menu, X, Settings, Home, HelpCircle } from 'lucide-react';

function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [accessibilityMenuOpen, setAccessibilityMenuOpen] = useState(false);
  const location = useLocation();
  const { fontSize, setFontSize, highContrast, setHighContrast, voiceGuide, setVoiceGuide } = useAccessibility();

  const navigation = [
    { name: '홈', href: '/', icon: Home },
    { name: '도움말', href: '/help', icon: HelpCircle },
  ];

  const isCurrentPath = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* 로고 */}
          <div className="flex items-center space-x-4">
            <Link to="/" className="flex items-center space-x-3 focus:outline-none focus:ring-2 focus:ring-primary-300 rounded-lg p-1">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">복</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">복지모아</h1>
            </Link>
          </div>

          {/* 데스크톱 네비게이션 */}
          <nav className="hidden md:flex space-x-8">
            {navigation.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isCurrentPath(item.href)
                      ? 'text-primary-600 bg-primary-50'
                      : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}
          </nav>

          {/* 접근성 설정 버튼 */}
          <div className="flex items-center space-x-2">
            <div className="relative">
              <button
                onClick={() => setAccessibilityMenuOpen(!accessibilityMenuOpen)}
                className="p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
                aria-label="접근성 설정"
                title="접근성 설정"
              >
                <Settings className="w-5 h-5" />
              </button>

              {/* 접근성 설정 드롭다운 */}
              {accessibilityMenuOpen && (
                <div className="absolute right-0 mt-2 w-80 bg-white border border-gray-200 rounded-lg shadow-lg z-50">
                  <div className="p-4 border-b border-gray-100">
                    <h3 className="font-semibold text-gray-900">접근성 설정</h3>
                  </div>
                  
                  <div className="p-4 space-y-4">
                    {/* 글자 크기 */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        글자 크기
                      </label>
                      <div className="flex space-x-2">
                        {[
                          { value: 'default', label: '기본' },
                          { value: 'large', label: '확대1' },
                          { value: 'extra-large', label: '확대2' }
                        ].map((option) => (
                          <button
                            key={option.value}
                            onClick={() => setFontSize(option.value)}
                            className={`px-3 py-2 text-sm rounded-lg border transition-colors ${
                              fontSize === option.value
                                ? 'bg-primary-600 text-white border-primary-600'
                                : 'bg-white text-gray-700 border-gray-300 hover:bg-gray-50'
                            }`}
                          >
                            {option.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* 고대비 모드 */}
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700">
                        고대비 모드
                      </label>
                      <button
                        onClick={() => setHighContrast(!highContrast)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                          highContrast ? 'bg-primary-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            highContrast ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>

                    {/* 음성 안내 */}
                    <div className="flex items-center justify-between">
                      <label className="text-sm font-medium text-gray-700">
                        음성 안내
                      </label>
                      <button
                        onClick={() => setVoiceGuide(!voiceGuide)}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                          voiceGuide ? 'bg-primary-600' : 'bg-gray-200'
                        }`}
                      >
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${
                            voiceGuide ? 'translate-x-6' : 'translate-x-1'
                          }`}
                        />
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* 모바일 메뉴 버튼 */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-300"
              aria-label="메뉴"
            >
              {mobileMenuOpen ? (
                <X className="w-5 h-5" />
              ) : (
                <Menu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>

        {/* 모바일 메뉴 */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t border-gray-200">
            <div className="py-2 space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon;
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center space-x-3 px-3 py-3 text-base font-medium transition-colors ${
                      isCurrentPath(item.href)
                        ? 'text-primary-600 bg-primary-50'
                        : 'text-gray-700 hover:text-primary-600 hover:bg-gray-50'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.name}</span>
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* 접근성 설정 오버레이 (모바일에서 드롭다운 닫기용) */}
      {accessibilityMenuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setAccessibilityMenuOpen(false)}
        />
      )}
    </header>
  );
}

export default Header;