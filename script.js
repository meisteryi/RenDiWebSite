// RENDI Website Interactive Logic

const sections = ['identity', 'service', 'business', 'differentiation'];
let currentSection = 'identity';

function selectSection(sectionId, smoothScroll = false) {
  if (!sections.includes(sectionId)) return;
  currentSection = sectionId;

  // 1. Update Keyword Buttons styling (Meisteryi style)
  sections.forEach((id) => {
    const btn = document.getElementById(`btn-${id}`);
    const navBtn = document.querySelector(`.nav-link[data-target="${id}"]`);
    const panel = document.getElementById(`panel-${id}`);

    if (id === sectionId) {
      if (btn) btn.classList.add('active');
      if (navBtn) navBtn.classList.add('active');
      if (panel) {
        panel.classList.remove('hidden');
        panel.style.display = 'block';
      }
    } else {
      if (btn) btn.classList.remove('active');
      if (navBtn) navBtn.classList.remove('active');
      if (panel) {
        panel.classList.add('hidden');
        panel.style.display = 'none';
      }
    }
  });

  // Re-run Lucide icons creation for newly visible elements
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Smooth scroll to interactive section if requested
  if (smoothScroll) {
    const targetElement = document.getElementById('interactive-showcase');
    if (targetElement) {
      const topOffset = targetElement.getBoundingClientRect().top + window.pageYOffset - 90;
      window.scrollTo({
        top: topOffset,
        behavior: 'smooth'
      });
    }
  }

  // Update hash without jumping
  if (history.replaceState) {
    history.replaceState(null, null, `#${sectionId}`);
  }
}

// Mobile Nav Toggle
function toggleMobileNav() {
  const mobileNav = document.getElementById('mobile-nav');
  if (mobileNav) {
    mobileNav.classList.toggle('hidden');
  }
}

// On DOM Loaded
document.addEventListener('DOMContentLoaded', () => {
  // Initialize lucide icons
  if (window.lucide) {
    window.lucide.createIcons();
  }

  // Check URL hash
  const hash = window.location.hash.replace('#', '');
  if (sections.includes(hash)) {
    selectSection(hash);
  } else {
    selectSection('identity');
  }

  // Demo video placeholder click interaction
  const demoVideoContainer = document.getElementById('demo-video-container');
  if (demoVideoContainer) {
    demoVideoContainer.addEventListener('click', () => {
      alert('🎥 RENDI 시연 영상은 현재 제작/등록 준비 중입니다.\n향후 데모 비디오 파일(MP4) 또는 유튜브 링크를 연결할 수 있습니다.');
    });
  }
});

// Demo View Switcher (Video vs Interactive Simulator)
function switchDemoView(viewType) {
  const videoBtn = document.getElementById('tab-demo-video');
  const simBtn = document.getElementById('tab-demo-simulator');
  const videoContainer = document.getElementById('demo-video-container');
  const simContainer = document.getElementById('demo-simulator-container');

  if (viewType === 'simulator') {
    simBtn.classList.replace('bg-white', 'bg-[#002c5f]');
    simBtn.classList.replace('text-slate-700', 'text-white');
    videoBtn.classList.replace('bg-[#002c5f]', 'bg-white');
    videoBtn.classList.replace('text-white', 'text-slate-700');
    videoBtn.classList.add('border', 'border-slate-200');

    videoContainer.classList.add('hidden');
    simContainer.classList.remove('hidden');
  } else {
    videoBtn.classList.replace('bg-white', 'bg-[#002c5f]');
    videoBtn.classList.replace('text-slate-700', 'text-white');
    videoBtn.classList.remove('border', 'border-slate-200');
    simBtn.classList.replace('bg-[#002c5f]', 'bg-white');
    simBtn.classList.replace('text-white', 'text-slate-700');

    videoContainer.classList.remove('hidden');
    simContainer.classList.add('hidden');
  }

  if (window.lucide) {
    window.lucide.createIcons();
  }
}

