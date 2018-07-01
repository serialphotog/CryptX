/* View Triggers */
const text = $('a[href="#text-toggle"]');
const frequency = $('a[href="#frequency-toggle"]');
const ngraphs = $('a[href="#n-graphs-toggle"]');
const runalpha = $('a[href="#runalpha-toggle"]');
const affinedecipher = $('a[href="#affinedecipher-toggle"]');
const affineencipher = $('a[href="#affineencipher-toggle"]');
const vigenereencipher = $('a[href="#vigenereencipher-toggle"]');
const affineknownpt = $('a[href="#affineknownpt-toggle"]');
const vigeneredeciper = $('a[href="#vigeneredecipher-toggle"]');
const vigenerepairs = $('a[href="#vigenere-pairs-toggle"]');

/* Views */
const textView = $('#text');
const frequencyView = $('#frequency');
const ngraphsView = $('#n-graphs');
const runalphaView = $('#runalpha');
const affinedecipherView = $('#affinedecipher');
const affineencipherView = $('#affineencipher');
const vigenereencipherView = $('#vigenereencipher');
const affineknownptView = $('#affineknownpt');
const vigeneredecipherView = $('#vigeneredecipher');
const vigenerepairsView = $('#vigenere-ciphertext-pairs');

/* Misc UI Triggers */
const ngraphsBtn = $('#getngraphs-btn');
const ngraphsLength = $('#ngraphs-length');
const affineencipher_btn = $('#affine-encipher');
const affineencipherres = $('#affine-encipher-res');
const affinedecipher_btn = $('#affine-decipher');
const affinedecipherres = $('#affine-decipher-res');
const affineknownpt_btn = $('#affinept-btn');
const affinepts = $('#affine-pts');
const vrese = $('#vres-e');
const vkeybtne = $('#vkey-btn-e');
const vkeybtnd = $('#vkey-btn-d');
const vresd = $('#vres-d');
const vpairs = $('#vpairs');

$(document).ready(function() {
	buildVLookup();

	textView.show();
	frequencyView.hide();
	ngraphsView.hide();
	runalphaView.hide();
	affinedecipherView.hide();
	affineencipherView.hide();
	vigenereencipherView.hide();
	affineknownptView.hide();
	vigeneredecipherView.hide();
	vigenerepairsView.hide();
});

ngraphsBtn.click(function(e) {
	getNGraphs(parseInt(ngraphsLength.val()));
});

affineknownpt_btn.click(function(e){
	var search = $('#affinept').val();
	var html = affineKnownPt(search);

	affinepts.empty();
	affinepts.html(html);
});

vkeybtne.click(function(e) {
	updateMessage();

	var key = $('#vkey-e').val().toUpperCase();
	if (key.length < 1)
		alert("You must enter a keyword");
	else {
		var html = vEncipher(key);
		vrese.empty();
		vrese.html(html);
	}
});

vkeybtnd.click(function(e) {
	updateMessage();

	var key = $('#vkey-d').val().toUpperCase();
	if (key.length < 1)
		alert("You must enter a keyword");
	else {
		var html = vDecipher(key);
		vresd.empty();
		vresd.html(html);
	}
});

affineencipher_btn.click(function(e) {
	updateMessage();
	var additive = parseInt($('#add-e').val());
	var mult = parseInt($('input:radio[name=multiply-e]:checked').val());

	if (isNaN(additive))
	{
		alert("Please enter a valid number for additive shift");
		return;
	}

	if (additive < 0 || additive > 25)
	{
		alert("The additive shift should be between 0 and 25");
		return;
	}

	var res = doAffineCipher(true, mult, additive);
	affineencipherres.empty();
	affineencipherres.html("<p>" + res + "</p>");
});

affinedecipher_btn.click(function(e) {
	updateMessage();
	var additive = parseInt($('#add-d').val());
	var mult = parseInt($('input:radio[name=multiply-d]:checked').val());

	if (isNaN(additive))
	{
		alert("Please enter a valid number for additive shift");
		return;
	}

	if (additive < 0 || additive > 25)
	{
		alert("The additive shift should be between 0 and 25");
		return;
	}

	var res = doAffineCipher(false, mult, additive);
	affinedecipherres.empty();
	affinedecipherres.html("<p>" + res + "</p>");
});



