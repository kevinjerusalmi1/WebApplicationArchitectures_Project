window.addEventListener("load", function () {


	var acteurForm = document.getElementById("searchActeurForm");
	getIntiFirstElement();
	acteurForm.addEventListener("submit", function (event) {
		event.preventDefault();
		var actorOrDirector = document.getElementById("textActeur");
		verifyByActorsOrDirector(actorOrDirector);

  });

});

var apiKeyT = "515f772922097746c8f9d935bc4d8254";
var indexOfMovies = 0;
var IDfilm="";
var score=0;
var checkactor ="";
var deletedivfilm=false;
var deletedivActor=false;
var listMovies ;


// add comment
function getIntiFirstElement(){


	var searchTitle="Inception";
//	var searchTitle="Romeo + Juliette";
	findFilmByTitle(searchTitle,true);

  };

  function getNextElement(indexOfMovies){
	this.indexOfMovies=this.indexOfMovies+1;
	return getListPopularityMovies(indexOfMovies);
};

// add comment
function getListPopularityMovies(index){

	var movies ;
	xhr = new XMLHttpRequest();
    var urlT ="https://api.themoviedb.org/3/discover/movie?api_key=515f772922097746c8f9d935bc4d8254&sort_by=popularity.desc";
	xhr.onload = function() {
    var response = JSON.parse(this.responseText).results;
	createElementMovie(response,index);
	IDfilm = response[index].id;
  };
   xhr.open("GET",urlT, true);
   xhr.send();
   return index;
}

// add comment
function createElementMovie(titleMovie,releasedateMovie,posterPathMovie){

	var title = document.createElement("h1");
	var releasedate = document.createElement("h2");
	var posterPath = document.createElement("img");

	posterPath.src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/"+posterPathMovie;
	title.innerHTML = "Title Movie : "+titleMovie;
	releasedate.innerHTML = "Release Date Movie : "+releasedateMovie;


	document.getElementById("tmdbresult").appendChild(title);
	document.getElementById("tmdbresult").appendChild(releasedate);
	document.getElementById("tmdbresult").appendChild(posterPath);

	createDivActorSearch();

}

// add comment
function createDivActorSearch(){

	if(deletedivActor)
	{
		removeAllElements("divActor");
		deletedivActor=true;
	} else {
		deletedivActor=true;
	}


   var divactor = document.createElement("div");
       divactor.setAttribute("class", "divactor");
	   divactor.setAttribute("id", "divActor");
   var label = document.createElement("label");
   	   label.innerHTML = "Citez un acteur/directeur du Film";
   var inputacteur = document.createElement("input");
   inputacteur.setAttribute("id", "textActeur");

   var submit = document.createElement("input");
   	   submit.setAttribute("type", "submit");
   	   submit.setAttribute("value", "Envoyer");
	   submit.setAttribute("name", "submitSearchFilm");


   divactor.appendChild(label);
   divactor.appendChild(inputacteur);
   divactor.appendChild(submit);

   document.getElementById("tmdbresult").appendChild(divactor);

}

// add comment
function createDivFilmSearch(){

	if(deletedivfilm)
	{
		removeAllElements("divFilm");
		deletedivfilm=true;
	} else {
		deletedivfilm=true;
	}



   var divFilm = document.createElement("div");
       divFilm.setAttribute("class", "divfilm");
	    divFilm.setAttribute("id", "divFilm");
   var label = document.createElement("label");
   	   label.innerHTML = "Citez un film dans lequel l'acteur a joue :";
   var inputacteur = document.createElement("input");
   inputacteur.setAttribute("id", "textFilm");
   inputacteur.setAttribute("onkeydown", "verifyFilmByNameEvent(event)");

   var submit = document.createElement("input");
   	   submit.setAttribute("type", "button");
   	   submit.setAttribute("value", "Envoyer");
	   submit.setAttribute("id", "submitSearchFilm");
	   submit.setAttribute("name", "submitSearchFilm");
	   submit.setAttribute("onclick", "verifyFilmByName()");


   divFilm.appendChild(label);
   divFilm.appendChild(inputacteur);
   divFilm.appendChild(submit);

   document.getElementById("tmdbresult").appendChild(divFilm);

}


// add comment
function createResponseElementMovie(response){


    if(deletedivActor){
		removeAllElements("divActor");
		deletedivActor=false;
	}


	var divResponse = document.createElement("divResponse");
	var profilepath = document.createElement("img");
	profilepath.src="https://www.themoviedb.org/t/p/w600_and_h900_bestv2/"+response.profile_path;

	var actorName = document.createElement("h4");
	actorName.innerHTML = response.name;
	var br = document.createElement("br");
	divResponse.appendChild(br);
	divResponse.appendChild(actorName);
	divResponse.appendChild(profilepath);
	divResponse.appendChild(actorName);

	document.getElementById("tmdbresult").appendChild(divResponse);

	createDivFilmSearch();
}

