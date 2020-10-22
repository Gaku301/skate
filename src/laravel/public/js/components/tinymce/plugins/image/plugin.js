(function () {
var image = (function () {
    'use strict';

    var global = tinymce.util.Tools.resolve('tinymce.PluginManager');

    var noop = function () {
      var args = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
      }
    };
    var constant = function (value) {
      return function () {
        return value;
      };
    };
    var identity = function (x) {
      return x;
    };
    var die = function (msg) {
      return function () {
        throw new Error(msg);
      };
    };
    var never = constant(false);
    var always = constant(true);

    var never$1 = never;
    var always$1 = always;
    var none = function () {
      return NONE;
    };
    var NONE = function () {
      var eq = function (o) {
        return o.isNone();
      };
      var call$$1 = function (thunk) {
        return thunk();
      };
      var id = function (n) {
        return n;
      };
      var noop$$1 = function () {
      };
      var nul = function () {
        return null;
      };
      var undef = function () {
        return undefined;
      };
      var me = {
        fold: function (n, s) {
          return n();
        },
        is: never$1,
        isSome: never$1,
        isNone: always$1,
        getOr: id,
        getOrThunk: call$$1,
        getOrDie: function (msg) {
          throw new Error(msg || 'error: getOrDie called on none.');
        },
        getOrNull: nul,
        getOrUndefined: undef,
        or: id,
        orThunk: call$$1,
        map: none,
        ap: none,
        each: noop$$1,
        bind: none,
        flatten: none,
        exists: never$1,
        forall: always$1,
        filter: none,
        equals: eq,
        equals_: eq,
        toArray: function () {
          return [];
        },
        toString: constant('none()')
      };
      if (Object.freeze)
        Object.freeze(me);
      return me;
    }();
    var some = function (a) {
      var constant_a = function () {
        return a;
      };
      var self = function () {
        return me;
      };
      var map = function (f) {
        return some(f(a));
      };
      var bind = function (f) {
        return f(a);
      };
      var me = {
        fold: function (n, s) {
          return s(a);
        },
        is: function (v) {
          return a === v;
        },
        isSome: always$1,
        isNone: never$1,
        getOr: constant_a,
        getOrThunk: constant_a,
        getOrDie: constant_a,
        getOrNull: constant_a,
        getOrUndefined: constant_a,
        or: self,
        orThunk: self,
        map: map,
        ap: function (optfab) {
          return optfab.fold(none, function (fab) {
            return some(fab(a));
          });
        },
        each: function (f) {
          f(a);
        },
        bind: bind,
        flatten: constant_a,
        exists: bind,
        forall: bind,
        filter: function (f) {
          return f(a) ? me : NONE;
        },
        equals: function (o) {
          return o.is(a);
        },
        equals_: function (o, elementEq) {
          return o.fold(never$1, function (b) {
            return elementEq(a, b);
          });
        },
        toArray: function () {
          return [a];
        },
        toString: function () {
          return 'some(' + a + ')';
        }
      };
      return me;
    };
    var from = function (value) {
      return value === null || value === undefined ? NONE : some(value);
    };
    var Option = {
      some: some,
      none: none,
      from: from
    };

    var typeOf = function (x) {
      if (x === null)
        return 'null';
      var t = typeof x;
      if (t === 'object' && Array.prototype.isPrototypeOf(x))
        return 'array';
      if (t === 'object' && String.prototype.isPrototypeOf(x))
        return 'string';
      return t;
    };
    var isType = function (type) {
      return function (value) {
        return typeOf(value) === type;
      };
    };
    var isString = isType('string');
    var isObject = isType('object');
    var isFunction = isType('function');
    var isNumber = isType('number');

    var each = function (xs, f) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        f(x, i, xs);
      }
    };
    var find = function (xs, pred) {
      for (var i = 0, len = xs.length; i < len; i++) {
        var x = xs[i];
        if (pred(x, i, xs)) {
          return Option.some(x);
        }
      }
      return Option.none();
    };
    var push = Array.prototype.push;
    var flatten = function (xs) {
      var r = [];
      for (var i = 0, len = xs.length; i < len; ++i) {
        if (!Array.prototype.isPrototypeOf(xs[i]))
          throw new Error('Arr.flatten item ' + i + ' was not an array, input: ' + xs);
        push.apply(r, xs[i]);
      }
      return r;
    };
    var slice = Array.prototype.slice;
    var from$1 = isFunction(Array.from) ? Array.from : function (x) {
      return slice.call(x);
    };

    var __assign = function () {
      __assign = Object.assign || function __assign(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
          s = arguments[i];
          for (var p in s)
            if (Object.prototype.hasOwnProperty.call(s, p))
              t[p] = s[p];
        }
        return t;
      };
      return __assign.apply(this, arguments);
    };

    var nu = function (baseFn) {
      var data = Option.none();
      var callbacks = [];
      var map$$1 = function (f) {
        return nu(function (nCallback) {
          get(function (data) {
            nCallback(f(data));
          });
        });
      };
      var get = function (nCallback) {
        if (isReady())
          call(nCallback);
        else
          callbacks.push(nCallback);
      };
      var set = function (x) {
        data = Option.some(x);
        run(callbacks);
        callbacks = [];
      };
      var isReady = function () {
        return data.isSome();
      };
      var run = function (cbs) {
        each(cbs, call);
      };
      var call = function (cb) {
        data.each(function (x) {
          setTimeout(function () {
            cb(x);
          }, 0);
        });
      };
      baseFn(set);
      return {
        get: get,
        map: map$$1,
        isReady: isReady
      };
    };
    var pure$1 = function (a) {
      return nu(function (callback) {
        callback(a);
      });
    };
    var LazyValue = {
      nu: nu,
      pure: pure$1
    };

    var bounce = function (f) {
      return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        var me = this;
        setTimeout(function () {
          f.apply(me, args);
        }, 0);
      };
    };

    var nu$1 = function (baseFn) {
      var get = function (callback) {
        baseFn(bounce(callback));
      };
      var map = function (fab) {
        return nu$1(function (callback) {
          get(function (a) {
            var value = fab(a);
            callback(value);
          });
        });
      };
      var bind = function (aFutureB) {
        return nu$1(function (callback) {
          get(function (a) {
            aFutureB(a).get(callback);
          });
        });
      };
      var anonBind = function (futureB) {
        return nu$1(function (callback) {
          get(function (a) {
            futureB.get(callback);
          });
        });
      };
      var toLazy = function () {
        return LazyValue.nu(get);
      };
      var toCached = function () {
        var cache = null;
        return nu$1(function (callback) {
          if (cache === null) {
            cache = toLazy();
          }
          cache.get(callback);
        });
      };
      return {
        map: map,
        bind: bind,
        anonBind: anonBind,
        toLazy: toLazy,
        toCached: toCached,
        get: get
      };
    };
    var pure$2 = function (a) {
      return nu$1(function (callback) {
        callback(a);
      });
    };
    var Future = {
      nu: nu$1,
      pure: pure$2
    };

    var value = function (o) {
      var is = function (v) {
        return o === v;
      };
      var or = function (opt) {
        return value(o);
      };
      var orThunk = function (f) {
        return value(o);
      };
      var map = function (f) {
        return value(f(o));
      };
      var mapError = function (f) {
        return value(o);
      };
      var each = function (f) {
        f(o);
      };
      var bind = function (f) {
        return f(o);
      };
      var fold = function (_, onValue) {
        return onValue(o);
      };
      var exists = function (f) {
        return f(o);
      };
      var forall = function (f) {
        return f(o);
      };
      var toOption = function () {
        return Option.some(o);
      };
      return {
        is: is,
        isValue: always,
        isError: never,
        getOr: constant(o),
        getOrThunk: constant(o),
        getOrDie: constant(o),
        or: or,
        orThunk: orThunk,
        fold: fold,
        map: map,
        mapError: mapError,
        each: each,
        bind: bind,
        exists: exists,
        forall: forall,
        toOption: toOption
      };
    };
    var error = function (message) {
      var getOrThunk = function (f) {
        return f();
      };
      var getOrDie = function () {
        return die(String(message))();
      };
      var or = function (opt) {
        return opt;
      };
      var orThunk = function (f) {
        return f();
      };
      var map = function (f) {
        return error(message);
      };
      var mapError = function (f) {
        return error(f(message));
      };
      var bind = function (f) {
        return error(message);
      };
      var fold = function (onError, _) {
        return onError(message);
      };
      return {
        is: never,
        isValue: never,
        isError: always,
        getOr: identity,
        getOrThunk: getOrThunk,
        getOrDie: getOrDie,
        or: or,
        orThunk: orThunk,
        fold: fold,
        map: map,
        mapError: mapError,
        each: noop,
        bind: bind,
        exists: never,
        forall: always,
        toOption: Option.none
      };
    };
    var Result = {
      value: value,
      error: error
    };

    var wrap = function (delegate) {
      var toCached = function () {
        return wrap(delegate.toCached());
      };
      var bindFuture = function (f) {
        return wrap(delegate.bind(function (resA) {
          return resA.fold(function (err) {
            return Future.pure(Result.error(err));
          }, function (a) {
            return f(a);
          });
        }));
      };
      var bindResult = function (f) {
        return wrap(delegate.map(function (resA) {
          return resA.bind(f);
        }));
      };
      var mapResult = function (f) {
        return wrap(delegate.map(function (resA) {
          return resA.map(f);
        }));
      };
      var mapError = function (f) {
        return wrap(delegate.map(function (resA) {
          return resA.mapError(f);
        }));
      };
      var foldResult = function (whenError, whenValue) {
        return delegate.map(function (res) {
          return res.fold(whenError, whenValue);
        });
      };
      var withTimeout = function (timeout, errorThunk) {
        return wrap(Future.nu(function (callback) {
          var timedOut = false;
          var timer = window.setTimeout(function () {
            timedOut = true;
            callback(Result.error(errorThunk()));
          }, timeout);
          delegate.get(function (result) {
            if (!timedOut) {
              window.clearTimeout(timer);
              callback(result);
            }
          });
        }));
      };
      return __assign({}, delegate, {
        toCached: toCached,
        bindFuture: bindFuture,
        bindResult: bindResult,
        mapResult: mapResult,
        mapError: mapError,
        foldResult: foldResult,
        withTimeout: withTimeout
      });
    };
    var nu$2 = function (worker) {
      return wrap(Future.nu(worker));
    };
    var value$1 = function (value) {
      return wrap(Future.pure(Result.value(value)));
    };
    var error$1 = function (error) {
      return wrap(Future.pure(Result.error(error)));
    };
    var fromResult = function (result) {
      return wrap(Future.pure(result));
    };
    var fromFuture = function (future) {
      return wrap(future.map(Result.value));
    };
    var fromPromise = function (promise) {
      return nu$2(function (completer) {
        promise.then(function (value) {
          completer(Result.value(value));
        }, function (error) {
          completer(Result.error(error));
        });
      });
    };
    var FutureResult = {
      nu: nu$2,
      wrap: wrap,
      pure: value$1,
      value: value$1,
      error: error$1,
      fromResult: fromResult,
      fromFuture: fromFuture,
      fromPromise: fromPromise
    };

    var hasOwnProperty = Object.prototype.hasOwnProperty;
    var shallow = function (old, nu) {
      return nu;
    };
    var deep = function (old, nu) {
      var bothObjects = isObject(old) && isObject(nu);
      return bothObjects ? deepMerge(old, nu) : nu;
    };
    var baseMerge = function (merger) {
      return function () {
        var objects = new Array(arguments.length);
        for (var i = 0; i < objects.length; i++)
          objects[i] = arguments[i];
        if (objects.length === 0)
          throw new Error('Can\'t merge zero objects');
        var ret = {};
        for (var j = 0; j < objects.length; j++) {
          var curObject = objects[j];
          for (var key in curObject)
            if (hasOwnProperty.call(curObject, key)) {
              ret[key] = merger(ret[key], curObject[key]);
            }
        }
        return ret;
      };
    };
    var deepMerge = baseMerge(deep);
    var merge = baseMerge(shallow);

    var Global = typeof window !== 'undefined' ? window : Function('return this;')();

    var path = function (parts, scope) {
      var o = scope !== undefined && scope !== null ? scope : Global;
      for (var i = 0; i < parts.length && o !== undefined && o !== null; ++i)
        o = o[parts[i]];
      return o;
    };
    var resolve = function (p, scope) {
      var parts = p.split('.');
      return path(parts, scope);
    };

    var unsafe = function (name, scope) {
      return resolve(name, scope);
    };
    var getOrDie = function (name, scope) {
      var actual = unsafe(name, scope);
      if (actual === undefined || actual === null)
        throw name + ' not available on this browser';
      return actual;
    };
    var Global$1 = { getOrDie: getOrDie };

    var url = function () {
      return Global$1.getOrDie('URL');
    };
    var createObjectURL = function (blob) {
      return url().createObjectURL(blob);
    };
    var revokeObjectURL = function (u) {
      url().revokeObjectURL(u);
    };
    var URL = {
      createObjectURL: createObjectURL,
      revokeObjectURL: revokeObjectURL
    };

    var makeItems = function (info) {
      var imageUrl = {
        name: 'src',
        type: 'urlinput',
        filetype: 'image',
        label: 'Source'
      };
      var imageList = info.imageList.map(function (items) {
        return {
          name: 'images',
          type: 'selectbox',
          label: 'Image list',
          items: items
        };
      });
      var imageDescription = {
        name: 'alt',
        type: 'input',
        label: 'Image description'
      };
      var imageTitle = {
        name: 'title',
        type: 'input',
        label: 'Image title'
      };
      var imageDimensions = {
        name: 'dimensions',
        type: 'sizeinput'
      };
      var classList = info.classList.map(function (items) {
        return {
          name: 'classes',
          type: 'selectbox',
          label: 'Class',
          items: items
        };
      });
      var caption = {
        type: 'label',
        label: 'Caption',
        items: [{
            type: 'checkbox',
            name: 'caption',
            label: 'Show caption'
          }]
      };
      return flatten([
        [imageUrl],
        imageList.toArray(),
        info.hasDescription ? [imageDescription] : [],
        info.hasImageTitle ? [imageTitle] : [],
        info.hasDimensions ? [imageDimensions] : [],
        [{
            type: 'grid',
            columns: 2,
            items: flatten([
              classList.toArray(),
              info.hasImageCaption ? [caption] : []
            ])
          }]
      ]);
    };
    var makeTab = function (info) {
      return {
        title: 'General',
        type: 'form',
        items: makeItems(info)
      };
    };
    var MainTab = {
      makeTab: makeTab,
      makeItems: makeItems
    };

    function FileReader () {
      var f = Global$1.getOrDie('FileReader');
      return new f();
    }

    var global$1 = tinymce.util.Tools.resolve('tinymce.util.Promise');

    var global$2 = tinymce.util.Tools.resolve('tinymce.util.Tools');

    var global$3 = tinymce.util.Tools.resolve('tinymce.util.XHR');

    var hasDimensions = function (editor) {
      return editor.settings.image_dimensions === false ? false : true;
    };
    var hasAdvTab = function (editor) {
      return editor.settings.image_advtab === true ? true : false;
    };
    var getPrependUrl = function (editor) {
      return editor.getParam('image_prepend_url', '');
    };
    var getClassList = function (editor) {
      return editor.getParam('image_class_list');
    };
    var hasDescription = function (editor) {
      return editor.settings.image_description === false ? false : true;
    };
    var hasImageTitle = function (editor) {
      return editor.settings.image_title === true ? true : false;
    };
    var hasImageCaption = function (editor) {
      return editor.settings.image_caption === true ? true : false;
    };
    var getImageList = function (editor) {
      return editor.getParam('image_list', false);
    };
    var hasUploadUrl = function (editor) {
      return !!editor.getParam('images_upload_url', false);
    };
    var hasUploadHandler = function (editor) {
      return !!editor.getParam('images_upload_handler', false);
    };
    var getUploadUrl = function (editor) {
      return editor.getParam('images_upload_url');
    };
    var getUploadHandler = function (editor) {
      return editor.getParam('images_upload_handler');
    };
    var getUploadBasePath = function (editor) {
      return editor.getParam('images_upload_base_path');
    };
    var getUploadCredentials = function (editor) {
      return editor.getParam('images_upload_credentials');
    };
    var Settings = {
      hasDimensions: hasDimensions,
      hasAdvTab: hasAdvTab,
      getPrependUrl: getPrependUrl,
      getClassList: getClassList,
      hasDescription: hasDescription,
      hasImageTitle: hasImageTitle,
      hasImageCaption: hasImageCaption,
      getImageList: getImageList,
      hasUploadUrl: hasUploadUrl,
      hasUploadHandler: hasUploadHandler,
      getUploadUrl: getUploadUrl,
      getUploadHandler: getUploadHandler,
      getUploadBasePath: getUploadBasePath,
      getUploadCredentials: getUploadCredentials
    };

    var parseIntAndGetMax = function (val1, val2) {
      return Math.max(parseInt(val1, 10), parseInt(val2, 10));
    };
    var getImageSize = function (url, callback) {
      var img = document.createElement('img');
      function done(dimensions) {
        if (img.parentNode) {
          img.parentNode.removeChild(img);
        }
        callback(dimensions);
      }
      img.onload = function () {
        var width = parseIntAndGetMax(img.width, img.clientWidth);
        var height = parseIntAndGetMax(img.height, img.clientHeight);
        var dimensions = {
          width: width,
          height: height
        };
        done(Result.value(dimensions));
      };
      img.onerror = function () {
        done(Result.error(undefined));
      };
      var style = img.style;
      style.visibility = 'hidden';
      style.position = 'fixed';
      style.bottom = style.left = '0px';
      style.width = style.height = 'auto';
      document.body.appendChild(img);
      img.src = url;
    };
    var buildListItems = function (inputList, itemCallback, startItems) {
      function appendItems(values, output) {
        output = output || [];
        global$2.each(values, function (item) {
          var menuItem = { text: item.text || item.title };
          if (item.menu) {
            menuItem.menu = appendItems(item.menu);
          } else {
            menuItem.value = item.value;
            itemCallback(menuItem);
          }
          output.push(menuItem);
        });
        return output;
      }
      return appendItems(inputList, startItems || []);
    };
    var removePixelSuffix = function (value) {
      if (value) {
        value = value.replace(/px$/, '');
      }
      return value;
    };
    var addPixelSuffix = function (value) {
      if (value.length > 0 && /^[0-9]+$/.test(value)) {
        value += 'px';
      }
      return value;
    };
    var mergeMargins = function (css) {
      if (css.margin) {
        var splitMargin = String(css.margin).split(' ');
        switch (splitMargin.length) {
        case 1:
          css['margin-top'] = css['margin-top'] || splitMargin[0];
          css['margin-right'] = css['margin-right'] || splitMargin[0];
          css['margin-bottom'] = css['margin-bottom'] || splitMargin[0];
          css['margin-left'] = css['margin-left'] || splitMargin[0];
          break;
        case 2:
          css['margin-top'] = css['margin-top'] || splitMargin[0];
          css['margin-right'] = css['margin-right'] || splitMargin[1];
          css['margin-bottom'] = css['margin-bottom'] || splitMargin[0];
          css['margin-left'] = css['margin-left'] || splitMargin[1];
          break;
        case 3:
          css['margin-top'] = css['margin-top'] || splitMargin[0];
          css['margin-right'] = css['margin-right'] || splitMargin[1];
          css['margin-bottom'] = css['margin-bottom'] || splitMargin[2];
          css['margin-left'] = css['margin-left'] || splitMargin[1];
          break;
        case 4:
          css['margin-top'] = css['margin-top'] || splitMargin[0];
          css['margin-right'] = css['margin-right'] || splitMargin[1];
          css['margin-bottom'] = css['margin-bottom'] || splitMargin[2];
          css['margin-left'] = css['margin-left'] || splitMargin[3];
        }
        delete css.margin;
      }
      return css;
    };
    var createImageList = function (editor, callback) {
      var imageList = Settings.getImageList(editor);
      if (typeof imageList === 'string') {
        global$3.send({
          url: imageList,
          success: function (text) {
            callback(JSON.parse(text));
          }
        });
      } else if (typeof imageList === 'function') {
        imageList(callback);
      } else {
        callback(imageList);
      }
    };
    var waitLoadImage = function (editor, data, imgElm) {
      function selectImage() {
        imgElm.onload = imgElm.onerror = null;
        if (editor.selection) {
          editor.selection.select(imgElm);
          editor.nodeChanged();
        }
      }
      imgElm.onload = function () {
        if (!data.width && !data.height && Settings.hasDimensions(editor)) {
          editor.dom.setAttribs(imgElm, {
            width: imgElm.clientWidth,
            height: imgElm.clientHeight
          });
        }
        selectImage();
      };
      imgElm.onerror = selectImage;
    };
    var blobToDataUri = function (blob) {
      return new global$1(function (resolve, reject) {
        var reader = FileReader();
        reader.onload = function () {
          resolve(reader.result);
        };
        reader.onerror = function () {
          reject(reader.error.message);
        };
        reader.readAsDataURL(blob);
      });
    };
    var Utils = {
      getImageSize: getImageSize,
      buildListItems: buildListItems,
      removePixelSuffix: removePixelSuffix,
      addPixelSuffix: addPixelSuffix,
      mergeMargins: mergeMargins,
      createImageList: createImageList,
      waitLoadImage: waitLoadImage,
      blobToDataUri: blobToDataUri
    };

    var global$4 = tinymce.util.Tools.resolve('tinymce.dom.DOMUtils');

    var DOM = global$4.DOM;
    var getHspace = function (image) {
      if (image.style.marginLeft && image.style.marginRight && image.style.marginLeft === image.style.marginRight) {
        return Utils.removePixelSuffix(image.style.marginLeft);
      } else {
        return '';
      }
    };
    var getVspace = function (image) {
      if (image.style.marginTop && image.style.marginBottom && image.style.marginTop === image.style.marginBottom) {
        return Utils.removePixelSuffix(image.style.marginTop);
      } else {
        return '';
      }
    };
    var getBorder = function (image) {
      if (image.style.borderWidth) {
        return Utils.removePixelSuffix(image.style.borderWidth);
      } else {
        return '';
      }
    };
    var getAttrib = function (image, name$$1) {
      if (image.hasAttribute(name$$1)) {
        return image.getAttribute(name$$1);
      } else {
        return '';
      }
    };
    var getStyle = function (image, name$$1) {
      return image.style[name$$1] ? image.style[name$$1] : '';
    };
    var hasCaption = function (image) {
      return image.parentNode !== null && image.parentNode.nodeName === 'FIGURE';
    };
    var setAttrib = function (image, name$$1, value) {
      image.setAttribute(name$$1, value);
    };
    var wrapInFigure = function (image) {
      var figureElm = DOM.create('figure', { class: 'image' });
      DOM.insertAfter(figureElm, image);
      figureElm.appendChild(image);
      figureElm.appendChild(DOM.create('figcaption', { contentEditable: true }, 'Caption'));
      figureElm.contentEditable = 'false';
    };
    var removeFigure = function (image) {
      var figureElm = image.parentNode;
      DOM.insertAfter(image, figureElm);
      DOM.remove(figureElm);
    };
    var toggleCaption = function (image) {
      if (hasCaption(image)) {
        removeFigure(image);
      } else {
        wrapInFigure(image);
      }
    };
    var normalizeStyle = function (image, normalizeCss) {
      var attrValue = image.getAttribute('style');
      var value = normalizeCss(attrValue !== null ? attrValue : '');
      if (value.length > 0) {
        image.setAttribute('style', value);
        image.setAttribute('data-mce-style', value);
      } else {
        image.removeAttribute('style');
      }
    };
    var setSize = function (name$$1, normalizeCss) {
      return function (image, name$$1, value) {
        if (image.style[name$$1]) {
          image.style[name$$1] = Utils.addPixelSuffix(value);
          normalizeStyle(image, normalizeCss);
        } else {
          setAttrib(image, name$$1, value);
        }
      };
    };
    var getSize = function (image, name$$1) {
      if (image.style[name$$1]) {
        return Utils.removePixelSuffix(image.style[name$$1]);
      } else {
        return getAttrib(image, name$$1);
      }
    };
    var setHspace = function (image, value) {
      var pxValue = Utils.addPixelSuffix(value);
      image.style.marginLeft = pxValue;
      image.style.marginRight = pxValue;
    };
    var setVspace = function (image, value) {
      var pxValue = Utils.addPixelSuffix(value);
      image.style.marginTop = pxValue;
      image.style.marginBottom = pxValue;
    };
    var setBorder = function (image, value) {
      var pxValue = Utils.addPixelSuffix(value);
      image.style.borderWidth = pxValue;
    };
    var setBorderStyle = function (image, value) {
      image.style.borderStyle = value;
    };
    var getBorderStyle = function (image) {
      return getStyle(image, 'borderStyle');
    };
    var isFigure = function (elm) {
      return elm.nodeName === 'FIGURE';
    };
    var isImage = function (elm) {
      return elm.nodeName === 'IMG';
    };
    var defaultData = function () {
      return {
        src: '',
        alt: '',
        title: '',
        width: '',
        height: '',
        class: '',
        style: '',
        caption: false,
        hspace: '',
        vspace: '',
        border: '',
        borderStyle: ''
      };
    };
    var getStyleValue = function (normalizeCss, data) {
      var image = document.createElement('img');
      setAttrib(image, 'style', data.style);
      if (getHspace(image) || data.hspace !== '') {
        setHspace(image, data.hspace);
      }
      if (getVspace(image) || data.vspace !== '') {
        setVspace(image, data.vspace);
      }
      if (getBorder(image) || data.border !== '') {
        setBorder(image, data.border);
      }
      if (getBorderStyle(image) || data.borderStyle !== '') {
        setBorderStyle(image, data.borderStyle);
      }
      return normalizeCss(image.getAttribute('style'));
    };
    var create = function (normalizeCss, data) {
      var image = document.createElement('img');
      write(normalizeCss, merge(data, { caption: false }), image);
      setAttrib(image, 'alt', data.alt);
      if (data.caption) {
        var figure = DOM.create('figure', { class: 'image' });
        figure.appendChild(image);
        figure.appendChild(DOM.create('figcaption', { contentEditable: true }, 'Caption'));
        figure.contentEditable = 'false';
        return figure;
      } else {
        return image;
      }
    };
    var read = function (normalizeCss, image) {
      return {
        src: getAttrib(image, 'src'),
        alt: getAttrib(image, 'alt'),
        title: getAttrib(image, 'title'),
        width: getSize(image, 'width'),
        height: getSize(image, 'height'),
        class: getAttrib(image, 'class'),
        style: normalizeCss(getAttrib(image, 'style')),
        caption: hasCaption(image),
        hspace: getHspace(image),
        vspace: getVspace(image),
        border: getBorder(image),
        borderStyle: getStyle(image, 'borderStyle')
      };
    };
    var updateProp = function (image, oldData, newData, name$$1, set) {
      if (newData[name$$1] !== oldData[name$$1]) {
        set(image, name$$1, newData[name$$1]);
      }
    };
    var normalized = function (set, normalizeCss) {
      return function (image, name$$1, value) {
        set(image, value);
        normalizeStyle(image, normalizeCss);
      };
    };
    var write = function (normalizeCss, newData, image) {
      var oldData = read(normalizeCss, image);
      updateProp(image, oldData, newData, 'caption', function (image, _name, _value) {
        return toggleCaption(image);
      });
      updateProp(image, oldData, newData, 'src', setAttrib);
      updateProp(image, oldData, newData, 'alt', setAttrib);
      updateProp(image, oldData, newData, 'title', setAttrib);
      updateProp(image, oldData, newData, 'width', setSize('width', normalizeCss));
      updateProp(image, oldData, newData, 'height', setSize('height', normalizeCss));
      updateProp(image, oldData, newData, 'class', setAttrib);
      updateProp(image, oldData, newData, 'style', normalized(function (image, value) {
        return setAttrib(image, 'style', value);
      }, normalizeCss));
      updateProp(image, oldData, newData, 'hspace', normalized(setHspace, normalizeCss));
      updateProp(image, oldData, newData, 'vspace', normalized(setVspace, normalizeCss));
      updateProp(image, oldData, newData, 'border', normalized(setBorder, normalizeCss));
      updateProp(image, oldData, newData, 'borderStyle', normalized(setBorderStyle, normalizeCss));
    };

    var normalizeCss = function (editor, cssText) {
      var css = editor.dom.styles.parse(cssText);
      var mergedCss = Utils.mergeMargins(css);
      var compressed = editor.dom.styles.parse(editor.dom.styles.serialize(mergedCss));
      return editor.dom.styles.serialize(compressed);
    };
    var getSelectedImage = function (editor) {
      var imgElm = editor.selection.getNode();
      var figureElm = editor.dom.getParent(imgElm, 'figure.image');
      if (figureElm) {
        return editor.dom.select('img', figureElm)[0];
      }
      if (imgElm && (imgElm.nodeName !== 'IMG' || imgElm.getAttribute('data-mce-object') || imgElm.getAttribute('data-mce-placeholder'))) {
        return null;
      }
      return imgElm;
    };
    var splitTextBlock = function (editor, figure) {
      var dom = editor.dom;
      var textBlock = dom.getParent(figure.parentNode, function (node) {
        return editor.schema.getTextBlockElements()[node.nodeName];
      }, editor.getBody());
      if (textBlock) {
        return dom.split(textBlock, figure);
      } else {
        return figure;
      }
    };
    var readImageDataFromSelection = function (editor) {
      var image = getSelectedImage(editor);
      return image ? read(function (css) {
        return normalizeCss(editor, css);
      }, image) : defaultData();
    };
    var insertImageAtCaret = function (editor, data) {
      var elm = create(function (css) {
        return normalizeCss(editor, css);
      }, data);
      editor.dom.setAttrib(elm, 'data-mce-id', '__mcenew');
      editor.focus();
      editor.selection.setContent(elm.outerHTML);
      var insertedElm = editor.dom.select('*[data-mce-id="__mcenew"]')[0];
      editor.dom.setAttrib(insertedElm, 'data-mce-id', null);
      if (isFigure(insertedElm)) {
        var figure = splitTextBlock(editor, insertedElm);
        editor.selection.select(figure);
      } else {
        editor.selection.select(insertedElm);
      }
    };
    var syncSrcAttr = function (editor, image) {
      editor.dom.setAttrib(image, 'src', image.getAttribute('src'));
    };
    var deleteImage = function (editor, image) {
      if (image) {
        var elm = editor.dom.is(image.parentNode, 'figure.image') ? image.parentNode : image;
        editor.dom.remove(elm);
        editor.focus();
        editor.nodeChanged();
        if (editor.dom.isEmpty(editor.getBody())) {
          editor.setContent('');
          editor.selection.setCursorLocation();
        }
      }
    };
    var writeImageDataToSelection = function (editor, data) {
      var image = getSelectedImage(editor);
      write(function (css) {
        return normalizeCss(editor, css);
      }, data, image);
      syncSrcAttr(editor, image);
      if (isFigure(image.parentNode)) {
        var figure = image.parentNode;
        splitTextBlock(editor, figure);
        editor.selection.select(image.parentNode);
      } else {
        editor.selection.select(image);
        Utils.waitLoadImage(editor, data, image);
      }
    };
    var insertOrUpdateImage = function (editor, data) {
      var image = getSelectedImage(editor);
      if (image) {
        if (data.src) {
          writeImageDataToSelection(editor, data);
        } else {
          deleteImage(editor, image);
        }
      } else if (data.src) {
        insertImageAtCaret(editor, data);
      }
    };

    var findMap = function (arr, f) {
      for (var i = 0; i < arr.length; i++) {
        var r = f(arr[i], i);
        if (r.isSome()) {
          return r;
        }
      }
      return Option.none();
    };

    var getValue = function (item) {
      return isString(item.value) ? item.value : '';
    };
    var sanitizeList = function (list, extractValue) {
      var out = [];
      global$2.each(list, function (item) {
        var text = isString(item.text) ? item.text : isString(item.title) ? item.title : '';
        if (item.menu !== undefined) {
          var items = sanitizeList(item.menu, extractValue);
          out.push({
            text: text,
            items: items
          });
        } else {
          var value = extractValue(item);
          out.push({
            text: text,
            value: value
          });
        }
      });
      return out;
    };
    var sanitizer = function (extracter) {
      if (extracter === void 0) {
        extracter = getValue;
      }
      return function (list) {
        if (list) {
          return Option.from(list).map(function (list) {
            return sanitizeList(list, extracter);
          });
        } else {
          return Option.none();
        }
      };
    };
    var sanitize = function (list) {
      return sanitizer(getValue)(list);
    };
    var isGroup = function (item) {
      return Object.prototype.hasOwnProperty.call(item, 'items');
    };
    var findEntryDelegate = function (list, value) {
      return findMap(list, function (item) {
        if (isGroup(item)) {
          return findEntryDelegate(item.items, value);
        } else if (item.value === value) {
          return Option.some(item);
        } else {
          return Option.none();
        }
      });
    };
    var findEntry = function (optList, value) {
      return optList.bind(function (list) {
        return findEntryDelegate(list, value);
      });
    };
    var ListUtils = {
      sanitizer: sanitizer,
      sanitize: sanitize,
      findEntry: findEntry
    };

    function XMLHttpRequest () {
      var f = Global$1.getOrDie('XMLHttpRequest');
      return new f();
    }

    var noop$1 = function () {
    };
    var pathJoin = function (path1, path2) {
      if (path1) {
        return path1.replace(/\/$/, '') + '/' + path2.replace(/^\//, '');
      }
      return path2;
    };
    function Uploader (settings) {
      var defaultHandler = function (blobInfo, success, failure, progress) {
        var xhr, formData;
        xhr = XMLHttpRequest();
        xhr.open('POST', settings.url);
        xhr.withCredentials = settings.credentials;
        xhr.upload.onprogress = function (e) {
          progress(e.loaded / e.total * 100);
        };
        xhr.onerror = function () {
          failure('Image upload failed due to a XHR Transport error. Code: ' + xhr.status);
        };
        xhr.onload = function () {
          var json;
          if (xhr.status < 200 || xhr.status >= 300) {
            failure('HTTP Error: ' + xhr.status);
            return;
          }
          json = JSON.parse(xhr.responseText);
          if (!json || typeof json.location !== 'string') {
            failure('Invalid JSON: ' + xhr.responseText);
            return;
          }
          success(pathJoin(settings.basePath, json.location));
        };
        formData = new FormData();
        formData.append('file', blobInfo.blob(), blobInfo.filename());
        xhr.send(formData);
      };
      var uploadBlob = function (blobInfo, handler) {
        return new global$1(function (resolve, reject) {
          try {
            handler(blobInfo, resolve, reject, noop$1);
          } catch (ex) {
            reject(ex.message);
          }
        });
      };
      var isDefaultHandler = function (handler) {
        return handler === defaultHandler;
      };
      var upload = function (blobInfo) {
        return !settings.url && isDefaultHandler(settings.handler) ? global$1.reject('Upload url missing from the settings.') : uploadBlob(blobInfo, settings.handler);
      };
      settings = global$2.extend({
        credentials: false,
        handler: defaultHandler
      }, settings);
      return { upload: upload };
    }

    var makeTab$1 = function (info) {
      return {
        title: 'Advanced',
        items: [
          {
            type: 'input',
            label: 'Style',
            name: 'style'
          },
          {
            type: 'grid',
            columns: 2,
            items: [
              {
                type: 'input',
                label: 'Vertical space',
                name: 'vspace'
              },
              {
                type: 'input',
                label: 'Horizontal space',
                name: 'hspace'
              },
              {
                type: 'input',
                label: 'Border width',
                name: 'border'
              },
              {
                type: 'selectbox',
                name: 'borderstyle',
                label: 'Border style',
                items: [
                  {
                    text: 'Select...',
                    value: ''
                  },
                  {
                    text: 'Solid',
                    value: 'solid'
                  },
                  {
                    text: 'Dotted',
                    value: 'dotted'
                  },
                  {
                    text: 'Dashed',
                    value: 'dashed'
                  },
                  {
                    text: 'Double',
                    value: 'double'
                  },
                  {
       `    "   `   4ext: 'grov%',
     "    !   0!    val5u:"'croovE'
  "               }<
           $"  $  {
 ""                 text: 'Ridge#,
  (    "       ( (  value: 'ridge'   `$       0    "},
        $         {
        (    $      text: §Inset',
          "   !     ~alue* 'inseT'
       (         !},
           0 0    ;
                    text: §Outset',
           (  !    $öalue: 7outset'
              )  0},
          0       {
  "       $   0     text: 'Noîe',   *!  (  $  !$     value:`&none'
  !    "        0 },
           (   `  {       (!   $    "  text: 'HiDdEn',
( "                0ralqe: hidden'
         $  `  (  }
        0  $    ]
              }
 ` !   `    \0 0       }
        ]*      };J"   u
    var AdöTab = {!laketab: ma+eTab1 ù;

  ( var cklleCt = vulct)o~ (e$)tor! {
      var0urlLhstQanHtizer`= ListUtils.qanédiúar(dunctioj (iTem+`z
     0  2eturn editor.co~öertURL(htem.value |þ -tem.usl. 'src');
      });
      rar!futureIm`çeList ½ eture.nu(functkon (completer) {J!       Uôil³.createImñgeList(ediur,0funcTion (mmaweList) {
    0    !bompleterh4rlListSajivizer(hlageLiqt).map(functakî (items) {
 (          return flittef)[
    "  `$     [{
   "              text8 'None',
            0     Value: 'o
  "  $   `      }],
 0            itdmS
  (  `      });$         }));
        });
      })
      vár cnaróList = listUt)ls.sanytyze(QEttings.gEtClassDist(edipos!);
      var hasAdvTab = Settivgs.hásAdvTiâ(%ditor)?      var hasUploadUrl = Setti~Gs.hasUploádUrl(åditnr(;
   a "Var hasUploadHandeer = Set|iNgs,hasWploadHanDler(editz);
      var imagM = readImaweavaFrom[ele#taon(edidor-;
      var haóDescriqtmon = Sedtings.xasTescription(editos);
 * `  v`r hasImageTmtle = Settings.hasImagePytde(editor);
 "    var hasDmmensio~s =$Setting3.hasDImensmofs(e$itor)?      vap hasImageCaqtion = Se´tinss.`asI}aGeCaption(%ditor);
     !tar url = Sattings.gedÕploadUrl(editor);
      var baSeQat`0= Settings/gedUploadBasePat((editor);
      var credentiads - Se|tings.getUploAdc2e`entials(editor);
   !  ver handler = Settings.getUploadXa.dle2(edétov);    $ var prependUR\ = Odtin.3ome Setuifgs.getTrependUrl(editor))&fi|ter(function (preUrl) 
 "     ¢return isQtring(4re\rl) && prmUrl.Lengdx > 2>  "   })+
  `   return fuuureÉmageList.map(function (imageList) {        returî {
   ` `   4imcge: image,08  `   ` ioageList: imag%List,*          kl!ssList; classList,
  " `     hasAdvVab: hawAdöTab<
          has]XloadUrl: lasUploadUrl,
     $    haSUploadHanelEr* hasUpladHAîdler,
   `      haSDescsiption: ha3ascriqtion,
   !  0   hasImageUitle: hasImageTatle,(`        èasDimensiïnóz lawDimensions,
         `asImageBaptiofº hayImageCapdin,
          urn:&5rd.
         (basePath:!basePcth,
  0       c"udentials: credeztialw,
      $   handLer>$xqndler,
        $ prdPendURL: qrependURL
        };
     (});
  " };

 `  rar makeTab$2 = functiï~ 8if&o) {
   $  ret5rn {
0    0  title:`'Upload',
    8   type: gnorm'(
 *      ivems: [{
     (! `   typm: 'drT{One',
   `        nam%> &filehn`ut',
            flex: prue
0     0   }]
      ½;    };
(   var UpdoadTAb(9 { makeTab: makeTab$2 =:

    var createS4ate`} fu~cuion 8info) [
$   !`return {$      `pråvImage: ListUtils.bindE~try(info.imageìyst, inno.imaoe/src),
 !     0prevAld: énfo.hmage.`lt,
   !    oqen: |bqe
     `};
"  (}
  ! var fromi}ag%Dapa = fufctin (iiage) k
    " reuurn$;
      # sVc: {
   !   (  6amu!: kmqge.qrc,          leva: {|
   $    ,
        images: h}age.cbc,        alt: image.alô,
        tétle: image.tathe,
        dimmnsionsz {
          wiDth: image&wiäth,
          heiçht: ëmagu.h%ight
!       },
   !    classew8 image.class,
  `   `caption: image.ca`tin ?`/checked' : g5ncèesked',
        stile: imiee.stylel
0  "   0vspacd: imcge.vSpace<        bvder> éMaoå.bosdEr,
   `  ! hspace: ýmawenhspice,
   `  ! borderct9le: )maee&corderStyl%,
        fileinput: []
  !0$ };
    };
    ôcr toIMqgeDcua`= function (dAta) {
(     return!{
   `    src: datasrc.value$"       aìp: data.alp,
    $   titlg: $atc.tatmE(
        uiàth: data.dim%nsions.wietl(  "     heifht:$da4a,dkoensions>heighp
     `  class: daTa.clasqEs$   (   $ótylå: eata.style,
        caption: data.#!pt)on =}= 'clecke`',
  $    (jspace: data.hsp`ce,
 $ 0 (  vspace:"data.vspacu(
        bosder: tata.border<
        borderStyle: data.bordebsvyle
   $  ];Š    };
 !  Var @ddPrmpanDUrl2 = fUnctyon (infm, srcURL) { 0 `  if (/^*?:[a-~A%Z]+)?\/\/.test(srcUR)) {
        beturn info.pr-pendURM.bind(funcvion (xrependUbl)(;
  "       if (wrcURL.substriN'(0, qrepandUrì.length) !==`prepefdQrl) {
       `    raturn O`tion.comd(prmpenDUrl + sscURL);
 "        }
   0      rettrn Option.none()
       0});
      }
      return Optionnkn%();
#  "};
    war addÐrependUrl`= function (i.fo,¤a`i) { (    vaz data ½ api.gåtData();
 !    aDdTzependUrl2(info, data.srâ.val}e!.eac(¨fujction (srcURL) {
    ! " atisetÄata(û
       "  src: {           0value: sskUBL,
       0    mmta: data/crc.meta
          }
  ,     })?
0     }!;
   0};*$   var formF©llromMgde2 = bu.ction (indo, dhta) {
      var m`ta - eatanrsc®leta;
   $  id (metC !=5 õndefineä) {
        var dctaCo0y_1 = de!pEerGe(û}, data!;        )f0(info.hasLesgriptioN && irSDping(meta.alt)) s
     "    datqCkpy_1.a,t ="mataamt:` `  4` }
0  $ !  if )nfo.hcsHmageTit|e$& )SStrinf(}eta®title)! {
      "   davaByy_1.tivle = meta.pitlm;
  $   `}
    !   if (info.hasEimånsionS) { "   0    if (isString(meta.wi`th))${
(    `     (daôaCopy_1.`imenr)ons.width = meta.width;
     (   $}
    (   ` if (isSvring(meta.height)) {
    !       ea5áCopy_1.dimefsions.(eifxt = meta.Height;
      !(  }
  "     }(     ` hf!(isStrino(metanclass)) {
          ListUtils.fyndEntrø(info.classLisô, meta.clars).each(fQnctiïn (entrI) {J $          ditaKoðy_9.clessas = enTry.value;
  $  `    }	;
   °    }    $   id (innm.HasAdvTab) {
0         if (isStrinã*meta.vsPace))({
      0!    daraCmpy_1.vórace = meôa.vspcce;Š          }
          af (isString(meta.fmrder)i {
   0        $atáCoPy_1.corder = mäta.corder;
!     `   }
          if hmsStriog*måta.hspáãe©) {(     #     ta4aClpy_1/hspace = aeta.èspacå;
à!        }
    "     iF (hsStrilgªmåta/bosderstylg-) {
            FataCopy_±bordErstxne = meta.borderstyle:
 °        }  "  " "}
      " re4urO Oqtion.some(dataCïpy]1);
"  0" }
   !  return Opuhon.none();
 `  };J $  v`r normBillFrommti = fuïction )ynno, ari) {
 ! &  formFillFriMeua2(info$ api.getd!ta()	/ea#h(function (Data) y
     !  peturo api.setData(data);
    ! });
    };    var"calculeteYmaeeSize = f=nction (hadpers,"ijgo, stAte, aPi) {
      vap `ata(= aPi.getDcta();
      var!uòl = data.src.v`mue;   "  v r"meta,= $ata.src.meta |x [};     "iæ (!meta.width && !meta.height && infkiarDimensions) {
        lehpers.imageSize8url).gev(function (Resulô)`{Š          resulT.each*functiOn (wiza) {
            éf hstaôe.open) {
 !    #0`  (  aði.setData*{ dimensions: 1izg });
          ! }
 $      ! }+;
   (  " });
      }
    };
    vaò updaueImagasDr/peown ? bunction (info, státe, arm) y
      var dqta = api.sevData();
  ! 0 vab image = LastUtils.findEntr|(iîfm.im#wmList, data*src.raluu)
    $ stAtd.prevImage ?`imaou;   !  cpi.cetata({
` `     mmages: xmage.maphfUnctkon (e.|vy) {
          re4urn eîtry.valqe;     `  }).gatOr,§)
      });
 0" };
    vár changeSrC 9 functio/ (helpevs, info( staôe( !xi) {
!     addP2ependUrl(info, api);
     "fosmFilmFrmíMeta(iNæo, api);
  0   cal3}latmImaceSize(helpdrs,!ingo, ótadd,"Qpi);      mp`ate	magesTropdown inno, ótate,"api);
 (  i;
    Var cxangeImages ?°function (helxdsS- info, state, apk) {* !0  0var data - api,getDatah); $ $  Var im!gu = ListUtils,fin$Entry(inf.imaceÌis4, data.images);
  $  "image.eacH,funcdion%(ioch"k
b      ,var updateAlt = data.alt ý==`#' || stateprevImawe.maq8fujcti/n!(ilaGe)({ `        return imege.teèT == da4Ñ.alt;
        }).getOr(fAlse);   € `  kf (upd`teA|t	 z
        0 if ()-g.value === '') z
     `      api.setDctaè{
0        (  ` sPc: {mg,
$       ( `   alt: ótatg*qre6Alt
" "         });
       $  } else {J            api.setDqti(û
 ``          àsBc: img,
          0"  alt: img.text
    $    0  }i;
  "       }
        } else {
        "(api/sedDa|a(; src: img }({*        m
     $});
      state.prevImage = imige;      changeSrc(helpersl info, {vatg, api); "  };
    var calcVSpace"= funbt)on ,css) {
      var matchijgTopBO´tom = css['mqrgin-uïp'] && css['margin-bottom'] ¦&0c{s['margin-top'] }== css{'marghn%"ttoí'
$     retqr~"mátchingTopJottïm ? Utils.remkvePixelSufb)x(String(Css['mirgintp'])) : '';
    U;
    var calcJpace0= fõnctaOn *Css) {
 "    fir oatchingLåftRéght = css['marw)n-rhghu']!&¦ css[&mar'ij-left%] && css[7margin-ryght'M === css['oasghn-left'];
      return matchingLeftRhg(t"} ]tils.removdpixglSuffix(Strmng(css['marwin-bight'])) : '';
    };
    var calcBorderWi`th = functiof (cs3) {
      ret5rn csc['bordmr-wkdth'] ; Utils.rEio6m@ixelSuffix(String(css['borddr­wiDth'_y) : ''3
   !};
    Vqr calcBorderStYle = function ,ãss) {      `eturn cSsK%border-style']$? String¨cssÛ/b}rdaR-s4yle'}) : '';
!   }9
!$ (~`r(calcStyle 5 fõnction (parseStyle serializeStyde,"css)$û
      re4urn"±e2iil)zeCtylE(parseStyle(seRialazeStyle(sss)));
    };
    var$chcnfeStyle2 = function (parseSty,e, 3erialhzeS|yld, data) s
0     var css = Ut)ls*mErgåEqsgiNs(parsåStyle(deta.style));
    0 var dataCOpy = deepMeree({|,"dqt!):
1     dataCop9.vrpace = calc^Space(css	;
      DataCmpy.hstace = ce,cHSpace(css);
¨     dá|aSo0y®bo2der =(calcBopderWkdth8css);
  (  dataCopy.bnrdersty,e = calcBorderStyle(css);
      dataCopx.styme = calcStyhE*qarseSuylå, seriqlizeStylg, css+;
  $   reuurn dataCopy;
    };
¢ " faz #hANãeWtùle = fun#vion (helPmr3, api! {
  `   var data = api.oetDate(©;
   !  var newData = chanfeStyde2(heì`ers.parseStyle, helperó.serializeStyle,$data);
      api.setData(neuData);
    }:
    v`r chejgeASTyle = functkon (jelpess. yl&o, `pi) {
!   $ ~ar deta 9 `eepMerge(FromImageDat` info.image),$api.gõtDat!());
 0 !  var 3t{le = ge4StylåVa|we(helðersnormalizeSó, foImageData(datA));*      api.setData(k styleº spy¬e });
€  "};
$ " rAp changeFileInptô = function (helperr,$info, s4etel Api)!{
      6ar data = api.ge|Daeá));
      !pi.block(§Upl/cdano imAgeg);
      vaz file = detc.fileinpet[0];
      var blobUré = URL.ãreateObject]RL(fyle)+  (   var uploaäer = Pp,oater({
        url:!info.url,
  h     rasuPaph: ánfO.basePa|h,
        csedentialS; iffo.còedentials,
        xan`leà: info.hcndluR      });
      ôar finaìize = fujctiof (( {
        `pi.unBlock();
  ` $  (R/²evokeObnectURL(blobUri);
      };
      Utils.blobPoDataUri(file)>thå.funã\ion (da$aUòl	 {
        var(bìobANfo = helpezs.crdaveBlobCac(e(file, blorTri¬ $a}aUrl%;
   `    uploader.upmoqd(blo@Inæk).the~(functimn (erl( y
   $      api.setDatA(;
 !          src: {
    &     !  value: url, 0    $       meta:({}
            }
     $    });
      0   Api.showTaB('Genebal');
"         changeSrchalpers,0info,"stave¬ api)+
     "   (nénalaze*);
 !!     }).satc((fufction((Err) {
($        fin1lé:e¨);
          helpers.alerpErr(api,$mrr);
        }(;     !};
   0}:
   #vqr changeHalEder = functign ¨helters, iNfo, state! {
      returîafuo!tion cpi, evt) {
    ($  if )e>t.naÍe == 'src') {
          chanceSrc(he$pers,`info, state, apy);
     $  } else if"(evt.naMe ==5('images' {
          changeImqges(helpeps, ijfo, staTå,`api);
&   `   } else if (ev4.na}e === '!lt') {J      ` " statg.pratAlt = api.getDa5a().alt;
       (} ålse m& (evt.name"==- 'style')${
          changeS4}lehelpers, api)?      ( } els% if (avt..ame =-= 'vspake' ||"evt&nam% --½ ghspac%' l} evt.nio%"=== 'borde2'`|| evt.name === 'bordErstyle') {``      ` changeAStyle(hel`ers, info, api	;
   "    } else if1(evt*name === 'fileinput') {
  $    (  chanfeF)neInðwt(helpers, ijfo, sT`t¥¬ ápy);
    !`  }
  ( ! ];
 $  g{
    6ar closeHanll%r 5 funbtion ¨state) {
   &  re4urn`fu/ctIon`() {
   "(  0Sôate.open = fclse;   $  m;
 0  };
    vaò makeDmalogBody < funcôign (info),{
   b  ib (	nfo.hasAdvTab |ü iffo.hasUploadUrl || info/hcsMploadHanthar) {
     `  var tabPanel = {
      !  `qype: 'tabpaNål',
          tabs* flatten [
 (          [Maincb.makeTaB(info)],Š         $  info.jesADVÕ!b ? ÛAdVTAb.mek`TAb(info)_ : []<   0   "(   ijfnhasDploaDUrl || knfo.hasUploadHandler  [UploatTab.mik¥Tabjinfo)] : []
$        (])
        };    !   returf ta"Pao%l;"    " } elsm {
        var(panel 5 {
`"        tyðe: 'ðánel',
   ,      ktems:(MainPab>makeHtels(inoo)
        };
 `      retuvn0panel;
    ( y
    };    vir eak%Diqlog0= fungtimn (helpers) {B      rmtõrn &unction (info) {
 !0     var"sta4e = creatmState(info);
  (     retwrn {
  0       tiple: 'Énsert/EdIt Imáge#,
 `  *     size: #novmal',Ê       "  bodyº m!kdDhalOoB/dy(ingk),Š        ` butTons: [
           ${
0       !    04ype: 'cancel',
          (  °name: cancel&,
       `      textz #Cancel'
``          },
  !     `   {
      €    !  tY`e: 'subíit',
         "   name: 'seve',
       "  $   texu2 gSave#,
 `           0pvioary: true      $   ( }
          ]<          iniôialata: fromMmagåDadá(info.im`'e),
          onSu"mit:!helpavq&n.ubmit¨ilfï),
 ! "     `onàange: changeH ndler(xelperS, i.fo, 3tate	,
 0(`      onClose: cloSeHand­er(stateiŠ        y;
      ];
   ¤};
    var!cubmiTHandler0= &unction!(editkr) {
      re4urn0genctin (i~bo)!{         rEturn function  ari) {          w¥r data = deepMmrge(fromImageData(Infoimage(,ápi.getD)ta())3
( $ ¢     editoR&tndkMag!çgr.transact(fun#uion ) {
$     `     in3ertOrUpdatmIma'e(edidor, toImagedata(Fapa));  0       });    $     editor.efitorUpmoaf.uploadImágusAuto();
     $    ati.close();
   (    }:
      };
    }º
    var imagePizE = funcôion!(editnr!0{
      returl funs4io. (urd)"{
4       return FetureResult.nu*funsvion (completer) [
          Utiló.gatIm@geSize(editor®docummntBaseURI.toAbwoluve(url)¬ æunst)ïn (Data) {
    (       öar result = daTa.bind(fõnctiol (`imencions) {
( $ !         retupo (isStbing(eimensions.wieth- || isNumber(dimenóionó.width)) && (isString(dimensinnw.heicht) || isBumber(dimefsionsohå)ght)) ? Besult.value({                skdth: Ótringh@ieensi/ns.wadth!,
       0       height: Strinb(dimensiOns.height)
              ) : Result.errob(undefined);
   $     $  });
            ckípleter(Jecult);
          });
 0"     });J      };
   !};
  $`6ar createBlofCAch% = Functaon (eDitor) {
  `   return fefctkn (&ile, blobUri, eapawrl) {
 !      return editor&edatOrUplo¡enblObCqãhe.gruatå({   "      blob: file,`       ! blobUri: blofUri,
     "   `name: fiäe.name ? fyle.namm.rdplace8/\.[^\.\/$/,!'') :8îull,
!     (   base64: äap`Url.splét(','(Y1]
     "  }9;B      };
    };:    var(qdertFrr = vunction (editor)`;
      retern function (apm$`message) {
        editOr*windmwManaGer.elårt(easSage, api.clo{e);*      };
    };
    vcr .ormalizeCss$1 - nuNction ¬eäitor) {
      return fuîctio. (ksrText)¢y
     !` return novmálizeKss(eDitor csText	;
      };
    };
   !var"pabs%Styhe$= Fun#tIOî! edivor) {
  `0  return(functkon (cssText) {
       `ret5rn e`itor.dom.parseStylå(csSText);
!     };
  $ };
    v!r seriahízeStùle = function (åditor9${
 " (  retu2n function (rv{ldsArg, name) {
   !    reuurn editop.dom.sgrializeStyle(styhes@{g, nama);
! `   };
    };
  "(var)Di`loc ½ f5nction (5ditor) {
   "  ar he|pers ? {Š        onSubmit: submi|Handler(editor-,
       ")maceSize80imageSize(editor+,
 €      creat%BlobCaãhe* createBloæCachå(edipor),   !   0alertErr: alertErr.eda4or),
      ` noRmali~eCss: normalizeCss$1(mditor),
        parseSt8l%; parr%Style(editor)$
      0 seria<izeStyle: serializeSpyle(editor-
      };
  ! ((var oxen = fUnctinn () s
" $p0! `ret5rn col|ect(editov).oap(-a+eDialog(Helpers)).get(fõ~c4ion"(spec)€k
0¤     !  ufitor.win4owManager.npån(speC);
    $   });
`  `  };
      return { oxejš pul };
    };
    var register =`funãtion  Editob) {
  "`  e$itor.iddomman$:#mãeImqge', Dialog(ediuOr).p%n);    };
`   Vqr CommaNls = { Racister: regi3ter };

    v!r4hasImageCìass = funcvif (nmde) {
      var className  nodd.attr('clasw&);
    $ return className &&!'\bimag%\b/.test(clácsName+;
    };    tar"toggìeContantEditacleState = function (sta|g) {   0  return dunction (Nodeó)({   !    Tap i = jodes.length, nFe;
   $   0var togcleCnndentAditable = function (node) {
          node.attr('contenteditable', state ? 'true' : null);
        };
        while (i--) {
          node = nodes[i];
          if (hasImageClass(node)) {
            node.attr('contenteditable', state ? 'false' : null);
            global$2.each(node.getAll('figcaption'), toggleContentEditable);
          }
        }
      };
    };
    var setup = function (editor) {
      editor.on('preInit', function () {
        editor.parser.addNodeFilter('figure', toggleContentEditableState(true));
        editor.serializer.addNodeFilter('figure', toggleContentEditableState(false));
      });
    };
    var FilterContent = { setup: setup };

    var fromHtml = function (html, scope) {
      var doc = scope || document;
      var div = doc.createElement('div');
      div.innerHTML = html;
      if (!div.hasChildNodes() || div.childNodes.length > 1) {
        console.error('HTML does not have a single root node', html);
        throw new Error('HTML must have a single root node');
      }
      return fromDom(div.childNodes[0]);
    };
    var fromTag = function (tag, scope) {
      var doc = scope || document;
      var node = doc.createElement(tag);
      return fromDom(node);
    };
    var fromText = function (text, scope) {
      var doc = scope || document;
      var node = doc.createTextNode(text);
      return fromDom(node);
    };
    var fromDom = function (node) {
      if (node === null || node === undefined) {
        throw new Error('Node cannot be null or undefined');
      }
      return { dom: constant(node) };
    };
    var fromPoint = function (docElm, x, y) {
      var doc = docElm.dom();
      return Option.from(doc.elementFromPoint(x, y)).map(fromDom);
    };
    var Element$$1 = {
      fromHtml: fromHtml,
      fromTag: fromTag,
      fromText: fromText,
      fromDom: fromDom,
      fromPoint: fromPoint
    };

    var ATTRIBUTE = Node.ATTRIBUTE_NODE;
    var CDATA_SECTION = Node.CDATA_SECTION_NODE;
    var COMMENT = Node.COMMENT_NODE;
    var DOCUMENT = Node.DOCUMENT_NODE;
    var DOCUMENT_TYPE = Node.DOCUMENT_TYPE_NODE;
    var DOCUMENT_FRAGMENT = Node.DOCUMENT_FRAGMENT_NODE;
    var ELEMENT = Node.ELEMENT_NODE;
    var TEXT = Node.TEXT_NODE;
    var PROCESSING_INSTRUCTION = Node.PROCESSING_INSTRUCTION_NODE;
    var ENTITY_REFERENCE = Node.ENTITY_REFERENCE_NODE;
    var ENTITY = Node.ENTITY_NODE;
    var NOTATION = Node.NOTATION_NODE;

    var name = function (element) {
      var r = element.dom().nodeName;
      return r.toLowerCase();
    };

    var Immutable = function () {
      var fields = [];
      for (var _i = 0; _i < arguments.length; _i++) {
        fields[_i] = arguments[_i];
      }
      return function () {
        var values = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          values[_i] = arguments[_i];
        }
        if (fields.length !== values.length) {
          throw new Error('Wrong number of arguments to struct. Expected "[' + fields.length + ']", got ' + values.length + ' arguments');
        }
        var struct = {};
        each(fields, function (name, i) {
          struct[name] = constant(values[i]);
        });
        return struct;
      };
    };

    var node = function () {
      var f = Global$1.getOrDie('Node');
      return f;
    };
    var compareDocumentPosition = function (a, b, match) {
      return (a.compareDocumentPosition(b) & match) !== 0;
    };
    var documentPositionPreceding = function (a, b) {
      return compareDocumentPosition(a, b, node().DOCUMENT_POSITION_PRECEDING);
    };
    var documentPositionContainedBy = function (a, b) {
      return compareDocumentPosition(a, b, node().DOCUMENT_POSITION_CONTAINED_BY);
    };
    var Node$1 = {
      documentPositionPreceding: documentPositionPreceding,
      documentPositionContainedBy: documentPositionContainedBy
    };

    var cached = function (f) {
      var called = false;
      var r;
      return function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
          args[_i] = arguments[_i];
        }
        if (!called) {
          called = true;
          r = f.apply(null, args);
        }
        return r;
      };
    };

    var firstMatch = function (regexes, s) {
      for (var i = 0; i < regexes.length; i++) {
        var x = regexes[i];
        if (x.test(s))
          return x;
      }
      return undefined;
    };
    var find$2 = function (regexes, agent) {
      var r = firstMatch(regexes, agent);
      if (!r)
        return {
          major: 0,
          minor: 0
        };
      var group = function (i) {
        return Number(agent.replace(r, '$' + i));
      };
      return nu$3(group(1), group(2));
    };
    var detect = function (versionRegexes, agent) {
      var cleanedAgent = String(agent).toLowerCase();
      if (versionRegexes.length === 0)
        return unknown();
      return find$2(versionRegexes, cleanedAgent);
    };
    var unknown = function () {
      return nu$3(0, 0);
    };
    var nu$3 = function (major, minor) {
      return {
        major: major,
        minor: minor
      };
    };
    var Version = {
      nu: nu$3,
      detect: detect,
      unknown: unknown
    };

    var edge = 'Edge';
    var chrome = 'Chrome';
    var ie = 'IE';
    var opera = 'Opera';
    var firefox = 'Firefox';
    var safari = 'Safari';
    var isBrowser = function (name, current) {
      return function () {
        return current === name;
      };
    };
    var unknown$1 = function () {
      return nu$4({
        current: undefined,
        version: Version.unknown()
      });
    };
    var nu$4 = function (info) {
      var current = info.current;
      var version = info.version;
      return {
        current: current,
        version: version,
        isEdge: isBrowser(edge, current),
        isChrome: isBrowser(chrome, current),
        isIE: isBrowser(ie, current),
        isOpera: isBrowser(opera, current),
        isFirefox: isBrowser(firefox, current),
        isSafari: isBrowser(safari, current)
      };
    };
    var Browser = {
      unknown: unknown$1,
      nu: nu$4,
      edge: constant(edge),
      chrome: constant(chrome),
      ie: constant(ie),
      opera: constant(opera),
      firefox: constant(firefox),
      safari: constant(safari)
    };

    var windows = 'Windows';
    var ios = 'iOS';
    var android = 'Android';
    var linux = 'Linux';
    var osx = 'OSX';
    var solaris = 'Solaris';
    var freebsd = 'FreeBSD';
    var isOS = function (name, current) {
      return function () {
        return current === name;
      };
    };
    var unknown$2 = function () {
      return nu$5({
        current: undefined,
        version: Version.unknown()
      });
    };
    var nu$5 = function (info) {
      var current = info.current;
      var version = info.version;
      return {
        current: current,
        version: version,
        isWindows: isOS(windows, current),
        isiOS: isOS(ios, current),
        isAndroid: isOS(android, current),
        isOSX: isOS(osx, current),
        isLinux: isOS(linux, current),
        isSolaris: isOS(solaris, current),
        isFreeBSD: isOS(freebsd, current)
      };
    };
    var OperatingSystem = {
      unknown: unknown$2,
      nu: nu$5,
      windows: constant(windows),
      ios: constant(ios),
      android: constant(android),
      linux: constant(linux),
      osx: constant(osx),
      solaris: constant(solaris),
      freebsd: constant(freebsd)
    };

    var DeviceType = function (os, browser, userAgent) {
      var isiPad = os.isiOS() && /ipad/i.test(userAgent) === true;
      var isiPhone = os.isiOS() && !isiPad;
      var isAndroid3 = os.isAndroid() && os.version.major === 3;
      var isAndroid4 = os.isAndroid() && os.version.major === 4;
      var isTablet = isiPad || isAndroid3 || isAndroid4 && /mobile/i.test(userAgent) === true;
      var isTouch = os.isiOS() || os.isAndroid();
      var isPhone = isTouch && !isTablet;
      var iOSwebview = browser.isSafari() && os.isiOS() && /safari/i.test(userAgent) === false;
      return {
        isiPad: constant(isiPad),
        isiPhone: constant(isiPhone),
        isTablet: constant(isTablet),
        isPhone: constant(isPhone),
        isTouch: constant(isTouch),
        isAndroid: os.isAndroid,
        isiOS: os.isiOS,
        isWebView: constant(iOSwebview)
      };
    };

    var detect$1 = function (candidates, userAgent) {
      var agent = String(userAgent).toLowerCase();
      return find(candidates, function (candidate) {
        return candidate.search(agent);
      });
    };
    var detectBrowser = function (browsers, userAgent) {
      return detect$1(browsers, userAgent).map(function (browser) {
        var version = Version.detect(browser.versionRegexes, userAgent);
        return {
          current: browser.name,
          version: version
        };
      });
    };
    var detectOs = function (oses, userAgent) {
      return detect$1(oses, userAgent).map(function (os) {
        var version = Version.detect(os.versionRegexes, userAgent);
        return {
          current: os.name,
          version: version
        };
      });
    };
    var UaString = {
      detectBrowser: detectBrowser,
      detectOs: detectOs
    };

    var contains$1 = function (str, substr) {
      return str.indexOf(substr) !== -1;
    };

    var normalVersionRegex = /.*?version\/\ ?([0-9]+)\.([0-9]+).*/;
    var checkContains = function (target) {
      return function (uastring) {
        return contains$1(uastring, target);
      };
    };
    var browsers = [
      {
        name: 'Edge',
        versionRegexes: [/.*?edge\/ ?([0-9]+)\.([0-9]+)$/],
        search: function (uastring) {
          var monstrosity = contains$1(uastring, 'edge/') && contains$1(uastring, 'chrome') && contains$1(uastring, 'safari') && contains$1(uastring, 'applewebkit');
          return monstrosity;
        }
      },
      {
        name: 'Chrome',
        versionRegexes: [
          /.*?chrome\/([0-9]+)\.([0-9]+).*/,
          normalVersionRegex
        ],
        search: function (uastring) {
          return contains$1(uastring, 'chrome') && !contains$1(uastring, 'chromeframe');
        }
      },
      {
        name: 'IE',
        versionRegexes: [
          /.*?msie\ ?([0-9]+)\.([0-9]+).*/,
          /.*?rv:([0-9]+)\.([0-9]+).*/
        ],
        search: function (uastring) {
          return contains$1(uastring, 'msie') || contains$1(uastring, 'trident');
        }
      },
      {
        name: 'Opera',
        versionRegexes: [
          normalVersionRegex,
          /.*?opera\/([0-9]+)\.([0-9]+).*/
        ],
        search: checkContains('opera')
      },
      {
        name: 'Firefox',
        versionRegexes: [/.*?firefox\/\ ?([0-9]+)\.([0-9]+).*/],
        search: checkContains('firefox')
      },
      {
        name: 'Safari',
        versionRegexes: [
          normalVersionRegex,
          /.*?cpu os ([0-9]+)_([0-9]+).*/
        ],
        search: function (uastring) {
          return (contains$1(uastring, 'safari') || contains$1(uastring, 'mobile/')) && contains$1(uastring, 'applewebkit');
        }
      }
    ];
    var oses = [
      {
        name: 'Windows',
        search: checkContains('win'),
        versionRegexes: [/.*?windows\ nt\ ?([0-9]+)\.([0-9]+).*/]
      },
      {
        name: 'iOS',
        search: function (uastring) {
          return contains$1(uastring, 'iphone') || contains$1(uastring, 'ipad');
        },
        versionRegexes: [
          /.*?version\/\ ?([0-9]+)\.([0-9]+).*/,
          /.*cpu os ([0-9]+)_([0-9]+).*/,
          /.*cpu iphone os ([0-9]+)_([0-9]+).*/
        ]
      },
      {
        name: 'Android',
        search: checkContains('android'),
        versionRegexes: [/.*?android\ ?([0-9]+)\.([0-9]+).*/]
      },
      {
        name: 'OSX',
        search: checkContains('os x'),
        versionRegexes: [/.*?os\ x\ ?([0-9]+)_([0-9]+).*/]
      },
      {
        name: 'Linux',
        search: checkContains('linux'),
        versionRegexes: []
      },
      {
        name: 'Solaris',
        search: checkContains('sunos'),
        versionRegexes: []
      },
      {
        name: 'FreeBSD',
        search: checkContains('freebsd'),
        versionRegexes: []
      }
    ];
    var PlatformInfo = {
      browsers: constant(browsers),
      oses: constant(oses)
    };

    var detect$2 = function (userAgent) {
      var browsers = PlatformInfo.browsers();
      var oses = PlatformInfo.oses();
      var browser = UaString.detectBrowser(browsers, userAgent).fold(Browser.unknown, Browser.nu);
      var os = UaString.detectOs(oses, userAgent).fold(OperatingSystem.unknown, OperatingSystem.nu);
      var deviceType = DeviceType(os, browser, userAgent);
      return {
        browser: browser,
        os: os,
        deviceType: deviceType
      };
    };
    var PlatformDetection = { detect: detect$2 };

    var detect$3 = cached(function () {
      var userAgent = navigator.userAgent;
      return PlatformDetection.detect(userAgent);
    });
    var PlatformDetection$1 = { detect: detect$3 };

    var regularContains = function (e1, e2) {
      var d1 = e1.dom();
      var d2 = e2.dom();
      return d1 === d2 ? false : d1.contains(d2);
    };
    var ieContains = function (e1, e2) {
      return Node$1.documentPositionContainedBy(e1.dom(), e2.dom());
    };
    var browser = PlatformDetection$1.detect().browser;
    var contains$2 = browser.isIE() ? ieContains : regularContains;

    var parent = function (element) {
      var dom = element.dom();
      return Option.from(dom.parentNode).map(Element$$1.fromDom);
    };
    var spot = Immutable('element', 'offset');

    var getRootElement = function (elm) {
      return parent(elm).filter(function (parentElm) {
        return name(parentElm) === 'figure';
      }).getOr(elm);
    };
    var register$1 = function (editor) {
      var makeContextMenuItem = function (node) {
        return {
          text: 'Image',
          icon: 'image',
          onAction: function () {
            var rootElm = getRootElement(Element$$1.fromDom(node));
            editor.selection.select(rootElm.dom());
            Dialog(editor).open();
          }
        };
      };
      editor.ui.registry.addToggleButton('image', {
        icon: 'image',
        tooltip: 'Insert/edit image',
        onAction: Dialog(editor).open,
        onSetup: function (buttonApi) {
          return editor.selection.selectorChangedWithUnbind('img:not([data-mce-object],[data-mce-placeholder]),figure.image', buttonApi.setActive).unbind;
        }
      });
      editor.ui.registry.addMenuItem('image', {
        icon: 'image',
        text: 'Image...',
        onAction: Dialog(editor).open
      });
      editor.ui.registry.addContextMenu('image', {
        update: function (element) {
          return isFigure(element) || isImage(element) ? [makeContextMenuItem(element)] : [];
        }
      });
    };
    var Buttons = { register: register$1 };

    global.add('image', function (editor) {
      FilterContent.setup(editor);
      Buttons.register(editor);
      Commands.register(editor);
    });
    function Plugin () {
    }

    return Plugin;

}());
})();
