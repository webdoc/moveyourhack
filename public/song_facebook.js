window.songFacebook = {
  ditInit: function(){
    this.init = true;
  },

  publishInFeed: function(score) {
    var obj = {
      method: 'feed',
      redirect_uri: 'http://www.danceparty.me',
      link: 'http://www.danceparty.me',
      //picture: 'http://fbrell.com/f8.jpg',
      name: 'Dance Party!',
      caption: 'My score: '+score,
      description: 'Dance on your sounds.'
    };

    function callback(response) {
      console.log('FB publish ok');
    }

    FB.ui(obj, callback);
  }
};
