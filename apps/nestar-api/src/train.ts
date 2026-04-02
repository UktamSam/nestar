/*
ZK-TASK

Shunday function yozing, u har soniyada bir marta consolega 1 dan 5 gacha bolgan raqamlarni chop etsin va 5 soniyadan keyin ishini toxtatsin. 
MASALAN: printNumbers().
*/
function printNumbers(): void {
  let count = 1;

  const interval = setInterval(() => {
    console.log(count);
    count++;

    if (count > 5) {
      clearInterval(interval);
    }
  }, 1000);
}

printNumbers();

/*
ZJ-TASK

Shunday function yozing, u berilgan arrayni ichidagi numberlarni qiymatini hisoblab qaytarsin. MASALAN: reduceNestedArray([1, [1, 2, [4]]]) return 8.
*/
// type NestedNumberArray = (number | NestedNumberArray)[];
// function reduceNestedArray(arr: NestedNumberArray): number {
//   let sum = 0;
// for (const ele of arr) {
//   console.log("ele:", ele);
  
//   if (typeof ele === 'number') {
//     sum += ele
//   } else {
//     const sumIn = reduceNestedArray(ele)
//     sum += sumIn;
//     console.log("sumIn:", sumIn);
    
//   }
//   console.log("sum:", sum);
//   console.log("==========");
  
// }
// return sum;  
// }
// console.log(reduceNestedArray([1, [1, 2, [4]]]));

/*
ZI-TASK

Shunday function yozing, u function ishga tushgandan 3 soniyadan keyin "Hello World" ni qaytarsin. 
MASALAN: delayHelloWorld("Hello World") return "Hello World".
*/
// function delayHelloWorld(): void {
//   setTimeout(() => {
//     console.log("Hello World!");
//   }, 3000);}
// delayHelloWorld();

/*
ZH-TASK

Shunday function yozing, u berilgan array parametrni ichidagi eng katta raqamgacha tushib qolgan raqamlarni bir arrayda qaytarsin. MASALAN: findDisappearedNumbers([1, 3, 4, 7]) return [2, 5, 6].
*/
// function findDisappearedNumbers(arr) {
//     const max = Math.max(...arr);
//     console.log("max:", max);

//     const set = new Set(arr);
//     console.log("set:", set);
    

//     const result = [];

//     for (let i = 1; i <= max; i++) {
//         console.log("i:", i);
        
//         if (!arr.includes(i)) {
//             result.push(i);
//         }
//         console.log("result:", result);
        
//     }

//     return result;
// }
// console.log(findDisappearedNumbers([1, 3, 1, 7]));
/*
ZG-TASK
Shunday function yozing, u berilgan string parametrni snake casega otkazib qaytarsin. 
MASALAN: capitalizeWords('name should be a string') return 'name_should_be_a_string'.
*/
// function capitalizeWords(str: string) {
//   return str.split(" ").join("_")
// }

// console.log(capitalizeWords('name should be a string'));

/**
ZF-TASK

Shunday function yozing, uni string parametri bolsin. String ichidagi har bir sozni bosh harflarini katta harf qilib qaytarsin lekin 1 yoki 2 harfdan iborat sozlarni esa oz holicha qoldirsin.
 MASALAN: capitalizeWords('name should be a string') return 'Name Should be a String'.
 */
// function capitalizeWords(str) {
//   return str
//     .split(" ")
//     .map(word => {
//       if (word.length <= 2) return word; // 1 yoki 2 harfli soz o'zgarmaydi
//       return word[0].toUpperCase() + word.slice(1);
//     })
//     .join(" ");
// }

// console.log(capitalizeWords('name should be a string'));

/*
ZE-TASK

Shunday function yozing, uni string parametri bolsin. String ichida takrorlangan harflarni olib tashlab qolganini qaytarsin. 
MASALAN: removeDuplicate('stringg') return 'string'.
*/
// console.log("TASK - ZE");
// function removeDuplicate(str) {
//   let result = "";

