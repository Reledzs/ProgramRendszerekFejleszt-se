import { Component, inject, model } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from '@angular/material/input';
import { UserService } from "../../shared/services/user.service";
import { User } from "../../shared/services/model/User";
import { MatDialogModule } from "@angular/material/dialog";
import { MatCheckbox, MatCheckboxModule } from "@angular/material/checkbox";
@Component({
  selector: 'edit-user-dialog',
  standalone: true,
  templateUrl: './edit-user.component.html',
  imports: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatCheckboxModule,
  ],
})
export class EditUserComponent {
  title="";
  selectedFile: File | null = null;
  userservice = inject(UserService); 
  check=false;
  user:User = inject<User>(MAT_DIALOG_DATA)?? {
    name: '',
    email: '',
    nickname: '',
    address: '',
    role: '',
  };
  toggleAdmin(checked: boolean) {
  if (checked) {
    this.user.role="Admin";
  } else {
    this.user.role="User";
  }
  }
  ngOnInit(){
    if(this.user.name==''){
      this.title="Új felhasználó hozzáadása"
    }
    else{
      this.title="Felhasználó szerkesztése"
    }
  }
  readonly dialogRef = inject(MatDialogRef<EditUserComponent>);
  onSave() {
    this.userservice.updateUser(this.user).subscribe({
    next: () => this.dialogRef.close('referesh'),
    error: (err: any) => console.error('Hiba mentés közben:', err)
    });
  }
  onCancel() {
    this.dialogRef.close();
  }
}

