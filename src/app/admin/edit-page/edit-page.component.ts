import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from 'src/app/shared/product.service';
import { switchMap } from 'rxjs/operators';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { Product } from 'src/app/shared/interfaces';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.sass']
})
export class EditPageComponent implements OnInit {

  form : UntypedFormGroup
  product: Product
  submitted = false

  constructor(
    private route: ActivatedRoute,
    private productServ: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.params.pipe(
      switchMap( params => {
        return this.productServ.getById(params['id'])
      })
    ).subscribe(product => {
      this.product = product
      this.form = new UntypedFormGroup({
        type: new UntypedFormControl(this.product.type, Validators.required),
      title: new UntypedFormControl(this.product.title, Validators.required),
      photo: new UntypedFormControl(this.product.photo, Validators.required),
      info: new UntypedFormControl(this.product.info, Validators.required),
      price: new UntypedFormControl(this.product.price, Validators.required),
      })

    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    this.productServ.update({
      ...this.product,
      type: this.form.value.type,
      title: this.form.value.title,
      photo: this.form.value.photo,
      info: this.form.value.info,
      price: this.form.value.price,
      date: new Date()
    }).subscribe( res => {
      this.submitted = false
      this.router.navigate(['/admin','dashboard'])
    })
  }
}
