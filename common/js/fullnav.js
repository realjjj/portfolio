/*
    [참고1]
    기존에 css()로 수정하는 #333, #fff등 이벤트의 연쇄 반응으로
    작용하는 스타일들은 모두 클래스로 정의해서 add, remove하고 있다.
    *추가한 클래스 - 개인 스타일마다 다를듯
    // 배경
    #headerArea.header_active {background: #fff; box-shadow: 0 0 5px rgba(0,0,0,.4);}
    // 색 바뀌어야되는 a태그 부분
    #headerArea.header_active .header_bottom a{color: #333;}
    // 바뀔 로고
    #headerArea.header_active .logo a{background: url(../images/logo_on.png);}
    // 1depth 메뉴 색깔 바꾸기
    #headerArea.header_active .menu:hover .depth1{color: #11a691;}
    // 2depth 호버될 때 색깔 바꾸기
    #headerArea.header_active .menu ul a:hover{color: #11a691;}
    *실제로 add되는건 headerArea에 header_active클래스 뿐이다.
*/

$(document).ready(function() {
    let cursorOn = false; // false(마우스 leave), true(마우스 enter)
    let focusOn = false; // 포커스 가질때는 마우스 떠나도 헤더가 on
    let visH = $('.visual').height(); // 비주얼의 높이를 리턴한다.
    let headerMinH = $('#headerArea').height(); // 원래 헤더 높이
    // 늘어난 헤더 높이.
    // 38 => 2depth의 a태그 높이
    // 20 => 아래 여유공간
    // 명시적으로 표시하려고 나눠놓음
    let headerMaxH = headerMinH + (38*4) + 20;

    // 1. 마우스 올렸을 때
    // *화살표 함수는 this 없음 그래서 function() 으로
    $('.header_bottom').mouseenter(function() {
        $('#headerArea').addClass('header_active'); // 상단 설명글1 참고
        cursorOn = true;
    });

    // 1-1. 2depth메뉴 여닫기
    $('ul.dropdownmenu').hover(
        function() { // hover on == mouseenter
            // 백그라운드 늘려주기
            /*
                Q:
                애니메이션이 removeclass할 땐 안 먹어서 #headerArea에 css로 transition주는 걸로 변경
                할려고 했는데 css 주고 아래 주석으로 주니까 겁나 호버했을때
                헤더 망가짐. 왜???
                >> 테스트 해보니까 이러나 저러나 겁나 호버하다보면 ul태그는
                display block이 돼 있음. 그냥 headerArea에 overflow hidden이
                생겨서 안보이는 거 뿐임. 근데 이 hidden은 어디서 온 거?
                >> https://m.blog.naver.com/nsh2398/221279547462
                제이쿼리 버전이 오래돼서 라는 거 같음. 콜백함수 추가하면 된다고 하는데..
                굳이 필요는 없을 거 같음.
                >> 호버했을때 ul에 display block안사라지는 건 해결 안됨.
                일단 fadeIn자체가 0~1을 보여주는거라서 호버 막 하다보면
                망가지는 거 같음. fadeIn도 clearQueue가 안돼서 쌓이다보니까
                display block이 유지되고 오파시티도 망가지는듯.
                그렇다고 clearQueue를 하면 opacity0이 되기전에 중단하다보니까
                오파시티가 이상해짐.
            */
            $('#headerArea').animate({height: headerMaxH}, 'fast').clearQueue();
            // $('#headerArea').css('height', headerMaxH);
            // 아래코드 주석 풀어보고 hover 미친듯이 하면 display block남아있음
            // $('li.menu ul' ,this).fadeIn('normal', function(){$(this).stop();}); // 모든 서브가 열림
            // 위에서 밑에처럼 수정하면 display block은 사라지는데 opacity가 망가짐. 바로바로 중단해서 그런거같음.
            // $('li.menu ul' ,this).fadeIn('normal').clearQueue();
            // 그냥 밑에처럼 show로 하는게 미친듯이 hover해도 문제가 없음..
            $('li.menu ul' ,this).show();
        },
        function() { // hover off == mouseleave
            if(!focusOn) {
                $('#headerArea').animate({height: headerMinH}, 'fast').clearQueue();
                // $('#headerArea').css('height', headerMinH);
                $('li.menu ul' ,this).hide(); // 모든 서브가 닫힘
            }
    });

    // 2. 마우스 떠났을 때
    $('.header_bottom').mouseleave(function() {
        let scrollPos = $(window).scrollTop(); // 스크롤바의 수직 위치를 리턴하는 함수

        // 헤더가 원래 상태로 돌아갈 때는 비주얼을 넘지 않았을 때만
        // 탭키로 인식돼 있는 상태면 마우스 떠나도 클래스 해제 안됨
        if(scrollPos < (visH-headerMinH) && !focusOn) {
            // setTimeout(function() { // setTimeout으로 딜레이 안주면 헤더 두개 겹쳐보임
                $('#headerArea').removeClass('header_active');
            // }, 200);
        }

        cursorOn = false;
    });

    // 3. 스크롤 움직일 때
    $(window).scroll(function() {
        let scrollPos = $(window).scrollTop(); // 스크롤바의 수직 위치를 리턴하는 함수

        // 스크롤 할 때 헤더가 비주얼을 넘어서는 순간에 조건 걸림
        if(scrollPos > (visH-headerMinH)) {
            $('#headerArea').addClass('header_active');
        } else { // 스크롤 할 때 헤더의 위치가 비주얼 높이보다 낮을때. 즉 원래 상태.
            if(!cursorOn && !focusOn) { // cursorOn:flase => 마우스가 올라가있지 않을때만
                // 스크롤의 위치가 비주얼보다 낮아져도 마우스가 올라가 있다면 해당 조건은 발동하지 않음.
                $('#headerArea').removeClass('header_active');
            }
        }
    });

    // 4. 탭키로 포커스 받을 때
    $('ul.dropdownmenu li.menu .depth1').focus(function() {
        focusOn = true;

        $('#headerArea').addClass('header_active');
        $('#headerArea').animate({height: headerMaxH}, 'fast').clearQueue();
        $('ul.dropdownmenu li.menu ul').slideDown('normal');
    });

    // 4-1. 포커스 잃을 때
    $('ul.dropdownmenu li.m6 li:last').find('a').blur(function() {
        // focusOn = !focusOn;

        $('ul.dropdownmenu li.menu ul').slideUp('fast');
        $('#headerArea').animate({height: headerMinH}, 'fast').clearQueue();
        $('#headerArea').removeClass('header_active');
    })

    // 4-2. 포커스 받고 나서 다른 곳 클릭했을 떄(포커스 잃을떄)
    $('html').click(function(e) {
        if($(e.target).parents('.header_bottom').length || $(e.target).hasClass('header_bottom')) { // headerbottom 자식이라면
            console.log('헤더 열려있어야 함');
        } else {
            if(focusOn) { // 헤더가 열려있는 상태라면
                console.log('헤더 닫혀라!');
                focusOn = false;
                $('li.menu ul' ,this).hide(); // 모든 서브가 닫힘
                $('#headerArea').animate({height: headerMinH}, 'fast').clearQueue();
                
                if($(window).scrollTop() < (visH-headerMinH)) {
                    $('#headerArea').removeClass('header_active');
                }
            }
        }
    });

    // 5. 현재 페이지에 해당하는 메뉴 글자 하이라이팅
    var getPath = window.location.href.split('/'); // 현재 url을 '/'기준으로 자름
    var getSplitIdx = getPath[getPath.length-1].indexOf('_') // 자른 패스에서 숫자를 뽑아낼 기준인 언더바의 인덱스 값을 반환한다.
    var depth1Num = getPath[getPath.length-1].charAt(getSplitIdx-1); // 언더바 앞에 ex)sub"1"_2 글자 반환
    var depth2Num = getPath[getPath.length-1].charAt(getSplitIdx+1); // 언더바 뒤에 ex)sub1_"2" 글자 반환
    var thisMenu = $('.depth1')[depth1Num-1]; // depth1 클래스를 가진 요소들 중 첫번째(인덱스라-1)요소 반환
    var thisMenu2 = $(thisMenu).parent().next().find('a')[depth2Num-1]; // 찾아놓은 depth1에서 부모(h3)의 다음(ul) 자식중 a를 찾고 현재num요소를 가져옴.

    $(thisMenu).css('color', '#11a691'); // 1depth 글자색
    $(thisMenu2).css('color', '#11a691'); // 2depth 글자색
});