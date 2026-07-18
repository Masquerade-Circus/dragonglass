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
  var themeRoutePath = (themeName, colorScheme = "light") => colorScheme === "dark" ? `${basePath}/themes/dark/${themeName}.html` : `${basePath}/themes/${themeName}.html`;
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
  var catalogEntries = [
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
      path: `${basePath}/app-components.html`,
      label: "App components",
      icon: "widgets",
      color: "bg-primary",
      page: "AppComponents",
      category: "Getting started",
      description: "Find application components by purpose and open their examples and API."
    },
    {
      path: `${basePath}/layout.html`,
      label: "Layout",
      icon: "dashboard",
      color: "bg-accent",
      page: "Layouts",
      category: "Foundations",
      description: "Responsive containers, direct-child content regions and toolbar layouts."
    },
    {
      path: `${basePath}/heroes.html`,
      label: "Hero recipes",
      icon: "view_quilt",
      color: "bg-accent",
      page: "Heroes",
      category: "Foundations",
      description: "Centered, split and presentation hero recipes composed from existing primitives."
    },
    {
      path: `${basePath}/buttons.html`,
      label: "Buttons",
      icon: "arrow_forward",
      color: "bg-danger",
      page: "Buttons",
      category: "Actions",
      description: "Base button styles, semantic color utilities and FAB variants."
    },
    {
      path: `${basePath}/links.html`,
      label: "Links",
      icon: "link",
      color: "bg-danger",
      page: "Links",
      category: "Actions",
      description: "Inline, standalone and quiet link treatments for navigation and supporting actions."
    },
    {
      path: `${basePath}/chips.html`,
      label: "Chips",
      icon: "label",
      color: "bg-success",
      page: "Chips",
      category: "Actions",
      description: "Chip tones and checked, pressed and current visual states."
    },
    {
      path: `${basePath}/forms.html`,
      label: "Forms",
      icon: "font_download",
      color: "bg-success",
      page: "Forms",
      category: "Forms",
      description: "Field, floating-label, validation-state and toggle selectors."
    },
    {
      path: `${basePath}/breadcrumbs.html`,
      label: "Breadcrumbs",
      icon: "chevron_right",
      color: "bg-accent",
      page: "Breadcrumbs",
      category: "Navigation",
      description: "Wrapping breadcrumb trails built from direct link and button children."
    },
    {
      path: `${basePath}/toolbars.html`,
      label: "Toolbars",
      icon: "build",
      color: "bg-accent",
      page: "Toolbars",
      category: "Navigation",
      description: "Wrapping nav[data-toolbar] rows and container variants."
    },
    {
      path: `${basePath}/tabs.html`,
      label: "Tabs",
      icon: "tab",
      color: "bg-warning",
      page: "Tabs",
      category: "Navigation",
      description: "Grouped details layout selected by data-tabs."
    },
    {
      path: `${basePath}/menus.html`,
      label: "Menus",
      icon: "menu",
      color: "bg-warning",
      page: "Menus",
      category: "Navigation",
      description: "Positioned menus inside details[data-trigger]."
    },
    {
      path: `${basePath}/expansion-panels.html`,
      label: "Expansion panels",
      icon: "unfold_more",
      color: "bg-danger",
      page: "ExpansionPanels",
      category: "Navigation",
      description: "Full-width details panels with a generated open-state marker."
    },
    {
      path: `${basePath}/steppers.html`,
      label: "Steppers",
      icon: "linear_scale",
      color: "bg-info",
      page: "Steppers",
      category: "Navigation",
      description: "Horizontal, vertical and numbers-only stepper presentations."
    },
    {
      path: `${basePath}/alerts.html`,
      label: "Alerts",
      icon: "priority_high",
      color: "bg-warning",
      page: "Alerts",
      category: "Feedback",
      description: "Alert surfaces with info, success, warning and danger tones."
    },
    {
      path: `${basePath}/notifications.html`,
      label: "Notifications",
      icon: "notifications",
      color: "bg-accent",
      page: "Notifications",
      category: "Feedback",
      description: "Fixed and inline notifications with tone, position and shadow tokens."
    },
    {
      path: `${basePath}/progress.html`,
      label: "Progress",
      icon: "trending_flat",
      color: "bg-success",
      page: "Progress",
      category: "Feedback",
      description: "Determinate, indeterminate and spinner styles for progress elements."
    },
    {
      path: `${basePath}/cards.html`,
      label: "Cards",
      icon: "video_label",
      color: "bg-primary",
      page: "Cards",
      category: "Surfaces",
      description: "Basic, elevated, squared and full-width card variants."
    },
    {
      path: `${basePath}/dialogs.html`,
      label: "Dialogs",
      icon: "web_asset",
      color: "bg-accent",
      page: "Dialogs",
      category: "Surfaces",
      description: "Centered dialogs with shape, width and elevation variants."
    },
    {
      path: `${basePath}/bottom-sheets.html`,
      label: "Bottom sheets",
      icon: "vertical_align_bottom",
      color: "bg-success",
      page: "BottomSheets",
      category: "Surfaces",
      description: "Bottom-anchored dialog layout with an optional shadow."
    },
    {
      path: `${basePath}/drawers.html`,
      label: "Drawers",
      icon: "vertical_split",
      color: "bg-info",
      page: "Drawers",
      category: "Surfaces",
      description: "Persistent and temporary complementary regions at either viewport edge."
    },
    {
      path: `${basePath}/lists.html`,
      label: "Lists",
      icon: "list",
      color: "bg-info",
      page: "Lists",
      category: "Data display",
      description: "Styled unordered, ordered and definition-list layouts."
    },
    {
      path: `${basePath}/badges.html`,
      label: "Badges",
      icon: "chat_bubble",
      color: "bg-warning",
      page: "Badges",
      category: "Data display",
      description: "Generated badge content selected by data-badge."
    },
    {
      path: `${basePath}/tooltips.html`,
      label: "Tooltips",
      icon: "label",
      color: "bg-info",
      page: "Tooltips",
      category: "Data display",
      description: "Generated tooltip content, positions and color utilities."
    },
    {
      path: `${basePath}/tables.html`,
      label: "Tables",
      icon: "view_list",
      color: "bg-danger",
      page: "Tables",
      category: "Data display",
      description: "Responsive data-table layout with generated mobile cell labels."
    },
    {
      path: `${basePath}/utilities.html`,
      label: "Utilities",
      icon: "tune",
      color: "bg-default",
      page: "Utilities",
      category: "Utilities",
      description: "Find focused spacing, layout, border, typography, elevation and color adjustments."
    },
    {
      path: `${basePath}/grid.html`,
      label: "Grid",
      icon: "line_style",
      color: "bg-primary",
      page: "Grid",
      category: "Utilities",
      description: "Wrapping flex rows, gutters and responsive fractional widths."
    },
    {
      path: `${basePath}/positioning.html`,
      label: "Positioning",
      icon: "open_with",
      color: "bg-primary",
      page: "Positioning",
      category: "Utilities",
      description: "Fixed and absolute placement through directional data-position tokens."
    },
    {
      path: `${basePath}/images.html`,
      label: "Images",
      icon: "image",
      color: "bg-primary",
      page: "Images",
      category: "Utilities",
      description: "Object-fit, focal-position and background image utilities."
    },
    {
      path: `${basePath}/elevations.html`,
      label: "Elevations",
      icon: "layers",
      color: "bg-accent",
      page: "Elevations",
      category: "Utilities",
      description: "Outer shadows, inset shadows and explicit stacking utilities."
    },
    {
      path: `${basePath}/colors.html`,
      label: "Colors",
      icon: "group_work",
      color: "bg-info",
      page: "Colors",
      category: "Utilities",
      description: "Semantic color tokens, utility classes, bundled themes, and custom theme compilation."
    },
    {
      path: `${basePath}/fonts.html`,
      label: "Fonts",
      icon: "text_format",
      color: "bg-success",
      page: "Fonts",
      category: "Utilities",
      description: "Font size, style, weight, transform, line-height and alignment utilities."
    }
  ];
  var catalog = catalogEntries.map((route) => ({
    ...route,
    colorScheme: "light"
  }));
  var themeRoutes = bundledThemes.map((theme) => ({
    path: themeRoutePath(theme.name),
    label: `${theme.label} theme`,
    icon: "palette",
    color: "bg-primary",
    page: "Theme",
    category: "Utilities",
    description: `Preview the ${theme.label} theme in light mode across semantic colors, components, and interactive states.`,
    themeName: theme.name,
    colorScheme: "light"
  }));
  var darkThemeRoutes = bundledThemes.map((theme) => ({
    path: themeRoutePath(theme.name, "dark"),
    label: `${theme.label} dark theme`,
    icon: "dark_mode",
    color: "bg-primary",
    page: "Theme",
    category: "Utilities",
    description: `Preview the ${theme.label} theme in dark mode across semantic colors, components, and interactive states.`,
    themeName: theme.name,
    colorScheme: "dark"
  }));
  var routes = [...catalog, ...themeRoutes, ...darkThemeRoutes];
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
  var Fragment = fragment;

  // site/src/pages/html_page.tsx
  var Html = function view({
    content,
    colorScheme,
    isDevelopment,
    themeName,
    title
  }) {
    return /* @__PURE__ */ jsxs("html", { lang: "en", "data-color-scheme": colorScheme, children: [
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
            id: "documentation-theme-stylesheet",
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
  var CodeExample = ({ code }) => /* @__PURE__ */ jsx("pre", { "data-markdown": "include", children: /* @__PURE__ */ jsx("code", { children: code }) });
  var code_example_default = CodeExample;

  // package.json
  var version = "2.0.0";

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
      return /* @__PURE__ */ jsx("a", { href: path, "v-route": path, "aria-current": "page", children: content });
    }
    return /* @__PURE__ */ jsx("a", { href: path, "v-route": path, children: content });
  };
  var Header = ({ currentPath }) => /* @__PURE__ */ jsxs("header", { children: [
    /* @__PURE__ */ jsx("nav", { children: /* @__PURE__ */ jsxs("details", { "data-trigger": true, "data-drawer-trigger": true, children: [
      /* @__PURE__ */ jsx("summary", { "aria-label": "Documentation navigation", children: /* @__PURE__ */ jsx("span", { class: "material-icons", "aria-hidden": "true", children: "menu" }) }),
      /* @__PURE__ */ jsxs("aside", { "data-drawer": true, "aria-label": "Documentation navigation", children: [
        /* @__PURE__ */ jsx("section", { class: "h-48 relative bg-primary", children: /* @__PURE__ */ jsx("h1", { "data-position": "absolute bottom left", children: "DragonGlass" }) }),
        /* @__PURE__ */ jsx("ul", { "data-list": true, "v-for": catalogEntries, children: ({ path, label, icon, color }) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx(
          DrawerLink,
          {
            path,
            label,
            icon,
            color,
            currentPath
          }
        ) }) })
      ] })
    ] }) }),
    /* @__PURE__ */ jsx("span", { children: "Dragonglass" })
  ] });
  var Layout = (props, ...content) => /* @__PURE__ */ jsxs(Fragment, { children: [
    /* @__PURE__ */ jsx(Header, { currentPath: props.currentPath }),
    /* @__PURE__ */ jsx("main", { id: "main-content", tabindex: "-1", children: /* @__PURE__ */ jsx("section", { class: props.contentClass ?? "container", children: content }) }),
    /* @__PURE__ */ jsx("footer", { "data-markdown": "exclude", children: /* @__PURE__ */ jsxs("small", { children: [
      "Dragonglass v",
      version
    ] }) })
  ] });
  var layout_default = Layout;

  // site/src/pages/home_page.tsx
  var pathFor = (page) => routeByPage.get(page).path;
  var installCode = `npm install dragonglass`;
  var importCode = `import "dragonglass/dist/dragonglass.css";
import "dragonglass/dist/themes/default.css";`;
  var firstSurfaceCode = `<article data-card>
  <header>
    <h2>Project: Dragonglass</h2>
  </header>
  <p>The team is reviewing the final interface states.</p>
  <footer>
    <a href="${pathFor("AppComponents")}">Open project</a>
  </footer>
</article>`;
  var customThemeCode = `@use "pkg:dragonglass/theme" as dragonglass;

:root {
  @include dragonglass.tokens(#7c3aed);
}`;
  var mentalModel = [
    [
      "Semantic HTML",
      "Define the interface structure with native HTML elements."
    ],
    [
      "Component attributes",
      "Select documented components, variants, and states with readable data-* attributes."
    ],
    [
      "Focused utilities",
      "Adjust layout and presentation while the underlying structure stays visible."
    ]
  ];
  var frameworkSummary = [
    "Plain CSS distribution",
    "Responsive layout primitives",
    "Twelve compiled themes"
  ];
  var componentCategories = [
    ["Actions", "Buttons, links, and chips for the actions people can take."],
    [
      "Forms",
      "Fields, validation states, toggles, native pickers, and search interfaces."
    ],
    [
      "Navigation",
      "Toolbars, breadcrumbs, expansion panels, steppers, tabs, and menus."
    ],
    ["Feedback", "Alerts, notifications, and progress indicators."],
    ["Surfaces", "Cards, dialogs, bottom sheets, and drawers."],
    ["Data display", "Badges, lists, responsive tables, and tooltips."]
  ];
  var documentationPaths = [
    {
      title: "Getting started",
      body: "Install Dragonglass and build your first interface.",
      href: "#quick-start"
    },
    {
      title: "Components and API",
      body: "Find components by purpose and inspect their markup, variants, and states.",
      href: pathFor("AppComponents")
    },
    {
      title: "Layout foundations",
      body: "Build application shells, content regions, toolbars, and responsive layouts.",
      href: pathFor("Layouts")
    },
    {
      title: "Utilities",
      body: "Find the available classes for layout, spacing, typography, color, borders, and elevation.",
      href: pathFor("Utilities")
    },
    {
      title: "Themes and colors",
      body: "Choose a bundled theme or compile custom color tokens.",
      href: pathFor("Colors")
    },
    {
      title: "Forms",
      body: "Review fields, validation states, toggles, pickers, and search layouts.",
      href: pathFor("Forms")
    }
  ];
  var home_page_default = () => /* @__PURE__ */ jsx(layout_default, { currentPath: pathFor("Home"), contentClass: "p-0", children: /* @__PURE__ */ jsxs("div", { "data-markdown": "include-descendants", children: [
    /* @__PURE__ */ jsx(
      "section",
      {
        class: "min-h-half-screen bg-white pt-8 pb-8",
        "aria-labelledby": "home-title",
        children: /* @__PURE__ */ jsx("div", { class: "container pl-4 pr-4", children: /* @__PURE__ */ jsxs("div", { class: "grid grid-gutters", children: [
          /* @__PURE__ */ jsxs("div", { class: "lg:w-7/12", children: [
            /* @__PURE__ */ jsx("p", { class: "text-sm font-semibold mt-0 mb-2", children: "Pure CSS for app interfaces" }),
            /* @__PURE__ */ jsx(
              "h1",
              {
                id: "home-title",
                class: "text-4xl font-bold leading-tight mt-0 mb-4",
                style: "font-size: clamp(3rem, 4.2vw, 3.75rem)",
                children: "Build app interfaces with HTML that stays readable"
              }
            ),
            /* @__PURE__ */ jsx("p", { class: "max-w-prose text-lg leading-relaxed mt-0 mb-6", children: "Dragonglass turns semantic HTML into app interfaces with readable data-* component contracts, responsive layouts, focused utilities, and compiled themes. Install the CSS and start building." }),
            /* @__PURE__ */ jsxs("p", { class: "mt-0 mb-0", children: [
              /* @__PURE__ */ jsx(
                "a",
                {
                  "data-button": true,
                  class: "bg-primary text-lg p-3 mr-2 mb-2",
                  href: "#quick-start",
                  children: "Get started"
                }
              ),
              /* @__PURE__ */ jsx(
                "a",
                {
                  "data-link": "standalone",
                  class: "text-lg p-3 mb-2",
                  href: pathFor("AppComponents"),
                  "v-route": pathFor("AppComponents"),
                  children: "Browse components"
                }
              )
            ] })
          ] }),
          /* @__PURE__ */ jsxs("figure", { class: "lg:w-5/12 mt-6", children: [
            /* @__PURE__ */ jsx("figcaption", { class: "text-sm font-semibold mt-0 mb-2", children: "Markup and rendered result" }),
            /* @__PURE__ */ jsx(code_example_default, { code: firstSurfaceCode }),
            /* @__PURE__ */ jsxs("article", { "data-card": true, "data-markdown": "exclude", children: [
              /* @__PURE__ */ jsx("header", { children: /* @__PURE__ */ jsx("h2", { children: "Project: Dragonglass" }) }),
              /* @__PURE__ */ jsx("p", { children: "The team is reviewing the final interface states." }),
              /* @__PURE__ */ jsx("footer", { children: /* @__PURE__ */ jsx(
                "a",
                {
                  href: pathFor("AppComponents"),
                  "v-route": pathFor("AppComponents"),
                  children: "Open project"
                }
              ) })
            ] })
          ] })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsx(
      "section",
      {
        class: "bg-default-lightest text-black pt-12 pb-12",
        "aria-labelledby": "mental-model-title",
        children: /* @__PURE__ */ jsxs("div", { class: "container pl-4 pr-4", children: [
          /* @__PURE__ */ jsx(
            "h2",
            {
              id: "mental-model-title",
              class: "max-w-prose text-3xl font-semibold leading-tight mt-0 mb-3",
              children: "Write semantic HTML. Select a component. Refine the interface."
            }
          ),
          /* @__PURE__ */ jsx("p", { class: "max-w-prose text-lg mt-0 mb-8", children: "The markup keeps the structure, component, and visual adjustments easy to read." }),
          /* @__PURE__ */ jsx("div", { class: "grid grid-gutters", children: mentalModel.map(([title, body]) => /* @__PURE__ */ jsxs("div", { class: "md:w-4/12", children: [
            /* @__PURE__ */ jsx("h3", { class: "text-lg font-semibold mt-0 mb-2", children: title }),
            /* @__PURE__ */ jsx("p", { class: "mt-0 mb-4", children: body })
          ] })) }),
          /* @__PURE__ */ jsx("div", { class: "grid grid-gutters mt-4 mb-0", children: frameworkSummary.map((item) => /* @__PURE__ */ jsxs("span", { class: "md:w-4/12 font-semibold mb-2", children: [
            item,
            " "
          ] })) })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      "section",
      {
        id: "quick-start",
        class: "bg-white pt-12 pb-12",
        "aria-labelledby": "quick-start-title",
        children: /* @__PURE__ */ jsx("div", { class: "container pl-4 pr-4", children: /* @__PURE__ */ jsxs("div", { class: "grid grid-gutters", children: [
          /* @__PURE__ */ jsxs("div", { class: "md:w-4/12", children: [
            /* @__PURE__ */ jsx(
              "h2",
              {
                id: "quick-start-title",
                class: "text-3xl font-semibold leading-tight mt-0 mb-3",
                children: "Install Dragonglass and build your first card"
              }
            ),
            /* @__PURE__ */ jsx("p", { class: "text-lg mt-0 mb-4", children: "Install the package, import Dragonglass and one theme, then add semantic HTML." }),
            /* @__PURE__ */ jsxs("p", { class: "mt-0 mb-4", children: [
              "Import the theme after ",
              /* @__PURE__ */ jsx("code", { children: "dragonglass.css" }),
              " so it can provide the color tokens."
            ] })
          ] }),
          /* @__PURE__ */ jsxs("div", { class: "md:w-8/12", children: [
            /* @__PURE__ */ jsxs("figure", { children: [
              /* @__PURE__ */ jsx("figcaption", { class: "text-lg font-semibold mt-0 mb-2", children: "Step 1: Install the package" }),
              /* @__PURE__ */ jsx(code_example_default, { code: installCode })
            ] }),
            /* @__PURE__ */ jsxs("figure", { children: [
              /* @__PURE__ */ jsx("figcaption", { class: "text-lg font-semibold mt-0 mb-2", children: "Step 2: Import Dragonglass and a theme" }),
              /* @__PURE__ */ jsx(code_example_default, { code: importCode })
            ] }),
            /* @__PURE__ */ jsxs("figure", { children: [
              /* @__PURE__ */ jsx("figcaption", { class: "text-lg font-semibold mt-0 mb-2", children: "Step 3: Add your first card" }),
              /* @__PURE__ */ jsx(code_example_default, { code: firstSurfaceCode })
            ] }),
            /* @__PURE__ */ jsx("p", { class: "mt-0 mb-4", children: "Dragonglass styles the semantic regions and applies the card contract through data-card." }),
            /* @__PURE__ */ jsx("p", { class: "mt-0 mb-4", children: /* @__PURE__ */ jsx(
              "a",
              {
                "data-button": true,
                class: "bg-primary p-4",
                href: pathFor("Cards"),
                "v-route": pathFor("Cards"),
                children: "Explore card variants"
              }
            ) }),
            /* @__PURE__ */ jsx("p", { class: "mt-0 mb-0", children: /* @__PURE__ */ jsx(
              "a",
              {
                "data-link": "standalone",
                href: pathFor("AppComponents"),
                "v-route": pathFor("AppComponents"),
                children: "Browse all components"
              }
            ) })
          ] })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsx(
      "section",
      {
        class: "bg-default-lightest text-black pt-12 pb-12",
        "aria-labelledby": "components-title",
        children: /* @__PURE__ */ jsxs("div", { class: "container pl-4 pr-4", children: [
          /* @__PURE__ */ jsx(
            "h2",
            {
              id: "components-title",
              class: "max-w-prose text-3xl font-semibold leading-tight mt-0 mb-3",
              children: "Find components by what the interface needs to do"
            }
          ),
          /* @__PURE__ */ jsx("p", { class: "max-w-prose text-lg mt-0 mb-8", children: "Component guides show the available markup, variants, and states." }),
          /* @__PURE__ */ jsx("div", { class: "grid grid-gutters", children: componentCategories.map(([title, body]) => /* @__PURE__ */ jsxs("div", { class: "md:w-6/12", children: [
            /* @__PURE__ */ jsx("h3", { class: "text-lg font-semibold mt-0 mb-2", children: title }),
            /* @__PURE__ */ jsx("p", { class: "mt-0 mb-5", children: body })
          ] })) }),
          /* @__PURE__ */ jsx("p", { class: "max-w-prose mt-3 mb-4", children: "Use utilities for focused changes to spacing, layout, typography, color, borders, and elevation." }),
          /* @__PURE__ */ jsxs("p", { class: "mt-0 mb-0", children: [
            /* @__PURE__ */ jsx(
              "a",
              {
                "data-button": true,
                class: "bg-primary p-4 mr-2 mb-2",
                href: pathFor("AppComponents"),
                "v-route": pathFor("AppComponents"),
                children: "Browse all components"
              }
            ),
            /* @__PURE__ */ jsx(
              "a",
              {
                "data-link": "standalone",
                class: "p-3 mb-2",
                href: pathFor("Utilities"),
                "v-route": pathFor("Utilities"),
                children: "Open the utility reference"
              }
            )
          ] })
        ] })
      }
    ),
    /* @__PURE__ */ jsx(
      "section",
      {
        class: "bg-default-darkest text-white pt-12 pb-12",
        "aria-labelledby": "themes-title",
        children: /* @__PURE__ */ jsx("div", { class: "container pl-4 pr-4", children: /* @__PURE__ */ jsxs("div", { class: "grid grid-gutters", children: [
          /* @__PURE__ */ jsxs("div", { class: "md:w-4/12", children: [
            /* @__PURE__ */ jsx(
              "h2",
              {
                id: "themes-title",
                class: "text-3xl font-semibold leading-tight mt-0 mb-3",
                children: "Change the theme. Keep the component markup"
              }
            ),
            /* @__PURE__ */ jsx("p", { class: "mt-0 mb-5", children: "Dragonglass includes twelve compiled themes built on the same semantic token contract. Each theme supports light and dark color schemes while the component markup stays unchanged." }),
            /* @__PURE__ */ jsx("p", { class: "mt-0 mb-6", children: /* @__PURE__ */ jsx(
              "a",
              {
                "data-button": true,
                class: "bg-primary p-4",
                href: pathFor("Colors"),
                "v-route": pathFor("Colors"),
                children: "Explore themes and colors"
              }
            ) })
          ] }),
          /* @__PURE__ */ jsxs("div", { class: "md:w-8/12", children: [
            /* @__PURE__ */ jsx(
              "ul",
              {
                "data-list": true,
                class: "grid grid-gutters mt-0 mb-6",
                "aria-label": "Bundled themes",
                children: bundledThemes.map((theme) => /* @__PURE__ */ jsxs("li", { class: "w-1/2 md:w-1/4 mb-3", children: [
                  /* @__PURE__ */ jsx(
                    "span",
                    {
                      class: "h-8 border border-white mb-2 w-1/2",
                      style: `display: block; background-color: ${theme.primary}`,
                      "aria-hidden": "true"
                    }
                  ),
                  /* @__PURE__ */ jsx("span", { class: "w-1/2", children: theme.label })
                ] }))
              }
            ),
            /* @__PURE__ */ jsxs("figure", { children: [
              /* @__PURE__ */ jsx("figcaption", { class: "text-lg font-semibold mt-0 mb-2", children: "Compile a custom theme" }),
              /* @__PURE__ */ jsx("div", { class: "text-black", children: /* @__PURE__ */ jsx(code_example_default, { code: customThemeCode }) })
            ] })
          ] })
        ] }) })
      }
    ),
    /* @__PURE__ */ jsx(
      "section",
      {
        class: "bg-white pt-12 pb-12",
        "aria-labelledby": "documentation-title",
        children: /* @__PURE__ */ jsxs("div", { class: "container pl-4 pr-4", children: [
          /* @__PURE__ */ jsx(
            "h2",
            {
              id: "documentation-title",
              class: "max-w-prose text-3xl font-semibold leading-tight mt-0 mb-3",
              children: "Choose where to continue"
            }
          ),
          /* @__PURE__ */ jsx("p", { class: "max-w-prose text-lg mt-0 mb-8", children: "Go directly to the part of Dragonglass you need next." }),
          /* @__PURE__ */ jsx("div", { class: "grid grid-gutters", children: documentationPaths.map(({ title, body, href }, index) => /* @__PURE__ */ jsxs("article", { class: "md:w-6/12 mb-6", children: [
            /* @__PURE__ */ jsx(
              "h3",
              {
                class: `${index < 2 ? "text-xl" : "text-lg"} font-semibold mt-0 mb-2`,
                children: href.startsWith("/") ? /* @__PURE__ */ jsx(
                  "a",
                  {
                    "data-button": true,
                    class: "bg-default p-3",
                    href,
                    "v-route": href,
                    children: title
                  }
                ) : /* @__PURE__ */ jsx("a", { "data-button": true, class: "bg-default p-3", href, children: title })
              }
            ),
            /* @__PURE__ */ jsx("p", { class: "max-w-prose mt-0 mb-0", children: body })
          ] })) }),
          /* @__PURE__ */ jsx("hr", { class: "mt-4 mb-6" }),
          /* @__PURE__ */ jsxs("div", { class: "max-w-prose", children: [
            /* @__PURE__ */ jsx("h3", { class: "text-lg font-semibold mt-0 mb-2", children: "Browser support" }),
            /* @__PURE__ */ jsx("p", { class: "mt-0 mb-0", children: "Dragonglass supports Chrome 119+, Edge 119+, Firefox 121+, Safari 16.5+, and iOS Safari 16.5+." })
          ] })
        ] })
      }
    )
  ] }) });

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

  // site/src/docs/demo_section.tsx
  var DemoSection = ({ id, title }, ...children) => /* @__PURE__ */ jsxs("section", { "aria-labelledby": id, children: [
    /* @__PURE__ */ jsx("h2", { id, children: title }),
    children
  ] });
  var demo_section_default = DemoSection;

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

  // site/src/pages/layout_page.tsx
  var appShellCode = `<article>
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
      defaultValue: "Horizontal row",
      description: "Applies a horizontal, non-wrapping layout to links and buttons."
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
      description: "Applies the selected surface and text colors to a nav link."
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
      /* @__PURE__ */ jsx(code_example_default, { code: appShellCode })
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
        "The ",
        /* @__PURE__ */ jsx("code", { children: "data-toolbar" }),
        " attribute turns a nav into a wrapping row with toolbar spacing and a divider."
      ] })
    ] }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "layout-responsive", title: "Responsive behavior", children: /* @__PURE__ */ jsx("p", { children: "Standalone toolbars wrap when their actions exceed the current width. A toolbar nested in a header or footer stays on one row and overflows when its actions exceed the available width. Content sections own vertical scrolling and keep the page shell within the viewport." }) }),
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
      description: "Sets a fractional width. Both numbers range from 1 to 12, with part smaller than whole."
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
        /* @__PURE__ */ jsx("code", { children: "grid-gutters" }),
        " adds consistent spacing between columns."
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
    /* @__PURE__ */ jsx(demo_section_default, { id: "grid-api", title: "Grid API and breakpoints", children: /* @__PURE__ */ jsx(api_table_default, { caption: "Grid classes and breakpoints", rows: gridRows }) })
  ] });

  // site/src/pages/positioning_page.tsx
  var fixedCode = `<aside data-position>Top right by default</aside>
<aside data-position="top center">Top center</aside>
<aside data-position="bottom left">Bottom left</aside>
<aside data-position="center">Viewport center</aside>`;
  var absoluteCode = `<section class="relative min-h-64 border">
  <p data-position="absolute top left" class="bg-primary p-2">Top left</p>
  <p data-position="absolute center" class="bg-info p-2">Center</p>
  <p data-position="absolute bottom right" class="bg-success p-2">Bottom right</p>
</section>`;
  var apiRows2 = [
    {
      name: "data-position",
      type: "Attribute",
      defaultValue: "fixed top right",
      description: "Activates viewport positioning with top-right offsets from the spacing scale."
    },
    {
      name: "absolute",
      type: "Attribute token",
      defaultValue: "fixed",
      description: "Changes only the position mode to absolute. The containing block comes from an ancestor positioned by the application."
    },
    {
      name: "top | right | bottom | left",
      type: "Attribute token",
      defaultValue: "top right",
      description: "Selects one vertical edge and one horizontal edge using the standard spacing offset."
    },
    {
      name: "center",
      type: "Attribute token",
      defaultValue: "Absent",
      description: "Centers both axes alone, or the remaining axis when paired with an edge token."
    },
    {
      name: "Positioned ancestor",
      type: "Composition requirement",
      defaultValue: "Application controlled",
      description: "Provides the containing block for absolute positioning, commonly through the relative utility."
    }
  ];
  var positioning_page_default = () => /* @__PURE__ */ jsxs(doc_page_default, { page: "Positioning", children: [
    /* @__PURE__ */ jsxs(demo_section_default, { id: "positioning-fixed", title: "Fixed to the viewport", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "A bare ",
        /* @__PURE__ */ jsx("code", { children: "data-position" }),
        " uses fixed positioning at the top right. Combine one vertical token with one horizontal token. The following examples remain as markup so they do not cover this reference page."
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: fixedCode })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "positioning-absolute", title: "Absolute inside a container", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "Add ",
        /* @__PURE__ */ jsx("code", { children: "absolute" }),
        " to change only the positioning mode. The parent below uses ",
        /* @__PURE__ */ jsx("code", { children: "relative" }),
        " to establish the containing block."
      ] }),
      /* @__PURE__ */ jsxs("section", { class: "relative min-h-64 border", children: [
        /* @__PURE__ */ jsx("p", { "data-position": "absolute top left", class: "bg-primary p-2", children: "Top left" }),
        /* @__PURE__ */ jsx("p", { "data-position": "absolute center", class: "bg-info p-2", children: "Center" }),
        /* @__PURE__ */ jsx("p", { "data-position": "absolute bottom right", class: "bg-success p-2", children: "Bottom right" })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: absoluteCode })
    ] }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "positioning-combinations", title: "Supported combinations", children: /* @__PURE__ */ jsxs("p", { children: [
      "Use corners, ",
      /* @__PURE__ */ jsx("code", { children: "top center" }),
      ", ",
      /* @__PURE__ */ jsx("code", { children: "bottom center" }),
      ",",
      /* @__PURE__ */ jsx("code", { children: "left center" }),
      ", ",
      /* @__PURE__ */ jsx("code", { children: "right center" }),
      ", or",
      /* @__PURE__ */ jsx("code", { children: "center" }),
      ". Combinations with opposing edges are outside the contract."
    ] }) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "positioning-api", title: "API", children: /* @__PURE__ */ jsx(
      api_table_default,
      {
        caption: "Positioning attribute, tokens and composition requirements",
        rows: apiRows2
      }
    ) })
  ] });

  // site/src/pages/images_page.tsx
  var imageSource = "https://picsum.photos/id/1018/1200/800";
  var objectFitCode = `<img
  src="${imageSource}"
  alt="Mountain landscape"
  class="w-full h-64 object-cover object-center"
>`;
  var objectPositionCode = `<img
  src="${imageSource}"
  alt="Mountain landscape"
  class="w-full h-64 object-cover object-bottom-right"
>`;
  var backgroundCode = `<section
  class="min-h-64 bg-cover bg-bottom-right bg-no-repeat"
  style="background-image: url('${imageSource}')"
  role="img"
  aria-label="Mountain landscape"
></section>`;
  var apiRows3 = [
    {
      name: "w-full | h-full | h-auto",
      type: "Sizing utility",
      defaultValue: "width: auto; height: auto",
      description: "Controls the media box width and height."
    },
    {
      name: "object-cover | object-contain | object-fill | object-none | object-scale-down",
      type: "Object-fit utility",
      defaultValue: "fill",
      description: "Controls how an img fits inside its content box."
    },
    {
      name: "object-{position}",
      type: "Object-position utility",
      defaultValue: "center",
      description: "Selects one of nine focal positions from top-left through bottom-right."
    },
    {
      name: "bg-auto | bg-cover | bg-contain",
      type: "Background-size utility",
      defaultValue: "auto",
      description: "Controls the rendered background image size."
    },
    {
      name: "bg-{position}",
      type: "Background-position utility",
      defaultValue: "top-left",
      description: "Selects one of the same nine focal positions for a background image."
    },
    {
      name: "bg-repeat | bg-no-repeat",
      type: "Background-repeat utility",
      defaultValue: "repeat",
      description: "Enables or disables background image repetition."
    }
  ];
  var images_page_default = () => /* @__PURE__ */ jsxs(doc_page_default, { page: "Images", children: [
    /* @__PURE__ */ jsxs(demo_section_default, { id: "images-object-fit", title: "Fit an image inside its box", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "Set the image box dimensions, then use an ",
        /* @__PURE__ */ jsx("code", { children: "object-*" }),
        " utility to control the fit and focal point."
      ] }),
      /* @__PURE__ */ jsx(
        "img",
        {
          src: imageSource,
          alt: "Mountain landscape",
          class: "w-full h-64 object-cover object-center"
        }
      ),
      /* @__PURE__ */ jsx(code_example_default, { code: objectFitCode })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "images-object-position", title: "Move the image focal point", children: [
      /* @__PURE__ */ jsx("p", { children: "Position utilities use a nine-point grid shared with background images." }),
      /* @__PURE__ */ jsx(
        "img",
        {
          src: imageSource,
          alt: "Mountain landscape",
          class: "w-full h-64 object-cover object-bottom-right"
        }
      ),
      /* @__PURE__ */ jsx(code_example_default, { code: objectPositionCode })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "images-background", title: "Position a background image", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "Keep the image URL in the standard ",
        /* @__PURE__ */ jsx("code", { children: "background-image" }),
        " style. Utilities control size, position and repetition."
      ] }),
      /* @__PURE__ */ jsx(
        "section",
        {
          class: "min-h-64 bg-cover bg-bottom-right bg-no-repeat",
          style: `background-image: url('${imageSource}')`,
          role: "img",
          "aria-label": "Mountain landscape"
        }
      ),
      /* @__PURE__ */ jsx(code_example_default, { code: backgroundCode })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "images-card-media", title: "Adjust card media", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "Background utilities load after card defaults, so they can move a",
        /* @__PURE__ */ jsx("code", { children: " data-media" }),
        " focal point without changing the card contract."
      ] }),
      /* @__PURE__ */ jsx(
        code_example_default,
        {
          code: `<section
  data-media
  class="bg-cover bg-bottom-right bg-no-repeat"
  style="background-image: url('${imageSource}')"
></section>`
        }
      )
    ] }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "images-api", title: "API", children: /* @__PURE__ */ jsx(
      api_table_default,
      {
        caption: "Image sizing, fitting, position and background utilities",
        rows: apiRows3
      }
    ) })
  ] });

  // site/src/pages/elevations_page.tsx
  var shadowSizes = ["2xs", "xs", "sm", "base", "lg", "xl", "2xl", "3xl"];
  var shadowExample = `<div class="shadow-base bg-white p-4">Raised surface</div>`;
  var innerShadowExample = `<div class="shadow-inner-base bg-white p-4">Inset surface</div>`;
  var stateExample = `<button type="button" class="shadow-base hover:shadow-3xl active:shadow-sm">Change elevation</button>
<input aria-label="Focus elevation example" class="shadow-base focus:shadow-3xl bg-white" value="Focus this field">`;
  var shadowTokenExample = `<div class="shadow-base bg-white p-4">Token-backed surface</div>`;
  var textShadowExample = `<p class="bg-primary text-white text-shadow-sm p-4">Small text shadow</p>
<p class="bg-primary text-white text-shadow-base p-4">Base text shadow</p>
<p class="bg-primary text-white text-shadow-lg p-4">Large text shadow</p>
<p class="bg-primary text-white text-shadow-none p-4">No text shadow</p>`;
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
        "."
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
      /* @__PURE__ */ jsx("p", { children: "State precedence follows interaction intent instead of shadow size. A hover or focus utility overrides the base elevation, and an active utility overrides both while the control is pressed." }),
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
      /* @__PURE__ */ jsx(code_example_default, { code: stateExample }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Elevation changes transition only ",
        /* @__PURE__ */ jsx("code", { children: "box-shadow" }),
        " with",
        /* @__PURE__ */ jsx("code", { children: " --motion-duration-base" }),
        " and",
        /* @__PURE__ */ jsx("code", { children: " --motion-easing-standard" }),
        "."
      ] })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "text-shadows", title: "Text shadows", children: [
      /* @__PURE__ */ jsx("p", { children: "Text shadows separate lettering from media. Keep a scrim or another sufficient contrast surface behind important text." }),
      /* @__PURE__ */ jsx("p", { class: "bg-primary text-white text-shadow-sm p-4", children: "Small text shadow" }),
      /* @__PURE__ */ jsx("p", { class: "bg-primary text-white text-shadow-base p-4", children: "Base text shadow" }),
      /* @__PURE__ */ jsx("p", { class: "bg-primary text-white text-shadow-lg p-4", children: "Large text shadow" }),
      /* @__PURE__ */ jsx("p", { class: "bg-primary text-white text-shadow-none p-4", children: "No text shadow" }),
      /* @__PURE__ */ jsx(code_example_default, { code: textShadowExample })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "shadow-api", title: "Shadow tokens", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "Each outer utility reads its matching ",
        /* @__PURE__ */ jsx("code", { children: "--shadow-*" }),
        " token, and each inset utility reads the matching ",
        /* @__PURE__ */ jsx("code", { children: "--shadow-inner-*" }),
        "token. A token override changes that elevation value across every use of the utility."
      ] }),
      /* @__PURE__ */ jsx("div", { class: "shadow-base bg-white p-4", children: "Token-backed surface" }),
      /* @__PURE__ */ jsx(code_example_default, { code: shadowTokenExample }),
      /* @__PURE__ */ jsx(api_table_default, { caption: "Outer and inner shadow tokens", rows: shadowRows })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "z-index-scale", title: "Z-index scale", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "Outer shadow utilities retain a z-index derived from their elevation level. Explicit stacking overrides include ",
        /* @__PURE__ */ jsx("code", { children: "z-auto" }),
        ",",
        /* @__PURE__ */ jsx("code", { children: " z-negative-10" }),
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
        ",",
        " ",
        /* @__PURE__ */ jsx("code", { children: "z-16" }),
        " or",
        /* @__PURE__ */ jsx("code", { children: " z-1000" }),
        "."
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: zIndexExample })
    ] })
  ] });

  // site/src/docs/theme_menu.tsx
  var ThemeLink = ({
    currentThemeName,
    colorScheme,
    currentColorScheme,
    theme
  }) => {
    const content = theme.label;
    const path = themeRoutePath(theme.name, colorScheme);
    if (currentThemeName === theme.name && currentColorScheme === colorScheme) {
      return /* @__PURE__ */ jsx("span", { "data-markdown": "include-descendants", children: /* @__PURE__ */ jsx("a", { href: path, "v-route": path, "aria-current": "page", children: content }) });
    }
    return /* @__PURE__ */ jsx("span", { "data-markdown": "include-descendants", children: /* @__PURE__ */ jsx("a", { href: path, "v-route": path, children: content }) });
  };
  var ThemeMenu = ({
    colorScheme,
    currentColorScheme,
    currentThemeName
  }) => /* @__PURE__ */ jsx(
    "nav",
    {
      "aria-label": colorScheme === "dark" ? "Dark theme previews" : "Theme previews",
      children: bundledThemes.map((theme) => /* @__PURE__ */ jsx(
        ThemeLink,
        {
          colorScheme,
          currentColorScheme,
          currentThemeName,
          theme
        }
      ))
    }
  );
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
  var transparentBackgroundExample = `<div class="bg-transparent p-3">Transparent background</div>
<div class="bg-scrim text-white p-3">Scrim background</div>
<div class="bg-media-scrim text-white p-3">Media scrim background</div>`;
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
  var darkModeExample = `<html data-color-scheme="dark"></html>`;
  var colorRows = colors.flatMap(
    (color) => weights.map((weight) => ({
      name: `--${color}${weight}`,
      type: "CSS color token",
      defaultValue: color,
      description: `Used by bg-${color}${weight}, text-${color}${weight}, border-${color}${weight} and outline-${color}${weight}.`
    }))
  );
  var ColorsPage = ({
    colorScheme = "light",
    themeName
  } = {}) => {
    let route = routeByPage.get("Colors");
    if (typeof themeName === "string") {
      if (colorScheme !== "light" && colorScheme !== "dark") {
        throw new Error(`Color scheme not found for theme: ${themeName}`);
      }
      route = routeByPath.get(themeRoutePath(themeName, colorScheme));
    }
    if (!route) {
      throw new Error(
        "Documentation metadata not found for Colors or theme page"
      );
    }
    return /* @__PURE__ */ jsxs(layout_default, { currentPath: route.path, children: [
      /* @__PURE__ */ jsx("h1", { children: route.label }),
      /* @__PURE__ */ jsx("p", { children: route.description }),
      /* @__PURE__ */ jsxs("header", { children: [
        /* @__PURE__ */ jsx("h2", { children: "Browse light themes" }),
        /* @__PURE__ */ jsx(
          theme_menu_default,
          {
            colorScheme: "light",
            currentColorScheme: colorScheme,
            currentThemeName: themeName
          }
        )
      ] }),
      /* @__PURE__ */ jsxs("header", { children: [
        /* @__PURE__ */ jsx("h2", { children: "Browse dark themes" }),
        /* @__PURE__ */ jsx(
          theme_menu_default,
          {
            colorScheme: "dark",
            currentColorScheme: colorScheme,
            currentThemeName: themeName
          }
        )
      ] }),
      /* @__PURE__ */ jsxs(demo_section_default, { id: "color-palette", title: "Background and text colors", children: [
        /* @__PURE__ */ jsx("p", { children: "Each semantic color includes lightest, lighter, light, base, dark, darker and darkest tokens. White and black remain the global contrast extremes." }),
        /* @__PURE__ */ jsx("div", { class: "bg-primary p-3", children: "Primary background" }),
        /* @__PURE__ */ jsx("p", { class: "text-primary-dark", "data-markdown": "exclude", children: "Primary dark text" }),
        /* @__PURE__ */ jsx(code_example_default, { code: paletteExample }),
        /* @__PURE__ */ jsx("div", { class: "grid-gutters", children: colors.map((color) => /* @__PURE__ */ jsxs("div", { class: "md:w-1/4 lg:w-1/7", children: [
          weights.map((weight) => /* @__PURE__ */ jsx("div", { class: `bg-${color}${weight} p-3`, children: `bg-${color}${weight}` })),
          weights.map((weight) => /* @__PURE__ */ jsx("div", { class: `text-${color}${weight} p-3`, children: `text-${color}${weight}` }))
        ] })) })
      ] }),
      /* @__PURE__ */ jsxs(demo_section_default, { id: "transparent-backgrounds", title: "Transparent backgrounds", children: [
        /* @__PURE__ */ jsx("p", { children: "These utilities change only the background color and preserve the current text color." }),
        /* @__PURE__ */ jsx("div", { class: "bg-transparent p-3", children: "Transparent background" }),
        /* @__PURE__ */ jsx("div", { class: "bg-scrim text-white p-3", children: "Scrim background" }),
        /* @__PURE__ */ jsx("div", { class: "bg-media-scrim text-white p-3", children: "Media scrim background" }),
        /* @__PURE__ */ jsx(code_example_default, { code: transparentBackgroundExample })
      ] }),
      /* @__PURE__ */ jsxs(demo_section_default, { id: "color-buttons", title: "Buttons by color", children: [
        colors.map((color) => /* @__PURE__ */ jsx("button", { type: "button", class: `bg-${color}`, children: color })),
        /* @__PURE__ */ jsx(code_example_default, { code: buttonExample })
      ] }),
      /* @__PURE__ */ jsxs(demo_section_default, { id: "color-fields", title: "Form fields by color", children: [
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
          "The Sass theme module derives every semantic family, weight, foreground and progress color from one opaque primary. Every base uses its lightest family token as foreground. The compiler accepts an OKLCH primary lightness from 42% through 56% and a contrast ratio of at least 4.5:1 for that pair. The compiled theme loads after",
          /* @__PURE__ */ jsx("code", { children: " dragonglass.css" }),
          "."
        ] }),
        /* @__PURE__ */ jsx(code_example_default, { code: customThemeExample }),
        /* @__PURE__ */ jsx("pre", { children: /* @__PURE__ */ jsx("code", { children: "bunx sass --pkg-importer=node theme.scss theme.css --style=compressed" }) }),
        /* @__PURE__ */ jsx("p", { children: "A theme selector around each mixin call lets one stylesheet contain several themes." }),
        /* @__PURE__ */ jsx(code_example_default, { code: scopedThemesExample })
      ] }),
      /* @__PURE__ */ jsxs(demo_section_default, { id: "dark-mode", title: "Automatic dark mode", children: [
        /* @__PURE__ */ jsxs("p", { children: [
          "Each theme derives dark structural roles from the same primary and follows ",
          /* @__PURE__ */ jsx("code", { children: "prefers-color-scheme" }),
          " automatically. The",
          /* @__PURE__ */ jsx("code", { children: " data-color-scheme" }),
          " attribute on the root element forces light or dark mode."
        ] }),
        /* @__PURE__ */ jsx(code_example_default, { code: darkModeExample })
      ] }),
      /* @__PURE__ */ jsxs(demo_section_default, { id: "color-api", title: "Color tokens", children: [
        /* @__PURE__ */ jsx("p", { children: "Semantic custom properties expose token values directly as an alternative to generated color utility classes." }),
        /* @__PURE__ */ jsx("div", { style: "background-color: var(--primary); color: var(--primary-darker)", children: "Primary token preview" }),
        /* @__PURE__ */ jsx(code_example_default, { code: colorTokenExample }),
        /* @__PURE__ */ jsx(api_table_default, { caption: "Semantic color custom properties", rows: colorRows })
      ] })
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
    ["3xl", "2.25rem"],
    ["4xl", "3rem"],
    ["5xl", "3.75rem"],
    ["6xl", "4.5rem"]
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
  var composedExample = `<p class="text-base italic font-light capitalize text-justify leading-loose">Dragonglass typography utility preview.</p>`;
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
      /* @__PURE__ */ jsx("p", { class: "text-base italic font-light capitalize text-justify leading-loose", children: "Dragonglass typography utility preview." }),
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
    /* @__PURE__ */ jsx(demo_section_default, { id: "font-api", title: "Typography API", children: /* @__PURE__ */ jsx(api_table_default, { caption: "Typography utilities and tokens", rows: fontRows }) })
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
    /* @__PURE__ */ jsx(demo_section_default, { id: "badge-colors", title: "Badge colors", children: /* @__PURE__ */ jsx("div", { class: "grid-gutters", children: colors2.map((color) => {
      const code = `<span data-badge="1" class="after:bg-${color}">1 notification</span>`;
      return /* @__PURE__ */ jsxs("div", { class: "md:w-1/3", children: [
        /* @__PURE__ */ jsx("span", { "data-badge": "1", class: `after:bg-${color}`, children: "1 notification" }),
        /* @__PURE__ */ jsx(code_example_default, { code })
      ] });
    }) }) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "badge-api", title: "Badge API", children: /* @__PURE__ */ jsx(
      api_table_default,
      {
        caption: "Badge attributes and color utilities",
        rows: badgeRows
      }
    ) })
  ] });

  // site/src/pages/buttons_page.tsx
  var statesCode = `<button type="button">Plain button</button>
<button type="button" disabled>Disabled button</button>
<button type="button" aria-disabled="true">ARIA-disabled button</button>`;
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
  var apiRows4 = [
    {
      name: "button",
      type: "Element",
      defaultValue: "Plain",
      description: "Receives the base button styling."
    },
    {
      name: "disabled",
      type: "State",
      defaultValue: "Absent",
      description: "Applies unavailable opacity, cursor and pointer-event styles."
    },
    {
      name: 'aria-disabled="true"',
      type: "State",
      defaultValue: "Absent",
      description: "Applies the same visual unavailable state as disabled."
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
      /* @__PURE__ */ jsx("button", { type: "button", "aria-disabled": "true", children: "ARIA-disabled button" }),
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
    /* @__PURE__ */ jsx(demo_section_default, { id: "button-responsive", title: "Responsive behavior", children: /* @__PURE__ */ jsx("p", { children: "Buttons keep their labels on one line. A surrounding toolbar wraps when space is limited. FAB dimensions scale with their text size." }) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "button-api", title: "API", children: /* @__PURE__ */ jsx(
      api_table_default,
      {
        caption: "Button elements, attributes, states and tokens",
        rows: apiRows4
      }
    ) })
  ] });

  // site/src/pages/links_page.tsx
  var inlineCode = `<p>Read the <a data-link href="/dragonglass/layout.html">layout guide</a> before composing a page.</p>`;
  var standaloneCode = `<p>
  <a data-link="standalone" href="/dragonglass/app-components.html">View all components</a>
</p>`;
  var quietCode = `<p>
  Updated yesterday by <a data-link="quiet" href="/dragonglass">Ana</a>.
  <a data-link="standalone quiet" href="/dragonglass/app-components.html">View activity</a>
</p>`;
  var apiRows5 = [
    {
      name: "a[data-link]",
      type: "Element and attribute",
      defaultValue: "Inline",
      description: "Applies the persistent underline treatment to an anchor with an href."
    },
    {
      name: "standalone",
      type: "Attribute token",
      defaultValue: "Absent",
      description: "Adds emphasis for a standalone action and reveals its underline on interaction."
    },
    {
      name: "quiet",
      type: "Attribute token",
      defaultValue: "Absent",
      description: "Uses secondary text color until hover or focus restores primary text color."
    },
    {
      name: "standalone quiet",
      type: "Combined attribute tokens",
      defaultValue: "Absent",
      description: "Combines standalone emphasis with the quieter resting color."
    },
    {
      name: "Focus state",
      type: "State",
      defaultValue: "Global link focus",
      description: "Keeps the framework focus indicator in addition to each link treatment."
    }
  ];
  var links_page_default = () => /* @__PURE__ */ jsxs(doc_page_default, { page: "Links", children: [
    /* @__PURE__ */ jsxs(demo_section_default, { id: "link-inline", title: "Inline link", children: [
      /* @__PURE__ */ jsx("p", { children: "Inline links keep a visible underline so they remain identifiable inside surrounding copy." }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Read the",
        " ",
        /* @__PURE__ */ jsx(
          "a",
          {
            "data-link": true,
            href: "/dragonglass/layout.html",
            "v-route": "/dragonglass/layout.html",
            children: "layout guide"
          }
        ),
        " ",
        "before composing a page."
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: inlineCode })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "link-standalone", title: "Standalone link", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "The ",
        /* @__PURE__ */ jsx("code", { children: "standalone" }),
        " token presents a link as an independent action without giving it button semantics."
      ] }),
      /* @__PURE__ */ jsx("p", { children: /* @__PURE__ */ jsx(
        "a",
        {
          "data-link": "standalone",
          href: "/dragonglass/app-components.html",
          "v-route": "/dragonglass/app-components.html",
          children: "View all components"
        }
      ) }),
      /* @__PURE__ */ jsx(code_example_default, { code: standaloneCode })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "link-quiet", title: "Quiet and combined links", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "The ",
        /* @__PURE__ */ jsx("code", { children: "quiet" }),
        " token lowers resting emphasis. Tokens are space-separated and may be combined on the same ",
        /* @__PURE__ */ jsx("code", { children: "data-link" }),
        "attribute."
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Updated yesterday by",
        " ",
        /* @__PURE__ */ jsx("a", { "data-link": "quiet", href: "/dragonglass", "v-route": "/dragonglass", children: "Ana" }),
        ".",
        " ",
        /* @__PURE__ */ jsx(
          "a",
          {
            "data-link": "standalone quiet",
            href: "/dragonglass/app-components.html",
            "v-route": "/dragonglass/app-components.html",
            children: "View activity"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: quietCode })
    ] }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "link-api", title: "API", children: /* @__PURE__ */ jsx(api_table_default, { caption: "Link elements, variants and states", rows: apiRows5 }) })
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
    <p>This card uses the elevated variant.</p>
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
    <p>The summary spans the full available content width.</p>
  </section>
  <footer>
    <a href="/dragonglass">Browse documentation</a>
  </footer>
</article>`;
  var cards_page_default = () => /* @__PURE__ */ jsxs(doc_page_default, { page: "Cards", children: [
    /* @__PURE__ */ jsxs(demo_section_default, { id: "cards-basic-title", title: "Basic and elevated cards", children: [
      /* @__PURE__ */ jsx("p", { children: "A basic card groups content in the normal page flow. The elevated variant adds stronger visual emphasis to the same structure." }),
      /* @__PURE__ */ jsx("article", { "data-card": true, children: /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsx("h3", { children: "Release notes" }),
        /* @__PURE__ */ jsx("p", { children: "Review the latest component changes." })
      ] }) }),
      /* @__PURE__ */ jsx(code_example_default, { code: basicCardExample }),
      /* @__PURE__ */ jsx("article", { "data-card": "elevated", children: /* @__PURE__ */ jsxs("section", { children: [
        /* @__PURE__ */ jsx("h3", { children: "Elevated card" }),
        /* @__PURE__ */ jsx("p", { children: "This card uses the elevated variant." })
      ] }) }),
      /* @__PURE__ */ jsx(code_example_default, { code: elevatedCardExample })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "cards-structured-title", title: "Header, content and footer", children: [
      /* @__PURE__ */ jsx("p", { children: "Direct header, section and footer regions separate the title, supporting content and action area." }),
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
        /* @__PURE__ */ jsx("footer", { children: /* @__PURE__ */ jsx("a", { href: "/dragonglass/alerts.html", "v-route": "/dragonglass/alerts.html", children: "Review alerts" }) })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: structuredCardExample })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "cards-media-title", title: "Media and square cards", children: [
      /* @__PURE__ */ jsx("p", { children: "A media region adds an image to the card content. The squared variant creates compact, equal-ratio tiles." }),
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
        /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsx("h3", { children: "Field report" }) })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: mediaCardExample }),
      /* @__PURE__ */ jsx("article", { "data-card": "squared", children: /* @__PURE__ */ jsxs("section", { "data-media": true, class: "bg-primary", children: [
        /* @__PURE__ */ jsx("header", { children: /* @__PURE__ */ jsx("h3", { children: "May release" }) }),
        /* @__PURE__ */ jsx("section", { children: "Available May 24 from 7 to 11 p.m." })
      ] }) }),
      /* @__PURE__ */ jsx(code_example_default, { code: squareCardExample })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "cards-full-width-title", title: "Full-width card", children: [
      /* @__PURE__ */ jsx("p", { children: "The full-width variant gives summaries the complete content row instead of a compact card column." }),
      /* @__PURE__ */ jsxs("article", { "data-card": "full-width", children: [
        /* @__PURE__ */ jsx("header", { children: /* @__PURE__ */ jsx("h3", { children: "Documentation status" }) }),
        /* @__PURE__ */ jsx("section", { children: /* @__PURE__ */ jsx("p", { children: "The summary spans the full available content width." }) }),
        /* @__PURE__ */ jsx("footer", { children: /* @__PURE__ */ jsx("a", { href: "/dragonglass", "v-route": "/dragonglass", children: "Browse documentation" }) })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: fullWidthCardExample })
    ] }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "cards-api-title", title: "API", children: /* @__PURE__ */ jsx(
      api_table_default,
      {
        caption: "Card elements, attributes, tokens and states",
        rows: [
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
    ) })
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
  <section>Settings use the available viewport width.</section>
</dialog>

<dialog open class="static" data-dialog="no-shadow" aria-labelledby="embedded-dialog-title">
  <header><h3 id="embedded-dialog-title">Embedded decision</h3></header>
  <section>The surrounding surface supplies separation without elevation.</section>
</dialog>`;
  var apiRows6 = [
    {
      name: "dialog",
      type: "Element",
      defaultValue: "Closed",
      description: "Receives centered, elevated surface styling."
    },
    {
      name: "open",
      type: "State",
      defaultValue: "Absent",
      description: "Displays the dialog with its flex layout."
    },
    {
      name: 'data-dialog="squared"',
      type: "Attribute token",
      defaultValue: "Standard shape",
      description: "Applies the squared card dimensions and media layout."
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
      description: "Removes dialog elevation."
    },
    {
      name: "--dialog-radius",
      type: "Token",
      defaultValue: "Theme value",
      description: "Controls the corner radius of standard dialogs."
    },
    {
      name: "--motion-duration-base / --motion-easing-enter / --motion-easing-exit",
      type: "Motion token",
      defaultValue: "200ms / ease-out / ease-in",
      description: "Control supported opening and closing transitions for the dialog surface and backdrop."
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
            /* @__PURE__ */ jsx("section", { children: "Settings use the available viewport width." })
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
            /* @__PURE__ */ jsx("section", { children: "The surrounding surface supplies separation without elevation." })
          ]
        }
      ),
      /* @__PURE__ */ jsx(code_example_default, { code: dialogVariantsCode })
    ] }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "dialog-composition", title: "Composition", children: /* @__PURE__ */ jsxs("p", { children: [
      "A dialog accepts direct ",
      /* @__PURE__ */ jsx("code", { children: "header" }),
      ", ",
      /* @__PURE__ */ jsx("code", { children: "section" }),
      " and",
      /* @__PURE__ */ jsx("code", { children: "footer" }),
      " children. The ",
      /* @__PURE__ */ jsx("code", { children: "static" }),
      " utility keeps these open previews in the document flow. The default position centers the dialog."
    ] }) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "dialog-responsive", title: "Responsive behavior", children: /* @__PURE__ */ jsxs("p", { children: [
      "Standard dialogs size to their content. The ",
      /* @__PURE__ */ jsx("code", { children: "full-width" }),
      "token leaves a one-rem viewport gap. Long body content scrolls without moving the header or footer actions."
    ] }) }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "dialog-motion", title: "Motion", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "Transitions and starting styles reveal a non-static dialog through opacity and a short vertical translation. The modal stays open with",
        /* @__PURE__ */ jsx("code", { children: "data-closing" }),
        " while its surface and backdrop animate, then",
        /* @__PURE__ */ jsx("code", { children: "close()" }),
        " completes the exit."
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "The ",
        /* @__PURE__ */ jsx("code", { children: "static" }),
        " utility excludes documentation previews and embedded dialogs from this motion. When a user requests reduced motion, the dialog and its backdrop change state without transitions or spatial movement."
      ] })
    ] }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "dialog-accessibility", title: "Accessibility", children: /* @__PURE__ */ jsxs("p", { children: [
      "The examples connect each dialog to its heading with",
      /* @__PURE__ */ jsx("code", { children: "aria-labelledby" }),
      ". A dialog opened with",
      /* @__PURE__ */ jsx("code", { children: "showModal()" }),
      " blocks the page and supports Escape. Focus behavior follows the native dialog API."
    ] }) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "dialog-api", title: "API", children: /* @__PURE__ */ jsx(
      api_table_default,
      {
        caption: "Dialog elements, attributes, states and tokens",
        rows: apiRows6
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
      description: "Removes list markers and applies the application-row layout."
    },
    {
      name: "ol[data-list]",
      type: "Element and attribute",
      defaultValue: "Numbered",
      description: "Generates numbered application rows with an internal counter."
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
      description: "Fills the primary row region or stays compact as the second child."
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
    /* @__PURE__ */ jsx(demo_section_default, { id: "list-api", title: "API", children: /* @__PURE__ */ jsx(api_table_default, { caption: "List elements and row regions", rows: listRows }) })
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
  var apiRows7 = [
    {
      name: "input, select, textarea",
      type: "Element",
      defaultValue: "Full width",
      description: "Receives full-width Dragonglass field styling."
    },
    {
      name: "label[for]",
      type: "Element",
      defaultValue: "for attribute present",
      description: "Receives inline label spacing and a pointer cursor."
    },
    {
      name: "fieldset and legend",
      type: "Element",
      defaultValue: "No border",
      description: "Removes the fieldset border and styles its direct legend."
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
      description: "Displays a checkbox as a switch."
    },
    {
      name: 'aria-invalid="true"',
      type: "State",
      defaultValue: "Absent",
      description: "Applies danger colors to the control and matching wrapper content."
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
      description: "Aligns a fieldset and submit action in a flexible row."
    },
    {
      name: "input[type=search]",
      type: "Element / attribute",
      defaultValue: "Empty",
      description: "Fills the available width and removes the default bottom margin."
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
    /* @__PURE__ */ jsx(demo_section_default, { id: "forms-composition", title: "Composition", children: /* @__PURE__ */ jsxs("p", { children: [
      "Inside ",
      /* @__PURE__ */ jsx("code", { children: "data-floating" }),
      ", the control precedes its",
      /* @__PURE__ */ jsx("code", { children: " label" }),
      " because the sibling selectors drive the visual label state."
    ] }) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "forms-responsive", title: "Responsive behavior", children: /* @__PURE__ */ jsx("p", { children: "Text controls fill the available width, textareas resize vertically and range inputs preserve their full track. The surrounding form or card controls column width." }) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "forms-motion", title: "State motion", children: /* @__PURE__ */ jsx("p", { children: "Fields transition only their border and text color. Toggle thumbs communicate checked states through color and horizontal movement, while floating labels use transforms for focus states. When a user requests reduced motion, toggle thumbs and floating labels change state without a transition. Their checked, focused, valid, and invalid states remain visible." }) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "forms-api", title: "API", children: /* @__PURE__ */ jsx(
      api_table_default,
      {
        caption: "Form elements, attributes, states and tokens",
        rows: apiRows7
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
      description: "Accepts top, bottom, left or right. An absent attribute uses top."
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
      /* @__PURE__ */ jsx(
        "span",
        {
          "data-tooltip": "This is a tooltip",
          "data-markdown": "exclude",
          class: "inline",
          children: "This span has a tooltip"
        }
      ),
      /* @__PURE__ */ jsx(code_example_default, { code: spanExample })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "tooltip-colors", title: "Tooltip colors", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "Apply after:bg-",
        "{color}",
        " to select a semantic tooltip background. Dragonglass supports primary, accent, info, success, warning, danger, and default."
      ] }),
      colors3.map((color) => {
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
      })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "tooltip-directions", title: "Tooltip directions", children: [
      /* @__PURE__ */ jsx("p", { children: "Set data-tooltip-position to bottom, left, or right. An omitted attribute places the tooltip above its trigger." }),
      directions.map((direction) => {
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
      })
    ] }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "tooltip-api", title: "Tooltip API", children: /* @__PURE__ */ jsx(
      api_table_default,
      {
        caption: "Tooltip attributes and color utilities",
        rows: tooltipRows
      }
    ) })
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
    /* @__PURE__ */ jsx("a", { href: "/dragonglass/forms.html", "v-route": "/dragonglass/forms.html", children: "Profile settings" }),
    /* @__PURE__ */ jsx("button", { type: "button", "aria-label": "Add profile to favorites", children: /* @__PURE__ */ jsx("i", { class: "material-icons", "aria-hidden": "true", children: "star" }) })
  ] });
  var menus_page_default = () => /* @__PURE__ */ jsxs(doc_page_default, { page: "Menus", children: [
    /* @__PURE__ */ jsxs(demo_section_default, { id: "menus-basic-title", title: "Action menu", children: [
      /* @__PURE__ */ jsxs("details", { "data-trigger": true, open: true, children: [
        /* @__PURE__ */ jsx("summary", { children: "Account menu" }),
        /* @__PURE__ */ jsxs("menu", { children: [
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: "/dragonglass/forms.html", "v-route": "/dragonglass/forms.html", children: "Profile settings" }) }),
          /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("button", { type: "button", children: "Sign out" }) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: menuExample })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "menus-position-title", title: "Menu positions", children: [
      /* @__PURE__ */ jsx("p", { children: "The top and right tokens change the default bottom-left placement. Their combination opens the menu above the trigger and aligns it to the right edge." }),
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
    /* @__PURE__ */ jsxs(demo_section_default, { id: "menus-motion-title", title: "Motion and accessibility", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "Starting styles, inert CSS interactivity, and the native details content pseudo-element reveal the menu from ",
        /* @__PURE__ */ jsx("code", { children: "opacity: 0" }),
        " and",
        /* @__PURE__ */ jsx("code", { children: "scale(.98)" }),
        ". The open state uses ",
        /* @__PURE__ */ jsx("code", { children: "opacity: 1" }),
        " and",
        /* @__PURE__ */ jsx("code", { children: "scale(1)" }),
        ". During close, the content remains visible for the animation while its actions stay inactive."
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "Reduced motion changes the menu state without a transition or transform. Native ",
        /* @__PURE__ */ jsx("code", { children: "details" }),
        " and ",
        /* @__PURE__ */ jsx("code", { children: "summary" }),
        " provide keyboard operation. Every icon-only action has an accessible name."
      ] })
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
            description: "Matches the trigger, its direct menu and the menu's direct rows."
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
            name: "--card-radius / --surface-raised / --text-primary / --border-default",
            type: "Token",
            defaultValue: "Theme",
            description: "Control menu corners, surface, text and border colors."
          },
          {
            name: "--motion-duration-fast / --motion-duration-base / --motion-easing-enter / --motion-easing-exit",
            type: "Motion token",
            defaultValue: "120ms / 200ms / ease-out / ease-in",
            description: "Control the menu's opacity and transform transition without changing its state contract."
          }
        ]
      }
    ) })
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
      name: "data-label",
      type: "td attribute",
      defaultValue: "Absent",
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
    return /* @__PURE__ */ jsxs("table", { ...attributes, "data-markdown": "exclude", children: [
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
    /* @__PURE__ */ jsxs(demo_section_default, { id: "table-colors", title: "Table colors", children: [
      /* @__PURE__ */ jsx("p", { children: "Set data-table to a semantic color token to apply that tone to the responsive table. Dragonglass supports primary, accent, success, info, warning, danger, and default." }),
      colors4.map((color) => /* @__PURE__ */ jsxs("div", { children: [
        /* @__PURE__ */ jsx(Table, { color }),
        /* @__PURE__ */ jsx(code_example_default, { code: tableCode(color) })
      ] }))
    ] }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "table-api", title: "Table API", children: /* @__PURE__ */ jsx(api_table_default, { caption: "Responsive table attributes", rows: tableRows }) })
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
      /* @__PURE__ */ jsxs("p", { children: [
        "Use ",
        /* @__PURE__ */ jsx("code", { children: "value" }),
        " and ",
        /* @__PURE__ */ jsx("code", { children: "max" }),
        " when the operation exposes measurable progress. Associate the element with a label or give it an accessible name."
      ] }),
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
            "Without a ",
            /* @__PURE__ */ jsx("code", { children: "value" }),
            ", Dragonglass displays a continuous indeterminate bar. Give it an accessible name that describes the work in progress."
          ] }),
          /* @__PURE__ */ jsx("progress", { "data-progress": "primary", "aria-label": "Loading results" }),
          /* @__PURE__ */ jsx("progress", { "data-progress": "warning", "aria-label": "Saving changes" }),
          /* @__PURE__ */ jsx(code_example_default, { code: indeterminateProgressExample })
        ]
      }
    ),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "progress-spinner-title", title: "Spinners", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "The ",
        /* @__PURE__ */ jsx("code", { children: "spinner" }),
        " token creates a compact circular indicator and combines with one supported tone. Its accessible name must describe the operation instead of the visual spinner."
      ] }),
      /* @__PURE__ */ jsx("progress", { "data-progress": "spinner primary", "aria-label": "Loading" }),
      /* @__PURE__ */ jsx("progress", { "data-progress": "spinner danger", "aria-label": "Retrying" }),
      /* @__PURE__ */ jsx(code_example_default, { code: spinnerExample })
    ] }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "progress-reduced-motion-title", title: "Reduced motion", children: /* @__PURE__ */ jsx("p", { children: "When a user requests reduced motion, indeterminate bars stop on a visible pulse and circular spinners remain visible without rotation. Dragonglass applies the same static result to WebKit and Gecko progress parts. The static indicator still means that work is in progress, not that the operation has completed." }) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "progress-api-title", title: "API", children: /* @__PURE__ */ jsx(
      api_table_default,
      {
        caption: "Progress elements, attributes, tokens and states",
        rows: [
          {
            name: "progress",
            type: "Element",
            defaultValue: "Required",
            description: "Receives the full-width base track."
          },
          {
            name: "value",
            type: "Attribute",
            defaultValue: "Absent",
            description: "Its absence selects the continuous indeterminate presentation."
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
            description: "Selects a measured bar, continuous bar or circular presentation. Continuous indicators become static when reduced motion is requested."
          }
        ]
      }
    ) })
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
  var componentCategories2 = categoryOrder.filter(
    (category) => componentPages.some((route) => route.category === category)
  );
  var app_components_page_default = () => /* @__PURE__ */ jsxs(doc_page_default, { page: "AppComponents", children: [
    /* @__PURE__ */ jsx("p", { children: "Component guides are grouped by purpose. Each guide pairs rendered examples with their markup and an API table for the relevant elements, attributes, variants, states and tokens." }),
    /* @__PURE__ */ jsxs("p", { children: [
      "After choosing a component, open the",
      /* @__PURE__ */ jsxs(
        "a",
        {
          href: routeByPage.get("Utilities").path,
          "v-route": routeByPage.get("Utilities").path,
          children: [
            " ",
            "utility reference"
          ]
        }
      ),
      " ",
      "for focused spacing, color, typography, layout and elevation adjustments."
    ] }),
    componentCategories2.map((category) => /* @__PURE__ */ jsx(
      demo_section_default,
      {
        id: `${category.toLowerCase().replaceAll(" ", "-")}-components`,
        title: category,
        children: /* @__PURE__ */ jsx("ul", { children: componentPages.filter((route) => route.category === category).map(({ path, label, description }) => /* @__PURE__ */ jsxs("li", { children: [
          /* @__PURE__ */ jsx("a", { href: path, "v-route": path, children: label }),
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
        /* @__PURE__ */ jsx("a", { href: "/dragonglass/cards.html", "v-route": "/dragonglass/cards.html", children: "Cards" })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: toolbarExample })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "toolbar-chips-title", title: "Filter chips", children: [
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
            " and overflows when its actions exceed the available width."
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
            description: "Provides the nav[data-toolbar] selector host."
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
    ) })
  ] });

  // site/src/pages/breadcrumbs_page.tsx
  var linksCode = `<nav data-breadcrumb aria-label="Breadcrumb">
  <a href="/dragonglass/app-components.html">Components</a>
  <a href="/dragonglass/layout.html">Foundations</a>
  <a href="/dragonglass/breadcrumbs.html" aria-current="page">Breadcrumbs</a>
</nav>`;
  var mixedCode = `<nav data-breadcrumb aria-label="File location">
  <button type="button">Workspace</button>
  <a href="/dragonglass">Documents</a>
  <button type="button" aria-current="page">Quarterly report</button>
</nav>`;
  var apiRows8 = [
    {
      name: "nav[data-breadcrumb]",
      type: "Element and attribute",
      defaultValue: "Required",
      description: "Creates a wrapping breadcrumb trail with separators between segments."
    },
    {
      name: "Direct a child",
      type: "Supported child",
      defaultValue: "None",
      description: "Navigates to a location in the breadcrumb hierarchy."
    },
    {
      name: "Direct button child",
      type: "Supported child",
      defaultValue: "None",
      description: "Runs an in-page location action without adding a wrapper or list element."
    },
    {
      name: 'aria-current="page"',
      type: "State",
      defaultValue: "Absent",
      description: "Identifies the current breadcrumb segment."
    },
    {
      name: "Child structure",
      type: "Contract",
      defaultValue: "Direct children only",
      description: "Supports only anchors and buttons directly inside the nav, with no lists or wrappers."
    }
  ];
  var breadcrumbs_page_default = () => /* @__PURE__ */ jsxs(doc_page_default, { page: "Breadcrumbs", children: [
    /* @__PURE__ */ jsxs(demo_section_default, { id: "breadcrumb-links", title: "Linked trail", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "Add ",
        /* @__PURE__ */ jsx("code", { children: "data-breadcrumb" }),
        " to a labeled ",
        /* @__PURE__ */ jsx("code", { children: "nav" }),
        ". Place each anchor directly inside the nav and mark the current location with",
        /* @__PURE__ */ jsx("code", { children: ' aria-current="page"' }),
        "."
      ] }),
      /* @__PURE__ */ jsxs("nav", { "data-breadcrumb": true, "aria-label": "Breadcrumb", children: [
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/dragonglass/app-components.html",
            "v-route": "/dragonglass/app-components.html",
            children: "Components"
          }
        ),
        /* @__PURE__ */ jsx("a", { href: "/dragonglass/layout.html", "v-route": "/dragonglass/layout.html", children: "Foundations" }),
        /* @__PURE__ */ jsx(
          "a",
          {
            href: "/dragonglass/breadcrumbs.html",
            "v-route": "/dragonglass/breadcrumbs.html",
            "aria-current": "page",
            children: "Breadcrumbs"
          }
        )
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: linksCode })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "breadcrumb-actions", title: "Links and actions", children: [
      /* @__PURE__ */ jsx("p", { children: "A breadcrumb combines anchors and buttons as direct children of the breadcrumb nav." }),
      /* @__PURE__ */ jsxs("nav", { "data-breadcrumb": true, "aria-label": "File location", children: [
        /* @__PURE__ */ jsx("button", { type: "button", children: "Workspace" }),
        /* @__PURE__ */ jsx("a", { href: "/dragonglass", "v-route": "/dragonglass", children: "Documents" }),
        /* @__PURE__ */ jsx("button", { type: "button", "aria-current": "page", children: "Quarterly report" })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: mixedCode })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "breadcrumb-api", title: "API", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "The host supports only direct ",
        /* @__PURE__ */ jsx("code", { children: "a" }),
        " and ",
        /* @__PURE__ */ jsx("code", { children: "button" }),
        "children. Separators are visual chevrons, so source markup contains no generated separator text."
      ] }),
      /* @__PURE__ */ jsx(
        api_table_default,
        {
          caption: "Breadcrumb elements, child contract and current state",
          rows: apiRows8
        }
      )
    ] })
  ] });

  // site/src/pages/chips_page.tsx
  var chipExample = `<p>
  <label data-chip="success">
    <input type="checkbox" checked /> Active
  </label>
  <button data-chip type="button" aria-pressed="true">Pinned</button>
  <a data-chip href="/dragonglass/chips.html" aria-current="true">Chips</a>
</p>`;
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
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("button", { "data-chip": true, type: "button", children: "Action" }),
        " ",
        /* @__PURE__ */ jsx(
          "a",
          {
            "data-chip": true,
            href: "/dragonglass/forms.html",
            "v-route": "/dragonglass/forms.html",
            children: "Forms"
          }
        ),
        " ",
        /* @__PURE__ */ jsx("span", { "data-chip": true, children: "Read only" })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: chipElementsExample })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "chips-tones-title", title: "Semantic tones", children: [
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
        /* @__PURE__ */ jsx(
          "a",
          {
            "data-chip": true,
            href: "/dragonglass/chips.html",
            "v-route": "/dragonglass/chips.html",
            "aria-current": "true",
            children: "Chips"
          }
        )
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
            description: "Receives chip styling from data-chip."
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
            description: "Selects the active chip appearance."
          }
        ]
      }
    ) })
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
            name: "data-alert",
            type: "Attribute",
            defaultValue: "Primary",
            description: "Accepts info, success, warning or danger."
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
    ) })
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
  var expansionPanelColorExample = `<details class="bg-primary" data-expansion-panel open>
  <summary>Deployment status</summary>
  <p>The latest release is available.</p>
</details>`;
  var expansionSummaryColorExample = `<details data-expansion-panel open>
  <summary class="bg-accent">Security settings</summary>
  <p>Two-factor authentication is active.</p>
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
    /* @__PURE__ */ jsxs(demo_section_default, { id: "expansion-panel-color-title", title: "Colored panel", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "Apply a ",
        /* @__PURE__ */ jsx("code", { children: "bg-*" }),
        " utility to ",
        /* @__PURE__ */ jsx("code", { children: "details" }),
        " to color the complete panel, including its heading and content."
      ] }),
      /* @__PURE__ */ jsxs("details", { class: "bg-primary", "data-expansion-panel": true, open: true, children: [
        /* @__PURE__ */ jsx("summary", { children: "Deployment status" }),
        /* @__PURE__ */ jsx("p", { children: "The latest release is available." })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: expansionPanelColorExample })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "expansion-summary-color-title", title: "Colored heading", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "Apply a ",
        /* @__PURE__ */ jsx("code", { children: "bg-*" }),
        " utility to ",
        /* @__PURE__ */ jsx("code", { children: "summary" }),
        " when only the panel heading needs a distinct color."
      ] }),
      /* @__PURE__ */ jsxs("details", { "data-expansion-panel": true, open: true, children: [
        /* @__PURE__ */ jsx("summary", { class: "bg-accent", children: "Security settings" }),
        /* @__PURE__ */ jsx("p", { children: "Two-factor authentication is active." })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: expansionSummaryColorExample })
    ] }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "expansion-behavior-title", title: "Behavior", children: /* @__PURE__ */ jsxs("p", { children: [
      "The native ",
      /* @__PURE__ */ jsx("code", { children: "details" }),
      " element controls disclosure state. The open summary keeps a stable bottom border while its generated marker rotates. Reduced motion changes the marker and summary state without a transition."
    ] }) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "expansion-api-title", title: "API", children: /* @__PURE__ */ jsx(
      api_table_default,
      {
        caption: "Expansion panel elements, attributes, tokens and states",
        rows: [
          {
            name: "details / summary",
            type: "Element",
            defaultValue: "Required",
            description: "Matches details[data-expansion-panel] and its direct summary."
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
            description: "Rotates the generated disclosure marker."
          },
          {
            name: "--card-radius / --border-default",
            type: "Token",
            defaultValue: "Theme",
            description: "Control panel corners and border color."
          },
          {
            name: "--spacing-3 / --spacing-4",
            type: "Token",
            defaultValue: "Theme",
            description: "Control summary and content spacing."
          },
          {
            name: "--motion-duration-fast / --motion-easing-standard",
            type: "Motion token",
            defaultValue: "120ms / ease-in-out",
            description: "Control the marker, border and summary state transitions."
          }
        ]
      }
    ) })
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
  <p>Your report is ready to download.</p>
</aside>`;
  var positionsCode = `<aside data-notification="info top right" role="status">Saved.</aside>
<aside data-notification="warning bottom center" role="status">Storage is almost full.</aside>
<aside data-notification="danger center left" role="alert">Connection lost.</aside>`;
  var shadowCode = `<aside data-notification="info inline" role="status">Default shadow</aside>
<aside data-notification="info inline no-shadow" role="status">No shadow</aside>`;
  var apiRows9 = [
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
      description: "Styles a direct close button and reserves its space without removing the notification."
    },
    {
      name: "info|success|warning|danger",
      type: "Attribute token",
      defaultValue: "Primary",
      description: "Sets the semantic border color."
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
      description: "Removes elevation."
    },
    {
      name: "--notification-color",
      type: "Token",
      defaultValue: "--primary-accent",
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
        /* @__PURE__ */ jsx("p", { children: "Your report is ready to download." })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: contentNotificationCode })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "notification-positions", title: "Fixed positions", children: [
      /* @__PURE__ */ jsx("p", { children: "Combine one vertical token with one horizontal token. The default is top right. Center stands alone or pairs with top, right, bottom or left." }),
      /* @__PURE__ */ jsx(code_example_default, { code: positionsCode })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "notification-shadow", title: "Shadow", children: [
      /* @__PURE__ */ jsx("aside", { "data-notification": "info inline", role: "status", children: "Default shadow" }),
      /* @__PURE__ */ jsx("aside", { "data-notification": "info inline no-shadow", role: "status", children: "No shadow" }),
      /* @__PURE__ */ jsx(code_example_default, { code: shadowCode })
    ] }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "notification-composition", title: "Composition", children: /* @__PURE__ */ jsxs("p", { children: [
      "A direct close button with ",
      /* @__PURE__ */ jsx("code", { children: "data-notification-close" }),
      " receives absolute positioning and reserved space. The attribute provides the presentation and does not remove the notification."
    ] }) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "notification-responsive", title: "Responsive behavior", children: /* @__PURE__ */ jsx("p", { children: "Fixed notifications stay within the viewport with a maximum width based on the page gap. Inline notifications use the available content width and remain in document flow." }) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "notification-api", title: "API", children: /* @__PURE__ */ jsx(
      api_table_default,
      {
        caption: "Notification elements, attributes, states and tokens",
        rows: apiRows9
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
        /* @__PURE__ */ jsx("code", { children: 'data-step="error"' }),
        " changes the marker to the danger state.",
        /* @__PURE__ */ jsx("code", { children: ' aria-current="step"' }),
        " adds the current-step color and weight."
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
          /* @__PURE__ */ jsx("p", { children: "The vertical layout gives labels more room. The numbers layout keeps the same text labels in the markup while CSS presents a compact sequence." }),
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
            description: "Matches direct li children of ol[data-stepper]."
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
            description: "Applies the current-step color and weight."
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
    ) })
  ] });

  // site/src/pages/bottom_sheets_page.tsx
  var bottomSheetExample = `<dialog data-dialog="bottom-sheet" open aria-labelledby="filter-sheet-title">
  <header>
    <h3 id="filter-sheet-title">Filters</h3>
  </header>
  <section>
    <p>Choose the results to include.</p>
    <label class="mr-2"><input type="checkbox" name="availability"> Available now</label>
    <label class="mr-2"><input type="checkbox" name="delivery"> Free delivery</label>
  </section>
  <footer><button type="button">Apply filters</button></footer>
</dialog>`;
  var bottom_sheets_page_default = () => /* @__PURE__ */ jsxs(doc_page_default, { page: "BottomSheets", children: [
    /* @__PURE__ */ jsxs(demo_section_default, { id: "bottom-sheet-open-title", title: "Open bottom sheet", children: [
      /* @__PURE__ */ jsx("p", { children: "This preview stays in the page flow so its content remains visible above the footer. In an app, mount the dialog as a direct child of the document root so fixed positioning and layering are not constrained by an ancestor stacking context." }),
      /* @__PURE__ */ jsxs(
        "dialog",
        {
          class: "static",
          "data-dialog": "bottom-sheet",
          open: true,
          "aria-labelledby": "filter-sheet-title",
          children: [
            /* @__PURE__ */ jsx("header", { children: /* @__PURE__ */ jsx("h3", { id: "filter-sheet-title", children: "Filters" }) }),
            /* @__PURE__ */ jsxs("section", { children: [
              /* @__PURE__ */ jsx("p", { children: "Choose the results to include." }),
              /* @__PURE__ */ jsxs("label", { class: "mr-2", children: [
                /* @__PURE__ */ jsx("input", { type: "checkbox", name: "availability" }),
                " Available now"
              ] }),
              /* @__PURE__ */ jsxs("label", { class: "mr-2", children: [
                /* @__PURE__ */ jsx("input", { type: "checkbox", name: "delivery" }),
                " Free delivery"
              ] })
            ] }),
            /* @__PURE__ */ jsx("footer", { children: /* @__PURE__ */ jsx("button", { type: "button", children: "Apply filters" }) })
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
            "The bottom sheet CSS targets direct header, section and footer children. The ",
            /* @__PURE__ */ jsx("code", { children: "open" }),
            " attribute displays the sheet."
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
    /* @__PURE__ */ jsxs(
      demo_section_default,
      {
        id: "bottom-sheet-motion-title",
        title: "Motion and accessibility",
        children: [
          /* @__PURE__ */ jsxs("p", { children: [
            "Discrete transitions and starting styles reveal the sheet through opacity and a short translation from the bottom. The",
            /* @__PURE__ */ jsx("code", { children: "data-closing" }),
            " state reverses those properties and keeps the backdrop synchronized. The modal stays open through the exit animation, then ",
            /* @__PURE__ */ jsx("code", { children: "close()" }),
            " completes the flow."
          ] }),
          /* @__PURE__ */ jsxs("p", { children: [
            "When a user requests reduced motion, the sheet and its backdrop change state without transitions or spatial movement. The example connects the sheet to its heading with ",
            /* @__PURE__ */ jsx("code", { children: "aria-labelledby" }),
            ". A sheet opened with ",
            /* @__PURE__ */ jsx("code", { children: "showModal()" }),
            " blocks the page and supports Escape. Focus behavior follows the native dialog API."
          ] })
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
            description: "Receives the base dialog and open-state styling."
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
            description: "Displays the sheet."
          },
          {
            name: "--dialog-radius / --shadow-2xl",
            type: "Token",
            defaultValue: "Theme",
            description: "Control the top corners and default elevation."
          },
          {
            name: "--motion-duration-base / --motion-easing-enter / --motion-easing-exit",
            type: "Motion token",
            defaultValue: "200ms / ease-out / ease-in",
            description: "Control supported opening and closing transitions for the sheet and backdrop."
          }
        ]
      }
    ) })
  ] });

  // site/src/pages/drawers_page.tsx
  var persistentDrawerCode = `<aside data-drawer aria-label="Workspace shortcuts">
  <section class="h-48 relative bg-primary">
    <h2 data-position="absolute bottom left">Workspace</h2>
  </section>
  <nav aria-label="Workspace shortcuts">
    <ul data-list>
      <li><a href="/projects"><i class="material-icons" aria-hidden="true">folder</i> Projects</a></li>
      <li><a href="/activity"><i class="material-icons" aria-hidden="true">history</i> Recent activity</a></li>
    </ul>
  </nav>
</aside>`;
  var temporaryDrawerCode = `<details data-trigger data-drawer-trigger>
  <summary>Open filters</summary>
  <aside data-drawer="right" aria-labelledby="project-filters-title">
    <section class="h-48 relative bg-primary">
      <h2 id="project-filters-title" data-position="absolute bottom left">Filter projects</h2>
    </section>
    <form aria-label="Project filters">
      <ul data-list>
        <li><label><i class="material-icons" aria-hidden="true">check_circle</i><input type="checkbox" name="active"> Active projects</label></li>
        <li><label><i class="material-icons" aria-hidden="true">group</i><input type="checkbox" name="shared"> Shared with me</label></li>
      </ul>
    </form>
  </aside>
</details>`;
  var drawers_page_default = () => /* @__PURE__ */ jsxs(doc_page_default, { page: "Drawers", children: [
    /* @__PURE__ */ jsxs(demo_section_default, { id: "drawer-persistent", title: "Persistent drawer", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "Use ",
        /* @__PURE__ */ jsx("code", { children: "aside data-drawer" }),
        " for a persistent complementary region. The drawer may contain navigation, controls, or supporting content and stays fixed at the requested viewport edge. Navigation is optional."
      ] }),
      /* @__PURE__ */ jsx("p", { children: "This preview stays inside its frame so you can inspect the drawer without covering the rest of the page." }),
      /* @__PURE__ */ jsx(
        "section",
        {
          "aria-label": "Contained persistent drawer preview",
          class: "relative border border-default",
          style: "min-height: 22rem; overflow: hidden; border-radius: var(--card-radius); background-color: var(--surface);",
          children: /* @__PURE__ */ jsxs(
            "aside",
            {
              "data-drawer": true,
              "aria-labelledby": "drawer-preview-title",
              class: "absolute z-auto h-full",
              style: "width: min(20rem, 80%);",
              children: [
                /* @__PURE__ */ jsx("section", { class: "h-48 relative bg-primary", children: /* @__PURE__ */ jsx("h3", { id: "drawer-preview-title", "data-position": "absolute bottom left", children: "Workspace" }) }),
                /* @__PURE__ */ jsx("nav", { "aria-label": "Workspace shortcuts", children: /* @__PURE__ */ jsxs("ul", { "data-list": true, children: [
                  /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: "#drawer-persistent", children: [
                    /* @__PURE__ */ jsx("i", { class: "material-icons bg-info", "aria-hidden": "true", children: "folder" }),
                    "Projects"
                  ] }) }),
                  /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: "#drawer-position", children: [
                    /* @__PURE__ */ jsx("i", { class: "material-icons bg-primary", "aria-hidden": "true", children: "history" }),
                    "Recent activity"
                  ] }) })
                ] }) }),
                /* @__PURE__ */ jsx("ul", { "data-list": true, children: /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("button", { type: "button", children: [
                  /* @__PURE__ */ jsx("i", { class: "material-icons bg-success", "aria-hidden": "true", children: "add" }),
                  "Create project"
                ] }) }) })
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(code_example_default, { code: persistentDrawerCode })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "drawer-temporary", title: "Temporary drawer", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "Place a ",
        /* @__PURE__ */ jsx("code", { children: "summary" }),
        " followed by a direct",
        /* @__PURE__ */ jsx("code", { children: " aside data-drawer" }),
        " inside a",
        /* @__PURE__ */ jsx("code", { children: " details data-trigger data-drawer-trigger" }),
        " disclosure. The",
        /* @__PURE__ */ jsx("code", { children: " data-drawer-trigger" }),
        " attribute is a CSS hook and adds no JavaScript behavior. The native ",
        /* @__PURE__ */ jsx("code", { children: "open" }),
        " attribute is the only state and opens or closes the drawer with a click, Enter, or Space."
      ] }),
      /* @__PURE__ */ jsxs("p", { children: [
        "A click outside the open drawer closes it and consumes that click, so a covered control stays inactive. Controls inside the drawer keep their native behavior. The complementary region receives its accessible name from ",
        /* @__PURE__ */ jsx("code", { children: "aria-label" }),
        " or ",
        /* @__PURE__ */ jsx("code", { children: "aria-labelledby" }),
        ". Focus stays in the native document order. Escape leaves the disclosure open."
      ] }),
      /* @__PURE__ */ jsx("p", { children: "The first preview remains visible for inspection. The interactive demo below starts closed and lets you open or close the temporary drawer." }),
      /* @__PURE__ */ jsx(
        "section",
        {
          "aria-label": "Static temporary drawer preview",
          class: "relative border border-default",
          style: "min-height: 22rem; overflow: hidden; border-radius: var(--card-radius); background-color: var(--surface);",
          children: /* @__PURE__ */ jsxs(
            "aside",
            {
              "data-drawer": "right",
              "aria-labelledby": "static-temporary-drawer-title",
              class: "absolute z-auto h-full",
              style: "width: min(20rem, 80%);",
              children: [
                /* @__PURE__ */ jsx("section", { class: "h-48 relative bg-primary", children: /* @__PURE__ */ jsx(
                  "h3",
                  {
                    id: "static-temporary-drawer-title",
                    "data-position": "absolute bottom left",
                    children: "Project filters preview"
                  }
                ) }),
                /* @__PURE__ */ jsx("form", { "aria-label": "Project filters preview", children: /* @__PURE__ */ jsxs("ul", { "data-list": true, children: [
                  /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("label", { children: [
                    /* @__PURE__ */ jsx("i", { class: "material-icons bg-success", "aria-hidden": "true", children: "check_circle" }),
                    /* @__PURE__ */ jsx("input", { type: "checkbox", name: "preview-active-projects" }),
                    "Active projects"
                  ] }) }),
                  /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("label", { children: [
                    /* @__PURE__ */ jsx("i", { class: "material-icons bg-info", "aria-hidden": "true", children: "group" }),
                    /* @__PURE__ */ jsx("input", { type: "checkbox", name: "preview-shared-projects" }),
                    "Shared with me"
                  ] }) })
                ] }) })
              ]
            }
          )
        }
      ),
      /* @__PURE__ */ jsx(
        "section",
        {
          "aria-label": "Interactive temporary drawer demo",
          class: "p-4 border border-default",
          style: "border-radius: var(--card-radius); background-color: var(--surface);",
          children: /* @__PURE__ */ jsxs("details", { "data-trigger": true, "data-drawer-trigger": true, children: [
            /* @__PURE__ */ jsx("summary", { children: "Open filters" }),
            /* @__PURE__ */ jsxs("aside", { "data-drawer": "right", "aria-labelledby": "temporary-drawer-title", children: [
              /* @__PURE__ */ jsx("section", { class: "h-48 relative bg-primary", children: /* @__PURE__ */ jsx(
                "h3",
                {
                  id: "temporary-drawer-title",
                  "data-position": "absolute bottom left",
                  children: "Filter projects"
                }
              ) }),
              /* @__PURE__ */ jsx("form", { "aria-label": "Project filters", children: /* @__PURE__ */ jsxs("ul", { "data-list": true, children: [
                /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("label", { children: [
                  /* @__PURE__ */ jsx("i", { class: "material-icons bg-success", "aria-hidden": "true", children: "check_circle" }),
                  /* @__PURE__ */ jsx("input", { type: "checkbox", name: "active-projects" }),
                  " Active projects"
                ] }) }),
                /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("label", { children: [
                  /* @__PURE__ */ jsx("i", { class: "material-icons bg-info", "aria-hidden": "true", children: "group" }),
                  /* @__PURE__ */ jsx("input", { type: "checkbox", name: "shared-projects" }),
                  " Shared with me"
                ] }) }),
                /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsxs("a", { href: "#drawer-position", children: [
                  /* @__PURE__ */ jsx("i", { class: "material-icons bg-primary", "aria-hidden": "true", children: "open_in_new" }),
                  "Learn where drawers appear"
                ] }) })
              ] }) })
            ] })
          ] })
        }
      ),
      /* @__PURE__ */ jsx(code_example_default, { code: temporaryDrawerCode })
    ] }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "drawer-position", title: "Position and motion", children: /* @__PURE__ */ jsxs("p", { children: [
      "A drawer starts at the left edge. Add",
      /* @__PURE__ */ jsx("code", { children: ' data-drawer="right"' }),
      " to anchor it to the right edge. The open state moves the drawer into view. Native details content and inert CSS define the entrance and exit transitions. Reduced motion changes state without a transition or spatial offset."
    ] }) }),
    /* @__PURE__ */ jsx(demo_section_default, { id: "drawer-api", title: "API", children: /* @__PURE__ */ jsx(
      api_table_default,
      {
        caption: "Drawer elements, attributes and states",
        rows: [
          {
            name: "aside[data-drawer]",
            type: "Element",
            defaultValue: "Persistent",
            description: "Creates a standalone persistent drawer or a temporary drawer inside the required disclosure structure."
          },
          {
            name: "details[data-trigger][data-drawer-trigger] > summary + aside[data-drawer]",
            type: "Structure",
            defaultValue: "Required for temporary drawers",
            description: "Marks the temporary drawer disclosure for CSS while native details state provides zero-JavaScript control."
          },
          {
            name: 'data-drawer="right"',
            type: "Attribute token",
            defaultValue: "Left",
            description: "Anchors the drawer to the right viewport edge."
          },
          {
            name: "open",
            type: "Native details state",
            defaultValue: "Absent",
            description: "Shows the temporary drawer through its parent details."
          },
          {
            name: "--motion-duration-base / --motion-duration-fast / --motion-easing-enter / --motion-easing-exit",
            type: "Motion token",
            defaultValue: "200ms / theme value / ease-out / ease-in",
            description: "Control the entrance and exit transition timing."
          }
        ]
      }
    ) })
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
    /* @__PURE__ */ jsxs(demo_section_default, { id: "tabs-fallback-title", title: "Layout behavior", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        /* @__PURE__ */ jsx("code", { children: "sibling-count()" }),
        ", ",
        /* @__PURE__ */ jsx("code", { children: "sibling-index()" }),
        ", and",
        /* @__PURE__ */ jsx("code", { children: "::details-content" }),
        " place the summaries in one tab row and align the open panel below them. The same markup also forms stacked native disclosures with accessible content and keyboard operation."
      ] }),
      /* @__PURE__ */ jsx("p", { children: "When a user requests reduced motion, summary color and border state changes occur without a transition." })
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
            description: "Matches direct details children and their direct summaries."
          },
          {
            name: "data-tabs",
            type: "Attribute",
            defaultValue: "Required",
            description: "Aligns grouped details controls and places the open content below."
          },
          {
            name: "open",
            type: "Attribute / state",
            defaultValue: "Absent",
            description: "Applies the active summary color and border."
          },
          {
            name: "--primary / --default-light / --spacing-4",
            type: "Token",
            defaultValue: "Theme",
            description: "Control the active marker, divider and panel spacing."
          }
        ]
      }
    ) })
  ] });

  // site/src/docs/utility_catalog.ts
  var interactiveVariants = "Base, focus:, active:, hover:";
  var colorVariants = `${interactiveVariants}, before:, after:`;
  var spacingValues = "0, px, 1, 2, 3, 4, 5, 6, 8, 10, 12, 16";
  var utilityGroups = [
    {
      id: "motion",
      title: "Motion",
      description: "Motion tokens give components shared timing semantics. Components transition only their documented properties and honor the user's reduced-motion preference.",
      families: [
        {
          pattern: "--motion-duration-{speed}",
          type: "Duration token",
          values: "instant (0ms), fast (120ms), base (200ms), deliberate (280ms)",
          variants: "CSS custom property",
          description: "Selects an instant, compact, standard or emphasized duration. Override a token at an appropriate scope to tune component motion without applying a transition to every property."
        },
        {
          pattern: "--motion-easing-{intent}",
          type: "Easing token",
          values: "standard (ease-in-out), enter (ease-out), exit (ease-in)",
          variants: "CSS custom property",
          description: "Selects the easing for a state change, an entering surface or an exiting surface."
        }
      ]
    },
    {
      id: "spacing",
      title: "Spacing",
      description: "Spacing utilities read the shared spacing scale and apply one physical side or every side.",
      families: [
        {
          pattern: "p-{size} | pt-{size} | pr-{size} | pb-{size} | pl-{size}",
          type: "Padding",
          values: spacingValues,
          variants: "Base only",
          description: "Sets padding on every side, top, right, bottom or left respectively."
        },
        {
          pattern: "m-{size} | mt-{size} | mr-{size} | mb-{size} | ml-{size}",
          type: "Margin",
          values: spacingValues,
          variants: "Base only",
          description: "Sets margin on every side, top, right, bottom or left respectively."
        }
      ]
    },
    {
      id: "layout",
      title: "Layout and stacking",
      description: "Layout utilities control positioning, stacking, fractional width and compact display behavior.",
      families: [
        {
          pattern: "container",
          type: "Centered container",
          values: "100% width, var(--container-max-width) maximum",
          variants: "Base only",
          description: "Centers content with logical auto margins and adds no padding."
        },
        {
          pattern: "max-w-{size}",
          type: "Maximum width",
          values: "sm (36rem), md (48rem), lg (64rem), xl (80rem), prose (65ch)",
          variants: "Base only",
          description: "Limits width without changing the element width or margins."
        },
        {
          pattern: "mx-auto",
          type: "Horizontal centering",
          values: "margin-inline: auto",
          variants: "Base only",
          description: "Centers a width-constrained element without changing vertical margins."
        },
        {
          pattern: "relative | static | absolute | fixed | sticky",
          type: "Position",
          values: "The class name is the position value",
          variants: "Base only",
          description: "Sets the position property directly."
        },
        {
          pattern: "z-{level}",
          type: "Z-index",
          values: "auto, negative-10, negative-1, 0, 1, 2, 3, 4, 6, 8, 12, 16, 1000",
          variants: "Base only",
          description: "Sets a documented z-index from the framework scale."
        },
        {
          pattern: "w-{part}/{whole}",
          type: "Fractional width",
          values: "whole: 2 through 12; part: 1 through whole - 1",
          variants: "Base, sm:, md:, lg:, xl:",
          description: "Sets a fractional width. Responsive variants start at 576px, 768px, 992px and 1200px."
        },
        {
          pattern: "inline",
          type: "Inline display",
          values: "No value",
          variants: "Base only",
          description: "Uses inline-block display, resets positioned offsets and aligns the element vertically."
        },
        {
          pattern: "w-full | h-full | h-auto",
          type: "Full and automatic sizing",
          values: "100% width, 100% height, automatic height",
          variants: "Base only",
          description: "Controls the media box before applying object-fit or background utilities."
        },
        {
          pattern: "h-{size} | min-h-{size}",
          type: "Height and minimum height",
          values: "8 (2rem), 12 (3rem), 16 (4rem), 24 (6rem), 32 (8rem), 48 (12rem), 64 (16rem), 96 (24rem), 128 (32rem)",
          variants: "Base only",
          description: "Sets height or minimum height from the quarter-rem framework scale."
        },
        {
          pattern: "h-{viewport} | min-h-{viewport}",
          type: "Viewport height and minimum height",
          values: "half-screen (50svh), three-quarter-screen (75svh), screen (100svh)",
          variants: "Base only",
          description: "Sets height or minimum height relative to the small viewport."
        },
        {
          pattern: "u-scrollable",
          type: "Height helper",
          values: "max-height: 360rem",
          variants: "Base only",
          description: "Sets a maximum height while overflow behavior remains unchanged."
        }
      ]
    },
    {
      id: "grid",
      title: "Grid containers",
      description: "Grid classes create wrapping flex rows whose direct children start at full width.",
      families: [
        {
          pattern: "grid",
          type: "Grid container",
          values: "Start alignment without gutters",
          variants: "Base only",
          description: "Creates the base wrapping row."
        },
        {
          pattern: "grid-center | grid-end",
          type: "Grid alignment",
          values: "center, end",
          variants: "Base only",
          description: "Aligns grid children along the row. The base grid class uses start alignment."
        },
        {
          pattern: "grid-gutters",
          type: "Guttered grid",
          values: "0.8rem child padding",
          variants: "Base only",
          description: "Creates a grid row with consistent horizontal gutters."
        }
      ]
    },
    {
      id: "media",
      title: "Images and backgrounds",
      description: "Media utilities control image fitting, focal position, background sizing and repetition.",
      families: [
        {
          pattern: "object-{fit}",
          type: "Object fit",
          values: "cover, contain, fill, none, scale-down",
          variants: "Base only",
          description: "Sets object-fit on replaced elements such as img."
        },
        {
          pattern: "object-{position}",
          type: "Object position",
          values: "top-left, top, top-right, left, center, right, bottom-left, bottom, bottom-right",
          variants: "Base only",
          description: "Selects the visible focal point inside an image box."
        },
        {
          pattern: "bg-auto | bg-cover | bg-contain",
          type: "Background size",
          values: "auto, cover, contain",
          variants: "Base only",
          description: "Sets background-size without changing the image source."
        },
        {
          pattern: "bg-{position}",
          type: "Background position",
          values: "top-left, top, top-right, left, center, right, bottom-left, bottom, bottom-right",
          variants: "Base only",
          description: "Selects the background image focal point."
        },
        {
          pattern: "bg-repeat | bg-no-repeat",
          type: "Background repeat",
          values: "repeat, no-repeat",
          variants: "Base only",
          description: "Controls background image repetition."
        }
      ]
    },
    {
      id: "borders",
      title: "Borders and outlines",
      description: "Border and outline utilities separate width, style, offset and color for explicit composition.",
      families: [
        {
          pattern: "border",
          type: "Border shorthand",
          values: "1px-scale width and solid style",
          variants: interactiveVariants,
          description: "Adds the default solid border."
        },
        {
          pattern: "border-{size}",
          type: "Border width",
          values: "0 through 13",
          variants: interactiveVariants,
          description: "Sets border width from the border scale."
        },
        {
          pattern: "outline",
          type: "Outline shorthand",
          values: "1px-scale width and solid style",
          variants: interactiveVariants,
          description: "Adds the default solid outline."
        },
        {
          pattern: "outline-none",
          type: "Outline removal",
          values: "none",
          variants: interactiveVariants,
          description: "Removes the outline."
        },
        {
          pattern: "outline-{size}",
          type: "Outline width",
          values: "0 through 13",
          variants: interactiveVariants,
          description: "Sets outline width and a solid outline style."
        },
        {
          pattern: "outline-{style}",
          type: "Outline style",
          values: "solid, dashed, dotted, double",
          variants: interactiveVariants,
          description: "Sets the outline style."
        },
        {
          pattern: "outline-offset-{size}",
          type: "Outline offset",
          values: spacingValues,
          variants: interactiveVariants,
          description: "Offsets the outline with a value from the spacing scale."
        }
      ]
    },
    {
      id: "typography",
      title: "Typography",
      description: "Typography utilities control one font or text property and support interactive state variants.",
      families: [
        {
          pattern: "text-{size}",
          type: "Font size",
          values: "2xs, xs, sm, base, lg, xl, 2xl, 3xl, 4xl, 5xl, 6xl",
          variants: interactiveVariants,
          description: "Sets font size from the framework scale."
        },
        {
          pattern: "normal-style | italic | oblique",
          type: "Font style",
          values: "normal, italic, oblique",
          variants: interactiveVariants,
          description: "Sets font style."
        },
        {
          pattern: "font-{weight}",
          type: "Font weight",
          values: "thin, extralight, light, normal, medium, semibold, bold, extrabold, black",
          variants: interactiveVariants,
          description: "Sets numeric font weight from 100 through 900."
        },
        {
          pattern: "normal-case | capitalize | uppercase | lowercase",
          type: "Text transform",
          values: "none, capitalize, uppercase, lowercase",
          variants: interactiveVariants,
          description: "Changes visual casing without changing source text."
        },
        {
          pattern: "leading-{height}",
          type: "Line height",
          values: "none, tight, snug, normal, relaxed, loose",
          variants: interactiveVariants,
          description: "Sets line height from 1 through 2."
        },
        {
          pattern: "text-{alignment}",
          type: "Text alignment",
          values: "left, right, center, justify",
          variants: interactiveVariants,
          description: "Sets physical text alignment."
        }
      ]
    },
    {
      id: "elevation",
      title: "Elevation",
      description: "Elevation utilities use token-backed outer and inset shadows with interactive state variants.",
      families: [
        {
          pattern: "shadow-{size}",
          type: "Outer shadow",
          values: "2xs, xs, sm, base, lg, xl, 2xl, 3xl",
          variants: interactiveVariants,
          description: "Applies an outer shadow and its matching stacking level."
        },
        {
          pattern: "shadow-inner-{size}",
          type: "Inset shadow",
          values: "2xs, xs, sm, base, lg, xl, 2xl, 3xl",
          variants: interactiveVariants,
          description: "Applies an inset shadow."
        },
        {
          pattern: "shadow-none",
          type: "Shadow removal",
          values: "none",
          variants: interactiveVariants,
          description: "Removes box shadow."
        },
        {
          pattern: "text-shadow-sm | text-shadow-base | text-shadow-lg",
          type: "Text shadow",
          values: "sm, base, lg",
          variants: "Base only",
          description: "Applies a compact token-colored shadow to improve text separation over media."
        },
        {
          pattern: "text-shadow-none",
          type: "Text shadow removal",
          values: "none",
          variants: "Base only",
          description: "Removes text shadow, including low-specificity defaults."
        }
      ]
    },
    {
      id: "colors",
      title: "Colors",
      description: "Color utilities cover backgrounds, borders, outlines and text across every semantic family and weight.",
      families: [
        {
          pattern: "{kind}-{family}{weight}",
          type: "Semantic color",
          values: "kind: bg, border, outline, text; family: primary, accent, success, info, warning, danger, default; weight: lightest, lighter, light, base, dark, darker, darkest",
          variants: colorVariants,
          description: "Applies the selected semantic token. Base weight omits the weight suffix, such as bg-primary. Border colors require a border style to become visible."
        },
        {
          pattern: "{kind}-white | {kind}-black",
          type: "Literal color",
          values: "kind: bg, border, outline, text",
          variants: colorVariants,
          description: "Applies the literal white or black token. These utilities remain unchanged across color schemes."
        },
        {
          pattern: "bg-transparent | bg-scrim | bg-media-scrim",
          type: "Transparent background",
          values: "transparent, var(--scrim), var(--media-scrim)",
          variants: "Base only",
          description: "Sets only the background color and preserves the current text color."
        }
      ]
    }
  ];

  // site/src/pages/utilities_page.tsx
  var compositionExample = `<article class="relative z-1 p-4 shadow-base bg-default-lightest">
  <h2 class="text-xl font-semibold leading-tight text-primary-dark">Project summary</h2>
  <p class="mt-2 mb-4 text-default-dark">Utilities make focused visual adjustments.</p>
  <button class="bg-primary hover:bg-primary-dark focus:outline-2 focus:outline-primary">
    Open project
  </button>
</article>`;
  var responsiveExample2 = `<div class="grid-gutters">
  <section class="w-6/12 md:w-4/12 xl:w-3/12 p-4">Responsive column</section>
</div>`;
  var containerExample = `<section class="container">
  <h2>Application content</h2>
  <p>The container stays fluid until it reaches the configured maximum width.</p>
</section>

<p class="max-w-prose mx-auto">
  This text measure stays readable and preserves its vertical margins.
</p>`;
  var utilities_page_default = () => /* @__PURE__ */ jsxs(doc_page_default, { page: "Utilities", children: [
    /* @__PURE__ */ jsxs(demo_section_default, { id: "utility-index", title: "Find a utility", children: [
      /* @__PURE__ */ jsx("p", { children: "The reference groups every documented utility family by purpose. Each table shows the class pattern, accepted values and available variants." }),
      /* @__PURE__ */ jsx("ul", { children: utilityGroups.map((group) => /* @__PURE__ */ jsx("li", { children: /* @__PURE__ */ jsx("a", { href: `#utilities-${group.id}`, children: group.title }) })) })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "utility-composition", title: "Compose focused adjustments", children: [
      /* @__PURE__ */ jsx("p", { children: "A utility class changes one visual property or a small related set." }),
      /* @__PURE__ */ jsx(code_example_default, { code: compositionExample })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "utility-containers", title: "Constrain content width", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "Use ",
        /* @__PURE__ */ jsx("code", { children: "container" }),
        " for the common fluid and centered page width. Combine ",
        /* @__PURE__ */ jsx("code", { children: "max-w-*" }),
        " with ",
        /* @__PURE__ */ jsx("code", { children: "mx-auto" }),
        " when an element needs a different limit. These classes add no padding."
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: containerExample })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "utility-syntax", title: "Prefixes and special characters", children: [
      /* @__PURE__ */ jsxs("p", { children: [
        "Interactive variants place ",
        /* @__PURE__ */ jsx("code", { children: "focus:" }),
        ", ",
        /* @__PURE__ */ jsx("code", { children: "active:" }),
        " or",
        /* @__PURE__ */ jsx("code", { children: " hover:" }),
        " before a supported class. Color utilities also accept ",
        /* @__PURE__ */ jsx("code", { children: "before:" }),
        " and ",
        /* @__PURE__ */ jsx("code", { children: "after:" }),
        ". Fractional widths accept the responsive prefixes ",
        /* @__PURE__ */ jsx("code", { children: "sm:" }),
        ", ",
        /* @__PURE__ */ jsx("code", { children: "md:" }),
        ",",
        /* @__PURE__ */ jsx("code", { children: " lg:" }),
        " and ",
        /* @__PURE__ */ jsx("code", { children: "xl:" }),
        "."
      ] }),
      /* @__PURE__ */ jsx("p", { children: "Colons and slashes appear directly inside the HTML class attribute. Authored CSS and DOM selectors use their escaped forms." }),
      /* @__PURE__ */ jsx(code_example_default, { code: responsiveExample2 })
    ] }),
    utilityGroups.map((group) => /* @__PURE__ */ jsxs(demo_section_default, { id: `utilities-${group.id}`, title: group.title, children: [
      /* @__PURE__ */ jsx("p", { children: group.description }),
      /* @__PURE__ */ jsx(
        api_table_default,
        {
          caption: `${group.title} utility families`,
          rows: group.families.map((family) => ({
            name: family.pattern,
            type: family.type,
            defaultValue: family.values,
            description: `${family.description} Variants: ${family.variants}`
          }))
        }
      )
    ] }))
  ] });

  // site/src/pages/heroes_page.tsx
  var centeredCode = `<section class="grid-center grid-gutters min-h-half-screen pt-8 pb-8 text-center">
  <h2 class="md:w-10/12 text-5xl font-bold leading-tight mt-0 mb-4">Make the next decision clear.</h2>
  <p class="md:w-8/12 text-lg leading-relaxed mt-0 mb-4">Use one focused message and a direct path forward.</p>
  <p class="md:w-8/12 mt-0 mb-0">
    <a data-button href="/dragonglass/app-components.html">Start now</a>
    <a data-link="standalone" href="/dragonglass/layout.html">Read the details</a>
  </p>
</section>`;
  var splitCode = `<section class="grid grid-gutters min-h-three-quarter-screen pt-8 pb-8">
  <section class="md:w-7/12 pt-8 pb-8">
    <h2 class="text-5xl font-bold leading-tight mt-0 mb-4">Plan the work. Keep the context.</h2>
    <p class="text-lg leading-relaxed mt-0 mb-4">Bring the decision and its supporting details into one opening view.</p>
    <p class="mt-0 mb-0">
      <a data-button href="/dragonglass/app-components.html">Open workspace</a>
    </p>
  </section>
  <section class="md:w-5/12 p-6 border">
    <h3 class="text-2xl font-semibold leading-tight mt-0 mb-3">Today</h3>
    <p class="mt-0 mb-4">Review the launch checklist and assign the remaining owners.</p>
    <p class="mt-0 mb-0">
      <a data-link="standalone quiet" href="/dragonglass/app-components.html">View checklist</a>
    </p>
  </section>
</section>`;
  var presentationCode = `<section class="grid-center grid-gutters min-h-screen pt-8 pb-8">
  <p class="md:w-10/12 text-lg font-semibold mt-0 mb-3">Annual report</p>
  <h2 class="md:w-10/12 text-6xl font-bold leading-none mt-0 mb-6">A year of steady progress.</h2>
  <p class="md:w-8/12 text-xl leading-relaxed mt-0 mb-6">Present one major idea with enough space for deliberate pacing.</p>
  <p class="md:w-8/12 mt-0 mb-0">
    <a data-link="standalone" href="/dragonglass">Read the report</a>
  </p>
</section>`;
  var heroes_page_default = () => /* @__PURE__ */ jsxs(doc_page_default, { page: "Heroes", children: [
    /* @__PURE__ */ jsx("p", { children: "These recipes combine semantic sections with existing grid, height, typography, spacing, button and link primitives. They introduce no hero-specific attribute or stylesheet." }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "hero-centered", title: "Centered", children: [
      /* @__PURE__ */ jsx("p", { children: "Use a half-screen minimum height and centered grid content for one message with primary and secondary actions." }),
      /* @__PURE__ */ jsxs("section", { class: "grid-center grid-gutters min-h-half-screen pt-8 pb-8 text-center", children: [
        /* @__PURE__ */ jsx("h2", { class: "md:w-10/12 text-5xl font-bold leading-tight mt-0 mb-4", children: "Make the next decision clear." }),
        /* @__PURE__ */ jsx("p", { class: "md:w-8/12 text-lg leading-relaxed mt-0 mb-4", children: "Use one focused message and a direct path forward." }),
        /* @__PURE__ */ jsxs("p", { class: "md:w-8/12 mt-0 mb-0", children: [
          /* @__PURE__ */ jsx(
            "a",
            {
              "data-button": true,
              href: "/dragonglass/app-components.html",
              "v-route": "/dragonglass/app-components.html",
              children: "Start now"
            }
          ),
          " ",
          /* @__PURE__ */ jsx(
            "a",
            {
              "data-link": "standalone",
              href: "/dragonglass/layout.html",
              "v-route": "/dragonglass/layout.html",
              children: "Read the details"
            }
          )
        ] })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: centeredCode })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "hero-split", title: "Split", children: [
      /* @__PURE__ */ jsx("p", { children: "Use fractional grid widths to pair the opening message with a compact supporting section." }),
      /* @__PURE__ */ jsxs("section", { class: "grid grid-gutters min-h-three-quarter-screen pt-8 pb-8", children: [
        /* @__PURE__ */ jsxs("section", { class: "md:w-7/12 pt-8 pb-8", children: [
          /* @__PURE__ */ jsx("h2", { class: "text-5xl font-bold leading-tight mt-0 mb-4", children: "Plan the work. Keep the context." }),
          /* @__PURE__ */ jsx("p", { class: "text-lg leading-relaxed mt-0 mb-4", children: "Bring the decision and its supporting details into one opening view." }),
          /* @__PURE__ */ jsx("p", { class: "mt-0 mb-0", children: /* @__PURE__ */ jsx(
            "a",
            {
              "data-button": true,
              href: "/dragonglass/app-components.html",
              "v-route": "/dragonglass/app-components.html",
              children: "Open workspace"
            }
          ) })
        ] }),
        /* @__PURE__ */ jsxs("section", { class: "md:w-5/12 p-6 border", children: [
          /* @__PURE__ */ jsx("h3", { class: "text-2xl font-semibold leading-tight mt-0 mb-3", children: "Today" }),
          /* @__PURE__ */ jsx("p", { class: "mt-0 mb-4", children: "Review the launch checklist and assign the remaining owners." }),
          /* @__PURE__ */ jsx("p", { class: "mt-0 mb-0", children: /* @__PURE__ */ jsx(
            "a",
            {
              "data-link": "standalone quiet",
              href: "/dragonglass/app-components.html",
              "v-route": "/dragonglass/app-components.html",
              children: "View checklist"
            }
          ) })
        ] })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: splitCode })
    ] }),
    /* @__PURE__ */ jsxs(demo_section_default, { id: "hero-presentation", title: "Presentation", children: [
      /* @__PURE__ */ jsx("p", { children: "Use the full small viewport and the largest display size when one idea should establish the page rhythm." }),
      /* @__PURE__ */ jsxs("section", { class: "grid-center grid-gutters min-h-screen pt-8 pb-8", children: [
        /* @__PURE__ */ jsx("p", { class: "md:w-10/12 text-lg font-semibold mt-0 mb-3", children: "Annual report" }),
        /* @__PURE__ */ jsx("h2", { class: "md:w-10/12 text-6xl font-bold leading-none mt-0 mb-6", children: "A year of steady progress." }),
        /* @__PURE__ */ jsx("p", { class: "md:w-8/12 text-xl leading-relaxed mt-0 mb-6", children: "Present one major idea with enough space for deliberate pacing." }),
        /* @__PURE__ */ jsx("p", { class: "md:w-8/12 mt-0 mb-0", children: /* @__PURE__ */ jsx("a", { "data-link": "standalone", href: "/dragonglass", "v-route": "/dragonglass", children: "Read the report" }) })
      ] }),
      /* @__PURE__ */ jsx(code_example_default, { code: presentationCode })
    ] })
  ] });

  // site/src/pages/index.ts
  var pages_default = {
    Html: html_page_default,
    Home: home_page_default,
    Layouts: layout_page_default,
    Grid: grid_page_default,
    Positioning: positioning_page_default,
    Images: images_page_default,
    Elevations: elevations_page_default,
    Colors: colors_page_default,
    Fonts: fonts_page_default,
    Badges: badges_page_default,
    Buttons: buttons_page_default,
    Links: links_page_default,
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
    Breadcrumbs: breadcrumbs_page_default,
    Chips: chips_page_default,
    Alerts: alerts_page_default,
    ExpansionPanels: expansion_panels_page_default,
    Notifications: notifications_page_default,
    Steppers: steppers_page_default,
    BottomSheets: bottom_sheets_page_default,
    Drawers: drawers_page_default,
    Tabs: tabs_page_default,
    Utilities: utilities_page_default,
    Heroes: heroes_page_default
  };

  // site/src/index.ts
  var router = new Router();
  var themeStylesheetPattern = /theme-[^/]+\.css$/;
  var syncDocumentationPresentation = (route) => {
    if (typeof document === "undefined" || typeof document.querySelector !== "function") {
      return;
    }
    const stylesheet = document.querySelector(
      "#documentation-theme-stylesheet"
    );
    if (typeof stylesheet?.getAttribute !== "function") {
      throw new Error("Documentation theme stylesheet not found");
    }
    const currentHref = stylesheet.getAttribute("href");
    if (typeof currentHref !== "string" || !themeStylesheetPattern.test(currentHref)) {
      throw new Error("Documentation theme stylesheet path is invalid");
    }
    const themeName = route.themeName ?? "default";
    const nextHref = currentHref.replace(
      themeStylesheetPattern,
      `theme-${themeName}.css`
    );
    document.documentElement.dataset.colorScheme = route.colorScheme;
    if (nextHref !== currentHref) {
      stylesheet.setAttribute("href", nextHref);
    }
  };
  var pageForRoute = (route) => {
    let renderPage;
    if (route.page === "Theme") {
      const themeName = route.themeName;
      const colorScheme = route.colorScheme;
      if (typeof themeName !== "string" || colorScheme !== "light" && colorScheme !== "dark") {
        throw new Error(`Theme metadata not found for route: ${route.path}`);
      }
      renderPage = () => pages_default.Colors({ colorScheme, themeName });
    } else {
      const page = pages_default[route.page];
      renderPage = () => page();
    }
    return () => {
      syncDocumentationPresentation(route);
      return renderPage();
    };
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
