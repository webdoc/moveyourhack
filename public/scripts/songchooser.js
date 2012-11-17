function SongChooser(options){

  var handleSearchResult = function(results){
    console.log(results) ;
    var html = '<table class="table search-result-list">' ;
    html += '<tr><th>Song</th><th>Artist</th><th>Album</th></tr>' ;
    for(var i = 0; i < results.data.length; i++) {
      var track = results.data[i] ;
      if(track){
        html += '<tr class="result-line">'
        html += '<td><div class="track">' + track.title + '</div></td>' ;
        html += '<td><div class="artist">' + track.artist.name + '</div></td>' ;
        html += '<td><div class="album">' + track.album.title + '</div></td>' ;
        html += '</tr>'
      }
    }
    html += '</table>' ;
    jQuery(options.searchResultNode).html(html);
    jQuery('tr', options.searchResultNode)
  } ;

  var initialize = function(options) {
    jQuery(options.dezzerNode).html('<div id="dz-root"></div>') ;
    DZ.init({
      appId  : '108771',
      channelUrl : 'http://localhost:3000/dezzer/channel.html'
    });
    jQuery(options.songChooserNode).html(
      '<form class="song-chooser-search">'+
      '  <div class="input-append">'+
      '    <input type="text" placeholder="Song Title" />'+
      '    <button class="btn" type="button">Go!</button>'+
      '  </div>'+
      '</form>') ;

    var form = jQuery('.song-chooser-search') ;
    var handleSearch = function(e) {
      e.preventDefault();
      var query = jQuery('input', form).attr('value');
      if(!query) { return }
      DZ.api('search?q=' + query, handleSearchResult) ;
    } ;

    form.on('submit', handleSearch);
    jQuery('button', form).on('click', handleSearch)
  }

  initialize.apply(this, arguments);
}