!function(e){var t={};function n(i){if(t[i])return t[i].exports;var a=t[i]={i:i,l:!1,exports:{}};return e[i].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,i){n.o(e,t)||Object.defineProperty(e,t,{configurable:!1,enumerable:!0,get:i})},n.r=function(e){Object.defineProperty(e,"__esModule",{value:!0})},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=1)}([function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=function(){function e(e,t){for(var n=0;n<t.length;n++){var i=t[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(e,i.key,i)}}return function(t,n,i){return n&&e(t.prototype,n),i&&e(t,i),t}}();t.Siren=function(){function e(){!function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,e),this.canvas=this.initCanvas(),this.ctx=this.canvas.getContext("2d"),this.playPauseBtn=this.initPlayPauseBtn(),this.rightPanel=this.initRightPanel(),this.playlist=this.initPlaylist(this.rightPanel),this.bottomPanel=this.initBottomPanel(),this.audio=this.initAudio(),this.sourceElements=[],this.analyser=this.initAnalyser(),this.requestID=null,this.updateLocalPlaylist()}return i(e,[{key:"initPlayPauseBtn",value:function(){var e=this,t=document.createElement("div");document.body.appendChild(t),t.classList.add("playPauseBtn");var n=document.createElement("span");return t.appendChild(n),n.innerHTML="▶️",n.addEventListener("click",function(){0===e.audio.childElementCount?e.playFirstTrack():e.audio.paused?e.audio.play():e.audio.pause()}),n}},{key:"togglePlayPauseBtn",value:function(){this.audio.paused?this.playPauseBtn.innerHTML="▶️":this.playPauseBtn.innerHTML="⏸"}},{key:"initBottomPanel",value:function(){var e=this,t=document.createElement("div");document.body.appendChild(t),t.classList.add("bottomPanel");var n=document.createElement("div");t.appendChild(n),n.classList.add("controls");var i=document.createElement("span");n.appendChild(i),i.classList.add("playNextTrackBtn"),i.innerHTML="⏮",i.addEventListener("click",function(){e.playPreviousTrack()});var a=document.createElement("span");return n.appendChild(a),a.classList.add("playPreviousTrackBtn"),a.innerHTML="⏭",a.addEventListener("click",function(){e.playNextTrack()}),t}},{key:"initRightPanel",value:function(){var e=this,t=document.createElement("div");document.body.appendChild(t),t.classList.add("rightPanel");var n=document.createElement("input");t.appendChild(n),n.type="file",n.id="file",n.accept=".mp3",n.multiple=!0;var i=document.createElement("label");return t.appendChild(i),i.classList.add("label"),i.htmlFor="file",i.innerHTML="+",n.addEventListener("change",function(t){[].concat(function(e){if(Array.isArray(e)){for(var t=0,n=Array(e.length);t<e.length;t++)n[t]=e[t];return n}return Array.from(e)}(n.files)).map(function(e){return e.name.slice(0,-4)}).forEach(function(t){e.addToRemotePlaylist(t)}),setTimeout(function(t){e.updateLocalPlaylist()},500)}),t}},{key:"initPlaylist",value:function(e){var t=document.createElement("div");return e.appendChild(t),t.classList.add("playlist"),t}},{key:"initCanvas",value:function(){var e=document.createElement("canvas");return document.body.appendChild(e),e.classList.add("canvas"),e.width=window.innerWidth,e.height=window.innerHeight,window.addEventListener("resize",function(){e.width=window.innerWidth,e.height=window.innerHeight}),e}},{key:"initAudio",value:function(){var e=this,t=document.createElement("audio");return this.bottomPanel.appendChild(t),t.classList.add("audio"),t.controls="contols",t.preload="auto",t.addEventListener("play",function(t){e.runVisualizer(),e.togglePlayPauseBtn()}),t.addEventListener("pause",function(t){e.stopVisualizer(),e.togglePlayPauseBtn()}),t.addEventListener("ended",function(t){e.playNextTrack()}),t}},{key:"addSourceToQueue",value:function(e,t){var n=document.createElement("source");n.type="audio/mpeg",n.src=e,this.sourceElements[t]=n}},{key:"playTrackAtIndex",value:function(e){console.log(this.sourceElements,e),this.audio.pause(),this.audio.innerHTML="",this.audio.appendChild(this.sourceElements[e]),this.audio.load(),this.audio.play()}},{key:"playFirstTrack",value:function(){0!==this.sourceElements.length&&this.playTrackAtIndex(0)}},{key:"playNextTrack",value:function(){0!==this.sourceElements.length&&this.playTrackAtIndex((this.sourceElements.indexOf(this.audio.firstChild)+1)%this.sourceElements.length)}},{key:"playPreviousTrack",value:function(){0!==this.sourceElements.length&&0!==this.sourceElements.length&&this.playTrackAtIndex((this.sourceElements.indexOf(this.audio.firstChild)+this.sourceElements.length-1)%this.sourceElements.length)}},{key:"initAnalyser",value:function(){var e=new AudioContext,t=e.createAnalyser();return e.createMediaElementSource(this.audio).connect(t),t.connect(e.destination),t}},{key:"updateVisualizer",value:function(){var e=this;this.requestID=requestAnimationFrame(function(t){return e.updateVisualizer()});var t=new Uint8Array(this.analyser.frequencyBinCount);this.analyser.getByteFrequencyData(t),this.ctx.clearRect(0,0,this.canvas.width,this.canvas.height),this.ctx.fillStyle="#0DDEFF";for(var n=this.canvas.width/3>=1024?this.canvas.width/3:1023,i=0;i<n;i++){var a=3*i,s=.004*-t[i]*window.innerHeight*.8;this.ctx.fillRect(a,this.canvas.height,2,s)}}},{key:"runVisualizer",value:function(){var e=this;this.requestID=requestAnimationFrame(function(t){return e.updateVisualizer()})}},{key:"stopVisualizer",value:function(){var e=this;setTimeout(function(t){cancelAnimationFrame(e.requestID)},2e3)}},{key:"addToRemotePlaylist",value:function(e){fetch("http://localhost:3000/playlist",{headers:{Accept:"application/json","Content-Type":"application/json"},method:"POST",body:JSON.stringify({id:""+e})}).then(function(t){console.log("Saved: "+e)}).catch(function(t){console.log("Duplikat: "+e)})}},{key:"updateLocalPlaylist",value:function(){var e=this;this.sourceElements=[],this.playlist.innerHTML="",fetch("http://localhost:3000/playlist").then(function(t){return t.json().then(function(t){return t.reverse().forEach(function(t,n){var i=document.createElement("div");e.playlist.appendChild(i),i.classList.add("track");var a=document.createElement("div");i.appendChild(a),a.classList.add("deleteBtn"),a.innerHTML="X",a.addEventListener("click",function(i){fetch("http://localhost:3000/playlist/"+t.id,{headers:{Accept:"application/json","Content-Type":"application/json"},method:"DELETE"}).catch(function(e){console.log(e)}),i.stopPropagation(),a.parentNode.parentNode.removeChild(a.parentNode),e.sourceElements.splice(n,1)});var s=document.createElement("div");i.appendChild(s),s.innerHTML="Name: "+t.id,i.addEventListener("click",function(t){e.playTrackAtIndex(n)}),e.addSourceToQueue("../data/music/"+t.id+".mp3",n)})})}),console.log("Tracks in the playlist:",this.sourceElements)}},{key:"log",value:function(){console.log(this.playPauseBtn,this.rightPanel,this.bottomPanel,this.playPauseBtn,this.canvas,this.ctx,this.audio,this.sourceElements)}}]),e}()},function(e,t,n){"use strict";new(n(0).Siren)}]);
//# sourceMappingURL=siren.bundle.js.map