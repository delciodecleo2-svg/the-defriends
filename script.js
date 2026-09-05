let mangaData = null;
let paginaAtual = 0;

async function iniciar() {
    try {
        // 1. Carrega o index.json
        let res = await fetch('index.json');
        let index = await res.json();

        document.getElementById('manga-title').innerText = index.title;
        document.getElementById('manga-cover').src = index.cover;
        document.getElementById('manga-desc').innerText = index.description;

        // 2. Carrega a Fase 1 direto
        res = await fetch(index.phases[0].file);
        mangaData = await res.json();

        mostrarPagina();

    } catch (erro) {
        document.body.innerHTML = "<h1>ERRO AO CARREGAR</h1><p>" + erro + "</p>";
        console.error(erro);
    }
}

function mostrarPagina() {
    let pagina = mangaData.pages[paginaAtual];

    document.getElementById('page-image').src = pagina.image;
    document.getElementById('page-text').innerText = pagina.text;
    document.getElementById('page-counter').innerText = `Página ${paginaAtual + 1} / ${mangaData.pages.length}`;

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

window.onload = iniciar;
