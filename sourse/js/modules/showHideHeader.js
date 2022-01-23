export { init };
import { scrolUpOrDown } from './method.js';

const init = () => {
   const header = document.querySelector('.header-drag');
   const dataTop = header.dataset.headerHide.trim();
   const scroll = scrolUpOrDown();
   let hideTop = document.querySelector(dataTop).offsetTop;
   header.dataset.position = header.offsetTop;
   let isResize = false; 
   let justLoad = true;
   const windowScrollHeaderHandler = () => {
      const scrollValue = scroll();
      if(scrollValue < 0 && !justLoad){
         if(pageYOffset + header.offsetHeight >= hideTop && !isResize){
            header.classList.add('hide-header');
         }
         isResize = false;
      }else if(scrollValue > 0){
         header.classList.remove('hide-header');
      }
      justLoad = false;
      hideTop = document.querySelector(dataTop).offsetTop;
   }
   const windowResizeHeaderHandler = () => {
      hideTop = document.querySelector(dataTop).offsetTop;
      header.classList.remove('hide-header');
      isResize = true;
   }
   windowResizeHeaderHandler();
   window.addEventListener('scroll', windowScrollHeaderHandler);
   window.addEventListener('resize', windowResizeHeaderHandler);
};