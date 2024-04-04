const current = import.meta.env.VITE_PACKAGE_VERSION;
const previous = localStorage.getItem('version');

if (current !== previous) {
  localStorage.setItem('version', current);
  alert(`New version detected ${previous}>${current}!`)
}

export { current, previous };

