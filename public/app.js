/* ══════════════════════════════════════════
   DELHI 6 — Heritage Tours Application Logic
   Connected to Express/MongoDB Backend
   ══════════════════════════════════════════ */

/* ── FALLBACK DATA (used if API hasn't seeded yet) ── */
const ACT = {
  foodwalk:{title:'Old Delhi Food Walk',price:2500,max:8,img:'images/food-walk.png',meta:[{i:'lucide:clock',t:'3.5 Hours'},{i:'lucide:users',t:'Max 8 people'},{i:'lucide:globe',t:'English, Hindi'},{i:'lucide:map-pin',t:'Jama Masjid Gate No. 1'}],d1:'Dive deep into the culinary heart of the walled city. Old Delhi is not just a place — it is an emotion, best felt through its legendary street food. On this curated 3.5-hour walking tour you will wander through narrow alleyways that have stood since the Mughal era.',d2:'Visit iconic eateries — some over 100 years old — tasting crisp Jalebis, rich Rabri, spicy Aloo Tikki and Chole Bhature. Your expert guide shares fascinating stories of heritage and culture along the way.',hl:['Taste 10+ authentic street food items from vendors operating for generations.','Walk through the legendary lanes of Chandni Chowk and Chawri Bazaar.','Learn about Mughal-era recipes and their fascinating histories.','Small group size for a safe, intimate, personalised experience.'],inc:['All food & beverage tastings (vegetarian friendly)','Expert English-speaking local guide','Unlimited bottled water & hand sanitiser','Digital photo memories taken by your guide'],meet:'Jama Masjid Gate No. 1, Old Delhi',slots:['10:00 AM','04:00 PM']},
  heritage:{title:'Heritage Architecture Walk',price:1800,max:10,img:'images/heritage-walk.png',meta:[{i:'lucide:clock',t:'4 Hours'},{i:'lucide:users',t:'Max 10 people'},{i:'lucide:globe',t:'English, Hindi'},{i:'lucide:map-pin',t:'Red Fort Lahori Gate'}],d1:'Step into a living museum. Old Delhi\'s walled city contains some of the finest Mughal, colonial, and vernacular architecture in the world. This walk takes you through grand havelis, mosques, temples, and street facades that have witnessed centuries of history.',d2:'Our expert guide — a trained architectural historian — decodes stories embedded in every arch, jali, and inlay. Discover how empires, trade routes, and migration shaped the very walls of Shahjahanabad.',hl:['Explore 5+ landmark heritage structures including havelis and religious sites.','Understand the Mughal architectural vocabulary through real examples.','Visit hidden courtyards with panoramic views of the walled city.','Learn about preservation efforts and how to support them.'],inc:['Expert architectural historian guide','Entry fees to all sites','Printed heritage map as a souvenir','Chai break at a historic dhaba'],meet:'Red Fort Lahori Gate, Old Delhi',slots:['07:30 AM','04:00 PM']},
  cooking:{title:'Authentic Cooking Class',price:3500,max:6,img:'images/cooking-class.png',meta:[{i:'lucide:clock',t:'5 Hours'},{i:'lucide:users',t:'Max 6 people'},{i:'lucide:globe',t:'English, Hindi'},{i:'lucide:map-pin',t:'Traditional Delhi Home Kitchen'}],d1:'Learn to cook the dishes of Old Delhi in the kitchen where they were born. This 5-hour class is hosted in a traditional household where you\'ll be welcomed as family and taught recipes passed down through generations.',d2:'From grinding fresh masalas to making perfectly layered parathas — finish with a full sit-down family meal you\'ve cooked together.',hl:['Learn 4–5 recipes: dal makhani, shahi paneer, paratha, and kheer.','Grind your own spices at the morning market with your host.','Receive a handwritten recipe booklet to take home.','Full sit-down family meal included with all participants.'],inc:['All ingredients and equipment','Market tour for fresh produce','Handwritten recipe booklet','Full meal for all participants'],meet:'Gali Qasim Jan, Ballimaran (address shared on booking)',slots:['09:00 AM','05:00 PM']},
  spice:{title:'Khari Baoli Spice Tour',price:1500,max:12,img:'images/spice-tour.png',meta:[{i:'lucide:clock',t:'2.5 Hours'},{i:'lucide:users',t:'Max 12 people'},{i:'lucide:globe',t:'English, Hindi'},{i:'lucide:map-pin',t:'Khari Baoli Market Entrance'}],d1:'Asia\'s largest wholesale spice market is a sensory universe. Khari Baoli has been the heartbeat of India\'s spice trade since the 17th century, and this guided tour unlocks its layered secrets.',d2:'Navigate sack-lined alleyways with a guide who knows every trader by name. Sample rare spices, learn to identify quality, and hear stories of centuries-old trade routes.',hl:['Visit the world-famous Khari Baoli wholesale spice market.','Sample and identify 20+ spices, herbs, and dry fruits.','Insider tips on buying quality spices at wholesale prices.','Stories of centuries-old spice trade routes.'],inc:['Expert spice trader guide','Spice tasting session','Small spice sample pack to take home','Tea at a historic spice shop'],meet:'Khari Baoli Market Main Entrance, Old Delhi',slots:['08:00 AM','03:00 PM']},
  craft:{title:'Old Delhi Craft Workshop',price:2000,max:8,img:'images/craft-workshop.png',meta:[{i:'lucide:clock',t:'3 Hours'},{i:'lucide:users',t:'Max 8 people'},{i:'lucide:globe',t:'English, Hindi'},{i:'lucide:map-pin',t:'Kinari Bazaar Artisan Quarter'}],d1:'Old Delhi is home to India\'s most skilled craftspeople — zardozi embroiderers, block printers, copper engravers — many working for generations. This workshop gives you a hands-on introduction.',d2:'Visit an artisan\'s studio in historic Kinari Bazaar, learn techniques of your chosen craft, and create a piece to take home.',hl:['Hands-on workshop with a master artisan in their own studio.','Choose from zardozi embroidery, block printing, or copper engraving.','Take home the piece you create.','Learn the cultural history of Old Delhi\'s craft traditions.'],inc:['All materials and tools','Master artisan instruction','Your finished craft piece','Certificate of participation'],meet:'Kinari Bazaar Lane, Chandni Chowk, Old Delhi',slots:['10:00 AM','02:00 PM']},
  night:{title:'Old Delhi Night Walk',price:1800,max:8,img:'images/night-walk.png',meta:[{i:'lucide:clock',t:'2.5 Hours'},{i:'lucide:users',t:'Max 8 people'},{i:'lucide:globe',t:'English, Hindi'},{i:'lucide:map-pin',t:'Jama Masjid Gate No. 3'}],d1:'Old Delhi at night is a different city entirely. The chaos of day gives way to a quieter atmospheric world — lit by street lamps, fragrant with late-night biryani, echoing with the distant azaan.',d2:'This evening walk explores the nocturnal side of the walled city — visiting after-dark food spots, illuminated monuments, and lanes that only come alive after sunset.',hl:['Experience the atmospheric, quieter Old Delhi after dark.','Visit 3–4 iconic nocturnal food spots open only in evenings.','See Jama Masjid and Red Fort illuminated at night.','Hear ghost stories and midnight legends of the walled city.'],inc:['Expert evening guide','All food tastings','Bottled water','Safety briefing and torch'],meet:'Jama Masjid Gate No. 3, Old Delhi',slots:['07:00 PM','08:00 PM']},
};

