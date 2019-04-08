function TypeWriter(textElement, words, wait = 3000) {
  this.textElement = textElement;
  this.words = words;
  this.text = '';
  this.wordIndex = 0;
  this.wait = parseInt(wait, 10);
  this.type();
  this.isDeleting = false;
}

//Type Method
TypeWriter.prototype.type = function() {
  //Current index of word
  const current = this.wordIndex % this.words.length;
  /* console.log(current); */
  //Get full text of current word
  const fullText = this.words[current];
  /* console.log(fullText); */

  //Check if deleting
  if(this.isDeleting) {
    //Remove char
    this.text = fullText.substring(0, this.text.length - 1);
  } else {
    //Add char
    this.text = fullText.substring(0, this.text.length + 1);
  };

  //Initial Type Speed
  let typeSpeed = 200;
  if(this.isDeleting) { 
    typeSpeed /= 1;
  }

  //check if word is complete
  if(!this.isDeleting && this.text === fullText) {
    //Make pause at end
    typeSpeed = this.wait;
    //Set delete to true
    this.isDeleting = true;
  } else if(this.isDeleting && this.text === '') {
    this.isDeleting = false;
    //Move to next word
    this.wordIndex++;
    //pause before start typing
    /* typeSpeed = 500; */
  } 

  //Insert text into element
  this.textElement.innerHTML = `<span class="text">${this.text}</span>`;
  setTimeout(() => this.type(), typeSpeed);
}


//Init on DOM load
document.addEventListener('DOMContentLoaded', init);

//Init app
function init() {
  const textElement = document.querySelector('.text-type');
  const words =JSON.parse(textElement.getAttribute('data-words'));
  const wait = textElement.getAttribute('data-wait');

  // Init TypeWriter
  new TypeWriter(textElement, words, wait);
}