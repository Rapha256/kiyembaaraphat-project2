/* RentEase Uganda - shared script for all 4 pages (sample data, front end only) */
const PHONES = ['0747567506', '0776365793'];
const intl = n => '256' + n.slice(1);
const IMG = {a:'photo-1522708323590-d24dbb6b0267',b:'photo-1502672260266-1c1ef2d93688',c:'photo-1560448204-e02f11c3d0e2',d:'photo-1568605114967-8130f3a36994',e:'photo-1512917774080-9991f1c4c750',f:'photo-1493809842364-78817add7ffb',g:'photo-1545324418-cc1a3fa10c00',h:'photo-1560185007-cde436f6a4d0'};
const CATS = [
 {id:'furnished',name:'Furnished Airbnb',icon:'bi-house-heart',img:'f',txt:'Simple, well-furnished stays'},
 {id:'luxury',name:'High-Class Airbnb',icon:'bi-gem',img:'e',txt:'Premium furnished stays'},
 {id:'community',name:'Community Rentals',icon:'bi-people',img:'g',txt:'Affordable average rentals'},
 {id:'single',name:'Single Rooms',icon:'bi-door-closed',img:'a',txt:'Budget-friendly rooms'},
 {id:'double',name:'Double Rooms',icon:'bi-columns-gap',img:'b',txt:'Two-room homes'},
 {id:'family',name:'Family Houses',icon:'bi-house-door',img:'d',txt:'3-4 bedroom family homes'}];
// Sample listings (not real or currently available)
const L = [
 ['Cosy Furnished Studio','furnished','Ntinda','Kampala',120000,'night',1,1,'f',['WiFi','Hot shower','Kitchen','Parking'],'Bright, simple, well-furnished stay.'],
 ['Skyline Luxury Apartment','luxury','Kololo','Kampala',350000,'night',2,2,'e',['Pool','Gym','WiFi','Security','Generator'],'High-class apartment with city views.'],
 ['Lakeview Airbnb Villa','luxury','Entebbe','Wakiso',500000,'night',3,3,'h',['Lake view','Pool','Garden','WiFi'],'Elegant villa near the lake.'],
 ['Community Rental Flat','community','Kisaasi','Kampala',450000,'month',2,1,'g',['Water','Parking','Fenced'],'Average, tidy flat in a quiet community.'],
 ['Affordable Community Home','community','Kira','Wakiso',380000,'month',2,1,'c',['Tiled','Water','Security'],'Comfortable family-friendly rental.'],
 ['Single Self-Contained Room','single','Makindye','Kampala',200000,'month',0,1,'a',['Self-contained','Water','Prepaid meter'],'Neat single room for one person.'],
 ['Student Single Room','single','Wandegeya','Kampala',150000,'month',0,1,'b',['Near campus','Shared compound','Water'],'Budget room close to Makerere.'],
 ['Double Room Apartment','double','Najjera','Wakiso',600000,'month',2,2,'f',['Balcony','Tiled','Parking'],'Spacious two-bedroom apartment.'],
 ['Modern Double Room','double','Bweyogerere','Wakiso',550000,'month',2,1,'a',['Water','Fenced','Security'],'Modern double room home.'],
 ['Family Home - 3 Bedrooms','family','Muyenga','Kampala',1800000,'month',3,2,'d',['Garden','Parking','Servant quarter'],'Roomy family home in a calm area.'],
 ['Executive Family House','family','Mukono','Mukono',2500000,'month',4,3,'c',['Compound','Fenced','Parking','Water tank'],'Large 4-bedroom house with big compound.'],
 ['Family Bungalow','family','Namugongo','Wakiso',1500000,'month',3,2,'h',['Garden','Security','Tiled'],'Comfortable bungalow for families.']
].map((r,i)=>({id:i,title:r[0],cat:r[1],area:r[2],district:r[3],price:r[4],unit:r[5],beds:r[6],baths:r[7],img:IMG[r[8]],amen:r[9],desc:r[10],phone:PHONES[i%2]}));

const esc = s => String(s).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const ugx = n => 'UGX ' + n.toLocaleString('en-US');
const catName = id => CATS.find(c => c.id === id).name;
const imgUrl = i => `https://images.unsplash.com/${i}?auto=format&fit=crop&w=800&q=70`;
const FALLBACK = "data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500'><rect fill='%23142B4A' width='800' height='500'/><text x='400' y='260' fill='%23F4B942' font-size='36' text-anchor='middle'>RentEase Uganda</text></svg>";
const favs = new Set(); // session only, resets on refresh

