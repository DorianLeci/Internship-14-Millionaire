import { Question } from "./Question.js";
import { Answer } from "./Answer.js";

export const questions = [
  new Question("Which country has the highest population in the world?", [
    new Answer("India", false),
    new Answer("USA", false),
    new Answer("China", true),
    new Answer("Russia", false),
  ]),

  new Question("How many continents are there on Earth?", [
    new Answer("5", false),
    new Answer("6", false),
    new Answer("7", true),
    new Answer("8", false),
  ]),

  new Question("Which planet is closest to the Sun?", [
    new Answer("Venus", false),
    new Answer("Mercury", true),
    new Answer("Mars", false),
    new Answer("Jupiter", false),
  ]),

  new Question("Which is the largest ocean on Earth?", [
    new Answer("Atlantic", false),
    new Answer("Indian", false),
    new Answer("Pacific", true),
    new Answer("Arctic", false),
  ]),

  new Question("How many days are in a leap year?", [
    new Answer("365", false),
    new Answer("366", true),
    new Answer("364", false),
    new Answer("360", false),
  ]),

  new Question("What does React use to efficiently update the DOM?", [
    new Answer("Shadow DOM", false),
    new Answer("Virtual DOM", true),
    new Answer("Real DOM Cache", false),
    new Answer("HTML Diff Engine", false),
  ]),

  new Question("Which is the smallest country in the world?", [
    new Answer("Monaco", false),
    new Answer("Vatican City", true),
    new Answer("San Marino", false),
    new Answer("Malta", false),
  ]),

  new Question("What is the chemical symbol for gold?", [
    new Answer("Ag", false),
    new Answer("Au", true),
    new Answer("Fe", false),
    new Answer("Zn", false),
  ]),

  new Question("Which is the largest mammal on Earth?", [
    new Answer("Elephant", false),
    new Answer("Blue Whale", true),
    new Answer("Giraffe", false),
    new Answer("Rhinoceros", false),
  ]),

  new Question("Which is the longest river in the world?", [
    new Answer("Amazon", false),
    new Answer("Nile", true),
    new Answer("Danube", false),
    new Answer("Mississippi", false),
  ]),

  new Question("How many players are on a soccer team on the field?", [
    new Answer("9", false),
    new Answer("10", false),
    new Answer("11", true),
    new Answer("12", false),
  ]),

  new Question("Which is the largest planet in the Solar System?", [
    new Answer("Saturn", false),
    new Answer("Jupiter", true),
    new Answer("Neptune", false),
    new Answer("Mars", false),
  ]),

  new Question("Which HTML tag is used to create a hyperlink?", [
    new Answer("<div>", false),
    new Answer("<a>", true),
    new Answer("<p>", false),
    new Answer("<span>", false),
  ]),

  new Question("Which number is the smallest prime number greater than 10?", [
    new Answer("11", true),
    new Answer("13", false),
    new Answer("17", false),
    new Answer("19", false),
  ]),

  new Question("Which country is shaped like a boot?", [
    new Answer("Spain", false),
    new Answer("Italy", true),
    new Answer("Greece", false),
    new Answer("Portugal", false),
  ]),

  new Question("Which is the fastest land animal?", [
    new Answer("Lion", false),
    new Answer("Cheetah", true),
    new Answer("Tiger", false),
    new Answer("Horse", false),
  ]),

  new Question("What is the capital of France?", [
    new Answer("Lyon", false),
    new Answer("Paris", true),
    new Answer("Marseille", false),
    new Answer("Nice", false),
  ]),

  new Question("Which instrument is used to measure temperature?", [
    new Answer("Barometer", false),
    new Answer("Thermometer", true),
    new Answer("Hygrometer", false),
    new Answer("Voltmeter", false),
  ]),

  new Question("Which is the largest continent?", [
    new Answer("Europe", false),
    new Answer("Africa", false),
    new Answer("Asia", true),
    new Answer("Australia", false),
  ]),

  new Question("Which number is written as 101 in binary?", [
    new Answer("3", false),
    new Answer("4", false),
    new Answer("5", true),
    new Answer("6", false),
  ]),

  new Question("Which CSS property changes the text color?", [
    new Answer("background", false),
    new Answer("font-style", false),
    new Answer("color", true),
    new Answer("border", false),
  ]),

  new Question("Which is the largest island in the world?", [
    new Answer("Madagascar", false),
    new Answer("Greenland", true),
    new Answer("Iceland", false),
    new Answer("Borneo", false),
  ]),

  new Question("How many hours are in a day?", [
    new Answer("12", false),
    new Answer("18", false),
    new Answer("24", true),
    new Answer("48", false),
  ]),

  new Question("What is the chemical formula for water?", [
    new Answer("CO2", false),
    new Answer("H2O", true),
    new Answer("O2", false),
    new Answer("NaCl", false),
  ]),

  new Question("Which framework uses JSX?", [
    new Answer("Angular", false),
    new Answer("React", true),
    new Answer("Vue", false),
    new Answer("Laravel", false),
  ]),

  new Question("Which planet is known as the Red Planet?", [
    new Answer("Mars", true),
    new Answer("Jupiter", false),
    new Answer("Venus", false),
    new Answer("Saturn", false),
  ]),

  new Question(
    "Which of these animals is capable of regenerating entire body parts?",
    [
      new Answer("Elephant", false),
      new Answer("Starfish", true),
      new Answer("Giraffe", false),
      new Answer("Kangaroo", false),
    ],
  ),

  new Question(
    "Which data structure uses First-In-First-Out (FIFO) principle?",
    [
      new Answer("Stack", false),
      new Answer("Queue", true),
      new Answer("Tree", false),
      new Answer("Graph", false),
    ],
  ),

  new Question("Which is the largest organ in the human body?", [
    new Answer("Heart", false),
    new Answer("Liver", false),
    new Answer("Skin", true),
    new Answer("Lungs", false),
  ]),

  new Question("Which mathematician is known as the father of geometry?", [
    new Answer("Euclid", true),
    new Answer("Pythagoras", false),
    new Answer("Archimedes", false),
    new Answer("Newton", false),
  ]),

  new Question("In which country was paper invented?", [
    new Answer("Egypt", false),
    new Answer("China", true),
    new Answer("Greece", false),
    new Answer("India", false),
  ]),

  new Question("What is the square root of 256?", [
    new Answer("14", false),
    new Answer("16", true),
    new Answer("18", false),
    new Answer("20", false),
  ]),

  new Question("Which gas is most abundant in Earth's atmosphere?", [
    new Answer("Oxygen", false),
    new Answer("Nitrogen", true),
    new Answer("Carbon Dioxide", false),
    new Answer("Hydrogen", false),
  ]),
];
