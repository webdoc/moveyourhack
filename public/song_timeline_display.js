SongTimelineDisplay = function(timeline, canvas) {
	this.timeline = timeline;
	this.canvasNode = canvas;
	this.ctx = canvas.getContext('2d');	
	this.WIDTH = 2000;
	this.HEIGHT = 500;
}

SongTimelineDisplay.prototype.render = function() {
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0,0, this.WIDTH, this.HEIGHT);
    var i = 0, count = this.timeline.beatTimeline.length;
    this.ctx.fillStyle = '#8d1';
    
    for (; i < count || i < this.WIDTH - 1; i++) {
    	var medium = (this.timeline.beatTimeline[i] + this.timeline.tatumsTimeline[i] + this.timeline.sectionsTimeline[i]) / 3
    	this.ctx.fillRect(i,0, 1, this.HEIGHT * medium);
    }

}