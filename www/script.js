function getWordOfTheDay() {
    $.get("/mot", (data) => {
        document.getElementById("wordOfDay").innerHTML = "Le mot du jour commence par la lettre " + data[0] + " , et ça longueur est " + data.length
    })
}

function login_index() {
    username = localStorage.getItem("username")
    correct = localStorage.getItem("correct")
    attempt = localStorage.getItem("attempt")

    if (username != null & score != null) {
        document.getElementById("username").innerHTML = username + " !"
        document.getElementById("score_label").hidden = false
        document.getElementById("score").innerHTML = (parseInt(correct)/parseInt(attempt)).toFixed(2)
        document.getElementById("score").hidden = false
        document.getElementById("logout_button").hidden = false
        document.getElementById("login_button").hidden = true
    }
    else {
        window.location.replace("/login.html");
    }
}

function printVerdict() {
    $.get("/mot", (data) => {
        document.getElementById('verdict').innerHTML = check(document.getElementById('word').value, data)
    })
}

function check(word, data) {
    correct = localStorage.getItem("correct")
    attempt = localStorage.getItem("attempt")
    if (attempt != null) {
        localStorage.setItem("attempt", parseInt(attempt) + 1)
    }
    if (word == data) {
        document.getElementById('verdict').style.backgroundColor = "lightgreen"
        document.getElementById('verdict').style.color = "green"
        if (correct != null) {
            localStorage.setItem("correct", parseInt(correct) + 1)
            document.getElementById("score").innerHTML = (parseInt(correct)/(parseInt(attempt)+1)).toFixed(2)
        }
        return "Good Job !"
    }
    if (correct != null) {

        document.getElementById("score").innerHTML = (parseInt(correct)/(parseInt(attempt)+1)).toFixed(2)
    }
    document.getElementById('verdict').style.color = "red"
    document.getElementById('verdict').style.backgroundColor = "lightcoral"
    return "Try again!"
}

function login() {
    username = document.getElementById('username').value
    localStorage.setItem("username", username)
    localStorage.setItem("correct", 0)
    localStorage.setItem("attempt", 0)
    window.location.replace("/index.html");
}
function logout() {
    localStorage.removeItem("username")
    localStorage.removeItem("correct")
    localStorage.removeItem("attempt")
    document.getElementById("username").innerHTML=""
    document.getElementById("score").hidden = true
    document.getElementById("score_label").hidden = true
    document.getElementById("login_button").hidden = false
    document.getElementById("logout_button").hidden = true

}
