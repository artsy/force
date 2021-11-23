let _Auction;
const { Sale } = require('./sale');

export default (_Auction = class Auction extends Sale {});
export const Auction = _Auction
  // Deprecated
