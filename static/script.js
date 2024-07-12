document.addEventListener('DOMContentLoaded', function () {
    const sections = document.querySelectorAll('main > section');
    const navLinks = document.querySelectorAll('.nav-links a');
    const logo = document.querySelector('.logo');
    const getStartedButton = document.getElementById('get-started-button');
    const uploadForm = document.getElementById('upload-form');
    if (uploadForm) {
        uploadForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            // console.log(e);
            const formUploadData = new FormData();
            const subjectName = document.getElementById('subject').value;
            const courseCode = document.getElementById('course-code').value;
            const examType = document.getElementById('exam-type').value;
            const year = document.getElementById('year').value;
            const semester = document.getElementById('semester').value;
            const fileInput = document.getElementById('file').files[0];
            const description = document.getElementById('description').value;
            formUploadData.append('subject', subjectName);
            formUploadData.append('course', courseCode);
            formUploadData.append('examtype', examType);
            formUploadData.append('year', year);
            formUploadData.append('sem', semester);
            formUploadData.append('file', fileInput);
            formUploadData.append('desc', description);
            // for (let [key, value] of formUploadData.entries()) {
            //     console.log(key, value);
            // }
            try {
                const response = await fetch('https://dinosaur-keen-bengal.ngrok-free.app/api/files', {
                    method: 'POST',
                    redirect: 'follow',
                    body: formUploadData
                });
                if (response.ok) {
                    alert('File uploaded successfully!')
                    // alert(response)
                } else {
                    alert('File uploaded failed!')
                }
            } catch (err) {
                console.log('ERROR SOMEWHER :', err)
            }

            // alert('File uploaded successfully!');
        });
    }

    const loginForm = document.getElementById('login-form');
    if (loginForm) {
        loginForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            // alert('Login successful!');
            const formUploadData = new FormData();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            formUploadData.append('username', username);
            formUploadData.append('password', password);
            try {
                const response = await fetch('https://dinosaur-keen-bengal.ngrok-free.app/auth/login', {
                    method: 'POST',
                    redirect: 'follow',
                    body: formUploadData
                });
                if (!response.ok) {
                    alert(response.body)
                    // alert('File uploaded successfully!')
                    // alert(response)

                } else {
                    window.location.href = 'https://dinosaur-keen-bengal.ngrok-free.app';
                }
            } catch (err) {
                console.log('ERROR SOMEWHER :', err)
            }
        });
    }

    const signupForm = document.getElementById('signup-form');
    if (signupForm) {
        signupForm.addEventListener('submit', async function (e) {
            e.preventDefault();
            const formUploadData = new FormData();
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;
            formUploadData.append('username', username);
            formUploadData.append('password', password);
            try {
                const response = await fetch('https://dinosaur-keen-bengal.ngrok-free.app/auth/signup', {
                    method: 'POST',
                    redirect: 'follow',
                    body: formUploadData
                });
                if (!response.ok) {
                    alert(response.body)
                    // alert('File uploaded successfully!')
                    // alert(response)
                } else {
                    window.location.href = 'https://dinosaur-keen-bengal.ngrok-free.app';
                }
            } catch (err) {
                console.log('ERROR SOMEWHER :', err)
            }
        });
    }

    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    if (searchButton && searchInput) {
        searchButton.addEventListener('click', function () {
            const searchTerm = searchInput.value;
            console.log(searchTerm);
            // alert(`Searching for: ${searchTerm}`);
            // const query = document.getElementById('search-button');
            window.location.href = 'https://dinosaur-keen-bengal.ngrok-free.app/browse?q='+searchTerm;

        });
    }


    const menuBtn = document.querySelector('.menu-btn');
    const navLinksContainer = document.querySelector('.nav-links');

    if (menuBtn && navLinksContainer) {
        menuBtn.addEventListener('click', function () {
            navLinksContainer.classList.toggle('active');
        });
    }

    navLinks.forEach(link => {
        link.addEventListener('click', function () {
            if (navLinksContainer.classList.contains('active')) {
                navLinksContainer.classList.remove('active');
            }
        });
    });
});
