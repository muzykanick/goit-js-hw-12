import{a as w,S as v,i as c}from"./assets/vendor-6e0bf343.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const n of t.addedNodes)n.tagName==="LINK"&&n.rel==="modulepreload"&&o(n)}).observe(document,{childList:!0,subtree:!0});function s(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerPolicy&&(t.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?t.credentials="include":e.crossOrigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function o(e){if(e.ep)return;e.ep=!0;const t=s(e);fetch(e.href,t)}})();async function g(r,a){const s="https://pixabay.com/api/",o="43485677-c4ca6985f0e2cabeed805eb30",e=new URLSearchParams({key:o,q:r,image_typ:"photo",orientation:"horizontal",safesearch:!0,page:a,per_page:15}),{data:t}=await w.get(`${s}?${e}`);return t}function h(r){return r.map(({webformatURL:a,largeImageURL:s,tags:o,likes:e,views:t,comments:n,downloads:L})=>`
    <li class="gallery-item">
      <div class="gallery">
       <a class="gallery-link" href="${s}">
       <img class="gallery-image"
         src="${a}"
         alt="${o}"
        />
       </a>
       
      <ul class="card-description">
        <li class="description">Likes <span class="accent">${e} </span></li>
        <li class="description">Views <span class="accent">${t} </span></li>
        <li class="description">Comments <span class="accent">${n} </span></li>
        <li class="description">Downloads <span class="accent">${L} </span></li>
      </ul>
      </div>
    </li>
    `).join("")}const y=document.querySelector(".search-form "),d=document.querySelector(".js-list"),S=document.querySelector(".loader"),f=document.querySelector(".load-more-button");y.addEventListener("submit",P);f.addEventListener("click",M);function u(){S.classList.toggle("visible")}function p(r){r?f.classList.add("visible-button"):f.classList.remove("visible-button")}const b=new v(".images a",{captionsData:"alt",captionDelay:250});let l="",i=1,m=0;async function P(r){r.preventDefault(),d.innerHTML="",i=1;const{query:a}=r.currentTarget.elements;if(l=a.value.trim(),l===""){c.error({title:"Error",message:"The field cannot be empty!!!",position:"topRight"});return}u();try{const s=await g(l,i);if(s.hits.length===0){c.warning({title:"",message:"Sorry, there are no images matching your search query. Please try again!",position:"topRight"}),p(!1);return}d.insertAdjacentHTML("beforeend",h(s.hits)),b.refresh(),m=Math.ceil(s.totalHits/15),p(i<m),y.reset()}catch{c.error({title:"Error",message:"An error occurred while fetching data. Please try again later.",position:"topRight"})}finally{u()}}async function M(){i+=1,u();try{const r=await g(l,i);d.insertAdjacentHTML("beforeend",h(r.hits)),b.refresh(),i===m&&(p(!1),c.info({title:"",message:"We're sorry, but you've reached the end of search results.",position:"bottomRight"}))}catch{c.error({title:"Error",message:"An error occurred while fetching data. Please try again later.",position:"topRight"})}finally{u()}}
//# sourceMappingURL=commonHelpers.js.map
