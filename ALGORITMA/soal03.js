

console.log(`SOAL NO 3 Terdapat dua buah array yaitu array INPUT dan array QUERY, silahkan tentukan berapa kali kata dalam QUERY terdapat pada array INPUT`);

const INPUT = ['xc', 'dz', 'bbb', 'dz'];
const QUERY = ['bbb', 'ac', 'dz'];

const wordShow = {};

for (const words of INPUT) {
  if (wordShow[words]) {
    wordShow[words]++;
  } else {
    wordShow[words] = 1;
  }
}

const result = {};

for (const words of QUERY) {
  if (wordShow[words]) {
    result[words] = wordShow[words];
  } else {
    result[words] = 0;
  }
}

console.log("JAWABAN: ", result);
