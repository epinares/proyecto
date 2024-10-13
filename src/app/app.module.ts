import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';  // Animaciones de Angular
import { MatCardModule } from '@angular/material/card';  // Componente de Angular Material

// Importa el módulo de Ionic Storage (si es necesario)
import { IonicStorageModule } from '@ionic/storage-angular';
// Importa SQLite
import { SQLite } from '@ionic-native/sqlite/ngx';
// Importa HttpClientModule
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule, 
    IonicModule.forRoot(), 
    AppRoutingModule,
    MatCardModule,
    HttpClientModule,  // Módulo para realizar peticiones HTTP
    BrowserAnimationsModule,  // Módulo de animaciones de Angular
    IonicStorageModule.forRoot()  // Solo si planeas usar Ionic Storage
  ],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    SQLite  // Proveedor de SQLite
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
