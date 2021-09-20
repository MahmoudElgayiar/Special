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

// let landingPage = document.querySelector(".landing-page");
// let backgrounds = ["01.jpg", "02.jpg", "03.jpg", "04.jpg"];
// landingPage.style.backgroundImage = 'url("images/01.jpg")';
// setInterval(() => {
//     let randomNumber = Math.floor(Math.random() * backgrounds.length);
//     landingPage.style.backgroundImage =
//         'url("images/' + backgrounds[randomNumber] + '")';
// }, 3000);
let IsRandom = true;
let BackgroundInterval;
let BgButtons = document.querySelectorAll(".start-stop span");
let landingPage = document.querySelector(".landing-page");
let backgrounds = ["01.jpg", "02.jpg", "03.jpg", "04.jpg"];

document.querySelector(".landing-page").style.backgroundImage =
    'url("images/01.jpg")';

BgButtons.forEach((element) => {
    // let isactive = document.querySelectorAll(".start-stop .active");
    // if (isactive) {
    //     isactive.forEach((element) => {
    //         element.classList.remove("active");
    //     });
    // }
    if (localStorage.getItem("background-random") !== null) {
        if (localStorage.getItem("background-random") == "true") {
            document
                .querySelector(".start-stop .start")
                .classList.add("active");
            IsRandom = true;
            RandomizeBacground();
        } else {
            document.querySelector(".start-stop .stop").classList.add("active");
            IsRandom = false;
            clearInterval(BackgroundInterval);
        }
    } // else if (IsRandom) {
    //     document.querySelector(".start-stop .start").classList.add("active");
    //     RandomizeBacground();
    // }
});

// Loop On background Start Stop Keys
BgButtons.forEach((element) => {
    element.onclick = function () {
        let isactive = document.querySelectorAll(".start-stop .active");
        if (isactive) {
            isactive.forEach((element) => {
                element.classList.remove("active");
            });
        }
        this.classList.add("active");

        if (this.getAttribute("data-background") == "start") {
            IsRandom = true;
            RandomizeBacground();
            localStorage.setItem("background-random", "true");
        } else if (this.getAttribute("data-background") == "stop") {
            IsRandom = false;
            clearInterval(BackgroundInterval);
            localStorage.setItem("background-random", "false");
        }
    };
});

function RandomizeBacground() {
    if (IsRandom === true) {
        BackgroundInterval = setInterval(() => {
            let randomNumber = Math.floor(Math.random() * backgrounds.length);
            landingPage.style.backgroundImage =
                'url("images/' + backgrounds[randomNumber] + '")';
        }, 1000);
    }
}

// End Change Backgrounds
// Start Menu Active Class
(function () {
    let menuItems = document.querySelectorAll(".menuItems");
    menuItems.forEach((item) => {
        item.onclick = function () {
            let isactive = document.querySelectorAll(".links .active");
            if (isactive) {
                isactive.forEach((element) => {
                    element.classList.remove("active");
                });
            }
            this.classList.add("active");
        };
    });
})();
// End Menu Active Class

// Start Change Main Site Color

let listOfColors = document.querySelectorAll(".colors li");
listOfColors.forEach((color) => {
    color.onclick = function () {
        let isactive = document.querySelectorAll(".colors .active");
        if (isactive) {
            isactive.forEach((element) => {
                element.classList.remove("active");
            });
        }
        this.classList.add("active");
        // console.log(this.getAttribute("data-color"));
        document.documentElement.style.setProperty(
            "--main-color",
            this.getAttribute("data-color")
        );
        localStorage.setItem("Site-Color", this.getAttribute("data-color"));
    };
});

// End Change Main Site Color
