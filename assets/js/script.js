//constants.
const bar1 = document.querySelector("#bar1");
const bar2 = document.querySelector("#bar2");
const bar3 = document.querySelector("#bar3");
const menuBarContainer = document.querySelector("#menuContainer");
const pageH = window.innerHeight;
const bCont = document.querySelectorAll(".bCont");
const inputs = document.querySelectorAll("input");
const phoneInput = document.querySelector("#phone-input");
const loginSignUpBtn = document.querySelector("#login-signup-button");
const forgotPasswordBtn = document.querySelector("#forgot-password-text");
const signupBtn = document.querySelector("#signUpBtn");
console.log(inputs);

function setLoginPageHeight() {
  bCont.forEach(element => {
    element.style.height = pageH + "px";
  });
  if(window.innerWidth < 700){
    bCont[0].style.height = pageH*2  + "px";
  }else{
    bCont[0].style.height = pageH  + "px";
  }
}
setLoginPageHeight();
window.onresize = () => {
  setLoginPageHeight();
}

//variables.
var oldScrollY = 0;
var shown = false;
var cursorX = 0;
var menuBtnClicked = false;



//listeners and functions
document.querySelector("#menuShowHideBtn").onclick = () => {
    if(shown){
        hideMenuAnim();
        shown = false;
    }else{
        showMenuAnim();
        shown = true;
    }
}



function showMenuAnim() {
    let id = null;
    let rot = 0;
    let pos = 0;
    let opac = 1;
    clearInterval(id);
    id = setInterval(frame, 5);
    function frame() {
      if (rot == 45) {
        clearInterval(id);
        menuBarContainer.style.display = 'block';
      } else {
        pos+=0.22;
        rot++;
        opac-=0.03;
        bar1.style.transform = `translate(${pos*7.5}px, -${pos}px) rotate(${rot}deg)`;
        bar3.style.transform = `rotate(-${rot}deg) translate(-${pos*13}px, -${pos*1.5}px`;
        bar2.style.opacity = opac;
        menuBarContainer.style.opacity = 1 - opac;
      }
    }
}




function hideMenuAnim(){
  let id = null;
  let rot = 45;
  let pos = 10;
  let opac = 0;
  clearInterval(id);
  id = setInterval(frame, 5);
  menuBarContainer.style.display = 'none';
  function frame() {
    if (rot == 0) {
      clearInterval(id);
    } else {
      pos-=0.22;
      rot--;
      opac+=0.03;
      bar1.style.transform = `translate(${pos*7.5}px, -${pos}px) rotate(${rot}deg)`;
      bar3.style.transform = `rotate(-${rot}deg) translate(-${pos*13}px, -${pos*1.5}px`;
      bar2.style.opacity = opac;
      menuBarContainer.style.opacity = 1 - opac;
    }
  }
}




function scrollToFunc(elemId) {
  var element = document.querySelector(elemId);
  element.scrollIntoView({behavior: 'smooth'});
  menuBtnClicked = true;
}

function menuBtnUp(){
  setTimeout(() => {
    menuBtnClicked = false;
  }, 2000);
}



var timer = null;
window.addEventListener("scroll", ()=>{
  scDir = scrollDirection();
  if(cursorX < window.innerWidth - 50 && !menuBtnClicked){
    if(window.scrollY > 1 && window.scrollY < pageH-200 && scDir == "Up"){
      window.scrollTo(0,0)
    }
    if((window.scrollY > 200 && window.scrollY < pageH && scDir == "Down") || (window.scrollY > pageH+200 && window.scrollY < pageH*2-200 && scDir == "Up")){
      window.scrollTo(0, pageH);
      disableScroll(pageH);
    }

    if((window.scrollY > pageH+200 && window.scrollY < pageH*2 && scDir == "Down") || (window.scrollY > pageH*2+200 && window.scrollY < pageH*3-200 && scDir == "Up")){
      window.scrollTo(0,pageH*2);
      disableScroll(pageH*2);
    }
    if((window.scrollY > pageH*2+200 && window.scrollY < pageH*3 && scDir == "Down") || (window.scrollY > pageH*3+200 && window.scrollY < pageH*4-200 && scDir == "Up")){
      window.scrollTo(0, pageH*3);
      disableScroll(pageH*3);
    }
    if((window.scrollY > pageH*3+200 && window.scrollY < pageH*4 && scDir == "Down") || (window.scrollY > pageH*4+200 && window.scrollY < pageH*5-200 && scDir == "Up")){
      window.scrollTo(0, pageH*4);
      disableScroll(pageH*4);
    }
    if(window.innerWidth > 700){
      if(window.scrollY > pageH*4 && scDir == "Up"){
        window.scrollTo(0, pageH*4);
        disableScroll(pageH*4);
      }
    }else{
      if((window.scrollY > pageH*4+200 && window.scrollY < pageH*5 && scDir == "Down") || (window.scrollY > pageH*5+200 && window.scrollY < pageH*6-200 && scDir == "Up")){
        window.scrollTo(0, pageH*5);
        disableScroll(pageH*5);
      }
      if(window.scrollY > pageH*5 && scDir == "Up"){
        window.scrollTo(0, pageH*5);
        disableScroll(pageH*5);
      }
    }
    
    
  }


  if(timer !== null) {
    clearTimeout(timer);        
  }

  timer = setTimeout(function() {
    enableScroll();
  }, 50);
})




