(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("quill"));
	else if(typeof define === 'function' && define.amd)
		define(["quill"], factory);
	else if(typeof exports === 'object')
		exports["ReactQuill"] = factory(require("quill"));
	else
		root["ReactQuill"] = factory(root["Quill"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_3__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/*!**********************!*\
  !*** ./src/index.js ***!
  \**********************/
/***/ (function(module, exports, __webpack_require__) {

	/*
	React-Quill v0.4.1
	https://github.com/zenoamaro/react-quill
	*/
	module.exports = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./component\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	module.exports.Mixin = __webpack_require__(/*! ./mixin */ 2);
	module.exports.Toolbar = __webpack_require__(!(function webpackMissingModule() { var e = new Error("Cannot find module \"./toolbar\""); e.code = 'MODULE_NOT_FOUND'; throw e; }()));
	module.exports.Quill = __webpack_require__(/*! quill */ 3);


/***/ }),
/* 1 */,
/* 2 */
/*!**********************!*\
  !*** ./src/mixin.js ***!
  \**********************/
/***/ (function(module, exports, __webpack_require__) {

	'use strict';
	
	var Quill = __webpack_require__(/*! quill */ 3);
	
	var QuillMixin = {
	
		/**
		Creates an editor on the given element. The editor will
		be passed the configuration, have its events bound,
		*/
		createEditor: function($el, config) {
			var editor = new Quill($el, config);
			this.hookEditor(editor);
			return editor;
		},
	
		hookEditor: function(editor) {
			// Expose the editor on change events via a weaker,
			// unprivileged proxy object that does not allow
			// accidentally modifying editor state.
			var unprivilegedEditor = this.makeUnprivilegedEditor(editor);
	
			editor.on('text-change', function(delta, source) {
				if (this.onEditorChange) {
					this.onEditorChange(
						editor.getHTML(), delta, source,
						unprivilegedEditor
					);
				}
			}.bind(this));
	
			editor.on('selection-change', function(range, source) {
				if (this.onEditorChangeSelection) {
					this.onEditorChangeSelection(
						range, source,
						unprivilegedEditor
					);
				}
			}.bind(this));
		},
	
		destroyEditor: function(editor) {
			editor.destroy();
		},
	
		setEditorReadOnly: function(editor, value) {
			value? editor.editor.disable()
			     : editor.editor.enable();
		},
	
		/*
		Replace the contents of the editor, but keep
		the previous selection hanging around so that
		the cursor won't move.
		*/
		setEditorContents: function(editor, value) {
			var sel = editor.getSelection();
			editor.setHTML(value || '');
			if (sel) this.setEditorSelection(editor, sel);
		},
	
		setEditorSelection: function(editor, range) {
			if (range) {
				// Validate bounds before applying.
				var length = editor.getLength();
				range.start = Math.max(0, Math.min(range.start, length-1));
				range.end = Math.max(range.start, Math.min(range.end, length-1));
			}
			editor.setSelection(range);
		},
	
		/*
		Returns an weaker, unprivileged proxy object that only
		exposes read-only accessors found on the editor instance,
		without any state-modificating methods.
		*/
		makeUnprivilegedEditor: function(editor) {
			var e = editor;
			return {
				getLength:    function(){ e.getLength.apply(e, arguments); },
				getText:      function(){ e.getText.apply(e, arguments); },
				getHTML:      function(){ e.getHTML.apply(e, arguments); },
				getContents:  function(){ e.getContents.apply(e, arguments); },
				getSelection: function(){ e.getSelection.apply(e, arguments); },
				getBounds:    function(){ e.getBounds.apply(e, arguments); },
			};
		}
	
	};
	
	module.exports = QuillMixin;


/***/ }),
/* 3 */
/*!**************************************************************************************!*\
  !*** external {"commonjs":"quill","commonjs2":"quill","amd":"quill","root":"Quill"} ***!
  \**************************************************************************************/
/***/ (function(module, exports) {

	module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ })
/******/ ])
});
;
//# sourceMappingURL=react-quill.js.map