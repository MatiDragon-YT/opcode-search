let $ = Element => Element[0] == '#'
		? document.querySelector(Element)
		: document.querySelectorAll(Element),
	_ = Message => console.log(Message);

const
	VK = {
		ENTER:0x0D,//13
	}
;

function carga (){
	if ($('#este').checked){
		fetch('opcodes.txt')
			.then(response => response.text())
			.then(Data => {
				//Escribir el txt
				$("#myUL").innerHTML = Data;
				//Formatear a html
				let opcodes = $('ul')[0]
				opcodes.innerHTML = opcodes.innerHTML
					.replace(/^(.+)\n/gim, '<li><pre>$1</pre></li>');
			})
			.catch(error => _(error))
	}
}


function buscar(){
	let Filter = $('#myInput').value.toUpperCase();
	const LI = $('#myUL').getElementsByTagName('li');


	window.onkeydown = (event) => {
		if (event.keyCode === VK.ENTER){
			for (let i = 0; i < LI.length; i++) {
				let a = LI[i].getElementsByTagName("pre")[0];
				let txtValue = a.textContent || a.innerText;

				if (txtValue.toUpperCase().indexOf(Filter) > -1) {
					LI[i].style.display = "";
				}else {
					LI[i].style.display = "none";
				}
			}
		}
    }
}