/* ── API Activities cache (maps frontend keys to DB IDs) ── */
let DB_ACTIVITIES = {};       // { frontendKey: { _id, ...dbData } }
let DB_ACTIVITIES_BY_ID = {}; // { mongoId: { frontendKey, ...dbData } }

/* ── STATE ── */
let S = { id:'foodwalk', guests:2, slot:'', slotId:'', date:'', pm:'card', dbActivityId:'' };
let USER = null; // null = logged out
let BOOKINGS = { upcoming:[], past:[] };
let CURRENT_BOOKING_ID = ''; // booking _id from API during checkout

/* ── NAVIGATION ── */
function go(pid) {
  document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
  document.getElementById('page-'+pid).classList.add('active');
  document.querySelectorAll('[data-page]').forEach(l => l.classList.toggle('active', l.dataset.page===pid));
  const hideNav = ['auth','checkout','confirmation'].includes(pid);
  document.getElementById('main-nav').style.display = hideNav ? 'none' : '';
  // Close mobile menu on navigation
  closeMobileMenu();
  window.scrollTo({top:0,behavior:'smooth'});
}

/* ── MOBILE MENU ── */
function toggleMobileMenu() {
  const nav = document.getElementById('main-nav');
  const ham = document.getElementById('hamburger');
  const isOpen = nav.classList.toggle('mobile-open');
  ham.classList.toggle('active', isOpen);
  ham.setAttribute('aria-expanded', isOpen);
  document.body.style.overflow = isOpen ? 'hidden' : '';
}
function closeMobileMenu() {
  const nav = document.getElementById('main-nav');
  const ham = document.getElementById('hamburger');
  if (nav) nav.classList.remove('mobile-open');
  if (ham) { ham.classList.remove('active'); ham.setAttribute('aria-expanded', 'false'); }
  document.body.style.overflow = '';
}

/* ── ACTIVITY ── */
function openActivity(id) {
  const a = ACT[id]; if(!a) return;
  S.id=id; S.guests=2;
  // Store the DB activity ID if we have it
  S.dbActivityId = DB_ACTIVITIES[id] ? DB_ACTIVITIES[id]._id : '';
  $('bc-title').textContent=a.title; $('act-title').textContent=a.title;
  $('act-img').src=a.img; $('act-d1').textContent=a.d1; $('act-d2').textContent=a.d2;
  $('bk-p').textContent='₹'+a.price.toLocaleString('en-IN');
  $('act-meet').textContent=a.meet;
  $('act-meta').innerHTML=a.meta.map(m=>`<div class="meta-chip"><iconify-icon icon="${m.i}"></iconify-icon>${m.t}</div>`).join('');
  $('act-hl').innerHTML=a.hl.map(h=>`<li class="hl-item"><iconify-icon icon="lucide:check-circle-2" class="ck-icon"></iconify-icon><span>${h}</span></li>`).join('');
  $('act-inc').innerHTML=a.inc.map(i=>`<li class="hl-item"><iconify-icon icon="lucide:circle-dot" class="ck-icon"></iconify-icon><span>${i}</span></li>`).join('');
  S.slot=a.slots[0];
  $('bk-slots').innerHTML=a.slots.map((s,i)=>`<div class="slot-btn ${i===0?'active':''}" onclick="pickSlot(this,'${s}')">${s}</div>`).join('');
  const d=new Date(); d.setDate(d.getDate()+1);
  const iso=d.toISOString().split('T')[0];
  $('bk-date').value=iso; S.date=iso;
  $('bk-date').onchange=e => { S.date=e.target.value; loadTimeSlotsForDate(); };
  $('bk-cnt').textContent=2; updTotal(); go('activity');

  // Try to fetch live time slots from API
  loadTimeSlotsForDate();
}
function pickSlot(btn,s,slotId){
  document.querySelectorAll('#bk-slots .slot-btn').forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  S.slot=s;
  if(slotId) S.slotId=slotId;
}
function changeG(d){const a=ACT[S.id];S.guests=Math.max(1,Math.min(a.max,S.guests+d));$('bk-cnt').textContent=S.guests;updTotal()}
function updTotal(){const a=ACT[S.id];$('bk-total').textContent='₹ '+(a.price*S.guests).toLocaleString('en-IN')}

