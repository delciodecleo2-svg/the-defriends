let mangaData = null;
let paginaAtual = 0;

// Só roda quando a página inteira carregar
document.addEventListener('DOMContentLoaded', iniciar);

async function iniciar() {
    try {
        // 1. Carrega index.json
        let res = await fetch('index.json');
        if (!res.ok) throw new Error("index.json não encontrado");
        let index = await res.json();

        // 2. Preenche o topo
        document.getElementById('manga-title').innerText = index.title;
        document.getElementById('manga-cover').src = index.cover;
        document.getElementById('manga-desc').innerText = index.description;

        // 3. Carrega a Fase 1
        res = await fetch(index.phases[0].file);
        if (!res.ok) throw new Error("fase1.json não encontrado");
        mangaData = await res.json();

        mostrarPagina();

    } catch (erro) {
        alert("DEU ERRO: " + erro.message);
        console.error(erro);
    }
}

function mostrarPagina() {
    if (!mangaData) return; // proteção

    let pagina = mangaData.pages[paginaAtual];

    document.getElementById('page-image').src = pagina.image;
    document.getElementById('page-text').innerText = pagina.text;
    document.getElementById('page-counter').innerText = `Página ${paginaAtual + 1} de ${mangaData.pages.length}`;

    document.getElementById('btn-anterior').style.display = paginaAtual === 0? 'none' : 'inline-block';
    document.getElementById('btn-proximo').style.display = paginaAtual === mangaData.pages.length - 1? 'none' : 'inline-block';
}

function proxima() {
    if (paginaAtual < mangaData.pages.length - 1) {
        paginaAtual++;
        mostrarPagina();
        window.scrollTo(0,0);
    }
}

function anterior() {
    if (paginaAtual > 0) {
        paginaAtual--;
        mostrarPagina();
        window.scrollTo(0,0);
    }
}
