export { init };

const init = () => {
   const header = document.querySelector('.header-drag');
   const block = document.querySelector('.header-padding');
   let hideHeight = document.querySelector('.header-hide').offsetTop;
   header.dataset.position = header.offsetTop;

   const scrolUpOrDown = () => {
      let scroll = pageYOffset;
      const check = () => {
         let scrollNow = pageYOffset;
         let delta = scroll - scrollNow;
         scroll = scrollNow;
         return delta;
      }
      return check;
   };
   const scroll = scrolUpOrDown();
   const windowScrollHandler = () => {
      const setFixed = () => {
         if(pageYOffset <= header.offsetTop + 10 && header.style.position == 'absolute'){
            header.style.position = 'fixed';
            header.style.top = '0px';
            header.style.transform = null;
            header.classList.remove('hide-header');
         }
      }
      if(header.style.position == 'fixed' && header.dataset.clickData){
         header.style.top = pageYOffset + 'px';
         header.style.position = 'absolute';
         header.dataset.clickData = null;
      }
      if(pageYOffset >= header.dataset.position){
         if(header.style.position !== 'absolute'){
            header.style.position = 'fixed';
            block.style.paddingTop = header.offsetHeight + 'px';
         }
         if(pageYOffset + header.offsetHeight >= hideHeight){
            let scrollSign = scroll();
            if(scrollSign > 0){
               setFixed();
            }else if(scrollSign < 0){
               if(!header.classList.contains('hide')){
                  header.classList.add('hide-header');
                  setTimeout(() => {
                     header.style.position = 'absolute';
                     header.style.transform = 'none';
                     header.style.top = pageYOffset - header.offsetHeight + 'px';
                  }, 300);
               }
               if(header.style.position == 'absolute' && pageYOffset >= header.offsetTop + header.offsetHeight){
                  header.style.position = 'absolute';
                  header.style.top = pageYOffset - header.offsetHeight + 'px';
               }
            }else{
               setFixed();
            }
            console.log(scrollSign);
         }else{
            setFixed();
         }
      }else{
         header.style = null;
         header.classList.remove('hide-header');
         block.style = null;
      }
   };
   const windowResiseHandlerShowHideHeader = () => {
      if(header.style.position == 'absolute'){
         header.style.top = pageYOffset + 'px';
      }
      block.style.paddingTop = header.offsetHeight + 'px';
      hideHeight = document.querySelector('.header-hide').offsetTop;
   };
   windowScrollHandler();
   window.addEventListener('scroll', windowScrollHandler);
   window.addEventListener('resize', windowResiseHandlerShowHideHeader);
   header.addEventListener('click', e => {
      header.dataset.clickData = 'has';
      header.style.position = 'fixed';
      header.style.top = '0px';
   });
}