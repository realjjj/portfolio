let xhr = new XMLHttpRequest();

window.addEventListener('load', loadE => {
	let infoArea = document.querySelector('.season_info');
	let actArea = document.querySelector('.season_act');
	let tamMenu = document.querySelectorAll('.season_tabs');

	let setContent = (tabNumber = 0) => {
		xhr.onload = () => {
			if(xhr.status === 200) {
				let newInfo = '';
				let newAct = '';
				let thisObj = JSON.parse(xhr.responseText).data.filter(obj => obj.index == tabNumber)[0];

				// console.log(thisObj.info);

				for(let i=0; i<thisObj.info.length; i++) {
					newInfo += `
						<div>
							<img src="${thisObj.info[i].img}" alt="">
							<dl>
								<dt>${thisObj.info[i].title}</dt>
								<dd>${thisObj.info[i].body}</dd>
							</dl>
						</div>
					`;
				}
				
				infoArea.innerHTML = newInfo;

				newAct += 
					`<div>${thisObj.filter} activities</div>
						<ul>
					`;

				for(let i=0; i<thisObj.activity.length; i++) {
					newAct += `
						<li>
							<img src="${thisObj.activity[i].img}" alt="">
							<div>
								<div>
									<p>Provided by ${thisObj.activity[i].providedBy}</p>
									<p>${thisObj.activity[i].title}</p>
								</div>
								<div>
									Starting from <span>${thisObj.activity[i].price}€</span>
								</div>
							</div>
						</li>
					`;
				}

				newAct += `</ul>`;

				actArea.innerHTML = newAct;
			}
		}
		xhr.open('GET', './data/season.json', true); // 요청을 준비한다.
		xhr.send(null); // 요청을 전송한다
	}

	setContent();

	// 탭메뉴
	tamMenu.forEach(eachTab => {
		eachTab.addEventListener('click', clickE => {
			clickE.preventDefault();

			let tabNum = eachTab.classList[1].split('_')[1];

			console.log('클릭이벤트 진입');

			// current 토글
			for(let i=0; i<tamMenu.length; i++) {
				if(tabNum == i) {
					tamMenu[i].parentElement.classList.add('current');
				} else {
					tamMenu[i].parentElement.classList.remove('current');
				}
			}
	
			setContent(tabNum);
		});
	});

	let swiper = new Swiper('.swiper-container', {
		slidesPerView: 'auto',
		spaceBetween: 10,
		freeMode: true,  // 터치 만큼 자유롭게 이동
	});
});