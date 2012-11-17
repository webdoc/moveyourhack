SongTimelineDisplay = function(timeline, canvas) {
	this.timeline = timeline;
	this.canvasNode = canvas;
	this.ctx = canvas.getContext('2d');	
	this.WIDTH = 60;
	this.HEIGHT = 500;
    this.RECT_WIDTH = 5;
    this.SCALE = 1000 / timeline.interval * this.RECT_WIDTH;
    console.log("scale", this.SCALE);
}

SongTimelineDisplay.prototype.render = function(callback) {
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0,0, this.WIDTH, this.HEIGHT);
    var i = 0, count = this.timeline.beatTimeline.length;
    var result = this.timeline.getResult()
    this.ctx.fillStyle = '#8d1';
    
    for (; i < count || i < this.WIDTH - 1; i++) {
    	var medium = result[i];
    	this.ctx.fillRect(i* this.RECT_WIDTH,0, this.RECT_WIDTH, this.HEIGHT * medium);
    }
	callback.apply(this, []);
}



SongTimelineDisplay.prototype.run = function()
{
    if (this.startTime === undefined) {
        this.startTime = new Date();
    }
    setTimeout(this.refreshTick.bind(this), this.timeline.interval);
}

SongTimelineDisplay.prototype.refreshTick = function() {
    var currentDate = new Date();    
    var distance = currentDate.getTime() - this.startTime.getTime();
    this.ctx.fillStyle ='#fff';
    this.ctx.fillRect(0, 100, distance * this.SCALE / 1000, 10);
    setTimeout(this.refreshTick.bind(this), this.timeline.interval);
}


