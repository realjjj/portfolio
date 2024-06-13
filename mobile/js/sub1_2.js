window.addEventListener('load', loadE => {
	let historyAll = document.querySelector('.history_all');
	let historyQuickMenu = document.getElementById('historyQuickMenu');
	let startPoint = historyAll.offsetTop - 80;
	let stopPoint = startPoint + historyAll.clientHeight - historyQuickMenu.clientHeight;
	let currentCount = 0;
	let currentList = document.getElementById('historyList').querySelectorAll('li');
	
	let a1Section = startPoint + document.querySelector(`.a1`).offsetTop -1;
	let a2Section = startPoint + document.querySelector(`.a2`).offsetTop -1;
	let a3Section = startPoint + document.querySelector(`.a3`).offsetTop -1;
	let a4Section = startPoint + document.querySelector(`.a4`).offsetTop -1;

	document.addEventListener('scroll', scrollE => {
		// console.log(window.scrollY);
		// console.log(historyAll.scrollHeight);

		if(window.scrollY < (startPoint - 20)) {
			historyQuickMenu.style.position = 'absolute';
			historyQuickMenu.style.top = '0';
			historyQuickMenu.style.bottom = 'auto';
		}
		else if(window.scrollY < stopPoint - 20) {
			historyQuickMenu.style.position = 'fixed';
			historyQuickMenu.style.top = '100px';
			historyQuickMenu.style.bottom = 'auto';
		} else {
			historyQuickMenu.style.position = 'absolute';
			historyQuickMenu.style.top = 'auto';
			historyQuickMenu.style.bottom = '0';
		}

		// 히스토리 리스트 스크롤 스파이
		while(window.scrollY > (startPoint + currentList[currentCount].offsetTop) 
            && window.scrollY < (startPoint + currentList[currentList.length-1].offsetTop)) {
            // console.log('while문 호출');

            currentCount++;
        }

        if(currentCount > 0) {
            // console.log(hasClassObj);
            if(window.scrollY >= (startPoint + currentList[currentCount-1].offsetTop)) {
                // console.log('증가');
                currentList[currentCount-1].classList.remove('history_current'); // 어딘가에 있는 history_current클래스 제거
                currentList[currentCount].classList.add('history_current'); // current history에 클래스 더하기
            } else if(window.scrollY < (startPoint + currentList[currentCount-1].offsetTop)) {
                // console.log('감소');
                currentList[currentCount].classList.remove('history_current'); // 어딘가에 있는 history_current클래스 제거
                currentList[currentCount-1].classList.add('history_current');
                currentCount--; // 이것도 사실 스크롤 속도가 빠르면 카운트가 못따라옴
            }
        }

		// 히스토리 퀵 메뉴 스크롤 스파이
		if(window.scrollY >= 0 && window.scrollY < a2Section) {
			historyQuickMenu.querySelectorAll('a')[0].classList.add('current');
			historyQuickMenu.querySelectorAll('a')[1].classList.remove('current');
			historyQuickMenu.querySelectorAll('a')[2].classList.remove('current');
			historyQuickMenu.querySelectorAll('a')[3].classList.remove('current');
		} else if(window.scrollY >= a2Section && window.scrollY < a3Section) {
			historyQuickMenu.querySelectorAll('a')[0].classList.remove('current');
			historyQuickMenu.querySelectorAll('a')[1].classList.add('current');
			historyQuickMenu.querySelectorAll('a')[2].classList.remove('current');
			historyQuickMenu.querySelectorAll('a')[3].classList.remove('current');
		} else if(window.scrollY >= a3Section && window.scrollY < a4Section) {
			historyQuickMenu.querySelectorAll('a')[0].classList.remove('current');
			historyQuickMenu.querySelectorAll('a')[1].classList.remove('current');
			historyQuickMenu.querySelectorAll('a')[2].classList.add('current');
			historyQuickMenu.querySelectorAll('a')[3].classList.remove('current');
		} else { // a4
			historyQuickMenu.querySelectorAll('a')[0].classList.remove('current');
			historyQuickMenu.querySelectorAll('a')[1].classList.remove('current');
			historyQuickMenu.querySelectorAll('a')[2].classList.remove('current');
			historyQuickMenu.querySelectorAll('a')[3].classList.add('current');
		}

	});

	historyQuickMenu.querySelectorAll('a').forEach((eachA, idx) => {
		eachA.addEventListener('click', clickE => {
			clickE.preventDefault();

			let scrollSwitch = document.querySelector(`.a${idx + 1}`).offsetTop + startPoint;

			window.scrollTo({
				left: 0,
				top: (scrollSwitch - 1),
				behavior: 'smooth'
			});
		});
	});
});