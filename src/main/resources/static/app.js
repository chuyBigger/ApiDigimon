const digimonContainer = document.getElementById("digimon-lista");
const banner = document.getElementById("digimon-banner");

// Cargar Digimon y mostrar algunos aleatorios en banner
fetch("http://localhost:8080/digimon")
  .then(res => res.json())
  .then(data => {
    listaDigimones = Object.values(data).flat();
    mostrarBannerAleatorio(listaDigimones);
    mostrarTodos(listaDigimones);
  })
  .catch(err => console.error("Error al cargar los Digimon:", err));

function manejarMenu() {
  const opcion = document.getElementById("menu").value;
  if (opcion === "todos") {
    mostrarTodos(listaDigimones);
  } else if (opcion === "porEvolucion") {
    mostrarPorEvolucion(listaDigimones);
  } else if (opcion === "buscar") {
    alert("Función de búsqueda aún no implementada.");
  }
}


function mostrarBannerAleatorio(digimones) {
  banner.innerHTML = "";
  const seleccionados = [...digimones].sort(() => 0.5 - Math.random()).slice(0, 3);
  seleccionados.forEach(d => {
    const div = document.createElement("div");
    div.className = "digimon";
    div.innerHTML = `
      <img src="${d.img}" alt="${d.name}" />
      <p>${d.name}</p>
    `;
    banner.appendChild(div);
  });
}

function mostrarTodos(digimones) {
  digimonContainer.innerHTML = "";
  digimones.forEach(d => {
    const div = document.createElement("div");
    div.className = "digimon";
    div.innerHTML = `
      <img src="${d.img}" alt="${d.name}" />
      <h4>${d.name}</h4>
      <p>${d.level}</p>
    `;
    div.addEventListener("click", () => mostrarDetalle(d));
    digimonContainer.appendChild(div);
  });
}

function mostrarDetalle(digimon) {
  alert(`Nombre: ${digimon.name}\nNivel: ${digimon.level}`);
  // Aquí luego hacemos una vista de detalle bonita
}

function mostrarPorEvolucion(digimones) {
  digimonContainer.innerHTML = "";

  const porNivel = {};

  digimones.forEach(d => {
    const nivel = d.level || "Desconocido";
    if (!porNivel[nivel]) {
      porNivel[nivel] = [];
    }
    porNivel[nivel].push(d);
  });

  for (const nivel in porNivel) {
    const grupo = porNivel[nivel];

    const titulo = document.createElement("h3");
    titulo.textContent = `Nivel: ${nivel}`;
    titulo.style.marginTop = "30px";
    digimonContainer.appendChild(titulo);

    const fila = document.createElement("div");
    fila.className = "digimon-box";

    grupo.forEach(d => {
      const div = document.createElement("div");
      div.className = "digimon";
      div.innerHTML = `
        <img src="${d.img}" alt="${d.name}" />
        <h4>${d.name}</h4>
      `;
      div.addEventListener("click", () => mostrarDetalle(d));
      fila.appendChild(div);
    });

    digimonContainer.appendChild(fila);
  }
}


