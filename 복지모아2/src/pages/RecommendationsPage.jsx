import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAccessibility, VoiceGuide } from '../hooks/useAccessibility';
import { generateRecommendations, groupRecommendationsByCategory, generateRecommendationSummary } from '../utils/welfareRecommendation';
import { Heart, DollarSign, Home, Shield, Star, Phone, ExternalLink, RotateCcw, Download, Share2, ArrowRight, Award, TrendingUp, Users } from 'lucide-react';

function RecommendationsPage() {
  const navigate = useNavigate();
  const { speak } = useAccessibility();
  const [recommendations, setRecommendations] = useState([]);
  const [groupedRecommendations, setGroupedRecommendations] = useState({});
  const [summary, setSummary] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('전체');

  useEffect(() => {
    loadRecommendations();
  }, []);

  const loadRecommendations = async () => {
    try {
      setIsLoading(true);
      
      // 사용자 정보와 설문 응답 불러오기
      const userInfo = JSON.parse(localStorage.getItem('welfare-user-info') || '{}');
      const surveyData = JSON.parse(localStorage.getItem('welfare-survey-completed') || '{}');
      
      if (!userInfo.name || !surveyData.responses) {
        navigate('/');
        return;
      }
      
      // 추천 생성
      const recs = generateRecommendations(userInfo, surveyData.responses);
      const grouped = groupRecommendationsByCategory(recs);
      const summaryData = generateRecommendationSummary(recs, userInfo);
      
      setRecommendations(recs);
      setGroupedRecommendations(grouped);
      setSummary(summaryData);
      
      // 결과 안내
      if (recs.length > 0) {
        speak(`${summaryData.userName}님을 위한 맞춤 복지 ${recs.length}개를 찾았습니다. 가장 적합한 복지는 ${recs[0].name}입니다.`);
      } else {
        speak('현재 조건에 맞는 복지를 찾지 못했습니다. 일반 복지 정보를 확인해보세요.');
      }
      
    } catch (error) {
      console.error('Error loading recommendations:', error);
      speak('추천 결과를 불러오는 중 오류가 발생했습니다.');
    } finally {
      setIsLoading(false);
    }
  };

  const categoryIcons = {
    경제: DollarSign,
    건강: Heart,
    생활: Home,
    주거: Shield
  };

  const categoryColors = {
    경제: 'text-blue-600 bg-blue-100',
    건강: 'text-red-600 bg-red-100',
    생활: 'text-green-600 bg-green-100',
    주거: 'text-purple-600 bg-purple-100'
  };

  const filteredRecommendations = selectedCategory === '전체' 
    ? recommendations 
    : groupedRecommendations[selectedCategory] || [];

  const handleShareResults = () => {
    if (navigator.share) {
      navigator.share({
        title: '복지모아 추천 결과',
        text: `${summary?.userName}님을 위한 맞춤 복지 ${recommendations.length}개를 찾았습니다.`,
        url: window.location.href
      });
    } else {
      // 클립보드 복사 fallback
      navigator.clipboard.writeText(window.location.href);
      speak('링크가 클립보드에 복사되었습니다.');
    }
  };

  const handleDownloadResults = () => {
    const content = generatePrintableContent();
    const blob = new Blob([content], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `복지추천결과_${summary?.userName}_${new Date().toISOString().split('T')[0]}.txt`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const generatePrintableContent = () => {
    let content = `복지모아 맞춤 복지 추천 결과\n\n`;
    content += `이름: ${summary?.userName}\n`;
    content += `나이: ${summary?.age}세\n`;
    content += `거주지: ${summary?.region} ${summary?.district}\n`;
    content += `추천일: ${new Date().toLocaleDateString()}\n\n`;
    content += `총 추천 복지: ${recommendations.length}개\n\n`;
    
    recommendations.forEach((rec, index) => {
      content += `${index + 1}. ${rec.name} (매칭도: ${rec.matchingScore}%)\n`;
      content += `   카테고리: ${rec.category}\n`;
      content += `   설명: ${rec.description}\n`;
      content += `   신청방법: ${typeof rec.applicationMethod === 'object' ? rec.applicationMethod.phone || rec.applicationMethod.offline : rec.applicationMethod}\n`;
      content += `   담당기관: ${rec.responsibleAgency.name} (${rec.responsibleAgency.phone})\n\n`;
    });
    
    return content;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="spinner w-12 h-12 border-4 border-primary-600 border-t-transparent rounded-full mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2">맞춤 복지를 찾고 있습니다</h2>
          <p className="text-gray-600">잠시만 기다려주세요...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* 헤더 */}
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Award className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            맞춤 복지 추천 결과
            <VoiceGuide text="맞춤 복지 추천 결과" autoPlay />
          </h1>
          {summary && (
            <p className="text-lg text-gray-600">
              {summary.userName}님을 위한 복지 {recommendations.length}개를 찾았습니다
            </p>
          )}
        </div>

        {recommendations.length === 0 ? (
          /* 추천 결과 없음 */
          <div className="bg-white rounded-2xl shadow-sm p-8 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center mx-auto mb-6">
              <Users className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-4">
              현재 조건에 맞는 복지를 찾지 못했습니다
            </h2>
            <p className="text-gray-600 mb-8">
              설문 응답을 다시 확인하시거나, 일반 복지 정보를 참고해보세요.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => navigate('/survey/health')}
                className="btn-primary flex items-center justify-center"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                설문 다시하기
              </button>
              
              <Link
                to="/help"
                className="btn-secondary flex items-center justify-center"
              >
                <Phone className="w-4 h-4 mr-2" />
                도움 요청하기
              </Link>
            </div>
          </div>
        ) : (
          <>
            {/* 요약 정보 */}
            {summary && (
              <div className="bg-white rounded-2xl shadow-sm p-6 mb-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <TrendingUp className="w-6 h-6 text-blue-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{recommendations.length}</div>
                    <div className="text-sm text-gray-600">총 추천 복지</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-red-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Star className="w-6 h-6 text-red-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{summary.highPriorityCount}</div>
                    <div className="text-sm text-gray-600">우선 추천</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Users className="w-6 h-6 text-green-600" />
                    </div>
                    <div className="text-2xl font-bold text-gray-900">{summary.age}세</div>
                    <div className="text-sm text-gray-600">{summary.userName}님</div>
                  </div>
                  
                  <div className="text-center">
                    <div className="w-12 h-12 bg-purple-100 rounded-xl flex items-center justify-center mx-auto mb-3">
                      <Home className="w-6 h-6 text-purple-600" />
                    </div>
                    <div className="text-lg font-bold text-gray-900">{summary.region}</div>
                    <div className="text-sm text-gray-600">{summary.district}</div>
                  </div>
                </div>
              </div>
            )}

            {/* 액션 버튼 */}
            <div className="flex flex-wrap gap-3 mb-8 justify-center">
              <button
                onClick={handleDownloadResults}
                className="btn-secondary flex items-center"
              >
                <Download className="w-4 h-4 mr-2" />
                결과 저장
              </button>
              
              <button
                onClick={handleShareResults}
                className="btn-secondary flex items-center"
              >
                <Share2 className="w-4 h-4 mr-2" />
                공유하기
              </button>
              
              <button
                onClick={() => navigate('/survey/health')}
                className="btn-text flex items-center"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                다시 검사하기
              </button>
            </div>

            {/* 카테고리 필터 */}
            <div className="bg-white rounded-xl shadow-sm p-4 mb-8">
              <div className="flex flex-wrap gap-2">
                {['전체', ...Object.keys(groupedRecommendations).filter(cat => groupedRecommendations[cat].length > 0)].map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-primary-600 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {category === '전체' ? (
                      `전체 (${recommendations.length})`
                    ) : (
                      `${category} (${groupedRecommendations[category]?.length || 0})`
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* 추천 목록 */}
            <div className="space-y-6">
              {filteredRecommendations.map((recommendation, index) => {
                const Icon = categoryIcons[recommendation.category] || Home;
                const colorClass = categoryColors[recommendation.category] || 'text-gray-600 bg-gray-100';
                
                return (
                  <div key={recommendation.id} className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow p-6">
                    <div className="flex items-start space-x-4">
                      {/* 순위 표시 */}
                      <div className="flex-shrink-0">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${colorClass}`}>
                          <Icon className="w-6 h-6" />
                        </div>
                        <div className="text-center mt-2 text-sm font-bold text-gray-900">
                          #{selectedCategory === '전체' ? recommendations.indexOf(recommendation) + 1 : index + 1}
                        </div>
                      </div>
                      
                      <div className="flex-1">
                        {/* 복지 정보 */}
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <h3 className="text-xl font-bold text-gray-900 mb-1">
                              {recommendation.name}
                              <VoiceGuide text={recommendation.name} />
                            </h3>
                            <div className="flex items-center space-x-3">
                              <span className={`px-3 py-1 rounded-full text-sm font-medium ${colorClass}`}>
                                {recommendation.category}
                              </span>
                              <div className="flex items-center space-x-1">
                                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                                <span className="text-sm font-bold text-gray-900">
                                  {recommendation.matchingScore}% 매칭
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        
                        <p className="text-gray-600 mb-4 leading-relaxed">
                          {recommendation.description}
                        </p>
                        
                        {/* 매칭 이유 */}
                        {recommendation.matchingReasons && recommendation.matchingReasons.length > 0 && (
                          <div className="bg-green-50 border border-green-200 rounded-lg p-3 mb-4">
                            <h4 className="text-sm font-semibold text-green-800 mb-2">추천 이유</h4>
                            <ul className="text-sm text-green-700 space-y-1">
                              {recommendation.matchingReasons.map((reason, idx) => (
                                <li key={idx} className="flex items-start">
                                  <span className="w-1.5 h-1.5 bg-green-500 rounded-full mt-2 mr-2 flex-shrink-0"></span>
                                  {reason}
                                </li>
                              ))}
                            </ul>
                          </div>
                        )}
                        
                        {/* 혜택 정보 */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-2">지원 내용</h4>
                            <p className="text-sm text-gray-600">
                              {typeof recommendation.benefits === 'object' 
                                ? recommendation.benefits.description || recommendation.benefits.amount
                                : recommendation.benefits}
                            </p>
                          </div>
                          
                          <div>
                            <h4 className="text-sm font-semibold text-gray-900 mb-2">담당 기관</h4>
                            <p className="text-sm text-gray-600">
                              {recommendation.responsibleAgency.name}
                            </p>
                            <a 
                              href={`tel:${recommendation.responsibleAgency.phone}`}
                              className="text-sm text-primary-600 hover:text-primary-700 font-medium"
                            >
                              {recommendation.responsibleAgency.phone}
                            </a>
                          </div>
                        </div>
                        
                        {/* 액션 버튼 */}
                        <div className="flex flex-col sm:flex-row gap-3">
                          <Link
                            to={`/recommendations/${recommendation.id}`}
                            className="flex-1 btn-primary flex items-center justify-center"
                          >
                            <span>자세히 보기</span>
                            <ArrowRight className="w-4 h-4 ml-2" />
                          </Link>
                          
                          {recommendation.responsibleAgency.website && (
                            <a
                              href={recommendation.responsibleAgency.website}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="flex-1 btn-secondary flex items-center justify-center"
                            >
                              <ExternalLink className="w-4 h-4 mr-2" />
                              신청하러 가기
                            </a>
                          )}
                          
                          <a
                            href={`tel:${recommendation.responsibleAgency.phone}`}
                            className="btn-text flex items-center justify-center"
                          >
                            <Phone className="w-4 h-4 mr-2" />
                            전화 문의
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* 추가 안내 */}
            <div className="mt-8 bg-blue-50 border border-blue-200 rounded-2xl p-6">
              <div className="text-center">
                <h3 className="text-lg font-semibold text-blue-900 mb-2">
                  추가 도움이 필요하신가요?
                </h3>
                <p className="text-blue-700 mb-4">
                  복지 신청이나 자세한 상담이 필요하시면 언제든 연락주세요.
                </p>
                
                <div className="flex flex-col sm:flex-row gap-3 justify-center">
                  <Link
                    to="/help/contact"
                    className="btn-primary flex items-center justify-center"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    전문가 상담받기
                  </Link>
                  
                  <Link
                    to="/help/faq"
                    className="btn-secondary flex items-center justify-center"
                  >
                    자주 묻는 질문
                  </Link>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default RecommendationsPage;