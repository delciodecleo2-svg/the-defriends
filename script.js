document.addEventListener('DOMContentLoaded', () => {

  fetch('index.json')
    .then(res => {
      if (!res.ok) throw new Error('Não achou o index.json');
      return res.json();
    })
    .then(data => {
      // 1. Coloca o título do projeto
      document.getElementById('titulo').innerText = data.project;

      const menu = document.getElementById('menu');
      menu.innerHTML = ''; // limpa

      // 2. Para CADA fase no index.json, cria 1 caixa
      data.phases.forEach(fase => {
        const div = document.createElement('div');
        div.className = 'fase';
        
        div.innerHTML = `
          <h2>${fase.title}</h2>
          <p>${fase.synopsis}</p>
          <span class="status">${fase.status}</span>
        `;

        // 3. Quando clicar, abre o arquivo da fase
        div.onclick = () => {
          window.open(fase.file, '_blank');
        }
        
        menu.appendChild(div);
      });
    })
    .catch(err => {
      document.getElementById('titulo').innerText = 'Erro ao carregar';
      console.error(err);
    });

});
