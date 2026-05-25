let activeTipPct = 15; // default active preset

function calculate() {
  // 1. Clear previous errors
  clearErrors();

  // 2. Grab inputs
  const billVal = document.getElementById('bill').value;
  const customTipVal = document.getElementById('custom-tip').value;
  const peopleVal = document.getElementById('people').value;

  // Handle empty states gracefully instead of showing instant errors on empty inputs
  if (billVal === "" && customTipVal === "" && peopleVal === "1") {
    resetUI();
    return;
  }

  const bill = parseFloat(billVal);
  const people = parseInt(peopleVal);
  let tipPct = customTipVal !== "" ? parseFloat(customTipVal) : activeTipPct;

  // 3. Fast Validation Interrupts
  let hasError = false;
  
  if (billVal !== "" && (isNaN(bill) || bill <= 0)) { 
    showErr('bill-error', 'Must be a positive number'); 
    hasError = true; 
  }
  if (customTipVal !== "" && (isNaN(tipPct) || tipPct < 0 || tipPct > 100)) { 
    showErr('tip-error', 'Tip must be 0-100%'); 
    hasError = true; 
  }
  if (peopleVal !== "" && (isNaN(people) || people < 1)) { 
    showErr('people-error', 'Must be 1 or more people'); 
    hasError = true; 
  }
  
  // If inputs are incomplete or broken, don't update math totals yet
  if (hasError || isNaN(bill) || isNaN(people)) return; 

  // 4. The Math
  const totalTipAmount = (bill * tipPct) / 100;
  const grandTotal = bill + totalTipAmount;
  
  // Rounding Policy: floor to cents, extract remainder
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
    noteEl.style.display = "block"; // show note
  } else {
    noteEl.style.display = "none"; // hide note
  }
}

// --- HELPER FUNCTIONS (Missing in your original snippet) ---

function showErr(id, message) {
  const errEl = document.getElementById(id);
  if (errEl) errEl.innerText = message;
}

function clearErrors() {
  const errors = document.querySelectorAll('.error-msg');
  errors.forEach(err => err.innerText = "");
}

function resetUI() {
  document.getElementById('total-tip').innerText = "$0.00";
  document.getElementById('grand-total').innerText = "$0.00";
  document.getElementById('per-person').innerText = "$0.00";
  document.getElementById('remainder-note').style.display = "none";
}

// --- EVENT LISTENERS (Tying HTML to JS) ---

// 1. Listen for typing events on numeric fields
document.getElementById('bill').addEventListener('input', calculate);
document.getElementById('custom-tip').addEventListener('input', (e) => {
  // If user types a custom tip, clear preset visual selections
  document.querySelectorAll('.preset-btn').forEach(btn => btn.style.fontWeight = 'normal');
  calculate();
});
document.getElementById('people').addEventListener('input', calculate);

// 2. Listen for clicks on preset percentage buttons
document.querySelectorAll('.preset-btn').forEach(button => {
  button.addEventListener('click', (e) => {
    // Clear custom input field
    document.getElementById('custom-tip').value = "";
    
    // Set active percentage from data-pct attribute
    activeTipPct = parseFloat(e.target.getAttribute('data-pct'));
    
    // Simple visual cue: bold the active button text
    document.querySelectorAll('.preset-btn').forEach(btn => btn.style.fontWeight = 'normal');
    e.target.style.fontWeight = 'bold';
    
    calculate();
  });
});

// 3. Listen for Reset Button
document.getElementById('reset-btn').addEventListener('click', () => {
  document.getElementById('bill').value = "";
  document.getElementById('custom-tip').value = "";
  document.getElementById('people').value = "1";
  document.querySelectorAll('.preset-btn').forEach(btn => btn.style.fontWeight = 'normal');
  activeTipPct = 15; // default back
  clearErrors();
  resetUI();
});