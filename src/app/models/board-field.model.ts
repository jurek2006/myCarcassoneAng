import { Tile } from './tile.model';

export class BoardField{

	constructor(
		public boardRow: number, 
		public boardFieldStatus: BoardFieldStatus = BoardFieldStatus.Inactive,
		public tileOnField: Tile){}

}

export enum BoardFieldStatus {
    Occupied, 	//na polu znajduje się już umieszczona płytka
    Active, 	//na polu nie znajduje się płytka, ale przylega do już zajętej, więc można na nim ustawić płytkę
    Inactive,	//pole jest aktualnie nieaktywne
}

