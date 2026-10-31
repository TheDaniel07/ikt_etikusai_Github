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