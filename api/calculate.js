export const calculateDayCaloriesLimit = (sex, age, active) => {

  let usrCal;

  if (sex == "m"){
    if (active == "sedentary"){
      if (age >= 2 && age <= 3){
        usrCal = 1000
      }
      if (age >= 4 && age <= 5){
        usrCal = 1200
      }
      if (age >= 6 && age <= 8){
        usrCal = 1400
      }
      if (age >= 9 && age <= 10){
        usrCal = 1600
      }
      if (age >= 11 && age <= 12){
        usrCal = 1800
      }
      if (age >= 13 && age <= 14){
        usrCal = 2000
      }
      if (age >= 15 && age <= 15){
        usrCal = 2200
      }
      if (age >= 16 && age <= 18){
        usrCal = 2400
      }
      if (age >= 19 && age <= 20){
        usrCal = 2600
      }
      if (age >= 21 && age <= 40){
        usrCal = 2400
      }
      if (age >= 41 && age <= 60){
        usrCal = 2200
      }
      if (age >= 61){
        usrCal = 2000
      }
    }
    if (active == "moderate"){
      if (age >= 2 && age <= 5){
        usrCal = 1000
      }
      if (age >= 6 && age <= 8){
        usrCal = 1600
      }
      if (age >= 9 && age <= 10){
        usrCal = 1800
      }
      if (age >= 11 && age <= 11){
        usrCal = 2000
      }
      if (age >= 12 && age <= 13){
        usrCal = 2200
      }
      if (age >= 14 && age <= 14){
        usrCal = 2400
      }
      if (age >= 15 && age <= 15){
        usrCal = 2600
      }
      if (age >= 16 && age <= 25){
        usrCal = 2800
      }
      if (age >= 26 && age <= 45){
        usrCal = 2600
      }
      if (age >= 46 && age <= 65){
        usrCal = 2400
      }
      if (age >= 66){
        usrCal = 2200
      }
    }
    if (active == "active"){
      if (age == 2){
        usrCal = 1000
      }
      if (age >= 3 && age <= 3){
        usrCal = 1400
      }
      if (age >= 4 && age <= 5){
        usrCal = 1600
      }
      if (age >= 6 && age <= 7){
        usrCal = 1800
      }
      if (age >= 8 && age <= 9){
        usrCal = 2000
      }
      if (age >= 10 && age <= 11){
        usrCal = 2200
      }
      if (age == 12){
        usrCal = 2400
      }
      if (age == 13){
        usrCal = 2600
      }
      if (age == 14){
        usrCal = 2800
      }
      if (age == 15){
        usrCal = 3000
      }
      if (age >= 16 && age <= 18){
        usrCal = 3200
      }
      if (age >= 19 && age <= 35){
        usrCal = 3000
      }
      if (age >= 36 && age <= 55){
        usrCal = 2800
      }
      if (age >= 56 && age <= 75){
        usrCal = 2600
      }
      if (age >= 76){
        usrCal = 2400
      }
    }
  }
  if (sex == "f"){
    if (active == "sedentary"){
      if (age >= 2 && age <= 3){
        usrCal = 1000
      }
      if (age >= 4 && age <= 7){
        usrCal = 1200
      }
      if (age >= 8 && age <= 10){
        usrCal = 1400
      }
      if (age >= 11 && age <= 13){
        usrCal = 1600
      }
      if (age >= 14 && age <= 18){
        usrCal = 1800
      }
      if (age >= 19 && age <= 25){
        usrCal = 2000
      }
      if (age >= 26 && age <= 50){
        usrCal = 1800
      }
      if (age >= 51){
        usrCal = 1600
      }
    }
    if (active == "moderate"){
      if (age == 2){
        usrCal = 1000
      }
      if (age == 3){
        usrCal = 1200
      }
      if (age >= 4 && age <= 6){
        usrCal = 1400
      }
      if (age >= 7 && age <= 9){
        usrCal = 1600
      }
      if (age >= 10 && age <= 11){
        usrCal = 1800
      }
      if (age >= 12 && age <= 18){
        usrCal = 2000
      }
      if (age >= 19 && age <= 25){
        usrCal = 2200
      }
      if (age >= 26 && age <= 50){
        usrCal = 2000
      }
      if (age >= 51){
        usrCal = 1800
      }
    }
    if (active = "active"){
      if (age == 2){
        usrCal = 1000
      }
      if (age >= 3 && age <= 4){
        usrCal = 1400
      }
      if (age >= 5 && age <= 6){
        usrCal = 1600
      }
      if (age >= 7 && age <= 9){
        usrCal = 1800
      }
      if (age >= 10 && age <= 11){
        usrCal = 2000
      }
      if (age >= 12 && age <= 13){
        usrCal = 2200
      }
      if (age >= 14 && age <= 30){
        usrCal = 2400
      }
      if (age >= 31 && age <= 60){
        usrCal = 2200
      }
      if (age >= 61){
        usrCal = 2000
      }
    }
  }
  return usrCal;
}
