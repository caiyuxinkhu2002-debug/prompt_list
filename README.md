# Prompt Master Pro 🚀

비즈니스 생산성 극대화를 위한 전문 프롬프트 큐레이션 및 AI 고도화 플랫폼입니다.

## 🌟 주요 기능 (Key Features)

- **AI Prompt Enhancer**: 단순한 요청을 구조적이고 전문적인 프롬프트로 변환 (Gemini 3 Flash 기반).
- **Prompt Library**: 10가지 카테고리, 100개 이상의 비즈니스 전문 프롬프트 수록.
- **Bi-lingual Support**: 한국어 및 영어 지원.
- **Copy to Clipboard**: 클릭 한 번으로 모든 프롬프트를 즉시 복사.
- **Modern UI**: 다크 모드 기반의 세련되고 반응형인 인터페이스.

## 🛠 기술 스택 (Tech Stack)

- **Frontend**: React 19, Vite, Tailwind CSS 4
- **Animation**: Motion (motion/react)
- **Icons**: Lucide React
- **AI Integration**: @google/genai (Gemini 3 Flash)
- **Language**: TypeScript

## 🚀 시작하기 (Getting Started)

1. **내부 개발 및 프리뷰**:
   AI Studio 환경에서는 이미 환경 변수가 구성되어 있습니다.

2. **퍼블리싱 (Deployment)**:
   앱을 외부로 공유하거나 퍼블리싱할 때는 반드시 다음 단계를 거쳐야 합니다:
   - AI Studio 우측 상단 **Settings** -> **Secrets** 클릭.
   - `GEMINI_API_KEY`라는 이름으로 API 키를 추가하세요.
   - 키를 추가한 후 **Deploy** 버튼을 클릭하여 배포를 완료하세요.

3. **로컬 개발**:
   `.env.example` 파일을 참고하여 `.env` 파일을 생성하고 `GEMINI_API_KEY`를 입력하세요.

## 📂 프로젝트 구조 (Project Structure)

- `/src/App.tsx`: 메인 애플리케이션 로직 및 UI.
- `/src/prompts.ts`: 프롬프트 라이브러리 데이터 (100선).
- `/src/index.css`: Tailwind CSS 및 글로벌 스타일.
- `/metadata.json`: 앱 메타데이터 및 권한 설정.

## 🤝 기여 방법 (Contributing)

이 프로젝트는 유지 보수 및 기능 확장을 환영합니다. 새로운 프롬프트 추가는 `/src/prompts.ts` 수정을 통해 가능합니다.
