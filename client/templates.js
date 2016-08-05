import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import { Messages } from '../api/messages';
import './main.html';
import { Session } from 'meteor/session';

if (Meteor.isClient) {

    // ---- Start of login status
    Template.loginStatus.events({
        'click button': (evt, template) => {
            evt.preventDefault();
            console.log(template.find('#username').value);
            Session.set('player', template.find('#username').value);
        }
    });

    Template.loginStatus.helpers({
        'signedUp': function(){
            if(Session.get('player')){
                return true;
            }
        },
        'username': function(){
            return Session.get('player');
        }
    });
    
    // ---- End of login status
    Template.chat.helpers({
        'signedUp': function(){
            if(Session.get('player')){
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
                var username = Session.get('player');
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