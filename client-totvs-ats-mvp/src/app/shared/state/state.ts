import { ReplaySubject } from 'rxjs';
import { first } from 'rxjs/operators';

export class State<T> {

  private state = new ReplaySubject<T>(1);
  state$ = this.state.asObservable();
  public currentState: T;

  constructor() {
    this.state$.subscribe(state => this.currentState = state);
  }

  async getCurrentState(): Promise<T> {
    return this.state$.pipe<T>(first()).toPromise();
  }

  async setCurrentState(newState: T): Promise<T> {
    this.state.next(newState);
    return newState;
  }
}
