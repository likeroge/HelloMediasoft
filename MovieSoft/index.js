alert(`Количество фильмов для анализа: ${films.length}`);

//VARs for count
let totalAge = 0;
let totalActorsFilmsWOoscar = 0;

//CONSTs - ARRs
const budgetArr = [];
const actorsOf1995=[];
const withTomHanks = [];
const filmsAfter1995 = films.filter((el)=>el.creationYear>1995);;
const filmsFromDirectorWOoscar = films.filter((el)=>!el.director.oscarsCount);
const filmsWithDirector70 = films.filter((el)=>el.director.age<70);

const testArr = [];

/////////////////////////////Actors who play with Tom Hanks////////////////////////////////

for(let i in filmsAfter1995){
    actorsOf1995.push(filmsAfter1995[i].actors.map((el)=>el.name));
}

for(let i in actorsOf1995){
    actorsOf1995[i].forEach((el)=>{
        if(el==="Tom Hanks"){
            for(k in actorsOf1995[i]){
                withTomHanks.push(actorsOf1995[i][k]);
            }
        }
    });
}

/////////////////////////////Budget array for films w/o Tom Hanks. Director age <70///////////////

//На уникальность актеров в новом массиве проверок не делал. Только для Хэнкса


for(let i in filmsWithDirector70){
    for(let k in filmsWithDirector70[i].actors){
        if(filmsWithDirector70[i].actors[k]!=="Tom Hanks"){
            filmsWithDirector70[i].budget.split('').join('')
            budgetArr.push(+(filmsWithDirector70[i].budget.split(' ').join('').substring(1)));
            break;
        }
    }
    
}

//////////////////////////////Av age of actors of films where Director w/o Oscar/////////////////////

//На уникальность актера для подсчета среднего возраста проверки не делал

for(let i in filmsFromDirectorWOoscar){
    for(let k in filmsFromDirectorWOoscar[i].actors){
        totalAge +=filmsFromDirectorWOoscar[i].actors[k].age;
        totalActorsFilmsWOoscar +=1;
    }
    
}


alert(`Средний возраст актеров: ${Math.round(totalAge/totalActorsFilmsWOoscar)}\n
Актеры которые играли с Томом Хэнксом после 1995 года: ${withTomHanks.filter(el=>el!=="Tom Hanks")}\n
Общий бюджет фильмов с режиссерами младше 70: ${budgetArr.reduce((prev,el)=>prev + el)}`);


