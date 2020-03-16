export function sortContactsByName(contactA, contactB) {
    // A function that will be used in 'sort' method when sorting contacts array
    if (contactA.name > contactB.name) return 1;
    if (contactA.name === contactB.name) return 0;
    if (contactA.name < contactB.name) return -1;
}