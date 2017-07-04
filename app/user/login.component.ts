import {Component,OnInit} from '@angular/core'
import{AuthService} from './auth.service'
import{Router} from '@angular/router'


@Component({
  
  templateUrl:'app/user/login.component.html',
  styleUrls:['app/user/login.component.css']


})

export class LoginComponent{
 loading = false
 error = ''
 user  ={ username :"",
          password : ""
               }

constructor(private authService:AuthService, private router:Router){

}


 
    ngOnInit() {
        this.authService.logoutUser();
    }


 login(formValues){
    this.loading = true
     this.user.username = formValues.userName
     this.user.password = formValues.password

    console.log(formValues.userName,formValues.password)
    console.log(this.user.password)

    this.authService.loginUser(this.user)
       .subscribe(result =>{
      
            if(result){
              console.log(result)
                  this.router.navigate(['/events'])

            }
       },(err)=>{
               this.error = 'Username or Passowrd is incorrect'
               this.loading = false
       })

 }  
}