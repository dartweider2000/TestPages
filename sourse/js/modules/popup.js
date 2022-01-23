export { init };

const init = () => {
   const popupLinks = Array.from(document.querySelectorAll('[data-pop]'));
   const lockPadding = Array.from(document.querySelectorAll('.lock-padding'));
   const closeLink = document.querySelectorAll('.close-popup');

   let unlock = true;
   const timeout = 500;

   const changeUnlock = async () => {
      unlock = false;
      setTimeout(() => {
         unlock = true;
      }, timeout);
   };
   const setPadding = paddingValue => {
      if(lockPadding.length){
         lockPadding.forEach(el => el.style.paddingRight = paddingValue);
      }
      document.body.style.paddingRight = paddingValue;
   }
   const bodyLock = () => {
      const scrollWidth = window.innerWidth - document.querySelector('.wrapper').offsetWidth + 'px';
      setPadding(scrollWidth);
      document.body.classList.add('pop-lock');
      changeUnlock();
   }
   const bodyUnlock = () => {
      setPadding('0px');
      document.body.classList.remove('pop-lock');
      changeUnlock();
   };
   const popupClose = (activePopup, doUnlock = true) => {
      if(unlock){
         activePopup.classList.remove('open');
         if(doUnlock){
            bodyUnlock();
         }
      }
      document.body.dataset.actives = '';
   };
   const popupOpen = (currentPopup) => {
      if(currentPopup && unlock){
         const activePopup = document.querySelector('.popup.open');
         if(activePopup){
            popupClose(activePopup, false);
         }else{
            bodyLock();
         }
         currentPopup.classList.add('open');
         currentPopup.scrollTo(0, 0);
         document.body.dataset.actives = 'popup';
      }
   };
   if(popupLinks.length){
      popupLinks.forEach(link => {  
         link.addEventListener('click', e => {
            const currentPopup = document.querySelector(link.dataset.pop);
            popupOpen(currentPopup);
            e.preventDefault();
         });
      });
   }
   if(closeLink.length){
      closeLink.forEach(link => {
         link.addEventListener('click', e => {
            popupClose(e.target.closest('.popup'));
            e.preventDefault();
         });
      });
   }
   document.addEventListener('keydown', e => {
      if(e.code === 'Escape' && document.querySelector('.popup.open')){
         const activePopup = document.querySelector('.popup.open');
         popupClose(activePopup);
      }
   });
   document.addEventListener('click', e => {
      if(!e.target.closest('.popup__content') && document.querySelector('.popup.open')){
         popupClose(e.target.closest('.popup'));
      }
   })
}