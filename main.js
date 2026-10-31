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
  { ai: "/images/game/Landscape2.png", real: "/images/game/Landscape1.png" },
  { ai: "/images/game/Pizza2.png", real: "/images/game/Pizza1.png" },
  { ai: "/images/game/Sunflower2.png", real: "/images/game/Sunflower1.png" },
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