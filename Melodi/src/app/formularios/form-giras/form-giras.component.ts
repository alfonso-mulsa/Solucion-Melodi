import { Component, ElementRef } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import $ from 'jquery';

@Component({
  selector: 'app-form-giras',
  templateUrl: './form-giras.component.html',
  styleUrl: './form-giras.component.css'
})
export class FormGirasComponent {
  formularioGiras = new FormGroup({
    giraId: new FormControl(),
    giraNombre: new FormControl(),
    giraGrupo: new FormControl(),
    giraFechaInicio: new FormControl(),
    giraFechaFin: new FormControl(),
    conciertoId: new FormControl(),
    conciertoFecha: new FormControl(),
    conciertoPais: new FormControl(),
    conciertoCiudad: new FormControl(),
    conciertoDireccion: new FormControl(),
  });
  numConciertos: number;
  idAModificar: string;
  constructor(private elemRef: ElementRef) {
    this.formularioGiras.get("giraGrupo")?.setValue("Elija el grupo/artista");
    this.numConciertos = 0;
    this.idAModificar = "";
  }
  onSubmit() {

  }

  ngOnInit() { // Se ejecuta al finalizar la carga de la página
     // Ocultar menú secundario 
    if (!$('.secondary-menu').hasClass('hide')) {
      $('.secondary-menu').addClass('hide');
    }
    if (!$('.navbar').hasClass('comeup')) {
      $('.navbar').addClass('comeup');
    }

    this.comprobarTabla();
  }

  comprobarTabla() {
    // Comprobar si en la tabla hay conciertos para habilitar/deshabilitar botones y checkbox. Si no hay conciertos, se muestra <span>"No hay conciertos"</span> en el HTML
    let tablaConciertos = this.elemRef.nativeElement.querySelector("#tablaConciertos");
    this.numConciertos = tablaConciertos.rows.length - 1;
    let btnModificar = this.elemRef.nativeElement.querySelector("#btModificar") as HTMLInputElement;
    btnModificar.disabled = false;
    let btnEliminar = this.elemRef.nativeElement.querySelector("#btEliminar") as HTMLInputElement;
    btnEliminar.disabled = false;
    let cbTodosConciertos = this.elemRef.nativeElement.querySelector("#cbTodosConciertos") as HTMLInputElement;
    cbTodosConciertos.checked = false;
    cbTodosConciertos.disabled = false;
    if (this.numConciertos == 0) {
      btnModificar.disabled = true;
      btnEliminar.disabled = true;
      cbTodosConciertos.disabled = true;
    }
    let btnConfirmar = this.elemRef.nativeElement.querySelector("#btConfirmar") as HTMLInputElement;
    btnConfirmar.style.display = "none";
    let btnCancelar = this.elemRef.nativeElement.querySelector("#btCancelar") as HTMLInputElement;
    btnCancelar.style.display = "none";
  }

  selecTodosConciertos() {
    // Iterar por las filas de la tabla y establecer el checkbox según el checkbox 'cbTodosConciertos'
    let cbTodosConciertos: HTMLInputElement = this.elemRef.nativeElement.querySelector("#cbTodosConciertos");
    let tablaConciertos = this.elemRef.nativeElement.querySelector("#tablaConciertos");
    for (let i = 1; i < tablaConciertos.rows.length; i++) {
      let celdaCB = tablaConciertos.rows[i].cells[0] as HTMLElement;
      let cbFila = celdaCB.firstChild as HTMLInputElement;
      cbFila.checked = cbTodosConciertos.checked;
    }
  }

  numFilasSeleccionadas(): number {
    // Iterar por las líneas de la tabla y retornar el número de filas seleccionadas
    let numFilasSelec = 0;
    let tablaConciertos = this.elemRef.nativeElement.querySelector("#tablaConciertos");
    for (let i = 1; i < tablaConciertos.rows.length; i++) {
      let celdaCB = tablaConciertos.rows[i].cells[0] as HTMLElement;
      let cbFila = celdaCB.firstChild as HTMLInputElement;
      if (cbFila.checked) {
        numFilasSelec++;
      }
    }
    return numFilasSelec;
  }

