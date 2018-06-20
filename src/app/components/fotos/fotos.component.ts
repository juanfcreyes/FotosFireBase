import { Component, OnInit } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs';

export interface Item { nombre: string; url: string; }

@Component({
  selector: 'app-fotos',
  templateUrl: './fotos.component.html',
  styles: []
})
export class FotosComponent implements OnInit {

  private itemsCollection: AngularFirestoreCollection<Item>;
  imagenes: Observable<Item[]>;
  
  constructor(private afs: AngularFirestore) { 
    this.itemsCollection = afs.collection<Item>('img');
    this.imagenes = this.itemsCollection.valueChanges();
  }

  ngOnInit() {
  }

}