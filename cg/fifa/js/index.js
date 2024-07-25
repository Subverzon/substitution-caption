const socket = io('/cg');
const bundle = 'fifa';
const page = 'substitution-caption';

// Listen for datalink events and update the data if the bundle and page match
socket.on('datalink', (arg) => {
    console.log(arg);
    if (arg.bundle === bundle && arg.page === page) {
        updateData(arg.data);
    }
})

// Load data from the server for the first time
const loadData = () => {
    socket.emit('read-data', {bundle: bundle, page: page}, (response) => {
        if (response.status === 'success') {
            const data = response.data;
            updateData(data);
        }
    });
}

// Load data from the server and animate the data
const loadAndAnimate = () => {
    socket.emit('read-data', {bundle: bundle, page: page}, (response) => {
        if (response.status === 'success') {
            const data = response.data;
            updateData(data);
            animation.animateIn();
        }
    });
}

// Update the data on the page for the caption
const updateData = (data) => {
    document.querySelector('.header-card .team-name').innerText = data.tricode;
    document.getElementById('substitution-time').innerText = data.time;
    document.getElementById('playerInNumber').innerText = data.playerIn.number;
    document.getElementById('playerInName').innerText = data.playerIn.name;
    document.getElementById('playerOutNumber').innerText = data.playerOut.number;
    document.getElementById('playerOutName').innerText = data.playerOut.name;
}

loadData();