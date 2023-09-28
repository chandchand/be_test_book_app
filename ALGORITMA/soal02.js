
console.log(`SOAL NO 2 Diberikan contoh sebuah kalimat, silahkan cari kata terpanjang dari kalimat tersebut, jika ada kata dengan panjang yang sama silahkan ambil salah satu`);

function longest(sentence){
    const split = sentence.split(' ')
    var n = 0
    
    for (var i = 0; i < split.length; i++) {
        if (split[i].length >= n){
             sentence = split[i]
             n = split[i].length
        }
    }
    return sentence
}

const sentence = longest("Saya sangat senang mengerjakan soal algoritma")
console.log("JAWABAN:");
console.log("kata terpanjang adalah =", sentence + " Jumlah = ", sentence.length);