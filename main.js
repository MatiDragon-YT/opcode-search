let $ = Element => Element[0] == '#'
		? document.querySelector(Element)
		: document.querySelectorAll(Element),
	_ = Message => console.log(Message)

function carga (){
	if ($('#este').checked){
		fetch('opcodes.txt')
			.then(response => response.text())
			.then(Data => {
				// WRITE TXT
				$("#myUL").innerHTML = Data;
				// FORMAT TO HTML
				let Opcodes = $('ul')[0]
				Opcodes.innerHTML = Opcodes.innerHTML
					.replace(/^(.+)/gim, '<li style><pre>$1</pre></li>');
				found();
			})
			.catch(error => _(error))
	}
}

function buscar(){
	let Filter = $('#myInput').value.toUpperCase().replaceAll(' ', '_');
	const LI = $('#myUL').getElementsByTagName('li');

	window.onkeydown = (event) => {
		if (event.keyCode === 13){ // IS PRESS ENTER
			for (let i = 0; i < LI.length; i++) {
				let a = LI[i].getElementsByTagName("pre")[0],
					txtValue = a.textContent || a.innerText;

				if (txtValue.toUpperCase().indexOf(Filter) > -1) {
					LI[i].style.display = "";
				}else {
					LI[i].style.display = "none";
				}
			}
			found();
		}
	}
}

function found(){
	$('#found').innerHTML = $('li[style=""]').length
}