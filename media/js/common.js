window.addEventListener('load', loadE => {
	let gnbColose = document.querySelector('.gnb_close');
	let gnbOpen = document.querySelector('.gnb_open');
	let gnb = document.getElementById('gnb');
	let top = document.querySelector('.top');
	let visualH = document.querySelector('.videoBox').clientHeight;
	let screenHeight = 0;
	let header = document.getElementById('headerArea');

	// gnb
	gnbOpen.addEventListener('click', clickE => {
		gnb.classList.add('on');
	});

	gnbColose.addEventListener('click', clickE => {
		clickE.preventDefault();

		gnb.classList.remove('on');
	});

	// top button
	top.addEventListener('click', clickE => {
		clickE.preventDefault();

		window.scrollTo({
			top: 0,
			behavior: 'smooth'
		});
	});

	// 리사이징 할 때 기준점 다시잡아주기
	window.addEventListener('resize', resizeE => {
		visualH = document.querySelector('.videoBox').clientHeight;
	});

	// top button & gnb show/hide
	window.addEventListener('scroll', scrollE => {
		if(window.scrollY >= visualH){
			top.style.opacity = 1;
			header.style.background = 'rgba(0,0,0,.9)';
			header.style.borderBottom = '1px solid rgba(277,0,15,.5)';
		}
		else{
			top.style.opacity = 0;
			header.style.background = 'rgba(0,0,0,.3)';
			header.style.borderBottom = '1px solid transparent';
		}
	});

	// scroll down
	document.querySelector('.down').addEventListener('click', clickE => {
		clickE.preventDefault();

		screenHeight = window.innerHeight;
		window.scrollTo({
			top: screenHeight,
			behavior: 'smooth'
		});
	});
});