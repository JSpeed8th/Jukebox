// Linking button elements to javascript variables

var playbackButton = document.getElementsByTagName('button')[0];
var playButton = document.getElementsByTagName('button')[1];
var nextButton = document.getElementsByTagName('button')[2];

var albumArt = document.querySelector('#albumArt');


// ------------------------------------END--------------------------------------

// EVENT LISTENERS

var numOfClicks = 0
playButton.addEventListener('click', function() {
  // Add One everytime play is pressed
  numOfClicks++
  // If clicks are odd, call jukebox's play function and also expands album art.
  if (numOfClicks % 2 !=0) {
    jordansJukeBox.playAudio()
    // Increases Album Art When Play is Pressed
    albumArt.style.transition = '.1s';
    albumArt.style.width = '14em';
    albumArt.style.height = '14em';
  } else {
    // If clicks are even, call jukebox's pause function and also shrinks album art.
    jordansJukeBox.pauseAudio()
    // Shrinks Album Art When Pause is Pressed
    albumArt.style.transition = '.1s';
    albumArt.style.width = '13.4em';
    albumArt.style.height = '13.4em';
  }
});

// Hovering over play image shrinks the play image and changes the background color to a light gray.
playButton.addEventListener('mouseover', function() {
  playButton.style.fontSize = '38px';
  playButton.style.transition = '.2s';
  playButton.style.backgroundColor = '#E5E5E5';

})

// Hovering off play image expands and changes background color to white.
playButton.addEventListener('mouseout', function() {
  playButton.style.fontSize = '40px';
  playButton.style.transition = '.2s';
  playButton.style.backgroundColor = 'white';
})

// When forward button is pressed, call jukebox's next function. If number of clicks is equal to zero, add one to the variable. This is for when the user decides to click the next button upon loading the program instead of clicking the play button, the user wont have to click the play pause button twice to actually pause the song.
nextButton.addEventListener('click', function() {
  jordansJukeBox.nextAudio()
  if (numOfClicks == 0) {
    numOfClicks++
  }
});

// Same as nextButton functionality
playbackButton.addEventListener('click', function() {
  jordansJukeBox.playbackAudio()
  if (numOfClicks == 0) {
    numOfClicks++
  }
});


// ------------------------------------END--------------------------------------

// SONG CONSTRUCTOR

class Song {
  constructor(songName, artist, album, genre, src, imageSrc) {
    this.songName = songName;
    this.artist = artist;
    this.album = album;
    this.genre = genre
    this.src = src;
    this.myAudio = new Audio(this.src);
    this.imageSrc = imageSrc;
  }
};

// ------------------------------------END--------------------------------------

// CREATING INSTANCES OF SONG OBJECT

var song1 = new Song('II. Shadows', 'Childish Gambino', 'Because The Internet', 'Hip Hop/Rap', 'music/Childish_Gambino/Because_The_Internet/06 II. Shadows.mp3', 'img/album_art/Because-The-Internet.jpg')

var song2 = new Song('V. 3005', 'Childish Gambino', 'Because The Internet', 'Hip Hop/Rap', 'music/Childish_Gambino/Because_The_Internet/09 V. 3005.mp3', 'img/album_art/Because-The-Internet.jpg')

var song3 = new Song('II. Worldstar', 'Childish Gambino', 'Because The Internet', 'Hip Hop/Rap', 'music/Childish_Gambino/Because_The_Internet/03 II. Worldstar.mp3', 'img/album_art/Because-The-Internet.jpg')

var song4 = new Song('Venus As A Boy', 'Björk', 'Debut', 'Pop', 'music/Björk/Debut/03 Venus As a Boy.mp3', 'img/album_art/Björk-Debut-1993.jpg')

var song5 = new Song('Big Time Sensuality', 'Björk', 'Debut', 'Pop', 'music/Björk/Debut/06 Big Time Sensuality.mp3', 'img/album_art/Björk-Debut-1993.jpg')

var song6 = new Song('One More Time', 'Daft Punk', 'Discovery', 'Electronic', 'music/Daft_Punk/Discovery/01_One_More_Time.mp3', 'img/album_art/Discovery.jpg');