  esIdDuplicado(id: string): boolean {
    // Comprueba si el id ya existe en la tabla
    let tablaConciertos = this.elemRef.nativeElement.querySelector("#tablaConciertos");
    for (let i = 1; i < tablaConciertos.rows.length; i++) {
      if (tablaConciertos.rows[i].cells[1].textContent == id) {
        return true;
      }
    }
    return false;
  }

  anadeConcierto() {
    // Tomar los valores del formulario
    let id = this.formularioGiras.get("conciertoId")?.value;
    let fecha = this.formularioGiras.get("conciertoFecha")?.value;
    let pais = this.formularioGiras.get("conciertoPais")?.value;
    let ciudad = this.formularioGiras.get("conciertoCiudad")?.value;
    let direccion = this.formularioGiras.get("conciertoDireccion")?.value;
    // Comprobar si están rellenos todos los campos
    if (id == null || fecha == null || pais == null || ciudad == null || direccion == null) {
      alert("Debe de rellenar todos los campos del concierto.");
      return;
    }
    // Comprobar si el Id está duplicado
    if (this.numConciertos > 0 && this.esIdDuplicado(id)) {
      alert(`El id ${id} ya existe en la tabla.`);
      return;
    }
    // Añadir nuevo concierto a la tabla
    let tablaConciertos = this.elemRef.nativeElement.querySelector("#tablaConciertos");
    let nuevoConcierto = tablaConciertos.insertRow(tablaConciertos.rows.length);
    nuevoConcierto.innerHTML = `<td><input class="form-check-input" type="checkbox""></td>
      <th>${id}</th>
      <td>${fecha}</td>
      <td>${pais}</td>
      <td>${ciudad}</td>
      <td>${direccion}</td>`;

    this.comprobarTabla();
  }

  modificarConcierto() {
    // Comprobar que solo se ha seleccionado un concierto
    let numFilasSelec = this.numFilasSeleccionadas();
    if (numFilasSelec == 0) {
      alert("Tiene que seleccionar un concierto.");
      return;
    }
    if (numFilasSelec > 1) {
      alert("Solo se puede seleccionar un concierto.");
      return;
    }
    // Deshabilitar/habilitar botones y checkbox
    let btnAnadir = this.elemRef.nativeElement.querySelector("#btAnadir") as HTMLInputElement;
    btnAnadir.disabled = true;
    let btnModificar = this.elemRef.nativeElement.querySelector("#btModificar") as HTMLInputElement;
    btnModificar.disabled = true;
    let btnEliminar = this.elemRef.nativeElement.querySelector("#btEliminar") as HTMLInputElement;
    btnEliminar.disabled = true;
    let btnConfirmar = this.elemRef.nativeElement.querySelector("#btConfirmar") as HTMLInputElement;
    btnConfirmar.style.display = "";
    let btnCancelar = this.elemRef.nativeElement.querySelector("#btCancelar") as HTMLInputElement;
    btnCancelar.style.display = "";
    let cbTodosConciertos: HTMLInputElement = this.elemRef.nativeElement.querySelector("#cbTodosConciertos");
    cbTodosConciertos.disabled = true;

    // Iterar por la tabla para encontrar la fila marcada para modificar y poner los valores en los input del formulario
    let tablaConciertos = this.elemRef.nativeElement.querySelector("#tablaConciertos");
    for (let i = 1; i < tablaConciertos.rows.length; i++) {
      let celdaCB = tablaConciertos.rows[i].cells[0] as HTMLElement;
      let cbFila = celdaCB.firstChild as HTMLInputElement;
      if (cbFila.checked) {
        this.idAModificar = (tablaConciertos.rows[i].cells[1] as HTMLElement).textContent as string;
        this.formularioGiras.get("conciertoId")?.setValue(this.idAModificar);
        this.formularioGiras.get("conciertoFecha")?.setValue((tablaConciertos.rows[i].cells[2] as HTMLElement).textContent);
        this.formularioGiras.get("conciertoPais")?.setValue((tablaConciertos.rows[i].cells[3] as HTMLElement).textContent);
        this.formularioGiras.get("conciertoCiudad")?.setValue((tablaConciertos.rows[i].cells[4] as HTMLElement).textContent);
        this.formularioGiras.get("conciertoDireccion")?.setValue((tablaConciertos.rows[i].cells[5] as HTMLElement).textContent);
      }
      cbFila.disabled = true;
    }
  }

