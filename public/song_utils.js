window.songUtils = {
  getCheer: function(score){
    if(score < 0.8) {
      return 'GG!!!';
    } else if(score < 0.5) {
      return 'Greattt!';
    }
    else {
      return 'Move, move!';
    }
  }
};
