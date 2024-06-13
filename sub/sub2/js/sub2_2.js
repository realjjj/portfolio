window.addEventListener('load', e => {
    let tabs = document.querySelectorAll('.tab');

    tabs.forEach((tab, tabIndex) => {
        tab.addEventListener('click', e => {
            e.preventDefault();

            tabListSwitch(tabs, tabIndex);
        });
    });
});