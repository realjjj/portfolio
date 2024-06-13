window.addEventListener('load', loadE => {
	let tabBtn = document.querySelectorAll('.tab_btn');

	tabBtn.forEach((btn, idx) => {
		btn.addEventListener('click', clickE => {
			clickE.preventDefault();

			// 버튼 current toggle
			// 탭 컨텐츠 toggle
			for(let i=0; i<tabBtn.length; i++) {
				if(i == idx) {
					tabBtn[i].classList.add('current');
					document.querySelector(`.tab_content${i + 1}`).style.display = 'block';
					getTabContent(i);
				} else {
					tabBtn[i].classList.remove('current');
					document.querySelector(`.tab_content${i + 1}`).style.display = 'none';
				}
			}
		});
	});
});