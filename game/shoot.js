var bulletTime1 = 0;

var bullet_player1_material = new THREE.MeshLambertMaterial(
{
    color: 0x00ff00, 
    transparent: false
});

function shoot()
{
    if (keyboard.pressed("space") && bulletTime1 + 0.8 < clock.getElapsedTime())
    {
        bullet = new THREE.Mesh(
            new THREE.SphereGeometry(2),
            bullet_player1_material);
        scene.add(bullet);
        bullet.position.x = player1.graphic.position.x + 7.5 * Math.cos(player1.direction);
        bullet.position.y = player1.graphic.position.y + 7.5 * Math.sin(player1.direction);
        bullet.angle = player1.direction;
        player1.bullets.push(bullet);
        bulletTime1 = clock.getElapsedTime();
    } 

    // move bullets
    var moveDistance = 5;

    for (var i = 0; i < player1.bullets.length; i++)
    {
        player1.bullets[i].position.x += moveDistance * Math.cos(player1.bullets[i].angle);
        player1.bullets[i].position.y += moveDistance * Math.sin(player1.bullets[i].angle);
        if (player2.life > 0 && bullet.position.x < player2.graphic.position.x + 20 
            && bullet.position.x > player2.graphic.position.x - 20
            && bullet.position.y < player2.graphic.position.y + 20
            && bullet.position.y > player2.graphic.position.y - 20) {

                player2.life -= 3;
            
                if (player2.life == 0)
                    scene.remove(player2.graphic);
                scene.remove(player1.bullets[i]);
                player1.bullets.splice(i, 1);
            }
    }
}

function collisions()
{
    bullet_collision();
    player_collision();
    player_falling();
}

function bullet_collision()
{
    //collision between bullet and walls
    for (var i = 0; i < player1.bullets.length; i++)
    {
        if (Math.abs(player1.bullets[i].position.x) >= WIDTH / 2 ||
            Math.abs(player1.bullets[i].position.y) >= HEIGHT / 2)
        {
            scene.remove(player1.bullets[i]);
            player1.bullets.splice(i, 1);
            i--;
        }
    }
}

function player_collision()
{
    //collision between player and walls
    var x = player1.graphic.position.x + WIDTH / 2;
    var y = player1.graphic.position.y + HEIGHT / 2;

    if ( x > WIDTH ) {

        player1.graphic.position.x -= x - WIDTH;
        this.player1.position.x -= x - WIDTH;
    }
    if ( y < 0 ) {
        player1.graphic.position.y -= y;
        this.player1.position.y -= y;
    }
    if ( y > HEIGHT ){
        player1.graphic.position.y -= y - HEIGHT;
        this.player1.position.y -= y - HEIGHT;
    }

    var x2 = player2.graphic.position.x + WIDTH / 2;
    var y2 = player2.graphic.position.y + HEIGHT / 2;

    if ( x2 > WIDTH ) {

        player2.graphic.position.x -= x2 - WIDTH;
        this.player2.position.x -= x2 - WIDTH;
    }
    if ( y2 < 0 ) {
        player2.graphic.position.y -= y2;
        this.player2.position.y -= y2;
    }
    if ( y2 > HEIGHT ){
        player2.graphic.position.y -= y2 - HEIGHT;
        this.player2.position.y -= y2 - HEIGHT;
    }

}

function player_ennemy_collision()
{
    var x = player1.graphic.position.x | 0;
    var y = player1.graphic.position.y | 0;

    var x2 = player2.graphic.position.x | 0;
    var y2 = player2.graphic.position.y | 0;
    var ennemyX = x2 - 22| 0;
    var ennemyY = y2 - 15| 0;
    var mEnnemyX = x2 + 22| 0;
    var mEnnemyY = y2 + 15| 0;
    if ((x > ennemyX)
    && (x < mEnnemyX)
    && (y > ennemyY) 
    && (y < mEnnemyY))
{
    if (player1.life > 0)
        player1.life -= 1;
    if (player1.life == 0)
        this.player1.dead();
}
}

function player_falling()
{
    var nb_tile = 10;
    
    var sizeOfTileX = WIDTH / nb_tile;
    var sizeOfTileY = HEIGHT / nb_tile;
    var x = player1.graphic.position.x | 0;
    var y = player1.graphic.position.y | 0;
    var length = 0;
    if (noGround != null)
        length = noGround.length;
    var element = null;


    for (var i = 0; i < length; i++) {
        element = noGround[i];
        if (element == null)
            break;
        var tileX = (element[0] - sizeOfTileX / 2) | 0;
        var tileY = (element[1] - sizeOfTileY / 2) | 0;
        var mtileX = (element[0] + sizeOfTileX / 2) | 0;
        var mtileY = (element[1] + sizeOfTileY / 2) | 0;

        if ((x > tileX)
            && (x < mtileX)
            && (y > tileY) 
            && (y < mtileY))
        {
            if (player1.life > 0)
                player1.life -= 1;
            if (player1.life == 0)
                this.player1.dead();
        }
    }

}
