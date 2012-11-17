Song = function(artist,songName){
	if (arguments.length === 1) {
		this.deezerID = artist;
	}
	else {
		this.artist = artist;
		this.songName = songName;
	}
	return this;
};

Song.prototype.getProfile = function() {
	var result = jQuery.Deferred();
	var getProfileFromId = function(id, trackId) {
		var idParam = "id";
		if (trackId) {
			idParam = "track_id";
		}
		var profileUrl = "http://developer.echonest.com/api/v4/song/profile?api_key=FILDTEOIK2HBORODV&format=json&" + idParam + "=" + id + "&bucket=audio_summary";	
		jQuery.ajax({
			url: profileUrl,
			dataType: "json"
		}).done(function(profileData){
			console.log(profileData);
			if(!profileData.response.songs){
				alert('Whoops, we cannot find song analysis for this one, try again with another track.')
				return;
			}
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
	}
	if (this.deezerID) {
		getProfileFromId("deezer:track:"+ this.deezerID, true);
	}else {
		var url;
	 	url = "http://developer.echonest.com/api/v4/song/search?api_key=FILDTEOIK2HBORODV&format=json&results=1&artist=" + encodeURI(this.artist) + "&title=" + encodeURI(this.songName);
        var query = jQuery.ajax({
			url: url,
			dataType: "json"
	    });

		query.done(function(data){
			console.log(data);
			var songsId = data.response.songs[0].id;
			getProfileFromId(songsId);
		});	 	
	}	
	return result;
};
