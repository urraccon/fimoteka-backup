function e(e){const t=e.map((({id:e,poster_path:t,title:n,genres:o,release_year:r,vote_average:c})=>`<div>\n    <img id="${e}" src="${t}" alt="movie poster" loading="lazy" />\n            <p class="movie-title">   ${n} </p>\n            <p class="movie-short-descr"> ${o} | ${r} | <span>${c}</span></p>\n        </div>`)).join("");document.querySelector(".movies-div").innerHTML=t}let t="";function n(e,n){t="",n.map((e=>{t+=JSON.stringify(e)+"*"})),t=t.slice(0,t.length-1),localStorage.setItem(e,t)}function o(e){var n=[];try{t=localStorage.getItem(e)}catch(e){console.error(e)}return t?t.split("*").forEach((e=>{n.push(JSON.parse(e))})):t="",n}var r,c=[],i=[],d=[],u=!0;function l(){u?(console.log("clear watched list"),n("filmoteka-watched",c=[])):(console.log("clear queue list"),n("filmoteka-queue",i=[]));document.querySelector(".movies-div").innerHTML=""}function s(e){e.classList.add("active")}function a(e){e.classList.remove("active")}document.addEventListener("DOMContentLoaded",(function(){c=o("filmoteka-watched"),i=o("filmoteka-queue"),s(m);const t=document.querySelector(".clear-btn");if(t.innerText="CLEAR WATCHED LIST",c.length>0)e(c);else{document.querySelector(".error-message").innerText='Oops! Your "watched" library is empty!'}t.addEventListener("click",l)}));const m=document.querySelector(".watched-btn"),y=document.querySelector(".queue-btn");m.addEventListener("click",(function(){s(m),a(y),u=!0,document.querySelector(".clear-btn").innerText="CLEAR WATCHED LIST";const t=document.querySelector(".error-message");if(0!==c.length)t.innerText="",e(c);else{t.innerText='Oops! Your "watched" library is empty!';document.querySelector(".movies-div").innerHTML=""}})),y.addEventListener("click",(function(){s(y),a(m),u=!1,document.querySelector(".clear-btn").innerText="CLEAR QUEUE LIST";const t=document.querySelector(".error-message");if(0!==i.length)t.innerText="",e(i);else{t.innerText='Oops! Your "queue" library is empty!';document.querySelector(".movies-div").innerHTML=""}}));const v=document.getElementById("closeModalBtn2"),q=document.querySelector(".bckdrp");v.addEventListener("click",(function(){q.style.display="none"})),document.addEventListener("keydown",(function(e){"Escape"===e.key&&(q.style.display="none")})),q.addEventListener("click",(function(e){e.target===q&&(q.style.display="none")}));const p=document.querySelector(".wbtn2"),L=document.querySelector(".qbtn2");p.addEventListener("click",(function(){if(r.watched){r.watched=!1,p.innerHTML="Add to watched";let e=c.findIndex((e=>e.id===r.id));c.splice(e,1)}else p.innerHTML="Remove from watched",r.watched=!0,c.push(r);n("filmoteka-watched",c),e(u?c:i)})),L.addEventListener("click",(function(){if(r.queued){r.queued=!1,L.innerHTML="Add to queue";let e=i.findIndex((e=>e.id===r.id));i.splice(e,1)}else L.innerHTML="Remove from queue",r.queued=!0,i.push(r);n("filmoteka-queue",i),e(u?c:i)}));document.querySelector(".movdiv2").addEventListener("click",(function(e){if("IMG"!==e.target.nodeName)return;d=u?c:i;const t=e.target.attributes[0].value;var n=d.findIndex((e=>t-e.id==0));const o=document.querySelector(".title-film"),l=document.querySelector(".movie-poster"),s=document.querySelector(".vote"),a=document.querySelector(".votes"),m=document.querySelector(".popularity"),y=document.querySelector(".title"),v=document.querySelector(".genres"),f=document.querySelector(".description-text");r=d[n],o.innerHTML=r.title,l.src=r.poster_path,s.innerHTML=r.vote_average,a.innerHTML=" / "+r.vote_count,m.innerHTML=r.popularity,y.innerHTML=r.original_title,v.innerHTML=r.genres,f.innerHTML=r.overview,r.watched?p.innerHTML="Remove from watched":p.innerHTML="Add to watched";r.queued?L.innerHTML="Remove from queue":L.innerHTML="Add to queue";q.style.display="block"}));
//# sourceMappingURL=my_library.3210e702.js.map
