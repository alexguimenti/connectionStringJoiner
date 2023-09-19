var convertBtn = document.querySelector('.convert-button');
var fullText = document.querySelector('.URL-input');
var selectedDatabase = document.querySelector('.db-input');
var button = document.querySelector('.copy-button');
var connectionString = "";

convertBtn.addEventListener('click', () => {

    var text = `${fullText.value}`;
    var db = `${selectedDatabase.value}`;
    var { user, password } = getUserAndPassword(text);
    text = text.replace('<user>', user)
    text = text.replace('<password>', password)
    text = text.replace('<database>', db)
    connectionString = extractConnectionString(text)
    document.querySelector('.string-output').value = connectionString
});

button.addEventListener('click', copyInputValueToClipboard);

function getUserAndPassword(text) {
    const userRegex = /User:\s*(\S+)/;
    const passwordRegex = /Password:\s*(\S+)/;
    const userMatch = text.match(userRegex);
    const passwordMatch = text.match(passwordRegex);
    const user = userMatch ? userMatch[1] : null;
    const password = passwordMatch ? passwordMatch[1] : null;
    return { user, password };
}

function extractConnectionString(text) {
    const regex = /mongodb:\/\/\S+?(?=\sThis access is valid)/;
    const match = text.match(regex);
    return match ? match[0] : null;
}

function copyInputValueToClipboard() {
    const input = document.querySelector('.string-output'); // replace this with the selector for your input element
    input.select();
    document.execCommand('copy');
}