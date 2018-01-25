import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { ExtendedAngularFirestoreModule } from './providers/extended-angular-firestore/extended-angular-firestore.module';


import { AppComponent } from './app.component';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    ExtendedAngularFirestoreModule.forRoot({})
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
