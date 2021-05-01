import { first } from 'rxjs/operators';
import { State } from './state';

interface Person {
  age: number;
  name: string;
}

describe('State<T>', () => {
  it('o getState deve ser resolvido ao setar o state', async () => {
    const state = new State<Person>();
    const person: Person = {age: 12, name: 'John'};
    await state.setCurrentState(person);
    let newState = await state.getCurrentState();
    void expect(newState).toEqual(person);
    newState = await state.getCurrentState();
    void expect(newState).toEqual(person);
  });

  it('o setState deve chamar os listeners', (done) => {
    const state = new State<Person>();
    const person: Person = {age: 12, name: 'John'};
    state.state$.pipe(first()).subscribe({
      next: (newState) => {
        void expect(newState).toEqual(person);
        done();
      }
    });
    void state.setCurrentState(person);
  });
});
