import { Injectable } from '@angular/core';
import {AngularFireDatabase} from '@angular/fire/database';
import {Observable} from 'rxjs';
import {Mark, Model} from '../definitions';

@Injectable({
  providedIn: 'root'
})
export class MarkService {


  constructor(private db: AngularFireDatabase) {

  }

  getMarks(): Observable<Mark[]> {
    return this.db.list<Mark>('/marks').valueChanges();
  }

  setMark(mark: Mark) {
    return this.db.database.ref('/marks').child(mark.id.toString()).set(mark);
  }

  setModel(model: Model){
    return this.db.database.ref('/marks').child(model.markId.toString()).child('models').child(model.id.toString()).set(model);
  }

  getModelsByMarkId(id: number){
    return this.db.list<Model>(`/marks/${id}/models`).valueChanges();
  }

}
