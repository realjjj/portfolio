window.addEventListener('load', e => {
    let tabs = document.querySelectorAll('.tab');

    tabs.forEach((tab, tabIndex) => {
        tab.addEventListener('click', e => {
            e.preventDefault();

            tabListSwitch(tabs, tabIndex);
        });
    });

    let modalOpenBtnAll = document.querySelectorAll('.modal_open_btn');
    let title = ['해양생물다양성', '생물의 이동', '함께 찾는 우리나라 생물', '자연문화 덕후와 함께하는 우리나라 문화속 생물 탐험!',
        '역사 속 식물', '동물의 놀이', '공학, 자연을 만나다', '심해']

    // 모달 여닫기
    modalOpenBtnAll.forEach((btn, btnIdx) => {
        btn.addEventListener('click', e => {
            e.preventDefault();

            let thisModal = document.getElementById(`modal${btnIdx+1}`);

            document.body.style.overflow = 'hidden';

            thisModal.innerHTML = 
                '<div class="exhibit_modal_popup">' +
                '<p class="modal_title">' + title[btnIdx] + '</p>' +
                '<img src="./images/sub3_1_' + (btnIdx+1) + '.jpg" alt="">' +
                '<div class="modal_content">' +
                    '<ul>' +
                        '<li>' +
                            '<p>전시 정보</p>' +
                            '<ul>' +
                                '<li>' +
                                    '<strong># 날짜</strong>' +
                                    '<span>2023년 12월 21부터</span>' +
                                '</li>' +
                                '<li>' +
                                    '<strong># 장소</strong>' +
                                    '<span>이화여자대학교 자연사박물관 기획전시실</span>' +
                                '</li>' +
                                '<li>' +
                                    '<strong># 주최</strong>' +
                                    '<span>이화여자대학교</span>' +
                                '</li>' +
                                '<li>' +
                                    '<strong># 주관, 기획, 진행</strong>' +
                                    '<span>' +
                                        '이화여자대학교 자연사박물관' +
                                    '</span>' +
                                '</li>' +
                                '<li>' +
                                    '<strong># 디자인</strong>' +
                                    '<span>' +
                                        '이화여자대학교 조형예술대학 디자인학부 대학원' +
                                    '</span>' +
                                '</li>' +
                                '<li>' +
                                    '<strong># 협력</strong>' +
                                    '<span>' +
                                        '국립해양생물자원관, 해양생명자원 기탁등록보존기관(미삭, 어류, 연체, 자포, 태형),' +
                                        '한국해양과학기술원, 국립생물자원관, 해양동물생태보전연구소, 이화여자대학교 에코과학부-에코과학연구소' +
                                    '</span>' +
                                '</li>' +
                            '</ul>' +
                        '</li>' +
                        '<li>' +
                            '<p>전시 의도</p>' +
                            '<div>' +
                                '<p>' +
                                    '이화여자대학교 자연사박물관은 올해 개관 55주년을 맞이하여 "해양생물다양성" 기획전을 준비했습니다.' +
                                    '자연사박물관은 본교 생물과학과(에코과학부)와 함꼐 우리나라 해양생물다양성에 대해 조사, 수집, 보존,' +
                                    '연구를 진행해 오고 있습니다.' +
                                '</p>' +
                                '<p>' +
                                    '그동안 축적된 해양생물다양성 관련 소장 표본과 연구자료를 학생 및 일반 대중과 공유하는 기회를 갖고자' +
                                    '합니다. "해양생물다양성" 전시에서는 이화여대 자연사박물관이 소장하고 있는 우리나라 해양보호생물 표본,' +
                                    '해양생물 및 생태계 사진과 영상자료를 공개합니다. 더불어 해양생물종과 생태계에 대한 개념, 특징, 계통수,' +
                                    '공생, 보존에 대해서도 소개합니다.' +
                                '</p>' +
                                '<p>' +
                                    '이화여자대학교는 우리나라에 서식하는 해양무척추동물 종을 찾고 기록하는 일을 개척해왔습니다. 이러한' +
                                    '선구자 정신을 잊지 않도록, 1960년대부터 현재까지 이화가 기록한 우리나라 해양무척추동물의 목록과 사진들을' +
                                    '정리해 전시했습니다.' +
                                '</p>' +
                                '<p>' +
                                    '관련 기관과 연구자들께서 표본 동정, 사진, 영상, 체험물 등을 협조해 주셨습니다. 또한 어려운 콘텐츠임에도' +
                                    '불구하고, 본교 조형예술대학 디자인전공 대학원생들이 열심히 디자인해 주었습니다. "해양생물다양성" 전시는' +
                                    '아러한 협력으로 열릴 수 있었습니다. 감사드립니다.' +
                                '</p>' +
                                '<p>' +
                                    '"해양생물다양성" 전시를 관람하시고, 해양생물의 다양한 삶에 대한 이해를 통해 많은 관심과 사랑이 싹트길' +
                                    '바랍니다.' +
                                '</p>' +
                            '</div>' +
                        '</li>' +
                        '<li>' +
                            '<p>전시 목차</p>' +
                            '<div>' +
                                '<ul class="list_disc">' +
                                    '<li>해양생물다양성이란?</li>' +
                                    '<li>' +
                                        '다양한 해양상물' +
                                        '<p>[체험] 해양생물을 3D로 관찰해보세요!</p>' +
                                        '<p>[체험] 다양한 해양생물을 그려보세요!</p>' +
                                        '<p>[영상] 우리나라 해양보호생물</p>' +
                                    '</li>' +
                                    '<li>이화가 기록한 우리나라 해양무척추동물</li>' +
                                    '<li>주요 해양생물의 계통수</li>' +
                                    '<li>해양생물의 공생</li>' +
                                    '<li>' +
                                        '다양한 해양 생테계' +
                                        '<p>[체험] 생물들이 잘 살 수 있는 서식지를 찾아주세요.</p>' +
                                        '<p>[체험] AI 도슨트와 제주 바다를 탐험해보세요!</p>' +
                                        '<p>[e-book] 우리나라 해양보호구역</p>' +
                                        '<p>[animation] 심해 오아시스</p>' +
                                        '<p>[영상] 심해 열수구 탐사</p>' +
                                    '</li>' +
                                '</ul>' +
                            '</div>' +
                        '</li>' +
                        '<li>' +
                            '<p>전시 참여자</p>' +
                            '<ul>' +
                                '<li>' +
                                    '<strong># 전시 총괄, 기획 및 원고</strong>' +
                                    '<span>박중기(자연사박물관 관장), 서수연(자연사박물관 학예사)</span>' +
                                '</li>' +
                                '<li>' +
                                    '<strong># 전시 자문</strong>' +
                                    '<span>김은수</span>' +
                                '</li>' +
                                '<li>' +
                                    '<strong># 그래픽 및 홍보물 디자인</strong>' +
                                    '<span>' +
                                        '이화여자대학교 조형예술대학 대학원 시각디자인 전공 타이포그래피랩 박수진(아트디렉터),' +
                                        '김가영, 김가형, 김선재, 정선아, 정혜인, 주혜린, 최유진' +
                                    '</span>' +
                                '</li>' +
                                '<li>' +
                                    '<strong># 미디어아트 디자인</strong>' +
                                    '<span>' +
                                        '이화여자대학교 조형예술대학 대학원 영상디자인전공 유현정(자문), 이기쁨, 정인아,' +
                                        'Liu Shiyi' +
                                    '</span>' +
                                '</li>' +
                                '<li>' +
                                    '<strong># 전시 진행</strong>' +
                                    '<span>강지영, 김대홍, 류재원, 장유정, 정다운, 최규리</span>' +
                                '</li>' +
                                '<li>' +
                                    '<strong># 도와주신 분들</strong>' +
                                    '<span>' +
                                        '김동성, 김윤전, 김진구, 박승환, 박진아, 박태서, 서지은, 심수환, 심정자,' +
                                        '오제혁, 이강현, 이다민, 이유철, 송준임, 장수진, 장효성, 정지범, 정종우,' +
                                        '조인영, 홍수미, 황성진' +
                                    '</span>' +
                                '</li>' +
                            '</ul>' +
                        '</li>' +
                        '<li>' +
                            '<p>전시 운영 안내</p>' +
                            '<ul>' +
                                '<li>' +
                                    '<strong># 개관</strong>' +
                                    '<span>월요일부터 토요일, 10시~16시</span>' +
                                '</li>' +
                                '<li>' +
                                    '<strong># 휴관</strong>' +
                                    '<span>토요일(1, 2, 7, 8월), 일요일, 공휴일</span>' +
                                '</li>' +
                                '<li>' +
                                    '<strong># 관람료</strong>' +
                                    '<span>무료</span>' +
                                '</li>' +
                                '<li>' +
                                    '<strong># 관람 예약</strong>' +
                                    '<span>단체는 홈페이지에서 예약 후 방문, 개인은 예약없이 관람 가능</span>' +
                                '</li>' +
                                '<li>' +
                                    '<strong># 전시 도슨트 설명</strong>' +
                                    '<span>사전 예약</span>' +
                                '</li>' +
                                '<li>' +
                                    '<strong># 전시 연계 교육</strong>' +
                                    '<span>홈페이지 "공지사항" 참조</span>' +
                                '</li>' +
                            '</ul>' +
                        '</li>' +
                    '</ul>' +
                '</div>' +
                '<a id="closeModal' + (btnIdx+1) + '" href="#">' +
                    '닫기' +
                    '<i class="fa-solid fa-xmark"></i>' +
                '</a>' +
            '</div>';

            let modalCloseBtn = document.getElementById(`closeModal${btnIdx+1}`);

            thisModal.style.display = 'block';

            modalCloseBtn.addEventListener('click', e2 => {
                e2.preventDefault();
                
                document.body.style.overflow = 'auto';
                thisModal.style.display = 'none';
            });
        })
    });
});