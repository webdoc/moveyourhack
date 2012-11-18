function SongTimeline(song, interval) {
	this.song = song;
	this.beatTimeline = [];
	this.tatumsTimeline = [];
    this.sectionsTimeline = [];
    this.segmentsTimeline = [];
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
			timeline[currentSample - 1] = data[i].confidence;
			currentSample++;
		}
		// fill with empty until the end
		while(currentSample * this.interval * 0.001 < fullLength) {
			timeline[currentSample - 1] = 1;
			currentSample++;			
		}
		console.log(timeline, timeline.length);
	}.bind(this);

	var fillSegmentTimeline = function(data, fullLength) {
		var count = data.length;
		var currentSample = 1;
		var i;
		for (i = 0; i < count; i++) {
			if (currentSample * this.interval * 0.001 > data[i].start) {
				continue;
			}
			//create 0 sample before this point
			while (currentSample * this.interval * 0.001 < data[i].start) {				
				this.segmentsTimeline[currentSample - 1] = 0;
				currentSample++;
			}
			sampleValue = 1;//(data[i].confidence > 0.5) ? 1 : 0;
			sampleValue = (sampleValue * (data[i].loudness_max + 60) - (data[i].loudness_start + 60)) / 60.0
			this.segmentsTimeline[currentSample - 1] = sampleValue;
			currentSample++;
		}
		// fill with empty until the end
		while(currentSample * this.interval * 0.001 < fullLength) {
			this.segmentsTimeline[currentSample - 1] = 1;
			currentSample++;			
		}
		console.log(this.segmentsTimeline, this.segmentsTimeline.length);
	}.bind(this);

	this.song.getProfile().done(function(analyse){
		// BEATS
		//filltimeline(this.beatTimeline, analyse.beats, analyse.meta.seconds);
		
		// TATUMS
		filltimeline(this.tatumsTimeline, analyse.tatums, analyse.meta.seconds);

		// SECTIONS
		//filltimeline(this.sectionsTimeline, analyse.sections, analyse.meta.seconds);
	
	  // SEGMENTS
		fillSegmentTimeline(analyse.segments, analyse.meta.seconds);
		result.resolve();	
		
	}.bind(this));
	return result;
}

SongTimeline.prototype.getResult = function() {
	var count = this.tatumsTimeline.length;
	var i;
	var result = [];
	for (i = 0; i < count; i++) {
		result[i] = (this.tatumsTimeline[i] + this.segmentsTimeline[i]) / 2.0;
	}
	return result;
}

SongTimeline.prototype.getSegmentResult = function() {
	return this.segmentsTimeline;
}
