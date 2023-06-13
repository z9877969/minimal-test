const galleryContainer = document.querySelector('.js-gallery-our-products');
const galleryList = galleryContainer.querySelector('ul');
const slider = document.querySelector('.js-slider-our-products');
const sliderLine = slider.querySelector('.js-slider-line');
const sliderThumb = slider.querySelector('.js-slider-thumb');
const itemsCollection = galleryList.children;
const itemsNum = itemsCollection.length;
const firstActiveItem = itemsCollection[0];

const visibleItems =
  galleryContainer.clientWidth / galleryContainer.scrollWidth;
const sliderThumbPercentWidth = 1 - visibleItems;

firstActiveItem.classList.add('js-active');
sliderThumb.style.width = sliderThumbPercentWidth + '%';
const sliderThumbWidth = sliderThumb.clientWidth;

const startActiveItem = (prevActiveItem, nextActiveItem) => {
  prevActiveItem.classList.toggle('js-active');
  nextActiveItem.classList.toggle('js-active');
  nextActiveItem.scrollIntoView({ inline: 'start', behavior: 'smooth' });
};

const getActiveItemIdx = () => {
  return [...itemsCollection].findIndex(el =>
    el.classList.contains('js-active')
  );
};

slider.addEventListener('click', function (e) {
  let button = e.target.closest('button');
  if (button.nodeName !== 'BUTTON') {
    button = e.target;
    if (button.nodeName !== 'BUTTON') return;
  }

  const { action } = button.dataset;
  const activeItem = galleryList.querySelector('.js-active');
  if (action === 'next') {
    if (activeItem === galleryList.lastElementChild) {
      console.log('lastElement');
      return;
    }
    const canMoveToNext =
      galleryContainer.scrollWidth -
        (galleryContainer.scrollLeft + galleryContainer.clientWidth) >
      0;

    if (!canMoveToNext) {
      const itemWidth = itemsCollection[0].clientWidth;
      const activeItemIdx =
        itemsNum - Math.floor(galleryContainer.clientWidth / itemWidth);
      const nextActiveItem = itemsCollection[activeItemIdx];
      if (nextActiveItem === activeItem) return;
      activeItem.classList.toggle('js-active');
      nextActiveItem.classList.toggle('js-active');
      return;
    }

    const nextActiveItem = activeItem.nextElementSibling;
    startActiveItem(activeItem, nextActiveItem);
  }
  if (action === 'prev') {
    if (activeItem === galleryList.firstElementChild) {
      console.log('firstElement');
      return;
    }
    const nextActiveItem = activeItem.previousElementSibling;
    startActiveItem(activeItem, nextActiveItem);
  }
  const activeItemIdx = getActiveItemIdx();
  sliderThumb.style.transform = `translate(${
    activeItemIdx * Number(sliderThumbWidth)
  }px , 0)`;
});