//   for (let char of str) {
//     if (!result.includes(char)) {
//       result += char;
//     }
//   }

//   return result;
// }

// console.log(removeDuplicate("stringg"));
/*
ZD-TASK

Shunday function yozing, uni number, array va number parametrlari bolsin va berilgan 1-parametr numberga teng indexni 
array ichidan topib 3-parametrdagi raqam bilan almashtirib yangilangan arrayni qaytarsin. 
MASALAN: changeNumberInArray(1, [1,3,7,2], 2) return [1,2,7,2].
*/
// console.log("TASK - ZD");
// function changeNumberInArray(num1: number, arr: number [], num2: number) {
//   arr[num1] = num2;
//   return arr;
// }
// console.log(changeNumberInArray(1, [1,3,7,2], 2));

/*
 ZC-TASK

Shunday function yozing, uni number parametri bolsin va function qabul parametrni selsiy miqdori sifatida qabul qilib uni farenhitga ozgartirib bersin. 
MASALAN: celsiusToFahrenheit(0) return 32. 
 */
// console.log("TASK - ZC");
// function celsiusToFahrenheit(celsius) {
//   return celsius * 9/5 + 32;
// }

// console.log(celsiusToFahrenheit(0)); 

/*
ZB-TASK
Shunday function yozing, uni 2 ta number parametri bolsin va berilgan sonlar arasidan random raqam return qilsin. 
MASALAN: randomBetween(30, 50) return 45.
*/
// console.log("TASK - ZB");
// function randomBetween(min, max) {
//   return Math.floor(Math.random() * (max - min + 1)) + min;
// }

// console.log(randomBetween(30, 50));


/*
ZA-TASK
Shunday function yozing, u array ichidagi objectlarni “age” qiymati boyicha sortlab bersin. 
MASALAN: sortByAge([{age:23}, {age:21}, {age:13}]) return [{age:13}, {age:21}, {age:23}].
*/
// console.log("TASK - ZA");
// function sortByAge(arr) {
//   return arr.sort((a, b) => a.age - b.age);
// }
// console.log(sortByAge([{age:23}, {age:21}, {age:13}]));

/*
Z-TASK
Shunday function yozing, uni sonlardan tashkil topgan array qabul qilsin. Function arraydagi juft sonlarni yigindisini qaytarsin. 
MASALAN: sumEvens([1,2,3]) return 2.
*/
// console.log("TASK - Z");
// function sumEvens(arr: number[]): number {
//     let sum = 0;
//     for (const element of arr) {
//         if (element % 2 == 0 ) {
//             sum += element;
//         }
//     }
//     return sum;
// }
// console.log(sumEvens([1,2,3,4,10]));

/* 
Y-TASK
Shunday function yozing, uni 2 ta array parametri bolsin. Function ikkala arrayda ham ishtirok etgan qiymatlarni bir arrayda qaytarsin. 
MASALAN: findIntersection([1,2,3], [3,2,0]) return [2,3]. 
*/
// console.log("TASK - Y");
// function findIntersection(arr1: number [], arr2: number[]): number[] {
//     let newArr = [];

//     for (const element of arr1) {
//         if (arr2.includes(element)) {
//             newArr.push(element)
//         }
//     }
//     return newArr;
// }
// console.log(findIntersection([1,2,3], [3,2,0]));

/*
X-TASK
Shunday function yozing, uni object va string parametrlari bolsin. 
Function string parametri object ichida necha marotaba takrorlanganligini qaytarsin (nested object bolsa ham sanasin). 
MASALAN: countOccurrences({model: 'Bugatti', steer: {model: 'HANKOOK', size: 30}}, 'model') return 2.
*/
// console.log("TASK - X");
// function countOccurrences(obj: any, str: string): number {
//     let count = 0;

//     for (const key in obj) {
//         if (key === str) {
//             count++;
//         }
//         if (typeof obj[key] === "object") {
//             count = count + countOccurrences(obj[key], str);
//         }
//     }
//     return count;
// }

