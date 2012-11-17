function SongTimeline(song, interval) {
	this.song = song;
	this.beatTimeline = [];
	this.tatumsTimeline = [];
    this.sectionsTimeline = [];
	this.interval = interval;
};

SongTimeline.prototype.init = function() {
	var result = jQuery.Deferred();
	var result = jQuery.Deferred();
	var sampleValue;

	var filltimeline = function(timeline, data, fullLength) {
		var count = data.length;
		var currentSample = 1;
		var i;
		for (i = 0; i < count; i++) {
			if (currentSample * this.interval * 0.001 > data[i].start) {
				continue;
			}
			//create 0 sample before this point
			while (currentSample * this.interval * 0.001 < data[i].start) {				
				timeline[currentSample - 1] = 0;
				currentSample++;
			}
			sampleValue = (data[i].confidence > 0.5) ? 1 : 0;
			timeline[currentSample - 1] = sampleValue;
			currentSample++;
		}
		// fill with empty until the end
		while(currentSample * this.interval * 0.001 < fullLength) {
			timeline[currentSample - 1] = 1;
			currentSample++;			
		}
		console.log(timeline, timeline.length);
	}.bind(this);

	this.song.getProfile().done(function(analyse){
		// BEATS
		filltimeline(this.beatTimeline, analyse.beats, analyse.meta.seconds);
		
		// TATUMS
		filltimeline(this.tatumsTimeline, analyse.tatums, analyse.meta.seconds);

		// SECTIONS
		filltimeline(this.sectionsTimeline, analyse.sections, analyse.meta.seconds);
	
		result.resolve();	
		
	}.bind(this));
	return result;
}