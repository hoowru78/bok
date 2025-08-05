import React from 'react';
import { Link } from 'react-router-dom';
import { useAccessibility, VoiceGuide } from '../hooks/useAccessibility';
import { Shield, ArrowLeft, Lock, Eye, Trash2, Calendar } from 'lucide-react';

function PrivacyPage() {
  const { speak } = useAccessibility();

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
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Shield className="w-8 h-8 text-blue-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            개인정보 처리방침
            <VoiceGuide text="개인정보 처리방침" autoPlay />
          </h1>
          <p className="text-lg text-gray-600">
            복지모아는 개인정보보호법에 따라 개인정보를 안전하게 처리합니다.
          </p>
          <p className="text-sm text-gray-500 mt-2">
            최종 업데이트: 2024년 8월 5일
          </p>
        </div>

        {/* 개인정보 보호 요약 */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
            <Lock className="w-6 h-6 mr-3 text-green-600" />
            개인정보 보호 요약
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h3 className="font-semibold text-green-800 mb-2">수집하는 정보</h3>
              <ul className="text-green-700 text-sm space-y-1">
                <li>• 이름</li>
                <li>• 생년월일</li>
                <li>• 거주지 (시/도, 시/군/구)</li>
                <li>• 설문 응답</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-semibold text-blue-800 mb-2">보호 방법</h3>
              <ul className="text-blue-700 text-sm space-y-1">
                <li>• AES-256 암호화 저장</li>
                <li>• HTTPS 보안 전송</li>
                <li>• 접근 권한 제한</li>
                <li>• 1년 후 자동 삭제</li>
              </ul>
            </div>
          </div>
        </div>

        {/* 상세 내용 */}
        <div className="space-y-8">
          {/* 1. 개인정보의 처리 목적 */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">1. 개인정보의 처리 목적</h2>
            <p className="text-gray-600 mb-4">
              복지모아는 다음의 목적을 위하여 개인정보를 처리합니다. 처리하고 있는 개인정보는 다음의 목적 이외의 용도로는 이용되지 않으며, 이용 목적이 변경되는 경우에는 개인정보보호법 제18조에 따라 별도의 동의를 받는 등 필요한 조치를 이행할 예정입니다.
            </p>
            
            <div className="bg-gray-50 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">처리 목적</h3>
              <ul className="text-gray-600 space-y-1">
                <li>• 맞춤형 복지 정보 추천 서비스 제공</li>
                <li>• 복지 추천 알고리즘 개선을 위한 통계 분석</li>
                <li>• 서비스 이용 현황 분석 및 개선</li>
                <li>• 고객 문의 및 상담 서비스 제공</li>
              </ul>
            </div>
          </div>

          {/* 2. 개인정보의 처리 및 보유기간 */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Calendar className="w-5 h-5 mr-2 text-primary-600" />
              2. 개인정보의 처리 및 보유기간
            </h2>
            
            <div className="space-y-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">보유기간</h3>
                <p className="text-gray-600 mb-2">
                  개인정보는 수집·이용에 관한 동의일로부터 <strong>1년간</strong> 보유·이용됩니다.
                </p>
                <div className="bg-yellow-50 border border-yellow-200 rounded p-3">
                  <p className="text-yellow-800 text-sm">
                    ⚠️ 보유기간 경과 후에는 지체없이 개인정보를 파기합니다.
                  </p>
                </div>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">예외사항</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• 관련 법령에 의한 정보보유 사유가 발생할 경우 해당 기간 동안 보유</li>
                  <li>• 정보주체의 동의를 받은 경우 해당 기간 동안 보유</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 3. 개인정보의 제3자 제공 */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">3. 개인정보의 제3자 제공</h2>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-lg font-semibold text-green-800 mb-2">제3자 제공 없음</h3>
              <p className="text-green-700">
                복지모아는 개인정보를 제3자에게 제공하지 않습니다.
                <br />
                법령에 의한 경우를 제외하고는 어떠한 경우에도 개인정보를 외부에 제공하지 않습니다.
              </p>
            </div>
          </div>

          {/* 4. 개인정보 처리의 위탁 */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">4. 개인정보 처리의 위탁</h2>
            
            <div className="border border-gray-200 rounded-lg p-4">
              <h3 className="font-semibold text-gray-900 mb-2">현재 위탁 현황</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-4 py-2 text-left font-semibold text-gray-900">수탁업체</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-900">위탁업무</th>
                      <th className="px-4 py-2 text-left font-semibold text-gray-900">보유기간</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr className="border-t border-gray-200">
                      <td className="px-4 py-2 text-gray-600">Firebase (Google)</td>
                      <td className="px-4 py-2 text-gray-600">데이터베이스 호스팅</td>
                      <td className="px-4 py-2 text-gray-600">위탁계약 종료 시까지</td>
                    </tr>
                    <tr className="border-t border-gray-200">
                      <td className="px-4 py-2 text-gray-600">Netlify</td>
                      <td className="px-4 py-2 text-gray-600">웹사이트 호스팅</td>
                      <td className="px-4 py-2 text-gray-600">위탁계약 종료 시까지</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>

          {/* 5. 정보주체의 권리·의무 */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Eye className="w-5 h-5 mr-2 text-primary-600" />
              5. 정보주체의 권리·의무
            </h2>
            
            <p className="text-gray-600 mb-4">
              정보주체는 복지모아에 대해 언제든지 다음 각 호의 개인정보 보호 관련 권리를 행사할 수 있습니다.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">가능한 권리</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• 개인정보 처리현황 통지 요구</li>
                  <li>• 개인정보 처리정지 요구</li>
                  <li>• 개인정보의 정정·삭제 요구</li>
                  <li>• 손해배상 청구</li>
                </ul>
              </div>
              
              <div className="border border-gray-200 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">권리 행사 방법</h3>
                <ul className="text-gray-600 space-y-1">
                  <li>• 전화: 1588-0000</li>
                  <li>• 이메일: privacy@bokjimoa.kr</li>
                  <li>• 서면, 팩스, 전자우편 가능</li>
                  <li>• 법정대리인을 통한 권리행사 가능</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 6. 개인정보의 안전성 확보조치 */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
              <Lock className="w-5 h-5 mr-2 text-green-600" />
              6. 개인정보의 안전성 확보조치
            </h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">기술적 조치</h3>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>개인정보 AES-256 암호화</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>HTTPS 보안 소켓 계층 적용</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>해킹 등 외부침입 방지 시스템</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>정기적인 보안 업데이트</span>
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold text-gray-900 mb-3">관리적 조치</h3>
                <ul className="text-gray-600 space-y-2">
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>개인정보보호 책임자 지정</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>접근권한 관리 및 제한</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>정기적인 보안교육 실시</span>
                  </li>
                  <li className="flex items-start space-x-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full mt-2 flex-shrink-0"></span>
                    <span>개인정보 취급현황 점검</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* 7. 개인정보보호 책임자 */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">7. 개인정보보호 책임자</h2>
            
            <div className="border border-gray-200 rounded-lg p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">개인정보보호 책임자</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>성명: 김복지</li>
                    <li>직책: 개인정보보호 책임자</li>
                    <li>전화: 1588-0000</li>
                    <li>이메일: privacy@bokjimoa.kr</li>
                  </ul>
                </div>
                
                <div>
                  <h3 className="font-semibold text-gray-900 mb-3">개인정보보호 담당부서</h3>
                  <ul className="text-gray-600 space-y-1">
                    <li>부서명: 개인정보보호팀</li>
                    <li>담당자: 이안전</li>
                    <li>전화: 1588-0000</li>
                    <li>이메일: privacy@bokjimoa.kr</li>
                  </ul>
                </div>
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded">
                <p className="text-blue-700 text-sm">
                  정보주체께서는 복지모아의 서비스를 이용하시면서 발생한 모든 개인정보보호 관련 문의, 불만처리, 피해구제 등에 관한 사항을 개인정보보호 책임자 및 담당부서로 문의하실 수 있습니다.
                </p>
              </div>
            </div>
          </div>

          {/* 8. 개인정보 처리방침 변경 */}
          <div className="bg-white rounded-2xl shadow-sm p-8">
            <h2 className="text-xl font-bold text-gray-900 mb-4">8. 개인정보 처리방침 변경</h2>
            
            <div className="space-y-4">
              <p className="text-gray-600">
                이 개인정보 처리방침은 2024년 8월 5일부터 적용됩니다.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-4">
                <h3 className="font-semibold text-gray-900 mb-2">변경 시 안내</h3>
                <p className="text-gray-600 text-sm">
                  개인정보 처리방침이 변경되는 경우, 변경 사항을 시행일 7일 전부터 웹사이트 공지사항을 통해 공지하겠습니다. 
                  다만, 수집하는 개인정보의 항목, 이용목적의 변경 등과 같이 정보주체 권리의 중대한 변경이 발생할 때에는 
                  최소 30일 전에 공지하고, 필요 시 정보주체 동의를 다시 받겠습니다.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 문의하기 */}
        <div className="mt-12 bg-primary-50 border border-primary-200 rounded-2xl p-6 text-center">
          <h3 className="text-lg font-semibold text-primary-900 mb-3">
            개인정보 관련 문의
          </h3>
          <p className="text-primary-700 mb-4">
            개인정보 처리에 대한 궁금한 점이 있으시면 언제든 연락해주세요.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href="tel:1588-0000"
              className="btn-primary flex items-center justify-center"
            >
              전화 문의: 1588-0000
            </a>
            
            <a
              href="mailto:privacy@bokjimoa.kr"
              className="btn-secondary flex items-center justify-center"
            >
              이메일: privacy@bokjimoa.kr
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PrivacyPage;