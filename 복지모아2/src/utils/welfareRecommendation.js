import { welfareItems, matchingRules, surveyQuestions } from '../data/welfareData';

/**
 * 사용자 응답을 바탕으로 복지 추천을 생성하는 함수
 */
export function generateRecommendations(userInfo, surveyResponses) {
  const recommendations = [];
  
  // 사용자 나이 계산
  const birthDate = new Date(userInfo.birthDate);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  
  // 각 복지 항목에 대해 매칭 점수 계산
  welfareItems.forEach(welfare => {
    if (!welfare.isActive) return;
    
    const matchingScore = calculateMatchingScore(welfare, userInfo, surveyResponses, age);
    
    if (matchingScore >= 50) { // 최소 50점 이상만 추천
      recommendations.push({
        ...welfare,
        matchingScore: Math.round(matchingScore),
        matchingReasons: getMatchingReasons(welfare, userInfo, surveyResponses, age)
      });
    }
  });
  
  // 매칭 점수 순으로 정렬
  recommendations.sort((a, b) => b.matchingScore - a.matchingScore);
  
  return recommendations;
}

/**
 * 복지 항목과 사용자 정보 간의 매칭 점수를 계산
 */
function calculateMatchingScore(welfare, userInfo, surveyResponses, age) {
  let score = 0;
  let maxScore = 100;
  
  const rules = matchingRules[welfare.id];
  if (!rules) return 50; // 기본 점수
  
  // 필수 조건 검사
  let meetRequiredConditions = true;
  
  if (rules.requiredConditions) {
    for (const condition of rules.requiredConditions) {
      if (condition.category === 'age') {
        // 나이 조건 검사
        if (condition.min && age < condition.min) {
          meetRequiredConditions = false;
          break;
        }
        if (condition.max && age > condition.max) {
          meetRequiredConditions = false;
          break;
        }
      } else if (condition.questions) {
        // 설문 응답 점수 조건 검사
        const questionScore = calculateQuestionScore(condition.questions, surveyResponses);
        
        if (condition.minScore && questionScore < condition.minScore) {
          meetRequiredConditions = false;
          break;
        }
        if (condition.maxScore && questionScore > condition.maxScore) {
          meetRequiredConditions = false;
          break;
        }
      } else if (condition.question) {
        // 특정 질문 값 조건 검사
        const answer = surveyResponses[condition.question];
        
        if (condition.value && answer !== condition.value) {
          meetRequiredConditions = false;
          break;
        }
        if (condition.values && !condition.values.includes(answer)) {
          meetRequiredConditions = false;
          break;
        }
      }
    }
  }
  
  if (!meetRequiredConditions) {
    return 0; // 필수 조건 미충족 시 0점
  }
  
  // 기본 점수 (필수 조건 충족)
  score = 60;
  
  // 보너스 조건 적용
  if (rules.bonusConditions) {
    for (const bonus of rules.bonusConditions) {
      if (bonus.category === 'age') {
        if (bonus.min && age >= bonus.min) {
          score += bonus.bonus || 10;
        }
        if (bonus.max && age <= bonus.max) {
          score += bonus.bonus || 10;
        }
      } else if (bonus.questions) {
        const questionScore = calculateQuestionScore(bonus.questions, surveyResponses);
        
        if (bonus.minScore && questionScore >= bonus.minScore) {
          score += bonus.bonus || 10;
        }
        if (bonus.maxScore && questionScore <= bonus.maxScore) {
          score += bonus.bonus || 10;
        }
      } else if (bonus.question) {
        const answer = surveyResponses[bonus.question];
        
        if (bonus.value && answer === bonus.value) {
          score += bonus.bonus || 10;
        }
        if (bonus.values && bonus.values.includes(answer)) {
          score += bonus.bonus || 10;
        }
      }
    }
  }
  
  // 지역 매칭 보너스
  if (welfare.regionScope === '전국' || welfare.regionScope === userInfo.regionName) {
    score += 5;
  }
  
  return Math.min(score, maxScore);
}

/**
 * 특정 질문들의 총 점수를 계산
 */
