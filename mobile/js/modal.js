window.addEventListener('load', loadE => {
	let openModal = document.querySelectorAll('.open_modal');
	let closeModal = document.querySelector('.close_modal');
	let modal = document.querySelector('.body_modal');
	let modalInner = document.querySelector('.body_modal_inner');

	let modalToggle = (push = window.location.href) => {
		window.history.pushState(null, "", push);

		if(modal.classList.contains('active')) {
			modal.classList.remove('active');
			document.body.style.overflow = 'auto';
		} else {
			modalInner.scrollTo({
				left: 0,
				top: 0,
			});
			modal.classList.add('active');
			document.body.style.overflow = 'hidden';
		}
	}

	let popFunc = () => {
		history.go(1);
		modalToggle();
	}
	
	// 모달열기
	document.querySelectorAll('.modal_click_area').forEach(el => {
		el.addEventListener('click', clickE => {
			clickE.preventDefault();

			if(clickE.target.classList.contains('open_modal')) {
				let modalIdx = Number(clickE.target.classList[1].split('_')[1]); // modal_01

				modalToggle();
				window.addEventListener('popstate', popFunc, {once: true});
				getModalContent(modalIdx);
			}
		});
	});

	// 모달닫기
	closeModal.addEventListener('click', clickE => {
		clickE.preventDefault();

		modalToggle(history.go(-1));

		window.removeEventListener('popstate', popFunc);
	});
});