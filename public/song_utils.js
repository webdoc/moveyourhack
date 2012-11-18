if(!window.DanceParty) { window.DanceParty = {}; }

DanceParty.songUtils = {
  getCheer: function(score){
    console.log(score);
    if(score > 0.7) {
      return 'Move your Body!';
    }
    else if(score > 0.4) {
      return 'Come on!';
    }
    else if(score > 0.2) {
      return 'Listen to the beat!';
    }
    else {
      return "You re not a Travolta!";
    }
  },

  showGameOver: function(score) {
    var modalGO = $('#modal_game_over');
    modalGO.data('score', score);
    modalGO.find('#score').html('Your score: '+score);
    modalGO.modal();
  }
};
