AOS.init();

// Show Shadow NavBar
var navBar = document.getElementById('navbar');
window.onscroll = function () {
    if (window.scrollY > 22) {
        navBar.classList.add('float');
    } else {
        navBar.classList.remove('float');
    }
};

// Scroll Animation
window.addEventListener('scroll', reveal);
function reveal() {
    var reveals = document.querySelectorAll('.reveal');
    for (var i = 0; i, reveals.length; i++) {
        var windowheight = window.innerHeight;
        var revealtop = reveals[i].getBoundingClientRect().top;
        var revealpoint = 50;

        if (revealtop < windowheight - revealpoint) {
            reveals[i].classList.add('active');
        } else {
            reveals[i].classList.remove('active');
        }
    }
}

// Selected Menu
const li = document.querySelectorAll(".links");
const sec = document.querySelectorAll("section");

function activeMenu() {
    let len = sec.length;
    while (--len && window.scrollY + 200 < sec[len].offsetTop) { }
    li.forEach(ltx => ltx.classList.remove("selected"));
    li[len].classList.add("selected");
}
activeMenu();
window.addEventListener("scroll", activeMenu);

// Menu Button
function togglemenu() {
    var menutab = document.getElementById('myTab');
    if (menutab.classList.contains("show")) { // if is menuBox displayed, hide it
        menutab.classList.remove("show");
    }
    else { // if is menuBox hidden, display it
        menutab.classList.add("show");
    }
}
