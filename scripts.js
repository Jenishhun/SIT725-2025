document.addEventListener("DOMContentLoaded", function () {
    const button = document.getElementById("changeTextButton");

    button.addEventListener("click", function () {
        document.querySelector("p").textContent = "You clicked the button!";
    });
});
