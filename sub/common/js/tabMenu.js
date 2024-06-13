let tabListSwitch = (tabs, switchingIndex) => {
    let listAll = document.querySelectorAll('.tab_content');

    // console.log(tabs, switchingIndex);

    tabs.forEach((tab, tabIndex) => {
        if(tabIndex == switchingIndex) {
            tab.classList.add('current');
        } else {
            tab.classList.remove('current');
        }
    });

    listAll.forEach((list, listIndex) => {
        if(listIndex == switchingIndex) {
            list.style.display = 'block'
        } else {
            list.style.display = 'none'
        }
    });
};