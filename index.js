// Linking button elements to javascript variables

var playbackButton = document.getElementsByTagName('button')[0];
var playButton = document.getElementsByTagName('button')[1];
var nextButton = document.getElementsByTagName('button')[2];

var albumArt = document.querySelector('#albumArt');

var title = document.querySelector('#currentSong');
var titleTwo = document.querySelector('#artistAndAlbum');


// ------------------------------------END--------------------------------------

// EVENT LISTENERS

var numOfClicks = 0
playButton.addEventListener('click', function() {
  // Add One everytime play is pressed
  numOfClicks++
  // If clicks are odd, call jukebox's play function and change play image to pause image.
  // Also expands album art.
  if (numOfClicks % 2 !=0) {
    jordansJukeBox.playAudio()
    displaySongInfo()
    displayPauseBtn()
    // Increases Album Art When Play is Pressed
    albumArt.style.transition = '.2s';
    albumArt.style.width = '14em';
    albumArt.style.height = '14em';
  } else {
    // If clicks are even, call jukebox's pause function and change pause image to play image.
    // Also shrinks album art.
    jordansJukeBox.pauseAudio()
    displayPlayBtn()
    // Decreases Album Art When Pause is Pressed
    albumArt.style.transition = '.2s';
    albumArt.style.width = '13em';
    albumArt.style.height = '13em';
  }
});

// Hovering over play image shrinks the play image and changes the background color to a light gray.
playButton.addEventListener('mouseover', function() {
  playButton.style.fontSize = '35px';
  playButton.style.transition = '.2s';
  playButton.style.backgroundColor = '#E5E5E5';

})

// Hovering off play image expands and changes background color to white.
playButton.addEventListener('mouseout', function() {
  playButton.style.fontSize = '40px';
  playButton.style.transition = '.2s';
  playButton.style.backgroundColor = 'white';
})

// When forward button is pressed, change play image to pause image and call jukebox's next function. Also, the song info function is called. If number of clicks is equal to zero, add one to the variable. This is for when the user decides to click the next image upon loading the program instead of clicking the play image. If I don't have this, the user will have to click the play pause image twice to actually pause the song.
nextButton.addEventListener('click', function() {
  displayPauseBtn()
  jordansJukeBox.nextAudio()
  displaySongInfo()
  if (numOfClicks == 0) {
    numOfClicks++
  }
});

// Same as nextButton functionality
playbackButton.addEventListener('click', function() {
  displayPauseBtn()
  jordansJukeBox.playbackAudio()
  displaySongInfo()
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
    this.currentSong;
    this.songName;
    this.album;
    this.artist;
  }
  addSongs(song) {
    // Pushes songs into an array and prints out what song was added.
    this.songs.push(song);
    console.log(song.songName + ' by ' + song.artist + ', added to library');
  }
  playAudio() {
    // Assigning the variables within constructor with updated music info
    this.songName = this.songs[this.songNum].songName;
    this.artist = this.songs[this.songNum].artist;
    this.album = this.songs[this.songNum].album;
    this.currentSong = this.songs[this.songNum];
    this.songs[this.songNum].myAudio.play();


    this.displaySong()
    console.log('Now Playing...')
    console.log("'" + this.songName + "'" + ' by ' + this.artist)

    // WHEN SONG ENDS, DO THIS
    // Problem: Doesn't display the new song's name and album
    var placeholderJukebox = this
    this.songs[this.songNum].myAudio.onended = function() {

    placeholderJukebox.nextAudio()
    }
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
      this.songs[this.songNum].myAudio.currentTime = 0;
      this.songNum = 0;
      this.playAudio()
    }
  }
  nextAudio() {
    this.displaySong()
    // If next song within our library is less then the length of our entire library, pause the last song, go to next song, dial back the playtime to zero and play it.
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
  displaySong() {
    albumArt.style.backgroundImage = "url(" + this.songs[this.songNum].imageSrc + ")";
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

// FUNCTIONS TO BE CALLED BY EVENT LISTENERS

// When called this function displays our current songs info
function displaySongInfo() {
  title.textContent = jordansJukeBox.songs[jordansJukeBox.songNum].songName;
  titleTwo.textContent = jordansJukeBox.songs[jordansJukeBox.songNum].artist + ' — ' + jordansJukeBox.songs[jordansJukeBox.songNum].album;
}

// When called, this function displays the pause button
function displayPauseBtn() {
  playButton.innerHTML = '<ion-icon name="ios-pause"></ion-icon>';
}

// When called, this function displays the play button
function displayPlayBtn() {
  playButton.innerHTML = '<ion-icon name="ios-play"></ion-icon>';
}

// function displayAlbumArt() {
//   // An Array which contains objects of album names as keys and their url as values
//   var albumTitles = [{'Because The Internet' : "url('img/album_art/Because-The-Internet.jpg')"}, {'Debut' : "url('img/album_art/Björk-Debut-1993.jpg')"}, {'Discovery' : "url('img/album_art/Discovery.jpg')"}]
//   for (var i = 0; i < albumTitles.length; i++)
//     // keys(albumTitles[i])
//     if (jordansJukeBox.album == keys(albumTitles[i])) {
//       let albumName = keys(albumTitles[i])
//       let url = albumTitles[i][albumName]
//       console.log(albumName)
//       console.log(url)
//       albumArt.style.backgroundImage = url
//     }
//   }