var song7 = new Song('Harder, Better, Faster, Stronger', 'Daft Punk', 'Discovery', 'Electronic', 'music/Daft_Punk/Discovery/04_Harder,_Better,_Faster,_Stronger.mp3', 'img/album_art/Discovery.jpg')

// ------------------------------------END--------------------------------------

// JUKEBOX CLASS

class Jukebox {
  constructor() {
    this.songs = [];
    this.songNum = 0;
    this.title = document.querySelector('#currentSong');
    this.titleTwo = document.querySelector('#artistAndAlbum');
    this.playbackButton = document.getElementsByTagName('button')[0];
    this.playButton = document.getElementsByTagName('button')[1];
    this.nextButton = document.getElementsByTagName('button')[2];
    this.albumArt = document.querySelector('#albumArt');
  }
  addSongs(song) {
    // Pushes songs into an array and prints out what song was added.
    this.songs.push(song);
    console.log(song.songName + ' by ' + song.artist + ', added to library');
  }
  playAudio() {

    var songName = this.songs[this.songNum].songName;
    var artist = this.songs[this.songNum].artist;

    this.songs[this.songNum].myAudio.play();
    this.displayPauseBtn()
    this.displaySongInfo()
    this.displayAlbumArt()
    console.log('Now Playing...')
    console.log("'" + songName + "'" + ' by ' + artist)

    // WHEN SONG ENDS, DO THIS
    var placeholderJukebox = this
    this.songs[this.songNum].myAudio.onended = function() {
    placeholderJukebox.nextAudio()
    }
      }
  pauseAudio() {
    this.displayPlayBtn()
    this.songs[this.songNum].myAudio.pause()
  }
  playbackAudio() {
    if (this.songNum > 0) {
      this.displayPauseBtn()
      this.pauseAudio()
      this.songNum -= 1;
      this.durationToZero()
      this.playAudio()
    } else if (this.songNum == 0) {
      console.log('End of library')
      this.displayPauseBtn()
      this.pauseAudio()
      this.songNum = 0;
      this.durationToZero()
      this.playAudio()
    }
  }
  nextAudio() {
    // If next song within our library is less then the length of our entire library, pause the last song, go to next song, dial back the playtime to zero and play it.
    if ((this.songs.length - 1) > this.songNum) {
      console.log('Playing Next Song')
      this.displayPauseBtn()
      this.pauseAudio()
      this.songNum += 1;
      this.durationToZero()
      this.playAudio()
    } else if ((this.songs.length - 1) == this.songNum) {
      console.log('End of library')
      this.displayPlayBtn()
      this.pauseAudio()
      this.songNum = 0;
      this.durationToZero()
      // this.playAudio()
    }
  }
  displayAlbumArt() {
    this.albumArt.style.backgroundImage = "url(" + this.songs[this.songNum].imageSrc + ")";
  }
  displaySongInfo() {
    this.title.textContent = this.songs[this.songNum].songName;
    this.titleTwo.textContent = this.songs[this.songNum].artist + ' — ' + this.songs[this.songNum].album;
  }
  durationToZero() {
    this.songs[this.songNum].myAudio.currentTime = 0;
  }
  displayPauseBtn() {
    this.playButton.innerHTML = '<ion-icon name="ios-pause"></ion-icon>';
  }
  displayPlayBtn() {
    this.playButton.innerHTML = '<ion-icon name="ios-play"></ion-icon>';
  }
};

// ------------------------------------END--------------------------------------

// Creating an Instance of Jukebox Constructor and pushing songs to it's array.

var jordansJukeBox = new Jukebox()
jordansJukeBox.addSongs(song1)
jordansJukeBox.addSongs(song2)
jordansJukeBox.addSongs(song3)
jordansJukeBox.addSongs(song4)
jordansJukeBox.addSongs(song5)
jordansJukeBox.addSongs(song6)
jordansJukeBox.addSongs(song7)

// ------------------------------------END--------------------------------------
