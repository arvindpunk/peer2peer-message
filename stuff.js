let peer;
let clientSelected = false;

document.addEventListener("DOMContentLoaded", function(event) { 
  peer = new Peer({secure: true});
});

function onTypeSelect(type) {

	//server
	if (type == 's') {
		addClass('title', 'fadeOut hidden');
		addClass('server', 'swipeLeft fadeOut hidden');
		addClass('client', 'swipeRight fadeOut hidden');
		replaceClass('messageBar', 'initialHidden', 'fadeIn visible');
		addClass('container', 'fadeOut hidden')
		
		function establishConnection() {
			peer.on('open', function(id) {
				
			});
			addChat('Your peer ID is: ' + peer.id);
		}

		establishConnection();

		peer.on('error', function(err) {
			console.log(err.type);
		});

		let conn;
		peer.on('connection', function(conn1) {
			conn = conn1;
			conn.on('data', function(data) {
				addChat('R: ' + data);
			});
		});

		function sendMessage(e) {
				if (!e) e = window.event;
				let keyCode = e.keyCode || e.which;
				if (keyCode == 13) {
					let currMsg = document.getElementById('chatInput').value;
					document.getElementById('chatInput').value = '';
					if (currMsg != '') {
						addChat('S: ' + currMsg);
						conn.send(currMsg);
					}
				}
			}

		document.getElementById('chatInput').addEventListener('keypress', sendMessage);

	}
	//client
	else if (type == 'c') {
		if (clientSelected) {
			addClass('title', 'fadeOut hidden');
			addClass('server', 'swipeLeft fadeOut hidden');
			addClass('client', 'swipeRight fadeOut hidden');
			replaceClass('messageBar', 'initialHidden', 'fadeIn visible');
			addClass('container', 'fadeOut hidden')
			
			let peerID = document.getElementById('peerKey').value;
			let conn = peer.connect(peerID);
			
			conn.on('open', function(){
				
			});		

			conn.on('data', function(data) {	//recieve
					addChat('R: ' + data);
				});

				function sendMessage(e) {
					if (!e) e = window.event;
					let keyCode = e.keyCode || e.which;
					if (keyCode == 13) {
						let currMsg = document.getElementById('chatInput').value;
						document.getElementById('chatInput').value = '';
						if (currMsg != '') {
							addChat('S: ' + currMsg);
							conn.send(currMsg);
						}
					}
				}

			document.getElementById('chatInput').addEventListener('keypress', sendMessage);	
		} else {
			clientSelected = true;	
			replaceClass('clientKeyHolder', 'initialHidden', 'fadeIn visible');
		}
	}
}

function addClass(element, cls) {
	document.getElementById(element).className = document.getElementById(element).className + ' ' + cls;
}

function replaceClass(element, oldCls, newCls) {
	// console.log(document.getElementById(element).className);
	document.getElementById(element).className = document.getElementById(element).className.replace(oldCls, newCls);
}

function addChat(chat) {
	let p = '<div class="card-panel teal lighten-2 initialHidden white-text">' + chat + '</div>';
	document.getElementById('chatHolder').insertAdjacentHTML('beforeend', p);
	document.getElementById('chatHolder').lastChild.className = document.getElementById('chatHolder').lastChild.className.replace('initialHidden', 'fadeIn visible');
	document.getElementById('chatHolder').scrollTop = document.getElementById('chatHolder').scrollHeight;
	// addClass(document
}
