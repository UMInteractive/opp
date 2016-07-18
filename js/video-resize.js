var video = document.querySelector("iframe[src*=vimeo]");
var fluid = document.querySelector("#video article");

function resizeVideo() {
  var videoRatio = (video.height / video.width);
  var newWidth = fluid.clientWidth;
  video.setAttribute("width", newWidth);
  video.setAttribute("height", newWidth * videoRatio);
}

window.onload = resizeVideo;
window.onresize = resizeVideo;
