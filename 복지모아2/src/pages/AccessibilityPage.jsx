import React from 'react';
import { Link } from 'react-router-dom';
import { useAccessibility, VoiceGuide } from '../hooks/useAccessibility';
import { Settings, Type, Eye, Volume2, ArrowLeft, CheckCircle } from 'lucide-react';

function AccessibilityPage() {
  const { fontSize, setFontSize, highContrast, setHighContrast, voiceGuide, setVoiceGuide } = useAccessibility();

  const accessibilityFeatures = [
    {
      icon: Type,
      title: '글자 크기 조절',
      description: '읽기 편한 크기로 글자를 조정할 수 있습니다.',
      status: 'active'
    },
    {
      icon: Eye,
      title: '고대비 모드',
      description: '시각적 대비를 높여 가독성을 개선합니다.',
      status: 'active'
    },
    {
      icon: Volume2,
      title: '음성 안내',
      description: '화면의 내용을 음성으로 읽어드립니다.',
      status: 'active'
    }
  ];

  const wcagCompliance = [
    {
      level: 'A',
      items: [
        '모든 이미지에 대체 텍스트 제공',
        '키보드만으로 모든 기능 사용 가능',
        '색상에만 의존하지 않는 정보 전달',
        '자동 재생되는 오디오/비디오 없음'
      ]
    },
    {
      level: 'AA',
      items: [
        '텍스트와 배경의 대비비 4.5:1 이상',
        '200%까지 텍스트 확대 가능',
        '명확한 포커스 표시',
        '논리적인 헤딩 구조 (H1-H6)'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 뒤로가기 */}
        <div className="mb-8">
          <Link
            to="/"
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>홈으로 돌아가기</span>
          </Link>
        </div>

        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Settings className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            접근성 설정
            <VoiceGuide text="접근성 설정" autoPlay />
          </h1>
          <p className="text-lg text-gray-600">
            모든 사용자가 편리하게 이용할 수 있도록 접근성 기능을 제공합니다.
          </p>
        </div>

        {/* 접근성 설정 패널 */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">개인 맞춤 설정</h2>
          
          <div className="space-y-8">
            {/* 글자 크기 설정 */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Type className="w-6 h-6 text-primary-600" />
                <h3 className="text-xl font-semibold text-gray-900">글자 크기</h3>
              </div>
              <p className="text-gray-600 mb-4">
                읽기 편한 크기로 글자를 조정하세요. 현재 설정: <strong>{fontSize === 'default' ? '기본' : fontSize === 'large' ? '확대1' : '확대2'}</strong>
              </p>
              
              <div className="flex flex-wrap gap-3">
                {[
                  { value: 'default', label: '기본 크기', example: '16px' },
                  { value: 'large', label: '확대 1단계', example: '18px' },
                  { value: 'extra-large', label: '확대 2단계', example: '20px' }
                ].map((option) => (
                  <button
                    key={option.value}
                    onClick={() => setFontSize(option.value)}
                    className={`px-6 py-4 text-left border-2 rounded-lg transition-colors ${
                      fontSize === option.value
                        ? 'border-primary-500 bg-primary-50 text-primary-700'
                        : 'border-gray-300 bg-white text-gray-700 hover:border-gray-400'
                    }`}
                  >
                    <div className="font-semibold">{option.label}</div>
                    <div className="text-sm text-gray-500">{option.example}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* 고대비 모드 설정 */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Eye className="w-6 h-6 text-primary-600" />
                <h3 className="text-xl font-semibold text-gray-900">고대비 모드</h3>
              </div>
              <p className="text-gray-600 mb-4">
                시각적 대비를 높여 텍스트와 배경을 더 명확하게 구분할 수 있습니다.
              </p>
              
              <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-900">고대비 모드 {highContrast ? '켜짐' : '꺼짐'}</div>
                  <div className="text-sm text-gray-600">
                    {highContrast ? '현재 고대비 모드가 활성화되어 있습니다.' : '일반 모드로 표시됩니다.'}
                  </div>
                </div>
                
                <button
                  onClick={() => setHighContrast(!highContrast)}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                    highContrast ? 'bg-primary-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      highContrast ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>

            {/* 음성 안내 설정 */}
            <div>
              <div className="flex items-center space-x-3 mb-4">
                <Volume2 className="w-6 h-6 text-primary-600" />
                <h3 className="text-xl font-semibold text-gray-900">음성 안내</h3>
              </div>
              <p className="text-gray-600 mb-4">
                화면의 주요 내용을 음성으로 읽어드립니다. 스피커나 헤드폰을 준비해주세요.
              </p>
              
              <div className="flex items-center justify-between p-4 border border-gray-300 rounded-lg">
                <div>
                  <div className="font-semibold text-gray-900">음성 안내 {voiceGuide ? '켜짐' : '꺼짐'}</div>
                  <div className="text-sm text-gray-600">
                    {voiceGuide ? '페이지 내용을 음성으로 안내합니다.' : '음성 안내가 비활성화되어 있습니다.'}
                  </div>
                </div>
                
                <button
                  onClick={() => setVoiceGuide(!voiceGuide)}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300 ${
                    voiceGuide ? 'bg-primary-600' : 'bg-gray-300'
                  }`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      voiceGuide ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 접근성 기능 소개 */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">제공되는 접근성 기능</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {accessibilityFeatures.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center">
                  <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-green-600" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 text-sm">
                    {feature.description}
                  </p>
                  {feature.status === 'active' && (
                    <div className="flex items-center justify-center mt-2">
                      <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                      <span className="text-sm text-green-600 font-medium">사용 가능</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* 웹 접근성 준수 사항 */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">웹 접근성 준수 현황</h2>
          <p className="text-gray-600 mb-6">
            복지모아는 웹 콘텐츠 접근성 지침(WCAG 2.2)을 준수하여 개발되었습니다.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {wcagCompliance.map((level, index) => (
              <div key={index}>
                <div className="flex items-center space-x-2 mb-4">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                    level.level === 'A' ? 'bg-green-500' : 'bg-blue-500'
                  }`}>
                    {level.level}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900">
                    WCAG 2.2 레벨 {level.level}
                  </h3>
                </div>
                
                <ul className="space-y-2">
                  {level.items.map((item, itemIndex) => (
                    <li key={itemIndex} className="flex items-start space-x-2">
                      <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-600">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* 추가 도움 */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            접근성 관련 문의
          </h3>
          <p className="text-blue-700 mb-4">
            접근성 기능 사용에 어려움이 있으시거나 추가 기능이 필요하시면 연락주세요.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/help/contact"
              className="btn-primary flex items-center justify-center"
            >
              접근성 상담받기
            </Link>
            
            <a
              href="mailto:accessibility@bokjimoa.kr"
              className="btn-secondary flex items-center justify-center"
            >
              접근성 개선 제안
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AccessibilityPage;