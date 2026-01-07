// Data utama - surat
let suratList = JSON.parse(localStorage.getItem("suratList")) || [];

// Senarai 13 jabatan
const senaraiJabatan = [
  "Pentadbiran", "IT", "Aduan", "Jab Perbendaharaan",
  "Jab Perancangan Bandar", "Unit Undang-undang",
  "Jab Perkhidmatan Bandar dan Perlesenanan", "Jab Penilaian dan Harta",
  "Unit OSC", "Jab Kejuruteraan", "Unit Penguatkuasaan",
  "Unit Landskap dan Pelancongan"
];

// Save to localStorage
function saveData() {
  localStorage.setItem("suratList", JSON.stringify(suratList));
}
