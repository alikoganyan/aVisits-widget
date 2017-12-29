import { Component, OnInit } from '@angular/core';
import {Styling} from '../../services/styling';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.scss']
})
export class LoaderComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }


  loaderStyles() {
    return {
      fontSize: '6px',
      borderLeftColor: Styling.color
    }
  }

}