text.click(function(e) {
	$('body').css('background', '#2980b9');

	textView.show();
	frequencyView.hide();
	ngraphsView.hide();
	runalphaView.hide();
	affinedecipherView.hide();
	affineencipherView.hide();
	vigenereencipherView.hide();
	affineknownptView.hide();
	vigeneredecipherView.hide();
	vigenerepairsView.hide();
});

frequency.click(function(e) {
	$('body').css('background', '#1abc9c');

	// Do data operations
	updateMessage();
	doFrequencyAnalysis();

	textView.hide();
	frequencyView.show();
	ngraphsView.hide();
	runalphaView.hide();
	affinedecipherView.hide();
	affineencipherView.hide();
	vigenereencipherView.hide();
	affineknownptView.hide();
	vigeneredecipherView.hide();
	vigenerepairsView.hide();
});

ngraphs.click(function(e) {
	$('body').css('background', '#2980b9');

	updateMessage();

	textView.hide();
	frequencyView.hide();
	ngraphsView.show();
	runalphaView.hide();
	affinedecipherView.hide();
	affineencipherView.hide();
	vigenereencipherView.hide();
	affineknownptView.hide();
	vigeneredecipherView.hide();
	vigenerepairsView.hide();
});

runalpha.click(function(e) {
	$('body').css('background', '#2c3e50');

	updateMessage();
	runAlphabet();

	textView.hide();
	frequencyView.hide();
	ngraphsView.hide();
	runalphaView.show();
	affinedecipherView.hide();
	affineencipherView.hide();
	vigenereencipherView.hide();
	affineknownptView.hide();
	vigeneredecipherView.hide();
	vigenerepairsView.hide();
});

affinedecipher.click(function(e) {
	$('body').css('background', '#16a085');

	updateMessage();

	textView.hide();
	frequencyView.hide();
	ngraphsView.hide();
	runalphaView.hide();
	affinedecipherView.show();
	affineencipherView.hide();
	vigenereencipherView.hide();
	affineknownptView.hide();
	vigeneredecipherView.hide();
	vigenerepairsView.hide();
});

affineencipher.click(function(e) {
	$('body').css('background', '#9b59b6');

	updateMessage();

	textView.hide();
	frequencyView.hide();
	ngraphsView.hide();
	runalphaView.hide();
	affinedecipherView.hide();
	affineencipherView.show();
	vigenereencipherView.hide();
	affineknownptView.hide();
	vigeneredecipherView.hide();
	vigenerepairsView.hide();
});

vigenereencipher.click(function(e) {
	$('body').css('background', '#c0392b');

	updateMessage();

	textView.hide();
	frequencyView.hide();
	ngraphsView.hide();
	runalphaView.hide();
	affinedecipherView.hide();
	affineencipherView.hide();
	vigenereencipherView.show();
	affineknownptView.hide();
	vigeneredecipherView.hide();
	vigenerepairsView.hide();
});

affineknownpt.click(function(e) {
	$('body').css('background', '#34495e');

	updateMessage();

	textView.hide();
	frequencyView.hide();
	ngraphsView.hide();
	runalphaView.hide();
	affinedecipherView.hide();
	affineencipherView.hide();
	vigenereencipherView.hide();
	affineknownptView.show();
	vigeneredecipherView.hide();
	vigenerepairsView.hide();
});

vigeneredeciper.click(function(e) {
	$('body').css('background', '#2ecc71');

	updateMessage();

	textView.hide();
	frequencyView.hide();
	ngraphsView.hide();
	runalphaView.hide();
	affinedecipherView.hide();
	affineencipherView.hide();
	vigenereencipherView.hide();
	affineknownptView.hide();
	vigeneredecipherView.show();
	vigenerepairsView.hide();
});