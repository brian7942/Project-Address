This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.


frontend/
├── public/                      # 정적 자산 (아이콘, 이미지 등)
├── src/
│   ├── app/                     # Next.js 페이지 라우팅
│   │   ├── layout.tsx           # 전체 레이아웃 (헤더 포함)
│   │   ├── page.tsx             # 루트 페이지
│   │   └── map/
│   │       └── page.tsx         # 지도 페이지
│   ├── components/              # 재사용 가능한 UI 컴포넌트
│   │   ├── common/              # 버튼, 드롭다운, 토글 등 공통 UI
│   │   ├── layout/              # Header, Footer 등 레이아웃 요소
│   │   └── map/                 # 지도 관련 컴포넌트
│   │       ├── MapView.tsx
│   │       ├── AddressPopup.tsx
│   │       └── RegionSelector.tsx
│   ├── features/                # 도메인 단위의 기능 모듈
│   │   ├── buildings/           # 건물 관련 로직
│   │   │   ├── api.ts           # API 호출 모음
│   │   │   └── types.ts         # 타입 정의
│   │   └── regions/             # 행정구역 관련 로직
│   │       ├── api.ts
│   │       └── types.ts
│   ├── hooks/                   # 커스텀 훅
│   │   ├── useMap.ts
│   │   └── useLanguage.ts
│   ├── lib/                     # 공통 유틸 함수, API 클라이언트
│   │   ├── api.ts               # axios 인스턴스
│   │   └── i18n.ts              # 다국어 초기화
│   ├── context/                 # React Context (예: 선택된 건물, 언어 등)
│   │   └── MapContext.tsx
│   ├── styles/
│   │   ├── globals.css
│   │   └── map.css              # 지도 스타일
│   └── types/                   # 전역 타입 정의 (선택)
│       └── index.d.ts
├── .env.local                   # 환경 변수 (API 주소 등)
├── next.config.js               # Next.js 설정 (i18n 포함)
├── tailwind.config.ts           # Tailwind 설정
├── tsconfig.json                # TypeScript 설정
└── package.json
=======
# AI 기반 하이브리드 디지털 주소 시스템

## 📌 프로젝트 개요

AI 기반 하이브리드 디지털 주소 시스템은 도로 기반 정렬과 그리드 기반 정렬을 결합하여 효율적이고 직관적인 주소 체계를 제공합니다.

### 주요 특징

- 📍 데이터베이스 최소화: 건물 및 도로 데이터만 저장
- 🔄 실시간 주소 생성: 사용자 요청 시 즉시 생성
- 🌟 하이브리드 정렬: 도로 기반 + 그리드 기반 정렬 
- 🤖 AI 학습: 사용자 피드백 기반 지속적 개선
- 🎯 직관적 UI: AI 정렬 방식 시각화

## 🚀 시작하기

### 필수 요구사항

- Python 3.9+
- PostgreSQL 12+
- Redis 6+
- Poetry (선택사항)

### 설치 방법

1. 저장소 클론
```bash
git clone https://github.com/your-repo/digital-address-system.git
cd digital-address-system
```

2. 가상환경 생성 및 활성화
```bash
python -m venv venv
source venv/bin/activate  # Linux/Mac
venv\Scripts\activate  # Windows
```

3. 의존성 설치
```bash
pip install -r requirements.txt
```

4. 환경 변수 설정
```bash
cp .env.example .env
# .env 파일을 자신의 환경에 맞게 수정
```

5. 데이터베이스 마이그레이션
```bash
alembic upgrade head
```

### 실행 방법

개발 서버 실행:
```bash
uvicorn app.main:app --reload
```

프로덕션 서버 실행:
```bash
uvicorn app.main:app --host 0.0.0.0 --port 8000 --workers 4
```