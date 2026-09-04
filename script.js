// Pega o index.json e monta o menu
fetch('index.json')
  .then(res => res.json())
  .then(data => {
    document.getElementById('titulo').innerText = data.project;

    const menu = document.getElementById('menu');
    
    data.phases.forEach(fase => {
      const div = document.createElement('div');
      div.className = 'fase';
      div.innerHTML = `
        <h2>${fase.title}</h2>
        <p>${fase.synopsis}</p>
        <p><b>Status:</b> ${fase.status}</p>
      `;
      // Quando clicar na fase, abre o json dela
      div.onclick = () => {
        window.open(fase.file, '_blank');
      }
      menu.appendChild(div);
    });
  });
