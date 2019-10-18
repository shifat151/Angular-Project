import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ShoppingListService } from './shopping-list/shopping-list.service';
import { AppRoutingModule } from './app-routing.module';
import { RecipeService } from './recipes/recipe.service';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AuthInterceptorService } from './Auth/auth-interceptor.service';
import { SharedModule } from './shared/shared.module';
import { ErrorPageComponent } from './error-page/error-page.component';








@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ErrorPageComponent,






  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    SharedModule,
    HttpClientModule,



  ],
  providers: [ShoppingListService,
              RecipeService,
            {provide:HTTP_INTERCEPTORS, useClass:AuthInterceptorService,multi:true}],
  bootstrap: [AppComponent],

})
export class AppModule {}
