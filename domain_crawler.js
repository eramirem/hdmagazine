var nodeio = require('node.io');

//El dominio semilla se ingresa como argumento en CLI 
var domain = process.argv[3];
var subs = [''];
//Elementos de la URL de busqueda
var base_url = 'https://www.google.com';
var base_path = '/m/search?';
var base_query = 'site:' + domain;
//Expresión regular que haga fetch con un dominio/subdominio
var pattern = new RegExp('(\\w+):\\/\\/([\\w-.]+' + domain + ')');
var query = '';
//Máximo número de palabras que el motor de búsqueda admite en el query
const max_words = 32;
//Longitud máxima del URI
const max_uri = 2048;

//Tiempo de espera entre iteraciones de 5 segundos
//Tiempo de espera para la respuesta de 10 segundos
exports.job = new nodeio.Job({ wait: 5, timeout: 10 }, {
    //El job se ejecuta indefinidamente hasta que se presente una señal de exit
    input: true,
    run: function () {
        full_query = base_query + query;
        //50 resultados por página
        start_param = '&num=50&start=0';
        query_param = 'q=' + full_query;
        params = query_param + start_param;
        full_url = base_url + base_path + params;
        console.log('Query ' + full_url);

        if (subs.lenght > max_words) this.exit('Max words limit reached');
        if (full_url.length > max_uri) this.exit();

            this.getHtml(full_url, function (err, $) {
                var new_domain = false;
            if($('#resultStats').text == false) this.exit('No results');

            //Se obtiene el link del header de cada resultado 
                $('h3 a').each('href', function(href) {
                //Si el link coincide con el patrón de subdominio
                    if (href.match(pattern))
                    {
                        link = href.match(pattern)[2];
                    //Si el link no se encuentra en el arreglo existente
                        if(subs.indexOf(link) == -1)
                        {
                            new_domain = true;
                            console.log('New domain found: ' + link);
                            query += '+-site:' + link;
                            subs.push(link);
                        }
                    }
                });
            //Si no se encuentran subdominios nuevos en la última iteración
                if (new_domain == false) this.exit('No new domains found');
                this.emit();
            });
    }
});