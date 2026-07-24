export class AccountLedger {
  constructor(initialBalance = 0) {
    this.balance = initialBalance;
    this.entries = [];
  }

  postTransaction(type, amount, description) {
    if (amount <= 0) throw new Error('Transaction amount must be positive');

    if (type === 'DISBURSEMENT') {
      if (this.balance < amount) throw new Error('Insufficient account funds for disbursement');
      this.balance -= amount;
      this.entries.push({ type: 'DEBIT', amount, balanceAfter: this.balance, description, timestamp: new Date().toISOString() });
    } else if (type === 'CONTRIBUTION') {
      this.balance += amount;
      this.entries.push({ type: 'CREDIT', amount, balanceAfter: this.balance, description, timestamp: new Date().toISOString() });
    } else {
      throw new Error(`Unknown transaction type ${type}`);
    }

    return { balance: this.balance, entriesCount: this.entries.length };
  }
}
