import { Template } from 'meteor/templating';
import { GAME_WIDTH, GAME_HEIGHT, speed } from '../common/const';

if(Meteor.isClient){

    Meteor.startup(function () {
        game = new Phaser.Game(GAME_WIDTH, GAME_HEIGHT, Phaser.AUTO, 'game', {
            preload: preload,
            create: create,
            update: update
        });
    });

    function preload(){
        game.load.image('pikachu', '/pikachu.gif');
        game.load.image('background', '/backgrounds.png');
    }

    function create() {
        game.add.sprite(0, 0, 'background');
        
        player = {};

        // move
        move = game.input.keyboard.createCursorKeys();

        tracking();
    }


    function update(){
        characterMove();

        // output all the user on the game
        // player = Players.find().fetch();

    }


    function characterMove(){
        let isActive = false;

        if(move.left.isDown){
            player[playerId].x -= speed;
            isActive = true;
        }

        if (move.right.isDown){
            player[playerId].x += speed;
            isActive = true;
        }

        if(move.up.isDown){
            player[playerId].y -= speed;
            isActive = true;
        }

        if (move.down.isDown){
            player[playerId].y += speed;
            isActive = true;
        }

        if(isActive){
            Players.update( playerId,
                { position:
                    { x : player[playerId].x,
                      y: player[playerId].y}
                }
            );
        }
    }

    function tracking(){

        Players.find().observe({
            added: onPlayerAdded,
            changed: onPlayerMoved,
            removed: onPlayerRemoved
        });
    }

    function onPlayerAdded(newPlayer){

        let x = newPlayer.position.x;
        let y = newPlayer.position.y
        let image = game.add.sprite(x, y, 'pikachu');
        let name = game.add.text((x + 30), (y + 100), newPlayer.name,
            {fill:"#fff", align: "center", font: "20px Arial"});
        let id = newPlayer._id;
        player[id] = game.add.group();
        player[id].add(image);
        player[id].add(name);
    }

    function onPlayerMoved(playerMoved){
        let id = playerMoved._id;

        player[id].position.x = playerMoved.position.x;
        player[id].position.y = playerMoved.position.y;

    }

    function onPlayerRemoved(playerRemoved){
        let id = playerRemoved._id;
        player[id].destroy();
    }
}

// reset the user if tab closed
window.onbeforeunload = function(){
    Players.remove(playerId);
};