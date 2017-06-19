import { Tile } from './board/tile.model';

// BoardService przechowuje dane planszy
export class BoardService{
	board  = [	
		[new Tile(0, false, false), new Tile(1, false, true), new Tile(2,false, false) ], 
		[new Tile(0, false, true), new Tile(1, true, false), new Tile(2,false, true) ], 
		[new Tile(0, false, false), new Tile(1, false, true), new Tile(2,false, false) ]
	];
}