const host = "http://127.0.0.1:5500/";

function getParameterByName(name, url = window.location.href) {
    name = name.replace(/[\[\]]/g, '\\$&');
    var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, ' '));
}

function load(project_name)
{
   var url = `${host}resources/projects/${project_name}.json`;
   var request;

   if(window.XMLHttpRequest){  
    request=new XMLHttpRequest();//for Chrome, mozilla etc
   }  
   else if(window.ActiveXObject){  
    request=new ActiveXObject("Microsoft.XMLHTTP");//for IE only
   }  
   request.onreadystatechange  = function(){
      if (request.readyState == 4  )
      {
        var jsonObj = JSON.parse(request.responseText);//JSON.parse() returns JSON object
        // console.log(jsonObj);
        document.getElementById("title").innerHTML =  jsonObj.title;
        document.getElementById("description").innerHTML =  jsonObj.description;
        document.getElementById("web-link").innerHTML =  jsonObj.link;
        document.getElementById("web-link").href = jsonObj.link;
        document.getElementById("github-repo").innerHTML =  jsonObj.repo;
        document.getElementById("github-repo").href = jsonObj.repo;
        document.getElementById("image1").src = jsonObj.image1;
        document.getElementById("image2").src = jsonObj.image2;
      }
   }
   request.open("GET", url, true);
   request.send();
}

var project_name = getParameterByName('project')
console.log(project_name);
load(project_name)
