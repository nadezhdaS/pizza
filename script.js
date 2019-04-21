const buttonLoad = document.getElementById('load');
const divWaiting = document.getElementById('waiting');
const divPizza = document.getElementById('pizza');

function addWaiting() {
    divWaiting.style.display = 'block';
    buttonLoad.className = 'loading';
    divPizza.style.display = 'none';
}

function removeWaiting() {
    buttonLoad.classList.remove('loading');
    divWaiting.style.display = 'none';
    divPizza.style.display = 'block';
}

function deleteCuts() {
    while (divPizza.childNodes.length > 2) {
        divPizza.removeChild(divPizza.lastChild);
    }
}

function drawPizza(eaters) {
    deleteCuts();
    let numberOfCuts = eaters / 2;
    for (let i = 1; i <= numberOfCuts; i++) {
        let rotation = 180 / numberOfCuts;
        let deg = rotation * i;
        let divCut = document.createElement('div');
        divCut.className = "cuts";
        divCut.style.transform = 'rotate(' + deg + 'deg)'
        divPizza.appendChild(divCut);
    }
};

function drawInfo(allParticipants, eaters) {
    let divPartyInfo = document.createElement('div');
    divPartyInfo.innerHTML = 'A number of party participants: <b>' + allParticipants + '</b><br>Pizza eaters: <b>' + eaters + '</b>';
    divPartyInfo.className = 'partyInfo';
    divPizza.appendChild(divPartyInfo);
}

function getParticipants() {
    addWaiting();
    fetch('https://gp-js-test.herokuapp.com/pizza')
        .then(
            function (response) {
                if (response.status !== 200) {
                    console.log('Looks like there was a problem. Status Code: ' + response.status);
                    return;
                }
                response.json().then(function (data) {
                    let participants = data.party;
                    let numberOfParticipants = data.party.length + 1;
                    let amountOfEaters = 0;
                    participants.forEach(element => {
                        if (element.eatsPizza === true) {
                            amountOfEaters++;
                        }
                    });
                    drawPizza(amountOfEaters);
                    drawInfo(numberOfParticipants, amountOfEaters);
                    removeWaiting();
                });
            }
        )
        .catch(function (err) {
            removeWaiting();
            console.log('Error', err);
        });

}

buttonLoad.addEventListener("click", getParticipants);