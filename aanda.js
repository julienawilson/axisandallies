
//unitArray
//var allUnits =['infantry','artillery','tank','fighter','bomber','transport','destroyer','battleship','aircraftcarrier'];


//Variables from inputs
var nUnits = 0;
var chances = [];


//making the unit objects
function Unit(name, attack, defense, number){
    this.name = name;
    this.attack = attack/6;
    this.defense = defense/6;
    this.number = number;
};

var infantry = new Unit ('Infantry',1,2,0);
var artillery = new Unit ('Artillery',2,2,0);
var tank = new Unit ('Tank',3,3,0);
var fighter = new Unit ('Fighter',3,4,0);
var bomber = new Unit ('Bomber',4,1,0);
var transport = new Unit ('Transport',0,1,0);
var submarine = new Unit ('Submarine',2,2,0);
var destroyer = new Unit ('Destroyer',3,3,0);
var battleship = new Unit ('Battleship',4,4,0);
var aircraftcarrier = new Unit ('Aircraft Carrier',2,3,0);

//setting DOM elements
  //Attack DOM Elements
  var elTableA = document.getElementById('tabBodA');
  var elFormA = document.getElementById('formA');
  var elInfA = document.getElementById('infantryA');
  var elArtA = document.getElementById('artilleryA');
  var elTankA = document.getElementById('tankA');
  var elFtrA = document.getElementById('fighterA');
  var elBombA = document.getElementById('bomberA');
  var elTranA = document.getElementById('transportA');
  var elSubA = document.getElementById('submarineA');
  var elDesA = document.getElementById('destroyerA');
  var elBatA = document.getElementById('battleshipA');
  var elACA = document.getElementById('aircraftcarrierA');

  //Defense DOM Elements
  var elTableD = document.getElementById('tabBodD');
  var elNumb = document.getElementById('testNumber');
  var elFormD = document.getElementById('formD');
  var elInfD = document.getElementById('infantryD');
  var elArtD = document.getElementById('artilleryD');
  var elTankD = document.getElementById('tankD');
  var elFtrD = document.getElementById('fighterD');
  var elBombD = document.getElementById('bomberD');
  var elTranD = document.getElementById('transportD');
  var elSubD = document.getElementById('submarineD');
  var elDesD = document.getElementById('destroyerD');
  var elBatD = document.getElementById('battleshipD');
  var elACD = document.getElementById('aircraftcarrierD');

  //test DOM elements
  var elNumb = document.getElementById('testNumber');

