$(document).ready(function(){
	var ShowForm = function(){
		var btn = $(this);
		$.ajax({
			url: btn.attr("data-url"),
			type: 'get',
			dataType:'json',
			beforeSend: function(){
				$('#modal-note').modal('show');
			},
			success: function(data){
				$('#modal-note .modal-content').html(data.html_form);
			}
		});
	};

	var SaveForm =  function(){
		var form = $(this);
		$.ajax({
			url: form.attr('data-url'),
			data: form.serialize(),
			type: form.attr('method'),
			dataType: 'json',
			success: function(data){
				if(data.form_is_valid){
					$('#note-table tbody').html(data.note_list);
					$('#modal-note').modal('hide');
				} else {
					$('#modal-note .modal-content').html(data.html_form)
				}
			}
		})
		return false;
	}
	

// create 
$(".show-form").click(ShowForm);
$("#modal-note").on("submit",".create-form",SaveForm);

//update
$('#note-table').on("click",".show-form-update",ShowForm);
$('#modal-note').on("submit",".update-form",SaveForm);

//delete
$('#note-table').on("click",".show-form-delete",ShowForm);
$('#modal-note').on("submit",".delete-form",SaveForm);
});

