import { Injectable } from '@angular/core';
import { Mode } from './mode';
import { MODES } from './modes';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModeService 
{

  constructor() { }

  getMode(id: number) : Observable<Mode>
  {
    const mode = MODES.find(m => m.id === id)!;
    return of(mode);
  }
}
