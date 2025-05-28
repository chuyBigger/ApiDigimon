// Elementos del DOM
const bannerElement = document.getElementById("digimon-banner");
const todosDigimonContainer = document.getElementById("digimon-lista-todos");
const porNivelContainer = document.getElementById("vista-por-nivel-container");
const digimonListaNivelContainer = document.getElementById("digimon-lista-nivel");
const submenuNiveles = document.getElementById("submenu-niveles");
const resultadosBusquedaContainer = document.getElementById("digimon-lista-resultados");
const bannerSection = document.getElementById("banner-section");
const sortControlsContainer = document.querySelector(".sort-controls-container");

const menuItemTodos = document.getElementById("menu-item-todos");
const menuItemPorNivel = document.getElementById("menu-item-por-nivel");
const searchInput = document.getElementById("search-input");
const searchButton = document.getElementById("search-button");
const sortLevelAlphaAscButton = document.getElementById("sort-level-alpha-asc");
const sortLevelAlphaDescButton = document.getElementById("sort-level-alpha-desc");

let listaDigimones = [];
let currentSelectedLevel = null;
let levelSortOrder = 'none';

// --- Configuración del Carrusel ---
const CAROUSEL_SIZE = 5;
const ROTATION_INTERVAL = 5000; // 5 segundos
let carouselDigimons = [];
let centralIndex = Math.floor(CAROUSEL_SIZE / 2);
let rotationTimerId = null;
let carouselTrackElement = null;

// --- Carga Inicial de Digimon ---
document.addEventListener("DOMContentLoaded", () => {
    fetch("/digimon")
        .then(res => res.json())
        .then(data => {
            listaDigimones = Object.values(data).flat().filter(d => d.name && d.level && d.img);
            if (listaDigimones.length > 0) {
                inicializarCarrusel();
            } else if (bannerElement) {
                bannerElement.innerHTML = "<p>No hay Digimon para mostrar en el carrusel.</p>";
            }
            activarVistaTodos();
        })
        .catch(err => {
            console.error("Error al cargar los Digimon:", err);
            if (bannerElement) {
                bannerElement.innerHTML = "<p>Error al cargar Digimon para el carrusel.</p>";
            }
        });

    // Event Listeners (con comprobación de existencia de elementos)
    if (menuItemTodos) menuItemTodos.addEventListener("click", activarVistaTodos);
    if (menuItemPorNivel) menuItemPorNivel.addEventListener("click", activarVistaPorNivel);
    if (searchButton) searchButton.addEventListener("click", manejarBusqueda);
    if (searchInput) searchInput.addEventListener("keypress", (event) => {
        if (event.key === "Enter") manejarBusqueda();
    });
    if (sortLevelAlphaAscButton) sortLevelAlphaAscButton.addEventListener("click", () => setLevelSortOrder('asc'));
    if (sortLevelAlphaDescButton) sortLevelAlphaDescButton.addEventListener("click", () => setLevelSortOrder('desc'));
});

// --- Funciones del Carrusel ---
function inicializarCarrusel() {
    if (listaDigimones.length === 0 || !bannerElement) return;
    stopCarouselRotation();

    const shuffled = [...listaDigimones].sort(() => 0.5 - Math.random());
    carouselDigimons = shuffled.slice(0, Math.min(CAROUSEL_SIZE, listaDigimones.length));

    const actualCarouselSize = carouselDigimons.length;
    centralIndex = Math.floor(actualCarouselSize / 2);

    if (actualCarouselSize < 3) {
        bannerElement.innerHTML = "";
        carouselDigimons.forEach(digimon => {
            const card = crearTarjetaDigimonCarousel(digimon, false);
            bannerElement.appendChild(card);
        });
        return;
    }

    renderizarCarrusel();
    startCarouselRotation();

    bannerElement.addEventListener('mouseenter', stopCarouselRotation);
    bannerElement.addEventListener('mouseleave', startCarouselRotation);
}

function renderizarCarrusel() {
    if (!bannerElement) return;
    bannerElement.innerHTML = "";

    carouselTrackElement = document.createElement('div');
    carouselTrackElement.className = 'carousel-track';

    carouselDigimons.forEach((digimon, index) => {
        const esCentral = (index === centralIndex);
        const slide = crearTarjetaDigimonCarousel(digimon, esCentral);
        carouselTrackElement.appendChild(slide);
    });

    bannerElement.appendChild(carouselTrackElement);
}

