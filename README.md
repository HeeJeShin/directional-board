# Directional Board

Next.js 16 기반 게시판 + 차트 대시보드 프로젝트입니다.

## 실행 방법

```bash
pnpm install
pnpm dev      # 개발 서버 (http://localhost:3000)
pnpm build    # 프로덕션 빌드
```

`.env.local` 파일:
```
NEXT_PUBLIC_API_BASE_URL=https://fe-hiring-rest-api.vercel.app
```

## 테스트 계정

```
Email: heeheehee.hj@gmail.com
Password: B2iD4kF6L8
```

---

## 메뉴 구성

| 메뉴 | 경로 | 설명 |
|------|------|------|
| **내 게시물 보기** | `/posts` | 로그인 후 본인 게시물 CRUD (작성/수정/삭제) |
| **차트** | `/charts` | 다양한 차트 시각화 (바/도넛/스택/멀티라인) |
| **게시판(목업)** | `/posts/mock` | 가상 데이터 무한스크롤 테스트용 ⚠️ |

> ⚠️ **게시판(목업)**은 원래 요구사항에 없는 기능입니다.
> TanStack Table + 가상 무한스크롤 동작 확인을 위해 추가했습니다.

---

## 주요 기능

### 인증
- JWT 토큰 기반 로그인/로그아웃
- Zustand persist로 토큰 자동 저장
- withAuth HOC로 보호된 라우트 처리

### 게시판 CRUD
- 무한스크롤 (커서 기반 페이지네이션)
- 카테고리 필터 (NOTICE, QNA, FREE)
- 정렬 (최신순, 오래된순, 제목순)
- 검색 기능
- 금칙어 필터링 (Zod refine)

### 차트 시각화
- **바/도넛 차트**: 주간 무드, 인기 간식 브랜드
- **스택형 바/면적 차트**: 무드/운동 트렌드 (Y축 백분율)
- **멀티라인 차트 (듀얼 Y축)**: 커피 소비 vs 버그/생산성, 간식 vs 회의불참/사기
- 공통: 범례, 색상 변경(ColorPicker), 데이터 토글

---

## 기술 스택

| 분류 | 기술 |
|------|------|
| **Core** | Next.js 16 (App Router), TypeScript, pnpm |
| **상태 관리** | Zustand, TanStack Query |
| **HTTP** | ky (~3KB, fetch 기반) |
| **UI** | MUI, Tailwind CSS |
| **폼 검증** | react-hook-form, Zod |
| **차트** | ApexCharts |

---

## 프로젝트 구조

```
src/
├── app/                    # 페이지 (App Router)
│   ├── posts/              # 게시판
│   │   ├── [id]/edit/      # 수정
│   │   ├── mock/           # 목업 (무한스크롤 테스트)
│   │   └── new/            # 작성
│   └── charts/             # 차트
├── components/
│   ├── atoms/              # Button, Input, ChartWrapper 등
│   ├── molecules/          # SearchBar, CategoryFilter 등
│   ├── organisms/          # PostTable, PostForm, charts/
│   └── hoc/                # withAuth
├── hooks/                  # useAuth, usePosts, useChart
├── stores/                 # authStore (Zustand)
├── lib/                    # api, endpoints, validations
├── types/                  # TypeScript 타입 정의
├── constants/              # forbidden (금칙어)
└── styles/                 # theme (COLORS)
```