/* ── Load time slots from API ── */
async function loadTimeSlotsForDate() {
  if (!S.dbActivityId || !S.date) return;
  try {
    const res = await api.timeslots.list(S.dbActivityId, S.date);
    if (res.success && res.slots && res.slots.length > 0) {
      const a = ACT[S.id];
      S.slotId = res.slots[0]._id;
      S.slot = formatSlotTime(res.slots[0].startTime);
      $('bk-slots').innerHTML = res.slots.map((sl, i) => {
        const label = formatSlotTime(sl.startTime);
        const avail = sl.availableSpots;
        const full = avail <= 0;
        return `<div class="slot-btn ${i===0?'active':''} ${full?'disabled':''}"
          onclick="${full ? '' : `pickSlot(this,'${label}','${sl._id}')`}"
          ${full ? 'style="opacity:0.4;cursor:not-allowed"' : ''}>
          ${label}${avail < sl.totalSpots ? ` (${avail} left)` : ''}
        </div>`;
      }).join('');
    }
  } catch (err) {
    // Silently fall back to hardcoded slots
  }
}

function formatSlotTime(time24) {
  // Convert "17:00" to "05:00 PM"
  const [h, m] = time24.split(':').map(Number);
  const ampm = h >= 12 ? 'PM' : 'AM';
  const h12 = h % 12 || 12;
  return `${String(h12).padStart(2,'0')}:${String(m).padStart(2,'0')} ${ampm}`;
}

