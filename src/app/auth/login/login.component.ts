import { AuthService } from "./../auth.service";
import { Component, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  formData: any = {};
  loginForm: FormGroup;
  errors: any[] = [];
  notifyMessage: string = "";
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    this.activatedRoute.paramMap.subscribe(params => {
      if (params.get("registered") === "success") {
        this.notifyMessage = "You have been registered, you can login now!";
      }
    });

    this.loginForm = this.fb.group({
      email: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "^[a-zA-Z0-9.!#$%&’*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:.[a-zA-Z0-9-]+)*$"
          )
        ]
      ],
      password: ["", Validators.required]
    });
  }

  login(loginForm) {
    if (!loginForm.valid) return;
    this.errors = [];
    this.authService.login(loginForm.value).subscribe(
      token => {
        loginForm.reset();
        this.router.navigate(["/rentals"]);
      },
      errors => {
        this.errors = errors.error.error;
      }
    );
  }
}
