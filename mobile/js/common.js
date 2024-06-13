window.addEventListener('load', loadE => {
	let headerSwitchPoint = document.querySelector('.visual').scrollHeight - 80;
	let header = document.getElementById('headerArea');

	// 헤더 activle toggle & top버튼 이미지 교체
	window.addEventListener('scroll', scrollE => {
		if(window.scrollY >= headerSwitchPoint) {
			header.classList.add('active');
			document.getElementById('top').style.opacity = '1';
		} else {
			header.classList.remove('active');
			document.getElementById('top').style.opacity = '0';
		}

		if(window.scrollY == 0) {
			document.getElementById('top').classList.remove('top_on');
			document.getElementById('top').classList.add('top_off');
		}
	});

	// 탑 버튼
	document.getElementById('top').addEventListener('click', clickE => {
		clickE.preventDefault();

		document.getElementById('top').classList.remove('top_ff');
		document.getElementById('top').classList.add('top_on');

		window.scrollTo({
			left: 0,
			top: 0,
			behavior: 'smooth'
		});
	});
});

// 패밀리 사이트 여닫기
$('.family .arrow').toggle(function(){
	$('.family .aList').slideDown('fast');	
	$(this).children('span').html('<i class="fa-solid fa-chevron-up"></i>');	
},function(){
	$('.family .aList').slideUp('fast');	
	$(this).children('span').html('<i class="fa-solid fa-chevron-down"></i>');	
});