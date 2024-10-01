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
            this.textoBalas.setText('Sin Municion');
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
        this.load.spritesheet('nave','public/resource/image/nave.png', {frameWidth:75,frameHeight:80}),
        this.load.image('meteoro3','public/resource/image/Basurita_espacial2.png')
        this.load.image('meteoro4','public/resource/image/Basurita_espacial.png')
        this.load.image('meteoro5','public/resource/image/Basurita_espacial3.png')
    }
    create(){
        //fondo escena
        this.add.image(400,300,'cielo3').setDisplaySize(this.scale.width, this.scale.height);
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
    
        this.anims.create({
            key: 'izquierda',
            frames: [{key:'nave',frame:2}], 
            frameRate: 20,
    
        });
        this.anims.create({
            key: 'normal',
            frames: [{key:'nave',frame:1}], 
            frameRate: 20,
    
        });
        this.anims.create({
            key: 'derecha',
            frames: [{key:'nave',frame:0}], 
            frameRate: 20,
    
        });
                        
    }
    generarMeteoros() {
        const x = Phaser.Math.Between(0, 800); 
        const tipoMeteoros = ['meteoro3','meteoro4','meteoro5'];
        // Meteoro Aleatorios
        const tipoMeteoro = tipoMeteoros[Phaser.Math.Between(0, tipoMeteoros.length -1)];
        const meteoro = this.grupoMeteoros.create(x,0,tipoMeteoro);
        // Velocidad de meteoros aleatoria
        const velocidadY = Phaser.Math.Between(90,150);
        meteoro.setVelocityY(velocidadY);
    }
    update(){
        this.jugador.setVelocityX(0);
        this.jugador.setVelocityY(0);
        if (this.cursors.left.isDown) {
            this.jugador.setVelocityX(-300); // Mover a la izquierda
            this.jugador.anims.play('izquierda',true)
            } else if (this.cursors.right.isDown) {
            this.jugador.setVelocityX(300); // Mover a la derecha
            this.jugador.anims.play('derecha',true)
            } else if (this.cursors.up.isDown){ //mover hacia adelante
                this.jugador.setVelocityY(-300);
            } else if (this.cursors.down.isDown){ //mover hacia atras
                this.jugador.setVelocityY(300);
            } else{
                this.jugador.anims.play('normal', true);
            }
            
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

         //condicion para detener de escena
         if(this.puntaje >= 4000){
            this.scene.stop('Escena3');
        }
    }
    gameOver(jugador,meteoro){
        this.scene.start('GameOver');
        this.scene.start('GameOver',{puntaje: this.puntaje});
    }
}
export default Escena3;