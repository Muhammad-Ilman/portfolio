const header = document.querySelector("header");

const first_skill = document.querySelector(".skill:first-child");
const sk_counters = document.querySelectorAll(".counter span");

const progress_bars = document.querySelectorAll(".skills svg circle");
const ml_section = document.querySelector(".milestones");
const ml_counters = document.querySelectorAll(".number span");

const prt_section = document.querySelector(".portfolio");
const zoom_icons = document.querySelectorAll(".zoom-icon");
const modal_overlay = document.querySelector(".modal-overlay");
const images = document.querySelectorAll(".images img");
const prev_btn = document.querySelector(".prev-btn");
const next_btn = document.querySelector(".next-btn");


let mlPlayed = false;

window.addEventListener("scroll", () => {
  if (!skilsPlayed) skillsCounter();
  if (!mlPlayed) mlCounter();
});

// SKILLS
function hasReached(el) {
  let topPosition = el.getBoundingClientRect().top;
  if (window.innerHeight >= topPosition + el.offsetHeight)
    return true;
  return false;
}

function updateCounter(num, maxNum) {
  let curentNum = +num.innerText;

  if (curentNum < maxNum) {
    num.innerText = curentNum + 1;
    setTimeout(() => {
      updateCounter(num, maxNum);
    }, 12);
  }
  // console.log(curentNum);
}

let skilsPlayed = false;

function skillsCounter() {
  if (!hasReached(first_skill))
    return;
  // console.log(`Hello you scroll the skill`);
  let skilsPlayed = true;

  sk_counters.forEach((counter, i) => {
    let target = +counter.dataset.target;
    let strokeValue = 427 - 427 * (target / 100);

    progress_bars[i].style.setProperty("--target", strokeValue);

    setTimeout(() => {
      updateCounter(counter, target);
    }, 400);

    // console.log(typeof  target, strokeValue, progress_bars);
  });

  progress_bars.forEach(p => p.style.animation = "progress 2s ease-in-out forwards");
}

// sticky navbar
function stickyNavbar() {
  // console.log(window.scrollY > 0)
  header.classList.toggle("scrolled", window.scrollY > 0);
}
stickyNavbar();
window.addEventListener("scroll", stickyNavbar);


if (!header) {
  alert("tag header not found")
}

// services

function mlCounter() {
  if (!hasReached(ml_section)) return;

  let mlPlayed = true;

  ml_counters.forEach(ctr => {
    let target = +ctr.dataset.target;

    console.log(ctr)

    setTimeout(() => {
      updateCounter(ctr, target)
    }, 400);
  });
}

// modal
let currentIndex = 0;

zoom_icons.forEach((icn, i) =>
  icn.addEventListener("click", () => {
    prt_section.classList.add("open");
    document.body.classList.add("stopScrolling");
    currentIndex = i;
    changeImage(currentIndex);
  }));

modal_overlay.addEventListener("click", () => {
  prt_section.classList.remove("open");
  document.body.classList.remove("stopScrolling");
});

prev_btn.addEventListener("click", () => {
  if (currentIndex === 0) {
    currentIndex = 5;
  } else {
    currentIndex--;
  }
  changeImage(currentIndex);
})

next_btn.addEventListener("click", () => {
  if (currentIndex === 5) {
    currentIndex = 0;
  } else {
    currentIndex++;
  }
  changeImage(currentIndex);
})

function changeImage(index) {
  images.forEach(img => img.classList.remove("showImage"));
  images[index].classList.add("showImage");
}

// filter animation
let mixer = mixitup(".portfolio-gallery", {
  selectors: {
    target: ".prt-card",
  },
  animation: {
    duration: 500,
  }
});


let sr = ScrollReveal({
  duration: 2500,
  distance: "60px",
});

sr.reveal(".showcase-info", {
  delay: 600
});
sr.reveal(".showcase-image", {
  origin: "top",
  delay: 700
});

// swiper
const swiper = new Swiper(".swiper", {
  loop: true,
  speed: 500,
  autoplay: true,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  }
});