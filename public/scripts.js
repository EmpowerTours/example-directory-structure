let token = null;
const map = L.map('map').setView([0, 0], 2);
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map);

function register() {
    fetch('/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: document.getElementById('username').value, password: document.getElementById('password').value })
    }).then(res => res.text()).then(alert);
}

function login() {
    fetch('/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username: document.getElementById('username').value, password: document.getElementById('password').value })
    }).then(res => res.json()).then(data => {
        token = data.token;
        document.getElementById('auth').style.display = 'none';
        document.getElementById('app').style.display = 'block';
        loadRocks();
    });
}

function loadRocks() {
    fetch('/rocks', { headers: { 'Authorization': token } })
        .then(res => res.json())
        .then(rocks => {
            rocks.forEach(rock => {
                L.marker([rock.lat, rock.lon], {
                    icon: L.divIcon({ html: `<span style="font-size: 30px;">${rock.emoji}</span>` })
                }).addTo(map);
            });
        });
}

function addRock() {
    navigator.geolocation.getCurrentPosition(pos => {
        fetch('/rocks/add-rock', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': token },
            body: JSON.stringify({ lat: pos.coords.latitude, lon: pos.coords.longitude, emoji: '🪨' })
        }).then(() => loadRocks());
    });
}

function verifyClimb() {
    const file = document.getElementById('climb-video').files[0];
    const reader = new FileReader();
    reader.onload = () => {
        fetch('/rocks/verify-climb', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': token },
            body: JSON.stringify({ rock_id: 1, video: reader.result }) // rock_id hardcoded for simplicity
        }).then(res => res.text()).then(result => document.getElementById('climb-result').innerText = result);
    };
    reader.readAsDataURL(file);
}
