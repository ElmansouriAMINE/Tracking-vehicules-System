const swalWithBootstrapButtons = Swal.mixin({
    customClass: {
      confirmButton: 'btn btn-success  ml-3',
      cancelButton: 'btn btn-danger'
    },
    buttonsStyling: false
  })

$("#ajouter_vehicule").submit(function(event){
    alert("Data Inserted Successfully!");
})

$("#modifier_vehicule").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })
    
 var request = {
        "url" : `http://localhost:3700/api/vehicules/${data.id}`,
        "method" : "PUT",
        "data" : data
    }

    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
        window.location.href="http://localhost:3700/";
    })
    
    
})

if(window.location.pathname == "/"){
    $ondelete = $(" a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3700/api/vehicules/${id}`,
            "method" : "DELETE"
        }
        event.preventDefault()
        swalWithBootstrapButtons.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
            reverseButtons: true
          }).then((result) => {
            if (result.isConfirmed) {
              swalWithBootstrapButtons.fire(
                'Deleted!',
                'Your file has been deleted.',
                'success',
                $.ajax(request).done(function(response){
                            
                             location.reload();
                        })
              )
            } else if (
              /* Read more about handling dismissals below */
              result.dismiss === Swal.DismissReason.cancel
            ) {
              swalWithBootstrapButtons.fire(
                'Cancelled',
                'Your imaginary file is safe :)',
                'error'
              )
            }
          })
        // if(confirm("Do you really want to delete this record?")){
        //     $.ajax(request).done(function(response){
        //         alert("Data Deleted Successfully!");
        //         location.reload();
        //     })
        // }

    })
}
if(window.location.pathname == "/trackers"){
    $ondelete = $(".tableo tbody td a.delete");
    $ondelete.click(function(){
        var id = $(this).attr("data-id")

        var request = {
            "url" : `http://localhost:3700/api/trackers/${id}`,
            "method" : "DELETE"
        }

        if(confirm("Do you really want to delete this record?")){
            $.ajax(request).done(function(response){
                alert("Data Deleted Successfully!");
                location.reload();
            })
        }

    })
}

$("#modifier_tracker").submit(function(event){
    event.preventDefault();

    var unindexed_array = $(this).serializeArray();
    var data = {}

    $.map(unindexed_array, function(n, i){
        data[n['name']] = n['value']
    })
    
 var request = {
        "url" : `http://localhost:3700/api/trackers/${data.id}`,
        "method" : "PUT",
        "data" : data
    }
    
    $.ajax(request).done(function(response){
        alert("Data Updated Successfully!");
        window.location.href="http://localhost:3700/trackers";
    })
   
})
