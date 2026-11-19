const themeBtn = document.getElementById('btn-theme');
const currentTheme = localStorage.getItem('theme');


if (currentTheme) document.documentElement.setAttribute('data-theme', currentTheme);

themeBtn.addEventListener('click', () => {
    let theme = document.documentElement.getAttribute('data-theme');
    let targetTheme = theme === 'dark' ? 'light' : 'dark';
    document.documentElement.setAttribute('data-theme', targetTheme);
    localStorage.setItem('theme', targetTheme);
});

let fontSize = 16;
document.getElementById('btn-a-plus').onclick = () => {
    if (fontSize < 24) { fontSize += 2; document.documentElement.style.setProperty('--font-base', fontSize + 'px'); }
};
document.getElementById('btn-a-minus').onclick = () => {
    if (fontSize > 12) { fontSize -= 2; document.documentElement.style.setProperty('--font-base', fontSize + 'px'); }
};

// --- Carrossel ---
const slides = document.querySelectorAll('.slide');
let slideIndex = 0;

function showSlide(index) {
    slides.forEach(s => s.classList.remove('active'));
    slides[index].classList.add('active');
}
document.getElementById('c-next').onclick = () => { slideIndex = (slideIndex + 1) % slides.length; showSlide(slideIndex); };
document.getElementById('c-prev').onclick = () => { slideIndex = (slideIndex - 1 + slides.length) % slides.length; showSlide(slideIndex); };

setInterval(() => {
    slideIndex = (slideIndex + 1) % slides.length;
    showSlide(slideIndex);
}, 5000);

// --- Formulário de Contato ---
const contactForm = document.getElementById('contact-form');
const contactFeedback = document.getElementById('contact-feedback');

contactForm.onsubmit = (e) => {
    e.preventDefault();
    contactFeedback.style.display = 'block';
    contactFeedback.innerText = 'Mensagem enviada! Entraremos em contato.';
    contactForm.reset();
};

const authView = document.getElementById('auth-view');
const appView = document.getElementById('app-view');
const loginForm = document.getElementById('login-form');
const msg = document.getElementById('auth-msg');

function showApp(name) {
    authView.hidden = true;
    appView.hidden = false;
    document.getElementById('user-name').textContent = '👤 ' + name;
    document.getElementById('c-name').value = name;
    window.scrollTo(0, 0);
}

function showAuth() {
    appView.hidden = true;
    authView.hidden = false;
    loginForm.reset();
    msg.textContent = '';
}

loginForm.onsubmit = (e) => {
    e.preventDefault();
    const email = document.getElementById('l-email').value.trim();
    const name = email.split('@')[0];
    const displayName = name.charAt(0).toUpperCase() + name.slice(1);

    sessionStorage.setItem('user', displayName);
    showApp(displayName);
};

document.getElementById('btn-logout').onclick = () => {
    sessionStorage.removeItem('user');
    showAuth();
};

const savedUser = sessionStorage.getItem('user');
savedUser ? showApp(savedUser) : showAuth();