document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('main > section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const logo = document.querySelector('.logo');
    const getStartedButton = document.getElementById('get-started-button');

    function hideAllSections() {
        sections.forEach(section => {
            section.classList.add('hidden');
        });
    }

    function showSection(id) {
        hideAllSections();
        const section = document.getElementById(id);
        if (section) {
            section.classList.remove('hidden');
        }
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const sectionId = this.getAttribute('href').substring(1);
            showSection(sectionId);
        });
    });

    logo.addEventListener('click', function(e) {
        e.preventDefault();
        showSection('home');
        document.getElementById('about').classList.remove('hidden');
    });

   
    if (getStartedButton) {
        getStartedButton.addEventListener('click', function(e) {
            e.preventDefault();
            showSection('login');
        });
    }

    
    showSection('home');
    document.getElementById('about').classList.remove('hidden');


    const uploadForm = document.getElementById('upload-form');
    if (uploadForm) {
        uploadForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            alert('File uploaded successfully!');
        });
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            alert('Login successful!');
        });
    }

    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function() {
            const searchTerm = searchInput.value.toLowerCase();
    
            alert(`Searching for: ${searchTerm}`);
        });
    }

   
    const menuBtn = document.querySelector('.menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');

    if (menuBtn && navLinksContainer) {
        menuBtn.addEventListener('click', function() {
            navLinksContainer.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            if (navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
            }
        });
    });
});
