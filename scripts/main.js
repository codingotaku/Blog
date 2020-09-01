import { mainBlogs } from '/data/blogs.js'

function generateBlogs() {
  const cardHolder = document.getElementById('card-holder');
  let columns = createElement('div', ['columns', 'is-centered']);
  mainBlogs.forEach((blog, i) => {
    console.log(i);
    if (i % 3 === 0) {
      cardHolder.appendChild(columns);
      columns = createElement('div', ['columns', 'is-centered']);
    }
    generateCard(blog, columns);
  });
  cardHolder.appendChild(columns);
}

function generateCard(blog, columns) {
  const column = createElement('div', ['column', 'is-3']);
  const card = createElement('a', ['card', 'box']);
  card.href = blog.path;

  const cardImage = createElement('div', ['card-image']);
  const figure = createElement('div', ['image', 'is-2by1']);
  const img = createElement('img', []);

  img.src = blog.image;

  figure.appendChild(img);
  cardImage.appendChild(figure);
  card.appendChild(cardImage);

  const cardContent = createElement('div', ['card-content']);
  const content = createElement('div', ['content']);
  const title = createElement('span', ['subtitle']);
  const subtitle = createElement('span', ['subtitle', 'is-6']);

  title.innerHTML = blog.title;
  subtitle.innerHTML = blog.subtitle;
  content.appendChild(title);
  content.appendChild(createElement('br', []));
  content.appendChild(subtitle);

  cardContent.appendChild(content);
  card.appendChild(cardContent);
  column.appendChild(card);
  columns.appendChild(column);
}

function createElement(element, classes) {
  let tmpElement = document.createElement(element);
  if (classes.length) {
    tmpElement.classList.add(...classes);
  }
  return tmpElement;
}
generateBlogs();
