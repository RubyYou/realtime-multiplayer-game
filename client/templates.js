import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import './main.html';
import { Session } from 'meteor/session';
let rand = Math.floor((Math.random() * 600) + 1);

if (Meteor.isClient) {

    // ---- Start of login status
    Template.loginStatus.events({
        'click button': (evt, template) => {
            evt.preventDefault();
            let username = template.find('#username').value;
            let x = rand;
            let y = rand;
            // let image = game.add.sprite(x, y, 'pikachu');
            // let name = game.add.text((x + 30), (y + 100), username,
            //             {fill:"#fff", align: "center", font: "20px Arial"});
            // name.anchor.setTo(0.5, 0.5);

            playerId = Players.insert({
                name: username,
                sprite: 'pikachu',
                position: {x: x, y: y},
                time: Date.now()
            });

            // player[playerId] = game.add.group();
            // player[playerId].add(image);
            // player[playerId].add(name);

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
            return Players.find({_id: Session.get('playerId')}).fetch()[0].name;
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
                var username = Players.find({_id: playerId}).fetch()[0].name;
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