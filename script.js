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

// Interactive Simulator Scenarios (Hyundai Contest Features)
const simScenarios = {
  1: {
    question: "🚗 원래 아반떼 MD 탔는데, 이번에 빌린 디 올 뉴 싼타페는 기어가 어디 있어?",
    answer: "아반떼 MD의 봉 형태 기어레버와 달리, 이번 싼타페는 <strong>핸들(스티어링 휠) 오른쪽 뒤편에 달린 전자식 컬럼 레버</strong>입니다.<br/><br/><strong>조작법:</strong><br/>1. 브레이크를 밟은 상태에서 레버 끝부분 다이얼을 <strong>앞으로 돌리면 D(주행)</strong>, <strong>뒤로 돌리면 R(후진)</strong>입니다.<br/>2. 주차 시에는 레버 끝단의 <strong>P 버튼</strong>을 누르시면 됩니다."
  },
  2: {
    question: "🔘 비상등 버튼 어디 있는지 모르겠어",
    answer: "비상등 버튼은 <strong>가운데 내비게이션 화면 바로 아래, 중앙 송풍구 정중앙에 있는 빨간색 삼각형 테두리가 그려진 네모난 버튼</strong>입니다. 팔을 가볍게 뻗어 누르실 수 있습니다."
  },
  3: {
    question: "💨 야 앞유리에 김 서려서 앞이 안 보여",
    answer: "<strong>[비정형 자연어 입력 매핑: 앞유리 습기 제거 / FRONT 디포거]</strong><br/>센터페시아 에어컨 조작부에서 <strong>부채꼴 모양 안에 화살표 세 개가 위로 솟아오르는 아이콘('FRONT') 버튼</strong>을 누르세요. 에어컨이 자동으로 가동되어 습기가 즉시 제거됩니다."
  },
  4: {
    question: "🔊 주유구는 어디서 열어야 해?",
    answer: "<strong>[TTS 음성 변환 출력]</strong><br/>\"운전석 문을 열고 왼쪽 발밑 바닥을 보시면 <strong>주유기 그림이 그려진 납작한 은색 레버</strong>가 있습니다. 레버를 손가락으로 가볍게 위로 당겨 올려주세요. 주유구는 차량 좌측 뒤편에 위치합니다.\""
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

