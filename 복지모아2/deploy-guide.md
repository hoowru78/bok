# 🚀 복지모아2 간편 배포 가이드

Node.js 설치 없이 웹사이트를 배포하는 방법입니다.

## 방법 1: GitHub + Netlify 자동 배포 (추천)

### 1단계: GitHub 계정 준비
1. [GitHub.com](https://github.com) 회원가입/로그인
2. "New repository" 클릭
3. Repository name: `복지모아2` 또는 `welfare-recommendation`
4. Public 선택
5. "Create repository" 클릭

### 2단계: 파일 업로드
1. 생성된 저장소에서 "uploading an existing file" 클릭
2. 복지모아2 폴더의 모든 파일을 드래그&드롭
3. Commit message: "Initial commit"
4. "Commit changes" 클릭

### 3단계: Netlify 자동 배포
1. [Netlify.com](https://netlify.com) 로그인 (GitHub 계정으로)
2. "New site from Git" 클릭
3. GitHub 선택 → 복지모아2 저장소 선택
4. Build settings:
   - Build command: `npm install && npm run build`
   - Publish directory: `dist`
5. "Deploy site" 클릭

### 결과
- 자동으로 빌드되고 배포됩니다
- 고유 URL을 받게 됩니다 (예: https://복지모아.netlify.app)

## 방법 2: 정적 HTML 버전 (초간단)

HTML 파일만으로 작동하는 버전을 만들어드릴 수 있습니다.
React 없이 순수 HTML/CSS/JavaScript로 구현합니다.

## 방법 3: 온라인 IDE 사용

1. [CodeSandbox.io](https://codesandbox.io) 접속
2. "Create Sandbox" → "React" 선택
3. 파일들을 복사/붙여넣기
4. 자동으로 빌드되고 미리보기 제공
5. 배포 버튼 한 번 클릭으로 온라인 배포

## 도움이 필요하시면
어떤 방법을 선택하시든 단계별로 도와드리겠습니다!