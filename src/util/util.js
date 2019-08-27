var Common = {};
var activeClassName = "active";
var parentStyleClassName = "parentStyle";
var styleItemClassName = "xb-editor";


Common.install = function (Vue, options) {
    // 3. 注入组件
    Vue.mixin(
        {
            methods: {

                rgb2hex: function (rgb) {
                    var reg = /(\d{1,3}),(\d{1,3}),(\d{1,3})/;
                    var arr = reg.exec(rgb);

                    function hex(x) {
                        return ("0" + parseInt(x).toString(16)).slice(-2);
                    }
                    var _hex = "#" + hex(arr[1]) + hex(arr[2]) + hex(arr[3]);
                    return _hex.toUpperCase();
                },
                // 4. 添加实例方法
                hasClass: function (elements, cName) {
                    if (elements != null && elements.className != null && elements.className.match != undefined) {
                        //console.log(elements)
                        return !!elements.className.match(new RegExp("(\\s|^)" + cName + "(\\s|$)"));
                    }

                    return false;
                },
                addClass: function (elements, cName) {
                    if (!this.hasClass(elements, cName)) {
                        elements.className += " " + cName;
                    };
                },
                removeClass: function (elements, cName) {
                    if (this.hasClass(elements, cName)) {
                        elements.className = elements.className.replace(new RegExp("(\\s|^)*" + cName + "(\\s|$)*"), " ");
                    };
                },
                activeItem: function (selectedItem, doc) {
                    this.deactiveItem(doc);
                    //将所选的所有的父子级样式都给active样式
                    var firstFoundStyleItemParent = null;
                    while (true) {


                        var styleItemParent = this.getStyleItemParent(selectedItem);
                        if (styleItemParent == null) {
                            break;
                        }
                        else {
                            this.current_active_item = styleItemParent;

                            this.addClass(this.current_active_item, activeClassName);
                        }

                        if (firstFoundStyleItemParent == null) {

                            //修正激活的元素
                            // "<section class='parentStyle' style='margin: 0px auto; width: 100%;'><p style='display: block;'/>" +
                            //     this.insertHtml +
                            //     "<p style='display: block;'/></section><br />&nbsp;";

                            if (this.hasClass(styleItemParent.parentNode, parentStyleClassName) == false) {
                                var parentStyleSection = document.createElement("section");
                                this.addClass(parentStyleSection, parentStyleClassName)

                                parentStyleSection.style.cssText = "margin: 0px auto; width: 100%;";

                                //先将新的包围放到样式元素之前

                                //console.log(styleItemParent)
                                this.insertAfter(parentStyleSection, styleItemParent);

                                //完善包围里的元素
                                var parentStyleChildP1 = document.createElement("p");
                                parentStyleChildP1.style.cssText = "display: block;";
                                parentStyleChildP1.innerHTML = "<br>";

                                parentStyleSection.appendChild(parentStyleChildP1);

                                //将原来的样式放入包围
                                parentStyleSection.appendChild(styleItemParent);

                                var parentStyleChildP2 = document.createElement("p");
                                parentStyleChildP2.style.cssText = "display: block;";
                                parentStyleChildP2.innerHTML = "<br>";

                                parentStyleSection.appendChild(parentStyleChildP2);


                            }

                            firstFoundStyleItemParent = styleItemParent;
                        }
                        selectedItem = styleItemParent;
                    }

                    return firstFoundStyleItemParent;

                },

                deactiveItem: function (doc) {
                    //console.log(doc);

                    if (this.current_active_item != undefined) {
                        this.removeClass(this.current_active_item, activeClassName);


                        var els = doc.querySelectorAll("." + activeClassName)


                        for (i = 0; i < els.length; ++i) {

                            this.removeClass(els[i], activeClassName);
                        }
                    }


                },

                getStyleItemParent: function (elem) {
                    styleItem = null;


                    while (elem.parentNode && elem.parentNode.tagName != 'BODY') {
                        if (this.hasClass(elem.parentNode, styleItemClassName)) {
                            //console.log('找到了：' + elem.tagName)
                            styleItem = elem.parentNode;
                            break;
                        }

                        //console.log("寻找" + elem.tagName)
                        elem = elem.parentNode;
                    }


                    return styleItem;
                },
                findStyleItemRootWithStyle: function (elem) {
                    styleItem = null;

                    while (elem.parentNode && elem.parentNode.tagName != 'BODY') {
                        if (this.hasClass(elem.parentNode, styleItemClassName)) {
                            //console.log('找到了：' + elem.tagName)
                            styleItem = elem.parentNode;
                        }

                        //console.log("寻找" + elem.tagName)
                        elem = elem.parentNode;
                    }

                    return styleItem;
                },
                setVendor: function (element, property, value) {
                    element.style[property] = value;
                    element.style["webkit" + property] = value;
                    element.style["moz" + property] = value;
                    element.style["ms" + property] = value;
                    element.style["o" + property] = value;
                },
                insertAfter: function (newElement, targetElement) {
                    var parent = targetElement.parentNode;
                    //console.log(parent)
                    if (parent.lastChild == targetElement) {
                        parent.appendChild(newElement);
                    } else {
                        parent.insertBefore(newElement, targetElement.nextSibling)
                    }
                },
                insertBefore: function (newElement, targetElement) {
                    targetElement.parentNode.insertBefore(newElement, targetElement);
                },
                flashBackground: function (element) {
                    var colorFlag = 0;
                    var flashCount = 0;

                    var temp = this;

                    var flashInterval = setInterval(function () {

                        if (!colorFlag) {
                            //element.style.background = "#ff0000EE";
                            temp.addClass(element, "attention")
                            colorFlag = 1;
                        } else {
                            //element.style.background = "";
                            temp.removeClass(element, "attention")
                            colorFlag = 0;
                        }
                        flashCount++;
                        if (flashCount > 5) {
                            temp.removeClass(element, "attention")
                            clearInterval(flashInterval);
                        }
                    }
                        , 200);
                },
                getAllChildNode: function (allNodes, node) {

                    //先找到子结点
                    var nodeList = node.childNodes;
                    for (var i = 0; i < nodeList.length; i++) {
                        //childNode获取到到的节点包含了各种类型的节点
                        //但是我们只需要元素节点  通过nodeType去判断当前的这个节点是不是元素节点
                        var childNode = nodeList[i];
                        //判断是否是元素结点
                        if (childNode.nodeType == 1) {
                            //childNode.style.border = "1px solid blue";
                            allNodes.push(childNode)

                            this.getAllChildNode(allNodes, childNode);
                        }
                    }

                }, getAllSiblingsNodes: function (elm) {
                    var a = [];    //保存所有兄弟节点
                    var p = elm.parentNode.children; //获取父级的所有子节点
                    for (var i = 0; i < p.length; i++) {  //循环
                        if (p[i].nodeType == 1 && p[i] != elm) {  //如果该节点是元素节点与不是这个节点本身
                            a.push(p[i]);      // 添加到兄弟节点里
                        }
                    }

                    return a;

                }, getAllSiblingsNodesAfter: function (elm) {
                    var a = [];    //保存所有兄弟节点
                    var p = elm.parentNode.children; //获取父级的所有子节点
                    var startPush = false;
                    for (var i = 0; i < p.length; i++) {  //循环

                        if (startPush) {
                            a.push(p[i]);      // 添加到兄弟节点里
                        }

                        if (p[i].nodeType == 1 && p[i] == elm) {  //如果该节点是元素节点与不是这个节点本身
                            startPush = true;
                        }
                    }

                    return a;

                }, getAllSiblingsNodesBefore: function (elm) {
                    var a = [];    //保存所有兄弟节点

                    console.log(elm)

                    var p = elm.parentNode.children; //获取父级的所有子节点

                    for (var i = 0; i < p.length; i++) {  //循环
                        if (p[i].nodeType == 1) {  //如果该节点是元素节点与不是这个节点本身
                            if (p[i] != elm) {
                                a.push(p[i]);      // 添加到兄弟节点里
                            }
                            else {
                                break;
                            }
                        }
                    }

                    return a;

                }, reverseArray: function (arr) {


                    for (var i = 0; i < arr.length / 2; i++) {
                        var tem = arr[i];
                        arr[i] = arr[arr.length - 1 - i];
                        arr[arr.length - 1 - i] = tem;
                    }

                    return arr;
                }, selectionContent: function () {
                    var range;
                    if (document.getSelection) {
                        range = (document.getSelection().anchorNode && document.getSelection().getRangeAt(0)) || '';
                    } else if (document.selection && document.selection.createRange) {
                        range = document.selection.createRange().text;
                    }
                    if (range === '') {
                        return ''
                    }
                    return range.cloneContents();
                }

            }
        })


}

module.exports = Common;


// WEBPACK FOOTER //
// ./src/util/util.js
