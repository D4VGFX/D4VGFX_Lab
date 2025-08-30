// PAYMENT LINKS
document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('plan-select');
  const priceEl = document.getElementById('plan-price');
  const descEl  = document.getElementById('plan-desc');
  const btn     = document.getElementById('purchase-btn');

  const PAYPAL = {
    basic:    'https://www.paypal.com/ncp/payment/6SKJVZLHS5Q9J',
    standard: 'https://www.paypal.com/ncp/payment/NKS9LXY38C4YL',
    premium:  'https://www.paypal.com/ncp/payment/44AP56HTPM2SG'
  };

  const DATA = {
    basic:    { price: '$100 ($33,33 / installment)',  desc: 'A5/A4 single flyer (front/back) using client copy.' },
    standard: { price: '$250 ($83,33 / installment)',  desc: 'Multi-page brochure (4-6 pages) or tri-fold with imagery and 2 revisions.' },
    premium:  { price: '$700 ($233,33 / installment)',  desc: 'Promotional kit (flyer + poster + banner) with coordinated artwork for multiple channels.' }
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
  if (info) {
    priceEl.textContent = info.price;
    descEl.textContent  = info.desc;
    setButtonState(true, PAYPAL[value] || '');

    if (value === 'basic') {
      btn.style.background = "linear-gradient(135deg, #56ab2f, #a8e063)";
    } else if (value === 'standard') {
      btn.style.background = "linear-gradient(135deg, #1e3c72, #2758afff)";
    } else if (value === 'premium') {
      btn.style.background = "linear-gradient(135deg, #8e2de2, #ff6a00)";
    }
    btn.style.color = "white";
    btn.style.border = "none";
  } else {
    clearOutput();
    setButtonState(false);
    btn.style.background = "";
  }
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