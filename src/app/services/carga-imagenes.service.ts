import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore';
import * as firebase from 'firebase';
import { FileItem } from '../models/file-item'
@Injectable()
export class CargaImagenesService {
  
  private CARPETA_IMAGENES = 'img';

  constructor(private db: AngularFirestore) { }
  
  cargarImagenesFirebase (imagenes: FileItem[]){
    const storageRef = firebase.storage().ref();
    
    for(const imagen of imagenes) {
      imagen.estaSubiendo = true;
      if(imagen.progreso >= 100) {
        continue;
      }
      
      const uploadTask: firebase.storage.UploadTask = storageRef.child(`${this.CARPETA_IMAGENES}/${imagen.nombreArchivo}`).put(imagen.archivo);
      
      uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot: any) => {
          imagen.progreso = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        },
        () => {
          console.log(uploadTask)
           uploadTask.snapshot.ref.getDownloadURL().then(
            (urlImagen) => {
                 imagen.url = urlImagen;
              imagen.estaSubiendo = false;
              this.guardarImagen({
                nombre: imagen.nombreArchivo,
                url: imagen.url
              });
            } 
          )
        }           
      );
    }
  }


  private guardarImagen(imagen: {nombre:string, url: string}) {
    this.db.collection(`/${this.CARPETA_IMAGENES}`)
    .add(imagen);
  }
}
