import { slideUp, slideToggle } from './method.js';
export { init };

const init = () => {
   const spoilerBlocks = Array.from(document.querySelectorAll('[data-spoilers]'));
   const mediaBlocksArray = [];
   if(spoilerBlocks.length){
      const [regularSpoilerBlocks, mediaSpoilerBlocks] = spoilerBlocks.reduce((result, spoilerBlock) => {
         if(!spoilerBlock.dataset.spoilers.split(',')[0]){
            result[0].push(spoilerBlock);
         }else{
            result[1].push(spoilerBlock);
         }
         return result;
      }, [[], []]);
      if(regularSpoilerBlocks.length){
         regularSpoilerBlocks.forEach(spoilerBlock => {
            initSpoilerBlock(spoilerBlock);   
         });
      }

      if(mediaSpoilerBlocks.length){
         mediaSpoilerBlocks.forEach(spoilerBlock => {
            const data = spoilerBlock.dataset.spoilers.split(',').map(param => param.trim());
            const blockData = {};
            blockData.width = data[0];
            blockData.type = data[1] ? data[1] : 'max';
            blockData.spoilerBlock = spoilerBlock;
            blockData.breakpoint = `(${blockData.type}-width: ${blockData.width}px)`;
            blockData.mediaQuery = window.matchMedia(blockData.breakpoint);
            blockData.mediaQuery.addListener(() => {
               if(blockData.mediaQuery.matches){
                  initSpoilerBlock(blockData.spoilerBlock);
               }else{
                  hideSpoilerBlock(blockData.spoilerBlock);
               }
            });
            mediaBlocksArray.push(blockData);  
         }); 
      }
   }

   function hideSpoilerBlock(spoilerBlock){
      const spoilerButtons = spoilerBlock.querySelectorAll('[data-spoiler]');
      if(spoilerButtons.length){
         spoilerBlock.classList.remove('init');
         spoilerButtons.forEach(spoilerButton => {
            hideSpoilerBody(spoilerButton);
         });
      }
   }

   function buttonClickHandler(e){
      const el = e.target;
      if(el.closest('[data-spoiler]') && !el.closest('[data-spoiler]').nextElementSibling.classList.contains('slide')){
         if(el.closest('[data-one-spoiler]')){
            if(el.closest('[data-one-spoiler]').querySelector('[data-spoiler].active')){
               const activeSpoiler = el.closest('[data-one-spoiler]').querySelector('[data-spoiler].active');
               if(!activeSpoiler.nextElementSibling.classList.contains('slide')){
                  hideSpoilerBody(activeSpoiler, false);
                  slideUp(activeSpoiler.nextElementSibling);
                  if(el.closest('[data-spoiler]') !== activeSpoiler){
                     el.closest('[data-spoiler]').classList.toggle('active');
                     slideToggle(el.closest('[data-spoiler]').nextElementSibling);
                  }
               }
            }else{
               el.closest('[data-spoiler]').classList.toggle('active');
               slideToggle(el.closest('[data-spoiler]').nextElementSibling);
            }
         }else{
            el.closest('[data-spoiler]').classList.toggle('active');
            slideToggle(el.closest('[data-spoiler]').nextElementSibling);
         }
      }
   }

   function initSpoilerBlock(spoilerBlock){
      const spoilerButtons = Array.from(spoilerBlock.querySelectorAll('[data-spoiler]'));
      if(spoilerButtons.length){
         spoilerBlock.classList.add('init');
         spoilerButtons.forEach(spoilerButton => {
            initSpoilerBody(spoilerButton);
            spoilerButton.addEventListener('click', buttonClickHandler);
         });
      }
   }

   function initSpoilerBody(spoilerButton){
      if(!spoilerButton.classList.contains('active')){
         spoilerButton.nextElementSibling.hidden = true;
      }else{
         spoilerButton.nextElementSibling.hidden = false;
      }
   }

   function hideSpoilerBody(spoilerButton, removeListener = true){
      spoilerButton.nextElementSibling.hidden = false;
      spoilerButton.classList.remove('active');
      if(removeListener)
         spoilerButton.removeEventListener('click', buttonClickHandler);
   }

   window.addEventListener('load', e => {
      mediaBlocksArray.forEach(blockData => {
         if(blockData.mediaQuery.matches){
            initSpoilerBlock(blockData.spoilerBlock);
         }else{
            hideSpoilerBlock(blockData.spoilerBlock);
         }
      });
   });
};