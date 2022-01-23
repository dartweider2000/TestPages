export { scrolUpOrDown, ibg, isMobile, platform, slideUp, slideDown, slideToggle };

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

const ibg = () => {
   const array = Array.from(document.querySelectorAll('.ibg'));
   if(array)
      array.forEach(element => element.style['background-image'] = `url('${element.querySelector('img').getAttribute('src')}')`);
};

const isMobile = {
   Android: function(){
      return navigator.userAgent.match(/Android/i);
   },
   BlackBerry: function(){
      return navigator.userAgent.match(/BlackBerry/i);
   },
   iOS: function(){
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
   },
   Opera: function(){
      return navigator.userAgent.match(/Opera Mini/i);
   },
   Windows: function(){
      return navigator.userAgent.match(/IMobile/i);
   },
   any: function(){
      return(
         isMobile.Android() ||
         isMobile.BlackBerry() ||
         isMobile.Opera() ||
         isMobile.iOS() ||
         isMobile.Windows()
      )
   } 
};

const platform = () => {
   if(isMobile.any())
      document.body.classList.add('_touch');
   else
      document.body.classList.add('_mouse');
}

const slideUp = (target, duration = 500) => {
   if(!target.classList.contains('slide')){
      target.classList.add('slide');
      target.style.transitionProperty = 'height, padding, margin';
      target.style.transitionDuration = duration + 'ms';
      target.style.height = target.offsetHeight + 'px';
      target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      setTimeout(() => {
         target.hidden = true;
         target.style.removeProperty('height');
         target.style.removeProperty('overflow');
         target.style.removeProperty('padding-top');
         target.style.removeProperty('padding-bottom');
         target.style.removeProperty('margin-top');
         target.style.removeProperty('margin-bottom');
         target.style.removeProperty('transition-duration');
         target.style.removeProperty('transition-property');
         target.classList.remove('slide');
      }, duration);
   }
}

const slideDown = (target, duration = 500) => {
   if(!target.classList.contains('slide')){
      target.classList.add('slide');
      if(target.hidden){
         target.hidden = false;
      }
      let height = target.offsetHeight;
      target.style.overflow = 'hidden';
      target.style.height = 0;
      target.style.paddingTop = 0;
      target.style.paddingBottom = 0;
      target.style.marginTop = 0;
      target.style.marginBottom = 0;
      target.offsetHeight;
      target.style.transitionProperty = 'height, padding, margin';
      target.style.transitionDuration = duration + 'ms';
      target.style.height = height + 'px';
      target.style.removeProperty('padding-top');
      target.style.removeProperty('padding-bottom');
      target.style.removeProperty('margin-top');
      target.style.removeProperty('margin-bottom');
      setTimeout(() => {
         target.style.removeProperty('height');
         target.style.removeProperty('overflow');
         target.style.removeProperty('transition-duration');
         target.style.removeProperty('transition-property');
         target.classList.remove('slide');
      }, duration);
   }
}

const slideToggle = (target, duration = 500) => {
   if(target.hidden){
      slideDown(target, duration);
   }else{
      slideUp(target, duration);
   }
}