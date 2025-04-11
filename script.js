// Alterna a seção visível no app (Futebol, NBA, F1, UFC)
function showSection(sectionId) {
    // Esconde todas as seções e remove destaque dos botões
    document.querySelectorAll('section').forEach(sec => sec.classList.remove('active'));
    document.querySelectorAll('nav button').forEach(btn => btn.classList.remove('active'));
  
    // Mostra a seção clicada e destaca o botão correspondente
    document.getElementById(sectionId).classList.add('active');
    document.querySelector(`nav button[onclick*="${sectionId}"]`).classList.add('active');
  }
  
  // Registra o Service Worker (para PWA)
  if ("serviceWorker" in navigator) {
    navigator.serviceWorker.register("service-worker.js");
  }
  
  // Aguarda o DOM estar carregado
  document.addEventListener("DOMContentLoaded", () => {
    // 🔴 DARK MODE
    if (localStorage.getItem("modo-escuro") === "true") {
      document.body.classList.add("dark");
      document.getElementById("darkModeBtn").textContent = "☀️ Modo Claro";
    }
  
    //Ferrari
    fetch("https://ergast.com/api/f1/current/last/results.json")
      .then(res => res.json())
      .then(data => {
        const races = data.MRData.RaceTable.Races;
        const results = races[0].Results;
  
        // Filtra apenas os resultados dos carros da Ferrari
        const ferrariResults = results.filter(driver =>
          driver.Constructor.name === "Ferrari"
        );
  
        const section = document.getElementById("f1");
        section.innerHTML = "<h2>🏎️ Ferrari - Fórmula 1</h2>";
  
        // Cria um card para cada piloto da Ferrari
        ferrariResults.forEach(driver => {
          const card = document.createElement("div");
          card.className = "card";
          card.innerHTML = `
            <img src="icons/ferrari.png" alt="Ferrari">
            <div>
              🏁 <strong>${driver.Driver.givenName} ${driver.Driver.familyName}</strong><br>
              Posição: P${driver.position}<br>
              Tempo: ${driver.Time?.time || "N/A"}
            </div>
          `;
          section.appendChild(card);
        });
      })
      .catch(err => {
        const section = document.getElementById("f1");
        section.innerHTML += "<p style='color:red;'>Erro ao carregar dados da F1 😢</p>";
        console.error("Erro ao buscar dados da F1:", err);
      });
  
    // ⚽ SÃO PAULO FC (API Football)
    const teamId = 185;
    const options = {
      method: "GET",
      headers: {
        "x-apisports-key": "live_c9377ed70295a5e8736fea3aacfce9"
      }
    };
    const url = `https://v3.football.api-sports.io/fixtures?team=${teamId}&last=1`;
  
    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        const match = data.response[0];
        const home = match.teams.home.name;
        const away = match.teams.away.name;
        const scoreHome = match.goals.home;
        const scoreAway = match.goals.away;
  
        const resultText = `${home} ${scoreHome} x ${scoreAway} ${away}`;
        const card = document.querySelector("#futebol .spfc .resultado");
        card.innerText = `Último jogo: ${resultText}`;
      })
      .catch(err => {
        console.error("Erro ao buscar dados do São Paulo:", err);
      });
  
    // ⚽ VASCO (API Futebol BR)
    const vascoCard = document.querySelector("#futebol .card img[alt='Vasco']").closest(".card div");
  
    fetch("https://api.api-futebol.com.br/v1/times/23/partidas/anteriores", {
      method: "GET",
      headers: {
        "Authorization": "Bearer live_05b70b1da062fee4311d8ba925f6c0"
      }
    })
      .then(res => res.json())
      .then(data => {
        const ultimaPartida = data.partidas[0];
        const mandante = ultimaPartida.time_mandante.nome_popular;
        const visitante = ultimaPartida.time_visitante.nome_popular;
        const placarMandante = ultimaPartida.placar_mandante;
        const placarVisitante = ultimaPartida.placar_visitante;
  
        vascoCard.innerHTML = `
          ⚽ <strong>Vasco</strong><br>
          Último jogo: ${mandante} ${placarMandante} x ${placarVisitante} ${visitante}
        `;
      })
      .catch(err => {
        vascoCard.innerHTML = "Erro ao carregar jogo do Vasco";
        console.error("Erro ao buscar dados do Vasco:", err);
      });
  
    // ⚽ PAYSANDU (API Futebol BR)
    const paysanduCard = document.querySelector("#futebol .card img[alt='Paysandu']").closest(".card div");
  
    fetch("https://api.api-futebol.com.br/v1/times/62/partidas/anteriores", {
      method: "GET",
      headers: {
        "Authorization": "Bearer live_05b70b1da062fee4311d8ba925f6c0"
      }
    })
      .then(res => res.json())
      .then(data => {
        const ultimaPartida = data.partidas[0];
        const mandante = ultimaPartida.time_mandante.nome_popular;
        const visitante = ultimaPartida.time_visitante.nome_popular;
        const placarMandante = ultimaPartida.placar_mandante;
        const placarVisitante = ultimaPartida.placar_visitante;
  
        paysanduCard.innerHTML = `
          ⚽ <strong>Paysandu</strong><br>
          Último jogo: ${mandante} ${placarMandante} x ${placarVisitante} ${visitante}
        `;
      })
      .catch(err => {
        paysanduCard.innerHTML = "Erro ao carregar jogo do Paysandu";
        console.error("Erro ao buscar dados do Paysandu:", err);
      });
  });
  
  // Ativa ou desativa o modo escuro e salva no localStorage
  function toggleDarkMode() {
    const body = document.body;
    body.classList.toggle("dark");
  
    const btn = document.getElementById("darkModeBtn");
    btn.textContent = body.classList.contains("dark") ? "☀️ Modo Claro" : "🌙 Modo Escuro";
  
    localStorage.setItem("modo-escuro", body.classList.contains("dark"));
  }
  