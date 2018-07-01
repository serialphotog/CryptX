const alphabet = new Array('A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z');
var vLookup = new Array();

var message = null;

function buildVLookup()
{
	for (var i=0; i < 26; i++)
	{
		vLookup[i] = new Array();
		for (var j=0; j < alphabet.length; j++)
		{
			vLookup[i][j] = getShiftedLetter(alphabet, j, i);
		}
	}
}

function updateMessage()
{
	message = $('#cryptx-message').val().toUpperCase();
}

function getLetterFrequencies()
{
	var freqs = new Array();
	for (var i=0; i<alphabet.length; i++)
		freqs[i] = 0;

	for (var i=0; i<message.length; i++)
	{
		for (var j=0; j<alphabet.length; j++)
		{
			if (message.charAt(i) == alphabet[j])
			{
				freqs[j]++;
				break;
			}
		}
	}

	return freqs;
}

function doFrequencyAnalysis()
{
	var freqs = getLetterFrequencies();
	var freqData = new Array();

	for (var i=0; i<freqs.length; i++)
	{
		freqData[i] = new Array(freqs[i], alphabet[i], '#c0392b');
	}

	var width = $(window).width() / 2;

	$('#frequency-graph').empty();

	$('#frequency-graph').jqbargraph({
		data:freqData,
		width: width
	});
}

function getNGraphs(n)
{
	var graphs = {};

	// Remove spaces and non-letters from the message
	message = message.replace(/ /g,'').replace(/[^a-zA-Z-]/g, '');

	if (message.length < n)
		return; // impossible to get graphs of length n

	for (var i=0; i<message.length; i++)
	{
		if (i+n > message.length)
			break; // found all n graphs

		var count = 0;
		var graph = message[i];

		for (var j=1; j<n; j++)
		{
			graph = graph.concat(message[i+j]);
		}

		if (graphs[graph] == undefined)
		{
			graphs[graph] = new Array();
			graphs[graph][0] = 1;
		} else {
			var len = graphs[graph].length;
			graphs[graph][0]++;
		}
	}

	var out = $('#ngraphsout');
	var html = '<table><tr><th>Graph</th><th>Occurences</th></tr>';

	for (var item in graphs)
	{
		html = html.concat('<tr><td>', item, '</td><td>', graphs[item].join(", "));
	}

	html.concat('</table>');
	out.empty();
	out.html(html);
}

function runAlphabet()
{
	var string = "";
	var html = "<table><tr><th>Shift</th><th>Result</th></tr>";

	for (var i=0; i<alphabet.length; i++) // the shifts
	{
		string = ""; // Empty out the string for this run

		for (var j=0; j<message.length; j++) // Message iterator 
		{
			for (var k=0; k<alphabet.length; k++) // Alphabet iterator
			{
				if (message.charAt(j) == alphabet[k])
				{
					var c = getShiftedLetter(alphabet, k, i);
					string = string.concat(c);
					break;
				}
			}
		}

		html = html.concat("<tr><td>", i, "</td><td>", string, "</td></tr>");
	}

	html = html.concat("</table>");
	$('#runalphaout').empty();
	$('#runalphaout').html(html);
}

function getShiftedLetter(alphabet, index, shift)
{
	return alphabet[(index+shift)%alphabet.length];
}

function doAffineCipher(encrypt, mult, add)
{
	if (encrypt)
	{
		return affineEncrypt(mult, add);
	} else {
		return affineDecrypt(mult, add);
	}
}

function affineEncrypt(mult, add)
{
	var res = "";

	for (var i=0; i < message.length; i++)
	{
		var found = false;

		for (var j=0; j < alphabet.length; j++)
		{
			if (alphabet[j] == message.charAt(i))
			{
				found = true;
				var c = message.charAt(i).charCodeAt(0);
				c -= 64;
				c = (c * mult) % 26;
				c = (c + add) % 26;
				if (c == 0)
					c = 26;
				c = String.fromCharCode(c+64);
				res = res.concat(c);
			}
		}

		if (!found)
			res = res.concat(message.charAt(i));
	}
	return res;
}

function affineDecrypt(mult, add)
{
	var res = "";

	// need multiplicative inverse of multiplier
	switch (mult)
	{
		case 1:
			mult = 1;
			break;
		case 3:
			mult = 9;
			break;
		case 5:
			mult = 21;
			break;
		case 7:
			mult = 15;
			break;
		case 9:
			mult = 3;
			break;
		case 11:
			mult = 19;
			break;
		case 15:
			mult = 7;
			break;
		case 17:
			mult = 23;
			break;
		case 19:
			mult = 11;
			break;
		case 21:
			mult = 5;
			break;
		case 23:
			mult = 17;
			break;
		case 25:
			mult = 25;
			break;
	}

	for (var i=0; i < message.length; i++)
	{
		var found = false;
		for (var j=0; j < alphabet.length; j++)
		{
			if (message.charAt(i) == alphabet[j])
			{
				found = true;
				var c = message.charAt(i).charCodeAt(0);
				c -= 64;
				c = c + (26 - add) % 26;
				c = (c * mult) % 26;
				if (c == 0)
					c = 26;
				c = String.fromCharCode(c+64);
				res = res.concat(c);
			}
		}

		if (!found)
			res = res.concat(message.charAt(i));
	}

	return res;
}

