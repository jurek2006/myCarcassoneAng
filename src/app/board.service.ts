import { EventEmitter } from '@angular/core';
import { BoardField, BoardFieldStatus } from './models/board-field.model';
import { NewRowOrColPosition } from './models/newRowOrColPosition.model';
import { Tile } from './models/tile.model';

// BoardService przechowuje dane planszy
export class BoardService{

	// emiter - za każdym razem, kiedy zostanie kliknięte pole już z płytką (occupied)
	occupiedFieldSelected = new EventEmitter<Tile>();

	// board to tablica dwuwymiarowa planszy
	// private board  = [	
	// 	[new BoardField(0, BoardFieldStatus.Inactive, undefined), new BoardField(1, BoardFieldStatus.Active, undefined), new BoardField(2,BoardFieldStatus.Inactive, undefined) ], 
	// 	[new BoardField(0, BoardFieldStatus.Active, undefined), new BoardField(1, BoardFieldStatus.Occupied, undefined), new BoardField(2,BoardFieldStatus.Active, undefined) ], 
	// 	[new BoardField(0, BoardFieldStatus.Inactive, undefined), new BoardField(1, BoardFieldStatus.Active, undefined), new BoardField(2,BoardFieldStatus.Inactive, undefined) ], 
	// ];

	private board  = [	
		[ new BoardField(2,BoardFieldStatus.Active, undefined) ]
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

	boardFieldClicked(clickedBoardField: BoardField, rowIndex: number, colIndex: number, tileToPut: Tile){
	// metoda obsługi kliknięcia na pole planszy
	// tutaj jest sprawdzane, czy jest aktywne  [BoardFieldStatus.Active](wówczas następuje położenie płytki)
	// jeśli nie jest aktywne i jest na nim położona płytka [BoardFieldStatus.Occupied] to przekazuje szczegóły o tej płytce
	// jeśli nie jest aktywne [BoardFieldStatus.Inactive to nie robi nic]

	// clickedBoardField - kliknięte pole planszy na którym układany jest Tile/Klocek
	// rowIndex, colIndex - aktualne (w momencie kliknięcia) położenie klikniętego pola planszy w tabeli-planszy
	// tileToPut to aktualna płytka (tile) którą próbujemy położyć na planszy

		
		if(clickedBoardField === this.board[rowIndex][colIndex]){
		// sprawdzenie czy poprawmie przekazame jest umiejscowienie klikniętego pola planszy za pomocą rowIndex i colIndex
			
			if(clickedBoardField.boardFieldStatus === BoardFieldStatus.Active){
			// sprawdzenie, czy kliknięte pole jest aktywne
			// jeśli tak, to można na nim próbować położyć płytkę
				return this.putTileOnBoard(clickedBoardField, rowIndex, colIndex, tileToPut);
			}
			else if(clickedBoardField.boardFieldStatus === BoardFieldStatus.Occupied){
			// sprawdzenie czy pole jest już zajęte przez płytkę
				console.log("Kliknięto pole z płytką:");
				console.log(clickedBoardField.tileOnField);
				this.occupiedFieldSelected.emit(clickedBoardField.tileOnField);
				// zwraca niezmienioną planszę 
				return this.getBoard();
			}
		}else{
			console.log("Nastąpił błąd - clickedBoardField nie odpowiada temu z board[rowIndex][colIndex]");
		}
	}

	isBoardEmpty(): boolean{
	// metoda sprawdzająca, czy plansza jest pusta (to oznacza, że ma zaledwie jeden element w tablicy board[] na który można położyć płytkę)
	// jeśli plansza jest pusta - zwraca true
		if(this.board.length === 1 && this.board[0].length === 1){ return true;	}
		else {return false;}
	}

	private putTileOnBoard(clickedBoardField: BoardField, rowIndex: number, colIndex: number, tileToPut: Tile){
	// metoda kładąca płytkę na planszę (wywoływana jest tylko dla aktywnych płytek, więc nie trzeba tego sprawdzać)
	// najpierw sprawdza, czy można położyć płytkę "ze względów merytorycznych" (czy zgadza się na płytkach obok droga, miasto, rzeka itd. )
		this.isAllowedToPutTheTileHere(clickedBoardField, rowIndex, colIndex, tileToPut);

		// Zmiana stanu klikniętego pola - staje się occupied, ponieważ położono na nim tile
		clickedBoardField.boardFieldStatus = BoardFieldStatus.Occupied; 

		// TUTAJ "KŁADZIEMY" PŁYTKĘ
		// zamiast przypisać referencji do płytki:
		// clickedBoardField.tileOnField = tileToPut;
		// musimy zrobić jej kopię (inaczej płytki na planszy będą nam się obracać)
		clickedBoardField.tileOnField = Object.assign({}, tileToPut);

		// --------------------------------------------------------------------------
		// NIEPUSTA /NIEPOCZĄTKOWA. PLANSZA - sprawdzenie, czy jest to standardowe zachowanie (nie jest to "pusta plansza" z jedną płytką)
		if(!this.isBoardEmpty()){

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
		}
		else{
		// PLANSZA PUSTA /POCZĄTKOWA - położona została dopiero pierwsza płytka - więc zachowanie planszy jest inne
		// Należy dodać pola nad/pod/na lewo/na prawo od płytki 

			this.addBoardColOrRow(NewRowOrColPosition.Top);
			rowIndex++; //dodano wiersz nad aktualnie klikniętym, więc zmienia się indeks wiersza 
			this.addBoardColOrRow(NewRowOrColPosition.Bottom);
			this.addBoardColOrRow(NewRowOrColPosition.Left);
			colIndex++; //dodano wiersz na lewo od aktualnie klikniętego pola, więc zmienia się indeks kolumny
			this.addBoardColOrRow(NewRowOrColPosition.Right);
		}

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

	private isAllowedToPutTheTileHere(clickedBoardField: BoardField, rowIndex: number, colIndex: number, tileToPut: Tile){
	// funkcja sprawdza, czy "merytorycznie" płytkę można położyć na danym polu (nie kolidują droga, miasto, rzeka itd. z sąsiednimi)
	}
}