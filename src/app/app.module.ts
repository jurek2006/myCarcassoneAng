import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { BoardTileComponent } from './board/board-tile/board-tile.component';
import { DrawedTileComponent } from './drawed-tile/drawed-tile.component';
import { TestingComponent } from './testing/testing.component';
import { TestingDrawedTileComponent } from './testing/testing-drawed-tile/testing-drawed-tile.component';
import { TestingOccupiedFieldComponent } from './testing/testing-occupied-field/testing-occupied-field.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    BoardTileComponent,
    DrawedTileComponent,
    TestingComponent,
    TestingDrawedTileComponent,
    TestingOccupiedFieldComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
