
function saveConfiguration() {
    alert("Configuration Saved!"); // Replace with actual save logic
}
function toggleSection(sectionId) {
    const section = document.getElementById(sectionId);
    section.classList.toggle("hidden");
}

function toggleTokenOptions() {
    const isTokenBased = document.getElementById("tokenBased").checked;
    document.getElementById("tokenOptions").classList.toggle("hidden", !isTokenBased);
    document.getElementById("appointmentOptions").classList.toggle("hidden", isTokenBased);
}

 

function addHoliday() {
    const holidayDate = document.getElementById("holidayDate").value;
    const holidayList = document.getElementById("holidayList");
    const holidayReason = document.getElementById('holidayReason').value;

    if (!holidayDate) return alert("Please select a date!");

    // Prevent duplicates
    if ([...holidayList.children].some(li => li.textContent.includes(holidayDate))) {
        return alert("This holiday is already added.");
    }

    const li = document.createElement("li");
    li.innerHTML = `${holidayReason} - ${holidayDate} <span class="remove-btn" onclick="this.parentNode.remove()">Remove</span>`;
    
    holidayList.appendChild(li);
}


function addSession() {
    const sessionContainer = document.getElementById("sessionContainer");
    const newSession = document.createElement("div");
    newSession.classList.add("session-container");
    newSession.innerHTML = `
        <div class="form-group-session"><label>Start:</label> <input type="time"></div>
        <div class="form-group-session"><label>End:</label> <input type="time"></div>
        <div class="form-group-session"><label>Tokens:</label> <input type="number" placeholder="Max tokens"></div>
        <button class="remove-btn" onclick="this.parentNode.remove()"> Remove</button>
    `;
    sessionContainer.appendChild(newSession);
}

function addTimeSlot() {
    const container = document.getElementById("timeSlotsContainer");
    const slotDiv = document.createElement("div");
    slotDiv.classList.add("time-slot");

    const slotInput = document.createElement("input");
    slotInput.type = "time";
    slotDiv.appendChild(slotInput);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Remove";
    deleteBtn.onclick = () => slotDiv.remove();
    slotDiv.appendChild(deleteBtn);

    container.appendChild(slotDiv);
}


function openPopup() {
    document.getElementById("popup").style.display = "block";
    document.getElementById("overlay").style.display = "block";
}
function closePopup() {
    document.getElementById("popup").style.display = "none";
    document.getElementById("overlay").style.display = "none";
}