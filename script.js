window.addEventListener("scroll", () => {
    const header = document.querySelector(".sticky");
    if(window.scrollY > 20){
        header.style.boxShadow = "0 4px 15px rgba(0,0,0,0.2)";
        header.style.background = "#111";
    } else {
        header.style.boxShadow = "none";
        header.style.background = "transparent";
    }
});

const navLinks = document.querySelectorAll("a[href^='#']");
navLinks.forEach(link => {
    link.addEventListener("click", function(e){
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if(target){
            target.scrollIntoView({ behavior: "smooth" });
        }
    });
});

const cards = document.querySelectorAll(".card");
const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
        if(entry.isIntersecting){
            entry.target.classList.add("show");
        }
    });
}, { threshold: 0.2 });
cards.forEach(card => observer.observe(card));

const buttons = document.querySelectorAll("button");
buttons.forEach(btn => {
    btn.addEventListener("mouseenter", () => {
        btn.style.transform = "scale(1.05)";
    });
    btn.addEventListener("mouseleave", () => {
        btn.style.transform = "scale(1)";
    });
});

const yearText = document.querySelector(".fbottom p");
const currentYear = new Date().getFullYear();
yearText.innerHTML = © ${currentYear} Ambo University Clubs Portal. All rights reserved.;

const searchInput = document.querySelector("#searchClub");
if(searchInput){
    searchInput.addEventListener("keyup", () => {
        let filter = searchInput.value.toLowerCase();
        document.querySelectorAll(".card").forEach(card => {
            let text = card.innerText.toLowerCase();
            card.style.display = text.includes(filter) ? "block" : "none";
        });
    });
}

const menuBtn = document.querySelector("#menu-btn");
const menu = document.querySelector(".but");
if(menuBtn){
    menuBtn.addEventListener("click", () => {
        menu.classList.toggle("active");
    });
}

const counter = document.querySelector(".stat h1");
let count = 0;
function updateCounter(){
    if(count < 50){
        count++;
        counter.innerText = count + "+";
        setTimeout(updateCounter, 30);
    }
}
window.addEventListener("load", updateCounter);

const darkBtn = document.querySelector("#dark-mode");
if(darkBtn){
    darkBtn.addEventListener("click", () => {
        document.body.classList.toggle("dark");
    });
}