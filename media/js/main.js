let xhr1 = new XMLHttpRequest();
let xhr2 = new XMLHttpRequest();

window.addEventListener('load', loadE => {
	let snow = document.getElementById('snowObj');
	let startP = Math.trunc((document.querySelector('.videoBox').clientHeight / 3) * 1);
	let transX = 100;
	let transY = 200;
	let transXFlag = true;
	let transYFlag = true;
	let scaleFlag = true;
	let deviceHeight = window.innerHeight;
	let deviceWidth = window.innerWidth;
	let prevScroll = 0;
	let multi = 1.02;
	let deg = 0;
	// masonry
	let grid = document.querySelector('.grid');

	// faq - json
	xhr2.onload = () => {
		if(xhr2.status === 200) {
			let responseObject = JSON.parse(xhr2.responseText);
			let newContent = '';

			newContent += `
				<div class="show_a">
					<dl>
						<dt>${responseObject.data[0].q}</dt>
						<dd>${responseObject.data[0].a}</dd>
					</dl>
				</div>
				<div class="swiper-container">
					<ul class="swiper-wrapper">
			`;

			responseObject.data.forEach((obj, idx) => {
				newContent += `
					<li class="swiper-slide slide_${idx} ${idx == 0 ? 'current' : 'x_current'}">
						<a href="#" class="q_box q_${idx}"></a>
						<div class="slide_cube">
							<div class="slide_cube_face slide_cube_front">
								<p class="qq_${idx}">
									<span>${obj.q}</span>
								</p>
								<p class="a_box a_${idx}">
									${obj.a}
								</p>
							</div>
							<div class="slide_cube_face slide_cube_right">
								<img src="./images/main/faq/${idx + 1}.jpg" width="100%">
								<p>
									<span>${obj.q}</span>
								</p>
							</div>
						</div>
					</li>
				`;
			});

			newContent += `
					</ul>
				</div>
			`;

			document.querySelector('.faq_area .faq_content').innerHTML = newContent;

			let swiper = new Swiper('.swiper-container' , {
				autoHeight: false,
				slidesPerView: 'auto',
				spaceBetween: 20,
				observer: true,
  				observeParents: true,
			});
		}
	}
	xhr2.open('GET', './data/faq.json', true); // 요청을 준비한다.
	xhr2.send(null); // 요청을 전송한다

	// faq q 교체
	let faq = document.querySelector('.faq_content');
	
	faq.addEventListener('click', clickE => {
		clickE.preventDefault();
		
		if(clickE.target.classList.contains('q_box')) {
			let answerBox = document.querySelector('.show_a');
			let thisNum = clickE.target.classList[1].split('_')[1]; // q의 인덱스

			answerBox.querySelector('dt').textContent = document.querySelector(`.qq_${thisNum}`).textContent;
			answerBox.querySelector('dd').textContent = document.querySelector(`.a_${thisNum}`).textContent;

			// current 교체
			if(faq.querySelector(`.slide_${thisNum}`).classList.contains('x_current')) {
				// 기존 current 제거
				for(let i=0; i<faq.querySelectorAll('.swiper-slide').length; i++) {
					if(faq.querySelectorAll('.swiper-slide')[i].classList.contains('current')) {
						faq.querySelectorAll('.swiper-slide')[i].classList.replace('current', 'x_current');

						break; // 절약
					}
				}

				// current 교체
				faq.querySelector(`.slide_${thisNum}`).classList.replace('x_current', 'current');
			}
		}
	});

	// stay - json
	xhr1.onload = () => {
		if(xhr1.status === 200) { // If server status was ok
			let responseObject = JSON.parse(xhr1.responseText);
			let newContent = '';

			responseObject.data.forEach(obj => {
				newContent += `
					<li class="grid-item">
						<div>
							<p>${obj.type}</p>
							<img src="${obj.images[0]}" alt="" width="100%">
							<p>${obj.name}</p>
						</div>
					</li>
				`;
			});

			document.querySelector('.masonry .grid').innerHTML += newContent;
			let msnry = new Masonry(grid, {
				itemSelector: '.grid-item',
				columnWidth: '.grid-sizer',
				percentPosition: true
			});
		
			imagesLoaded( grid ).on( 'progress', function() {
				// layout Masonry after each image loads
				msnry.layout();
			});
		}
	}
	xhr1.open('GET', './data/stay.json', true); // 요청을 준비한다.
	xhr1.send(null); // 요청을 전송한다

	window.addEventListener('scroll', scrollE => {
		// 투명도
		if(window.scrollY >= startP) {
			snow.classList.add('on');
			
			// sacle
			if(scaleFlag) {
				snow.style.scale = multi;
				multi += 0.02;

				if(snow.style.scale >= 3) scaleFlag = false;
			} else {
				snow.style.scale = multi;
				multi -= 0.02;

				if(snow.style.scale <= 1) scaleFlag = true;
			}

			// rotate
			snow.style.transform = `rotate(${deg}deg)`;
			deg++;
		} else {
			snow.classList.remove('on');
		}

		if(window.scrollY >= (document.body.clientHeight - deviceHeight)) { // 스크롤 끝에 닿으면
			snow.style.opacity = 0;
		}

		// translateX
		if(transXFlag) { // 오 > 왼 방향
			snow.style.right = `${transX += 15}px`;

			// 디바이스 넓이 -100 만큼만 왼쪽으로
			if(parseInt(snow.style.right) >= (deviceWidth - 100)) transXFlag = false;
		} else { // 왼 > 오 방향
			snow.style.right = `${transX -= 15}px`;

			if(parseInt(snow.style.right) <= 100) transXFlag = true;
		}

		// translateY
		if(transYFlag) {
			snow.style.top = `${transY += 1}px`;
			
			if(window.scrollY < prevScroll) transYFlag = false;
		} else {
			snow.style.top = `${transY -= 1}px`;
			
			if(window.scrollY > prevScroll) transYFlag = true;
		}

		prevScroll = window.scrollY;
	});

	// section3 - season
	let track1 = document.getElementById('seasonTrack1');
	let track2 = document.getElementById('seasonTrack2');
	let addTrans1 = 0;
	let addTrans2 = 0;
	let cloneEl1 = track1.querySelector('ul').cloneNode(true);
	let cloneEl2 = track2.querySelector('ul').cloneNode(true);
	let count1 = 1;
	let count2 = 1;
	
	cloneEl1.style.left = `2520px`;
	cloneEl2.style.left = `-2160px`;
	track1.querySelector('.train').appendChild(cloneEl1);
	track2.querySelector('.train').appendChild(cloneEl2);

	let transMove1 = () => {
		addTrans1-=15;
		track1.querySelector('.train').style.transform = `translateX(${addTrans1}px)`;

		if(addTrans1 <= -(2520 * count1)) {
			// 순서 변경을 위해 첫번째 ul제거 한 뒤 appendChild
			let thisEl = track1.querySelector('.train').querySelectorAll('ul')[0];
			thisEl.remove();
			track1.querySelector('.train').appendChild(thisEl);
			track1.querySelector('.train').querySelectorAll('ul')[1].style.left = `${2520 * (count1+1)}px`;

			count1++;
		}
	}

	let transMove2 = () => {
		addTrans2+=15;
		track2.querySelector('.train').style.transform = `translateX(${addTrans2}px)`;

		if(addTrans2 >= (2160 * count2)) {
			// 순서 변경을 위해 첫번째 ul제거 한 뒤 appendChild
			let thisEl = track2.querySelector('.train').querySelectorAll('ul')[0];
			thisEl.remove();
			track2.querySelector('.train').appendChild(thisEl);
			track2.querySelector('.train').querySelectorAll('ul')[1].style.left = `${-2160 * (count2+1)}px`;

			count2++;
		}
	}



	let thisInterval1 = setInterval(transMove1, 100);
	let thisInterval2 = setInterval(transMove2, 100);

	// 마우스 enter시 trans 중지
	document.querySelectorAll('.track ul').forEach(eachT => {
		eachT.addEventListener('mouseenter', mouseE => {
			if(mouseE.target.parentNode.parentNode.id == 'seasonTrack1') {
				clearInterval(thisInterval1);
			} else if(mouseE.target.parentNode.parentNode.id == 'seasonTrack2') {
				clearInterval(thisInterval2);
			}
		});
	});

	// 마우스 leave시 재생
	document.querySelectorAll('.track ul').forEach(eachT => {
		eachT.addEventListener('mouseleave', mouseE => {
			if(mouseE.target.parentNode.parentNode.id == 'seasonTrack1') {
				thisInterval1 = setInterval(transMove1, 100);
			} else if(mouseE.target.parentNode.parentNode.id == 'seasonTrack2') {
				thisInterval2 = setInterval(transMove2, 100);
			}
		});
	});
});