import { Component, OnInit } from '@angular/core';
import { ProductService } from '../shared/product.service';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { OrderService } from '../shared/order.service';

@Component({
  selector: 'app-cart-page',
  templateUrl: './cart-page.component.html',
  styleUrls: ['./cart-page.component.sass']
})
export class CartPageComponent implements OnInit {

  cartProducts = []
  totalPrice = 0
  added = ''

  form : UntypedFormGroup
  submitted = false

  constructor(
    private productServ : ProductService,
    private orderServ : OrderService
  ) { }

  ngOnInit() {
    this.cartProducts = this.productServ.cartProducts
    for (let i = 0; i < this.cartProducts.length; i++) {
      this.totalPrice += +this.cartProducts[i].price
      
    }

    this.form = new UntypedFormGroup({
      name: new UntypedFormControl(null, Validators.required),
      phone: new UntypedFormControl(null, Validators.required),
      address: new UntypedFormControl(null, Validators.required),
      payment: new UntypedFormControl('Cash'),
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    const order = {
      name: this.form.value.name,
      phone: this.form.value.phone,
      address: this.form.value.address,
      payment: this.form.value.payment,
      orders: this.cartProducts,
      price: this.totalPrice,
      date: new Date()
    }

    console.log(this.form)
    this.orderServ.create(order).subscribe( res => {
      this.form.reset()
      this.added = 'Delivery is framed'
      this.submitted = false
    })
  }

  delete(product) {
    this.totalPrice -= +product.price
    this.cartProducts.splice(this.cartProducts.indexOf(product), 1)
  }

}
