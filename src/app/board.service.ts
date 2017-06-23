import { BoardField, BoardFieldStatus } from './models/board-field.model';
import { NewRowOrColPosition } from './models/newRowOrColPosition.model';
import { Tile } from './models/tile.model';

// BoardService przechowuje dane planszy
export class BoardService{
	private board  = [	
		[new BoardField(0, BoardFieldStatus.Inactive, undefined), new BoardField(1, BoardFieldStatus.Active, undefined), new BoardField(2,BoardFieldStatus.Inactive, undefined) ], 
		[new BoardField(0, BoardFieldStatus.Active, undefined), new BoardField(1, BoardFieldStatus.Occupied, undefined), new BoardField(2,BoardFieldStatus.Active, undefined) ], 
		[new BoardField(0, BoardFieldStatus.Inactive, undefined), new BoardField(1, BoardFieldStatus.Active, undefined), new BoardField(2,BoardFieldStatus.Inactive, undefined) ], 
	];

	getBoard(){
		return this.board.slice();
	}

	private boardLastRowIndex(): number{ 
		return this.board.length -1;
	}

	private boardLastColIndex(): number{
	// należało by jeszcze sprawdzić, czy wszystkie wiersze mają tyle samo kolumn (muszą mieć!)
	// ale to powinno być zapewnione przez mechanizm dodawania kolumn
		return this.board[0].length -1;
	}

	putTileOnBoard(clickedBoardField: BoardField, rowIndex: number, colIndex: number, tileToPut: Tile, tileToPutRotation: number){
	// clickedBoardField - kliknięte pole planszy na którym układany jest Tile/Klocek
	// rowIndex, colIndex - aktualne (w momencie kliknięcia) położenie klikniętego pola planszy w tabeli-planszy
	// tileToPut to aktualna płytka (tile) którą próbujemy położyć na planszy
	// tileToPutRotation to aktualny obrót (o 90, 180 lub 270 zgodnie z ruchem zegara) aktualnej płytki do położenia

		// sprawdzenie czy w ogóle można było kliknąć w pole planszy (czy jest aktywne)
		// i czy kliknięte pole to jest to samo, co położone w tablicy board o umiejscowieniu [rowIndex, colIndex]
		// tak powinno być zawsze - jeśli jest inaczej, to nastąpił jakiś błąd
		if(clickedBoardField.boardFieldStatus === BoardFieldStatus.Active 
			&& clickedBoardField === this.board[rowIndex][colIndex]){

			// Zmiana stanu klikniętego pola - staje się occupied, ponieważ położono na nim tile
			clickedBoardField.boardFieldStatus = BoardFieldStatus.Occupied; 

			// TUTAJ BĘDZIE TRZEBA "POŁOŻYĆ" PŁYTKĘ
			console.log("Próbujemy położyć płytkę");
			console.log(tileToPut);
			clickedBoardField.tileOnField = tileToPut;
			clickedBoardField.tileOnFieldRotation = tileToPutRotation;

			// --------------------------------------------------------------------------
			// Dodawanie wiersza lub kolumny jeśli to potrzebne - żeby umieścić nowy element aktywny
			let newRowOrColPosition: NewRowOrColPosition;

			// z natury planszy i aktywowania pól bycie w pierwszym/ostatnim wierszu 
			// i pierwszej/ostatniej kolumnie wzajemnie się wykluczają.
			// przy powiększaniu planszy na górze/z lewej uaktualnienie odpowiednio rowIndex, colIndex
			if(rowIndex === 0){
			// jeśli kliknięte pole jest w pierwszym wierszu (na górze planszy)
				newRowOrColPosition = NewRowOrColPosition.Top;
				rowIndex++;
			}else if(rowIndex === this.boardLastRowIndex()){
			// jeśli kliknięte pole jest w ostatnim wierszu (na dole planszy)
				newRowOrColPosition = NewRowOrColPosition.Bottom;
			}else if(colIndex === 0){
			// jeśli kliknięte pole jest w pierwszej kolumnie (na lewym skraju planszy)
				newRowOrColPosition = NewRowOrColPosition.Left;
				colIndex++;
			}else if(colIndex === this.boardLastColIndex()){
			// jeśli kliknięte pole jest w ostatniej kolumnie (na prawym skraju planszy)
				newRowOrColPosition = NewRowOrColPosition.Right;
			}
			this.addBoardColOrRow(newRowOrColPosition);

			// ---------------------------------------------------------------------------
			// Sprawdzenie pól przylegających do klikniętego pola (czyli po jednym na górze, dole, po prawej, po lewej)
			// Czy mają status inactive. Jeśli tak, to nadanie im active. 

			// na górze 
			if(this.board[rowIndex -1 ][colIndex].boardFieldStatus === BoardFieldStatus.Inactive){
				this.board[rowIndex -1 ][colIndex].boardFieldStatus = BoardFieldStatus.Active;
			}
			// na dole
			if(this.board[rowIndex +1 ][colIndex].boardFieldStatus === BoardFieldStatus.Inactive){
				this.board[rowIndex +1 ][colIndex].boardFieldStatus = BoardFieldStatus.Active;
			}
			// z lewej 
			if(this.board[rowIndex][colIndex -1].boardFieldStatus === BoardFieldStatus.Inactive){
				this.board[rowIndex][colIndex -1].boardFieldStatus = BoardFieldStatus.Active;
			}
			// z prawej
			if(this.board[rowIndex][colIndex +1].boardFieldStatus === BoardFieldStatus.Inactive){
				this.board[rowIndex][colIndex +1].boardFieldStatus = BoardFieldStatus.Active;
			}

		}else{
			console.log("Nastąpił błąd - clickedBoardField nie odpowiada temu z board[rowIndex][colIndex]");
		}

		return this.getBoard();
	}

	private addBoardColOrRow(newRowOrColPosition: NewRowOrColPosition){
	// funkcja dodająca wiersz lub kolumnę na skraju tabeli, 
	// w położeniu zdefiniowanym w newRowOrColPosition (Top, Bottom, Left, Right)

		const addRow = (newRowPosition: NewRowOrColPosition) => {

			// stworzenie nowego wiersza
			let newRow: BoardField[] = [];
			for(let i = 0; i < this.boardLastColIndex()+1; i++){
				newRow.push(new BoardField(9,BoardFieldStatus.Inactive, undefined));
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
					this.board[i].unshift(new BoardField(9,BoardFieldStatus.Inactive, undefined));
				}else if(newRowPosition === NewRowOrColPosition.Right){
					this.board[i].push(new BoardField(9,BoardFieldStatus.Inactive, undefined));
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