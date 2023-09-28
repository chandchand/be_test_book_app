

console.log(`SOAL NO 4 Silahkan cari hasil dari pengurangan dari jumlah diagonal sebuah matrik NxN`);


const matrix = [[1, 2, 0], [4, 5, 6], [7, 8, 9]];


let diagonalPertama = 0;
let diagonalKedua = 0;

for (let i = 0; i < matrix.length; i++) {
  diagonalPertama += matrix[i][i]; 
  diagonalKedua += matrix[i][matrix.length - 1 - i]; 
}

const hasilPengurangan = diagonalPertama - diagonalKedua;

console.log("Diagonal Pertama:", diagonalPertama);
console.log("Diagonal Kedua:", diagonalKedua);
console.log("Hasil dari :",diagonalPertama, "-", diagonalKedua, " = ", hasilPengurangan);
