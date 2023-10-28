import Swal from 'sweetalert2'

const confirmation = async() => {
    const result = await Swal.fire({
        title: 'Lanjutkan Aksi?',
        text: "Data akan terhapus secara permanen!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Ya, lanjut!'
      })

      if (result.isConfirmed) {
        return true;
      } else {
        return false;
      }
}


const confirmationAccept = async() => {
  const result = await Swal.fire({
      title: 'Lanjutkan Aksi?',
      text: "Anda tidak dapat membatalkan nanti!",
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Ya, lanjut!'
    })

    if (result.isConfirmed) {
      return true;
    } else {
      return false;
    }
}

export {confirmation , confirmationAccept}