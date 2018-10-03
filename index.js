var playButton = document.getElementsByTagName('button')[0];
var pauseButton = document.getElementsByTagName('button')[1];
var nextButton = document.getElementsByTagName('button')[2];

var jukebox = new Audio('music/unity.mp3')

playButton.addEventListener('click', function() {
  jordansJukeBox.playAudio()
});

pauseButton.addEventListener('click', function() {
  jordansJukeBox.pauseAudio()
});

nextButton.addEventListener('click', function() {
  jordansJukeBox.nextAudio()
});



// DUMMY

// constructor function which has play, pause, next, previous, stop, and shuffle funtionality.
class Song {
  constructor(songName, artist, album, genre, src) {
    this.songName = songName;
    this.artist = artist;
    this.album = album;
    this.genre = genre
    this.src = src;
    this.myAudio = new Audio(this.src)
  }
};
var song1 = new Song('Unity', 'Frank Ocean', 'Endless', 'Pop', 'music/unity.mp3')

class Jukebox {
  constructor() {
    this.songs = [];
    this.songNum = 0;
  }
  addSongs(song) {
    this.songs.push(song);
    console.log('Song Added!');
  }
  playAudio() {
    this.songs[this.songNum].myAudio.play()
      }
  pauseAudio() {
    this.songs[this.songNum].myAudio.pause()
  }
  nextAudio() {
    if (this.songs[this.songNum] == this.songs.length - 1) {
      console.log('next song')
    } else {
      this.songNum = 0;
      this.playAudio()
    }
  }

};

var jordansJukeBox = new Jukebox()
jordansJukeBox.addSongs(song1)



// var myAudio = new Audio();
// myAudio.src = whatever url
// myAudio.play()





// Notes
// Buttons already on browser. Should the event listeners be within the Jukebox or outside of it?
// The button will activate the function within the class and play or pause audio.
