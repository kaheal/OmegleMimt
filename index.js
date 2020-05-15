let Omegle = require('omegle-node');
const express = require('express');
const app = express();

app.use(express.json());

var om1 = new Omegle(),
  om2 = new Omegle();

//-----------------------Stranger-1--------------------------//

om1.on('recaptchaRequired', () => {
  console.log('OOOOOPS');
});

om1.on('omerror', function (err) {
  console.log('Stranger-1 error: ' + err);
});

om1.on('connected', function () {
  console.log('Stranger-1 connected');
});

om1.on('gotMessage', function (msg) {
  const lgMsg = msg;
  console.log('Stranger-1: ' + lgMsg);
  om2.send(lgMsg);
});

om1.on('typing', function () {
  om2.startTyping();
  // om3.startTyping();
});

om1.on('stoppedTyping', function () {
  om2.stopTyping();
  // om3.stopTyping();
});

om1.on('strangerDisconnected', function () {
  console.log('Stranger-1 disconnected.');
  om2.disconnect();
  // om3.disconnect();
});

//-----------------------Stranger-2--------------------------//

om2.on('omerror', function (err) {
  console.log('Stranger-2 error: ' + err);
});

om2.on('connected', function () {
  console.log('Stranger-2 connected');
});

om2.on('gotMessage', function (msg) {
  const lgMsg = msg;
  console.log('Stranger-2: ' + lgMsg);
  om1.send(lgMsg);
  // om3.send(msg);
});

om2.on('typing', function () {
  om1.startTyping();
  // om3.startTyping();
});

om2.on('stoppedTyping', function () {
  om1.stopTyping();
  // om3.stopTyping();
});

om2.on('strangerDisconnected', function () {
  console.log('Stranger-2 disconnected.');
  om1.disconnect();
  // om3.disconnect();
});

let topics = ['memes'];
om1.connect(topics);
om2.connect(topics);
