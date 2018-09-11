// Copyright 2018 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

'use strict';

let page = document.getElementById('buttonDiv');
const kButtonColors = ['#3aa757', '#e8453c', '#f9bb2d', '#4688f1', '#000'];
function constructOptions(kButtonColors) {
  for (let item of kButtonColors) {
    let button = document.createElement('button');
    button.style.backgroundColor = item;
    button.addEventListener('click', function() {
      chrome.storage.sync.set({clockColor: item}, function() {console.log(item);});
    });
    page.appendChild(button);
  }
}
constructOptions(kButtonColors);

let inputText = document.getElementById('colorCode');
let changeColor = document.getElementById('changeColor');

inputText.onkeyup = function() {
  changeColor.style.backgroundColor = inputText.value;
  changeColor.setAttribute('value', inputText.value);
};

changeColor.onclick = function(element) {
  let color = changeColor.value;
  chrome.storage.sync.set({clockColor: color}, function() {console.log(item);});
};
