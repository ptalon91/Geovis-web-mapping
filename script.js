// Script for the web-mapping project of "Geovisualisation et traitement de l'infromation", University of Lausanne, FGSE, spring 2016.

// Span with introduction text.
var texte_info = '<span class="sous-titre"><h2>Le parcours</h2></span><p id=descr>Cet itinéraire vous fera parcourir et admirer en quelques étapes les curiosités principales de la vieille ville de Montreux ainsi que de somptueux panoramas donnant sur le lac Léman et les Alpes.</p>';

// Satellite layer, link is not operational anymore.
var satlayer = L.tileLayer('http://khms1.google.ch/kh/v=149&src=app&x={x}&y={y}&z={z}&scale=2&s=Ga', {
	attribution: 'Satellite imagery by Google'
});

// Tiles are not uploaded on GitHub. To do with MapBox and TillMill.
var mylayer = L.tileLayer('tiles/{z}/{x}/{y}.png', {
	attribution: 'Map data &copy; <a href="http://www.swisstopo.ch">Vector-200, Swisstopo</a>, Données statistiques <a href="http://www.scris.vd.ch">SCRIS, Canton de Vaud</a>'
});
   
// Create Leaflet map, define settings.
var map = new L.map('map', {
	center: [46.4328, 6.9136],
	zoom: 15, maxZoom: 18,
	minZoom: 13,
	maxBounds: [[46.3667, 6.8122], [46.5125, 7.0196]],
	layers : [mylayer]
});

// Coordinates for the vector points that will be added on the map.
var postes = [
	[46.4341, 6.9149],
	[46.4339, 6.9160],
	[46.4337, 6.9165],
	[46.4330, 6.9170],
	[46.4313, 6.9187],
	[46.4286, 6.9234]
];

// Information that will appear for each point.
var infos = [
	"<b><h2>Poste 1</h2></b><p id=descr>Maison Visinand. Il s'agit du centre culturel historique de la ville de Montreux. Avis aux amateurs d'art et autres curieux!</p><img src='img/p1.jpg' id=vignettes>",
	"<b><h2>Poste 2</h2></b><p id=descr>Panorama sur Montreux et les Alpes. Le petit ponton circulaire en bois permet de reprendre son souffle tout en admirant la vue.</p><img src='img/p2.jpg' id=vignettes>",
	"<b><h2>Poste 3</h2></b><p id=descr>Baie de Montreux et Gorges du Chauderon. Si vous prévoyez de remonter les gorges, équipez-vous de bonnes chaussures.</p><img src='img/p3.jpg' id=vignettes>",
	"<b><h2>Poste 4</h2></b><p id=descr>Caveau St-Vincent. Lieu de fêtes et de célébrations. Allez-y lors d'événements programmés ou reservez pour votre soirée privée!</p><img src='img/p4.jpg' id=vignettes>",
	"<b><h2>Poste 5</h2></b><p id=descr>Temple St-Vincent. Admirez le temple ainsi que la magnifique vue sur le lac!</p><img src='img/p5.jpg' id=vignettes>",
	"<b><h2>Poste 6</h2></b><p id=descr>Panorama sur le lac et la vallée du Rhône.Prenez une photo avant de redescendre ou de continuer à grimper jusqu'à Glion!</p><img src='img/p6.png' id=vignettes>"
];

// Add icons to the vector points.
for (var i=0; i < postes.length; i++){
	var poste = new L.Marker(postes[i], {
		icon: L.icon({
			iconUrl: 'icons/icon-poste-'+(i+1)+'.png',
			iconSize: [21, 40],
			iconAnchor: [10.5, 40]
		})
});

// Add an info pop-up.
poste.bindPopup(infos[i]); 

// On mouseover event on point, show description. 
poste.on("mouseover", function() {
	document.getElementById("info_marqueur").innerHTML = this._popup.getContent();
});

// On mouseout event on point, show back general information.
poste.on("mouseout", function() {
	document.getElementById("info_marqueur").innerHTML = texte_info;
});

// Add points to map.
poste.addTo(map);
}

// List of the basemaps.
var baseMaps = {
	"Plan": mylayer,
	"Satellite": satlayer,
};

// Basemap selector.
L.control.layers(baseMaps, {}).addTo(map);

// Add TillMill map.
L.wax(map);

// Add vector line geoJSON on map.
$.getJSON('geodata/couche_vect.geojson', function(data){
	var couchevect = L.geoJson(data,{
		style: {color: 'red', opacity: 0.5, weight: 5}
	});
	couchevect.addTo(map);
});

// Create functions to center map, integrated to HTML for onclick events.
function centrer() {
	map.setView(new L.LatLng(46.4328, 6.9136), 15);
}

function centrer1() {
	map.setView(new L.LatLng(46.4341, 6.9149), 18);
}

function centrer2() {
	map.setView(new L.LatLng(46.4339, 6.9160), 18);
}

function centrer3() {
	map.setView(new L.LatLng(46.4337, 6.9165), 18);
}

function centrer4() {
	map.setView(new L.LatLng(46.4330, 6.9170), 18);
}

function centrer5() {
	map.setView(new L.LatLng(46.4313, 6.9187), 18);
}

function centrer6() {
	map.setView(new L.LatLng(46.4286, 6.9234), 18);
}