window.addEventListener('load', loadE => {
	// 공통

	// sub1 - about start
	let rectList = document.querySelector('.rect_list');
	let rectListWidth = rectList.clientWidth;
	let prevSize = document.body.clientWidth;

	// 초기값
	rectList.style.borderLeft = `${(document.body.clientWidth - rectListWidth) / 2}px solid #000`;
	rectList.style.borderRight = `${(document.body.clientWidth - rectListWidth) / 2}px solid #000`;

	// 사이즈 조정 할 때마다
	window.addEventListener('resize', resE => {
		console.log('resizing');

		if(prevSize < document.body.clientWidth) {
			console.log('커진다');

			rectListWidth = rectList.clientWidth; // 커질땐 먼저
			
			rectList.style.borderLeft = `${(document.body.clientWidth - rectListWidth) / 2}px solid #000`;
			rectList.style.borderRight = `${(document.body.clientWidth - rectListWidth) / 2}px solid #000`;

		} else {
			console.log('작아진다');
			
			// 반응형 작게 해놓고 처음에 바꾸면 안됨. 그래서 음수값 잡아줌.
			if(document.body.clientWidth - rectListWidth < 0) {
				console.log('음수');
				
				rectList.style.borderLeft = '0px';
				rectList.style.borderRight = '0px';
			}

			rectList.style.borderLeft = `${(document.body.clientWidth - rectListWidth) / 2}px solid #000`;
			rectList.style.borderRight = `${(document.body.clientWidth - rectListWidth) / 2}px solid #000`;

			rectListWidth = rectList.clientWidth; // 작아질 땐 나중에
		}

		prevSize = document.body.clientWidth;
	});
	// sub1 - about end
});