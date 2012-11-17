SongTimelineDisplay = function(timeline, canvas) {
	this.timeline = timeline;
	this.canvasNode = canvas;
	this.ctx = canvas.getContext('2d');	
	this.WIDTH = 60;
	this.HEIGHT = 500;
}

SongTimelineDisplay.prototype.render = function(callback) {
    this.ctx.fillStyle = '#000';
    this.ctx.fillRect(0,0, this.WIDTH, this.HEIGHT);
    var i = 0, count = this.timeline.beatTimeline.length;
    this.ctx.fillStyle = '#8d1';
    
    for (; i < count || i < this.WIDTH - 1; i++) {
    	var medium = (this.timeline.beatTimeline[i] + this.timeline.tatumsTimeline[i] + this.timeline.sectionsTimeline[i]) / 3
    	this.ctx.fillRect(i* 5,0, 5, this.HEIGHT * medium);
    }
	callback.apply(this, []);
}

var TICK = 0;
var SCALE = 0;
var RUN = 0;
var _CTX = 0;
var UPPED = 0;
SongTimelineDisplay.prototype.updateTime = function(tick, scale)
{
    SCALE = scale;
    if (!RUN)
        this.run();
    TICK = tick;
    _CTX = this.ctx;
    this.ctx.fillStyle ='#000'
    this.ctx.fillRect(0, 100, tick * scale, 10);
    UPPED = 1;
}



SongTimelineDisplay.prototype.run = function()
{
    if (!UPPED && TICK != 0)
        TICK += 0.02;
    else
        UPPED = 0;
    timelineDisplay.ctx.fillStyle ='#000';
    timelineDisplay.ctx.fillRect(0, 100, TICK * SCALE, 10);
    setTimeout(timelineDisplay.run, 20);
}



