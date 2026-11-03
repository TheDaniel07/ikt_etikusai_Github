  document.addEventListener('DOMContentLoaded', function () {
  const kapcsolo = document.getElementById('temaKapcsolo');
  const ikon = document.getElementById('temaIkon');
  const html = document.documentElement;
  if (!kapcsolo) return;

  function beallit(tema) {
    html.setAttribute('data-bs-theme', tema);
    kapcsolo.checked = (tema === 'dark');
    if (ikon) ikon.textContent = (tema === 'dark') ? '🌙' : '☀️';
    try { localStorage.setItem('tema', tema); } catch (e) {}
  }

  beallit(html.getAttribute('data-bs-theme') || 'light');
  kapcsolo.addEventListener('change', function () {
    beallit(kapcsolo.checked ? 'dark' : 'light');
  });
});
  
  const eredmeny = document.getElementById('eredmeny');
  const gombok = document.querySelectorAll('.tipp-gomb');

  gombok.forEach(function (gomb) {
    gomb.addEventListener('click', function () {
      const talalt = gomb.dataset.deepfake === 'true';

      if (talalt) {
        eredmeny.textContent = 'Eltaláltad! Ez volt a deepfake videó.';
        eredmeny.style.color = 'green';
      } else {
        eredmeny.textContent = 'Sajnos nem talált. A másik videó a deepfake.';
        eredmeny.style.color = 'crimson';
      }


      gombok.forEach(function (g) { g.disabled = true; });
    });
  });

const ROUNDS = [
  { ai: "images/game/Landscape2.png", real: "images/game/Landscape1.png" },
  { ai: "images/game/Pizza2.png", real: "images/game/Pizza1.png" },
  { ai: "images/game/Sunflower2.png", real: "images/game/Sunflower1.png" },
];

const TXT = {
  round: (i, n) => `${i}. kör / ${n}`,
  score: s => `Pontszám: ${s}`,
  right: "Helyes! Megtaláltad az AI képet.",
  wrong: "Nem talált. Ez egy valódi fotó.",
  final: (s, n) => ` Végeredmény: ${s} / ${n}.`,
  tagAI: "AI generált",
  tagReal: "Valódi fotó",
  pic: i => `${i}. kép`,
};

const $ = id => document.getElementById(id);
let order, index, score, locked;

const shuffle = arr => {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
};

function start() {
  order = shuffle(ROUNDS);
  index = 0;
  score = 0;
  $("again").hidden = true;
  showRound();
}

function showRound() {
  locked = false;
  const r = order[index];
  const items = shuffle([{ src: r.ai, ai: true }, { src: r.real, ai: false }]);
  $("pair").classList.remove("revealed");
  $("pair").innerHTML = "";
  items.forEach((it, i) => {
    const b = document.createElement("button");
    b.type = "button";
    b.className = "pick " + (it.ai ? "is-ai" : "is-real");
    b.setAttribute("aria-label", TXT.pic(i + 1));
    b.innerHTML = `<img alt="" src="${it.src}"><span class="tag">${it.ai ? TXT.tagAI : TXT.tagReal}</span>`;
    b.addEventListener("click", () => guess(b, it.ai));
    $("pair").appendChild(b);
  });
  $("round").textContent = TXT.round(index + 1, order.length);
  $("score").textContent = TXT.score(score);
  $("msg").textContent = "";
  $("msg").className = "msg";
  $("next").hidden = true;
}

function guess(btn, isAI) {
  if (locked) return;
  locked = true;
  $("pair").classList.add("revealed");
  $("pair").querySelector(".is-ai").classList.add("right");
  if (isAI) {
    score++;
    $("msg").textContent = TXT.right;
    $("msg").className = "msg good";
  } else {
    btn.classList.add("wrong");
    $("msg").textContent = TXT.wrong;
    $("msg").className = "msg bad";
  }
  $("score").textContent = TXT.score(score);
  if (index < order.length - 1) {
    $("next").hidden = false;
  } else {
    $("msg").textContent += TXT.final(score, order.length);
    $("again").hidden = false;
  }
}

$("next").addEventListener("click", () => { index++; showRound(); });
$("again").addEventListener("click", start);
start();



