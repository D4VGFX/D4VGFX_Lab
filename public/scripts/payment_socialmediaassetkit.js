// PAYMENT LINKS
document.addEventListener('DOMContentLoaded', () => {
  const select = document.getElementById('plan-select');
  const priceEl = document.getElementById('plan-price');
  const descEl  = document.getElementById('plan-desc');
  const btn     = document.getElementById('purchase-btn');

  const PAYPAL = {
    basic:    'https://www.paypal.com/ncp/payment/L4JG2VWCWUGWU?no_shipping=1',
    standard: 'https://www.paypal.com/ncp/payment/ATCULN33BPAUJ?no_shipping=1',
    premium:  'https://www.paypal.com/ncp/payment/MXEXB2N82SB2U?no_shipping=1'
  };

  const DATA = {
    basic:    { price: '$80 ($26,67 / installment)',  desc: '3 personalized templates (one format each)' },
    standard: { price: '$200 ($66,67 / installment)',  desc: '5-6 assets including posts, stories and banners + 2 revisions.' },
    premium:  { price: '$600 ($200,00 / installment)',  desc: '10+ items, custom icons/illustrations, multi-platform templates.' }

    
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