/* ---------- shared navbar, footer, modal (identical on every page) ---------- */
const page = document.body.dataset.page;
const links = [['index','Home','home'],['properties','Properties','props'],['about','About','about'],['contact','Contact','contact']];
document.getElementById('site-header').innerHTML = `
<nav class="navbar navbar-expand-lg sticky-top"><div class="container">
<a class="navbar-brand" href="index.html"><i class="bi bi-house-heart-fill text-warning"></i> RentEase <span>Uganda</span></a>
<button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav" aria-label="Menu"><span class="navbar-toggler-icon"></span></button>
<div class="collapse navbar-collapse" id="nav"><ul class="navbar-nav ms-auto align-items-lg-center">
${links.map(l=>`<li class="nav-item"><a class="nav-link ${l[2]===page?'active':''}" href="${l[0]}.html">${l[1]}</a></li>`).join('')}
<li class="nav-item ms-lg-3 mt-2 mt-lg-0"><a class="btn btn-gold" href="contact.html">List Your Property</a></li></ul></div></div></nav>`;
document.getElementById('site-footer').innerHTML = `
<div class="container"><div class="row g-4"><div class="col-md-5"><h5 class="text-white">RentEase Uganda</h5><p>Connecting renters, brokers and landlords across Kampala and nearby districts.</p></div>
<div class="col-6 col-md-3"><h6>Pages</h6>${links.map(l=>`<div><a href="${l[0]}.html">${l[1]}</a></div>`).join('')}</div>
<div class="col-6 col-md-4"><h6>Contact</h6>${PHONES.map(p=>`<div><a href="tel:+${intl(p)}"><i class="bi bi-telephone"></i> ${p}</a></div>`).join('')}<div><a href="https://wa.me/${intl(PHONES[0])}"><i class="bi bi-whatsapp"></i> WhatsApp</a></div></div></div>
<hr><p class="text-center small mb-0">&copy; 2026 RentEase Uganda. All listings are samples for demonstration.</p></div>`;
document.getElementById('modal-slot').innerHTML = `
<div class="modal fade" id="dm" tabindex="-1" aria-hidden="true"><div class="modal-dialog modal-lg modal-dialog-centered modal-dialog-scrollable"><div class="modal-content" style="border-radius:18px">
<div class="modal-header"><h5 class="modal-title" id="dt"></h5><button class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button></div>
<div class="modal-body" id="db"></div></div></div></div>`;

/* ---------- property card ---------- */
function card(p){
  return `<div class="col-sm-6 col-lg-4 reveal"><article class="pcard">
  <div class="pimg"><span class="badge-cat">${catName(p.cat)}</span>
  <button class="fav ${favs.has(p.id)?'on':''}" data-fav="${p.id}" aria-label="Toggle favorite"><i class="bi bi-heart-fill"></i></button>
  <img src="${imgUrl(p.img)}" alt="${esc(p.title)} in ${esc(p.area)}" loading="lazy" onerror="this.onerror=null;this.src=FALLBACK">
  <div class="overlay"><p>${esc(p.desc)}</p><small>${p.amen.slice(0,3).map(esc).join(' &bull; ')}</small></div></div>
  <div class="pbody"><h5>${esc(p.title)}</h5><div class="loc"><i class="bi bi-geo-alt"></i> ${esc(p.area)}, ${esc(p.district)}</div>
  <div class="meta"><span><i class="bi bi-door-open"></i> ${p.beds||'Single'} ${p.beds?'bed':'room'}</span><span><i class="bi bi-droplet"></i> ${p.baths} bath</span></div>
  <div class="price mb-2">${ugx(p.price)} <small>/ ${p.unit} (sample)</small></div>
  <div class="actions"><button class="btn btn-teal btn-sm flex-grow-1" data-view="${p.id}">View Details</button>
  <a class="ic call" href="tel:+${intl(p.phone)}" aria-label="Call broker ${p.phone}"><i class="bi bi-telephone-fill"></i></a>
  <a class="ic wa" target="_blank" rel="noopener" href="https://wa.me/${intl(p.phone)}?text=${encodeURIComponent('Hello, I am interested in: '+p.title)}" aria-label="WhatsApp broker ${p.phone}"><i class="bi bi-whatsapp"></i></a></div></div></article></div>`;
}
function show(list, target){ document.getElementById(target).innerHTML = list.map(card).join(''); observe(); }

/* View Details and favorites (event delegation) */
document.addEventListener('click', e => {
  const v = e.target.closest('[data-view]'), f = e.target.closest('[data-fav]');
  if (v){
    const p = L[v.dataset.view];
    document.getElementById('dt').textContent = p.title;
    document.getElementById('db').innerHTML = `<img class="img-fluid rounded mb-3 w-100" style="max-height:320px;object-fit:cover" src="${imgUrl(p.img)}" alt="${esc(p.title)}" onerror="this.onerror=null;this.src=FALLBACK">
    <h4 style="color:var(--teal)">${ugx(p.price)} <small class="text-muted fs-6">/ ${p.unit} (sample price)</small></h4>
    <p><i class="bi bi-geo-alt"></i> ${esc(p.area)}, ${esc(p.district)} &bull; ${catName(p.cat)}</p><p>${esc(p.desc)}</p>
    <p><b>Bedrooms:</b> ${p.beds||'Single room'} &nbsp; <b>Bathrooms:</b> ${p.baths}</p>
    <p><b>Amenities:</b> ${p.amen.map(esc).join(', ')}</p>
    <p><b>Deposit:</b> ${p.unit==='night'?'Refundable security deposit may apply':'Usually 1-2 months rent (confirm with broker)'}</p>
    <div class="d-flex gap-2 flex-wrap"><a class="btn btn-navy" href="tel:+${intl(p.phone)}"><i class="bi bi-telephone"></i> ${p.phone}</a>
    <a class="btn btn-teal" target="_blank" rel="noopener" href="https://wa.me/${intl(p.phone)}"><i class="bi bi-whatsapp"></i> WhatsApp</a></div>`;
    bootstrap.Modal.getOrCreateInstance(document.getElementById('dm')).show();
  }
  if (f){ const id = +f.dataset.fav; favs.has(id) ? favs.delete(id) : favs.add(id); f.classList.toggle('on'); }
});

