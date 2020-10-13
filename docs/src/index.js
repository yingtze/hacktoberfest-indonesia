const app = document.getElementById("app");

function showLoading() {
    const template = document.createElement("template");
    template.innerHTML = `    <section class="circle">
      <section class="square squareOne"></section>
      <section class="square squareTwo"></section>
      <section class="square squareThree"></section>
      <section class="square squareFour"></section>
      <section class="square squareFive"></section>
      <section class="square squareSix"></section>
      <section class="square squareSeven"></section>
      <section class="square squareEight"></section>
    </section>
    <section class="loadingBar">
      <section class="load"></section>
    </section>`;
    app.innerHTML = template.innerHTML;
}

function showContributor() {
    showLoading();
    const template = document.createElement("template");
    fetch("https://api.github.com/repos/fdciabdul/hacktoberfest-indonesia/contributors")
        .then((response) => response.json())
        .then((data) => {
            data.forEach((contributor) => {
                template.innerHTML += `<div class="contributor">
        <a href="${contributor.html_url}" target="_blank">
          <img src="${contributor.avatar_url}" width="100px" class="img-fluid rounded-circle" height="100px" />
        </a>
        <br>
         @${contributor.login}
         
        </div>`;
            });

            app.innerHTML = template.innerHTML;
        });
}

var colors = new Array(
  [62,35,255],
  [60,255,60],
  [255,35,98],
  [45,175,230],
  [255,0,255],
  [255,128,0]);

var step = 0;
//color table indices for: 
// current color left
// next color left
// current color right
// next color right
var colorIndices = [0,1,2,3];

//transition speed
var gradientSpeed = 0.002;

function updateGradient()
{
  
  if ( $===undefined ) return;
  
var c0_0 = colors[colorIndices[0]];
var c0_1 = colors[colorIndices[1]];
var c1_0 = colors[colorIndices[2]];
var c1_1 = colors[colorIndices[3]];

var istep = 1 - step;
var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
var color1 = "rgb("+r1+","+g1+","+b1+")";

var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
var color2 = "rgb("+r2+","+g2+","+b2+")";

 $('#gradient').css({
   background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
    background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});
  
  step += gradientSpeed;
  if ( step >= 1 )
  {
    step %= 1;
    colorIndices[0] = colorIndices[1];
    colorIndices[2] = colorIndices[3];
    
    //pick two new target color indices
    //do not pick the same as the current one
    colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
    
  }
}

setInterval(updateGradient,10);

showContributor();
