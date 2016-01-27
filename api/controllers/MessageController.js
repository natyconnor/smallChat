/**
 * MessageController
 *
 * @description :: Server-side logic for managing messages
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	
	addMessage: function (req, res) {
		var data_from_client = req.params.all();

		if(req.isSocket && req.method === 'POST'){

			// This is the message from connected client
			// So add new conversation
			Message.create(data_from_client).exec(function (error, data_from_client) {

				if(error) {
					console.log(error);
					return res.negotiate(err);
				} else {
					console.log(data_from_client);
					Message.publishCreate({id: data_from_client.id, content: data_from_client.content, user: data_from_client.user});
				}
			})

		}
		else if(req.isSocket){
			// subscribe client to model changes 
			Message.watch(req.socket);
			console.log('User subscribed to ' + req.socket.id);
		}
	}
};

