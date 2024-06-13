let getContent = '';

let setContent = (func) => {
    getContent = func;
};

let setModalData = (idx) => {
    getContent(idx);
};

window.addEventListener('load', eLoad => {
    let modal = document.querySelector('.modal');

    let closeModalSetup = () => {
        modal.style.display = 'none';
        document.body.style.overflow = 'auto';
        // 모달 로드시 전에 컨텐츠가 살짝 보여서 안에 비워주기
        // 더불어 모달 스크롤 초기화도 됨
        document.querySelector('.modal_content').innerHTML = '';
    };

    // 모달 열기 & 데이터 넣기
    document.querySelectorAll('.modal_click_area').forEach(el => {
        el.addEventListener('click', e => { // 이벤트 버블링 이용
            e.preventDefault();

			// console.log(e.target);

            if(e.target.classList.contains('modal_open')) {
                let modalIdx = Number(e.target.classList[1].split('_')[1]); // 모달 고유 번호
    
                console.log('모달열림');
                modal.style.display = 'block';
                document.body.style.overflow = 'hidden';
        
                setModalData(modalIdx);
            }
        });
    });
    
    // 모달 닫기1 - close버튼 클릭시
    document.querySelector('.modal_close').addEventListener('click', e => {
        e.preventDefault();

        closeModalSetup();
    });

    // 모달 닫기2 - modal_bg 클릭시
    modal.addEventListener('click', e => {
        let thisClassList = e.target.classList;

        if(thisClassList.contains('modal')) {
            closeModalSetup();
        }
    });
});