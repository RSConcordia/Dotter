window.addEventListener('DOMContentLoaded', function() {
	
	
	var colors = {
		Azul: '#003399',
		Verde: '#009933',
		Vermelho: '#CC3300',
		Amarelo: '#FFCC00'
	};
	
	var images = [ 'Azul', 'Verde', 'Vermelho', 'Amarelo' ];
	
	
	function getStyleText( color ) {
	
		return 	'.ground { background-color:'+ color +' }' + CRLF +
				'.colored { color:'+ color +' }' + CRLF +
				'.colored:active { color:'+ color +' }' + CRLF +
				'.contrast { color:'+ setting.CONTRAST +' }' + CRLF +
				'.btn { background-color:'+ color +'; color:#fff; padding:15px; border-radius:50%; box-shadow:2px 3px 15px rgba(25,25,25,.5); }' + CRLF +
				'.btn:hover { background-color:#fff; color:'+ color +' }';
		
		
	};
	
	setting.COLOR1 = '#003399';
	setting.COLOR2 = '#003399';
	
	/* .................................................... */
	
	function setGeolocationMaps( e ) {
		
		var coords = e.coords.latitude +','+ e.coords.longitude;
		
		iframe.setAttribute('src', 'https://www.google.com/maps/embed/v1/directions?origin='+ coords +'&destination='+ setting.ADDRESS +'&key='+ KEY);
		
		aMaps.setAttribute('href', 'https://www.google.com/maps/dir/?api=1&origin='+ coords +'&destination='+ setting.ADDRESS );
	
	};
	
	function mailTo(e) {
		
		e.preventDefault();
		e.stopPropagation();
		
		window.open( 'mailto:'+ setting.EMAIL +'?subject=%20&body=%20', '_system' );
	};
	
	function callPhone(e) {
		
		e.preventDefault();
		e.stopPropagation();
		
		window.open( 'tel:'+ setting.PHONE.replace(/[()\s-]/g, ''), '_system' );
		
	};
	
	function openWebSite(e) {
		
		e.preventDefault();
		e.stopPropagation();
		
		window.open( setting.LINK, '_system' );
		
	};
	
	function QrReader(e) {
		
		e.preventDefault();
		e.stopPropagation();
	
		cordova.plugins.barcodeScanner.scan(function( string ) {
			
			var url = decodeURIComponent( string.text );
			
			if( !/^http:\/\/|https:\/\//.test( url ) ) {
				
				url = 'http://'+ url;
				
			}
			
			window.open( url, '_system' );
		
		}, console.log, {
			preferFrontCamera: false, 
			showFlipCameraButton: false, 
			formats: 'QR_CODE', 
			prompt: '',
			orientation: 'portrait' 
		});
		
	};
	
	function openPowered(e) {
		
		e.preventDefault();
		e.stopPropagation();
		
		window.open( 'https://dotter.com.br/landing/', '_system' );
		
	}
	
	var CRLF = String.fromCharCode( 0x0D ) + String.fromCharCode( 0x0A ),
		KEY = 'AIzaSyAj6LuyubKgTA8wlfqsTzQHKkSlTO9ZMOc';
	
	var customStyle = document.createElement('style');
		customStyle.innerHTML = '.ground { background-color:'+ setting.COLOR1 +' }' + CRLF +
								'.colored { color:'+ setting.COLOR1 +' }' + CRLF +
								'.colored:active { color:'+ setting.COLOR2 +' }' + CRLF +
								'.contrast { color:'+ setting.CONTRAST +' }' + CRLF +
								'.btn { background-color:'+ setting.COLOR1 +'; color:'+ setting.CONTRAST +'; padding:15px; border-radius:50%; box-shadow:2px 3px 15px rgba(25,25,25,.5); }' + CRLF +
								'.btn:hover { background-color:'+ setting.CONTRAST +'; color:'+ setting.COLOR2 +' }';
	
	var eTitle = document.createElement('title');
		eTitle.innerHTML = setting.NAME;
	
	var eMessage = document.createElement('section');
		eMessage.setAttribute('class', 'message');
	
	var eLogo = document.createElement('img');
	//	eLogo.src = 'logo.png';
		eLogo.src = 'Azul.png';
		
		eLogo.addEventListener('click', function() {
			
			var srcImg = this.src.split('/').pop().replace('.png', '');
			
			var index = images.indexOf( srcImg ) + 1;
			
			if( index >= images.length ) {
				
				index = 0;
				
			}
			
			var newImage = images[ index ];
			
			eLogo.src = newImage +'.png';
			
			customStyle.innerHTML = getStyleText( colors[ newImage ] );
			
			
		}, false);
		
	var eText = document.createElement('div');
		eText.innerHTML = setting.MESSAGE;
		
	eMessage.appendChild( eLogo );
	eMessage.appendChild( eText );
	
	var eContact = document.createElement('section');
		eContact.setAttribute('class', 'contact');
	
	if( setting.PHONE ) {
		
		var lb = document.createElement('label'),
			btn = document.createElement('button');
			span = document.createElement('span');
			
		lb.innerText = setting.PHONE;
		
		btn.setAttribute('class', 'btn');
		btn.addEventListener('click', callPhone, false);
		btn.addEventListener('touchstart', callPhone, false);
		
		span.setAttribute('class', 'fa fa-phone');
		
		btn.appendChild( span );
		lb.appendChild( btn );
		
		eContact.appendChild( lb );
	
	}
	
	if( setting.EMAIL ) {
		
		var lb = document.createElement('label'),
			btn = document.createElement('button');
			span = document.createElement('span');
			
		lb.innerText = setting.EMAIL;
		
		btn.setAttribute('class', 'btn');
		btn.addEventListener('click', mailTo, false);
		btn.addEventListener('touchstart', mailTo, false);
		
		span.setAttribute('class', 'fa fa-envelope');
		
		btn.appendChild( span );
		lb.appendChild( btn );
		
		eContact.appendChild( lb );
		
	}
	
	if( setting.LINK ) {
		
		var lb = document.createElement('label'),
			btn = document.createElement('button');
			span = document.createElement('span');
			
		lb.innerText = setting.LINK.replace(/^https:\/\/|http:\/\//i, '');
		
		btn.setAttribute('class', 'btn');
		btn.addEventListener('click', openWebSite, false);
		btn.addEventListener('touchstart', openWebSite, false);
		
		span.setAttribute('class', 'fa fa-link');
		
		btn.appendChild( span );
		lb.appendChild( btn );
		
		eContact.appendChild( lb );
		
	}
	
	var eLocal = document.createElement('center');
		eLocal.setAttribute('id', 'local');
		eLocal.setAttribute('class', 'local ground');
		
		eLocal.addEventListener('click', function() {
			
			location.href = '#local';
			
		}, false);
		
	var h2 = document.createElement('h2');
		h2.setAttribute('class', 'contrast');
		h2.innerHTML = 'Como chegar ate nós';
	
	var iframe = document.createElement('iframe');
		iframe.setAttribute('frameborder', '0');
		iframe.setAttribute('allowfullscreen', '1');
		iframe.setAttribute('src', 'https://www.google.com/maps/embed/v1/search?q='+ setting.ADDRESS +'&key='+ KEY);
		
	/// https://developers.google.com/maps/documentation/urls/guide#directions-action
	
	var aMaps = document.createElement('a');
		aMaps.setAttribute('class', 'contrast');
		aMaps.setAttribute('target', '_blank');
		aMaps.setAttribute('href', 'https://www.google.com/maps/search/?api=1&query='+ setting.ADDRESS );
		aMaps.innerHTML = 'Abrir no Maps';
		
	eLocal.appendChild( h2 );
	eLocal.appendChild( iframe );
	eLocal.appendChild( aMaps );
	
	var eTools = document.createElement('section');
		eTools.setAttribute('class', 'tools');
	
	var eText = document.createElement('div');
		eText.innerHTML = 'Ferramentas';
		
	var lb = document.createElement('label'),
		btn = document.createElement('button');
		span = document.createElement('span');
		
	lb.innerText = 'Ler QrCode';
	
	btn.setAttribute('class', 'btn');
	btn.addEventListener('click', QrReader, false);
	btn.addEventListener('touchstart', QrReader, false);
	
	span.setAttribute('class', 'fa fa-camera');
	
	btn.appendChild( span );
	lb.appendChild( btn );
	
	eTools.appendChild( eText );
	eTools.appendChild( lb );
	
	var eFooter = document.createElement('div');
		eFooter.setAttribute('class', 'info');
	
	var logoDotter = new Image();
		logoDotter.src = 'logo-dotter.png';
		
		logoDotter.addEventListener('click', openPowered, false);
		logoDotter.addEventListener('touchstart', openPowered, false);
		
	var ePowered = document.createElement('div');
		ePowered.innerHTML = 'Powered by Dotter Brasil Ltda © 2018';
	
	eFooter.appendChild( logoDotter );
	eFooter.appendChild( ePowered );
	
	document.addEventListener('deviceready', function() {
//	window.addEventListener('load', function() {
	
		var main = document.body.querySelector('main');
		
		document.head.appendChild( customStyle );
		document.head.appendChild( eTitle );
		
		main.appendChild( eMessage );
		main.appendChild( eContact );
		
		main.appendChild( eTools );
		
		main.appendChild( eLocal );
		main.appendChild( eFooter );
		
		navigator.geolocation.getCurrentPosition( setGeolocationMaps, console.log, { enableHighAccuracy:true, timeout:5000,  maximumAge:0 });
		
	}, false);
	
}, false);
