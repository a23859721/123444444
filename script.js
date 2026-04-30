document.addEventListener("DOMContentLoaded",()=>{

/* 관리자 */
if(!localStorage.getItem("users")){
localStorage.setItem("users",JSON.stringify([{id:"admin",pw:"1234",role:"admin"}]));
}

function getUser(){
return JSON.parse(localStorage.getItem("currentUser"));
}

/* 로그인 */
window.login=()=>{
let id=document.getElementById("id").value;
let pw=document.getElementById("pw").value;

let users=JSON.parse(localStorage.getItem("users"));
let user=users.find(u=>u.id===id&&u.pw===pw);

if(user){
localStorage.setItem("currentUser",JSON.stringify(user));
location.href="index.html";
}else{
document.getElementById("msg").innerText="실패";
}
}

/* 회원가입 */
window.register=()=>{
let id=document.getElementById("id").value;
let pw=document.getElementById("pw").value;

let users=JSON.parse(localStorage.getItem("users"));
users.push({id,pw,role:"user"});
localStorage.setItem("users",JSON.stringify(users));

alert("가입 완료");
}

/* 공지 */
window.addNotice=()=>{
let user=getUser();
if(!user||user.role!=="admin"){alert("관리자만");return;}

let t=document.getElementById("notice-title").value;
let c=document.getElementById("notice-content").value;

let arr=JSON.parse(localStorage.getItem("notice"))||[];
arr.push({t,c});
localStorage.setItem("notice",JSON.stringify(arr));
location.reload();
}

window.deleteNotice=(i)=>{
let arr=JSON.parse(localStorage.getItem("notice"));
arr.splice(i,1);
localStorage.setItem("notice",JSON.stringify(arr));
location.reload();
}

let list=document.getElementById("notice-list");
if(list){
let arr=JSON.parse(localStorage.getItem("notice"))||[];
let user=getUser();

arr.forEach((x,i)=>{
let li=document.createElement("li");
li.innerHTML=`<strong>${x.t}</strong><br>${x.c}
${user&&user.role==="admin"?`<button onclick="deleteNotice(${i})">삭제</button>`:""}`;
list.appendChild(li);
});
}

/* 캘린더 */
let cal=document.getElementById("calendar");
if(cal){
for(let i=1;i<=30;i++){
let d=document.createElement("div");
d.className="day reveal";
d.innerText=i;
cal.appendChild(d);
}
}

/* 갤러리 */
window.addImage=()=>{
let user=getUser();
if(!user||user.role!=="admin"){alert("관리자만");return;}

let f=document.getElementById("img-file").files[0];
let reader=new FileReader();

reader.onload=e=>{
let arr=JSON.parse(localStorage.getItem("gallery"))||[];
arr.push(e.target.result);
localStorage.setItem("gallery",JSON.stringify(arr));
location.reload();
}
reader.readAsDataURL(f);
}

let g=document.getElementById("gallery-list");
if(g){
let arr=JSON.parse(localStorage.getItem("gallery"))||[];
arr.forEach(src=>{
let img=document.createElement("img");
img.src=src;
img.classList.add("reveal");
g.appendChild(img);
});
}

/* 🔥 스크롤 애니메이션 */
function revealOnScroll(){
document.querySelectorAll(".reveal").forEach(el=>{
const top=el.getBoundingClientRect().top;
if(top < window.innerHeight - 100){
el.classList.add("active");
}
});
}

window.addEventListener("scroll",revealOnScroll);
revealOnScroll();

});