window.addEventListener('load', loadE => {
	let buttonList = document.querySelector('.button_list');
	let characterList = document.querySelector('.character_list');
	let btnCount = 1;
	let section2T = document.getElementById('section1').offsetTop;
	let enterOn = false;

	// section1 #section0 start
	let introCurrentToggleFunc = (direction) => {
		characterList.querySelectorAll('li').forEach(eachLi => {
			eachLi.classList.remove('current');
		});
		
		if(direction == 'left') {
			buttonList.querySelector('.left').classList.add('on');
			setTimeout(() => {
				buttonList.querySelector('.left').classList.remove('on');
			}, 200);

			if(btnCount == 0){
				characterList.querySelectorAll('li')[2].classList.add('current');
				btnCount = 2;
			} else {
				characterList.querySelectorAll('li')[btnCount-1].classList.add('current');
				btnCount -= 1;
			}
		} else if(direction == 'right') {
			buttonList.querySelector('.right').classList.add('on');
			setTimeout(() => {
				buttonList.querySelector('.right').classList.remove('on');
			}, 200);

			if(btnCount == 2){
				characterList.querySelectorAll('li')[0].classList.add('current');
				btnCount = 0;
			} else {
				characterList.querySelectorAll('li')[btnCount+1].classList.add('current');
				btnCount += 1;
			}
		}
	}

	let introSelectFunc = () => {
		buttonList.querySelector('.choose').classList.add('on');
	
		setTimeout(() => {
			buttonList.querySelector('.choose').classList.remove('on');
		}, 200);

		if(btnCount == 1) { // 예진이면
			document.querySelector('.select_modal').innerHTML = `
				<div class="select_modal_inner">
					<p>나를 선택해준거야?♥♥♥</p>
					<p>고마워!</p>
					<p>함께 모험을 떠나보자!</p>
					<p class="btn_area"><a href="#secondPage" class="next">Next &gt;</a></p>
				</div>
			`;
		} else { // 엑스트라면
			document.querySelector('.select_modal').innerHTML = `
				<div class="select_modal_inner">
					<p>네 동료는 다른사람이</p>
					<p>더 좋겠어...</p>
					<p class="btn_area"><a href="#" class="close">Close</a></p>
				</div>
			`;
		}

		document.querySelector('.select_modal').style.display = 'flex';
	}
	
	// 클릭할 경우
	buttonList.querySelectorAll('a').forEach(btn => {
		btn.addEventListener('click', clickE => {
			clickE.preventDefault();
			
			// 섹션1에 버튼리스트
			if(clickE.currentTarget.classList.contains('choose')){ // 선택버튼
				introSelectFunc();
			} else { // left || right 버튼
				if(clickE.currentTarget.classList.contains('left')) {
					introCurrentToggleFunc('left');
				} else if(clickE.currentTarget.classList.contains('right')) {
					introCurrentToggleFunc('right');
				}
				
			}
		});
	});

	// modal => next버튼
	document.querySelector('.select_modal').addEventListener('click', clickE => {
		if(clickE.target.classList.contains('close')) {
			clickE.preventDefault();
		}
		if(clickE.target.classList.contains('close') || clickE.target.classList.contains('next')) {
			document.querySelector('.select_modal').style.display = 'none';
		} else {
			return false;
		}
	});

	// <- , -> 키 입력할 경우
	document.addEventListener('keydown', keyE => {
		if(location.href.split('/')[4] == '#firstPage' || location.href.split('/')[4] == '') {
			// console.log(keyE.key);
	
			if(keyE.key == 'ArrowLeft') { // left
				introCurrentToggleFunc('left');
			}
			if(keyE.key == 'ArrowRight') { // right
				introCurrentToggleFunc('right');
			}
			if(keyE.key == 'Enter' || keyE.key == 'Escape') {
				if(!enterOn) {
					if(keyE.key == 'Enter') {
						introSelectFunc();
					}
					enterOn = true;
				} else {
					document.querySelector('.select_modal a').click(); // 강제클릭
					enterOn = false;
				}
			}
		} else return false;
	});
	// section1 #section0 end
});