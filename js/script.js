const header = document.querySelector("header")

// sticky navbar
const stickyNavbar = () => {
  // console.log(window.scrollY > 0)
  header.classList.toggle("scrolled", window.scrollY > 0)
}
stickyNavbar();
window.addEventListener("scroll", stickyNavbar);


if(!header) {alert("tag header not found")}