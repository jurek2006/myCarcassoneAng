
export class BoardField{

	constructor(public boardRow: number, public boardFieldStatus: BoardFieldStatus = BoardFieldStatus.Inactive){}

}

export enum BoardFieldStatus {
    Occupied, 	//na polu znajduje się już umieszczona płytka
    Active, 	//na polu nie znajduje się płytka, ale przylega do już zajętej, więc można na nim ustawić płytkę
    Inactive,	//pole jest aktualnie nieaktywne
}