  confirmarModificacion() {
    // Comprobar si el id se ha modificado y está duplicado en la tabla
    let id = this.formularioGiras.get("conciertoId")?.value;
    if (id != this.idAModificar && this.esIdDuplicado(id)) {
      alert(`El id ${id} ya existe en la tabla.`);
      return;
    }
    // Iterar las filas de la tabla hasta la fila marcada para modificar y actualizar los datos de la fila
    let tablaConciertos = this.elemRef.nativeElement.querySelector("#tablaConciertos");
    for (let i = 1; i < tablaConciertos.rows.length; i++) {
      let celdaCB = tablaConciertos.rows[i].cells[0] as HTMLElement;
      let cbFila = celdaCB.firstChild as HTMLInputElement;
      if (cbFila.checked) {
        (tablaConciertos.rows[i].cells[1] as HTMLElement).textContent = id;
        (tablaConciertos.rows[i].cells[2] as HTMLElement).textContent = this.formularioGiras.get("conciertoFecha")?.value;
        (tablaConciertos.rows[i].cells[3] as HTMLElement).textContent = this.formularioGiras.get("conciertoPais")?.value;
        (tablaConciertos.rows[i].cells[4] as HTMLElement).textContent = this.formularioGiras.get("conciertoCiudad")?.value;
        (tablaConciertos.rows[i].cells[5] as HTMLElement).textContent = this.formularioGiras.get("conciertoDireccion")?.value;
      }
    }

    this.salirModificacion();
  }

  salirModificacion() {
    // Habilitar / deshabilitar los botones y checkbox
    let btnAnadir = this.elemRef.nativeElement.querySelector("#btAnadir") as HTMLInputElement;
    btnAnadir.disabled = false;
    let btnModificar = this.elemRef.nativeElement.querySelector("#btModificar") as HTMLInputElement;
    btnModificar.disabled = false;
    let btnEliminar = this.elemRef.nativeElement.querySelector("#btEliminar") as HTMLInputElement;
    btnEliminar.disabled = false;
    let btnConfirmar = this.elemRef.nativeElement.querySelector("#btConfirmar") as HTMLInputElement;
    btnConfirmar.style.display = "none";
    let btnCancelar = this.elemRef.nativeElement.querySelector("#btCancelar") as HTMLInputElement;
    btnCancelar.style.display = "none";
    let cbTodosConciertos: HTMLInputElement = this.elemRef.nativeElement.querySelector("#cbTodosConciertos");
    cbTodosConciertos.disabled = false;
    let tablaConciertos = this.elemRef.nativeElement.querySelector("#tablaConciertos");
    for (let i = 1; i < tablaConciertos.rows.length; i++) {
      let celdaCB = tablaConciertos.rows[i].cells[0] as HTMLElement;
      let cbFila = celdaCB.firstChild as HTMLInputElement;
      cbFila.disabled = false;
    }
  }

  eliminaConcierto() {
    // Comprobar que haya filas seleccionadas
    if (this.numFilasSeleccionadas() == 0) {
      alert("Tiene que seleccionar los conciertos a eliminar.");
      return;
    }
    // Confirmar el borrado de las filas seleccionadas
    if (confirm("¿Desea borrar los conciertos seleccionados?")) {
      // Iterar por las líneas de la tabla y eliminar las que tiene el checkbox marcado
      let tablaConciertos = this.elemRef.nativeElement.querySelector("#tablaConciertos");
      for (let i = tablaConciertos.rows.length - 1; i > 0; i--) {
        let celdaCB = tablaConciertos.rows[i].cells[0] as HTMLElement;
        let cbFila = celdaCB.firstChild as HTMLInputElement;
        if (cbFila.checked) {
          tablaConciertos.deleteRow(i);
        }
      }
    }

    this.comprobarTabla();
  }
}
