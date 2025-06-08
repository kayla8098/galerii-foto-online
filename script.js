const cloudName = "do0ovnqig"; // ganti dengan cloud name kamu
const uploadPreset = "unsigned_preset"; // buat upload preset 'unsigned' di Cloudinary dashboard

const gallery = document.getElementById("gallery");
const uploadForm = document.getElementById("uploadForm");
const fileInput = document.getElementById("fileInput");
const statusText = document.getElementById("status");

// Gambar awal
const imageUrls = [
  "https://res.cloudinary.com/do0ovnqig/image/upload/v1749308259/386ffcdd-261e-46d1-84b6-643dc4945ea9_gr6dlw.jpg",
  "https://res.cloudinary.com/do0ovnqig/image/upload/v1749308259/Nanatsu_no_Taizai_-_Imagem_HD_dExplore_esta_imagem_bqyhzd.jpg",
  "https://res.cloudinary.com/do0ovnqig/image/upload/v1749308259/A_Team_7_szerepl%C5%91i__Uzumaki_Naruto_Kakashi_Hatake_dfllhh.jpg",
  "https://res.cloudinary.com/do0ovnqig/image/upload/v1749308259/3f10e5ce-4b55-4bec-a605-391428e90f26_jc8l98.jpg",
  "https://res.cloudinary.com/do0ovnqig/image/upload/v1749308258/Time_7_todglb.jpg"
];

// Tampilkan galeri
function renderGallery() {
  gallery.innerHTML = "";
  imageUrls.forEach(url => {
    const img = document.createElement("img");
    img.src = url;
    gallery.appendChild(img);
  });
}

renderGallery();

// Upload gambar ke Cloudinary
uploadForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const file = fileInput.files[0];
  if (!file) return;

  statusText.textContent = "Mengunggah gambar...";

  const formData = new FormData();
  formData.append("file", file);
  formData.append("upload_preset", uploadPreset);

  try {
    const res = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      body: formData
    });

    const data = await res.json();
    imageUrls.unshift(data.secure_url); // Tambahkan gambar baru di awal
    renderGallery();
    statusText.textContent = "Upload berhasil!";
    fileInput.value = "";
  } catch (err) {
    console.error(err);
    statusText.textContent = "Upload gagal.";
  }
});
