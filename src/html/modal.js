document.write(`
<section id="modal">
<element id="modal-window">
<div id="modal-header">
	<h1 id="modal-title">Settings</h1>
	<span>
		<i id="modal-save" class="icon">save</i>
		<i id="modal-close" class="icon">close</i>
	</span>
</div>
<div id="modal-container">
	With love for you ;)
	<br><br>

	<b>Highlighter opcodes</b>
	<blockquote>
		Enable at <input type="number" id="settings-limit-h">
		<div class="info"><i class="icon">info</i><p class="comment">The highlighter by default is limited to highlighting only those opcodes that are in the lower range set here. That is, the higher the number, the more likely it is that the results will be highlighted, but it will also take longer to display the results. You can disable the functionality with 0 or it will highlight everything with -1.</p></div>
	</blockquote>
	
	<!--
	<b>Color theme</b>
	<blockquote>
		<div class="table">
			<div class="row"><b>Element</b>
				Nav
				Bars
				List
				Scroll
			</div>
			<div class="row"><b>Color</b>
				<input type="text" disabled id="color-nav">
				<input type="text" disabled id="color-bar">
				<input type="text" disabled id="color-list">
				<input type="text" disabled id="color-scroll">
			</div>
			<div class="row"><b>Ground</b>
				<input type="text" disabled id="ground-nav">
				<input type="text" disabled id="ground-bar">
				<input type="text" disabled id="ground-list">
				<input type="text" disabled id="ground-scroll">
			</div>
			<div class="row"><b>Size</b>
				<input type="text" disabled id="size-nav">
				<input type="text" disabled id="size-bar">
				<input type="text" disabled id="size-list">
				<input type="text" disabled id="size-scroll">
			</div>
		</div>
		<div class="info">
			<i class="icon">info</i><p class="comment">Enter any CSS3 variants (hex value, color name, or functions: hex, rbg, hsl, hsv, cmyk, linear-gradient, and so on). You will see the changes in real time, so it is recommended that you make your changes before loading the database or when there are few results.</p>	
		</div>
	</blockquote>
	-->

	<b>Color scheme</b>
	<blockquote>
		<div class="table">
			<div class="row"><b>Element</b>
				Text
				Ground
				Opcode
				Operator
				Number
				String
				Variable
				Comment
				Label
			</div>
			<div class="row"><b>Color</b>
				<input type="text" id="text">
				<input type="text" id="ground">
				<input type="text" id="opcode">
				<input type="text" id="operator">
				<input type="text" id="number">
				<input type="text" id="string">
				<input type="text" id="variable">
				<input type="text" id="comment">
				<input type="text" id="label">
			</div>
			<div class="row"><b>View</b>
				<pre>text_example_xd\n\n00AD:\n== += -= < <= * => > - +\nfalse 10 0xFF 0.0 #FAM1\n'short' "long string"\n412@ $variable_example\n{comment} // example\n@example_0AF023</pre>
			</div>
		</div>
		<div class="info">
			<i class="icon">info</i><p class="comment">Enter any CSS3 variants (hex value, color name, or functions: hex, rbg, hsl, hsv, cmyk, linear-gradient, and so on). You will see the changes in real time, so it is recommended that you make your changes before loading the database or when there are few results.</p>	
		</div>
	</blockquote>

	<!--
	<b>Danger Zone</b>
	<blockquote style="
	    text-align: center;
	">
	<button style="
	    background: #f4432b;
	    color: black;
	    font-weight: bold;
	    font-size: 1rem;
	    text-transform: uppercase;
	    padding: 1rem 3rem;
	">Reset settings</button>
	</blockquote>
	-->
</div>
</element>
</section>
`)