/* Galeria de capturas (página principal PT e EN).
   Imagens: assets/screenshots/01.png a 08.png. Só aparecem as que existem;
   sem nenhuma, a secção fica escondida.
   Legendas: editar só aqui. A posição na lista é o número da imagem
   (1.ª linha = 01.png). Texto vazio = sem legenda. */
var GALLERY_CAPTIONS = {
  pt: [
    "", // 01.png
    "", // 02.png
    "", // 03.png
    "", // 04.png
    "", // 05.png
    "", // 06.png
    "", // 07.png
    ""  // 08.png
  ],
  en: [
    "", // 01.png
    "", // 02.png
    "", // 03.png
    "", // 04.png
    "", // 05.png
    "", // 06.png
    "", // 07.png
    ""  // 08.png
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
    var link = document.createElement("a");
    link.href = base + name;
    var img = new Image();
    img.decoding = "async";
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
