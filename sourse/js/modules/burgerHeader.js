export { init };

const init = () => {
   const burger = document.querySelector('.menu-header__burger');
   const menuBody = document.querySelector('.menu-header__body');
   const burgerClose = () => {
      burger.classList.remove('active');
      menuBody.classList.remove('active');
      document.body.classList.remove('lock');
      document.body.dataset.actives = '';
   }
   const windowResizeHandlerBurger = (e) => {
      if(window.innerWidth >= 768){    
         burgerClose();
      }
   }
   const burgerClickHandler = (e) => {
      burger.classList.toggle('active');
      menuBody.classList.toggle('active');
      document.body.classList.toggle('lock');
      menuBody.scrollTo(0, 0);
      if(burger.classList.contains('active')){
         document.body.dataset.actives = 'burger';
      }else{
         document.body.dataset.actives = '';
      }
   }

   document.addEventListener('click', e => {
      if(!e.target.closest('.header')){
         burgerClose();
      }
      if(document.body.dataset.actives !== 'burger'){
         burgerClose();
      }
   });

   // document.addEventListener('keydown', e => {
   //    if(e.code == 'Escape'){
   //       burgerClose();
   //    }
   // });

   burger.addEventListener('click', burgerClickHandler);
   window.addEventListener('resize', windowResizeHandlerBurger);
};