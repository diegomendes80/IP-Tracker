document.getElementById('submit-btn').addEventListener('click', function () {
    document.getElementById('map').innerHTML = ''; // Limpa o mapa
    const ipInput = document.getElementById('ip-input').value;
    

    if (ipInput === '') {
        alert('Por favor, insira um IP ou domínio');
        return;
    }

    // Requisição à API
    fetch(`https://ipinfo.io/${ipInput}/json?token=7ef00431b083a1`)
        .then(response => response.json())
        .then(data => {
            // Exibe as informações no HTML
            document.getElementById('ip-address').textContent = data.ip || 'Não disponível';
            document.getElementById('location').textContent = 
                (data.city ? data.city + ', ' : '') + 
                (data.region ? data.region + ', ' : '') + 
                (data.country || 'Não disponível');
            document.getElementById('timezone').textContent = data.timezone || 'Não disponível';
            document.getElementById('isp').textContent = data.org || 'Não disponível';

            // Obter as coordenadas para o mapa
            const [lat, lon] = data.loc.split(',');
            const position = { lat: parseFloat(lat), lng: parseFloat(lon) };

            // Inicializando o mapa do Here
            initMap(position);
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
            alert('Erro ao buscar informações. Tente novamente.');
        });
});

// Função para inicializar o mapa com Here Maps
function initMap(position) {
    // Plataforma do Here Maps
    const platform = new H.service.Platform({
        apikey: 'g9h794YRAE-cw3F4M5yML_5I0laAJBxV4OOIMXbnZq4' // Sua API Key válida
    });

    // Camada de tiles para o mapa
    const defaultLayers = platform.createDefaultLayers();

    // Instância do mapa
    const map = new H.Map(
        document.getElementById('map'),  // Elemento onde o mapa será renderizado
        defaultLayers.vector.normal.map, // Tipo de mapa
        {
            center: position, // Centralizar no local desejado
            zoom: 14,        // Nível de zoom inicial
            pixelRatio: window.devicePixelRatio || 1
        }
    );

    // Comportamento de interação no mapa
    const behavior = new H.mapevents.Behavior(new H.mapevents.MapEvents(map));

    // UI padrão do mapa
    const ui = H.ui.UI.createDefault(map, defaultLayers);

    // Adicionando marcador no mapa
    const marker = new H.map.Marker(position);
    map.addObject(marker);
}


document.querySelectorAll('.info__text').forEach(element => {
    element.style.setProperty('--char-count', element.textContent.length);
});
