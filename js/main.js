// Check Site Color on LocalStorage
if (localStorage.getItem("Site-Color") != null) {
    document.documentElement.style.setProperty(
        "--main-color",
        localStorage.getItem("Site-Color")
    );
    let listOfColors = document.querySelectorAll(".colors li");
    listOfColors.forEach((element) => {
        element.classList.remove("active");
        if (
            element.getAttribute("data-color") ===
            localStorage.getItem("Site-Color")
        ) {
            element.classList.add("active");
        }
    });
}
// Start Settings Box
let settingsBox = document.querySelector(".settings-box");

document.querySelector(".icon .fa-cog").onclick = function () {
    this.classList.toggle("fa-spin");
    settingsBox.classList.toggle("hidden");
};
// End Settings Box
// Start Change Background

let IsRandom = true;
let BackgroundInterval;
let BgButtons = document.querySelectorAll(".start-stop span");
let landingPage = document.querySelector(".landing-page");
let backgrounds = ["01.jpg", "02.jpg", "03.jpg", "04.jpg"];

function removeActive(...elements) {
    let allelements = document.querySelectorAll(elements);
    allelements.forEach((oneelement) => {
        if (document.querySelectorAll(elements)) {
            oneelement.classList.remove("active");
        }
    });
}
function RandomizeBacground() {
    if (IsRandom === true) {
        BackgroundInterval = setInterval(() => {
            let randomNumber = Math.floor(Math.random() * backgrounds.length);
            landingPage.style.backgroundImage =
                'url("images/' + backgrounds[randomNumber] + '")';
        }, 5000);
    }
}
// Check If Local Storage Have Data and load it if exist
if (localStorage.getItem("background-random") !== null) {
    switch (localStorage.getItem("background-random")) {
        case "start":
            removeActive(".start-stop .active");
            document
                .querySelector(".start-stop .start")
                .classList.add("active");
            RandomizeBacground();
            break;
        case "stop":
            landingPage.style.backgroundImage = 'url("images/02.jpg")';
            break;
    }
}

//Loop Over Spans and add click event to start or stop
BgButtons.forEach((span) => {
    span.addEventListener("click", (e) => {
        removeActive(".start-stop .active");
        e.target.classList.add("active");
        if (e.target.dataset.background == "start") {
            RandomizeBacground();
            localStorage.setItem("background-random", "start");
        } else {
            IsRandom = false;
            clearInterval(BackgroundInterval);
            localStorage.setItem("background-random", "stop");
        }
    });
});

// End Change Backgrounds
// Start Menu Active Class

let menuItems = document.querySelectorAll(".menuItems");

menuItems.forEach((item) => {
    item.onclick = function (e) {
        e.preventDefault();
        removeActive(".menuItems.active");
        this.classList.add("active");
        document.querySelector(this.dataset.section).scrollIntoView({
            behavior: "smooth",
        });
    };
});
// End Menu Active Class

// Start Change Main Site Color

let listOfColors = document.querySelectorAll(".colors li");
listOfColors.forEach((color) => {
    color.onclick = function () {
        removeActive(".colors .active");
        this.classList.add("active");
        document.documentElement.style.setProperty(
            "--main-color",
            this.getAttribute("data-color")
        );
        localStorage.setItem("Site-Color", this.getAttribute("data-color"));
    };
});

// End Change Main Site Color

//Start Our Skills

let skills = document.querySelector(".skills");

window.onscroll = function () {
    let skillsOffsetTop = skills.offsetTop;
    let skillsouterheight = skills.offsetHeight;
    let windowHeight = this.innerHeight;
    let windowScrollTop = this.scrollY;
    if (windowScrollTop > skillsOffsetTop + skillsouterheight - windowHeight) {
        let allskills = document.querySelectorAll(
            ".all-skills .skill-box .skill-progress span"
        );
        allskills.forEach((skill) => {
            skill.style.width = skill.dataset.progress;
        });
    }

    //remove active class from bullets on top of site
    if (window.scrollY < document.querySelector(".about-us").offsetTop) {
        removeActive(".bullet.active");
    }
    let Sections = document.querySelectorAll("section");

    Sections.forEach((section) => {
        if (window.scrollY > section.offsetTop) {
            let allBullets = document.querySelectorAll(".bullet");
            allBullets.forEach((bullet) => {
                if (section.offsetTop >= bullet.dataset.offset) {
                    removeActive(".bullet.active");
                    bullet.classList.add("active");
                }
            });
        }
    });
};

//End Our Skills

// Start Our Gallery
let images = document.querySelectorAll(".gallery .images-box img");
let gallery = document.querySelector(".gallery");
images.forEach((image) => {
    image.addEventListener("click", (e) => {
        //Create Overlay
        let popupOverlay = document.createElement("div");
        popupOverlay.className = "popup-overlay";
        gallery.appendChild(popupOverlay);
        // create popup
        let popupbox = document.createElement("div");
        popupbox.className = "popup-box";
        gallery.appendChild(popupbox);
        //Create image
        let popupImage = document.createElement("img");
        popupbox.appendChild(popupImage);
        popupImage.src = image.src;
        //Show Image Title
        if (image.alt !== "") {
            let imageHeading = document.createElement("h2");
            let headingText = document.createTextNode(image.alt);
            imageHeading.appendChild(headingText);
            popupbox.prepend(imageHeading);
        }

        let popupClose = document.createElement("div");
        let closeText = document.createTextNode("X");
        popupClose.className = "popup-Close";
        popupClose.appendChild(closeText);

        popupbox.appendChild(popupClose);
    });
});

//Press X To Close Popup
document.addEventListener("click", (e) => {
    if (e.target.className == "popup-Close") {
        e.target.parentNode.remove();
        document.querySelector(".popup-overlay").remove();
    }

    if (e.target.className == "popup-overlay") {
        document.querySelector(".popup-box").remove();
        document.querySelector(".popup-overlay").remove();
    }
});

//Detect Escape Key Press To Remove PopUp
document.addEventListener("keyup", (e) => {
    if (e.key === "Escape") {
        document.querySelector(".popup-overlay").remove();
        document.querySelector(".popup-box").remove();
    }
});

// End Our Gallery

//Start Bullets System
let allSections = document.querySelectorAll("section");
let bulletsSection = document.querySelector(".bullets");

allSections.forEach((section) => {
    //get section class
    // let sectionClass = section.className;
    sectionHeading = document.querySelector(
        "." + section.className + " h1"
    ).innerHTML;
    let bullet = document.createElement("div");
    bullet.className = "bullet";
    bulletsSection.appendChild(bullet);
    bullet.setAttribute("data-section", "." + section.className);
    bullet.setAttribute("data-offset", section.offsetTop);
    let tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    let tooltipText = document.createTextNode(sectionHeading);
    tooltip.appendChild(tooltipText);
    bullet.appendChild(tooltip);
});

let allBullets = document.querySelectorAll(".bullet");
let allBulletsarray = Array.prototype.slice.call(allBullets);

//ScrollToSection
function scrollToSection(elements) {
    elements.forEach((element) => {
        element.addEventListener("click", (e) => {
            e.preventDefault();
            document.querySelector(e.target.dataset.section).scrollIntoView({
                behavior: "smooth",
            });
            removeActive(".bullet.active");
            element.classList.add("active");
        });
    });
}

scrollToSection(allBulletsarray);

//End Bullets System
