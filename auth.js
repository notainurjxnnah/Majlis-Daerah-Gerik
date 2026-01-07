function login(){
  const username = document.getElementById("username").value.trim();
  const role = document.getElementById("role").value;

  if(!username || !role){
    alert("Sila isi username dan pilih peranan");
    return;
  }

  localStorage.setItem("username", username);
  localStorage.setItem("role", role);

  // Redirect
  switch(role){
    case "admin": window.location.href="admin/dashboard_admin.html"; break;
    case "su": window.location.href="setiausaha/dashboard_su.html"; break;
    case "jabatan": window.location.href="jabatan/dashboard_jabatan.html"; break;
    case "latihan": window.location.href="latihan/dashboard_latihan.html"; break;
  }
}
