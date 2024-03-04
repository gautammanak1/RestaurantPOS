/**
 * PRELOAD
 * 
 * loading will be end after document is loaded
 */

const preloader = document.querySelector("[data-preaload]");

// Get the preloader container and images
const preloadContainer = document.getElementById('preload-container');
const preloadImages = document.querySelectorAll('#preload-container img');

// Function to fade out the preloader container
function fadeOutPreloader() {
  preloadContainer.style.opacity = '0';
  setTimeout(() => {
    preloadContainer.style.display = 'none';
  }, 1000); // Adjust the duration to match the CSS transition
}

// Event listener for when all images are loaded
window.addEventListener('load', function () {
  // Set a timeout to ensure a smooth transition
  setTimeout(fadeOutPreloader, 500);
});

window.addEventListener("load", function () {
  preloader.classList.add("loaded");
  document.body.classList.add("loaded");
});



/**
 * add event listener on multiple elements
 */

const addEventOnElements = function (elements, eventType, callback) {
  for (let i = 0, len = elements.length; i < len; i++) {
    elements[i].addEventListener(eventType, callback);
  }
}



/**
 * NAVBAR
 */

document.addEventListener('DOMContentLoaded', function () {
  setActiveNavLink();
});

function setActiveNavLink() {
  const pathName = window.location.pathname;
  const navLinks = document.querySelectorAll('.navbar-link');

  navLinks.forEach(link => {
    const linkPath = link.getAttribute('href');
    if (pathName.endsWith(linkPath)) {
      link.classList.add('active');
    } else {
      link.classList.remove('active');
    }
  });
}

const navbar = document.querySelector("[data-navbar]");
const navTogglers = document.querySelectorAll("[data-nav-toggler]");
const overlay = document.querySelector("[data-overlay]");

const toggleNavbar = function () {
  navbar.classList.toggle("active");
  overlay.classList.toggle("active");
  document.body.classList.toggle("nav-active");
}

addEventOnElements(navTogglers, "click", toggleNavbar);



/**
 * HEADER & BACK TOP BTN
 */

const header = document.querySelector("[data-header]");
const backTopBtn = document.querySelector("[data-back-top-btn]");

let lastScrollPos = 0;

const hideHeader = function () {
  if (isScrollBottom && !header.classList.contains("hide")) {
    header.classList.add("hide");
  } else if (!isScrollBottom && header.classList.contains("hide")) {
    header.classList.remove("hide");
  }

  lastScrollPos = window.scrollY;
}

window.addEventListener("scroll", function () {
  if (window.scrollY >= 50) {
    header.classList.add("active");
    backTopBtn.classList.add("active");
    hideHeader();
  } else {
    header.classList.remove("active");
    backTopBtn.classList.remove("active");
    header.classList.remove("hide"); // Ensure the header is not hidden when scrolling to the top
  }
});



/**
 * HERO SLIDER
 */

const heroSlider = document.querySelector("[data-hero-slider]");
const heroSliderItems = document.querySelectorAll("[data-hero-slider-item]");
const heroSliderPrevBtn = document.querySelector("[data-prev-btn]");
const heroSliderNextBtn = document.querySelector("[data-next-btn]");

let currentSlidePos = 0;
let lastActiveSliderItem = heroSliderItems[0];

const updateSliderPos = function () {
  lastActiveSliderItem.classList.remove("active");
  heroSliderItems[currentSlidePos].classList.add("active");
  lastActiveSliderItem = heroSliderItems[currentSlidePos];
}

const slideNext = function () {
  if (currentSlidePos >= heroSliderItems.length - 1) {
    currentSlidePos = 0;
  } else {
    currentSlidePos++;
  }

  updateSliderPos();
}

heroSliderNextBtn.addEventListener("click", slideNext);

const slidePrev = function () {
  if (currentSlidePos <= 0) {
    currentSlidePos = heroSliderItems.length - 1;
  } else {
    currentSlidePos--;
  }

  updateSliderPos();
}

heroSliderPrevBtn.addEventListener("click", slidePrev);

/**
 * auto slide
 */

let autoSlideInterval;

const autoSlide = function () {
  autoSlideInterval = setInterval(function () {
    slideNext();
  }, 7000);
}

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseover", function () {
  clearInterval(autoSlideInterval);
});

addEventOnElements([heroSliderNextBtn, heroSliderPrevBtn], "mouseout", autoSlide);

window.addEventListener("load", autoSlide);



/**
 * PARALLAX EFFECT
 */

const parallaxItems = document.querySelectorAll("[data-parallax-item]");

let x, y;

