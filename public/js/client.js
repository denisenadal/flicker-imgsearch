Handlebars.registerHelper('formatDate',function(timestamp){
	return new Date(timestamp * 1000).toLocaleDateString('en-us',{ year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric',minute:'numeric',hour12: true });
});

var temphtml = $('#photo-template').html();
var photoTemplate = Handlebars.compile(temphtml);
$('#search').val('');
$('#viewResults').attr('checked','checked');
getPhotos();

$('.resultNav button').click(function(){
	var diff = $(this).attr('id') === 'previous' ? -1 : 1;
	var page = $('#photo-results').attr('data-page');
	page = parseInt(page) + diff;
	$('#photo-results').attr('data-page', page);
	$('#currentPage').text('Page '+page);
	var currentType = getType();
	getPhotos(page, currentType);

});


$('#doSearch').click(function(e){
	e.preventDefault();
	var query = $('#search').val();
	var qType = $('[name="searchType"]:checked').val();
	if(qType == "json"){
		window.location = './search?terms='+query;
	}
	else{
		var page = $('#photo-results').attr('data-page');
		updateType(query);
		getPhotos(page,query);
	}
});

$('header nav').keypress(function(event){
	var keycode = (event.keyCode ? event.keyCode : event.which);
	if(keycode == '13'){
		$('#doSearch').click();
    	return false;
	}
});


function getPhotos(page, query, success){
	if(typeof page === 'undefined'){ page = "1";}
	if( getType() !== 'latest' && typeof query !== undefined){
		//do search stuff
		$.getJSON('./search/?terms='+query+'&offset='+page,function(resp){
			var data = { photos: resp.photos.photo};
			updateResults(data, resp.photos);
		});
	}
	else{
		//do latest
		$.getJSON('./latest/'+page,function(photos){
			var data = { photos: photos.photo};
			updateResults(data, photos);
		});
	}
}

function getType(){
	return $('#photosLabel').attr('data-results');
}

function updateType(type){
	if(type !== "latest"){
		$('#photosLabel').attr('data-results',type).text('Search Results for '+type);
	}
	else{
		$('#photosLabel').attr('data-results','latest').text('Latest Photos');
	}
}

function updateResults(data,photos){
	$('#photo-results').html(photoTemplate(data));
	if(photos.pages < 2){ $('#next').hide(); }
	else{$('#next').show();}
	if(photos.page >1){ $('#previous').show(); }
	else{$('#previous').hide(); }
}
