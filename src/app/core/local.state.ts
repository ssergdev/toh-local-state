import { switchMap } from 'rxjs/operators';
import { RxState } from '@rx-angular/state';
import { Observable } from 'rxjs/internal/Observable';
import { Subject } from 'rxjs';

export function autoConnect<S extends object, A = any>(
  state: RxState<S>,
  callback: (args: A) => Observable<Partial<S>>
): (args?: A) => void {
  const subj = new Subject<A>();
  const obs$ = subj.pipe(switchMap((args) => callback(args)));
  state.connect(obs$);
  return (args?: A) => subj.next(args);
}
