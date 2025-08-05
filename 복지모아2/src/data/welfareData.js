// 복지 항목 데이터
export const welfareItems = [
  {
    id: 'basic-pension',
    name: '기초연금',
    category: '경제',
    description: '만 65세 이상 어르신께 매월 일정액을 지급하는 기초연금',
    targetAge: { min: 65, max: null },
    eligibility: {
      age: '만 65세 이상',
      income: '소득 하위 70%',
      residence: '대한민국 거주',
      conditions: ['국민연금 가입기간 10년 미만', '소득인정액 기준 충족']
    },
    benefits: {
      amount: '월 최대 334,810원 (2024년 기준)',
      description: '매월 계좌입금',
      duration: '65세부터 평생'
    },
    applicationMethod: {
      online: 'https://www.bokjiro.go.kr',
      offline: '주민센터 방문 신청',
      phone: '국민연금공단 1355',
      documents: ['신분증', '통장사본', '소득관련 서류']
    },
    responsibleAgency: {
      name: '국민연금공단',
      phone: '1355',
      website: 'https://www.nps.or.kr'
    },
    regionScope: '전국',
    tags: ['경제지원', '생활비', '노후보장'],
    isActive: true
  },
  {
    id: 'long-term-care',
    name: '노인장기요양보험',
    category: '건강',
    description: '일상생활이 어려운 고령자에게 신체활동 및 가사활동 지원',
    targetAge: { min: 65, max: null },
    eligibility: {
      age: '만 65세 이상 또는 치매·뇌혈관질환 등 노인성 질병',
      condition: '장기요양등급 1~5등급 인정',
      residence: '대한민국 거주'
    },
    benefits: {
      services: ['방문요양', '방문목욕', '방문간호', '주야간보호', '단기보호', '복지용구'],
      coverage: '본인부담금 15~20%',
      description: '전문인력이 가정 또는 시설에서 돌봄서비스 제공'
    },
    applicationMethod: {
      online: 'https://www.longtermcare.or.kr',
      offline: '국민건강보험공단 지사 방문',
      phone: '1577-1000',
      documents: ['신청서', '의사소견서', '신분증']
    },
    responsibleAgency: {
      name: '국민건강보험공단',
      phone: '1577-1000',
      website: 'https://www.longtermcare.or.kr'
    },
    regionScope: '전국',
    tags: ['건강관리', '돌봄서비스', '일상생활지원'],
    isActive: true
  },
  {
    id: 'energy-voucher',
    name: '에너지바우처',
    category: '생활',
    description: '저소득층의 전기·도시가스·지역난방비 지원',
    targetAge: { min: null, max: null },
    eligibility: {
      income: '생계급여 또는 의료급여 수급자',
      household: '차상위계층',
      condition: '소득인정액 기준 충족'
    },
    benefits: {
      amount: '여름철 49,000원, 겨울철 113,300원',
      description: '전기·가스·지역난방비 할인',
      period: '연 2회 (하절기, 동절기)'
    },
    applicationMethod: {
      online: '에너지바우처 홈페이지',
      offline: '주민센터 방문',
      phone: '1600-3190',
      documents: ['신청서', '신분증', '소득확인서류']
    },
    responsibleAgency: {
      name: '한국에너지공단',
      phone: '1600-3190',
      website: 'https://energyvoucher.kemco.or.kr'
    },
    regionScope: '전국',
    tags: ['생활비지원', '에너지비', '난방비'],
    isActive: true
  },
  {
    id: 'senior-housing',
    name: '고령자 주거지원',
    category: '주거',
    description: '고령자를 위한 주거비 지원 및 주거환경 개선',
    targetAge: { min: 65, max: null },
    eligibility: {
      age: '만 65세 이상',
      income: '소득 하위 50%',
      housing: '자가 또는 전월세 거주'
    },
    benefits: {
      services: ['주거급여', '주택개량', '안전시설 설치'],
      amount: '월세지원 또는 개량비 지원',
      description: '주거비 부담 경감 및 안전한 주거환경 조성'
    },
    applicationMethod: {
      offline: '주민센터 방문 신청',
      phone: '주민센터 문의',
      documents: ['신청서', '소득확인서류', '임대차계약서']
    },
    responsibleAgency: {
      name: '지방자치단체',
      phone: '주민센터',
      website: '지역별 상이'
    },
    regionScope: '지역',
    tags: ['주거지원', '주거환경개선', '안전시설'],
    isActive: true
  },
  {
    id: 'health-checkup',
    name: '노인 건강검진',
    category: '건강',
    description: '만 66세 이상 어르신 생애전환기 건강진단',
    targetAge: { min: 66, max: null },
    eligibility: {
      age: '만 66세 이상 (짝수년도 출생자)',
      insurance: '건강보험 가입자 및 피부양자'
    },
    benefits: {
      services: ['암검진', '생활습관병검진', '치매선별검사', '우울증검사'],
      cost: '무료 (건강보험 적용)',
      description: '조기진단을 통한 건강관리'
    },
    applicationMethod: {
      online: '건강검진 예약시스템',
      phone: '검진기관 직접 예약',
      documents: ['신분증', '건강보험증']
    },
    responsibleAgency: {
      name: '국민건강보험공단',
      phone: '1577-1000',
      website: 'https://www.nhis.or.kr'
    },
    regionScope: '전국',
    tags: ['건강검진', '예방의학', '조기진단'],
    isActive: true
  },
  {
    id: 'senior-job',
    name: '노인일자리',
    category: '경제',
    description: '만 60세 이상 어르신 일자리 및 사회활동 지원',
    targetAge: { min: 60, max: null },
    eligibility: {
      age: '만 60세 이상',
      health: '활동 가능한 건강상태',
      income: '기준중위소득 이하'
    },
    benefits: {
      types: ['공익활동', '사회서비스형', '시장형', '취업알선형'],
      payment: '월 27만원 ~ 71만원',
      description: '일자리 제공 및 소득창출 지원'
    },
    applicationMethod: {
      offline: '노인일자리전담기관 방문',
      phone: '전담기관 문의',
      documents: ['신청서', '신분증', '건강진단서']
    },
    responsibleAgency: {
      name: '한국노인인력개발원',
      phone: '02-6925-9500',
      website: 'https://www.kordi.or.kr'
    },
    regionScope: '전국',
    tags: ['일자리', '소득창출', '사회참여'],
    isActive: true
  },
  {
    id: 'transportation-support',
    name: '교통비 지원',
    category: '생활',
    description: '고령자 대중교통 이용료 할인 및 지원',
    targetAge: { min: 65, max: null },
    eligibility: {
      age: '만 65세 이상',
      residence: '해당 지역 거주'
    },
    benefits: {
      discount: '지하철·버스 무료 또는 할인',
      services: ['교통카드 발급', '택시 할인쿠폰'],
      description: '대중교통 이용 부담 경감'
    },
    applicationMethod: {
      offline: '지하철역, 주민센터',
      documents: ['신분증', '사진']
    },
    responsibleAgency: {
      name: '지방자치단체',
      phone: '지역별 상이',
      website: '지역별 상이'
    },
    regionScope: '지역',
    tags: ['교통비', '이동편의', '할인혜택'],
    isActive: true
  }
];

