const numbers = ['零','一','二','三','四','五','六','七','八','九','十'];
const bigNumbers = ['亿', '万', '千', '百', '十', '一'];
const nums = [ 100000000, 10000, 1000, 100, 10, 1];
const submitButton = document.querySelector('button');
const writeNumber = document.querySelector('#output');

function convertNumbersRecursive(number) {
    if(number >= 0 && number <= 10){
        return numbers[number]
    }
    let current = number;
    let out = [];
    let alreadyStarted = false;

    for( let [i, value] of nums.entries()) {
        if (current >= value) {
            alreadyStarted = true;
            let toSave = Math.floor(current/value);
            if (!(10 < current && current < 20)) {
                out.push(convertNumbersRecursive(toSave));
            }
            if (value !== 1) {
                out.push(bigNumbers[i]);
            }
            current = current % value;
        }
        else if (alreadyStarted) {
            out.push('零');
        }
    }
    return out.join('')
}

function convertNumbers(number)
{
    out = convertNumbersRecursive(number)
    out = out.replace(/零+/, '零');
    out = out.replace(/(^|[亿|万])二千/, '$1两千');
    out = out.replace(/(^|亿)二万/, '$1两万');

    if(out[out.length-1] === '零') {
        return out.slice(0, -1);
    }
    return out;
}

submitButton.addEventListener('click', function () {
    var toConvert = document.getElementById('arabicnumber').value;
    writeNumber.textContent = convertNumbers(toConvert);
});