//Attack Functions
  if(sessionStorage.chancesA){
    elInfA.setAttribute('value',sessionStorage.infantryA);
    elArtA.setAttribute('value',sessionStorage.artilleryA);
    elTankA.setAttribute('value',sessionStorage.tankA);
    elFtrA.setAttribute('value',sessionStorage.fighterA);
    elBombA.setAttribute('value',sessionStorage.bomberA);
    elTranA.setAttribute('value',sessionStorage.transportA);
    elSubA.setAttribute('value',sessionStorage.submarineA);
    elDesA.setAttribute('value',sessionStorage.destroyerA);
    elBatA.setAttribute('value',sessionStorage.battleshipA);
    elACA.setAttribute('value',sessionStorage.aircraftcarrierA);

    buildAttTable();
  };


  function buildAttTable (){
       infantry.number = sessionStorage.infantryA;
       artillery.number	=	sessionStorage.artilleryA;
       tank.number	=	sessionStorage.tankA;
       fighter.number	=	sessionStorage.fighterA;
       bomber.number	=	sessionStorage.bomberA;
       transport.number	=	sessionStorage.transportA;
       submarine.number	=	sessionStorage.submarineA;
       destroyer.number	=	sessionStorage.destroyerA;
       battleship.number	=	sessionStorage.battleshipA;
       aircraftcarrier.number	=	sessionStorage.aircraftcarrierA;



       nUnits = Number(infantry.number) +
                Number(artillery.number) +
                Number(tank.number) +
                Number(fighter.number) +
                Number(bomber.number) +
                Number(transport.number) +
                Number(submarine.number) +
                Number(destroyer.number) +
                Number(battleship.number) +
                Number(aircraftcarrier.number);

        //setting chances
          chances = [];

          for (i=0;i<infantry.number;i++){
            chances[chances.length]= infantry.attack;
          };
          for (i=0;i<artillery.number;i++){
            chances[chances.length]= artillery.attack;
          };
          for (i=0;i<tank.number;i++){
            chances[chances.length]= tank.attack;
          };
          for (i=0;i<fighter.number;i++){
            chances[chances.length]= fighter.attack;
          };
          for (i=0;i<bomber.number;i++){
            chances[chances.length]= bomber.attack;
          };
          for (i=0;i<transport.number;i++){
            chances[chances.length]= transport.attack;
          };
          for (i=0;i<submarine.number;i++){
            chances[chances.length]= submarine.attack;
          };
          for (i=0;i<destroyer.number;i++){
            chances[chances.length]= destroyer.attack;
          };
          for (i=0;i<battleship.number;i++){
            chances[chances.length]= battleship.attack;
          };
          for (i=0;i<aircraftcarrier.number;i++){
            chances[chances.length]= aircraftcarrier.attack;
          };

          sessionStorage.chancesA=chances[0];

      //Calculate all the probabilities
      //Build the matrix to hold them
      //build RC
      var RC=[];

      for(i=0;i<chances.length;i++){
         RC[i]=[];
         for(j=0;j<2*Math.pow(2,i);j++){
           RC[i][j]=[];
         };
      };

      //Calculate probs and Fill the matrix
      for(i=0;i<RC.length;i++){
        var k=0;
          if(i===0){
            RC[i][0]=[1,chances[i]];
            RC[i][1]=[0,1-chances[i]];
          }else{
            for(j=0;j<RC[i].length;j+=2){

              RC[i][j]=[RC[i-1][k][0]+1,RC[i-1][k][1]*chances[i]];
              RC[i][j+1]=[RC[i-1][k][0],RC[i-1][k][1]*(1-chances[i])];
              k=k+1;
            };
          };
      };

      //build the table with final probabilities
      //this is the last row of the big array
      var col = Number(RC.length)-1;

      var final=[];

      for(i=0;i<=chances.length;i++){
         final[i]=[i,0];
         };

      //fill the final table
      for(i=0;i<=chances.length;i++){
        for (j=0; j<RC[col].length;j++){
          if(RC[col][j][0]===i){
            final[i][1]=final[i][1]+RC[col][j][1];
            };
          };
        };

      //print the table
      for(i=0; i <=chances.length; i++){
          var newTr = document.createElement('tr');
          var newTd1 = document.createElement('td');
          var newTd2 = document.createElement('td');
          var newText1 = document.createTextNode(final[i][0]);
          var newText2 = document.createTextNode((100*final[i][1]).toFixed(2)+' %');
          newTr.appendChild(newTd1);
          newTr.appendChild(newTd2);
          newTd1.appendChild(newText1);
          newTd2.appendChild(newText2);
          elTableA.appendChild(newTr);
          };

    elNumb.textContent = sessionStorage.infantryA;
    };


  //Attack Submit
  function getAttack(){
    //clear table
    elTableA.innerHTML = "";

    //getting numbers from the form
     sessionStorage.infantryA = elInfA.value;
     sessionStorage.artilleryA	=	elArtA.value;
     sessionStorage.tankA	=	elTankA.value;
     sessionStorage.fighterA	=	elFtrA.value;
     sessionStorage.bomberA	=	elBombA.value;
     sessionStorage.transportA	=	elTranA.value;
     sessionStorage.submarineA	=	elSubA.value;
     sessionStorage.destroyerA	=	elDesA.value;
     sessionStorage.battleshipA	=	elBatA.value;
     sessionStorage.aircraftcarrierA	=	elACA.value;

     buildAttTable();
   };




