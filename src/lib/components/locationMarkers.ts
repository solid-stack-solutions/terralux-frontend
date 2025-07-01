import * as L from 'leaflet';

const treeIcon = L.icon({
    iconUrl: 'icons/location-tree.svg',

    iconSize: [64, 64],
    iconAnchor: [32, 50],
});

const houseIcon = L.icon({
    iconUrl: 'icons/location-house.svg',

    iconSize: [64, 64],
    iconAnchor: [32, 50],
});

export { treeIcon, houseIcon };
