document.getElementById("btnCalcular").addEventListener("click", function () {
  // 1. Constantes individuais (apenas os dados básicos)
  const nome = document.getElementById("nome").value.trim();
  const idade = parseInt(document.getElementById("idade").value);
  const peso = parseFloat(document.getElementById("peso").value);
  const altura = parseFloat(document.getElementById("altura").value);
  const genero = document.getElementById("genero").value;

  const msgErro = document.getElementById("error-message");
  const btnCalcular = document.getElementById("btnCalcular");
  const btnText = document.getElementById("btn-text");
  const btnSpinner = document.getElementById("btn-spinner");

  if (!nome || isNaN(idade) || isNaN(peso) || isNaN(altura) || !genero) {
    msgErro.classList.remove("hidden");
    document.getElementById("resultado").classList.add("hidden");
    return;
  }

  msgErro.classList.add("hidden");

  const paciente = {
    nome,
    idade,
    peso,
    altura,
    genero,
  };

  // 2. Ativa o estado de "Carregando"
  btnCalcular.disabled = true;
  btnText.innerText = "Calculando...";
  btnSpinner.classList.remove("hidden");
  document.getElementById("resultado").classList.add("hidden"); // Esconde resultado anterior

  setTimeout(() => {
    calcularTudo(paciente);

    btnCalcular.disabled = false;
    btnText.innerText = "Calcular Valores Previstos";
    btnSpinner.classList.add("hidden");
  }, 1500);
});

function calcularTudo(paciente) {
  // CÁLCULO MANOVACUOMETRIA (Black & Hyatt)
  let piPrevista = 0;
  let pePrevista = 0;

  if (paciente.genero === "masculino") {
    piPrevista = -0.8 * paciente.idade + 155.3;
    pePrevista = -0.49 * paciente.idade + 110.4;
  } else {
    piPrevista = -0.81 * paciente.idade + 165.3;
    pePrevista = -0.61 * paciente.idade + 115.6;
  }

  // CÁLCULO DINAMOMETRIA (Força de Preensão Palmar - FPP)
  let genero;

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
