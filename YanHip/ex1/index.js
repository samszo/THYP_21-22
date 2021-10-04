var global_var = {
  url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTM42Rbon532i3N3aW25ZpkoKtsMN-u6C7ycSj6A3DP2QCO89n3OMkseL--aI9a9s3ouwQJsVk6cOFw/pub?gid=1340290303&single=true&output=csv",
  type_parcours: [],
  ordi: [],
  connexion: [],
};
main();

async function main() {
  let res = await d3.csv(global_var.url);

  if (res != null && res.length > 0) {
    var etud_row = null,
      menu = null;

    if (document.getElementById("etud_row") != null)
      etud_row = document.getElementById("etud_row");
    if (document.getElementById("menu") != null)
      menu = document.getElementById("menu");

    if (etud_row != null && menu != null) {
      let menu_html = "<div class='nav'>";

      for (let i = 0; i < res.length; i++) {
        var etud = res[i];
        var table_keys = Object.keys(etud);
        // console.log(table_keys);
        for (let ia = 0; ia < table_keys.length; ia++) {
          let key = table_keys[ia];

          if (key.includes("parcours")) {
            if (!menu_html.includes("Parcours") && i == res.length - 1) {
              let params = {};
              params.data = global_var.type_parcours;
              params.id = "parcours";
              menu_html +=
                "<div class='nav-item'> <a class='nav-link' href='#' onclick='show_graph(" +
                JSON.stringify(params) +
                ")'> Parcours </a> </div>";
            }
            try {
              let etud_title = table_keys.filter((title) =>
                title.includes(key)
              );
              global_var.type_parcours.push(etud[etud_title]);
            } catch (e) {
              console.log(e);
            }
          }
          if (key.includes("ordinateur")) {
            if (!menu_html.includes("Ordinateur") && i == res.length - 1) {
              let params = {};
              params.data = global_var.ordi;
              params.id = "ordi";
              menu_html +=
                "<div class='nav-item'> <a class='nav-link' href='#' onclick='show_graph(" +
                JSON.stringify(params) +
                ")'> Ordinateur </a> </div>";
            }
            try {
              let etud_title = table_keys.filter((title) =>
                title.includes(key)
              );
              global_var.ordi.push(etud[etud_title]);
            } catch (e) {
              console.log(e);
            }
          }
          if (key.includes("connexion internet")) {
            if (!menu_html.includes("Connexion") && i == res.length - 1) {
              let params = {};
              params.data = global_var.connexion;
              params.id = "connexion";
              params.multi = true;
              menu_html +=
                "<div class='nav-item'> <a class='nav-link' href='#' onclick='show_graph(" +
                JSON.stringify(params) +
                ")'> Connexion </a> </div>";
            }
            try {
              let etud_title = table_keys.filter((title) =>
                title.includes(key)
              );
              let qualite = etud[etud_title];
              etud_title = etud_title[0].substr(etud_title[0].indexOf("[") + 1);
              etud_title = etud_title.substr(0, etud_title.indexOf("]"));
              // console.log(etud[etud_title]);
              global_var.connexion.push({
                type_co: etud_title,
                qualite: qualite,
              });
            } catch (e) {
              console.log(e);
            }
            //graph a double entree en trait verticale qualite/typeco
          }
          if (key.includes("compte")) {
            if (!menu_html.includes("Compte") && i == res.length - 1)
              menu_html +=
                "<div class='nav-item'> <a class='nav-link' href='#' onclick='show_graph()'> Compte </a> </div>";
          }
          if (key.includes("objectifs")) {
            if (!menu_html.includes("Objectifs") && i == res.length - 1)
              menu_html +=
                "<div class='nav-item'> <a class='nav-link' href='#' onclick='show_graph()'> Objectifs </a> </div>";
          }
          if (key.includes("formation")) {
            if (!menu_html.includes("Formation") && i == res.length - 1)
              menu_html +=
                "<div class='nav-item'> <a class='nav-link' href='#' onclick='show_graph()'> Formation </a> </div>";
          }
          if (key.includes("compétences")) {
            if (!menu_html.includes("Compétences") && i == res.length - 1)
              menu_html +=
                "<div class='nav-item'> <a class='nav-link' href='#' onclick='show_graph()'> Compétences </a> </div>";
          }
          if (key.includes("outils")) {
            if (!menu_html.includes("Outils") && i == res.length - 1)
              menu_html +=
                "<div class='nav-item'> <a class='nav-link' href='#' onclick='show_graph()'> Outils </a> </div>";
          }
          if (key.includes("Langages") && i == res.length - 1) {
            if (!menu_html.includes("Langages"))
              menu_html +=
                "<div class='nav-item'> <a class='nav-link' href='#' onclick='show_graph()'> Langages </a> </div>";
          }
          if (key.includes("Langues")) {
            if (!menu_html.includes("Langues") && i == res.length - 1)
              menu_html +=
                "<div class='nav-item'> <a class='nav-link' href='#' onclick='show_graph()'> Langues </a> </div>";
          }
          if (key.includes("CMS")) {
            if (!menu_html.includes("CMS") && i == res.length - 1)
              menu_html +=
                "<div class='nav-item'> <a class='nav-link' href='#' onclick='show_graph()'> CMS </a> </div>";
          }
          if (key.includes("besoins")) {
            if (!menu_html.includes("Besoins") && i == res.length - 1)
              menu_html +=
                "<div class='nav-item'> <a class='nav-link' href='#' onclick='show_graph()'> Besoins </a> </div>";
          }
          if (key.includes("sociaux")) {
            if (!menu_html.includes("Réseaux") && i == res.length - 1)
              menu_html +=
                "<div class='nav-item'> <a class='nav-link' href='#' onclick='show_graph()'> Réseaux </a> </div>";
          }
        }

        // let date_promo = etud["Horodateur"].substr(0, etud["Horodateur"].indexOf(" ")).split("/");
        // let date_format = dayjs().date(date_promo[0]).month(date_promo[1]).year( date_promo[2])
        // if(etud["Horodateur"])
        // if(etud["Dans quel parcours êtes vous inscris ?"] == "M2 THYP") {

        let col_etud = document.createElement("div");
        col_etud.classList.add("col-sm-3", "my_cols");

        let card = document.createElement("div");
        card.classList.add("card");

        let card_html = "";
        let url = "https://drive.google.com/uc?id=";
        let id = etud["Votre photo"].substr(
          etud["Votre photo"].indexOf("id=") + 3
        );
        url += id + "&export=download";

        card_html +=
          "<div class='profil_img'> <img src='" +
          url +
          "' class='card-img-top'/> </div>";
        card_html += "<div class='card-body'>";
        card_html +=
          "<div class='card-title'><strong>" +
          etud["Votre nom"] +
          " " +
          etud["Votre prénom"] +
          "</strong></br>";
        card_html += etud["Dans quel parcours êtes vous inscris ?"];
        card_html +=
          "<div class='card_footer'>" + etud["Votre mail"] + "</div>";
        card_html += "</div>";

        card.innerHTML = card_html;
        col_etud.appendChild(card);

        etud_row.appendChild(col_etud);
        // }
      }

      menu_html += " </div>";
      menu.innerHTML = menu_html;
    } else {
      //todo
    }
  } else {
    //todo
    console.log("error");
  }
}
function show_graph(params) {
  if (document.getElementById("graph_svg" + params.id) == null) {
    createGraph(params);
  } else {
    document.getElementById("graph_svg" + params.id).remove();
  }
}

