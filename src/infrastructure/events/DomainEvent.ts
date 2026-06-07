export interface DomainEvent {
  type: string;
  payload: any;
  timestamp: string;
}
