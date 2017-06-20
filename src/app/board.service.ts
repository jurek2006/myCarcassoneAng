import { BoardField, BoardFieldStatus } from './board/board-field.model';
import { NewRowOrColPosition } from './board/newRowOrColPosition.model';

// BoardService przechowuje dane planszy
export class BoardService{
	board  = [	
		[new BoardField(0, BoardFieldStatus.Inactive), new BoardField(1, BoardFieldStatus.Active), new BoardField(2,BoardFieldStatus.Inactive) ], 
		[new BoardField(0, BoardFieldStatus.Active), new BoardField(1, BoardFieldStatus.Occupied), new BoardField(2,BoardFieldStatus.Active) ], 
		[new BoardField(0, BoardFieldStatus.Inactive), new BoardField(1, BoardFieldStatus.Active), new BoardField(2,BoardFieldStatus.Inactive) ]
	];

	boardLastRowIndex(): number{ 
		return this.board.length -1;
	}

	boardLastColIndex(): number{
	// należało by jeszcze sprawdzić, czy wszystkie wiersze mają tyle samo kolumn (muszą mieć!)
	// ale to powinno być zapewnione przez mechanizm dodawania kolumn
		return this.board[0].length -1;
	}

	putTileOnBoard(clickedBoardField: BoardField, rowIndex: number, colIndex: number){
	// clickedBoardField - kliknięte pole planszy na którym układany jest Tile/Klocek
	// rowIndex, colIndex - aktualne (w momencie kliknięcia) położenie klikniętego pola planszy w tabeli-planszy

		// sprawdzenie czy w ogóle można było kliknąć w pole planszy (czy jest aktywne)
		// i czy kliknięte pole to jest to samo, co położone w tablicy board o umiejscowieniu [rowIndex, colIndex]
		// tak powinno być zawsze - jeśli jest inaczej, to nastąpił jakiś błąd
		if(clickedBoardField.boardFieldStatus === BoardFieldStatus.Active 
			&& clickedBoardField === this.board[rowIndex][colIndex]){


			// --------------------------------------------------------------------------
			// Dodawanie wiersza lub kolumny jeśli to potrzebne - żeby umieścić nowy element aktywny
			let newRowOrColPosition: NewRowOrColPosition;

			// z natury planszy i aktywowania pól bycie w pierwszym/ostatnim wierszu 
			// i pierwszej/ostatniej kolumnie wzajemnie się wykluczają.
			if(rowIndex === 0){
			// jeśli kliknięte pole jest w pierwszym wierszu (na górze planszy)
				newRowOrColPosition = NewRowOrColPosition.Top;
			}else if(rowIndex === this.boardLastRowIndex()){
			// jeśli kliknięte pole jest w ostatnim wierszu (na dole planszy)
				newRowOrColPosition = NewRowOrColPosition.Bottom;
			}else if(colIndex === 0){
			// jeśli kliknięte pole jest w pierwszej kolumnie (na lewym skraju planszy)
				newRowOrColPosition = NewRowOrColPosition.Left;
			}else if(colIndex === this.boardLastColIndex()){
			// jeśli kliknięte pole jest w ostatniej kolumnie (na prawym skraju planszy)
				newRowOrColPosition = NewRowOrColPosition.Right;
			}
			this.addBoardColOrRow(newRowOrColPosition);

		}else{
			console.log("Nastąpił błąd - clickedBoardField nie odpowiada temu z board[rowIndex][colIndex]");
		}
	}

	addBoardColOrRow(newRowOrColPosition: NewRowOrColPosition){
	// funkcja dodająca wiersz lub kolumnę na skraju tabeli, 
	// w położeniu zdefiniowanym w newRowOrColPosition (Top, Bottom, Left, Right)

		const addRow = (newRowPosition: NewRowOrColPosition) => {

			// stworzenie nowego wiersza
			let newRow: BoardField[] = [];
			for(let i = 0; i < this.boardLastColIndex()+1; i++){
				newRow.push(new BoardField(9,BoardFieldStatus.Inactive));
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
					this.board[i].unshift(new BoardField(9,BoardFieldStatus.Inactive));
				}else if(newRowPosition === NewRowOrColPosition.Right){
					this.board[i].push(new BoardField(9,BoardFieldStatus.Inactive));
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