// 설문 질문 데이터
export const surveyQuestions = {
  health: [
    {
      id: 'h1',
      question: '현재 건강 상태는 어떠신가요?',
      type: 'radio',
      options: [
        { value: 'very-good', label: '매우 좋음', score: 10 },
        { value: 'good', label: '좋음', score: 8 },
        { value: 'normal', label: '보통', score: 6 },
        { value: 'poor', label: '나쁨', score: 4 },
        { value: 'very-poor', label: '매우 나쁨', score: 2 }
      ],
      required: true
    },
    {
      id: 'h2',
      question: '현재 복용 중인 약물이 있으신가요?',
      type: 'radio',
      options: [
        { value: 'none', label: '없음', score: 10 },
        { value: 'some', label: '1-2개', score: 7 },
        { value: 'many', label: '3개 이상', score: 4 }
      ],
      required: true
    },
    {
      id: 'h3',
      question: '일상생활에서 거동이 불편하신가요?',
      type: 'radio',
      options: [
        { value: 'no-problem', label: '전혀 불편하지 않음', score: 10 },
        { value: 'little', label: '조금 불편함', score: 7 },
        { value: 'moderate', label: '꽤 불편함', score: 4 },
        { value: 'severe', label: '매우 불편함', score: 1 }
      ],
      required: true
    },
    {
      id: 'h4',
      question: '정기적으로 병원에 다니고 계신가요?',
      type: 'radio',
      options: [
        { value: 'no', label: '다니지 않음', score: 10 },
        { value: 'sometimes', label: '가끔', score: 7 },
        { value: 'regular', label: '정기적으로', score: 4 }
      ],
      required: true
    }
  ],
  living: [
    {
      id: 'l1',
      question: '현재 거주 형태는 어떻게 되시나요?',
      type: 'radio',
      options: [
        { value: 'with-family', label: '가족과 함께', score: 8 },
        { value: 'couple', label: '배우자와 함께', score: 7 },
        { value: 'alone', label: '혼자 거주', score: 3 }
      ],
      required: true
    },
    {
      id: 'l2',
      question: '일상생활에서 도움을 받을 수 있는 사람이 있으신가요?',
      type: 'radio',
      options: [
        { value: 'always', label: '항상 도움받을 수 있음', score: 10 },
        { value: 'sometimes', label: '필요시 도움받을 수 있음', score: 7 },
        { value: 'rarely', label: '도움받기 어려움', score: 3 },
        { value: 'never', label: '전혀 도움받을 수 없음', score: 1 }
      ],
      required: true
    },
    {
      id: 'l3',
      question: '집안일(청소, 요리, 빨래 등)을 혼자서 하실 수 있나요?',
      type: 'radio',
      options: [
        { value: 'all', label: '모든 일을 혼자 할 수 있음', score: 10 },
        { value: 'most', label: '대부분 혼자 할 수 있음', score: 8 },
        { value: 'some', label: '일부만 혼자 할 수 있음', score: 5 },
        { value: 'none', label: '혼자 하기 어려움', score: 2 }
      ],
      required: true
    },
    {
      id: 'l4',
      question: '주거환경에 대해 어떻게 생각하시나요?',
      type: 'radio',
      options: [
        { value: 'very-good', label: '매우 만족', score: 10 },
        { value: 'good', label: '만족', score: 8 },
        { value: 'normal', label: '보통', score: 6 },
        { value: 'poor', label: '불만족', score: 3 },
        { value: 'very-poor', label: '매우 불만족', score: 1 }
      ],
      required: true
    }
  ],
  economic: [
    {
      id: 'e1',
      question: '현재 소득 상황은 어떠신가요?',
      type: 'radio',
      options: [
        { value: 'sufficient', label: '충분함', score: 10 },
        { value: 'moderate', label: '보통', score: 7 },
        { value: 'insufficient', label: '부족함', score: 4 },
        { value: 'very-insufficient', label: '매우 부족함', score: 1 }
      ],
      required: true
    },
    {
      id: 'e2',
      question: '의료비 부담이 어느 정도인가요?',
      type: 'radio',
      options: [
        { value: 'no-burden', label: '부담 없음', score: 10 },
        { value: 'light', label: '약간 부담', score: 7 },
        { value: 'heavy', label: '많이 부담', score: 4 },
        { value: 'very-heavy', label: '매우 부담', score: 1 }
      ],
      required: true
    },
    {
      id: 'e3',
      question: '생활비 지원이 필요하다고 생각하시나요?',
      type: 'radio',
      options: [
        { value: 'not-needed', label: '필요하지 않음', score: 10 },
        { value: 'little-needed', label: '조금 필요', score: 7 },
        { value: 'needed', label: '필요함', score: 4 },
        { value: 'very-needed', label: '매우 필요함', score: 1 }
      ],
      required: true
    },
    {
      id: 'e4',
      question: '현재 연금을 받고 계신가요?',
      type: 'checkbox',
      options: [
        { value: 'national-pension', label: '국민연금', score: 5 },
        { value: 'basic-pension', label: '기초연금', score: 3 },
        { value: 'private-pension', label: '사적연금', score: 7 },
        { value: 'none', label: '받지 않음', score: 1 }
      ],
      required: true
    }
  ]
};