function reverseCeasar(m, str, search)
{
	var counter;
	search = search.toUpperCase();
	var eSearch = "";
	var html = "";

	for (var x=0; x < 25; x++)
	{
		eSearch = "";
		for (var i=0; i < search.length; i++)
		{
			var found = false;
			for (var j=0; j < alphabet.length; j++)
			{
				if (alphabet[j] == search.charAt(i))
				{
					found = true;
					var c = search.charAt(i).charCodeAt(0);
					c -= 64;
					c = (c + x) % 26;
					c = (c * m) % 26;
					if (c == 0)
						c = 26;
					c = String.fromCharCode(c+64);
					eSearch = eSearch.concat(c);
				}
			}

			if (!found)
				eSearch = eSearch.concat(search.charAt(i));
		}

		counter = 0;

		if (str.indexOf(eSearch, 0) == 0)
			counter++;

		for (var y=0; y>=0;)
		{
			if ((y = str.indexOf(eSearch, y+1)) >= 0)
				counter++;
		}

		if (counter > 0)
			html = html.concat(eSearch + " appears " + counter + " times with a multiplicative key = " + m + " and an additive key = " + x + "<br/>");
	}

	return html;
}

function ceasar(m, str, search)
{
	var counter;
	search = search.toUpperCase();
	var eSearch = "";
	var html = "";

	for (var x=0; x < 25; x++)
	{
		eSearch = "";
		for (var i=0; i < search.length; i++)
		{
			var found = false;
			for (var j=0; j < alphabet.length; j++)
			{
				if (alphabet[j] == search.charAt(i))
				{
					found = true;
					var c = search.charAt(i).charCodeAt(0);
					c -= 64;
					c = (c * m) % 26;
					c = (c + x) % 26;
					if (c == 0)
						c = 26;
					c = String.fromCharCode(c+64);
					eSearch = eSearch.concat(c);
				}
			}

			if (!found)
				eSearch = eSearch.concat(search.charAt(i));
		}

		counter = 0;

		if (str.indexOf(eSearch, 0) == 0)
			counter++;

		for (var y=0; y>=0;)
		{
			if ((y = str.indexOf(eSearch, y+1)) >= 0)
				counter++;
		}

		if (counter > 0)
			html = html.concat(eSearch + " appears " + counter + " times with a multiplicative key = " + m + " and an additive key = " + x + "<br/>");
	}

	return html;
}

function affineKnownPt(search)
{
	var html = "";

	html = html.concat(ceasar(1, message, search));
	html = html.concat(ceasar(3, message, search));
	html = html.concat(ceasar(5, message, search));
	html = html.concat(ceasar(7, message, search));
	html = html.concat(ceasar(9, message, search));
	html = html.concat(ceasar(11, message, search));
	html = html.concat(ceasar(15, message, search));
	html = html.concat(ceasar(17, message, search));
	html = html.concat(ceasar(19, message, search));
	html = html.concat(ceasar(21, message, search));
	html = html.concat(ceasar(23, message, search));
	html = html.concat(ceasar(25, message, search));

	return html;
}

function vEncipher(key)
{
	var res = "";
	var msg = message.replace(/[\t\f\n\r]+/g, " ");
	msg = msg.replace(/\s+/g, '').toUpperCase();
	key = key.replace(/[\t\f\n\r]+/g, " ");
	key = key.replace(/\s+/g, '').toUpperCase();

	for (var i=0; i < msg.length; i++)
	{
		var c = msg.charAt(i);
		var kc = key.charAt(i % key.length);

		for (var j=0; j < vLookup.length; j++)
		{
			if (vLookup[j][0] == kc)
			{
				// Found the correct alphabet
				for (var k=0; k < alphabet.length; k++)
				{
					if (c == alphabet[k])
					{
						res = res.concat(vLookup[j][k]);
						break;
					}
				}
			}
		}
	}

	return res;
}

function vDecipher(key)
{
	var res = "";
	var msg = message.replace(/[\t\f\n\r]+/g, " ");
	msg = msg.replace(/\s+/g, '').toUpperCase();
	key = key.replace(/[\t\f\n\r]+/g, " ");
	key = key.replace(/\s+/g, '').toUpperCase();

	for (var i=0; i < msg.length; i++)
	{
		var c = msg.charAt(i);
		var kc = key.charAt(i % key.length)
		
		for (var j=0; j < vLookup.length; j++)
		{
			if (vLookup[j][0] == kc)
			{
				// Found the alphabet
				for (var x=0; x < vLookup[j].length; x++)
				{
					if (vLookup[j][x] == c)
					{
						res = res.concat(alphabet[x]);
						break;
					}
				}
			}
		}
	}

	return res;
}