import React from 'react';
import { Routes, Route, Link, useLocation } from 'react-router-dom';
import { useAccessibility, VoiceGuide } from '../hooks/useAccessibility';
import { HelpCircle, Phone, Mail, MessageSquare, FileText, Users, Shield } from 'lucide-react';

function HelpPage() {
  return (
    <Routes>
      <Route path="/" element={<HelpHome />} />
      <Route path="/guide" element={<GuideHelp />} />
      <Route path="/faq" element={<FAQHelp />} />
      <Route path="/contact" element={<ContactHelp />} />
    </Routes>
  );
}

function HelpHome() {
  const { speak } = useAccessibility();
  
  const helpCategories = [
    {
      icon: FileText,
      title: '사용법 안내',
      description: '복지모아 이용 방법을 단계별로 설명해드립니다.',
      href: '/help/guide',
      color: 'text-blue-600 bg-blue-100'
    },
    {
      icon: MessageSquare,
      title: '자주 묻는 질문',
      description: '자주 묻는 질문과 답변을 확인해보세요.',
      href: '/help/faq',
      color: 'text-green-600 bg-green-100'
    },
    {
      icon: Phone,
      title: '전문가 상담',
      description: '복지 전문가와 직접 상담받으실 수 있습니다.',
      href: '/help/contact',
      color: 'text-purple-600 bg-purple-100'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <HelpCircle className="w-8 h-8 text-primary-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            도움말
            <VoiceGuide text="도움말" autoPlay />
          </h1>
          <p className="text-lg text-gray-600">
            복지모아 이용에 도움이 필요하시면 언제든 문의해주세요.
          </p>
        </div>

        {/* 도움말 카테고리 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {helpCategories.map((category, index) => {
            const Icon = category.icon;
            return (
              <Link
                key={index}
                to={category.href}
                className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6 group"
              >
                <div className={`w-12 h-12 ${category.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {category.title}
                </h3>
                <p className="text-gray-600">
                  {category.description}
                </p>
              </Link>
            );
          })}
        </div>

        {/* 긴급 연락처 */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6">
          <div className="text-center">
            <h2 className="text-xl font-bold text-red-800 mb-4">긴급 상황이신가요?</h2>
            <p className="text-red-700 mb-6">
              복지 관련 긴급한 도움이 필요하시면 즉시 연락주세요.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="tel:1588-0000"
                className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-6 rounded-lg flex items-center justify-center transition-colors"
              >
                <Phone className="w-5 h-5 mr-2" />
                긴급 상담전화: 1588-0000
              </a>
              
              <a
                href="tel:129"
                className="bg-white border-2 border-red-600 text-red-600 hover:bg-red-50 font-semibold py-3 px-6 rounded-lg flex items-center justify-center transition-colors"
              >
                <Shield className="w-5 h-5 mr-2" />
                복지신고: 129
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function GuideHelp() {
  const steps = [
    {
      title: '1. 기본 정보 입력',
      description: '이름, 생년월일, 거주지 등 간단한 정보를 입력합니다.',
      details: [
        '만 65세 이상만 이용 가능합니다.',
        '정확한 거주지 입력이 지역별 복지 추천에 중요합니다.',
        '입력된 정보는 1년 후 자동 삭제됩니다.'
      ]
    },
    {
      title: '2. 설문 응답',
      description: '건강, 생활, 경제 상황에 대한 질문에 답합니다.',
      details: [
        '총 3단계 설문으로 구성되어 있습니다.',
        '정확한 답변이 더 나은 추천으로 이어집니다.',
        '응답은 자동으로 저장되어 중간에 나가도 이어서 할 수 있습니다.'
      ]
    },
    {
      title: '3. 추천 결과 확인',
      description: 'AI가 분석한 맞춤 복지 목록을 확인합니다.',
      details: [
        '매칭도 순으로 복지가 정렬됩니다.',
        '각 복지의 상세 정보와 신청 방법을 제공합니다.',
        '결과를 저장하거나 공유할 수 있습니다.'
      ]
    },
    {
      title: '4. 복지 신청',
      description: '관심 있는 복지의 신청 방법을 확인하고 신청합니다.',
      details: [
        '온라인, 전화, 방문 신청 방법을 안내합니다.',
        '필요 서류 목록을 제공합니다.',
        '담당 기관 연락처를 확인할 수 있습니다.'
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/help"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            ← 도움말로 돌아가기
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            사용법 안내
            <VoiceGuide text="사용법 안내" autoPlay />
          </h1>
          <p className="text-lg text-gray-600">
            복지모아를 처음 사용하시는 분들을 위한 단계별 이용 가이드입니다.
          </p>
        </div>

        <div className="space-y-8">
          {steps.map((step, index) => (
            <div key={index} className="bg-white rounded-2xl shadow-sm p-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-12 h-12 bg-primary-600 text-white rounded-xl flex items-center justify-center text-lg font-bold">
                  {index + 1}
                </div>
                
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 mb-4">
                    {step.description}
                  </p>
                  
                  <ul className="space-y-2">
                    {step.details.map((detail, detailIndex) => (
                      <li key={detailIndex} className="flex items-start space-x-2">
                        <span className="w-1.5 h-1.5 bg-primary-600 rounded-full mt-2 flex-shrink-0"></span>
                        <span className="text-gray-600">{detail}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* 추가 도움 */}
        <div className="mt-12 bg-blue-50 border border-blue-200 rounded-2xl p-6 text-center">
          <h3 className="text-lg font-semibold text-blue-900 mb-3">
            더 자세한 도움이 필요하신가요?
          </h3>
          <p className="text-blue-700 mb-4">
            이용 중 어려움이 있으시면 언제든 전문가 상담을 받으실 수 있습니다.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              to="/help/contact"
              className="btn-primary flex items-center justify-center"
            >
              <Phone className="w-4 h-4 mr-2" />
              전문가 상담
            </Link>
            
            <Link
              to="/help/faq"
              className="btn-secondary flex items-center justify-center"
            >
              <MessageSquare className="w-4 h-4 mr-2" />
              자주 묻는 질문
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

function FAQHelp() {
  const faqs = [
    {
      category: '서비스 이용',
      questions: [
        {
          q: '복지모아는 무료로 이용할 수 있나요?',
          a: '네, 복지모아는 완전 무료 서비스입니다. 복지 추천부터 신청 안내까지 모든 서비스를 무료로 제공합니다.'
        },
        {
          q: '만 65세 미만도 이용할 수 있나요?',
          a: '현재 복지모아는 만 65세 이상 어르신을 위한 서비스로 제한하고 있습니다. 향후 서비스 확장을 검토하고 있습니다.'
        },
        {
          q: '회원가입이 필요한가요?',
          a: '아니요, 회원가입 없이 이용하실 수 있습니다. 이름, 생년월일, 거주지만 입력하시면 바로 이용 가능합니다.'
        }
      ]
    },
    {
      category: '개인정보 보호',
      questions: [
        {
          q: '입력한 개인정보는 안전한가요?',
          a: '입력하신 모든 개인정보는 AES-256 암호화로 안전하게 보호됩니다. 또한 1년 후 자동으로 삭제됩니다.'
        },
        {
          q: '개인정보가 다른 용도로 사용되나요?',
          a: '절대 그렇지 않습니다. 입력하신 정보는 오직 복지 추천을 위해서만 사용되며, 제3자에게 제공되지 않습니다.'
        }
      ]
    },
    {
      category: '복지 추천',
      questions: [
        {
          q: '추천받은 복지를 반드시 신청해야 하나요?',
          a: '아니요, 추천 결과는 참고용입니다. 본인에게 적합하다고 판단되는 복지만 선택적으로 신청하시면 됩니다.'
        },
        {
          q: '추천 결과가 부정확할 수 있나요?',
          a: '복지모아는 정부 공식 복지 정보를 기반으로 추천하지만, 최종 신청 자격은 해당 기관에서 확인해주세요.'
        },
        {
          q: '지역별로 다른 복지를 추천받을 수 있나요?',
          a: '네, 거주지 정보를 바탕으로 전국 단위 복지와 지역별 복지를 모두 고려하여 추천해드립니다.'
        }
      ]
    },
    {
      category: '기술 지원',
      questions: [
        {
          q: '사이트가 느리거나 오류가 발생하면 어떻게 하나요?',
          a: '브라우저를 새로고침하거나 다른 브라우저를 사용해보세요. 문제가 지속되면 고객센터로 연락주세요.'
        },
        {
          q: '스마트폰에서도 이용할 수 있나요?',
          a: '네, 복지모아는 데스크톱, 태블릿, 스마트폰 모든 기기에서 이용하실 수 있습니다.'
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/help"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            ← 도움말로 돌아가기
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            자주 묻는 질문
            <VoiceGuide text="자주 묻는 질문" autoPlay />
          </h1>
          <p className="text-lg text-gray-600">
            복지모아 이용자들이 자주 묻는 질문과 답변입니다.
          </p>
        </div>

        <div className="space-y-8">
          {faqs.map((category, categoryIndex) => (
            <div key={categoryIndex} className="bg-white rounded-2xl shadow-sm p-6">
              <h2 className="text-xl font-bold text-gray-900 mb-6 pb-2 border-b border-gray-200">
                {category.category}
              </h2>
              
              <div className="space-y-6">
                {category.questions.map((faq, faqIndex) => (
                  <div key={faqIndex}>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">
                      Q. {faq.q}
                    </h3>
                    <p className="text-gray-600 leading-relaxed pl-4 border-l-4 border-primary-200">
                      A. {faq.a}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* 추가 문의 */}
        <div className="mt-12 bg-primary-50 border border-primary-200 rounded-2xl p-6 text-center">
          <h3 className="text-lg font-semibold text-primary-900 mb-3">
            원하는 답변을 찾지 못하셨나요?
          </h3>
          <p className="text-primary-700 mb-4">
            추가 질문이 있으시면 언제든 연락주세요. 친절하게 답변해드리겠습니다.
          </p>
          
          <Link
            to="/help/contact"
            className="btn-primary flex items-center justify-center mx-auto max-w-xs"
          >
            <Mail className="w-4 h-4 mr-2" />
            문의하기
          </Link>
        </div>
      </div>
    </div>
  );
}

function ContactHelp() {
  const contactMethods = [
    {
      icon: Phone,
      title: '전화 상담',
      description: '복지 전문가와 직접 통화',
      contact: '1588-0000',
      hours: '평일 09:00 - 18:00',
      action: 'tel:1588-0000'
    },
    {
      icon: Mail,
      title: '이메일 문의',
      description: '자세한 문의사항을 메일로',
      contact: 'contact@bokjimoa.kr',
      hours: '24시간 접수, 1일 내 답변',
      action: 'mailto:contact@bokjimoa.kr'
    },
    {
      icon: MessageSquare,
      title: '온라인 상담',
      description: '실시간 채팅 상담',
      contact: '카카오톡 채널',
      hours: '평일 09:00 - 18:00',
      action: 'https://pf.kakao.com/복지모아'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Link
            to="/help"
            className="text-primary-600 hover:text-primary-700 font-medium"
          >
            ← 도움말로 돌아가기
          </Link>
        </div>

        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            전문가 상담
            <VoiceGuide text="전문가 상담" autoPlay />
          </h1>
          <p className="text-lg text-gray-600">
            복지 전문가가 친절하게 상담해드립니다. 편리한 방법으로 연락주세요.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {contactMethods.map((method, index) => {
            const Icon = method.icon;
            return (
              <div key={index} className="bg-white rounded-2xl shadow-sm p-6 text-center">
                <div className="w-16 h-16 bg-primary-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Icon className="w-8 h-8 text-primary-600" />
                </div>
                
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  {method.title}
                </h3>
                <p className="text-gray-600 mb-4">
                  {method.description}
                </p>
                
                <div className="mb-4">
                  <p className="font-semibold text-gray-900">{method.contact}</p>
                  <p className="text-sm text-gray-600">{method.hours}</p>
                </div>
                
                <a
                  href={method.action}
                  className="w-full btn-primary flex items-center justify-center"
                >
                  <Icon className="w-4 h-4 mr-2" />
                  연결하기
                </a>
              </div>
            );
          })}
        </div>

        {/* 상담 안내사항 */}
        <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
          <h2 className="text-xl font-bold text-gray-900 mb-4">상담 시 준비사항</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">준비해주세요</h3>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-600">기본 정보 (이름, 나이, 거주지)</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-600">현재 건강 상태</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-600">경제적 상황</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-600">관심 있는 복지 분야</span>
                </li>
              </ul>
            </div>
            
            <div>
              <h3 className="font-semibold text-gray-900 mb-3">상담 내용</h3>
              <ul className="space-y-2">
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-600">개인 맞춤 복지 추천</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-600">복지 신청 방법 안내</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-600">필요 서류 확인</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                  <span className="text-gray-600">담당 기관 연결</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* 긴급 상황 안내 */}
        <div className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center">
          <h2 className="text-xl font-bold text-red-800 mb-4">긴급 상황</h2>
          <p className="text-red-700 mb-6">
            즉시 도움이 필요한 응급 상황이시면 아래 번호로 연락하세요.
          </p>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-md mx-auto">
            <a
              href="tel:119"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
            >
              <Phone className="w-5 h-5 mr-2" />
              응급상황: 119
            </a>
            
            <a
              href="tel:129"
              className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-4 rounded-lg flex items-center justify-center transition-colors"
            >
              <Shield className="w-5 h-5 mr-2" />
              복지신고: 129
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HelpPage;