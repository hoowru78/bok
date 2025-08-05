import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { useAccessibility, VoiceGuide } from '../hooks/useAccessibility';
import { welfareItems } from '../data/welfareData';
import { ArrowLeft, Phone, ExternalLink, MapPin, Calendar, Users, DollarSign, FileText, Download, Share2, Heart, AlertCircle, CheckCircle } from 'lucide-react';

function WelfareDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { speak } = useAccessibility();
  const [welfare, setWelfare] = useState(null);
  const [userMatchingScore, setUserMatchingScore] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    loadWelfareDetail();
  }, [id]);

  const loadWelfareDetail = () => {
    try {
      setIsLoading(true);
      
      // 복지 항목 찾기
      const welfareItem = welfareItems.find(item => item.id === id);
      
      if (!welfareItem) {
        speak('요청하신 복지 정보를 찾을 수 없습니다.');
        navigate('/recommendations');
        return;
      }
      
      setWelfare(welfareItem);
      
      // 사용자의 추천 결과에서 매칭 점수 찾기
      const storedRecommendations = localStorage.getItem('welfare-recommendations');
      if (storedRecommendations) {
        const recommendations = JSON.parse(storedRecommendations);
        const userRec = recommendations.find(rec => rec.id === id);
        if (userRec) {
          setUserMatchingScore(userRec.matchingScore);
        }
      }
      
      speak(`${welfareItem.name} 상세 정보를 확인하세요.`);
      
    } catch (error) {
      console.error('Error loading welfare detail:', error);
      speak('복지 정보를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleApplyClick = () => {
    speak('신청 페이지로 이동합니다.');
  };

  const handleCallClick = () => {
    speak(`${welfare.responsibleAgency.name}으로 전화를 연결합니다.`);
  };

  const handleShareClick = () => {
    if (navigator.share) {
      navigator.share({
        title: `복지모아 - ${welfare.name}`,
        text: welfare.description,
        url: window.location.href
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      speak('링크가 클립보드에 복사되었습니다.');
    }
  };

  const handleDownloadClick = () => {
    const content = generatePrintableContent();
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${welfare.name}_상세정보.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const generatePrintableContent = () => {
    let content = `${welfare.name} 상세 정보\n\n`;
    content += `카테고리: ${welfare.category}\n`;
    content += `설명: ${welfare.description}\n\n`;
    
    if (welfare.eligibility) {
      content += `신청 자격:\n`;
      if (welfare.eligibility.age) content += `- 나이: ${welfare.eligibility.age}\n`;
      if (welfare.eligibility.income) content += `- 소득: ${welfare.eligibility.income}\n`;
      if (welfare.eligibility.residence) content += `- 거주: ${welfare.eligibility.residence}\n`;
      content += `\n`;
    }
    
    if (welfare.benefits) {
      content += `지원 내용:\n`;
      if (typeof welfare.benefits === 'object') {
        if (welfare.benefits.amount) content += `- 지원 금액: ${welfare.benefits.amount}\n`;
        if (welfare.benefits.description) content += `- 내용: ${welfare.benefits.description}\n`;
        if (welfare.benefits.services) content += `- 서비스: ${welfare.benefits.services.join(', ')}\n`;
      } else {
        content += `- ${welfare.benefits}\n`;
      }
      content += `\n`;
    }
    
    content += `신청 방법:\n`;
    if (typeof welfare.applicationMethod === 'object') {
      if (welfare.applicationMethod.online) content += `- 온라인: ${welfare.applicationMethod.online}\n`;
      if (welfare.applicationMethod.offline) content += `- 방문: ${welfare.applicationMethod.offline}\n`;
      if (welfare.applicationMethod.phone) content += `- 전화: ${welfare.applicationMethod.phone}\n`;
    }
    content += `\n`;
    
    content += `담당 기관:\n`;
    content += `- 기관명: ${welfare.responsibleAgency.name}\n`;
    content += `- 전화번호: ${welfare.responsibleAgency.phone}\n`;
    if (welfare.responsibleAgency.website) {
      content += `- 웹사이트: ${welfare.responsibleAgency.website}\n`;
    }
    
    return content;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">정보를 불러오는 중입니다</h2>
          <p className="text-gray-600">잠시만 기다려주세요...</p>
        </div>
      </div>
    );
  }

  if (!welfare) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <AlertCircle className="w-8 h-8 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">복지 정보를 찾을 수 없습니다</h2>
          <p className="text-gray-600 mb-8">요청하신 복지 정보가 존재하지 않습니다.</p>
          <Link to="/recommendations" className="btn-primary">
            추천 목록으로 돌아가기
          </Link>
        </div>
      </div>
    );
  }

  const categoryColors = {
    경제: 'text-blue-600 bg-blue-100',
    건강: 'text-red-600 bg-red-100',
    생활: 'text-green-600 bg-green-100',
    주거: 'text-purple-600 bg-purple-100'
  };

  const colorClass = categoryColors[welfare.category] || 'text-gray-600 bg-gray-100';

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 뒤로가기 버튼 */}
        <div className="mb-6">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center text-gray-600 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            <span>이전으로 돌아가기</span>
          </button>
        </div>

        {/* 헤더 */}
        <div className="bg-white rounded-2xl shadow-sm p-8 mb-8">
          <div className="flex items-start justify-between mb-6">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-4">
                <span className={`px-4 py-2 rounded-full text-sm font-medium ${colorClass}`}>
                  {welfare.category}
                </span>
                {userMatchingScore && (
                  <div className="flex items-center space-x-1">
                    <Heart className="w-4 h-4 text-red-500 fill-current" />
                    <span className="text-sm font-bold text-gray-900">
                      {userMatchingScore}% 매칭
                    </span>
                  </div>
                )}
              </div>
              
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                {welfare.name}
                <VoiceGuide text={welfare.name} autoPlay />
              </h1>
              
              <p className="text-lg text-gray-600 leading-relaxed">
                {welfare.description}
              </p>
            </div>
          </div>

          {/* 액션 버튼 */}
          <div className="flex flex-wrap gap-3">
            {welfare.responsibleAgency.website && (
              <a
                href={welfare.responsibleAgency.website}
                target="_blank"
                rel="noopener noreferrer"
                onClick={handleApplyClick}
                className="btn-primary flex items-center"
              >
                <ExternalLink className="w-4 h-4 mr-2" />
                온라인 신청
              </a>
            )}
            
            <a
              href={`tel:${welfare.responsibleAgency.phone}`}
              onClick={handleCallClick}
              className="btn-secondary flex items-center"
            >
              <Phone className="w-4 h-4 mr-2" />
              전화 상담
            </a>
            
            <button
              onClick={handleShareClick}
              className="btn-text flex items-center"
            >
              <Share2 className="w-4 h-4 mr-2" />
              공유하기
            </button>
            
            <button
              onClick={handleDownloadClick}
              className="btn-text flex items-center"
            >
              <Download className="w-4 h-4 mr-2" />
              정보 저장
            </button>
          </div>
        </div>

        {/* 상세 정보 */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* 메인 콘텐츠 */}
          <div className="lg:col-span-2 space-y-8">
            {/* 신청 자격 */}
            {welfare.eligibility && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Users className="w-5 h-5 mr-2 text-primary-600" />
                  신청 자격
                  <VoiceGuide text="신청 자격" />
                </h2>
                
                <div className="space-y-3">
                  {welfare.eligibility.age && (
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                        <Calendar className="w-3 h-3 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">연령 조건</p>
                        <p className="text-gray-600">{welfare.eligibility.age}</p>
                      </div>
                    </div>
                  )}
                  
                  {welfare.eligibility.income && (
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                        <DollarSign className="w-3 h-3 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">소득 조건</p>
                        <p className="text-gray-600">{welfare.eligibility.income}</p>
                      </div>
                    </div>
                  )}
                  
                  {welfare.eligibility.residence && (
                    <div className="flex items-start space-x-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-primary-100 rounded-full flex items-center justify-center mt-0.5">
                        <MapPin className="w-3 h-3 text-primary-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">거주 조건</p>
                        <p className="text-gray-600">{welfare.eligibility.residence}</p>
                      </div>
                    </div>
                  )}
                  
                  {welfare.eligibility.conditions && (
                    <div className="mt-4">
                      <p className="font-medium text-gray-900 mb-2">추가 조건</p>
                      <ul className="space-y-1">
                        {welfare.eligibility.conditions.map((condition, index) => (
                          <li key={index} className="flex items-start space-x-2">
                            <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-600">{condition}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* 지원 내용 */}
            {welfare.benefits && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <Heart className="w-5 h-5 mr-2 text-red-600" />
                  지원 내용
                  <VoiceGuide text="지원 내용" />
                </h2>
                
                <div className="space-y-4">
                  {typeof welfare.benefits === 'object' ? (
                    <>
                      {welfare.benefits.amount && (
                        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                          <h3 className="font-semibold text-green-800 mb-2">지원 금액</h3>
                          <p className="text-green-700 text-lg font-bold">{welfare.benefits.amount}</p>
                        </div>
                      )}
                      
                      {welfare.benefits.description && (
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">지원 내용</h3>
                          <p className="text-gray-600">{welfare.benefits.description}</p>
                        </div>
                      )}
                      
                      {welfare.benefits.services && (
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">제공 서비스</h3>
                          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {welfare.benefits.services.map((service, index) => (
                              <li key={index} className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span className="text-gray-600">{service}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                      
                      {welfare.benefits.duration && (
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">지원 기간</h3>
                          <p className="text-gray-600">{welfare.benefits.duration}</p>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-gray-600">{welfare.benefits}</p>
                  )}
                </div>
              </div>
            )}

            {/* 신청 방법 */}
            {welfare.applicationMethod && (
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h2 className="text-xl font-bold text-gray-900 mb-4 flex items-center">
                  <FileText className="w-5 h-5 mr-2 text-blue-600" />
                  신청 방법
                  <VoiceGuide text="신청 방법" />
                </h2>
                
                <div className="space-y-4">
                  {typeof welfare.applicationMethod === 'object' ? (
                    <>
                      {welfare.applicationMethod.online && (
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h3 className="font-semibold text-gray-900 mb-2">온라인 신청</h3>
                          <a 
                            href={welfare.applicationMethod.online}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-primary-600 hover:text-primary-700 underline"
                          >
                            {welfare.applicationMethod.online}
                          </a>
                        </div>
                      )}
                      
                      {welfare.applicationMethod.offline && (
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h3 className="font-semibold text-gray-900 mb-2">방문 신청</h3>
                          <p className="text-gray-600">{welfare.applicationMethod.offline}</p>
                        </div>
                      )}
                      
                      {welfare.applicationMethod.phone && (
                        <div className="border border-gray-200 rounded-lg p-4">
                          <h3 className="font-semibold text-gray-900 mb-2">전화 신청</h3>
                          <a 
                            href={`tel:${welfare.applicationMethod.phone}`}
                            className="text-primary-600 hover:text-primary-700 font-medium"
                          >
                            {welfare.applicationMethod.phone}
                          </a>
                        </div>
                      )}
                      
                      {welfare.applicationMethod.documents && (
                        <div>
                          <h3 className="font-semibold text-gray-900 mb-2">필요 서류</h3>
                          <ul className="space-y-1">
                            {welfare.applicationMethod.documents.map((doc, index) => (
                              <li key={index} className="flex items-center space-x-2">
                                <CheckCircle className="w-4 h-4 text-green-500" />
                                <span className="text-gray-600">{doc}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </>
                  ) : (
                    <p className="text-gray-600">{welfare.applicationMethod}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* 사이드바 */}
          <div className="lg:col-span-1">
            <div className="sticky top-8 space-y-6">
              {/* 담당 기관 정보 */}
              <div className="bg-white rounded-2xl shadow-sm p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">담당 기관</h3>
                
                <div className="space-y-3">
                  <div>
                    <p className="font-semibold text-gray-900">{welfare.responsibleAgency.name}</p>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4 text-gray-400" />
                    <a 
                      href={`tel:${welfare.responsibleAgency.phone}`}
                      className="text-primary-600 hover:text-primary-700 font-medium"
                    >
                      {welfare.responsibleAgency.phone}
                    </a>
                  </div>
                  
                  {welfare.responsibleAgency.website && (
                    <div className="flex items-center space-x-2">
                      <ExternalLink className="w-4 h-4 text-gray-400" />
                      <a 
                        href={welfare.responsibleAgency.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-primary-600 hover:text-primary-700 text-sm"
                      >
                        공식 웹사이트
                      </a>
                    </div>
                  )}
                </div>
                
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex space-x-2">
                    <a
                      href={`tel:${welfare.responsibleAgency.phone}`}
                      className="flex-1 btn-primary flex items-center justify-center text-sm"
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      전화상담
                    </a>
                    
                    {welfare.responsibleAgency.website && (
                      <a
                        href={welfare.responsibleAgency.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex-1 btn-secondary flex items-center justify-center text-sm"
                      >
                        <ExternalLink className="w-4 h-4 mr-1" />
                        방문
                      </a>
                    )}
                  </div>
                </div>
              </div>

              {/* 추가 정보 */}
              <div className="bg-blue-50 border border-blue-200 rounded-2xl p-6">
                <h3 className="text-lg font-semibold text-blue-900 mb-3">도움이 필요하세요?</h3>
                <p className="text-blue-700 text-sm mb-4">
                  복지 신청이나 자세한 상담이 필요하시면 전문가에게 문의하세요.
                </p>
                
                <div className="space-y-2">
                  <Link
                    to="/help/contact"
                    className="w-full btn-primary flex items-center justify-center text-sm"
                  >
                    전문가 상담
                  </Link>
                  
                  <Link
                    to="/help/faq"
                    className="w-full btn-text flex items-center justify-center text-sm"
                  >
                    자주 묻는 질문
                  </Link>
                </div>
              </div>

              {/* 관련 태그 */}
              {welfare.tags && welfare.tags.length > 0 && (
                <div className="bg-white rounded-2xl shadow-sm p-6">
                  <h3 className="text-lg font-bold text-gray-900 mb-3">관련 키워드</h3>
                  <div className="flex flex-wrap gap-2">
                    {welfare.tags.map((tag, index) => (
                      <span 
                        key={index}
                        className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default WelfareDetailPage;