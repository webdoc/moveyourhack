if(!window.DanceParty) { window.DanceParty = {}; }

DanceParty.facebook = {
  didInit: function(){
    this.init = true;
  },

  publishInFeedHandler: function(e) {
    var modalGO = $('#modal_game_over');
    this.publishInFeed(modalGO.data('score'));
  },

  publishInFeed: function(score) {
    if(!this.init) { console.log('Facebook JS SDK not loaded!'); return; }

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
