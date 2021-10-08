let $ = Element => Element[0] == '#'
		? document.querySelector(Element)
		: document.querySelectorAll(Element),
	_ = Message => console.log(Message);

let ENTRADA = $('#myInput')[0].value,
	LISTA = $('#myUL')[0],
	VK = {
	  ENTER:0x0D,//13
	};

function carga (){
	if ($('#este')[0].checked){
		fetch('opcodes.txt')
			.then(response => response.text())
			.then(Data => {
				//Escribir el txt
				LISTA.innerHTML = Data;
				//Formatear a html
				let opcodes = $('ul')[0]
				opcodes.innerHTML = opcodes.innerHTML
					.replace(/^(.+)\n/gim, '<li><pre>$1</pre></li>');
			})
			.catch(error => _(error))
	}
}


function buscar(){
  // Declare variables
  var input, filter, ul, li, a, i, txtValue;
  input = document.getElementById('myInput');
  filter = input.value.toUpperCase();
  ul = document.getElementById("myUL");
  li = ul.getElementsByTagName('li');

  // Loop through all list items, and hide those who don't match the search query
  


    window.onkeydown = function(event){
        if (event.keyCode === VK.ENTER){
        	for (i = 0; i < li.length; i++) {
				a = li[i].getElementsByTagName("pre")[0];
				txtValue = a.textContent || a.innerText;
				if (txtValue.toUpperCase().indexOf(filter) > -1) {
					li[i].style.display = "";
				} else {
					li[i].style.display = "none";
				}
			}
		}
    }
}