// Berkesi Márton eleme//
(function () {
  var KERDESEK = [
    {
      k: "Mit használnak az adatközpontok a villamos energián kívül a hűtéshez?",
      v: ["Földgázt", "Vizet", "Szenet", "Jeget"],
      h: 1,
      m: "Az adatközpontok hűtéshez vizet is felhasználnak."
    },
    {
      k: "Az IEA becslése szerint a világ villamosenergia-felhasználásának nagyjából hány százalékát fogyasztották az adatközpontok 2024-ben?",
      v: ["Kb. 0,2%", "Kb. 15%", "Kb. 40%", "Kb. 1,5%"],
      h: 3,
      m: "2024-ben nagyjából 415 TWh volt a fogyasztásuk, ami kb. 1,5%."
    },
    {
      k: "Melyik az etikus használat egyik tanácsa?",
      v: [
        "Használj MI-t minden feladatra",
        "Mindig a legnagyobb modellt válaszd",
        "Ahol elég, válassz kisebb modellt",
        "Tedd fel ugyanazt a kérdést háromszor"
      ],
      h: 2,
      m: "Kerüld a felesleges használatot, és ahol elég, válassz kisebb modellt."
    }
  ];
  var gyoker = document.getElementById("kviz-tartalom");
  var i, jo, lezarva;

  function el(tag, cls, szoveg) {
    var e = document.createElement(tag);
    if (cls) e.className = cls;
    if (szoveg !== undefined) e.textContent = szoveg;
    return e;
  }

  function kezdo() {
    gyoker.replaceChildren();
    gyoker.appendChild(el("p", "kviz-szoveg", "3 kérdés. Sok sikert!"));
    var gomb = el("button", "kviz-gomb-fo", "Indítás");
    gomb.type = "button";
    gomb.addEventListener("click", function () { i = 0; jo = 0; kerdes(); });
    gyoker.appendChild(gomb);
  }

  function kerdes() {
    var q = KERDESEK[i];
    lezarva = false;
    gyoker.replaceChildren();
    var fej = el("div", "kviz-fej");
    fej.appendChild(el("span", "", (i + 1) + " / " + KERDESEK.length));
    gyoker.appendChild(fej);
    gyoker.appendChild(el("p", "kviz-kerdes", q.k));
    var racs = el("div", "kviz-racs");
    var gombok = q.v.map(function (szoveg, n) {
      var b = el("button", "kviz-valasz kviz-szin" + n, szoveg);
      b.type = "button";
      b.addEventListener("click", function () { valasz(n); });
      racs.appendChild(b);
      return b;
    });
    gyoker.appendChild(racs);
    var visszajelzes = el("div", "kviz-visszajelzes");
    visszajelzes.setAttribute("aria-live", "polite");
    gyoker.appendChild(visszajelzes);
    function valasz(n) {
      if (lezarva) return;
      lezarva = true;
      var talalt = n === q.h;
      if (talalt) jo++;
      gombok.forEach(function (b, k) {
        b.disabled = true;
        if (k === q.h) b.classList.add("helyes");
        else b.classList.add("halvany");
        if (k === n && !talalt) b.classList.add("hibas");
      });
      var cim = talalt ? "Helyes! " : "Nem talált. ";
      visszajelzes.appendChild(el("p", "kviz-szoveg", cim + q.m));
      var tovabb = el("button", "kviz-gomb-fo", i + 1 < KERDESEK.length ? "Következő" : "Eredmény");
      tovabb.type = "button";
      tovabb.addEventListener("click", function () {
        i++;
        if (i < KERDESEK.length) kerdes(); else vege();
      });
      visszajelzes.appendChild(tovabb);
      tovabb.focus();
    }
  }
  function vege() {
    gyoker.replaceChildren();
    gyoker.appendChild(el("p", "kviz-kerdes", "Vége a kvíznek!"));
    gyoker.appendChild(el("p", "kviz-eredmeny", jo + " / " + KERDESEK.length));
    gyoker.appendChild(el("p", "kviz-szoveg", "helyes válasz"));
    var ujra = el("button", "kviz-gomb-fo", "Újra");
    ujra.type = "button";
    ujra.addEventListener("click", kezdo);
    gyoker.appendChild(ujra);
  }
  kezdo();
})();

