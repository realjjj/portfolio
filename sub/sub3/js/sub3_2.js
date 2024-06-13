let startingPoint = 926;
let cnt = 0;

window.addEventListener('load', () => {
    // 926 => contents에 닿는 높이
    let sideMenu = document.getElementsByClassName('vertical_tab')[0];
    let cornerList = document.getElementsByClassName('corner_list')[0];
    let moveScrollBtnAll = sideMenu.querySelectorAll('a');
    let scrollSectionHeight = [];
    
    // 로드시 각 섹션의 높이값(이벤트의 flag가 됨)을 저장
    cornerList.querySelectorAll('li').forEach((section, sectionIdx) => {
        scrollSectionHeight[sectionIdx] = startingPoint + section.offsetTop;
    });

    // 새로고침 했을 때도 스크롤 감지하기 위해 별도의 함수로 뺌
    let scrollEffect = () => {
        let scY = Math.floor(window.scrollY); // 스크롤값 정수로 끊음.
        let eachMenu = sideMenu.querySelectorAll('li');

        // 탭버튼 좌측에 고정하는 기능
        if(scY < (startingPoint-50)) { // 50은 위에 공간
            sideMenu.style.position = 'relative';
            sideMenu.style.top = '0';
            sideMenu.style.bottom = 'auto';
        }
        // fixed 끝나는 지점 => 시작점+리스트의 길이-탭메뉴의 길이-(여유공간있으면 그거까지, 여기서는 50)
        else if(scY >= (startingPoint-50) && 
                scY <= (startingPoint + cornerList.scrollHeight - sideMenu.clientHeight - 50)) {
                // sideMenu은 scrollHeight로 하면 before, after에 사용한 35px가 포함돼서 나옴.
            sideMenu.style.position = 'fixed';
            sideMenu.style.top = '234px';
            sideMenu.style.bottom = 'auto';
        } else {
            sideMenu.style.position = 'absolute';
            sideMenu.style.top = 'auto';
            sideMenu.style.bottom = '200px';
        }

        // 메뉴 하이라이팅
        if(scY >= scrollSectionHeight[cnt]) {
            // console.log('cnt=' + cnt);

            if(cnt < eachMenu.length) {
                eachMenu[cnt].classList.add('current_corner');
                if(cnt != 0) eachMenu[cnt-1].classList.remove('current_corner');

                cnt++;
            }
        } else if(scY < (scrollSectionHeight[cnt-2] + 100)) { // 100은 상단 패딩값. 끝까지 도달하지 않아도 spy되게
            cnt--;
            eachMenu[cnt].classList.remove('current_corner');
            eachMenu[cnt-1].classList.add('current_corner');
        }

        // console.log(scY);
    }

    scrollEffect(); // 새로고침시에도 스크롤 이벤트 상황 유지

    // 버튼 클릭시 스크롤 이동
    // offsetTop => 직계 부모 기준으로 자식의 거리를 측정하는건데 position relative되어있는
    // 제일가까운 부모를 기준으로 잡음.
    moveScrollBtnAll.forEach((scrollBtn, scrollBtnIdx) => {
        scrollBtn.addEventListener('click', (e) => {
            e.preventDefault();
            
            window.scrollTo({
                left: 0,
                top: scrollSectionHeight[scrollBtnIdx],
                behavior: "smooth",
            });
        })
    });

    window.addEventListener('scroll' , () => {
        scrollEffect(); // 스크롤시 이벤트
    });
});