function createGraph(params) {
  if (params != null) {
    // set the dimensions and margins of the graph
    var margin = { top: 30, right: 30, bottom: 70, left: 60 };
    (params.width = 300 - margin.left - margin.right),
      (params.height = 250 - margin.top - margin.bottom);

    // append the svg object to the body of the page
    var svg = d3
      .select("#my_graph")
      .append("svg")
      .attr("width", params.width + margin.left + margin.right)
      .attr("height", params.height + margin.top + margin.bottom)
      .attr("id", "graph_svg" + params.id)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    params.svg = svg;

    if (params.multi) {
      createMultiGraphPlot(params);
    } else {
      createSimpleGrapPlot(params);
    }
  }
}

function createSimpleGrapPlot(params) {
  if (params != null && params.svg != null) {
    var counts = {},
      max_count = 0;
    params.data.forEach(function (x) {
      counts[x] = (counts[x] || 0) + 1;
    });

    var to_display = [];

    for (count in counts) {
      if (counts[count] > max_count) max_count = counts[count];
      to_display.push({ data: count, value: counts[count] });
    }

    // X axis
    var x = d3
      .scaleBand()
      .range([0, params.width])
      .domain(
        params.data.map(function (d) {
          return d;
        })
      )
      .padding(0.2);
    params.svg
      .append("g")
      .attr("transform", "translate(0," + params.height + ")")
      .call(d3.axisBottom(x))
      .selectAll("text")
      .attr("transform", "translate(-10,0)rotate(-45)")
      .style("text-anchor", "end");

    //     // Add Y axis
    var y = d3
      .scaleLinear()
      .domain([0, max_count + 5])
      .range([params.height, 0]);
    params.svg.append("g").call(d3.axisLeft(y));

    //     // Bars
    params.svg
      .selectAll("mybar")
      .data(to_display)
      .enter()
      .append("rect")
      .attr("x", function (d) {
        return x(d.data);
      })
      .attr("y", function (d) {
        return y(d.value);
      })
      .attr("width", x.bandwidth())
      .attr("height", function (d) {
        return params.height - y(d.value);
      })
      .attr("fill", "#69b3a2")
      .append("title", "test")
      .text(function (d) {
        return d.value;
      });
  }
}

