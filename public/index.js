'use strict';

//list of cars
//useful for ALL exercises
var cars = [{
  'id': 'p306',
  'vehicule': 'peugeot 306',
  'pricePerDay': 20,
  'pricePerKm': 0.10
}, {
  'id': 'rr-sport',
  'pricePerDay': 60,
  'pricePerKm': 0.30
}, {
  'id': 'p-boxster',
  'pricePerDay': 100,
  'pricePerKm': 0.45
}];

//list of rentals
//useful for ALL exercises
//The `price` is updated from exercice 1
//The `commission` is updated from exercice 3
//The `options` is useful from exercice 4
var rentals = [{
  'id': '1-pb-92',
  'driver': {
    'firstName': 'Paul',
    'lastName': 'Bismuth'
  },
  'carId': 'p306',
  'pickupDate': '2016-01-02',
  'returnDate': '2016-01-02',
  'distance': 100,
  'options': {
    'deductibleReduction': false
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '2-rs-92',
  'driver': {
    'firstName': 'Rebecca',
    'lastName': 'Solanas'
  },
  'carId': 'rr-sport',
  'pickupDate': '2016-01-05',
  'returnDate': '2016-01-09',
  'distance': 300,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}, {
  'id': '3-sa-92',
  'driver': {
    'firstName': ' Sami',
    'lastName': 'Ameziane'
  },
  'carId': 'p-boxster',
  'pickupDate': '2015-12-01',
  'returnDate': '2015-12-15',
  'distance': 1000,
  'options': {
    'deductibleReduction': true
  },
  'price': 0,
  'commission': {
    'insurance': 0,
    'assistance': 0,
    'drivy': 0
  }
}];

//list of actors for payment
//useful from exercise 5
var actors = [{
  'rentalId': '1-pb-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '2-rs-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}, {
  'rentalId': '3-sa-92',
  'payment': [{
    'who': 'driver',
    'type': 'debit',
    'amount': 0
  }, {
    'who': 'owner',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'insurance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'assistance',
    'type': 'credit',
    'amount': 0
  }, {
    'who': 'drivy',
    'type': 'credit',
    'amount': 0
  }]
}];

//list of rental modifcation
//useful for exercise 6
var rentalModifications = [{
  'rentalId': '1-pb-92',
  'returnDate': '2016-01-04',
  'distance': 150
}, {
  'rentalId': '3-sa-92',
  'pickupDate': '2015-12-05'
}];

//console.log(cars);
console.log(rentals);
console.log(actors);
//console.log(rentalModifications);



//Exercice 1

function  rentalPrice(){

for (var i=0; i<rentals.length; i++){  // For each price of rentals[] we look for the corresponding id in cars[]
  for (var j= 0; j<cars.length; j++){
       if (rentals[i].carId == cars[j].id){

         //the number of kilometers multiplied by the car's price per km
         var distance = cars[j].pricePerKm  * rentals[i].distance

         //Creating the Date Object
         var dte1 = new Date (rentals[i].pickupDate);
         var dte2 = new Date(rentals[i].returnDate);
         var nbJours = ((dte2 - dte1)/86400000) +1;
         //+1 : if the vehicle is rented in the morning and rendered in the evening, it is counted as one day


         //the number of rental days multiplied by the car's price per day
         var time = nbJours * cars[j].pricePerDay;

         //Exercice 2
         if (nbJours> 1 && nbJours<=4){

           time = nbJours * cars[j].pricePerDay*(1-0.1);
         }
         else if (nbJours>4 && nbJours <=10){

             time = nbJours * cars[j].pricePerDay*(1-0.3);
         }
         else if (nbJours>10){

             time = nbJours * cars[j].pricePerDay*(1-0.5);
         }


        rentals[i].price=distance+time;

        //Exercice3
        //Drivy take a 30% commission on the rental price to cover their costs.
        rentals[i].commission.insurance=((rentals[i].price)*(0.3)) /2; //half of commission
        rentals[i].commission.assistance=nbJours; //1€ per day
        rentals[i].commission.drivy=(rentals[i].commission.insurance) - (rentals[i].commission.assistance); //the rest

        //Exercice4: Deductible optional reduction (boolean)
        if (rentals[i].options.deductibleReduction==true){
          rentals[i].price=rentals[i].price+ 4 * nbJours;
          //The additional charge goes to drivy, not to the car owner
          rentals[i].commission.drivy=rentals[i].commission.drivy+ 4 * nbJours;

        }
       }
  }
}

}
rentalPrice();

function payment(){

  for (var z=0; z<actors.length; z++){
    for (var i= 0; i<rentals.length; i++){
      if (actors[z].rentalId == rentals[i].id){
        for (var j= 0; j<cars.length; j++){
          if (rentals[i].carId == cars[j].id){


        var distance = cars[j].pricePerKm  * rentals[i].distance

        var dte1 = new Date (rentals[i].pickupDate);
        var dte2 = new Date(rentals[i].returnDate);
        var nbJours = ((dte2 - dte1)/86400000) +1;


        var time = nbJours * cars[j].pricePerDay;

         //the driver must pay the rental price
         actors[z].payment[0].amount = time+distance;

         //the owner receives the rental price minus the commission
         actors[z].payment[1].amount=(time+distance)-((time+distance)*0.3);

         //the insurance receives its part of the commission
         actors[z].payment[2].amount= ((time+distance)*(0.3)) /2;

         //the assistance receives its part of the commission
         actors[z].payment[3].amount= nbJours;

         //drivy receives its part of the commission, plus the deductible reduction
         actors[z].payment[4].amount=(actors[z].payment[2].amount) - (actors[z].payment[3].amount);


         if (rentals[i].options.deductibleReduction==true){

           //the driver must pay the (optional) deductible reduction
           actors[z].payment[0].amount = actors[z].payment[0].amount+ 4 * nbJours;
           //The additional charge goes to drivy, not to the car owner
           actors[z].payment[4].amount=actors[z].payment[4].amount+4*nbJours;
         }
         }

       }
    }
  }
}
}
payment();
