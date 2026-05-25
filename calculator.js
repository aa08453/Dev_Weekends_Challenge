let activeTipPct = 15; // default active preset

function calculate() {
  // 1. Clear previous errors
  clearErrors();

  // 2. Grab inputs
  const bill = parseFloat(document.getElementById('bill').value);
  const customTip = document.getElementById('custom-tip').value;
  const people = parseInt(document.getElementById('people').value);

  let tipPct = customTip !== "" ? parseFloat(customTip) : activeTipPct;

  // 3. Fast Validation Interrupts
  let hasError = false;
  if (isNaN(bill) || bill <= 0) { showErr('bill-error', 'Must be a positive number'); hasError = true; }
  if (isNaN(tipPct) || tipPct < 0 || tipPct > 100) { showErr('tip-error', 'Tip must be 0-100%'); hasError = true; }
  if (isNaN(people) || people < 1) { showErr('people-error', 'Must be 1 or more people'); hasError = true; }
  
  if (hasError) return; // Stop math if data is garbage

  // 4. The Math
  const totalTipAmount = (bill * tipPct) / 100;
  const grandTotal = bill + totalTipAmount;
  
  // Your Rounding Policy: floor to cents, extract remainder
  const baseShareCents = Math.floor((grandTotal / people) * 100);
  const baseShare = baseShareCents / 100;
  
  const totalAccountedFor = (baseShare * people);
  const remainderCents = Math.round((grandTotal - totalAccountedFor) * 100);

  // 5. Update UI
  document.getElementById('total-tip').innerText = `$${totalTipAmount.toFixed(2)}`;
  document.getElementById('grand-total').innerText = `$${grandTotal.toFixed(2)}`;
  document.getElementById('per-person').innerText = `$${baseShare.toFixed(2)}`;

  const noteEl = document.getElementById('remainder-note');
  if (remainderCents > 0) {
    noteEl.innerText = `* ${remainderCents} person(s) must pay 1¢ extra ($${(baseShare + 0.01).toFixed(2)}) to clear the total.`;
    noteEl.classList.remove('hidden');
  } else {
    noteEl.classList.add('hidden');
  }
}