// console.log(countOccurrences({model: 'Bugatti', steer: {model: 'HANKOOK', size: 30}}, 'model'));

/*
W-TASK
Shunday function yozing, uni array va number parametrlari bolsin. 
Function arrayni numberda berilgan uzunlikda kesib bolaklarga ajratilgan array holatida qaytarsin. 
MASALAN: chunkArray([1,2,3,4,5,6,7,8,9,10], 3) return [[1,2,3], [4,5,6], [7,8,9], [10]].
*/
// console.log("TASK - W");
// function chunkArray(arr:number [], num: number) {
//     let son = Math.floor(arr.length/num)
//     let newArr = [];

//     for (let index = 0; index < arr.length; index +=son) {
//         const element = arr.slice(index, index+son);
//         newArr.push(element);        
//     }
//     return newArr;
// }
// console.log(chunkArray([1,2,3,4,5,6,7,8,9,10], 3));

/*
V-TASK
Shunday function yozing, uni string parametri bolsin va stringdagi harf va u harf necha marta takrorlangani sonidan tashkil topgan object qaytarsin. 
MASALAN: countChars("hello") return {h: 1, e: 1, l: 2, o: 1}.
*/
// console.log("TASK - V");
// function countChars(str: string) {

// const result: { [key: string]: number } = {};

//     for (let char of str) {
//         if(result[char]) {
//             result[char]++;
//         } else {
//             result[char] = 1;
//         }
//     }
//     return result;
    
// }
// console.log(countChars("hello"));

/*
U-TASK
Shunday function yozing, uni number parametri bolsin va 0 dan berilgan parametrgacha bolgan oraliqdagi faqat toq sonlar nechtaligini return qilsin. 
MASALAN: sumOdds(9) return 4; sumOdds(11) return 5.
*/ 
// console.log("TASK - U");
// function sumOdds(par:number): number {
//     let count = 0;
//     for (let i = 0; i < par; i++) {
//         console.log("i:", i);
//         if (i % 2 !== 0) {
//             count++;
//         };
//     }
//     return count;
// }
// console.log(sumOdds(11));

/*
T-TASK

Shunday function yozing, u sonlardan tashkil topgan 2 ta array qabul qilsin va ikkala arraydagi sonlarni tartiblab bir arrayda qaytarsin. 
MASALAN: mergeSortedArrays([0,3,4,31], [4,6,30]) return [0,3,4,4,6,30,31].
*/
// console.log("TASK - T");
// function mergeSortedArrays(arr1: number[], arr2: number[]) {
//     return [...arr1,...arr2].sort((a, b) => a - b);
    
// }
// console.log(mergeSortedArrays([0,3,4,31],[4,6,30]));


// console.log("TASK - S");
/*
S-TASK

Shunday function yozing, u numberlardan tashkil topgan array qabul qilsin va osha numberlar orasidagi tushib qolgan sonni topib uni return qilsin. 
MASALAN: missingNumber([3, 0, 1]) return 2.
*/
// function missingNumber(arr:number[]) {
//     const n = arr.length;
//     const arrSum = n * (n + 1) / 2;                             //arrSum -- agar bosh qoldirilmaganda
//     const realSum = arr.reduce((sum, num) => sum + num, 0);     //realSum -- sum bosh son bilan
//     return arrSum - realSum;
// }
// console.log(missingNumber([3, 0, 1]));

// console.log("TASK - R");
/*
R-TASK
Shunday function yozing, u string parametrga ega bolsin. String "1+2" holatda pass qilinganda string ichidagi sonlar yigindisini number holatda qaytarsin. 
MASALAN: calculate("1+3") return 4.
*/
// function calculate(math:string) {
//     let sum = 0;

