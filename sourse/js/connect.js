export { init };
import * as showHideHeader from './modules/showHideHeader.js';
import * as burgerHeader from './modules/burgerHeader.js';
import { scrolUpOrDown, ibg, isMobile, platform, slideUp, slideDown, slideToggle } from './modules/method.js';
import * as swiperSlider from './modules/slider-swiper.js';
import * as dinamicAdaptive from './modules/dinamicAdaptive.js';
import * as popup from './modules/popup.js';
import * as littleBigHeader from './modules/littleBigHeader.js';
import * as spoiler from './modules/spoiler.js';

const init = () => {
  //различные полезные функции
  //scrolUpOrDown: возврашщает функцию scroll через замыкание
  //scroll: 
  //если возвращает -1 => движение ползунка вниз,
  //если возвращает 1 => движение ползунка вверх,
  //если возвращает 0 => стоит на месте.
  //ibg: адаптив изображений.
  //isModile: узнать с какого устройства пользовать зашёл.
  //platform: с пк или мобилка
  //slideUp: плавно скрывает обЪект движением вверх
  //slideDown: плавно открывает объект движением вниз
  //slideToggle: и скрывает и раскрывает объект

  //инициализация иконки бургера для Header, навешевание классов. Метод init() запускает инициализацию
  //Нужны классы .burger и .menu__body
  //Html тегу body задаётся класс .lock и атрибут data-actives он задаётся как burger !!!!!!!!!!!!!!!!!
  //burgerHeader.init();

  //инициализировать динамический адаптив;
  //задать объекту который надо переместить data атрибут: data-ad;
  //форма записи: data-ad="(1)селектор элемента, относительно которого будет происходить перемещение,(2)ширина, на которой должно 
  //произойти перемещение,(3)позиция, на которую переместится элемент относительно элемента из пункта 1." 
  //доступные значения :
  //prepend - вначало коллекции children
  //append - вконец коллекции children
  //after - после элемента
  //before - перед элементом
  //числовое значение - вставляет элемент в произвольное место коллекции children, после children[числовое__значение - 1]
  // dinamicAdaptive.init();

  //инициализация SwiperSlider с некоторыми заданными параметрами. Метод init() запускает инициализацию
  // swiperSlider.init();

  //инициализировать popup. Метод init() запускает инициализацию.
  //у ссылка, после нажатия на которую должен всплывать popup должна иметь при себе атрибут data-pop.
  //внутри этого атрибута должен быть селектор попапа, который должен всплывать. Это должен быть уникальный селектор.
  //элементам с position: fixed должен задаваться класс lock-padding
  //элемент, после нажати на который попап должен закрываться должен иметь класс close-popup
  //при всплыватии попапа html элемент body получает класс pop-lock
  //каждый попап должен иметь установленную структуру .popup>.popup__body>.popup__content
  //Html тегу body задаётся атрибут data-actives он задаётся как popup !!!!!!!!!!
  // popup.init();

  //инициализировать showHideHeader. Метод init() запускает инициализацию.
  //Фиксированная шапка: .header-drag; Так же щапке даётся класс .hide-header, 
  //который отвечает за исчезновение шапки transition: transform 0.3s ease 0s; transform: translate(0, -100%),
  //header имеет data атрибут data-header-hide; значение:
  //уникальный селектор, объекта с верхушки кторого шапка начнёт пропадать,
  //showHideHeader.init();

  //инициализировать littleBigHeader. Метод init() запускает инициализия.
  //Пропадающая шапка должна иметь класс .header-little-big
  //header должен иметь data атрибут data-header-change-direction,
  //он должен иметь селектор элемента, начиная с которого будет проиходить что-то)
  //шапке задаётся класс .little-big
  //littleBigHeader.init();

  //инициализировать спойлер. Метод init() запускает инициализацию.
  //структура спойлера Спойлер_блок(где все спойлеры)>обёртка спойлера>Кнопка_спойлера(Заголовок) и Тело_спойлера
  //спойлер блок имеет data аттрибут data-spoilers.Если нужен аккордеон, то добавляет ещё один data аттрибут data-one-spoiler
  //data-spoilers может иметь нуль параметров, 1 или 2.
  //Если имеет 0 параметров, то спойлеры будут инициализированы сразу,
  //Если имеет 1 параметр(это ширина), то на этой ширине экрана спойлер будет активизирован(тут решает 2-ой параметр)
  //Если имеет 2 параметра. Это тип mtdia запроса max или min
  //Сразу после инициализации блоку спойлеров будет задан класс init 
  //Заголовок спойлера имеет data аттрибут data-spoiler
  spoiler.init();
};