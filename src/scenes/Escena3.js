class Escena3 extends Phaser.Scene{
    constructor(){
        super("Escena3");
        this.jugador=null;
        this.cursors=null;
        this.puntaje = 0;
        this.textoPuntaje='';
    }
    init(data){
        this.puntaje=data.puntaje;
        this.balasRecolectadas=data.balasRecolectadas;
    }
    dispararBala(){
        if(this.balasRecolectadas == 0){
            this.gameOver(this.jugador);
        }
        if(this.balasRecolectadas>0){
            let bala = this.balas.get(this.jugador.x,this.jugador.y,'bala');
            if(bala){
                bala.setActive(true);
                bala.setVisible(true);
                bala.body.reset(this.jugador.x,this.jugador.y);
                bala.body.enable=true;
                bala.setVelocityY(-400);
            }
            this.balasRecolectadas--;
            this.textoBalas.setText('Balas: '+this.balasRecolectadas);
        }
    }
    destruirAsteroide(bala,asteroide){
        asteroide.disableBody(true,true);
        bala.disableBody(true,true);
    }
    preload(){
        this.load.image('cielo3','public/resource/image/Espacio.png'),
        this.load.image('nave','public/resource/image/nave1.png'),
        this.load.image('meteoro3','public/resource/image/Basurita_espacial2.png')
    }
    create(){
        //fondo escena
        this.add.image(400,300,'cielo3');
        //jugador
        this.jugador = this.physics.add.sprite(400,550,'nave');
        this.jugador.setCollideWorldBounds(true);
        //controles
        this.cursors = this.input.keyboard.createCursorKeys();
        this.barraEspaciadora = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);
        //meteoros
        this.grupoMeteoros = this.physics.add.group();
        this.time.addEvent({ delay: 1000, callback: this.generarMeteoros, callbackScope: this, loop: true });
        //puntaje
        this.textoPuntaje=this.add.text(16,16,'Puntaje: 0',{fontSize:'32px',fill:'#CB80AB'})
        //collider
        this.physics.add.collider(this.jugador,this.grupoMeteoros,this.gameOver,null,this);
        //balas
        this.balas = this.physics.add.group();
        this.physics.add.overlap(this.balas,this.grupoMeteoros,this.destruirAsteroide, null, this);
        this.textoBalas = this.add.text(16,50,'Balas: '+this.balasRecolectadas,{ fontSize: '32px', fill: '#F5EFFF' });
    }
    generarMeteoros() {
        const x = Phaser.Math.Between(0, 800); 
        const meteoro = this.grupoMeteoros.create(x, 0, 'meteoro3');
        meteoro.setVelocityY(250); 
    }
    update(){
        this.jugador.setVelocityX(0);
        this.jugador.setVelocityY(0);
        if (this.cursors.left.isDown) {
            this.jugador.setVelocityX(-300); // Mover a la izquierda
            } else if (this.cursors.right.isDown) {
            this.jugador.setVelocityX(300); // Mover a la derecha
            } else if (this.cursors.up.isDown){ //mover hacia adelante
                this.jugador.setVelocityY(-300);
            } else if (this.cursors.down.isDown){ //mover hacia atras
                this.jugador.setVelocityY(300);
            }
        if(Phaser.Input.Keyboard.JustDown(this.barraEspaciadora)){
            this.dispararBala();
        }
        this.puntaje +=1;
        this.textoPuntaje.setText('Puntaje: '+this.puntaje);
    }
    gameOver(jugador,meteoro){
        this.scene.start('GameOver');
        this.scene.start('GameOver',{puntaje: this.puntaje});
    }
}
export default Escena3;