function scrollDirection(){
  var direction = "";
  //console.log(~~oldScrollY, ~~window.scrollY)
  if(oldScrollY < window.scrollY-1){
    direction = "Down"
  }else if(oldScrollY > window.scrollY+1){
    direction = "Up"
  }else{
    direction = "Stopped";
  }
  oldScrollY = window.scrollY;
  return direction;
}




function disableScroll(pageYPos) {
    // Get the current page scroll position
    scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,

      // if any scroll is attempted, set this to the previous value
      window.onscroll = function() {
        window.scrollTo(scrollLeft, pageYPos);
      };
}





function enableScroll() {
	window.onscroll = function() {};
}

document.onmouseover =  (event) => {
  cursorX = event.pageX;
}
document.ontouchend = () => {
  enableScroll();
}




function showSignUp(){
  if(loginSignUpBtn.innerHTML == 'Login'){
    loginSignUpBtn.innerHTML = 'Sign Up';
    showElement(inputs[0])
    showElement(inputs[2])
    showElement(phoneInput)
    hideElement(inputs[1])
    if(inputs[5].style.display == 'none'){
      showElement(inputs[5])
    }
  }else{
    loginSignUpBtn.innerHTML = 'Login';
    hideElement(inputs[0])
    hideElement(inputs[2])
    hideElement(phoneInput)
    showElement(inputs[1])
  }
}




function hideElement(element){
  let id = null; 
  let opac = 1;
  clearInterval(id);
  id = setInterval(frame, 5);
  function frame() {
    if (opac <= 0) {
      clearInterval(id);
      element.style.display = 'none';
    } else {
      opac-=0.02;
      element.style.opacity = opac;
      element.style.height = opac*40 + "px";
      element.style.fontSize = opac*17; + "px";
      element.style.width = opac*300 + "px";
      element.style.margin = opac*6 + "px";
      element.style.border = opac*2 + "px";
    }
  }
}



function showElement(element) {
  let id = null; 
  let opac = 0;
  element.style.height = 0;
  element.style.width = 0;
  element.style.fontSize = 0+"px";
  clearInterval(id);
  id = setInterval(frame, 5);
  function frame() {
    if (opac >= 1) {
      clearInterval(id);
    } else {
      if(element == phoneInput){
        element.style.display = "flex";
      }else{
        element.style.display = 'block';
      }
      opac+=0.02;
      element.style.opacity = opac;
      element.style.height = opac*40 + "px";
      element.style.fontSize = opac*17; + "px";
      element.style.width = opac*300 + "px";
      element.style.margin = opac*6 + "px";
      element.style.border = opac*2 + "px";
    }
  }
}

forgotPasswordBtn.onclick = ()=>{
  if(forgotPasswordBtn.innerHTML == "Forgot password?"){
    hideElement(inputs[0]);
    hideElement(inputs[2]);
    hideElement(phoneInput)
    hideElement(inputs[5]);
    if(inputs[1].style.display == "none"){
      showElement(inputs[1]);
    }
    forgotPasswordBtn.innerHTML = "Login";
    forgotPasswordBtn.style.color = "blue";
    signupBtn.style.display = "none";
    loginSignUpBtn.innerHTML = "Send Link";
  }else{
    showElement(inputs[5]);
    forgotPasswordBtn.innerHTML = "Forgot password?";
    forgotPasswordBtn.style.color = "red";
    signupBtn.style.display = "block"; //
    loginSignUpBtn.innerHTML = "Login";
  }
}