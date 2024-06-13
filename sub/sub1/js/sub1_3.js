let imgChangeValue = 700;
let thisSC = window.scrollY;

window.addEventListener('load', e => {
    let header = document.getElementById('headerArea');
    let tabMenu = document.querySelector('.list_tab_area');
    let tabAll = document.querySelectorAll('.tab');
    let tabMenuOriginTop = tabMenu.offsetTop;
    let historyAll = document.getElementById('historyList');
    let imgList = document.querySelector('.history_image_section');
    let currentContent = document.querySelectorAll('.tab_content')[0];
    let currentList = currentContent.querySelectorAll('li');
    let listStartValue = historyAll.offsetTop - tabMenu.clientHeight;
    let currentCount = 0;
    
    // window.scrollBy({ top: -1, behavior: 'smooth' });
    window.scrollTo({ top: 0 });

    // >> 탭 클릭 이벤트
    tabAll.forEach((tab, tabIndex) => {
        tab.addEventListener("click", (e) => {
            // console.log('click 이벤트');

            e.preventDefault();

            // 이전 리스트 current 클래스 초기화
            currentList[currentCount].classList.remove('history_current');
            currentList[0].classList.add('history_current');
            
            currentCount = 0;
            
            tabListSwitch(tabAll, tabIndex);
            
            window.scrollTo({
                left: 0,
                top: tabMenuOriginTop,
                behavior: "smooth",
            });
            
            currentContent = document.querySelectorAll('.tab_content')[tabIndex];
            currentList = currentContent.querySelectorAll('li');
        });
    });

    // >> 스크롤 이벤트
    window.addEventListener('scroll', e => {
        // console.log('scroll event');
        let scY = window.scrollY;
        // console.log('현재스크롤: ' + scY);
        let hasClassObj = document.querySelector('.history_current');

        // console.log(hasClassObj);

        // 스크롤 이벤트를 한번만 호출해도(새로고침시) 현재 count를 반영할 수 있도록 while문 사용
        // while문으로 해야 스크롤 빠르게 해도 현재 count가 적용됨.
        while(scY > (listStartValue + currentList[currentCount].offsetTop) 
            && scY < (listStartValue + currentList[currentList.length-1].offsetTop)) {
            // console.log('while문 호출');

            currentCount++;
        }

        if(currentCount > 0) {
            // console.log(hasClassObj);

            if(scY >= (listStartValue + currentList[currentCount-1].offsetTop)) {
                // console.log('증가');
                currentList[currentCount-1].classList.remove('history_current'); // 어딘가에 있는 history_current클래스 제거
                currentList[currentCount].classList.add('history_current'); // current history에 클래스 더하기
            } else if(scY < (listStartValue + currentList[currentCount-1].offsetTop)) {
                // console.log('감소');
                currentList[currentCount].classList.remove('history_current'); // 어딘가에 있는 history_current클래스 제거
                currentList[currentCount-1].classList.add('history_current');
                currentCount--; // 이것도 사실 스크롤 속도가 빠르면 카운트가 못따라옴
            }
        }

        // >> 탭 & 이미지 fixed 고정
        if(scY >= tabMenuOriginTop) {
            // tab메뉴
            tabMenu.classList.add('active');
            header.style.opacity = '0';
            historyAll.style.marginTop = (50 + tabMenu.clientHeight + 'px');

            // 이미지 => 시작 이후 고정
            imgList.style.position = 'fixed';
            imgList.style.top = (50 + tabMenu.clientHeight + 'px');
            
            // 이미지 => 리스트 끝나면 bottom에 고정
            if(scY >= (tabMenuOriginTop + historyAll.clientHeight - 700)) {
                imgList.style.position = 'absolute';
                imgList.style.bottom = '0';
                imgList.style.top = 'auto';
            }
        } else {
            // tab메뉴
            tabMenu.classList.remove('active');
            header.style.opacity = '1';
            historyAll.style.marginTop = '50px';

            // 이미지 => 시작 전에 원래 위치 유지
            imgList.style.position = 'static';
        }

        // >> 구간마다 이미지 교체
        if(scY >= tabMenuOriginTop && scY < (tabMenuOriginTop + imgChangeValue * 1)) {
            imgList.querySelector('ul').style.transform = 'translateY('+ (imgChangeValue * 0) +'px)';
        } else if(scY >= (tabMenuOriginTop + imgChangeValue * 1) && scY < (tabMenuOriginTop + imgChangeValue * 2)) {
            imgList.querySelector('ul').style.transform = 'translateY('+ (imgChangeValue * -1) +'px)';
        } else if(scY >= (tabMenuOriginTop + imgChangeValue * 2) && scY < (tabMenuOriginTop + imgChangeValue * 3)) {
            imgList.querySelector('ul').style.transform = 'translateY('+ (imgChangeValue * -2) +'px)';
        } else if(scY >= (tabMenuOriginTop + imgChangeValue * 3) && scY < (tabMenuOriginTop + imgChangeValue * 4)) {
            imgList.querySelector('ul').style.transform = 'translateY('+ (imgChangeValue * -3) +'px)';
        } else if(scY >= (tabMenuOriginTop + imgChangeValue * 4) && scY < (tabMenuOriginTop + imgChangeValue * 5)) {
            imgList.querySelector('ul').style.transform = 'translateY('+ (imgChangeValue * -4) +'px)';
        } else if(scY >= (tabMenuOriginTop + imgChangeValue * 5) && scY < (tabMenuOriginTop + imgChangeValue * 6)) {
            imgList.querySelector('ul').style.transform = 'translateY('+ (imgChangeValue * -5) +'px)';
        } else if(scY >= (tabMenuOriginTop + imgChangeValue * 6) && scY < (tabMenuOriginTop + imgChangeValue * 7)) {
            imgList.querySelector('ul').style.transform = 'translateY('+ (imgChangeValue * -6) +'px)';
        } else if(scY >= (tabMenuOriginTop + imgChangeValue * 7) && scY < (tabMenuOriginTop + imgChangeValue * 8)) {
            imgList.querySelector('ul').style.transform = 'translateY('+ (imgChangeValue * -7) +'px)';
        } else if(scY >= (tabMenuOriginTop + imgChangeValue * 8) && scY < (tabMenuOriginTop + imgChangeValue * 9)) {
            imgList.querySelector('ul').style.transform = 'translateY('+ (imgChangeValue * -8) +'px)';
        }
    });
});
