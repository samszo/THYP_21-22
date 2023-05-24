document.addEventListener("DOMContentLoaded", function () {
  var container = document.getElementById("container");

  var h1 = document.createElement("h1");
  h1.textContent = "JDC Template";
  container.appendChild(h1);

  var content = document.createElement("div");
  content.id = "content";
  container.appendChild(content);

  // Content goes here
  var h2 = document.createElement("h2");
  h2.textContent = "Resource Title";
  content.appendChild(h2);

  var p = document.createElement("p");
  p.textContent = "Resource Description";
  content.appendChild(p);

  var ul = document.createElement("ul");
  content.appendChild(ul);

  var properties = ["Property 1", "Property 2", "Property 3"];
  var values = ["Value 1", "Value 2", "Value 3"];

  for (var i = 0; i < properties.length; i++) {
    var li = document.createElement("li");
    li.textContent = properties[i] + ": " + values[i];
    ul.appendChild(li);
  }

  var script = document.createElement("script");
  script.src = "template.js";
  document.body.appendChild(script);
});
