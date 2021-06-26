// 제대로 연결되었는지 확인하는 용도 
// console.log('JS');

const searchEL = document.querySelector('.search');
const searchInputEl = searchEL.querySelector('input');

searchEL.addEventListener('click', function () {
  //Logic.. 
  searchInputEl.focus();
});
//검색창이 focus되었을 때 
searchInputEl.addEventListener('focus', function () {
    searchEL.classList.add('focused'); //클래스 추가->css에서 조작가능
    searchInputEl.setAttribute('placeholder', '통합검색'); //html 속성 추가
  }) /
  //검색창이 focus에서 벗어났을 때
  searchInputEl.addEventListener('blur', function () {
    searchEL.classList.remove('focused'); //클래스 추가->css에서 조작가능
    searchInputEl.setAttribute('placeholder', ''); //html 속성 추가
  })
const toTopEl = document.querySelector('#to-top');
const badgeEl = document.querySelector('header .badges');
// 브라우저 하나의 창  
window.addEventListener('scroll', _.throttle(function () {
  console.log(window.scrollY);
  if (window.scrollY > 500) {
    //배지 숨기기
    // badgeEl.style.display = 'none';
    //gsap.to(요소,지속시간,옵션);
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none'
    });
    //to-top 버튼 보이기!
    gsap.to(toTopEl,.2,{
      x: 0
    });
    // 문제점 : 시각적으로만 사라졌지 커서를 갖다대면 포인터 로 된다. -> 그 자리에 있긴하다.
  } else {
    //배지 보이기
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block'
    });
    //to-top 버튼 숨기기!
    gsap.to(toTopEl,.2,{
      x: 100
    });
  }
}, 300)); //0.3초 간격 단위로 부하를 줘서 함수를 실행시키겟다.
// _.throttle(함수,시간)
// 문제점 : 스크롤할때마다 함수가 너무많이 호출됨-> 제어를 해줘야됨 
// lodash cdn <-- 검색 후 script 를 따오면 _.throttle()사용가능: 

toTopEl.addEventListener('click', function(){
  gsap.to(window, .7, {
    scrollTo:0  //화면의 위치를 0으로(맨처음으로) 이걸위해 ScrollToPlugin 사용한것
  });
});


const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function (fadeEl, index) {
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7, //0.7 1.4 2.1 2.8
    opacity: 1
  });
});

// SWIPER
// new Swiper(선택자 , 옵션)
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical',
  autoplay: true,
  loop: true
});

new Swiper('.promotion .swiper-container', {
  // 기본값이 horizontal 방향이므로 생략 
  slidesPerView: 3, //한번에 보여줄 슬라이드 개수 
  spaceBetween: 10, //슬라이드 사이 여백 
  centeredSlides: true, //1번 슬라이드가 가운데 보이기  
  loop: true,
  autoplay: {
    delay: 5000 //0.5초 에 한번씩 기본값 3초
  },
  pagination: {
    el: '.promotion .swiper-pagination', //페이지 번호 요소 선택자 
    clickable: true, //사용자의 페이지 번호 요소 제어 가능 여부 
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});

new Swiper('.awards .swiper-container',{
  // direction:'horizontal'
  autoplay: true,
  loop:true,
  spaceBetween:30,
  slidesPerView:5,
  navigation:{
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
})

const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let iSHidePromotion = false;
promotionToggleBtn.addEventListener('click', function () {
  iSHidePromotion = !iSHidePromotion;
  if (iSHidePromotion) {
    // 숨김 처리!
    promotionEl.classList.add('hide');
  } else {
    // 보임 처리!
    promotionEl.classList.remove('hide');
  }
});

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

// 둥둥 떠다니는 아이콘 만들기 
function floatingObject(selector, delay, size) {
  // gsap.to('요소','시간','옵션');
  gsap.to(selector,//선택자
    random(1.5, 2.5), //애니메이션 동작 시간
    {//옵션
      y: size, //y축의미
      repeat: -1, //무한반복
      yoyo: true, //한번 처리된 동작을 반대로 (원상태로) 다시 동작시키는 설정 
      ease: Power1.easeInOut, // 너무 퉁퉁 튀는 느낌이 있어서 easing 사용
      delay: random(0, delay)
    });
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);

// 현재 화면에 요소가 보이는지 안보이는지( 스크롤 여부에 따라 확인 ) -> scrollMagic CDN 검색
const spyEls  = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function(spyEl){
  new ScrollMagic
    .Scene({
      triggerElement: spyEl, //보여짐 여부를 감시할 요소를 지정
      triggerHook:.8, //뷰포트 0.8 지점에 내가 감시한요소가 화면에 보여지는지를 검사.(뷰포트 맨 위0 맨 밑 1)
    })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller());
});

// 올해가 몇년인지 계산 
const thisYear = document.querySelector('.this-year');
thisYear.textContent= new Date().getFullYear(); //2021