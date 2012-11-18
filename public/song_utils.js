if(!window.DanceParty) { window.DanceParty = {}; }

DanceParty.songUtils = {
  getCheer: function(score){
    if(score < 0.8) {
      return 'GG!!!';
    } else if(score < 0.5) {
      return 'Greattt!';
    }
    else {
      return 'Move, move!';
    }
  },

  showGameOver: function(score) {
    var modalGO = $('#modal_game_over');
    modalGO.data('score', score);
    modalGO.modal();
  }
};
