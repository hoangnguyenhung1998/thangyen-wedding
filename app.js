const CONFIG = {
  weddingAt: '2026-09-20T08:30:00+07:00',
  rsvpEndpoint: ''
};

const galleryIds = [
'1p9GwZmF0ik5puonJBQE-NRqd-uqY3B6g','1r9xWgk2xop17D-sB51hpntKs4ZSIvjw1','17pz8BdkiOuW5ZiwX6KnNx_-Xx1jyhR4e','1dYlB7gtgsSNSnS9P2t6Msl6peYz-HYkY','1y4xjf6jwPKpTQ1Qf7mVm-5uocI-2DtuN','12CwG6BZzJE1N0O6gYDYNg9mlcJCv-jjb','18Lql5KmhlSBVUFh5CYVX4TWIzC0OYqrt','1gU37VdzL509T2CAZDvqrrAozd-TueL1m','19uH6nFigOfZPlim9sNh8MWj2n6bCmYn8','1JJ88r6-3YrbioTjVG-7F5ltFUM5ftwaz','1LXRW02yWc0jmBCBeLP1MOInZN5ru_TVZ','1tTIieqn_5vmkIxh7K67NfN_CWmy8FZCE','1pHnbwwth21q0FKbsWOzy32n-YfqhBbj3','1veu57VZlNHnqLkt9RFop0pmNBio6FUaS','1Q1xl6I4IqY_7PwuxfHGYbDUyCmjt1HXo','1vM-DuJFgfYgNT8FAxkXyZY_l1pw6MHDX','1YFI_EqbpEyFlSb2PY2KB4cer8oUvq7KG','1BoDVekNuyz5RUm1dE-aY1oaTMfFTnb5E','1fHn42I1I8ZHF-ipb43GMkVemZaka5nXB','14Ej33bqh0q_Aq6xYH7ahs8mTsJQhpBX9','1Gcznwx790FBA3kk6Iy0szVJIej8wfSFB','1Ilgx--Rr68hQjmIDAQCMJfE29cwmg2VB','1aLCe4O94hFzVt826vtOL-sE_HaE1sTzH','1nBzB-fGEiUqZTs_k_u7FxqTyZWwYHnk1','1h_b5Kd_vCvyqlFYihGWi8YIHUMRYpkbq','1uUeyDLDXRnUUUQCdiFf6PEFF_lrWk_jn','1SzCMDvjd-9n4bez6pr24N8CLZMwTvfBz','1qrxCkeWRRK36R0lFnLj4OKcgkBQJOVrb','1b6biMgF8qbE3yXRb3FCJdZxcnoubo4CV','1-1ZkcpQWgrGmAuqq6Kz7fGrkFnLMJcoz','1ZuzBkr-f6-Mvggw8B9nFwayRg5JxLVGl','11oAWP4WYIKnN0SasgAwnKLohF5vbxEeQ','1FOJyyztPvAT4D3jxXrm6ZPapi-AMAkaX','1lWKyAkxKc9aIBl_8am5EA6oEMnZC7833','15aEX4cDENH028jUdnnAZGaCQQ_v1wwx1'
];

const openBtn = document.getElementById('openInvitation');
const opening = document.getElementById('opening');
const site = document.getElementById('site');
const music = document.getElementById('bgMusic');
const musicBtn = document.getElementById('musicButton');

let observer = null;
function observeReveals(){
  const pending = document.querySelectorAll('.reveal:not(.is-visible)');
  if (!('IntersectionObserver' in window)) {
    pending.forEach(el => el.classList.add('is-visible'));
    return;
  }
  if (!observer) {
    observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    }), { threshold: .1 });
  }
  pending.forEach(el => observer.observe(el));
}

openBtn.addEventListener('click', async () => {
  opening.classList.add('is-open');
  site.classList.remove('is-locked');
  observeReveals();
  try {
    await music.play();
    musicBtn.classList.add('is-playing');
  } catch (err) {
    musicBtn.title = 'Chạm biểu tượng nhạc để bật';
  }
});

musicBtn.addEventListener('click', async () => {
  if (music.paused) {
    try {
      await music.play();
      musicBtn.classList.add('is-playing');
    } catch (err) {
      musicBtn.title = 'Trình duyệt đang chặn phát nhạc';
    }
  } else {
    music.pause();
    musicBtn.classList.remove('is-playing');
  }
});

