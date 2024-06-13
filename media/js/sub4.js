let xhr = new XMLHttpRequest();

window.addEventListener('load', loadE => {
    let grid = document.querySelector('.masonry .grid');

    let setContent = () => {
        xhr.onload = () => {
            if(xhr.status === 200) {
                let response = JSON.parse(xhr.responseText).data;
                let newContent = '';

                newContent += `
                    <li class="grid-sizer"></li>
                `;

                response.forEach(obj => {
                    newContent += `
                        <li class="grid-item">
                            <a href="#" class="q_btn q_${obj.index}">${obj.title}</a>
                            <div>`;
                    
                    for(let i=0; i<obj.body.length; i++) {
                        newContent += `<p>${obj.body[i]}</p>`;
                    }
                                
                    newContent += 
                            `</div>
                        </li>
                    `;
                });

                grid.innerHTML = newContent;

                // 질문 리스트 masonry
                let msnry = new Masonry(grid, {
                    itemSelector: '.grid-item',
                    columnWidth: '.grid-sizer',
                    percentPosition: true
                });

                imagesLoaded(grid).on('progress', function() { 
                    // layout Masonry after each image loads
                    msnry.layout();
                });

                document.querySelectorAll('.q_btn').forEach(btn => {
                    btn.addEventListener('click', clickE => {
                        clickE.preventDefault();

                        // current 토글 => current인 객체 다시 눌렀을 때
                        if(btn.parentElement.classList.contains('current')) {
                            btn.parentElement.classList.remove('current');
                            msnry.layout();

                        } else {
                            // 기존 current 제거
                            grid.querySelectorAll('li').forEach(el => {
                                if(el.classList.contains('current')) {
                                    el.classList.remove('current');
                                    return false;
                                }
                            });

                            // current 부여
                            btn.parentElement.classList.add('current');
                            msnry.layout();
                        }

                    });
                });
            }
        }
        xhr.open('GET', './data/faq_full.json', true); // 요청을 준비한다.
		xhr.send(null); // 요청을 전송한다
    }

    setContent();
});