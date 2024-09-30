class GameOver extends Phaser.Scene {
    constructor() {
        super("GameOver");
    }

    preload() {
        this.load.image('GameOver', 'public/resource/image/GameOverS2.png');
    }

    init(data) {
        this.puntaje = data.puntaje;
    }

    create() {
        this.add.image(390, 250, 'GameOver');

       
        let texto = this.add.text(400, 550, 'Puntaje: ' + this.puntaje, {
            fontSize: '40px',
            fill: '#ffff'
        }).setOrigin(0.5);

        let textBounds = texto.getBounds();

        let graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 0.8); 
        graphics.fillRect(textBounds.x - 10, textBounds.y - 10, textBounds.width + 20, textBounds.height + 20);

        texto.setDepth(1); 

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('Escena1');
        });
    }
}
export default GameOver;
