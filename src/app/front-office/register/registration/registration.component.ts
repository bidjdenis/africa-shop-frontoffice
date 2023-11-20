import { Component, OnInit, TemplateRef } from '@angular/core';
import { User } from '../models/user.model';
import { UserService } from '../service/user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzNotificationService } from 'ng-zorro-antd/notification';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.scss']
})
export class RegistrationComponent implements OnInit {

  user: User = new User();
  confirmPassword: any;
  userForm!: FormGroup;
  message: string | undefined;
  status: number | undefined;
  isLoading: boolean = false;


  constructor(private service: UserService, private fb: FormBuilder, private notification: NzNotificationService) { }

  ngOnInit(): void {
    this.userForm = this.fb.group({
      firstname: ['', Validators.required],
      name: ['', Validators.required],
      phone: ['', Validators.required],
      username: ['', Validators.required],
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  makeForm(user: User): void {

  }

  saveForm(template: TemplateRef<{}>) {
    if (this.userForm.valid) {
      this.isLoading = true;
      const formData = this.userForm.value;
      this.service.addUser(formData).subscribe((response: any) => {
        if (response.success == false) {
          this.status = 0;
          this.message = response.message;
          this.isLoading = false;
        } else if (response.success == true) {
          this.status = 1;
          this.message = response.message;
          this.userForm.reset();
          this.isLoading = false;
        }
      });
    }

  }

  afterClose(): void {
    console.log('close');
  }

}
