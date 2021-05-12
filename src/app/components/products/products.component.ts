import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Product } from 'src/app/model/product.model';
import { AuthService } from 'src/app/services/auth.service';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  public userData : any = {};
  public addEditProductForm: FormGroup;
  public productList : Product[] = [];
  public productLength: number = 0;
  public selectedProduct: Product;
  public noProductAlert: boolean = false;
  public loadingAlert: boolean = true;

  public enableEditButton: boolean = false;


  constructor(private authService: AuthService,
              private productService: ProductService,
              private router: Router,
              private fb: FormBuilder) { }



  ngOnInit(): void {
    this.userData = JSON.parse(localStorage.getItem('user'));
    this.setAddEditForm();
    this.getProducts();
  }


  setAddEditForm() {
    this.addEditProductForm = this.fb.group({
        name: '',
        description: '',
        tag: '',
        price: '',
        isAvailable: false
    });
  }


  logout() {
    this.authService.logout().then(() => {
      this.router.navigate(['']);
    })
  }


  createProduct() {
    const product = this.addEditProductForm.value;
    console.log(product);
    

    this.productService.createProduct(this.addEditProductForm.value)
                        .then(res => {
                          console.log('Successfully Created: ', res.id);
                          this.setAddEditForm();
                          this.getProducts();
                        })
                        .catch(err => {
                          console.log('Error: ', err);
                        });
  }


  getProducts() {
    this.loadingAlert = true;

    this.productService.getProducts()
                        .then(productDocs => {
                          let products = [];
                          productDocs.forEach(productDocs => {
                            let product: Product;
                            product = productDocs.data();
                            product.id = productDocs.id;
                            products.push(product);
                          });
                          this.productList = products as [Product];

                          this.loadingAlert = false;
                          
                          this.productLength = this.productList.length;
                          if(this.productLength === 0) { 
                            this.noProductAlert = true; 
                            console.log('Zero');
                          } else { 
                            this.noProductAlert = false; 
                            console.log('No Zero');
                          }

                        })
                        .catch(err => {
                          console.log('Error: ', err);
                          this.loadingAlert = false;
                        });
  }


  setExistingProducts(product: Product) {
    this.addEditProductForm.get('name').setValue(product.name);
    this.addEditProductForm.get('description').setValue(product.description);
    this.addEditProductForm.get('tag').setValue(product.tag);
    this.addEditProductForm.get('price').setValue(product.price);
    this.addEditProductForm.get('isAvailable').setValue(product.isAvailable);
    this.enableEditButton = true;
    this.selectedProduct = product;
  }

  backToAddProduct() {
    this.enableEditButton = false;
    this.setAddEditForm();
  }


  editProduct() {
    const productId = this.selectedProduct.id;
    let product: Product = this.addEditProductForm.value;
    product.id = productId;

    this.productService.updateProduct(product)
                        .then(res => {
                          console.log('Successfully Edited');
                          this.setAddEditForm();
                          this.getProducts();
                        })
                        .catch(err => {
                          console.log('Error: ', err);
                        });
  }


  deleteProduct(product: Product) {
    const productId = product.id;    
    this.productService.deleteProduct(productId)
                        .then(res => {
                          console.log('Successfully Deleted');
                          this.getProducts();
                        })
                        .catch(err => {
                          console.log('Error: ', err);
                        });
  }
}



