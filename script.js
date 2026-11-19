// --- Formulário de Contato ---
const contactForm = document.getElementById('contact-form');
const feedback = document.getElementById('contact-feedback');

contactForm.onsubmit = (e) => {
    e.preventDefault(); // Evita recarregamento da página
    feedback.style.display = 'block';
    feedback.innerText = 'Mensagem enviada! Entraremos em contato.';
    contactForm.reset();
};