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

var wordflick = function () {
  setInterval(function () {
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

$(document).ready(function () {
  wordflick();
});

/* ************************************************ */

const form = document.getElementById('form');
const result = document.getElementById('result');

form.addEventListener('submit', function (e) {
  const formData = new FormData(form);
  e.preventDefault();
  var object = {};
  formData.forEach((value, key) => {
    object[key] = value
  });
  var json = JSON.stringify(object);
  result.innerHTML = "Please wait..."

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: json
  })
    .then(async (response) => {
      let json = await response.json();
      if (response.status == 200) {
        result.innerHTML = json.message;
        result.classList.remove('text-gray-500');
        result.classList.add('text-green-500');
      } else {
        console.log(response);
        result.innerHTML = json.message;
        result.classList.remove('text-gray-500');
        result.classList.add('text-red-500');
      }
    })
    .catch(error => {
      console.log(error);
      result.innerHTML = "Something went wrong!";
    })
    .then(function () {
      form.reset();
      setTimeout(() => {
        result.style.display = "none";
      }, 5000);
    });
})