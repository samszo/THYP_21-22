var global_var = {
  url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTM42Rbon532i3N3aW25ZpkoKtsMN-u6C7ycSj6A3DP2QCO89n3OMkseL--aI9a9s3ouwQJsVk6cOFw/pub?gid=1340290303&single=true&output=csv",
  data: null
};
main();

async function main() {
  let res = await d3.csv(global_var.url);

  if (res != null && res.length > 0) {
    global_var.data = res;
    traitement_liste(global_var.data);
  } else {
    //todo
    console.log("error");
  }
}

function traitement_liste(data) {
  var etud_row = null,
    menu = null;
  data_length = data.length;

  var type_parcours = [], ordi = [], connexion = [];

  if (document.getElementById("etud_row") != null) {
    etud_row = document.getElementById("etud_row");
    etud_row.innerHTML = "";
  }
  if (document.getElementById("menu") != null) {
    menu = document.getElementById("menu");
    menu.innerHTML = "";
  }

  if (etud_row != null && menu != null) {
    let menu_html = "<div class='nav'>";

    for (let i = 0; i < data_length; i++) {
      var etud = data[i];
      var table_keys = Object.keys(etud);
      // console.log(table_keys);
      for (let ia = 0; ia < table_keys.length; ia++) {
        let key = table_keys[ia];

        if (key.includes("parcours")) {
          try {
            // global_var.type_parcours = [];
            let etud_title = table_keys.filter((title) => title.includes(key));
            type_parcours.push(etud[etud_title]);
            if (!menu_html.includes("Parcours") && i == data_length - 1) {
              let params = {
                data: type_parcours,
                id: "parcours",
                title: "Type de parcours",
              };
              menu_html +=
                "<div class='nav-item'> <a class='nav-link' href='#' onclick='show_graph(" +
                JSON.stringify(params) +
                ")'> Parcours </a> </div>";
            }
          } catch (e) {
            console.log(e);
          }
        }
        if (key.includes("ordinateur")) {
          try {
            // global_var.ordi = [];
            let etud_title = table_keys.filter((title) => title.includes(key));
            ordi.push(etud[etud_title]);
            if (!menu_html.includes("Ordinateur") && i == data_length - 1) {
              let params = {
                data: ordi,
                id: "ordi",
                title: "Ordinateur personnel",
                filter: etud_title[0],
              };
              menu_html +=
                "<div class='nav-item'> <a class='nav-link' href='#' onclick='show_graph(" +
                JSON.stringify(params) +
                ")'> Ordinateur </a> </div>";
            }
          } catch (e) {
            console.log(e);
          }
        }
        if (key.includes("connexion internet")) {
          try {
            // global_var.connexion = [];
            let etud_title = table_keys.filter((title) => title.includes(key));
            let qualite = etud[etud_title];
            let type_co = etud_title[0].substr(etud_title[0].indexOf("[") + 1);
            type_co = type_co.substr(0, type_co.indexOf("]"));
            // console.log(etud[etud_title]);
            connexion.push({
              type_co: type_co,
              qualite: qualite,
            });
            if (!menu_html.includes("Connexion") && i == data_length - 1) {
              let params = {
                data: connexion,
                id: "connexion",
                title: "Qualité/Type Connexion",
                filter: etud_title[0],
                total_etud: data_length,
                multi: true,
              };
              menu_html +=
                "<div class='nav-item'> <a class='nav-link' href='#' onclick='show_graph(" +
                JSON.stringify(params) +
                ")'> Connexion </a> </div>";
            }
          } catch (e) {
            console.log(e);
          }
          //graph a double entree en trait verticale qualite/typeco
        }
        if (key.includes("compte")) {
          if (!menu_html.includes("Compte") && i == data_length - 1)
            menu_html +=
              "<div class='nav-item'> <a class='nav-link' href='#' onclick='show_graph()'> Compte </a> </div>";
        }
        if (key.includes("objectifs")) {
          if (!menu_html.includes("Objectifs") && i == data_length - 1)
            menu_html +=
              "<div class='nav-item'> <a class='nav-link' href='#' onclick='show_graph()'> Objectifs </a> </div>";
        }
        if (key.includes("formation")) {
          if (!menu_html.includes("Formation") && i == data_length - 1)
            menu_html +=
              "<div class='nav-item'> <a class='nav-link' href='#' onclick='show_graph()'> Formation </a> </div>";
        }
        if (key.includes("compétences")) {
          if (!menu_html.includes("Compétences") && i == data_length - 1)
            menu_html +=
              "<div class='nav-item'> <a class='nav-link' href='#' onclick='show_graph()'> Compétences </a> </div>";
        }
        if (key.includes("outils")) {
          if (!menu_html.includes("Outils") && i == data_length - 1)
            menu_html +=
              "<div class='nav-item'> <a class='nav-link' href='#' onclick='show_graph()'> Outils </a> </div>";
        }
        if (key.includes("Langages") && i == data_length - 1) {
          if (!menu_html.includes("Langages"))
            menu_html +=
              "<div class='nav-item'> <a class='nav-link' href='#' onclick='show_graph()'> Langages </a> </div>";
        }
        if (key.includes("Langues")) {
          if (!menu_html.includes("Langues") && i == data_length - 1)
            menu_html +=
              "<div class='nav-item'> <a class='nav-link' href='#' onclick='show_graph()'> Langues </a> </div>";
        }
        if (key.includes("CMS")) {
          if (!menu_html.includes("CMS") && i == data_length - 1)
            menu_html +=
              "<div class='nav-item'> <a class='nav-link' href='#' onclick='show_graph()'> CMS </a> </div>";
        }
        if (key.includes("besoins")) {
          if (!menu_html.includes("Besoins") && i == data_length - 1)
            menu_html +=
              "<div class='nav-item'> <a class='nav-link' href='#' onclick='show_graph()'> Besoins </a> </div>";
        }
        if (key.includes("sociaux")) {
          if (!menu_html.includes("Réseaux") && i == data_length - 1)
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
      card_html += "<div class='card_footer'>" + etud["Votre mail"] + "</div>";
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
    (params.width = 550 - margin.left - margin.right),
      (params.height = 300 - margin.top - margin.bottom);

    // append the svg object to the body of the page
    var svg = d3
      .select("#my_graph")
      .append("svg")
      .attr("width", params.width + margin.left + margin.right)
      .attr("height", params.height + margin.top + margin.bottom)
      .style("margin-top", "1%")
      .style("margin-right", "2%")
      .attr("id", "graph_svg" + params.id)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    svg
      .append("text")
      .attr("x", params.width / 2)
      .attr("y", 0 - margin.top / 2)
      .attr("text-anchor", "middle")
      .style("font-size", "16px")
      .style("text-decoration", "underline")
      .text(params.title);

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
      to_display.push({
        data: count,
        value: counts[count],
        filter: params.filter,
      });
    }

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

    var y = d3
      .scaleLinear()
      .domain([0, max_count + 5])
      .range([params.height, 0]);
    params.svg.append("g").call(d3.axisLeft(y));

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
      .attr("id", function (d) {
        return d.data;
      })
      .on("click", function (e, d) {
        if (e.target.id != null) {
          let params = {
            id: e.target.id,
            filter: d.filter,
          };
          filter(params);
        }
      })
      .style("cursor", "pointer")
      .append("title", "")
      .text(function (d) {
        return d.value;
      });
  }
}

function createMultiGraphPlot(params) {
  var counts = {};
  params.data.forEach(function (x) {
    counts[x.type_co + "-" + x.qualite] =
      (counts[x.type_co + "-" + x.qualite] || 0) + 1;
  });

  var befor_to_display = [];
  var to_display = [];

  for (count in counts) {
    let group = JSON.stringify({ group: count.substr(0, count.indexOf("-")) });
    if (!to_display.includes(group)) to_display.push(group);
    befor_to_display.push({
      group: count.substr(0, count.indexOf("-")),
      subgroup:
        count.substr(count.indexOf("-") + 1) != ""
          ? count.substr(count.indexOf("-") + 1)
          : "Pas répondu",
      value: counts[count],
    });
  }

  for (let ia = 0; ia < befor_to_display.length; ia++) {
    for (let ib = 0; ib < to_display.length; ib++) {
      if (to_display[ib].group == undefined)
        to_display[ib] = JSON.parse(to_display[ib]);
      if (befor_to_display[ia].group == to_display[ib].group) {
        to_display[ib][befor_to_display[ia].subgroup] =
          befor_to_display[ia].value;
        to_display[ib].filter = params.filter;
      }
    }
  }
  var groups = params.data.map((d) => d.type_co);
  var subgroups = params.data.map((d) => d.qualite);

  groups = groups.filter(function (item, index) {
    return groups.indexOf(item) == index && item != "";
  });

  subgroups = subgroups.filter(function (item, index) {
    return subgroups.indexOf(item) == index && item != "";
  });

  subgroups.push("Pas répondu");

  const x = d3
    .scaleBand()
    .domain(groups)
    .range([0, params.width - 100])
    .padding([0.9]);

  params.svg
    .append("g")
    .attr("transform", `translate(0, ${params.height})`)
    .call(d3.axisBottom(x).tickSize(0));

  const y = d3.scaleLinear().domain([0, params.total_etud + 5]).range([params.height, 0]);
  params.svg.append("g").call(d3.axisLeft(y));

  d3.scaleBand().domain(subgroups).range([0, x.bandwidth()]).padding([0.05]);

  const color = d3
    .scaleOrdinal()
    .domain(subgroups)
    .range(["#00243B", "#004067", "#00000", "#015F99", "#019EFE"]);

  var stackedData = d3.stack().keys(subgroups)(to_display);

  params.svg
    .append("g")
    .selectAll("g")
    .data(stackedData)
    .enter()
    .append("g")
    .attr("fill", function (d) {
      return color(d.key);
    })
    .attr("id", function (d) {
      return d.key;
    })
    .selectAll("rect")
    .data(function (d) {
      return d;
    })
    .enter()
    .append("rect")
    .attr("x", function (d) {
      return x(d.data.group);
    })
    .attr("y", function (d) {
      return y(d[1]);
    })
    .attr("height", function (d) {
      return y(d[0]) - y(d[1]);
    })
    .attr("width", x.bandwidth())
    .attr("id", function (d) {
      return d.data.group;
    })
    .style("cursor", "pointer")
    .on("click", function (e, d) {
      if (e.target.id != null) {
        let params = {
          id: e.target.parentElement.id,
          // parent_id: e.target.id,
          filter: d.data.group,
        };
        filter(params);
      }
    })
    .append("title", "")
    .text(function (d) {
      return d[1] - d[0];
    });

  var size = 10;
  params.svg
    .selectAll("mydots")
    .data(subgroups)
    .enter()
    .append("rect")
    .attr("x", params.width - 130)
    .attr("y", function (d, i) {
      return i * (size + 5);
    })
    .attr("width", size)
    .attr("height", size)
    .style("fill", function (d) {
      return color(d);
    });

  params.svg
    .selectAll("mylabels")
    .data(subgroups)
    .enter()
    .append("text")
    .attr("x", params.width - 130 + size * 1.2)
    .attr("y", function (d, i) {
      return i * (size + 5) + size / 2;
    })
    .style("fill", function (d) {
      return color(d);
    })
    .text(function (d) {
      return d;
    })
    .attr("text-anchor", "left")
    .style("alignment-baseline", "middle");
}

function filter(params) {
  if (
    global_var.data != null &&
    global_var.data.length > 0 &&
    params != null &&
    params.filter != null &&
    params.id != null
  ) {
    if (params.id == "Pas répondu") params.id = "";
    let temp_data = [];
    for (let i = 0; i < global_var.data.length; i++) {
      let etud = global_var.data[i];
      let filter = null;
      for (let key in Object.keys(etud)) {
        if (Object.keys(etud)[key].includes(params.filter)) {
          filter = Object.keys(etud)[key];
        }
      }
      if (etud[params.filter] == params.id || etud[filter] == params.id) {
        temp_data.push(etud);
      }
    }
    traitement_liste(temp_data);
  }
}
