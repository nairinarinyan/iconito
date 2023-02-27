export const initIcons = (definitions: string) => {
  const container = document.createElement('div');
  container.classList.add('iconito-icons');
  container.innerHTML = definitions;
  document.body.appendChild(container);
};
