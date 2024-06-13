let xhr = new XMLHttpRequest();
let thisRoot = '';

window.addEventListener('load', loadE => {
	let getData = (keyword, sortBy="byNumber") => {
		xhr.onload = () => {
			if(xhr.status === 200) {
				let responseObject = JSON.parse(xhr.responseText);
				let newContent = '';
				let newArr = responseObject.data;
	
				if(keyword) {
					newArr = responseObject.data.filter(thisObj => {
						if(thisObj.소장품번호.includes(keyword)) {
							return thisObj;	
						}
						if(thisObj.명칭.includes(keyword)) {
							return thisObj;	
						}
						if(thisObj.재질.split('-')[0].includes(keyword)) {
							return thisObj;	
						}
					});
	
					if(newArr.length == 0) { // 검색 결과 없으면
						newContent = `
							<div class="search_null">검색 결과가 없습니다 [; ^ ;]</div>
						`;
					}
				}
	
				// console.log(newArr);
				
				if(sortBy) {
					if(sortBy == 'byTitle') { // 가나다순
						newArr.sort(function (prev, next) { // 최신 index게시물이 위로 오게 정렬
							if (prev.명칭 > next.명칭) return 1;
							if (prev.명칭 < next.명칭) return -1;
						});
					} else if(sortBy == 'byNumber') { // 소장품번호순
						newArr.sort(function (prev, next) { // 최신 index게시물이 위로 오게 정렬
							if (prev.소장품번호 > next.소장품번호) return -1;
							if (prev.소장품번호 < next.소장품번호) return 1;
						});
					}
				}
	
				document.querySelector('.total_count').textContent = newArr.length;
	
				newArr.forEach(data => {
					newContent += `
					<li>
						<div>
							<img src="./images/sub/specimen/${data.index}_${data.명칭}.jpg" alt="">
							<span class="num">${data.소장품번호}</span>
							<span class="title">${data.명칭}</span>
							<span class="type">${data.재질}</span>
							<a href="#" class="open_modal modal_${data.index}">
								<span class="hidden">자세히 보기</span>
							</a>
						</div>
					</li>
					`;
				});
	
				document.querySelector('.modal_click_area').innerHTML = newContent;
			}
		};
	
		xhr.open('GET', './data/specimen.json', true);
		xhr.send(null);
	};

	getData();

	let totalFormReset = (eachAIdx) => {
		document.querySelectorAll('.total_form a').forEach((el, elIdx) => {
			if(elIdx == eachAIdx) el.classList.add('current');
			else el.classList.remove('current');
		});
	}

	let thisForm = document.querySelector('.search_form form');
	document.querySelectorAll('.sub_nav a').forEach(el => {
        if(el.classList.contains('current')) thisRoot = el.innerText;
    });

	document.getElementById('goSearch').addEventListener('click', eClick => {
		eClick.preventDefault();
		// console.log(thisForm.keyword.value); // 검색어

		if(thisForm.keyword.value.trim() == "") {
			alert('검색어를 입력해주세요.');
		} else {
			getData(thisForm.keyword.value);
			totalFormReset(0);
		}
	});

	document.querySelectorAll('.total_form a').forEach((eachA, eachAIdx) => {
		eachA.addEventListener('click', eClick => {
			eClick.preventDefault();

			totalFormReset(eachAIdx);

			getData(thisForm.keyword.value, eClick.target.id);
		})
	});
});

let getModalContent = (idx) => {
	xhr.onload = () => {
		if(xhr.status === 200) {
			let responseObject = JSON.parse(xhr.responseText);
            let thisObj = responseObject.data.filter(obj => obj.index == idx)[0];
            let newContent = '';

			newContent += `
				<div class="body">
					<img src="./images/sub/specimen/${thisObj.index}_${thisObj.명칭}.jpg" alt="" width="100%">
					<div class="info_wrap">	
					<div class="title">${thisObj.명칭}</div>
				`;
			newContent += `<p><span>명칭</span><span>${thisObj.명칭}</span></p>`;
			newContent += `<p><span>재질</span><span>${thisObj.재질}</span></p>`;

				for(let key in thisObj.extraInfo) {
					newContent += `<p><span>${key}</span><span>${thisObj.extraInfo[key]}</span></p>`;
				}
				
			newContent += `<p><span>소장품번호</span><span>${thisObj.소장품번호}</span></p>`;
			newContent += 
					`</div>
				</div>`;

			document.querySelector('.modal_content').innerHTML = newContent;
		}
	}

	xhr.open('GET', './data/specimen.json', true);
	xhr.send(null);
};