const game = document.getElementById('game');
const block = document.getElementsByClassName('block');
const batman = document.getElementById('batman');
const groot = document.getElementById('groot');
const buttonRestart = document.getElementById('button-rest');
const buttonDraw = document.getElementById('button-draw');

let hod = 0;

const fn = (event) => {
  const batAudio = new Audio('audio/batman.mp3');
  const groAudio = new Audio('audio/groot.mp3');
  const blockItem = event.target;

  if (event.target.id !== 'game') {
    hod++;
    hod % 2 == 0
      ? ((blockItem.className = 'batman block'), batAudio.play())
      : ((blockItem.className = 'groot block'), groAudio.play());
    checkWinner();
  }
};

function checkWinner() {
  let combArr = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  for (let i = 0; i < combArr.length; i++) {
    if (
      block[combArr[i][0]].className == 'batman block' &&
      block[combArr[i][1]].className == 'batman block' &&
      block[combArr[i][2]].className == 'batman block'
    ) {
      batman.innerText++;
      setTimeout(() => {
        block[combArr[i][0]].classList.add('winnerComb', 'batman-bg');
        block[combArr[i][1]].classList.add('winnerComb', 'batman-bg');
        block[combArr[i][2]].classList.add('winnerComb', 'batman-bg');
      }, 100);
      for (const item of block) {
        item.removeEventListener('click', fn, {
          once: true,
        });
      }
    } else if (
      block[combArr[i][0]].className == 'groot block' &&
      block[combArr[i][1]].className == 'groot block' &&
      block[combArr[i][2]].className == 'groot block'
    ) {
      groot.innerText++;
      setTimeout(() => {
        block[combArr[i][0]].classList.add('winnerComb', 'groot-bg');
        block[combArr[i][1]].classList.add('winnerComb', 'groot-bg');
        block[combArr[i][2]].classList.add('winnerComb', 'groot-bg');
      }, 100);
      for (const item of block) {
        item.removeEventListener('click', fn, {
          once: true,
        });
      }
    } else if (hod == 9) {
      setTimeout(() => {
        buttonDraw.className = 'draw button-class';
        buttonDraw.addEventListener('click', funcDraw);
      }, 1000);
      function funcDraw() {
        setTimeout(() => restarFunc(), 2000);

        block[combArr[i][0]].classList.add('winnerComb', 'draw-bg');
        block[combArr[i][1]].classList.add('winnerComb', 'draw-bg');
        block[combArr[i][2]].classList.add('winnerComb', 'draw-bg');
        for (const item of block) {
          item.removeEventListener('click', fn, {
            once: true,
          });
        }
      }
    }
  }
}

function restarFunc() {
  buttonDraw.className = 'div-none';
  hod = 0;
  for (const item of block) {
    item.className = 'block';
    item.addEventListener('click', fn, {
      once: true,
    });
  }
}

for (const item of block) {
  item.addEventListener('click', fn, {
    once: true,
  });
}

buttonRestart.addEventListener('click', restarFunc);
