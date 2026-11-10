# RENDI (렌디) 소개 웹사이트

스마트 렌터카 AI 보조 에이전트 **RENDI(렌디)**의 공식 서비스 소개 웹사이트입니다.

## 🎨 주요 디자인 사양
- **브랜드 메인 컬러**: 
  - Deep Navy: `#002c5f`
  - Pure White: `#FFFFFF`
- **인터랙션 스타일**: [Meisteryi Portfolio](https://meisteryi.github.io/YJH_Personal_Website/) 인터랙션을 계승하여, 메인 섹션에서 4대 핵심 키워드(로고 & 브랜드, 서비스 소개, 사업성, 차별성)를 클릭하면 하단에 상세 내용이 부드럽게 펼쳐지는 반응형 인터랙티브 구조로 구현되었습니다.

---

## 📂 4개 핵심 섹션 구성
1. **로고, 로고 설명, 이름 설명 (Brand Identity)**
   - **이름의 의미**: `RENT(렌터카)` + `BUDDY(버디)` = **RENDI**
   - 운전자의 곁에서 든든하게 길을 동행하고 안전 운행을 돕는 단짝 '버디(Buddy)' 같은 렌터카 AI 보조 에이전트
   - **로고 심볼**: 한국 렌터카 번호판 고유 기호인 **'하·허·호'의 자음 'ㅎ'**과 알파벳 **'R'**의 융합. 'R'의 동그란 루프와 상단의 두 개 바가 만나 한글 **'ㅎ'**을 완성하는 위트 있는 모빌리티 아이덴티티
   - **심미성 & 신뢰성**: 둥근 모서리(Squircle) 프레임과 Hyundai Navy `#002c5f` 컬러 시스템
2. **서비스 소개 (Service Overview & Demo Video Placeholder)**
   - 대화형 차량 매뉴얼 챗봇 (처음 타보는 차도 직관적인 음성/화면 조작 안내)
   - 비전 AI 차량 외관 스캔 (스크래치 사전 기록 및 분쟁 방지)
   - 긴급 상황 대응 및 현장 조치 가이드
   - **16:9 데모 영상 플레이스홀더** (추후 비디오 파일 `demo.mp4` 또는 유튜브 영상 임베드로 즉시 교체 가능)
3. **사업성 (Business Viability & Market)**
   - 국내 렌터카 100만 대 시장 및 단순 CS 문의(68%) 자동화 절감 효과
   - **B2B SaaS 모델**: 렌터카·카셰어링 플랫폼 전용 플러그인(차량당 월 구독 모델)
   - **B2C 프리미엄 모델**: 초보 운전자 안심 패키지, 경로 기반 맞춤 컨시어지
4. **차별성 (Competitive Advantage)**
   - 단순 예약에 그치는 기존 렌터카 앱 vs 탑승부터 반납까지 능동적 케어를 제공하는 RENDI
   - 기존 앱과의 비교표(상세 분석 테이블)
   - 3대 핵심 차별화(Multimodal AI, Contextual Safety Alert, Zero-Dispute Guarantee)

---

## 🚀 로컬 실행 방법

터미널에서 아래 명령어로 로컬 웹 서버를 실행하여 바로 확인할 수 있습니다:

```bash
# Python 3 내장 서버 실행
python3 -m http.server 8080
```
브라우저에서 `http://localhost:8080` 접속

---

## 📁 파일 구조
```
RenDiWebSite/
├── assets/
│   ├── rendi_icon.png      # 첨부해주신 정사각형 앱 아이콘 심볼
│   └── rendi_logo.png      # 첨부해주신 가로형 텍스트 풀 로고
├── index.html              # 메인 웹사이트 마크업 (Tailwind CSS, Lucide 아이콘)
├── style.css               # 브랜드 컬러(#002c5f) 및 키워드 인터랙션 스타일
├── script.js               # 키워드 탭 전환 애니메이션 및 데모 플레이어 로직
└── README.md
```

