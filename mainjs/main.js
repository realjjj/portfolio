$(document).ready(function() {
    // 1. 전시 섹션
    let exhibitData = [
        {
            imgSrc: '../mainimages/exhibit_01.jpg',
            title: '해양생물다양성', 
            summary: '이화여자대학교 자연사박물관은 올해 개관 55주년을 맞이하여 "해양생물다양성"' +
                '기획전을 준비했습니다.그동안 축적된 해양생물다양성 관련 소장 표본과 연구자료를' +
                '학생및 일반 대중과 공유하는  기회를 갖고자 합니다. "해양생물다양성" 전시를 관람' +
                '하시고, 해양생물의 다양한삶에 대한 이해를 통해 많은 관심과 사랑이 싹트길 바랍니다.',
            date: '2023년 12월 21일부터',
            open: '월요일부터 토요일 10~16시',
            close: '토요일(1, 2, 7, 8월), 일요일, 공휴일',
            view: '에약 단체는 홈페이지에서 예약 후 방문, 개인은 예약없이 관람 가능',
            pay: '무료',
        },
        {
            imgSrc: '../mainimages/exhibit_01.jpg',
            title: '생물의 이동', 
            summary: '생물이 이동하는 이유, 동물의 다양한 이동 방법, 생물의 이동이 우리 인류와 어떤' +
                '관계에 있는 지에 대한 내용을 패널, 표본, 영상 등으로 전시했습니다. 특히 왕개미, 왕지네, ' +
                '달팽이, 두꺼비, 유혈목이, 열목어, 은어, 제비, 황오리, 두루미, 관박쥐, 청서, 순록 등의 ' +
                '이동과 생활에 대한 생태 영상을 제작하여 전시했습니다.',
            date: '2022년 9월 1일부터',
            open: '월요일부터 토요일 10~16시',
            close: '토요일(1, 2, 7, 8월), 일요일, 공휴일',
            view: '에약 단체는 홈페이지에서 예약 후 방문, 개인은 예약없이 관람 가능',
            pay: '무료',
        },
    ];

    let exhibitPanel = $('.exhibit>ul');

    exhibitData.forEach((data, dataIdx) => { // li붙여넣기
        let content = 
            '<li>' +
                '<div class="exhibit_text_shape">' +
                    '<dl>' +
                        '<dt>'+ data.title +'</dt>' +
                        '<dd>' + data.summary +'</dd>' +
                    '</dl>' +
                    '<ul>' +
                        '<li># <span class="text_highlight">전시일</span>' + data.date + '</li>' +
                        '<li># <span class="text_highlight">개관</span>' + data.open + '</li>' +
                        '<li># <span class="text_highlight">휴관</span>' + data.close + '</li>' +
                        '<li># <span class="text_highlight">관람</span>' + data.view + '</li>' +
                        '<li># <span class="text_highlight">관람료</span>' + data.pay + '</li>' +
                    '</ul>' +
                '</div>' +
            '</li>';
        
            
        $(exhibitPanel).append(content);
        $('>li:eq('+ (dataIdx) +')', exhibitPanel).css('background', 'url(./mainimages/exhibit_0'+ (dataIdx+1) +'.jpg)');
    });

    // prev&next
    let prevNext = $('.exhibit .prev_next');
    let exhibitCnt = 0;
    
    $('a', prevNext).click(function(e) {
        e.preventDefault();
        // 타겟확인
        if($(e.currentTarget).hasClass('prev')) {
            exhibitCnt--;

            $(exhibitPanel).css('transform', 'translateX(' + 2000 * exhibitCnt + 'px)');
        }else if($(e.currentTarget).hasClass('next')) {
            exhibitCnt++;

            $(exhibitPanel).css('transform', 'translateX(' + -2000 * exhibitCnt + 'px)');
        }

        // 이펙트
        if(exhibitCnt == 0) { // 리스트 처음에 도달하면
            $('.prev', prevNext).css('display', 'none');
        } else $('.prev', prevNext).css('display', 'block');
        
        if(exhibitCnt == $('>li', exhibitPanel).size()-1) { // 리스트 끝에 도달하면
            $('.next', prevNext).css('display', 'none');
        } else $('.next', prevNext).css('display', 'block');
    });

	let swiperEdu = new Swiper('.education .swiper-container', {
		slidesPerView: 'auto',  // 단수
		spaceBetween: 20,  // 단사이 여백
		navigation: {    //이전/다음 버튼
			nextEl: '.swiper-button-next',
			prevEl: '.swiper-button-prev',
		},
		loop: true,  // 무한 loop
		// centeredSlides: true, // 센터 슬라이드 위치(만약 단수가 2개이면 양쪽은 반반씩 보임)
	});
});