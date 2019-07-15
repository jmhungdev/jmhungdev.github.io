let batteryLevel;
let batteryElement = document.querySelector('#level');
window.navigator.getBattery().then(data=> {console.log(data.level);
  batteryLevel = data.level;
  batteryElement.textContent=`this is battery level: ${batteryLevel}`;});


