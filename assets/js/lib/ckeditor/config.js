/**
 * @license Copyright (c) 2003-2022, CKSource Holding sp. z o.o. All rights reserved.
 * For licensing, see https://ckeditor.com/legal/ckeditor-oss-license
 */

CKEDITOR.editorConfig = function( config ) {
	config.toolbarGroups = [
		{ name: 'clipboard', groups: [ 'clipboard', 'undo' ] },
		{ name: 'document', groups: [ 'doctools', 'mode', 'document' ] },
		{ name: 'tools', groups: [ 'tools' ] },
		{ name: 'editing', groups: [ 'find', 'selection', 'spellchecker', 'editing' ] },
		{ name: 'forms', groups: [ 'forms' ] },
		'/',
		{ name: 'styles', groups: [ 'styles' ] },
		{ name: 'colors', groups: [ 'colors' ] },
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph', groups: [ 'align', 'indent', 'list', 'blocks', 'bidi', 'paragraph' ] },
		{ name: 'insert', groups: [ 'insert' ] },
		{ name: 'links', groups: [ 'links' ] },
		'/',
		{ name: 'others', groups: [ 'others' ] },
		{ name: 'about', groups: [ 'about' ] }
	];
	config.extraPlugins = 'uploadimage';
	config.language = 'ko';
	config.filebrowserUploadUrl = '/resource/uploadImage?a=1';
	config.removeDialogTabs = 'image:advanced;link:advanced';
	//config.removeButtons = 'Save,NewPage,ExportPdf,Print,Cut,Copy,Paste,PasteText,PasteFromWord,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Blockquote,BidiLtr,BidiRtl,Language,Smiley,PageBreak,TextColor,BGColor,About,CopyFormatting,Font,FontSize,CreateDiv,Templates,Preview,HorizontalRule,SpecialChar,Iframe,Anchor,Strike,Subscript,Superscript,Styles,Table,Maximize';
	config.removeButtons = 'Save,NewPage,ExportPdf,Print,Cut,Copy,Paste,PasteText,PasteFromWord,Find,Replace,SelectAll,Scayt,Form,Checkbox,Radio,TextField,Textarea,Select,Button,ImageButton,HiddenField,Blockquote,BidiLtr,BidiRtl,Language,Smiley,PageBreak,BGColor,About,CopyFormatting,Font,CreateDiv,Templates,Preview,HorizontalRule,SpecialChar,Iframe,Anchor,Strike,Subscript,Superscript,Maximize,Styles,NumberedList,Table';
};

CKEDITOR.config.contentsCss = '/css_onm/ckEditor_overwrite.css';

CKEDITOR.on('dialogDefinition', function( ev ){
	var dialog = ev.data.definition.dialog;
	var dialogName = ev.data.name;
	var dialogDefinition = ev.data.definition;
	switch (dialogName) {
		case 'image': // 이미지 속성창이 보일때 안보이게 하기 위해서 .
			//dialogDefinition.removeContents('info');
			dialogDefinition.removeContents('Link');
			dialogDefinition.removeContents('advanced');
			dialog.on('show', function (obj) {
				this.selectPage('Upload'); //업로드텝으로 시작
			});
			break;
		case 'link': // 링크 속성창이 보일때 안보이게 하기 위해서 .
			//dialogDefinition.removeContents('info');
			dialogDefinition.removeContents('upload');
			//dialogDefinition.removeContents('target');
			dialogDefinition.removeContents('advanced');

			var targetTab = dialogDefinition.getContents( 'target' );
			targetTab.elements[0].children[0].default="_blank";
			dialog.on('show', function (obj) {
				this.selectPage('info'); //info 시작
				//$('option[value="_blank"]').click();
			});
			break;
	}
});

CKEDITOR.on( 'instanceReady', function( event ) {

	event.editor.on( 'fileUploadResponse', function( evt ) {
		// Prevent the default response handler.
		evt.stop();
		// Get XHR and response.
		var data = evt.data,
			xhr = data.fileLoader.xhr,
			response = xhr.responseText.split( '|' );
		if ( response[ 1 ] ) {
			// An error occurred during upload.
			data.message = response[ 1 ];
			evt.cancel();
		} else {
			var temp = JSON.parse(response[ 0 ]);
			if(temp.hasOwnProperty('url')){
				data.url = temp.url.replace(/&amp;/g, '&');
			} else if(temp.hasOwnProperty('error')){
				if(typeof  Popup !== 'undefined') {
					Popup.showSimplePopup(temp.error);
				} else {
					alert(temp.error);
				}
			} else {
				alert("파일 전송 오류");
			}
		}
	});

	event.editor.on( 'fileUploadRequest', function( evt ) {

		var fileLoader = evt.data.fileLoader;
		var formData = new FormData();
		var xhr = fileLoader.xhr;

		var header = $("meta[name='_csrf_header']").attr("content");
		var token = $("meta[name='_csrf']").attr("content");
		if(header && token){
			xhr.setRequestHeader(header, token);
		}

		var url = fileLoader.uploadUrl;
		// var type = fileLoader.file.type;
		// if(type.split('/')[0] != 'image'){
		// 	url = '/resource/uploadLinkFile?a=1';
		// }

		xhr.withCredentials = true;
		xhr.open('POST',url , true);
		formData.append('upload', fileLoader.file, fileLoader.fileName);
		xhr.send(formData);

		// Prevented the default behavior.
		evt.stop();
	} );

} );