window.addEventListener("mousemove", function (event) {

  x = (event.clientX / window.innerWidth * 10) - 5;
  y = (event.clientY / window.innerHeight * 10) - 5;

  // reverse the number eg. 20 -> -20, -5 -> 5
  x = x - (x * 2);
  y = y - (y * 2);

  for (let i = 0, len = parallaxItems.length; i < len; i++) {
    x = x * Number(parallaxItems[i].dataset.parallaxSpeed);
    y = y * Number(parallaxItems[i].dataset.parallaxSpeed);
    parallaxItems[i].style.transform = `translate3d(${x}px, ${y}px, 0px)`;
  }

});

/**
 * BRANCHES
 */

let items = document.querySelectorAll('.slider .item');
let active = 3;
function loadShow() {
  items[active].style.transform = `none`;
  items[active].style.zIndex = 1;
  items[active].style.filter = 'none';
  items[active].style.opacity = 1;
  // show after
  let stt = 0;
  for (var i = active + 1; i < items.length; i++) {
    stt++;
    items[i].style.transform = `translateX(${120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(-1deg)`;
    items[i].style.zIndex = -stt;
    items[i].style.filter = 'blur(5px)';
    items[i].style.opacity = stt > 2 ? 0 : 0.6;
  }
  stt = 0;
  for (var i = (active - 1); i >= 0; i--) {
    stt++;
    items[i].style.transform = `translateX(${-120 * stt}px) scale(${1 - 0.2 * stt}) perspective(16px) rotateY(1deg)`;
    items[i].style.zIndex = -stt;
    items[i].style.filter = 'blur(5px)';
    items[i].style.opacity = stt > 2 ? 0 : 0.6;
  }
}
loadShow();
let bnext = document.getElementById('b-next');
let bprev = document.getElementById('b-prev');
bnext.onclick = function () {
  active = active + 1 < items.length ? active + 1 : active;
  loadShow();
}
bprev.onclick = function () {
  active = active - 1 >= 0 ? active - 1 : active;
  loadShow();
}


// Add click event listeners for all five images
document.getElementById('branch1').addEventListener('click', function () {
  window.location.href = 'branch1.html';
});

document.getElementById('branch2').addEventListener('click', function () {
  window.location.href = 'branch2.html';
});

document.getElementById('branch3').addEventListener('click', function () {
  window.location.href = 'branch3.html';
});

document.getElementById('branch4').addEventListener('click', function () {
  window.location.href = 'branch4.html';
});

document.getElementById('branch5').addEventListener('click', function () {
  window.location.href = 'branch5.html';
});


/**
 * BRANCHES MENU
 */
// Define an array of menu items with their details
// const menuItems = [
//   { name: 'Greek Salad', image: './assets/images/menu-1.png', price: '$25.50', description: 'Tomatoes, green bell pepper, sliced cucumber onion, olives, and feta cheese.', badge: 'Seasonal' },
//   { name: 'Lasagne', image: './assets/images/menu-2.png', price: '$40.00', description: 'Vegetables, cheeses, ground meats, tomato sauce, seasonings and spices.' },
//   { name: 'Butternut Pumpkin', image: './assets/images/menu-3.png', price: '$10.00', description: 'Typesetting industry lorem Lorem Ipsum is simply dummy text of the priand.' },
//   { name: 'Tokusen Wagyu', image: './assets/images/menu-4.png', price: '$39.00', description: 'Vegetables, cheeses, ground meats, tomato sauce, seasonings and spices.', badge: 'New' },
//   { name: 'Olivas Rellenas', image: './assets/images/menu-5.png', price: '$25.00', description: 'Avocados with crab meat, red onion, crab salad stuffed red bell pepper and green bell pepper.' },
//   { name: 'Opu Fish', image: './assets/images/menu-6.png', price: '$49.00', description: 'Vegetables, cheeses, ground meats, tomato sauce, seasonings and spices' }
// ];

// Get the menuList element
// const menuList = document.getElementById('menuList');

// Loop through the menuItems array and dynamically generate HTML for each menu item
// menuItems.forEach(item => {
//   const listItem = document.createElement('li');
//   listItem.innerHTML = `
//             <div class="menu-card hover:card">
//                 <figure class="card-banner img-holder" style="--width: 100; --height: 100;">
//                     <img src="${item.image}" width="100" height="100" loading="lazy" alt="${item.name}" class="img-cover">
//                 </figure>
//                 <div>
//                     <div class="title-wrapper">
//                         <h3 class="title-3">
//                             <a href="#" class="card-title">${item.name}</a>
//                         </h3>
//                         ${item.badge ? `<span class="badge label-1">${item.badge}</span>` : ''}
//                         <span class="span title-2">${item.price}</span>
//                     </div>
//                     <p class="card-text label-1">${item.description}</p>
//                 </div>
//             </div>
//         `;
//   menuList.appendChild(listItem);
// });



