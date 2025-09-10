// PAYMENT LINKS
document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('plan-select');
  const priceEl = document.getElementById('plan-price');
  const descEl  = document.getElementById('plan-desc');
  const btn     = document.getElementById('purchase-btn');

  const PAYPAL = {
    basic:    'https://www.paypal.com/ncp/payment/TC5WWYCDDMX78?no_shipping=1',
    standard: 'https://www.paypal.com/ncp/payment/325BQEM2CYE28?no_shipping=1',
    premium:  'https://www.paypal.com/ncp/payment/6NYPZ84CDKCHS?no_shipping=1'
  };

  const DATA = {
  basic: {
    original: '$1230',
    price: '$922,50',
    installment: '($307,50 / installment)',
    desc: 'ALL Basic Services, 25% OFF! (See below for details.)'
  },
  standard: {
    original: '$3180',
    price: '$2544',
    installment: '($848,00 / installment)',
    desc: 'ALL Standard Services, 20% OFF! (See below for details.)'
  },
  premium: {
    original: '$8350',
    price: '$7097,50',
    installment: '($2365,83 / installment)',
    desc: 'ALL Premium Services, 15% OFF! (See below for details.)'
  }
};

  function setButtonState(enabled, url='') {
    if (enabled && url) {
      btn.disabled = false;
      btn.setAttribute('aria-disabled', 'false');
      btn.dataset.paypalUrl = url;
    } else {
      btn.disabled = true;
      btn.setAttribute('aria-disabled', 'true');
      delete btn.dataset.paypalUrl;
    }
  }

  function clearOutput() {
    priceEl.textContent = '';
    descEl.textContent = '';
  }

  function updateBySelection(value) {
  if (!value) {
    clearOutput();
    setButtonState(false);
    btn.style.background = "";
    return;
  }
  const info = DATA[value];
  if (!info) {
    clearOutput();
    setButtonState(false);
    btn.style.background = "";
    return;
  }

  // pulisci contenuto esistente
  priceEl.innerHTML = '';

  // se hai fornito un prezzo originale, lo mostriamo sbarrato
  if (info.original) {
    const orig = document.createElement('span');
    orig.textContent = info.original;
    orig.style.textDecoration = 'line-through';
    orig.style.fontSize = '0.95rem';
    orig.style.color = '#fff';
    orig.style.marginRight = '0.6rem';
    orig.style.display = 'inline-block';
    orig.style.verticalAlign = 'baseline';
    priceEl.appendChild(orig);
  }

  // prezzo scontato / finale (più grande)
  const disc = document.createElement('span');
  disc.textContent = info.price || '';
  disc.style.fontSize = '1.6rem';
  disc.style.fontWeight = '700';
  disc.style.display = 'inline-block';
  disc.style.verticalAlign = 'baseline';
  priceEl.appendChild(disc);

  // opzionale: testo per installment (se lo mantieni in DATA)
  if (info.installment) {
    const inst = document.createElement('div');
    inst.textContent = info.installment;
    inst.style.fontSize = '0.85rem';
    inst.style.color = '#fff';
    inst.style.marginTop = '4px';
    priceEl.appendChild(inst);
  }

  // descrizione e stato del bottone
  descEl.textContent  = info.desc || '';
  setButtonState(true, PAYPAL[value] || '');

  // mantieni la logica dei gradienti per il bottone
  if (value === 'basic') {
    btn.style.background = "linear-gradient(135deg, #56ab2f, #a8e063)";
  } else if (value === 'standard') {
    btn.style.background = "linear-gradient(135deg, #1e3c72, #2758afff)";
  } else if (value === 'premium') {
    btn.style.background = "linear-gradient(135deg, #8e2de2, #ff6a00)";
  }
  btn.style.color = "white";
  btn.style.border = "none";
}

  select.addEventListener('change', () => {
    updateBySelection(select.value);
  });

  btn.addEventListener('click', (e) => {
    const url = btn.dataset.paypalUrl;
    if (!url) {
      e.preventDefault();
      alert('Seleziona un piano prima di procedere al pagamento.');
      return;
    }
    window.open(url, '_blank', 'noopener');
  });

  updateBySelection(select.value);
});