const guest = new URLSearchParams(location.search).get('guest');
const guestGreeting = document.getElementById('guestGreeting');
const guestHidden = document.getElementById('guestHidden');
if (guest) {
  const safeGuest = guest.trim().slice(0, 80);
  guestGreeting.textContent = `Thân mời ${safeGuest} đến chung vui cùng Thắng & Yến`;
  guestHidden.value = safeGuest;
} else {
  guestGreeting.textContent = 'Thân mời bạn đến chung vui cùng Thắng & Yến';
}

const dayEl = document.getElementById('days');
const hourEl = document.getElementById('hours');
const minuteEl = document.getElementById('minutes');
const secondEl = document.getElementById('seconds');
function tick(){
  const d = Math.max(0, new Date(CONFIG.weddingAt) - new Date());
  dayEl.textContent = String(Math.floor(d / 86400000)).padStart(2, '0');
  hourEl.textContent = String(Math.floor(d / 3600000) % 24).padStart(2, '0');
  minuteEl.textContent = String(Math.floor(d / 60000) % 60).padStart(2, '0');
  secondEl.textContent = String(Math.floor(d / 1000) % 60).padStart(2, '0');
}
tick();
setInterval(tick, 1000);

const gallery = document.getElementById('gallery');
const showMore = document.getElementById('showMore');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.getElementById('lightboxImage');
let visibleCount = 12;
function thumb(id, size = 1200){ return `https://drive.google.com/thumbnail?id=${id}&sz=w${size}`; }
function openLightbox(src){
  lightboxImage.src = src;
  lightbox.classList.add('is-open');
  lightbox.setAttribute('aria-hidden', 'false');
}
function renderGallery(){
  gallery.innerHTML = '';
  galleryIds.slice(0, visibleCount).forEach((id, i) => {
    const wrap = document.createElement('div');
    wrap.className = 'gallery-item reveal';
    const img = document.createElement('img');
    img.loading = 'lazy';
    img.alt = `Ảnh cưới Thắng và Yến ${i + 1}`;
    img.src = thumb(id);
    img.addEventListener('click', () => openLightbox(thumb(id, 1800)));
    wrap.appendChild(img);
    gallery.appendChild(wrap);
  });
  showMore.style.display = visibleCount >= galleryIds.length ? 'none' : 'flex';
  observeReveals();
}
showMore.addEventListener('click', () => {
  visibleCount = Math.min(galleryIds.length, visibleCount + 12);
  renderGallery();
});
renderGallery();
observeReveals();

const rsvpForm = document.getElementById('rsvpForm');
const formStatus = document.getElementById('formStatus');
rsvpForm.addEventListener('submit', async e => {
  e.preventDefault();
  const payload = Object.fromEntries(new FormData(rsvpForm).entries());
  payload.createdAt = new Date().toISOString();
  if (!CONFIG.rsvpEndpoint) {
    localStorage.setItem('thangyen-rsvp-demo', JSON.stringify(payload));
    formStatus.textContent = 'Đã lưu xác nhận trên thiết bị. Google Sheet sẽ được nối ở bước tiếp theo.';
    return;
  }
  formStatus.textContent = 'Đang gửi xác nhận...';
  try {
    await fetch(CONFIG.rsvpEndpoint, {
      method: 'POST', mode: 'no-cors',
      headers: {'Content-Type':'text/plain;charset=utf-8'},
      body: JSON.stringify(payload)
    });
    formStatus.textContent = 'Cảm ơn bạn! Thắng & Yến đã nhận được xác nhận ♥';
    rsvpForm.reset();
  } catch (err) {
    formStatus.textContent = 'Chưa gửi được. Vui lòng thử lại sau.';
  }
});

const qrModal = document.getElementById('qrModal');
const qrImage = document.getElementById('qrImage');
const qrName = document.getElementById('qrName');
document.querySelectorAll('.qr-open').forEach(btn => btn.addEventListener('click', () => {
  qrImage.src = btn.dataset.qr;
  qrName.textContent = btn.dataset.name;
  qrModal.classList.add('is-open');
  qrModal.setAttribute('aria-hidden', 'false');
}));
document.getElementById('closeQr').addEventListener('click', () => qrModal.classList.remove('is-open'));
qrModal.addEventListener('click', e => { if (e.target === qrModal) qrModal.classList.remove('is-open'); });
document.getElementById('closeLightbox').addEventListener('click', () => lightbox.classList.remove('is-open'));
lightbox.addEventListener('click', e => { if (e.target === lightbox) lightbox.classList.remove('is-open'); });
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    qrModal.classList.remove('is-open');
    lightbox.classList.remove('is-open');
  }
});
