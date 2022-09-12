// задание 2 Раздел 15.4
function initAlert() {
    // поиск элементов в DOM
    let btn = document.querySelector(".j-alert");
    btn.addEventListener("click", () => {
        alert(`width: ${window.screen.width}\nheight: ${window.screen.height}`)
    })
}
