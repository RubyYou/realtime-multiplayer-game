import { Template } from 'meteor/templating';

if(Meteor.isClient){

    function preload(){
        console.log('preload process');
    }

    function create(){
        console.log('create');
    }

    function update(){
        console.log('update');
    }


    Template.game.game = function(){
        let gameConfig = {
            preload: preload,
            create: create,
            update: update

        }

        return new Phaser.Game(800, 600, Phaser.AUTO, '', gameConfig);
    }
}