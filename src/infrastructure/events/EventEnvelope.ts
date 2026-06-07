export interface EventEnvelope<T> {
  metadata: Record<string, any>;
  data: T;
}
