var temphtml = $('#photo-template').html();
var photoTemplate = Handlebars.compile(temphtml);

$.getJSON('./latest',function(photos){
	console.log(photos);
	var data = { photos: photos};
	$('.photo-results').append(photoTemplate(data));

});
