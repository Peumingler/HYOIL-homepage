document.addEventListener('DOMContentLoaded', () => {

    // "navbar-burger" 엘리먼트를 전부 가져옴
    const $navbarBurgers = Array.prototype.slice.call(document.querySelectorAll('.navbar-burger'), 0);
  
    // 엘리먼트가 있는지 확인
    if ($navbarBurgers.length > 0) {
  
      // 각 엘리먼트마다 eventListner 추가
      $navbarBurgers.forEach( el => {
        el.addEventListener('click', () => {
  
          // Get the target from the "data-target" attribute
          const target = el.dataset.target; //dataset.target은 html에서 data-target 값을 가리킴
          const $target = document.getElementById(target);
  
          // Toggle the "is-active" class on both the "navbar-burger" and the "navbar-menu"
          el.classList.toggle('is-active');
          $target.classList.toggle('is-active');
  
        });
      });
    }
  
  });