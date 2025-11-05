document.addEventListener('DOMContentLoaded', () => {
  // Slideshow
  const img  = document.getElementById('gallery-image');
  const prev = document.getElementById('gal-prev');
  const next = document.getElementById('gal-next');
  if (img && prev && next) {
    const images = ['../img/bild1.png','../img/bild2.png','../img/bild3.png','../img/bild4.png'];
    let i = 0;
    const show = n => { i = (n + images.length) % images.length; img.src = images[i]; };
    prev.addEventListener('click', () => show(i - 1));
    next.addEventListener('click', () => show(i + 1));
  }

  // Projects
  const list = document.getElementById('projects-list');
  if (list && typeof axios !== 'undefined') {
    axios.get('../data/projects.json')
      .then(res => {
        list.innerHTML = res.data.map(p => `
          <article class="proj-card">
            <h3>${p.title}</h3>
            <p class="proj-client">Client: ${p.client}</p>
            <p>${p.desc}</p>
          </article>`).join('');
      })
      .catch(err => {
        console.error(err);
        list.innerHTML = '<p>Could not load projects (check path/server).</p>';
      });
  }
});
