let currentPhase = null;
let currentPage = 0;
let phasesData = [];

async function loadPhases() {
    try {
        const res = await fetch('index.json');
        const data = await res.json();
        phasesData = data.phases;
        document.getElementById('manga-title').innerText = data.title;
        document.getElementById('manga-cover').src = data.cover;
        document.getElementById('manga-desc').innerText = data.description;
        renderPhasesList();
    } catch (e) { console.error("Erro ao carregar index.json", e) }
}

function renderPhasesList() {
    const list = document.getElementById('phases-list');
    list.innerHTML = '';
    phasesData.forEach(phase => {
        const div = document.createElement('div');
        div.className = 'phase-card';
        div.innerHTML = `<h3>${phase.title}</h3><p>${phase.synopsis}</p><p><b>${phase.pages} páginas</b></p><button onclick="openPhase(${phase.id})">Ler</button>`;
        list.appendChild(div);
    });
}

async function openPhase(id) {
    const phase = phasesData.find(p => p.id === id);
    const res = await fetch(phase.file);
    currentPhase = await res.json();
    currentPage = 0;
    document.getElementById('menu-screen').style.display = 'none';
    document.getElementById('reader-screen').style.display = 'block';
    renderPage();
}

function renderPage() {
    const page = currentPhase.pages[currentPage];
    document.getElementById('page-image').src = page.image;
    document.getElementById('page-text').innerText = page.text;
    document.getElementById('page-counter').innerText = `Página ${currentPage + 1} de ${currentPhase.pages.length}`;
    document.getElementById('prev-btn').disabled = currentPage === 0;
    document.getElementById('next-btn').disabled = currentPage === currentPhase.pages.length - 1;
}

function nextPage() { if (currentPage < currentPhase.pages.length - 1) { currentPage++; renderPage(); window.scrollTo(0,0); } }
function prevPage() { if (currentPage > 0) { currentPage--; renderPage(); window.scrollTo(0,0); } }
function backToMenu() { document.getElementById('reader-screen').style.display = 'none'; document.getElementById('menu-screen').style.display = 'block'; }

window.onload = loadPhases;
