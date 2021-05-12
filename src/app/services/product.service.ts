import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
import { Product } from '../model/product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  public productCollection : AngularFirestoreCollection<Product>;
  public productDocument : AngularFirestoreDocument<Product>;
  public products : Observable<Product[]>;

  constructor(private angularFirestore: AngularFirestore) {
    try {
      this.productCollection = this.angularFirestore.collection('products');
    } catch (error) {
      console.log('Error: ', error);
    }
  }

  createProduct(product: Product) {
    return this.productCollection.add(product);
  }

  getProducts() {
    return this.productCollection.ref.get();
  }

  updateProduct(product: Product) {
    this.productDocument = this.angularFirestore.doc(`products/${product.id}`);
    return this.productDocument.update(product);
  }

  deleteProduct(id: string) {
    console.log("ID: ", id);
    this.productDocument = this.angularFirestore.doc(`products/${id}`);
    return this.productDocument.delete();
  }
}
