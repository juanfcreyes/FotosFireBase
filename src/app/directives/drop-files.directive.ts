import { Directive, EventEmitter, ElementRef, HostListener, Input, Output } from '@angular/core';
import { FileItem } from '../models/file-item';

@Directive({
  selector: '[appDropFiles]'
})
export class DropFilesDirective {
  
  @Input() archivos: FileItem[] = [];
  
  @Output() mouseSobre: EventEmitter<boolean> = new EventEmitter();
  
  constructor() { }
  
  @HostListener('dragover', ['$event'])
  public onDragEnter(event: any) {
    this.mouseSobre.emit(true);
    this.prevenirDetener(event);
  }
  
  @HostListener('dragleave', ['$event'])
  public onDragLeave(event: any) {
    this.mouseSobre.emit(false);
  }
  
  @HostListener('drop', ['$event'])
  public onDrop(event: any) {
    const transferencia = this.getTransferencia(event);
    if(!transferencia){
      return;
    }
    this.extraerArchivos(transferencia.files);
    this.prevenirDetener(event);
    this.mouseSobre.emit(false);
  }
  
  private getTransferencia(event: any) {
    return event.dataTransfer ? event.dataTransfer : event.originalEvent.dataTransfer;
  }
  
  private extraerArchivos(listaArchivos: FileList) {
    for(const propiedad in Object.getOwnPropertyNames(listaArchivos)) {
      const archivoTemporal = listaArchivos[propiedad];
      if(this.puedeSerCargado(archivoTemporal)) {
        const nuevoArchivo = new FileItem(archivoTemporal);
        this.archivos.push(nuevoArchivo);
      }
    }
  }
  
  private puedeSerCargado(archivo: File): boolean {
    return !this.archivoDroppeado(archivo.name) && this.esImagen(archivo.type);
  }
  
  private prevenirDetener(event) {
    event.preventDefault();
    event.stopPropagation();
  }
  
  private archivoDroppeado( nombreArchivo: string) : boolean {
    for(const archivo of this.archivos) {
      if(archivo.nombreArchivo == nombreArchivo) {
        return true;
      }
    }
    
    return false;
  }
  
  private esImagen (tipoArchivo: string): boolean {
    return(!tipoArchivo || tipoArchivo === '') ? false : tipoArchivo.startsWith('image');
  }

}
