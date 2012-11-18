	// Hacky, look away
		window.requestAnimFrame = (function(){
		return  window.requestAnimationFrame       || 
		      window.webkitRequestAnimationFrame || 
		      window.mozRequestAnimationFrame    || 
		      window.oRequestAnimationFrame      || 
		      window.msRequestAnimationFrame     || 
		      function( callback ){
		        window.setTimeout(callback, 1000 / 60);
		      };
		})();

		window.URL = window.URL || window.webkitURL;
		navigator.getUserMedia  = navigator.getUserMedia || navigator.webkitGetUserMedia ||
		navigator.mozGetUserMedia || navigator.msGetUserMedia;

		// hack OVER

		function Game()
		{
			this.WIDTH = 0;
			this.HEIGHT = 0;
			this.canvas = null;
			this.ctx = null;
			this.RUN = 0;

			this.fxCanvas = null;
			this.fxCtx = null;
			this.texture = null;

			this.videoCanvas = null;
			this.videoCtx = null;

			this.data = null;

			this.map = [];
			this.intensity = 0;

			this.score = 0;

			this.PARTICLES = [];

			this.SPRITE = [];

			this.COMMENTS = [];

			this.soundData = null;
			this.soundPlayer = null;
			this.init = function(soundData, soundPlayer)
			{
				this.soundData = soundData;
				this.soundPlayer = soundPlayer;
				this.score = 0;

				this.WIDTH = window.innerWidth;
				this.HEIGHT = window.innerHeight;
				this.canvas = document.createElement('canvas');
				this.canvas.style.width = this.WIDTH;
				this.canvas.style.height = this.HEIGHT;
				this.canvas.style.position = 'absolute';
				this.canvas.style.margin = '0px';
				this.canvas.style.top = '0px';
				this.canvas.style.left = '0px';
				this.canvas.width = this.WIDTH;
				this.canvas.height = this.HEIGHT;
				document.body.appendChild(this.canvas);
				this.ctx = this.canvas.getContext('2d');
			
				this.videoCanvas = document.createElement('canvas');
				this.videoCanvas.width = 64;
				this.videoCanvas.height = 48 * 2;
				this.videoCtx = this.videoCanvas.getContext('2d');
			

				this.map = [];
				var i = 0;
				while (i < 64)
				{
					this.map[i] = [];
					var j = 0;
					while (j < 48)
					{
						this.map[i][j] = 0;
						++j;
					}
					++i;
				}

				var image = new Image();
				image.src = './images/s1.png';
				this.SPRITE.push(image);

				image = new Image();
				image.src = './images/s2.png';
				this.SPRITE.push(image);
			}

			this.start = function(soundPlayer)
			{
                console.log("game start");
				this.RUN = 1;
				this.fxCanvas = fx.canvas();
				this.texture = this.fxCanvas.texture(this.videoCanvas);
				this.run();
                soundPlayer.play();
                soundPlayer.seek(0);
                this.startTime = new Date();
                this.startTime = this.startTime.getTime();
			}

			this.stop = function()
			{
				this.RUN = 0;
				this.soundPlayer.player.pause();
			}

			this.pushParticles = function()
			{
				var data = this.data;
				var x = 0;
				var X = this.WIDTH / 64;
				var Y = this.HEIGHT / 48;

				while (x < 64)
				{
					var y = 0;
					while (y < 48)
					{
					  if (this.PARTICLES.length < 400 && this.map[x][y])
					  {
					  	this.map[x][y]--;

					  	var angle = Math.random() * Math.PI*2;
						var speed = Math.random() * 12.;
						var p =
						{
							x : x * X, 
							y : y * Y,                      
							xs: Math.sin(angle) * speed,
							ys: Math.cos(angle) * speed,
							s  : Math.random() * 40 | 0,
							l : 50
						}
						this.PARTICLES.push(
							p
						);
					  }
					  ++y;
					}
					++x;   
				}
			}

			this.renderPixel = function(update)
			{
				var data = this.data;
				var ctx = this.ctx;
				var x = 0;

				if (this.intensity < 0.01)
					ctx.fillStyle = '#f00';
				else if (this.intensity < 0.03)
					ctx.fillStyle = '#ff0';
				else
					ctx.fillStyle = '#0f0';
				// ctx.fillStyle = '#fff';
				ctx.beginPath();

				var X = this.WIDTH / 64;
				var Y = this.HEIGHT / 48;
				while (x < 64)
				{
					var y =0;
					while (y < 48)
					{
					  if (this.map[x][y])
					  {
					  	this.map[x][y]--;
						ctx.moveTo(x * X, y * Y);
						ctx.arc(x * X, Y * y, X/3, 0, Math.PI * 2, true);
					  }
					  ++y;
					}
					++x;   
				}
				ctx.fill();
			}
			
			this.renderParticles = function()
			{
			 	var ctx = this.ctx;
			 	var i = 0;

			 	var X = this.WIDTH / 64;
				ctx.beginPath();
			 	while (i < this.PARTICLES.length)
			 	{
			 		var p = this.PARTICLES[i];
			 		p.x += p.xs;
			 		p.y += p.ys;
			 		//p.s = Math.random() * 40 | 0;
			 		p.l--;
			 		// ctx.moveTo(p.x, p.y);
					//ctx.arc(p.x, p.y, X /3,0, Math.PI * 2, true);
			 		 ctx.drawImage(this.SPRITE[0], p.x - 100, p.y - 100, p.s, p.s);
			 		if (p.l ==0)
			 			this.PARTICLES.splice(i--, 1);
			 		++i;
			 	}
			 	ctx.fill();
			}

			this.renderTexts = function()
			{
				var spacing = 8 ;
				var letterSpacing = 5 ;
				var posY = 100 ;
				for(var ts = this.COMMENTS.length -1; ts >= 0; ts--){
					var comment = this.COMMENTS[ts];
					comment.ttl --;
					var posX = 150 ;
					if(comment.ttl == 0){
						this.COMMENTS.shift();
					}
					for(var t = 0; t < comment.text.length; t++){
						var letter = alphabet[comment.text[t]]
						for(var i = 0; i < letter.length; i++){
							for(var j = 0; j < letter[i].length; j++){
								if(letter[i][j]){
									this.PARTICLES.push({
										x : posX + j*spacing, 
										y : posY + comment.y + i*spacing,                      
										xs: 0,
										ys: 4,
										s  : 6,
										l : 10 
									});
								}
								
							}	
						}
						posX += letterSpacing + letter.length * spacing;
					}
					if(comment.ttl < 20){
						comment.y += 8;
					}
					posY += letterSpacing + 12 * spacing;
				}	
			}

			this.renderScore = function()
			{
				this.ctx.font = '50px Arial';
				this.ctx.fillText(this.score + ' ', this.WIDTH  - 200, 50);
			}

            this.preRenderVisualizer = function(timeline) {
                this.timeline = timeline;
                this.scale = 1000 / timeline.interval * 5;
                this.visualizerCanvas = document.createElement('canvas');
                this.visualizerCanvas.width = 5 * timeline.getResult().length;
                this.visualizerCanvas.height = 150;
                var m_context = this.visualizerCanvas.getContext("2d");
                m_context.fillStyle = '#000';
                m_context.globalAlpha = 0.5;
                m_context.fillRect(0,0, this.visualizerCanvas.width, this.visualizerCanvas.height);
                var i = 0, count = timeline.tatumsTimeline.length;
                var result = timeline.getResult();

                for (; i < count ; i++) {
                    var value = result[i];
                    console.log("value", value);
                    m_context.fillStyle = '#c33';
                    m_context.fillRect(i* 5,0, 5, this.visualizerCanvas.height * value * 2);
                }
            }

            this.renderVisualizer = function()
            {
                if (this.startTime) {
                    var currentDate = new Date();
                    var distance = currentDate.getTime() - this.startTime;
                    var distanceInpx = distance * this.scale / 1000;
                    var lengthOffset = 0;
                    var startOffset = 0;
                    if (distanceInpx < 150) {
                        lengthOffset = 150 - distanceInpx;
                    }
                    else {
                        startOffset =  (distance * this.scale / 1000) - 150;
                    }
                    this.ctx.drawImage(this.visualizerCanvas, startOffset, 0, 300 - lengthOffset, 150,this.WIDTH -400 + lengthOffset, this.HEIGHT - 250, 300 - lengthOffset, 150);
                    this.ctx.strokeStyle = '#8d1';
                    this.ctx.strokeRect(this.WIDTH -400, this.HEIGHT - 250, 300, 150);
                    this.ctx.strokeStyle = '#ccc';
                    this.ctx.strokeRect(this.WIDTH -250, this.HEIGHT - 250, 1, 150);
                }
            }

			this.render = function()
			{		
				var ctx = this.ctx;
				ctx.globalAlpha = .2;
				ctx.fillStyle = '#000';
				ctx.fillRect(0,0,this.WIDTH, this.HEIGHT);
				ctx.globalAlpha = 1.0
				//ctx.drawImage(this.videoCanvas, 0 ,0);
				
				this.renderPixel();
				if (this.intensity == 0)
				{
					this.pushParticles();
					this.renderParticles();
				}
				this.renderTexts();
				this.renderScore();
                this.renderVisualizer();
			}

			this.analyze = function(now)
			{
				this.videoCtx.drawImage(userMedia.video,0,0, 64, 48);
				this.texture.loadContentsOf(this.videoCanvas);
			    this.fxCanvas.draw(this.texture);
    			this.fxCanvas.mirror();
   				this.fxCanvas.move(0.01);
    			this.fxCanvas.update();
			    this.videoCtx.drawImage(this.fxCanvas, 0, 0);
			    this.intensity = this.compute();
			   // console.log(now);
			    //console.log(this.intensity + ' --  ' + this.soundData[now])
			    // TODO : true scoring;
			    var l = 0;
			    if (this.soundData[now]) 
			     l = 0.2 - Math.abs(this.intensity - this.soundData[now]);
			    console.log(l);
			    this.score += (l> 0 ) ?  l * 1000 | 0: 0;
			    this.videoCtx.drawImage(userMedia.video, 0, 48, 64, 48);
				if (!this.soundData[now])
					this.gameOver();
			}

			this.gameOver = function()
			{
				/*this.RUN = 0;

				ctx.fillStyle = '#000';
				ctx.globalAlpha = 0.5;
				ctx.fillRect(0,0,this.WIDTH, this.HEIGHT);
				ctx.fillStyle = '#fff';
				ctx.globalAlpha = 0.0;
				ctx.font = '80px Arial';
				ctx.fillText(this.score, this.WIDTH / 2 - 300, this.HEIGHT / 2);
			  */}
			this.compute = function()
			{
				this.data = this.videoCtx.getImageData(0,0,64,48).data;
				var data = this.data;

				var intensity = 0;
				var x = 0;
				var hash = 0;
				while (x < 64)
				{
					var y =0;
					while (y < 48)
					{
					  if (data[x * 4 + y * 64 * 4] > 120)
					  {
					    intensity++;
					    this.map[x][y] = 6;
					  	hash += x * y;
					  }
					  ++y;
					}
					++x;   
				}
		//		console.log(hash);
				return intensity / 3072;
			}

			this.addComment = function(text){
				this.COMMENTS.push({text: text, ttl: 100, y: 10});
			}

			this.run = function(delta)
			{
				var now = new Date().getTime();
				//console.log(delta);
				game.analyze((now - TIME ) / 100 | 0);
				if (game.RUN);
				game.render();	
				if (game.RUN)
					requestAnimFrame(game.run);
			}
		}
		var game = new Game();




		function UserMedia()
		{
			this.hasGetUserMedia = function() 
			{
			  	// Note: Opera is unprefixed.
			  	return !!(navigator.getUserMedia || navigator.webkitGetUserMedia ||
			            navigator.mozGetUserMedia || navigator.msGetUserMedia);
			}

			this.onFailSoHard = function(e)
			{
				console.log('Reeeejected!', e);
			};

			this.video = document.createElement('video');

			this.init = function(soundPlayer)
			{
				if (navigator.getUserMedia)
				{
					navigator.getUserMedia(
						{audio: true, video: true}, 
						function(stream) 
						{
							console.log('oh');
							userMedia.video.src = window.URL.createObjectURL(stream);
				    		userMedia.video.play();
				    		game.start(soundPlayer);
				  		}, 
				  		this.onFailSoHard
				  	);
				} 
				else
				{
			  		alert('fail');
				}
			}
		}
		var userMedia = new UserMedia();

		var TIME = 0;

		function launchGame(timeline, soundPlayer)
		{

			TIME = new Date().getTime();
			console.log(timeline.getResult());
			soundPlayer.pause();
			soundPlayer.seek(0);
            game.init(timeline.getResult());
            game.preRenderVisualizer(timeline);
            userMedia.init(soundPlayer);

			// COMMENTS
			setInterval(function(){ game.addComment( songUtils.getCheer(Math.random()).toUpperCase() ) }, 2000);
		}
