Handlebars.registerHelper('formatDate',function(timestamp){
	return new Date(timestamp * 1000).toLocaleDateString('en-us',{ year: 'numeric', month: 'short', day: 'numeric', hour: 'numeric',minute:'numeric',hour12: true });
});

var temphtml = $('#photo-template').html();
var photoTemplate = Handlebars.compile(temphtml);

getLatest();

$('#next').click(function(){
	var page = $('$photo-results').attr('data-page');
	$('$photo-results').attr('data-page', page.toInt() + 1);
	getLatest(page);

});


function getLatest(page, success){
	if(page === 'undefined'){ var page = 1;}
	$.getJSON('./latest/'+page,function(photos){
		console.log(photos);
		var data = { photos: photos.photo};
		$('#photo-results').html(photoTemplate(data));
		if(photos.pages < 2){ $('#next').hide(); }
		else{$('#next').show();}
		if(photos.page >1){ $('#previous').show(); }
		else{$('#previous').hide(); }
	});


}
