function SongChooser(options){

  function initialize(options) {
    jQuery(options.dezzerNode).html('<div id="dz-root"></div>') ;
    DZ.init({
      appId  : '108771',
      channelUrl : 'http://localhost:3000/dezzer/channel.html'
    });
    jQuery(options.songChooserNode).html('<form class="song-chooser-search"><input type="text" placeholder="Song Title" /><input type="submit" value="Search"></form>') ;

    var form = jQuery('.song-chooser-search') ;
    form.submit(function(e) {
      e.preventDefault();
      var query = jQuery('input', form).attr('value');
      if(!query) { return }
      DZ.api('search?q=' + query, function(res){ console.log(res) }) ;
    }) ;
  }

  initialize.apply(this, arguments);
}