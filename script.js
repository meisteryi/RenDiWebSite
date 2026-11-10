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

// Interactive Simulator Scenarios
const simScenarios = {
  1: {
    question: "⚠️ 계기판에 노란 주전자 모양 불이 켜졌어, 뭐야?",
    answer: "이 경고등은 <strong>엔진 오일 압력 경고등</strong>입니다! 엔진 윤활유 압력이 낮아졌을 때 점등되며, 계속 주행할 경우 엔진에 치명적인 고장이 발생할 수 있습니다.<br/><br/><strong>즉시 조치 가이드:</strong><br/>1. 비상등을 켜고 안전한 갓길에 정차하세요.<br/>2. 시동을 끄고 5분 후 보닛을 열어 오일 레벨 게이지를 확인하세요.<br/>3. 필요 시 렌터카 긴급 출동 서비스(1588-XXXX)를 바로 연결해 드릴까요?"
  },
  2: {
    question: "⛽ 아반떼 CN7 주유구 레버 위치 어디야?",
    answer: "현대 아반떼 CN7 차량의 주유구 열림 레버는 <strong>운전석 시트 좌측 바닥(도어 스텝 바로 옆)</strong>에 있습니다.<br/><br/>레버에 주유기 아이콘이 양각되어 있으며, 위로 가볍게 당겨 올리시면 열립니다. 주유구 캡은 <strong>차량 좌측 뒤편</strong>에 위치해 있으며, 휘발유(가솔린) 전용 차량입니다!"
  },
  3: {
    question: "📸 대여 시작 전 앞 범퍼에 긁힌 자국이 있는데 등록해줘.",
    answer: "<strong>[비전 AI 실시간 스캔 완료]</strong><br/>앞 범퍼 하단 2.4cm 표면 도장 미세 스크래치 감지.<br/>- 촬영 시각: 2026-11-10 09:15<br/>- GPS 위치: 김포공항 렌터카 전용 인도존<br/><br/>해당 결함 내역이 <strong>대여 전 사전 인수 확인서</strong>에 자동 타임스탬프 기록되었습니다. 반납 시 고객님께 책임이 청구되지 않으니 안심하고 운행하세요!"
  },
  4: {
    question: "❄️ 갑자기 눈이 내리기 시작했어. 어떻게 운전해야 해?",
    answer: "주변 도로 기상 관측 결과, 노면 결빙 위험이 감지되었습니다!<br/><br/><strong>RENDI 안전 가이드:</strong><br/>1. 드라이브 모드를 <strong>SNOW(스노우) 모드</strong>로 전환하여 바퀴 미끄러짐을 방지하세요.<br/>2. 차간 거리를 평소의 2배(100m 이상)로 확보하세요.<br/>3. 급가속·급제동을 피하고 감속 시 엔진 브레이크를 활용하세요."
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

