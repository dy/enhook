let h, render, useState, useReducer, useEffect, useMemo, useCallback, useRef, useImperativeHandle, useLayoutEffect

let lib
try { lib = require('react') } catch (e) { }
if (lib) {
  h = lib.createElement

  useState = lib.useState
  useReducer = lib.useReducer
  useEffect = lib.useEffect
  useMemo = lib.useMemo
  useCallback = lib.useCallback
  useRef = lib.useRef
  useImperativeHandle = lib.useImperativeHandle
  useLayoutEffect = lib.useLayoutEffect
}

let renderer
try { renderer = require('react-dom') } catch (e) { }
if (renderer) render = renderer.render

export { h, render, useState, useReducer, useEffect, useMemo, useCallback, useRef, useImperativeHandle, useLayoutEffect }
