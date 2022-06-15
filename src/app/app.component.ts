import { Component, Inject, Input } from '@angular/core';
import Swal from 'sweetalert2';
import { DOCUMENT } from '@angular/common';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'game-app';

  userName = {
    name:"player",
    score: 0,
  }

  dataPass: any;
  playerSelection: any = "player";
  IA: any = "IA";
  iaMachine: any = 0;
  user:any = 0;
  userSelection: any = "none"
  resultado: string = ""
  score: any = 0
  iaSelection: any = "none"
  vidas: number = 3
  constructor(@Inject(DOCUMENT) private document: Document) { }

  ngOnInit(): void {
    this.startGame()
    this.setLocalPlayer()
    this.setLocalScore()
  
  }

  startGame(){
    Swal.fire({
      title: "Comenzar 🏁",
      html:  '<label class="mb-3">Ingrese un Nick</label> '+
      '<input type="text" id="name" class="form-control" maxlength="10" placeholder="Maximo 10 caracteres"> ',
      text:"Ingrese un Nick",
      color:"white",
      background: '#191c29',
      showCancelButton: true,
    
    }).then(res =>{
      if(res.isConfirmed){
        if(localStorage.getItem('userData') == undefined){
          localStorage.setItem('userData',JSON.stringify(this.userName))
        }
        if((<HTMLInputElement>this.document.getElementById('name')).value !== ""){
          
      this.playerSelection = (<HTMLInputElement>this.document.getElementById('name')).value
          
        }else{
          this.playerSelection = "player"
        }
      }
    })

  }


  op(num: any){
   
    this.iaMachine = Math.floor(Math.random() * 3);
    switch(this.iaMachine){
      case 0:
        this.iaMachine = "piedra"
        this.iaSelection = 0
      break;
      case 1:
        this.iaMachine = "papel"
        this.iaSelection = 1
      break;
      case 2:
        this.iaMachine = "tijeras"
        this.iaSelection = 2
      break;
    }

    switch(num){
      case 0:
      this.user = "piedra"
      this.userSelection = 0
      this.result()
      break;
      case 1:
      this.user = "papel"
      this.userSelection = 1
      this.result()
      break;
      case 2:
      this.user = "tijeras"
      this.userSelection = 2
      this.result()
      break;
    }

  }
  
  result (){

  if(this.user=== "piedra" && this.iaMachine === "papel"){
    this.resultado = "LOST"
  }else 
  if(this.user === "papel" && this.iaMachine=== "piedra"){
    this.resultado = "WIN"
   }else 
  if(this.user === "tijeras" && this.iaMachine === "piedra"){
    this.resultado = "LOST"
  }else 
  if(this.user === "piedra" && this.iaMachine === "tijeras"){
    this.resultado = "WIN"
  }else
  if(this.user === "papel" && this.iaMachine === "tijeras"){
    this.resultado = "LOST"
  }else
  if(this.user === "tijeras" && this.iaMachine === "papel"){
    this.resultado = "WIN"
  }else if(this.user === this.iaMachine){
    this.resultado = "DRAW"
  }
  
  if(this.resultado == "WIN"){
    this.score += 1
  }

  if(this.resultado == "LOST"){
    this.vidas -= 1
  }

  
  if(this.vidas < 1){
   const data = localStorage.getItem("userData")
   if(this.score > JSON.parse(data!).score){
    this.userName.name= this.playerSelection ; 
    this.userName.score =  this.score; 
    localStorage.setItem('userData',JSON.stringify(this.userName))
   }
    this.score = 0
    this.vidas = 3
   

Swal.fire({
      title: "Perdiste",
      color:"white",
      background: '#191c29',
      icon: "error",
      imageUrl: "assets/img/bebecry.webp",
      imageWidth: 170,
      imageHeight: 170,
      confirmButtonText: "Continue",
      showCancelButton: true,
      
    }).then(res =>{
      if(!res.isConfirmed){
        this.startGame()     
      }else{
        return
      }
   
})
 
  }
  }

  setLocalPlayer( ){
    this.dataPass = localStorage.getItem('userData')
    if(JSON.parse(this.dataPass!).name === null){
    }else{
      return (JSON.parse(this.dataPass!).name)
    }
    
  }

  setLocalScore(){
    return (JSON.parse(this.dataPass!).score)
  }

}
