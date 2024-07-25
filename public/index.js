const socket = io('/');

// Update the dropdowns for teams with the latest data
function updateTeamDropdowns() {
    socket.emit('crud', {
        action: 'read',
        model: 'team',
        options: {},
        selection: 'name tricode',
        population: ''
    }, (response) => {
        if (response.status === 'success') {
            const teamDropdowns = document.getElementsByClassName('team-dropdown');
            
            for (let i = 0; i < teamDropdowns.length; i++) {
                teamDropdowns[i].innerHTML = '<option value="">Select a team</option>';
                response.data.forEach((team) => {
                    const option = document.createElement('option');
                    option.value = team._id;
                    option.innerText = team.name;
                    teamDropdowns[i].appendChild(option);
                });
            }
        }
    });
}

// Create a new team in the database
document.getElementById('create-team').addEventListener('click', () => {
    const teamName = document.getElementById('team-name');
    const teamTricode = document.getElementById('team-tricode');

    socket.emit('crud', {
        action: 'create',
        model: 'team',
        data: {
            name: teamName.value,
            tricode: teamTricode.value
        }
    }, (response) => {
        if (response.status === 'success') {
            alert('Team created successfully');
            teamName.value = '';
            teamTricode.value = '';
            updateTeamDropdowns();
        } else {
            alert('Error creating team');
        }
    });
});

// Create a new player in the database
document.getElementById('create-player').addEventListener('click', () => {
    const playerName = document.getElementById('player-name');
    const playerNumber = document.getElementById('player-number');
    const team = document.getElementById('player-team');

    socket.emit('crud', {
        action: 'create',
        model: 'player',
        data: {
            name: playerName.value,
            number: playerNumber.value,
            team: team.value
        }
    }, (response) => {
        if (response.status === 'success') {
            alert('Player created successfully');
            playerName.value = '';
            playerNumber.value = '';
            team.value = '';
        } else {
            alert('Error creating player');
        }
    });
});

// Set loading action of the page
socket.on('loading', (loading) => {
    if (loading) {
        document.getElementById('loading').style.display = 'block';
    } else {
        document.getElementById('loading').style.display = 'none';
    }
});

updateTeamDropdowns();