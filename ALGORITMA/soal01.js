


console.log(`SOAL NO 1 Terdapat string "NEGIE1", silahkan reverse alphabet nya dengan angka tetap diakhir kata Hasil = "EIGEN1"`); 

function reverseString(string) {
    const splits = string.split(' ');

    const reversed = splits.map(split => {
        const alphabets = split.replace(/\d+/g, '');
        const number = split.match(/\d+/);

        const reversedAlphabets = alphabets.split('').reverse().join('');

        if (number) {
            return reversedAlphabets + number[0];
        } else {
            return reversedAlphabets // Balikkan karakter dalam kata
        }
    });

    const result = reversed.join(' '); // Gabungkan kata-kata dengan spasi
    return result;
}

const string = 'NEGIE1';
const _reversed = reverseString(string);

console.log("HASIL JAWABAN:", _reversed); // Output: "EIGEN1"
