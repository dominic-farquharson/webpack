import faker from 'faker';

const randomName = faker.name.findName();
const image = faker.random.image();
const address = faker.address.secondaryAddress();

const imageNode = document.createElement('img');
imageNode.src = image;

const nameNode = document.createElement('p');
nameNode.innerText = randomName;

const addressNode = document.createElement('p');
addressNode.innerText = address;

const arr = [nameNode, imageNode, addressNode];
arr.forEach(el => document.body.appendChild(el));

