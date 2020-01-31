import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AngularFireModule} from '@angular/fire';
import {environment} from '../environments/environment';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {
  MatDialogModule, MatFormFieldModule,
  MatIconModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatTreeModule
} from '@angular/material';
import { AngularFireDatabaseModule} from '@angular/fire/database';
import {MatButtonModule} from '@angular/material';
import { MarksListTreeComponent } from './marks-list-tree/marks-list-tree.component';
import { ModelsListComponent } from './models-list/models-list.component';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MarksHandlerComponent } from './marks-handler/marks-handler.component';
import {FormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';

@NgModule({
  declarations: [
    AppComponent,
    MarksListTreeComponent,
    ModelsListComponent,
    MarksHandlerComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    BrowserAnimationsModule,
    MatTreeModule,
    MatIconModule,
    MatButtonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatToolbarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatDialogModule,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,

  ],
  entryComponents: [
    MarksHandlerComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
