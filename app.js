const CONFIG={weddingAt:'2026-09-20T08:30:00+07:00',rsvpEndpoint:''};
// Đã rà thủ công: chỉ dùng ảnh có cả cô dâu và chú rể, không lặp ID.
const galleryIds=[
'11oAWP4WYIKnN0SasgAwnKLohF5vbxEeQ',
'1FOJyyztPvAT4D3jxXrm6ZPapi-AMAkaX',
'1lWKyAkxKc9aIBl_8am5EA6oEMnZC7833',
'1qrxCkeWRRK36R0lFnLj4OKcgkBQJOVrb',
'1b6biMgF8qbE3yXRb3FCJdZxcnoubo4CV',
'1-1ZkcpQWgrGmAuqq6Kz7fGrkFnLMJcoz',
'1ZuzBkr-f6-Mvggw8B9nFwayRg5JxLVGl'
];
const $=s=>document.querySelector(s);
const opening=$('#opening'),site=$('#site'),openBtn=$('#openInvitation'),music=$('#bgMusic'),musicBtn=$('#musicButton'),ytMusic=$('#ytMusic');
let observer;let musicPlaying=false;let useYoutube=false;
function setupObserver(){
 const els=document.querySelectorAll('.reveal:not(.is-visible)');
 if(!('IntersectionObserver'in window)){els.forEach(el=>el.classList.add('is-visible'));return;}
 if(!observer) observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');observer.unobserve(e.target);}}),{threshold:.12,rootMargin:'0px 0px -5% 0px'});
 els.forEach(el=>observer.observe(el));
 setTimeout(()=>document.querySelectorAll('.reveal:not(.is-visible)').forEach(el=>{const r=el.getBoundingClientRect();if(r.top<innerHeight*1.15)el.classList.add('is-visible')}),700);
}
function ytCommand(func){try{ytMusic?.contentWindow?.postMessage(JSON.stringify({event:'command',func,args:[]}), '*')}catch(e){}}
async function startMusic(){
 // Ưu tiên MP3 nội bộ. Nếu file không tồn tại/không phát được, tự chuyển sang YouTube.
 if(!useYoutube && music){
  try{music.volume=.7;await music.play();musicPlaying=true;musicBtn.classList.add('is-playing');return}catch(e){useYoutube=true;}
 }
 ytCommand('playVideo');
 setTimeout(()=>ytCommand('playVideo'),350);
 musicPlaying=true;musicBtn.classList.add('is-playing');
}
function stopMusic(){if(useYoutube)ytCommand('pauseVideo');else music?.pause();musicPlaying=false;musicBtn.classList.remove('is-playing')}
openBtn.addEventListener('click',()=>{opening.classList.add('is-open');site.classList.remove('is-locked');setupObserver();startMusic()});
musicBtn.addEventListener('click',()=>{musicPlaying?stopMusic():startMusic()});
music?.addEventListener('error',()=>{useYoutube=true});
const guest=new URLSearchParams(location.search).get('guest');if(guest){const v=guest.trim().slice(0,80);$('#guestGreeting').textContent=`Thân mời ${v} đến chung vui cùng Thắng & Yến`;$('#guestHidden').value=v}else $('#guestGreeting').textContent='Thân mời bạn đến chung vui cùng Thắng & Yến';
function tick(){const d=Math.max(0,new Date(CONFIG.weddingAt)-new Date());$('#days').textContent=String(Math.floor(d/86400000)).padStart(2,'0');$('#hours').textContent=String(Math.floor(d/3600000)%24).padStart(2,'0');$('#minutes').textContent=String(Math.floor(d/60000)%60).padStart(2,'0');$('#seconds').textContent=String(Math.floor(d/1000)%60).padStart(2,'0')}tick();setInterval(tick,1000);
const gallery=$('#gallery'),showMore=$('#showMore'),lightbox=$('#lightbox'),lightboxImage=$('#lightboxImage');let visibleCount=galleryIds.length;
const thumb=(id,s=1200)=>`https://drive.google.com/thumbnail?id=${id}&sz=w${s}`;
function openLightbox(src){lightboxImage.src=src;lightbox.classList.add('is-open');lightbox.setAttribute('aria-hidden','false')}
function renderGallery(){gallery.innerHTML='';[...new Set(galleryIds)].forEach((id,i)=>{const wrap=document.createElement('div');wrap.className=`gallery-item reveal ${i%3===0?'from-left':i%3===1?'from-bottom':'from-right'}`;const img=document.createElement('img');img.loading='lazy';img.alt=`Ảnh cưới Thắng và Yến ${i+1}`;img.src=thumb(id);img.addEventListener('click',()=>openLightbox(thumb(id,1800)));wrap.appendChild(img);gallery.appendChild(wrap)});showMore.style.display='none';setupObserver()}
renderGallery();setupObserver();
const heartField=$('#heartField');function spawnHeart(){if(document.hidden||matchMedia('(prefers-reduced-motion: reduce)').matches)return;const h=document.createElement('span');h.className='floating-heart';h.textContent=Math.random()>.4?'♡':'♥';h.style.left=`${Math.random()*96}%`;h.style.fontSize=`${16+Math.random()*22}px`;h.style.animationDuration=`${6+Math.random()*6}s`;h.style.setProperty('--drift',`${-70+Math.random()*140}px`);heartField.appendChild(h);setTimeout(()=>h.remove(),12500)}setInterval(spawnHeart,1250);for(let i=0;i<5;i++)setTimeout(spawnHeart,i*450);
const form=$('#rsvpForm'),status=$('#formStatus');form.addEventListener('submit',async e=>{e.preventDefault();const payload=Object.fromEntries(new FormData(form).entries());payload.createdAt=new Date().toISOString();if(!CONFIG.rsvpEndpoint){localStorage.setItem('thangyen-rsvp-demo',JSON.stringify(payload));status.textContent='Đã lưu xác nhận trên thiết bị.';return}status.textContent='Đang gửi xác nhận...';try{await fetch(CONFIG.rsvpEndpoint,{method:'POST',mode:'no-cors',headers:{'Content-Type':'text/plain;charset=utf-8'},body:JSON.stringify(payload)});status.textContent='Cảm ơn bạn! Thắng & Yến đã nhận được xác nhận ♥';form.reset()}catch(e){status.textContent='Chưa gửi được. Vui lòng thử lại sau.'}});
const giftModal=$('#giftModal');$('#openGift').addEventListener('click',()=>{giftModal.classList.add('is-open');giftModal.setAttribute('aria-hidden','false')});$('#closeGift').addEventListener('click',()=>giftModal.classList.remove('is-open'));giftModal.addEventListener('click',e=>{if(e.target===giftModal)giftModal.classList.remove('is-open')});$('#closeLightbox').addEventListener('click',()=>lightbox.classList.remove('is-open'));lightbox.addEventListener('click',e=>{if(e.target===lightbox)lightbox.classList.remove('is-open')});document.addEventListener('keydown',e=>{if(e.key==='Escape'){giftModal.classList.remove('is-open');lightbox.classList.remove('is-open')}});