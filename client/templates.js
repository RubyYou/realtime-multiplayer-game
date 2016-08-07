import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { GAME_WIDTH, GAME_HEIGHT } from '../common/const';
import './main.html';
import { Session } from 'meteor/session';
let randx = Math.floor((Math.random() * GAME_WIDTH) + 1);
let randy = Math.floor((Math.random() * GAME_HEIGHT) + 1);


if (Meteor.isClient) {

    // ---- Start of login status
    Template.loginStatus.events({
        'click button': (evt, template) => {
            evt.preventDefault();
            let username = template.find('#username').value;

            playerId = Players.insert({
                name: username,
                sprite: 'pikachu',
                position: {x: randx, y: randy},
                time: Date.now()
            });

            Session.set('playerId', playerId);
        }
    });

    Template.loginStatus.helpers({
        'signedUp': function(){
            if(Session.get('playerId')){
                return true;
            }
        },
        'username': function(){

            return player[Session.get('playerId')].name;
        }
    });
    
    // ---- End of login status
    Template.chat.helpers({
        'signedUp': function(){
            if(Session.get('playerId')){
                return true;
            }
        },
        'messages': function() {
            return Messages.find({}, { sort: { time: -1, limit:10 }});
        }
    });

    Template.chat.events({
        'keydown input#message' : function (event) {
            if (event.which == 13) {
                var username = player[Session.get('playerId')].name;
                var message = document.getElementById('message');
                if (message.value != '') {
                    Messages.insert({
                        name: username,
                        message: message.value,
                        time: Date.now()
                    });

                    document.getElementById('message').value = '';
                    message.value = '';
                }
            }
        },
        'click #chatID': function (event){
            var chatID = event.target.getAttribute('data-id');
            Messages.remove(chatID);
        }
    });
}