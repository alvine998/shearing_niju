import axios from "axios";

export const uploadReplaceImage2 = async (oldFile, newFile, newName) => {
    // Foto ada tapi tidak diubah
    if (oldFile === newFile) {
      return { info: newFile };
    }
  
    // Kalau foto skrg undefined diubah jadi string kosong dulu
    if (oldFile === undefined) {
      oldFile = "";
    }
  
    // Hapus foto lama
    if (oldFile !== "") {
      await axios.delete(`http://10.0.3.2:3000/delete/${oldFile}`);
    }
  
    // Hapus foto profil
    if (newFile === "") {
      return { info: newFile };
    }
  
    // Foto profil baru
    let fileName = `${newName.replace(/\s/g, "")}`;
    let photo = {
      uri: newFile,
      type: "image/jpeg",
      name: fileName,
    };
  
    //use formdata
    let formData = new FormData();
    //append created photo{} to formdata
    formData.append("image", photo);
  
    const { data: dataImage } = await axios.post(`http://10.0.3.2:3000/uploads`, formData);
  
    return dataImage;
  };