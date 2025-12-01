# [Directional] 프론트엔드 채용 과제

제출자 : 신희제

## 프로젝트 실행 방법

### 1. 의존성 설치
```bash
pnpm install
```

### 2. 환경변수 설정

`.env.local` 파일 생성:
```
NEXT_PUBLIC_API_BASE_URL=https://fe-hiring-rest-api.vercel.app
```

### 3. 개발 서버 실행
```bash
pnpm dev
```

http://localhost:3000 에서 확인

### 4. 빌드
```bash
pnpm build
pnpm start
```

---

## 사용한 기술 스택

| 분류 | 기술 |
|------|------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript |
| **UI** | MUI + Tailwind CSS |
| **상태관리** | Zustand (persist) |
| **서버상태** | TanStack Query (React Query) |
| **HTTP 클라이언트** | ky |
| **테이블** | TanStack Table |
| **차트** | ApexCharts |
| **폼/검증** | react-hook-form + Zod |
| **무한스크롤** | react-intersection-observer |
| **패키지 매니저** | pnpm |

---

## 주요 구현 기능 요약

### 1. 게시판 (CRUD)

- 게시글 작성 / 조회 / 수정 / 삭제
- 커서 기반 무한스크롤 페이지네이션
- 제목/본문 검색 (AND 매칭)
- 정렬: `title`, `createdAt` (오름/내림차순)
- 필터: 카테고리별 (`NOTICE`, `QNA`, `FREE`)
- 금칙어 필터 (캄보디아, 프놈펜, 불법체류, 텔레그램)
- 테이블 컬럼 리사이징 및 숨김/보임 기능

### 2. 데이터 시각화 (8개 차트)

| 차트 유형 | 데이터 |
|----------|--------|
| 바 차트 | 커피 브랜드, 간식 브랜드 |
| 도넛 차트 | 커피 브랜드, 간식 브랜드 |
| 스택형 바 차트 | 주간 무드, 주간 운동 |
| 스택형 면적 차트 | 주간 무드, 주간 운동 |
| 멀티라인 차트 | 커피 소비/생산성, 간식/사기 |

**차트 공통 기능:**
- 범례 표시
- 범례에서 색상 변경
- 범례에서 데이터 보이기/숨기기

### 3. 인증

- JWT 토큰 기반 인증
- Zustand persist로 토큰 관리 (새로고침 시 유지)

---

## 프로젝트 구조
```
src/
├── app/                    # 페이지
│   ├── posts/              # 게시판
│   └── charts/             # 차트
├── components/             # 아토믹 디자인
│   ├── atoms/
│   ├── molecules/
│   ├── organisms/
│   └── templates/
├── hooks/                  # 커스텀 훅 (useAuth, usePosts, useCharts)
├── stores/                 # Zustand 스토어
├── lib/                    # API, 유틸리티
├── types/                  # 타입 정의
├── constants/              # 상수 (금칙어 등)
└── styles/                 # 스타일
```

---

## 커밋 컨벤션
```
[Feat]     기능 추가
[Fix]      버그/오류 해결
[Refactor] 코드 리팩토링
[Style]    포맷팅, 세미콜론 등
[Chore]    설정, 빌드, 패키지 등
[Docs]     문서 수정
[Test]     테스트 추가/수정
```