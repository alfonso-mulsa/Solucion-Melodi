import { Component } from '@angular/core';
import $ from 'jquery';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'Melodi';

  ngOnInit() {
    $('.h-linkedin').click(function () {
      alert("Funciona JQuery");
    });
  }
}
