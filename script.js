// Alterna a seção visível no app (Futebol, NBA, F1, UFC)
function showSection(sectionId) {
  // Esconde todas as seções e remove destaque dos botões
  document.querySelectorAll('section').forEach(sec => sec.classList.remove('active'));
  document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active'));

  // Mostra a seção clicada e destaca o botão correspondente
  document.getElementById(sectionId).classList.add('active');
  document.querySelector(`nav button[onclick*="${sectionId}"]`).classList.add('active');

  // Salva a seção ativa no localStorage
  localStorage.setItem("secao-ativa", sectionId);
}

// Ativa ou desativa o modo escuro e salva no localStorage
function toggleDarkMode() {
  const body = document.body;
  body.classList.toggle("dark");

  const btn = document.getElementById("darkModeBtn");
  btn.textContent = body.classList.contains("dark") ? "☀️ Modo Claro" : "🌙 Modo Escuro";

  localStorage.setItem("modo-escuro", body.classList.contains("dark"));
}

// Aplica preferências salvas ao carregar o site
window.addEventListener("DOMContentLoaded", () => {
  // Restaura modo escuro
  const modoEscuroAtivo = localStorage.getItem("modo-escuro") === "true";
  if (modoEscuroAtivo) {
    document.body.classList.add("dark");
    const btn = document.getElementById("darkModeBtn");
    if (btn) btn.textContent = "☀️ Modo Claro";
  }

  // Restaura a última seção ativa
  const ultimaSecao = localStorage.getItem("secao-ativa") || "futebol";
  showSection(ultimaSecao);
});

// Registra o Service Worker (para PWA)
if ("serviceWorker" in navigator) {
  navigator.serviceWorker.register("service-worker.js");
}
