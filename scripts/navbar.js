const navbar = document.getElementById('navbar');
const link = document.createElement('a');
link.classList.add('navbar-item');

import {nav} from '/data/nav.js';

nav.forEach((item, i) => {
  const navItem = link.cloneNode();
  navItem.href = item.url;
  navItem.innerHTML = item.name;
  if (item.isNewTab) {
    navItem.target = '_blank';
  }
  navbar.appendChild(navItem);
});

// <a class="navbar-item" target="_blank" href="https://Coding Otaku.com">
//   Coding Otaku
// </a>
// <a class="navbar-item">
//   About
// </a>
// <a class="navbar-item">
//   Contact
// </a>
document.addEventListener('DOMContentLoaded', () => {
  // Get all "navbar-burger" elements
  const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  // Check if there are any navbar burgers
  if ($navbarBurgers.length > 0) {
    // Add a click event on each of them
    $navbarBurgers.forEach( el => {
      el.addEventListener('click', () => {
        // Get the target from the "data-target" attribute
        const target = el.dataset.target;
        const $target = document.getElementById(target);
        // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
        el.classList.toggle('is-active');
        $target.classList.toggle('is-active');
      });
    });
  }
});
