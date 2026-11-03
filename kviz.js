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