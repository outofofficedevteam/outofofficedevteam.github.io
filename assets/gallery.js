/* Galeria de capturas (página principal PT e EN).
   Imagens: assets/screenshots/01.png a 08.png. Só aparecem as que existem;
   sem nenhuma, a secção fica escondida.
   Legendas: editar só aqui. A posição na lista é o número da imagem
   (1.ª linha = 01.png). Texto vazio = sem legenda. */
var GALLERY_CAPTIONS = {
  pt: [
    "«Eu só queria sair às seis.» Cada nível abre com uma mini-cena.", // 01.png
    "Foste visto! Num open space cheio, cada olhar conta.", // 02.png
    "Carrega no alarme de incêndio e toda a gente vai para o ponto de encontro.", // 03.png
    "Aniversário de alguém: enquanto cantam os parabéns, o átrio fica livre.", // 04.png
    "Hora extra: à noite, até o IT de serviço boceja.", // 05.png
    "Reunião dos chefes: atrás do vidro, a Direção vê o corredor todo.", // 06.png
    "Simulacro de evacuação: mistura-te com quem desce as escadas.", // 07.png
    "O Grande Escape: 30 níveis, 9 departamentos, uma porta."  // 08.png
  ],
  en: [
    "“I just wanted to leave at six.” Every level opens with a mini-scene.", // 01.png
    "Spotted! In a packed open space, every glance counts.", // 02.png
    "Pull the fire alarm and everyone heads for the assembly point.", // 03.png
    "Someone’s birthday: while everyone sings, the lobby is clear.", // 04.png
    "Overtime: at night, even the IT person on duty yawns.", // 05.png
    "The bosses’ meeting: behind the glass, management sees the whole corridor.", // 06.png
    "Evacuation drill: blend in with the crowd heading for the stairs.", // 07.png
    "The Great Escape: 30 levels, 9 departments, one door."  // 08.png
  ]
};

(function () {
  var section = document.querySelector("[data-gallery]");
  if (!section) return;
  var list = section.querySelector(".gallery");
  var base = section.getAttribute("data-base") || "assets/screenshots/";
  var lang = section.getAttribute("data-lang") === "en" ? "en" : "pt";
  var alt = lang === "en" ? "Screenshot" : "Captura";
  var captions = GALLERY_CAPTIONS[lang] || [];
  var slots = [];
  for (var i = 1; i <= 8; i++) {
    var name = (i < 10 ? "0" : "") + i + ".png";
    var fig = document.createElement("figure");
    fig.className = "shot-item";
    fig.hidden = true;
    fig.style.minWidth = "0";
    var link = document.createElement("a");
    link.href = base + name;
    link.style.cssText = "display:block;aspect-ratio:16/9;overflow:hidden;border-radius:12px";
    var img = new Image();
    img.decoding = "async";
    img.style.cssText = "display:block;width:100%;max-width:100%;height:100%;object-fit:cover";
    img.alt = captions[i - 1] || alt + " " + i;
    img.onload = (function (f) {
      return function () { f.hidden = false; section.hidden = false; };
    })(fig);
    img.onerror = (function (f) {
      return function () { f.remove(); };
    })(fig);
    img.src = base + name;
    link.appendChild(img);
    fig.appendChild(link);
    if (captions[i - 1]) {
      var cap = document.createElement("figcaption");
      cap.textContent = captions[i - 1];
      fig.appendChild(cap);
    }
    slots.push(fig);
  }
  for (var j = 0; j < slots.length; j++) list.appendChild(slots[j]);
})();
