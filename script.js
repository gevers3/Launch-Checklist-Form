// Write your JavaScript code here!

window.addEventListener("load", function() {
   let form = document.getElementById("formSubmitForm");
   form.addEventListener("submit", function(event) {
      event.preventDefault();
      let pilotNameInput = document.querySelector("input[name=pilotName]");
      let copilotNameInput = document.querySelector("input[name=copilotName]");
      let fuelLevelInput = document.querySelector("input[name=fuelLevel]");
      let cargoMassInput = document.querySelector("input[name=cargoMass]");
      // If the user leaves any field blank:
      if (pilotNameInput.value === "" || copilotNameInput.value === "" || fuelLevelInput.value === "" || cargoMassInput.value === "") {
         alert("All fields are required!");
      }
      // If the user doesn't enter a letter:
      if (!/^[a-zA-Z]*$/g.test(pilotNameInput.value)) {
         alert("Names need to be entered as letters.");
      }
      if (!/^[a-zA-Z]*$/g.test(copilotNameInput.value)) {
         alert("Names need to be entered as letters.");
      }
      // When the user doesn't enter a positive number for Fuel Level or Cargo Mass, throw an error message:
      if (isNaN(fuelLevelInput.value) || fuelLevelInput.value < 0) {
         alert("Fuel Level needs to be entered as a positive number.");
      }
      if (isNaN(cargoMassInput.value) || cargoMassInput.value < 0) {
         alert("Cargo Mass needs to be entered as a positive number.");
      }
      // If user enters a fuel level that is 10,000 or more and a cargo mass that is 10000 or less:
      if (fuelLevelInput.value >= 10000 && cargoMassInput.value <= 10000) {
         const faultyDivGood = document.getElementById('faultyItemsHidden');
         faultyDivGood.innerHTML = `
         <ol>
         <li id="pilotStatus">Pilot ${pilotNameInput.value} is ready for launch</li>
         <li id="copilotStatus">Co-pilot ${copilotNameInput.value} is ready for launch</li>
         <li id="fuelStatus">Fuel level high enough for launch.</li>
         <li id="cargoStatus">Cargo mass low enough for launch</li>
         </ol>
         `;
         const launchStatusDivGood = document.getElementById('launchStatus');
         launchStatusDivGood.innerHTML = `Shuttle is ready for launch`;
         launchStatusDivGood.setAttribute("id", "textGreen");
         document.getElementById("faultyItemsHidden").setAttribute("id", "faultyItemsVisible");
      }
      // If user enters a fuel level that is less than 10,000 liters:
      if (fuelLevelInput.value < 10000) {
         const faultyDiv = document.getElementById('faultyItemsHidden');
         faultyDiv.innerHTML = `
         <ol>
         <li id="pilotStatus">Pilot ${pilotNameInput.value} is ready for launch</li>
         <li id="copilotStatus">Co-pilot ${copilotNameInput.value} is ready for launch</li>
         <li id="fuelStatus">Not enough fuel for the journey.</li>
         <li id="cargoStatus">Cargo mass low enough for launch.</li>
         </ol>
         `;
         const launchStatusDiv = document.getElementById('launchStatus');
         launchStatusDiv.innerHTML = `Shuttle not ready for launch`;
         launchStatusDiv.setAttribute("id", "textRed");
         document.getElementById("faultyItemsHidden").setAttribute("id", "faultyItemsVisible");
         // document.getElementById("formSubmitForm").reset();
      }
      // If user enters a cargo mass that is more than 10,000 liters:
      if (cargoMassInput.value > 10000) {
         const faultyDivMass = document.getElementById('faultyItemsHidden');
         faultyDivMass.innerHTML = `
         <ol>
         <li id="pilotStatus">Pilot ${pilotNameInput.value} is ready for launch</li>
         <li id="copilotStatus">Co-pilot ${copilotNameInput.value} is ready for launch</li>
         <li id="fuelStatus">Fuel level high enough for launch.</li>
         <li id="cargoStatus">Too much mass for the shuttle to take off.</li>
         </ol>
         `;
         const launchStatusDivMass = document.getElementById('launchStatus');
         launchStatusDivMass.innerHTML = `Shuttle not ready for launch`;
         launchStatusDivMass.setAttribute("id", "textRed");
         document.getElementById("faultyItemsHidden").setAttribute("id", "faultyItemsVisible");
         // document.getElementById("formSubmitForm").reset();
      }
   }); // closes addEventListener
   fetch("https://handlers.education.launchcode.org/static/planets.json").then(function(response) {
      response.json().then(function(json) {
         const div = document.getElementById('missionTarget');
         div.innerHTML += `
               <h2>Mission Destination</h2>
                  <ol>
                     <li>Name: ${json[5].name}</li>
                     <li>Diameter: ${json[5].diameter}</li>
                     <li>Star: ${json[5].star}</li>
                     <li>Distance from Earth: ${json[5].distance}</li>
                     <li>Number of Moons: ${json[5].moons}</li>
                  </ol>
               <img src="${json[5].image}">
                  `;
      }); // response.json
   }); // closes fetch / json
}); //closes window load event

