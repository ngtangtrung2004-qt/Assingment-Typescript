import { UserController } from './controller/UserController';


const appElement:HTMLElement = document.querySelector('#app') as HTMLElement;
console.log('Login form');

if(appElement){
    let usercontroller : UserController = new UserController(appElement);
}