export { init };
import { scrolUpOrDown } from './method.js';

const init = () => {
   const header = document.querySelector('.header-little-big');
   const headerStartChangeSelector = header.dataset.headerChangeDirection;
   const changeDirectionElement = document.querySelector(headerStartChangeSelector);
   let changeStart = changeDirectionElement.offsetTop;
   const scroll = scrolUpOrDown();
   const windowHeaderLittleBigScrollHandler = () => {
      if(window.innerWidth < 768){
         header.classList.remove('little-big');
         return;
      }
      const scrollValue = scroll();
      if(scrollValue < 0){
         if(pageYOffset + header.offsetHeight >= changeStart){
            header.classList.add('little-big');
         }
      }else if(scrollValue > 0){
         if(pageYOffset + header.offsetHeight < changeStart){
            header.classList.remove('little-big');
         }
      }
      changeStart = changeDirectionElement.offsetTop;
   };
   const windowHeaderLittleBigResizeHandler = () => {
      changeStart = changeDirectionElement.offsetTop;
      if(window.innerWidth < 768){
         header.classList.remove('little-big');
      }else{
         if(pageYOffset + header.offsetHeight >= changeStart){
            header.classList.add('little-big');
         }
      }
   };
   windowHeaderLittleBigResizeHandler();
   window.addEventListener('resize', windowHeaderLittleBigResizeHandler);
   window.addEventListener('scroll', windowHeaderLittleBigScrollHandler);
};