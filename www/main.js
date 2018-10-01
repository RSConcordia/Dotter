window.addEventListener('DOMContentLoaded', function() {
	
	var CRLF = String.fromCharCode( 0x0D ) + String.fromCharCode( 0x0A ),
		KEY = 'AIzaSyAj6LuyubKgTA8wlfqsTzQHKkSlTO9ZMOc';
	
	var customStyle = document.createElement('style');
		customStyle.innerHTML = '.ground { background-color:'+ COLOR1 +' }' + CRLF +
								'.colored { color:'+ COLOR1 +' }' + CRLF +
								'.colored:active { color:'+ COLOR2 +' }' + CRLF +
								'.contrast { color:'+ CONTRAST +' }' + CRLF +
								'.btn { background-color:'+ COLOR1 +'; color:'+ CONTRAST +'; padding:15px; border-radius:50%; box-shadow:2px 3px 15px rgba(25,25,25,.5); }' + CRLF +
								'.btn:hover { background-color:'+ CONTRAST +'; color:'+ COLOR2 +' }';
	
	var eTitle = document.createElement('title');
		eTitle.innerHTML = NOME;
	
	var eMessage = document.createElement('section');
		eMessage.setAttribute('class', 'message');
	
	var eLogo = document.createElement('img');
		eLogo.src = 'logo.png';
	
	var eText = document.createElement('div');
		eText.innerHTML += MESSAGE;
		
	eMessage.appendChild( eLogo );
	eMessage.appendChild( eText );
	
	var eContact = document.createElement('section');
		eContact.setAttribute('class', 'contact');
	
	if( PHONE ) {
		
		var lb = document.createElement('label'),
			btn = document.createElement('button');
			span = document.createElement('span');
			
		lb.innerText = PHONE;
		
		btn.setAttribute('class', 'btn');
		btn.addEventListener('click', callPhone, false);
		btn.addEventListener('touchstart', callPhone, false);
		
		span.setAttribute('class', 'fa fa-phone');
		
		btn.appendChild( span );
		lb.appendChild( btn );
		
		eContact.appendChild( lb );
	
	}
	
	if( EMAIL ) {
		
		var lb = document.createElement('label'),
			btn = document.createElement('button');
			span = document.createElement('span');
			
		lb.innerText = EMAIL;
		
		btn.setAttribute('class', 'btn');
		btn.addEventListener('click', mailTo, false);
		btn.addEventListener('touchstart', mailTo, false);
		
		span.setAttribute('class', 'fa fa-envelope');
		
		btn.appendChild( span );
		lb.appendChild( btn );
		
		eContact.appendChild( lb );
		
	}
	
	if( LINK ) {
		
		var lb = document.createElement('label'),
			btn = document.createElement('button');
			span = document.createElement('span');
			
		lb.innerText = LINK.replace(/^https:\/\/|http:\/\//i, '');
		
		btn.setAttribute('class', 'btn');
		btn.addEventListener('click', openWebSite, false);
		btn.addEventListener('touchstart', openWebSite, false);
		
		span.setAttribute('class', 'fa fa-link');
		
		btn.appendChild( span );
		lb.appendChild( btn );
		
		eContact.appendChild( lb );
		
	}
	
	var eLocal = document.createElement('center');
		eLocal.setAttribute('class', 'local ground');
		
	var h2 = document.createElement('h2');
		h2.innerHTML = 'Como chegar ate nós';
	
	var iframe = document.createElement('iframe');
		iframe.setAttribute('frameborder', '0');
		iframe.setAttribute('allowfullscreen', '1');
		iframe.setAttribute('src', 'https://www.google.com/maps/embed/v1/search?q='+ ENDERECO +'&key='+ KEY);
		
	/// https://developers.google.com/maps/documentation/urls/guide#directions-action
	
	var aMaps = document.createElement('a');
		aMaps.setAttribute('class', 'contrast');
		aMaps.setAttribute('target', '_blank');
		aMaps.setAttribute('href', 'https://www.google.com/maps/search/?api=1&query='+ ENDERECO );
		aMaps.innerHTML = 'Abrir no Maps';
		
	eLocal.appendChild( h2 );
	eLocal.appendChild( iframe );
	eLocal.appendChild( aMaps );
	
	document.addEventListener('deviceready', function() {
		
		function openMenu(e) {
			
			e.preventDefault();
			e.stopPropagation();
		
			menu.style.left = '0px';
			
			mground.style.left = '0px';
		}
		
		function closeMenu(e) {
			
			e.preventDefault();
			e.stopPropagation();
		
			menu.style.left = '-320px';
			
			mground.style.left = '-800px';
			
		}
		
		var menu = document.body.querySelector('ul.menu'),
			main = document.body.querySelector('main'),
			mground = document.body.querySelector('div.mground');
		
		document.head.appendChild( customStyle );
		document.head.appendChild( eTitle );
		
		main.appendChild( eMessage );
		main.appendChild( eContact );
		main.appendChild( eLocal );
		
		var btnOpenMenu = document.getElementById('btn-openmenu');
			btnOpenMenu.addEventListener('click', openMenu, false);
			btnOpenMenu.addEventListener('touchstart', openMenu, false);
		
		var btnCloseMenu = document.getElementById('btn-closemenu');
			btnCloseMenu.addEventListener('click', closeMenu, false);
			btnCloseMenu.addEventListener('touchstart', closeMenu, false);
		
		var btnReader = document.getElementById('btn-qrreader');
			btnReader.addEventListener('click', QrReader, false);
			btnReader.addEventListener('touchstart', QrReader, false);
		
		var btnPowered = document.getElementById('btn-powered');
			btnPowered.addEventListener('click', openPowered, false);
			btnPowered.addEventListener('touchstart', openPowered, false);
		
		
		mground.style.left = '-800px';
		
		mground.addEventListener('click', closeMenu, false);
		mground.addEventListener('touchstart', closeMenu, false);
		
		navigator.geolocation.getCurrentPosition( setGeolocationMaps, console.log, { enableHighAccuracy:true, timeout:5000,  maximumAge:0 });
		
	}, false);
	
	function setGeolocationMaps( e ) {
		
		var coords = e.coords.latitude +','+ e.coords.longitude;
		
		iframe.setAttribute('src', 'https://www.google.com/maps/embed/v1/directions?origin='+ coords +'&destination='+ ENDERECO +'&key='+ KEY);
		
		aMaps.setAttribute('href', 'https://www.google.com/maps/dir/?api=1&origin='+ coords +'&destination='+ ENDERECO );
	
	};
	
	function mailTo(e) {
		
		e.preventDefault();
		e.stopPropagation();
		
		window.open( 'mailto:'+ EMAIL +'?subject=%20&body=%20', '_system' );
	};
	
	function callPhone(e) {
		
		e.preventDefault();
		e.stopPropagation();
		
		window.open( 'tel:'+ PHONE.replace(/[()\s-]/g, ''), '_system' );
		
	};
	
	function openWebSite(e) {
		
		e.preventDefault();
		e.stopPropagation();
		
		window.open( LINK, '_system' );
		
	};
	
	function QrReader(e) {
		
		e.preventDefault();
		e.stopPropagation();
	
		cordova.plugins.barcodeScanner.scan(function( string ) {
			
			var url = decodeURIComponent( string.text );
			
			if( !/^http:\/\/|https:\/\//.test( url ) ) {
				
				url = 'https://'+ url;
				
			}
			
			window.open( url, '_system' );
		
		}, console.log, {
			preferFrontCamera: false, 
			showFlipCameraButton: false, 
			formats: "QR_CODE", 
			prompt: "",
			orientation: "landscape" 
		});
		
	};
	
	function openPowered(e) {
		
		e.preventDefault();
		e.stopPropagation();
		
		window.open( 'https://dotter.com.br/landing/', '_system' );
		
	}
	
}, false);