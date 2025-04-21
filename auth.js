// document.addEventListener('DOMContentLoaded', function() {
//     // Check authentication status on page load
//     checkAuth();
    
//     // DOM Elements
//     const loginForm = document.getElementById('loginForm');
//     const errorMessage = document.getElementById('errorMessage');
//     const loginSection = document.getElementById('loginSection');
//     const cardsSection = document.getElementById('cardsSection');
//     const logoutBtn = document.getElementById('logoutBtn');
    
//     // Login form submission
//     loginForm.addEventListener('submit', function(e) {
//         e.preventDefault();
        
//         const username = document.getElementById('username').value;
//         const password = document.getElementById('password').value;
        
//         // Check credentials (admin/password)
//         if (username === 'admin' && password === '123456789') {//change the pasword here walli !!!!!!
//             // Successful login
//             localStorage.setItem('isAuthenticated', 'true');
//             loginSection.style.display = 'none';
//             cardsSection.style.display = 'block';
//             errorMessage.style.display = 'none';
//         } else {
//             // Failed login
//             errorMessage.style.display = 'block';
//         }
//     });
    
//     // Logout button
//     logoutBtn.addEventListener('click', function() {
//         localStorage.removeItem('isAuthenticated');
//         window.location.href = 'index.html';
//     });
    
//     // Card navigation
//     document.getElementById('cardA').addEventListener('click', function() {
//         window.location.href = 'pageA.html';
//     });
    
//     document.getElementById('cardB').addEventListener('click', function() {
//         window.location.href = 'pageB.html';
//     });
// });

// // Authentication check function
// function checkAuth() {
//     const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
//     const currentPage = window.location.pathname.split('/').pop();
    
//     // If on login page and authenticated, show dashboard
//     if (currentPage === 'index.html' || currentPage === '') {
//         if (isAuthenticated) {
//             document.getElementById('loginSection').style.display = 'none';
//             document.getElementById('cardsSection').style.display = 'block';
//         }
//     } 
//     // If on protected pages without auth, redirect to login
//     else if (currentPage === 'pageA.html' || currentPage === 'pageB.html') {
//         if (!isAuthenticated) {
//             window.location.href = 'index.html';
//         }
//     }
// }


document.addEventListener('DOMContentLoaded', function() {
    // Get the correct base path for GitHub Pages
    const basePath = window.location.host.includes('github.io') 
        ? '/' + window.location.pathname.split('/')[1] + '/'
        : '/';
    
    // Check authentication status on page load
    checkAuth(basePath);
    
    // DOM Elements
    const loginForm = document.getElementById('loginForm');
    const errorMessage = document.getElementById('errorMessage');
    const loginSection = document.getElementById('loginSection');
    const cardsSection = document.getElementById('cardsSection');
    const logoutBtn = document.getElementById('logoutBtn');
    
    // Login form submission
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const username = document.getElementById('username').value;
        const password = document.getElementById('password').value;
        
        // Check credentials (admin/123456789)
        if (username === 'admin' && password === '123456789') {
            // Successful login
            localStorage.setItem('isAuthenticated', 'true');
            loginSection.style.display = 'none';
            cardsSection.style.display = 'block';
            errorMessage.style.display = 'none';
            
            // Update URL without reloading
            history.pushState(null, '', basePath + 'index.html');
        } else {
            // Failed login
            errorMessage.style.display = 'block';
        }
    });
    
    // Logout button
    logoutBtn.addEventListener('click', function() {
        localStorage.removeItem('isAuthenticated');
        window.location.href = basePath + 'index.html';
    });
    
    // Card navigation
    document.getElementById('cardA').addEventListener('click', function() {
        window.location.href = basePath + 'pageA.html';
    });
    
    document.getElementById('cardB').addEventListener('click', function() {
        window.location.href = basePath + 'pageB.html';
    });
    
    // Handle browser back/forward buttons
    window.addEventListener('popstate', function() {
        checkAuth(basePath);
    });
});

// Authentication check function with base path support
function checkAuth(basePath = '/') {
    const isAuthenticated = localStorage.getItem('isAuthenticated') === 'true';
    let currentPage = window.location.pathname;
    
    // Remove base path from current page path
    if (basePath !== '/') {
        currentPage = currentPage.replace(new RegExp('^' + basePath), '');
    }
    currentPage = currentPage.split('/').pop();
    
    // If on login page and authenticated, show dashboard
    if (currentPage === 'index.html' || currentPage === '') {
        if (isAuthenticated) {
            document.getElementById('loginSection').style.display = 'none';
            document.getElementById('cardsSection').style.display = 'block';
        } else {
            document.getElementById('loginSection').style.display = 'block';
            document.getElementById('cardsSection').style.display = 'none';
        }
    } 
    // If on protected pages without auth, redirect to login
    else if (currentPage === 'pageA.html' || currentPage === 'pageB.html') {
        if (!isAuthenticated) {
            window.location.href = basePath + 'index.html';
        }
    }
}

// Create a function to handle GitHub Pages path resolution
function getBasePath() {
    if (window.location.host.includes('github.io')) {
        const pathParts = window.location.pathname.split('/');
        if (pathParts.length > 2) {
            return '/' + pathParts[1] + '/';
        }
    }
    return '/';
}