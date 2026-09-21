// Buat hash bcrypt dari password.  Pakai:  npm run hash -- "PasswordAnda"
const bcrypt = require('bcryptjs');
const pw = process.argv[2];
if (!pw) { console.error('Pakai: npm run hash -- "PasswordAnda"'); process.exit(1); }
console.log(bcrypt.hashSync(pw, 12));
