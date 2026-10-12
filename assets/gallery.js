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

  // Ver em grande por cima da página: fechar (×, Esc, tocar fora), setas e deslizar.
  var T = lang === "en"
    ? { close: "Close", prev: "Previous", next: "Next" }
    : { close: "Fechar", prev: "Anterior", next: "Seguinte" };
  var css = document.createElement("style");
  css.textContent =
    ".lb{position:fixed;inset:0;z-index:1000;background:rgba(10,14,28,.92);display:flex;flex-direction:column;align-items:center;justify-content:center;padding:56px 16px 24px}" +
    ".lb[hidden]{display:none!important}" +
    ".lb img{display:block;flex:none;max-width:none;max-height:none;border-radius:10px;box-shadow:0 10px 40px rgba(0,0,0,.5)}" +
    ".lb p{color:#e9ecf6;margin:12px 0 0;text-align:center;max-width:900px;font-size:1rem}" +
    ".lb button{position:absolute;border:0;background:rgba(255,255,255,.14);color:#fff;border-radius:999px;width:48px;height:48px;font-size:28px;line-height:48px;cursor:pointer;padding:0}" +
    ".lb button:hover,.lb button:focus-visible{background:rgba(255,255,255,.28);outline:none}" +
    ".lb .lb-close{top:12px;right:12px}.lb .lb-prev{left:12px;top:50%;margin-top:-24px}.lb .lb-next{right:12px;top:50%;margin-top:-24px}" +
    "@media (max-width:600px){.lb .lb-prev,.lb .lb-next{top:auto;bottom:16px;margin:0}.lb{padding:56px 6px 80px}}" +
    "@media (max-height:500px) and (min-width:601px){.lb{padding:8px 64px}.lb p{display:none}}";
  document.head.appendChild(css);
  var box = document.createElement("div");
  box.className = "lb";
  box.hidden = true;
  box.setAttribute("role", "dialog");
  box.setAttribute("aria-modal", "true");
  box.innerHTML = '<button type="button" class="lb-close">&times;</button>' +
    '<button type="button" class="lb-prev">&#8249;</button>' +
    '<button type="button" class="lb-next">&#8250;</button><img alt="" /><p></p>';
  document.body.appendChild(box);
  var bImg = box.querySelector("img"), bCap = box.querySelector("p");
  var bClose = box.querySelector(".lb-close"), bPrev = box.querySelector(".lb-prev"), bNext = box.querySelector(".lb-next");
  bClose.setAttribute("aria-label", T.close); bClose.title = T.close;
  bPrev.setAttribute("aria-label", T.prev); bPrev.title = T.prev;
  bNext.setAttribute("aria-label", T.next); bNext.title = T.next;
  var current = 0, opener = null;
  function shown() {
    var out = [];
    for (var k = 0; k < slots.length; k++) if (slots[k].isConnected && !slots[k].hidden) out.push(slots[k]);
    return out;
  }
  // Tamanho em píxeis: a maior caixa 16:9 que cabe no ecrã (até 1600 px de largura).
  function fit() {
    var small = window.innerWidth <= 600;
    var w = Math.min(window.innerWidth - (small ? 12 : 140), 1600);
    var short = !small && window.innerHeight <= 500;
    var h = window.innerHeight - (small ? 200 : (short ? 16 : 120));
    var r = (bImg.naturalWidth && bImg.naturalHeight) ? bImg.naturalWidth / bImg.naturalHeight : 16 / 9;
    if (w / r > h) w = h * r;
    w = Math.max(160, Math.floor(w));
    bImg.style.width = w + "px";
    bImg.style.height = Math.floor(w / r) + "px";
  }
  bImg.addEventListener("load", fit);
  window.addEventListener("resize", function () { if (!box.hidden) fit(); });
  function show(idx) {
    var items = shown();
    if (!items.length) return;
    current = (idx + items.length) % items.length;
    var im = items[current].querySelector("img");
    var fc = items[current].querySelector("figcaption");
    bImg.src = im.src; bImg.alt = im.alt;
    fit();
    bCap.textContent = fc ? fc.textContent : "";
    bPrev.hidden = bNext.hidden = items.length < 2;
  }
  function open(fig, link) {
    opener = link;
    show(shown().indexOf(fig));
    box.hidden = false;
    document.body.style.overflow = "hidden";
    bClose.focus();
  }
  function close() {
    box.hidden = true;
    document.body.style.overflow = "";
    if (opener) opener.focus();
  }
  for (var m = 0; m < slots.length; m++) {
    (function (fig) {
      var a = fig.querySelector("a");
      a.addEventListener("click", function (e) { e.preventDefault(); open(fig, a); });
    })(slots[m]);
  }
  bClose.addEventListener("click", close);
  bPrev.addEventListener("click", function () { show(current - 1); });
  bNext.addEventListener("click", function () { show(current + 1); });
  box.addEventListener("click", function (e) { if (e.target === box) close(); });
  document.addEventListener("keydown", function (e) {
    if (box.hidden) return;
    if (e.key === "Escape") close();
    else if (e.key === "ArrowLeft") show(current - 1);
    else if (e.key === "ArrowRight") show(current + 1);
  });
  var x0 = null;
  box.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  box.addEventListener("touchend", function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    x0 = null;
    if (Math.abs(dx) > 50) show(current + (dx < 0 ? 1 : -1));
  });
})();
