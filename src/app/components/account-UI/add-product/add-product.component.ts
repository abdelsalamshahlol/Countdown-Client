import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {

  fileName: ""
  productForm: FormGroup;
  constructor(
    private formBuilder: FormBuilder,
    private http: HttpClient
  ) { }

  ngOnInit() {
    this.productForm = this.formBuilder.group({
      name: '',
      description: '',
      category: 'tourism',
      value: 0,
      end_date: new Date(),
      main_img: ''
    })
  }

  addProduct(){
    this.http.post('http://localhost:8085/upload', this.productForm.value.main_img)
    console.log(this.productForm.value)
  }

  getFileName(event) {
    if (event.target.files.length !== 0) {
      this.fileName = event.target.files[0].name

    }
    console.log(event.target.files[0])
  }


}
