window.addEventListener('load', loadE => {
	let buttonList = document.querySelector('.button_list');
	let characterList = document.querySelector('.character_list');
	let btnCount = 1;

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

	// 클릭할 경우
	buttonList.querySelectorAll('a').forEach(btn => {
		btn.addEventListener('click', clickE => {
			clickE.preventDefault();
			
			// btn.classList.add('on');

			// setTimeout(() => {
			// 	btn.classList.remove('on');
			// }, 200);

			// 섹션1에 버튼리스트
			if(clickE.currentTarget.classList.contains('choose')){ // 선택버튼

			} else { // left || right 버튼
				if(clickE.currentTarget.classList.contains('left')) {
					introCurrentToggleFunc('left');
				} else if(clickE.currentTarget.classList.contains('right')) {
					introCurrentToggleFunc('right');
				}
				
			}
		});
	});

	// <- , -> 키 입력할 경우
	document.addEventListener('keydown', keyE => {
		// console.log(keyE.key);

		if(keyE.key == 'ArrowLeft') { // left
			introCurrentToggleFunc('left');
		} else if(keyE.key == 'ArrowRight') { // right
			introCurrentToggleFunc('right');
		}
	});
	// section1 #section0 end
});