let xhr = new XMLHttpRequest();
let thisRoot = '';

let getData = (target = '전체') => {
    xhr.onload = () => {
        if(xhr.status === 200) { // If server status was ok
            let responseObject = JSON.parse(xhr.responseText);
            let newContent = '';
            let newArr = [];

            if(target == '전체') {
                newArr = responseObject.data;
            } else {
                newArr = responseObject.data.filter(thisObj => thisObj.target.includes(target));
            }
            
            newArr.sort(function (prev, next) { // 최신 index게시물이 위로 오게 정렬
                if (prev.index > next.index) return -1;
                if (prev.index < next.index) return 1;
            });

            newArr.forEach(data => {
                if(data.state !== '접수중') {
                    newContent += '<tr class="closed">';
                } else {
                    newContent += '<tr>';
                }
                newContent += `<td class="idx">${data.index}</td>`;
                newContent += `<td class="tit">${data.title}</td>`;
                newContent += `<td>${data.target}</td>`;
                newContent += `<td><strong>${data.participant.now}</strong> / ${data.participant.max}</td>`;
                newContent += `<td><span><strong>${data.state}<strong></span></td>`;
                newContent += `<td>${data.receptionDate}</td>`;
                newContent += `<td>${data.eduDate}</td>`;
                newContent += `<td><a href="#" class="modal_open modal_${data.index}"><span class="hidden">자세히 보기</span></a></td>`;
                newContent += '</tr>';
            });

            document.querySelector('.table_data').innerHTML = newContent;
        }
    };

    xhr.open('GET', './data/edu_short_data.json', true); // 요청을 준비한다.
    xhr.send(null); // 요청을 전송한다
};

getData();

// 모달에 출력될 데이터
let addContent = (idx) => {
    xhr.onload = () => {
        if(xhr.status == 200) {
            let responseObject = JSON.parse(xhr.responseText);
            let thisObj = responseObject.data.filter(obj => obj.index == idx)[0];
            let newContent = '';

            newContent += `<div class="root">${thisRoot}</div>`;
            newContent += `<div class="title">${thisObj.title}</div>`;
            newContent += `<div class="info">`;
            newContent += `<span><strong>#강사</strong>${thisObj.teacher}</span>`;
            newContent += `<span><strong>#교육날짜</strong>${thisObj.eduDate}</span>`;
            newContent += `<span><strong>#정원</strong>${thisObj.participant.now} / ${thisObj.participant.max}</span>`;
            newContent += `<span><strong>#대상</strong>${thisObj.target}</span>`;
            newContent += `<span><strong>#접수일</strong>${thisObj.receptionDate}</span>`;
            newContent += `<span><strong>#상태</strong>${thisObj.state}</span>`;
            newContent += `<span><strong>#장소</strong>${thisObj.place}</span>`;
            newContent += `<span><strong>#교육비</strong>${thisObj.price}</span>`;
            newContent += `</div>`;
            newContent += `<div class="body">`;
            newContent += `<p>현장수업신청입니다.</p>`;
            newContent += `<p>그림자놀이를 통해 다양한 물체와 빛이 만나면서 생기는 그림자의 원리에 
                대해 알아보고 색깔 그림자와 그림자 예술작품도 만들어 봅니다.</p>`;    
            newContent += `<p><br></p>`;
            newContent += `<p class="body_title"><span><strong>수업 일정</strong></span></p>`;
            newContent += `<p>2024년 4월 20일 토요일 14:30 ~ 15:45 (75분) - 15명</p>`;
            newContent += `<p>▣ 교육주제 : #CQ과학 : 빛과 색이 만드는 예술</p>`;
            newContent += `<p>현장(이화여자대학교 자연사박물관)에서 진행됩니다.</p>`;
            newContent += `<p><br></p>`;
            newContent += `<p class="body_title"><span><strong>수강 대상</strong></span></p>`;
            newContent += `<p>▣ 초등 1학년, 2학년</p>`;
            newContent += `<p>▣ 정원 : 15명</p>`;
            newContent += `<p><br></p>`;
            newContent += `<p class="body_title"><span><strong>수강 신청 일자</strong></span></p>`;
            newContent += `<p>◈2024년 3월 25일 월요일 오전 10시부터 ~ 2024년 4월 9일 화요일 오후 4시까지 또는 정원 마감 시</p>`;
            newContent += `<p><br></p>`;
            newContent += `<p><strong>**수강신청 주의사항**</strong></p>`;
            newContent += `<p>- 바구니에 수업을 담으신 후 신청 창 하단의 [수강신청]을 클릭하여 [신청성공]까지 꼭 확인하셔야 합니다.</p>`;
            newContent += `<p>- 신청한 다음날까지 입금되지 않을 경우 자동 취소되며 입금 시 반드시 [부모님 성함+학생이름(예:김ㅇㅇ박ㅇㅇ)으로 입금해주시기 바랍니다.</p>`;
            newContent += `<p><br></p>`;
            newContent += `<p><strong>**취소 및 환불**</strong></p>`;
            newContent += `<p>- 2024년 4월 9일 화요일 16시 이전까지 전화로 취소 및 환불이 가능합니다.</p>`;
            newContent += `<p><br></p>`;
            newContent += `<p class="body_title"><span><strong>수강료</strong></span></p>`;
            newContent += `<p>20,000원(교재, 재료비 포함)</p>`;
            newContent += `<p><br></p>`;
            newContent += `<p><strong>**자세한 사항은 교육프로그램 공지사항을 참조해 주세요.**</strong></p>`;
            newContent += `<a href="#" class="edu_join" onclick="return false;">신청하기</a>`;
            newContent += `</div>`;

            document.querySelector('.modal_content').innerHTML = newContent;
        }
    }

    xhr.open('GET', './data/edu_full_data.json', true);
    xhr.send(null);
}

