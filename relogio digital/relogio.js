function noturno(horas) {
  if (horas >= 18 || horas < 6) {
    document.body.style.backgroundColor = "black";
    document.body.style.color = "white";
  } else {
    document.body.style.backgroundColor = "white";
    document.body.style.color = "black";
  }
}

function UpdateClock() {
  const agora = new Date();
  const horas = agora.getHours();
  document.getElementById("clock").innerText = agora.toLocaleTimeString();
  noturno(horas);
}
setInterval(UpdateClock, 1000);
UpdateClock(); 
