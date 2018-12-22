import { AuthService } from "./../auth.service";
import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";

@Component({
  selector: "app-register",
  templateUrl: "./register.component.html",
  styleUrls: ["./register.component.css"]
})
export class RegisterComponent implements OnInit {
  formData: any = {};
  errors: any[] = [];

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {}
  register(registerForm) {
    if (!registerForm.valid) return;
    this.errors = [];
    this.authService.register(this.formData).subscribe(
      res => {
        registerForm.reset();
        this.router.navigate(["/login", { registered: "success" }]);
      },
      errors => {
        this.errors = errors.error.error;
      }
    );
  }
}
