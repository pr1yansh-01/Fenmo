function rupeesToPaise(amount) {
  if (typeof amount === 'number') {
    if (!Number.isFinite(amount)) {
      throw new Error('Invalid amount: must be a finite number');
    }
    if (amount < 0) {
      throw new Error('Invalid amount: must be non-negative');
    }
    return Math.round(amount * 100);
  }

  if (typeof amount !== 'string') {
    throw new Error('Invalid amount: must be a string or number');
  }

  const trimmed = amount.trim();
  if (!trimmed) {
    throw new Error('Invalid amount: cannot be empty');
  }

  const regex = /^\d+(\.\d{1,2})?$/;
  if (!regex.test(trimmed)) {
    throw new Error('Invalid amount format: must be a positive number with up to 2 decimal places');
  }

  const parsed = parseFloat(trimmed);
  if (!Number.isFinite(parsed)) {
    throw new Error('Invalid amount: must be a finite number');
  }

  return Math.round(parsed * 100);
}

function paiseToRupees(amountPaise) {
  if (typeof amountPaise !== 'number' || !Number.isFinite(amountPaise)) {
    throw new Error('Invalid paise: must be a finite number');
  }
  if (amountPaise < 0) {
    throw new Error('Invalid paise: must be non-negative');
  }
  if (!Number.isInteger(amountPaise)) {
    throw new Error('Invalid paise: must be an integer');
  }

  const rupees = amountPaise / 100;
  return rupees.toFixed(2);
}

module.exports = {
  rupeesToPaise,
  paiseToRupees
};