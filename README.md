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

## 🧪 테스트

테스트 실행:
```bash
pytest
```

커버리지 리포트 생성:
```bash
pytest --cov=app --cov-report=html
```

## 📁 프로젝트 구조

```
backend/
└── app/
    ├── api/             # API 라우트
    ├── core/            # 핵심 설정
    ├── models/          # 데이터 모델
    ├── services/        # 비즈니스 로직
    └── tests/           # 테스트 코드
```

## 🔧 API 엔드포인트

### 주소 생성
```http
POST /api/v1/addresses/generate
```

### 건물 관리
```http
GET /api/v1/buildings
POST /api/v1/buildings
GET /api/v1/buildings/{id}
```

### 피드백 제출
```http
POST /api/v1/addresses/feedback
```

## 📚 기술 스택

- **프레임워크:** FastAPI
- **데이터베이스:** PostgreSQL + GeoAlchemy2
- **캐시:** Redis
- **AI/ML:** NumPy, scikit-learn
- **테스트:** pytest
- **문서화:** Swagger/OpenAPI

## 🤝 기여하기

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 라이선스

이 프로젝트는 MIT 라이선스 하에 배포됩니다. 자세한 내용은 [LICENSE](LICENSE) 파일을 참조하세요.

## 📧 연락처

프로젝트 관리자 - [@your_twitter](https://twitter.com/your_twitter) - email@example.com

프로젝트 링크: [https://github.com/your-username/repo-name](https://github.com/your-username/repo-name)
