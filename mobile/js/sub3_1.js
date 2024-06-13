let xhr = new XMLHttpRequest();

let getModalContent = (idx) => {
	xhr.onload = () => {
		if(xhr.status === 200) {
			let responseObject = JSON.parse(xhr.responseText).data[idx];
            let newContent = '';

			newContent = 
			`
				<img src="${responseObject.src}" alt="" width="100%">
				<div>
					<div class="modal_section">
						<p>전시정보</p>
						<ul>
							<li>
								<strong># 전시제목</strong>
								<span>${responseObject.korTitle}</span>
							</li>
							<li>
								<strong># 장소</strong>
								<span>이화여자대학교 자연사박물관 기획전시실</span>
							</li>
							<li>
								<strong># 주최</strong>
								<span>이화여자대학교</span>
							</li>
							<li>
								<strong># 주관, 기획, 진행</strong>
								<span>이화여자대학교 자연사박물관</span>
							</li>
							<li>
								<strong># 디자인</strong>
								<span>이화여자대학교 조형예술대학 디자인학부 대학원</span>
							</li>
							<li>
								<strong># 협력</strong>
								<span>국립해양생물자원관, 
									해양생명자원 기탁등록보존기관(미삭, 어류, 연체, 
									자포, 태형),한국해양과학기술원, 국립생물자원관, 
									해양동물생태보전연구소, 이화여자대학교 
									에코과학부-에코과학연구소
								</span>
							</li>
						</ul>
					</div>
					<div class="modal_section">
						<p>전시의도</p>
						<div>
							<p>
								이화여자대학교 자연사박물관은 올해 개관 55주년을 
								맞이하여 "해양생물다양성" 기획전을 준비했습니다.
								자연사박물관은 본교 생물과학과(에코과학부)와 함꼐 
								우리나라 해양생물다양성에 대해 조사, 수집, 보존,연구를 
								진행해 오고 있습니다.
							</p>
							<p>
								그동안 축적된 해양생물다양성 관련 소장 표본과 연구자료를 
								학생 및 일반 대중과 공유하는 기회를 갖고자합니다. 
								"해양생물다양성" 전시에서는 이화여대 자연사박물관이 
								소장하고 있는 우리나라 해양보호생물 표본,해양생물 및 
								생태계 사진과 영상자료를 공개합니다. 더불어 해양생물종과 
								생태계에 대한 개념, 특징, 계통수,공생, 보존에 대해서도 
								소개합니다.
							</p>
							<p>
								이화여자대학교는 우리나라에 서식하는 해양무척추동물 
								종을 찾고 기록하는 일을 개척해왔습니다. 이러한선구자 
								정신을 잊지 않도록, 1960년대부터 현재까지 이화가 
								기록한 우리나라 해양무척추동물의 목록과 사진들을정리해 
								전시했습니다.
							</p>
							<p>
								관련 기관과 연구자들께서 표본 동정, 사진, 영상, 
								체험물 등을 협조해 주셨습니다. 또한 어려운 
								콘텐츠임에도불구하고, 본교 조형예술대학 디자인전공 
								대학원생들이 열심히 디자인해 주었습니다. 
								"해양생물다양성" 전시는아러한 협력으로 열릴 수 
								있었습니다. 감사드립니다.
							</p>
							<p>
								"해양생물다양성" 전시를 관람하시고, 
								해양생물의 다양한 삶에 대한 이해를 통해 많은
								관심과 사랑이 싹트길바랍니다.
							</p>
						</div>
					</div>
				</div>
			`;

			document.querySelector('.modal_content').innerHTML = newContent;
		}
	}

	xhr.open('GET', './data/sub3_1.json', true);
    xhr.send(null);
};

let getTabContent = (idx = 0) => {
	console.log(idx);

	xhr.onload = () => {
		if(xhr.status === 200) {
			let responseObject = JSON.parse(xhr.responseText).data;
			let newArr = [];
            let newContent = '';

			if(idx == 0) {
				newArr = responseObject.filter(obj => obj.state == 'on');
			} else if(idx == 1) {
				newArr = responseObject.filter(obj => obj.state == 'end');
			}

			newArr.forEach((obj, idx) => {
				newContent += 
				`
					<li>
						<img src="${obj.src}" alt="" width="100%">
						<p>${obj.engTitle}</p>
						<p>${obj.korTitle}</p>
						<p>${obj.startDate} ~ ${obj.endDate}</p>
						<a href="#" class="open_modal modal_${obj.index}"></a>
					</li>
				`;
			});

			document.querySelector(`.tab_content${idx + 1} .modal_click_area`).innerHTML = newContent;
		}
	}

	xhr.open('GET', './data/sub3_1.json', true);
    xhr.send(null);
};

window.addEventListener('load', loadE => {
	getTabContent();
});


