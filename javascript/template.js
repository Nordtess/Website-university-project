
document.addEventListener('DOMContentLoaded', function() {
    const $hamburgerBtn = document.getElementById('hamburger-btn');
    const $navbarUl = document.getElementById('navbar-ul');
    
    $hamburgerBtn.addEventListener('click', function() {
        $hamburgerBtn.classList.toggle('open');
        $navbarUl.classList.toggle('open');
    });
    
    const $navLinks = document.querySelectorAll('#navbar-ul a');
    $navLinks.forEach($link => {
        $link.addEventListener('click', function() {
            $hamburgerBtn.classList.remove('open');
            $navbarUl.classList.remove('open');
        });
    });
});