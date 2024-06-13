window.addEventListener('load', loadE => {
	let imgList = document.querySelectorAll('.img_list');

	imgList.forEach(el => {
		el.addEventListener('click', clickE => {
			clickE.preventDefault();

			let thisImgExpand = el.previousElementSibling.querySelector('img');

			thisImgExpand.src = clickE.target.parentNode.querySelector('img').src;

			el.querySelectorAll('a').forEach(aEl => {
				aEl.classList.remove('current');
			});

			clickE.target.classList.add('current');
		})
	});
});