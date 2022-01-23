export {init};

const init = () => {
   const adpativElements = Array.from(document.querySelectorAll('[data-ad]'));
   const adaptiveElementsDataArray = [];
   const validOrder = (order) => {
      const mayBeNaN = +order;
      if(isNaN(mayBeNaN))
         return order;
      else
         return mayBeNaN;
   };
   const orderInParent = (element) => {
      const children = Array.from(element.parentElement.children);
      return children.reduce((result, child, index) => {
         if(result !== null)
            return result;
         if(child === element)
            result = index;
         return result;
      }, null);
   };
   const windowResizeHandler = () => {
      adaptiveElementsDataArray.forEach(el => {
         if(el.brackpoint >= window.innerWidth && !el.element.classList.contains('_done')){
            if(el.in.order === 0 || el.in.order === 'prepend'){
               el.in.place.prepend(el.element);
            }else if(el.in.order === 'append'){
               el.in.place.append(el.element);
            }else if(el.in.order === 'before'){
               el.in.place.before(el.element);
            }else if(el.in.order === 'after'){
               el.in.place.after(el.element);
            }else{
               if(el.in.place.children.length < el.in.order)
                  el.in.place.append(el.element);
               else if (el.in.order < 0)
                  el.in.place.prepend(el.element);
               else
                  el.in.place.children[el.in.order - 1].after(el.element);
            }
            el.element.classList.add('_done');
         }else if(el.brackpoint < window.innerWidth && el.element.classList.contains('_done')){
            if(el.back.order === 0){
               el.back.parent.prepend(el.element);   
            }else{
               el.back.parent.children[el.back.order - 1].after(el.element);
            }
            el.element.classList.remove('_done');
         }
      });
   }
   adpativElements.forEach(adaptiveElement => {
      const dataArray = adaptiveElement.dataset.ad.split(',').map(attr => attr.trim());
         const info = {
            in : {
               place: document.querySelector(dataArray[0]),
               order: validOrder(dataArray[2]),
            },
            back : {
               parent: adaptiveElement.parentElement,
               order: orderInParent(adaptiveElement),
            },
            element : adaptiveElement,
            brackpoint: +dataArray[1],
         } 
         adaptiveElementsDataArray.push(info);
   });
   windowResizeHandler();
   window.addEventListener('resize', windowResizeHandler);
}