function calculateQuestionScore(questionIds, surveyResponses) {
  let totalScore = 0;
  
  questionIds.forEach(questionId => {
    const answer = surveyResponses[questionId];
    if (!answer) return;
    
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
}

/**
 * 매칭 이유를 생성
 */
function getMatchingReasons(welfare, userInfo, surveyResponses, age) {
  const reasons = [];
  
  // 나이 기반 이유
  if (welfare.targetAge.min && age >= welfare.targetAge.min) {
    reasons.push(`만 ${welfare.targetAge.min}세 이상 대상 복지입니다.`);
  }
  
  // 지역 기반 이유
  if (welfare.regionScope === '전국') {
    reasons.push('전국 어디서나 신청 가능합니다.');
  } else if (welfare.regionScope === userInfo.regionName) {
    reasons.push(`${userInfo.regionName} 거주자 대상 복지입니다.`);
  }
  
  // 설문 응답 기반 이유
  const rules = matchingRules[welfare.id];
  if (rules?.bonusConditions) {
    rules.bonusConditions.forEach(bonus => {
      if (bonus.question) {
        const answer = surveyResponses[bonus.question];
        
        if (bonus.value && answer === bonus.value) {
          reasons.push(getReasonByQuestion(bonus.question, answer));
        }
        if (bonus.values && bonus.values.includes(answer)) {
          reasons.push(getReasonByQuestion(bonus.question, answer));
        }
      }
    });
  }
  
  return reasons.slice(0, 3); // 최대 3개까지만 반환
}

/**
 * 질문별 매칭 이유를 반환
 */
function getReasonByQuestion(questionId, answer) {
  const reasonMap = {
    'h3': {
      'moderate': '거동 불편으로 돌봄 서비스가 도움이 될 것 같습니다.',
      'severe': '거동이 매우 불편하여 전문적인 돌봄이 필요합니다.'
    },
    'l1': {
      'alone': '독거 생활로 생활 지원이 필요합니다.'
    },
    'l2': {
      'rarely': '도움받기 어려운 상황으로 공적 지원이 필요합니다.',
      'never': '도움받을 곳이 없어 긴급 지원이 필요합니다.'
    },
    'l4': {
      'poor': '주거환경 개선이 필요한 상황입니다.',
      'very-poor': '주거환경이 매우 열악하여 지원이 시급합니다.'
    },
    'e1': {
      'insufficient': '소득이 부족하여 경제적 지원이 필요합니다.',
      'very-insufficient': '소득이 매우 부족하여 긴급 지원이 필요합니다.'
    },
    'e2': {
      'heavy': '의료비 부담이 커서 지원이 필요합니다.',
      'very-heavy': '의료비 부담이 매우 커서 긴급 지원이 필요합니다.'
    },
    'e3': {
      'needed': '생활비 지원이 필요한 상황입니다.',
      'very-needed': '생활비 지원이 매우 필요한 상황입니다.'
    },
    'e4': {
      'none': '연금을 받지 않아 기초연금 대상입니다.'
    },
    'h4': {
      'no': '정기 건강검진을 받지 않아 건강관리가 필요합니다.'
    }
  };
  
  return reasonMap[questionId]?.[answer] || '귀하의 상황에 적합한 복지입니다.';
}

/**
 * 추천 결과를 카테고리별로 그룹화
 */
export function groupRecommendationsByCategory(recommendations) {
  const grouped = {
    경제: [],
    건강: [],
    생활: [],
    주거: []
  };
  
  recommendations.forEach(rec => {
    if (grouped[rec.category]) {
      grouped[rec.category].push(rec);
    } else {
      grouped['생활'].push(rec); // 기타는 생활로 분류
    }
  });
  
  return grouped;
}

/**
 * 추천 요약 정보 생성
 */
export function generateRecommendationSummary(recommendations, userInfo) {
  const totalRecommendations = recommendations.length;
  const highPriorityCount = recommendations.filter(r => r.matchingScore >= 80).length;
  const categories = [...new Set(recommendations.map(r => r.category))];
  
  const birthDate = new Date(userInfo.birthDate);
  const today = new Date();
  const age = today.getFullYear() - birthDate.getFullYear();
  
  return {
    userName: userInfo.name,
    age,
    region: userInfo.regionName,
    district: userInfo.district,
    totalRecommendations,
    highPriorityCount,
    categories,
    topRecommendation: recommendations[0] || null,
    generatedAt: new Date().toISOString()
  };
}