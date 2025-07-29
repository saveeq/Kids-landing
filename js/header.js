function handleStickyHeader(scrollThreshold = 145, headerSelector = ".header", toggleClass = "is-sticky") {
    const header = document.querySelector(headerSelector);
    if (!header) {
        console.error(`Element with selector "${headerSelector}" not found.`);
        return;
    }

    window.addEventListener("scroll", () => {
        const currentScroll = window.scrollY;
        if (currentScroll > scrollThreshold) {
            header.classList.add(toggleClass);
        } else {
            header.classList.remove(toggleClass);
        }
    });

}
handleStickyHeader();

function blackColor(navSelector = ".nav-list-item-link") {
    const vhThreshold = 100;
    const navItems = document.querySelectorAll(navSelector);
    const number = document.querySelector('.header__number');
    const headbtn = document.querySelector('.feedbackButton');
    const header = document.querySelector('.header');
    window.addEventListener("scroll", () => {
        const vh = window.innerHeight / 100;
        const scrollPositionVH = window.scrollY / vh;
        navItems.forEach(nav => {
            if (scrollPositionVH > vhThreshold) {
                header.classList.add('morewhite')
                headbtn.classList.add('scrolled-hbtn')
                nav.classList.add('blackNavColor');
                number.classList.add('blackNavColor');
            } else {
                header.classList.remove('morewhite')
                headbtn.classList.remove('scrolled-hbtn')
                nav.classList.remove('blackNavColor');
                number.classList.remove('blackNavColor');
            }
        });
    });
}

blackColor();

function changeImageOnScroll(
    imgSelector = ".logo__dentservice",  // селектор изображения
    scrollThreshold = 100,         // порог прокрутки для смены изображения
    newImageSrc = "../assets/images/logodentservice2.svg"   // новый src изображения
) {
    const imgElement = document.querySelector(imgSelector);
    const originalSrc = imgElement.src; // сохраняем исходный src

    window.addEventListener("scroll", () => {
        const vh = window.innerHeight / 100;
        const scrollPositionVH = window.scrollY / vh;

        if (scrollPositionVH > scrollThreshold) {
            imgElement.src = newImageSrc; // меняем на новое изображение
        } else {
            imgElement.src = originalSrc; // возвращаем исходное
        }
    });
}


changeImageOnScroll();