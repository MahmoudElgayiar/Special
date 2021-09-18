// Check Site Color on LocalStorage
if (localStorage.getItem("Site-Color") != null) {
    document.documentElement.style.setProperty(
        "--main-color",
        localStorage.getItem("Site-Color")
    );
    let listOfColors = document.querySelectorAll(".colors li");
    listOfColors.forEach((element) => {
        if (
            element.getAttribute("data-color") ==
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
let landingPage = document.querySelector(".landing-page");
let backgrounds = ["01.jpg", "02.jpg", "03.jpg", "04.jpg"];
landingPage.style.backgroundImage = 'url("images/01.jpg")';
setInterval(() => {
    let randomNumber = Math.floor(Math.random() * backgrounds.length);
    landingPage.style.backgroundImage =
        'url("images/' + backgrounds[randomNumber] + '")';
}, 3000);
// End Change Background

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
