import { Component, inject } from '@angular/core';
import { User } from '../shared/services/model/User';
import { UserService } from '../shared/services/user.service';
import { CommonModule, NgFor, NgIf, NgTemplateOutlet } from '@angular/common';
import { AuthService } from '../shared/services/auth.service';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { EditUserComponent } from '../edit-user/edit-user/edit-user.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
@Component({
  selector: 'app-user-management',
  imports: [CommonModule,MatTableModule,
    MatIconModule,
    MatButtonModule,
    MatDialogModule],
  templateUrl: './user-management.component.html',
  styleUrl: './user-management.component.scss'
})
export class UserManagementComponent {
  users: User[] = [];
  dialog = inject(MatDialog);
  constructor(private userService:UserService,
    private authService:AuthService,
  private router:Router 
){}
displayedColumns: string[] = ['email', 'name', 'address', 'nickname','role', 'actions'];
  ngOnInit(){
    this.loadData();
  }
  deleteUser(user:User){
    this.userService.deleteuser(user).subscribe(res=>{
      this.loadData();
    })
  }
  editUser(user:User){
    const dialogRef = this.dialog.open(EditUserComponent, {
              data: user,
              height: '600px',
              width: '1000px',
            });
            dialogRef.afterClosed().subscribe(result => {
              if (result !== undefined) {
                this.loadData();
              }
    })
  }
  loadData(){
    this.userService.getAll().subscribe({
      next:(data)=>{
        this.users=data;
      },error:(err)=>{
        console.log(err);
      }
    });
  }
}
