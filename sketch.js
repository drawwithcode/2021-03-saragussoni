//lockscreen with short playlist: the number of raindrops for each song are a visualization of the listeners on spotify

//rain
let drop = [];
//rain

//navigation
let buttonPlay;
let buttonForward;

let myImage;
let heart;
//data json
let song = {
  title: "-",
  by: "-",
  time: "0:00",
  filemusic: "-",
};

let jsonData;

let trackIndex = 0; // navigation index

let playingNow;
let isPlaying = false;

function preload() {
  myImage = loadImage("./assets/japanstreet.png");
  jsonData = loadJSON("playlist.json");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background(255, 204, 204);
  imageMode(CENTER);

  //loading music

  loadingSong(jsonData.playlist[trackIndex]);

  //amount of raindrops changing from song to song based on spotify listeners
  for (let i = 0; i < jsonData.playlist[trackIndex].listeners * 0.00001; i++) {
    drop[i] = new Drop();
  }

  //button play/stop
  buttonPlay = createImg("./assets/play.png");
  buttonPlay.style("width", "60px");
  buttonPlay.position(windowWidth / 2 - 25, windowHeight - 125);
  buttonPlay.mousePressed(playStop);

  //button forward
  buttonForward = createImg("./assets/forward.png");
  buttonForward.position(windowWidth / 2 + 125, windowHeight - 125);
  buttonForward.style("width", "60px");
  buttonForward.mousePressed(forward);

  heart = createImg("./assets/like.png");
  heart.position(windowWidth / 2 - 185, windowHeight - 125);
  heart.style("width", "60px");
}

function draw() {
  translate(width / 2, height / 2);
  image(myImage, 0, 0, 405, 720);

  //rain
  for (let i = 0; i < jsonData.playlist[trackIndex].listeners * 0.00001; i++) {
    drop[i].show();
    drop[i].update();
  }
  textFont("Roboto");
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(40);
  text(song.title, 0, windowHeight - 650);
  textSize(20);
  text(song.by, 0, windowHeight - 580);
  textSize(15);
  text(song.time, 0, windowHeight - 550);
}

//rain
function Drop() {
  this.x = random(-201, 201);
  this.y = random(-352, 352);

  this.show = function () {
    noStroke();
    fill(255);
    ellipse(this.x, this.y, 1, 8);
  };

  this.update = function () {
    // this.speed = random(5, 100);
    this.y = this.y + 8;

    if (this.y > 352) {
      this.y = random(-352, 352);
    }
  };
}

//play/stop
function playStop() {
  // console.log(isPlaying);

  if (isPlaying) {
    playingNow.pause();
  } else {
    playingNow.play();
  }
  isPlaying = !isPlaying;
}

//going forward
function forward() {
  trackIndex = trackIndex + 1;
  if (trackIndex == jsonData.playlist.length) {
    trackIndex = 0;
  }
  background(255, 204, 204);
  image(myImage, 0, 0, 405, 720);

  loadingSong(jsonData.playlist[trackIndex]);
}

function loadingSong(songNow) {
  if (playingNow !== undefined && playingNow.isPlaying) {
    isPlaying = false;
    playingNow.stop();
  }

  //while waiting for the song to load, display a loading message
  song.title = "loading";
  song.by = "";
  song.time = "";

  //i need a callback to fully load the music file
  playingNow = loadSound(songNow.filemusic, function () {
    song.title = songNow.title;
    song.by = songNow.by;
    song.time = songNow.time;
    playingNow.play();
    isPlaying = true;
  });
}
