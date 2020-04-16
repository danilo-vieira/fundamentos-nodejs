import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface TransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions;
  }

  public getBalance(): Balance {
    const [inValue, outValue] = this.transactions.reduce(
      (arr, transaction) => {
        if (transaction.type === 'income') {
          arr.splice(0, 1, arr[0] + transaction.value);
        } else {
          arr.splice(1, 1, arr[1] + transaction.value);
        }
        return arr;
      },
      [0, 0],
    );

    const balance = {
      income: inValue,
      outcome: outValue,
      total: inValue - outValue,
    };

    return balance;
  }

  public create({ title, value, type }: TransactionDTO): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
