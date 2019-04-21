const buttonLoad = document.getElementById('load');
const divWaiting = document.getElementById('waiting');
const divPizza = document.getElementById('pizza');

function waiting(){
    divWaiting.style.display='block';
    buttonLoad.className = 'loading';
}

function cleaner(){
    let divCuts = document.querySelectorAll('.cuts');
    let partyInfo = document.querySelector('.partyInfo');
    divPizza.removeChild(partyInfo);
    divPizza.style.display='none';
    divCuts.forEach(item=>{
        divPizza.removeChild(item);
    })
}

function getParticipants() {
    fetch('https://gp-js-test.herokuapp.com/pizza')
    .then(
        function(response) {
            if (response.status !== 200) {
                console.log('Looks like there was a problem. Status Code: ' + response.status);
                return;
            }
            response.json().then(function(data) {
                let participants = data.party;
                let numberOfParticipants = data.party.length+1;
                let amountOfEaters = 0;
                participants.forEach(element => {
                    if(element.eatsPizza===true){
                        amountOfEaters++;
                    }
                });
                drawPizza (amountOfEaters, numberOfParticipants);
            });
        }
    )
    .catch(function(err) {
        console.log('Error', err);
    });

    buttonLoad.classList.remove('loading');
    divWaiting.style.display='none';
    divPizza.style.display='block';
}

function drawPizza (eaters, allParticipants){
    let numberOfCuts = eaters/2;
    for(let i=1; i<=numberOfCuts; i++){
        let rotation = 180/numberOfCuts;
        let deg =rotation*i;
        let divCut = document.createElement('div');
        divCut.className = "cuts";
        divCut.style.transform = 'rotate(' + deg+ 'deg)'
        divPizza.appendChild(divCut);
    }
    let divPartyInfo = document.createElement('div');
    divPartyInfo.innerHTML = 'A number of party participants: <b>' + allParticipants + '</b><br>Pizza eaters: <b>' + eaters + '</b>';
    divPartyInfo.className = 'partyInfo';
    divPizza.appendChild(divPartyInfo);
};

buttonLoad.addEventListener("click", cleaner);
buttonLoad.addEventListener("click", waiting);
buttonLoad.addEventListener("click", getParticipants);