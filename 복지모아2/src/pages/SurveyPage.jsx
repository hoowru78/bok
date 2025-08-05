import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, Routes, Route } from 'react-router-dom';
import { useAccessibility, VoiceGuide } from '../hooks/useAccessibility';
import { surveyQuestions } from '../data/welfareData';
import { ArrowRight, ArrowLeft, Heart, Home, DollarSign, AlertCircle, Save, RotateCcw } from 'lucide-react';

// 설문 단계별 컴포넌트
function SurveyStep({ category, questions, responses, onResponseChange, onNext, onPrevious, isLast, isSubmitting }) {
  const { speak } = useAccessibility();
  const [errors, setErrors] = useState({});

  const categoryInfo = {
    health: {
      title: '건강 상태',
      description: '현재 건강 상태에 대해 알려주세요.',
      icon: Heart,
      color: 'text-red-600',
      bgColor: 'bg-red-100'
    },
    living: {
      title: '생활 상황',
      description: '현재 생활 환경에 대해 알려주세요.',
      icon: Home,
      color: 'text-green-600',
      bgColor: 'bg-green-100'
    },
    economic: {
      title: '경제 상황',
      description: '현재 경제적 상황에 대해 알려주세요.',
      icon: DollarSign,
      color: 'text-blue-600',
      bgColor: 'bg-blue-100'
    }
  };

  const info = categoryInfo[category] || categoryInfo.health;
  const Icon = info.icon;

  useEffect(() => {
    speak(`${info.title} 설문을 시작합니다. ${info.description}`);
  }, [category, speak, info]);

  const handleResponseChange = (questionId, value, isMultiple = false) => {
    if (isMultiple) {
      const currentValues = responses[questionId] || [];
      let newValues;
      
      if (currentValues.includes(value)) {
        newValues = currentValues.filter(v => v !== value);
      } else {
        newValues = [...currentValues, value];
      }
      
      onResponseChange(questionId, newValues);
    } else {
      onResponseChange(questionId, value);
    }

    // 에러 초기화
    if (errors[questionId]) {
      setErrors(prev => ({
        ...prev,
        [questionId]: ''
      }));
    }
  };

  const validateStep = () => {
    const newErrors = {};
    
    questions.forEach(question => {
      if (question.required && !responses[question.id]) {
        newErrors[question.id] = '이 질문에 답해주세요.';
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (!validateStep()) {
      speak('모든 필수 질문에 답해주세요.');
      return;
    }
    onNext();
  };

  const getStepNumber = () => {
    const steps = ['health', 'living', 'economic'];
    return steps.indexOf(category) + 2; // 1은 기본정보
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white rounded-2xl shadow-sm p-8">
          {/* 헤더 */}
          <div className="text-center mb-8">
            <div className={`w-16 h-16 ${info.bgColor} rounded-2xl flex items-center justify-center mx-auto mb-6`}>
              <Icon className={`w-8 h-8 ${info.color}`} />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">
              {info.title}
              <VoiceGuide text={info.title} autoPlay />
            </h1>
            <p className="text-lg text-gray-600">
              {info.description}
            </p>
          </div>

          {/* 진행률 표시 */}
          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-600 mb-2">
              <span>{getStepNumber()}단계: {info.title}</span>
              <span>{getStepNumber()}/4</span>
            </div>
            <div className="progress-bar">
              <div className="progress-fill" style={{ width: `${(getStepNumber() / 4) * 100}%` }}></div>
            </div>
          </div>

          {/* 질문들 */}
          <div className="space-y-8">
            {questions.map((question, index) => (
              <div key={question.id} className="bg-gray-50 rounded-xl p-6">
                <div className="flex items-start space-x-4">
                  <div className="flex-shrink-0 w-8 h-8 bg-primary-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
                    {index + 1}
                  </div>
                  
                  <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-900 mb-4">
                      {question.question}
                      {question.required && <span className="text-red-500 ml-1">*</span>}
                      <VoiceGuide text={question.question} />
                    </h3>

                    <div className="space-y-3">
                      {question.options.map((option) => (
                        <label
                          key={option.value}
                          className={`flex items-center p-4 border-2 rounded-lg cursor-pointer transition-colors hover:bg-white ${
                            question.type === 'checkbox'
                              ? (responses[question.id] || []).includes(option.value)
                                ? 'border-primary-500 bg-primary-50'
                                : 'border-gray-200 bg-white'
                              : responses[question.id] === option.value
                                ? 'border-primary-500 bg-primary-50'
                                : 'border-gray-200 bg-white'
                          }`}
                        >
                          <input
                            type={question.type}
                            name={question.id}
                            value={option.value}
                            checked={
                              question.type === 'checkbox'
                                ? (responses[question.id] || []).includes(option.value)
                                : responses[question.id] === option.value
                            }
                            onChange={(e) => handleResponseChange(
                              question.id, 
                              option.value, 
                              question.type === 'checkbox'
                            )}
                            className="w-5 h-5 text-primary-600 mr-4 focus:ring-primary-300"
                          />
                          <span className="text-gray-900 font-medium">{option.label}</span>
                        </label>
                      ))}
                    </div>

                    {errors[question.id] && (
                      <div className="mt-3 flex items-center text-red-600 text-sm">
                        <AlertCircle className="w-4 h-4 mr-1" />
                        {errors[question.id]}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* 임시저장 안내 */}
          <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-4">
            <div className="flex items-center space-x-3">
              <Save className="w-5 h-5 text-blue-600" />
              <div className="text-sm text-blue-700">
                <p className="font-medium">자동 저장됨</p>
                <p>응답이 자동으로 저장되므로 나중에 이어서 할 수 있습니다.</p>
              </div>
            </div>
          </div>

          {/* 버튼 */}
          <div className="flex flex-col sm:flex-row gap-4 pt-8">
            <button
              type="button"
              onClick={onPrevious}
              className="flex-1 btn-secondary flex items-center justify-center"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              이전 단계
            </button>
            
            <button
              type="button"
              onClick={handleNext}
              disabled={isSubmitting}
              className="flex-1 btn-primary flex items-center justify-center"
            >
              {isSubmitting ? (
                <>
                  <div className="spinner w-4 h-4 border-2 border-white border-t-transparent rounded-full mr-2"></div>
                  분석 중...
                </>
              ) : (
                <>
                  {isLast ? '결과 보기' : '다음 단계'}
                  <ArrowRight className="w-4 h-4 ml-2" />
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// 메인 설문 페이지 컴포넌트
function SurveyPage() {
  const navigate = useNavigate();
  const { speak } = useAccessibility();
  const [responses, setResponses] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 로컬 스토리지에서 기존 응답 불러오기
  useEffect(() => {
    const savedResponses = localStorage.getItem('welfare-survey-responses');
    if (savedResponses) {
      setResponses(JSON.parse(savedResponses));
    }
  }, []);

  // 응답 변경 시 자동 저장
  useEffect(() => {
    if (Object.keys(responses).length > 0) {
      localStorage.setItem('welfare-survey-responses', JSON.stringify(responses));
    }
  }, [responses]);

  const handleResponseChange = (questionId, value) => {
    setResponses(prev => ({
      ...prev,
      [questionId]: value
    }));
  };

  const handleNext = (currentCategory) => {
    const steps = ['health', 'living', 'economic'];
    const currentIndex = steps.indexOf(currentCategory);
    
    if (currentIndex < steps.length - 1) {
      navigate(`/survey/${steps[currentIndex + 1]}`);
    } else {
      // 마지막 단계 - 결과 분석 및 추천
      handleSubmitSurvey();
    }
  };

  const handlePrevious = (currentCategory) => {
    const steps = ['health', 'living', 'economic'];
    const currentIndex = steps.indexOf(currentCategory);
    
    if (currentIndex > 0) {
      navigate(`/survey/${steps[currentIndex - 1]}`);
    } else {
      navigate('/user-info');
    }
  };

  const handleSubmitSurvey = async () => {
    setIsSubmitting(true);
    
    try {
      speak('설문이 완료되었습니다. 맞춤 복지를 분석하고 있습니다.');
      
      // 응답 데이터 가공
      const surveyData = {
        responses,
        completedAt: new Date().toISOString(),
        totalScore: calculateTotalScore(responses)
      };
      
      // 로컬 스토리지에 저장
      localStorage.setItem('welfare-survey-completed', JSON.stringify(surveyData));
      
      // 잠시 대기 (실제로는 AI 분석 시간)
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // 추천 결과 페이지로 이동
      navigate('/recommendations');
      
    } catch (error) {
      console.error('Error submitting survey:', error);
      speak('설문 제출 중 오류가 발생했습니다. 다시 시도해주세요.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const calculateTotalScore = (responses) => {
    let totalScore = 0;
    
    Object.entries(responses).forEach(([questionId, answer]) => {
      // 해당 질문 찾기
      const allQuestions = [
        ...surveyQuestions.health,
        ...surveyQuestions.living,
        ...surveyQuestions.economic
      ];
      
      const question = allQuestions.find(q => q.id === questionId);
      if (!question) return;
      
      if (Array.isArray(answer)) {
        // 체크박스 응답
        answer.forEach(value => {
          const option = question.options.find(opt => opt.value === value);
          if (option) totalScore += option.score;
        });
      } else {
        // 라디오 응답
        const option = question.options.find(opt => opt.value === answer);
        if (option) totalScore += option.score;
      }
    });
    
    return totalScore;
  };

  return (
    <Routes>
      <Route 
        path="health" 
        element={
          <SurveyStep 
            category="health"
            questions={surveyQuestions.health}
            responses={responses}
            onResponseChange={handleResponseChange}
            onNext={() => handleNext('health')}
            onPrevious={() => handlePrevious('health')}
            isLast={false}
            isSubmitting={isSubmitting}
          />
        } 
      />
      <Route 
        path="living" 
        element={
          <SurveyStep 
            category="living"
            questions={surveyQuestions.living}
            responses={responses}
            onResponseChange={handleResponseChange}
            onNext={() => handleNext('living')}
            onPrevious={() => handlePrevious('living')}
            isLast={false}
            isSubmitting={isSubmitting}
          />
        } 
      />
      <Route 
        path="economic" 
        element={
          <SurveyStep 
            category="economic"
            questions={surveyQuestions.economic}
            responses={responses}
            onResponseChange={handleResponseChange}
            onNext={() => handleNext('economic')}
            onPrevious={() => handlePrevious('economic')}
            isLast={true}
            isSubmitting={isSubmitting}
          />
        } 
      />
      {/* 기본 경로를 health로 리다이렉트 */}
      <Route path="/" element={<SurveyRedirect />} />
    </Routes>
  );
}

// 설문 시작 시 health로 리다이렉트
function SurveyRedirect() {
  const navigate = useNavigate();
  
  useEffect(() => {
    navigate('/survey/health', { replace: true });
  }, [navigate]);
  
  return null;
}

export default SurveyPage;