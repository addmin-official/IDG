export interface AnalyticsGateway {
  getMetricTrends(metricName: string): Promise<any>;
}
