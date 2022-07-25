const rdl = require('readline')
const rl = rdl.createInterface({
  input: process.stdin,
  output: process.stdout,
})

let money = 0
let errorMessage = ''

const banknotes = [2000, 5000, 10000, 20000, 50000]

const listFoods = [
  {
    name: 'Biskuit',
    price: 6000,
    stock: 1,
  },
  {
    name: 'Chips',
    price: 8000,
    stock: 1,
  },
  {
    name: 'Oreo',
    price: 1000,
    stock: 1,
  },
  {
    name: 'Tango',
    price: 12000,
    stock: 1,
  },
  {
    name: 'Cokelat',
    price: 15000,
    stock: 1,
  },
]


function welcomeMsg() {
  console.log('====== Welcome To VENDING MACHINE ======')
}

function chooseMenus() {
  console.clear();
  welcomeMsg();
  console.log(`--- JUMLAH UANG : RP ${money}`);
  console.log(`---- List Makanan`);
  listFoods.map((item, key) => {
    console.log(`----- Nomor : ${key + 1}`);
    console.log(`----- Nama : ${item.name}`);
    console.log(`----- Harga : ${item.price}`);
    console.log(`----- Stock : ${item.stock}`);
    console.log("");
  });
  console.log(`Pilih ${listFoods.length + 1} Untuk Batal`);
  console.log(`-----------------------------------`);
  console.log("Pesan : ", errorMessage);
  rl.question("Silahkan Pilih Menu : ", function (value) {
    if (value <= 5 && value > 0) {
      let input = true;
      const stock = listFoods[value - 1].stock;
      const name = listFoods[value - 1].name;
      const price = listFoods[value - 1].price;
      if (stock === 0) {
        errorMessage = `Oops, Maaf Stock ${name} Habis`;
        input = false;
      } else if (money < price) {
        errorMessage = "Uang anda kurang";
        input = false;
      }

      if (input) {
        listFoods[value - 1].stock -= 1;
        console.clear();
        console.log("=== TERIMA KASIH TELANG MENGGUNAKAN VENDING MACHINE ===");
        console.log(`=== Silahkan Ambil ${name} dibawah`);
        console.log(`=== Uang Kembalian Rp. ${money - price}`);
        console.log("");
        console.log("");
        console.log("");
        rl.question("Tekan [Enter] untuk selesai", function () {
          money = 0;
          errorMessage = "";
          main();
        });
      } else {
        chooseMenus();
      }
    } else if (parseInt(value) === listFoods.length + 1) {
      console.clear();
      console.log("=== TERIMA KASIH TELANG MENGGUNAKAN VENDING MACHINE ===");
      console.log(`=== Silahkan Ambil Uangnya Rp. ${money}`);
      rl.question("Tekan [Enter] untuk selesai", function () {
        money = 0;
        errorMessage = "";
        main();
      });
    } else {
      errorMessage = "Pilihan Menu Tidak Ada";
      chooseMenus();
    }
  });
}

function main() {
  console.clear();
  welcomeMsg();
  console.log(`--- JUMLAH UANG : RP ${money}`);
  console.log(`Pilih 1 = SELANJUTNYA`);
  console.log(`Pilih 2 = BATAL`);
  console.log("Pesan : ", errorMessage);
  rl.question("Silahkan Masukkan Uang : ", function (value) {
    if (value == 1) {
      if (money > 0) chooseMenus();
      else {
        errorMessage = "Masukkan Uang Terlebih Dahulu";
        main();
      }
    } else if (value == 2) {
      console.log("=======================================================");
      console.log("=== TERIMA KASIH TELANG MENGGUNAKAN VENDING MACHINE ===");
      console.log(`=== Silahkan Ambil Uangnya Rp. ${money}`);
      rl.question("Tekan [Enter] untuk selesai", function () {
        money = 0;
        errorMessage = "";
        main();
      });
    } else {
      let fractionInput = false;
      banknotes.map((item) => {
        if (parseInt(value) === item) {
          fractionInput = true;
        }
      });
      if (fractionInput) {
        money += parseInt(value);
        errorMessage = "";
      } else {
        errorMessage = "Uang Pecahan Tidak Diterima";
      }
      main();
    }
  });
}

main();
