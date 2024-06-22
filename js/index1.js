document.addEventListener('DOMContentLoaded', function() {
    const box = document.querySelector('.box');
    const elements = document.querySelectorAll('.pizza, .com, .car, .game');
    const texts = {
        'pizza': [document.querySelector('.click-text2'), document.querySelector('.click-text2-2')],
        'com': [document.querySelector('.click-text3'), document.querySelector('.click-text3-2')],
        'car': [document.querySelector('.click-text4'), document.querySelector('.click-text4-2')],
        'game': [document.querySelector('.click-text5'), document.querySelector('.click-text5-2')]
    };
    const moveStep = 10;
    const scaleMultiplier = 1.5;

    box.style.left = '0px';
    box.style.bottom = '0px';

    console.log('box:', box);
    console.log('elements:', elements);
    console.log('texts:', texts);

    function moveBox(dx, dy) {
        const currentLeft = parseInt(box.style.left, 10) || 0;
        const currentBottom = parseInt(box.style.bottom, 10) || 0;
        const newLeft = currentLeft + dx;
        const newBottom = currentBottom + dy;

        const wrapRect = box.parentElement.getBoundingClientRect();
        const boxRect = box.getBoundingClientRect();

        if (newLeft >= 0 && newLeft + boxRect.width <= wrapRect.width) {
            box.style.left = `${newLeft}px`;
        }

        if (newBottom >= 0 && newBottom + boxRect.height <= wrapRect.height) {
            box.style.bottom = `${newBottom}px`;
        }

        console.log(`Moved to: ${newLeft}px, ${newBottom}px`);
        checkOverlap();
    }

    function checkOverlap() {
        elements.forEach(el => {
            const elRect = el.getBoundingClientRect();
            const boxRect = box.getBoundingClientRect();
            const className = el.className.split(' ')[0];
            const clickTexts = texts[className];

            const overlap = !(boxRect.right < elRect.left || 
                              boxRect.left > elRect.right || 
                              boxRect.bottom < elRect.top || 
                              boxRect.top > elRect.bottom);

            if (overlap) {
                el.classList.add('scale-up');
                clickTexts.forEach(clickText => clickText.style.display = 'block');
            } else {
                el.classList.remove('scale-up');
                clickTexts.forEach(clickText => clickText.style.display = 'none');
            }
        });
    }

    document.addEventListener('keydown', function(event) {
        switch(event.key) {
            case 'ArrowLeft':
                moveBox(-moveStep, 0);
                break;
            case 'ArrowRight':
                moveBox(moveStep, 0);
                break;
            case 'ArrowUp':
                moveBox(0, moveStep);
                break;
            case 'ArrowDown':
                moveBox(0, -moveStep);
                break;
        }
    });
});



//게이지바

document.addEventListener('DOMContentLoaded', () => {
    const skills = [
        { id: 0, percentage: 75 },
        { id: 1, percentage: 60 },
        { id: 2, percentage: 85 },
        { id: 3, percentage: 70 }
    ];

    const delay = 1000; // 1초 딜레이
    const duration = 3000; // 각 게이지 바가 채워지는 시간 (3초)
    const pauseDuration = 7000; // 7초 멈춤 시간

    function fillGauges() {
        skills.forEach((skill, index) => {
            const gauge = document.querySelectorAll('.fill')[skill.id];
            gauge.style.transition = `width ${duration}ms ease-out`;
            gauge.style.width = `${skill.percentage}%`;
        });

        setTimeout(resetGauges, pauseDuration); // 7초 동안 멈춤
    }

    function resetGauges() {
        skills.forEach((skill, index) => {
            const gauge = document.querySelectorAll('.fill')[skill.id];
            gauge.style.transition = 'none'; // 전환 효과 제거
            gauge.style.width = '0%'; // 초기 상태로 복원
        });

        setTimeout(fillGauges, delay); // 일정 딜레이 후에 다시 실행
    }

    fillGauges(); // 처음 실행
});








//모달창

