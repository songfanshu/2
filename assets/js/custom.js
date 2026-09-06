/* Lanzalab style horizontal page switching */
(function(){
 let current=0;
 let locked=false;
 const total=5;

 function move(index){
  if(index<0) index=0;
  if(index>=total) index=total-1;
  current=index;
  const wrapper=document.querySelector('.page-wrapper,.main-container');
  if(wrapper){
   wrapper.style.transform=`translateX(-${index*100}vw)`;
  }
 }

 window.addEventListener('wheel',function(e){
  if(locked) return;
  if(Math.abs(e.deltaY)<20) return;
  locked=true;
  move(current+(e.deltaY>0?1:-1));
  setTimeout(()=>locked=false,900);
 },{passive:true});

 window.addEventListener('keydown',function(e){
  if(e.key==='ArrowRight') move(current+1);
  if(e.key==='ArrowLeft') move(current-1);
 });

 let startX=0;
 window.addEventListener('touchstart',e=>{
  startX=e.touches[0].clientX;
 });
 window.addEventListener('touchend',e=>{
  let end=e.changedTouches[0].clientX;
  if(startX-end>50) move(current+1);
  if(end-startX>50) move(current-1);
 });
})();
