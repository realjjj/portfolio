let xhr = new XMLHttpRequest();

window.addEventListener('load', loadE => {
	let grid = document.querySelector('.masonry .grid');
	let typeList = document.querySelector('.type_list');
	let newArr = [];
	let filterObj = {type: "All", search: ""};

	// 리스트업
	let setContent = (filter = filterObj) => {
		// console.log(filter);

		xhr.onload = () => {
			if(xhr.status === 200) { // If server status was ok
				let responseObject = JSON.parse(xhr.responseText).data;
				let searchKeyword = filter.search.toLowerCase();
				let newContent = '';

				if(filter.type == 'All') {
					newArr = responseObject.filter(obj =>
						obj.name.toLowerCase().indexOf(searchKeyword) >= 0
					);
				} else {
					newArr = responseObject.filter(obj =>
						obj.type == filter.type &&
						obj.name.toLowerCase().indexOf(searchKeyword) >= 0
					);
				}

				// console.log(newArr);
				
				document.querySelector('.result_length span').textContent = newArr.length;

				// set Element
				newContent = '<li class="grid-sizer"></li>';
				if(newArr.length == 0) {
					document.querySelector('.no_result').style.display = 'flex';
				} else {
					document.querySelector('.no_result').style.display = 'none';

					newArr.forEach((obj, objIdx) => {
						newContent += `
							<li class="grid-item">
								<div>
									<p>${obj.type}</p>
									<img src="./images/sub/stay/${obj.index}/01.jpg" alt="">
									<p>${obj.name}</p>
									<a href="#" class="stay_${obj.index} stay_open stay_open_${objIdx}"></a>
								</div>
							</li>
						`;
					});
				};

				grid.innerHTML = newContent;
				
				// 위에서 innerHTML로 json 객체를 뿌리고 난 다음엔 플러그인을 붙여넣을 수 있다.
				let msnry = new Masonry(grid, {
					itemSelector: '.grid-item',
					columnWidth: '.grid-sizer',
					percentPosition: true
				});
			
				// json 실행뒤에 masonry실행
				imagesLoaded(grid).on('progress', function() { 
					// layout Masonry after each image loads
					msnry.layout();
				});

				// stay 모달창 열기
				document.querySelectorAll('.stay_open').forEach(stay => {
					stay.addEventListener('click', clickE => {
						clickE.preventDefault();

						let arrIndex = clickE.target.classList[2].split('_')[2];
						let trueIndex = clickE.target.classList[0].split('_')[1];
						let newModal = '';

						// 모달
						document.querySelector('.stay_modal').style.display = 'block';

						newModal += `
							<div class="left">
								<p>Accommodation</p>
								<p>${newArr[arrIndex].name}</p>
								<dl>
									<dt class="subtitle">about</dt>
									<dd>
										${newArr[arrIndex].about}
									</dd>
								</dl>
								<div class="info_area">
									<dl>
										<dt class="subtitle">Provided by:</dt>
										<dd>${newArr[arrIndex].info.providedBy}</dd>`

										// 이메일 구별 & 전화번호 2개 이상의 경우
										for(let i=0; i<newArr[arrIndex].info.connect.length; i++) {
											if(newArr[arrIndex].info.connect[i].indexOf('@') >= 0) { // 이메일이면
												newModal +=
													`<dd>
														<a href="mailto:${newArr[arrIndex].info.connect[i]}">${newArr[arrIndex].info.connect[i]}</a>
													</dd>`
											} else if(newArr[arrIndex].info.connect[i].indexOf('+') >= 0) { // 전화번호
												newModal +=
												`<dd>
													<a href="tel:${newArr[arrIndex].info.connect[i]}">${newArr[arrIndex].info.connect[i]}</a>
												</dd>`
											}
										}
								newModal += `</dl>`;

									// address에 addr이 있거나, 없거나 or 홈페이지가 있거나, 없거나
									for(let i=0; i<newArr[arrIndex].info.address.length; i++) {
										if(Object.keys(newArr[arrIndex].info.address[i]) == "addr") { // 실 주소면
											newModal += `
											<dl>
												<dt>Address:</dt>
												<dd>${Object.values(newArr[arrIndex].info.address[i])}</dd>
											</dl>`;
										} else { // 주소 아닌 경우엔 홈피주소
											newModal += 
											`<a href="${Object.values(newArr[arrIndex].info.address[i])}" target="_blank" class="homepage">
												${Object.keys(newArr[arrIndex].info.address[i])}</a>`;
										}
									}

						newModal += 
									`<p>"If you have any questions of the service, please contact service provider."</p>
								</div>
								<div class="tag_area">
									<p class="subtitle">Tags</p>
									<ul>`

									for(let i=0; i<newArr[arrIndex].tags.length; i++) {
										newModal += `<li>${newArr[arrIndex].tags[i]}</li>`;
									};
									
						newModal +=
									`</ul>
								</div>
							</div>
							<div class="right">`
						
								for(let i=0; i<newArr[arrIndex].images.length; i++) {
									newModal += `<img src="./images/sub/stay/${trueIndex}/${newArr[arrIndex].images[i]}" alt="">`;
								}
						
						newModal += 
							`</div>`;

						// 모달 내용
						document.querySelector('.modal_content').innerHTML = newModal;
					});
				});
			}
		}
		xhr.open('GET', './data/stay_full.json', true); // 요청을 준비한다.
		xhr.send(null); // 요청을 전송한다
	}

	setContent();

	// 모달 닫기
	document.querySelector('.close_modal').addEventListener('click', clickE => {
		clickE.preventDefault();

		document.querySelector('.stay_modal').style.display = 'none';

		document.querySelector('.modal_content').innerHTML = ''; // 비워주기
	});


	// type 필터링
	typeList.addEventListener('click', clickE => {
		clickE.preventDefault();

		if(clickE.target.nodeName == 'A') { // 타겟이 a태그이면 이벤트 진입
			for(let i=0; i<typeList.querySelectorAll('a').length; i++) {
				if(typeList.querySelectorAll('a')[i].classList.contains('current')) {
					typeList.querySelectorAll('a')[i].classList.remove('current');
					break;
				}
			}

			clickE.target.classList.add('current');

			filterObj.type = clickE.target.textContent;
			setContent();
		} else return false;
	});

	let goSearchFunc = () => {
		filterObj.search = document.querySelector('.go_search_input').value;
		setContent();
	}

	// search 필터링
	document.querySelector('.go_search_a').addEventListener('click', clickE => {
		clickE.preventDefault();
		goSearchFunc();
	});
	document.querySelector('.go_search_input').addEventListener('keypress', keyE => {
		if(keyE.keyCode == 13) {
			// console.log('enter key 입력');
			goSearchFunc();
		}
	});

	// search 필터링 제거
	document.querySelector('.clear_search_keyword').addEventListener('click', clickE => {
		clickE.preventDefault();

		document.querySelector('.go_search_input').value = '';

		filterObj.search = '';
		setContent();
	});

	// filter 여닫기
	document.querySelector('.filter_open').addEventListener('click', clickE => {
		clickE.preventDefault();

		if(document.querySelector('.filter_area').classList.contains('on')) {
			document.querySelector('.filter_area').classList.remove('on');
		} else {
			document.querySelector('.filter_area').classList.add('on');
		}
	});
});