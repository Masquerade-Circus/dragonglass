"use strict";
(() => {
  // node_modules/valyrian.js/dist/index.mjs
  var isNodeJs = Boolean(typeof process !== "undefined" && process.versions && process.versions.node);
  var fragment = /* @__PURE__ */ Symbol.for("valyrian.fragment");
  var Vnode = class {
    constructor(tag, props, children, key, dom, isSVG, oldChildComponents, childComponents, hasKeys, oncreate, oncleanup, onupdate, onremove) {
      this.tag = tag;
      this.props = props;
      this.children = children;
      this.key = key;
      this.dom = dom;
      this.isSVG = isSVG;
      this.oldChildComponents = oldChildComponents;
      this.childComponents = childComponents;
      this.hasKeys = hasKeys;
      this.oncreate = oncreate;
      this.oncleanup = oncleanup;
      this.onupdate = onupdate;
      this.onremove = onremove;
    }
    tag;
    props;
    children;
    key;
    dom;
    isSVG;
    oldChildComponents;
    childComponents;
    hasKeys;
    oncreate;
    oncleanup;
    onupdate;
    onremove;
  };
  var isPOJOComponent = (component) => Boolean(component && typeof component === "object" && "view" in component);
  var isComponent = (component) => Boolean(typeof component === "function" || isPOJOComponent(component));
  var isVnode = (object) => object instanceof Vnode;
  var isVnodeComponent = (object) => {
    return isVnode(object) && isComponent(object.tag);
  };
  function v(tagOrComponent, props, ...children) {
    const key = props?.key;
    if (typeof key !== "undefined") {
      Reflect.deleteProperty(props, "key");
    }
    return new Vnode(tagOrComponent, props, children, key);
  }
  v.fragment = (_, ...children) => children;
  function hydrateDomToVnode(dom) {
    if (dom.nodeType === 3) {
      return dom.nodeValue;
    }
    if (dom.nodeType === 1) {
      const tag = dom.nodeName.toLowerCase();
      const props = {};
      const children = [];
      for (let i = 0, l = dom.childNodes.length; i < l; i++) {
        const childDom = dom.childNodes[i];
        if (childDom.nodeType === 3) {
          children.push(childDom.nodeValue);
        } else if (childDom.nodeType === 1) {
          const childVnode = hydrateDomToVnode(childDom);
          children.push(childVnode);
        }
      }
      const attributes = dom.attributes;
      for (let i = 0, l = attributes.length; i < l; i++) {
        const attr = attributes[i];
        props[attr.nodeName] = attr.nodeValue;
      }
      const vnode = new Vnode(tag, props, children);
      vnode.dom = dom;
      dom.vnode = vnode;
      vnode.isSVG = tag === "svg";
      return vnode;
    }
  }
  function trust(htmlString) {
    const div = document.createElement("div");
    div.innerHTML = htmlString.trim();
    return Array.from(div.childNodes).map(hydrateDomToVnode);
  }
  var mainComponent = null;
  var mainVnode = null;
  var isMounted = false;
  var current = {
    oldVnode: null,
    vnode: null,
    component: null,
    event: null
  };
  var reservedProps = /* @__PURE__ */ new Set([
    "key",
    "state",
    "v-keep",
    "v-text",
    "v-if",
    "v-for",
    "v-show",
    "v-class",
    "v-html",
    "v-model",
    "v-create",
    "v-update",
    "v-cleanup",
    "v-remove",
    // Just for security reasons avoid to use this properties
    "innerHTML",
    "outerHTML",
    "srcdoc"
  ]);
  var SUBTREE_LC = /* @__PURE__ */ Symbol.for("valyrian.subtreeLifecycle");
  function markSubtreeLifecycle(dom) {
    let node = dom;
    while (node && node.nodeType === 1 && !node[SUBTREE_LC]) {
      node[SUBTREE_LC] = true;
      node = node.parentElement;
    }
  }
  function registerCleanup(cleanup, vnode) {
    vnode[
      "oncleanup"
      /* onCleanup */
    ] = vnode[
      "oncleanup"
      /* onCleanup */
    ] || /* @__PURE__ */ new Set();
    vnode[
      "oncleanup"
      /* onCleanup */
    ].add(cleanup);
    if (vnode.dom) {
      markSubtreeLifecycle(vnode.dom);
    }
  }
  function addCallbackToSet(callback, setType, vnode) {
    vnode[setType] = vnode[setType] || /* @__PURE__ */ new Set();
    if (vnode.dom && (setType === "oncleanup" || setType === "onremove")) {
      markSubtreeLifecycle(vnode.dom);
    }
    vnode[setType].add(() => {
      const cleanup = callback();
      if (typeof cleanup === "function") {
        registerCleanup(cleanup, vnode);
      }
    });
  }
  var callSet = (set) => {
    if (!set) {
      return;
    }
    for (const callback of set) {
      callback();
    }
    set.clear();
  };
  function collectVnodesPostOrder(dom, out) {
    const childNodes = dom.childNodes;
    for (let i = 0; i < childNodes.length; i++) {
      const child = childNodes[i];
      if (!child || child.nodeType !== 1) {
        continue;
      }
      collectVnodesPostOrder(child, out);
    }
    const vnode = dom.vnode;
    if (vnode) {
      out.push(vnode);
    }
  }
  function strictCleanupBeforeRemove(dom) {
    const vnodes = [];
    collectVnodesPostOrder(dom, vnodes);
    for (let i = 0; i < vnodes.length; i++) {
      callSet(vnodes[i].oncleanup);
    }
  }
  function strictOnRemoveAfterDetach(dom) {
    const vnodes = [];
    collectVnodesPostOrder(dom, vnodes);
    for (let i = 0; i < vnodes.length; i++) {
      callSet(vnodes[i].onremove);
    }
  }
  function strictRemoveNode(dom) {
    if (!dom || dom.nodeType !== 1) {
      return;
    }
    if (!dom[SUBTREE_LC]) {
      dom.remove();
      return;
    }
    strictCleanupBeforeRemove(dom);
    dom.remove();
    strictOnRemoveAfterDetach(dom);
  }
  function strictReplaceChild(parent, newNode, oldNode) {
    if (oldNode && oldNode.nodeType === 1 && oldNode[SUBTREE_LC]) {
      strictCleanupBeforeRemove(oldNode);
    }
    parent.replaceChild(newNode, oldNode);
    if (oldNode && oldNode.nodeType === 1 && oldNode[SUBTREE_LC]) {
      strictOnRemoveAfterDetach(oldNode);
    }
  }
  var directives = {
    "v-create": (callback, vnode, oldProps) => {
      if (oldProps) {
        return;
      }
      addCallbackToSet(() => callback(vnode), "oncreate", vnode);
    },
    "v-update": (callback, vnode, oldProps) => {
      if (!oldProps) {
        return;
      }
      addCallbackToSet(() => callback(vnode, oldProps), "onupdate", vnode);
    },
    "v-cleanup": (callback, vnode) => {
      vnode.oncleanup = vnode.oncleanup || /* @__PURE__ */ new Set();
      vnode.oncleanup.add(() => callback(vnode));
      markSubtreeLifecycle(vnode.dom);
    },
    "v-remove": (callback, vnode) => {
      vnode.onremove = vnode.onremove || /* @__PURE__ */ new Set();
      vnode.onremove.add(() => callback(vnode));
      markSubtreeLifecycle(vnode.dom);
    },
    "v-if": (value, vnode) => {
      if (!Boolean(value)) {
        const parentNode = vnode.dom?.parentNode;
        if (parentNode) {
          strictReplaceChild(parentNode, document.createTextNode(""), vnode.dom);
        }
        return false;
      }
    },
    "v-show": (value, vnode) => {
      const bool = Boolean(value);
      vnode.dom.style.display = bool ? "" : "none";
    },
    "v-html": (value, vnode) => {
      vnode.children = trust(value);
    },
    // The "v-model" directive binds the value of an input element to a model property
    "v-model": (model, vnode) => {
      if ("name" in vnode.props === false) {
        return;
      }
      let value;
      const property = vnode.props.name;
      if (property === "__proto__" || property === "constructor" || property === "prototype") {
        return;
      }
      let event = "oninput";
      let handler = (e) => model[property] = e.target.value;
      if (vnode.tag === "input") {
        switch (vnode.props.type) {
          case "checkbox": {
            if (Array.isArray(model[property])) {
              handler = (e) => {
                const val = e.target.value;
                const idx = model[property].indexOf(val);
                if (idx === -1) {
                  model[property].push(val);
                } else {
                  model[property].splice(idx, 1);
                }
              };
              value = model[property].indexOf(vnode.dom.value) !== -1;
            } else if ("value" in vnode.props) {
              handler = () => {
                if (model[property] === vnode.props.value) {
                  model[property] = null;
                } else {
                  model[property] = vnode.props.value;
                }
              };
              value = model[property] === vnode.props.value;
            } else {
              handler = () => model[property] = !model[property];
              value = model[property];
            }
            setAttribute("checked", value, vnode);
            break;
          }
          case "radio": {
            setAttribute("checked", model[property] === vnode.dom.value, vnode);
            break;
          }
          default: {
            setAttribute("value", model[property], vnode);
          }
        }
      } else if (vnode.tag === "select") {
        event = "onclick";
        if (vnode.props.multiple) {
          handler = (e) => {
            const val = e.target.value;
            if (e.ctrlKey) {
              const idx = model[property].indexOf(val);
              if (idx === -1) {
                model[property].push(val);
              } else {
                model[property].splice(idx, 1);
              }
            } else {
              model[property].splice(0, model[property].length);
              model[property].push(val);
            }
          };
          vnode.children.forEach((child) => {
            if (child.tag === "option") {
              const value2 = "value" in child.props ? child.props.value : child.children.join("").trim();
              child.props.selected = model[property].indexOf(value2) !== -1;
            }
          });
        } else {
          vnode.children.forEach((child) => {
            if (child.tag === "option") {
              const value2 = "value" in child.props ? child.props.value : child.children.join("").trim();
              child.props.selected = value2 === model[property];
            }
          });
        }
      } else if (vnode.tag === "textarea") {
        vnode.children = [model[property]];
      }
      const prevHandler = vnode.props[event];
      setAttribute(
        event,
        (e) => {
          handler(e);
          if (prevHandler) {
            prevHandler(e);
          }
        },
        vnode
      );
    },
    "v-class": (value, vnode) => {
      if (typeof value === "string") {
        vnode.dom.className = value;
      } else if (Array.isArray(value)) {
        vnode.dom.className = value.join(" ");
      } else if (typeof value === "object") {
        const classList = vnode.dom.classList;
        for (const name in value) {
          const val = typeof value[name] === "function" ? value[name]() : value[name];
          classList.toggle(name, val);
        }
      }
    },
    // Frequent used properties
    class(value, vnode) {
      if (vnode.dom.className !== value) {
        if (vnode.isSVG) {
          vnode.dom.setAttribute("class", value);
          return;
        }
        vnode.dom.className = value;
      }
    },
    className(value, vnode) {
      directives.class(value, vnode);
    },
    id: (value, vnode) => {
      if (vnode.dom.id !== value) {
        if (vnode.isSVG) {
          vnode.dom.setAttribute("id", value);
          return;
        }
        vnode.dom.id = value;
      }
    },
    style: (value, vnode) => {
      if (typeof value === "string") {
        if (vnode.isSVG) {
          vnode.dom.setAttribute("style", value);
          return;
        }
        vnode.dom.style = value;
      } else if (typeof value === "object") {
        if (vnode.isSVG) {
          vnode.dom.setAttribute("style", "");
        } else {
          vnode.dom.style = "";
        }
        const domStyle = vnode.dom.style;
        for (const name in value) {
          domStyle[name] = value[name];
        }
      }
    }
  };
  function directive(name, directive2) {
    const directiveName = `v-${name}`;
    directives[directiveName] = directive2;
    reservedProps.add(directiveName);
  }
  var eventListenerNames = /* @__PURE__ */ new Set();
  var preventedUpdates = /* @__PURE__ */ new WeakMap();
  function isUpdatePrevented(event) {
    return preventedUpdates.get(event) === true;
  }
  function preventUpdate() {
    if (!current.event) {
      return;
    }
    preventedUpdates.set(current.event, true);
  }
  function isThenable(value) {
    return value !== null && (typeof value === "object" || typeof value === "function") && typeof Reflect.get(value, "then") === "function";
  }
  function eventListener(e) {
    const previousEvent = current.event;
    current.event = e;
    let dom = e.target;
    const name = `on${e.type}`;
    while (dom) {
      const oldVnode = dom.vnode;
      if (oldVnode && oldVnode.props[name]) {
        let result;
        try {
          result = oldVnode.props[name](e, oldVnode);
        } finally {
          current.event = previousEvent;
        }
        if (!isUpdatePrevented(e)) {
          update();
        }
        if (isThenable(result)) {
          Promise.resolve(result).finally(() => {
            if (!isUpdatePrevented(e)) {
              update();
            }
          });
        }
        return;
      }
      dom = dom.parentNode;
    }
    current.event = previousEvent;
  }
  function sharedSetAttribute(name, value, newVnode) {
    const newVnodeDom = newVnode.dom;
    if (typeof value === "function") {
      if (!eventListenerNames.has(name)) {
        mainVnode.dom.addEventListener(name.slice(2), eventListener);
        eventListenerNames.add(name);
      }
      return;
    }
    if (!newVnode.isSVG && name in newVnodeDom) {
      newVnodeDom[name] = value;
      return;
    }
    if (value === false) {
      newVnodeDom.removeAttribute(name);
    } else {
      newVnodeDom.setAttribute(name, value);
    }
  }
  function setAttribute(name, value, newVnode) {
    if (!reservedProps.has(name)) {
      newVnode.props[name] = value;
      sharedSetAttribute(name, value, newVnode);
    }
  }
  function updateAttributes(newVnode, oldVnode) {
    const vnodeDom = newVnode.dom;
    const vnodeProps = newVnode.props;
    vnodeDom.vnode = newVnode;
    if (oldVnode) {
      for (const name in oldVnode.props) {
        if (name in vnodeProps === false && !eventListenerNames.has(name) && !reservedProps.has(name)) {
          if (!newVnode.isSVG && name in vnodeDom) {
            vnodeDom[name] = null;
          } else {
            vnodeDom.removeAttribute(name);
          }
        }
      }
    }
    for (const name in vnodeProps) {
      if (directives[name]) {
        if (directives[name](vnodeProps[name], newVnode, oldVnode?.props) === false) {
          break;
        }
        continue;
      }
      if (!reservedProps.has(name)) {
        sharedSetAttribute(name, vnodeProps[name], newVnode);
      }
    }
  }
  function createElement(tag, isSVG) {
    return isSVG ? document.createElementNS("http://www.w3.org/2000/svg", tag) : document.createElement(tag);
  }
  function flatTree(newVnode) {
    let children = [];
    const newChildren = newVnode.children;
    newVnode.hasKeys = false;
    if ("v-for" in newVnode.props === false) {
      for (let l = newChildren.length - 1; l >= 0; l--) {
        children.push(newChildren[l]);
      }
    } else {
      children = [];
      const set = newVnode.props["v-for"];
      const callback = newVnode.children[0];
      if (typeof callback !== "function") {
        console.warn("v-for directive must have a callback function as children");
        return children;
      }
      const tmp = [];
      for (let i = 0; i < set.length; i++) {
        tmp.push(callback(set[i], i));
      }
      for (let i = tmp.length - 1; i >= 0; i--) {
        children.push(tmp[i]);
      }
    }
    newVnode.oldChildComponents = newVnode.childComponents;
    if (newVnode.childComponents) {
      newVnode.childComponents = /* @__PURE__ */ new Set();
    }
    const out = [];
    while (children.length) {
      const newChild = children.pop();
      if (newChild == null) {
        continue;
      }
      if (Array.isArray(newChild)) {
        for (let l = newChild.length - 1; l >= 0; l--) {
          children.push(newChild[l]);
        }
        continue;
      }
      if (newChild instanceof Vnode) {
        newChild.props = newChild.props || {};
        newChild.isSVG = newVnode.isSVG || newChild.tag === "svg";
        if (newChild.tag === fragment) {
          for (let l = newChild.children.length - 1; l >= 0; l--) {
            children.push(newChild.children[l]);
          }
          continue;
        }
        if (typeof newChild.tag !== "string") {
          const component = current.component = newChild.tag;
          newVnode.childComponents = newVnode.childComponents || /* @__PURE__ */ new Set();
          newVnode.childComponents.add(component);
          children.push(
            (isPOJOComponent(component) ? component.view : component).bind(component)(newChild.props, newChild.children)
          );
          continue;
        }
        newVnode.hasKeys = newVnode.hasKeys || typeof newChild.key !== "undefined";
        out.push(newChild);
        continue;
      }
      out.push(newChild);
    }
    return out;
  }
  function processNewChild(newChild, parentVnode, oldDom) {
    if (oldDom) {
      newChild.dom = createElement(newChild.tag, newChild.isSVG);
      strictReplaceChild(parentVnode.dom, newChild.dom, oldDom);
    } else {
      newChild.dom = parentVnode.dom.appendChild(createElement(newChild.tag, newChild.isSVG));
    }
    updateAttributes(newChild);
    if ("v-text" in newChild.props) {
      newChild.dom.textContent = newChild.props["v-text"];
      callSet(newChild.oncreate);
      return;
    }
    current.oldVnode = null;
    current.vnode = newChild;
    const children = flatTree(newChild);
    if (children.length === 0) {
      newChild.dom.textContent = "";
      callSet(newChild.oncreate);
      return;
    }
    for (let i = 0, l = children.length; i < l; i++) {
      if (children[i] instanceof Vnode === false) {
        newChild.dom.appendChild(document.createTextNode(children[i]));
        continue;
      }
      processNewChild(children[i], newChild);
    }
    callSet(newChild.oncreate);
  }
  function patch(newVnode, oldVnode) {
    current.oldVnode = oldVnode;
    current.vnode = newVnode;
    const children = flatTree(newVnode);
    const dom = newVnode.dom;
    if (children.length === 0) {
      if (dom.childNodes.length) {
        const childNodes2 = Array.from(dom.childNodes);
        for (let i = childNodes2.length - 1; i >= 0; i--) {
          const n = childNodes2[i];
          if (n && n.nodeType === 1) {
            strictRemoveNode(n);
          } else {
            n?.remove?.();
          }
        }
      }
      callSet(newVnode.oncreate);
      callSet(newVnode.onupdate);
      return;
    }
    const childNodes = dom.childNodes;
    const oldChildrenLength = childNodes.length;
    const childrenLength = children.length;
    if (oldChildrenLength === 0) {
      for (let i = 0; i < childrenLength; i++) {
        const newChild = children[i];
        if (newChild instanceof Vnode === false) {
          dom.appendChild(document.createTextNode(newChild));
          continue;
        }
        processNewChild(newChild, newVnode);
      }
      callSet(newVnode.oncreate);
      return;
    }
    let oldTree = childNodes;
    const oldKeyedList = {};
    if (newVnode.hasKeys) {
      const newOldTree = [];
      for (let i = 0, l = oldTree.length; i < l; i++) {
        newOldTree[i] = oldTree[i];
        const oldVnode2 = oldTree[i].vnode;
        oldKeyedList[oldVnode2?.key ?? i] = i;
      }
      oldTree = newOldTree;
    }
    for (let i = 0, l = children.length; i < l; i++) {
      const newChild = children[i];
      if (newChild instanceof Vnode === false) {
        const oldChild2 = oldTree[i];
        if (!oldChild2) {
          dom.appendChild(document.createTextNode(newChild));
          continue;
        }
        if (oldChild2.nodeType !== 3) {
          strictReplaceChild(dom, document.createTextNode(newChild), oldChild2);
          continue;
        }
        if (oldChild2.nodeValue != newChild) {
          oldChild2.nodeValue = newChild;
        }
        continue;
      }
      const oldChild = oldTree[newVnode.hasKeys ? oldKeyedList[newChild.key ?? i] : i];
      if (!oldChild || newChild.tag !== oldChild.nodeName.toLowerCase()) {
        processNewChild(newChild, newVnode, childNodes[i]);
        continue;
      }
      newChild.dom = oldChild;
      const currentChild = childNodes[i];
      const oldChildVnode = oldChild.vnode;
      if (!currentChild) {
        dom.appendChild(oldChild);
      } else if (currentChild !== oldChild) {
        dom.replaceChild(oldChild, currentChild);
      }
      if ("v-keep" in newChild.props && oldChildVnode) {
        if (oldChildVnode.props["v-keep"] === newChild.props["v-keep"]) {
          continue;
        }
        const nextOldVnode = childNodes[i + 1]?.vnode;
        const oldProps = nextOldVnode?.props;
        const nextKey = nextOldVnode?.key;
        if (oldProps && typeof nextKey === "undefined" && oldProps["v-keep"] === newChild.props["v-keep"]) {
          strictRemoveNode(oldChild);
          if (newVnode.hasKeys) {
            oldTree.splice(i, 1);
          }
          continue;
        }
      }
      updateAttributes(newChild, oldChildVnode);
      if ("v-text" in newChild.props) {
        if (oldChild.textContent != newChild.props["v-text"]) {
          oldChild.textContent = newChild.props["v-text"];
        }
        continue;
      }
      callSet(oldChildVnode?.oncleanup);
      patch(newChild, oldChildVnode || null);
    }
    for (let i = childNodes.length, l = children.length; i > l; i--) {
      const toRemove = childNodes[i - 1];
      if (toRemove && toRemove.nodeType === 1) {
        strictRemoveNode(toRemove);
      } else {
        toRemove?.remove();
      }
    }
    callSet(newVnode.oncreate);
    callSet(newVnode.onupdate);
  }
  function updateVnode(vnode, shouldCleanup = true) {
    vnode.props = vnode.props || {};
    if (shouldCleanup) {
      callSet(vnode.oncleanup);
    }
    const oldOnRemoveSet = vnode.onremove ? new Set(vnode.onremove) : null;
    current.vnode = vnode;
    patch(vnode, shouldCleanup ? vnode : null);
    callSet(oldOnRemoveSet);
    isMounted = true;
    current.oldVnode = null;
    current.vnode = null;
    current.component = null;
  }
  function update() {
    if (mainVnode) {
      mainVnode.children = [mainComponent];
      updateVnode(mainVnode, isMounted);
      if (isNodeJs) {
        return mainVnode.dom.innerHTML;
      }
    }
    return "";
  }
  function removeEventListeners() {
    if (!mainVnode) {
      return;
    }
    for (const name of eventListenerNames) {
      mainVnode.dom.removeEventListener(name.slice(2), eventListener);
    }
    eventListenerNames.clear();
  }
  function mount(dom, component) {
    const container = typeof dom === "string" ? isNodeJs ? createElement(dom, dom === "svg") : document.querySelector(dom) : dom;
    if (mainVnode && mainVnode.dom !== container) {
      removeEventListeners();
    }
    if (isComponent(component)) {
      mainComponent = v(component, {}, []);
    } else if (isVnodeComponent(component)) {
      mainComponent = component;
    } else {
      mainComponent = v(() => component, {}, []);
    }
    mainVnode = hydrateDomToVnode(container);
    return update();
  }

  // node_modules/valyrian.js/dist/context/index.mjs
  var NODE_CONTEXT_STORE_KEY = "__valyrian_context_values__";
  var browserContextStore = /* @__PURE__ */ new Map();
  function createContextScope(name) {
    return {
      key: Symbol(name),
      name
    };
  }
  function getNodeStoreObject() {
    if (!isNodeJs || typeof sessionStorage === "undefined") {
      return null;
    }
    const storage = sessionStorage;
    if (!storage.store || typeof storage.store !== "object") {
      return null;
    }
    return storage.store;
  }
  function getScopeMap(create = false) {
    const nodeStore = getNodeStoreObject();
    if (nodeStore) {
      const existingMap = nodeStore[NODE_CONTEXT_STORE_KEY];
      if (existingMap) {
        return existingMap;
      }
      if (create) {
        const nextMap = /* @__PURE__ */ new Map();
        nodeStore[NODE_CONTEXT_STORE_KEY] = nextMap;
        return nextMap;
      }
      return null;
    }
    if (create) {
      return browserContextStore;
    }
    return browserContextStore.size > 0 ? browserContextStore : null;
  }
  function getContext(scope) {
    const map = getScopeMap(false);
    if (!map) {
      return void 0;
    }
    return map.get(scope.key);
  }
  function setContext(scope, value) {
    const map = getScopeMap(true);
    const hasPrevious = map.has(scope.key);
    const previousValue = map.get(scope.key);
    map.set(scope.key, value);
    return () => {
      if (!hasPrevious) {
        map.delete(scope.key);
        return;
      }
      map.set(scope.key, previousValue);
    };
  }
  function runWithContext(scope, value, callback) {
    const restore = setContext(scope, value);
    try {
      const result = callback();
      if (result instanceof Promise) {
        return result.finally(restore);
      }
      restore();
      return result;
    } catch (error) {
      restore();
      throw error;
    }
  }

  // node_modules/valyrian.js/dist/utils/index.mjs
  function is(value, type) {
    if (typeof type !== "string") {
      return value instanceof type;
    }
    if (type === "array") {
      return Array.isArray(value);
    }
    if (type === "object") {
      return value !== null && typeof value === "object" && !Array.isArray(value);
    }
    if (type === "number") {
      return typeof value === "number" && !isNaN(value);
    }
    return typeof value === type;
  }
  function isFunction(value) {
    return is(value, "function");
  }
  function isString(value) {
    return is(value, "string");
  }
  function isNumber(value) {
    return is(value, "number");
  }

  // node_modules/valyrian.js/dist/router/index.mjs
  function flat(array) {
    return Array.isArray(array) ? array.flat(Infinity) : [array];
  }
  function getPathWithoutPrefix(path, prefix) {
    return getPathWithoutLastSlash(path.replace(new RegExp(`^${prefix}`), ""));
  }
  function getPathWithoutLastSlash(path) {
    let pathWithoutLastSlash = path.replace(/\/$/, "");
    if (pathWithoutLastSlash === "") {
      pathWithoutLastSlash = "/";
    }
    return pathWithoutLastSlash;
  }
  function isErrorClassLike(value) {
    return Boolean(value) && isString(value.name) && value.name.includes("Error");
  }
  var renderedNavigationResult = /* @__PURE__ */ Symbol("renderedNavigationResult");
  function createRenderedNavigationResult(html) {
    return {
      [renderedNavigationResult]: true,
      html
    };
  }
  function isRenderedNavigationResult(value) {
    return Boolean(value?.[renderedNavigationResult]);
  }
  function parseQuery(queryParts) {
    const parts = queryParts ? queryParts.split("&") : [];
    const query = {};
    for (const nameValue of parts) {
      const [name, value] = nameValue.split("=", 2);
      query[name] = isNaN(Number(value)) === false ? Number(value) : value === "true" ? true : value === "false" ? false : value;
    }
    return query;
  }
  function createRouteCallbackCollection() {
    return {
      before: /* @__PURE__ */ new Set(),
      after: /* @__PURE__ */ new Set()
    };
  }
  var activeRouter = null;
  var routeDirectiveRegistered = false;
  var routerContextScope = createContextScope("router");
  function resolveRouterFromContext() {
    return getContext(routerContextScope) || activeRouter;
  }
  function isInternalRoute(url) {
    return isString(url) && /^\/(?!\/)/.test(url);
  }
  function ensureRouteDirective() {
    if (routeDirectiveRegistered) {
      return;
    }
    directive("route", (url, vnode) => {
      if (!isInternalRoute(url)) {
        setAttribute("href", false, vnode);
        setAttribute("onclick", false, vnode);
        vnode.dom.removeAttribute("href");
        return;
      }
      setAttribute("href", url, vnode);
      const router2 = resolveRouterFromContext();
      if (router2) {
        setAttribute("onclick", router2.getOnClickHandler(url), vnode);
      }
    });
    routeDirectiveRegistered = true;
  }
  function areEqualShallow(a, b) {
    const aKeys = Object.keys(a);
    const bKeys = Object.keys(b);
    if (aKeys.length !== bKeys.length) {
      return false;
    }
    for (const key of aKeys) {
      if (String(a[key]) !== String(b[key])) {
        return false;
      }
    }
    return true;
  }
  function hasRouteChanged(nextRoute, currentRoute) {
    if (!currentRoute) {
      return true;
    }
    return nextRoute.path !== currentRoute.path || !areEqualShallow(nextRoute.query, currentRoute.query) || !areEqualShallow(nextRoute.params, currentRoute.params);
  }
  var RouteTree = class {
    root = { segment: "", children: /* @__PURE__ */ new Map(), isDynamic: false };
    registeredRoutes = /* @__PURE__ */ new Set();
    addRoute(path, middlewares) {
      if (!path.includes(".*") && this.registeredRoutes.has(path)) {
        throw new RouterError(`Route ${path} is already registered.`);
      }
      const segments = path === "/" ? [path] : path.split("/").filter(Boolean);
      let currentNode = this.root;
      for (const segment of segments) {
        const isDynamic = segment.startsWith(":");
        const key = isDynamic ? ":" : segment;
        if (!currentNode.children.has(key)) {
          currentNode.children.set(key, {
            segment,
            children: /* @__PURE__ */ new Map(),
            isDynamic,
            paramKey: isDynamic ? segment.slice(1) : void 0
          });
        }
        currentNode = currentNode.children.get(key);
      }
      currentNode.middlewares = middlewares;
      this.registeredRoutes.add(path);
    }
    // Search for a route in the tree
    // eslint-disable-next-line sonarjs/cognitive-complexity
    findRoute(path) {
      const pathWithoutLastSlash = getPathWithoutLastSlash(path);
      const segments = pathWithoutLastSlash === "/" ? [pathWithoutLastSlash] : pathWithoutLastSlash.split("/").filter(Boolean);
      let currentNode = this.root;
      const params = {};
      const wildcardMiddlewares = [];
      const segmentsLength = segments.length;
      for (let i = 0; i < segmentsLength; i++) {
        if (!currentNode) {
          break;
        }
        const segment = segments[i];
        let found = false;
        for (const [key, child] of currentNode.children) {
          if (key === segment) {
            currentNode = child;
            found = true;
            break;
          }
          if (segment !== ".*" && key === ":") {
            currentNode = child;
            params[child.paramKey] = segment;
            found = true;
            break;
          }
          if (key === ".*" && !found) {
            wildcardMiddlewares.push(...child.middlewares || []);
          }
        }
        if (!found) {
          if (currentNode.children.has(".*")) {
            return { middlewares: wildcardMiddlewares, params };
          }
          return null;
        }
      }
      const allMiddlewares = [...wildcardMiddlewares, ...currentNode.middlewares || []];
      if (allMiddlewares.length === 0) {
        return null;
      }
      return { middlewares: allMiddlewares, params };
    }
  };
  var RouterError = class RouterError2 extends Error {
    status = 500;
  };
  var Router = class _Router {
    routeTree = new RouteTree();
    container = null;
    query = {};
    options = {};
    url = "";
    path = "";
    params = {};
    matches = [];
    pathPrefix = "";
    errorHandlers = /* @__PURE__ */ new Map();
    activeRouteCallbacks = createRouteCallbackCollection();
    pendingRouteCallbacks = null;
    callbackRegistrationTarget = "active";
    currentRoute = null;
    constructor(pathPrefix = "") {
      this.pathPrefix = pathPrefix;
    }
    getRegistrationCallbacks() {
      if (this.callbackRegistrationTarget === "pending" && this.pendingRouteCallbacks) {
        return this.pendingRouteCallbacks;
      }
      return this.activeRouteCallbacks;
    }
    beginPendingRouteCallbacksCollection() {
      this.pendingRouteCallbacks = createRouteCallbackCollection();
      this.callbackRegistrationTarget = "pending";
    }
    commitPendingRouteCallbacksCollection() {
      this.activeRouteCallbacks = this.pendingRouteCallbacks || createRouteCallbackCollection();
      this.pendingRouteCallbacks = null;
      this.callbackRegistrationTarget = "active";
    }
    rollbackPendingRouteCallbacksCollection() {
      this.pendingRouteCallbacks = null;
      this.callbackRegistrationTarget = "active";
    }
    beforeRoute(callback) {
      this.getRegistrationCallbacks().before.add(callback);
      return () => {
        this.activeRouteCallbacks.before.delete(callback);
        this.pendingRouteCallbacks?.before.delete(callback);
      };
    }
    afterRoute(callback) {
      this.getRegistrationCallbacks().after.add(callback);
      return () => {
        this.activeRouteCallbacks.after.delete(callback);
        this.pendingRouteCallbacks?.after.delete(callback);
      };
    }
    add(...args) {
      const flatArgs = flat(args);
      const path = getPathWithoutLastSlash(`${this.pathPrefix}${isString(flatArgs[0]) ? flatArgs.shift() : "/.*"}`);
      if (flatArgs.length === 1 && flatArgs[0] instanceof _Router) {
        const subrouter = flatArgs[0];
        for (const subroute of subrouter.routes()) {
          const subroutePath = `${path}${subroute}`;
          this.routeTree.addRoute(subroutePath, subrouter.routeTree.findRoute(subroute).middlewares || []);
        }
      } else {
        if (flatArgs.some((item) => item instanceof _Router)) {
          throw new RouterError("You cannot add middlewares when adding a subrouter.");
        }
        if (flatArgs.some((item) => !isFunction(item))) {
          throw new RouterError("All middlewares must be functions.");
        }
        this.routeTree.addRoute(path, flatArgs);
      }
      return this;
    }
    catch(...args) {
      const firstArg = args[0];
      const condition = isNumber(firstArg) || isString(firstArg) || isErrorClassLike(firstArg) ? args.shift() : "generic";
      if (!isNumber(condition) && !isString(condition) && !isErrorClassLike(condition)) {
        throw new RouterError("The condition must be a number, string or an instance of Error.");
      }
      if (args.some((item) => !isFunction(item))) {
        throw new RouterError("All middlewares must be functions.");
      }
      let handlers = this.errorHandlers.get(condition);
      if (!handlers) {
        handlers = [];
        this.errorHandlers.set(condition, handlers);
      }
      handlers.push(...args);
      return this;
    }
    routes() {
      return this.getAllRoutes(this.routeTree.root, "");
    }
    // eslint-disable-next-line sonarjs/cognitive-complexity
    async go(path, parentComponent) {
      if (!path) {
        const result = await this.handleError(new RouterError("The URL is empty."), parentComponent);
        return isRenderedNavigationResult(result) ? result.html : result;
      }
      if (/%[^0-9A-Fa-f]{2}/.test(path)) {
        const result = await this.handleError(new RouterError(`The URL ${path} is malformed.`));
        return isRenderedNavigationResult(result) ? result.html : result;
      }
      const constructedPath = getPathWithoutLastSlash(`${this.pathPrefix}${path}`);
      const parts = constructedPath.split("?", 2);
      const nextQuery = parseQuery(parts[1]);
      const finalPath = parts[0].replace(/(.+)\/$/, "$1").split("#")[0];
      let route = this.routeTree.findRoute(finalPath);
      if (!route || !route.middlewares) {
        const finalPathParts = finalPath.split("/");
        while (finalPathParts.length > 0) {
          finalPathParts.pop();
          const wildcardRoute = this.routeTree.findRoute(finalPathParts.join("/") + "/.*");
          if (wildcardRoute) {
            route = wildcardRoute;
            break;
          }
        }
        if (!route || !route.middlewares) {
          const error = new RouterError(`The URL ${constructedPath} was not found in the router's registered paths.`);
          error.status = 404;
          const result = await this.handleError(error, parentComponent);
          return isRenderedNavigationResult(result) ? result.html : result;
        }
      }
      const { middlewares, params } = route;
      return runWithContext(routerContextScope, this, async () => {
        const nextRoute = {
          path: getPathWithoutLastSlash(path),
          query: nextQuery,
          params
        };
        const previousPublicState = {
          url: this.url,
          query: this.query,
          path: this.path,
          params: this.params
        };
        const routeChanged = hasRouteChanged(nextRoute, this.currentRoute);
        if (routeChanged) {
          for (const callback of this.activeRouteCallbacks.before) {
            const result = await callback(nextRoute, this.currentRoute);
            if (result === false) {
              return;
            }
          }
          this.beginPendingRouteCallbacksCollection();
        } else {
          this.callbackRegistrationTarget = "active";
        }
        let routeTransitionCompleted = false;
        try {
          this.url = constructedPath;
          this.query = nextQuery;
          this.path = path;
          this.params = params;
          let component = await this.searchComponent(middlewares, parentComponent);
          if (isRenderedNavigationResult(component)) {
            return component.html;
          }
          if (component === false) {
            return;
          }
          if (!component) {
            const result = await this.handleError(
              new RouterError(`The URL ${constructedPath} did not return a valid component.`),
              parentComponent
            );
            return isRenderedNavigationResult(result) ? result.html : result;
          }
          if (isComponent(parentComponent) || isVnodeComponent(parentComponent)) {
            const childComponent = isVnodeComponent(component) ? component : v(component, {});
            if (isVnodeComponent(parentComponent)) {
              parentComponent.children.push(childComponent);
              component = parentComponent;
            } else {
              component = v(parentComponent, {}, childComponent);
            }
          }
          if (!isNodeJs && window.location.pathname + window.location.search !== constructedPath) {
            window.history.pushState(null, "", constructedPath);
          }
          let mountedResult = void 0;
          if (this.container) {
            mountedResult = mount(this.container, component);
          } else if (isNodeJs) {
            mountedResult = mount("body", component);
          } else {
            const result = await this.handleError(
              new RouterError("No container found for mounting the component."),
              parentComponent
            );
            return isRenderedNavigationResult(result) ? result.html : result;
          }
          if (routeChanged) {
            const previousRoute = this.currentRoute;
            const previousAfterCallbacks = this.activeRouteCallbacks.after;
            this.currentRoute = nextRoute;
            this.commitPendingRouteCallbacksCollection();
            routeTransitionCompleted = true;
            for (const callback of previousAfterCallbacks) {
              await callback(nextRoute, previousRoute);
            }
          }
          return mountedResult;
        } catch (error) {
          if (!routeTransitionCompleted) {
            this.url = previousPublicState.url;
            this.query = previousPublicState.query;
            this.path = previousPublicState.path;
            this.params = previousPublicState.params;
          }
          throw error;
        } finally {
          if (routeChanged && !routeTransitionCompleted) {
            this.rollbackPendingRouteCallbacksCollection();
          }
        }
      });
    }
    getOnClickHandler(url) {
      return (e) => {
        if (e.button !== 0 || e.ctrlKey || e.metaKey || e.shiftKey || e.altKey || e.defaultPrevented) {
          return;
        }
        if (isString(url) && url.length > 0) {
          preventUpdate();
          void this.go(url).catch(() => void 0);
        }
        e.preventDefault();
      };
    }
    getAllRoutes(node, prefix) {
      const routes2 = [];
      for (const [key, child] of node.children) {
        const newPrefix = `${prefix}/${child.isDynamic ? `:${child.paramKey}` : key}`.replace(/\/$/, "");
        if (child.middlewares) {
          routes2.push(newPrefix);
        }
        routes2.push(...this.getAllRoutes(child, newPrefix));
      }
      return routes2;
    }
    async runMiddleware(middleware, request, error) {
      return middleware(request, error);
    }
    createRequest() {
      return {
        params: this.params,
        query: this.query,
        url: this.url,
        path: this.path,
        matches: this.matches,
        redirect: async (path) => createRenderedNavigationResult(await this.go(path))
      };
    }
    getErrorConditionMiddlewares(error) {
      for (const [condition, middlewares] of this.errorHandlers) {
        if (!isNumber(condition) && !isString(condition) && error instanceof condition && error.name === condition.name) {
          return middlewares;
        }
      }
      for (const [condition, middlewares] of this.errorHandlers) {
        if (isNumber(condition) && (error.status === condition || error.code === condition)) {
          return middlewares;
        }
      }
      for (const [condition, middlewares] of this.errorHandlers) {
        if (isString(condition) && (error.name === condition || error.message.includes(condition))) {
          return middlewares;
        }
      }
      return this.errorHandlers.get("generic") || false;
    }
    // eslint-disable-next-line sonarjs/cognitive-complexity
    async handleError(error, parentComponent) {
      const request = this.createRequest();
      let component = null;
      const middlewares = this.getErrorConditionMiddlewares(error);
      if (middlewares === false) {
        throw error;
      }
      let response;
      try {
        for (const middleware of middlewares) {
          response = await this.runMiddleware(middleware, request, error);
          if (isRenderedNavigationResult(response)) {
            return response;
          }
          if (response !== void 0 && (isComponent(response) || isVnodeComponent(response))) {
            component = response;
            break;
          }
          if (response === false) {
            return;
          }
        }
      } catch (err) {
        const nextError = err instanceof Error ? err : new RouterError(String(err));
        if (nextError === error) {
          throw new RouterError("Too many error causes. Possible circular error handling.");
        }
        if (!nextError.cause) {
          nextError.cause = error;
        }
        let errorCauseCount = 0;
        const seen = /* @__PURE__ */ new Set();
        let currentError = nextError;
        while (currentError instanceof Error && currentError.cause) {
          if (seen.has(currentError)) {
            throw new RouterError("Too many error causes. Possible circular error handling.");
          }
          seen.add(currentError);
          errorCauseCount++;
          if (errorCauseCount > 20) {
            throw new RouterError("Too many error causes. Possible circular error handling.");
          }
          currentError = currentError.cause;
        }
        return this.handleError(nextError, parentComponent);
      }
      if (component) {
        if (isComponent(parentComponent) || isVnodeComponent(parentComponent)) {
          const childComponent = isVnodeComponent(component) ? component : v(component, {});
          if (isVnodeComponent(parentComponent)) {
            parentComponent.children.push(childComponent);
            component = parentComponent;
          } else {
            component = v(parentComponent, {}, childComponent);
          }
        }
        if (!isNodeJs && window.location.pathname + window.location.search !== this.url) {
          window.history.pushState(null, "", this.url);
        }
        if (this.container) {
          return createRenderedNavigationResult(mount(this.container, component));
        }
      }
      throw error;
    }
    async searchComponent(middlewares, parentComponent) {
      const request = this.createRequest();
      let response;
      for (const middleware of middlewares) {
        try {
          response = await this.runMiddleware(middleware, request);
        } catch (error) {
          return this.handleError(error, parentComponent);
        }
        if (isRenderedNavigationResult(response)) {
          return response;
        }
        if (response !== void 0 && (isComponent(response) || isVnodeComponent(response))) {
          return response;
        }
        if (response === false) {
          return false;
        }
      }
      return response;
    }
  };
  function mountRouter(elementContainer, router2) {
    ensureRouteDirective();
    router2.container = elementContainer;
    activeRouter = router2;
    if (!isNodeJs) {
      let onPopStateGoToRoute2 = function() {
        const pathWithoutPrefix = getPathWithoutPrefix(document.location.pathname, router2.pathPrefix);
        router2.go(pathWithoutPrefix);
      };
      var onPopStateGoToRoute = onPopStateGoToRoute2;
      window.addEventListener("popstate", onPopStateGoToRoute2, false);
      onPopStateGoToRoute2();
    }
  }
  ensureRouteDirective();

  // site/src/themes.ts
  var bundledThemes = [
    {
      name: "default",
      label: "Default",
      primary: "#1d4ed8",
      use: "General product interfaces"
    },
    {
      name: "indigo",
      label: "Indigo",
      primary: "#4338ca",
      use: "SaaS, finance and developer tools"
    },
    {
      name: "violet",
      label: "Violet",
      primary: "#7c3aed",
      use: "AI, developer and creative products"
    },
    {
      name: "magenta",
      label: "Magenta",
      primary: "#a21caf",
      use: "Media, community and consumer products"
    },
    {
      name: "ruby",
      label: "Ruby",
      primary: "#be123c",
      use: "Events, entertainment and campaign products"
    },
    {
      name: "amber",
      label: "Amber",
      primary: "#92400e",
      use: "Commerce, hospitality and editorial products"
    },
    {
      name: "moss",
      label: "Moss",
      primary: "#3f6212",
      use: "Health, sustainability and field operations"
    },
    {
      name: "emerald",
      label: "Emerald",
      primary: "#047857",
      use: "Finance, healthcare and sustainability products"
    },
    {
      name: "teal",
      label: "Teal",
      primary: "#0f766e",
      use: "Healthcare, collaboration and operational tools"
    },
    {
      name: "ocean",
      label: "Ocean",
      primary: "#0369a1",
      use: "Education, logistics and data products"
    },
    {
      name: "graphite",
      label: "Graphite",
      primary: "#475569",
      use: "Admin panels, documentation and public services"
    },
    {
      name: "stone",
      label: "Stone",
      primary: "#57534e",
      use: "Archives, publishing and content-heavy tools"
    }
  ];
  var themeByName = new Map(
    bundledThemes.map((theme) => [theme.name, theme])
  );

  // site/src/docs/catalog.ts
  var basePath = "/dragonglass";
  var themeRoutePath = (themeName) => `${basePath}/themes/${themeName}.html`;
  var categoryOrder = [
    "Getting started",
    "Foundations",
    "Actions",
    "Forms",
    "Navigation",
    "Feedback",
    "Surfaces",
    "Data display",
    "Utilities"
  ];
  var catalog = [
    {
      path: basePath,
      label: "Home",
      icon: "home",
      color: "bg-primary",
      page: "Home",
      category: "Getting started",
      description: "Learn how Dragonglass styles semantic HTML and where to find each component."
    },
    {
      path: `${basePath}/layout.html`,
      label: "Layout",
      icon: "dashboard",
      color: "bg-accent",
      page: "Layouts",
      category: "Foundations",
      description: "Build responsive page structures with Dragonglass layout primitives."
    },
    {
      path: `${basePath}/grid.html`,
      label: "Grid",
      icon: "line_style",
      color: "bg-primary",
      page: "Grid",
      category: "Utilities",
      description: "Arrange content with the responsive grid system."
    },
    {
      path: `${basePath}/elevations.html`,
      label: "Elevations",
      icon: "layers",
      color: "bg-accent",
      page: "Elevations",
      category: "Utilities",
      description: "Apply consistent depth and emphasis with elevation utilities."
    },
    {
      path: `${basePath}/colors.html`,
      label: "Colors",
      icon: "group_work",
      color: "bg-info",
      page: "Colors",
      category: "Utilities",
      description: "Use the color palette for backgrounds, borders and text."
    },
    {
      path: `${basePath}/fonts.html`,
      label: "Fonts",
      icon: "text_format",
      color: "bg-success",
      page: "Fonts",
      category: "Utilities",
      description: "Set readable type sizes, weights and styles."
    },
    {
      path: `${basePath}/badges.html`,
      label: "Badges",
      icon: "chat_bubble",
      color: "bg-warning",
      page: "Badges",
      category: "Data display",
      description: "Highlight compact statuses, counts and labels with badges."
    },
    {
      path: `${basePath}/buttons.html`,
      label: "Buttons",
      icon: "arrow_forward",
      color: "bg-danger",
      page: "Buttons",
      category: "Actions",
      description: "Present primary, secondary and floating actions with buttons."
    },
    {
      path: `${basePath}/app-components.html`,
      label: "App components",
      icon: "widgets",
      color: "bg-primary",
      page: "AppComponents",
      category: "Getting started",
      description: "Compose common application surfaces from semantic HTML."
    },
    {
      path: `${basePath}/toolbars.html`,
      label: "Toolbars",
      icon: "build",
      color: "bg-accent",
      page: "Toolbars",
      category: "Navigation",
      description: "Group navigation, titles and actions in adaptable toolbars."
    },
    {
      path: `${basePath}/chips.html`,
      label: "Chips",
      icon: "label",
      color: "bg-success",
      page: "Chips",
      category: "Actions",
      description: "Represent compact values, filters and selections with chips."
    },
    {
      path: `${basePath}/alerts.html`,
      label: "Alerts",
      icon: "priority_high",
      color: "bg-warning",
      page: "Alerts",
      category: "Feedback",
      description: "Communicate important status and guidance with alerts."
    },
    {
      path: `${basePath}/expansion-panels.html`,
      label: "Expansion panels",
      icon: "unfold_more",
      color: "bg-danger",
      page: "ExpansionPanels",
      category: "Navigation",
      description: "Reveal optional content in compact expansion panels."
    },
    {
      path: `${basePath}/notifications.html`,
      label: "Notifications",
      icon: "notifications",
      color: "bg-accent",
      page: "Notifications",
      category: "Feedback",
      description: "Deliver timely, contextual messages with notifications."
    },
    {
      path: `${basePath}/steppers.html`,
      label: "Steppers",
      icon: "linear_scale",
      color: "bg-info",
      page: "Steppers",
      category: "Navigation",
      description: "Guide people through ordered, multi-step tasks."
    },
    {
      path: `${basePath}/bottom-sheets.html`,
      label: "Bottom sheets",
      icon: "vertical_align_bottom",
      color: "bg-success",
      page: "BottomSheets",
      category: "Surfaces",
      description: "Show contextual actions and content in bottom sheets."
    },
    {
      path: `${basePath}/tabs.html`,
      label: "Tabs",
      icon: "tab",
      color: "bg-warning",
      page: "Tabs",
      category: "Navigation",
      description: "Switch between related sections with accessible tabs."
    },
    {
      path: `${basePath}/cards.html`,
      label: "Cards",
      icon: "video_label",
      color: "bg-primary",
      page: "Cards",
      category: "Surfaces",
      description: "Group related content and actions in flexible cards."
    },
    {
      path: `${basePath}/dialogs.html`,
      label: "Dialogs",
      icon: "web_asset",
      color: "bg-accent",
      page: "Dialogs",
      category: "Surfaces",
      description: "Focus attention on decisions and short tasks with dialogs."
    },
    {
      path: `${basePath}/lists.html`,
      label: "Lists",
      icon: "list",
      color: "bg-info",
      page: "Lists",
      category: "Data display",
      description: "Display related items, details and actions in structured lists."
    },
    {
      path: `${basePath}/forms.html`,
      label: "Forms",
      icon: "font_download",
      color: "bg-success",
      page: "Forms",
      category: "Forms",
      description: "Collect information with semantic, accessible form controls."
    },
    {
      path: `${basePath}/menus.html`,
      label: "Menus",
      icon: "menu",
      color: "bg-warning",
      page: "Menus",
      category: "Navigation",
      description: "Offer compact groups of navigation links and actions."
    },
    {
      path: `${basePath}/tables.html`,
      label: "Tables",
      icon: "view_list",
      color: "bg-danger",
      page: "Tables",
      category: "Data display",
      description: "Present structured data in responsive tables."
    },
    {
      path: `${basePath}/tooltips.html`,
      label: "Tooltips",
      icon: "label",
      color: "bg-info",
      page: "Tooltips",
      category: "Data display",
      description: "Add concise supporting context with tooltips."
    },
    {
      path: `${basePath}/progress.html`,
      label: "Progress",
      icon: "trending_flat",
      color: "bg-success",
      page: "Progress",
      category: "Feedback",
      description: "Show determinate and indeterminate progress states."
    }
  ];
  var themeRoutes = bundledThemes.map((theme) => ({
    path: themeRoutePath(theme.name),
    label: `${theme.label} theme`,
    icon: "palette",
    color: "bg-primary",
    page: "Theme",
    category: "Utilities",
    description: `Preview the ${theme.label} theme across semantic colors and common components.`,
    themeName: theme.name
  }));
  var routes = [...catalog, ...themeRoutes];
  var routeByPage = new Map(
    catalog.map((route) => [route.page, route])
  );
  var routeByPath = new Map(
    routes.map((route) => [route.path, route])
  );

  // site/src/docs/assets.ts
  var documentationAssets = {
    stylesheet: {
      fileName: "dragonglass.css",
      path: `${basePath}/dragonglass.css`
    },
    themeStylesheet: (themeName) => ({
      fileName: `dragonglass-theme-${themeName}.css`,
      path: `${basePath}/dragonglass-theme-${themeName}.css`
    }),
    script: {
      fileName: "dragonglass.js",
      path: `${basePath}/dragonglass.js`
    }
  };

  // node_modules/valyrian.js/dist/jsx-runtime/index.mjs
  function jsx(tag, props, key) {
    let children = [];
    if ("children" in props) {
      children = [props.children];
      Reflect.deleteProperty(props, "children");
    }
    return new Vnode(tag, props, children, key);
  }
  function jsxs(tag, props, key) {
    let children = props.children;
    Reflect.deleteProperty(props, "children");
    return new Vnode(tag, props, children, key);
  }

  // site/src/pages/html_page.tsx
  var Html = function view({
    content,
    isDevelopment,
    themeName,
    title
  }) {
    return /* @__PURE__ */ jsxs("html", { lang: "en", children: [
      /* @__PURE__ */ jsxs("head", { children: [
        /* @__PURE__ */ jsx("meta", { charset: "utf-8" }),
        /* @__PURE__ */ jsx("meta", { name: "viewport", content: "width=device-width, initial-scale=1" }),
        /* @__PURE__ */ jsx("title", { children: title }),
        /* @__PURE__ */ jsx(
          "link",
          {
            href: "https://fonts.googleapis.com/icon?family=Material+Icons",
            rel: "stylesheet"
          }
        ),
        /* @__PURE__ */ jsx(
          "link",
          {
            href: isDevelopment ? "/css/main.css" : documentationAssets.stylesheet.path,
            rel: "stylesheet"
          }
        ),
        /* @__PURE__ */ jsx(
          "link",
          {
            href: isDevelopment ? `/css/theme-${themeName}.css` : documentationAssets.themeStylesheet(themeName).path,
            rel: "stylesheet"
          }
        )
      ] }),
      /* @__PURE__ */ jsx("body", { "v-html": content })
    ] });
  };
  var html_page_default = Html;

  // site/src/docs/code_example.tsx
  var CodeExample = ({ code }) => /* @__PURE__ */ jsx("pre", { children: /* @__PURE__ */ jsx("code", { children: code }) });
  var code_example_default = CodeExample;

  // site/src/docs/demo_section.tsx
  var DemoSection = ({ id, title }, ...children) => /* @__PURE__ */ jsxs("section", { "aria-labelledby": id, children: [
    /* @__PURE__ */ jsx("h2", { id, children: title }),
    children
  ] });
  var demo_section_default = DemoSection;

  // site/src/pages/layout.tsx
  var DrawerLink = ({
    path,
    label,
    icon,
    color,
    currentPath
  }) => {
    const content = [
      /* @__PURE__ */ jsx("i", { class: `material-icons ${color}`, "aria-hidden": "true", children: icon }),
      label
    ];
    if (currentPath === path) {
      return /* @__PURE__ */ jsx("a", { href: path, "aria-current": "page", children: content });
    }
    return /* @__PURE__ */ jsx("a", { href: path, children: content });
  };
  var Header = ({ currentPath }) => /* @__PURE__ */ jsxs("header", { children: [
    /* @__PURE__ */ jsx("nav", { children: /* @__PURE__ */ jsxs("details", { "data-trigger": true, children: [
      /* @__PURE__ */ jsx("summary", { "aria-label": "Open documentation navigation", children: /* @__PURE__ */ jsx("span", { class: "material-icons", "aria-hidden": "true", children: "menu" }) }),
      /* @__PURE__ */ jsx("section", { "data-drawer": true, children: categoryOrder.flatMap((category) => [
        /* @__PURE__ */ jsx("header", { children: category }),
        /* @__PURE__ */ jsx("hr", {}),
        /* @__PURE__ */ jsx("ul", { "data-list": true, children: catalog.filter((route) => route.category === category).map(({ path, label, icon, color }) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          DrawerLink,
          {
            path,
            label,
            icon,
            color,
            currentPath
          }
        ) })) })
      ]) })
    ] }) }),
    /* @__PURE__ */ jsx("span", { children: "Dragonglass" })
  ] });
  var Layout = (props, ...content) => [
    /* @__PURE__ */ jsx(Header, { currentPath: props.currentPath }),
    /* @__PURE__ */ jsx("main", { children: /* @__PURE__ */ jsx("section", { children: content }) })
  ];
  var layout_default = Layout;

  // site/src/docs/doc_page.tsx
  var DocPage = ({ page }, ...children) => {
    const route = routeByPage.get(page);
    if (!route) {
      throw new Error(`Documentation metadata not found for page: ${page}`);
    }
    return /* @__PURE__ */ jsxs(layout_default, { currentPath: route.path, children: [
      /* @__PURE__ */ jsx("h1", { children: route.label }),
      /* @__PURE__ */ jsx("p", { children: route.description }),
      children
    ] });
  };
  var doc_page_default = DocPage;

  // site/src/pages/home_page.tsx
  var installCode = `bun add dragonglass`;
  var importCode = `import "dragonglass/dist/dragonglass.css";
import "dragonglass/dist/themes/default.css";`;
  var appShellCode = `<body>
  <header>
    <nav aria-label="Primary">
      <a href="/projects" aria-current="page">Projects</a>
      <a href="/teams">Teams</a>
    </nav>
  </header>

  <main>
    <header>
      <h1>Projects</h1>
    </header>
    <section data-card class="p-4">
      <h2>Website refresh</h2>
      <p>The team is reviewing the final interface states.</p>
      <button>Open project</button>
    </section>
  </main>
</body>`;
  var quickLinks = [
    { label: "Foundations", page: "Layouts" },
    { label: "Forms", page: "Forms" },
    { label: "Components", page: "AppComponents" }
  ];
  var home_page_default = () => /* @__PURE__ */ jsxs(doc_page_default, { page: "Home", children: [
    /* @__PURE__ */ jsx("p", { children: "Dragonglass is HTML5-first. Start with semantic elements and native browser behavior, then add a declarative attribute or utility only when the interface needs a component variant or focused adjustment." }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "install-dragonglass", title: "Install and import", children: [
      /* @__PURE__ */ jsx("p", { children: "Install Dragonglass with Bun." }),
      /* @__PURE__ */ jsx(code_example_default, { code: installCode }),
      /* @__PURE__ */ jsx("p", { children: "Import the framework and one compiled theme from your application entry point." }),
      /* @__PURE__ */ jsx(code_example_default, { code: importCode })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "minimal-app-shell", title: "Create an app shell", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "This shell uses native landmarks for structure, ",
        /* @__PURE__ */ jsx("code", { children: "data-card" }),
        "for a component contract, and ",
        /* @__PURE__ */ jsx("code", { children: "p-4" }),
        " for one explicit spacing adjustment."
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: appShellCode })
    ] }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "choose-the-next-guide", title: "Choose the next guide", children: /* @__PURE__ */ jsx("ul", { children: quickLinks.map(({ label, page }) => {
      const route = routeByPage.get(page);
      return /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx("a", { href: route.path, children: label }),
        ": ",
        route.description
      ] });
    }) }) })
  ] });

  // site/src/docs/api_table.tsx
  var ApiTable = ({ caption, rows }) => /* @__PURE__ */ jsxs("table", { children: [
    /* @__PURE__ */ jsx("caption", { children: caption }),
    /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("th", { scope: "col", children: "Name" }),
      /* @__PURE__ */ jsx("th", { scope: "col", children: "Type" }),
      /* @__PURE__ */ jsx("th", { scope: "col", children: "Default" }),
      /* @__PURE__ */ jsx("th", { scope: "col", children: "Description" })
    ] }) }),
    /* @__PURE__ */ jsx("tbody", { children: rows.map((row) => /* @__PURE__ */ jsxs("tr", { children: [
      /* @__PURE__ */ jsx("td", { "data-label": "Name", children: row.name }),
      /* @__PURE__ */ jsx("td", { "data-label": "Type", children: row.type }),
      /* @__PURE__ */ jsx("td", { "data-label": "Default", children: row.defaultValue }),
      /* @__PURE__ */ jsx("td", { "data-label": "Description", children: row.description })
    ] })) })
  ] });
  var api_table_default = ApiTable;

  // site/src/pages/layout_page.tsx
  var appShellCode2 = `<article>
  <header>
    <h3>Project Atlas</h3>
    <nav data-toolbar aria-label="Project actions">
      <a href="/projects.html">All projects</a>
      <button type="button">New task</button>
    </nav>
  </header>
  <section>
    <p>Track the work that is ready for review.</p>
  </section>
  <footer>
    <nav aria-label="Project sections">
      <a href="/overview.html" aria-current="page">Overview</a>
      <a href="/activity.html">Activity</a>
      <a href="/reports.html">Reports</a>
    </nav>
  </footer>
</article>`;
  var standaloneToolbarCode = `<nav data-toolbar aria-label="Result actions">
  <button type="button">Filter</button>
  <a href="/exports.html">View exports</a>
</nav>`;
  var apiRows = [
    {
      name: "main, article",
      type: "Element",
      defaultValue: "Column container",
      description: "Establishes the container contract for direct header, section and footer children."
    },
    {
      name: "header, footer",
      type: "Element",
      defaultValue: "Intrinsic height",
      description: "Keeps page-level or container-level chrome outside the scrolling content region."
    },
    {
      name: "section",
      type: "Element",
      defaultValue: "Flexible and scrollable",
      description: "Fills the remaining container space and owns content padding when it is a direct child."
    },
    {
      name: "nav",
      type: "Element",
      defaultValue: "Semantic navigation",
      description: "Groups links or related actions and accepts an accessible label."
    },
    {
      name: "data-toolbar",
      type: "Attribute",
      defaultValue: "Absent",
      description: "Turns a nav into a wrapping action row. Toolbars inside a header or footer stay on one row."
    },
    {
      name: 'aria-current="page"',
      type: "State",
      defaultValue: "Absent",
      description: "Identifies the link for the current page to assistive technology."
    },
    {
      name: "--container-padding",
      type: "Token",
      defaultValue: "Theme value",
      description: "Controls padding on the direct, scrollable content section."
    }
  ];
  var layout_page_default = () => /* @__PURE__ */ jsxs(doc_page_default, { page: "Layouts", children: [
    /* @__PURE__ */ jsxs(demo_section_default, { id: "layout-shell", title: "Application shell", children: [
      /* @__PURE__ */ jsxs("article", { children: [
        /* @__PURE__ */ jsxs("header", { children: [
          /* @__PURE__ */ jsx("h3", { children: "Project Atlas" }),
          /* @__PURE__ */ jsxs("nav", { "data-toolbar": true, "aria-label": "Project actions", children: [
            /* @__PURE__ */ jsx("a", { href: "/projects.html", children: "All projects" }),
            /* @__PURE__ */ jsx("button", { type: "button", children: "New task" })
          ] })
        ] }),
        /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsx("p", { children: "Track the work that is ready for review." }) }),
        /* @__PURE__ */ jsx("footer", { children: /* @__PURE__ */ jsxs("nav", { "aria-label": "Project sections", children: [
          /* @__PURE__ */ jsx("a", { href: "/overview.html", "aria-current": "page", children: "Overview" }),
          /* @__PURE__ */ jsx("a", { href: "/activity.html", children: "Activity" }),
          /* @__PURE__ */ jsx("a", { href: "/reports.html", children: "Reports" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: appShellCode2 })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "layout-toolbar", title: "Standalone toolbar", children: [
      /* @__PURE__ */ jsxs("nav", { "data-toolbar": true, "aria-label": "Result actions", children: [
        /* @__PURE__ */ jsx("button", { type: "button", children: "Filter" }),
        /* @__PURE__ */ jsx("a", { href: "/exports.html", children: "View exports" })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: standaloneToolbarCode })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "layout-composition", title: "Composition", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "A container is a ",
        /* @__PURE__ */ jsx("code", { children: "main" }),
        " or ",
        /* @__PURE__ */ jsx("code", { children: "article" }),
        " with direct",
        /* @__PURE__ */ jsx("code", { children: " header" }),
        ", ",
        /* @__PURE__ */ jsx("code", { children: "section" }),
        " and ",
        /* @__PURE__ */ jsx("code", { children: "footer" }),
        "children. The header and footer keep their natural height. The section receives the remaining height, padding and overflow."
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Use ",
        /* @__PURE__ */ jsx("code", { children: "nav" }),
        " for destination links. Add",
        /* @__PURE__ */ jsx("code", { children: " data-toolbar" }),
        " when the same row mixes compact links, buttons or chips as controls."
      ] })
    ] }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "layout-responsive", title: "Responsive behavior", children: /* @__PURE__ */ jsx("p", { children: "Standalone toolbars wrap when their actions need more room. A toolbar nested in a header or footer stays on one row, so keep those action sets short. Content sections scroll instead of forcing the page shell beyond the viewport." }) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "layout-accessibility", title: "Accessibility", children: /* @__PURE__ */ jsxs("p", { children: [
      "Give every navigation region a distinct ",
      /* @__PURE__ */ jsx("code", { children: "aria-label" }),
      " when a page contains more than one. Mark only the active destination with",
      /* @__PURE__ */ jsx("code", { children: ' aria-current="page"' }),
      ". Keep headings in document order and use buttons for actions rather than links without destinations."
    ] }) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "layout-errors", title: "Common mistakes", children: /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsx("li", { children: "Wrapping the content section in an extra element breaks the direct child container contract." }),
      /* @__PURE__ */ jsxs("li", { children: [
        "Using ",
        /* @__PURE__ */ jsx("code", { children: "data-toolbar" }),
        " for primary site navigation gives an action bar semantics it does not need."
      ] }),
      /* @__PURE__ */ jsx("li", { children: "Putting many actions in a header or footer toolbar can cause overflow because nested toolbars do not wrap." })
    ] }) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "layout-api", title: "API", children: /* @__PURE__ */ jsx(
      api_table_default,
      {
        caption: "Layout elements, attributes, states and tokens",
        rows: apiRows
      }
    ) })
  ] });

  // site/src/pages/grid_page.tsx
  var fractionExample = `<div class="grid">
  <div class="w-4/12"><div class="p-3 shadow-xs">Four of twelve columns</div></div>
  <div class="w-8/12"><div class="p-3 shadow-xs">Eight of twelve columns</div></div>
</div>`;
  var gutterExample = `<div class="grid-gutters">
  <div class="w-6/12"><div class="p-3 shadow-xs">First column</div></div>
  <div class="w-6/12"><div class="p-3 shadow-xs">Second column</div></div>
</div>`;
  var responsiveExample = `<div class="grid-gutters">
  <div class="sm:w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12"><div class="p-3 shadow-xs">Responsive column</div></div>
  <div class="sm:w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12"><div class="p-3 shadow-xs">Responsive column</div></div>
</div>`;
  var gridRows = [
    {
      name: "grid",
      type: "Container class",
      defaultValue: "Full-width children",
      description: "Creates a wrapping flex row without gutters."
    },
    {
      name: "grid-gutters",
      type: "Container class",
      defaultValue: "0.8rem gutters",
      description: "Creates the same grid and adds horizontal container offsets plus 0.8rem child padding."
    },
    {
      name: "w-{part}/{whole}",
      type: "Width utility",
      defaultValue: "1 through whole - 1",
      description: "Sets a fractional width. Both numbers range from 1 to 12 and part must be smaller than whole."
    },
    {
      name: "sm:w-{part}/{whole}",
      type: "Responsive width",
      defaultValue: "min-width: 576px",
      description: "Applies the fraction at the small breakpoint and above."
    },
    {
      name: "md:w-{part}/{whole}",
      type: "Responsive width",
      defaultValue: "min-width: 768px",
      description: "Applies the fraction at the medium breakpoint and above."
    },
    {
      name: "lg:w-{part}/{whole}",
      type: "Responsive width",
      defaultValue: "min-width: 992px",
      description: "Applies the fraction at the large breakpoint and above."
    },
    {
      name: "xl:w-{part}/{whole}",
      type: "Responsive width",
      defaultValue: "min-width: 1200px",
      description: "Applies the fraction at the extra-large breakpoint and above."
    }
  ];
  var grid_page_default = () => /* @__PURE__ */ jsxs(doc_page_default, { page: "Grid", children: [
    /* @__PURE__ */ jsxs(demo_section_default, { id: "fractional-grid", title: "Fractional columns", children: [
      /* @__PURE__ */ jsx("p", { children: "A grid starts mobile-first with full-width children. Fraction utilities divide a row with denominators from 2 through 12." }),
      /* @__PURE__ */ jsxs("div", { class: "grid", children: [
        /* @__PURE__ */ jsx("div", { class: "w-4/12", children: /* @__PURE__ */ jsx("div", { class: "p-3 shadow-xs", children: "Four of twelve columns" }) }),
        /* @__PURE__ */ jsx("div", { class: "w-8/12", children: /* @__PURE__ */ jsx("div", { class: "p-3 shadow-xs", children: "Eight of twelve columns" }) })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: fractionExample })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "guttered-grid", title: "Guttered columns", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "Use ",
        /* @__PURE__ */ jsx("code", { children: "grid-gutters" }),
        " when columns need consistent spacing."
      ] }),
      /* @__PURE__ */ jsxs("div", { class: "grid-gutters", children: [
        /* @__PURE__ */ jsx("div", { class: "w-6/12", children: /* @__PURE__ */ jsx("div", { class: "p-3 shadow-xs", children: "First column" }) }),
        /* @__PURE__ */ jsx("div", { class: "w-6/12", children: /* @__PURE__ */ jsx("div", { class: "p-3 shadow-xs", children: "Second column" }) })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: gutterExample })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "responsive-grid", title: "Responsive columns", children: [
      /* @__PURE__ */ jsx("p", { children: "Unprefixed fractions apply at every width. Prefixed fractions take effect at their real minimum-width breakpoint and remain active until a later rule overrides them." }),
      /* @__PURE__ */ jsxs("div", { class: "grid-gutters", children: [
        /* @__PURE__ */ jsx("div", { class: "sm:w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12", children: /* @__PURE__ */ jsx("div", { class: "p-3 shadow-xs", children: "Responsive column" }) }),
        /* @__PURE__ */ jsx("div", { class: "sm:w-6/12 md:w-4/12 lg:w-3/12 xl:w-2/12", children: /* @__PURE__ */ jsx("div", { class: "p-3 shadow-xs", children: "Responsive column" }) })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: responsiveExample })
    ] }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "grid-api", title: "Grid API and breakpoints", children: /* @__PURE__ */ jsx(api_table_default, { caption: "Grid classes and breakpoints", rows: gridRows }) }),
    /* @__PURE__ */ jsx(
      demo_section_default,
      {
        id: "grid-accessibility",
        title: "Accessibility and common errors",
        children: /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: "Keep the source order meaningful because width utilities only change presentation, not reading order." }),
          /* @__PURE__ */ jsx("li", { children: "Do not use empty columns to create spacing. Use a guttered grid or spacing utilities instead." }),
          /* @__PURE__ */ jsx("li", { children: "A prefixed width does not apply below its breakpoint, so provide an unprefixed fraction only when the mobile layout should also be split." })
        ] })
      }
    )
  ] });

  // site/src/pages/elevations_page.tsx
  var shadowSizes = ["2xs", "xs", "sm", "base", "lg", "xl", "2xl", "3xl"];
  var shadowExample = `<div class="shadow-base bg-white p-4">Raised surface</div>`;
  var innerShadowExample = `<div class="shadow-inner-base bg-white p-4">Inset surface</div>`;
  var stateExample = `<button type="button" class="shadow-base hover:shadow-3xl active:shadow-sm">Change elevation</button>
<input aria-label="Focus elevation example" class="shadow-base focus:shadow-3xl bg-white" value="Focus this field">`;
  var shadowTokenExample = `<div class="shadow-base bg-white p-4">Token-backed surface</div>`;
  var zIndexExample = `<div class="relative z-8">Navigation surface</div>
<div class="relative z-auto">Natural stacking order</div>`;
  var shadowRows = shadowSizes.flatMap((size) => [
    {
      name: `--shadow-${size}`,
      type: "CSS custom property",
      defaultValue: `shadow-${size}`,
      description: `Outer shadow token used by shadow-${size}.`
    },
    {
      name: `--shadow-inner-${size}`,
      type: "CSS custom property",
      defaultValue: `shadow-inner-${size}`,
      description: `Inset shadow token used by shadow-inner-${size}.`
    }
  ]);
  var ElevationSamples = ({ inner = false }) => /* @__PURE__ */ jsx("div", { class: "grid-gutters", children: shadowSizes.map((size) => {
    const shadowClass = inner ? `shadow-inner-${size}` : `shadow-${size}`;
    return /* @__PURE__ */ jsx("div", { class: "md:w-6/12 lg:w-4/12", children: /* @__PURE__ */ jsx("div", { class: `${shadowClass} bg-white p-4`, children: shadowClass }) });
  }) });
  var elevations_page_default = () => /* @__PURE__ */ jsxs(doc_page_default, { page: "Elevations", children: [
    /* @__PURE__ */ jsxs(demo_section_default, { id: "outer-shadows", title: "Outer shadows", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "Outer shadows range from ",
        /* @__PURE__ */ jsx("code", { children: "shadow-2xs" }),
        " to",
        /* @__PURE__ */ jsx("code", { children: " shadow-3xl" }),
        ". Use stronger levels sparingly to indicate a surface that sits above nearby content."
      ] }),
      /* @__PURE__ */ jsx("div", { class: "shadow-base bg-white p-4", children: "Raised surface" }),
      /* @__PURE__ */ jsx(code_example_default, { code: shadowExample }),
      /* @__PURE__ */ jsx(ElevationSamples, {})
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "inner-shadows", title: "Inner shadows", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "Inner shadows use the same scale with the ",
        /* @__PURE__ */ jsx("code", { children: "shadow-inner-" }),
        "prefix."
      ] }),
      /* @__PURE__ */ jsx("div", { class: "shadow-inner-base bg-white p-4", children: "Inset surface" }),
      /* @__PURE__ */ jsx(code_example_default, { code: innerShadowExample }),
      /* @__PURE__ */ jsx(ElevationSamples, { inner: true })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "shadow-states", title: "Interactive states", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          class: "shadow-base hover:shadow-3xl active:shadow-sm",
          children: "Change elevation"
        }
      ),
      /* @__PURE__ */ jsx(
        "input",
        {
          "aria-label": "Focus elevation example",
          class: "shadow-base focus:shadow-3xl bg-white",
          value: "Focus this field"
        }
      ),
      /* @__PURE__ */ jsx(code_example_default, { code: stateExample })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "shadow-api", title: "Shadow tokens", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "Each outer utility reads its matching ",
        /* @__PURE__ */ jsx("code", { children: "--shadow-*" }),
        " token, and each inset utility reads the matching ",
        /* @__PURE__ */ jsx("code", { children: "--shadow-inner-*" }),
        "token. Override a token only when the theme needs a different elevation value across every use of that utility."
      ] }),
      /* @__PURE__ */ jsx("div", { class: "shadow-base bg-white p-4", children: "Token-backed surface" }),
      /* @__PURE__ */ jsx(code_example_default, { code: shadowTokenExample }),
      /* @__PURE__ */ jsx(api_table_default, { caption: "Outer and inner shadow tokens", rows: shadowRows })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "z-index-scale", title: "Z-index scale", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "Outer shadow utilities retain a z-index derived from their elevation level. Use ",
        /* @__PURE__ */ jsx("code", { children: "z-auto" }),
        ", ",
        /* @__PURE__ */ jsx("code", { children: "z-negative-10" }),
        ",",
        /* @__PURE__ */ jsx("code", { children: " z-negative-1" }),
        ", ",
        /* @__PURE__ */ jsx("code", { children: "z-0" }),
        ", ",
        /* @__PURE__ */ jsx("code", { children: "z-1" }),
        ",",
        /* @__PURE__ */ jsx("code", { children: " z-2" }),
        ", ",
        /* @__PURE__ */ jsx("code", { children: "z-3" }),
        ", ",
        /* @__PURE__ */ jsx("code", { children: "z-4" }),
        ", ",
        /* @__PURE__ */ jsx("code", { children: "z-6" }),
        ",",
        /* @__PURE__ */ jsx("code", { children: " z-8" }),
        ", ",
        /* @__PURE__ */ jsx("code", { children: "z-12" }),
        ", ",
        /* @__PURE__ */ jsx("code", { children: "z-16" }),
        " or",
        /* @__PURE__ */ jsx("code", { children: " z-1000" }),
        " when stacking needs an explicit override."
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: zIndexExample })
    ] }),
    /* @__PURE__ */ jsx(
      demo_section_default,
      {
        id: "shadow-accessibility",
        title: "Accessibility and common errors",
        children: /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: "Do not rely on elevation alone to communicate focus, selection or an error. Preserve a visible outline, label or text state." }),
          /* @__PURE__ */ jsx("li", { children: "State variants only change the shadow. They do not add keyboard behavior to a non-interactive element." }),
          /* @__PURE__ */ jsx("li", { children: "Dragonglass currently transitions every elevation automatically and does not include a reduced-motion override in this component." })
        ] })
      }
    )
  ] });

  // site/src/docs/theme_menu.tsx
  var ThemeLink = ({
    currentThemeName,
    theme
  }) => {
    const content = theme.label;
    if (currentThemeName === theme.name) {
      return /* @__PURE__ */ jsx("a", { href: themeRoutePath(theme.name), "aria-current": "page", children: content });
    }
    return /* @__PURE__ */ jsx("a", { href: themeRoutePath(theme.name), children: content });
  };
  var ThemeMenu = ({ currentThemeName }) => /* @__PURE__ */ jsx("nav", { "aria-label": "Theme previews", children: bundledThemes.map((theme) => /* @__PURE__ */ jsx(ThemeLink, { currentThemeName, theme })) });
  var theme_menu_default = ThemeMenu;

  // site/src/pages/colors_page.tsx
  var colors = [
    "primary",
    "accent",
    "info",
    "success",
    "warning",
    "danger",
    "default"
  ];
  var weights = [
    "-lightest",
    "-lighter",
    "-light",
    "",
    "-dark",
    "-darker",
    "-darkest"
  ];
  var paletteExample = `<div class="bg-primary p-3">Primary background</div>
<p class="text-primary-dark">Primary dark text</p>`;
  var stateExample2 = `<button type="button" class="bg-primary-dark hover:bg-primary active:bg-primary-light">Background states</button>
<input aria-label="Color focus example" class="p-3 text-primary-dark focus:text-primary" value="Focus this field">`;
  var buttonExample = colors.map((color) => `<button type="button" class="bg-${color}">${color}</button>`).join("\n");
  var formExample = colors.map(
    (color) => `<fieldset data-field="${color}">
  <label for="${color}-field">${color} field</label>
  <input id="${color}-field" name="${color}-field" type="text" aria-describedby="${color}-field-help">
  <small id="${color}-field-help">Uses the ${color} theme color.</small>
</fieldset>`
  ).join("\n");
  var colorTokenExample = `<div style="background-color: var(--primary); color: var(--primary-darker)">
  Primary token preview
</div>`;
  var customThemeExample = `@use "pkg:dragonglass/theme" as dragonglass;

:root {
  @include dragonglass.tokens(#7c3aed);
}`;
  var scopedThemesExample = `@use "pkg:dragonglass/theme" as dragonglass;

[data-theme="violet"] {
  @include dragonglass.tokens(#7c3aed);
}

[data-theme="forest"] {
  @include dragonglass.tokens(#167c55);
}`;
  var colorRows = colors.flatMap(
    (color) => weights.map((weight) => ({
      name: `--${color}${weight}`,
      type: "CSS color token",
      defaultValue: color,
      description: `Used by bg-${color}${weight}, text-${color}${weight}, border-${color}${weight} and outline-${color}${weight}.`
    }))
  );
  var ColorsPage = ({ themeName } = {}) => {
    const route = routeByPage.get("Colors");
    if (!route) {
      throw new Error("Documentation metadata not found for page: Colors");
    }
    return /* @__PURE__ */ jsxs(layout_default, { currentPath: route.path, children: [
      /* @__PURE__ */ jsxs("header", { children: [
        /* @__PURE__ */ jsx("h1", { children: "Themes" }),
        /* @__PURE__ */ jsx(theme_menu_default, { currentThemeName: themeName })
      ] }),
      /* @__PURE__ */ jsx("h1", { children: route.label }),
      /* @__PURE__ */ jsx("p", { children: route.description }),
      /* @__PURE__ */ jsxs(demo_section_default, { id: "color-palette", title: "Background and text colors", children: [
        /* @__PURE__ */ jsx("p", { children: "Each semantic color includes lightest, lighter, light, base, dark, darker and darkest tokens. White and black remain the global contrast extremes." }),
        /* @__PURE__ */ jsx("div", { class: "bg-primary p-3", children: "Primary background" }),
        /* @__PURE__ */ jsx("p", { class: "text-primary-dark", children: "Primary dark text" }),
        /* @__PURE__ */ jsx(code_example_default, { code: paletteExample }),
        /* @__PURE__ */ jsx("div", { class: "grid-gutters", children: colors.map((color) => /* @__PURE__ */ jsxs("div", { class: "md:w-1/4 lg:w-1/7", children: [
          weights.map((weight) => /* @__PURE__ */ jsx("div", { class: `bg-${color}${weight} p-3`, children: `bg-${color}${weight}` })),
          weights.map((weight) => /* @__PURE__ */ jsx("div", { class: `text-${color}${weight} p-3`, children: `text-${color}${weight}` }))
        ] })) })
      ] }),
      /* @__PURE__ */ jsxs(demo_section_default, { id: "color-buttons", title: "Buttons by color", children: [
        /* @__PURE__ */ jsx("p", { children: "Each semantic family can style an action. The visible label preserves meaning when two colors look similar." }),
        colors.map((color) => /* @__PURE__ */ jsx("button", { type: "button", class: `bg-${color}`, children: color })),
        /* @__PURE__ */ jsx(code_example_default, { code: buttonExample })
      ] }),
      /* @__PURE__ */ jsxs(demo_section_default, { id: "color-fields", title: "Form fields by color", children: [
        /* @__PURE__ */ jsx("p", { children: "Use colored fields for documented states or categories. Keep a label and supporting text because color alone cannot explain the state." }),
        /* @__PURE__ */ jsx("form", { "data-card": true, children: /* @__PURE__ */ jsx("section", { children: colors.map((color) => /* @__PURE__ */ jsxs("fieldset", { "data-field": color, children: [
          /* @__PURE__ */ jsxs("label", { for: `color-field-${color}`, children: [
            color,
            " field"
          ] }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: `color-field-${color}`,
              name: `color-field-${color}`,
              type: "text",
              value: `${color} value`,
              "aria-describedby": `color-field-${color}-help`
            }
          ),
          /* @__PURE__ */ jsxs("small", { id: `color-field-${color}-help`, children: [
            "Uses the ",
            color,
            " theme color."
          ] })
        ] })) }) }),
        /* @__PURE__ */ jsx(code_example_default, { code: formExample })
      ] }),
      /* @__PURE__ */ jsxs(demo_section_default, { id: "color-states", title: "Interactive color states", children: [
        /* @__PURE__ */ jsx(
          "button",
          {
            type: "button",
            class: "bg-primary-dark hover:bg-primary active:bg-primary-light",
            children: "Background states"
          }
        ),
        /* @__PURE__ */ jsx(
          "input",
          {
            "aria-label": "Color focus example",
            class: "p-3 text-primary-dark focus:text-primary",
            value: "Focus this field"
          }
        ),
        /* @__PURE__ */ jsx(code_example_default, { code: stateExample2 })
      ] }),
      /* @__PURE__ */ jsxs(demo_section_default, { id: "compile-theme", title: "Compile a theme from one color", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "The Sass theme module derives every semantic family, weight, foreground and progress color from one opaque primary. Every base uses its lightest family token as foreground. The primary must have OKLCH lightness between 42% and 56%, and that pair must reach 4.5:1. Compile the result and load it after ",
          /* @__PURE__ */ jsx("code", { children: "dragonglass.css" }),
          "."
        ] }),
        /* @__PURE__ */ jsx(code_example_default, { code: customThemeExample }),
        /* @__PURE__ */ jsx("pre", { children: /* @__PURE__ */ jsx("code", { children: "bunx sass --pkg-importer=node theme.scss theme.css --style=compressed" }) }),
        /* @__PURE__ */ jsx("p", { children: "Place each mixin call inside a theme selector when one stylesheet must contain several themes." }),
        /* @__PURE__ */ jsx(code_example_default, { code: scopedThemesExample })
      ] }),
      /* @__PURE__ */ jsxs(demo_section_default, { id: "color-api", title: "Color tokens", children: [
        /* @__PURE__ */ jsx("p", { children: "Use the semantic custom properties when a component needs token values directly instead of a generated color utility class." }),
        /* @__PURE__ */ jsx("div", { style: "background-color: var(--primary); color: var(--primary-darker)", children: "Primary token preview" }),
        /* @__PURE__ */ jsx(code_example_default, { code: colorTokenExample }),
        /* @__PURE__ */ jsx(api_table_default, { caption: "Semantic color custom properties", rows: colorRows })
      ] }),
      /* @__PURE__ */ jsx(
        demo_section_default,
        {
          id: "color-accessibility",
          title: "Accessibility and common errors",
          children: /* @__PURE__ */ jsxs("ul", { children: [
            /* @__PURE__ */ jsx("li", { children: "Verify text and background combinations in context. A semantic token name does not guarantee sufficient contrast for every pairing." }),
            /* @__PURE__ */ jsxs("li", { children: [
              "Compile the theme again when its primary changes. Overriding only",
              /* @__PURE__ */ jsx("code", { children: "--primary" }),
              " does not recalculate the generated tokens."
            ] }),
            /* @__PURE__ */ jsx("li", { children: "Base colors always use their lightest family token as foreground. The compiler rejects a primary outside the 42% to 56% OKLCH lightness range or one that cannot support that direction." }),
            /* @__PURE__ */ jsx("li", { children: "Never use color as the only signal for status, validation or an available action. Include text or another programmatic cue." }),
            /* @__PURE__ */ jsxs("li", { children: [
              "Use a generated class such as ",
              /* @__PURE__ */ jsx("code", { children: "shadow-xs" }),
              " for elevation. The unqualified ",
              /* @__PURE__ */ jsx("code", { children: "shadow" }),
              " class does not exist."
            ] })
          ] })
        }
      )
    ] });
  };
  var colors_page_default = ColorsPage;

  // site/src/pages/fonts_page.tsx
  var sizes = [
    ["2xs", "0.75rem"],
    ["xs", "0.8rem"],
    ["sm", "0.9rem"],
    ["base", "1rem"],
    ["lg", "1.25rem"],
    ["xl", "1.5rem"],
    ["2xl", "1.965rem"],
    ["3xl", "2.25rem"]
  ];
  var styles = ["normal-style", "italic", "oblique"];
  var weights2 = [
    "font-thin",
    "font-extralight",
    "font-light",
    "font-normal",
    "font-medium",
    "font-semibold",
    "font-bold",
    "font-extrabold",
    "font-black"
  ];
  var transforms = ["normal-case", "capitalize", "uppercase", "lowercase"];
  var lineHeights = [
    "leading-none",
    "leading-tight",
    "leading-snug",
    "leading-normal",
    "leading-relaxed",
    "leading-loose"
  ];
  var alignments = ["text-left", "text-right", "text-center", "text-justify"];
  var composedExample = `<p class="text-base italic font-light capitalize text-justify leading-loose">Readable type combines size, style, weight, casing, alignment and line height.</p>`;
  var sizeExample = sizes.map(([size, value]) => `<p class="text-${size}">text-${size} (${value})</p>`).join("\n");
  var fontRows = [
    ...sizes.map(([size, value]) => ({
      name: `text-${size}`,
      type: "Font size utility",
      defaultValue: value,
      description: `Uses --font-size-${size}.`
    })),
    {
      name: "normal-style | italic | oblique",
      type: "Font style utility",
      defaultValue: "normal-style",
      description: "Sets the font-style property."
    },
    {
      name: "font-thin through font-black",
      type: "Font weight utility",
      defaultValue: "font-normal (400)",
      description: "Sets numeric weights from 100 through 900."
    },
    {
      name: "normal-case | capitalize | uppercase | lowercase",
      type: "Text transform utility",
      defaultValue: "normal-case",
      description: "Changes visual casing without changing source text."
    },
    {
      name: "leading-none through leading-loose",
      type: "Line height utility",
      defaultValue: "leading-normal (1.5)",
      description: "Sets line height from 1 through 2."
    },
    {
      name: "text-left | text-right | text-center | text-justify",
      type: "Text alignment utility",
      defaultValue: "Browser direction",
      description: "Sets physical text alignment."
    }
  ];
  var fonts_page_default = () => /* @__PURE__ */ jsxs(doc_page_default, { page: "Fonts", children: [
    /* @__PURE__ */ jsxs(demo_section_default, { id: "composed-type", title: "Composed typography", children: [
      /* @__PURE__ */ jsx("p", { class: "text-base italic font-light capitalize text-justify leading-loose", children: "Readable type combines size, style, weight, casing, alignment and line height." }),
      /* @__PURE__ */ jsx(code_example_default, { code: composedExample })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "font-sizes", title: "Font sizes", children: [
      sizes.map(([size, value]) => /* @__PURE__ */ jsxs("p", { class: `text-${size}`, children: [
        `text-${size}`,
        " (",
        value,
        ")"
      ] })),
      /* @__PURE__ */ jsx(code_example_default, { code: sizeExample })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "font-utilities", title: "Style, weight and layout utilities", children: [
      /* @__PURE__ */ jsx("h3", { children: "Styles" }),
      styles.map((item) => /* @__PURE__ */ jsx("p", { class: item, children: item })),
      /* @__PURE__ */ jsx("h3", { children: "Weights" }),
      weights2.map((item) => /* @__PURE__ */ jsx("p", { class: item, children: item })),
      /* @__PURE__ */ jsx("h3", { children: "Text transforms" }),
      transforms.map((item) => /* @__PURE__ */ jsx("p", { class: item, children: item })),
      /* @__PURE__ */ jsx("h3", { children: "Line heights" }),
      lineHeights.map((item) => /* @__PURE__ */ jsx("p", { class: item, children: item })),
      /* @__PURE__ */ jsx("h3", { children: "Alignment" }),
      alignments.map((item) => /* @__PURE__ */ jsx("p", { class: item, children: item })),
      /* @__PURE__ */ jsx("p", { class: "font-semibold leading-relaxed text-left", children: "Typography utilities" }),
      /* @__PURE__ */ jsx(
        code_example_default,
        {
          code: `<p class="font-semibold leading-relaxed text-left">Typography utilities</p>`
        }
      )
    ] }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "font-api", title: "Typography API", children: /* @__PURE__ */ jsx(api_table_default, { caption: "Typography utilities and tokens", rows: fontRows }) }),
    /* @__PURE__ */ jsx(
      demo_section_default,
      {
        id: "font-accessibility",
        title: "Accessibility and common errors",
        children: /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: "Keep body copy at a readable size and line height. Smaller utilities are better suited to short supporting labels." }),
          /* @__PURE__ */ jsx("li", { children: "Visual casing does not replace meaningful source text. Avoid long uppercase passages because they are harder to scan." }),
          /* @__PURE__ */ jsxs("li", { children: [
            "Make the documented class match the rendered example. This page uses",
            /* @__PURE__ */ jsx("code", { children: " text-base" }),
            " in both the composed sample and its snippet."
          ] })
        ] })
      }
    )
  ] });

  // site/src/pages/badges_page.tsx
  var colors2 = [
    "primary",
    "accent",
    "info",
    "success",
    "warning",
    "danger",
    "default"
  ];
  var badgeRows = [
    {
      name: "data-badge",
      type: "HTML data attribute",
      defaultValue: "Required",
      description: "Supplies the short visual value rendered by the ::after pseudo-element."
    },
    {
      name: "after:bg-{color}",
      type: "Pseudo-element color utility",
      defaultValue: "bg-white",
      description: "Sets the badge background to primary, accent, info, success, warning, danger or default."
    }
  ];
  var badges_page_default = () => /* @__PURE__ */ jsxs(doc_page_default, { page: "Badges", children: [
    /* @__PURE__ */ jsxs(demo_section_default, { id: "badge-colors", title: "Badge colors", children: [
      /* @__PURE__ */ jsx("p", { children: "Keep the value in real markup because generated pseudo-element content is not a reliable accessible name." }),
      /* @__PURE__ */ jsx("div", { class: "grid-gutters", children: colors2.map((color) => {
        const code = `<span data-badge="1" class="after:bg-${color}">1 notification</span>`;
        return /* @__PURE__ */ jsxs("div", { class: "md:w-1/3", children: [
          /* @__PURE__ */ jsx("span", { "data-badge": "1", class: `after:bg-${color}`, children: "1 notification" }),
          /* @__PURE__ */ jsx(code_example_default, { code })
        ] });
      }) })
    ] }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "badge-api", title: "Badge API", children: /* @__PURE__ */ jsx(
      api_table_default,
      {
        caption: "Badge attributes and color utilities",
        rows: badgeRows
      }
    ) }),
    /* @__PURE__ */ jsx(
      demo_section_default,
      {
        id: "badge-accessibility",
        title: "Accessibility and common errors",
        children: /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            "Include the count or status as real text. Do not leave important information only in ",
            /* @__PURE__ */ jsx("code", { children: "data-badge" }),
            " or ",
            /* @__PURE__ */ jsx("code", { children: "::after" }),
            "."
          ] }),
          /* @__PURE__ */ jsx("li", { children: "Keep badge values short because the current CSS uses a fixed circular area and does not expand for long text." }),
          /* @__PURE__ */ jsx("li", { children: "A badge does not make its host interactive. Use a link or button only when the surrounding content performs an action." })
        ] })
      }
    )
  ] });

  // site/src/pages/buttons_page.tsx
  var statesCode = `<button type="button">Plain button</button>
<button type="button" disabled>Disabled button</button>
<button type="button" aria-disabled="true">Unavailable but focusable</button>`;
  var tonesCode = `<button type="button" class="bg-primary">Primary</button>
<button type="button" class="bg-accent">Accent</button>
<button type="button" class="bg-info">Info</button>
<button type="button" class="bg-success">Success</button>
<button type="button" class="bg-warning">Warning</button>
<button type="button" class="bg-danger">Danger</button>
<button type="button" class="bg-default">Default</button>`;
  var outlinesCode = `<button type="button" class="border-primary">Primary outline</button>
<button type="button" class="border-success-dark">Success outline</button>
<button type="button" class="border-danger-light">Danger outline</button>
<button
  type="button"
  class="bg-info focus:outline-2 focus:outline-offset-1 focus:outline-info-light"
>
  Visible focus outline
</button>`;
  var sizesCode = `<button type="button" class="bg-primary text-2xs">Compact</button>
<button type="button" class="bg-primary text-base">Default</button>
<button type="button" class="bg-primary text-xl">Large</button>`;
  var fabCode = `<button type="button" data-button="fab" class="bg-primary inline" aria-label="Add item">
  <i class="material-icons" aria-hidden="true">add</i>
</button>
<button
  type="button"
  data-button="fab no-shadow"
  class="bg-accent inline"
  aria-label="Edit item"
>
  <i class="material-icons" aria-hidden="true">edit</i>
</button>`;
  var apiRows2 = [
    {
      name: "button",
      type: "Element",
      defaultValue: "Plain",
      description: "Provides native button semantics, keyboard behavior and styling."
    },
    {
      name: "disabled",
      type: "State",
      defaultValue: "Absent",
      description: "Removes a native button from interaction and sequential focus."
    },
    {
      name: 'aria-disabled="true"',
      type: "State",
      defaultValue: "Absent",
      description: "Announces an unavailable action while retaining focus. Application code must prevent activation."
    },
    {
      name: 'data-button="fab"',
      type: "Attribute",
      defaultValue: "Absent",
      description: "Creates a circular floating action button with default elevation."
    },
    {
      name: "no-shadow",
      type: "Attribute token",
      defaultValue: "Shadow",
      description: "Removes the default FAB elevation when included in data-button."
    },
    {
      name: "bg-{tone}",
      type: "Class token",
      defaultValue: "Transparent",
      description: "Applies a semantic background tone such as primary, success or danger."
    },
    {
      name: "border-{tone}{weight}",
      type: "Class token",
      defaultValue: "No border",
      description: "Creates an outlined treatment with an optional light or dark weight."
    },
    {
      name: "text-{size}",
      type: "Class token",
      defaultValue: "Inherited",
      description: "Scales button text and the em-based button dimensions."
    },
    {
      name: "--button-disabled-opacity",
      type: "Token",
      defaultValue: "Theme value",
      description: "Controls the visual emphasis of unavailable buttons."
    }
  ];
  var buttons_page_default = () => /* @__PURE__ */ jsxs(doc_page_default, { page: "Buttons", children: [
    /* @__PURE__ */ jsxs(demo_section_default, { id: "button-states", title: "Plain and unavailable buttons", children: [
      /* @__PURE__ */ jsx("button", { type: "button", children: "Plain button" }),
      /* @__PURE__ */ jsx("button", { type: "button", disabled: true, children: "Disabled button" }),
      /* @__PURE__ */ jsx("button", { type: "button", "aria-disabled": "true", children: "Unavailable but focusable" }),
      /* @__PURE__ */ jsx(code_example_default, { code: statesCode })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "button-tones", title: "Semantic tones", children: [
      /* @__PURE__ */ jsx("button", { type: "button", class: "bg-primary", children: "Primary" }),
      /* @__PURE__ */ jsx("button", { type: "button", class: "bg-accent", children: "Accent" }),
      /* @__PURE__ */ jsx("button", { type: "button", class: "bg-info", children: "Info" }),
      /* @__PURE__ */ jsx("button", { type: "button", class: "bg-success", children: "Success" }),
      /* @__PURE__ */ jsx("button", { type: "button", class: "bg-warning", children: "Warning" }),
      /* @__PURE__ */ jsx("button", { type: "button", class: "bg-danger", children: "Danger" }),
      /* @__PURE__ */ jsx("button", { type: "button", class: "bg-default", children: "Default" }),
      /* @__PURE__ */ jsx(code_example_default, { code: tonesCode })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "button-outlines", title: "Borders and focus outlines", children: [
      /* @__PURE__ */ jsx("button", { type: "button", class: "border-primary", children: "Primary outline" }),
      /* @__PURE__ */ jsx("button", { type: "button", class: "border-success-dark", children: "Success outline" }),
      /* @__PURE__ */ jsx("button", { type: "button", class: "border-danger-light", children: "Danger outline" }),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          class: "bg-info focus:outline-2 focus:outline-offset-1 focus:outline-info-light",
          children: "Visible focus outline"
        }
      ),
      /* @__PURE__ */ jsx(code_example_default, { code: outlinesCode })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "button-sizes", title: "Sizes", children: [
      /* @__PURE__ */ jsx("button", { type: "button", class: "bg-primary text-2xs", children: "Compact" }),
      /* @__PURE__ */ jsx("button", { type: "button", class: "bg-primary text-base", children: "Default" }),
      /* @__PURE__ */ jsx("button", { type: "button", class: "bg-primary text-xl", children: "Large" }),
      /* @__PURE__ */ jsx(code_example_default, { code: sizesCode })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "button-fab", title: "Floating actions", children: [
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          "data-button": "fab",
          class: "bg-primary inline",
          "aria-label": "Add item",
          children: /* @__PURE__ */ jsx("i", { class: "material-icons", "aria-hidden": "true", children: "add" })
        }
      ),
      /* @__PURE__ */ jsx(
        "button",
        {
          type: "button",
          "data-button": "fab no-shadow",
          class: "bg-accent inline",
          "aria-label": "Edit item",
          children: /* @__PURE__ */ jsx("i", { class: "material-icons", "aria-hidden": "true", children: "edit" })
        }
      ),
      /* @__PURE__ */ jsx(code_example_default, { code: fabCode })
    ] }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "button-composition", title: "Composition", children: /* @__PURE__ */ jsxs("p", { children: [
      "Start with a native ",
      /* @__PURE__ */ jsx("code", { children: "button" }),
      ". Add one background or border utility for emphasis, then a text-size utility only when the surrounding interface needs a different scale. Reserve a FAB for the primary action associated with the current view."
    ] }) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "button-responsive", title: "Responsive behavior", children: /* @__PURE__ */ jsx("p", { children: "Buttons keep their labels on one line. Let a surrounding toolbar wrap when space is limited, and keep action labels concise instead of shrinking tap targets. FAB dimensions scale with their text size." }) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "button-accessibility", title: "Accessibility", children: /* @__PURE__ */ jsxs("p", { children: [
      "Use visible text for ordinary actions. Every icon-only button needs an",
      /* @__PURE__ */ jsx("code", { children: " aria-label" }),
      ", and its icon must use",
      /* @__PURE__ */ jsx("code", { children: ' aria-hidden="true"' }),
      ". Prefer ",
      /* @__PURE__ */ jsx("code", { children: "disabled" }),
      " when the action should leave the focus order. Use ",
      /* @__PURE__ */ jsx("code", { children: "aria-disabled" }),
      " only when people still need to discover the action, and suppress activation in application logic."
    ] }) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "button-errors", title: "Common mistakes", children: /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsx("li", { children: "Removing the focus outline without a visible replacement makes keyboard position impossible to track." }),
      /* @__PURE__ */ jsxs("li", { children: [
        "Using ",
        /* @__PURE__ */ jsx("code", { children: "aria-disabled" }),
        " alone does not prevent activation in the browser."
      ] }),
      /* @__PURE__ */ jsx("li", { children: "Applying multiple tone classes creates an order-dependent result and obscures the intended emphasis." }),
      /* @__PURE__ */ jsx("li", { children: "Repeating FABs for secondary actions weakens the single prominent action pattern." })
    ] }) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "button-api", title: "API", children: /* @__PURE__ */ jsx(
      api_table_default,
      {
        caption: "Button elements, attributes, states and tokens",
        rows: apiRows2
      }
    ) })
  ] });

  // site/src/pages/cards_page.tsx
  var basicCardExample = `<article data-card>
  <section>
    <h3>Release notes</h3>
    <p>Review the latest component changes.</p>
  </section>
</article>`;
  var elevatedCardExample = `<article data-card="elevated">
  <section>
    <h3>Elevated card</h3>
    <p>Elevation adds emphasis without changing the content structure.</p>
  </section>
</article>`;
  var structuredCardExample = `<article data-card>
  <header>
    <h3>Project update</h3>
    <nav aria-label="Card actions">
      <button data-button="fab" type="button" aria-label="Share project update">
        <i class="material-icons" aria-hidden="true">share</i>
      </button>
    </nav>
  </header>
  <section>
    <p>The accessibility review is ready.</p>
  </section>
  <footer>
    <a href="/dragonglass/alerts.html">Review alerts</a>
  </footer>
</article>`;
  var mediaCardExample = `<article data-card>
  <section data-media role="img" aria-label="Mountain ridge under a cloudy sky" style="background-image: url('https://picsum.photos/480/480')"></section>
  <section>
    <h3>Field report</h3>
    <p>The background image has an equivalent accessible name.</p>
  </section>
</article>`;
  var squareCardExample = `<article data-card="squared">
  <section data-media class="bg-primary">
    <header>
      <h3>May release</h3>
    </header>
    <section>Available May 24 from 7 to 11 p.m.</section>
  </section>
</article>`;
  var fullWidthCardExample = `<article data-card="full-width">
  <header>
    <h3>Documentation status</h3>
  </header>
  <section>
    <p>Use the full available content width for longer summaries.</p>
  </section>
  <footer>
    <a href="/dragonglass">Browse documentation</a>
  </footer>
</article>`;
  var cards_page_default = () => /* @__PURE__ */ jsxs(doc_page_default, { page: "Cards", children: [
    /* @__PURE__ */ jsxs(demo_section_default, { id: "cards-basic-title", title: "Basic and elevated cards", children: [
      /* @__PURE__ */ jsx("p", { children: "Use a basic card for grouped content in the normal page flow. Use the elevated variant when the same structure needs stronger visual emphasis." }),
      /* @__PURE__ */ jsx("article", { "data-card": true, children: /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsx("h3", { children: "Release notes" }),
        /* @__PURE__ */ jsx("p", { children: "Review the latest component changes." })
      ] }) }),
      /* @__PURE__ */ jsx(code_example_default, { code: basicCardExample }),
      /* @__PURE__ */ jsx("article", { "data-card": "elevated", children: /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsx("h3", { children: "Elevated card" }),
        /* @__PURE__ */ jsx("p", { children: "Elevation adds emphasis without changing the content structure." })
      ] }) }),
      /* @__PURE__ */ jsx(code_example_default, { code: elevatedCardExample })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "cards-structured-title", title: "Header, content and footer", children: [
      /* @__PURE__ */ jsx("p", { children: "Use direct header, section and footer regions when a card needs a title, supporting content and a separate action area." }),
      /* @__PURE__ */ jsxs("article", { "data-card": true, children: [
        /* @__PURE__ */ jsxs("header", { children: [
          /* @__PURE__ */ jsx("h3", { children: "Project update" }),
          /* @__PURE__ */ jsx("nav", { "aria-label": "Card actions", children: /* @__PURE__ */ jsx(
            "button",
            {
              "data-button": "fab",
              type: "button",
              "aria-label": "Share project update",
              children: /* @__PURE__ */ jsx("i", { class: "material-icons", "aria-hidden": "true", children: "share" })
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsx("p", { children: "The accessibility review is ready." }) }),
        /* @__PURE__ */ jsx("footer", { children: /* @__PURE__ */ jsx("a", { href: "/dragonglass/alerts.html", children: "Review alerts" }) })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: structuredCardExample })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "cards-media-title", title: "Media and square cards", children: [
      /* @__PURE__ */ jsx("p", { children: "Use a media region for an image that supports the card content. Use the squared variant for compact, equal-ratio tiles whose content fits the constrained shape." }),
      /* @__PURE__ */ jsxs("article", { "data-card": true, children: [
        /* @__PURE__ */ jsx(
          "section",
          {
            "data-media": true,
            role: "img",
            "aria-label": "Mountain ridge under a cloudy sky",
            style: "background-image: url('https://picsum.photos/480/480')"
          }
        ),
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsx("h3", { children: "Field report" }),
          /* @__PURE__ */ jsx("p", { children: "The background image has an equivalent accessible name." })
        ] })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: mediaCardExample }),
      /* @__PURE__ */ jsx("article", { "data-card": "squared", children: /* @__PURE__ */ jsxs("section", { "data-media": true, class: "bg-primary", children: [
        /* @__PURE__ */ jsx("header", { children: /* @__PURE__ */ jsx("h3", { children: "May release" }) }),
        /* @__PURE__ */ jsx("section", { children: "Available May 24 from 7 to 11 p.m." })
      ] }) }),
      /* @__PURE__ */ jsx(code_example_default, { code: squareCardExample })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "cards-full-width-title", title: "Full-width card", children: [
      /* @__PURE__ */ jsx("p", { children: "Use the full-width variant for summaries that need the complete content row instead of a compact card column." }),
      /* @__PURE__ */ jsxs("article", { "data-card": "full-width", children: [
        /* @__PURE__ */ jsx("header", { children: /* @__PURE__ */ jsx("h3", { children: "Documentation status" }) }),
        /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsx("p", { children: "Use the full available content width for longer summaries." }) }),
        /* @__PURE__ */ jsx("footer", { children: /* @__PURE__ */ jsx("a", { href: "/dragonglass", children: "Browse documentation" }) })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: fullWidthCardExample })
    ] }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "cards-api-title", title: "API", children: /* @__PURE__ */ jsx(
      api_table_default,
      {
        caption: "Card elements, attributes, tokens and states",
        rows: [
          {
            name: "article / section",
            type: "Element",
            defaultValue: "Contextual",
            description: "Use article for standalone content or section for grouped content."
          },
          {
            name: "data-card",
            type: "Attribute",
            defaultValue: "Basic",
            description: "Accepts elevated, squared or full-width variant tokens."
          },
          {
            name: "data-media",
            type: "Attribute",
            defaultValue: "Absent",
            description: "Creates a cover media region inside the card."
          },
          {
            name: "--card-padding / --card-radius / --card-shadow",
            type: "Token",
            defaultValue: "Theme",
            description: "Control content spacing, corners and elevated shadow."
          },
          {
            name: "basic / elevated / squared / full-width",
            type: "State / variant",
            defaultValue: "Basic",
            description: "Selects border, elevation, aspect ratio or width behavior."
          }
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "cards-accessibility-title", title: "Accessibility", children: /* @__PURE__ */ jsxs("p", { children: [
      "Preserve heading order inside each card. Give icon-only buttons an accessible name. A meaningful background image needs equivalent text, such as ",
      /* @__PURE__ */ jsx("code", { children: 'role="img"' }),
      " with ",
      /* @__PURE__ */ jsx("code", { children: "aria-label" }),
      ". Decorative media should be hidden from assistive technology instead."
    ] }) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "cards-errors-title", title: "Composition and common errors", children: /* @__PURE__ */ jsx("p", { children: "Keep media, content and actions as direct card regions so the component selectors apply. Do not make the entire card clickable when it also contains independent buttons or links." }) })
  ] });

  // site/src/pages/dialogs_page.tsx
  var standardDialogCode = `<dialog open class="static" aria-labelledby="review-dialog-title">
  <header>
    <h3 id="review-dialog-title">Review changes</h3>
    <nav aria-label="Dialog actions">
      <button type="button" data-button="fab" class="inline" aria-label="Share review">
        <i class="material-icons" aria-hidden="true">share</i>
      </button>
    </nav>
  </header>
  <section>
    Confirm the title and owner before publishing this project.
  </section>
  <footer>
    <nav aria-label="Review decision">
      <button type="button">Cancel</button>
      <button type="button" class="bg-primary">Publish</button>
    </nav>
  </footer>
</dialog>`;
  var dialogVariantsCode = `<dialog open class="static" data-dialog="squared" aria-labelledby="event-dialog-title">
  <section data-media class="bg-primary">
    <header>
      <h3 id="event-dialog-title">Team event</h3>
      <button type="button" data-button="fab" class="inline" aria-label="Share event">
        <i class="material-icons" aria-hidden="true">share</i>
      </button>
    </header>
    <section>May 24, 7:00 PM</section>
  </section>
</dialog>

<dialog open class="static" data-dialog="full-width" aria-labelledby="workspace-dialog-title">
  <header><h3 id="workspace-dialog-title">Workspace settings</h3></header>
  <section>Settings can use the available viewport width.</section>
</dialog>

<dialog open class="static" data-dialog="no-shadow" aria-labelledby="embedded-dialog-title">
  <header><h3 id="embedded-dialog-title">Embedded decision</h3></header>
  <section>Remove elevation when the surrounding surface supplies separation.</section>
</dialog>`;
  var apiRows3 = [
    {
      name: "dialog",
      type: "Element",
      defaultValue: "Closed",
      description: "Provides native dialog semantics and a centered, elevated surface."
    },
    {
      name: "open",
      type: "State",
      defaultValue: "Absent",
      description: "Makes a non-modal dialog visible. Use showModal() for modal behavior."
    },
    {
      name: "aria-labelledby",
      type: "Attribute",
      defaultValue: "Required by guidance",
      description: "Associates the dialog with the id of its visible heading."
    },
    {
      name: 'data-dialog="squared"',
      type: "Attribute token",
      defaultValue: "Standard shape",
      description: "Creates a compact square surface suited to concise media or content."
    },
    {
      name: "full-width",
      type: "Attribute token",
      defaultValue: "Content width",
      description: "Expands the dialog to the available viewport width with an outer gap."
    },
    {
      name: "no-shadow",
      type: "Attribute token",
      defaultValue: "--shadow-2xl",
      description: "Removes dialog elevation when another boundary provides separation."
    },
    {
      name: "--dialog-radius",
      type: "Token",
      defaultValue: "Theme value",
      description: "Controls the corner radius of standard dialogs."
    }
  ];
  var dialogs_page_default = () => /* @__PURE__ */ jsxs(doc_page_default, { page: "Dialogs", children: [
    /* @__PURE__ */ jsxs(demo_section_default, { id: "dialog-standard", title: "Dialog with actions", children: [
      /* @__PURE__ */ jsxs("dialog", { open: true, class: "static", "aria-labelledby": "review-dialog-title", children: [
        /* @__PURE__ */ jsxs("header", { children: [
          /* @__PURE__ */ jsx("h3", { id: "review-dialog-title", children: "Review changes" }),
          /* @__PURE__ */ jsx("nav", { "aria-label": "Dialog actions", children: /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              "data-button": "fab",
              class: "inline",
              "aria-label": "Share review",
              children: /* @__PURE__ */ jsx("i", { class: "material-icons", "aria-hidden": "true", children: "share" })
            }
          ) })
        ] }),
        /* @__PURE__ */ jsx("section", { children: "Confirm the title and owner before publishing this project." }),
        /* @__PURE__ */ jsx("footer", { children: /* @__PURE__ */ jsxs("nav", { "aria-label": "Review decision", children: [
          /* @__PURE__ */ jsx("button", { type: "button", children: "Cancel" }),
          /* @__PURE__ */ jsx("button", { type: "button", class: "bg-primary", children: "Publish" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: standardDialogCode })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "dialog-variants", title: "Shape, width and elevation", children: [
      /* @__PURE__ */ jsx(
        "dialog",
        {
          open: true,
          class: "static",
          "data-dialog": "squared",
          "aria-labelledby": "event-dialog-title",
          children: /* @__PURE__ */ jsxs("section", { "data-media": true, class: "bg-primary", children: [
            /* @__PURE__ */ jsxs("header", { children: [
              /* @__PURE__ */ jsx("h3", { id: "event-dialog-title", children: "Team event" }),
              /* @__PURE__ */ jsx(
                "button",
                {
                  type: "button",
                  "data-button": "fab",
                  class: "inline",
                  "aria-label": "Share event",
                  children: /* @__PURE__ */ jsx("i", { class: "material-icons", "aria-hidden": "true", children: "share" })
                }
              )
            ] }),
            /* @__PURE__ */ jsx("section", { children: "May 24, 7:00 PM" })
          ] })
        }
      ),
      /* @__PURE__ */ jsxs(
        "dialog",
        {
          open: true,
          class: "static",
          "data-dialog": "full-width",
          "aria-labelledby": "workspace-dialog-title",
          children: [
            /* @__PURE__ */ jsx("header", { children: /* @__PURE__ */ jsx("h3", { id: "workspace-dialog-title", children: "Workspace settings" }) }),
            /* @__PURE__ */ jsx("section", { children: "Settings can use the available viewport width." })
          ]
        }
      ),
      /* @__PURE__ */ jsxs(
        "dialog",
        {
          open: true,
          class: "static",
          "data-dialog": "no-shadow",
          "aria-labelledby": "embedded-dialog-title",
          children: [
            /* @__PURE__ */ jsx("header", { children: /* @__PURE__ */ jsx("h3", { id: "embedded-dialog-title", children: "Embedded decision" }) }),
            /* @__PURE__ */ jsx("section", { children: "Remove elevation when the surrounding surface supplies separation." })
          ]
        }
      ),
      /* @__PURE__ */ jsx(code_example_default, { code: dialogVariantsCode })
    ] }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "dialog-composition", title: "Composition", children: /* @__PURE__ */ jsxs("p", { children: [
      "Compose a dialog from direct ",
      /* @__PURE__ */ jsx("code", { children: "header" }),
      ", ",
      /* @__PURE__ */ jsx("code", { children: "section" }),
      "and ",
      /* @__PURE__ */ jsx("code", { children: "footer" }),
      " children. Keep the decision and its actions short. The ",
      /* @__PURE__ */ jsx("code", { children: "static" }),
      " utility in these previews only keeps several open examples in the document flow. Omit it when the dialog should use its default centered position."
    ] }) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "dialog-responsive", title: "Responsive behavior", children: /* @__PURE__ */ jsxs("p", { children: [
      "Standard dialogs size to their content. The ",
      /* @__PURE__ */ jsx("code", { children: "full-width" }),
      "token leaves a small viewport gap and works for wider tasks. Keep long content in the body section so it can scroll without moving the header or footer actions."
    ] }) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "dialog-accessibility", title: "Accessibility", children: /* @__PURE__ */ jsxs("p", { children: [
      "Give every dialog a visible heading and connect it with",
      /* @__PURE__ */ jsx("code", { children: " aria-labelledby" }),
      ". Use the native ",
      /* @__PURE__ */ jsx("code", { children: "showModal()" }),
      "method when the rest of the page must be inert, move focus to a useful control after opening, support Escape and return focus to the trigger after closing. Icon-only actions need an ",
      /* @__PURE__ */ jsx("code", { children: "aria-label" }),
      " and a decorative icon marked ",
      /* @__PURE__ */ jsx("code", { children: 'aria-hidden="true"' }),
      "."
    ] }) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "dialog-errors", title: "Common mistakes", children: /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsxs("li", { children: [
        "A ",
        /* @__PURE__ */ jsx("code", { children: "details" }),
        " element does not provide dialog focus, dismissal or modal semantics."
      ] }),
      /* @__PURE__ */ jsx("li", { children: "Styling an ordinary container to look modal leaves the background interactive and the surface unnamed." }),
      /* @__PURE__ */ jsx("li", { children: "Opening several modal dialogs at once creates an ambiguous focus and dismissal order." }),
      /* @__PURE__ */ jsxs("li", { children: [
        "Using ",
        /* @__PURE__ */ jsx("code", { children: "open" }),
        " alone creates a non-modal dialog. Use the native modal method when interaction must stay inside the dialog."
      ] })
    ] }) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "dialog-api", title: "API", children: /* @__PURE__ */ jsx(
      api_table_default,
      {
        caption: "Dialog elements, attributes, states and tokens",
        rows: apiRows3
      }
    ) })
  ] });

  // site/src/pages/lists_page.tsx
  var basicRowsExample = `<ul data-list>
  <li><span>Bryan Cranston</span></li>
</ul>

<ul data-list>
  <li>
    <span><i class="material-icons" aria-hidden="true">person</i><span>Bryan Cranston</span></span>
  </li>
</ul>

<ul data-list>
  <li>
    <span>Bryan Cranston</span>
    <span aria-label="Favorite"><i class="material-icons" aria-hidden="true">star</i></span>
  </li>
</ul>

<ul data-list>
  <li>
    <span>Bryan Cranston</span>
    <span><small>Actor</small><i class="material-icons" aria-hidden="true">star</i></span>
  </li>
</ul>

<ul data-list>
  <li>
    <span><span>Bryan Cranston<small>Played Walter White in Breaking Bad.</small></span></span>
  </li>
</ul>`;
  var combinedRowsExample = `<ul data-list>
  <li>
    <span><i class="material-icons" aria-hidden="true">person</i><span>Bryan Cranston</span></span>
    <span aria-label="Favorite"><i class="material-icons" aria-hidden="true">star</i></span>
  </li>
</ul>

<ul data-list>
  <li>
    <span><i class="material-icons" aria-hidden="true">person</i><span>Bryan Cranston</span></span>
    <span><small>Actor</small><i class="material-icons" aria-hidden="true">star</i></span>
  </li>
</ul>

<ul data-list>
  <li>
    <span>
      <i class="material-icons" aria-hidden="true">person</i>
      <span>Bryan Cranston<small>Played Walter White in Breaking Bad.</small></span>
    </span>
    <span><small>Actor</small><i class="material-icons" aria-hidden="true">star</i></span>
  </li>
</ul>`;
  var actionRowsExample = `<ul data-list>
  <li><button type="button">Bryan Cranston</button></li>
</ul>

<ul data-list>
  <li>
    <button type="button"><i class="material-icons" aria-hidden="true">person</i><span>Bryan Cranston</span></button>
  </li>
</ul>

<ul data-list>
  <li>
    <button type="button">Bryan Cranston</button>
    <button type="button" aria-label="Add Bryan Cranston to favorites"><i class="material-icons" aria-hidden="true">star</i></button>
  </li>
</ul>

<ul data-list>
  <li>
    <button type="button">Bryan Cranston</button>
    <button type="button" aria-label="Add actor Bryan Cranston to favorites"><small>Actor</small><i class="material-icons" aria-hidden="true">star</i></button>
  </li>
</ul>

<ul data-list>
  <li>
    <button type="button"><span>Bryan Cranston<small>Played Walter White in Breaking Bad.</small></span></button>
  </li>
</ul>

<ul data-list>
  <li>
    <button type="button"><i class="material-icons" aria-hidden="true">person</i><span>Bryan Cranston</span></button>
    <button type="button" aria-label="Add Bryan Cranston to favorites"><i class="material-icons" aria-hidden="true">star</i></button>
  </li>
</ul>

<ul data-list>
  <li>
    <button type="button"><i class="material-icons" aria-hidden="true">person</i><span>Bryan Cranston</span></button>
    <button type="button" aria-label="Add actor Bryan Cranston to favorites"><small>Actor</small><i class="material-icons" aria-hidden="true">star</i></button>
  </li>
</ul>

<ul data-list>
  <li>
    <button type="button">
      <i class="material-icons" aria-hidden="true">person</i>
      <span>Bryan Cranston<small>Played Walter White in Breaking Bad.</small></span>
    </button>
    <button type="button" aria-label="Add actor Bryan Cranston to favorites"><small>Actor</small><i class="material-icons" aria-hidden="true">star</i></button>
  </li>
</ul>`;
  var completeListExample = `<ul data-list>
  <li>
    <button type="button">
      <i class="material-icons bg-info" aria-hidden="true">person</i>
      <span>Bryan Cranston<small>Played Walter White in Breaking Bad.</small></span>
    </button>
    <button type="button" aria-label="Add actor Bryan Cranston to favorites"><small>Actor</small><i class="material-icons" aria-hidden="true">star</i></button>
  </li>
  <li>
    <button type="button">
      <i class="material-icons bg-primary" aria-hidden="true">person</i>
      <span>Aaron Paul<small>Played Jesse Pinkman in Breaking Bad.</small></span>
    </button>
    <button type="button" aria-label="Add actor Aaron Paul to favorites"><small>Actor</small><i class="material-icons" aria-hidden="true">star</i></button>
  </li>
  <li>
    <button type="button">
      <i class="material-icons bg-success" aria-hidden="true">person</i>
      <span>Bob Odenkirk<small>Played Saul Goodman in Breaking Bad.</small></span>
    </button>
    <button type="button" aria-label="Add actor Bob Odenkirk to favorites"><small>Actor</small><i class="material-icons" aria-hidden="true">star</i></button>
  </li>
</ul>`;
  var orderedListExample = `<ol data-list>
  <li><span>Create the project</span></li>
  <li><span>Invite the team</span></li>
  <li><span>Publish the first release</span></li>
</ol>`;
  var definitionListExample = `<dl>
  <dt>Status</dt>
  <dd>Ready for review</dd>
  <dt>Owner</dt>
  <dd>Documentation team</dd>
</dl>`;
  var listRows = [
    {
      name: "ul[data-list]",
      type: "Element and attribute",
      defaultValue: "Unordered",
      description: "Creates application rows whose order carries no meaning."
    },
    {
      name: "ol[data-list]",
      type: "Element and attribute",
      defaultValue: "Numbered",
      description: "Creates numbered application rows whose sequence carries meaning."
    },
    {
      name: "li",
      type: "Direct child",
      defaultValue: "Required per row",
      description: "Creates a row with a flexible primary region and an optional compact secondary region."
    },
    {
      name: "dl > dt + dd",
      type: "Definition elements",
      defaultValue: "Term and detail",
      description: "Uses an intrinsic term column and a flexible detail column."
    },
    {
      name: "a / button",
      type: "Interactive element",
      defaultValue: "Optional",
      description: "Use a link for navigation and type=button for an action inside a row."
    }
  ];
  var lists_page_default = () => /* @__PURE__ */ jsxs(doc_page_default, { page: "Lists", children: [
    /* @__PURE__ */ jsxs(demo_section_default, { id: "list-basic", title: "Basic combinations", children: [
      /* @__PURE__ */ jsx("h3", { children: "Simple row" }),
      /* @__PURE__ */ jsx("ul", { "data-list": true, children: /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("span", { children: "Bryan Cranston" }) }) }),
      /* @__PURE__ */ jsx("h3", { children: "Avatar" }),
      /* @__PURE__ */ jsx("ul", { "data-list": true, children: /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("span", { children: [
        /* @__PURE__ */ jsx("i", { class: "material-icons", "aria-hidden": "true", children: "person" }),
        /* @__PURE__ */ jsx("span", { children: "Bryan Cranston" })
      ] }) }) }),
      /* @__PURE__ */ jsx("h3", { children: "Secondary icon" }),
      /* @__PURE__ */ jsx("ul", { "data-list": true, children: /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx("span", { children: "Bryan Cranston" }),
        /* @__PURE__ */ jsx("span", { "aria-label": "Favorite", children: /* @__PURE__ */ jsx("i", { class: "material-icons", "aria-hidden": "true", children: "star" }) })
      ] }) }),
      /* @__PURE__ */ jsx("h3", { children: "Secondary icon and information" }),
      /* @__PURE__ */ jsx("ul", { "data-list": true, children: /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx("span", { children: "Bryan Cranston" }),
        /* @__PURE__ */ jsxs("span", { children: [
          /* @__PURE__ */ jsx("small", { children: "Actor" }),
          /* @__PURE__ */ jsx("i", { class: "material-icons", "aria-hidden": "true", children: "star" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("h3", { children: "Details" }),
      /* @__PURE__ */ jsx("ul", { "data-list": true, children: /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("span", { children: /* @__PURE__ */ jsxs("span", { children: [
        "Bryan Cranston",
        /* @__PURE__ */ jsx("small", { children: "Played Walter White in Breaking Bad." })
      ] }) }) }) }),
      /* @__PURE__ */ jsx(code_example_default, { code: basicRowsExample })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "list-combined", title: "Combined display content", children: [
      /* @__PURE__ */ jsx("h3", { children: "Avatar and secondary icon" }),
      /* @__PURE__ */ jsx("ul", { "data-list": true, children: /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsxs("span", { children: [
          /* @__PURE__ */ jsx("i", { class: "material-icons", "aria-hidden": "true", children: "person" }),
          /* @__PURE__ */ jsx("span", { children: "Bryan Cranston" })
        ] }),
        /* @__PURE__ */ jsx("span", { "aria-label": "Favorite", children: /* @__PURE__ */ jsx("i", { class: "material-icons", "aria-hidden": "true", children: "star" }) })
      ] }) }),
      /* @__PURE__ */ jsx("h3", { children: "Avatar, secondary icon and information" }),
      /* @__PURE__ */ jsx("ul", { "data-list": true, children: /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsxs("span", { children: [
          /* @__PURE__ */ jsx("i", { class: "material-icons", "aria-hidden": "true", children: "person" }),
          /* @__PURE__ */ jsx("span", { children: "Bryan Cranston" })
        ] }),
        /* @__PURE__ */ jsxs("span", { children: [
          /* @__PURE__ */ jsx("small", { children: "Actor" }),
          /* @__PURE__ */ jsx("i", { class: "material-icons", "aria-hidden": "true", children: "star" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx("h3", { children: "Details, avatar, secondary icon and information" }),
      /* @__PURE__ */ jsx("ul", { "data-list": true, children: /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsxs("span", { children: [
          /* @__PURE__ */ jsx("i", { class: "material-icons", "aria-hidden": "true", children: "person" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "Bryan Cranston",
            /* @__PURE__ */ jsx("small", { children: "Played Walter White in Breaking Bad." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("span", { children: [
          /* @__PURE__ */ jsx("small", { children: "Actor" }),
          /* @__PURE__ */ jsx("i", { class: "material-icons", "aria-hidden": "true", children: "star" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(code_example_default, { code: combinedRowsExample })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "list-actions", title: "Action combinations", children: [
      /* @__PURE__ */ jsx("h3", { children: "Primary action" }),
      /* @__PURE__ */ jsx("ul", { "data-list": true, children: /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("button", { type: "button", children: "Bryan Cranston" }) }) }),
      /* @__PURE__ */ jsx("h3", { children: "Primary action with avatar" }),
      /* @__PURE__ */ jsx("ul", { "data-list": true, children: /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("button", { type: "button", children: [
        /* @__PURE__ */ jsx("i", { class: "material-icons", "aria-hidden": "true", children: "person" }),
        /* @__PURE__ */ jsx("span", { children: "Bryan Cranston" })
      ] }) }) }),
      /* @__PURE__ */ jsx("h3", { children: "Primary and secondary actions" }),
      /* @__PURE__ */ jsx("ul", { "data-list": true, children: /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx("button", { type: "button", children: "Bryan Cranston" }),
        /* @__PURE__ */ jsx("button", { type: "button", "aria-label": "Add Bryan Cranston to favorites", children: /* @__PURE__ */ jsx("i", { class: "material-icons", "aria-hidden": "true", children: "star" }) })
      ] }) }),
      /* @__PURE__ */ jsx("h3", { children: "Secondary action with information" }),
      /* @__PURE__ */ jsx("ul", { "data-list": true, children: /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsx("button", { type: "button", children: "Bryan Cranston" }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            "aria-label": "Add actor Bryan Cranston to favorites",
            children: [
              /* @__PURE__ */ jsx("small", { children: "Actor" }),
              /* @__PURE__ */ jsx("i", { class: "material-icons", "aria-hidden": "true", children: "star" })
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx("h3", { children: "Primary action with details" }),
      /* @__PURE__ */ jsx("ul", { "data-list": true, children: /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("button", { type: "button", children: /* @__PURE__ */ jsxs("span", { children: [
        "Bryan Cranston",
        /* @__PURE__ */ jsx("small", { children: "Played Walter White in Breaking Bad." })
      ] }) }) }) }),
      /* @__PURE__ */ jsx("h3", { children: "Avatar and secondary action" }),
      /* @__PURE__ */ jsx("ul", { "data-list": true, children: /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsxs("button", { type: "button", children: [
          /* @__PURE__ */ jsx("i", { class: "material-icons", "aria-hidden": "true", children: "person" }),
          /* @__PURE__ */ jsx("span", { children: "Bryan Cranston" })
        ] }),
        /* @__PURE__ */ jsx("button", { type: "button", "aria-label": "Add Bryan Cranston to favorites", children: /* @__PURE__ */ jsx("i", { class: "material-icons", "aria-hidden": "true", children: "star" }) })
      ] }) }),
      /* @__PURE__ */ jsx("h3", { children: "Avatar, secondary action and information" }),
      /* @__PURE__ */ jsx("ul", { "data-list": true, children: /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsxs("button", { type: "button", children: [
          /* @__PURE__ */ jsx("i", { class: "material-icons", "aria-hidden": "true", children: "person" }),
          /* @__PURE__ */ jsx("span", { children: "Bryan Cranston" })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            "aria-label": "Add actor Bryan Cranston to favorites",
            children: [
              /* @__PURE__ */ jsx("small", { children: "Actor" }),
              /* @__PURE__ */ jsx("i", { class: "material-icons", "aria-hidden": "true", children: "star" })
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx("h3", { children: "Details, avatar, secondary action and information" }),
      /* @__PURE__ */ jsx("ul", { "data-list": true, children: /* @__PURE__ */ jsxs("li", { children: [
        /* @__PURE__ */ jsxs("button", { type: "button", children: [
          /* @__PURE__ */ jsx("i", { class: "material-icons", "aria-hidden": "true", children: "person" }),
          /* @__PURE__ */ jsxs("span", { children: [
            "Bryan Cranston",
            /* @__PURE__ */ jsx("small", { children: "Played Walter White in Breaking Bad." })
          ] })
        ] }),
        /* @__PURE__ */ jsxs(
          "button",
          {
            type: "button",
            "aria-label": "Add actor Bryan Cranston to favorites",
            children: [
              /* @__PURE__ */ jsx("small", { children: "Actor" }),
              /* @__PURE__ */ jsx("i", { class: "material-icons", "aria-hidden": "true", children: "star" })
            ]
          }
        )
      ] }) }),
      /* @__PURE__ */ jsx(code_example_default, { code: actionRowsExample })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "list-complete", title: "Complete list", children: [
      /* @__PURE__ */ jsxs("ul", { "data-list": true, children: [
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsxs("button", { type: "button", children: [
            /* @__PURE__ */ jsx("i", { class: "material-icons bg-info", "aria-hidden": "true", children: "person" }),
            /* @__PURE__ */ jsxs("span", { children: [
              "Bryan Cranston",
              /* @__PURE__ */ jsx("small", { children: "Played Walter White in Breaking Bad." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              "aria-label": "Add actor Bryan Cranston to favorites",
              children: [
                /* @__PURE__ */ jsx("small", { children: "Actor" }),
                /* @__PURE__ */ jsx("i", { class: "material-icons", "aria-hidden": "true", children: "star" })
              ]
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsxs("button", { type: "button", children: [
            /* @__PURE__ */ jsx("i", { class: "material-icons bg-primary", "aria-hidden": "true", children: "person" }),
            /* @__PURE__ */ jsxs("span", { children: [
              "Aaron Paul",
              /* @__PURE__ */ jsx("small", { children: "Played Jesse Pinkman in Breaking Bad." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs("button", { type: "button", "aria-label": "Add actor Aaron Paul to favorites", children: [
            /* @__PURE__ */ jsx("small", { children: "Actor" }),
            /* @__PURE__ */ jsx("i", { class: "material-icons", "aria-hidden": "true", children: "star" })
          ] })
        ] }),
        /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsxs("button", { type: "button", children: [
            /* @__PURE__ */ jsx("i", { class: "material-icons bg-success", "aria-hidden": "true", children: "person" }),
            /* @__PURE__ */ jsxs("span", { children: [
              "Bob Odenkirk",
              /* @__PURE__ */ jsx("small", { children: "Played Saul Goodman in Breaking Bad." })
            ] })
          ] }),
          /* @__PURE__ */ jsxs(
            "button",
            {
              type: "button",
              "aria-label": "Add actor Bob Odenkirk to favorites",
              children: [
                /* @__PURE__ */ jsx("small", { children: "Actor" }),
                /* @__PURE__ */ jsx("i", { class: "material-icons", "aria-hidden": "true", children: "star" })
              ]
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: completeListExample })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "list-ordered", title: "Numbered list", children: [
      /* @__PURE__ */ jsxs("ol", { "data-list": true, children: [
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("span", { children: "Create the project" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("span", { children: "Invite the team" }) }),
        /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("span", { children: "Publish the first release" }) })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: orderedListExample })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "list-definitions", title: "Definition list", children: [
      /* @__PURE__ */ jsxs("dl", { children: [
        /* @__PURE__ */ jsx("dt", { children: "Status" }),
        /* @__PURE__ */ jsx("dd", { children: "Ready for review" }),
        /* @__PURE__ */ jsx("dt", { children: "Owner" }),
        /* @__PURE__ */ jsx("dd", { children: "Documentation team" })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: definitionListExample })
    ] }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "list-api", title: "API", children: /* @__PURE__ */ jsx(api_table_default, { caption: "List elements and row regions", rows: listRows }) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "list-accessibility", title: "Accessibility", children: /* @__PURE__ */ jsxs("p", { children: [
      "Use unordered lists for collections and ordered lists for sequences. Use links for navigation and buttons for actions. Give icon-only secondary actions a specific accessible name and hide decorative icons with",
      /* @__PURE__ */ jsx("code", { children: ' aria-hidden="true"' }),
      "."
    ] }) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "list-errors", title: "Composition and common errors", children: /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsxs("li", { children: [
        "Add ",
        /* @__PURE__ */ jsx("code", { children: "data-list" }),
        " to application lists that need row styling."
      ] }),
      /* @__PURE__ */ jsxs("li", { children: [
        "Keep each styled row as a direct ",
        /* @__PURE__ */ jsx("code", { children: "li" }),
        " child of its list."
      ] }),
      /* @__PURE__ */ jsxs("li", { children: [
        "Reserve ",
        /* @__PURE__ */ jsx("code", { children: "dl" }),
        " for direct ",
        /* @__PURE__ */ jsx("code", { children: "dt" }),
        " and ",
        /* @__PURE__ */ jsx("code", { children: "dd" }),
        "pairs."
      ] })
    ] }) })
  ] });

  // site/src/pages/forms_page.tsx
  var defaultFieldsCode = `<form data-card>
  <section>
  <fieldset>
    <label for="profile-name">Name</label>
    <input id="profile-name" name="name" type="text" aria-describedby="profile-name-help">
    <small id="profile-name-help">Use a readable public name.</small>
  </fieldset>
  <fieldset>
    <label for="profile-email">Email</label>
    <input id="profile-email" name="email" type="email" required aria-describedby="profile-email-help">
    <small id="profile-email-help">Enter the address used for account messages.</small>
  </fieldset>
  <fieldset>
    <label for="account-id">Account ID</label>
    <input id="account-id" name="account-id" type="text" value="AC-1042" disabled aria-describedby="account-id-help">
    <small id="account-id-help">Account IDs cannot be changed.</small>
  </fieldset>
  <fieldset>
    <label for="profile-handle">Handle</label>
    <input id="profile-handle" name="handle" type="text" value="Ada Lovelace" aria-invalid="true" aria-describedby="profile-handle-error">
    <small id="profile-handle-error">Use letters, numbers or hyphens without spaces.</small>
  </fieldset>
  <fieldset>
    <label for="profile-message">Message</label>
    <textarea id="profile-message" name="message" aria-describedby="profile-message-help"></textarea>
    <small id="profile-message-help">Write a short message.</small>
  </fieldset>
  <fieldset>
    <label for="profile-role">Role</label>
    <select id="profile-role" name="role" aria-describedby="profile-role-help">
      <option value="">Select a role</option>
      <option value="admin">Admin</option>
      <option value="editor">Editor</option>
      <option value="viewer">Viewer</option>
    </select>
    <small id="profile-role-help">Choose the access level for this person.</small>
  </fieldset>
  </section>
</form>`;
  var floatingFieldsCode = `<form data-card>
  <section>
  <div data-floating>
    <input id="floating-name" name="name" type="text" placeholder="Full name" aria-describedby="floating-name-help">
    <label for="floating-name">Full name</label>
    <small id="floating-name-help">Enter the name shown to teammates.</small>
  </div>
  <div data-floating data-field="warning">
    <input id="floating-slug" name="slug" type="text" value="draft-name" placeholder="Project slug" aria-describedby="floating-slug-help">
    <label for="floating-slug">Project slug</label>
    <small id="floating-slug-help">Changing this value updates shared links.</small>
  </div>
  <div data-floating data-field="success">
    <input id="floating-domain" name="domain" type="text" value="example.com" placeholder="Domain" aria-describedby="floating-domain-help">
    <label for="floating-domain">Domain</label>
    <small id="floating-domain-help">This domain is available.</small>
  </div>
  <div data-floating>
    <input id="floating-code" name="code" type="text" value="bad code" placeholder="Invite code" aria-describedby="floating-code-error" aria-invalid="true">
    <label for="floating-code">Invite code</label>
    <small id="floating-code-error">Remove the space from the invite code.</small>
  </div>
  <div data-floating>
    <textarea id="floating-notes" name="notes" placeholder="Notes" aria-describedby="floating-notes-help"></textarea>
    <label for="floating-notes">Notes</label>
    <small id="floating-notes-help">Add context for reviewers.</small>
  </div>
  <div data-floating>
    <select id="floating-team" name="team" aria-describedby="floating-team-help">
      <option value="">Select a team</option>
      <option value="design">Design</option>
      <option value="engineering">Engineering</option>
    </select>
    <label for="floating-team">Team</label>
    <small id="floating-team-help">Choose the team that owns this work.</small>
  </div>
  </section>
</form>`;
  var selectionControlsCode = `<form data-card>
  <section>
  <fieldset>
    <legend>Review frequency</legend>
    <input id="review-weekly" name="review-frequency" type="radio" value="weekly">
    <label for="review-weekly">Weekly</label>
    <input id="review-monthly" name="review-frequency" type="radio" value="monthly">
    <label for="review-monthly">Monthly</label>
  </fieldset>
  <fieldset>
    <legend>Updates</legend>
    <input id="email-updates" name="email-updates" type="checkbox" value="enabled">
    <label for="email-updates">Send email updates</label>
  </fieldset>
  <fieldset>
    <legend>Availability</legend>
    <input id="public-profile" name="public-profile" type="checkbox" value="public" data-toggle>
    <label for="public-profile">Public profile</label>
  </fieldset>
  </section>
</form>`;
  var slidersCode = `<form data-card>
  <section>
  <fieldset>
    <label for="volume">Volume</label>
    <input id="volume" name="volume" type="range" min="0" max="100" value="60" aria-describedby="volume-help">
    <small id="volume-help">Choose a value from 0 to 100.</small>
  </fieldset>
  <fieldset>
    <label for="locked-volume">Managed volume</label>
    <input id="locked-volume" name="locked-volume" type="range" min="0" max="100" value="20" disabled aria-describedby="locked-volume-help">
    <small id="locked-volume-help">Your administrator manages this value.</small>
  </fieldset>
  </section>
</form>`;
  var nativePickersCode = `<form data-card>
  <section>
  <fieldset>
    <label for="start-date">Date</label>
    <input id="start-date" name="start-date" type="date">
  </fieldset>
  <fieldset>
    <label for="start-time">Time</label>
    <input id="start-time" name="start-time" type="time">
  </fieldset>
  <fieldset>
    <label for="billing-month">Month</label>
    <input id="billing-month" name="billing-month" type="month">
  </fieldset>
  <fieldset>
    <label for="reporting-week">Week</label>
    <input id="reporting-week" name="reporting-week" type="week">
  </fieldset>
  <fieldset>
    <label for="brand-color">Brand color</label>
    <input id="brand-color" name="brand-color" type="color" value="#3366ff">
  </fieldset>
  <fieldset>
    <label for="shirt-size">Size</label>
    <select id="shirt-size" name="shirt-size">
      <option value="small">Small</option>
      <option value="medium">Medium</option>
      <option value="large">Large</option>
    </select>
  </fieldset>
  </section>
</form>`;
  var coloredSurfaceCode = `<form data-card class="bg-primary">
  <section>
    <fieldset>
      <label for="invite-name">Name</label>
      <input id="invite-name" name="name" type="text" aria-describedby="invite-name-help">
      <small id="invite-name-help">Enter the name shown on the invitation.</small>
    </fieldset>
    <div data-floating>
      <input id="invite-email" name="email" type="email" placeholder="Email" aria-describedby="invite-email-help">
      <label for="invite-email">Email</label>
      <small id="invite-email-help">We will send the invitation to this address.</small>
    </div>
  </section>
  <footer>
    <nav aria-label="Invitation actions">
      <button type="reset" class="text-white">Reset</button>
      <button type="submit" class="bg-white text-primary">Send invitation</button>
    </nav>
  </footer>
</form>`;
  var searchCode = `<search aria-label="Documentation">
  <form action="/dragonglass/forms.html">
    <fieldset>
      <label for="docs-search">Search docs</label>
      <input id="docs-search" type="search" name="q">
    </fieldset>
    <button type="submit">Search</button>
  </form>
</search>`;
  var searchFormCode = `<form action="/dragonglass/forms.html" role="search" aria-label="Components">
  <fieldset>
    <label for="component-search">Find a component</label>
    <input id="component-search" type="search" name="component" value="forms">
  </fieldset>
  <button type="submit">Find</button>
</form>`;
  var toolbarSearchCode = `<nav data-toolbar aria-label="Documentation tools">
  <search aria-label="Component filters">
    <form action="/dragonglass/forms.html">
      <fieldset>
        <label for="filter-search">Filter components</label>
        <input id="filter-search" type="search" name="filter">
      </fieldset>
      <button type="submit">Filter</button>
    </form>
  </search>
</nav>`;
  var apiRows4 = [
    {
      name: "input, select, textarea",
      type: "Element",
      defaultValue: "Full width",
      description: "Provides the native control behavior and Dragonglass field styling."
    },
    {
      name: "label[for]",
      type: "Element",
      defaultValue: "Required by guidance",
      description: "Gives a control its visible, programmatic name through a matching id."
    },
    {
      name: "fieldset and legend",
      type: "Element",
      defaultValue: "No border",
      description: "Groups related controls and names radio or checkbox groups."
    },
    {
      name: "data-floating",
      type: "Attribute",
      defaultValue: "Absent",
      description: "Turns a neutral wrapper with a control, label and small into a floating field."
    },
    {
      name: 'data-field="primary|accent|info|success|warning|danger|default"',
      type: "Attribute token",
      defaultValue: "Neutral",
      description: "Applies a documented semantic color to a field container and its control."
    },
    {
      name: "data-toggle",
      type: "Attribute",
      defaultValue: "Absent",
      description: "Displays a checkbox as a switch while preserving native checkbox semantics."
    },
    {
      name: 'aria-invalid="true"',
      type: "State",
      defaultValue: "Absent",
      description: "Marks the control, not its wrapper, as invalid and applies the danger state."
    },
    {
      name: "aria-describedby",
      type: "Attribute",
      defaultValue: "Absent",
      description: "Connects a control to persistent help or its current error message."
    },
    {
      name: "--control-accent",
      type: "Token",
      defaultValue: "Theme value",
      description: "Controls focus, checked and range accents."
    },
    {
      name: "search / form[role=search]",
      type: "Element / attribute",
      defaultValue: "Contextual",
      description: "Creates a search landmark and aligns a fieldset with its submit action."
    },
    {
      name: "input[type=search]",
      type: "Element / attribute",
      defaultValue: "Empty",
      description: "Provides native search input and clear-button behavior."
    }
  ];
  var forms_page_default = () => /* @__PURE__ */ jsxs(doc_page_default, { page: "Forms", children: [
    /* @__PURE__ */ jsxs(demo_section_default, { id: "default-fields", title: "Default HTML fields", children: [
      /* @__PURE__ */ jsx("form", { "data-card": true, children: /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsxs("fieldset", { children: [
          /* @__PURE__ */ jsx("label", { for: "profile-name", children: "Name" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "profile-name",
              name: "name",
              type: "text",
              "aria-describedby": "profile-name-help"
            }
          ),
          /* @__PURE__ */ jsx("small", { id: "profile-name-help", children: "Use a readable public name." })
        ] }),
        /* @__PURE__ */ jsxs("fieldset", { children: [
          /* @__PURE__ */ jsx("label", { for: "profile-email", children: "Email" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "profile-email",
              name: "email",
              type: "email",
              required: true,
              "aria-describedby": "profile-email-help"
            }
          ),
          /* @__PURE__ */ jsx("small", { id: "profile-email-help", children: "Enter the address used for account messages." })
        ] }),
        /* @__PURE__ */ jsxs("fieldset", { children: [
          /* @__PURE__ */ jsx("label", { for: "account-id", children: "Account ID" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "account-id",
              name: "account-id",
              type: "text",
              value: "AC-1042",
              disabled: true,
              "aria-describedby": "account-id-help"
            }
          ),
          /* @__PURE__ */ jsx("small", { id: "account-id-help", children: "Account IDs cannot be changed." })
        ] }),
        /* @__PURE__ */ jsxs("fieldset", { children: [
          /* @__PURE__ */ jsx("label", { for: "profile-handle", children: "Handle" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "profile-handle",
              name: "handle",
              type: "text",
              value: "Ada Lovelace",
              "aria-invalid": "true",
              "aria-describedby": "profile-handle-error"
            }
          ),
          /* @__PURE__ */ jsx("small", { id: "profile-handle-error", children: "Use letters, numbers or hyphens without spaces." })
        ] }),
        /* @__PURE__ */ jsxs("fieldset", { children: [
          /* @__PURE__ */ jsx("label", { for: "profile-message", children: "Message" }),
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: "profile-message",
              name: "message",
              "aria-describedby": "profile-message-help"
            }
          ),
          /* @__PURE__ */ jsx("small", { id: "profile-message-help", children: "Write a short message." })
        ] }),
        /* @__PURE__ */ jsxs("fieldset", { children: [
          /* @__PURE__ */ jsx("label", { for: "profile-role", children: "Role" }),
          /* @__PURE__ */ jsxs(
            "select",
            {
              id: "profile-role",
              name: "role",
              "aria-describedby": "profile-role-help",
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Select a role" }),
                /* @__PURE__ */ jsx("option", { value: "admin", children: "Admin" }),
                /* @__PURE__ */ jsx("option", { value: "editor", children: "Editor" }),
                /* @__PURE__ */ jsx("option", { value: "viewer", children: "Viewer" })
              ]
            }
          ),
          /* @__PURE__ */ jsx("small", { id: "profile-role-help", children: "Choose the access level for this person." })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(code_example_default, { code: defaultFieldsCode })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "floating-labels", title: "Floating labels", children: [
      /* @__PURE__ */ jsx("form", { "data-card": true, children: /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsxs("div", { "data-floating": true, children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "floating-name",
              name: "name",
              type: "text",
              placeholder: "Full name",
              "aria-describedby": "floating-name-help"
            }
          ),
          /* @__PURE__ */ jsx("label", { for: "floating-name", children: "Full name" }),
          /* @__PURE__ */ jsx("small", { id: "floating-name-help", children: "Enter the name shown to teammates." })
        ] }),
        /* @__PURE__ */ jsxs("div", { "data-floating": true, "data-field": "warning", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "floating-slug",
              name: "slug",
              type: "text",
              value: "draft-name",
              placeholder: "Project slug",
              "aria-describedby": "floating-slug-help"
            }
          ),
          /* @__PURE__ */ jsx("label", { for: "floating-slug", children: "Project slug" }),
          /* @__PURE__ */ jsx("small", { id: "floating-slug-help", children: "Changing this value updates shared links." })
        ] }),
        /* @__PURE__ */ jsxs("div", { "data-floating": true, "data-field": "success", children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "floating-domain",
              name: "domain",
              type: "text",
              value: "example.com",
              placeholder: "Domain",
              "aria-describedby": "floating-domain-help"
            }
          ),
          /* @__PURE__ */ jsx("label", { for: "floating-domain", children: "Domain" }),
          /* @__PURE__ */ jsx("small", { id: "floating-domain-help", children: "This domain is available." })
        ] }),
        /* @__PURE__ */ jsxs("div", { "data-floating": true, children: [
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "floating-code",
              name: "code",
              type: "text",
              value: "bad code",
              placeholder: "Invite code",
              "aria-describedby": "floating-code-error",
              "aria-invalid": "true"
            }
          ),
          /* @__PURE__ */ jsx("label", { for: "floating-code", children: "Invite code" }),
          /* @__PURE__ */ jsx("small", { id: "floating-code-error", children: "Remove the space from the invite code." })
        ] }),
        /* @__PURE__ */ jsxs("div", { "data-floating": true, children: [
          /* @__PURE__ */ jsx(
            "textarea",
            {
              id: "floating-notes",
              name: "notes",
              placeholder: "Notes",
              "aria-describedby": "floating-notes-help"
            }
          ),
          /* @__PURE__ */ jsx("label", { for: "floating-notes", children: "Notes" }),
          /* @__PURE__ */ jsx("small", { id: "floating-notes-help", children: "Add context for reviewers." })
        ] }),
        /* @__PURE__ */ jsxs("div", { "data-floating": true, children: [
          /* @__PURE__ */ jsxs(
            "select",
            {
              id: "floating-team",
              name: "team",
              "aria-describedby": "floating-team-help",
              children: [
                /* @__PURE__ */ jsx("option", { value: "", children: "Select a team" }),
                /* @__PURE__ */ jsx("option", { value: "design", children: "Design" }),
                /* @__PURE__ */ jsx("option", { value: "engineering", children: "Engineering" })
              ]
            }
          ),
          /* @__PURE__ */ jsx("label", { for: "floating-team", children: "Team" }),
          /* @__PURE__ */ jsx("small", { id: "floating-team-help", children: "Choose the team that owns this work." })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(code_example_default, { code: floatingFieldsCode })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "selection-controls", title: "Selection controls", children: [
      /* @__PURE__ */ jsx("form", { "data-card": true, children: /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsxs("fieldset", { children: [
          /* @__PURE__ */ jsx("legend", { children: "Review frequency" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "review-weekly",
              name: "review-frequency",
              type: "radio",
              value: "weekly"
            }
          ),
          /* @__PURE__ */ jsx("label", { for: "review-weekly", children: "Weekly" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "review-monthly",
              name: "review-frequency",
              type: "radio",
              value: "monthly"
            }
          ),
          /* @__PURE__ */ jsx("label", { for: "review-monthly", children: "Monthly" })
        ] }),
        /* @__PURE__ */ jsxs("fieldset", { children: [
          /* @__PURE__ */ jsx("legend", { children: "Updates" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "email-updates",
              name: "email-updates",
              type: "checkbox",
              value: "enabled"
            }
          ),
          /* @__PURE__ */ jsx("label", { for: "email-updates", children: "Send email updates" })
        ] }),
        /* @__PURE__ */ jsxs("fieldset", { children: [
          /* @__PURE__ */ jsx("legend", { children: "Availability" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "public-profile",
              name: "public-profile",
              type: "checkbox",
              value: "public",
              "data-toggle": true
            }
          ),
          /* @__PURE__ */ jsx("label", { for: "public-profile", children: "Public profile" })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(code_example_default, { code: selectionControlsCode })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "sliders", title: "Sliders", children: [
      /* @__PURE__ */ jsx("form", { "data-card": true, children: /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsxs("fieldset", { children: [
          /* @__PURE__ */ jsx("label", { for: "volume", children: "Volume" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "volume",
              name: "volume",
              type: "range",
              min: "0",
              max: "100",
              value: "60",
              "aria-describedby": "volume-help"
            }
          ),
          /* @__PURE__ */ jsx("small", { id: "volume-help", children: "Choose a value from 0 to 100." })
        ] }),
        /* @__PURE__ */ jsxs("fieldset", { children: [
          /* @__PURE__ */ jsx("label", { for: "locked-volume", children: "Managed volume" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "locked-volume",
              name: "locked-volume",
              type: "range",
              min: "0",
              max: "100",
              value: "20",
              disabled: true,
              "aria-describedby": "locked-volume-help"
            }
          ),
          /* @__PURE__ */ jsx("small", { id: "locked-volume-help", children: "Your administrator manages this value." })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(code_example_default, { code: slidersCode })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "native-pickers", title: "Native pickers", children: [
      /* @__PURE__ */ jsx("form", { "data-card": true, children: /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsxs("fieldset", { children: [
          /* @__PURE__ */ jsx("label", { for: "start-date", children: "Date" }),
          /* @__PURE__ */ jsx("input", { id: "start-date", name: "start-date", type: "date" })
        ] }),
        /* @__PURE__ */ jsxs("fieldset", { children: [
          /* @__PURE__ */ jsx("label", { for: "start-time", children: "Time" }),
          /* @__PURE__ */ jsx("input", { id: "start-time", name: "start-time", type: "time" })
        ] }),
        /* @__PURE__ */ jsxs("fieldset", { children: [
          /* @__PURE__ */ jsx("label", { for: "billing-month", children: "Month" }),
          /* @__PURE__ */ jsx("input", { id: "billing-month", name: "billing-month", type: "month" })
        ] }),
        /* @__PURE__ */ jsxs("fieldset", { children: [
          /* @__PURE__ */ jsx("label", { for: "reporting-week", children: "Week" }),
          /* @__PURE__ */ jsx("input", { id: "reporting-week", name: "reporting-week", type: "week" })
        ] }),
        /* @__PURE__ */ jsxs("fieldset", { children: [
          /* @__PURE__ */ jsx("label", { for: "brand-color", children: "Brand color" }),
          /* @__PURE__ */ jsx(
            "input",
            {
              id: "brand-color",
              name: "brand-color",
              type: "color",
              value: "#3366ff"
            }
          )
        ] }),
        /* @__PURE__ */ jsxs("fieldset", { children: [
          /* @__PURE__ */ jsx("label", { for: "shirt-size", children: "Size" }),
          /* @__PURE__ */ jsxs("select", { id: "shirt-size", name: "shirt-size", children: [
            /* @__PURE__ */ jsx("option", { value: "small", children: "Small" }),
            /* @__PURE__ */ jsx("option", { value: "medium", children: "Medium" }),
            /* @__PURE__ */ jsx("option", { value: "large", children: "Large" })
          ] })
        ] })
      ] }) }),
      /* @__PURE__ */ jsx(code_example_default, { code: nativePickersCode })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "colored-surfaces", title: "Forms on colored surfaces", children: [
      /* @__PURE__ */ jsxs("form", { "data-card": true, class: "bg-primary", children: [
        /* @__PURE__ */ jsxs("section", { children: [
          /* @__PURE__ */ jsxs("fieldset", { children: [
            /* @__PURE__ */ jsx("label", { for: "invite-name", children: "Name" }),
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "invite-name",
                name: "name",
                type: "text",
                "aria-describedby": "invite-name-help"
              }
            ),
            /* @__PURE__ */ jsx("small", { id: "invite-name-help", children: "Enter the name shown on the invitation." })
          ] }),
          /* @__PURE__ */ jsxs("div", { "data-floating": true, children: [
            /* @__PURE__ */ jsx(
              "input",
              {
                id: "invite-email",
                name: "email",
                type: "email",
                placeholder: "Email",
                "aria-describedby": "invite-email-help"
              }
            ),
            /* @__PURE__ */ jsx("label", { for: "invite-email", children: "Email" }),
            /* @__PURE__ */ jsx("small", { id: "invite-email-help", children: "We will send the invitation to this address." })
          ] })
        ] }),
        /* @__PURE__ */ jsx("footer", { children: /* @__PURE__ */ jsxs("nav", { "aria-label": "Invitation actions", children: [
          /* @__PURE__ */ jsx("button", { type: "reset", class: "text-white", children: "Reset" }),
          /* @__PURE__ */ jsx("button", { type: "submit", class: "bg-white text-primary", children: "Send invitation" })
        ] }) })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: coloredSurfaceCode })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "search-forms", title: "Search forms", children: [
      /* @__PURE__ */ jsx("h3", { children: "Search landmark" }),
      /* @__PURE__ */ jsx("search", { "aria-label": "Documentation", children: /* @__PURE__ */ jsxs("form", { action: "/dragonglass/forms.html", children: [
        /* @__PURE__ */ jsxs("fieldset", { children: [
          /* @__PURE__ */ jsx("label", { for: "docs-search", children: "Search docs" }),
          /* @__PURE__ */ jsx("input", { id: "docs-search", type: "search", name: "q" })
        ] }),
        /* @__PURE__ */ jsx("button", { type: "submit", children: "Search" })
      ] }) }),
      /* @__PURE__ */ jsx(code_example_default, { code: searchCode }),
      /* @__PURE__ */ jsx("h3", { children: "Search role on a form" }),
      /* @__PURE__ */ jsxs(
        "form",
        {
          action: "/dragonglass/forms.html",
          role: "search",
          "aria-label": "Components",
          children: [
            /* @__PURE__ */ jsxs("fieldset", { children: [
              /* @__PURE__ */ jsx("label", { for: "component-search", children: "Find a component" }),
              /* @__PURE__ */ jsx(
                "input",
                {
                  id: "component-search",
                  type: "search",
                  name: "component",
                  value: "forms"
                }
              )
            ] }),
            /* @__PURE__ */ jsx("button", { type: "submit", children: "Find" })
          ]
        }
      ),
      /* @__PURE__ */ jsx(code_example_default, { code: searchFormCode }),
      /* @__PURE__ */ jsx("h3", { children: "Search inside a toolbar" }),
      /* @__PURE__ */ jsx("nav", { "data-toolbar": true, "aria-label": "Documentation tools", children: /* @__PURE__ */ jsx("search", { "aria-label": "Component filters", children: /* @__PURE__ */ jsxs("form", { action: "/dragonglass/forms.html", children: [
        /* @__PURE__ */ jsxs("fieldset", { children: [
          /* @__PURE__ */ jsx("label", { for: "filter-search", children: "Filter components" }),
          /* @__PURE__ */ jsx("input", { id: "filter-search", type: "search", name: "filter" })
        ] }),
        /* @__PURE__ */ jsx("button", { type: "submit", children: "Filter" })
      ] }) }) }),
      /* @__PURE__ */ jsx(code_example_default, { code: toolbarSearchCode })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "forms-composition", title: "Composition", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "Wrap ordinary fields as needed and use ",
        /* @__PURE__ */ jsx("code", { children: "fieldset" }),
        " with",
        /* @__PURE__ */ jsx("code", { children: "legend" }),
        " for related control groups. Floating fields use a neutral ",
        /* @__PURE__ */ jsx("code", { children: "data-floating" }),
        " container and keep the control before its ",
        /* @__PURE__ */ jsx("code", { children: "label" }),
        " because that sibling order drives the visual label state."
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Radio buttons share a ",
        /* @__PURE__ */ jsx("code", { children: "name" }),
        " and a group legend. Checkboxes and toggles keep their native input so forms, keyboards and assistive technology receive the expected behavior."
      ] })
    ] }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "forms-responsive", title: "Responsive behavior", children: /* @__PURE__ */ jsx("p", { children: "Text controls fill the available width, textareas resize vertically and range inputs preserve their full track. Let the surrounding form or card control column width. Native date, time and select interfaces may vary by browser and operating system." }) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "forms-accessibility", title: "Accessibility", children: /* @__PURE__ */ jsxs("p", { children: [
      "Every control needs a stable ",
      /* @__PURE__ */ jsx("code", { children: "name" }),
      " for submission and an accessible name from a ",
      /* @__PURE__ */ jsx("code", { children: "label" }),
      " whose ",
      /* @__PURE__ */ jsx("code", { children: "for" }),
      " matches the control ID. Connect help and error text with",
      /* @__PURE__ */ jsx("code", { children: "aria-describedby" }),
      ". Put ",
      /* @__PURE__ */ jsx("code", { children: ' aria-invalid="true"' }),
      " on the invalid control after validation, and move focus to the first invalid field when submission fails."
    ] }) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "forms-errors", title: "Common mistakes", children: /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsx("li", { children: "Placeholders do not replace persistent labels." }),
      /* @__PURE__ */ jsxs("li", { children: [
        "Putting ",
        /* @__PURE__ */ jsx("code", { children: "aria-invalid" }),
        " on a fieldset does not expose the invalid state on its control."
      ] }),
      /* @__PURE__ */ jsxs("li", { children: [
        "Error text without ",
        /* @__PURE__ */ jsx("code", { children: "aria-describedby" }),
        " can be visually close while remaining disconnected to a screen reader."
      ] }),
      /* @__PURE__ */ jsx("li", { children: "Giving radio buttons different names prevents them from behaving as one exclusive group." })
    ] }) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "forms-api", title: "API", children: /* @__PURE__ */ jsx(
      api_table_default,
      {
        caption: "Form elements, attributes, states and tokens",
        rows: apiRows4
      }
    ) })
  ] });

  // site/src/pages/tooltips_page.tsx
  var colors3 = [
    "primary",
    "accent",
    "info",
    "success",
    "warning",
    "danger",
    "default"
  ];
  var directions = ["bottom", "left", "right"];
  var spanExample = `<span data-tooltip="This is a tooltip" class="inline">This span has a tooltip</span>`;
  var necessaryInformationExample = `<p id="publish-help">Publishing makes the current changes visible to everyone.</p>
<button type="button" aria-describedby="publish-help" data-tooltip="Makes changes visible">Publish changes</button>`;
  var tooltipRows = [
    {
      name: "data-tooltip",
      type: "HTML data attribute",
      defaultValue: "Required",
      description: "Supplies the visual text rendered by the ::after pseudo-element."
    },
    {
      name: "data-tooltip-position",
      type: "HTML data attribute",
      defaultValue: "Top",
      description: "Accepts top, bottom, left or right. Omit it for the top position."
    },
    {
      name: "after:bg-{color}",
      type: "Pseudo-element color utility",
      defaultValue: "bg-white",
      description: "Sets the tooltip background to primary, accent, info, success, warning, danger or default."
    }
  ];
  var tooltips_page_default = () => /* @__PURE__ */ jsxs(doc_page_default, { page: "Tooltips", children: [
    /* @__PURE__ */ jsxs(demo_section_default, { id: "default-tooltip", title: "Default tooltip", children: [
      /* @__PURE__ */ jsx("span", { "data-tooltip": "This is a tooltip", class: "inline", children: "This span has a tooltip" }),
      /* @__PURE__ */ jsx(code_example_default, { code: spanExample })
    ] }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "tooltip-colors", title: "Tooltip colors", children: colors3.map((color) => {
      const code = `<span data-tooltip="This is a ${color} tooltip" class="inline after:bg-${color}">${color} tooltip</span>`;
      return /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs(
          "span",
          {
            "data-tooltip": `This is a ${color} tooltip`,
            class: `inline after:bg-${color}`,
            children: [
              color,
              " tooltip"
            ]
          }
        ),
        /* @__PURE__ */ jsx(code_example_default, { code })
      ] });
    }) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "tooltip-directions", title: "Tooltip directions", children: directions.map((direction) => {
      const code = `<span data-tooltip="This tooltip opens ${direction}" data-tooltip-position="${direction}" class="inline ml-16">${direction} tooltip</span>`;
      return /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsxs(
          "span",
          {
            "data-tooltip": `This tooltip opens ${direction}`,
            "data-tooltip-position": direction,
            class: "inline ml-16",
            children: [
              direction,
              " tooltip"
            ]
          }
        ),
        /* @__PURE__ */ jsx(code_example_default, { code })
      ] });
    }) }),
    /* @__PURE__ */ jsxs(
      demo_section_default,
      {
        id: "necessary-tooltip-information",
        title: "Necessary information",
        children: [
          /* @__PURE__ */ jsx("p", { id: "publish-help", children: "Publishing makes the current changes visible to everyone." }),
          /* @__PURE__ */ jsx(
            "button",
            {
              type: "button",
              "aria-describedby": "publish-help",
              "data-tooltip": "Makes changes visible",
              children: "Publish changes"
            }
          ),
          /* @__PURE__ */ jsx(code_example_default, { code: necessaryInformationExample })
        ]
      }
    ),
    /* @__PURE__ */ jsx(demo_section_default, { id: "tooltip-api", title: "Tooltip API", children: /* @__PURE__ */ jsx(
      api_table_default,
      {
        caption: "Tooltip attributes and color utilities",
        rows: tooltipRows
      }
    ) }),
    /* @__PURE__ */ jsx(
      demo_section_default,
      {
        id: "tooltip-accessibility",
        title: "Accessibility and common errors",
        children: /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsx("li", { children: "Focusable tooltip triggers reveal generated content on hover and keyboard focus. The pseudo-element still does not provide a dependable accessible description." }),
          /* @__PURE__ */ jsxs("li", { children: [
            "Put necessary information in real markup and associate it with a focusable control using ",
            /* @__PURE__ */ jsx("code", { children: "aria-describedby" }),
            ", as shown above."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            "A plain ",
            /* @__PURE__ */ jsx("code", { children: "span" }),
            " is suitable only for optional visual detail. Adding ",
            /* @__PURE__ */ jsx("code", { children: "data-tooltip" }),
            " does not make it focusable."
          ] }),
          /* @__PURE__ */ jsx("li", { children: "The current CSS uses top by default and supports explicit bottom, left and right positions. It does not provide collision detection or touch-specific behavior." })
        ] })
      }
    )
  ] });

  // site/src/pages/menus_page.tsx
  var menuExample = `<details data-trigger open>
  <summary>Account menu</summary>
  <menu>
    <li><a href="/dragonglass/forms.html">Profile settings</a></li>
    <li><button type="button">Sign out</button></li>
  </menu>
</details>`;
  var positionedMenusExample = `<details data-trigger>
  <summary>Top menu</summary>
  <menu data-menu="top">
    <li>
      <a href="/dragonglass/forms.html">Profile settings</a>
      <button type="button" aria-label="Add profile to favorites">
        <i class="material-icons" aria-hidden="true">star</i>
      </button>
    </li>
  </menu>
</details>
<details data-trigger>
  <summary>Right menu</summary>
  <menu data-menu="right">
    <li>
      <a href="/dragonglass/forms.html">Profile settings</a>
      <button type="button" aria-label="Add profile to favorites">
        <i class="material-icons" aria-hidden="true">star</i>
      </button>
    </li>
  </menu>
</details>
<details data-trigger>
  <summary>Top-right menu</summary>
  <menu data-menu="top right">
    <li>
      <a href="/dragonglass/forms.html">Profile settings</a>
      <button type="button" aria-label="Add profile to favorites">
        <i class="material-icons" aria-hidden="true">star</i>
      </button>
    </li>
  </menu>
</details>`;
  var MenuItem = () => /* @__PURE__ */ jsxs("li", { children: [
    /* @__PURE__ */ jsx("a", { href: "/dragonglass/forms.html", children: "Profile settings" }),
    /* @__PURE__ */ jsx("button", { type: "button", "aria-label": "Add profile to favorites", children: /* @__PURE__ */ jsx("i", { class: "material-icons", "aria-hidden": "true", children: "star" }) })
  ] });
  var menus_page_default = () => /* @__PURE__ */ jsxs(doc_page_default, { page: "Menus", children: [
    /* @__PURE__ */ jsxs(demo_section_default, { id: "menus-basic-title", title: "Action menu", children: [
      /* @__PURE__ */ jsxs("details", { "data-trigger": true, open: true, children: [
        /* @__PURE__ */ jsx("summary", { children: "Account menu" }),
        /* @__PURE__ */ jsxs("menu", { children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/dragonglass/forms.html", children: "Profile settings" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("button", { type: "button", children: "Sign out" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: menuExample })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "menus-position-title", title: "Menu positions", children: [
      /* @__PURE__ */ jsx("p", { children: "Use top or right when the default bottom-left placement lacks space. Use both tokens when the menu must open above the trigger and align to its right edge." }),
      /* @__PURE__ */ jsxs("details", { "data-trigger": true, children: [
        /* @__PURE__ */ jsx("summary", { children: "Top menu" }),
        /* @__PURE__ */ jsx("menu", { "data-menu": "top", children: /* @__PURE__ */ jsx(MenuItem, {}) })
      ] }),
      /* @__PURE__ */ jsxs("details", { "data-trigger": true, children: [
        /* @__PURE__ */ jsx("summary", { children: "Right menu" }),
        /* @__PURE__ */ jsx("menu", { "data-menu": "right", children: /* @__PURE__ */ jsx(MenuItem, {}) })
      ] }),
      /* @__PURE__ */ jsxs("details", { "data-trigger": true, children: [
        /* @__PURE__ */ jsx("summary", { children: "Top-right menu" }),
        /* @__PURE__ */ jsx("menu", { "data-menu": "top right", children: /* @__PURE__ */ jsx(MenuItem, {}) })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: positionedMenusExample })
    ] }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "menus-api-title", title: "API", children: /* @__PURE__ */ jsx(
      api_table_default,
      {
        caption: "Menu elements, attributes, tokens and states",
        rows: [
          {
            name: "details / summary / menu / li",
            type: "Element",
            defaultValue: "Required",
            description: "Provide the trigger, positioned surface and native menu rows."
          },
          {
            name: "data-trigger",
            type: "Attribute",
            defaultValue: "Required",
            description: "Provides the positioned disclosure context."
          },
          {
            name: "data-menu",
            type: "Attribute",
            defaultValue: "Bottom left",
            description: "Accepts top, right or the combined top right tokens."
          },
          {
            name: "open",
            type: "Attribute / state",
            defaultValue: "Absent",
            description: "Shows the menu through the parent details state."
          },
          {
            name: "--card-radius / --default-light / --white",
            type: "Token",
            defaultValue: "Theme",
            description: "Control menu corners, border and background."
          }
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "menus-accessibility-title", title: "Accessibility", children: /* @__PURE__ */ jsxs("p", { children: [
      "Use links for navigation and buttons for commands. Give every icon-only button an accessible name and mark its decorative icon",
      /* @__PURE__ */ jsx("code", { children: ' aria-hidden="true"' }),
      ". The summary remains the keyboard control for opening and closing the menu."
    ] }) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "menus-errors-title", title: "Composition and common errors", children: /* @__PURE__ */ jsxs("p", { children: [
      "Keep the menu inside ",
      /* @__PURE__ */ jsx("code", { children: "details[data-trigger]" }),
      ". Position it with space-separated ",
      /* @__PURE__ */ jsx("code", { children: "data-menu" }),
      " tokens. Keep visible items as direct ",
      /* @__PURE__ */ jsx("code", { children: "li" }),
      " children, and do not use an icon as the only unlabeled description of an action."
    ] }) })
  ] });

  // site/src/pages/tables_page.tsx
  var colors4 = [
    "primary",
    "accent",
    "success",
    "info",
    "warning",
    "danger",
    "default"
  ];
  var tableCode = (color) => `<table data-table${color ? `="${color}"` : ""}>
  <caption>Food details</caption>
  <thead>
    <tr>
      <th scope="col">Type of food</th>
      <th scope="col">Calories</th>
      <th scope="col">Average price</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td data-label="Type of food">Slice of pizza</td>
      <td data-label="Calories">450</td>
      <td data-label="Average price">$5.00</td>
    </tr>
    <tr>
      <td data-label="Type of food">Hamburger</td>
      <td data-label="Calories">350</td>
      <td data-label="Average price">$3.50</td>
    </tr>
  </tbody>
</table>`;
  var tableRows = [
    {
      name: "caption",
      type: "Table element",
      defaultValue: "Required for these examples",
      description: "Names the table for readers and assistive technology."
    },
    {
      name: "scope=col",
      type: "th attribute",
      defaultValue: "Column header",
      description: "Associates each heading with the cells in its column."
    },
    {
      name: "data-label",
      type: "td attribute",
      defaultValue: "Matching column heading",
      description: "Provides the visible mobile label generated by the responsive table CSS."
    },
    {
      name: "data-table",
      type: "Table attribute",
      defaultValue: "Required for compact layout",
      description: "Its presence enables the responsive layout. It accepts primary, accent, success, info, warning, danger or default for an optional tone."
    }
  ];
  var Table = ({ color }) => {
    const attributes = {
      "data-table": typeof color === "string" ? color : ""
    };
    return /* @__PURE__ */ jsxs("table", { ...attributes, children: [
      /* @__PURE__ */ jsx("caption", { children: "Food details" }),
      /* @__PURE__ */ jsx("thead", { children: /* @__PURE__ */ jsxs("tr", { children: [
        /* @__PURE__ */ jsx("th", { scope: "col", children: "Type of food" }),
        /* @__PURE__ */ jsx("th", { scope: "col", children: "Calories" }),
        /* @__PURE__ */ jsx("th", { scope: "col", children: "Average price" })
      ] }) }),
      /* @__PURE__ */ jsxs("tbody", { children: [
        /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { "data-label": "Type of food", children: "Slice of pizza" }),
          /* @__PURE__ */ jsx("td", { "data-label": "Calories", children: "450" }),
          /* @__PURE__ */ jsx("td", { "data-label": "Average price", children: "$5.00" })
        ] }),
        /* @__PURE__ */ jsxs("tr", { children: [
          /* @__PURE__ */ jsx("td", { "data-label": "Type of food", children: "Hamburger" }),
          /* @__PURE__ */ jsx("td", { "data-label": "Calories", children: "350" }),
          /* @__PURE__ */ jsx("td", { "data-label": "Average price", children: "$3.50" })
        ] })
      ] })
    ] });
  };
  var tables_page_default = () => /* @__PURE__ */ jsxs(doc_page_default, { page: "Tables", children: [
    /* @__PURE__ */ jsxs(demo_section_default, { id: "responsive-table", title: "Responsive table", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "Below 800px, each ",
        /* @__PURE__ */ jsx("code", { children: "data-label" }),
        " value becomes the visible heading for its cell."
      ] }),
      /* @__PURE__ */ jsx(Table, {}),
      /* @__PURE__ */ jsx(code_example_default, { code: tableCode() })
    ] }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "table-colors", title: "Table colors", children: colors4.map((color) => /* @__PURE__ */ jsxs("div", { children: [
      /* @__PURE__ */ jsx(Table, { color }),
      /* @__PURE__ */ jsx(code_example_default, { code: tableCode(color) })
    ] })) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "table-api", title: "Table API", children: /* @__PURE__ */ jsx(api_table_default, { caption: "Responsive table attributes", rows: tableRows }) }),
    /* @__PURE__ */ jsx(
      demo_section_default,
      {
        id: "table-accessibility",
        title: "Accessibility and common errors",
        children: /* @__PURE__ */ jsxs("ul", { children: [
          /* @__PURE__ */ jsxs("li", { children: [
            "Keep a descriptive ",
            /* @__PURE__ */ jsx("code", { children: "caption" }),
            " and use",
            " ",
            /* @__PURE__ */ jsx("code", { children: 'scope="col"' }),
            "on every column header."
          ] }),
          /* @__PURE__ */ jsxs("li", { children: [
            "Make each ",
            /* @__PURE__ */ jsx("code", { children: "data-label" }),
            " match its column heading exactly so the compact layout preserves the same meaning."
          ] }),
          /* @__PURE__ */ jsx("li", { children: "Do not use a table only for visual alignment. Use it when rows and columns describe real data relationships." }),
          /* @__PURE__ */ jsxs("li", { children: [
            "The responsive CSS hides ",
            /* @__PURE__ */ jsx("code", { children: "thead" }),
            " only from view. Assistive technology retains the semantic headers, while data labels provide the compact visual headings."
          ] })
        ] })
      }
    )
  ] });

  // site/src/pages/progress_page.tsx
  var progressExample = `<label for="upload-progress">Upload progress</label>
<progress id="upload-progress" value="40" max="100" data-progress="primary">
  40%
</progress>`;
  var progressTonesExample = `<progress value="20" max="100" data-progress="primary" aria-label="Primary progress">20%</progress>
<progress value="30" max="100" data-progress="accent" aria-label="Accent progress">30%</progress>
<progress value="40" max="100" data-progress="info" aria-label="Information progress">40%</progress>
<progress value="50" max="100" data-progress="success" aria-label="Successful progress">50%</progress>
<progress value="60" max="100" data-progress="warning" aria-label="Warning progress">60%</progress>
<progress value="70" max="100" data-progress="danger" aria-label="Danger progress">70%</progress>`;
  var indeterminateProgressExample = `<progress data-progress="primary" aria-label="Loading results"></progress>
<progress data-progress="warning" aria-label="Saving changes"></progress>`;
  var spinnerExample = `<progress data-progress="spinner primary" aria-label="Loading"></progress>
<progress data-progress="spinner danger" aria-label="Retrying"></progress>`;
  var progress_page_default = () => /* @__PURE__ */ jsxs(doc_page_default, { page: "Progress", children: [
    /* @__PURE__ */ jsxs(demo_section_default, { id: "progress-determinate-title", title: "Determinate progress", children: [
      /* @__PURE__ */ jsx("label", { for: "upload-progress", children: "Upload progress" }),
      /* @__PURE__ */ jsx(
        "progress",
        {
          id: "upload-progress",
          value: "40",
          max: "100",
          "data-progress": "primary",
          children: "40%"
        }
      ),
      /* @__PURE__ */ jsx(code_example_default, { code: progressExample })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "progress-tones-title", title: "Supported tones", children: [
      /* @__PURE__ */ jsx("p", { children: "Choose a supported tone that matches the status shown beside the bar. Keep a measurable value and maximum on every determinate example." }),
      /* @__PURE__ */ jsx(
        "progress",
        {
          value: "20",
          max: "100",
          "data-progress": "primary",
          "aria-label": "Primary progress",
          children: "20%"
        }
      ),
      /* @__PURE__ */ jsx(
        "progress",
        {
          value: "30",
          max: "100",
          "data-progress": "accent",
          "aria-label": "Accent progress",
          children: "30%"
        }
      ),
      /* @__PURE__ */ jsx(
        "progress",
        {
          value: "40",
          max: "100",
          "data-progress": "info",
          "aria-label": "Information progress",
          children: "40%"
        }
      ),
      /* @__PURE__ */ jsx(
        "progress",
        {
          value: "50",
          max: "100",
          "data-progress": "success",
          "aria-label": "Successful progress",
          children: "50%"
        }
      ),
      /* @__PURE__ */ jsx(
        "progress",
        {
          value: "60",
          max: "100",
          "data-progress": "warning",
          "aria-label": "Warning progress",
          children: "60%"
        }
      ),
      /* @__PURE__ */ jsx(
        "progress",
        {
          value: "70",
          max: "100",
          "data-progress": "danger",
          "aria-label": "Danger progress",
          children: "70%"
        }
      ),
      /* @__PURE__ */ jsx(code_example_default, { code: progressTonesExample })
    ] }),
    /* @__PURE__ */ jsxs(
      demo_section_default,
      {
        id: "progress-indeterminate-title",
        title: "Indeterminate progress",
        children: [
          /* @__PURE__ */ jsxs("p", { children: [
            "Omit ",
            /* @__PURE__ */ jsx("code", { children: "value" }),
            " when the remaining duration or amount is unknown. An accessible name tells assistive technology which task is active."
          ] }),
          /* @__PURE__ */ jsx("progress", { "data-progress": "primary", "aria-label": "Loading results" }),
          /* @__PURE__ */ jsx("progress", { "data-progress": "warning", "aria-label": "Saving changes" }),
          /* @__PURE__ */ jsx(code_example_default, { code: indeterminateProgressExample })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "progress-spinner-title", title: "Spinners", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "Add the ",
        /* @__PURE__ */ jsx("code", { children: "spinner" }),
        " token for a compact circular indicator, then pair it with one supported tone and a name for the active task."
      ] }),
      /* @__PURE__ */ jsx("progress", { "data-progress": "spinner primary", "aria-label": "Loading" }),
      /* @__PURE__ */ jsx("progress", { "data-progress": "spinner danger", "aria-label": "Retrying" }),
      /* @__PURE__ */ jsx(code_example_default, { code: spinnerExample })
    ] }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "progress-api-title", title: "API", children: /* @__PURE__ */ jsx(
      api_table_default,
      {
        caption: "Progress elements, attributes, tokens and states",
        rows: [
          {
            name: "progress",
            type: "Element",
            defaultValue: "Required",
            description: "Provides native progress semantics."
          },
          {
            name: "value / max",
            type: "Attribute",
            defaultValue: "Indeterminate / 1",
            description: "Define measurable completion and its upper bound."
          },
          {
            name: "data-progress",
            type: "Attribute",
            defaultValue: "Primary bar",
            description: "Accepts primary, accent, info, success, warning, danger and spinner."
          },
          {
            name: "--progress-color / --progress-track",
            type: "Token",
            defaultValue: "Primary / default-lighter",
            description: "Set the indicator and track colors."
          },
          {
            name: "determinate / indeterminate / spinner",
            type: "State",
            defaultValue: "Indeterminate without value",
            description: "Selects measured, animated bar or circular presentation."
          }
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "progress-accessibility-title", title: "Accessibility", children: /* @__PURE__ */ jsxs("p", { children: [
      "Give every progress element a visible label or an accessible name. Use",
      /* @__PURE__ */ jsx("code", { children: " value" }),
      " and ",
      /* @__PURE__ */ jsx("code", { children: "max" }),
      " only when progress is measurable. Omit ",
      /* @__PURE__ */ jsx("code", { children: "value" }),
      " for an unknown duration so assistive technology announces an indeterminate state."
    ] }) }),
    /* @__PURE__ */ jsx(
      demo_section_default,
      {
        id: "progress-errors-title",
        title: "Composition and common errors",
        children: /* @__PURE__ */ jsxs("p", { children: [
          "Choose only tones backed by existing variables. The documented set omits",
          " ",
          /* @__PURE__ */ jsx("code", { children: "secondary" }),
          " because no ",
          /* @__PURE__ */ jsx("code", { children: "--secondary" }),
          " token is defined. Do not report a guessed percentage as determinate progress."
        ] })
      }
    )
  ] });

  // site/src/pages/app_components_page.tsx
  var excludedCategories = /* @__PURE__ */ new Set([
    "Getting started",
    "Foundations",
    "Utilities"
  ]);
  var componentPages = catalog.filter(
    ({ category, page }) => !excludedCategories.has(category) && page !== "Home" && page !== "AppComponents"
  );
  var componentCategories = categoryOrder.filter(
    (category) => componentPages.some((route) => route.category === category)
  );
  var app_components_page_default = () => /* @__PURE__ */ jsxs(doc_page_default, { page: "AppComponents", children: [
    /* @__PURE__ */ jsx("p", { children: "Browse component guides by purpose. Each guide documents the semantic markup, variants, and behavior for that component." }),
    componentCategories.map((category) => /* @__PURE__ */ jsx(
      demo_section_default,
      {
        id: `${category.toLowerCase().replaceAll(" ", "-")}-components`,
        title: category,
        children: /* @__PURE__ */ jsx("ul", { children: componentPages.filter((route) => route.category === category).map(({ path, label, description }) => /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("a", { href: path, children: label }),
          /* @__PURE__ */ jsx("p", { children: description })
        ] })) })
      }
    ))
  ] });

  // site/src/pages/toolbars_page.tsx
  var toolbarExample = `<nav data-toolbar aria-label="Editor actions">
  <button type="button">Save</button>
  <button type="button">Preview</button>
  <a href="/dragonglass/cards.html">Cards</a>
</nav>`;
  var filterToolbarExample = `<nav data-toolbar aria-label="Issue filters">
  <label data-chip>
    <input type="checkbox" checked> Open
  </label>
  <label data-chip>
    <input type="checkbox"> Assigned
  </label>
  <button type="button">Apply</button>
</nav>`;
  var containerToolbarsExample = `<header>
  <h3>Project settings</h3>
  <nav data-toolbar aria-label="Project actions">
    <button type="button">Share</button>
    <button type="button">Export</button>
  </nav>
</header>
<footer>
  <nav data-toolbar aria-label="Form actions">
    <button type="button">Cancel</button>
    <button type="submit">Save changes</button>
  </nav>
</footer>`;
  var toolbars_page_default = () => /* @__PURE__ */ jsxs(doc_page_default, { page: "Toolbars", children: [
    /* @__PURE__ */ jsxs(demo_section_default, { id: "toolbar-actions-title", title: "Actions and links", children: [
      /* @__PURE__ */ jsxs("nav", { "data-toolbar": true, "aria-label": "Editor actions", children: [
        /* @__PURE__ */ jsx("button", { type: "button", children: "Save" }),
        /* @__PURE__ */ jsx("button", { type: "button", children: "Preview" }),
        /* @__PURE__ */ jsx("a", { href: "/dragonglass/cards.html", children: "Cards" })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: toolbarExample })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "toolbar-chips-title", title: "Filter chips", children: [
      /* @__PURE__ */ jsx("p", { children: "Group related checkbox chips in a toolbar when users need to adjust several filters before they apply the result." }),
      /* @__PURE__ */ jsxs("nav", { "data-toolbar": true, "aria-label": "Issue filters", children: [
        /* @__PURE__ */ jsxs("label", { "data-chip": true, children: [
          /* @__PURE__ */ jsx("input", { type: "checkbox", checked: true }),
          " Open"
        ] }),
        /* @__PURE__ */ jsxs("label", { "data-chip": true, children: [
          /* @__PURE__ */ jsx("input", { type: "checkbox" }),
          " Assigned"
        ] }),
        /* @__PURE__ */ jsx("button", { type: "button", children: "Apply" })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: filterToolbarExample })
    ] }),
    /* @__PURE__ */ jsxs(
      demo_section_default,
      {
        id: "toolbar-containers-title",
        title: "Header and footer toolbars",
        children: [
          /* @__PURE__ */ jsxs("p", { children: [
            "A toolbar wraps by default. Inside a header or footer it uses",
            /* @__PURE__ */ jsx("code", { children: " flex-wrap: nowrap" }),
            ", so keep labels short and avoid more actions than the available width can hold."
          ] }),
          /* @__PURE__ */ jsxs("header", { children: [
            /* @__PURE__ */ jsx("h3", { children: "Project settings" }),
            /* @__PURE__ */ jsxs("nav", { "data-toolbar": true, "aria-label": "Project actions", children: [
              /* @__PURE__ */ jsx("button", { type: "button", children: "Share" }),
              /* @__PURE__ */ jsx("button", { type: "button", children: "Export" })
            ] })
          ] }),
          /* @__PURE__ */ jsx("footer", { children: /* @__PURE__ */ jsxs("nav", { "data-toolbar": true, "aria-label": "Form actions", children: [
            /* @__PURE__ */ jsx("button", { type: "button", children: "Cancel" }),
            /* @__PURE__ */ jsx("button", { type: "submit", children: "Save changes" })
          ] }) }),
          /* @__PURE__ */ jsx(code_example_default, { code: containerToolbarsExample })
        ]
      }
    ),
    /* @__PURE__ */ jsx(demo_section_default, { id: "toolbar-api-title", title: "API", children: /* @__PURE__ */ jsx(
      api_table_default,
      {
        caption: "Toolbar elements, attributes, tokens and states",
        rows: [
          {
            name: "nav",
            type: "Element",
            defaultValue: "Required",
            description: "Provides navigation semantics for the toolbar."
          },
          {
            name: "data-toolbar",
            type: "Attribute",
            defaultValue: "Required",
            description: "Applies the flexible toolbar layout to a nav."
          },
          {
            name: "--spacing-2 / --spacing-3",
            type: "Token",
            defaultValue: "Theme",
            description: "Control the gap and default toolbar padding."
          },
          {
            name: "--border-size-1 / --default-light",
            type: "Token",
            defaultValue: "Theme",
            description: "Control the toolbar divider."
          },
          {
            name: "header or footer ancestor",
            type: "State",
            defaultValue: "Wrapping",
            description: "Removes padding and divider and prevents wrapping."
          }
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "toolbar-accessibility-title", title: "Accessibility", children: /* @__PURE__ */ jsx("p", { children: "Give every toolbar a specific accessible name. Use links for navigation, buttons for actions and labeled inputs for filters so each control keeps its native keyboard behavior." }) }),
    /* @__PURE__ */ jsx(
      demo_section_default,
      {
        id: "toolbar-composition-title",
        title: "Composition and common errors",
        children: /* @__PURE__ */ jsxs("p", { children: [
          "Place direct links, buttons or chips inside",
          " ",
          /* @__PURE__ */ jsx("code", { children: "nav[data-toolbar]" }),
          ". Do not use a toolbar as a generic visual row, and do not rely on a header or footer toolbar to wrap crowded actions."
        ] })
      }
    )
  ] });

  // site/src/pages/chips_page.tsx
  var chipExample = `<label data-chip="success">
  <input type="checkbox" checked /> Active
</label>`;
  var chipElementsExample = `<p>
  <button data-chip type="button">Action</button>
  <a data-chip href="/dragonglass/forms.html">Forms</a>
  <span data-chip>Read only</span>
</p>`;
  var chipTonesExample = `<p>
  <span data-chip="primary">Primary</span>
  <span data-chip="accent">Accent</span>
  <span data-chip="success">Passed</span>
  <span data-chip="info">Queued</span>
  <span data-chip="warning">Review</span>
  <span data-chip="danger">Blocked</span>
  <span data-chip="default">Default</span>
</p>`;
  var chips_page_default = () => /* @__PURE__ */ jsxs(doc_page_default, { page: "Chips", children: [
    /* @__PURE__ */ jsxs(demo_section_default, { id: "chips-elements-title", title: "Actions, links and values", children: [
      /* @__PURE__ */ jsx("p", { children: "Choose a button for an action, a link for navigation and a span for a read-only value so each chip keeps the correct native behavior." }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("button", { "data-chip": true, type: "button", children: "Action" }),
        " ",
        /* @__PURE__ */ jsx("a", { "data-chip": true, href: "/dragonglass/forms.html", children: "Forms" }),
        " ",
        /* @__PURE__ */ jsx("span", { "data-chip": true, children: "Read only" })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: chipElementsExample })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "chips-tones-title", title: "Semantic tones", children: [
      /* @__PURE__ */ jsx("p", { children: "Use semantic tones to reinforce a named state or category. Keep the text meaningful because color alone does not explain the value." }),
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("span", { "data-chip": "primary", children: "Primary" }),
        " ",
        /* @__PURE__ */ jsx("span", { "data-chip": "accent", children: "Accent" }),
        " ",
        /* @__PURE__ */ jsx("span", { "data-chip": "success", children: "Passed" }),
        " ",
        /* @__PURE__ */ jsx("span", { "data-chip": "info", children: "Queued" }),
        " ",
        /* @__PURE__ */ jsx("span", { "data-chip": "warning", children: "Review" }),
        " ",
        /* @__PURE__ */ jsx("span", { "data-chip": "danger", children: "Blocked" }),
        " ",
        /* @__PURE__ */ jsx("span", { "data-chip": "default", children: "Default" })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: chipTonesExample })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "chips-states-title", title: "Selection states", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsxs("label", { "data-chip": "success", children: [
          /* @__PURE__ */ jsx("input", { type: "checkbox", checked: true }),
          " Active"
        ] }),
        " ",
        /* @__PURE__ */ jsx("button", { "data-chip": true, type: "button", "aria-pressed": "true", children: "Pinned" }),
        " ",
        /* @__PURE__ */ jsx("a", { "data-chip": true, href: "/dragonglass/chips.html", "aria-current": "true", children: "Chips" })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: chipExample })
    ] }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "chips-api-title", title: "API", children: /* @__PURE__ */ jsx(
      api_table_default,
      {
        caption: "Chip elements, attributes, tokens and states",
        rows: [
          {
            name: "button / a / label / span",
            type: "Element",
            defaultValue: "Contextual",
            description: "Choose semantics that match an action, link, input or value."
          },
          {
            name: "data-chip",
            type: "Attribute",
            defaultValue: "Required",
            description: "Accepts primary, accent, success, info, warning, danger or default."
          },
          {
            name: "--chip-border / --chip-background / --chip-text",
            type: "Token",
            defaultValue: "Theme",
            description: "Set the resting border, background and text colors."
          },
          {
            name: "--chip-active / --chip-active-text",
            type: "Token",
            defaultValue: "Theme",
            description: "Set selected and pressed colors."
          },
          {
            name: "input:checked / aria-pressed=true / aria-current=true",
            type: "State",
            defaultValue: "False",
            description: "Apply the active chip appearance for supported semantics."
          }
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "chips-accessibility-title", title: "Accessibility", children: /* @__PURE__ */ jsxs("p", { children: [
      "Use a checkbox when a chip toggles a form value,",
      " ",
      /* @__PURE__ */ jsx("code", { children: "aria-pressed" }),
      "for a toggle button and ",
      /* @__PURE__ */ jsx("code", { children: 'aria-current="true"' }),
      " only for the current link. Keep the visible label descriptive."
    ] }) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "chips-errors-title", title: "Composition and common errors", children: /* @__PURE__ */ jsxs("p", { children: [
      "A plain ",
      /* @__PURE__ */ jsx("code", { children: "span" }),
      " is display-only and must not receive click behavior. Do not set active styling without exposing the same state in the checkbox, button or link semantics."
    ] }) })
  ] });

  // site/src/pages/alerts_page.tsx
  var alertExample = `<div data-alert="warning" role="alert">
  <strong>Review required.</strong>
  <p>The billing address has missing fields.</p>
</div>`;
  var semanticAlertsExample = `<div data-alert="info" role="status">
  Your profile has unsaved changes.
</div>
<div data-alert="success" role="status">
  The invoice was paid successfully.
</div>
<div data-alert="warning" role="alert">
  Your storage is almost full.
</div>
<div data-alert="danger" role="alert">
  The payment method was rejected.
</div>`;
  var alerts_page_default = () => /* @__PURE__ */ jsxs(doc_page_default, { page: "Alerts", children: [
    /* @__PURE__ */ jsxs(demo_section_default, { id: "alerts-tones-title", title: "Semantic alerts", children: [
      /* @__PURE__ */ jsx("p", { children: "Match the tone to the outcome, then choose status for routine updates or alert for urgent information that needs immediate attention." }),
      /* @__PURE__ */ jsx("div", { "data-alert": "info", role: "status", children: "Your profile has unsaved changes." }),
      /* @__PURE__ */ jsx("div", { "data-alert": "success", role: "status", children: "The invoice was paid successfully." }),
      /* @__PURE__ */ jsx("div", { "data-alert": "warning", role: "alert", children: "Your storage is almost full." }),
      /* @__PURE__ */ jsx("div", { "data-alert": "danger", role: "alert", children: "The payment method was rejected." }),
      /* @__PURE__ */ jsx(code_example_default, { code: semanticAlertsExample })
    ] }),
    /* @__PURE__ */ jsxs(
      demo_section_default,
      {
        id: "alerts-content-title",
        title: "Alert with supporting content",
        children: [
          /* @__PURE__ */ jsxs("div", { "data-alert": "warning", role: "alert", children: [
            /* @__PURE__ */ jsx("strong", { children: "Review required." }),
            /* @__PURE__ */ jsx("p", { children: "The billing address has missing fields." })
          ] }),
          /* @__PURE__ */ jsx(code_example_default, { code: alertExample })
        ]
      }
    ),
    /* @__PURE__ */ jsx(demo_section_default, { id: "alerts-api-title", title: "API", children: /* @__PURE__ */ jsx(
      api_table_default,
      {
        caption: "Alert elements, attributes, tokens and states",
        rows: [
          {
            name: "div",
            type: "Element",
            defaultValue: "Example container",
            description: "Provides a neutral container for the alert content."
          },
          {
            name: "data-alert",
            type: "Attribute",
            defaultValue: "Primary",
            description: "Accepts info, success, warning or danger."
          },
          {
            name: "role=status / role=alert",
            type: "Attribute",
            defaultValue: "None",
            description: "Selects polite status or urgent alert announcement behavior."
          },
          {
            name: "--alert-color / --alert-bg",
            type: "Token",
            defaultValue: "Primary theme colors",
            description: "Set the accent border and alert background."
          },
          {
            name: "info / success / warning / danger",
            type: "State",
            defaultValue: "Primary",
            description: "Maps the alert to a supported semantic tone."
          }
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "alerts-accessibility-title", title: "Accessibility", children: /* @__PURE__ */ jsxs("p", { children: [
      "Use ",
      /* @__PURE__ */ jsx("code", { children: 'role="status"' }),
      " for non-urgent updates and",
      /* @__PURE__ */ jsx("code", { children: ' role="alert"' }),
      " for time-sensitive errors or warnings. Add a role when content appears dynamically, not merely to make static prose interrupt a screen reader."
    ] }) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "alerts-errors-title", title: "Composition and common errors", children: /* @__PURE__ */ jsxs("p", { children: [
      "Apply ",
      /* @__PURE__ */ jsx("code", { children: "data-alert" }),
      " to a suitable container. Put the outcome first, add recovery guidance when useful and never communicate severity by color alone."
    ] }) })
  ] });

  // site/src/pages/expansion_panels_page.tsx
  var expansionExample = `<details data-expansion-panel open>
  <summary>Account status</summary>
  <p>Your account is active.</p>
</details>`;
  var expansionFormExample = `<details data-expansion-panel open>
  <summary>Contact details</summary>
  <form>
    <label for="contact-email">Email</label>
    <input id="contact-email" type="email" name="email">
    <button type="submit">Save</button>
  </form>
</details>`;
  var expansion_panels_page_default = () => /* @__PURE__ */ jsxs(doc_page_default, { page: "ExpansionPanels", children: [
    /* @__PURE__ */ jsxs(demo_section_default, { id: "expansion-basic-title", title: "Collapsed and open panels", children: [
      /* @__PURE__ */ jsxs("details", { "data-expansion-panel": true, children: [
        /* @__PURE__ */ jsx("summary", { children: "Billing details" }),
        /* @__PURE__ */ jsx("p", { children: "Your plan renews next month." })
      ] }),
      /* @__PURE__ */ jsxs("details", { "data-expansion-panel": true, open: true, children: [
        /* @__PURE__ */ jsx("summary", { children: "Account status" }),
        /* @__PURE__ */ jsx("p", { children: "Your account is active." })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: expansionExample })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "expansion-form-title", title: "Panel with form content", children: [
      /* @__PURE__ */ jsx("p", { children: "Place related form controls inside the disclosed content so the summary names the task before the user opens it." }),
      /* @__PURE__ */ jsxs("details", { "data-expansion-panel": true, open: true, children: [
        /* @__PURE__ */ jsx("summary", { children: "Contact details" }),
        /* @__PURE__ */ jsxs("form", { children: [
          /* @__PURE__ */ jsx("label", { for: "contact-email", children: "Email" }),
          /* @__PURE__ */ jsx("input", { id: "contact-email", type: "email", name: "email" }),
          /* @__PURE__ */ jsx("button", { type: "submit", children: "Save" })
        ] })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: expansionFormExample })
    ] }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "expansion-api-title", title: "API", children: /* @__PURE__ */ jsx(
      api_table_default,
      {
        caption: "Expansion panel elements, attributes, tokens and states",
        rows: [
          {
            name: "details / summary",
            type: "Element",
            defaultValue: "Required",
            description: "Provide native disclosure behavior and its visible control."
          },
          {
            name: "data-expansion-panel",
            type: "Attribute",
            defaultValue: "Required",
            description: "Applies the full-width expansion panel treatment."
          },
          {
            name: "open",
            type: "Attribute / state",
            defaultValue: "Absent",
            description: "Shows the panel content and rotates the disclosure marker."
          },
          {
            name: "--card-radius / --default-light",
            type: "Token",
            defaultValue: "Theme",
            description: "Control panel corners and border color."
          },
          {
            name: "--spacing-3 / --spacing-4",
            type: "Token",
            defaultValue: "Theme",
            description: "Control summary and content spacing."
          }
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "expansion-accessibility-title", title: "Accessibility", children: /* @__PURE__ */ jsxs("p", { children: [
      "Keep ",
      /* @__PURE__ */ jsx("code", { children: "summary" }),
      " as the first child of ",
      /* @__PURE__ */ jsx("code", { children: "details" }),
      " and write a label that describes the hidden content. Native disclosure state and keyboard controls require no additional ARIA."
    ] }) }),
    /* @__PURE__ */ jsx(
      demo_section_default,
      {
        id: "expansion-errors-title",
        title: "Composition and common errors",
        children: /* @__PURE__ */ jsx("p", { children: "Put interactive content after the summary. Do not replace the summary with a custom button, nest a second summary or add a competing click handler." })
      }
    )
  ] });

  // site/src/pages/notifications_page.tsx
  var semanticNotificationsCode = `<aside data-notification="info inline" role="status">Sync started.</aside>
<aside data-notification="success inline" role="status">File uploaded successfully.</aside>
<aside data-notification="warning inline" role="status">Storage is almost full.</aside>
<aside data-notification="danger inline" role="alert">Upload failed.</aside>`;
  var contentNotificationCode = `<aside data-notification="success inline" role="status">
  <button type="button" data-notification-close aria-label="Dismiss">
    <span aria-hidden="true">\xD7</span>
  </button>
  <strong>Export ready.</strong>
  <p>Your report can be downloaded now.</p>
</aside>`;
  var positionsCode = `<aside data-notification="info top right" role="status">Saved.</aside>
<aside data-notification="warning bottom center" role="status">Storage is almost full.</aside>
<aside data-notification="danger center left" role="alert">Connection lost.</aside>`;
  var shadowCode = `<aside data-notification="info inline" role="status">Default shadow</aside>
<aside data-notification="info inline no-shadow" role="status">No shadow</aside>`;
  var apiRows5 = [
    {
      name: "aside",
      type: "Element",
      defaultValue: "Fixed notification",
      description: "Provides a complementary message container for notification content."
    },
    {
      name: "data-notification",
      type: "Attribute",
      defaultValue: "Primary border, top right",
      description: "Activates notification layout and accepts tone, position and shadow tokens."
    },
    {
      name: "data-notification-close",
      type: "Button attribute",
      defaultValue: "Optional",
      description: "Marks a direct child button as the close action without coupling styles to its accessible name."
    },
    {
      name: "info|success|warning|danger",
      type: "Attribute token",
      defaultValue: "Primary",
      description: "Sets the semantic border color without choosing announcement urgency."
    },
    {
      name: "inline",
      type: "Attribute token",
      defaultValue: "Fixed",
      description: "Keeps a notification in document flow and resets position transforms."
    },
    {
      name: "top|right|bottom|left|center",
      type: "Attribute token",
      defaultValue: "top right",
      description: "Combines vertical and horizontal placement for fixed notifications."
    },
    {
      name: "no-shadow",
      type: "Attribute token",
      defaultValue: "--shadow-lg",
      description: "Removes elevation when a border or surrounding surface is sufficient."
    },
    {
      name: 'role="status"',
      type: "State",
      defaultValue: "Recommended",
      description: "Politely announces non-urgent updates without interrupting current speech."
    },
    {
      name: 'role="alert"',
      type: "State",
      defaultValue: "Urgent errors only",
      description: "Immediately announces a time-sensitive problem that needs attention."
    },
    {
      name: "--notification-color",
      type: "Token",
      defaultValue: "--primary",
      description: "Controls the notification border and is set by semantic tone tokens."
    }
  ];
  var notifications_page_default = () => /* @__PURE__ */ jsxs(doc_page_default, { page: "Notifications", children: [
    /* @__PURE__ */ jsxs(demo_section_default, { id: "notification-semantics", title: "Status and alert messages", children: [
      /* @__PURE__ */ jsx("aside", { "data-notification": "info inline", role: "status", children: "Sync started." }),
      /* @__PURE__ */ jsx("aside", { "data-notification": "success inline", role: "status", children: "File uploaded successfully." }),
      /* @__PURE__ */ jsx("aside", { "data-notification": "warning inline", role: "status", children: "Storage is almost full." }),
      /* @__PURE__ */ jsx("aside", { "data-notification": "danger inline", role: "alert", children: "Upload failed." }),
      /* @__PURE__ */ jsx(code_example_default, { code: semanticNotificationsCode })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "notification-content", title: "Content and close action", children: [
      /* @__PURE__ */ jsxs("aside", { "data-notification": "success inline", role: "status", children: [
        /* @__PURE__ */ jsx("button", { type: "button", "data-notification-close": true, "aria-label": "Dismiss", children: /* @__PURE__ */ jsx("span", { "aria-hidden": "true", children: "\xD7" }) }),
        /* @__PURE__ */ jsx("strong", { children: "Export ready." }),
        /* @__PURE__ */ jsx("p", { children: "Your report can be downloaded now." })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: contentNotificationCode })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "notification-positions", title: "Fixed positions", children: [
      /* @__PURE__ */ jsx("p", { children: "Combine one vertical token with one horizontal token. The default is top right. Center can stand alone or pair with top, right, bottom or left." }),
      /* @__PURE__ */ jsx(code_example_default, { code: positionsCode })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "notification-shadow", title: "Shadow", children: [
      /* @__PURE__ */ jsx("aside", { "data-notification": "info inline", role: "status", children: "Default shadow" }),
      /* @__PURE__ */ jsx("aside", { "data-notification": "info inline no-shadow", role: "status", children: "No shadow" }),
      /* @__PURE__ */ jsx(code_example_default, { code: shadowCode })
    ] }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "notification-composition", title: "Composition", children: /* @__PURE__ */ jsxs("p", { children: [
      "Use short text for a single update. Add a ",
      /* @__PURE__ */ jsx("code", { children: "strong" }),
      " heading and paragraph when the message needs context. Place an optional close button with ",
      /* @__PURE__ */ jsx("code", { children: "data-notification-close" }),
      " as a direct child so the notification reserves space for it. Application behavior must remove the message when that button is activated."
    ] }) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "notification-responsive", title: "Responsive behavior", children: /* @__PURE__ */ jsx("p", { children: "Fixed notifications stay within the viewport with a maximum width based on the page gap. Inline notifications use the available content width and remain in document flow. Prefer inline placement for persistent guidance or narrow layouts where fixed messages could cover controls." }) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "notification-accessibility", title: "Accessibility", children: /* @__PURE__ */ jsxs("p", { children: [
      "Use ",
      /* @__PURE__ */ jsx("code", { children: 'role="status"' }),
      " for successful, informational and most warning updates. Reserve ",
      /* @__PURE__ */ jsx("code", { children: 'role="alert"' }),
      " for urgent failures that need immediate attention. Insert the live region when the message changes instead of rendering it long before the update. Give the close button an accessible name and mark its visual symbol",
      /* @__PURE__ */ jsx("code", { children: ' aria-hidden="true"' }),
      "."
    ] }) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "notification-errors", title: "Common mistakes", children: /* @__PURE__ */ jsxs("ul", { children: [
      /* @__PURE__ */ jsxs("li", { children: [
        "Assigning ",
        /* @__PURE__ */ jsx("code", { children: 'role="alert"' }),
        " to every message interrupts screen reader users for routine updates."
      ] }),
      /* @__PURE__ */ jsx("li", { children: "Choosing a danger tone does not add alert semantics. Set the role from urgency, not color." }),
      /* @__PURE__ */ jsx("li", { children: "Positioning several fixed messages in the same corner can cover content unless the application manages a stack." }),
      /* @__PURE__ */ jsx("li", { children: "A close icon without an accessible name leaves its action unidentified." })
    ] }) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "notification-api", title: "API", children: /* @__PURE__ */ jsx(
      api_table_default,
      {
        caption: "Notification elements, attributes, states and tokens",
        rows: apiRows5
      }
    ) })
  ] });

  // site/src/pages/steppers_page.tsx
  var stepperExample = `<ol data-stepper>
  <li data-step="done">Account</li>
  <li aria-current="step">Billing</li>
  <li>Confirm</li>
</ol>`;
  var stepperErrorExample = `<ol data-stepper>
  <li data-step="done">Profile</li>
  <li data-step="error" aria-current="step">Payment</li>
  <li>Receipt</li>
</ol>`;
  var stepperLayoutsExample = `<ol data-stepper="vertical">
  <li data-step="done">Account</li>
  <li aria-current="step">Billing</li>
  <li>Confirm</li>
</ol>
<ol data-stepper="numbers" aria-label="Checkout progress">
  <li data-step="done">Account</li>
  <li aria-current="step">Billing</li>
  <li>Receipt</li>
</ol>`;
  var steppers_page_default = () => /* @__PURE__ */ jsxs(doc_page_default, { page: "Steppers", children: [
    /* @__PURE__ */ jsxs(demo_section_default, { id: "stepper-basic-title", title: "Current and completed steps", children: [
      /* @__PURE__ */ jsxs("ol", { "data-stepper": true, children: [
        /* @__PURE__ */ jsx("li", { "data-step": "done", children: "Account" }),
        /* @__PURE__ */ jsx("li", { "aria-current": "step", children: "Billing" }),
        /* @__PURE__ */ jsx("li", { children: "Confirm" })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: stepperExample })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "stepper-error-title", title: "Error state", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "Set ",
        /* @__PURE__ */ jsx("code", { children: 'data-step="error"' }),
        " on the failed step and keep",
        /* @__PURE__ */ jsx("code", { children: ' aria-current="step"' }),
        " when that step still requires the user's attention."
      ] }),
      /* @__PURE__ */ jsxs("ol", { "data-stepper": true, children: [
        /* @__PURE__ */ jsx("li", { "data-step": "done", children: "Profile" }),
        /* @__PURE__ */ jsx("li", { "data-step": "error", "aria-current": "step", children: "Payment" }),
        /* @__PURE__ */ jsx("li", { children: "Receipt" })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: stepperErrorExample })
    ] }),
    /* @__PURE__ */ jsxs(
      demo_section_default,
      {
        id: "stepper-layouts-title",
        title: "Vertical and numbers-only layouts",
        children: [
          /* @__PURE__ */ jsx("p", { children: "Use the vertical layout when labels need more room. The numbers layout keeps the same text labels in the markup while CSS presents a compact sequence." }),
          /* @__PURE__ */ jsxs("ol", { "data-stepper": "vertical", children: [
            /* @__PURE__ */ jsx("li", { "data-step": "done", children: "Account" }),
            /* @__PURE__ */ jsx("li", { "aria-current": "step", children: "Billing" }),
            /* @__PURE__ */ jsx("li", { children: "Confirm" })
          ] }),
          /* @__PURE__ */ jsxs("ol", { "data-stepper": "numbers", "aria-label": "Checkout progress", children: [
            /* @__PURE__ */ jsx("li", { "data-step": "done", children: "Account" }),
            /* @__PURE__ */ jsx("li", { "aria-current": "step", children: "Billing" }),
            /* @__PURE__ */ jsx("li", { children: "Receipt" })
          ] }),
          /* @__PURE__ */ jsx(code_example_default, { code: stepperLayoutsExample })
        ]
      }
    ),
    /* @__PURE__ */ jsx(demo_section_default, { id: "stepper-api-title", title: "API", children: /* @__PURE__ */ jsx(
      api_table_default,
      {
        caption: "Stepper elements, attributes, tokens and states",
        rows: [
          {
            name: "ol / li",
            type: "Element",
            defaultValue: "Required",
            description: "Represent the ordered process and each step."
          },
          {
            name: "data-stepper",
            type: "Attribute",
            defaultValue: "Horizontal",
            description: "Accepts vertical or numbers layout tokens."
          },
          {
            name: "aria-current=step",
            type: "Attribute / state",
            defaultValue: "Absent",
            description: "Identifies the single current step."
          },
          {
            name: "data-step=done / error",
            type: "Attribute / state",
            defaultValue: "Upcoming",
            description: "Marks completed or failed steps."
          },
          {
            name: "--primary / --success / --danger",
            type: "Token",
            defaultValue: "Theme",
            description: "Color current, completed and failed states."
          }
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "stepper-accessibility-title", title: "Accessibility", children: /* @__PURE__ */ jsxs("p", { children: [
      "Preserve the ordered list and set ",
      /* @__PURE__ */ jsx("code", { children: 'aria-current="step"' }),
      " on exactly one item. Keep text labels in numbers-only layouts because CSS hides them visually while assistive technology can still announce them."
    ] }) }),
    /* @__PURE__ */ jsx(
      demo_section_default,
      {
        id: "stepper-errors-title",
        title: "Composition and common errors",
        children: /* @__PURE__ */ jsxs("p", { children: [
          "Use ",
          /* @__PURE__ */ jsx("code", { children: "data-step" }),
          " only for ",
          /* @__PURE__ */ jsx("code", { children: "done" }),
          " and",
          /* @__PURE__ */ jsx("code", { children: " error" }),
          ". Do not mark every completed step as current, and do not remove labels to create a visual-only numbered sequence."
        ] })
      }
    )
  ] });

  // site/src/pages/bottom_sheets_page.tsx
  var bottomSheetExample = `<dialog data-dialog="bottom-sheet" open aria-labelledby="filter-sheet-title">
  <header>
    <h3 id="filter-sheet-title">Filters</h3>
  </header>
  <section><p>Choose the results to include.</p></section>
</dialog>`;
  var bottom_sheets_page_default = () => /* @__PURE__ */ jsxs(doc_page_default, { page: "BottomSheets", children: [
    /* @__PURE__ */ jsxs(demo_section_default, { id: "bottom-sheet-open-title", title: "Open bottom sheet", children: [
      /* @__PURE__ */ jsxs(
        "dialog",
        {
          "data-dialog": "bottom-sheet",
          open: true,
          "aria-labelledby": "filter-sheet-title",
          children: [
            /* @__PURE__ */ jsx("header", { children: /* @__PURE__ */ jsx("h3", { id: "filter-sheet-title", children: "Filters" }) }),
            /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsx("p", { children: "Choose the results to include." }) })
          ]
        }
      ),
      /* @__PURE__ */ jsx(code_example_default, { code: bottomSheetExample })
    ] }),
    /* @__PURE__ */ jsxs(
      demo_section_default,
      {
        id: "bottom-sheet-content-title",
        title: "Structured content and actions",
        children: [
          /* @__PURE__ */ jsxs("p", { children: [
            "A bottom sheet can contain a header, a content section and a footer. The closed markup below remains hidden until the native",
            /* @__PURE__ */ jsx("code", { children: " open" }),
            " state is applied."
          ] }),
          /* @__PURE__ */ jsx(
            code_example_default,
            {
              code: `<dialog data-dialog="bottom-sheet no-shadow" aria-labelledby="share-sheet-title">
  <header><h3 id="share-sheet-title">Share</h3></header>
  <section><p>Choose where to share this item.</p></section>
  <footer><button type="button">Copy link</button></footer>
</dialog>`
            }
          )
        ]
      }
    ),
    /* @__PURE__ */ jsx(demo_section_default, { id: "bottom-sheet-api-title", title: "API", children: /* @__PURE__ */ jsx(
      api_table_default,
      {
        caption: "Bottom sheet elements, attributes, tokens and states",
        rows: [
          {
            name: "dialog",
            type: "Element",
            defaultValue: "Required",
            description: "Provides native dialog semantics and hidden state."
          },
          {
            name: "data-dialog=bottom-sheet",
            type: "Attribute",
            defaultValue: "Required",
            description: "Anchors the dialog to the bottom edge."
          },
          {
            name: "data-dialog=no-shadow",
            type: "Attribute token",
            defaultValue: "Shadow",
            description: "Removes the default dialog elevation."
          },
          {
            name: "open",
            type: "Attribute / state",
            defaultValue: "Absent",
            description: "Displays the sheet. Modal behavior still requires showModal()."
          },
          {
            name: "--dialog-radius / --shadow-2xl",
            type: "Token",
            defaultValue: "Theme",
            description: "Control the top corners and default elevation."
          }
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "bottom-sheet-accessibility-title", title: "Accessibility", children: /* @__PURE__ */ jsxs("p", { children: [
      "Give every dialog an accessible name with ",
      /* @__PURE__ */ jsx("code", { children: "aria-labelledby" }),
      "or ",
      /* @__PURE__ */ jsx("code", { children: "aria-label" }),
      ". The static ",
      /* @__PURE__ */ jsx("code", { children: "open" }),
      " attribute shows a non-modal example. Production modal flows must also manage opening, closing and focus with the native dialog API."
    ] }) }),
    /* @__PURE__ */ jsx(
      demo_section_default,
      {
        id: "bottom-sheet-errors-title",
        title: "Composition and common errors",
        children: /* @__PURE__ */ jsxs("p", { children: [
          "Keep the heading inside the dialog and connect its identifier to the dialog. Do not present an unnamed sheet, and do not claim that the",
          /* @__PURE__ */ jsx("code", { children: " open" }),
          " attribute alone creates modal focus behavior."
        ] })
      }
    )
  ] });

  // site/src/pages/tabs_page.tsx
  var tabsExample = `<section data-tabs>
  <details name="account-tabs" open>
    <summary>Overview</summary>
    <p>Account summary.</p>
  </details>
  <details name="account-tabs">
    <summary>Billing</summary>
    <p>Billing details.</p>
  </details>
</section>`;
  var richTabsExample = `<section data-tabs>
  <details name="settings-tabs" open>
    <summary>Profile</summary>
    <p>Ada Lovelace</p>
  </details>
  <details name="settings-tabs">
    <summary>Contact</summary>
    <label for="tabs-email">Email</label>
    <input id="tabs-email" type="email" name="email">
  </details>
  <details name="settings-tabs">
    <summary>Security</summary>
    <p>Review sign-in settings.</p>
  </details>
</section>`;
  var tabs_page_default = () => /* @__PURE__ */ jsxs(doc_page_default, { page: "Tabs", children: [
    /* @__PURE__ */ jsxs(demo_section_default, { id: "tabs-basic-title", title: "Native grouped disclosures", children: [
      /* @__PURE__ */ jsxs("section", { "data-tabs": true, children: [
        /* @__PURE__ */ jsxs("details", { name: "account-tabs", open: true, children: [
          /* @__PURE__ */ jsx("summary", { children: "Overview" }),
          /* @__PURE__ */ jsx("p", { children: "Account summary." })
        ] }),
        /* @__PURE__ */ jsxs("details", { name: "account-tabs", children: [
          /* @__PURE__ */ jsx("summary", { children: "Billing" }),
          /* @__PURE__ */ jsx("p", { children: "Billing details." })
        ] })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: tabsExample })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "tabs-content-title", title: "Rich panel content", children: [
      /* @__PURE__ */ jsx("p", { children: "Each disclosure can contain text or form controls. Give every sibling the same name so opening one panel closes the other panels in the group." }),
      /* @__PURE__ */ jsxs("section", { "data-tabs": true, children: [
        /* @__PURE__ */ jsxs("details", { name: "settings-tabs", open: true, children: [
          /* @__PURE__ */ jsx("summary", { children: "Profile" }),
          /* @__PURE__ */ jsx("p", { children: "Ada Lovelace" })
        ] }),
        /* @__PURE__ */ jsxs("details", { name: "settings-tabs", children: [
          /* @__PURE__ */ jsx("summary", { children: "Contact" }),
          /* @__PURE__ */ jsx("label", { for: "tabs-email", children: "Email" }),
          /* @__PURE__ */ jsx("input", { id: "tabs-email", type: "email", name: "email" })
        ] }),
        /* @__PURE__ */ jsxs("details", { name: "settings-tabs", children: [
          /* @__PURE__ */ jsx("summary", { children: "Security" }),
          /* @__PURE__ */ jsx("p", { children: "Review sign-in settings." })
        ] })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: richTabsExample })
    ] }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "tabs-api-title", title: "API", children: /* @__PURE__ */ jsx(
      api_table_default,
      {
        caption: "Tab disclosure elements, attributes, tokens and states",
        rows: [
          {
            name: "section / details / summary",
            type: "Element",
            defaultValue: "Required",
            description: "Build the container, disclosure panels and controls."
          },
          {
            name: "data-tabs",
            type: "Attribute",
            defaultValue: "Required",
            description: "Aligns grouped details controls and places the open content below."
          },
          {
            name: "name",
            type: "Attribute",
            defaultValue: "Ungrouped",
            description: "A shared value lets the browser keep one details panel open."
          },
          {
            name: "open",
            type: "Attribute / state",
            defaultValue: "Absent",
            description: "Marks the currently expanded disclosure."
          },
          {
            name: "--primary / --default-light / --spacing-4",
            type: "Token",
            defaultValue: "Theme",
            description: "Control the active marker, divider and panel spacing."
          }
        ]
      }
    ) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "tabs-accessibility-title", title: "Accessibility", children: /* @__PURE__ */ jsxs("p", { children: [
      "This component uses native ",
      /* @__PURE__ */ jsx("code", { children: "details" }),
      " and",
      /* @__PURE__ */ jsx("code", { children: " summary" }),
      " disclosures. It is not an ARIA tablist and does not implement tab, arrow-key or tabpanel roles. Keep every summary descriptive and every panel available in the document."
    ] }) }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "tabs-errors-title", title: "Composition and common errors", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "Give sibling details the same non-empty ",
        /* @__PURE__ */ jsx("code", { children: "name" }),
        " when they must behave as a group. Keep only ",
        /* @__PURE__ */ jsx("code", { children: "details" }),
        " as direct children of the tabs container because the enhanced layout derives each tab position from that sibling order."
      ] }),
      /* @__PURE__ */ jsx("p", { children: "Browsers without the required modern CSS keep the native disclosures in a stacked layout. Do not add ARIA tab roles without implementing the complete keyboard and focus contract." })
    ] })
  ] });

  // site/src/pages/index.ts
  var pages_default = {
    Html: html_page_default,
    Home: home_page_default,
    Layouts: layout_page_default,
    Grid: grid_page_default,
    Elevations: elevations_page_default,
    Colors: colors_page_default,
    Fonts: fonts_page_default,
    Badges: badges_page_default,
    Buttons: buttons_page_default,
    Cards: cards_page_default,
    Dialogs: dialogs_page_default,
    Lists: lists_page_default,
    Forms: forms_page_default,
    Tooltips: tooltips_page_default,
    Menus: menus_page_default,
    Tables: tables_page_default,
    Progress: progress_page_default,
    AppComponents: app_components_page_default,
    Toolbars: toolbars_page_default,
    Chips: chips_page_default,
    Alerts: alerts_page_default,
    ExpansionPanels: expansion_panels_page_default,
    Notifications: notifications_page_default,
    Steppers: steppers_page_default,
    BottomSheets: bottom_sheets_page_default,
    Tabs: tabs_page_default
  };

  // site/src/index.ts
  var router = new Router();
  var pageForRoute = (route) => {
    if (route.page === "Theme") {
      const themeName = route.themeName;
      if (typeof themeName !== "string") {
        throw new Error(`Theme name not found for route: ${route.path}`);
      }
      return () => pages_default.Colors({ themeName });
    }
    const page = pages_default[route.page];
    return () => page();
  };
  var pagesByRoute = new Map(
    routes.map((route) => [route.path, pageForRoute(route)])
  );
  for (const route of routes) {
    router.add(route.path, pageForRoute(route));
  }
  if (typeof window !== "undefined") {
    mountRouter("body", router);
  }
})();
