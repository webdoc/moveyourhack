(function(module){
  function Score() {
    this.value = 0 ;
    var listeners = []

    // Add x to the score
    this.inc = function(x) {
      this.value += x ;
    } ;

    // Remove x to score
    this.dec = function(x) {
      this.value -= x ;
    } ;

    // Just print the actual score
    this.toString = function() {
      return this.value ;
    } ;

    this.onChanged = function(listener) {
      listener.push(listener) ;
    } ;
  } ;

  module.exports = {
    Score: Score
  } ;
})(module)