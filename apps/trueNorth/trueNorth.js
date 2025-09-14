// North Buzz App – vibrates when crossing magnetic north

const THRESHOLD = 5; // degrees either side of 0
let crossedNorth = false;
let iv;

// tidy up when app exits
Bangle.on('kill', () => {
  if (iv) clearInterval(iv);
  Bangle.setCompassPower(false);
  g.clear();
});

// draw a simple screen
function drawScreen() {
  g.clear();
  g.setFont("6x8",2);
  g.drawString("trueNorth", 10, 30);
  g.setFont("6x8",1);
  g.drawString("Buzzes when heading\ncrosses magnetic north", 10, 60);
  g.flip();
}

// start monitoring
function start() {
  Bangle.setCompassPower(true);
  iv = setInterval(() => {
    let heading = Bangle.getCompass();
    if (heading <= THRESHOLD || heading >= 360 - THRESHOLD) {
      if (!crossedNorth) {
        Bangle.buzz(200);
        crossedNorth = true;
      }
    } else crossedNorth = false;
  }, 500);
}

drawScreen();
start();
