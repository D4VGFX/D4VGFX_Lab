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
    basic:    { price: '$120 ($40,00 / installment)',  desc: 'Template for 5-10 slides with brand look.' },
    standard: { price: '$350 ($116,67 / installment)',  desc: 'Complete presentation up to 20 slides, 2 revisions.' },
    premium:  { price: '$900 ($300,00 / installment)',  desc: 'Up to 50 slides, custom illustrations/diagrams and simple graphic animations.' }

    
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
      priceEl.style.color = "#0a0a0a"
      descEl.style.color = "#0a0a0a"
    } else if (value === 'standard') {
      btn.style.background = "linear-gradient(135deg, #1e3c72, #2758afff)";
      priceEl.style.color = "#0a0a0a"
      descEl.style.color = "#0a0a0a"
    } else if (value === 'premium') {
      btn.style.background = "linear-gradient(135deg, #8e2de2, #ff6a00)";
      priceEl.style.color = "#0a0a0a"
      descEl.style.color = "#0a0a0a"
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