document.addEventListener('DOMContentLoaded', function() {
    const modalBtns = document.querySelectorAll('.modal-btn');
    const modals = document.querySelectorAll('.modal');
    const headerText = document.getElementById('header');
    const background = document.querySelector('.background');

    modalBtns.forEach(function(modalBtn) {
        modalBtn.addEventListener('click', function(event) {
            event.preventDefault();
            const modalId = modalBtn.dataset.modalId;
            modals.forEach(function(modal) {
                if (modal.id === modalId) {
                    modal.style.display = 'block';
                    const modalContent = modal.querySelector('.modal-content');
                    // 모달 창의 크기를 background와 동일하게 설정
                    modalContent.style.width = background.offsetWidth + 'px';
                    modalContent.style.height = background.offsetHeight + 'px';
                    // 모달 창의 위치를 background와 동일하게 설정
                    modalContent.style.top = background.getBoundingClientRect().top + 'px';
                    modalContent.style.left = background.getBoundingClientRect().left + 'px';
                } else {
                    modal.style.display = 'none';
                }
            });
            headerText.style.visibility = 'hidden'; // 헤더 텍스트 숨기기
        });
    });

    // 모달 외부를 클릭했을 때 닫기
    window.addEventListener('click', function(event) {
        modals.forEach(function(modal) {
            if (event.target === modal) {
                modal.style.display = 'none';
                headerText.style.visibility = 'visible'; // 헤더 텍스트 보이기
            }
        });
    });
});



//스위치 버튼

document.addEventListener('DOMContentLoaded', function() {
    // 체크박스 입력 요소 가져오기
    const switchInput = document.querySelector('#switch .switch-button input');

    // body 배경색을 변경하는 함수
    function updateBodyBackgroundColor() {
        if (switchInput.checked) {
            document.body.style.backgroundColor = 'black';
        } else {
            document.body.style.backgroundColor = 'white';
        }
    }

    // 체크박스 상태 변경 시 함수 호출
    switchInput.addEventListener('change', updateBodyBackgroundColor);

    // 초기 배경색 설정
    updateBodyBackgroundColor();
});



document.addEventListener('DOMContentLoaded', function() {
    const switchInput = document.querySelector('#switch .switch-button input');

    function updateStylesForDarkMode(enable) {
        const textElements = document.querySelectorAll('h4, #header, #h3-text, .text, #yearin');
        const gaugeBarFills = document.querySelectorAll('.fill');
        const h1Text = document.querySelector('h1');
        const s1Text = h1Text.querySelector('.s1');
        const s2Text = h1Text.querySelector('.s2');
        const ppElements = document.querySelectorAll('.pp');

        if (enable) {
            document.body.style.backgroundColor = 'black';
            textElements.forEach(el => el.style.color = 'white');
            gaugeBarFills.forEach(fill => fill.style.backgroundColor = 'white');
            h1Text.style.color = 'white'; // "저는"과 "입니다" 텍스트 색상 흰색으로
            if (s1Text) {
                s1Text.style.color = '#f2d522'; // 노랑색
            }
            if (s2Text) {
                s2Text.style.color = 'black'; // 배경색과 같게
            }
            ppElements.forEach(pp => pp.style.color = 'white'); // .pp 색상 흰색으로 변경
        } else {
            document.body.style.backgroundColor = 'white';
            textElements.forEach(el => el.style.color = ''); // 기본 텍스트 색상으로 리셋
            gaugeBarFills.forEach(fill => fill.style.backgroundColor = ''); // 기본 색상으로 리셋
            h1Text.style.color = ''; // 기본 색상으로 리셋
            if (s1Text) {
                s1Text.style.color = ''; // 기본 색상으로 리셋
            }
            if (s2Text) {
                s2Text.style.color = ''; // 기본 색상으로 리셋
            }
            ppElements.forEach(pp => pp.style.color = ''); // 기본 색상으로 리셋
        }
    }

    switchInput.addEventListener('change', function() {
        updateStylesForDarkMode(switchInput.checked);
    });

    // 초기 스타일 설정
    updateStylesForDarkMode(switchInput.checked);
});