//     for(const num of math) {
//         if(num >= '0' && num <= '9') {
//             sum += +num;                //+num: string -> number
//         }
//     }
//     return sum;
// }
// console.log(calculate("4+1"));

 
// console.log("TASK - Q");
/*
Q-TASK

Shunday function yozing, u 2 ta parametrgga ega bolib birinchisi object, ikkinchisi string. 
Agar string parametr objectni propertysi bolsa true bolmasa false qaytarsin. 
MASALAN: hasProperty({name: "BMW", model: "M3"}, "model") return true; hasProperty({name: "BMW", model: "M3"}, "year") return false.
*/
// function hasProperty(obj: Object, str: string): boolean {
//     return Object.keys(obj).includes(str);
// }
// console.log(hasProperty({name: "BMW", model: "M3"}, "name"));

// console.log("TASK - P");
/*
P-TASK
Shunday function yozing, u object qabul qilsin va arrayni object arrayga otkazib arrayni qaytarsin. 
MASALAN: objectToArray({a: 10, b: 20}) return [["a", 10], ["b", 20]].
*/
// function objectToArray(obj: Object): any {
//     return Object.keys(obj).map(key => [key, obj[key]]);
// } 
// console.log(objectToArray({ a: 10, b: 20 }));

// console.log("TASK - O");
/*
O-TASK
Shunday function yozing, u har xil valuelardan iborat array qabul qilsin va array ichidagi sonlar yigindisini hisoblab chiqqan javobni qaytarsin. 
MASALAN: calculateSumOfNumbers([10, "10", {son: 10}, true, 35]) return 45.
*/
// function calculateSumOfNumbers(arr: any[]) {
//     const newArr = [];
//     let sum = 0;
//         for(let index of arr) {            
//             if(typeof index == 'number') {
//                 sum+=index;
//             }
//         }
//         return sum;
// }
// console.log(calculateSumOfNumbers([10, "10", {son: 10}, true, 35]));

// function calculateSumOfNumbers(arr: any[]) {
//   return arr.reduce((acc, value) => {
//     return typeof value === "number" ? acc + value : acc;   //условие ? если_да : если_нет
//   }, 0);
// }

// console.log("TASK - N");
/**
N-TASK
Shunday function yozing, u string qabul qilsin va string palindrom yani togri oqilganda ham, orqasidan oqilganda ham bir hil oqiladigan
 soz ekanligini aniqlab boolean qiymat qaytarsin. MASALAN: palindromCheck("dad") return true; palindromCheck("son") return false.
*/
// function palindromCheck(word: string) {
//     const wordObr = word.toLowerCase().split("").reverse().join("");
//     console.log(word.toLowerCase() === wordObr); 
// }
// palindromCheck("Mam");

// console.log("TASK - M");
/*
M-TASK
Shunday function yozing, u raqamlardan tashkil topgan array qabul qilsin va array ichidagi har bir raqam uchun 
raqamni ozi va hamda osha raqamni kvadratidan tashkil topgan object hosil qilib, hosil bolgan objectlarni array ichida qaytarsin. 
MASALAN: getSquareNumbers([1, 2, 3]) return [{number: 1, square: 1}, {number: 2, square: 4}, {number: 3, square: 9}].
*/
// function getSquareNumbers(arr: number[]): Object[] {
//   const newArr = [];

//     for (let num of arr) {
//       const numSquare = num * num;
//       const arrObject = {         //хар цикл янги объект яратади
//           num,
//           numSquare
//       }; 
//      newArr.push(arrObject);     
//     }
//     return newArr;
// }
// console.log(getSquareNumbers([1, 2, 3]));


// console.log("TASK - L");
/*L-TASK
Shunday function yozing, u string qabul qilsin va string ichidagi hamma sozlarni chappasiga yozib va sozlar ketma-ketligini buzmasdan stringni qaytarsin.
 MASALAN: reverseSentence("we like coding!") return "ew ekil gnidoc".
*/
// function reverseSentence(sentence:string)  {
//   const words = sentence.split(" "); // stringni so'zlarga ajratamiz
//   const arr = [];

//   for (let word of words) {
//     let result = word.split("").reverse().join(""); 
//     arr.push(result);
//   }
//   return arr.join(" ");
// }

