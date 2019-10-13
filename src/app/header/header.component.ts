import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { AuthService } from '../Auth/auth.service';
import { Subscription } from 'rxjs';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit, OnDestroy{
  isAuthenticated=false;
  private userSub:Subscription;

  constructor(private dataStorageService: DataStorageService,private authService:AuthService) { }
  //For subscribing to user authetication status
  ngOnInit() {
    this.userSub=this.authService.userOb.subscribe(user=>{
      this.isAuthenticated= !user ? false:true;
      console.log(this.isAuthenticated);

    });
  }

  // Save data into database
  onSaveData(){
    this.dataStorageService.storeRecipesData();
  }
  // Fetch data from database
  onFetchData(){
    this.dataStorageService.fetchRecipeData().subscribe();
  }
  onLogout(){
    this.authService.logOut();
  }

  ngOnDestroy(){

  }




}
