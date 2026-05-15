const user = localStorage.getItem('userData');
if (!user) {
    window.location.href = '/src/pages/auth/login/login.html'; 
} else {
    window.location.href = '/src/pages/store/home/home.html';
}