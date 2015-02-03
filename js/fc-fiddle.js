// Initial template
function getBaseTemplate() {
    return "<!doctype html>\n" +
    "<html>\n\t" +
    "<head>\n\t\t" +
    "<meta charset=\"utf-8\">\n\t\t" +
    "<title>Test</title>\n\n\t\t\n\t" +
    "</head>\n\t" +
    "<body>\n\t\n\t" +
    "</body>\n" +
    "</html>";
}
function displayOutput() {
	var output_frame = document.getElementById('output-window'),
	html_window = document.getElementById('html-window'),
	css_window = document.getElementById('css-window'),
	js_window = document.getElementById('js-window');

	var html = html_window.value,
	css = css_window.value,
	js = js_window.value,
    external_resource_container = document.getElementById('resource-links');
    var resource_links = external_resource_container.getElementsByTagName('a');
    var total_links = resource_links.length;
    for (var i = 0; i < total_links; i++) {
        console.log(resource_links[i]);
        html += '<script src="'+resource_links[i].getAttribute('href')+'"></script>';
    }
    setIframeContent(output_frame, html, css, js);

}
function setIframeContent(target_frame, html_string, css_string, js_string) {
    
    var source_code = "";
    source_code = getBaseTemplate().replace('</body>', html_string + '</body>');

    // CSS
    css_string = '<style>' + css_string + '</style>';
    source_code = source_code.replace('</head>', css_string + '</head>');
 
    // Javascript
    js_string = '<script>' + js_string + '</script>';
    source_code = source_code.replace('</body>', js_string + '</body>');

    var iframe_doc = target_frame.contentDocument;
    iframe_doc.open();
    iframe_doc.write(source_code);
    iframe_doc.close();
}
function addExternalResource(event) {
    if(event.keyCode == 13 || event.which == 13) {
        var a = document.createElement('a');
        var linkText = document.createTextNode((this.value).substring(this.value.lastIndexOf('/')+1));
        a.appendChild(linkText);
        a.title = this.value;
        a.href = this.value;
        a.className = "external_resource";
        document.getElementById('resource-links').appendChild(a);
        this.value = ""; 
    }
}
function addTabSpace(event) {
    if(event.keyCode == 9 || event.which == 9) {
        event.preventDefault();
        var s = this.selectionStart;
            this.value = this.value.substring(0,this.selectionStart) + "\t" + this.value.substring(this.selectionEnd);
            this.selectionEnd = s+1;
    }
}
displayOutput();
document.getElementById('run').onclick = displayOutput;
document.getElementById('add-resource').onkeydown = addExternalResource;
document.getElementById('html-window').onkeydown = addTabSpace;
document.getElementById('css-window').onkeydown = addTabSpace;
document.getElementById('js-window').onkeydown = addTabSpace;



//$('#run').click(displayOutput);