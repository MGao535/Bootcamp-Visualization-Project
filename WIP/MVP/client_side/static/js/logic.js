// Creating map object
var myMap = L.map("map", {
	center: [30, -10],
	zoom: 3
});

let country = [];
let lats = [];
let longs = [];
let country_uri = [];

// Adding tile layer to the map
L.tileLayer(MAP_URL, {
	attribution: "Map data &copy; <a href=\"https://www.openstreetmap.org/\">OpenStreetMap</a> contributors, <a href=\"https://creativecommons.org/licenses/by-sa/2.0/\">CC-BY-SA</a>, Imagery © <a href=\"https://www.mapbox.com/\">Mapbox</a>",
	maxZoom: 18,
	minZoom: 2,
	id: 'mapbox/streets-v11',
	accessToken: API_KEY
}).addTo(myMap);

d3.csv("/static/js/LatLong.txt", function(data) {
	console.log(data);
    for(var i = 0; i < data.length; i++){
    	country.push(data[i].Country);
    	lats.push(data[i].Latitude);
		longs.push(data[i].Longitude);
		country_uri.push(data[i].Playlist);
	}
	
	var myFeatureGroup = L.featureGroup().addTo(myMap).on("click", groupClick);
	var marker, playlist, latlng;

    for(var j = 0; j < lats.length; j++){
		latlng = L.latLng(lats[j], longs[j]);
		playlist = country_uri[j];
		marker = L.marker(latlng).addTo(myFeatureGroup)
		.bindPopup("<a id='scroll' href = #section2 onclick='scroll_element()'>" + country[j] + "</a>");
		marker.playlist = playlist;
	};

	function groupClick(event) {
		var uri = event.layer.playlist;
		console.log(uri);
		var embed_play = document.getElementById('playlist');
		var iframe = document.createElement('iframe');
		iframe.src = "https://open.spotify.com/embed/playlist/" + uri;
		embed_play.appendChild(iframe);
		d3.json("/static/js/data.json", function(error, data){
			// console.log(data);
			topsongs = data;
			for (var play_list in topsongs){
				if (uri == play_list){
					console.log(topsongs[play_list]);
					console.log(topsongs[play_list][0]);
					console.log(topsongs[play_list][0]['danceability']);

					// song1 
					var song1 = document.getElementById('song1');

					var song1_chart = new Chart(song1, {
						type: 'polarArea',
						data:{
							labels:['Danceability','Energy','Valence','Acousticeness','Instrumentalness','Liveness','Speechiness'],
							datasets:[{
								data:[topsongs[play_list][0]['danceability'],topsongs[play_list][0]['energy'],topsongs[play_list][0]['valence'],topsongs[play_list][0]['acousticness'],topsongs[play_list][0]['instrumentalness'],topsongs[play_list][0]['liveness'],topsongs[play_list][0]['speechiness']],
								backgroundColor: [
									"rgba(45, 227, 240, 0.5)",
									"rgba(60, 227, 188 0.5)",
									"rgba(75, 227, 126, 0.5)",
									"rgba(90, 227, 84, 0.5)",
									"rgba(161, 212, 242, 0.5)",
									"rgba(73, 59, 227, 0.5)",
									"rgba(59, 168, 227, 0.5)"
								  ]
							}]
						},
						options: {
							title: {
								display: true,
								text: `Number 1 Song`
							}
						}
					});

					// song2 

					var song2 = document.getElementById('song2');

					var song2_chart = new Chart(song2, {
						type: 'polarArea',
						data:{
							labels:['Danceability','Energy','Valence','Acousticeness','Instrumentalness','Liveness','Speechiness'],
							datasets:[{
								data:[topsongs[play_list][1]['danceability'],topsongs[play_list][1]['energy'],topsongs[play_list][1]['valence'],topsongs[play_list][1]['acousticness'],topsongs[play_list][1]['instrumentalness'],topsongs[play_list][1]['liveness'],topsongs[play_list][1]['speechiness']],
								backgroundColor: [
									"rgba(45, 227, 240, 0.5)",
									"rgba(60, 227, 188 0.5)",
									"rgba(75, 227, 126, 0.5)",
									"rgba(90, 227, 84, 0.5)",
									"rgba(161, 212, 242, 0.5)",
									"rgba(73, 59, 227, 0.5)",
									"rgba(59, 168, 227, 0.5)"
								  ]
							}]
						},
						options: {
							title: {
							display: true,
							text: 'Number 2 Song'
						}}
					});

					// song3 

					var song3 = document.getElementById('song3');

					var song3_chart = new Chart(song3, {
						type: 'polarArea',
						data:{
							labels:['Danceability','Energy','Valence','Acousticeness','Instrumentalness','Liveness','Speechiness'],
							datasets:[{
								data:[topsongs[play_list][2]['danceability'],topsongs[play_list][2]['energy'],topsongs[play_list][2]['valence'],topsongs[play_list][2]['acousticness'],topsongs[play_list][2]['instrumentalness'],topsongs[play_list][2]['liveness'],topsongs[play_list][2]['speechiness']],
								backgroundColor: [
									"rgba(45, 227, 240, 0.5)",
									"rgba(60, 227, 188 0.5)",
									"rgba(75, 227, 126, 0.5)",
									"rgba(90, 227, 84, 0.5)",
									"rgba(161, 212, 242, 0.5)",
									"rgba(73, 59, 227, 0.5)",
									"rgba(59, 168, 227, 0.5)"
								  ]
							}]
						},
						options: {
							title: {
							display: true,
							text: 'Number 3 Song'
						}}
					});
				}
			}

		});
	}
});


d3.json("/static/js/data.json", function(error, data){
	console.log(data);

	
	// topsongs = data;
	// console.log(Object.values(data));
	var i = 0;
	var dance = [];
	for (var play_list in data){
		// console.log(data[play_list]);
		// console.log(data[play_list][0]['danceability']);
		var song_dance = data[play_list][0]['danceability'];
		dance.push(song_dance);
		i = i + 1;
	}

	console.log(dance);
});

var song1 = document.getElementById('song1')
var song2 = document.getElementById('song2')
var song3 = document.getElementById('song3')
function optionChanged(songNo) { 
	if (songNo === 'song1') {
		song1.style.height = "auto";
		song2.style.height = "0px";
		song3.style.height = "0px";
	  } 
	else if (songNo === 'song2'){
		song1.style.height = "0px";
		song2.style.height = "auto";
		song2.style.display = "block";
		song3.style.height = "0px";
	  }
	else {
		song1.style.height = "0px";
		song2.style.height = "0px";
		song3.style.height = "auto";
		song3.style.display = "block";
	}
	console.log(songNo)
}

function scroll_element() {
	song1.style.display = "block";
	song2.style.display = "none";
	song3.style.display = "none";
	var dropDown = document.getElementById("selSong");
    dropDown.selectedIndex = 'song1';
	console.log('block');
}