function crearTarjetaDigimonCarousel(digimon, esCentral) {
    const slide = document.createElement("div");
    slide.className = "carousel-slide";
    if (esCentral) {
        slide.classList.add("central-slide");
    }
    slide.innerHTML = `
        <img src="${digimon.img}" alt="${digimon.name}" />
        <h4>${digimon.name}</h4>
    `;
    slide.addEventListener("click", () => mostrarDetalle(digimon));
    return slide;
}

function rotarCarrusel() {
    if (carouselDigimons.length < 3) return;

    const ultimoDigimon = carouselDigimons.pop();
    carouselDigimons.unshift(ultimoDigimon);

    renderizarCarrusel();
}

function startCarouselRotation() {
    if (rotationTimerId) clearInterval(rotationTimerId);
    if (carouselDigimons.length >= 3) {
       rotationTimerId = setInterval(rotarCarrusel, ROTATION_INTERVAL);
    }
}

function stopCarouselRotation() {
    clearInterval(rotationTimerId);
    rotationTimerId = null;
}

// --- Fin Funciones del Carrusel ---


// --- Funciones de Limpieza y Gestión de Vistas ---
function limpiarContenidoPrincipal() {
    if (todosDigimonContainer) {
        todosDigimonContainer.innerHTML = "";
        todosDigimonContainer.style.display = "none";
    }
    if (porNivelContainer) {
        porNivelContainer.style.display = "none";
    }
    if (digimonListaNivelContainer) {
        digimonListaNivelContainer.innerHTML = "";
    }
    if (submenuNiveles) {
        submenuNiveles.innerHTML = "";
        submenuNiveles.style.display = "none";
    }
    if (sortControlsContainer) {
        sortControlsContainer.style.display = "none";
    }
    if (resultadosBusquedaContainer) {
        resultadosBusquedaContainer.innerHTML = "";
        resultadosBusquedaContainer.style.display = "none";
    }
    if (bannerSection) {
        bannerSection.style.display = "block";
    }
    resetLevelSortAndSelection();
}

function resetLevelSortAndSelection() {
    currentSelectedLevel = null;
    levelSortOrder = 'none';
    if (sortLevelAlphaAscButton) sortLevelAlphaAscButton.classList.remove('active-sort');
    if (sortLevelAlphaDescButton) sortLevelAlphaDescButton.classList.remove('active-sort');
    if (submenuNiveles) {
        Array.from(submenuNiveles.children).forEach(li => li.classList.remove('active-level'));
    }
}

function actualizarMenuActivo(itemActivo) {
    if (menuItemTodos) menuItemTodos.classList.remove("active");
    if (menuItemPorNivel) menuItemPorNivel.classList.remove("active");
    if (itemActivo) {
        itemActivo.classList.add("active");
    }
}

// --- Funciones de Visualización ---
function activarVistaTodos() {
    limpiarContenidoPrincipal();
    if (listaDigimones && todosDigimonContainer) {
        mostrarTodos(listaDigimones, todosDigimonContainer);
        todosDigimonContainer.style.display = "flex";
    }
    actualizarMenuActivo(menuItemTodos);
}

function activarVistaPorNivel() {
    limpiarContenidoPrincipal();
    resetLevelSortAndSelection();
    if (porNivelContainer) porNivelContainer.style.display = "block";
    if (sortControlsContainer) sortControlsContainer.style.display = "flex";
    if (submenuNiveles) submenuNiveles.style.display = "flex";

    mostrarSubmenuNiveles();
    if (digimonListaNivelContainer) {
        digimonListaNivelContainer.innerHTML = "<p>Selecciona un nivel para ver los Digimon.</p>";
        digimonListaNivelContainer.style.display = "flex";
    }
    actualizarMenuActivo(menuItemPorNivel);
}


function crearTarjetaDigimon(digimon) {
    const div = document.createElement("div");
    div.className = "digimon";
    div.innerHTML = `
        <img src="${digimon.img}" alt="${digimon.name}" />
        <h4>${digimon.name}</h4>
        <p>${digimon.level}</p>
    `;
    div.addEventListener("click", () => mostrarDetalle(digimon));
    return div;
}

