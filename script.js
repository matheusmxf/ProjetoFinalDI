const themeBtn = document.getElementById('btn-theme');
const currentTheme = localStorage.getItem('theme') || (matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

document.documentElement.setAttribute('data-theme', currentTheme);

themeBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let targetTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem('theme', targetTheme); 
});

let fontSize = parseInt(localStorage.getItem('fontSize')) || 16;
function applyFont() {
    document.documentElement.style.setProperty('--font-base', fontSize + 'px');
    localStorage.setItem('fontSize', fontSize);
}
applyFont();
document.getElementById('btn-a-plus').onclick = () => { if (fontSize < 24) { fontSize += 2; applyFont(); } };
document.getElementById('btn-a-minus').onclick = () => { if (fontSize > 12) { fontSize -= 2; applyFont(); } };

const toastEl = document.getElementById('toast');
function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add('show');
    setTimeout(() => toastEl.classList.remove('show'), 3000);
}

const slides = document.querySelectorAll('.slide');
const hero = document.querySelector('.hero-carousel');
const dotsBox = document.getElementById('c-dots');
let slideIndex = 0, timer;

slides.forEach((_, i) => {
    const d = document.createElement('button');
    d.className = 'dot';
    d.setAttribute('aria-label', 'Ir para o slide ' + (i + 1));
    d.onclick = () => showSlide(i);
    dotsBox.appendChild(d);
});
const dots = dotsBox.children;

function showSlide(index) {
    slideIndex = (index + slides.length) % slides.length;
    slides.forEach((s, i) => {
        s.classList.toggle('active', i === slideIndex);
        dots[i].classList.toggle('active', i === slideIndex);
    });
}
function startAuto() { stopAuto(); timer = setInterval(() => showSlide(slideIndex + 1), 5000); }
function stopAuto() { clearInterval(timer); }

document.getElementById('c-next').onclick = () => showSlide(slideIndex + 1);
document.getElementById('c-prev').onclick = () => showSlide(slideIndex - 1);
hero.onmouseenter = stopAuto;
hero.onmouseleave = startAuto;
showSlide(0);
startAuto();

const cards = document.querySelectorAll('#cards .card');
const noResults = document.getElementById('no-results');

document.getElementById('search').oninput = (e) => {
    const q = e.target.value.toLowerCase().trim();
    let found = 0;
    cards.forEach(c => {
        const show = c.innerText.toLowerCase().includes(q);
        c.style.display = show ? '' : 'none';
        if (show) found++;
    });
    noResults.style.display = found ? 'none' : 'block';
};

function countUp(el) {
    const end = +el.dataset.target;
    const step = Math.max(1, Math.ceil(end / 60));
    let n = 0;
    const t = setInterval(() => {
        n = Math.min(end, n + step);
        el.textContent = n;
        if (n >= end) clearInterval(t);
    }, 25);
}
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(en => {
        if (en.isIntersecting) {
            en.target.querySelectorAll('.counter').forEach(countUp);
            statsObserver.unobserve(en.target);
        }
    });
}, { threshold: 0.3 });
statsObserver.observe(document.querySelector('.stats'));

const contactForm = document.getElementById('contact-form');
contactForm.onsubmit = (e) => {
    e.preventDefault();
    toast('Obrigado, ' + document.getElementById('c-name').value.trim().split(' ')[0] + '! Sua avaliação foi solicitada.');
    contactForm.reset();
};

const toTop = document.getElementById('to-top');
window.addEventListener('scroll', () => toTop.classList.toggle('show', window.scrollY > 400));
toTop.onclick = () => window.scrollTo({ top: 0, behavior: 'smooth' });


const authView = document.getElementById('auth-view');
const appView = document.getElementById('app-view');
const loginForm = document.getElementById('login-form');
const registerForm = document.getElementById('register-form');
const msg = document.getElementById('auth-msg');
let attempts = 0;

