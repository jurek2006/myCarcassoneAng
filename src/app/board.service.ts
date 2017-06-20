import { Tile } from './board/tile.model';
import { NewRowOrColPosition } from './board/newRowOrColPosition.model';

// BoardService przechowuje dane planszy
export class BoardService{
	board  = [	
		[new Tile(0, false, false), new Tile(1, false, true), new Tile(2,false, false) ], 
		[new Tile(0, false, true), new Tile(1, true, false), new Tile(2,false, true) ], 
		[new Tile(0, false, false), new Tile(1, false, true), new Tile(2,false, false) ]
	];

	boardLastRowIndex(): number{ 
		return this.board.length -1;
	}

	boardLastColIndex(): number{
	// należało by jeszcze sprawdzić, czy wszystkie wiersze mają tyle samo kolumn (muszą mieć!)
	// ale to powinno być zapewnione przez mechanizm dodawania kolumn
		return this.board[0].length -1;
	}

	putTileOnBoard(clickedBoardTile: Tile, rowIndex: number, colIndex: number){
	// clickedBoardTile - kliknięty Tile
	// rowIndex, colIndex - aktualne (w momencie kliknięcia) położenie klikniętego Tile w tabeli-planszy

		// sprawdzenie czy w ogóle można było kliknąć w Tile (czy jest aktywny)
		// i czy kliknięty Tile to jest ten sam co położony w tablicy board
		// tak powinno być zawsze - jeśli jest inaczej, to nastąpił jakiś błąd
		if(clickedBoardTile.active && clickedBoardTile === this.board[rowIndex][colIndex]){

			let newRowOrColPosition: NewRowOrColPosition;

			// z natury planszy i aktywowania pól bycie w pierwszym/ostatnim wierszu 
			// i pierwszej/ostatniej kolumnie wzajemnie się wykluczają.
			if(rowIndex === 0){
			// jeśli kliknięty tile jest w pierwszym wierszu (na górze planszy)
				newRowOrColPosition = NewRowOrColPosition.Top;
			}else if(rowIndex === this.boardLastRowIndex()){
			// jeśli kliknięty tile jest w ostatnim wierszu (na dole planszy)
				newRowOrColPosition = NewRowOrColPosition.Bottom;
			}else if(colIndex === 0){
			// jeśli kliknięty tile jest w pierwszej kolumnie (na lewym skraju planszy)
				newRowOrColPosition = NewRowOrColPosition.Left;
			}else if(colIndex === this.boardLastColIndex()){
			// jeśli kliknięty tile jest w ostatniej kolumnie (na prawym skraju planszy)
				newRowOrColPosition = NewRowOrColPosition.Right;
			}
			this.addBoardColOrRow(newRowOrColPosition);

		}else{
			console.log("Nastąpił błąd - clickedBoardTile nie odpowiada temu z board[rowIndex][colIndex]");
		}
	}

	addBoardColOrRow(newRowOrColPosition: NewRowOrColPosition){
	// funkcja dodająca wiersz lub kolumnę na skraju tabeli, 
	// w położeniu zdefiniowanym w newRowOrColPosition (Top, Bottom, Left, Right)

		const addRow = (newRowPosition: NewRowOrColPosition) => {

			// stworzenie nowego wiersza
			let newRow: Tile[] = [];
			for(let i = 0; i < this.boardLastColIndex()+1; i++){
				newRow.push(new Tile(9,false,false));
			}

			if(newRowPosition === NewRowOrColPosition.Top){
				this.board.unshift(newRow);
			}else if(newRowPosition === NewRowOrColPosition.Bottom){
				this.board.push(newRow);
			}
		}

		const addCol = (newRowPosition: NewRowOrColPosition) => {
			for(let i = 0; i < this.boardLastRowIndex()+1; i++){

				if(newRowPosition === NewRowOrColPosition.Left){
					this.board[i].unshift(new Tile(9,false,false));
				}else if(newRowPosition === NewRowOrColPosition.Right){
					this.board[i].push(new Tile(9,false,false));
				}
			}
		}

		if(	newRowOrColPosition === NewRowOrColPosition.Top || newRowOrColPosition === NewRowOrColPosition.Bottom){
			addRow(newRowOrColPosition);

		}else if( newRowOrColPosition === NewRowOrColPosition.Left || newRowOrColPosition === NewRowOrColPosition.Right){
			addCol(newRowOrColPosition);
		}

	}
}