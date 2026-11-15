// Continuous section navigation; content is always present in the document.
const sections = ['problem-definition', 'identity', 'service', 'differentiation', 'business'];

function selectSection(sectionId) {
  if (!sections.includes(sectionId)) return;
  const target = document.getElementById(sectionId);
  if (!target) return;
  target.scrollIntoView({
    behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth',
    block: 'start'
  });
  history.replaceState(null, '', `#${sectionId}`);
}

function toggleMobileNav() {
  const drawer = document.getElementById('mobile-nav');
  const button = document.getElementById('mobile-menu-btn');
  if (!drawer || !button) return;
  const open = drawer.classList.contains('hidden');
  drawer.classList.toggle('hidden', !open);
  button.setAttribute('aria-expanded', String(open));
  button.setAttribute('aria-label', open ? '메뉴 닫기' : '메뉴 열기');
}

document.addEventListener('DOMContentLoaded', () => {
  if (window.lucide) window.lucide.createIcons();
  const header = document.querySelector('header');
  const drawer = document.getElementById('mobile-nav');
  const menuButton = document.getElementById('mobile-menu-btn');
  const links = [...document.querySelectorAll('header .nav-link')];
  const targets = sections.map((id) => document.getElementById(id)).filter(Boolean);
  let headerHeight = 81;
  let sectionObserver;

  function closeMenu() {
    drawer.classList.add('hidden');
    menuButton.setAttribute('aria-expanded', 'false');
    menuButton.setAttribute('aria-label', '메뉴 열기');
  }
  document.querySelectorAll('header a[href^="#"]').forEach((link) => {
    link.addEventListener('click', closeMenu);
  });
  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && !drawer.classList.contains('hidden')) {
      closeMenu();
      menuButton.focus();
    }
  });

  function updateActiveSection() {
    // Include the observer's 1px band so entry activates the new section immediately.
    const line = headerHeight + 26;
    let active = '';
    targets.forEach((target) => {
      if (target.getBoundingClientRect().top <= line) active = target.id;
    });
    links.forEach((link) => {
      const selected = link.dataset.target === active;
      link.classList.toggle('active', selected);
      if (selected) link.setAttribute('aria-current', 'location');
      else link.removeAttribute('aria-current');
    });
  }

  function observeSections() {
    // Measure the permanent header row, excluding the expandable mobile drawer.
    headerHeight = header.firstElementChild.getBoundingClientRect().height +
      parseFloat(getComputedStyle(header).borderBottomWidth || '0');
    document.documentElement.style.setProperty('--header-height', `${headerHeight}px`);
    if (sectionObserver) sectionObserver.disconnect();
    if ('IntersectionObserver' in window) {
      const top = Math.min(headerHeight + 24, window.innerHeight - 2);
      const bottom = Math.max(0, window.innerHeight - top - 1);
      sectionObserver = new IntersectionObserver(updateActiveSection, {
        rootMargin: `-${top}px 0px -${bottom}px 0px`, threshold: 0
      });
      [document.getElementById('hero'), ...targets].forEach((target) => sectionObserver.observe(target));
    }
    if (window.matchMedia('(min-width: 1024px)').matches) closeMenu();
    updateActiveSection();
  }
  observeSections();
  window.addEventListener('resize', observeSections);
  window.addEventListener('hashchange', updateActiveSection);
  if (!('IntersectionObserver' in window)) {
    let pending = false;
    window.addEventListener('scroll', () => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => { updateActiveSection(); pending = false; });
    }, { passive: true });
  }

  // Animate on entry without CSS hiding: a failed script leaves content visible.
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
  if ('IntersectionObserver' in window && !reducedMotion.matches && 'animate' in Element.prototype) {
    const revealObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        revealObserver.unobserve(entry.target);
        if (reducedMotion.matches) return;
        const siblings = [...entry.target.parentElement.children];
        const delay = entry.target.classList.contains('story-heading') ? 0 : Math.min(siblings.indexOf(entry.target), 3) * 90;
        entry.target.animate([
          { opacity: 0, transform: 'translateY(16px)' },
          { opacity: 1, transform: 'translateY(0)' }
        ], { duration: 550, delay, easing: 'ease-out', fill: 'backwards' });
      });
    }, { threshold: 0.08 });
    document.querySelectorAll('.story-heading, .story-section h3, .story-section .grid > [class*="rounded"], #identity img, #problem-heading, .problem-subheading').forEach((target) => revealObserver.observe(target));
    reducedMotion.addEventListener('change', () => {
      if (reducedMotion.matches) document.getAnimations().forEach((animation) => animation.cancel());
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
    const videoEl = videoContainer ? videoContainer.querySelector('video') : null;
    if (videoEl && !videoEl.paused) {
      videoEl.pause();
    }
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

