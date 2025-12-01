# Directional Board

Next.js 16 기반 [Directional] 프론트엔드 채용 과제

## 실행 방법
```bash
# 패키지 설치
pnpm install

# 개발 서버 실행
pnpm dev

# 빌드
pnpm build
```
## 환경변수 설정

`.env.local` 파일 생성:
```
NEXT_PUBLIC_API_BASE_URL=https://fe-hiring-rest-api.vercel.app
```


## 기술 스택

### Core
- **Next.js 16** (App Router) - 최신 React 서버 컴포넌트 지원
- **TypeScript** - 타입 안정성
- **pnpm** - npm 대비 빠른 설치 속도, 디스크 효율성

### 상태 관리
- **Zustand** - Redux 대비 보일러플레이트 최소화, 간결한 API
- **TanStack Query** - 서버 상태 관리, 캐싱, 무한스크롤 지원

### HTTP Client
- **ky** - axios(~13KB) 대비 경량(~3KB), fetch 기반 modern API

### UI
- **MUI** - 개인적으로 선호하는 라이브러리는 아니지만, 빠른 개발 속도와 시간 엄수를 위해 채택. 완성도 높은 컴포넌트 제공
- **Tailwind CSS** - 유틸리티 기반 빠른 스타일링

### 폼 & 검증
- **react-hook-form** - 비제어 컴포넌트 기반 성능 최적화
- **Zod** - 타입 추론 + 런타임 검증 통합

### 차트
- **ApexCharts** - 다양한 차트 타입, 인터랙티브 기능 지원

## 주요 기능

### 1. 인증 시스템
- JWT 토큰 기반 로그인/로그아웃
- Zustand persist로 토큰 자동 저장
- withAuth HOC로 보호된 라우트 처리
- returnUrl 파라미터로 로그인 후 원래 페이지 복귀

### 2. 게시판 CRUD
- 게시글 목록 (무한스크롤, 커서 기반 페이지네이션)
- 카테고리 필터 (NOTICE, QNA, FREE)
- 정렬 (최신순, 오래된순, 제목순)
- 검색 기능
- 게시글 작성/수정/삭제
- 금칙어 필터링 (Zod refine)

### 3. 차트 시각화

#### (1) 바 차트 / 도넛 차트
- `/mock/weekly-mood-trend` - 주간 무드 분포
- `/mock/popular-snack-brands` - 인기 간식 브랜드

#### (2) 스택형 바 / 면적 차트
- `/mock/weekly-mood-trend` - Happy, Tired, Stressed 누적
- `/mock/weekly-workout-trend` - Running, Cycling, Stretching 누적
- Y축 백분율(%) 표시
- X축 주차(week) 표시

#### (3) 멀티라인 차트 (듀얼 Y축)
- `/mock/coffee-consumption` - 커피 소비 vs 버그/생산성
- `/mock/snack-impact` - 간식 vs 회의불참/사기

**멀티라인 차트 기능:**
- X축: 커피 섭취량(잔/일), 스낵 수
- 왼쪽 Y축: 버그 수, 회의불참
- 오른쪽 Y축: 생산성 점수, 사기
- 실선: 버그/회의불참 (왼쪽 Y축)
- 점선: 생산성/사기 (오른쪽 Y축)
- 마커 구분: 원형(●) - 버그/회의불참, 사각형(■) - 생산성/사기
- 동일 팀 동일 색상 유지
- 호버 시 해당 팀 데이터만 툴팁 표시

#### (4) 차트 공통 기능
- **범례(Legend)** 표시
- **색상 변경** - ColorPicker로 각 시리즈 색상 커스터마이징
- **데이터 보이기/숨기기** - 범례 클릭 시 토글

## 프로젝트 구조
```
src/
├── app/                    # 페이지 (App Router)
│   ├── login/
│   ├── posts/
│   │   ├── [id]/
│   │   │   └── edit/
│   │   └── new/
│   └── charts/
├── components/
│   ├── atoms/              # Button, Input, Select, Tag, TextArea, ChartWrapper
│   ├── molecules/          # SearchBar, CategoryFilter, SortSelect
│   ├── organisms/          # PostTable, PostForm, LoginForm, charts/
│   └── hoc/                # withAuth
├── hooks/                  # useAuth, usePosts, useCharts, useToast
├── stores/                 # authStore (Zustand)
├── lib/                    # api, endpoints, utils, validations
├── types/                  # auth.types, post.types, chart.types
├── constants/              # forbidden (금칙어)
└── styles/                 # theme (COLORS, CHART_COLORS)
```

## 테스트 계정
```
Email: heeheehee.hj@gmail.com
Password: B2iD4kF6L8
```