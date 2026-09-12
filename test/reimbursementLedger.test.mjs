import { test, describe } from 'node:test';
import assert from 'node:assert';
import { AccountLedger } from '../src/reimbursementLedger.mjs';

describe('FSA HSA Reimbursement Ledger Suite', () => {
  test('should process contributions and debits with strict double-entry balance updates', () => {
    const ledger = new AccountLedger(500);
    ledger.postTransaction('CONTRIBUTION', 250, 'Payroll Pre-Tax Deduction');
    assert.strictEqual(ledger.balance, 750);

    ledger.postTransaction('DISBURSEMENT', 150, 'Prescription Co-pay Reimbursement');
    assert.strictEqual(ledger.balance, 600);
  });

  test('should prevent disbursement exceeding available balance', () => {
    const ledger = new AccountLedger(100);
    assert.throws(() => ledger.postTransaction('DISBURSEMENT', 200, 'Dental Surgery'), /Insufficient account funds/);
  });
});
