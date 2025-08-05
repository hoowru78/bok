# 복지모아 (Welfare Recommendation Platform)

만 65세 이상 고령자를 위한 맞춤형 복지 추천 웹사이트입니다.

## 📋 프로젝트 개요

복지모아는 고령자의 건강, 생활, 경제 상황을 종합적으로 분석하여 개인에게 최적화된 복지 혜택을 추천하는 서비스입니다. 복잡한 복지 제도를 쉽게 이해할 수 있도록 노인 친화적인 UI/UX로 설계되었습니다.

### 주요 특징

- 🔒 **로그인 없는 간편 이용**: 이름, 생년월일, 거주지만으로 이용 가능
- 🎯 **AI 맞춤 추천**: 설문 응답을 기반으로 한 개인별 복지 추천
- ♿ **접근성 최적화**: 글자 크기 조절, 고대비 모드, 음성 안내 지원
- 🔐 **개인정보 보호**: AES-256 암호화 및 1년 후 자동 삭제
- 📱 **반응형 디자인**: 모바일, 태블릿, 데스크톱 모든 기기 지원

## 🚀 기술 스택

### Frontend
- **React 18** - 사용자 인터페이스
- **Tailwind CSS** - 스타일링 및 반응형 디자인
- **React Router** - 클라이언트 사이드 라우팅
- **Lucide React** - 아이콘 라이브러리
- **Vite** - 빌드 도구

### Backend & Database
- **Local Storage** - 클라이언트 사이드 데이터 저장 (암호화)
- **Firebase** - 향후 확장을 위한 준비 (선택사항)

### Deployment
- **Netlify** - 정적 사이트 호스팅
- **GitHub Actions** - CI/CD 파이프라인

## 📱 주요 기능

### 1. 사용자 정보 입력
- 만 65세 이상 연령 검증
- 거주지 기반 지역별 복지 추천
- 개인정보 최소 수집 원칙

### 2. 3단계 설문 시스템
- **건강 상태**: 현재 건강 상황 및 의료 필요도
- **생활 상황**: 거주 형태 및 돌봄 필요도  
- **경제 상황**: 소득 수준 및 경제적 지원 필요도

### 3. AI 복지 추천
- 설문 응답 기반 매칭 점수 계산
- 복지 자료 텍스트 파일 기반 추천 로직
- 추천 이유 및 신청 자격 상세 안내

### 4. 접근성 기능
- **글자 크기**: 3단계 조절 (기본/확대1/확대2)
- **고대비 모드**: 시각 장애인 지원
- **음성 안내**: TTS를 통한 화면 읽기

## 🛠 설치 및 실행

### 필수 요구사항
- Node.js 18 이상
- npm 또는 yarn

### 로컬 개발 환경 설정

1. **저장소 클론**
```bash
git clone https://github.com/your-username/welfare-recommendation.git
cd welfare-recommendation
```

2. **의존성 설치**
```bash
npm install
```

3. **환경 변수 설정**
```bash
cp .env.example .env
```

4. **개발 서버 실행**
```bash
npm run dev
```

5. **브라우저에서 확인**
```
http://localhost:3000
```

### 빌드 및 배포

```bash
# 프로덕션 빌드
npm run build

# 로컬에서 프로덕션 빌드 미리보기
npm run preview
```

## 📁 프로젝트 구조

```
복지모아2/
├── public/                 # 정적 파일
├── src/
│   ├── components/         # 재사용 가능한 컴포넌트
│   │   ├── Header.jsx
│   │   └── Footer.jsx
│   ├── pages/             # 페이지 컴포넌트
│   │   ├── HomePage.jsx
│   │   ├── UserInfoPage.jsx
│   │   ├── SurveyPage.jsx
│   │   ├── RecommendationsPage.jsx
│   │   ├── WelfareDetailPage.jsx
│   │   ├── HelpPage.jsx
│   │   ├── AccessibilityPage.jsx
│   │   └── PrivacyPage.jsx
│   ├── hooks/             # 커스텀 훅
│   │   └── useAccessibility.jsx
│   ├── utils/             # 유틸리티 함수
│   │   ├── welfareRecommendation.js
│   │   └── firebase.js
│   ├── data/              # 데이터 파일
│   │   └── welfareData.js
│   ├── styles/            # 스타일 파일
│   │   └── index.css
│   ├── App.jsx            # 메인 앱 컴포넌트
│   └── main.jsx           # 엔트리 포인트
├── .env.example           # 환경 변수 예시
├── netlify.toml           # Netlify 배포 설정
├── tailwind.config.js     # Tailwind CSS 설정
├── vite.config.js         # Vite 설정
└── package.json           # 프로젝트 의존성
```

## 🧪 복지 추천 로직

### 매칭 점수 계산
1. **필수 조건 검사**: 연령, 소득, 거주지 등 기본 자격 요건
2. **설문 응답 분석**: 건강, 생활, 경제 상황별 점수 계산
3. **보너스 점수 적용**: 특별한 상황에 대한 가산점
4. **최종 매칭도**: 0-100점 스케일로 표준화

### 추천 우선순위
- 매칭 점수 70점 이상만 추천 대상
- 점수 순으로 정렬하여 표시
- 카테고리별 필터링 지원

## ♿ 접근성 지원

### WCAG 2.2 준수
- **Level A**: 키보드 접근, 대체 텍스트, 색상 독립성
- **Level AA**: 대비비 4.5:1, 텍스트 확대, 포커스 표시

### 고령자 친화적 설계
- 최소 44px 터치 영역
- 직관적인 언어 사용
- 단순하고 명확한 인터페이스
- 충분한 여백과 간격

## 🔐 보안 및 개인정보 보호

### 데이터 보호
- 클라이언트 사이드 AES-256 암호화
- HTTPS 전송 보안
- 개인정보 최소 수집
- 1년 후 자동 삭제

### 프라이버시 정책
- 제3자 제공 금지
- 수집 목적 명시
- 사용자 권리 보장
- 투명한 데이터 처리

## 🌐 배포

### Netlify 자동 배포
1. GitHub 저장소 연결
2. 빌드 설정: `npm run build`
3. 배포 디렉토리: `dist`
4. 환경 변수 설정

### 도메인 설정
- 주 도메인: `https://복지모아.kr`
- SSL 인증서 자동 적용
- CDN을 통한 전역 배포

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이센스

이 프로젝트는 MIT 라이센스 하에 배포됩니다. 자세한 내용은 `LICENSE` 파일을 참조하세요.

## 📞 문의하기

- **고객지원**: 1588-0000
- **이메일**: contact@bokjimoa.kr
- **개인정보 문의**: privacy@bokjimoa.kr

## 🙏 감사의 말

복지모아는 고령자의 복지 접근성 향상을 위해 개발되었습니다. 모든 어르신이 디지털 격차 없이 복지 혜택을 받을 수 있기를 희망합니다.

---

**복지모아** - 어르신을 위한 따뜻한 기술 💙