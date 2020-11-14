import { mainBlogs } from '/data/blogs.js'

function generateBlogs() {
  const cardHolder = document.getElementById('card-holder');
  let rows = createElement('div', []);
  mainBlogs.forEach((blog) => {
    generateCard(blog, rows);
  });
  cardHolder.appendChild(rows);
}

function generateCard(blog, rows) {
  const row = createElement('div', ['is-flex', 'is-justify-content-center']);
  const item = createElement('div', ['column', 'is-4', 'item']);
  const article = createElement('a', ['media']);
  article.href = blog.path;

  const figure = createElement('figure', ['meida-left', 'mr-3']);
  const img = createElement('img', []);
  img.width = '200'
  img.src = blog.image;

  figure.appendChild(img);
  article.appendChild(figure);

  const mediaContent = createElement('div', ['media-content']);
  const content = createElement('div', ['content']);
  const title = createElement('span', ['subtitle' ,'has-text-link']);
  const subtitle = createElement('span', ['subtitle', 'is-6', 'has-text-white']);

  title.innerHTML = blog.title;
  subtitle.innerHTML = blog.subtitle;
  content.appendChild(title);
  content.appendChild(createElement('br', []));
  content.appendChild(subtitle);

  mediaContent.appendChild(content);
  article.appendChild(mediaContent);
  item.appendChild(article);
  row.appendChild(item);
  rows.appendChild(row);
}

function createElement(element, classes) {
  let tmpElement = document.createElement(element);
  if (classes.length) {
    tmpElement.classList.add(...classes);
  }
  return tmpElement;
}
generateBlogs();