const getSession = () => JSON.parse(localStorage.getItem('session') || sessionStorage.getItem('session') || 'null');

const getUsers = () => JSON.parse(localStorage.getItem('users') || '[]');
const saveUsers = (list) => localStorage.setItem('users', JSON.stringify(list));

async function hash(text) {
    if (!window.crypto || !crypto.subtle) return btoa(unescape(encodeURIComponent(text)));
    const buf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(text));
    return Array.from(new Uint8Array(buf)).map(b => b.toString(16).padStart(2, '0')).join('');
}

function showMsg(text, ok) {
    msg.textContent = text;
    msg.style.color = ok ? 'var(--primary)' : '#ef4444';
}

function showApp(session, fresh) {
    const firstName = session.name.split(' ')[0];
    authView.hidden = true;
    appView.hidden = false;
    document.getElementById('user-name').textContent = '👤 ' + firstName;
    document.getElementById('c-name').value = session.name; 
    document.getElementById('c-email').value = session.email;
    window.scrollTo(0, 0);
    startAuto();
    if (fresh) toast('Bem-vindo(a), ' + firstName + '!');
}

function showAuth() {
    stopAuto();
    appView.hidden = true;
    authView.hidden = false;
    loginForm.reset(); registerForm.reset(); showMsg('', false);
}

function startSession(user, remember) {
    const data = JSON.stringify({ name: user.name, email: user.email });
    (remember ? localStorage : sessionStorage).setItem('session', data);
    showMsg('Autenticação realizada com sucesso! Redirecionando...', true);
    setTimeout(() => showApp(getSession(), true), 1000);
}

document.querySelectorAll('.tab').forEach(tab => {
    tab.onclick = () => {
        const isLogin = tab.dataset.tab === 'login';
        document.querySelectorAll('.tab').forEach(t => {
            t.classList.toggle('active', t === tab);
            t.setAttribute('aria-selected', t === tab);
        });
        loginForm.hidden = !isLogin;
        registerForm.hidden = isLogin;
        showMsg('', false);
    };
});

document.querySelectorAll('.toggle-pass').forEach(btn => {
    btn.onclick = () => {
        const input = document.getElementById(btn.dataset.target);
        const show = input.type === 'password';
        input.type = show ? 'text' : 'password';
        btn.setAttribute('aria-label', show ? 'Ocultar senha' : 'Mostrar senha');
    };
});

registerForm.onsubmit = async (e) => {
    e.preventDefault();
    const name = document.getElementById('r-name').value.trim();
    const email = document.getElementById('r-email').value.trim().toLowerCase();
    const pass = document.getElementById('r-pass').value;

    if (pass !== document.getElementById('r-pass2').value) return showMsg('As senhas não coincidem.', false);
    const users = getUsers();
    if (users.some(u => u.email === email)) return showMsg('Este e-mail já está cadastrado. Use a aba Entrar.', false);

    const user = { name, email, pass: await hash(pass) };
    users.push(user);
    saveUsers(users);
    startSession(user, true);
};

loginForm.onsubmit = async (e) => {
    e.preventDefault();
    if (attempts >= 5) return showMsg('Muitas tentativas. Aguarde 30 segundos.', false);

    const email = document.getElementById('l-email').value.trim().toLowerCase();
    const passHash = await hash(document.getElementById('l-pass').value);
    const user = getUsers().find(u => u.email === email && u.pass === passHash);

    if (!user) {
        attempts++;
        if (attempts >= 5) setTimeout(() => { attempts = 0; showMsg('', false); }, 30000);
        return showMsg('E-mail ou senha incorretos. Se ainda não tem conta, crie uma.', false);
    }
    startSession(user, document.getElementById('l-remember').checked);
};

document.getElementById('btn-logout').onclick = () => {
    localStorage.removeItem('session');
    sessionStorage.removeItem('session');
    showAuth();
};

const activeSession = getSession();
activeSession ? showApp(activeSession, false) : showAuth();