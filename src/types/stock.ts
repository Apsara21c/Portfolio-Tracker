export interface Stock {
  _id: string;
  symbol: string;
  name: string;
  quantity: number;
  buyPrice: number;
  currentPrice: number;
}

export interface PortfolioMetrics {
  totalValue: number;
  totalGainLoss: number;
  topPerformer: Stock | null;
  worstPerformer: Stock | null;
}