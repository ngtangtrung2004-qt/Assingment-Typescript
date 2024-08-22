import autobind from "autobind-decorator";
import { GameItem, GameItemStatus } from "../models/GameItem";
import _ from "lodash";


export class GameControler{
    private  items:GameItem[]=[];

    constructor(items:GameItem[], public element:HTMLElement){
        this.initGame(items);
    }
// thêm item vào mảng
    initGame(initData:GameItem[]):void{
        for ( const item of initData){
            this.items.push(item);// thêm 10  item vào mảng
        }

        for ( const item of initData){
            this.items.push(new GameItem(item.id,item.divId,item.image));//Thêm vào 10  item vào mảng
        }

        let id:number=1;
        this.items.forEach(it =>{
            it.status = GameItemStatus.Close;
            it.divId = 'd' + id;
            id++;
        });
    }

    reinitGame():void{
        this.items.forEach(item=>{
            item.imageElement = null;
            item.status =GameItemStatus.Close;
            item.isMatched;

        });

        this.shuffle();// hàm xáo trộn anh 

    }

    iswinGame():boolean{
        return this.items.filter(item=>
            item.status===GameItemStatus.Open).length === this.items.length;

    }

    renderHTML(rootElement:HTMLElement,item:GameItem){     
    //     <div class="col-2 gameItem m-2 p1 text-center">
    //     <img src="" alt="" class="img-fluid">
    // </div>

    const divItem :HTMLDivElement = document.createElement('div');
    divItem.className = 'col-2 gameItem m-2 p1 text-center ';
    divItem.id = item.divId;
    divItem.addEventListener('click',this.processGameItemClicked);

    const imgItem :HTMLImageElement = document.createElement('img');
    imgItem.src = `images/${item.image}`;
    imgItem.className = 'img-fluid invisible';

    item.imageElement = imgItem;
    divItem.appendChild(imgItem);
    rootElement.appendChild(divItem);

    }

    renderResetButton(rootElement:HTMLElement):void{
        let button :HTMLButtonElement = rootElement.querySelector('button#reset') as HTMLButtonElement;

        if(button){
            button.addEventListener('click',this.processResetButtonClicked);
        }

    }

     renderGameBoard():void{
        this.shuffle();

        let boardDiv : HTMLElement = this.element.querySelector('#board') as HTMLElement;

        if(boardDiv){
            this.items.forEach(it =>{
                this.renderHTML(boardDiv,it);
            });
        }
        this.renderResetButton(this.element);
        
    }
// kiểm tra so khớp ảnh với nhau
    isMatched(id:number,imgElement:HTMLImageElement):boolean{
        let openedItems : GameItem[] = this.items.filter(item =>{
            if(item.status ===GameItemStatus.Open && !item.isMatched){
                return item;
            }
        });

        if(openedItems.length == 2) {
            let checkMatchedFilter = openedItems.filter(item=>item.id == id);

            if(checkMatchedFilter.length <2){
                openedItems.forEach(item =>{
                    this.changeMatchedBackground(item.imageElement,false);
                });
                setTimeout(()=>
                    openedItems.forEach(item=>{
                        if(item.imageElement){
                            item.imageElement.className = 'img-fluid invisible';
                            item.status=GameItemStatus.Close;
                            item.isMatched = false;

                            this.changeMatchedBackground(item.imageElement);

                        }
                    }),600);

            }else{
                openedItems.forEach(item=>{
                    item.isMatched = true;
                    this.changeMatchedBackground(item.imageElement);
                });
                return true;
        }
    }
        return false;
}

    changeMatchedBackground(imgElement:HTMLElement | null , isMatched:boolean = true){
        if(imgElement?.parentElement){
            if(isMatched) {
                imgElement.parentElement.className = 'col-2 gameItem m-2 p1 text-center ';
        }else{
            imgElement.parentElement.className = 'col-2 gameItem m-2 p1 text-center unmatched ';
        }
    }
}

    @autobind
    processGameItemClicked(event:Event){
        let element :HTMLElement | null = event.target as HTMLElement;
        console.log(element);
        if(element.tagName === 'img'){
                  element = element.parentElement;

        }
// khi mình click những ô ngoài client thì nó sẽ trả về thẻ div gán element 
//sau dó nó kiểm tra elment đó nếu có thì nó dùng vòng lặp for để duyệt qua mảng items
        if(element)
        for(const item of this.items){
            if(item.divId == element?.id && !item.isMatched
                && item.status==GameItemStatus.Close){
                    item.status = GameItemStatus.Open;

                    let imgElement = element.querySelector( "img" );

                    if(imgElement){
                        imgElement.className = 'img-fluid visible';
                        this.isMatched(item.id,imgElement);
                    }
                }
            }
        }

    

    @autobind
    processResetButtonClicked(event:Event):void {
        this.reinitGame();
        const boardElement :HTMLElement = document.querySelector('#board') as HTMLElement;
        boardElement.innerHTML='';
        this.renderGameBoard();
    }
// sao trộn ảnh
    shuffle(){
        this.items = _.shuffle(this.items);


    }
}