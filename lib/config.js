const fs = require('fs');
const path = require('path');

const Config = {
    // Read a configuration file
    read: (name) => {
        const file = path.join(__dirname, `../config/${name}.json`);
        if (fs.existsSync(file)) {
            return JSON.parse(fs.readFileSync(file, 'utf8'));
        } else {
            fs.writeFileSync(file, '{}');
        }
        return {};
    },
    // Write a configuration file
    write: (name, data) => {
        const file = path.join(__dirname, `../config/${name}.json`);
        fs.writeFileSync(file, JSON.stringify(data, null, 2));
        return data;
    },
    // Update data in a configuration file
    update: (name, data) => {
        const file = path.join(__dirname, `../config/${name}.json`);
        if (fs.existsSync(file)) {
            const config = fs.readFileSync(file, 'utf8');
            const json = JSON.parse(config);
            Object.assign(json, data);
            fs.writeFileSync(file, JSON.stringify(json, null, 2));
            return json;
        }
        return {};
    },
    // Delete data from a configuration file
    delete: (name, data) => {
        const file = path.join(__dirname, `../config/${name}.json`);
        if (fs.existsSync(file)) {
            const config = fs.readFileSync(file, 'utf8');
            const json = JSON.parse(config);
            delete json[data];
            fs.writeFileSync(file, JSON.stringify(json, null, 2));
            return json;
        }
        return {};
    },
    // Initialize the configuration directory
    initialize: () => {
        const dir = path.join(__dirname, `../config`);
        if (!fs.existsSync(dir)) {
            fs.mkdirSync(dir);
        }
    }
}

module.exports = Config;