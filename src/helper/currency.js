const rpCurrency = (number) => {
    const currencyFormat = new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
    });
  
    return currencyFormat.format(number);
  }

export {rpCurrency}