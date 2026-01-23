// Cache for loaded pages
const pageCache = {};

// Load page content
async function loadPage(sectionId) {
    if (pageCache[sectionId]) {
        return pageCache[sectionId];
    }

    try {
        const response = await fetch(`pages/${sectionId}.html`);
        if (!response.ok) {
            throw new Error(`Failed to load ${sectionId} page`);
        }
        const html = await response.text();
        pageCache[sectionId] = html;
        return html;
    } catch (error) {
        console.error(`Error loading page ${sectionId}:`, error);
        return '<div>Error loading content</div>';
    }
}

// Show section
async function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.content-section').forEach(section => {
        section.classList.remove('active');
    });

    // Load and show selected section
    const section = document.getElementById(sectionId);
    if (!section.innerHTML.trim()) {
        section.innerHTML = await loadPage(sectionId);
    }
    section.classList.add('active');

    // Update active nav link
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + sectionId) {
            link.classList.add('active');
        }
    });

    // Re-attach contact form listener if on contact page
    if (sectionId === 'contact') {
        attachContactFormListener();
    }
}

function copyEmail() {
    navigator.clipboard.writeText('citrigos@berkeley.edu')
        .then(() => {
            const emailP = document.querySelector('p[onclick="copyEmail()"]');
            const originalText = emailP.innerHTML;
            emailP.innerHTML = 'Email copied! ✓';
            emailP.style.color = '#4a7c8c';
            emailP.style.fontWeight = '500';
            setTimeout(() => {
                emailP.innerHTML = originalText;
                emailP.style.color = '';
                emailP.style.fontWeight = '';
            }, 1500);
        })
        .catch(err => {
            console.error('Failed to copy email:', err);
        });
}

function copyEmailContact() {
    navigator.clipboard.writeText('citrigos@berkeley.edu')
        .then(() => {
            const emailSpan = document.querySelector('span[onclick="copyEmailContact()"]');
            const originalText = emailSpan.innerHTML;
            emailSpan.innerHTML = 'Email copied! ✓';
            emailSpan.style.color = '#4a7c8c';
            emailSpan.style.fontWeight = '500';
            setTimeout(() => {
                emailSpan.innerHTML = originalText;
                emailSpan.style.color = '';
                emailSpan.style.fontWeight = '';
            }, 1500);
        })
        .catch(err => {
            console.error('Failed to copy email:', err);
        });
}

function togglePartyMode() {
    const lightSwitch = document.querySelector('.light-switch');
    const body = document.body;

    lightSwitch.classList.toggle('on');
    body.classList.toggle('party-mode');

    if (body.classList.contains('party-mode')) {
        document.querySelectorAll('a, h1, h2, h3').forEach(element => {
            element.style.transition = 'all 0.5s';
        });
    } else {
        document.querySelectorAll('a, h1, h2, h3').forEach(element => {
            element.style.transition = 'none';
        });
    }
}

function attachContactFormListener() {
    const form = document.getElementById('contact-form');
    if (form && !form.dataset.listenerAttached) {
        form.addEventListener('submit', async function(e) {
            e.preventDefault();

            const formData = new FormData(form);
            const status = document.getElementById('form-status');

            try {
                const response = await fetch(form.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        'Accept': 'application/json'
                    }
                });

                if (response.ok) {
                    form.reset();
                    status.style.display = 'inline';
                    setTimeout(() => {
                        status.style.display = 'none';
                    }, 5000);
                }
            } catch (error) {
                console.error('Error submitting form:', error);
            }
        });
        form.dataset.listenerAttached = 'true';
    }
}

// Handle direct navigation via URL hash
window.addEventListener('hashchange', () => {
    const section = window.location.hash.slice(1) || 'home';
    showSection(section);
});

// Load home page on initial load
window.addEventListener('DOMContentLoaded', () => {
    const section = window.location.hash.slice(1) || 'home';
    showSection(section);
});