// Interactive Simulator Scenarios (Synced with RentACarAgent README Demo)
const simScenarios = {
  1: {
    question: "🚗 [출발 전] 평소 차량 'SUV' 선택 (더 뉴 아이오닉 5 탑승)",
    answer: "<strong>[출발 전 비교 브리핑 · Pleos TTS]</strong><br/>\"더 뉴 아이오닉 5는 평소 타시던 SUV와 변속과 감속 방식이 다를 수 있습니다. 평소 기어봉을 쓰셨다면, 이 차는 브레이크 페달을 밟은 채 <strong>변속 다이얼을 돌려 D나 R을 고르고, 주차할 때는 P 버튼</strong>을 누릅니다. 또 전기차라서 주행 중에는 <strong>회생 제동</strong>이 자동으로 작동하니, 처음에는 감속되는 느낌을 확인하며 천천히 출발하세요.\""
  },
  2: {
    question: "🚘 [주행 D · 70km/h] \"렌디\" → \"스마트 크루즈 어떻게 켜?\"",
    answer: "<strong>[Gemini 의도 분류: 스마트 크루즈 켜기 · 공식 매뉴얼 검증 DB]</strong><br/>\"<strong>핸들 왼쪽 버튼 묶음의 맨 윗줄 바깥쪽</strong>을 보세요. <strong>자동차와 속도계가 함께 그려진 주행 보조 버튼</strong>이 있어요. 그 버튼을 한 번 누르면 스마트 크루즈를 켤 수 있어요. 운전 보조 기능입니다. 손은 운전대에, 시선은 전방에 두세요.\""
  },
  3: {
    question: "🅿️ [주행 D · 70km/h] \"어디 있는지 모르겠어\" → 이후 정차(P · 0km/h) 전환",
    answer: "<strong>[주행 중 상세 안내 보류]</strong><br/>\"지금은 운전에 집중해 주세요. 정차하면 차근차근 알려드릴게요.\"<br/><br/><strong>[기어 P · 0km/h 정차 감지 후 RENDI 먼저 제안]</strong><br/>\"아까 찾으시던 스마트 크루즈, 지금 알려드릴까요?\"<br/>➔ \"응, 알려줘\" 입력 시 위치·모양 안내 후 <strong>단계별 조작</strong>까지 이어서 안내합니다."
  },
  4: {
    question: "💨 [주행 D · 70km/h] \"렌디\" → \"앞이 뿌옇게 보여\"",
    answer: "<strong>[Gemini 의도 분류: 앞유리 서리 제거 · 공식 매뉴얼 검증 DB]</strong><br/>\"<strong>가운데 화면 아래 히터·에어컨 조작부의 아랫줄, 운전석 온도 버튼 바로 오른쪽</strong>을 보세요. <strong>앞유리 모양 안에 물결 화살표가 위로 올라가는 서리 제거 버튼</strong>이에요. 한 번 누르면 표시등이 켜지고 앞유리 쪽으로 바람이 나와요. 앞이 많이 안 보이면 먼저 안전한 곳에 차를 세운 뒤 조작하세요.\""
  }
};

function triggerSimScenario(scenarioId) {
  const scenario = simScenarios[scenarioId];
  if (!scenario) return;

  const messagesContainer = document.getElementById('sim-messages');
  if (!messagesContainer) return;

  // Add User Message
  const userMsgEl = document.createElement('div');
  userMsgEl.className = 'flex items-start justify-end gap-3';
  userMsgEl.innerHTML = `
    <div class="bg-[#002c5f] text-white p-3 rounded-2xl rounded-tr-sm text-xs leading-relaxed max-w-[85%] shadow-sm">
      ${scenario.question}
    </div>
  `;
  messagesContainer.appendChild(userMsgEl);

  // Scroll to bottom
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  // Add Bot Typing Indicator then response
  const typingEl = document.createElement('div');
  typingEl.className = 'flex items-start gap-3 temp-typing';
  typingEl.innerHTML = `
    <img src="assets/rendi_icon.png" alt="RENDI" class="w-7 h-7 rounded-md object-contain bg-slate-50 p-0.5 shrink-0" />
    <div class="bg-blue-50/70 border border-blue-100 text-slate-500 p-3 rounded-2xl rounded-tl-sm text-xs flex items-center gap-1.5">
      <span class="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse"></span>
      <span class="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse" style="animation-delay: 0.2s"></span>
      <span class="w-1.5 h-1.5 rounded-full bg-slate-400 animate-pulse" style="animation-delay: 0.4s"></span>
      <span class="ml-1 text-[11px] text-slate-400">차량 매뉴얼 및 OBD 분석 중...</span>
    </div>
  `;
  messagesContainer.appendChild(typingEl);
  messagesContainer.scrollTop = messagesContainer.scrollHeight;

  setTimeout(() => {
    typingEl.remove();
    const botMsgEl = document.createElement('div');
    botMsgEl.className = 'flex items-start gap-3';
    botMsgEl.innerHTML = `
      <img src="assets/rendi_icon.png" alt="RENDI" class="w-7 h-7 rounded-md object-contain bg-slate-50 p-0.5 shrink-0" />
      <div class="bg-blue-50/70 border border-blue-100 text-slate-800 p-3.5 rounded-2xl rounded-tl-sm text-xs leading-relaxed max-w-[90%] shadow-sm">
        ${scenario.answer}
      </div>
    `;
    messagesContainer.appendChild(botMsgEl);
    messagesContainer.scrollTop = messagesContainer.scrollHeight;
  }, 450);
}

