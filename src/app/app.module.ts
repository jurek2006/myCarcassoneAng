import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';
import { BoardComponent } from './board/board.component';
import { BoardTileComponent } from './board/board-tile/board-tile.component';
import { DrawedTileComponent } from './drawed-tile/drawed-tile.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    BoardTileComponent,
    DrawedTileComponent
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