window.addEventListener('load', e => {
    let tabs = document.querySelectorAll('.tab');
    let ctgrTabs = document.querySelectorAll('.ctgr_tab a');
    document.querySelectorAll('.sub_nav a').forEach(el => {
        if(el.classList.contains('current')) thisRoot = el.innerText;
    });

    tabs.forEach((tab, tabIndex) => {
        tab.addEventListener('click', e => {
            e.preventDefault();

            tabListSwitch(tabs, tabIndex);
        });
    });

    ctgrTabs.forEach((tab, tabIndex) => {
        tab.addEventListener('click', e => {
            e.preventDefault();

            ctgrTabs.forEach((tab2, tab2Index) => {
                if(tab2Index == tabIndex) {
                    tab2.classList.add('current');
                } else {
                    tab2.classList.remove('current');
                }
            });

            getData(e.currentTarget.innerText);
        });
    });
    
    // 모달클릭시 실행할 함수 전달
    setContent(addContent);

    // 취소폼
    let cancelEduBtn = document.querySelectorAll('.cancel_edu');
    let tab = document.querySelectorAll('.tab_content')[1];
    let thisTitle = '';
    let thisIdx = '';
    let thisForm = document.createElement('form');
    let thisTd = '';
    let thisBtn = '';

    // 올바른 코드
    // 취소폼 - 취소 버튼 클릭(취소폼 추가)
    cancelEduBtn.forEach((btn, btnIdx) => {
        btn.addEventListener('click', e1 => {
            // console.log('add cancel form');
            let thisEl = btn.parentNode.parentNode.children;
            thisTd = btn.parentNode;
            thisBtn = btn;

            // 폼 추가 후 삽입할 인덱스/제목 값 할당
            for(let i=0; i<thisEl.length; i++) {
                if(thisEl[i].classList.contains('tit')) {
                    thisTitle = thisEl[i].innerText;
                }
                if(thisEl[i].classList.contains('idx')) {
                    thisIdx = thisEl[i].innerText;
                }
            }

            if(!document.getElementById('cancelForm')) {
                // console.log('기존 form없음, 폼추가');
                thisForm.id = 'cancelForm';
                thisForm.action = '';
                thisForm.method = 'post';
                
                thisForm.innerHTML = 
                    `<div class="cancel_form_container">
                            <div>프로그램 취소 작성폼</div>
                            <div><span>처리 번호</span><input type="text" value="번호" id="eduIdx" readonly></div>
                            <div><span>선택한 교육</span><input type="text" value="교육명" id="eduTitle" readonly></div>
                            <div><span>환불받을 계좌</span><input type="text" placeholder="계좌번호" id="bankNumber"></div>
                            <div><span>연락처</span><input type="text" placeholder="전화번호" id="phoneNumber"></div>
                            <div><span>취소사유</span><input type="text" placeholder="취소 사유를 적어주세요." id="cancelReason"></div>
                            <div>
                                <button type="button" class="close_cancel cancel_btn">닫기</button>
                                <button type="submit" class="acept_cancel cancel_btn">확인</button>
                            </div>
                        </div>`;
                
                tab.appendChild(thisForm);

                // 닫기 버튼
                document.querySelector('.close_cancel').addEventListener('click', e2 => {
                    e2.preventDefault();

                    thisForm.remove();
                });

                // 확인 버튼
                document.querySelector('.acept_cancel').addEventListener('click', e3 => {
                    e3.preventDefault();

                    if(thisForm.bankNumber.value.trim() == "") {
                        alert('환불받을 계좌번호를 입력해주세요.');
                    } else if(thisForm.phoneNumber.value.trim() == "") {
                        alert('연락처를 입력해주세요.');
                    } else {
                        alert('취소 신청이 접수되었습니다.');
                        let afterCancelEl = document.createElement('span');
                        afterCancelEl.classList.add('after_cancel');
                        afterCancelEl.textContent = `취소 진행중`;

                        thisForm.remove(); // 취소폼 삭제
                        thisBtn.remove(); // 취소버튼 삭제
                        thisTd.appendChild(afterCancelEl); // 취소 진행중 삽입
                    }
                });
            }

            thisForm.eduTitle.value = thisTitle;
            thisForm.eduIdx.value = thisIdx;
        });
    });

    // 잘못된 코드
    // let newForm = '';
    // cancelEduBtn.forEach((btn, btnIdx) => {
    //     btn.addEventListener('click', e => {
    //         if(!tab.querySelector('#cancelForm')) { // form없을때만 생성, 있으면 재활용
    //             // 클릭 발생시 form 삽입
    //             newForm += '<form action="" method="post" id="cancelForm">';
    //             newForm += '<div class="cancel_form_container">';
    //             newForm += '<div>프로그램 취소 작성폼</div>';
    //             newForm += '<div><span>선택한 교육</span><input type="text" value="교육명" id="eduTitle" readonly></div>';
    //             newForm += '<div><span>환불받을 계좌</span><input type="text" placeholder="계좌번호" id="bankNumber"></div>';
    //             newForm += '<div><span>연락처</span><input type="text" placeholder="전화번호" id="phoneNumber"></div>';
    //             newForm += '<div><span>취소사유</span><input type="text" placeholder="취소 사유를 적어주세요." id="cancelReason"></div>';
    //             newForm += '<div>';
    //             newForm += '<a href="#" class="close_cancel cancel_btn">닫기</a>';
    //             newForm += '<a href="#" class="acept_cancel cancel_btn">확인</a>';
    //             newForm += '</div>';
    //             newForm += '</div>';
    //             newForm += '</form>';
    
    //             // tab.innerHTML += newForm; // innerHTML로 삽입하면 내가 준 이벤트 사라짐
    //             tab.insertAdjacentHTML('beforeend', newForm);

    //             console.log(tab.querySelector('#cancelForm'));
                
    //             // 취소폼 - 닫기 버튼 클릭(취소폼 삭제)
    //             document.querySelector('.close_cancel').addEventListener('click', e => { // 취소버튼
    //                 e.preventDefault();

    //                 document.querySelector('form').remove();
    //                 console.log(tab);
    //             });
    //         }
    //     });
    // });
});