/* scroll reveal */
let io;
function observe(){
  io = io || new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting){ x.target.classList.add('show'); io.unobserve(x.target);} }), {threshold:.1});
  document.querySelectorAll('.reveal:not(.show)').forEach(el => io.observe(el));
}

/* ---------- page logic ---------- */
const catOpts = CATS.map(c => `<option value="${c.id}">${c.name}</option>`).join('');
document.querySelectorAll('select[name=cat], #fcat').forEach(s => s.insertAdjacentHTML('beforeend', catOpts));

if (page === 'home'){
  document.getElementById('cats').innerHTML = CATS.map(c => `<div class="col-sm-6 col-lg-4 reveal"><a class="catcard" href="properties.html?cat=${c.id}" style="background-image:url(${imgUrl(IMG[c.img])})">
  <div class="overlay"><i class="bi ${c.icon}"></i><h5>${c.name}</h5><p class="mb-0">${c.txt}</p></div></a></div>`).join('');
  show([L[0],L[1],L[3],L[5],L[7],L[9]], 'featured');
}
if (page === 'props'){
  const q = new URLSearchParams(location.search);
  const $ = id => document.getElementById(id);
  $('fcat').value = q.get('cat') || ''; $('fq').value = q.get('q') || '';
  function run(){
    const t = $('fq').value.trim().toLowerCase(), c = $('fcat').value, b = $('fbeds').value, m = +$('fmax').value;
    const r = L.filter(p => (!t || (p.title+p.area+p.district).toLowerCase().includes(t)) && (!c || p.cat===c) &&
      (b==='' || (b==='3' ? p.beds>=3 : p.beds===+b)) && (!m || p.price<=m));
    show(r, 'grid'); $('count').textContent = r.length + ' sample propert' + (r.length===1?'y':'ies') + ' found';
    $('empty').classList.toggle('d-none', r.length>0);
  }
  $('filters').addEventListener('input', run);
  $('freset').onclick = () => { $('filters').reset(); run(); };
  run();
}
if (page === 'contact'){
  const form = document.getElementById('cform');
  form.addEventListener('submit', e => {
    e.preventDefault();
    const ok = [...form.querySelectorAll('[required]')].map(i => { const v = i.checkValidity() && i.value.trim() !== ''; i.classList.toggle('is-invalid', !v); return v; }).every(Boolean);
    document.getElementById('cok').classList.toggle('d-none', !ok);
    if (ok) form.reset();
  });
}
observe();

/* ===== Extra animations (v2) ===== */
// navbar shrinks on scroll
const nb = document.querySelector('.navbar');
addEventListener('scroll', () => nb.classList.toggle('scrolled', scrollY > 40), {passive:true});
// grow underline on section titles when revealed
document.querySelectorAll('.sec').forEach(s => { const t = new IntersectionObserver(es => es.forEach(x => { if (x.isIntersecting){ s.classList.add('show'); t.disconnect(); } })); t.observe(s); });
if (page === 'home'){
  const calm = matchMedia('(prefers-reduced-motion: reduce)').matches;
  // headline: each word rises in
  const h1 = document.getElementById('h1');
  h1.innerHTML = h1.textContent.split(' ').map((w,i) => `<span class="w" style="--i:${i}">${esc(w)}</span>`).join(' ');
  // rotating word
  const words = ['Furnished Airbnbs','High-Class Airbnbs','Community Rentals','Single Rooms','Double Rooms','Family Houses'];
  const rot = document.getElementById('rot'); let k = 0;
  if (!calm) setInterval(() => { rot.classList.add('out'); setTimeout(() => { k = (k+1) % words.length; rot.textContent = words[k]; rot.classList.remove('out'); }, 400); }, 2400);
  // count-up statistics
  document.querySelectorAll('[data-count]').forEach(el => {
    const end = +el.dataset.count; let n = 0;
    if (calm){ el.textContent = end + '+'; return; }
    setTimeout(() => { const t = setInterval(() => { n++; el.textContent = n + (n===end?'+':''); if (n>=end) clearInterval(t); }, 90); }, 1500);
  });
  // gentle mouse parallax on orbs and floating icons
  const hero = document.querySelector('.hero');
  if (!calm) hero.addEventListener('mousemove', e => {
    const x = e.clientX / innerWidth - .5, y = e.clientY / innerHeight - .5;
    hero.querySelectorAll('.orb').forEach((o,i) => {
      o.style.marginLeft = (x*(40+i*25)) + 'px';
      o.style.marginTop = (y*(40+i*25)) + 'px';
    });
  });
}
