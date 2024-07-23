function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

var words = ['Software Developer', 'ADEL Platform Owner', 'Computer Science Graduate', 'Full Stack Developer'],
    part,
    i = 0,
    offset = 0,
    len = words.length,
    forwards = true,
    skip_count = 0,
    skip_delay = 15,
    speed = 70;

var wordflick = function() {
  setInterval(function() {
    if (forwards) {
      if (offset >= words[i].length) {
        ++skip_count;
        if (skip_count == skip_delay) {
          forwards = false;
          skip_count = 0;
        }
      } else {
        offset++;
      }
    } else {
      if (offset == 0) {
        forwards = true;
        i++;
        if (i >= len) {
          i = 0;
        }
      } else {
        offset--;
      }
    }
    part = words[i].substr(0, offset);
    $('.word').text(part);
  }, speed);
};

$(document).ready(function() {
  wordflick();
});

