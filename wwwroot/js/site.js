// Please see documentation at https://learn.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.
const header = document.querySelector('[data-header]');
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.nav-menu');
const backToTop = document.querySelector('.back-to-top');

const updateScrollState = () => {
	header?.classList.toggle('is-scrolled', window.scrollY > 30);
	backToTop?.classList.toggle('is-visible', window.scrollY > 500);
};

window.addEventListener('scroll', updateScrollState, { passive: true });
updateScrollState();

menuToggle?.addEventListener('click', () => {
	const isOpen = menu.classList.toggle('is-open');
	menuToggle.setAttribute('aria-expanded', String(isOpen));
	menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
});

document.querySelectorAll('.nav-link, .nav-login').forEach((link) => {
	link.addEventListener('click', () => {
		menu?.classList.remove('is-open');
		menuToggle?.setAttribute('aria-expanded', 'false');
	});
});

const revealObserver = new IntersectionObserver((entries, observer) => {
	entries.forEach((entry) => {
		if (entry.isIntersecting) {
			entry.target.classList.add('is-visible');
			observer.unobserve(entry.target);
		}
	});
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const sections = document.querySelectorAll('main section[id]');
const navLinks = document.querySelectorAll('.nav-link');
const sectionObserver = new IntersectionObserver((entries) => {
	entries.forEach((entry) => {
		if (!entry.isIntersecting) return;
		navLinks.forEach((link) => link.classList.toggle('is-active', link.getAttribute('href') === `#${entry.target.id}`));
	});
}, { rootMargin: '-35% 0px -55% 0px' });
sections.forEach((section) => sectionObserver.observe(section));

const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');
contactForm?.addEventListener('submit', (event) => {
	event.preventDefault();
	if (!contactForm.checkValidity()) {
		contactForm.reportValidity();
		return;
	}
	const formData = new FormData(contactForm);
	const subject = encodeURIComponent(`New Codegy project inquiry from ${formData.get('name')}`);
	const body = encodeURIComponent(`Name: ${formData.get('name')}\nEmail: ${formData.get('email')}\n\nProject details:\n${formData.get('message')}`);
	window.location.href = `mailto:info@codegy-tech.com?subject=${subject}&body=${body}`;
	formStatus.textContent = 'Your email client is opening with the message prepared.';
});
