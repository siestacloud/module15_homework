// задание 1 раздел 15.2
function initBtn() {
    // поиск элементов в DOM
    let btn = document.querySelector(".btn");
    let btnIcon = document.querySelector(".btn__icon-first");
    let btnIconClick = document.querySelector(".btn__icon-second");

    btn.addEventListener("click", () => {
        btnIcon.classList.toggle("j-show")
        btnIconClick.classList.toggle("j-show")
    })
}