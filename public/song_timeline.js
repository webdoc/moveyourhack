function SongTimeline(song, interval) {
	this.song = song;
	this.beatTimeline = [];
	this.tatumsTimeline = [];
    this.sectionsTimeline = [];
	this.interval = interval;
};

SongTimeline.prototype.init = function() {
	var result = jQuery.Deferred();
	var currentSample = 1;
	var result = jQuery.Deferred();
	this.song.getProfile().done(function(analyse){
		// BEATS
		var count = analyse.beats.length;
		var i;
		for (i = 0; i < count; i++) {
			//create 0 sample before this point
			while (currentSample * this.interval * 0.001 < analyse.beats[i].start) {
				this.beatTimeline[currentSample - 1] = 0;
				currentSample++;
			}
			this.beatTimeline[currentSample - 1] = 1;
			currentSample++;
		}
		// fill with empty until the end
		while(currentSample * this.interval * 0.001 < analyse.meta.seconds) {
			this.beatTimeline[currentSample - 1] = 1;
			currentSample++;			
		}
		console.log(this.beatTimeline, this.beatTimeline.length);

		// TATUMS
		count = analyse.tatums.length;
		currentSample = 1;
		for (i = 0; i < count; i++) {
			//create 0 sample before this point
			while (currentSample * this.interval * 0.001 < analyse.tatums[i].start) {
				this.tatumsTimeline[currentSample - 1] = 0;
				currentSample++;
			}
			this.tatumsTimeline[currentSample - 1] = 1;
			currentSample++;
		}
		// fill with empty until the end
		while(currentSample * this.interval * 0.001 < analyse.meta.seconds) {
			this.tatumsTimeline[currentSample - 1] = 1;
			currentSample++;			
		}		
		console.log(this.tatumsTimeline, this.tatumsTimeline.length);

		// SECTIONS
		count = analyse.sections.length;
		currentSample = 1;
		for (i = 0; i < count; i++) {
			//create 0 sample before this point
			while (currentSample * this.interval * 0.001 < analyse.sections[i].start) {
				this.sectionsTimeline[currentSample - 1] = 0;
				currentSample++;
			}
			this.sectionsTimeline[currentSample - 1] = 1;
			currentSample++;
		}		
		// fill with empty until the end
		while(currentSample * this.interval * 0.001 < analyse.meta.seconds) {
			this.sectionsTimeline[currentSample - 1] = 1;
			currentSample++;			
		}
		console.log(this.sectionsTimeline, this.sectionsTimeline.length);	
		result.resolve();	
		
	}.bind(this));
	return result;
}