// add comment
function createResponseEroorElement(message){

	var range = document.createElement("INPUT");
		range.setAttribute("type", "range");
		range.setAttribute("id", "score");
		range.setAttribute("value", this.score);

	var result = document.createElement("B");
    var tn = document.createTextNode(this.score +"%");
        result.appendChild(tn);


	var erreur = document.createElement("h3");
		erreur.innerHTML= "Incorrect response !";

	var erreur2 = document.createElement("h2");
		erreur2.innerHTML= message;


	document.getElementById("tmdbresult").appendChild(erreur);
	document.getElementById("tmdbresult").appendChild(erreur2);
	document.getElementById("tmdbresult").appendChild(range);
	document.getElementById("tmdbresult").appendChild(result);

}


// add comment
function removeAllElements(divElement){
	document.getElementById(divElement).remove();
}

function findFilmByTitle(searchTitle,createElement) {

  xhr = new XMLHttpRequest();


  var urlT ="https://api.themoviedb.org/3/movie/";

  xhr.onload = function() {
    var response = JSON.parse(this.responseText).results;


	if (response.length == 0) {
		var message = "Film n'existe pas ! " ;
	   createResponseEroorElement(message)
	} else{
	var poster_path="";

	if(response[0].poster_path==null){
		poster_path =response[1].poster_path;
	} else{
		poster_path = response[0].poster_path;
	}

	if(createElement){
		createElementMovie(response[0].title,response[0].release_date,poster_path);
	}

    IDfilm=response[0].id;
	}
     };
  xhr.open("GET",
  "https://api.themoviedb.org/3/search/movie?api_key=" + apiKeyT + "&query=" + searchTitle, true);
  xhr.send();
  return IDfilm


}


// add comment
function getListActors(response){
	var actors=[]
    for(let j = 0; j < response.length; j++){
        actors.push(response[j].name)
   }
   return actors;
}

// add comment
function getListDirector(response){
	var directors=[]
	 for(let j = 0; j < response.length; j++){
                        if(response[j].job == 'Director'){
                          directors.push(response[j].name)
                        }}
	return directors;
}


function verifyFilmByNameEvent(event){
	if (event.keyCode == 13) {
        verifyFilmByName();
        return false;
    }
}
function verifyFilmByName(){
	var filmName = document.getElementById("textFilm");
	var idFilm = findFilmByTitle(filmName,false);
	ifActorExistInMoviecredits(idFilm,filmName.value);
}

// add comment
function ifActorExistInMoviecredits(idFilm,filmName){
	var urlT ="https://api.themoviedb.org/3/movie/";
	var exist = false;
	xhr.onload = function() {
		var listActors = JSON.parse(this.responseText).cast;

		var trouve = listActors.find(actor => actor.name.toLowerCase()==checkactor.toLowerCase());

		if (typeof(trouve) != "undefined"){
			score=score+5;
			exist =  true;

			findFilmByTitle(filmName,true);

		} else{
		console.log("Perdu acteur ne fait pas partie de teams de film ");
	}

	}
	xhr.open("GET", urlT+idFilm+"/credits?api_key=" + apiKeyT , true);
	xhr.send();

	return exist;
}

// add comment
function verifyByActorsOrDirector(actorOrDirector) {

   if(checkactor == actorOrDirector.value && actorOrDirector.value!=""){

	   var message = "Vous devez choisir un autre acteur !";
	   createResponseEroorElement(message);

   } else {
 checkactor = actorOrDirector.value;

   var urlT ="https://api.themoviedb.org/3/movie/";
   var i=0

  xhr = new XMLHttpRequest();

  xhr.onload = function() {
    var listActors = JSON.parse(this.responseText).cast;
    var listDirectors = JSON.parse(this.responseText).crew;
    var listActorsAndDirectors = listActors.concat(listDirectors);

     var listActors = getListActors(listActors);
	 var listDirectors = getListDirector(listDirectors);

	 var trouve = listActorsAndDirectors.find(actor => actor.name.toLowerCase()==actorOrDirector.value.toLowerCase());
	 	 //console.log("listActorsAndDirectors : "+ listActors);
	 if (typeof(trouve) != "undefined"){
		 score=score+5;
		 createResponseElementMovie(trouve);

	  } else{
		createResponseEroorElement("");
		//getIntiFirstElement();
	  }

    for(let j = 0; j < listActors.length; j++){
     // console.log("Ateur numero "+j+"  " +listActors[j])
    }

	 for(let j = 0; j < listDirectors.length; j++){
      //console.log("Directeur numero "+j+"  " +listDirectors[j])
    }
  };


  xhr.open("GET", urlT+IDfilm+"/credits?api_key=" + apiKeyT , true);
  xhr.send();
   }
}
