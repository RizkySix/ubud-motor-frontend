const rpCurrency = (number) => {
    const currencyFormat = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 2,
    });
  
    return currencyFormat.format(number);
  }

export {rpCurrency}