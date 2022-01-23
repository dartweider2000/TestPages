export { init };

const init = () => {
   new Swiper('', {
      spaceBetween: 30,
      loop: false,
      autoplay: {
         delay: 3000,
         disableOnInteraction: false,
      },
      pagination: {
         clickable: true,
         el: ''
      },
      navigation: {
         nextEl: '.swiper-button-next',
         prevEl: '.swiper-button-prev'
      },
      on: {
         init: function(swiper){
            console.log(swiper);
         },
         slideChange: function(swiper){
            console.log(swiper);
         }
      }
   });
}