document.getElementById("btnCalcular").addEventListener("click", function () {
  const nome = document.getElementById("nome").value.trim();
  const idade = parseInt(document.getElementById("idade").value);
  const peso = parseFloat(document.getElementById("peso").value);
  const altura = parseFloat(document.getElementById("altura").value);
  const genero = document.getElementById("genero").value;

  const btnCalcular = document.getElementById("btnCalcular");
  const btnText = document.getElementById("btn-text");
  const btnSpinner = document.getElementById("btn-spinner");

  const paciente = {
    nome,
    idade,
    peso,
    altura,
    genero,
  };

  if (!validarPacienteHandler(paciente)) return;

  btnCalcular.disabled = true;
  btnText.innerText = "Calculando...";
  btnSpinner.classList.remove("hidden");
  document.getElementById("resultado").classList.add("hidden");

  setTimeout(() => {
    calcularTudo(paciente);

    btnCalcular.disabled = false;
    btnText.innerText = "Calcular Valores";
    btnSpinner.classList.add("hidden");
  }, 1500);
});

function calcularTudo(paciente) {
  let piPrevista = 0;
  let pePrevista = 0;
  let genero;

  if (paciente.genero === "masculino") {
    piPrevista = -0.8 * paciente.idade + 155.3;
    pePrevista = -0.81 * paciente.idade + 165.3;
  } else {
    piPrevista = -0.49 * paciente.idade + 110.4;
    pePrevista = -0.61 * paciente.idade + 115.6;
  }

  if (paciente.genero === "masculino") {
    genero = 1;
  } else {
    genero = 0;
  }

  const forcaDominante =
    39.996 - 0.382 * paciente.idade + 0.174 * paciente.peso + 13.628 * genero;
  const forcaNaoDominante =
    44.968 - 0.42 * paciente.idade + 0.11 * paciente.peso + 9.274 * genero;

  exibirResultados(
    paciente.nome,
    piPrevista,
    pePrevista,
    forcaDominante,
    forcaNaoDominante,
  );
}

function validarPacienteHandler(paciente) {
  if (
    !paciente.nome ||
    isNaN(paciente.idade) ||
    isNaN(paciente.peso) ||
    isNaN(paciente.altura) ||
    !paciente.genero
  ) {
    mostrarErro("Por favor, preencha todos os campos corretamente.");
    return false;
  }
  if (paciente.idade < 1 || paciente.idade > 110) {
    mostrarErro("Insira uma IDADE válida.");
    return false;
  }
  if (paciente.peso < 1 || paciente.peso > 300) {
    mostrarErro("Insira um PESO válido!");
    return false;
  }
  if (paciente.altura < 50 || paciente.altura > 250) {
    mostrarErro("Insira um ALTURA válida");
    return false;
  }

  return true;
}

function exibirResultados(nome, pi, pe, dom, ndom) {
  document.getElementById("res-nome").innerText = nome;

  // Manovacuometria
  document.getElementById("pi-val").innerText = pi.toFixed(1);
  document.getElementById("pe-val").innerText = pe.toFixed(1);

  // Dinamometria
  document.getElementById("dom-val").innerText = dom.toFixed(1);
  document.getElementById("ndom-val").innerText = ndom.toFixed(1);

  const resultadoSection = document.getElementById("resultado");
  resultadoSection.classList.remove("hidden");
  resultadoSection.scrollIntoView({ behavior: "smooth" });
}

function mostrarErro(mensagem) {
  const container = document.getElementById("error-container");
  const divErro = document.createElement("div");

  divErro.className = "error-text";
  divErro.innerText = mensagem;
  container.innerHTML = "";
  container.appendChild(divErro);

  setTimeout(() => {
    divErro.style.animation = "none";
    divErro.remove();
  }, 3000);
}
