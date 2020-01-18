import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  files: string = '';
  constructor() { }

  ngOnInit() {
    
  }

  getFileName(event) {
    if (event.target.files.length !== 0) {
      // this.fileName = event.target.files[0].name
      for (var key in event.target.files) {
        if (event.target.files[key].name !== 'item' && event.target.files[key].name !== undefined){
          this.files += `${event.target.files[key].name}, `
          console.log(event.target.files[key].name)
        }
      }

    }
    console.log(this.files)
  }


}
