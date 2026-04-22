const addBtn = document.getElementById("addBtn");
const popup = document.querySelector(".popup-box");
const closeBtn = document.getElementById("close");
const saveBtn = document.getElementById("saveBtn");
const title = document.getElementById("title");
const desc = document.getElementById("desc");
const wrapper = document.querySelector(".wrapper");

let notes = JSON.parse(localStorage.getItem("notes") || "[]");

// Show popup
addBtn.onclick = () => popup.style.display = "flex";

// Close popup
closeBtn.onclick = () => popup.style.display = "none";

// Save note
saveBtn.onclick = () => {
    if(title.value === "" || desc.value === "") return;

    let note = {
        title: title.value,
        desc: desc.value,
        date: new Date().toLocaleDateString()
    };

    notes.push(note);
    localStorage.setItem("notes", JSON.stringify(notes));

    popup.style.display = "none";
    title.value = "";
    desc.value = "";

    showNotes();
};

// Show notes
function showNotes(){
    document.querySelectorAll(".note").forEach(n => n.remove());

    notes.forEach((n, index) => {
        let li = document.createElement("li");
        li.className = "note";

        li.innerHTML = `
            <div>
                <p>${n.title}</p>
                <span>${n.desc}</span>
            </div>

            <div class="bottom-content">
                <span>${n.date}</span>
                <div class="settings">
                    <i class="uil uil-ellipsis-h"></i>
                    <ul class="menu">
                        <li onclick="editNote(${index})">Edit</li>
                        <li onclick="deleteNote(${index})">Delete</li>
                    </ul>
                </div>
            </div>
        `;

        // Toggle menu
        li.querySelector(".settings i").onclick = (e) => {
            let menu = e.target.nextElementSibling;
            menu.style.display = menu.style.display === "block" ? "none" : "block";
        };

        wrapper.appendChild(li);
    });
}

// Delete note
function deleteNote(index){
    notes.splice(index,1);
    localStorage.setItem("notes", JSON.stringify(notes));
    showNotes();
}

// Edit note
function editNote(index){
    popup.style.display = "flex";
    title.value = notes[index].title;
    desc.value = notes[index].desc;

    deleteNote(index);
}

// Load notes on start
showNotes();