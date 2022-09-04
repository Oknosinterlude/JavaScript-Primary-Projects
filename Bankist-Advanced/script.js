"use strict";

///////////////////////////////////////
// Selecting elements
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");

const header = document.querySelector(".header");
const nav = document.querySelector(".nav");
const linksNav = document.querySelector(".nav__links");
const linkNav = document.querySelector(".nav__link");
const logoNav = document.querySelector(".nav__logo");

const section1 = document.querySelector("#section--1");
const sections = document.querySelectorAll(".section");
const imgsFeatures = document.querySelectorAll(".features__img");

const opTabContainer = document.querySelector(".operations__tab-container");
const opContents = document.querySelectorAll(".operations__content");
const slides = document.querySelectorAll(".slide");
const dots = document.querySelector(".dots");

const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnScrollTo = document.querySelector(".btn--scroll-to");
const btnOpTabs = document.querySelectorAll(".operations__tab");
const btnSlideLeft = document.querySelector(".slider__btn--left");
const btnSlideRight = document.querySelector(".slider__btn--right");

///////////////////////////////////////
// Modal window
const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((btnOpenModal) =>
  btnOpenModal.addEventListener("click", openModal)
);

btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

///////////////////////////////////////
// Scrolling
btnScrollTo.addEventListener("click", function (e) {
  section1.scrollIntoView({ behavior: "smooth" });
});
// const s1coords = section1.getBoundingClientRect();
// btnScrollTo.addEventListener("click", function (e) {
//   window.scrollTo({
//     left: s1coords.left + window.pageXOffset,
//     top: s1coords.top + window.pageYOffset,
//     behavior: "smooth",
//   });
// });

linksNav.addEventListener("click", function (e) {
  e.preventDefault();
  if (!e.target.classList.contains("nav__link")) return;
  const id = e.target.getAttribute("href");
  document.querySelector(id).scrollIntoView({ behavior: "smooth" });
});

///////////////////////////////////////
// Cookie message
// const header = document.querySelector(".header");
// const message = document.createElement("div");
// message.classList.add("cookie--message");
// message.innerHTML =
//   'We use cookie for improved functionality and analytics.<button class="btn btn--close--cookie">Got it!</button>';
// header.append(message);

// message.style.backgroundColor = "#37383d";
// message.style.color = "#eee";
// message.style.width = "100%";
// message.style.height =
//   Number.parseFloat(getComputedStyle(message).height) + 30 + "px";

///////////////////////////////////////
// Tabs
opTabContainer.addEventListener("click", function (e) {
  const clicked = e.target.closest(".operations__tab");
  if (!clicked) return;

  btnOpTabs.forEach((el) => el.classList.remove("operations__tab--active"));
  clicked.classList.add("operations__tab--active");

  opContents.forEach((el) =>
    el.classList.remove("operations__content--active")
  );
  document
    .querySelector(`.operations__content--${clicked.dataset.tab}`)
    .classList.add("operations__content--active");
});

///////////////////////////////////////
// Menu fade animation
function handleHover(e) {
  const hovered = e.target;
  const siblings = hovered.closest(".nav").querySelectorAll(".nav__link");
  if (!hovered.classList.contains("nav__link")) return;
  siblings.forEach((el) => {
    if (el !== hovered) el.style.opacity = this;
  });
  logoNav.style.opacity = this;
}

linksNav.addEventListener("mouseover", handleHover.bind(0.5));
linksNav.addEventListener("mouseout", handleHover.bind(1));

///////////////////////////////////////
// Sticky navigation
// const s1coords = section1.getBoundingClientRect();
// window.addEventListener("scroll", function () {
//   if (window.scrollY > s1coords.top) {
//     nav.classList.add("sticky");
//   } else nav.classList.remove("sticky");
// });
const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  if (entry.isIntersecting) {
    nav.classList.remove("sticky");
  } else nav.classList.add("sticky");
};

const observerOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const headerObserver = new IntersectionObserver(stickyNav, observerOptions);
headerObserver.observe(header);

///////////////////////////////////////
// Reveal section
const revealSection = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

sections.forEach(function (section) {
  section.classList.add("section--hidden");
  sectionObserver.observe(section);
});

///////////////////////////////////////
// Lazy loading image
const lazyLoading = function (entries, observer) {
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", function (e) {
    e.target.classList.remove("lazy-img");
  });
  observer.unobserve(entry.target);
};

const imgsObserver = new IntersectionObserver(lazyLoading, {
  root: null,
  threshold: 0,
  rootMargin: "200px",
});

imgsFeatures.forEach((imgFeature) => imgsObserver.observe(imgFeature));

///////////////////////////////////////
// Slider
// const slider = document.querySelector(".slider");
// slider.style.transform = "scale(0.5)";
let currSlide = 0;

const goToSlide = function (currSlide) {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${(i - currSlide) * 100}%)`;
  });
};

const createDots = function () {
  slides.forEach((_, i) =>
    dots.insertAdjacentHTML(
      "beforeend",
      `<button class= "dots__dot" data-slide="${i}"></button>`
    )
  );
};

const activateDot = function (currSlide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((el) => el.classList.remove("dots__dot--active"));

  document
    .querySelector(`.dots__dot[data-slide="${currSlide}"]`)
    .classList.add("dots__dot--active");
};

const init = function () {
  goToSlide(0);
  createDots();
  activateDot(0);
};
init();

const nextSlide = function () {
  currSlide++;
  if (currSlide === slides.length) currSlide = 0;
  goToSlide(currSlide);
  activateDot(currSlide);
};

const previousSlide = function () {
  currSlide--;
  if (currSlide === -1) currSlide = slides.length - 1;
  goToSlide(currSlide);
  activateDot(currSlide);
};

btnSlideRight.addEventListener("click", nextSlide);
btnSlideLeft.addEventListener("click", previousSlide);

dots.addEventListener("click", function (e) {
  if (!e.target.classList.contains("dots__dot")) return;
  currSlide = e.target.dataset.slide;
  goToSlide(currSlide);
  activateDot(currSlide);
});

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") nextSlide();
  if (e.key === "ArrowLeft") previousSlide();
});