//Defense Functions
  if(sessionStorage.chancesD){
    elInfD.setAttribute('value',sessionStorage.infantryD);
    elArtD.setAttribute('value',sessionStorage.artilleryD);
    elTankD.setAttribute('value',sessionStorage.tankD);
    elFtrD.setAttribute('value',sessionStorage.fighterD);
    elBombD.setAttribute('value',sessionStorage.bomberD);
    elTranD.setAttribute('value',sessionStorage.transportD);
    elSubD.setAttribute('value',sessionStorage.submarineD);
    elDesD.setAttribute('value',sessionStorage.destroyerD);
    elBatD.setAttribute('value',sessionStorage.battleshipD);
    elACD.setAttribute('value',sessionStorage.aircraftcarrierD);

    buildDefTable();
  };


  function buildDefTable (){
       infantry.number = sessionStorage.infantryD;
       artillery.number	=	sessionStorage.artilleryD;
       tank.number	=	sessionStorage.tankD;
       fighter.number	=	sessionStorage.fighterD;
       bomber.number	=	sessionStorage.bomberD;
       transport.number	=	sessionStorage.transportD;
       submarine.number	=	sessionStorage.submarineD;
       destroyer.number	=	sessionStorage.destroyerD;
       battleship.number	=	sessionStorage.battleshipD;
       aircraftcarrier.number	=	sessionStorage.aircraftcarrierD;



       nUnits = Number(infantry.number) +
                Number(artillery.number) +
                Number(tank.number) +
                Number(fighter.number) +
                Number(bomber.number) +
                Number(transport.number) +
                Number(submarine.number) +
                Number(destroyer.number) +
                Number(battleship.number) +
                Number(aircraftcarrier.number);

        //setting chances
          chances = [];

          for (i=0;i<infantry.number;i++){
            chances[chances.length]= infantry.defense;
          };
          for (i=0;i<artillery.number;i++){
            chances[chances.length]= artillery.defense;
          };
          for (i=0;i<tank.number;i++){
            chances[chances.length]= tank.defense;
          };
          for (i=0;i<fighter.number;i++){
            chances[chances.length]= fighter.defense;
          };
          for (i=0;i<bomber.number;i++){
            chances[chances.length]= bomber.defense;
          };
          for (i=0;i<transport.number;i++){
            chances[chances.length]= transport.defense;
          };
          for (i=0;i<submarine.number;i++){
            chances[chances.length]= submarine.defense;
          };
          for (i=0;i<destroyer.number;i++){
            chances[chances.length]= destroyer.defense;
          };
          for (i=0;i<battleship.number;i++){
            chances[chances.length]= battleship.defense;
          };
          for (i=0;i<aircraftcarrier.number;i++){
            chances[chances.length]= aircraftcarrier.defense;
          };

          sessionStorage.chancesD=chances[0];

      //Calculate all the probabilities
      //Build the matrix to hold them
      //build RC
      var RC=[];

      for(i=0;i<chances.length;i++){
         RC[i]=[];
         for(j=0;j<2*Math.pow(2,i);j++){
           RC[i][j]=[];
         };
      };

      //Calculate probs and Fill the matrix
      for(i=0;i<RC.length;i++){
        var k=0;
          if(i===0){
            RC[i][0]=[1,chances[i]];
            RC[i][1]=[0,1-chances[i]];
          }else{
            for(j=0;j<RC[i].length;j+=2){

              RC[i][j]=[RC[i-1][k][0]+1,RC[i-1][k][1]*chances[i]];
              RC[i][j+1]=[RC[i-1][k][0],RC[i-1][k][1]*(1-chances[i])];
              k=k+1;
            };
          };
      };

      //build the table with final probabilities
      //this is the last row of the big array
      var col = Number(RC.length)-1;

      var final=[];

      for(i=0;i<=chances.length;i++){
         final[i]=[i,0];
         };

      //fill the final table
      for(i=0;i<=chances.length;i++){
        for (j=0; j<RC[col].length;j++){
          if(RC[col][j][0]===i){
            final[i][1]=final[i][1]+RC[col][j][1];
            };
          };
        };

      //print the table
      for(i=0; i <=chances.length; i++){
          var newTr = document.createElement('tr');
          var newTd1 = document.createElement('td');
          var newTd2 = document.createElement('td');
          var newText1 = document.createTextNode(final[i][0]);
          var newText2 = document.createTextNode((100*final[i][1]).toFixed(2)+' %');
          newTr.appendChild(newTd1);
          newTr.appendChild(newTd2);
          newTd1.appendChild(newText1);
          newTd2.appendChild(newText2);
          elTableD.appendChild(newTr);
          };

    elNumb.textContent = sessionStorage.infantryD;
    };


  //Defense Submit
  function getDefense(){
    //clear table
    elTableD.innerHTML = "";

    //getting numbers from the form
     sessionStorage.infantryD = elInfD.value;
     sessionStorage.artilleryD	=	elArtD.value;
     sessionStorage.tankD	=	elTankD.value;
     sessionStorage.fighterD	=	elFtrD.value;
     sessionStorage.bomberD	=	elBombD.value;
     sessionStorage.transportD	=	elTranD.value;
     sessionStorage.submarineD	=	elSubD.value;
     sessionStorage.destroyerD	=	elDesD.value;
     sessionStorage.battleshipD	=	elBatD.value;
     sessionStorage.aircraftcarrierD	=	elACD.value;

     buildDefTable();
   };
