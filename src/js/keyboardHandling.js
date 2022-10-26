import { fetchPhoto } from '../index';
import { gallery } from '../index';

function keyHandl(input) {
  window.addEventListener('keydown', keyHandling);
  function keyHandling(event) {
    if (event.key.charCodeAt() >= 97 && event.key.charCodeAt() <= 122) {
      input.value += event.key;
    } else if (event.code === 'Enter') {
      fetchPhoto();
    } else if (event.code === 'Backspace') {
      input.value = '';
      gallery.innerHTML = '';
    } else {
      return;
    }
  }

  input.addEventListener('focus', () =>
    window.removeEventListener('keydown', keyHandling)
  );
  input.addEventListener('blur', () =>
    window.addEventListener('keydown', keyHandling)
  );
}
export { keyHandl };