/* ── CHECKOUT ── */
function goCheckout(){
  // Require login before checkout
  if (!USER) {
    toast('Please log in to continue booking.', 'info');
    // Store intent to return to checkout after login
    sessionStorage.setItem('delhi6_return', 'checkout');
    go('auth');
    return;
  }

  S.date=$('bk-date').value;
  if(!S.date){toast('Please select a date.','error');return}
  const a=ACT[S.id]; const total=a.price*S.guests;
  const fd=new Date(S.date).toLocaleDateString('en-IN',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
  $('oc-img').src=a.img; $('oc-name').textContent=a.title; $('oc-date').textContent=fd;
  $('oc-slot').textContent=S.slot; $('oc-guests').textContent=S.guests+(S.guests>1?' guests':' guest');
  $('oc-ppp').textContent='₹'+a.price.toLocaleString('en-IN'); $('oc-total').textContent='₹'+total.toLocaleString('en-IN');
  $('pay-btn-amt').textContent=total.toLocaleString('en-IN');
  $('cs-name').textContent=a.title; $('cs-date').textContent=fd; $('cs-slot').textContent=S.slot;
  $('cs-guests').textContent=S.guests+' guest'+(S.guests>1?'s':'');
  const notes=$('bk-notes').value.trim();$('cs-notes').textContent=notes||'None';
  $('co-bc-act').textContent=a.title;

  // Pre-fill checkout form with user info
  if (USER) {
    const parts = USER.name.split(' ');
    $('cf-fn').value = parts[0] || '';
    $('cf-ln').value = parts.slice(1).join(' ') || '';
    $('cf-em').value = USER.email || '';
    if (USER.phone) $('cf-ph').value = USER.phone;
  }

  setStep(1); go('checkout');
}

function setStep(n){
  [1,2,3].forEach(i=>{
    const c=$('sc'+i),l=$('sl'+i);
    if(i<n){c.className='step-c done';c.innerHTML='✓';l.className='step-lbl';}
    else if(i===n){c.className='step-c active';c.textContent=i;l.className='step-lbl active';}
    else{c.className='step-c idle';c.textContent=i;l.className='step-lbl';}
  });
  $('sl-1').className=n>1?'step-line done':'step-line';
  $('sl-2').className=n>2?'step-line done':'step-line';
  $('cos1').style.display=n===1?'':'none';
  $('cos2').style.display=n===2?'':'none';
  $('cos3').style.display=n===3?'':'none';
}

function toStep2(){
  const fn=$('cf-fn').value.trim(),em=$('cf-em').value.trim(),ph=$('cf-ph').value.trim();
  let ok=true;
  if(!fn){fe('ef-fn','cf-fn',1);ok=false}else fe('ef-fn','cf-fn',0);
  if(!em||!em.includes('@')){fe('ef-em','cf-em',1);ok=false}else fe('ef-em','cf-em',0);
  if(ph&&ph.length!==10){fe('ef-ph','cf-ph',1);ok=false}else fe('ef-ph','cf-ph',0);
  if(!ok)return; setStep(2);
}
function toStep1(){setStep(1)}
function fe(eid,iid,show){$(eid).style.display=show?'block':'none';$(iid).classList.toggle('err',!!show)}

async function toStep3(){
  // Show processing state immediately
  setStep(3);

  try {
    // 1. Create the booking on the backend
    const bookingData = {
      activityId: S.dbActivityId,
      timeSlotId: S.slotId,
      numberOfPeople: S.guests,
      specialRequests: $('bk-notes')?.value?.trim() || '',
      guestName: $('cf-fn').value.trim() + ' ' + ($('cf-ln').value.trim() || ''),
      guestEmail: $('cf-em').value.trim(),
      guestPhone: $('cf-ph').value.trim(),
    };

    // If no DB activity, fall back to local simulation
    if (!S.dbActivityId || !S.slotId) {
      // Fall back to local simulation
      setTimeout(buildConfLocal, 2400);
      return;
    }

    const bookingRes = await api.bookings.create(bookingData);
    if (!bookingRes.success) {
      toast(bookingRes.message || 'Booking failed.', 'error');
      setStep(2);
      return;
    }

    CURRENT_BOOKING_ID = bookingRes.booking._id;

    // 2. Create Razorpay order
    const orderRes = await api.payments.createOrder(CURRENT_BOOKING_ID);
    if (!orderRes.success) {
      toast(orderRes.message || 'Payment order failed.', 'error');
      setStep(2);
      return;
    }

    // 3. Open Razorpay checkout
    const options = {
      key: orderRes.key,
      amount: orderRes.order.amount,
      currency: orderRes.order.currency,
      name: 'Delhi 6 Heritage Tours',
      description: ACT[S.id].title,
      order_id: orderRes.order.id,
      handler: async function (response) {
        // Payment successful — verify on backend
        try {
          const verifyRes = await api.payments.verify({
            razorpayOrderId: response.razorpay_order_id,
            razorpayPaymentId: response.razorpay_payment_id,
            razorpaySignature: response.razorpay_signature,
            bookingId: CURRENT_BOOKING_ID,
          });

          if (verifyRes.success) {
            // Also confirm the booking
            try {
              await api.bookings.confirm(CURRENT_BOOKING_ID, {
                razorpayOrderId: response.razorpay_order_id,
                razorpayPaymentId: response.razorpay_payment_id,
                razorpaySignature: response.razorpay_signature,
              });
            } catch (e) { /* already confirmed via verify */ }
            buildConfFromAPI(verifyRes.booking);
          } else {
            toast('Payment verification failed.', 'error');
            setStep(2);
          }
        } catch (err) {
          toast(err.message || 'Payment verification failed.', 'error');
          setStep(2);
        }
      },
      prefill: {
        name: $('cf-fn').value.trim() + ' ' + $('cf-ln').value.trim(),
        email: $('cf-em').value.trim(),
        contact: $('cf-ph').value.trim() ? '+91' + $('cf-ph').value.trim() : '',
      },
      theme: { color: '#B83A20' },
      modal: {
        ondismiss: function () {
          toast('Payment cancelled.', 'info');
          setStep(2);
        }
      }
    };

    const rzp = new Razorpay(options);
    rzp.open();

  } catch (err) {
    console.error('Checkout error:', err);
    toast(err.message || 'Something went wrong during checkout.', 'error');
    setStep(2);
  }
}

/* Build confirmation from API booking */
function buildConfFromAPI(booking) {
  const a = ACT[S.id];
  const total = booking.totalAmount || (a.price * S.guests);
  const fd = new Date(booking.date || S.date).toLocaleDateString('en-IN',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
  const ref = booking.confirmationCode || booking._id.slice(-8).toUpperCase();

  $('conf-email').textContent = booking.guestEmail || USER?.email || '';
  $('conf-ref').textContent = ref;
  $('conf-exp').textContent = booking.activitySnapshot?.title || a.title;
  $('conf-dt').textContent = fd + ' · ' + (booking.startTime ? formatSlotTime(booking.startTime) : S.slot);
  $('conf-g').textContent = booking.numberOfPeople + ' guest' + (booking.numberOfPeople > 1 ? 's' : '');
  $('conf-mp').textContent = booking.activitySnapshot?.meetingPoint?.address || a.meet;
  $('conf-amt').textContent = '₹' + total.toLocaleString('en-IN');

  // Refresh dashboard bookings
  loadDashboardBookings();
  go('confirmation');
}

/* Fallback build confirmation for non-DB bookings */
function buildConfLocal(){
  const a=ACT[S.id],total=a.price*S.guests;
  const fd=new Date(S.date).toLocaleDateString('en-IN',{weekday:'long',year:'numeric',month:'long',day:'numeric'});
  const ref='D6-'+Math.random().toString(36).slice(2,8).toUpperCase();
  const email=$('cf-em').value;
  $('conf-email').textContent=email; $('conf-ref').textContent=ref;
  $('conf-exp').textContent=a.title; $('conf-dt').textContent=fd+' · '+S.slot;
  $('conf-g').textContent=S.guests+' guest'+(S.guests>1?'s':'');
  $('conf-mp').textContent=a.meet; $('conf-amt').textContent='₹'+total.toLocaleString('en-IN');

  // Add to local bookings for dashboard
  BOOKINGS.upcoming.push({id:ref,actId:S.id,title:a.title,img:a.img,date:fd,slot:S.slot,guests:S.guests,total,meet:a.meet});
  renderDashboard();
  go('confirmation');
}

function selPM(pm){
  S.pm=pm;
  ['card','upi','nb'].forEach(m=>{$('pm-'+m).classList.toggle('active',m===pm);$('pf-'+m).style.display=m===pm?'':'none'});
}
function fmtCard(el){let v=el.value.replace(/\D/g,'').slice(0,16);el.value=v.match(/.{1,4}/g)?.join('  ')??v}
function fmtExp(el){let v=el.value.replace(/\D/g,'');if(v.length>=2)v=v.slice(0,2)+' / '+v.slice(2,4);el.value=v}

/* ── AUTH ── */
function switchTab(t){
  ['li','su','otp'].forEach(x=>{$('ap-'+x).classList.toggle('active',x===t)});
  $('atab-li').classList.toggle('active',t==='li');
  $('atab-su').classList.toggle('active',t==='su');
}

async function handleGoogleLogin(response) {
  try {
    const res = await api.auth.google({ token: response.credential });
    if (res.success) {
      setToken(res.token);
      const u = res.user || res.data;
      setSavedUser(u);
      setLoggedIn(u);
      toast('Signed in with Google!', 'success');
      ['ap-li', 'ap-su', 'ap-otp'].forEach(x => { const el = document.getElementById('ap-' + x); if (el) el.classList.remove('active'); });

      const returnTo = sessionStorage.getItem('delhi6_return');
      sessionStorage.removeItem('delhi6_return');
      if (returnTo === 'checkout') {
        setTimeout(() => goCheckout(), 600);
      } else {
        setTimeout(() => go('dashboard'), 800);
      }
    }
  } catch (err) {
    toast(err.message || 'Google Sign-in failed.', 'error');
  }
}
window.handleGoogleLogin = handleGoogleLogin;

async function doLogin(){
  const e=$('li-em').value.trim(),p=$('li-pw').value;
  if(!e||!e.includes('@')){toast('Please enter a valid email.','error');return}
  if(!p){toast('Please enter your password.','error');return}

  try {
    const res = await api.auth.login({ email: e, password: p });
    if (res.success) {
      setToken(res.token);
      setSavedUser(res.user);
      setLoggedIn(res.user);
      toast(res.message || 'Welcome back!', 'success');

      // Check for return intent
      const returnTo = sessionStorage.getItem('delhi6_return');
      sessionStorage.removeItem('delhi6_return');
      if (returnTo === 'checkout') {
        setTimeout(() => goCheckout(), 600);
      } else {
        setTimeout(()=>go('dashboard'),800);
      }
    }
  } catch (err) {
    toast(err.message || 'Login failed. Please try again.', 'error');
  }
}

async function doSignup(){
  const fn=$('su-fn').value.trim(),ln=$('su-ln').value.trim(),em=$('su-em').value.trim(),ph=$('su-ph').value.trim(),pw=$('su-pw').value;
  if(!fn){toast('Please enter your first name.','error');return}
  if(!em||!em.includes('@')){toast('Please enter a valid email.','error');return}
  if(!ph||ph.length!==10){toast('Please enter a valid 10-digit number.','error');return}
  if(!pw||pw.length<6){toast('Password must be at least 6 characters.','error');return}

  try {
    const fullName = fn + (ln ? ' ' + ln : '');
    const res = await api.auth.register({ name: fullName, email: em, phone: ph, password: pw });
    if (res.success) {
      setToken(res.token);
      setSavedUser(res.user);
      setLoggedIn(res.user);

      // Show OTP step cosmetically (auto-accept any code)
      USER = res.user;
      $('otp-ph').textContent = ph;
      $('ap-li').classList.remove('active');$('ap-su').classList.remove('active');$('ap-otp').classList.add('active');
      $('atab-li').classList.remove('active');$('atab-su').classList.remove('active');
      document.getElementById('o0').focus();
      toast('Account created! Enter any 6 digits to continue.', 'success');
    }
  } catch (err) {
    toast(err.message || 'Registration failed. Please try again.', 'error');
  }
}

function oNext(el,idx){
  if(el.value&&idx<5)document.getElementById('o'+(idx+1)).focus();
  if(idx===5&&el.value){const otp=[0,1,2,3,4,5].map(i=>document.getElementById('o'+i).value).join('');if(otp.length===6)verOtp()}
}
function verOtp(){
  const otp=[0,1,2,3,4,5].map(i=>document.getElementById('o'+i).value).join('');
  if(otp.length<6){toast('Please enter the full 6-digit OTP.','error');return}
  // OTP is cosmetic — user is already registered via API
  if(USER) setLoggedIn(USER);
  toast('Welcome to Delhi 6! 🎉','success');

  // Check for return intent
  const returnTo = sessionStorage.getItem('delhi6_return');
  sessionStorage.removeItem('delhi6_return');
  if (returnTo === 'checkout') {
    setTimeout(() => goCheckout(), 600);
  } else {
    setTimeout(()=>go('dashboard'),900);
  }
}

/* ── FILTER ── */
function filterExp(btn,cat){
  document.querySelectorAll('.filter-btn').forEach(b=>b.classList.remove('active'));btn.classList.add('active');
  document.querySelectorAll('#exp-list .exp-card').forEach(c=>c.style.display=(cat==='all'||c.dataset.cat===cat)?'':'none');
}

/* ── CONTACT ── */
function submitContact(){
  const n=$('ct-fn').value.trim(),e=$('ct-em').value.trim(),m=$('ct-msg').value.trim();
  if(!n){toast('Please enter your name.','error');return}
  if(!e||!e.includes('@')){toast('Please enter a valid email.','error');return}
  if(!m){toast('Please write a message.','error');return}
  toast('Message sent! We\'ll reply within 24 hours.','success');
  ['ct-fn','ct-ln','ct-em','ct-ph','ct-msg'].forEach(id=>{const el=document.getElementById(id);if(el)el.value=''});
}

/* ── TOAST ── */
let _tt;
function toast(msg,type='success'){
  const icons={success:'lucide:check-circle-2',error:'lucide:x-circle',info:'lucide:info'};
  const el=$('t-el'); $('t-ico').setAttribute('icon',icons[type]||icons.success); $('t-msg').textContent=msg;
  el.style.background=type==='error'?'#991b1b':type==='info'?'#3d2515':'#2a1a0f';
  el.classList.add('show'); clearTimeout(_tt); _tt=setTimeout(()=>el.classList.remove('show'),3500);
}

/* ── AUTH STATE ── */
function setLoggedIn(u){
  USER=u;
  const initial=(u.name||'U')[0].toUpperCase();
  const shortName=u.name.split(' ')[0]+(u.name.split(' ')[1]?' '+u.name.split(' ')[1][0]+'.':'');
  // Navbar swap
  $('nav-logged-out').style.display='none';
  $('nav-logged-in').style.display='flex';
  $('nav-av-initial').textContent=initial;
  $('nav-username').textContent=shortName;
  // Sidebar
  $('db-av').textContent=initial; $('db-name').textContent=u.name; $('db-email').textContent=u.email;
  // Profile form
  const parts=u.name.split(' ');
  $('pf-fn').value=parts[0]||''; $('pf-ln').value=parts.slice(1).join(' ')||'';
  $('pf-em').value=u.email; if(u.phone)$('pf-ph').value=u.phone;
  $('pf-fn').dispatchEvent(new Event('input'));
  $('prof-av').textContent=initial; $('prof-name').textContent=u.name;
  $('prof-email-disp').textContent=u.email;
  if(u.phone)$('prof-phone-disp').textContent='+91 '+u.phone;
}

function doLogout(){
  USER=null;
  removeToken();
  removeSavedUser();
  $('nav-logged-out').style.display='flex';
  $('nav-logged-in').style.display='none';
  BOOKINGS={upcoming:[],past:[]};
  toast('You\'ve been logged out. See you soon!','info');
  go('home');
}

/* ── DASHBOARD ── */
function switchDashSection(sec){
  ['bookings','profile','wishlist','reviews'].forEach(s=>{
    const ds=$('ds-'+s), dn=$('dnav-'+s);
    if(ds) ds.classList.toggle('active',s===sec);
    if(dn) dn.classList.toggle('active',s===sec);
  });
  if(sec==='reviews') renderReviews();
}

function switchDashTab(tab){
  ['upcoming','past'].forEach(t=>{
    $('dbt-'+t).classList.toggle('active',t===tab);
    $('dtp-'+t).classList.toggle('active',t===tab);
  });
}

/* Load bookings from API */
async function loadDashboardBookings() {
  if (!USER || !getToken()) return;

  try {
    const res = await api.bookings.getMy({ limit: 50 });
    if (res.success) {
      BOOKINGS.upcoming = [];
      BOOKINGS.past = [];

      res.bookings.forEach(b => {
        const entry = {
          id: b.confirmationCode || b._id,
          dbId: b._id,
          actId: findFrontendKey(b.activity?._id || b.activity) || '',
          title: b.activitySnapshot?.title || b.activity?.title || 'Activity',
          img: getActivityImage(b),
          date: new Date(b.date).toLocaleDateString('en-IN',{weekday:'long',year:'numeric',month:'long',day:'numeric'}),
          slot: b.startTime ? formatSlotTime(b.startTime) : '',
          guests: b.numberOfPeople,
          total: b.totalAmount,
          meet: b.activitySnapshot?.meetingPoint?.address || b.activitySnapshot?.meetingPoint || '',
          status: b.status,
          paymentStatus: b.paymentStatus,
        };

        if (['confirmed','pending'].includes(b.status)) {
          BOOKINGS.upcoming.push(entry);
        } else {
          BOOKINGS.past.push(entry);
        }
      });

      renderDashboard();
    }
  } catch (err) {
    console.error('Failed to load bookings:', err);
    // Fall back to rendering whatever local data we have
    renderDashboard();
  }
}

function getActivityImage(booking) {
  // Try to match to our local images
  const key = findFrontendKey(booking.activity?._id || booking.activity);
  if (key && ACT[key]) return ACT[key].img;
  return booking.activity?.coverImage || 'images/food-walk.png';
}

function findFrontendKey(mongoId) {
  if (!mongoId) return '';
  const str = typeof mongoId === 'object' ? mongoId.toString() : mongoId;
  for (const [key, data] of Object.entries(DB_ACTIVITIES)) {
    if (data._id === str) return key;
  }
  return '';
}

function renderDashboard(){
  const ul=$('db-upcoming-list'), ue=$('db-upcoming-empty');
  const upcoming=BOOKINGS.upcoming;
  if(upcoming.length===0){ ul.innerHTML=''; ue.style.display='block'; }
  else {
    ue.style.display='none';
    ul.innerHTML=upcoming.map(b=>`
      <div class="booking-card">
        <div class="bk-img-wrap"><img src="${b.img}" alt="${b.title}"/></div>
        <div class="bk-content">
          <div class="bk-head">
            <div><div class="bk-name">${b.title}</div><div class="bk-id">Booking ID: #${b.id}</div></div>
            <div class="badge ${b.status==='confirmed'?'badge-green':'badge-grey'}">${capitalize(b.status)}</div>
          </div>
          <div class="bk-details">
            <div class="bk-det-item"><iconify-icon icon="lucide:calendar"></iconify-icon> ${b.date}</div>
            <div class="bk-det-item"><iconify-icon icon="lucide:clock"></iconify-icon> ${b.slot}</div>
            <div class="bk-det-item"><iconify-icon icon="lucide:users"></iconify-icon> ${b.guests} Guest${b.guests>1?'s':''}</div>
            <div class="bk-det-item"><iconify-icon icon="lucide:indian-rupee"></iconify-icon> ₹${b.total.toLocaleString('en-IN')} Total</div>
          </div>
          <div class="bk-foot">
            <button class="btn btn-outline" onclick="cancelBookingAPI('${b.dbId || b.id}')"><iconify-icon icon="lucide:x-circle"></iconify-icon> Cancel</button>
            <button class="btn btn-outline" onclick="toast('Downloading ticket…','success')"><iconify-icon icon="lucide:download"></iconify-icon> Ticket</button>
            ${b.actId ? `<button class="btn btn-primary" onclick="openActivity('${b.actId}')">View Details</button>` : ''}
          </div>
        </div>
      </div>`).join('');
  }
  // Update stats
  const totalSpent = BOOKINGS.upcoming.reduce((s,b)=>s+b.total,0) + BOOKINGS.past.reduce((s,b)=>s+b.total,0);
  $('db-stat-upcoming').textContent = BOOKINGS.upcoming.length;
  $('db-stat-past').textContent = BOOKINGS.past.length;
  $('db-stat-spent').textContent = '₹'+(totalSpent).toLocaleString('en-IN');
}

async function cancelBookingAPI(id) {
  try {
    const res = await api.bookings.cancel(id, 'Cancelled by user');
    if (res.success) {
      toast(res.message || 'Booking cancelled.', 'info');
      await loadDashboardBookings();
    }
  } catch (err) {
    // If API fails (e.g. local-only booking), remove locally
    BOOKINGS.upcoming = BOOKINGS.upcoming.filter(b => b.id !== id && b.dbId !== id);
    renderDashboard();
    toast('Booking cancelled. Refund will be processed in 3–5 days.','info');
  }
}

function cancelBooking(id) {
  cancelBookingAPI(id);
}

async function saveProfile(){
  if(!USER) return;
  const fn=$('pf-fn').value.trim(),ln=$('pf-ln').value.trim();
  const fullName=fn+(ln?' '+ln:'');
  const phone = $('pf-ph').value.trim();

  try {
    const res = await api.auth.updateProfile({ name: fullName, phone });
    if (res.success) {
      USER = res.user;
      setSavedUser(USER);
      setLoggedIn(USER);
      toast('Profile updated successfully!','success');
    }
  } catch (err) {
    // Fallback: update locally
    USER.name=fullName; USER.email=$('pf-em').value.trim(); USER.phone=phone;
    setLoggedIn(USER);
    toast(err.message || 'Profile updated locally.','info');
  }
}

/* ── REVIEWS ── */
let RV = { actId:'', bookingRef:'', bookingKey:'', rating:0, tags:[], text:'', dbBookingId:'' };
let REVIEWS = []; // submitted reviews (from API + local)

const STAR_LABELS = ['','Terrible 😞','Not great 😕','It was okay 😐','Really good 😊','Outstanding! 🤩'];

function openReviewModal(actId, bookingRef, bookingKey, dbBookingId) {
  // Already reviewed locally?
  if (REVIEWS.find(r => r.bookingKey === bookingKey)) {
    toast('You\'ve already reviewed this experience.','info'); return;
  }
  const a = ACT[actId];
  if (!a) return;
  RV = { actId, bookingRef, bookingKey, rating:0, tags:[], text:'', dbBookingId: dbBookingId || '' };

  // Reset modal UI
  $('rv-hero-img').src = a.img;
  $('rv-exp-name').textContent = a.title;
  $('rv-text').value = '';
  document.querySelectorAll('.star-btn').forEach(b => b.classList.remove('lit'));
  document.querySelectorAll('.rtag').forEach(t => t.classList.remove('active'));
  $('star-label').textContent = 'Tap a star to rate';
  $('rv-step1').style.display = '';
  $('rv-step2').style.display = 'none';

  $('review-backdrop').classList.add('open');
  document.body.style.overflow = 'hidden';
}

function closeReviewModal(e) {
  if (e && e.target !== $('review-backdrop')) return;
  $('review-backdrop').classList.remove('open');
  document.body.style.overflow = '';
}

function setRating(val) {
  RV.rating = val;
  document.querySelectorAll('.star-btn').forEach(b => {
    b.classList.toggle('lit', parseInt(b.dataset.val) <= val);
  });
  $('star-label').textContent = STAR_LABELS[val];
}

// Hover preview on stars
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('.star-btn').forEach(btn => {
    btn.addEventListener('mouseenter', () => {
      const v = parseInt(btn.dataset.val);
      document.querySelectorAll('.star-btn').forEach(b => {
        b.style.color = parseInt(b.dataset.val) <= v ? 'var(--gold)' : '';
      });
      $('star-label').textContent = STAR_LABELS[v];
    });
    btn.addEventListener('mouseleave', () => {
      document.querySelectorAll('.star-btn').forEach(b => { b.style.color = ''; });
      $('star-label').textContent = RV.rating ? STAR_LABELS[RV.rating] : 'Tap a star to rate';
    });
  });
});

