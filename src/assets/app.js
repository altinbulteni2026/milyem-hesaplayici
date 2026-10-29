import { FINENESS_BY_KARAT, calculateContent, formatTr } from './calculator.js';

const form = document.getElementById('calculator');
const mass = document.getElementById('mass');
const karat = document.getElementById('karat');
const finenessGroup = document.getElementById('custom-fineness-group');
const customFineness = document.getElementById('custom-fineness');
const errorBox = document.getElementById('form-error');
const results = document.getElementById('results');
const copyButton = document.getElementById('copy-result');
const copyStatus = document.getElementById('copy-status');
const presetButtons = document.querySelectorAll('[data-karat]');
let lastResult = null;

function chosenFineness() {
  return karat.value === 'custom' ? customFineness.value : FINENESS_BY_KARAT[karat.value];
}

function updateCustomVisibility() {
  const custom = karat.value === 'custom';
  finenessGroup.hidden = !custom;
  customFineness.disabled = !custom;
  presetButtons.forEach((btn) => {
    btn.setAttribute('aria-pressed', String(btn.dataset.karat === karat.value));
  });
}

function compute() {
  errorBox.hidden = true;
  try {
    lastResult = calculateContent(mass.value, chosenFineness());
    document.getElementById('out-fine').textContent = `${formatTr(lastResult.fineGold)} g`;
    document.getElementById('out-remainder').textContent = `${formatTr(lastResult.remainder)} g`;
    document.getElementById('out-fineness').textContent = `${lastResult.fineness}‰`;
    document.getElementById('out-purity').textContent = `%${formatTr(lastResult.purityPercent, 2)}`;
    document.getElementById('out-formula').textContent =
      `${formatTr(lastResult.grams)} × ${lastResult.fineness} ÷ 1000 = ${formatTr(lastResult.fineGold)} g`;
    results.hidden = false;
    copyButton.disabled = false;
  } catch (err) {
    lastResult = null;
    results.hidden = true;
    copyButton.disabled = true;
    errorBox.textContent = err.message;
    errorBox.hidden = false;
  }
}

form.addEventListener('submit', (event) => {
  event.preventDefault();
  compute();
});

karat.addEventListener('change', () => { updateCustomVisibility(); compute(); });
mass.addEventListener('input', compute);
customFineness.addEventListener('input', compute);

presetButtons.forEach((button) => {
  button.addEventListener('click', () => {
    karat.value = button.dataset.karat;
    updateCustomVisibility();
    compute();
  });
});

form.addEventListener('reset', () => {
  window.requestAnimationFrame(() => {
    copyStatus.textContent = '';
    updateCustomVisibility();
    compute();
    mass.focus();
  });
});

copyButton.addEventListener('click', async () => {
  if (!lastResult) return;
  const content = [
    'Milyem / has altın hesap sonucu',
    `Toplam ağırlık: ${formatTr(lastResult.grams)} g`,
    `Milyem: ${lastResult.fineness}‰`,
    `Teorik has altın: ${formatTr(lastResult.fineGold)} g`,
    `Teorik diğer bileşenler: ${formatTr(lastResult.remainder)} g`,
    'Not: Fiyat veya gerçek ayar tespiti değildir.',
  ].join('\n');
  try {
    if (!navigator.clipboard?.writeText) throw new Error('Clipboard API unavailable');
    await navigator.clipboard.writeText(content);
    copyStatus.textContent = 'Sonuç panoya kopyalandı.';
  } catch {
    copyStatus.textContent = 'Kopyalama bu tarayıcıda kullanılamıyor. Sonuçları seçerek kopyalayabilirsiniz.';
  }
});

updateCustomVisibility();
compute();
