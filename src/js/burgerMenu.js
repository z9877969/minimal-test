const burgerMenu = document.querySelector('.js-burger-menu');

const toggleBurgerMenu = e => {
  if (
    !e.target.classList.contains('js-burger-toggle-btn') &&
    !e.target.closest('button')?.classList.contains('js-burger-toggle-btn')
  ) {
    return;
  }
  console.log("object");
  burgerMenu.classList.toggle('is-open');
  if (burgerMenu.classList.contains('is-open')) {
    burgerMenu.addEventListener('click', closeBurgerClickByLink);
  } else {
    burgerMenu.removeEventListener('click', closeBurgerClickByLink);
  }
};

const closeBurgerClickByLink = e => {
  if (e.target.nodeName !== 'a') return;
  burgerMenu.classList.toggle('is-open');
  burgerMenu.removeEventListener('click', closeBurgerClickByLink);
};

document.body.addEventListener('click', toggleBurgerMenu);
