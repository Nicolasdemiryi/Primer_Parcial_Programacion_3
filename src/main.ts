// En main.ts
const user = localStorage.getItem('user');
if (!user) {
    // Si estás en la raíz, la ruta debe empezar con ./src/...
    window.location.href = '/src/pages/auth/login/login.html'; 
} else {
    window.location.href = './src/pages/store/home/home.html';
}