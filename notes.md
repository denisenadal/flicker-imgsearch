```
resp.photos.photo.forEach(function(foto){
	var img = foto.$;
	this.src = "https://farm" + farm + ".staticflickr.com/" + server + "/" + id + "_" + secret + ".jpg";
	this.url = "https://www.flickr.com/photos/"+owner+"/+id;

})



$": {
    "id": "25639422977",
    "owner": "160658215@N07",
    "secret": "7ab5f04210",
    "server": "4704",
    "farm": "5",
    "title": "Watch high quality movies at http://ImovieSh.com/",
    "ispublic": "1",
    "isfriend": "0",
    "isfamily": "0"
}



https://www.flickr.com/people/{user-id}/ - profile
https://www.flickr.com/photos/{user-id}/ - photostream
https://www.flickr.com/photos/{user-id}/{photo-id} - individual photo
https://www.flickr.com/photos/{user-id}/sets/ - all photosets
https://www.flickr.com/photos/{user-id}/sets/{photoset-id} - single photoset

```
<script id="photo-template" type="text/x-handlebars-template">
	this.url = "https://www.flickr.com/photos/"+owner+"/+id;
  <article class="photo-listing">
	  <a href="https://www.flickr.com/photos/{{owner}}/{{id}}">
		<img src="{{}}" alt="{{title}}">
		<p class="posted-date">{{dateupload}}</p>
	</a>
	<div class="details">
	  <a href="https://www.flickr.com/photos/{{owner}}/{{id}}"><h1>{{title}}</h1></a>
	  <p class="subtitle">by <a href="https://www.flickr.com/photos/{{owner}}">{{ownername}}</a></p>
	</div>
  </article>
</script>

// render handlebars templates via ajax
function getTemplateAjax(path, callback) {
    var source, template;
    jqueryNoConflict.ajax({
        url: path,
        success: function (data) {
            source = data;
            template = Handlebars.compile(source);
            if (callback) callback(template);
        }
    });
}
