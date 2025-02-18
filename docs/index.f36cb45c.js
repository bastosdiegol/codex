var e=globalThis,t={},o={},r=e.parcelRequire94c2;null==r&&((r=function(e){if(e in t)return t[e].exports;if(e in o){var r=o[e];delete o[e];var n={id:e,exports:{}};return t[e]=n,r.call(n.exports,n,n.exports),n.exports}var i=Error("Cannot find module '"+e+"'");throw i.code="MODULE_NOT_FOUND",i}).register=function(e,t){o[e]=t},e.parcelRequire94c2=r),(0,r.register)("27Lyk",function(e,t){Object.defineProperty(e.exports,"register",{get:()=>o,set:e=>o=e,enumerable:!0,configurable:!0});var o,r=new Map;o=function(e,t){for(var o=0;o<t.length-1;o+=2)r.set(t[o],{baseUrl:e,path:t[o+1]})}}),r("27Lyk").register(new URL("",import.meta.url).toString(),JSON.parse('["seGuh","index.f36cb45c.js","LVq70","service-worker.612cd456.js"]'));var n=r("96gVx"),i={};i=new URL("service-worker.612cd456.js",import.meta.url).toString();const l=new URL(i);function a(e){let t=document.createElement("div");return t.textContent=e,t.innerHTML}"serviceWorker"in navigator&&navigator.serviceWorker.register(l.href,{scope:"/codex/"}).then(e=>console.log("Service Worker Registered for scope:",l.href,"with","file:///scripts/app.js")).catch(e=>console.error("Service Worker Error:",e)),document.addEventListener("DOMContentLoaded",async()=>{let e=[],t=document.getElementById("book-list"),o=document.getElementById("book-form"),r=document.getElementById("side-menu"),i=document.getElementById("menu-overlay"),l=document.getElementById("burger-menu"),d=document.getElementById("close-menu"),s=document.getElementById("add-book-link"),c=document.getElementById("save-book"),u=document.getElementById("close-form"),m=document.getElementById("delete-book"),g=document.getElementById("book-id");function v(){r.classList.remove("open"),i.classList.remove("show")}l.addEventListener("click",function(){r.classList.add("open"),i.classList.add("show")}),d.addEventListener("click",v),i.addEventListener("click",v);try{await (0,n.getBooksFromFirestore)(e)}catch(e){console.error("Error getting books from Firestore: ",e)}function p(){t.innerHTML="",e.forEach(e=>{var o;let r=document.createElement("article");if(r.id=e.id,r.classList.add("book-card"),r.setAttribute("aria-labelledby",`book-title-${e.id}`),""!==e.cover){let t=document.createElement("div");t.classList.add("book-img");let o=document.createElement("img");o.src=e.cover,o.alt=`${e.title} Book Cover`,t.appendChild(o),r.appendChild(t)}let n=document.createElement("div");n.classList.add("book-info");let i=document.createElement("h2");i.id=`book-title-${e.id}`,i.textContent=e.title;let l=document.createElement("p");l.innerHTML=`<strong>Author:</strong> ${e.author}`;let a=document.createElement("p");a.innerHTML=`<strong>Genre:</strong> ${e.genre.join(", ")}`;let d=document.createElement("p");d.innerHTML=`<strong>Status:</strong> ${e.status}`;let s=document.createElement("p");s.innerHTML=`<strong>Progress:</strong> ${e.progress}%`;let c=document.createElement("span");c.classList.add("book-rating"),c.setAttribute("aria-label",`Rating: ${e.rating} out of 5 stars`),c.innerHTML=(o=e.rating,"&starf;".repeat(o)+"&star;".repeat(5-o)),n.appendChild(i),n.appendChild(l),n.appendChild(a),n.appendChild(d),n.appendChild(s),r.appendChild(n),r.appendChild(c),t.appendChild(r)})}function E(e=null){let r=document.getElementById("book-cover"),n=document.getElementById("book-id"),i=document.getElementById("book-title"),l=document.getElementById("book-author"),a=document.getElementById("book-genre"),d=document.getElementById("book-progress"),s=document.getElementById("book-status"),c=document.getElementById("book-rating");e?(r.value=e.cover,n.value=e.id,i.value=e.title,l.value=e.author,a.value=e.genre,d.value=e.progress,s.value=e.status,c.value=e.rating,m.style.display="inline-block"):(r.value="",n.value="",i.value="",l.value="",a.value="",d.value="",s.value="Not Read",c.value="",m.style.display="none"),o.classList.add("show"),t.classList.add("hide")}t.addEventListener("click",t=>{let o=t.target.closest(".book-card");if(o){let t=o.id;E(e.find(e=>e.id==t))}}),c.addEventListener("click",async()=>{let r;let i=document.getElementById("book-management-form");if(!i.checkValidity()){i.reportValidity();return}let l=a(document.getElementById("book-cover").value.trim()),d=a(document.getElementById("book-title").value.trim()),s=a(document.getElementById("book-author").value.trim()),c=document.getElementById("book-genre").value.split(",").map(e=>a(e.trim())),u=a(document.getElementById("book-progress").value.trim()),m=a(document.getElementById("book-status").value.trim()),v=a(document.getElementById("book-rating").value.trim());if(""!==g.value){let t=e.findIndex(e=>e.id==g.value);if(-1!==t){e[t]={id:g.value,cover:l,title:d,author:s,genre:c,progress:u,status:m,rating:v};try{await (0,n.updateBookInFirestore)(e[t])}catch(e){console.error("Error updating book in Firestore: ",e)}r=e[t]}}else{let t={cover:l,title:d,author:s,genre:c,progress:u,status:m,rating:v};e.push(t);try{e[e.length-1].id=await (0,n.addBookToFirestore)(t)}catch(e){console.error("Error adding book to Firestore: ",e)}r=t}p(),o.classList.remove("show"),t.classList.remove("hide");let E=document.getElementById(r.id);E&&(E.classList.add("highlight"),E.focus(),E.scrollIntoView({behavior:"smooth"}),setTimeout(()=>E.classList.remove("highlight"),1500))}),u.addEventListener("click",()=>{o.classList.remove("show"),t.classList.remove("hide")}),m.addEventListener("click",function(){if(""!==g.value&&confirm(`Are you sure you want to delete the book "${document.getElementById("book-title").value}" entry?`)){let r=e.findIndex(e=>e.id==g.value);if(-1!==r){try{(0,n.removeBookFromFirestore)(g.value)}catch(e){console.error("Error removing book from Firestore: ",e)}e.splice(r,1)}p(),o.classList.remove("show"),t.classList.remove("hide")}}),s.addEventListener("click",e=>{e.preventDefault(),E(),v()}),p()});
//# sourceMappingURL=index.f36cb45c.js.map
