import { isNotEmpty, IsNotEmpty, Length } from "class-validator";
//kiểm tra username 
export class User{
    @IsNotEmpty()
    @Length(3)
    username:string;

    constructor(username:string){
        this.username = username
    }
}