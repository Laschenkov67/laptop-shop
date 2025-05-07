import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { ProductService } from 'src/app/shared/product.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-page',
  templateUrl: './add-page.component.html',
  styleUrls: ['./add-page.component.sass']
})
export class AddPageComponent implements OnInit {

  form: UntypedFormGroup
  submitted = false

  constructor(
    private productServ: ProductService,
    private router: Router
  ) { }

  ngOnInit() {
    this.form = new UntypedFormGroup({
      type: new UntypedFormControl(null, Validators.required),
      title: new UntypedFormControl(null, Validators.required),
      photo: new UntypedFormControl(null, Validators.required),
      info: new UntypedFormControl(null, Validators.required),
      price: new UntypedFormControl(null, Validators.required),
    })
  }

  submit() {
    if (this.form.invalid) {
      return
    }

    this.submitted = true

    const product = {
      type: this.form.value.type,
      title: this.form.value.title,
      photo: this.form.value.photo,
      info: this.form.value.info,
      price: this.form.value.price,
      date: new Date()
    }

    console.log(this.form)
    this.productServ.create(product).subscribe( res => {
      this.form.reset()
      this.submitted = false
      this.router.navigate(['/'])
    })
  }

}
