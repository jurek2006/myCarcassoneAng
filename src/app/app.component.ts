import { Component } from '@angular/core';
import { BoardService } from './board.service';
import { TilesService } from './tiles.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [BoardService, TilesService]
})
export class AppComponent {
  
}
