// Linking button elements to javascript variables

var playbackButton = document.getElementsByTagName('button')[0];
var playButton = document.getElementsByTagName('button')[1];
// var pauseButton = document.getElementsByTagName('button')[2];
var nextButton = document.getElementsByTagName('button')[2];

var title = document.querySelector('#currentSong');
var titleTwo = document.querySelector('#artistAndAlbum');

// -----------------------------------------------------------------------------

// Event Listeners

var numOfClicks = 0
playButton.addEventListener('click', function() {
  numOfClicks++
  if (numOfClicks % 2 !=0) {
    jordansJukeBox.playAudio()
    title.textContent = jordansJukeBox.songs[jordansJukeBox.songNum].songName;
    titleTwo.textContent = jordansJukeBox.songs[jordansJukeBox.songNum].artist + ' — ' + jordansJukeBox.songs[jordansJukeBox.songNum].album;
    playButton.innerHTML = '<ion-icon name="play"></ion-icon>';
  } else {
    jordansJukeBox.pauseAudio()
    playButton.innerHTML = '<ion-icon name="pause"></ion-icon>';
  }
});

// pauseButton.addEventListener('click', function() {
//   jordansJukeBox.pauseAudio()
// });

nextButton.addEventListener('click', function() {
  jordansJukeBox.nextAudio()
  title.textContent = jordansJukeBox.songs[jordansJukeBox.songNum].songName;
  titleTwo.textContent = jordansJukeBox.songs[jordansJukeBox.songNum].artist + ' — ' + jordansJukeBox.songs[jordansJukeBox.songNum].album;
});

playbackButton.addEventListener('click', function() {
  jordansJukeBox.playbackAudio()
  title.textContent = jordansJukeBox.songs[jordansJukeBox.songNum].songName;
  titleTwo.textContent = jordansJukeBox.songs[jordansJukeBox.songNum].artist + ' - ' + jordansJukeBox.songs[jordansJukeBox.songNum].album;
});

// -----------------------------------------------------------------------------

// Song Function

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

// -----------------------------------------------------------------------------

// Creating Instances of Song Constructor

var song1 = new Song('One More Time', 'Daft Punk', 'Discovery', 'Electronic', 'music/Daft_Punk/Discovery/01_One_More_Time.mp3');

var song2 = new Song('Aerodynamic', 'Daft Punk', 'Discovery', 'Electronic', 'music/Daft_Punk/Discovery/02_Aerodynamic.mp3')

var song3 = new Song('Harder, Better, Faster, Stronger', 'Daft Punk', 'Discovery', 'Electronic', 'music/Daft_Punk/Discovery/04_Harder,_Better,_Faster,_Stronger.mp3')

// -----------------------------------------------------------------------------

// Jukebox Class

class Jukebox {
  constructor() {
    this.songs = [];
    this.songNum = 0;
  }
  addSongs(song) {
    this.songs.push(song);
    console.log(song.songName + ' by ' + song.artist + ', added to library');
  }
  playAudio() {
    this.songs[this.songNum].myAudio.play()
    console.log('Now Playing...')
    console.log(this.songs[this.songNum].songName + ' by ' + this.songs[this.songNum].artist)
      }
  pauseAudio() {
    this.songs[this.songNum].myAudio.pause()
  }
  playbackAudio() {
    if (this.songNum > 0) {
      this.songs[this.songNum].myAudio.pause()
      this.songNum -= 1;
      this.songs[this.songNum].myAudio.currentTime = 0;
      this.playAudio()
    } else if (this.songNum == 0) {
      console.log('End of library')
      this.songs[this.songNum].myAudio.pause()
      this.songNum = 0;
      this.songs[this.songNum].myAudio.currentTime = 0;
      this.playAudio()

    }
  }
  nextAudio() {
    if ((this.songs.length - 1) > this.songNum) {
      console.log('Playing Next Song')
      this.songs[this.songNum].myAudio.pause()
      this.songNum += 1;
      this.songs[this.songNum].myAudio.currentTime = 0;
      this.playAudio()
    } else if ((this.songs.length - 1) == this.songNum) {
      console.log('End of library')
      this.songs[this.songNum].myAudio.pause()
      this.songNum = 0;
      this.songs[this.songNum].myAudio.currentTime = 0;
      this.playAudio()
    }
  }

};

// -----------------------------------------------------------------------------

// Creating an Intance of Jukebox Constructor and pushing songs to it's array.

var jordansJukeBox = new Jukebox()
jordansJukeBox.addSongs(song1)
jordansJukeBox.addSongs(song2)
jordansJukeBox.addSongs(song3)

// -----------------------------------------------------------------------------
