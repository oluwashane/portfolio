const TypeWriter = function(textElement, words, wait = 3000) {
  this.textElement = textElement;
  this.words = words;
  this.txt = '';
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
}


// Type Method
TypeWriter.prototype.type = function(){
  //Current index of word
  const current = this.wordIndex % this.words.length;
  //Get full text of current word
  const fullTxt = this.words[current];
  
  //Check if deleting
  if(this.isDeleting) {
    //Remove char
    this.txt = fullTxt.substring(0, this.txt.length - 1);
  } else {
    //Add char
    this.txt = fullTxt.substring(0, this.txt.length + 1);
  }

  //Initial Type Speed
  let typeSpeed = 300;
  if(this.isDeleting) {
    typeSpeed /= 2;
  }

  //check if word is complete
  if(!this.isDeleting && this.txt === fullTxt) {
    //Make pause at end
    typeSpeed = this.wait;
    //Set delete to true
    this.isDeleting = true;
  } else if(this.isDeleting && this.txt === '') {
    this.isDeleting = false;
    //Move to next word
    this.wordIndex++;
    //pause before start typing
    typeSpeed = 500;
  }

  //Insert txt into element
  this.textElement.innerHTML = `<span class="txt">${this.txt}</span>`;
  setTimeout(() => this.type(), typeSpeed);
}

//Init on DOM load
document.addEventListener('DOMContentLoaded', init);

// init app
function init() {
  const textElement = document.querySelector('.txt-type');
  const words =JSON.parse(textElement.getAttribute('data-words'));
  const wait = textElement.getAttribute('data-wait');

  // Init TypeWriter
  new TypeWriter(textElement, words, wait);
}
