import { Component, OnInit } from '@angular/core';
import { FileItem } from '../../models/file-item';
import { CargaImagenesService } from '../../services/carga-imagenes.service';

@Component({
  selector: 'app-carga',
  templateUrl: './carga.component.html',
  styles: []
})
export class CargaComponent implements OnInit {
  
  private estaSobreElemento = false;
  archivos: FileItem[] = [];

  constructor(private _ci: CargaImagenesService) { }

  ngOnInit() {
  }
  
  cargaArchivos() {
    this._ci.cargarImagenesFirebase(this.archivos);
  }
  
  limpiarArchivos() {
    this.archivos = [];
  }

}
