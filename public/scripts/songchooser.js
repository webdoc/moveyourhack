function SongChooser(options){

  var deferred = new jQuery.Deferred() ;

  var dispose = function() {
    console.log('dispose');
    jQuery(options.dezzerNode).html('');
    jQuery(options.songChooserNode).html('');
    jQuery(options.searchResultNode).html('');
  } ;

  var handleSearchResult = function(results){
    console.log(results) ;
    var html = '<table class="table search-result-list">' ;
    html += '<tr><th>Song</th><th>Artist</th><th>Album</th></tr>' ;
    for(var i = 0; i < results.data.length; i++) {
      var track = results.data[i] ;
      if( track ) {
        html += '<tr class="result-line" data-track-id="'+ track.id + '">'
        html += '<td><div class="track">' + track.title + '</div></td>' ;
        html += '<td><div class="artist">' + track.artist.name + '</div></td>' ;
        html += '<td><div class="album">' + track.album.title + '</div></td>' ;
        html += '</tr>' ;
      }
    }
    html += '</table>' ;
    jQuery(options.searchResultNode).html(html);
    jQuery('tr.result-line', options.searchResultNode).click(handleSongSelected);
  } ;

  var handleSongSelected = function(event){
    var trackId = jQuery(event.currentTarget).data('track-id');
    deferred.resolve(trackId);
    dispose();
  } ;

  this.done = function(func){
    deferred.done(func) ;
  };

  this.autoload = function(query){
    jQuery('input', options.songChooserNode).attr('value', query);
    if(!query) { return }
    DZ.api('search?q=' + query + '&order=RANKING', handleSearchResult) ;
  };

  var initialize = function(options) {
    jQuery(options.songChooserNode).html(
      '<form class="song-chooser-search">' +
      '  <div class="input-append">' +
      '    <input type="text" placeholder="Song Title" />' +
      '    <button class="btn" type="button">Search</button>' +
      '  </div>' +
      '</form>') ;

    var form = jQuery('.song-chooser-search') ;

    var handleSearch = function(e) {
      e.preventDefault();
      var query = jQuery('input', form).attr('value');
      if(!query) { return }
      DZ.api('search?q=' + query + '&order=RANKING', handleSearchResult) ;
    } ;

    form.on('submit', handleSearch);
    jQuery('button', form).on('click', handleSearch)
  }

  initialize.apply(this, arguments);
}