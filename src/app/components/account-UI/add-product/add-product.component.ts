import { Component, OnInit } from '@angular/core';
import {FormArray, FormBuilder, FormControl, FormGroup} from "@angular/forms";
import { HttpClient } from '@angular/common/http';
import { ProductService } from 'src/app/services';
import { Product } from '../../../models/product'

@Component({
  selector: 'app-add-product',
  templateUrl: './add-product.component.html',
  styleUrls: ['./add-product.component.scss']
})
export class AddProductComponent implements OnInit {
  product: Product;
  name: string;
  owner: string;
  description: string;
  category: string;
  value: number;
  end_date: Date;
  main_img: string;
  filesToUpload: any;
  myForm: FormGroup;
  fileName: any;
  productForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private http: HttpClient,
    private productService: ProductService
  ) { }

  ngOnInit() {
    this.myForm = this.fb.group({chosenfiles: this.fb.array([])});
    this.productForm = this.fb.group({
      name: '',
      description: '',
      category: 'tourism',
      value: 0,
      end_date: new Date(),
      main_img: ''
    })
  }

  addProduct() {
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    const chosenf = <FormArray> this.myForm.controls["chosenfiles"];
    for(let i =0; i < files.length; i++){
      formData.append("uploads[]", files[i], files[i]['name']);
      chosenf.push(new FormControl(files[i]['name']));
    }
    this.http.post('http://localhost:8085/api/upload', formData)
      .subscribe(files => {
        this.name = this.productForm.value.name,
        this.description = this.productForm.value.description,
        this.category = this.productForm.value.category,
        this.value = this.productForm.value.value,
        this.end_date = this.productForm.value.end_date,
        this.main_img = "http://localhost:8085/api/uploads/" + files[0].filename
        this.productService.addProduct({
          name: this.name,
          owner: JSON.parse(localStorage.currentUser).userId,
          description: this.description,
          category: this.category,
          value: this.value,
          end_date: this.end_date,
          main_img: this.main_img
        }).subscribe((data) => {
          console.log(data)
        })
      });
  }

  fileChangeEvent(fileInput: any) {
    this.filesToUpload = <Array<File>>fileInput.target.files;
    this.fileName = this.filesToUpload[0].name
    const formData: any = new FormData();
    const files: Array<File> = this.filesToUpload;
    const chosenf = <FormArray> this.myForm.controls["chosenfiles"];
    for(let i =0; i < files.length; i++){
      formData.append("uploads[]", files[i], files[i]['name']);
      chosenf.push(new FormControl(files[i]['name']));
    }
}


}
