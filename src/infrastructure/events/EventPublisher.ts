export interface EventPublisher {
  publish(event: DomainEvent): Promise<void>;
}
