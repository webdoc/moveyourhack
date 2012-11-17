Song = function(artist,songName){
	this.artist = artist;
	this.songName = songName;
	return this;
};

Song.prototype.getProfile = function() {
	var url = "http://developer.echonest.com/api/v4/song/search?api_key=FILDTEOIK2HBORODV&format=json&results=1&artist=daft%20punk&title=aerodynamic";
	var query = jQuery.ajax({
		url: url,
		dataType: "json"
	});
	var result = jQuery.Deferred();
	query.done(function(data){
		console.log(data);
		var songsId = data.response.songs[0].id;
		var profileUrl = "http://developer.echonest.com/api/v4/song/profile?api_key=FILDTEOIK2HBORODV&format=json&id=" + songsId + "&bucket=audio_summary";	
		jQuery.ajax({
			url: profileUrl,
			dataType: "json"
		}).done(function(profileData){
			console.log(profileData);
			var analysisUrl = profileData.response.songs[0].audio_summary.analysis_url;
			console.log(analysisUrl);
			jQuery.ajax({
				url: analysisUrl,
				dataType: "json"
			}).done(function(resultData) {
				this.data = resultData;
				result.resolve(resultData);
			})
		})
		
	});
	return result;
};
