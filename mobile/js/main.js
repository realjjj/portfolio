window.addEventListener('load', loadE => {
	let content1Data = [
		`지각을 구성하고 있는 광물·암석·화석과 국내외 각지에 서식하고 있는 동물과 
		식물 등을 채집, 연구, 보존하고 자연사관련 학교 교육과 사회 교육에 이바지하기 
		위하여 설립되었습니다.`,
		`1969년 국내 <span>최초</span>로 자연사 박물관을 설립했습니다.`,
		`국내 <span>최고</span> 수준의 전시를 자랑합니다.`,
		`자연과 함께하는 <span>흥미</span>로운 교육들을 지원하고 있습니다.`,
		`20만종이 넘는 <span>다양</span>한 표본을 보유하고 있습니다.`
	]
	let aAll = document.querySelectorAll('.content1_a_area a');
	let contentArea = document.querySelector('.content1_txt');

	aAll.forEach((el, index) => {
		el.addEventListener('click', clickE => {
			clickE.preventDefault();

			for(let i=0; i<aAll.length; i++) {
				if(i == index) {
					aAll[i].classList.add('current');
				} else {
					aAll[i].classList.remove('current');
				}
			}

			contentArea.innerHTML = content1Data[index];
		});
	});

	let imgThumb = document.querySelectorAll('.content4_img_thumbnail');
	let imgArea = document.querySelector('.content4 .img_area img');
	let txtArea = document.querySelector('.content4 .img_area p');

	imgThumb.forEach((img, idx) => {
		img.addEventListener('click', clickE => {
			clickE.preventDefault();

			// console.log(clickE.currentTarget);
			
			imgArea.src = `./images/content4/specimen_0${idx+1}.jpg`;
			txtArea.textContent = `# ${clickE.currentTarget.querySelector('p').textContent}`;
		});
	});

	let swiperVis = new Swiper('.visual .swiper-container', {
		autoHeight: true, // 높이유동(.swiper-container에 height:auto)
		slidesPerView: 1,  // 단수
		spaceBetween: 0,  // 단사이 여백
		loop: true,  // 무한 loop
		// freeMode: true,  // 터치 만큼 자유롭게 이동
		// centeredSlides: true, // 센터 슬라이드 위치(만약 단수가 2개이면 양쪽은 반반씩 보임)
		// effect: 'fade',   // 페이드효과(단수가 1단이 된다)
		// effect: 'flip',  // 3D 회전효과(단수가 1단이 된다)
		// initialSlide: 0; // 초기 슬라이드 인덱스 0부터 시작
		// navigation: {    //이전/다음 버튼
		//   nextEl: '.swiper-button-next',
		//   prevEl: '.swiper-button-prev',
		// },
		pagination: {   //페이지 네이션
			el: '.swiper-pagination',
			// dynamicBullets: true,
			clickable: true,
			// type: 'fraction' // 현재/총개수 (페이지네이션블릿은 사라진다)
		},
		autoplay: {  //자동
			delay: 3000,
			disableOnInteraction: false
		},
		// scrollbar: {  //하단 스크롤바
		// 	el: '.swiper-scrollbar',
		// 	hide: false,
		// }
	});

	let swiper3 = new Swiper('.content3 .swiper-container', {
		autoHeight: true, // 높이유동(.swiper-container에 height:auto)
		slidesPerView: 'auto',  // 단수
		spaceBetween: 20,  // 단사이 여백
		// loop: true,  // 무한 loop
		// freeMode: true,  // 터치 만큼 자유롭게 이동
		centeredSlides: true, // 센터 슬라이드 위치(만약 단수가 2개이면 양쪽은 반반씩 보임)
		// effect: 'fade',   // 페이드효과(단수가 1단이 된다)
		// effect: 'flip',  // 3D 회전효과(단수가 1단이 된다)
		// initialSlide: 0; // 초기 슬라이드 인덱스 0부터 시작
		navigation: {    //이전/다음 버튼
		  nextEl: '.swiper-button-next',
		  prevEl: '.swiper-button-prev',
		},
		// pagination: {   //페이지 네이션
		// 	el: '.swiper-pagination',
		// 	// dynamicBullets: true,
		// 	clickable: true,
		// 	// type: 'fraction' // 현재/총개수 (페이지네이션블릿은 사라진다)
		// },
		// autoplay: {  //자동
		// 	delay: 3000,
		// 	disableOnInteraction: false
		// },
		// scrollbar: {  //하단 스크롤바
		// 	el: '.swiper-scrollbar',
		// 	hide: false,
		// }
	});

	let swiper4 = new Swiper('.content4 .swiper-container', {
		autoHeight: true, // 높이유동(.swiper-container에 height:auto)
		slidesPerView: 'auto',  // 단수
		spaceBetween: 10,  // 단사이 여백
		// loop: true,  // 무한 loop
		// freeMode: true,  // 터치 만큼 자유롭게 이동
		// centeredSlides: true, // 센터 슬라이드 위치(만약 단수가 2개이면 양쪽은 반반씩 보임)
		// effect: 'fade',   // 페이드효과(단수가 1단이 된다)
		// effect: 'flip',  // 3D 회전효과(단수가 1단이 된다)
		// initialSlide: 0; // 초기 슬라이드 인덱스 0부터 시작
		// navigation: {    //이전/다음 버튼
		//   nextEl: '.swiper-button-next',
		//   prevEl: '.swiper-button-prev',
		// },
		// pagination: {   //페이지 네이션
		// 	el: '.swiper-pagination',
		// 	// dynamicBullets: true,
		// 	clickable: true,
		// 	// type: 'fraction' // 현재/총개수 (페이지네이션블릿은 사라진다)
		// },
		// autoplay: {  //자동
		// 	delay: 3000,
		// 	disableOnInteraction: false
		// },
		// scrollbar: {  //하단 스크롤바
		// 	el: '.swiper-scrollbar',
		// 	hide: false,
		// }
	});

	let swiper5 = new Swiper('.content5 .swiper-container', {
		autoHeight: true, // 높이유동(.swiper-container에 height:auto)
		slidesPerView: 'auto',  // 단수
		spaceBetween: 10,  // 단사이 여백
		loop: true,  // 무한 loop
		// freeMode: true,  // 터치 만큼 자유롭게 이동
		centeredSlides: true, // 센터 슬라이드 위치(만약 단수가 2개이면 양쪽은 반반씩 보임)
		// effect: 'fade',   // 페이드효과(단수가 1단이 된다)
		// effect: 'flip',  // 3D 회전효과(단수가 1단이 된다)
		// initialSlide: 0; // 초기 슬라이드 인덱스 0부터 시작
		// navigation: {    //이전/다음 버튼
		//   nextEl: '.swiper-button-next',
		//   prevEl: '.swiper-button-prev',
		// },
		pagination: {   //페이지 네이션
			el: '.swiper-pagination',
			// dynamicBullets: true,
			clickable: true,
			type: 'fraction' // 현재/총개수 (페이지네이션블릿은 사라진다)
		},
		// autoplay: {  //자동
		// 	delay: 3000,
		// 	disableOnInteraction: false
		// },
		// scrollbar: {  //하단 스크롤바
		// 	el: '.swiper-scrollbar',
		// 	hide: false,
		// }
	});
});