// console.log(reverseSentence("we like coding"));

// console.log("TASK - K");
/*
K-TASK
Shunday function yozing, u string qabul qilsin va string ichidagi unli harflar sonini qaytarsin. 
MASALAN: countVowels("string") return 1.
*/
// function countVowels(word: string): number {
//     const vowels = ["a", "e", "i", "o", "u"]
//     let count = 0;

//     for (let harf of word.toLowerCase()) {
//       if (vowels.includes(harf)) {
//           count++;
//       }
//     }
//         return count;
// }
// console.log(countVowels("Maktab"));

// console.log("TASK - J");
/* 
Shunday function yozing, u string qabul qilsin va string ichidagi eng uzun sozni qaytarsin. 
MASALAN: findLongestWord("I come from Uzbekistan") return "Uzbekistan".
*/
// function findLongestWord(sentence: string): string {  
//   const words = sentence.split(" "); // stringni so'zlarga ajratamiz
//   // console.log(words);
  
//   let longestWord = "";              // eng uzun so'zni saqlash uchun

//   for (const word of words) {
//     // console.log("word:", word);
//     // console.log("word.length:", word.length);
//     // console.log("longestWord.length:", longestWord.length);
    
//     if (word.length > longestWord.length) {
//       longestWord = word;           // agar uzunroq bo'lsa, almashtiramiz
//       // console.log("longestWord2:", longestWord);
//     }
//   }
//   return longestWord;
// }

// console.log(findLongestWord("I come from Uzbekistan"));

/*
Shunday function yozing, u parametridagi array ichida eng kop takrorlangan raqamni topib qaytarsin.
 MASALAN: majorityElement([1,2,3,4,5,4,3,4]) return 4.
*/

// function majorityElement(arr: number[]): number {
//   const countMap: { [key: number]: number } = {}; //countMap degan object tuzamiz
//   console.log("arr:", arr);

//   let maxCount = 0;
//   let result = 0;

//   for (const num of arr) {
//     console.log("num:", num);
//     console.log("Before countMap[num]:", countMap[num]);
//     countMap[num] = (countMap[num] || 0) + 1;
//     console.log(countMap);

//     if (countMap[num] > maxCount) {
//       maxCount = countMap[num];
//       result = num;
//     console.log("maxCount:", maxCount);
//     console.log("result:", result);
//     }
//   }
//   return result;
// }
// console.log("Arrayda eng ko'p uchralgan son:",majorityElement([1,2,3,4,5,4,3,4]));

/*=======================================================================================================================*/
// console.log("Task - H");
/** H-TASK
Shunday function tuzing, u integerlardan iborat arrayni argument sifatida qabul qilib, faqat positive qiymatlarni
 olib string holatda return qilsin. MASALAN: getPositive([1, -4, 2]) return qiladi "12".
*/
//1 - usul
// function getPositive(arr: number[]): string {
//     return arr.filter(n => n > 0).join("");
// }
// console.log(getPositive([1, -4, 2, 10, 0, -3]));

//2 - usul
// function getPositive(arr:number[]): string {
//     let newArr: number[] = [];
//     for (let i = 0; i < arr.length; i++) {
//         if (arr[i] > 0) {
//             newArr.push(arr[i]); 
//         }
//     }
//     return newArr.join("");
// }
// console.log(getPositive([1, -4, 2, 10, 0, -3]));

/*=======================================================================================================================*/
// console.log("Task - G");
/*
Shunday function tuzingki unga integerlardan iborat array pass bolsin va function bizga osha arrayning eng katta 
qiymatiga tegishli birinchi indexni qaytarsin. MASALAN: getHighestIndex([5, 21, 12, 21, 8]) return qiladi 1 sonini.
*/
// function getMax(arr: number[]): number {
//     let max: number = arr[0];
//     let index: number = 0;
//     console.log(arr);
    
