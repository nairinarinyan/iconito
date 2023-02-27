export const initIcons = (definitions: string) => {
  const container = document.createElement('div');
  container.classList.add('iconito-icons');
  container.style.display = 'none';
  container.innerHTML = definitions;
  document.body.appendChild(container);
};

export { Icon } from './icon';