function toggleTag(el) {
  el.classList.toggle('active');
  const tag = el.textContent;
  if (el.classList.contains('active')) { RV.tags.push(tag); }
  else { RV.tags = RV.tags.filter(t => t !== tag); }
}

async function submitReview() {
  if (!RV.rating) { toast('Please rate your experience first.','error'); return; }
  RV.text = $('rv-text').value.trim();

  const a = ACT[RV.actId];

  // Try to submit to backend
  if (RV.dbBookingId && S.dbActivityId) {
    try {
      const res = await api.reviews.create({
        activityId: DB_ACTIVITIES[RV.actId]?._id || S.dbActivityId,
        bookingId: RV.dbBookingId,
        rating: RV.rating,
        title: RV.tags.join(', '),
        comment: RV.text || RV.tags.join(', ') || 'Great experience!',
      });
      if (res.success) {
        toast('Review submitted!', 'success');
      }
    } catch (err) {
      // API review failed, storing locally
    }
  }

  // Build local review object
  const review = {
    actId: RV.actId,
    bookingKey: RV.bookingKey,
    bookingRef: RV.bookingRef,
    expName: a.title,
    expImg: a.img,
    rating: RV.rating,
    tags: [...RV.tags],
    text: RV.text,
    date: new Date().toLocaleDateString('en-IN',{day:'numeric',month:'long',year:'numeric'}),
    author: USER ? USER.name : 'You',
  };
  REVIEWS.push(review);

  // Update the Leave Review button for that booking
  const btn = document.getElementById('rv-btn-' + RV.bookingKey);
  if (btn) {
    btn.innerHTML = '★'.repeat(RV.rating) + ' Reviewed';
    btn.disabled = true;
    btn.style.color = 'var(--gold)';
    btn.style.borderColor = 'rgba(200,136,42,.35)';
    btn.style.cursor = 'default';
    btn.onclick = null;
  }

  // Also update dynamically added buttons
  document.querySelectorAll('[data-rv-key="' + RV.bookingKey + '"]').forEach(b => {
    b.innerHTML = '★'.repeat(RV.rating) + ' Reviewed';
    b.disabled = true;
    b.style.color = 'var(--gold)';
    b.onclick = null;
  });

  // Show thank you step
  $('rv-submitted-stars').textContent = '★'.repeat(RV.rating) + '☆'.repeat(5 - RV.rating);
  $('rv-submitted-preview').textContent = RV.text ? '"' + RV.text.slice(0,100) + (RV.text.length>100?'…':'"') : '';
  $('rv-step1').style.display = 'none';
  $('rv-step2').style.display = '';

  // Render in My Reviews panel
  renderReviews();
}

