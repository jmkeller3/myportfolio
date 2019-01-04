$.fn.extend({
  animateCss: function(animationName, callback) {
    var animationEnd = (function(el) {
      var animations = {
        animation: "animationend",
        OAnimation: "oAnimationEnd",
        MozAnimation: "mozAnimationEnd",
        WebkitAnimation: "webkitAnimationEnd"
      };

      for (var t in animations) {
        if (el.style[t] !== undefined) {
          return animations[t];
        }
      }
    })(document.createElement("div"));

    this.addClass("animated " + animationName);
    // .one(animationEnd, function() {
    //   $(this).removeClass("animated " + animationName);

    //   if (typeof callback === "function") callback();
    // });

    return this;
  }
});

$(window).scroll(function() {
  let bghT = $("#boardgamenight").offset().top,
    bghH = $("#boardgamenight").outerHeight(),
    bgwH = $(window).height(),
    bgwS = $(this).scrollTop();

  let dkhT = $("#dominion").offset().top,
    dkhH = $("#dominion").outerHeight(),
    dkwH = $(window).height(),
    dkwS = $(this).scrollTop();

  let wphT = $("#wait2plate").offset().top,
    wphH = $("#wait2plate").outerHeight(),
    wpwH = $(window).height(),
    wpwS = $(this).scrollTop();

  if (bgwS > bghT + bghH - bgwH) {
    console.log(`test 1`);

    // $("#boardgamenight").fadeIn(2500);
    $("#boardgamenight")
      .show()
      .animateCss("fadeInLeft");
  }

  if (dkwS > dkhT + dkhH + 130) {
    console.log(`test 2`);
    // $("#dominion").fadeIn(2000);
    $("#dominion")
      .show()
      .animateCss("fadeInLeft");
  }

  if (wpwS > wphT + wphH + 150) {
    console.log(`test 3`);
    // $("#wait2plate").fadeIn(1000);
    $("#wait2plate")
      .show()
      .animateCss("fadeIn");
  }
});

// See Andy Patrick at http://www.andypatrickdesign.com for inspiration and other great designs

let wordInterval;
let currentWord = 0;
let words = [];
let wordArray = [];

startWords();

function startWords() {
  try {
    words = document.getElementsByClassName("word");

    currentWord = 0;
    wordArray = [];

    words[currentWord].style.opacity = 1;
    for (let i = 0; i < words.length; i++) {
      splitLetters(words[i]);
    }

    changeWord();
    clearInterval(wordInterval);
    wordInterval = setInterval(changeWord, 4800);
  } catch (err) {
    console.log(err);
  }
}

function changeWord() {
  let cw = wordArray[currentWord];
  let nw =
    currentWord == words.length - 1 ? wordArray[0] : wordArray[currentWord + 1];
  for (let i = 0; i < cw.length; i++) {
    animateLetterOut(cw, i);
  }

  for (let i = 0; i < nw.length; i++) {
    nw[i].className = "letter behind";
    nw[0].parentElement.style.opacity = 1;
    animateLetterIn(nw, i);
  }

  currentWord = currentWord == wordArray.length - 1 ? 0 : currentWord + 1;
}

function animateLetterOut(cw, i) {
  setTimeout(function() {
    cw[i].className = "letter out";
  }, i * 100);
}

function animateLetterIn(nw, i) {
  setTimeout(function() {
    nw[i].className = "letter in";
  }, 1200 + i * 100);
}

function splitLetters(word) {
  let content = word.innerText;
  word.innerText = "";
  let letters = [];
  for (let i = 0; i < content.length; i++) {
    let letter = document.createElement("span");
    letter.className = "letter";
    letter.innerText = content.charAt(i);
    word.appendChild(letter);
    letters.push(letter);
  }

  wordArray.push(letters);
}
