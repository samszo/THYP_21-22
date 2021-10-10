        d3.csv("https://docs.google.com/spreadsheets/d/e/2PACX-1vTM42Rbon532i3N3aW25ZpkoKtsMN-u6C7ycSj6A3DP2QCO89n3OMkseL--aI9a9s3ouwQJsVk6cOFw/pub?gid=513110937&single=true&output=csv", function (data) {
            
            for (i in data) {
                if(data[i]["Dans quel parcours êtes vous inscris ?"]=="M2 THYP"){

                    html = `
                    <div class="row gy-5">

                        <div class="col-6">
                            <div class="p-3 border bg-light">
                                <img src="`+data[i]["Votre photo"]+`">
                                <h2>`+ data[i]["Votre nom"] +` `+ data[i]["Votre prénom"] +`</h2>
                                <p>`+ data[i]["Votre mail"] +`</p>
                                <p>`+ data[i]["N° étudiant"] +`</p>
                                <p>`+ data[i]["Dans quel parcours êtes vous inscris ?"] +`</p>
                            </div>
                        </div>
                    </div>`;

                    d3.select(".container").append("p").html(html);
                }
            }

        });
