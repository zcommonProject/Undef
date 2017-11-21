;(function (global, factory) {
    global.$undef = factory(global);
}(this === window ? this : window, function () {

    var mergeOptions,
        noop,
        textScroller,
        moveTo;

    moveTo = function moveTo(selector, to, form, callback) {
        var timer = null;
        var moveAnimate = function moveAnimate(direction) {
           clearTimeout(timer);
           if (to >= Math.abs(form)) {
               console.log('动画运动完成');
               return false;
           }
           to++;
           selector.style[direction] = (0 - to) + 'px';
           timer = setTimeout(moveAnimate.bind(null, direction), 10);
        }
        callback(moveAnimate);
    }

    mergeOptions = function (that, options) {
        var opt = that.options = that.constructor.options;
        opt.mode = options.mode || opt.mode || '';
        opt.time = options.time || opt.time || '';
        opt.isMouseOverStop = options.isMouseOverStop || opt.isMouseOverStop || '';
        opt.executBefore = options.executBefore || opt.executBefore || noop;
        opt.executAfter = options.executAfter || opt.executAfter || noop;
        return opt;
    }

    noop = function noop() {}

    textScroller = function textScroller(selector, options) {
        if (this instanceof textScroller) {
            var that = this;
            this.__init(selector, options);
        } else {
            return new textScroller(selector, options);
        }
    }

    textScroller.prototype = {
        constructor: textScroller,
        __init: function (selector, options) {
            console.log('%c textScroller initialize...', 'color: green');
            var opt,
                oSubSelector,
                initializeNodeAttributes;
            selector.style.position = 'relative';
            opt = mergeOptions(this, options);
            oSubSelector = selector.querySelector('.J_textScroll_Control');
            oSubSelector.style.position = 'absolute';
            oSubSelector.style.top = 0;
            initializeNodeAttributes = function (oSubUlSelector, opt) {
                var oSubLiSelector = oSubUlSelector.getElementsByTagName('li');
                opt._length = oSubLiSelector.length;
                opt._height = oSubLiSelector[0].offsetHeight;
            }
            initializeNodeAttributes(oSubSelector, opt);
            console.log(opt);
            moveTo(oSubSelector, 0, -32, function (animate) {
                animate('top');
            });
        }
    }

    textScroller.options = {
        mode: 'default',
        time: 1000,
        isMouseOverStop: false,
        executBefore: noop,
        executAfter: noop
    };

    return textScroller;

}));