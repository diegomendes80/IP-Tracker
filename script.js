// script.js

document.getElementById('submit-btn').addEventListener('click', function() {
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
            document.getElementById('location').textContent = (data.city ? data.city + ', ' : '') + (data.region ? data.region + ', ' : '') + (data.country || 'Não disponível');
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
    // Sua chave da API Here
    const platform = new H.service.Platform({
        'apikey': 'hrn:here:authorization::org873322248:project/iptracker'  
    });

    // Criando o mapa
    const map = platform.createMap({
        'container': 'map',  // ID do elemento do mapa
        'center': { lat: position.lat, lng: position.lng },  // Coordenadas obtidas
        'zoom': 14  // Nível de zoom
    });

    // Adicionando marcador no mapa
    const marker = new H.map.Marker({ lat: position.lat, lng: position.lng });
    map.addObject(marker);
}
