const index = document.querySelector('section.index');
const buttons = index.querySelectorAll('input');
const modal = document.querySelector('.modal');
console.log(buttons);

buttons[1].addEventListener('click', () => {
  index.classList.add('hidden');
  modal.classList.remove('hidden');
  modal.classList.add('show');
});
