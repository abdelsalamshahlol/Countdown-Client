import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  fileName: string = '';
  constructor() { }

  ngOnInit() {
    
  }

  getFileName(event) {
    if (event.target.files.length !== 0) {
      this.fileName = event.target.files[0].name

    }
    console.log(this.fileName)
  }


}
