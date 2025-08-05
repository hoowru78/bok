import React from 'react';
import { Link } from 'react-router-dom';
import { useAccessibility, VoiceGuide } from '../hooks/useAccessibility';
import { ArrowRight, Users, Heart, Shield, CheckCircle, Phone, Search, FileText } from 'lucide-react';

function HomePage() {
  const { speak } = useAccessibility();

  const features = [
    {
      icon: Search,
      title: '로그인 없이 간편하게',
      description: '복잡한 회원가입 없이 기본 정보만으로 바로 이용하세요.',
    },
    {
      icon: Heart,
      title: '개인 맞춤 추천',
      description: '건강, 생활, 경제 상황을 종합하여 최적의 복지를 추천해드립니다.',
    },
    {
      icon: FileText,
      title: '신청 방법까지 안내',
      description: '복지 정보뿐만 아니라 신청 방법과 담당 기관까지 알려드립니다.',
    },
  ];

  const steps = [
    {
      number: '01',
      title: '기본 정보 입력',
      description: '이름, 생년월일, 거주지 등 간단한 정보를 입력해주세요.',
    },
    {
      number: '02',
      title: '간단한 설문 응답',
      description: '건강 상태, 생활 여건, 경제 상황에 대한 질문에 답해주세요.',
    },
    {
      number: '03',
      title: '맞춤 복지 추천 받기',
      description: 'AI가 분석한 결과를 바탕으로 맞춤 복지를 추천받으세요.',
    },
  ];

  const handleGetStarted = () => {
    speak('복지 추천 서비스를 시작합니다. 기본 정보 입력 페이지로 이동합니다.');
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-primary-50 to-white py-16 md:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <div className="flex justify-center">
              <div className="inline-flex items-center px-4 py-2 bg-primary-100 text-primary-800 rounded-full text-sm font-medium">
                <Users className="w-4 h-4 mr-2" />
                <span>65세 이상 어르신을 위한 서비스</span>
              </div>
            </div>
            
            <div className="space-y-6">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                나에게 딱 맞는
                <br />
                <span className="text-primary-600">복지를 찾아보세요</span>
                <VoiceGuide text="나에게 딱 맞는 복지를 찾아보세요" autoPlay />
              </h1>
              
              <p className="text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
                간단한 질문으로 맞춤 복지를 추천받으세요.
                <br />
                복잡한 절차 없이 쉽고 빠르게 이용하실 수 있습니다.
              </p>
            </div>

            <div className="pt-4">
              <Link
                to="/user-info"
                onClick={handleGetStarted}
                className="inline-flex items-center px-8 py-4 bg-primary-600 hover:bg-primary-700 text-white text-lg font-semibold rounded-lg transition-colors focus:outline-none focus:ring-4 focus:ring-primary-300 shadow-lg hover:shadow-xl transform hover:scale-105 transition-transform"
              >
                <span>지금 시작하기</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
            </div>

            <div className="pt-8 text-sm text-gray-500">
              <div className="flex items-center justify-center space-x-4">
                <div className="flex items-center">
                  <CheckCircle className="w-4 h-4 text-green-500 mr-1" />
                  <span>무료 서비스</span>
                </div>
                <div className="flex items-center">
                  <Shield className="w-4 h-4 text-green-500 mr-1" />
                  <span>개인정보 보호</span>
                </div>
                <div className="flex items-center">
                  <Heart className="w-4 h-4 text-green-500 mr-1" />
                  <span>전문 추천</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-white">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              왜 복지모아인가요?
              <VoiceGuide text="왜 복지모아인가요?" />
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              고령자의 특성을 고려한 맞춤형 복지 추천 서비스입니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:bg-primary-200 transition-colors">
                    <Icon className="w-8 h-8 text-primary-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              이용 방법
              <VoiceGuide text="이용 방법" />
            </h2>
            <p className="text-lg text-gray-600">
              3단계만 거치면 맞춤 복지를 추천받을 수 있습니다.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                {/* 연결선 (데스크톱에서만) */}
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-8 h-0.5 bg-primary-200 transform -translate-y-1/2 z-0" />
                )}
                
                <div className="bg-white rounded-2xl p-8 shadow-sm hover:shadow-md transition-shadow relative z-10">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-primary-600 text-white rounded-xl flex items-center justify-center mx-auto mb-6 text-lg font-bold">
                      {step.number}
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-4">
                      {step.title}
                    </h3>
                    <p className="text-gray-600 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-primary-600">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="space-y-8">
            <h2 className="text-3xl md:text-4xl font-bold text-white">
              지금 바로 시작해보세요
              <VoiceGuide text="지금 바로 시작해보세요" />
            </h2>
            <p className="text-xl text-primary-100 max-w-2xl mx-auto">
              몇 분만 투자하시면 평생 도움이 될 복지 정보를 받아보실 수 있습니다.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/user-info"
                onClick={handleGetStarted}
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 text-lg font-semibold rounded-lg hover:bg-gray-50 transition-colors focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50 shadow-lg"
              >
                <span>복지 추천 받기</span>
                <ArrowRight className="ml-2 w-5 h-5" />
              </Link>
              
              <Link
                to="/help"
                className="inline-flex items-center justify-center px-8 py-4 border-2 border-white text-white text-lg font-semibold rounded-lg hover:bg-white hover:text-primary-600 transition-colors focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
              >
                <Phone className="mr-2 w-5 h-5" />
                <span>도움이 필요해요</span>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section className="py-12 bg-white border-t border-gray-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-8 text-gray-500">
              <div className="flex items-center space-x-2">
                <Shield className="w-5 h-5" />
                <span className="text-sm font-medium">개인정보 보호</span>
              </div>
              <div className="flex items-center space-x-2">
                <CheckCircle className="w-5 h-5" />
                <span className="text-sm font-medium">정부 공인 복지정보</span>
              </div>
              <div className="flex items-center space-x-2">
                <Heart className="w-5 h-5" />
                <span className="text-sm font-medium">접근성 인증</span>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default HomePage;