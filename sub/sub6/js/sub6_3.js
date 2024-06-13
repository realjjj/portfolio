let xhr = new XMLHttpRequest();

let getData = (ctgr) => {
    xhr.onload = () => {
        if(xhr.status === 200) { // If server status was ok
            let responseObject = JSON.parse(xhr.responseText);
            let newContent = '';
            let newArr = [];

            // console.log(ctgr);

            if(ctgr == '전체') {
                newArr = responseObject.data;
            } else {
                newArr = responseObject.data.filter(thisObj => thisObj.ctgr.includes(ctgr));
            }

            // console.log(newArr);

            newContent += '<ul>';
    
            newArr.forEach(data => {
                newContent += '<li>';
                newContent += '<a class="q trigger" href="#">';
                newContent += `<span>${data.ctgr}</span>`;
                newContent += `<span>${data.q}</span>`;
                newContent += '<span><i class="fa-solid fa-chevron-down"></i></span>';
                newContent += '</a>';
                newContent += '<div class="a">';
    
                data.a.forEach(sentence => {
                    newContent += `<p>${sentence}</p>`;
                });
    
                newContent += '</div>';
                newContent += '</li>';
            });
    
            newContent += '</ul>';
            document.querySelector('.faq').innerHTML = newContent;
        }
    };

    xhr.open('GET', './data/faq.json', true); // 요청을 준비한다.
    xhr.send(null); // 요청을 전송한다
};

getData('전체');

window.addEventListener('load', e => {
    // let tabs = document.querySelectorAll('.tab');
    // tabs.forEach((tab, tabIndex) => {
    //     tab.addEventListener('click', e => {
    //         e.preventDefault();

    //         tabListSwitch(tabs, tabIndex);

    //         getData(tabIndex, e.currentTarget.innerText);
    //     });
    // });

    $('.tab').click(function(e) {
        e.preventDefault();

        $('.tab').removeClass('current');
        $(this).addClass('current');

        getData($(this).text());
    });

    $(document).on('click', '.trigger', function (e) {
        e.preventDefault();
    
        $(this).parent().toggleClass('show');
    
        if($(this).parent().hasClass('show')) { // 열릴때
            $(this).next().slideDown('fast').clearQueue();
            $('i', this).css('rotate', '180deg');
        } else { // 닫힐때
            $(this).next().slideUp('fast').clearQueue();
            $('i', this).css('rotate', '0deg');
        }
    });
});