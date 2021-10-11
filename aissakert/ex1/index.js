var global_var = {
  url: "https://docs.google.com/spreadsheets/d/e/2PACX-1vTM42Rbon532i3N3aW25ZpkoKtsMN-u6C7ycSj6A3DP2QCO89n3OMkseL--aI9a9s3ouwQJsVk6cOFw/pub?gid=513110937&single=true&output=csv",
  type_parcours: [],
  ordi: [],
  connexion: [],
};
main();

async function main() {
	
  let res = await d3.csv(global_var.url);
	var etud_list_info = null;

    if (document.getElementById("etud_list_info") != null)
      etud_list_info = document.getElementById("etud_list_info");

    if (etud_list_info != null ) {
      for (let i = 0; i < res.length; i++) {
        var etud = res[i];
        var table_keys = Object.keys(etud);
		 
        // console.log(table_keys);
	
		
		const row = document.createElement("tr");
		const cells = [...Array(table_keys.length)].map(td => document.createElement("td"));
		tx = document.createTextNode(i.toString());
		cells[0].appendChild(tx);		  
		row.appendChild(cells[0]);
		
		let url = "https://drive.google.com/uc?id=";
		let id = etud["Votre photo"].substr(etud["Votre photo"].indexOf("id=") + 3);
		console.log(etud["Votre nom"]+"   "+id)
        url += id + "&export=download";
		
		var img = document.createElement("img");
		img.src = url;
		img.setAttribute("width", "60px");
		cells[1].appendChild(img);		  
		row.appendChild(cells[1]);
		
		parcours = etud["Dans quel parcours êtes vous inscris ?"];
		tx_parcours = document.createTextNode(parcours);
		cells[2].appendChild(tx_parcours);		  
		row.appendChild(cells[2]);
		
		tx_nEtud = document.createTextNode(etud["N° étudiant"]);
		cells[3].appendChild(tx_nEtud);		  
		row.appendChild(cells[3]);
		
		tx_nom = document.createTextNode(etud["Votre nom"]);
		cells[4].appendChild(tx_nom);		  
		row.appendChild(cells[4]);

		tx2_prenom = document.createTextNode(etud["Votre prénom"]);
		cells[5].appendChild(tx2_prenom);		  
		row.appendChild(cells[5]);

		etud_list_info.appendChild(row);
	  }
	}
}