// 복지 매칭 규칙
export const matchingRules = {
  'basic-pension': {
    requiredConditions: [
      { category: 'age', min: 65 },
      { category: 'economic', questions: ['e1', 'e3'], minScore: 8 }
    ],
    bonusConditions: [
      { category: 'economic', question: 'e4', value: 'none', bonus: 10 }
    ]
  },
  'long-term-care': {
    requiredConditions: [
      { category: 'age', min: 65 },
      { category: 'health', questions: ['h3', 'h4'], maxScore: 15 }
    ],
    bonusConditions: [
      { category: 'living', question: 'l1', value: 'alone', bonus: 15 },
      { category: 'living', question: 'l2', values: ['rarely', 'never'], bonus: 10 }
    ]
  },
  'energy-voucher': {
    requiredConditions: [
      { category: 'economic', questions: ['e1', 'e3'], maxScore: 10 }
    ]
  },
  'senior-housing': {
    requiredConditions: [
      { category: 'age', min: 65 },
      { category: 'living', question: 'l4', values: ['poor', 'very-poor'] }
    ],
    bonusConditions: [
      { category: 'economic', questions: ['e1'], maxScore: 7, bonus: 10 }
    ]
  },
  'health-checkup': {
    requiredConditions: [
      { category: 'age', min: 66 }
    ],
    bonusConditions: [
      { category: 'health', question: 'h4', value: 'no', bonus: 15 }
    ]
  },
  'senior-job': {
    requiredConditions: [
      { category: 'age', min: 60, max: 75 },
      { category: 'health', questions: ['h1', 'h3'], minScore: 14 }
    ],
    bonusConditions: [
      { category: 'economic', question: 'e1', values: ['insufficient', 'very-insufficient'], bonus: 10 }
    ]
  },
  'transportation-support': {
    requiredConditions: [
      { category: 'age', min: 65 }
    ],
    bonusConditions: [
      { category: 'health', question: 'h3', values: ['moderate', 'severe'], bonus: 10 }
    ]
  }
};