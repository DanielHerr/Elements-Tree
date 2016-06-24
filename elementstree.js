"use strict"

function elementstree(parentpath = "") {

 function deepproperty(path = "", value) {
  let parts = path.split(".")
  let object = self[parts.shift()]
  for(let n = 0; n < parts.length - 1; n++) {
   object = object[parts[n]]
  }
  if(arguments.length == 2) {
   object[parts[parts.length - 1]] = value
  }
  return(object[parts[parts.length - 1]])
 }

 let parent = parentpath
 if(typeof(parent) == "string") {
  parent = self[parent] || deepproperty(parent)
 } else {
  parentpath = "self"
 }
 for(let element of parent.children) {
  if(element.tagName == "LABEL" && element.id == "" && element.children) {
   deepproperty(parentpath + "." + element.firstElementChild.id, element.firstElementChild)
  } else if(element.id) {
   deepproperty(parentpath + "." + element.id, element)
   elementstree(parentpath + "." + element.id)
 } }
}