function createMultiGraphPlot(params) {

  var counts = {},
    max_count = 0;
  params.data.forEach(function (x) {
    counts[x.type_co+x.qualite] = (counts[x.type_co+x.qualite] || 0) + 1;
  });

  var to_display = [];

  for (count in counts) {
    if (counts[count] > max_count) max_count = counts[count];
    to_display.push({ data: count, value: counts[count] });
  }

  // List of groups = species here = value of the first column called group -> I show them on the X axis
  const groups = params.data.map((d) => d.type_co);
  const subgroups = params.data.map((d) => d.qualite);

  // Add X axis
  const x = d3
    .scaleBand()
    .domain(groups)
    .range([0, params.width + 100])
    .padding([0.9]);
  params.svg
    .append("g")
    .attr("transform", `translate(0, ${params.height})`)
    .call(d3.axisBottom(x).tickSize(0));

  // Add Y axis
  const y = d3.scaleLinear().domain([0, 30]).range([params.height, 0]);
  params.svg.append("g").call(d3.axisLeft(y));

  // Another scale for subgroup position?
  const xSubgroup = d3
    .scaleBand()
    .domain(subgroups)
    .range([0, x.bandwidth()])
    .padding([0.05]);

  // color palette = one color per subgroup
  const color = d3
    .scaleOrdinal()
    .domain(subgroups)
    .range(["#e41a1c", "#377eb8", "#4daf4a"]);

  // Show the bars
  params.svg
    .append("g")
    .selectAll("g")
    // Enter in data = loop group per group
    .data(to_display)
    .join("g")
    .attr("transform", (d) =>{ `translate(${x(d.data)}, 0)`})
    .selectAll("rect")
    .data(function (d) {
      return subgroups.map(function (key) {
        return { key: key, value: d[key] };
      });
    })
    .join("rect")
    .attr("x", (d) => xSubgroup(d.key))
    .attr("y", (d) => y(d.value))
    .attr("width", xSubgroup.bandwidth())
    .attr("height", (d) => params.height - y(d.value))
    .attr("fill", (d) => color(d.key));
}