function mostrarTodos(digimones, container) {
    if (!container) return;
    container.innerHTML = "";
    if (digimones.length === 0) {
        if (container === resultadosBusquedaContainer) {
            container.innerHTML = "<p>No se encontraron Digimon con ese nombre.</p>";
        } else {
            container.innerHTML = "<p>No hay Digimon para mostrar.</p>";
        }
        return;
    }
    digimones.forEach(d => {
        container.appendChild(crearTarjetaDigimon(d));
    });
}

function mostrarDetalle(digimon) {
    const overlay = document.createElement("div");
    overlay.className = "modal-overlay";
    overlay.innerHTML = `
        <div class="modal-content">
            <span class="modal-close">&times;</span>
            <h2>${digimon.name}</h2>
            <img src="${digimon.img}" alt="${digimon.name}">
            <p><strong>Nivel:</strong> ${digimon.level}</p>
        </div>
    `;
    document.body.appendChild(overlay);
    overlay.querySelector(".modal-close").addEventListener("click", () => document.body.removeChild(overlay));
    overlay.addEventListener("click", (e) => {
        if (e.target === overlay) document.body.removeChild(overlay);
    });
}

// --- Funcionalidad de Búsqueda ---
function manejarBusqueda() {
    if (!searchInput) return;
    const searchText = searchInput.value.trim().toLowerCase();
    limpiarContenidoPrincipal();
    actualizarMenuActivo(null);

    if (!searchText) {
        activarVistaTodos();
        return;
    }
    const resultados = listaDigimones.filter(digimon =>
        digimon.name.toLowerCase().includes(searchText)
    );
    if (resultadosBusquedaContainer) {
        resultadosBusquedaContainer.style.display = "flex";
        mostrarTodos(resultados, resultadosBusquedaContainer);
    }
}

// --- Funcionalidad Por Nivel (Submenú, Filtrado y Ordenación) ---
function mostrarSubmenuNiveles() {
    if (!submenuNiveles) return;
    const nivelesUnicos = [...new Set(listaDigimones.map(d => d.level))].filter(Boolean).sort();
    submenuNiveles.innerHTML = "";
    nivelesUnicos.forEach(nivel => {
        const li = document.createElement("li");
        li.textContent = nivel;
        li.dataset.level = nivel;
        li.addEventListener("click", () => handleLevelSelection(nivel));
        submenuNiveles.appendChild(li);
    });
}

function handleLevelSelection(nivelSeleccionado) {
    currentSelectedLevel = nivelSeleccionado;
    levelSortOrder = 'none';
    actualizarBotonesSort();
    mostrarDigimonPorNivel();

    if (submenuNiveles) {
        Array.from(submenuNiveles.children).forEach(li => {
            li.classList.toggle("active-level", li.dataset.level === nivelSeleccionado);
        });
    }
}

function setLevelSortOrder(sortOrder) {
    levelSortOrder = sortOrder;
    actualizarBotonesSort();
    mostrarDigimonPorNivel();
}

function actualizarBotonesSort() {
    if (!sortLevelAlphaAscButton || !sortLevelAlphaDescButton) return;
    sortLevelAlphaAscButton.classList.toggle('active-sort', levelSortOrder === 'asc');
    sortLevelAlphaDescButton.classList.toggle('active-sort', levelSortOrder === 'desc');
}

function mostrarDigimonPorNivel() {
    if (!currentSelectedLevel) {
        if (digimonListaNivelContainer) digimonListaNivelContainer.innerHTML = "<p>Selecciona un nivel para ver los Digimon.</p>";
        return;
    }
    let digimonesFiltrados = listaDigimones.filter(d => d.level === currentSelectedLevel);
    if (levelSortOrder === 'asc') {
        digimonesFiltrados.sort((a, b) => a.name.localeCompare(b.name));
    } else if (levelSortOrder === 'desc') {
        digimonesFiltrados.sort((a, b) => b.name.localeCompare(a.name));
    }
    if (digimonListaNivelContainer) mostrarTodos(digimonesFiltrados, digimonListaNivelContainer);
}

// --- Fin de Funcionalidad Por Nivel ---
