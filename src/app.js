import faker from 'faker';

function genFakerStuff() {
  const randomName = faker.name.findName();
  const address = faker.address.secondaryAddress();

  return {
    randomName,
    address,
  };
}

function createPerson({ randomName, address }) {
  const nameNode = document.createElement('p');
  nameNode.innerText = randomName;

  const addressNode = document.createElement('p');
  addressNode.innerText = address;

  const arr = [nameNode, addressNode];
  arr.forEach(el => document.body.appendChild(el));
}

// create random people
let num = 0;
while (num !== 10) {
  createPerson(genFakerStuff());
  num += 1;
}
