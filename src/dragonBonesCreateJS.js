/// <reference path="createjs.d.ts"/>
/// <reference path="dragonBones.ts"/>
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var dragonBones;
(function (dragonBones) {
    var display;
    (function (display) {
        var CreateJSDisplayBridge = /** @class */ (function () {
            function CreateJSDisplayBridge() {
            }
            CreateJSDisplayBridge.prototype.getVisible = function () {
                return this._display ? this._display.visible : false;
            };
            CreateJSDisplayBridge.prototype.setVisible = function (value) {
                if (this._display) {
                    this._display.visible = value;
                }
            };
            CreateJSDisplayBridge.prototype.getDisplay = function () {
                return this._display;
            };
            CreateJSDisplayBridge.prototype.setDisplay = function (value) {
                if (this._display == value) {
                    return;
                }
                if (this._display) {
                    var parent = this._display.parent;
                    if (parent) {
                        var index = this._display.parent.getChildIndex(this._display);
                    }
                    this.removeDisplay();
                }
                this._display = value;
                this.addDisplay(parent, index);
            };
            CreateJSDisplayBridge.prototype.dispose = function () {
                this._display = null;
            };
            CreateJSDisplayBridge.prototype.updateTransform = function (matrix, transform) {
                /*
                var pivotX:number = this._display.regX;
                var pivotY:number = this._display.regY;
                matrix.tx -= matrix.a * pivotX + matrix.c * pivotY;
                matrix.ty -= matrix.b * pivotX + matrix.d * pivotY;

                this._display._matrix.a = matrix.a;
                this._display._matrix.b = matrix.b;
                this._display._matrix.c = matrix.c;
                this._display._matrix.d = matrix.d;
                this._display._matrix.tx = matrix.tx;
                this._display._matrix.ty = matrix.ty;
                */
                this._display.x = matrix.tx;
                this._display.y = matrix.ty;
                this._display.skewX = transform.skewX * CreateJSDisplayBridge.RADIAN_TO_ANGLE;
                this._display.skewY = transform.skewY * CreateJSDisplayBridge.RADIAN_TO_ANGLE;
                this._display.scaleX = transform.scaleX;
                this._display.scaleY = transform.scaleY;
            };
            CreateJSDisplayBridge.prototype.updateColor = function (aOffset, rOffset, gOffset, bOffset, aMultiplier, rMultiplier, gMultiplier, bMultiplier) {
                if (this._display) {
                    var filters = this._display.filters;
                    if (!filters) {
                        this._display.filters = filters = [];
                    }
                    var colorFilter;
                    if (filters.length > 0) {
                        for (var index in filters) {
                            if (filters[index] instanceof createjs.ColorFilter) {
                                colorFilter = filters[index];
                                break;
                            }
                        }
                    }
                    if (colorFilter) {
                        colorFilter.alphaMultiplier = aMultiplier;
                        colorFilter.redMultiplier = rMultiplier;
                        colorFilter.greenMultiplier = gMultiplier;
                        colorFilter.blueMultiplier = bMultiplier;
                        colorFilter.alphaOffset = aOffset;
                        colorFilter.redOffset = rOffset;
                        colorFilter.greenOffset = gOffset;
                        colorFilter.blueOffset = bOffset;
                    }
                    else {
                        colorFilter = new createjs.ColorFilter(rMultiplier, gMultiplier, bMultiplier, aMultiplier, rOffset, gOffset, bOffset, aOffset);
                        filters.push(colorFilter);
                    }
                    if (this._display.cacheCanvas) {
                        this._display.updateCache();
                    }
                    else {
                        this._display.cache(0, 0, this._display.width, this._display.height);
                    }
                }
            };
            CreateJSDisplayBridge.prototype.addDisplay = function (container, index) {
                var parent = container;
                if (parent && this._display) {
                    if (index < 0) {
                        parent.addChild(this._display);
                    }
                    else {
                        parent.addChildAt(this._display, Math.min(index, parent.getNumChildren()));
                    }
                }
            };
            CreateJSDisplayBridge.prototype.removeDisplay = function () {
                if (this._display && this._display.parent) {
                    this._display.parent.removeChild(this._display);
                }
            };
            CreateJSDisplayBridge.prototype.updateBlendMode = function (blendMode) {
            };
            CreateJSDisplayBridge.RADIAN_TO_ANGLE = 180 / Math.PI;
            return CreateJSDisplayBridge;
        }());
        display.CreateJSDisplayBridge = CreateJSDisplayBridge;
    })(display = dragonBones.display || (dragonBones.display = {}));
    var textures;
    (function (textures) {
        var CreateJSTextureAtlas = /** @class */ (function () {
            function CreateJSTextureAtlas(image, textureAtlasRawData, scale) {
                if (scale === void 0) { scale = 1; }
                this._regions = {};
                this.image = image;
                this.scale = scale;
                this.parseData(textureAtlasRawData);
            }
            CreateJSTextureAtlas.prototype.dispose = function () {
                this.image = null;
                this._regions = null;
            };
            CreateJSTextureAtlas.prototype.getRegion = function (subTextureName) {
                return this._regions[subTextureName];
            };
            CreateJSTextureAtlas.prototype.parseData = function (textureAtlasRawData) {
                var textureAtlasData = dragonBones.objects.DataParser.parseTextureAtlasData(textureAtlasRawData, this.scale);
                this.name = textureAtlasData.__name;
                delete textureAtlasData.__name;
                for (var subTextureName in textureAtlasData) {
                    this._regions[subTextureName] = textureAtlasData[subTextureName];
                }
            };
            return CreateJSTextureAtlas;
        }());
        textures.CreateJSTextureAtlas = CreateJSTextureAtlas;
    })(textures = dragonBones.textures || (dragonBones.textures = {}));
    var factorys;
    (function (factorys) {
        var CreateJSFactory = /** @class */ (function (_super) {
            __extends(CreateJSFactory, _super);
            function CreateJSFactory() {
                return _super.call(this) || this;
            }
            /** @private */
            CreateJSFactory.prototype._generateArmature = function () {
                var armature = new dragonBones.Armature(new createjs.Container());
                return armature;
            };
            /** @private */
            CreateJSFactory.prototype._generateSlot = function () {
                var slot = new dragonBones.Slot(new display.CreateJSDisplayBridge());
                return slot;
            };
            /** @private */
            CreateJSFactory.prototype._generateDisplay = function (textureAtlas, fullName, pivotX, pivotY) {
                var rect = textureAtlas.getRegion(fullName);
                if (rect) {
                    var shape = new createjs.Shape(null);
                    var newMatrix = new createjs.Matrix2D(1, 0, 0, 1, 0, 0);
                    newMatrix.a = 1;
                    newMatrix.b = 0;
                    newMatrix.c = 0;
                    newMatrix.d = 1;
                    newMatrix.scale(1 / textureAtlas.scale, 1 / textureAtlas.scale);
                    newMatrix.tx = -rect.x - pivotX;
                    newMatrix.ty = -rect.y - pivotY;
                    shape.graphics.beginBitmapFill(textureAtlas.image, null, newMatrix);
                    shape.graphics.drawRect(-pivotX, -pivotY, rect.width, rect.height);
                    shape.cache(-pivotX, -pivotY, rect.width, rect.height);
                    //(<any> shape).width = rect.width;
                    //(<any> shape).height = rect.height;
                }
                return shape;
            };
            CreateJSFactory._helpMatrix = new createjs.Matrix2D(1, 0, 0, 1, 0, 0);
            return CreateJSFactory;
        }(factorys.BaseFactory));
        factorys.CreateJSFactory = CreateJSFactory;
    })(factorys = dragonBones.factorys || (dragonBones.factorys = {}));
})(dragonBones || (dragonBones = {}));
