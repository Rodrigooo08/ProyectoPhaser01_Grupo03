import Escena1 from "./scenes/Escena1.js"
import Escena2 from "./scenes/Escena2.js"
import EscenaBonus from "./scenes/EscenaBonus.js"
import GameOver from "./scenes/GameOver.js";
import MenuStart from "./scenes/MenuStart.js"; 
import Escena3 from "./scenes/Escena3.js";
const config={
    type: Phaser.AUTO,
    width: 800,
    height: 600,
    scene: [MenuStart,Escena1, Escena2, Escena3,GameOver],
    physics:{
        default: 'arcade',
        arcade:{
            gravity:{y:0},
            debug: false
        }
    },
}
let game = new Phaser.Game(config);