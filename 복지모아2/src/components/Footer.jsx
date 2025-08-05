import React from 'react';
import { Link } from 'react-router-dom';
import { Heart, Shield, Phone, Mail } from 'lucide-react';

function Footer() {
  const currentYear = new Date().getFullYear();

  const footerLinks = [
    {
      title: '서비스',
      links: [
        { name: '복지 추천', href: '/' },
        { name: '사용법 안내', href: '/help/guide' },
        { name: '자주 묻는 질문', href: '/help/faq' },
      ]
    },
    {
      title: '정보',
      links: [
        { name: '개인정보 처리방침', href: '/privacy' },
        { name: '접근성 정책', href: '/accessibility' },
        { name: '이용약관', href: '/terms' },
      ]
    },
    {
      title: '고객지원',
      links: [
        { name: '문의하기', href: '/help/contact' },
        { name: '신고하기', href: '/help/report' },
      ]
    }
  ];

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* 브랜드 섹션 */}
          <div className="md:col-span-1">
            <div className="flex items-center space-x-3 mb-4">
              <div className="w-8 h-8 bg-primary-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">복</span>
              </div>
              <h2 className="text-xl font-bold text-gray-900">복지모아</h2>
            </div>
            <p className="text-gray-600 text-sm mb-4">
              고령자를 위한 맞춤 복지 추천 서비스
            </p>
            <div className="flex items-center text-primary-600">
              <Heart className="w-4 h-4 mr-1" />
              <span className="text-sm">어르신을 위한 따뜻한 기술</span>
            </div>
          </div>

          {/* 링크 섹션 */}
          {footerLinks.map((section) => (
            <div key={section.title} className="md:col-span-1">
              <h3 className="font-semibold text-gray-900 mb-4">{section.title}</h3>
              <ul className="space-y-3">
                {section.links.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-600 hover:text-primary-600 text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-primary-300 rounded"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 연락처 정보 */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center space-x-3">
              <Phone className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">고객센터</p>
                <p className="text-sm text-gray-600">1588-0000 (평일 9:00~18:00)</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <Mail className="w-5 h-5 text-gray-400" />
              <div>
                <p className="text-sm font-medium text-gray-900">이메일 문의</p>
                <p className="text-sm text-gray-600">contact@bokjimoa.kr</p>
              </div>
            </div>
          </div>
        </div>

        {/* 하단 정보 */}
        <div className="mt-8 pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="flex items-center space-x-4 text-sm text-gray-600">
              <span>© {currentYear} 복지모아. All rights reserved.</span>
              <div className="flex items-center space-x-1">
                <Shield className="w-4 h-4" />
                <span>개인정보보호 인증</span>
              </div>
            </div>
            
            <div className="text-sm text-gray-500">
              <p>이 서비스는 고령자의 복지 접근성 향상을 위해 만들어졌습니다.</p>
            </div>
          </div>
        </div>

        {/* 접근성 안내 */}
        <div className="mt-6 p-4 bg-blue-50 rounded-lg">
          <div className="flex items-start space-x-3">
            <div className="flex-shrink-0">
              <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 text-sm font-bold">i</span>
              </div>
            </div>
            <div className="flex-1">
              <h4 className="text-sm font-medium text-blue-900 mb-1">접근성 지원</h4>
              <p className="text-sm text-blue-700">
                이 웹사이트는 웹 접근성 지침(WCAG 2.2)을 준수하여 제작되었습니다. 
                사용에 어려움이 있으시면 고객센터로 연락주세요.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;