function renderReviews() {
  const list = $('reviews-list'), empty = $('reviews-empty');
  if (REVIEWS.length === 0) { list.innerHTML = ''; empty.style.display = 'block'; return; }
  empty.style.display = 'none';
  list.innerHTML = REVIEWS.map(r => `
    <div class="review-card">
      <div class="rc-head">
        <div>
          <div class="rc-exp">${r.expName}</div>
          <div class="rc-date">${r.date} · Booking ${r.bookingRef}</div>
        </div>
        <div class="rc-stars">${'★'.repeat(r.rating)}${'☆'.repeat(5-r.rating)}</div>
      </div>
      ${r.tags.length ? `<div class="rc-tags">${r.tags.map(t=>`<span class="rc-tag">${t}</span>`).join('')}</div>` : ''}
      ${r.text ? `<p class="rc-text">"${r.text}"</p>` : '<p class="rc-text" style="opacity:.5">No written review.</p>'}
    </div>
  `).join('');
}

/* ── UTIL ── */
function $(id){return document.getElementById(id)}
function capitalize(s) { return s ? s.charAt(0).toUpperCase() + s.slice(1) : ''; }

/* ── Load activities from API and map to frontend keys ── */
async function loadActivitiesFromAPI() {
  try {
    const res = await api.activities.list({ limit: 50 });
    if (res.success && res.activities.length > 0) {
      // Map API activities to frontend keys by matching titles
      const titleMap = {
        'old delhi food walk': 'foodwalk',
        'heritage walk': 'heritage',
        'heritage architecture walk': 'heritage',
        'heritage walk — mughal delhi': 'heritage',
        'authentic cooking class': 'cooking',
        'old delhi cooking class': 'cooking',
        'khari baoli spice tour': 'spice',
        'khari baoli spice market tour': 'spice',
        'old delhi craft workshop': 'craft',
        'old delhi night walk': 'night',
      };

      res.activities.forEach(act => {
        const key = titleMap[act.title.toLowerCase()] || act.slug;
        if (key && ACT[key]) {
          DB_ACTIVITIES[key] = act;
          DB_ACTIVITIES_BY_ID[act._id] = { frontendKey: key, ...act };
          // Update the price if different in DB
          // ACT[key].price = act.pricePerPerson; // Uncomment to use DB prices
        }
      });

      // Activities loaded from API
    }
  } catch (err) {
    // API activities unavailable, using local data
  }
}

/* ── Restore session on page load ── */
async function restoreSession() {
  const token = getToken();
  const savedUser = getSavedUser();

  if (token && savedUser) {
    // Quick restore from cache
    USER = savedUser;
    setLoggedIn(USER);

    // Verify token is still valid
    try {
      const res = await api.auth.getMe();
      if (res.success) {
        USER = res.user;
        setSavedUser(USER);
        setLoggedIn(USER);
        loadDashboardBookings();
      }
    } catch (err) {
      // Token expired — clear session
      // Session expired
      removeToken();
      removeSavedUser();
      USER = null;
      $('nav-logged-out').style.display='flex';
      $('nav-logged-in').style.display='none';
    }
  }
}

/* ── INIT ── */
window.addEventListener('DOMContentLoaded', async () => {
  const d=new Date();d.setDate(d.getDate()+1);
  const iso=d.toISOString().split('T')[0];
  const bkd=$('bk-date');if(bkd){bkd.min=iso;bkd.value=iso;}

  // Load activities from API (non-blocking)
  loadActivitiesFromAPI();

  // Restore user session
  await restoreSession();

  // Initial render
  renderDashboard();
});
