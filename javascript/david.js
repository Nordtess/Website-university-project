document.addEventListener('DOMContentLoaded', function () {

  // Projects
const list = document.getElementById('project-list');
const filterInput = document.getElementById('filter');
const sortAZ = document.getElementById('sort-az');
const sortZA = document.getElementById('sort-za');

let projects = [];

if (list) {
  axios.get('/data/projects-david.json').then(r => {
    projects = r.data;
    render(projects);
  });

  function render(items) {
    list.innerHTML = items.map(p =>
      `<article><h3>${p.title}</h3><p>${p.description}</p></article>`
    ).join('');
  }

  filterInput.addEventListener('input', () => {
    const text = filterInput.value.toLowerCase();
    const filtered = projects.filter(p => p.title.toLowerCase().includes(text));
    render(filtered);
  });

  sortAZ.addEventListener('click', () => {
    render([...projects].sort((a, b) => a.title.localeCompare(b.title)));
  });

  sortZA.addEventListener('click', () => {
    render([...projects].sort((a, b) => b.title.localeCompare(a.title)));
  });
}

  // Gallery
const gallery = document.getElementById('gallery');
if (gallery) {
  const images = gallery.dataset.images.split(',');
  let index = 0;
  const slide = document.getElementById('slide');

  function showImage() {
    slide.src = images[index];
  }

  document.getElementById('prev').onclick = function () {
    index--;
    if (index < 0) index = images.length - 1;
    showImage();
  };

  document.getElementById('next').onclick = function () {
    index++;
    if (index >= images.length) index = 0;
    showImage();
  };

  showImage();
}


  // Skills
const skills = document.querySelectorAll('#skills .skill');

if (skills.length) {
  function checkScroll() {
    skills.forEach(skill => {
      const rect = skill.getBoundingClientRect();
      const visible = rect.bottom < window.innerHeight && rect.bottom > 0;

      if (visible && !skill.classList.contains('done')) {
        const level = skill.dataset.level || '0';
        skill.querySelector('.fill').style.width = level + '%';
        skill.classList.add('done'); 
      }
    });
  }

  window.addEventListener('scroll', checkScroll);
  checkScroll();
}


});
