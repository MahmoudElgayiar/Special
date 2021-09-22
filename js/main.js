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
(function () {
    let menuItems = document.querySelectorAll(".menuItems");
    menuItems.forEach((item) => {
        item.onclick = function () {
            removeActive(".links .active");
            this.classList.add("active");
        };
    });
})();
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