//     for (let i = 1; i < arr.length; i++) {
//         console.log("taqqoslash boshlandi", i , arr[i]);
//         console.log("Max qiymati:", max);
        
//         if (arr[i] > max) {
//             max = arr[i];
//             console.log("index:", i);
//             index = i;
//         }
//     }
//     return index;
// }
// console.log("Arraydagi eng katta sonni indexi:",getMax([5, 21, 12, 21, 8]));

//console.log('F-TASK ishga tushdi!')
/*
F-TASK
Shunday findDoublers function tuzing, unga faqat bitta string argument pass bolib, agar stringda bir hil harf 
qatnashgan bolsa true, qatnashmasa false qaytarishi kerak. MASALAN: getReverse("hello") return true return qiladi.
*/
// function findDouble(word) {
//     word = word.toLowerCase().split("").sort();
//     for (let i = 1; i < word.length; i++) {
//     if (word[i]===word[i-1]){
//         return true;        
//        }
//     }
//     return false;
// }
// console.log(findDouble("Hel"));


// console.log('E-TASK ishga tushdi!')
// /*
// E-TASK
// Shunday function tuzing, u bitta string argumentni qabul qilib osha stringni teskari qilib return qilsin.
//  MASALAN: getReverse("hello") return qilsin "olleh".
// */
// function teskari(word) {
//     return word.split("").reverse().join("");
// }
// console.log(teskari("hello"));

// console.log('D-TASK ishga tushdi!')
/*
D-TASK
Shunday class tuzing tuzing nomi Shop, va uni constructoriga 3 hil mahsulot pass bolsin, hamda classning 3ta methodi bolsin,
biri qoldiq, biri sotish va biri qabul. Har bir method ishga tushgan vaqt ham log qilinsin. 
MASALAN: const shop = new Shop(4, 5, 2); shop.qoldiq() return hozir 20:40da 4ta non, 5ta lagmon va 2ta cola mavjud!
shop.sotish('non', 3) & shop.qabul('cola', 4) & shop.qoldiq() return hozir 20:50da 1ta non, 5ta lagmon va 6ta cola mavjud!
*/
// class Shop {
//     //state - shart emas yozish
//     #non;
//     #ayron;
//     #lagmon;

//     //constructor
//     constructor (non, ayron, lagmon ) {
//         this.#non = non;
//         this.#ayron = ayron;
//         this.#lagmon = lagmon;
//     }
//     //Method
//     time() {
//         return new Date().toLocaleTimeString();
//     }
//     qoldiq() {
//         console.log(`Hozirgi vaqt:${this.time()}. 
//         Non ${this.#non}ta, ayron ${this.#ayron}ta va lagmon ${this.#lagmon}ta mavjud!`);
//     }
//     sotish(product, amount) {
//         product = product.toLowerCase();
//         if (typeof amount !== 'number' || amount <= 0) {
//             console.log("Noto‘g‘ri miqdor");
//             return;            
//         }
//         if (product === 'non') {
//             if (this.#non < amount) {
//             console.log("Yetarli mahsulot yo‘q");
//             return;
//             }
//             this.#non -= amount;
//         }
//         else if (product === 'ayron') {
//             if (this.#ayron < amount) {
//             console.log("Yetarli mahsulot yo‘q");
//             return;
//             }
//             this.#ayron -= amount; 
//         } 
//         else if (product === 'lagmon') {
//             if (this.#lagmon < amount) {
//             console.log("Yetarli mahsulot yo‘q");
//             return;
//             }
//             this.#lagmon -= amount;
//         }
//         else {
//             console.log("Bu mahsulot mavjud emas!");
//             return;
//         } 
//         console.log(`Hozirgi vaqt:${this.time()}. 
//         ${product} ${amount}ta sotildi!`);
//     }

