let faseAtual = null;
let paginaAtual = 0;

document.addEventListener('DOMContentLoaded', () => {
  carregarMenu();
});

function carregarMenu() {
  fetch('index.json')
    .then(res => res.json())
    .then(data => {
      document.getElementById('titulo').innerText = data.project;
      const menu = document.getElementById('menu');
      menu.innerHTML = '';
      
      data.phases.forEach(fase => {
        const div = document.createElement('div');
        div.className = 'fase';
        div.innerHTML = `
          <h2>${fase.title}</h2>
          <p>${fase.synopsis}</p>
          <span class="status">${fase.status}</span>
        `;
        div.onclick = () => abrirFase(fase.file, fase.title);
        menu.appendChild(div);
      });
    });
}

function abrirFase(arquivo, titulo) {
  document.getElementById('menu').style.display = 'none';
  document.getElementById('leitor').style.display = 'block';
  document.getElementById('voltarMenu').style.display = 'inline-block';
  document.getElementById('tituloFase').innerText = titulo;
  document.querySelector('.sub').style.display = 'none';

  fetch(arquivo)
    .then(res => res.json())
    .then(data => {
      faseAtual = data.pages; // pega o array de páginas
      paginaAtual = 0;
      mostrarPagina();
    });
}

function mostrarPagina() {
  document.getElementById('pagina').innerText = faseAtual[paginaAtual];
  document.getElementById('numPagina').innerText = `Página ${paginaAtual + 1} de ${faseAtual.length}`;
  document.getElementById('btnAnterior').disabled = paginaAtual === 0;
  document.getElementById('btnProximo').disabled = paginaAtual === faseAtual.length - 1;
}

function proximaPagina() {
  if (paginaAtual < faseAtual.length - 1) {
    paginaAtual++;
    mostrarPagina();
  }
}

function paginaAnterior() {
  if (paginaAtual > 0) {
    paginaAtual--;
    mostrarPagina();
  }
}

function voltarMenu() {
  document.getElementById('menu').style.display = 'flex';
  document.getElementById('leitor').style.display = 'none';
  document.getElementById('voltarMenu').style.display = 'none';
  document.querySelector('.sub').style.display = 'block';
  carregarMenu();
}
