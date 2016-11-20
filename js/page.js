var times = document.getElementsByTagName('time');

for(var i = 0; i < times.length; i++) {
  var time = times[i];
  var date = time.getAttribute('datetime');
  var m = moment(date, "YYYY-MM-DD HH:mm:ss Z");
  var fromNow = m.fromNow();

  time.innerHTML = fromNow;
}
