window.addEventListener("scroll", (e) => {
    let obj = document.getElementsByClassName("title_bg")[0];

    if(window.scrollY>=200) {
        obj.style.transform = "scaleX(8) scaleY(40)";
    }else {
        obj.style.transform = "scale(1)";
    }
});