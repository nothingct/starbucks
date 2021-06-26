
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
  
// 올해가 몇년인지 계산 
const thisYear = document.querySelector('.this-year');
thisYear.textContent= new Date().getFullYear(); //2021