//     qabul(product, amount) {
//         product = product.toLowerCase();
//          if (typeof amount !== 'number' || amount <= 0) {
//             console.log("Noto‘g‘ri miqdor");
//             return;
//         }
//         if (product === 'non') {
//             this.#non += amount;
//         }
//         else if (product === 'ayron') {
//             this.#ayron += amount; 
//         } 
//         else if (product === 'lagmon') {
//             this.#lagmon += amount;
//         }
//         else {
//             console.log("Bu mahsulot mavjud emas!"); 
//             return;   
//         } 
//         console.log(`Hozirgi vaqt:${this.time()}. 
//         ${product} ${amount}ta qabul qilindi!`);
//     } 
// }
// const shop = new Shop (4, 5, 2);
// shop.qoldiq();
// shop.sotish('Ayron', 0);
// shop.qabul('Lagmon', 0);
// shop.qabul('Jentra', 5);
// shop.sotish('ayron', -100);
// shop.qoldiq();

// console.log('C-TASK ishga tushdi!')
/*C-TASK:Shunday function tuzing, u 2ta string parametr ega bolsin, hamda agar har ikkala string
bir hil harflardan iborat bolsa true aks holda false qaytarsin. MASALAN checkContent("mitgroup", "gmtiprou")
return qiladi true. */

// function twoWords (word1, word2) {
//     if (word1.length !== word2.length) return false;
//     const sorted1 = word1.toLowerCase().split("").sort().join(""); //split - array qiladi; sort - sortirovka; 
//     const sorted2 = word2.toLowerCase().split("").sort().join(""); //join - arrayni string qiladi.
//     return sorted1 === sorted2;
// }
// console.log(`Birhil harflardan iborat bo'lsa true, aksincha false. Javob: ${twoWords ("Mitgroup", "gmtiprou")}`);


// console.log('B-TASK ishga tushdi!')
/*B-TASK: 
Shunday function tuzing, u 1ta string parametrga ega bolsin, hamda osha stringda qatnashgan 
raqamlarni sonini bizga return qilsin. MASALAN countDigits("ad2a54y79wet0sfgb9") 7ni return 
qiladi.\n\n@MITASK*/

// function countDigits (enter) {
//     let countNumber = 0;
//     for (let i = 0; i < enter.length; i++) {
//         if (enter[i] >= '0' && enter[i] <= '9') {
//             countNumber++;
//         }
//     }
//     return countNumber;
// }
// console.log(`String ichida number soni: ${countDigits("o777oo02")} dona`);


// console.log('A-TASK ishga tushdi!')
/*A-TASK: 
Shunday 2 parametrli function tuzing, hamda birinchi parametrdagi letterni ikkinchi parametrdagi sozdan
 qatnashga sonini return qilishi kerak boladi.
MASALAN countLetter("e", "engineer") 3ni return qiladi.*/

//1-chi usul: for orqali
// function countLetter (harf, soz) {
//     let harfsoni = 0;
//     harf = harf.toLowerCase();
//     soz = soz.toLowerCase();
//     for (let i = 0; i < soz.length; i++) {
//        if (soz[i]===harf){
//             harfsoni++;
//        }
//     }
//     return harfsoni;
// }

// const harf = "A";
// const soz = "fsAdaaf";
// const result = countLetter(harf, soz);
// console.log(`'${soz}' so'zni ichida '${result}'ta '${harf}' harfi bor!`);

//2-chi usul: reduce orqali.
// function countLetter (harf, soz) {
//     harf = harf.toLowerCase();
//     soz = soz.toLowerCase();
//     soz = soz.split("");
//     return soz.reduce((total, i) => {
//         return i === harf ? total + 1 : total
// }, 0);
// }
// const harf = "A";
// const soz = "Asadbek";
// const result = countLetter(harf, soz);
// console.log(`'${soz}' so'zni ichida '${result}'ta '${harf}' harfi bor!`);


// interface Person {
//     id: number,
//     name: string,
//     phone: number,
//     students: (string | number) [];
// }

// let person: Person = {
//     id: 20234322,
//     name: "Sam",
//     phone: 921932313,
//     students: [ 234234, "Mark"]
// }

// console.log(person.students);

