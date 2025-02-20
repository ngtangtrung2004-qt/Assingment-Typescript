export enum GameItemStatus{
    Open,Close
}

export class GameItem{
    constructor(public id:number,
        public divId:string,
        public image:string, 
        public status:GameItemStatus = GameItemStatus.Close,
        public isMatched:boolean = false,
        public imageElement : HTMLImageElement | null = null){
    }
}