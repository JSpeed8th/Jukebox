var playButton = document.getElementsByTagName('button')[0];
var pauseButton = document.getElementsByTagName('button')[1];
var nextButton = document.getElementsByTagName('button')[2];

// var jukebox = new Audio('music/unity.mp3')

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

// Creating Instances of Song Constructor

var song1 = new Song('One More Time', 'Daft Punk', 'Discovery', 'Electronic', 'music/Daft_Punk/Discovery/01_One_More_Time.mp3');

var song2 = new Song('One More Time', 'Daft Punk', 'Discovery', 'Electronic', 'music/Daft_Punk/Discovery/02_Aerodynamic.mp3')

var song3 = new Song('One More Time', 'Daft Punk', 'Discovery', 'Electronic', 'music/Daft_Punk/Discovery/04_Harder,_Better,_Faster,_Stronger.mp3')

// -----------------------------------------------------------------------------

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
  playbackAudio() {
    if (this.songNum > 0) {
      this.pauseAudio()
      this.songNum -= 1;
      this.songs[this.songNum].myAudio.currentTime = 0;
      this.playAudio()
    } else if (this.songNum == 0) {
      console.log('End of library')
      this.pauseAudio()
      this.songNum = 0;
      this.songs[this.songNum].myAudio.currentTime = 0;
      this.playAudio()

    }
  }
  nextAudio() {
    if ((this.songs.length - 1) > this.songNum) {
      console.log('Playing Next Song')
      this.pauseAudio()
      this.songNum += 1;
      this.songs[this.songNum].myAudio.currentTime = 0;
      this.playAudio()
    } else if ((this.songs.length - 1) == this.songNum) {
      console.log('End of library')
      this.pauseAudio()
      this.songNum = 0;
      this.songs[this.songNum].myAudio.currentTime = 0;
      this.playAudio()
    }
  }

};

// Creating an Intance of Jukebox Constructor and pushing songs to it's array.

var jordansJukeBox = new Jukebox()
jordansJukeBox.addSongs(song1)
jordansJukeBox.addSongs(song2)
jordansJukeBox.addSongs(song3)

// -----------------------------------------------------------------------------





// var myAudio = new Audio();
// myAudio.src = whatever url
// myAudio.play()





// Notes
// Buttons already on browser. Should the event listeners be within the Jukebox or outside of it?
// The button will activate the function within the class and play or pause audio.
